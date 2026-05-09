import { t as MediaAttachMixin } from "../media-attach-mixin-CYoNe7Sh.js";
import { t as listen } from "../listen-CJT7C4kM.js";
import { o as safeDefine } from "../context-0rI_P6jf.js";
import { t as anyAbortSignal } from "../abort-DsTff8mS.js";
import { n as CustomMediaElement, t as HTMLVideoElementHost } from "../video-host-BtD61mpF.js";

//#region ../spf/dist/dev/core/abr/ewma.js
/**
* Exponentially Weighted Moving Average (EWMA)
*
* Pure functional implementation of EWMA calculations.
* Based on Shaka Player's EWMA algorithm.
*/
/**
* Calculate alpha (decay factor) from half-life.
*
* Alpha determines how quickly old data "expires":
* - alpha close to 1 = slow decay (long memory)
* - alpha close to 0 = fast decay (short memory)
*
* @param halfLife - The quantity of prior samples (by weight) that make up
*   half of the new estimate. Must be positive.
* @returns Alpha value between 0 and 1
*
* @example
* const alpha = calculateAlpha(2); // ≈ 0.7071 for 2-second half-life
*/
function calculateAlpha(halfLife) {
	return Math.exp(Math.log(.5) / halfLife);
}
/**
* Calculate exponentially weighted moving average.
*
* Updates an estimate by blending a new value with the previous estimate,
* weighted by the sample duration. Longer samples have more influence.
*
* @param prevEstimate - Previous EWMA estimate
* @param value - New sample value to incorporate
* @param weight - Sample weight (typically duration in seconds)
* @param halfLife - Half-life for decay (typically 2-5 seconds)
* @returns Updated EWMA estimate
*
* @example
* let estimate = 0;
* estimate = calculateEwma(estimate, 1_000_000, 1, 2); // First sample
* estimate = calculateEwma(estimate, 2_000_000, 1, 2); // Second sample
*/
function calculateEwma(prevEstimate, value, weight, halfLife) {
	const adjAlpha = calculateAlpha(halfLife) ** weight;
	return value * (1 - adjAlpha) + adjAlpha * prevEstimate;
}
/**
* Apply zero-factor correction to EWMA estimate.
*
* The zero-factor correction compensates for bias when starting from zero.
* Without this correction, early estimates would be artificially low.
*
* As totalWeight increases, the correction factor approaches 1, meaning
* the estimate becomes more reliable and needs less correction.
*
* @param estimate - Raw EWMA estimate (uncorrected)
* @param totalWeight - Accumulated weight from all samples
* @param halfLife - Half-life used in EWMA calculation
* @returns Corrected estimate, or 0 if totalWeight is 0
*
* @example
* const raw = calculateEwma(0, 1_000_000, 1, 2);
* const corrected = applyZeroFactor(raw, 1, 2); // ≈ 1_000_000
*/
function applyZeroFactor(estimate, totalWeight, halfLife) {
	if (totalWeight === 0) return 0;
	return estimate / (1 - calculateAlpha(halfLife) ** totalWeight);
}

//#endregion
//#region ../spf/dist/dev/core/abr/bandwidth-estimator.js
/**
* Dual EWMA Bandwidth Estimator
*
* Estimates available bandwidth using two EWMA calculations with different
* half-lives, taking the minimum of both. This approach (from Shaka Player):
*
* - **Fast EWMA** (2s half-life): Reacts quickly to bandwidth drops
* - **Slow EWMA** (5s half-life): Provides stability during fluctuations
* - **min(fast, slow)**: Adapts down quickly, up slowly
*
* This naturally provides asymmetric behavior needed for good QoE:
* avoiding stalls (quick downgrade) while preventing oscillation (slow upgrade).
*/
/**
* Default bandwidth estimator configuration.
*
* Values match Shaka Player defaults based on experimentation.
*/
const DEFAULT_BANDWIDTH_CONFIG = {
	fastHalfLife: 2,
	slowHalfLife: 5,
	minTotalBytes: 128e3,
	minBytes: 16e3,
	minDuration: 5
};
/**
* Add a bandwidth sample from a segment download.
*
* Samples are filtered based on:
* - Minimum bytes (filters TTFB-dominated small segments)
* - Minimum duration (filters cached responses)
*
* Valid samples update both fast and slow EWMA estimates.
*
* @param state - Current estimator state
* @param durationMs - Download duration in milliseconds
* @param numBytes - Number of bytes downloaded
* @param config - Optional estimator configuration (uses defaults if not provided)
* @returns New estimator state with sample incorporated (or unchanged if filtered)
*
* @example
* let state = { fastEstimate: 0, fastTotalWeight: 0, ... };
* // Sample: 1MB in 1 second
* state = sampleBandwidth(state, 1000, 1_000_000);
*/
function sampleBandwidth(state, durationMs, numBytes, config = DEFAULT_BANDWIDTH_CONFIG) {
	const updatedBytesSampled = state.bytesSampled + numBytes;
	if (numBytes < config.minBytes) return {
		...state,
		bytesSampled: updatedBytesSampled
	};
	if (durationMs < config.minDuration) return {
		...state,
		bytesSampled: updatedBytesSampled
	};
	const bandwidth = 8e3 * numBytes / durationMs;
	const weight = durationMs / 1e3;
	return {
		fastEstimate: calculateEwma(state.fastEstimate, bandwidth, weight, config.fastHalfLife),
		fastTotalWeight: state.fastTotalWeight + weight,
		slowEstimate: calculateEwma(state.slowEstimate, bandwidth, weight, config.slowHalfLife),
		slowTotalWeight: state.slowTotalWeight + weight,
		bytesSampled: updatedBytesSampled
	};
}
/**
* Get the current bandwidth estimate.
*
* Returns the **minimum** of the fast and slow EWMA estimates.
* This provides the key asymmetric behavior:
* - When bandwidth drops, fast EWMA reacts first and dominates (quick adaptation)
* - When bandwidth rises, slow EWMA lags behind and dominates (slow adaptation)
*
* Uses default estimate until enough data has been sampled.
*
* @param state - Current estimator state
* @param defaultEstimate - Fallback estimate before sufficient samples (bps)
* @param config - Optional estimator configuration (uses defaults if not provided)
* @returns Bandwidth estimate in bits per second
*
* @example
* const estimate = getBandwidthEstimate(state, 5_000_000); // 5 Mbps default
*/
function getBandwidthEstimate(state, defaultEstimate, config = DEFAULT_BANDWIDTH_CONFIG) {
	if (state.bytesSampled < config.minTotalBytes) return defaultEstimate;
	const fastEstimate = applyZeroFactor(state.fastEstimate, state.fastTotalWeight, config.fastHalfLife);
	const slowEstimate = applyZeroFactor(state.slowEstimate, state.slowTotalWeight, config.slowHalfLife);
	return Math.min(fastEstimate, slowEstimate);
}

//#endregion
//#region ../spf/dist/dev/core/buffer/forward-buffer.js
/**
* Default forward buffer configuration.
*/
const DEFAULT_FORWARD_BUFFER_CONFIG = { bufferDuration: 30 };
/**
* Get segments that need to be loaded for forward buffer.
*
* Determines which segments to load to maintain target buffer duration.
* Handles discontiguous buffering (gaps after seeks).
*
* Algorithm:
* 1. Calculate target time: currentTime + bufferDuration
* 2. Find all segments in range [currentTime, targetTime)
* 3. Filter out segments already buffered at that time position
* 4. Return segments to load (fills gaps + extends to target)
*
* @param segments - All available segments from playlist
* @param bufferedSegments - Segments already buffered (ordered by startTime)
* @param currentTime - Current playback position in seconds
* @param config - Optional forward buffer configuration
* @returns Array of segments to load (empty if buffer is sufficient)
*
* @example
* // After seek: buffered [0-12, 18-30], playing at 7s
* const toLoad = getSegmentsToLoad(segments, buffered, 7, { bufferDuration: 24 });
* // Returns [seg-12, seg-30] (fills gap, extends to target 31s)
*/
/**
* Calculate the start time from which to flush forward buffer content.
*
* Content that starts at or beyond `currentTime + bufferDuration` is no
* longer needed for the current playback position and should be removed
* from the SourceBuffer. This prevents unbounded accumulation of scattered
* SourceBuffer content after seeks, which can cause QuotaExceededError on
* long-form content.
*
* Returns `Infinity` when nothing needs flushing (no buffered segments
* exist beyond the threshold).
*
* @param bufferedSegments - Segments currently tracked in the buffer model
* @param currentTime - Current playback position in seconds
* @param config - Optional forward buffer configuration
* @returns Start time to flush from (flush range: [flushStart, Infinity)),
*          or Infinity if no flush is needed
*
* @example
* // Playing at 0s, buffered [0,6,12,18,24,30,36], bufferDuration=30
* const flushStart = calculateForwardFlushPoint(segments, 0);
* // Returns 30 — flush [30, Infinity), keep [0, 30)
*/
function calculateForwardFlushPoint(bufferedSegments, currentTime, config = DEFAULT_FORWARD_BUFFER_CONFIG) {
	if (bufferedSegments.length === 0) return Infinity;
	const threshold = currentTime + config.bufferDuration;
	const beyond = bufferedSegments.filter((seg) => seg.startTime >= threshold);
	if (beyond.length === 0) return Infinity;
	return Math.min(...beyond.map((seg) => seg.startTime));
}
function getSegmentsToLoad(segments, bufferedSegments, currentTime, config = DEFAULT_FORWARD_BUFFER_CONFIG) {
	if (segments.length === 0) return [];
	const targetTime = currentTime + config.bufferDuration;
	const bufferedStartTimes = new Set(bufferedSegments.map((seg) => seg.startTime));
	return segments.filter((seg) => {
		const segmentEnd = seg.startTime + seg.duration;
		const isInRange = seg.startTime < targetTime && segmentEnd > currentTime;
		const isNotBuffered = !bufferedStartTimes.has(seg.startTime);
		return isInRange && isNotBuffered;
	});
}

//#endregion
//#region ../../node_modules/.pnpm/signal-polyfill@0.2.2/node_modules/signal-polyfill/dist/index.js
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField = (obj, key, value) => {
	__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
	return value;
};
var __accessCheck = (obj, member, msg) => {
	if (!member.has(obj)) throw TypeError("Cannot " + msg);
};
var __privateIn = (member, obj) => {
	if (Object(obj) !== obj) throw TypeError("Cannot use the \"in\" operator on this value");
	return member.has(obj);
};
var __privateAdd = (obj, member, value) => {
	if (member.has(obj)) throw TypeError("Cannot add the same private member more than once");
	member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod = (obj, member, method) => {
	__accessCheck(obj, member, "access private method");
	return method;
};
/**
* @license
* Copyright Google LLC All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
function defaultEquals(a, b) {
	return Object.is(a, b);
}
/**
* @license
* Copyright Google LLC All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
let activeConsumer = null;
let inNotificationPhase = false;
let epoch = 1;
const SIGNAL = /* @__PURE__ */ Symbol("SIGNAL");
function setActiveConsumer(consumer) {
	const prev = activeConsumer;
	activeConsumer = consumer;
	return prev;
}
function getActiveConsumer() {
	return activeConsumer;
}
function isInNotificationPhase() {
	return inNotificationPhase;
}
const REACTIVE_NODE = {
	version: 0,
	lastCleanEpoch: 0,
	dirty: false,
	producerNode: void 0,
	producerLastReadVersion: void 0,
	producerIndexOfThis: void 0,
	nextProducerIndex: 0,
	liveConsumerNode: void 0,
	liveConsumerIndexOfThis: void 0,
	consumerAllowSignalWrites: false,
	consumerIsAlwaysLive: false,
	producerMustRecompute: () => false,
	producerRecomputeValue: () => {},
	consumerMarkedDirty: () => {},
	consumerOnSignalRead: () => {}
};
function producerAccessed(node) {
	if (inNotificationPhase) throw new Error(typeof ngDevMode !== "undefined" && ngDevMode ? `Assertion error: signal read during notification phase` : "");
	if (activeConsumer === null) return;
	activeConsumer.consumerOnSignalRead(node);
	const idx = activeConsumer.nextProducerIndex++;
	assertConsumerNode(activeConsumer);
	if (idx < activeConsumer.producerNode.length && activeConsumer.producerNode[idx] !== node) {
		if (consumerIsLive(activeConsumer)) {
			const staleProducer = activeConsumer.producerNode[idx];
			producerRemoveLiveConsumerAtIndex(staleProducer, activeConsumer.producerIndexOfThis[idx]);
		}
	}
	if (activeConsumer.producerNode[idx] !== node) {
		activeConsumer.producerNode[idx] = node;
		activeConsumer.producerIndexOfThis[idx] = consumerIsLive(activeConsumer) ? producerAddLiveConsumer(node, activeConsumer, idx) : 0;
	}
	activeConsumer.producerLastReadVersion[idx] = node.version;
}
function producerIncrementEpoch() {
	epoch++;
}
function producerUpdateValueVersion(node) {
	if (!node.dirty && node.lastCleanEpoch === epoch) return;
	if (!node.producerMustRecompute(node) && !consumerPollProducersForChange(node)) {
		node.dirty = false;
		node.lastCleanEpoch = epoch;
		return;
	}
	node.producerRecomputeValue(node);
	node.dirty = false;
	node.lastCleanEpoch = epoch;
}
function producerNotifyConsumers(node) {
	if (node.liveConsumerNode === void 0) return;
	const prev = inNotificationPhase;
	inNotificationPhase = true;
	try {
		for (const consumer of node.liveConsumerNode) if (!consumer.dirty) consumerMarkDirty(consumer);
	} finally {
		inNotificationPhase = prev;
	}
}
function producerUpdatesAllowed() {
	return (activeConsumer == null ? void 0 : activeConsumer.consumerAllowSignalWrites) !== false;
}
function consumerMarkDirty(node) {
	var _a;
	node.dirty = true;
	producerNotifyConsumers(node);
	(_a = node.consumerMarkedDirty) == null || _a.call(node.wrapper ?? node);
}
function consumerBeforeComputation(node) {
	node && (node.nextProducerIndex = 0);
	return setActiveConsumer(node);
}
function consumerAfterComputation(node, prevConsumer) {
	setActiveConsumer(prevConsumer);
	if (!node || node.producerNode === void 0 || node.producerIndexOfThis === void 0 || node.producerLastReadVersion === void 0) return;
	if (consumerIsLive(node)) for (let i = node.nextProducerIndex; i < node.producerNode.length; i++) producerRemoveLiveConsumerAtIndex(node.producerNode[i], node.producerIndexOfThis[i]);
	while (node.producerNode.length > node.nextProducerIndex) {
		node.producerNode.pop();
		node.producerLastReadVersion.pop();
		node.producerIndexOfThis.pop();
	}
}
function consumerPollProducersForChange(node) {
	assertConsumerNode(node);
	for (let i = 0; i < node.producerNode.length; i++) {
		const producer = node.producerNode[i];
		const seenVersion = node.producerLastReadVersion[i];
		if (seenVersion !== producer.version) return true;
		producerUpdateValueVersion(producer);
		if (seenVersion !== producer.version) return true;
	}
	return false;
}
function producerAddLiveConsumer(node, consumer, indexOfThis) {
	var _a;
	assertProducerNode(node);
	assertConsumerNode(node);
	if (node.liveConsumerNode.length === 0) {
		(_a = node.watched) == null || _a.call(node.wrapper);
		for (let i = 0; i < node.producerNode.length; i++) node.producerIndexOfThis[i] = producerAddLiveConsumer(node.producerNode[i], node, i);
	}
	node.liveConsumerIndexOfThis.push(indexOfThis);
	return node.liveConsumerNode.push(consumer) - 1;
}
function producerRemoveLiveConsumerAtIndex(node, idx) {
	var _a;
	assertProducerNode(node);
	assertConsumerNode(node);
	if (typeof ngDevMode !== "undefined" && ngDevMode && idx >= node.liveConsumerNode.length) throw new Error(`Assertion error: active consumer index ${idx} is out of bounds of ${node.liveConsumerNode.length} consumers)`);
	if (node.liveConsumerNode.length === 1) {
		(_a = node.unwatched) == null || _a.call(node.wrapper);
		for (let i = 0; i < node.producerNode.length; i++) producerRemoveLiveConsumerAtIndex(node.producerNode[i], node.producerIndexOfThis[i]);
	}
	const lastIdx = node.liveConsumerNode.length - 1;
	node.liveConsumerNode[idx] = node.liveConsumerNode[lastIdx];
	node.liveConsumerIndexOfThis[idx] = node.liveConsumerIndexOfThis[lastIdx];
	node.liveConsumerNode.length--;
	node.liveConsumerIndexOfThis.length--;
	if (idx < node.liveConsumerNode.length) {
		const idxProducer = node.liveConsumerIndexOfThis[idx];
		const consumer = node.liveConsumerNode[idx];
		assertConsumerNode(consumer);
		consumer.producerIndexOfThis[idxProducer] = idx;
	}
}
function consumerIsLive(node) {
	var _a;
	return node.consumerIsAlwaysLive || (((_a = node == null ? void 0 : node.liveConsumerNode) == null ? void 0 : _a.length) ?? 0) > 0;
}
function assertConsumerNode(node) {
	node.producerNode ?? (node.producerNode = []);
	node.producerIndexOfThis ?? (node.producerIndexOfThis = []);
	node.producerLastReadVersion ?? (node.producerLastReadVersion = []);
}
function assertProducerNode(node) {
	node.liveConsumerNode ?? (node.liveConsumerNode = []);
	node.liveConsumerIndexOfThis ?? (node.liveConsumerIndexOfThis = []);
}
/**
* @license
* Copyright Google LLC All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
function computedGet(node) {
	producerUpdateValueVersion(node);
	producerAccessed(node);
	if (node.value === ERRORED) throw node.error;
	return node.value;
}
function createComputed(computation) {
	const node = Object.create(COMPUTED_NODE);
	node.computation = computation;
	const computed = () => computedGet(node);
	computed[SIGNAL] = node;
	return computed;
}
const UNSET = /* @__PURE__ */ Symbol("UNSET");
const COMPUTING = /* @__PURE__ */ Symbol("COMPUTING");
const ERRORED = /* @__PURE__ */ Symbol("ERRORED");
const COMPUTED_NODE = {
	...REACTIVE_NODE,
	value: UNSET,
	dirty: true,
	error: null,
	equal: defaultEquals,
	producerMustRecompute(node) {
		return node.value === UNSET || node.value === COMPUTING;
	},
	producerRecomputeValue(node) {
		if (node.value === COMPUTING) throw new Error("Detected cycle in computations.");
		const oldValue = node.value;
		node.value = COMPUTING;
		const prevConsumer = consumerBeforeComputation(node);
		let newValue;
		let wasEqual = false;
		try {
			newValue = node.computation.call(node.wrapper);
			wasEqual = oldValue !== UNSET && oldValue !== ERRORED && node.equal.call(node.wrapper, oldValue, newValue);
		} catch (err) {
			newValue = ERRORED;
			node.error = err;
		} finally {
			consumerAfterComputation(node, prevConsumer);
		}
		if (wasEqual) {
			node.value = oldValue;
			return;
		}
		node.value = newValue;
		node.version++;
	}
};
/**
* @license
* Copyright Google LLC All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
function defaultThrowError() {
	throw new Error();
}
let throwInvalidWriteToSignalErrorFn = defaultThrowError;
function throwInvalidWriteToSignalError() {
	throwInvalidWriteToSignalErrorFn();
}
/**
* @license
* Copyright Google LLC All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
function createSignal(initialValue) {
	const node = Object.create(SIGNAL_NODE);
	node.value = initialValue;
	const getter = () => {
		producerAccessed(node);
		return node.value;
	};
	getter[SIGNAL] = node;
	return getter;
}
function signalGetFn() {
	producerAccessed(this);
	return this.value;
}
function signalSetFn(node, newValue) {
	if (!producerUpdatesAllowed()) throwInvalidWriteToSignalError();
	if (!node.equal.call(node.wrapper, node.value, newValue)) {
		node.value = newValue;
		signalValueChanged(node);
	}
}
const SIGNAL_NODE = {
	...REACTIVE_NODE,
	equal: defaultEquals,
	value: void 0
};
function signalValueChanged(node) {
	node.version++;
	producerIncrementEpoch();
	producerNotifyConsumers(node);
}
/**
* @license
* Copyright 2024 Bloomberg Finance L.P.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const NODE = Symbol("node");
var Signal;
((Signal2) => {
	var _a, _brand, _b, _brand2;
	class State {
		constructor(initialValue, options = {}) {
			__privateAdd(this, _brand);
			__publicField(this, _a);
			const node = createSignal(initialValue)[SIGNAL];
			this[NODE] = node;
			node.wrapper = this;
			if (options) {
				const equals = options.equals;
				if (equals) node.equal = equals;
				node.watched = options[Signal2.subtle.watched];
				node.unwatched = options[Signal2.subtle.unwatched];
			}
		}
		get() {
			if (!(0, Signal2.isState)(this)) throw new TypeError("Wrong receiver type for Signal.State.prototype.get");
			return signalGetFn.call(this[NODE]);
		}
		set(newValue) {
			if (!(0, Signal2.isState)(this)) throw new TypeError("Wrong receiver type for Signal.State.prototype.set");
			if (isInNotificationPhase()) throw new Error("Writes to signals not permitted during Watcher callback");
			const ref = this[NODE];
			signalSetFn(ref, newValue);
		}
	}
	_a = NODE;
	_brand = /* @__PURE__ */ new WeakSet();
	Signal2.isState = (s) => typeof s === "object" && __privateIn(_brand, s);
	Signal2.State = State;
	class Computed {
		constructor(computation, options) {
			__privateAdd(this, _brand2);
			__publicField(this, _b);
			const node = createComputed(computation)[SIGNAL];
			node.consumerAllowSignalWrites = true;
			this[NODE] = node;
			node.wrapper = this;
			if (options) {
				const equals = options.equals;
				if (equals) node.equal = equals;
				node.watched = options[Signal2.subtle.watched];
				node.unwatched = options[Signal2.subtle.unwatched];
			}
		}
		get() {
			if (!(0, Signal2.isComputed)(this)) throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");
			return computedGet(this[NODE]);
		}
	}
	_b = NODE;
	_brand2 = /* @__PURE__ */ new WeakSet();
	Signal2.isComputed = (c) => typeof c === "object" && __privateIn(_brand2, c);
	Signal2.Computed = Computed;
	((subtle2) => {
		var _a2, _brand3, _assertSignals, assertSignals_fn;
		function untrack(cb) {
			let output;
			let prevActiveConsumer = null;
			try {
				prevActiveConsumer = setActiveConsumer(null);
				output = cb();
			} finally {
				setActiveConsumer(prevActiveConsumer);
			}
			return output;
		}
		subtle2.untrack = untrack;
		function introspectSources(sink) {
			var _a3;
			if (!(0, Signal2.isComputed)(sink) && !(0, Signal2.isWatcher)(sink)) throw new TypeError("Called introspectSources without a Computed or Watcher argument");
			return ((_a3 = sink[NODE].producerNode) == null ? void 0 : _a3.map((n) => n.wrapper)) ?? [];
		}
		subtle2.introspectSources = introspectSources;
		function introspectSinks(signal) {
			var _a3;
			if (!(0, Signal2.isComputed)(signal) && !(0, Signal2.isState)(signal)) throw new TypeError("Called introspectSinks without a Signal argument");
			return ((_a3 = signal[NODE].liveConsumerNode) == null ? void 0 : _a3.map((n) => n.wrapper)) ?? [];
		}
		subtle2.introspectSinks = introspectSinks;
		function hasSinks(signal) {
			if (!(0, Signal2.isComputed)(signal) && !(0, Signal2.isState)(signal)) throw new TypeError("Called hasSinks without a Signal argument");
			const liveConsumerNode = signal[NODE].liveConsumerNode;
			if (!liveConsumerNode) return false;
			return liveConsumerNode.length > 0;
		}
		subtle2.hasSinks = hasSinks;
		function hasSources(signal) {
			if (!(0, Signal2.isComputed)(signal) && !(0, Signal2.isWatcher)(signal)) throw new TypeError("Called hasSources without a Computed or Watcher argument");
			const producerNode = signal[NODE].producerNode;
			if (!producerNode) return false;
			return producerNode.length > 0;
		}
		subtle2.hasSources = hasSources;
		class Watcher {
			constructor(notify) {
				__privateAdd(this, _brand3);
				__privateAdd(this, _assertSignals);
				__publicField(this, _a2);
				let node = Object.create(REACTIVE_NODE);
				node.wrapper = this;
				node.consumerMarkedDirty = notify;
				node.consumerIsAlwaysLive = true;
				node.consumerAllowSignalWrites = false;
				node.producerNode = [];
				this[NODE] = node;
			}
			watch(...signals) {
				if (!(0, Signal2.isWatcher)(this)) throw new TypeError("Called unwatch without Watcher receiver");
				__privateMethod(this, _assertSignals, assertSignals_fn).call(this, signals);
				const node = this[NODE];
				node.dirty = false;
				const prev = setActiveConsumer(node);
				for (const signal of signals) producerAccessed(signal[NODE]);
				setActiveConsumer(prev);
			}
			unwatch(...signals) {
				if (!(0, Signal2.isWatcher)(this)) throw new TypeError("Called unwatch without Watcher receiver");
				__privateMethod(this, _assertSignals, assertSignals_fn).call(this, signals);
				const node = this[NODE];
				assertConsumerNode(node);
				for (let i = node.producerNode.length - 1; i >= 0; i--) if (signals.includes(node.producerNode[i].wrapper)) {
					producerRemoveLiveConsumerAtIndex(node.producerNode[i], node.producerIndexOfThis[i]);
					const lastIdx = node.producerNode.length - 1;
					node.producerNode[i] = node.producerNode[lastIdx];
					node.producerIndexOfThis[i] = node.producerIndexOfThis[lastIdx];
					node.producerNode.length--;
					node.producerIndexOfThis.length--;
					node.nextProducerIndex--;
					if (i < node.producerNode.length) {
						const idxConsumer = node.producerIndexOfThis[i];
						const producer = node.producerNode[i];
						assertProducerNode(producer);
						producer.liveConsumerIndexOfThis[idxConsumer] = i;
					}
				}
			}
			getPending() {
				if (!(0, Signal2.isWatcher)(this)) throw new TypeError("Called getPending without Watcher receiver");
				return this[NODE].producerNode.filter((n) => n.dirty).map((n) => n.wrapper);
			}
		}
		_a2 = NODE;
		_brand3 = /* @__PURE__ */ new WeakSet();
		_assertSignals = /* @__PURE__ */ new WeakSet();
		assertSignals_fn = function(signals) {
			for (const signal of signals) if (!(0, Signal2.isComputed)(signal) && !(0, Signal2.isState)(signal)) throw new TypeError("Called watch/unwatch without a Computed or State argument");
		};
		Signal2.isWatcher = (w) => __privateIn(_brand3, w);
		subtle2.Watcher = Watcher;
		function currentComputed() {
			var _a3;
			return (_a3 = getActiveConsumer()) == null ? void 0 : _a3.wrapper;
		}
		subtle2.currentComputed = currentComputed;
		subtle2.watched = Symbol("watched");
		subtle2.unwatched = Symbol("unwatched");
	})(Signal2.subtle || (Signal2.subtle = {}));
})(Signal || (Signal = {}));

//#endregion
//#region ../spf/dist/dev/core/signals/effect.js
const pending = /* @__PURE__ */ new Set();
const watcher = new Signal.subtle.Watcher(() => {
	queueMicrotask(runPending);
});
function runPending() {
	for (const c of watcher.getPending()) pending.add(c);
	watcher.watch();
	for (const c of pending) {
		pending.delete(c);
		c.get();
	}
}
/**
* Run a side effect whenever its signal dependencies change.
*
* Executes immediately (synchronous initial run), then re-runs on the next
* microtask after any dependency changes. If the callback returns a function,
* it is called before each re-run and when the effect is stopped — the same
* cleanup contract as Preact Signals, Maverick Signals, and Svelte 5 $effect.
*
* Returns a cleanup function that stops the effect.
*/
function effect(fn) {
	let cleanup;
	const c = new Signal.Computed(() => {
		if (typeof cleanup === "function") cleanup();
		cleanup = fn();
	});
	watcher.watch(c);
	c.get();
	return () => {
		watcher.unwatch(c);
		if (typeof cleanup === "function") cleanup();
	};
}

//#endregion
//#region ../spf/dist/dev/core/signals/primitives.js
/** Read a signal value without tracking it as a dependency. */
const untrack = Signal.subtle.untrack;
/** Create a writable reactive value. */
function signal(initialValue, options) {
	return new Signal.State(initialValue, options);
}
/** Create a computed reactive value. */
function computed(fn, options) {
	return new Signal.Computed(fn, options);
}
/**
* Update a writable signal. Accepts either a partial object to merge into the
* current state, or an updater function that receives the current state and
* returns the next state.
*
* @example
* update(state, { playbackRate: 2 });
* update(state, (s) => ({ ...s, count: s.count + 1 }));
*/
function update(signal, updater) {
	const current = untrack(() => signal.get());
	signal.set(typeof updater === "function" ? updater(current) : {
		...current,
		...updater
	});
}

//#endregion
//#region ../spf/dist/dev/core/types/index.js
function isResolvedTrack(track) {
	return "segments" in track;
}
/**
* Check if a presentation has duration (at least one track resolved).
* Narrows type to include required duration.
*/
function hasPresentationDuration(presentation) {
	return presentation.duration !== void 0;
}

//#endregion
//#region ../spf/dist/dev/core/utils/track-selection.js
/**
* Map track type to selected track ID property key in state.
*/
const SelectedTrackIdKeyByType = {
	video: "selectedVideoTrackId",
	audio: "selectedAudioTrackId",
	text: "selectedTextTrackId"
};
/**
* Map track type to buffer owner property key.
* Used for SourceBuffer references in owners.
*/
const BufferKeyByType = {
	video: "videoBuffer",
	audio: "audioBuffer"
};
/**
* Get selected track from state by type.
* Returns properly typed track (partially or fully resolved) or undefined.
* Type parameter T is inferred from the type argument.
*
* @example
* const videoTrack = getSelectedTrack(state, 'video');
* if (videoTrack && isResolvedTrack(videoTrack)) {
*   // videoTrack is VideoTrack
* }
*/
function getSelectedTrack(state, type) {
	const { presentation } = state;
	/** @TODO Consider moving and reusing isUnresolved(presentation) (CJP) */
	if (!presentation || !("id" in presentation)) return void 0;
	const trackId = state[SelectedTrackIdKeyByType[type]];
	return presentation.selectionSets.find(({ type: selectionSetType }) => selectionSetType === type)?.switchingSets[0]?.tracks.find(({ id }) => id === trackId);
}

//#endregion
//#region ../spf/dist/dev/dom/network/chunked-stream-iterable.js
const DEFAULT_MIN_CHUNK_SIZE = 2 ** 17;
/**
* Adapts a `ReadableStream<Uint8Array>` (e.g. `response.body`) into an
* `AsyncIterable<Uint8Array>` that yields chunks no smaller than
* `minChunkSize` bytes. Smaller network chunks are accumulated and yielded
* together once the threshold is met. Any remainder is flushed on stream end.
*
* Errors from the underlying stream propagate naturally — the reader lock is
* always released via `finally`.
*/
var ChunkedStreamIterable = class {
	minChunkSize;
	#readableStream;
	constructor(readableStream, { minChunkSize = DEFAULT_MIN_CHUNK_SIZE } = {}) {
		this.#readableStream = readableStream;
		this.minChunkSize = minChunkSize;
	}
	async *[Symbol.asyncIterator]() {
		let pending;
		const reader = this.#readableStream.getReader();
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) {
					if (pending) yield pending;
					break;
				}
				pending = pending ? concat(pending, value) : value;
				if (pending.length >= this.minChunkSize) {
					yield pending;
					pending = void 0;
				}
			}
		} finally {
			reader.releaseLock();
		}
	}
};
function concat(a, b) {
	const result = new Uint8Array(a.length + b.length);
	result.set(a);
	result.set(b, a.length);
	return result;
}

//#endregion
//#region ../spf/dist/dev/dom/network/fetch.js
/**
* Fetch resolvable from AddressableObject.
*
* Handles byte range requests if byteRange is present.
* Returns native fetch Response for composability (can extract text, stream, etc.).
*
* @param addressable - Resource to fetch (url + optional byteRange)
* @returns Promise resolving to Response
*
* @example
* const response = await fetchResolvable({ url: 'https://example.com/segment.m4s' });
* const text = await getResponseText(response);
*
* @example
* // With byte range
* const response = await fetchResolvable({
*   url: 'https://example.com/file.mp4',
*   byteRange: { start: 1000, end: 1999 }
* });
*/
async function fetchResolvable(addressable, options) {
	const headers = new Headers(options?.headers);
	if (addressable.byteRange) {
		const { start, end } = addressable.byteRange;
		headers.set("Range", `bytes=${start}-${end}`);
	}
	const request = new Request(addressable.url, {
		method: "GET",
		headers,
		...options
	});
	return fetch(request);
}
/**
* Extract text from Response.
*
* Accepts minimal Response-like object (just needs text() method).
* Returns promise from response.text().
*
* @param response - Response-like object with text() method
* @returns Promise resolving to text content
*
* @example
* const response = await fetchResolvable(addressable);
* const text = await getResponseText(response);
*/
function getResponseText(response) {
	return response.text();
}

//#endregion
//#region ../spf/dist/dev/core/buffer/back-buffer.js
/**
* Default back buffer configuration.
*/
const DEFAULT_BACK_BUFFER_CONFIG = { keepSegments: 2 };
/**
* Calculate back buffer flush point.
*
* Determines where to flush old segments from the back buffer.
* Keeps a fixed number of segments behind the current playback position.
*
* Algorithm:
* 1. Find segments before currentTime
* 2. Count back N segments (keepSegments)
* 3. Return startTime of segment N+1 back (flush everything before this)
*
* @param segments - Available segments (should be sorted by startTime)
* @param currentTime - Current playback position in seconds
* @param config - Optional back buffer configuration
* @returns Time in seconds to flush up to (flush range: [0, flushEnd))
*
* @example
* const segments = [
*   { startTime: 0, duration: 6, ... },
*   { startTime: 6, duration: 6, ... },
*   { startTime: 12, duration: 6, ... },
*   { startTime: 18, duration: 6, ... },
* ];
*
* // Playing at 18s, keep 2 segments
* const flushEnd = calculateBackBufferFlushPoint(segments, 18);
* // Returns 6 (flush [0, 6), keep [6-18))
*/
function calculateBackBufferFlushPoint(segments, currentTime, config = DEFAULT_BACK_BUFFER_CONFIG) {
	if (segments.length === 0) return 0;
	const segmentsBefore = segments.filter((seg) => seg.startTime < currentTime);
	if (segmentsBefore.length === 0) return 0;
	const segmentsToFlush = segmentsBefore.length - config.keepSegments;
	if (segmentsToFlush <= 0) return 0;
	if (segmentsToFlush >= segmentsBefore.length) return currentTime;
	return segmentsBefore[segmentsToFlush].startTime;
}

//#endregion
//#region ../spf/dist/dev/core/machine.js
/**
* Provisions the shared mechanics for all machine-like primitives: a snapshot
* signal, an untracked state reader, and a transition function.
*
* Internal — consumed by `createMachineActor` and `createMachineReactor`. Not part of the
* public API.
*/
function createMachineCore(initialSnapshot) {
	const snapshotSignal = signal(initialSnapshot);
	const getState = () => untrack(() => snapshotSignal.get().value);
	const transition = (to) => update(snapshotSignal, (current) => ({
		...current,
		value: to
	}));
	return {
		snapshotSignal,
		getState,
		transition
	};
}

//#endregion
//#region ../spf/dist/dev/core/create-machine-actor.js
/**
* Creates a message-driven actor from a declarative definition.
*
* The actor owns a reactive snapshot signal (state + context), an optional
* runner, and dispatches incoming messages to per-state handlers. `'destroyed'`
* is always the implicit terminal state — `destroy()` transitions there
* unconditionally and all subsequent `send()` calls are no-ops.
*
* When a state declares `onSettled`, the framework calls `runner.whenSettled()`
* after the handler returns. The runner owns the generation-token logic — if
* new tasks are scheduled before the current batch settles, the callback is
* automatically superseded.
*
* @example
* const actor = createMachineActor({
*   runner: () => new SerialRunner(),
*   initial: 'idle',
*   context: {},
*   states: {
*     idle: {
*       on: {
*         load: (msg, { transition, runner }) => {
*           segments.forEach(s => runner.schedule(new Task(...)));
*           transition('loading');
*         }
*       }
*     },
*     loading: {
*       onSettled: 'idle',
*       on: {
*         load: (msg, { runner }) => {
*           runner.abortAll();
*           segments.forEach(s => runner.schedule(new Task(...)));
*         }
*       }
*     }
*   }
* });
*/
function createMachineActor(def) {
	const runner = def.runner?.();
	const { snapshotSignal, getState, transition } = createMachineCore({
		value: def.initial,
		context: def.context
	});
	const getContext = () => untrack(() => snapshotSignal.get().context);
	const setContext = (context) => {
		update(snapshotSignal, { context });
	};
	return {
		get snapshot() {
			return snapshotSignal;
		},
		send(message) {
			const state = getState();
			if (state === "destroyed") return;
			const handler = def.states[state]?.on?.[message.type];
			if (!handler) return;
			handler(message, {
				context: getContext(),
				getContext,
				transition: (to) => transition(to),
				setContext,
				...runner ? { runner } : {}
			});
			const newState = getState();
			if (newState !== "destroyed") {
				const newStateDef = def.states[newState];
				if (newStateDef?.onSettled && runner) {
					const targetState = newStateDef.onSettled;
					runner.whenSettled(() => {
						if (getState() !== newState) return;
						transition(targetState);
					});
				}
			}
		},
		destroy() {
			if (getState() === "destroyed") return;
			runner?.destroy();
			transition("destroyed");
		}
	};
}

//#endregion
//#region ../spf/dist/dev/core/utils/generate-id.js
/**
* Generate unique ID for HAM objects.
*
* Uses timestamp + random number for sufficient uniqueness.
* IDs are strings without decimals.
*
* @returns Unique string ID in format: timestamp-random
*
* @example
* ```ts
* const id = generateId();  // "1738423156789-542891"
* ```
*/
function generateId() {
	return `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

//#endregion
//#region ../spf/dist/dev/core/task.js
/**
* Generic reusable task that wraps an async run function.
*
* Owns its own AbortController so it can always be aborted independently.
* Optionally composes an external AbortSignal so that a parent's cancellation
* propagates into the task's work without requiring the caller to track the
* task separately.
*
* Ordering guarantee: `value` is written before `status` transitions to `'done'`;
* `error` is written before `status` transitions to `'error'`. Any reader
* observing `status === 'done'` is guaranteed `value` is already present.
*/
var Task = class {
	id;
	#runFn;
	#abortController = new AbortController();
	#signal;
	#status = "pending";
	#value = void 0;
	#error = void 0;
	constructor(runFn, config) {
		this.#runFn = runFn;
		const rawId = config?.id;
		this.id = typeof rawId === "function" ? rawId() : rawId ?? generateId();
		this.#signal = config?.signal ? anyAbortSignal([this.#abortController.signal, config.signal]) : this.#abortController.signal;
	}
	get status() {
		return this.#status;
	}
	get value() {
		return this.#value;
	}
	get error() {
		return this.#error;
	}
	async run() {
		this.#status = "running";
		try {
			const result = await this.#runFn(this.#signal);
			this.#value = result;
			this.#status = "done";
			return result;
		} catch (e) {
			this.#error = e;
			this.#status = "error";
			throw e;
		}
	}
	abort() {
		this.#abortController.abort();
	}
};
/**
* Runs tasks concurrently, deduplicated by task id.
*
* If a task with a given id is already in flight, subsequent schedule() calls
* for that id are silently ignored until the first completes. Tasks are stored
* so abortAll() can cancel any in-flight work (e.g. on engine cleanup).
*/
var ConcurrentRunner = class {
	#pending = /* @__PURE__ */ new Map();
	#settled = Promise.resolve();
	#resolveSettled = null;
	#destroyed = false;
	schedule(task) {
		if (this.#destroyed) return Promise.resolve();
		const existing = this.#pending.get(task.id);
		if (existing) return existing.promise;
		if (this.#pending.size === 0) this.#settled = new Promise((resolve) => {
			this.#resolveSettled = resolve;
		});
		const promise = task.run();
		promise.catch(() => {});
		const cleanup = () => {
			this.#pending.delete(task.id);
			if (this.#pending.size === 0) {
				this.#resolveSettled?.();
				this.#resolveSettled = null;
			}
		};
		promise.then(cleanup, cleanup);
		this.#pending.set(task.id, {
			task,
			promise
		});
		return promise;
	}
	/**
	* Registers a callback to fire when all currently in-flight tasks settle.
	* If the runner is already idle, the callback is never called. If abortAll()
	* is called before the batch settles, the callback is superseded and silently
	* dropped — no stale callbacks, no generation token required by the caller.
	*/
	whenSettled(callback) {
		if (this.#pending.size === 0) return;
		const captured = this.#settled;
		captured.then(() => {
			if (this.#settled !== captured) return;
			callback();
		}, () => {});
	}
	abortAll() {
		for (const { task } of this.#pending.values()) task.abort();
		this.#pending.clear();
		this.#resolveSettled?.();
		this.#resolveSettled = null;
		this.#settled = Promise.resolve();
	}
	destroy() {
		this.#destroyed = true;
		this.abortAll();
	}
};
/**
* Runs tasks one at a time in submission order.
*
* Each schedule() call returns a Promise that resolves or rejects with the
* task's result when it is eventually executed. Tasks wait in queue until the
* prior task completes.
*
* Serialization is achieved by chaining each task's run() onto the tail of a
* shared promise chain — no explicit queue or drain loop needed.
*
* abortAll() aborts all pending (not yet started) tasks and the currently
* in-flight task. Pending tasks still run briefly but receive an aborted
* signal and are expected to exit early.
*/
var SerialRunner = class {
	#chain = Promise.resolve();
	#pending = /* @__PURE__ */ new Set();
	#current = null;
	#destroyed = false;
	schedule(task) {
		if (this.#destroyed) return Promise.resolve();
		const t = task;
		this.#pending.add(t);
		const result = this.#chain.then(() => {
			this.#pending.delete(t);
			this.#current = t;
			return task.run();
		}).finally(() => {
			this.#current = null;
		});
		this.#chain = result.then(() => {}, () => {});
		return result;
	}
	/**
	* A promise that resolves when all currently-scheduled tasks have settled.
	* Use the reference as a generation token: capture it after scheduling a
	* batch, then check identity in the resolution callback to detect whether
	* a subsequent abortAll() + new batch has superseded this one.
	*/
	get settled() {
		return this.#chain;
	}
	/**
	* Registers a callback to fire when all currently-pending tasks settle.
	* If the runner is already idle (no pending or running tasks), the callback
	* is never called. If new tasks are scheduled before the current batch
	* settles, the callback is superseded and silently dropped — no stale
	* callbacks, no generation token required by the caller.
	*/
	whenSettled(callback) {
		if (this.#pending.size === 0 && this.#current === null) return;
		const currentChain = this.#chain;
		currentChain.then(() => {
			if (this.#chain !== currentChain) return;
			callback();
		}, () => {});
	}
	/** Aborts and clears queued tasks without touching the in-flight task. */
	abortPending() {
		for (const task of this.#pending) task.abort();
		this.#pending.clear();
	}
	abortAll() {
		this.abortPending();
		this.#current?.abort();
	}
	destroy() {
		this.#destroyed = true;
		this.abortAll();
	}
};

//#endregion
//#region ../spf/dist/dev/dom/features/segment-loader-actor.js
/**
* Resolves when the SourceBufferActor snapshot reaches 'idle'.
* Rejects if the signal is aborted or the actor is destroyed.
*
* Used to sequence SourceBufferActor operations without awaiting send()
* directly — send() is fire-and-forget; callers observe completion via
* state transition.
*/
function waitForIdle(snapshot, signal) {
	return new Promise((resolve, reject) => {
		if (snapshot.get().value === "idle") {
			resolve();
			return;
		}
		if (snapshot.get().value === "destroyed") {
			reject(new DOMException("Aborted", "AbortError"));
			return;
		}
		if (signal.aborted) {
			reject(signal.reason);
			return;
		}
		let stop;
		const cleanup = (fn) => {
			stop?.();
			signal.removeEventListener("abort", onAbort);
			fn();
		};
		const onAbort = () => cleanup(() => reject(signal.reason));
		stop = effect(() => {
			const value = snapshot.get().value;
			if (value === "idle") cleanup(resolve);
			else if (value === "destroyed") cleanup(() => reject(new DOMException("Aborted", "AbortError")));
		});
		signal.addEventListener("abort", onAbort, { once: true });
	});
}
/**
* Wraps a LoadTask descriptor into a Task that fetches (if needed) and
* forwards to SourceBufferActor. Updates in-flight context around async
* operations so the loading handler can make accurate continue/preempt
* decisions at any point.
*/
function makeLoadTask(op, { getContext, setContext, fetchBytes, sourceBufferActor }) {
	return new Task(async (taskSignal) => {
		if (taskSignal.aborted) return;
		if (op.type === "remove") {
			sourceBufferActor.send(op);
			await waitForIdle(sourceBufferActor.snapshot, taskSignal);
			return;
		}
		if (op.type === "append-init") {
			setContext({
				...getContext(),
				inFlightInitTrackId: op.meta.trackId
			});
			try {
				const data = await fetchBytes(op, {
					signal: taskSignal,
					minChunkSize: Infinity
				});
				if (!taskSignal.aborted) {
					sourceBufferActor.send({
						type: "append-init",
						data,
						meta: op.meta
					});
					await waitForIdle(sourceBufferActor.snapshot, taskSignal);
				}
			} finally {
				setContext({
					...getContext(),
					inFlightInitTrackId: null
				});
			}
			return;
		}
		setContext({
			...getContext(),
			inFlightSegmentId: op.meta.id
		});
		try {
			const stream = await fetchBytes(op, { signal: taskSignal });
			if (!taskSignal.aborted) {
				sourceBufferActor.send({
					type: "append-segment",
					data: stream,
					meta: op.meta
				});
				await waitForIdle(sourceBufferActor.snapshot, taskSignal);
			}
		} finally {
			setContext({
				...getContext(),
				inFlightSegmentId: null
			});
		}
	});
}
/**
* Creates a SegmentLoaderActor for one track type (video or audio).
*
* Receives load assignments via `send()` and owns all execution: planning,
* removes, fetches, and appends. Coordinates with the SourceBufferActor for
* all physical SourceBuffer operations.
*
* Planning (Cases 1–3) happens in the `load` handler on every incoming
* message, producing an ordered LoadTask list. The runner drains that list
* sequentially via SerialRunner. When a new message arrives mid-run, the
* handler replans and either continues the in-flight operation (abortPending
* + schedule new remainder) or preempts it (abortAll + cancel SourceBuffer
* if needed + schedule new plan).
*
* @param sourceBufferActor - Shared SourceBufferActor reference (not owned)
* @param fetchBytes - Tracked fetch closure (owns throughput sampling for segments).
*   Accepts an optional `minChunkSize` in options; init segments pass `Infinity`
*   so the entire body accumulates as one chunk before appending.
*/
function createSegmentLoaderActor(sourceBufferActor, fetchBytes) {
	const getBufferedSegments = (allSegments) => {
		const bufferedIds = new Set(sourceBufferActor.snapshot.get().context.segments.filter((s) => !s.partial).map((s) => s.id));
		return allSegments.filter((s) => bufferedIds.has(s.id));
	};
	/**
	* Translate a load message into an ordered LoadTask list based on committed
	* actor state. In-flight awareness is handled separately in the load handler.
	*
	* @todo Rename alongside LoadTask (e.g. planOps).
	*
	* Case 1 — Removes: forward and back buffer flush points, segment-aligned.
	*   No flush on track switch: appending new content overwrites existing buffer
	*   ranges, and the actor's time-aligned deduplication keeps the segment model
	*   accurate as new segments arrive.
	*
	* Case 2 — Init: schedule if not yet committed for this track.
	*
	* Case 3 — Segments: all segments in the load window not yet committed.
	*/
	const planTasks = (message) => {
		const { track, range } = message;
		const actorCtx = sourceBufferActor.snapshot.get().context;
		const bufferedSegments = getBufferedSegments(track.segments);
		const currentTime = range?.start ?? 0;
		const tasks = [];
		if (range) {
			const forwardFlushStart = calculateForwardFlushPoint(bufferedSegments, currentTime);
			if (forwardFlushStart < Infinity) tasks.push({
				type: "remove",
				start: forwardFlushStart,
				end: Infinity
			});
			const backFlushEnd = calculateBackBufferFlushPoint(bufferedSegments, currentTime);
			if (backFlushEnd > 0) tasks.push({
				type: "remove",
				start: 0,
				end: backFlushEnd
			});
		}
		if (actorCtx.initTrackId !== track.id) tasks.push({
			type: "append-init",
			meta: { trackId: track.id },
			url: track.initialization.url,
			...track.initialization.byteRange !== void 0 && { byteRange: track.initialization.byteRange }
		});
		if (range) {
			const EPSILON = 1e-4;
			const segmentsToLoad = getSegmentsToLoad(track.segments, bufferedSegments, currentTime).filter((seg) => {
				const existing = actorCtx.segments.find((s) => Math.abs(s.startTime - seg.startTime) < EPSILON);
				if (existing?.partial) return true;
				if (!existing?.trackBandwidth || !track.bandwidth) return true;
				return track.bandwidth > existing.trackBandwidth;
			});
			for (const segment of segmentsToLoad) tasks.push({
				type: "append-segment",
				meta: {
					id: segment.id,
					startTime: segment.startTime,
					duration: segment.duration,
					trackId: track.id,
					trackBandwidth: track.bandwidth
				},
				url: segment.url,
				...segment.byteRange !== void 0 && { byteRange: segment.byteRange }
			});
		}
		return tasks;
	};
	const scheduleAll = (tasks, { getContext, setContext, runner }) => {
		tasks.forEach((op) => {
			runner.schedule(makeLoadTask(op, {
				getContext,
				setContext,
				fetchBytes,
				sourceBufferActor
			})).then(void 0, (e) => {
				if (e instanceof Error && e.name === "AbortError") return;
				console.error("Unexpected error in segment loader:", e);
				runner.abortPending();
			});
		});
	};
	return createMachineActor({
		runner: () => new SerialRunner(),
		initial: "idle",
		context: {
			inFlightInitTrackId: null,
			inFlightSegmentId: null
		},
		states: {
			idle: { on: { load: (msg, ctx) => {
				const allTasks = planTasks(msg);
				if (allTasks.length === 0) return;
				ctx.transition("loading");
				scheduleAll(allTasks, ctx);
			} } },
			loading: {
				onSettled: "idle",
				on: { load: (msg, ctx) => {
					const { context, runner } = ctx;
					const allTasks = planTasks(msg);
					if (context.inFlightSegmentId !== null && allTasks.some((t) => t.type === "append-segment" && t.meta.id === context.inFlightSegmentId) || context.inFlightInitTrackId !== null && allTasks.some((t) => t.type === "append-init" && t.meta.trackId === context.inFlightInitTrackId)) {
						runner.abortPending();
						scheduleAll(allTasks.filter((t) => !(t.type === "append-segment" && t.meta.id === context.inFlightSegmentId) && !(t.type === "append-init" && t.meta.trackId === context.inFlightInitTrackId)), ctx);
					} else {
						runner.abortAll();
						if (context.inFlightSegmentId !== null || context.inFlightInitTrackId !== null && allTasks.some((t) => t.type === "append-init" && t.meta.trackId !== context.inFlightInitTrackId)) sourceBufferActor.send({ type: "cancel" });
						scheduleAll(allTasks, ctx);
					}
				} }
			}
		}
	});
}

//#endregion
//#region ../spf/dist/dev/dom/features/load-segments.js
const ActorKeyByType$1 = {
	video: "videoBufferActor",
	audio: "audioBufferActor"
};
function createTrackedFetch(throughput, onSample) {
	return async (addressable, options) => {
		const { minChunkSize, ...fetchOptions } = options ?? {};
		const response = await fetchResolvable(addressable, fetchOptions);
		if (!response.body) throw new Error("Response has no body");
		const body = response.body;
		return { [Symbol.asyncIterator]: async function* () {
			let chunkStart = performance.now();
			for await (const chunk of new ChunkedStreamIterable(body, ...minChunkSize !== void 0 ? [{ minChunkSize }] : [])) {
				const elapsed = performance.now() - chunkStart;
				const next = sampleBandwidth(throughput.get(), elapsed, chunk.byteLength);
				throughput.set(next);
				onSample?.(next);
				yield chunk;
				chunkStart = performance.now();
			}
		} };
	};
}
/**
* Non-tracking fetch: eagerly starts the request and returns the response body
* as a lazy chunk iterable. Used for audio tracks which don't sample bandwidth.
* Pass `minChunkSize: Infinity` to accumulate the full body as a single chunk
* (equivalent to arrayBuffer() but through the same streaming path).
*/
async function fetchStream(addressable, options) {
	const { minChunkSize, ...fetchOptions } = options ?? {};
	const response = await fetchResolvable(addressable, fetchOptions);
	if (!response.body) throw new Error("Response has no body");
	return new ChunkedStreamIterable(response.body, ...minChunkSize !== void 0 ? [{ minChunkSize }] : []);
}
function selectLoadingInputs([segmentsCanLoad, state], type) {
	const { playbackInitiated, preload, currentTime } = state;
	return {
		playbackInitiated,
		preload,
		currentTime,
		track: getSelectedTrack(state, type),
		segmentsCanLoad
	};
}
/**
* Equality function encoding the condition hierarchy for relevant changes.
*
* Pre-play (!playbackInitiated):
*   Only preload changes matter. currentTime and resolvedTrackId are ignored
*   (track changes not supported pre-play; currentTime value is used at
*   trigger time but changes don't re-trigger).
*
* playbackInitiated transition:
*   Always fires (handled in the subscriber; preload='auto' suppression
*   applied there since equality functions have no memory of prior values).
*
* Post-play (playbackInitiated):
*   resolvedTrackId changes (track switch or previously-unresolved track
*   resolving) and currentTime changes both trigger. preload is irrelevant.
*/
const segmentStartFor = (currentTime, track) => {
	if (currentTime == null) return void 0;
	return track?.segments.find(({ startTime, duration }, i, segments) => currentTime >= startTime && (currentTime < startTime + duration || i === segments.length - 1))?.startTime;
};
/**
* Returns true when the inputs are equal (no meaningful change — don't fire).
* Returns false when the inputs differ in a way that requires a new message.
*
* This IS the shouldLoadSegments logic, expressed as an equality function.
*/
function loadingInputsEq(prevState, curState) {
	if (!curState.segmentsCanLoad) return true;
	if (!curState.playbackInitiated) {
		if (curState.preload === "none") return true;
		return curState.preload === prevState.preload;
	}
	if (!prevState.playbackInitiated && curState.playbackInitiated) {
		if (prevState.preload !== "auto") return false;
	}
	if (!curState.track || !isResolvedTrack(curState.track)) return true;
	if (prevState.track?.id !== curState.track.id && isResolvedTrack(curState.track)) return false;
	return segmentStartFor(prevState.currentTime, curState.track) === segmentStartFor(curState.currentTime, curState.track);
}
/**
* Load segments orchestration — Reactor layer.
*
* Sends typed load messages to a SegmentLoaderActor when relevant conditions
* change. Uses targeted subscriptions rather than broad combineLatest so only
* meaningful state changes trigger evaluation.
*
* Condition hierarchy (see SegmentLoadingKey for detail):
*
*   !playbackInitiated
*     preload==='none' (or unset)  → dormant; no trigger
*     preload==='metadata'         → trigger on transition to 'metadata'
*     preload==='auto'             → trigger on transition to 'auto'
*
*   !playbackInitiated → playbackInitiated
*     preload !== 'auto'           → trigger (message shape changes)
*     preload === 'auto'           → suppressed (was already full-range mode;
*                                    let segmentStart take over post-play)
*                                    KNOWN LIMITATION: seek-before-play with
*                                    preload='auto' is not supported — if the
*                                    user seeks before pressing play, the
*                                    first re-send is delayed until the next
*                                    segment boundary crossing post-play.
*
*   playbackInitiated
*     resolvedTrackId changes      → trigger
*     segmentStart(currentTime) changes → trigger (segment boundary only)
*
* @example
* const cleanup = loadSegments({ state, owners }, { type: 'video' });
*/
function loadSegments({ state, owners }, config) {
	const { type } = config;
	const actorKey = ActorKeyByType$1[type];
	const initialBandwidth = state.get().bandwidthState;
	const throughput = signal(initialBandwidth ?? {
		fastEstimate: 0,
		fastTotalWeight: 0,
		slowEstimate: 0,
		slowTotalWeight: 0,
		bytesSampled: 0
	});
	const fetchBytes = type === "video" ? createTrackedFetch(throughput, initialBandwidth !== void 0 ? (next) => {
		state.set(Object.assign({}, state.get(), { bandwidthState: next }));
	} : void 0) : fetchStream;
	const segmentLoader = signal(void 0);
	const actorSource = computed(() => owners.get()[actorKey]);
	let currentLoader;
	const cleanupActorLifecycle = effect(() => {
		const actor = actorSource.get();
		if (currentLoader) {
			currentLoader.destroy();
			segmentLoader.set(void 0);
			currentLoader = void 0;
		}
		if (actor) {
			const loader = createSegmentLoaderActor(actor, fetchBytes);
			currentLoader = loader;
			segmentLoader.set(loader);
		}
	});
	const segmentsCanLoad = computed(() => {
		const track = getSelectedTrack(state.get(), type);
		return !!track && isResolvedTrack(track) && !!segmentLoader.get();
	});
	const loadingInputs = computed(() => selectLoadingInputs([segmentsCanLoad.get(), state.get()], type));
	let prevInputs;
	const cleanupLoadEffect = effect(() => {
		const inputs = loadingInputs.get();
		if (prevInputs !== void 0 && loadingInputsEq(prevInputs, inputs)) return;
		const { preload, playbackInitiated, currentTime, track, segmentsCanLoad: canLoad } = inputs;
		if (!canLoad) return;
		prevInputs = inputs;
		if (!(preload === "auto" || !!playbackInitiated))
 /** @ts-expect-error */
		segmentLoader.get()?.send({
			type: "load",
			track
		});
		else segmentLoader.get()?.send({
			type: "load",
			track,
			range: {
				start: currentTime,
				end: currentTime + DEFAULT_FORWARD_BUFFER_CONFIG.bufferDuration
			}
		});
	});
	return () => {
		cleanupActorLifecycle();
		cleanupLoadEffect();
		currentLoader?.destroy();
	};
}

//#endregion
//#region ../spf/dist/dev/dom/text/parse-vtt-segment.js
/**
* Parse a VTT segment using browser's native parser.
*
* Creates a dummy video element with a track element to leverage
* the browser's optimized VTT parsing. Returns parsed VTTCue objects.
*/
let dummyVideo = null;
function ensureDummyVideo() {
	if (!dummyVideo) {
		dummyVideo = document.createElement("video");
		dummyVideo.muted = true;
		dummyVideo.preload = "none";
		dummyVideo.style.display = "none";
		dummyVideo.crossOrigin = "anonymous";
	}
	return dummyVideo;
}
function parseVttSegment(url) {
	const video = ensureDummyVideo();
	const track = document.createElement("track");
	track.kind = "subtitles";
	track.default = true;
	return new Promise((resolve, reject) => {
		const onLoad = () => {
			const cues = [];
			const textTrack = track.track;
			if (textTrack.cues) for (let i = 0; i < textTrack.cues.length; i++) {
				const cue = textTrack.cues[i];
				if (cue) cues.push(cue);
			}
			cleanup();
			resolve(cues);
		};
		const onError = () => {
			cleanup();
			reject(/* @__PURE__ */ new Error(`Failed to load VTT segment: ${url}`));
		};
		const cleanup = () => {
			track.removeEventListener("load", onLoad);
			track.removeEventListener("error", onError);
			video.removeChild(track);
		};
		track.addEventListener("load", onLoad);
		track.addEventListener("error", onError);
		video.appendChild(track);
		track.src = url;
	});
}
function destroyVttParser() {
	dummyVideo = null;
}

//#endregion
//#region ../spf/dist/dev/core/create-machine-reactor.js
const toArray = (x) => x === void 0 ? [] : Array.isArray(x) ? x : [x];
/**
* Creates a reactive Reactor from a declarative definition.
*
* A Reactor is driven by subscriptions to external signals rather than
* imperative messages. Each state holds an array of effect functions —
* every element becomes one independent `effect()` call gated on that state,
* with its own dependency tracking and cleanup lifecycle.
*
* `'destroying'` and `'destroyed'` are always implicit terminal states.
* `destroy()` transitions through both in sequence: `'destroying'` first (for
* potential async teardown in a future extension), then immediately `'destroyed'`
* for the synchronous base case. Active effect cleanups fire via disposal.
*
* @example
* const reactor = createMachineReactor({
*   initial: 'waiting',
*   monitor: () => srcSignal.get() ? 'active' : 'waiting',
*   states: {
*     active: {
*       // entry: runs once on state entry; fn body is automatically untracked.
*       entry: () => listen(el, 'play', handler),
*       // effects: re-runs whenever tracked signals change.
*       effects: () => { currentTimeSignal.get(); return cleanup; },
*     },
*     waiting: {},
*   }
* });
*/
function createMachineReactor(def) {
	const { snapshotSignal, getState, transition } = createMachineCore({ value: def.initial });
	const effectDisposals = [];
	const wrapResult = (result) => {
		if (!result) return void 0;
		if (typeof result === "function") return result;
		return () => result.abort();
	};
	const untracked = (baseCall) => () => untrack(baseCall);
	const isTerminal = (snapshot) => snapshot.value === "destroying" || snapshot.value === "destroyed";
	const descriptors = [...toArray(def.monitor).map((fn) => ({
		fn: () => {
			const target = fn();
			if (target !== getState()) transition(target);
		},
		shouldSkip: isTerminal
	})), ...Object.entries(def.states).flatMap(([state, stateDef]) => {
		const isNotState = (snapshot) => snapshot.value !== state;
		return [...toArray(stateDef.entry).map((fn) => ({
			fn,
			shouldSkip: isNotState,
			toFnCall: untracked
		})), ...toArray(stateDef.effects).map((fn) => ({
			fn,
			shouldSkip: isNotState
		}))];
	})];
	const toEffect = ({ fn, shouldSkip, toFnCall = (baseCall) => baseCall }) => effect(() => {
		if (shouldSkip(snapshotSignal.get())) return;
		const baseCall = () => fn();
		return wrapResult(toFnCall(baseCall)());
	});
	effectDisposals.push(...descriptors.map(toEffect));
	return {
		get snapshot() {
			return snapshotSignal;
		},
		destroy() {
			const state = getState();
			if (state === "destroying" || state === "destroyed") return;
			transition("destroying");
			transition("destroyed");
			for (const dispose of effectDisposals) dispose();
		}
	};
}

//#endregion
//#region ../spf/dist/dev/dom/features/text-track-segment-loader-actor.js
/**
* Loads VTT segments for a text track and delegates cue management to a
* TextTracksActor. Mirrors the SegmentLoaderActor/SourceBufferActor pattern
* for the text track equivalent.
*
* Planning is done in the load handler: segments already recorded in
* TextTracksActor's context are skipped. Each load preempts in-flight work
* via abortAll() before scheduling fresh tasks.
*/
function createTextTrackSegmentLoaderActor(textTracksActor) {
	const runner = new SerialRunner();
	let destroyed = false;
	return {
		send({ track, currentTime }) {
			if (destroyed) return;
			const trackId = track.id;
			const bufferedSegments = untrack(() => textTracksActor.snapshot.get().context.segments[trackId] ?? []);
			const segmentsToLoad = getSegmentsToLoad(track.segments, bufferedSegments, currentTime);
			runner.abortAll();
			for (const segment of segmentsToLoad) runner.schedule(new Task(async (signal) => {
				if (signal.aborted) return;
				try {
					const cues = await parseVttSegment(segment.url);
					if (signal.aborted) return;
					textTracksActor.send({
						type: "add-cues",
						meta: {
							trackId,
							id: segment.id,
							startTime: segment.startTime,
							duration: segment.duration
						},
						cues
					});
				} catch (error) {
					console.error("Failed to load VTT segment:", error);
				}
			}));
		},
		destroy() {
			if (destroyed) return;
			destroyed = true;
			runner.destroy();
		}
	};
}

//#endregion
//#region ../spf/dist/dev/core/create-transition-actor.js
/**
* Creates a reducer-shaped actor from an initial context and a reducer function.
*
* The reducer receives the current context and a message and returns the next
* context. Returning the same reference (by identity) skips the signal update —
* so early-returning `context` unchanged is both the no-op and the optimization.
*
* Side effects (e.g. DOM mutations) may be performed inside the reducer.
* They run synchronously before the signal is updated.
*
* @example
* const actor = createTransitionActor(
*   { count: 0 },
*   (context, message: { type: 'increment' }) => ({ count: context.count + 1 })
* );
*/
function createTransitionActor(initialContext, reducer) {
	const { snapshotSignal, getState, transition } = createMachineCore({
		value: "active",
		context: initialContext
	});
	const getContext = () => untrack(() => snapshotSignal.get().context);
	const setContext = (context) => update(snapshotSignal, { context });
	return {
		get snapshot() {
			return snapshotSignal;
		},
		send(message) {
			if (getState() === "destroyed") return;
			const context = getContext();
			const newContext = reducer(context, message);
			if (newContext !== context) setContext(newContext);
		},
		destroy() {
			if (getState() === "destroyed") return;
			transition("destroyed");
		}
	};
}

//#endregion
//#region ../spf/dist/dev/dom/features/text-tracks-actor.js
function isDuplicateCue(cue, existing) {
	return existing.some((r) => r.startTime === cue.startTime && r.endTime === cue.endTime && r.text === cue.text);
}
/** TextTrack actor: wraps all text tracks on a media element, owns cue operations. */
function createTextTracksActor(mediaElement) {
	return createTransitionActor({
		loaded: {},
		segments: {}
	}, (context, message) => {
		const { meta, cues } = message;
		const { trackId, id: segmentId, startTime, duration } = meta;
		const textTrack = Array.from(mediaElement.textTracks).find((t) => t.id === trackId);
		if (!textTrack) return context;
		const existingCues = context.loaded[trackId] ?? [];
		const existingSegments = context.segments[trackId] ?? [];
		const prunedCues = cues.filter((cue) => !isDuplicateCue(cue, existingCues));
		const segmentAlreadyLoaded = existingSegments.some((s) => s.id === segmentId);
		if (prunedCues.length === 0 && segmentAlreadyLoaded) return context;
		for (const cue of prunedCues) textTrack.addCue(cue);
		return {
			...context,
			loaded: {
				...context.loaded,
				[trackId]: [...existingCues, ...prunedCues]
			},
			segments: segmentAlreadyLoaded ? context.segments : {
				...context.segments,
				[trackId]: [...existingSegments, {
					id: segmentId,
					startTime,
					duration
				}]
			}
		};
	});
}

//#endregion
//#region ../spf/dist/dev/dom/features/load-text-track-cues.js
function getTextTracks(presentation) {
	return presentation?.selectionSets?.find((s) => s.type === "text")?.switchingSets[0]?.tracks;
}
function findSelectedTrack(state) {
	const track = getTextTracks(state.presentation)?.find((t) => t.id === state.selectedTextTrackId);
	return track && isResolvedTrack(track) ? track : void 0;
}
/**
* Derives the correct state from current state and owners.
*
* States are mutually exclusive and exhaustive:
* - `'preconditions-unmet'`: no mediaElement, or no resolved presentation with text tracks
* - `'setting-up'`:          preconditions met; actors not yet in owners
* - `'pending'`:             actors alive; no selection, or selected track not yet resolved/in DOM
* - `'monitoring-for-loads'`: selected track resolved, in DOM — ready to dispatch load messages
*/
function deriveState$2(state, owners) {
	if (!owners.mediaElement || !getTextTracks(state.presentation)?.length) return "preconditions-unmet";
	if (!owners.textTracksActor || !owners.segmentLoaderActor) return "setting-up";
	const track = findSelectedTrack(state);
	if (!track || track.segments.length === 0) return "pending";
	if (!Array.from(owners.mediaElement.textTracks).some((t) => t.id === state.selectedTextTrackId)) return "pending";
	return "monitoring-for-loads";
}
function teardownActors(owners) {
	const { textTracksActor, segmentLoaderActor } = untrack(() => owners.get());
	if (!textTracksActor && !segmentLoaderActor) return;
	textTracksActor?.destroy();
	segmentLoaderActor?.destroy();
	update(owners, {
		textTracksActor: void 0,
		segmentLoaderActor: void 0
	});
}
/**
* Text track cue loading orchestration.
*
* A single `always` monitor keeps the reactor in sync with conditions.
* Actor lifecycle is managed across two states:
*
* - **`'setting-up'`** — creates `TextTracksActor` and `TextTrackSegmentLoaderActor`
*   and writes them to owners. Entry resets any stale actors first.
* - **`'preconditions-unmet'`** — destroys any actors in owners and resets them to
*   `undefined`. Handles all paths back from active states.
* - **`'monitoring-for-loads'`** — reactive dispatch: re-runs whenever `state`
*   changes (selection, currentTime, presentation) and sends a `load` message to
*   the segment loader.
*
* **Destroy note:** actors written to owners are NOT auto-destroyed when
* `reactor.destroy()` is called. Callers must read them from owners and destroy
* them explicitly alongside the reactor.
*
* @example
* const reactor = loadTextTrackCues({ state, owners });
* // later:
* const { textTracksActor, segmentLoaderActor } = owners.get();
* textTracksActor?.destroy();
* segmentLoaderActor?.destroy();
* reactor.destroy();
*/
function loadTextTrackCues({ state, owners }) {
	const derivedStateSignal = computed(() => deriveState$2(state.get(), owners.get()));
	const currentTimeSignal = computed(() => state.get().currentTime ?? 0);
	const selectedTrackSignal = computed(() => findSelectedTrack(state.get()));
	return createMachineReactor({
		initial: "preconditions-unmet",
		monitor: () => derivedStateSignal.get(),
		states: {
			"preconditions-unmet": { entry: () => {
				teardownActors(owners);
			} },
			"setting-up": { entry: () => {
				teardownActors(owners);
				const mediaElement = owners.get().mediaElement;
				const textTracksActor = createTextTracksActor(mediaElement);
				update(owners, {
					textTracksActor,
					segmentLoaderActor: createTextTrackSegmentLoaderActor(textTracksActor)
				});
			} },
			pending: {},
			"monitoring-for-loads": { effects: () => {
				const currentTime = currentTimeSignal.get();
				const track = selectedTrackSignal.get();
				const { segmentLoaderActor } = untrack(() => owners.get());
				segmentLoaderActor.send({
					type: "load",
					track,
					currentTime
				});
			} }
		}
	});
}

//#endregion
//#region ../spf/dist/dev/dom/features/track-current-time.js
/**
* Track current playback position from the media element.
*
* Mirrors `mediaElement.currentTime` into reactive state on:
* - `timeupdate` — fires during playback (~4 Hz)
* - `seeking` — fires when a seek begins; per spec, `currentTime` is
*   already at the new position when this event dispatches, so buffer
*   management can react immediately rather than waiting for `timeupdate`,
*   which does not fire while paused.
*
* Also syncs immediately when a media element becomes available.
*
* @example
* const cleanup = trackCurrentTime({ state, owners });
*/
function trackCurrentTime({ state, owners }) {
	let lastMediaElement;
	let removeListeners = null;
	const cleanupEffect = effect(() => {
		const { mediaElement } = owners.get();
		if (mediaElement === lastMediaElement) return;
		removeListeners?.();
		removeListeners = null;
		lastMediaElement = mediaElement;
		if (!mediaElement) return;
		const sync = () => {
			update(state, { currentTime: mediaElement.currentTime });
		};
		sync();
		const removeTimeupdate = listen(mediaElement, "timeupdate", sync);
		const removeSeeking = listen(mediaElement, "seeking", sync);
		removeListeners = () => {
			removeTimeupdate();
			removeSeeking();
		};
	});
	return () => {
		removeListeners?.();
		cleanupEffect();
	};
}

//#endregion
//#region ../spf/dist/dev/dom/features/track-playback-initiated.js
/**
* FSM states for playback initiation tracking.
*
* ```
* 'preconditions-unmet' ──── element + URL ────→ 'monitoring'
*         ↑                        ↑                  │
*         │   preconditions lost   │             play / !paused
*         │                        │                  ↓
*         └────────────── 'playback-initiated' ←──────┘
*                (exit cleanup resets state.playbackInitiated → false)
*
* any state ──── destroy() ────→ 'destroying' ────→ 'destroyed'
* ```
*/
function deriveState$1(state, owners) {
	if (!owners.mediaElement || !state.presentation?.url) return "preconditions-unmet";
	if (state.playbackInitiated) return "playback-initiated";
	return "monitoring";
}
/**
* Track whether playback has been initiated for the current presentation URL.
*
* A three-state Reactor FSM driven by `state.playbackInitiated` and the
* `deriveState` pattern:
* - `'preconditions-unmet'` — no element or URL yet; no effects.
* - `'monitoring'` — checks `!el.paused` on entry; listens for `play`.
* - `'playback-initiated'` — tracks element and URL; exit cleanup resets
*   `state.playbackInitiated` to `false` on any change or lost preconditions.
*
* @example
* const reactor = trackPlaybackInitiated({ state, owners });
* // later:
* reactor.destroy();
*/
function trackPlaybackInitiated({ state, owners }) {
	const derivedStateSignal = computed(() => deriveState$1(state.get(), owners.get()));
	const mediaElementSignal = computed(() => owners.get().mediaElement);
	const urlSignal = computed(() => state.get().presentation?.url);
	return createMachineReactor({
		initial: "preconditions-unmet",
		monitor: () => derivedStateSignal.get(),
		states: {
			"preconditions-unmet": {},
			monitoring: { entry: () => {
				const el = mediaElementSignal.get();
				update(state, { playbackInitiated: !el.paused });
				return listen(el, "play", () => {
					update(state, { playbackInitiated: !el.paused });
				});
			} },
			"playback-initiated": { effects: () => {
				mediaElementSignal.get();
				urlSignal.get();
				return () => update(state, { playbackInitiated: false });
			} }
		}
	});
}

//#endregion
//#region ../spf/dist/dev/dom/media/append-segment.js
/**
* Append media data to a SourceBuffer.
*
* Accepts either a full ArrayBuffer (single append) or an AsyncIterable of
* Uint8Array chunks (one append per chunk, in order). Waits for `updateend`
* between each call so appends are serialized correctly.
*
* Errors from the SourceBuffer (`error` event) or from the iterable are
* propagated as rejections.
*/
async function appendSegment(sourceBuffer, data, signal) {
	if (data instanceof ArrayBuffer) await appendChunk(sourceBuffer, data);
	else try {
		for await (const chunk of data) {
			if (signal?.aborted) throw signal.reason ?? new DOMException("Aborted", "AbortError");
			await appendChunk(sourceBuffer, chunk);
		}
	} catch (e) {
		if (e instanceof DOMException && e.name === "AbortError" && !sourceBuffer.updating) try {
			sourceBuffer.abort();
		} catch {}
		throw e;
	}
}
async function appendChunk(sourceBuffer, data) {
	if (sourceBuffer.updating) await new Promise((resolve) => {
		const onUpdateEnd = () => {
			sourceBuffer.removeEventListener("updateend", onUpdateEnd);
			resolve();
		};
		sourceBuffer.addEventListener("updateend", onUpdateEnd);
	});
	return new Promise((resolve, reject) => {
		const onUpdateEnd = () => {
			cleanup();
			resolve();
		};
		const onError = (event) => {
			cleanup();
			reject(/* @__PURE__ */ new Error(`SourceBuffer append error: ${event.type}`));
		};
		const cleanup = () => {
			sourceBuffer.removeEventListener("updateend", onUpdateEnd);
			sourceBuffer.removeEventListener("error", onError);
		};
		sourceBuffer.addEventListener("updateend", onUpdateEnd);
		sourceBuffer.addEventListener("error", onError);
		try {
			sourceBuffer.appendBuffer(data);
		} catch (error) {
			cleanup();
			reject(error);
		}
	});
}

//#endregion
//#region ../spf/dist/dev/dom/media/buffer-flusher.js
/**
* Buffer flusher helper (P12)
*
* Removes a time range from a SourceBuffer to manage memory.
*/
/**
* Remove a time range from a SourceBuffer.
*
* Waits for the SourceBuffer to be ready (not updating), then removes
* the specified range. Returns a promise that resolves when removal completes.
*
* @param sourceBuffer - The SourceBuffer to remove data from
* @param start - Start of the time range to remove (seconds)
* @param end - End of the time range to remove (seconds)
* @returns Promise that resolves when removal completes
*
* @example
* await flushBuffer(videoSourceBuffer, 0, 30);
*/
async function flushBuffer(sourceBuffer, start, end) {
	if (sourceBuffer.updating) await new Promise((resolve) => {
		const onUpdateEnd = () => {
			sourceBuffer.removeEventListener("updateend", onUpdateEnd);
			resolve();
		};
		sourceBuffer.addEventListener("updateend", onUpdateEnd);
	});
	return new Promise((resolve, reject) => {
		const onUpdateEnd = () => {
			cleanup();
			resolve();
		};
		const onError = (event) => {
			cleanup();
			reject(/* @__PURE__ */ new Error(`SourceBuffer remove error: ${event.type}`));
		};
		const cleanup = () => {
			sourceBuffer.removeEventListener("updateend", onUpdateEnd);
			sourceBuffer.removeEventListener("error", onError);
		};
		sourceBuffer.addEventListener("updateend", onUpdateEnd);
		sourceBuffer.addEventListener("error", onError);
		try {
			sourceBuffer.remove(start, end);
		} catch (error) {
			cleanup();
			reject(error);
		}
	});
}

//#endregion
//#region ../spf/dist/dev/core/features/calculate-presentation-duration.js
/**
* Check if we can calculate presentation duration (have required data).
*/
function canCalculateDuration(state) {
	if (!state.presentation) return false;
	return !!(state.selectedVideoTrackId || state.selectedAudioTrackId);
}
/**
* Check if we should calculate presentation duration (conditions met).
*/
function shouldCalculateDuration(state) {
	if (!canCalculateDuration(state)) return false;
	const { presentation } = state;
	if (presentation.duration !== void 0) return false;
	const videoTrack = state.selectedVideoTrackId ? getSelectedTrack(state, "video") : void 0;
	const audioTrack = state.selectedAudioTrackId ? getSelectedTrack(state, "audio") : void 0;
	return !!(videoTrack && isResolvedTrack(videoTrack) || audioTrack && isResolvedTrack(audioTrack));
}
/**
* Get duration from the first resolved track (prefer video, fallback to audio).
*/
function getDurationFromResolvedTracks(state) {
	const videoTrack = state.selectedVideoTrackId ? getSelectedTrack(state, "video") : void 0;
	if (videoTrack && isResolvedTrack(videoTrack)) return videoTrack.duration;
	const audioTrack = state.selectedAudioTrackId ? getSelectedTrack(state, "audio") : void 0;
	if (audioTrack && isResolvedTrack(audioTrack)) return audioTrack.duration;
}
/**
* Calculate and set presentation duration from resolved tracks.
*/
function calculatePresentationDuration({ state }) {
	return effect(() => {
		const currentState = state.get();
		if (!shouldCalculateDuration(currentState)) return;
		const duration = getDurationFromResolvedTracks(currentState);
		if (duration === void 0 || !Number.isFinite(duration)) return;
		state.set({
			...currentState,
			presentation: {
				...currentState.presentation,
				duration
			}
		});
	});
}

//#endregion
//#region ../spf/dist/dev/core/abr/quality-selection.js
/**
* Default quality selection configuration.
* Values match Shaka Player upgrade threshold (0.85 = 15% headroom).
*/
const DEFAULT_QUALITY_CONFIG = { safetyMargin: .85 };
/**
* Select the best video track based on current bandwidth estimate.
*
* Selects the highest quality track where bandwidth is sufficient with safety margin:
* - currentBandwidth >= track.bandwidth / safetyMargin
* - Default safetyMargin 0.85 means track uses ≤85% of bandwidth (15% headroom)
* - At same bandwidth, prefers higher resolution
*
* @param tracks - Available video tracks (can be unsorted)
* @param currentBandwidth - Current bandwidth estimate in bits per second
* @param config - Optional quality selection configuration
* @returns Selected track, or undefined if no tracks available
*
* @example
* const tracks = [
*   { id: '360p', bandwidth: 500_000, ... },
*   { id: '720p', bandwidth: 2_000_000, ... },
*   { id: '1080p', bandwidth: 4_000_000, ... },
* ];
*
* // With 2.5 Mbps, selects 720p (1080p needs 4M/0.85 = 4.7 Mbps)
* const selected = selectQuality(tracks, 2_500_000);
*/
function selectQuality(tracks, currentBandwidth, config = DEFAULT_QUALITY_CONFIG) {
	if (tracks.length === 0) return;
	const sortedTracks = tracks.slice().sort((a, b) => a.bandwidth - b.bandwidth);
	let chosen;
	for (const track of sortedTracks) if (currentBandwidth >= track.bandwidth / config.safetyMargin) {
		if (!chosen || track.bandwidth > chosen.bandwidth || track.bandwidth === chosen.bandwidth && hasHigherResolution(track, chosen)) chosen = track;
	}
	return chosen ?? sortedTracks[0];
}
/**
* Check if track A has higher resolution than track B.
* Compares by total pixel count (width × height).
*
* @param trackA - First track to compare
* @param trackB - Second track to compare
* @returns True if trackA has more pixels than trackB
*/
function hasHigherResolution(trackA, trackB) {
	return (trackA.width ?? 0) * (trackA.height ?? 0) > (trackB.width ?? 0) * (trackB.height ?? 0);
}

//#endregion
//#region ../spf/dist/dev/core/features/quality-switching.js
/**
* Default quality switching configuration.
*/
const DEFAULT_SWITCHING_CONFIG = {
	safetyMargin: .85,
	minUpgradeInterval: 8e3,
	defaultBandwidth: 5e6
};
/**
* Get all video tracks from a presentation's first switching set.
* Returns [] when the presentation is still unresolved (no selectionSets yet).
*/
function getVideoTracks(presentation) {
	return (presentation.selectionSets?.find((s) => s.type === "video"))?.switchingSets[0]?.tracks ?? [];
}
/**
* Quality switching orchestration (F9).
*
* Reacts to bandwidth estimate changes and updates `selectedVideoTrackId`
* when a different quality is optimal:
*
* - **Downgrades** happen immediately to avoid buffering stalls.
* - **Upgrades** are gated by `minUpgradeInterval` to prevent oscillation.
* - The first switch (from any track, or no track) is always immediate.
*
* Smooth switching is handled downstream: when `selectedVideoTrackId` changes,
* `resolveTrack` fetches the new playlist and `loadSegments` reloads the init
* segment, then appends media segments from the current position in the new
* quality. The browser's SourceBuffer replaces the overlapping buffered range.
*
* @example
* const cleanup = switchQuality({ state });
* // Later, when done:
* cleanup();
*/
function switchQuality({ state }, config = {}) {
	const safetyMargin = config.safetyMargin ?? DEFAULT_SWITCHING_CONFIG.safetyMargin;
	const minUpgradeInterval = config.minUpgradeInterval ?? DEFAULT_SWITCHING_CONFIG.minUpgradeInterval;
	const defaultBandwidth = config.defaultBandwidth ?? DEFAULT_SWITCHING_CONFIG.defaultBandwidth;
	let lastUpgradeTime = Date.now();
	let firstMeaningfulFire = true;
	return effect(() => {
		const { presentation, bandwidthState, selectedVideoTrackId, abrDisabled } = state.get();
		if (abrDisabled === true) return;
		if (!presentation || !bandwidthState) return;
		const videoTracks = getVideoTracks(presentation);
		if (videoTracks.length === 0) return;
		const isFirst = firstMeaningfulFire;
		firstMeaningfulFire = false;
		const optimal = selectQuality(videoTracks, getBandwidthEstimate(bandwidthState, defaultBandwidth), { safetyMargin });
		if (!optimal || optimal.id === selectedVideoTrackId) return;
		const currentTrack = videoTracks.find((t) => t.id === selectedVideoTrackId);
		if (!currentTrack || optimal.bandwidth > currentTrack.bandwidth) {
			const now = Date.now();
			if (!isFirst && now - lastUpgradeTime < minUpgradeInterval) return;
			lastUpgradeTime = now;
		}
		update(state, { selectedVideoTrackId: optimal.id });
	});
}

//#endregion
//#region ../spf/dist/dev/core/hls/parse-attributes.js
/**
* Parse HLS attribute list from a tag line.
* Handles both quoted and unquoted values.
*/
function parseAttributeList(line) {
	const attributes = /* @__PURE__ */ new Map();
	for (const match of line.matchAll(/([A-Z0-9-]+)=(?:"([^"]*)"|([^,]*))/g)) {
		const key = match[1];
		const value = match[2] ?? match[3] ?? "";
		if (key) attributes.set(key, value);
	}
	return attributes;
}
/**
* Parse RESOLUTION attribute value (WIDTHxHEIGHT).
*/
function parseResolution(value) {
	const match = /^(\d+)x(\d+)$/.exec(value);
	if (!match) return null;
	return {
		width: Number.parseInt(match[1], 10),
		height: Number.parseInt(match[2], 10)
	};
}
/**
* Parse FRAME-RATE attribute to rational frame rate.
*/
function parseFrameRate(value) {
	const fps = Number.parseFloat(value);
	if (Number.isNaN(fps) || fps <= 0) return void 0;
	if (Math.abs(fps - 23.976) < .01) return {
		frameRateNumerator: 24e3,
		frameRateDenominator: 1001
	};
	if (Math.abs(fps - 29.97) < .01) return {
		frameRateNumerator: 3e4,
		frameRateDenominator: 1001
	};
	if (Math.abs(fps - 59.94) < .01) return {
		frameRateNumerator: 6e4,
		frameRateDenominator: 1001
	};
	if (fps % 1 === 0) return { frameRateNumerator: Math.round(fps) };
	return { frameRateNumerator: Math.round(fps) };
}
/**
* Parse CODECS attribute into separate video and audio codecs.
*/
function parseCodecs(codecs) {
	const parts = codecs.split(",").map((s) => s.trim());
	const result = {};
	for (const codec of parts) if (codec.startsWith("avc1.") || codec.startsWith("hvc1.") || codec.startsWith("hev1.")) result.video = codec;
	else if (codec.startsWith("mp4a.")) result.audio = codec;
	return result;
}
/**
* Parse #EXTINF duration value.
*/
function parseExtInfDuration(value) {
	const durationPart = value.split(",")[0] ?? value;
	const duration = Number.parseFloat(durationPart);
	return Number.isNaN(duration) ? 0 : duration;
}
/**
* Parse BYTERANGE attribute value.
* Format: "length[@offset]"
* If offset is omitted, it continues from the previous byte range end.
*/
function parseByteRange(value, previousEnd) {
	const match = /^(\d+)(?:@(\d+))?$/.exec(value);
	if (!match) return null;
	const length = Number.parseInt(match[1], 10);
	if (Number.isNaN(length)) return null;
	let start;
	if (match[2] !== void 0) {
		start = Number.parseInt(match[2], 10);
		if (Number.isNaN(start)) return null;
	} else if (previousEnd !== void 0) start = previousEnd;
	else return null;
	return {
		start,
		end: start + length - 1
	};
}
/**
* Create AttributeList from raw attribute string.
*/
function createAttributeList(line) {
	const map = parseAttributeList(line);
	return {
		get(key) {
			return map.get(key);
		},
		getInt(key, defaultValue) {
			const value = map.get(key);
			if (value === void 0) return defaultValue;
			const parsed = Number.parseInt(value, 10);
			return Number.isNaN(parsed) ? defaultValue : parsed;
		},
		getFloat(key, defaultValue) {
			const value = map.get(key);
			if (value === void 0) return defaultValue;
			const parsed = Number.parseFloat(value);
			return Number.isNaN(parsed) ? defaultValue : parsed;
		},
		getBool(key) {
			return map.get(key) === "YES";
		},
		getResolution(key) {
			const value = map.get(key);
			if (!value) return void 0;
			return parseResolution(value) ?? void 0;
		},
		getFrameRate(key) {
			const value = map.get(key);
			if (!value) return void 0;
			return parseFrameRate(value);
		}
	};
}
/**
* Match a tag and extract its attributes.
* Returns null if the line doesn't match the tag.
*/
function matchTag(line, tag) {
	const prefix = `#${tag}:`;
	if (!line.startsWith(prefix)) return null;
	return createAttributeList(line.slice(prefix.length));
}

//#endregion
//#region ../spf/dist/dev/core/hls/resolve-url.js
/**
* Resolve a potentially relative URL against a base URL using native URL API.
*/
function resolveUrl(url, baseUrl) {
	return new URL(url, baseUrl).href;
}

//#endregion
//#region ../spf/dist/dev/core/hls/parse-multivariant.js
/**
* Parse HLS multivariant playlist into a Presentation.
*
* Returns Presentation with partially resolved tracks (no segment information).
* Tracks contain metadata from multivariant playlist (bandwidth, resolution, codecs)
* but segment information is added when media playlists are fetched.
*
* @param text - Raw playlist text content
* @param unresolved - Unresolved presentation (contains URL for base URL resolution)
* @returns Presentation with partially resolved tracks (duration is undefined)
*/
function parseMultivariantPlaylist(text, unresolved) {
	const baseUrl = unresolved.url;
	const lines = text.split(/\r?\n/);
	const streams = [];
	const audioRenditions = [];
	const subtitleRenditions = [];
	let pendingStreamInfo = null;
	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith("#") && !trimmed.startsWith("#EXT")) continue;
		if (trimmed === "#EXTM3U" || trimmed.startsWith("#EXT-X-VERSION:") || trimmed.startsWith("#EXT-X-INDEPENDENT-SEGMENTS")) continue;
		const mediaAttrs = matchTag(trimmed, "EXT-X-MEDIA");
		if (mediaAttrs) {
			const type = mediaAttrs.get("TYPE");
			const groupId = mediaAttrs.get("GROUP-ID");
			const name = mediaAttrs.get("NAME");
			if (type === "AUDIO" && groupId && name) {
				const uri = mediaAttrs.get("URI");
				audioRenditions.push({
					groupId,
					name,
					language: mediaAttrs.get("LANGUAGE"),
					uri: uri ? resolveUrl(uri, baseUrl) : void 0,
					default: mediaAttrs.getBool("DEFAULT"),
					autoselect: mediaAttrs.getBool("AUTOSELECT")
				});
			}
			if (type === "SUBTITLES" && groupId && name) {
				const uri = mediaAttrs.get("URI");
				if (uri) subtitleRenditions.push({
					groupId,
					name,
					language: mediaAttrs.get("LANGUAGE"),
					uri: resolveUrl(uri, baseUrl),
					default: mediaAttrs.getBool("DEFAULT"),
					autoselect: mediaAttrs.getBool("AUTOSELECT"),
					forced: mediaAttrs.getBool("FORCED")
				});
			}
			continue;
		}
		const streamInfAttrs = matchTag(trimmed, "EXT-X-STREAM-INF");
		if (streamInfAttrs) {
			pendingStreamInfo = {
				bandwidth: streamInfAttrs.getInt("BANDWIDTH", 0),
				resolution: streamInfAttrs.getResolution("RESOLUTION"),
				codecs: streamInfAttrs.get("CODECS"),
				frameRate: streamInfAttrs.getFrameRate("FRAME-RATE"),
				audioGroupId: streamInfAttrs.get("AUDIO")
			};
			continue;
		}
		if (!trimmed.startsWith("#") && pendingStreamInfo) {
			streams.push({
				...pendingStreamInfo,
				uri: resolveUrl(trimmed, baseUrl)
			});
			pendingStreamInfo = null;
		}
	}
	const videoStreams = [];
	const audioOnlyStreams = [];
	for (const stream of streams) {
		if (!stream.codecs) {
			videoStreams.push(stream);
			continue;
		}
		const parsedCodecs = parseCodecs(stream.codecs);
		if (stream.codecs.split(",").length === 1) if (parsedCodecs.audio && !parsedCodecs.video) audioOnlyStreams.push(stream);
		else videoStreams.push(stream);
		else videoStreams.push(stream);
	}
	const videoTracks = videoStreams.map((stream) => {
		const codecs = stream.codecs ? parseCodecs(stream.codecs) : void 0;
		const track = {
			type: "video",
			id: generateId(),
			url: stream.uri,
			bandwidth: stream.bandwidth,
			mimeType: "video/mp4",
			codecs: []
		};
		if (stream.resolution?.width !== void 0) track.width = stream.resolution.width;
		if (stream.resolution?.height !== void 0) track.height = stream.resolution.height;
		if (codecs?.video) track.codecs = [codecs.video];
		if (stream.frameRate) track.frameRate = stream.frameRate;
		if (stream.audioGroupId) track.audioGroupId = stream.audioGroupId;
		return track;
	});
	const audioOnlyTracks = audioOnlyStreams.map((stream) => {
		const codecs = stream.codecs ? parseCodecs(stream.codecs) : void 0;
		return {
			type: "audio",
			id: generateId(),
			url: stream.uri,
			bandwidth: stream.bandwidth,
			mimeType: "audio/mp4",
			codecs: codecs?.audio ? [codecs.audio] : [],
			groupId: stream.audioGroupId || "default",
			name: "Default",
			sampleRate: 48e3,
			channels: 2
		};
	});
	const audioTracks = [...audioRenditions.map((rendition) => {
		let audioCodecs;
		for (const stream of streams) if (stream.audioGroupId === rendition.groupId && stream.codecs) {
			const codecs = parseCodecs(stream.codecs);
			if (codecs.audio) {
				audioCodecs = [codecs.audio];
				break;
			}
		}
		const track = {
			type: "audio",
			id: generateId(),
			url: rendition.uri ?? "",
			groupId: rendition.groupId,
			name: rendition.name,
			mimeType: "audio/mp4",
			bandwidth: 0,
			sampleRate: 48e3,
			channels: 2,
			codecs: []
		};
		if (rendition.language) track.language = rendition.language;
		if (audioCodecs) track.codecs = audioCodecs;
		if (rendition.default) track.default = rendition.default;
		if (rendition.autoselect) track.autoselect = rendition.autoselect;
		return track;
	}), ...audioOnlyTracks];
	const textTracks = subtitleRenditions.map((rendition) => {
		const track = {
			type: "text",
			id: generateId(),
			url: rendition.uri,
			groupId: rendition.groupId,
			label: rendition.name,
			kind: "subtitles",
			mimeType: "text/vtt",
			bandwidth: 0
		};
		if (rendition.language) track.language = rendition.language;
		if (rendition.default && rendition.autoselect) track.default = true;
		if (rendition.autoselect) track.autoselect = rendition.autoselect;
		if (rendition.forced) track.forced = rendition.forced;
		return track;
	});
	const selectionSets = [];
	if (videoTracks.length > 0) {
		const videoSwitchingSet = {
			id: generateId(),
			type: "video",
			tracks: videoTracks
		};
		const videoSelectionSet = {
			id: generateId(),
			type: "video",
			switchingSets: [videoSwitchingSet]
		};
		selectionSets.push(videoSelectionSet);
	}
	if (audioTracks.length > 0) {
		const audioSwitchingSet = {
			id: generateId(),
			type: "audio",
			tracks: audioTracks
		};
		const audioSelectionSet = {
			id: generateId(),
			type: "audio",
			switchingSets: [audioSwitchingSet]
		};
		selectionSets.push(audioSelectionSet);
	}
	if (textTracks.length > 0) {
		const textSwitchingSet = {
			id: generateId(),
			type: "text",
			tracks: textTracks
		};
		const textSelectionSet = {
			id: generateId(),
			type: "text",
			switchingSets: [textSwitchingSet]
		};
		selectionSets.push(textSelectionSet);
	}
	return {
		id: generateId(),
		url: unresolved.url,
		startTime: 0,
		selectionSets
	};
}

//#endregion
//#region ../spf/dist/dev/core/features/resolve-presentation.js
/**
* Determines if resolution conditions are met based on preload policy and playback state.
*
* Resolution conditions:
* - State-driven: preload is 'auto' or 'metadata'
* - Playback-driven: playbackInitiated is true
*
* @param state - Current presentation state
* @returns true if resolution conditions are met
*/
function shouldResolve(state) {
	const { preload, playbackInitiated } = state;
	return ["auto", "metadata"].includes(preload) || !!playbackInitiated;
}
/**
* Derives the correct state from current state conditions.
*
* States are mutually exclusive and exhaustive:
* - `'preconditions-unmet'`: no presentation, or presentation has no URL
* - `'idle'`:     URL present, unresolved (no id), shouldResolve not met
* - `'resolving'`: URL present, unresolved (no id), shouldResolve met
* - `'resolved'`:  URL present, resolved (has id)
*/
function deriveState(state) {
	const { presentation } = state;
	if (!presentation || !("url" in presentation)) return "preconditions-unmet";
	if ("id" in presentation) return "resolved";
	return shouldResolve(state) ? "resolving" : "idle";
}
/**
* Resolves unresolved presentations using reactive composition.
*
* FSM driven by `deriveState` — a single `always` monitor keeps the state in
* sync with conditions at all times. `'resolving'` additionally runs the fetch
* task and returns an AbortController so the framework aborts it on state exit.
*
* @example
* const reactor = resolvePresentation({ state });
* // later:
* reactor.destroy();
*/
function resolvePresentation({ state }) {
	const derivedStateSignal = computed(() => deriveState(state.get()));
	return createMachineReactor({
		initial: "preconditions-unmet",
		monitor: () => derivedStateSignal.get(),
		states: {
			"preconditions-unmet": {},
			idle: {},
			resolving: { entry: () => {
				const presentation = state.get().presentation;
				const ac = new AbortController();
				fetchResolvable(presentation, { signal: ac.signal }).then((response) => getResponseText(response)).then((text) => {
					update(state, { presentation: parseMultivariantPlaylist(text, presentation) });
				}).catch((error) => {
					if (error instanceof Error && error.name === "AbortError") return;
					throw error;
				});
				return ac;
			} },
			resolved: {}
		}
	});
}

//#endregion
//#region ../spf/dist/dev/core/hls/parse-media-playlist.js
/**
* Parse HLS media playlist and resolve track with segments.
*
* Takes an unresolved track (from multivariant playlist) and media playlist text,
* returns a HAM-compliant resolved track with segments.
*
* @param text - Media playlist text content
* @param unresolved - Unresolved track from parseMultivariantPlaylist
* @returns Resolved track with segments (type inferred from input)
*/
function parseMediaPlaylist(text, unresolved) {
	const lines = text.split(/\r?\n/);
	const baseUrl = unresolved.url;
	const segments = [];
	let initSegmentUrl;
	let initSegmentByteRange;
	let currentDuration = 0;
	let currentByteRange;
	let currentTime = 0;
	let segmentIndex = 0;
	let previousByteRangeEnd;
	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith("#") && !trimmed.startsWith("#EXT")) continue;
		if (trimmed === "#EXTM3U" || trimmed.startsWith("#EXT-X-VERSION:") || trimmed.startsWith("#EXT-X-TARGETDURATION:") || trimmed.startsWith("#EXT-X-PLAYLIST-TYPE:") || trimmed.startsWith("#EXT-X-INDEPENDENT-SEGMENTS")) continue;
		const mapAttrs = matchTag(trimmed, "EXT-X-MAP");
		if (mapAttrs) {
			const uri = mapAttrs.get("URI");
			if (uri) {
				initSegmentUrl = resolveUrl(uri, baseUrl);
				const byteRangeStr = mapAttrs.get("BYTERANGE");
				if (byteRangeStr) initSegmentByteRange = parseByteRange(byteRangeStr, 0) ?? void 0;
			}
			continue;
		}
		if (trimmed.startsWith("#EXTINF:")) {
			currentDuration = parseExtInfDuration(trimmed.slice(8));
			continue;
		}
		if (trimmed.startsWith("#EXT-X-BYTERANGE:")) {
			currentByteRange = parseByteRange(trimmed.slice(17), previousByteRangeEnd) ?? void 0;
			continue;
		}
		if (trimmed === "#EXT-X-ENDLIST") continue;
		if (!trimmed.startsWith("#") && currentDuration > 0) {
			const segment = {
				id: `segment-${segmentIndex}`,
				url: resolveUrl(trimmed, baseUrl),
				duration: currentDuration,
				startTime: currentTime
			};
			if (currentByteRange) {
				segment.byteRange = currentByteRange;
				previousByteRangeEnd = currentByteRange.end + 1;
			} else previousByteRangeEnd = void 0;
			segments.push(segment);
			currentTime += currentDuration;
			segmentIndex++;
			currentDuration = 0;
			currentByteRange = void 0;
		}
	}
	const totalDuration = currentTime;
	const initialization = unresolved.type === "text" && !initSegmentUrl ? void 0 : initSegmentUrl ? {
		url: initSegmentUrl,
		...initSegmentByteRange ? { byteRange: initSegmentByteRange } : {}
	} : { url: "" };
	return {
		...unresolved,
		startTime: 0,
		duration: totalDuration,
		segments,
		initialization
	};
}

//#endregion
//#region ../spf/dist/dev/core/features/resolve-track.js
function canResolve(state, config) {
	const track = getSelectedTrack(state, config.type);
	if (!track) return false;
	return !isResolvedTrack(track);
}
/**
* Updates a track within a presentation (immutably).
* Generic - works for video, audio, or text tracks.
*/
function updateTrackInPresentation(presentation, resolvedTrack) {
	const trackId = resolvedTrack.id;
	return {
		...presentation,
		selectionSets: presentation.selectionSets.map((selectionSet) => ({
			...selectionSet,
			switchingSets: selectionSet.switchingSets.map((switchingSet) => ({
				...switchingSet,
				tracks: switchingSet.tracks.map((track) => track.id === trackId ? resolvedTrack : track)
			}))
		}))
	};
}
/**
* Resolves unresolved tracks using reactive composition.
*
* Reacts to state changes and schedules fetch tasks via ConcurrentRunner when
* a selected track is unresolved. The ConcurrentRunner handles deduplication,
* parallel execution, and cleanup.
*
* Generic version that works for video, audio, or text tracks based on config.
* Type parameter T is inferred from config.type (use 'as const' for inference).
*/
function resolveTrack({ state }, config) {
	const runner = new ConcurrentRunner();
	const cleanup = effect(() => {
		const currentState = state.get();
		if (!canResolve(currentState, config)) return;
		const track = getSelectedTrack(currentState, config.type);
		if (!track) return;
		const resolvedTrack = track;
		runner.schedule(new Task(async (signal) => {
			const mediaTrack = parseMediaPlaylist(await getResponseText(await fetchResolvable(resolvedTrack, { signal })), resolvedTrack);
			const latest = state.get();
			const updatedPresentation = updateTrackInPresentation(latest.presentation, mediaTrack);
			state.set({
				...latest,
				presentation: updatedPresentation
			});
		}, { id: track.id }));
	});
	return () => {
		runner.abortAll();
		cleanup();
	};
}

//#endregion
//#region ../spf/dist/dev/core/features/select-tracks.js
/**
* Pick text track to activate.
*
* Selection priority (if enabled):
* 1. User preference (preferredSubtitleLanguage)
* 2. DEFAULT track (if enableDefaultTrack is true and track has DEFAULT=YES + AUTOSELECT=YES)
* 3. No auto-selection (user opt-in)
*
* By default, FORCED tracks are excluded per Apple's HLS spec.
*
* @param presentation - Presentation with text tracks
* @param config - Selection configuration
* @returns Track ID or undefined (no auto-selection)
*/
function pickTextTrack(presentation, config) {
	const textSet = presentation.selectionSets.find((set) => set.type === "text");
	if (!textSet?.switchingSets?.[0]?.tracks.length) return void 0;
	const tracks = textSet.switchingSets[0].tracks;
	const availableTracks = config.includeForcedTracks ? tracks : tracks.filter((track) => !track.forced);
	if (availableTracks.length === 0) return void 0;
	const { preferredSubtitleLanguage, enableDefaultTrack = false } = config;
	if (preferredSubtitleLanguage) {
		const languageMatch = availableTracks.find((track) => track.language === preferredSubtitleLanguage);
		if (languageMatch) return languageMatch.id;
	}
	if (enableDefaultTrack) {
		const defaultTrack = availableTracks.find((track) => track.default === true);
		if (defaultTrack) return defaultTrack.id;
	}
}
/**
* Check if we can select a track of the given type.
*
* Returns true when:
* - Presentation exists
* - Has tracks of the specified type
*
* Generic over track type - works for video, audio, or text.
*/
function canSelectTrack(state, config) {
	return !!state?.presentation?.selectionSets?.find(({ type }) => type === config.type)?.switchingSets?.[0]?.tracks.length;
}
/**
* Check if we should select a track of the given type.
*
* Returns true when:
* - Track of this type is not already selected
*
* Generic over track type - works for video, audio, or text.
*
* @TODO figure out reactive model for ABR cases - right now we're only selecting
* if we have nothing selected (CJP)
*/
function shouldSelectTrack(state, config) {
	return !state[SelectedTrackIdKeyByType[config.type]];
}
/**
* Select video track orchestration.
*
* Selects video track when:
* - Presentation exists
* - No video track is selected yet
*
* Uses bandwidth-based quality selection algorithm.
*
* @example
* const cleanup = selectVideoTrack(
*   { state, owners, events },
*   { initialBandwidth: 2_000_000 }
* );
*/
function selectVideoTrack({ state }, config = { type: "video" }) {
	return effect(() => {
		const currentState = state.get();
		if (!canSelectTrack(currentState, config) || !shouldSelectTrack(currentState, config)) return;
		const selectedTrackId = currentState.presentation?.selectionSets.find(({ type }) => type === config.type)?.switchingSets[0]?.tracks[0]?.id;
		if (selectedTrackId) update(state, { [SelectedTrackIdKeyByType[config.type]]: selectedTrackId });
	});
}
/**
* Select audio track orchestration.
*
* Selects audio track when:
* - Presentation exists
* - No audio track is selected yet
*
* Uses language and preference-based selection.
*
* @example
* const cleanup = selectAudioTrack(
*   { state, owners, events },
*   { preferredAudioLanguage: 'en' }
* );
*/
function selectAudioTrack({ state }, config = { type: "audio" }) {
	return effect(() => {
		const currentState = state.get();
		if (!canSelectTrack(currentState, config) || !shouldSelectTrack(currentState, config)) return;
		const selectedTrackId = currentState.presentation?.selectionSets.find(({ type }) => type === "audio")?.switchingSets[0]?.tracks[0]?.id;
		if (selectedTrackId) update(state, { selectedAudioTrackId: selectedTrackId });
	});
}
/**
* Select text track orchestration.
*
* Selects text track when:
* - Presentation exists
* - No text track is selected yet
*
* Note: Currently does not auto-select (user opt-in).
*
* @example
* const cleanup = selectTextTrack({ state, owners, events }, {});
*/
function selectTextTrack({ state }, config = { type: "text" }) {
	return effect(() => {
		const currentState = state.get();
		if (!canSelectTrack(currentState, config) || !shouldSelectTrack(currentState, config)) return;
		const selectedTextTrackId = pickTextTrack(currentState.presentation, config);
		if (selectedTextTrackId) update(state, { selectedTextTrackId });
	});
}

//#endregion
//#region ../spf/dist/dev/core/features/sync-preload-attribute.js
/**
* Syncs preload attribute from mediaElement to state.
*
* Watches the owners signal for mediaElement changes and copies the
* preload attribute to state when no explicit value has been set.
* An explicit value (set via SpfMedia.preload) always wins.
*
* @example
* const cleanup = syncPreloadAttribute({ state, owners });
*/
function syncPreloadAttribute({ state, owners }) {
	const mediaElement = computed(() => owners.get().mediaElement);
	return effect(() => {
		if (state.get().preload !== void 0) return;
		const preload = mediaElement.get()?.preload || void 0;
		if (preload === void 0) return;
		update(state, { preload });
	});
}

//#endregion
//#region ../spf/dist/dev/dom/features/end-of-stream.js
/**
* Check if the last segment of a track has been appended to a SourceBuffer.
*
* Checks by segment ID rather than a pipeline flag, so it is robust across
* quality switches (different tracks have different segment IDs) and
* back-buffer flushes (flushed segment IDs are removed from the model).
*/
function isLastSegmentAppended(segments, actor) {
	if (segments.length === 0) return true;
	const lastSeg = segments[segments.length - 1];
	if (!lastSeg) return false;
	return actor?.snapshot.get().context.segments.some((s) => s.id === lastSeg.id && !s.partial) ?? false;
}
/**
* Check if the last segment has been appended for each selected track.
*
* Handles video-only, audio-only, and video+audio scenarios.
* A track with no segments (e.g. unresolved) is considered not ready.
*/
function hasLastSegmentLoaded(state, owners) {
	const videoTrack = state.selectedVideoTrackId ? getSelectedTrack(state, "video") : void 0;
	const audioTrack = state.selectedAudioTrackId ? getSelectedTrack(state, "audio") : void 0;
	if (videoTrack && !isResolvedTrack(videoTrack)) return false;
	if (audioTrack && !isResolvedTrack(audioTrack)) return false;
	if (videoTrack && isResolvedTrack(videoTrack)) {
		if (!isLastSegmentAppended(videoTrack.segments, owners.videoBufferActor)) return false;
	}
	if (audioTrack && isResolvedTrack(audioTrack)) {
		if (!isLastSegmentAppended(audioTrack.segments, owners.audioBufferActor)) return false;
	}
	return true;
}
/**
* Check if we can call endOfStream.
*/
function canEndStream(state, owners) {
	return !!(owners.mediaSource && state.presentation);
}
/**
* Check if we should call endOfStream.
*/
function shouldEndStream(state, owners) {
	if (!canEndStream(state, owners)) return false;
	const { mediaElement } = owners;
	if ((owners.mediaSourceReadyState?.get() ?? owners.mediaSource?.readyState) !== "open") return false;
	if (mediaElement && mediaElement.readyState < HTMLMediaElement.HAVE_METADATA) return false;
	const hasVideoTrack = !!state.selectedVideoTrackId;
	const hasAudioTrack = !!state.selectedAudioTrackId;
	if (hasVideoTrack && !owners.videoBuffer) return false;
	if (hasAudioTrack && !owners.audioBuffer) return false;
	if (owners.videoBufferActor?.snapshot.get().value === "updating") return false;
	if (owners.audioBufferActor?.snapshot.get().value === "updating") return false;
	if (!hasLastSegmentLoaded(state, owners)) return false;
	if (mediaElement) {
		const videoTrack = hasVideoTrack ? getSelectedTrack(state, "video") : void 0;
		const audioTrack = hasAudioTrack ? getSelectedTrack(state, "audio") : void 0;
		const refTrack = videoTrack && isResolvedTrack(videoTrack) ? videoTrack : audioTrack && isResolvedTrack(audioTrack) ? audioTrack : void 0;
		if (refTrack && refTrack.segments.length > 0) {
			const lastSeg = refTrack.segments[refTrack.segments.length - 1];
			if (mediaElement.currentTime < lastSeg.startTime) return false;
		}
	}
	return true;
}
/**
* Wait for all currently-updating SourceBufferActors to finish.
* Uses actor state rather than raw SourceBuffer.updating so the wait is
* aligned with the same abstraction that owns all buffer operations.
*/
function waitForSourceBuffersReady$1(owners) {
	const updatingActors = [owners.videoBufferActor, owners.audioBufferActor].filter((actor) => actor !== void 0 && actor.snapshot.get().value === "updating");
	if (updatingActors.length === 0) return Promise.resolve();
	return Promise.all(updatingActors.map((actor) => new Promise((resolve) => {
		let cleanup;
		let resolved = false;
		cleanup = effect(() => {
			if (actor.snapshot.get().value !== "updating") {
				if (!resolved) {
					resolved = true;
					resolve();
				}
				queueMicrotask(() => cleanup?.());
			}
		});
	}))).then(() => void 0);
}
/**
* Get the highest buffered end time across all active SourceBuffers.
* Used to set the final duration from actual container timestamps rather
* than playlist metadata, which handles both shorter and longer cases.
*/
function getMaxBufferedEnd$1(owners) {
	let max = 0;
	for (const buf of [owners.videoBuffer, owners.audioBuffer]) if (buf && buf.buffered.length > 0) {
		const end = buf.buffered.end(buf.buffered.length - 1);
		if (end > max) max = end;
	}
	return max;
}
/**
* End of stream task (module-level, pure).
* Sets the final duration from actual buffered end time, then calls endOfStream().
*/
const endOfStreamTask = async ({ currentOwners }, _context) => {
	const { mediaSource } = currentOwners;
	if (mediaSource.readyState === "ended") return;
	await waitForSourceBuffersReady$1(currentOwners);
	if (mediaSource.readyState !== "open") return;
	const bufferedEnd = getMaxBufferedEnd$1(currentOwners);
	if (bufferedEnd > 0) mediaSource.duration = bufferedEnd;
	mediaSource.endOfStream();
	await new Promise((resolve) => requestAnimationFrame(resolve));
};
/**
* Call endOfStream when the last segment has been appended.
* This signals to the browser that the stream is complete.
*
* Per the MSE spec, appendBuffer() remains valid after endOfStream() —
* seeks that require re-appending earlier segments will still work.
* What becomes blocked is calling endOfStream() again, addSourceBuffer(),
* and MediaSource.duration updates.
*/
function endOfStream({ state, owners }) {
	const shouldEnd = computed(() => shouldEndStream(state.get(), owners.get()));
	let hasEnded = false;
	return effect(() => {
		if (!shouldEnd.get()) return;
		const currentOwners = owners.get();
		if (hasEnded) {
			if ((currentOwners.mediaSourceReadyState?.get() ?? currentOwners.mediaSource?.readyState) !== "open") return;
			hasEnded = false;
		}
		hasEnded = true;
		endOfStreamTask({ currentOwners }, {}).catch((error) => console.error("Failed to call endOfStream:", error));
	});
}

//#endregion
//#region ../spf/dist/dev/dom/media/mediasource-setup.js
/**
* MediaSource Setup
*
* Utilities for creating and configuring MediaSource/ManagedMediaSource
* for MSE (Media Source Extensions) playback.
*
* Global ManagedMediaSource types are defined in ./mediasource.d.ts
*/
/**
* Check if MediaSource API is supported.
*/
function supportsMediaSource() {
	return typeof MediaSource !== "undefined";
}
/**
* Check if ManagedMediaSource API is supported.
* ManagedMediaSource is a newer Safari API with better lifecycle management.
*/
function supportsManagedMediaSource() {
	return typeof ManagedMediaSource !== "undefined";
}
/**
* Create a MediaSource or ManagedMediaSource instance.
*
* @param options - Creation options
* @returns A MediaSource or ManagedMediaSource instance
* @throws Error if no MediaSource API is available
*
* @example
* const mediaSource = createMediaSource();
* const mediaElement = document.querySelector('video');
* attachMediaSource(mediaSource, mediaElement);
*/
function createMediaSource(options = {}) {
	const { preferManaged = false } = options;
	if (preferManaged && supportsManagedMediaSource()) return new ManagedMediaSource();
	if (supportsMediaSource()) return new MediaSource();
	throw new Error("MediaSource API is not supported");
}
/**
* Attach a MediaSource to an HTMLMediaElement.
*
* Uses srcObject for ManagedMediaSource (Safari), or createObjectURL for regular MediaSource.
*
* @param mediaSource - The MediaSource to attach
* @param mediaElement - The media element to attach to
* @returns Object with URL and detach function
*
* @example
* const mediaSource = createMediaSource();
* const { detach } = attachMediaSource(mediaSource, videoElement);
* // Use mediaSource...
* // Later, to clean up:
* detach();
*/
function attachMediaSource(mediaSource, mediaElement) {
	if (supportsManagedMediaSource() && mediaSource instanceof ManagedMediaSource) {
		mediaElement.disableRemotePlayback = true;
		mediaElement.srcObject = mediaSource;
		const detach = () => {
			mediaElement.srcObject = null;
			mediaElement.load();
		};
		return {
			url: "",
			detach
		};
	}
	const url = URL.createObjectURL(mediaSource);
	mediaElement.src = url;
	const detach = () => {
		mediaElement.removeAttribute("src");
		mediaElement.load();
		URL.revokeObjectURL(url);
	};
	return {
		url,
		detach
	};
}
/**
* Create a SourceBuffer on a MediaSource.
*
* @param mediaSource - The MediaSource (must be in 'open' state)
* @param mimeCodec - MIME type with codecs (e.g., 'video/mp4; codecs="avc1.42E01E"')
* @returns The created SourceBuffer
* @throws Error if MediaSource is not open or codec is unsupported
*
* @example
* const buffer = createSourceBuffer(mediaSource, 'video/mp4; codecs="avc1.42E01E"');
*/
function createSourceBuffer(mediaSource, mimeCodec) {
	if (mediaSource.readyState !== "open") throw new Error("MediaSource is not open");
	if (!isCodecSupported(mimeCodec)) throw new Error(`Codec not supported: ${mimeCodec}`);
	return mediaSource.addSourceBuffer(mimeCodec);
}
/**
* Check if a codec is supported.
*
* @param mimeCodec - MIME type with codecs string
* @returns True if the codec is supported
*
* @example
* if (isCodecSupported('video/mp4; codecs="avc1.42E01E"')) {
*   // Create source buffer
* }
*/
function isCodecSupported(mimeCodec) {
	if (!supportsMediaSource()) return false;
	return MediaSource.isTypeSupported(mimeCodec);
}
/**
* Create a reactive signal that mirrors `mediaSource.readyState`.
*
* Listens to `sourceopen`, `sourceended`, and `sourceclose` events and updates
* the signal accordingly, making readyState visible to the TC39 signal graph.
* Listeners are automatically removed when `signal` is aborted.
*
* @param mediaSource - The MediaSource to observe
* @param signal - AbortSignal that controls listener lifetime
* @returns A `Signal.ReadonlyState` that reflects the current `readyState`
*
* @example
* const controller = new AbortController();
* const readyState = observeMediaSourceReadyState(mediaSource, controller.signal);
* effect(() => {
*   if (readyState.get() === 'open') { ... }
* });
* // Later:
* controller.abort();
*/
function observeMediaSourceReadyState(mediaSource, abortSignal) {
	const readyState = signal(mediaSource.readyState);
	const update = () => readyState.set(mediaSource.readyState);
	const options = { signal: abortSignal };
	mediaSource.addEventListener("sourceopen", update, options);
	mediaSource.addEventListener("sourceended", update, options);
	mediaSource.addEventListener("sourceclose", update, options);
	return readyState;
}

//#endregion
//#region ../spf/dist/dev/dom/features/setup-mediasource.js
/**
* Setup MediaSource orchestration.
*
* Creates and attaches MediaSource when:
* - mediaElement exists in owners
* - presentation.url exists in state
*
* Updates owners.mediaSource after successful setup.
*/
function setupMediaSource({ state, owners }) {
	const abortController = new AbortController();
	const mediaElementSignal = computed(() => owners.get().mediaElement);
	const presentationUrlSignal = computed(() => state.get().presentation?.url);
	const canSetupSignal = computed(() => !!mediaElementSignal.get() && !!presentationUrlSignal.get());
	const mediaElementSrcSignal = computed(() => mediaElementSignal.get()?.src);
	const mediaSourceSignal = computed(() => owners.get().mediaSource);
	const shouldSetupSignal = computed(() => !mediaElementSrcSignal.get());
	const cleanupEffect = effect(() => {
		if (!canSetupSignal.get() || !shouldSetupSignal.get()) return;
		const mediaElement = mediaElementSignal.get();
		const { signal } = abortController;
		const mediaSource = createMediaSource({ preferManaged: true });
		const mediaSourceReadyState = observeMediaSourceReadyState(mediaSource, signal);
		attachMediaSource(mediaSource, mediaElement);
		const cleanupOwnersUpdateEffect = effect(() => {
			if (!!mediaSourceSignal.get() || mediaSourceReadyState.get() !== "open") return;
			owners.set(Object.assign({}, owners.get(), {
				mediaSource,
				mediaSourceReadyState
			}));
		});
		return () => {
			cleanupOwnersUpdateEffect();
		};
	});
	return () => {
		abortController?.abort();
		cleanupEffect();
	};
}

//#endregion
//#region ../spf/dist/dev/dom/media/source-buffer-actor.js
function snapshotBuffered(buffered) {
	const ranges = [];
	for (let i = 0; i < buffered.length; i++) ranges.push({
		start: buffered.start(i),
		end: buffered.end(i)
	});
	return ranges;
}
function appendInitTask(message, { getContext, sourceBuffer }) {
	return new Task(async (taskSignal) => {
		const ctx = getContext();
		if (taskSignal.aborted) return ctx;
		await appendSegment(sourceBuffer, message.data);
		return {
			...ctx,
			initTrackId: message.meta.trackId
		};
	});
}
function appendSegmentTask(message, { getContext, sourceBuffer, setContext }) {
	return new Task(async (taskSignal) => {
		const ctx = getContext();
		if (taskSignal.aborted) return ctx;
		const { meta } = message;
		const EPSILON = 1e-4;
		const filtered = ctx.segments.filter((s) => Math.abs(s.startTime - meta.startTime) >= EPSILON);
		if (!(message.data instanceof ArrayBuffer)) setContext({
			...ctx,
			segments: [...filtered, {
				id: meta.id,
				startTime: meta.startTime,
				duration: meta.duration,
				trackId: meta.trackId,
				...meta.trackBandwidth !== void 0 && { trackBandwidth: meta.trackBandwidth },
				partial: true
			}],
			bufferedRanges: ctx.bufferedRanges
		});
		await appendSegment(sourceBuffer, message.data, taskSignal);
		return {
			...ctx,
			segments: [...filtered, {
				id: meta.id,
				startTime: meta.startTime,
				duration: meta.duration,
				trackId: meta.trackId,
				...meta.trackBandwidth !== void 0 && { trackBandwidth: meta.trackBandwidth }
			}],
			bufferedRanges: snapshotBuffered(sourceBuffer.buffered)
		};
	});
}
function removeTask(message, { getContext, sourceBuffer }) {
	return new Task(async (taskSignal) => {
		const ctx = getContext();
		if (taskSignal.aborted) return ctx;
		await flushBuffer(sourceBuffer, message.start, message.end);
		const bufferedRanges = snapshotBuffered(sourceBuffer.buffered);
		const filtered = ctx.segments.filter((s) => {
			const midpoint = s.startTime + s.duration / 2;
			return bufferedRanges.some((r) => midpoint >= r.start && midpoint < r.end);
		});
		return {
			...ctx,
			segments: filtered,
			bufferedRanges
		};
	});
}
const messageTaskFactories = {
	"append-init": appendInitTask,
	"append-segment": appendSegmentTask,
	remove: removeTask
};
function messageToTask(message, options) {
	const factory = messageTaskFactories[message.type];
	return factory(message, options);
}
function createSourceBufferActor(sourceBuffer, initialContext) {
	const handleError = (e) => {
		if (!(e instanceof Error && e.name === "AbortError")) console.error("SourceBuffer operation failed:", e);
	};
	const onMessage = (msg, { transition, setContext, getContext, runner }) => {
		transition("updating");
		const task = messageToTask(msg, {
			getContext,
			sourceBuffer,
			setContext
		});
		runner.schedule(task).then(setContext, handleError);
	};
	return createMachineActor({
		runner: () => new SerialRunner(),
		initial: "idle",
		context: {
			segments: [],
			bufferedRanges: [],
			initTrackId: void 0,
			...initialContext
		},
		states: {
			idle: { on: {
				"append-init": onMessage,
				"append-segment": onMessage,
				remove: onMessage,
				batch: (msg, { transition, setContext, getContext, runner }) => {
					const { messages } = msg;
					if (messages.length === 0) return;
					transition("updating");
					messages.forEach((msg) => {
						const task = messageToTask(msg, {
							getContext,
							sourceBuffer,
							setContext
						});
						runner.schedule(task).then(setContext, handleError);
					});
				}
			} },
			updating: {
				onSettled: "idle",
				on: { cancel: (_, { runner }) => {
					runner.abortAll();
				} }
			}
		}
	});
}

//#endregion
//#region ../spf/dist/dev/dom/features/setup-sourcebuffer.js
const ActorKeyByType = {
	video: "videoBufferActor",
	audio: "audioBufferActor"
};
/**
* Build MIME codec string from track metadata.
*
* @param track - Resolved track with mimeType and codecs
* @returns MIME codec string (e.g., 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"')
*
* @example
* buildMimeCodec({ mimeType: 'video/mp4', codecs: ['avc1.42E01E'] })
* // => 'video/mp4; codecs="avc1.42E01E"'
*/
function buildMimeCodec(track) {
	const codecString = track.codecs?.join(",") ?? "";
	return `${track.mimeType}; codecs="${codecString}"`;
}
/**
* Setup all needed SourceBuffers as a single coordinated operation.
*
* Waits until ALL media tracks in the presentation are resolved with codecs,
* then creates every SourceBuffer in one synchronous block before setting
* owners. This guarantees that downstream consumers (e.g. loadSegments) never
* see a partial set of SourceBuffers — preventing the Firefox bug where
* appending to a video SourceBuffer before the audio SourceBuffer exists
* causes mozHasAudio to be permanently false.
*
* Handles video-only, audio-only, and combined presentations correctly:
* track types are derived from the presentation rather than hardcoded.
*
* @example
* const cleanup = setupSourceBuffers({ state, owners });
*/
function setupSourceBuffers({ state, owners }) {
	const presentationTypesSignal = computed(() => {
		const { presentation } = state.get();
		if (!presentation || !("selectionSets" in presentation)) return [];
		return presentation.selectionSets.map(({ type }) => type).filter((type) => type === "video" || type === "audio");
	});
	const canSetupSignal = computed(() => {
		const types = presentationTypesSignal.get();
		if (!owners.get().mediaSource || types.length === 0) return false;
		const s = state.get();
		return types.every((type) => {
			const track = getSelectedTrack(s, type);
			return track && isResolvedTrack(track) && !!track.codecs?.length;
		});
	});
	const shouldSetupSignal = computed(() => {
		const o = owners.get();
		return presentationTypesSignal.get().every((type) => !o[BufferKeyByType[type]]);
	});
	return effect(() => {
		if (!canSetupSignal.get() || !shouldSetupSignal.get()) return;
		const s = state.get();
		const o = owners.get();
		const patch = {};
		for (const type of presentationTypesSignal.get()) {
			const track = getSelectedTrack(s, type);
			const buffer = createSourceBuffer(o.mediaSource, buildMimeCodec(track));
			patch[BufferKeyByType[type]] = buffer;
			patch[ActorKeyByType[type]] = createSourceBufferActor(buffer);
		}
		update(owners, patch);
	});
}

//#endregion
//#region ../spf/dist/dev/dom/features/sync-text-tracks.js
function createTrackElement(track) {
	const el = document.createElement("track");
	el.id = track.id;
	el.kind = track.kind;
	el.label = track.label;
	el.toggleAttribute("data-src-track", true);
	if (track.language) el.srclang = track.language;
	if (track.default) el.default = true;
	return el;
}
function getModelTextTracks(presentation) {
	return presentation?.selectionSets?.find((s) => s.type === "text")?.switchingSets[0]?.tracks;
}
function syncModes(textTracks, selectedId) {
	for (let i = 0; i < textTracks.length; i++) {
		const track = textTracks[i];
		if (track.kind !== "subtitles" && track.kind !== "captions") continue;
		track.mode = track.id === selectedId ? "showing" : "disabled";
	}
}
/**
* Text track sync orchestration.
*
* A single `always` monitor keeps the reactor in sync with preconditions.
* `'set-up'` owns the full lifecycle of `<track>` elements:
*
* - **Effect 1** — creates `<track>` elements on entry; exit cleanup removes
*   them and clears `selectedTextTrackId` on any outbound transition.
* - **Effect 2** — owns mode sync, the Chromium settling-window guard, and
*   the `'change'` listener that bridges DOM state back to
*   `selectedTextTrackId`.
*
* @example
* const reactor = syncTextTracks({ state, owners });
* // later:
* reactor.destroy();
*/
function syncTextTracks({ state, owners }) {
	const mediaElementSignal = computed(() => owners.get().mediaElement);
	const modelTextTracksSignal = computed(() => getModelTextTracks(state.get().presentation), { equals(prevTextTracks, nextTextTracks) {
		if (prevTextTracks === nextTextTracks) return true;
		if (typeof prevTextTracks !== typeof nextTextTracks) return false;
		if (prevTextTracks?.length !== nextTextTracks?.length) return false;
		return !!nextTextTracks && nextTextTracks.every((nextTextTrack) => prevTextTracks?.some((prevTextTrack) => prevTextTrack.id === nextTextTrack.id));
	} });
	const selectedTextTrackIdSignal = computed(() => state.get().selectedTextTrackId);
	const preconditionsMetSignal = computed(() => !!mediaElementSignal.get() && !!modelTextTracksSignal.get()?.length);
	return createMachineReactor({
		initial: "preconditions-unmet",
		monitor: () => preconditionsMetSignal.get() ? "set-up" : "preconditions-unmet",
		states: {
			"preconditions-unmet": {},
			"set-up": {
				entry: () => {
					const mediaElement = mediaElementSignal.get();
					modelTextTracksSignal.get().forEach((track) => mediaElement.appendChild(createTrackElement(track)));
					return () => {
						mediaElement.querySelectorAll("track[data-src-track]:is([kind=\"subtitles\"],[kind=\"captions\"]").forEach((trackEl) => trackEl.remove());
						update(state, { selectedTextTrackId: void 0 });
					};
				},
				effects: () => {
					const mediaElement = untrack(() => mediaElementSignal.get());
					const selectedId = selectedTextTrackIdSignal.get();
					syncModes(mediaElement.textTracks, selectedId);
					let syncTimeout = setTimeout(() => {
						syncTimeout = void 0;
					}, 0);
					const onChange = () => {
						if (syncTimeout) {
							syncModes(mediaElement.textTracks, untrack(() => selectedTextTrackIdSignal.get()));
							return;
						}
						const newId = Array.from(mediaElement.textTracks).find((t) => t.mode === "showing" && (t.kind === "subtitles" || t.kind === "captions"))?.id;
						if (newId === untrack(() => selectedTextTrackIdSignal.get())) return;
						update(state, { selectedTextTrackId: newId });
					};
					const unlisten = listen(mediaElement.textTracks, "change", onChange);
					return () => {
						clearTimeout(syncTimeout ?? void 0);
						unlisten();
					};
				}
			}
		}
	});
}

//#endregion
//#region ../spf/dist/dev/dom/features/update-duration.js
/**
* Check if we can update MediaSource duration (have required data).
*/
function canUpdateDuration(state, owners) {
	return !!(owners.mediaSource && state.presentation && hasPresentationDuration(state.presentation));
}
/**
* Get the maximum buffered end time across all SourceBuffers.
*/
function getMaxBufferedEnd(owners) {
	let maxEnd = 0;
	const buffers = [owners.videoSourceBuffer, owners.audioSourceBuffer].filter((buf) => buf !== void 0);
	for (const buffer of buffers) {
		const { buffered } = buffer;
		if (buffered.length > 0) {
			const end = buffered.end(buffered.length - 1);
			if (end > maxEnd) maxEnd = end;
		}
	}
	return maxEnd;
}
/**
* Check if we should update MediaSource duration (conditions met).
*/
function shouldUpdateDuration(state, owners) {
	if (!canUpdateDuration(state, owners)) return false;
	const { mediaSource } = owners;
	const { presentation } = state;
	if ((owners.mediaSourceReadyState?.get() ?? owners.mediaSource?.readyState) !== "open") return false;
	const duration = presentation.duration;
	if (!Number.isFinite(duration) || Number.isNaN(duration) || duration <= 0) return false;
	return Number.isNaN(mediaSource.duration);
}
/**
* Wait for all currently-updating SourceBuffers to finish.
*
* The MSE spec forbids setting MediaSource.duration while any attached
* SourceBuffer has updating === true. This defers until all are idle.
*/
function waitForSourceBuffersReady(owners) {
	const updating = [owners.videoSourceBuffer, owners.audioSourceBuffer].filter((buf) => buf?.updating === true);
	if (updating.length === 0) return Promise.resolve();
	return Promise.all(updating.map((buf) => new Promise((resolve) => buf.addEventListener("updateend", () => resolve(), { once: true })))).then(() => void 0);
}
/**
* Update MediaSource duration when presentation duration becomes available.
*/
function updateDuration({ state, owners }) {
	let destroyed = false;
	let running = false;
	const cleanupEffect = effect(() => {
		const currentState = state.get();
		const currentOwners = owners.get();
		if (!shouldUpdateDuration(currentState, currentOwners) || running) return;
		const { mediaSource } = currentOwners;
		running = true;
		waitForSourceBuffersReady(currentOwners).then(() => {
			if (destroyed || mediaSource.readyState !== "open") return;
			let duration = currentState.presentation.duration;
			const maxBufferedEnd = getMaxBufferedEnd(currentOwners);
			if (maxBufferedEnd > duration) duration = maxBufferedEnd;
			mediaSource.duration = duration;
		}).finally(() => {
			running = false;
		});
	});
	return () => {
		destroyed = true;
		cleanupEffect();
	};
}

//#endregion
//#region ../spf/dist/dev/dom/playback-engine/engine.js
/**
* Create a POC playback engine.
*
* Wires together all orchestrations to create a reactive playback pipeline:
* 1. Resolve presentation (multivariant playlist)
* 2. Select initial video and audio tracks
* 3. Resolve selected tracks (media playlists)
* 4. Setup MediaSource
* 5. Setup SourceBuffers for video and audio
*
* Note: This is a POC - does not yet load/append segments.
*
* @param config - Playback engine configuration
* @returns Playback engine instance with state, owners, and destroy function
*
* @example
* const engine = createPlaybackEngine({
*   initialBandwidth: 2_000_000,
*   preferredAudioLanguage: 'en',
* });
*
* // Initialize by setting state and owners
* engine.owners.set({ ...engine.owners.get(), mediaElement: document.querySelector('video') });
* engine.state.set({
*   ...engine.state.get(),
*   presentation: { url: 'https://example.com/playlist.m3u8' },
*   preload: 'auto',
* });
*
* // Inspect state
* console.log(engine.state.get());
*
* // Cleanup
* engine.destroy();
*/
function createPlaybackEngine(config = {}) {
	const state = signal({ bandwidthState: {
		fastEstimate: 0,
		fastTotalWeight: 0,
		slowEstimate: 0,
		slowTotalWeight: 0,
		bytesSampled: 0
	} });
	const owners = signal({});
	const cleanups = [
		syncPreloadAttribute({
			state,
			owners
		}),
		trackPlaybackInitiated({
			state,
			owners
		}),
		resolvePresentation({ state }),
		selectVideoTrack({ state }, {
			type: "video",
			...config.initialBandwidth !== void 0 && { initialBandwidth: config.initialBandwidth }
		}),
		selectAudioTrack({ state }, {
			type: "audio",
			...config.preferredAudioLanguage !== void 0 && { preferredAudioLanguage: config.preferredAudioLanguage }
		}),
		selectTextTrack({ state }, {
			type: "text",
			...config.preferredSubtitleLanguage !== void 0 && { preferredSubtitleLanguage: config.preferredSubtitleLanguage },
			...config.includeForcedTracks !== void 0 && { includeForcedTracks: config.includeForcedTracks },
			...config.enableDefaultTrack !== void 0 && { enableDefaultTrack: config.enableDefaultTrack }
		}),
		resolveTrack({ state }, { type: "video" }),
		resolveTrack({ state }, { type: "audio" }),
		resolveTrack({ state }, { type: "text" }),
		calculatePresentationDuration({ state }),
		setupMediaSource({
			state,
			owners
		}),
		updateDuration({
			state,
			owners
		}),
		setupSourceBuffers({
			state,
			owners
		}),
		trackCurrentTime({
			state,
			owners
		}),
		switchQuality({ state }, config.initialBandwidth !== void 0 ? { defaultBandwidth: config.initialBandwidth } : {}),
		loadSegments({
			state,
			owners
		}, { type: "video" }),
		loadSegments({
			state,
			owners
		}, { type: "audio" }),
		endOfStream({
			state,
			owners
		}),
		syncTextTracks({
			state,
			owners
		}),
		loadTextTrackCues({
			state,
			owners
		})
	];
	return {
		state,
		owners,
		destroy: () => {
			cleanups.forEach((cleanup) => typeof cleanup === "function" ? cleanup() : cleanup.destroy());
			for (const value of Object.values(owners.get())) if (value !== null && typeof value === "object" && typeof value.destroy === "function") value.destroy();
			destroyVttParser();
		}
	};
}

//#endregion
//#region ../spf/dist/dev/dom/playback-engine/adapter.js
/**
* Mixin that adds SPF playback engine behavior to any base class.
*
* Implements the src/play() contract per the WHATWG HTML spec so that SPF can
* be used anywhere a media element API is expected.
*
* A new engine is created on every src assignment — this fully tears down all
* state, SourceBuffers, and in-flight requests from the previous source before
* the next one begins. The media element reference is preserved across src
* changes and re-applied to the new engine automatically.
*
* @example
* class SimpleHlsMedia extends SpfMediaMixin(HTMLVideoElementHost) {}
*
* const media = new SimpleHlsMedia();
* media.attach(document.querySelector('video'));
* media.src = 'https://stream.mux.com/abc123.m3u8';
*/
function SpfMediaMixin(BaseClass) {
	class SpfMediaImpl extends BaseClass {
		#engine;
		#config;
		#preload = "";
		/** Pending loadstart listener from a deferred play() retry, if any. */
		#loadstartListener = null;
		constructor(...args) {
			super(...args);
			const { config } = args?.[0] ?? {};
			this.#config = config;
			this.#engine = createPlaybackEngine(config);
		}
		get engine() {
			return this.#engine;
		}
		attach(mediaElement) {
			super.attach?.(mediaElement);
			update(this.#engine.owners, { mediaElement });
		}
		detach() {
			this.#cancelPendingPlay();
			update(this.#engine.owners, { mediaElement: void 0 });
			super.detach?.();
		}
		destroy() {
			this.#cancelPendingPlay();
			this.#engine.destroy();
		}
		get preload() {
			return this.#preload;
		}
		set preload(value) {
			this.#preload = value;
			if (value) update(this.#engine.state, { preload: value });
		}
		get src() {
			return this.#engine.state.get().presentation?.url ?? "";
		}
		set src(value) {
			const prevMediaElement = this.#engine.owners.get().mediaElement;
			this.#cancelPendingPlay();
			this.#engine.destroy();
			this.#engine = createPlaybackEngine(this.#config);
			if (this.#preload) update(this.#engine.state, { preload: this.#preload });
			if (prevMediaElement) update(this.#engine.owners, { mediaElement: prevMediaElement });
			if (value) update(this.#engine.state, { presentation: { url: value } });
		}
		play() {
			const { mediaElement } = this.#engine.owners.get();
			if (!mediaElement) return Promise.reject(/* @__PURE__ */ new Error("SpfMedia: no media element attached"));
			update(this.#engine.state, { playbackInitiated: true });
			return mediaElement.play().catch((err) => {
				if (this.src) return new Promise((resolve, reject) => {
					const listener = () => {
						this.#loadstartListener = null;
						mediaElement.play().then(resolve, reject);
					};
					this.#loadstartListener = listener;
					mediaElement.addEventListener("loadstart", listener, { once: true });
				});
				throw err;
			});
		}
		#cancelPendingPlay() {
			if (!this.#loadstartListener) return;
			const { mediaElement } = this.#engine.owners.get();
			mediaElement?.removeEventListener("loadstart", this.#loadstartListener);
			this.#loadstartListener = null;
		}
	}
	return SpfMediaImpl;
}

//#endregion
//#region ../core/dist/dev/dom/media/simple-hls/index.js
var SimpleHlsMedia = class extends SpfMediaMixin(HTMLVideoElementHost) {};

//#endregion
//#region src/media/simple-hls-video/index.ts
var SimpleHlsVideo = class extends MediaAttachMixin(CustomMediaElement("video", SimpleHlsMedia)) {};

//#endregion
//#region src/define/media/simple-hls-video.ts
var SimpleHlsVideoElement = class extends SimpleHlsVideo {
	static {
		this.tagName = "simple-hls-video";
	}
};
safeDefine(SimpleHlsVideoElement);

//#endregion
//# sourceMappingURL=simple-hls-video.dev.js.map