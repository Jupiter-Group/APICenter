import { C as selectTime, S as selectTextTrack, b as selectPlayback, g as createHotkey, v as selectFullscreen, w as selectVolume, x as selectPlaybackRate, y as selectPiP } from "./compounds-DD3MYkSc.js";
import { D as isUndefined, _ as getGestureCoordinator, j as ContextConsumer, k as MediaElement, n as PlayerController, w as isFunction } from "./create-player-BKLw7l1a.js";
import { r as playerContext, t as containerContext } from "./context-0rI_P6jf.js";

//#region ../core/dist/dev/dom/gesture/actions.js
/** Actions that need custom logic beyond `store.state[action]()`. */
const GESTURE_ACTION_OVERRIDES = {
	seekStep({ store, value }) {
		if (isUndefined(value)) return;
		const time = selectTime(store.state);
		if (!time) return;
		time.seek(time.currentTime + value);
	},
	volumeStep({ store, value }) {
		if (isUndefined(value)) return;
		const vol = selectVolume(store.state);
		if (!vol) return;
		vol.setVolume(vol.volume + value);
	},
	speedUp({ store }) {
		const rate = selectPlaybackRate(store.state);
		if (!rate) return;
		const { playbackRates, playbackRate } = rate;
		const idx = playbackRates.indexOf(playbackRate);
		const next = idx < 0 || idx >= playbackRates.length - 1 ? 0 : idx + 1;
		rate.setPlaybackRate(playbackRates[next]);
	},
	speedDown({ store }) {
		const rate = selectPlaybackRate(store.state);
		if (!rate) return;
		const { playbackRates, playbackRate } = rate;
		const idx = playbackRates.indexOf(playbackRate);
		const next = idx <= 0 ? playbackRates.length - 1 : idx - 1;
		rate.setPlaybackRate(playbackRates[next]);
	}
};
function resolveGestureAction(name) {
	const override = GESTURE_ACTION_OVERRIDES[name];
	if (override) return override;
	return ({ store }) => {
		const method = store.state[name];
		if (isFunction(method)) method();
		else console.warn(`[vjs-gesture] Unknown action: "${name}"`);
	};
}

//#endregion
//#region ../core/dist/dev/dom/gesture/tap.js
const DOUBLETAP_WINDOW = 200;
/**
* Recognizes tap vs doubletap from quick pointer-up events.
*
* Stateful recognizer — tracks tap count and doubletap timing.
* The coordinator handles pointer-down timing (tap threshold) and
* calls `handleUp()` only for quick taps that passed the threshold check.
*/
var TapRecognizer = class {
	#lastTapTime = 0;
	#tapTimer = null;
	handleUp(matches, event) {
		if (matches.resolve("doubletap").length > 0) {
			const now = Date.now();
			if (now - this.#lastTapTime < DOUBLETAP_WINDOW) {
				this.#clearTimer();
				this.#lastTapTime = 0;
				matches.resolve("doubletap")[0]?.onActivate(event);
				return;
			}
			this.#lastTapTime = now;
			this.#clearTimer();
			this.#tapTimer = setTimeout(() => {
				this.#tapTimer = null;
				this.#lastTapTime = 0;
				matches.resolve("tap")[0]?.onActivate(event);
			}, DOUBLETAP_WINDOW);
			return;
		}
		matches.resolve("tap")[0]?.onActivate(event);
	}
	#clearTimer() {
		if (this.#tapTimer !== null) {
			clearTimeout(this.#tapTimer);
			this.#tapTimer = null;
		}
	}
	reset() {
		this.#clearTimer();
		this.#lastTapTime = 0;
	}
};

//#endregion
//#region ../core/dist/dev/dom/gesture/create-tap-gesture.js
const recognizers = /* @__PURE__ */ new WeakMap();
function getRecognizer(target) {
	let recognizer = recognizers.get(target);
	if (recognizer) return recognizer;
	recognizer = new TapRecognizer();
	recognizers.set(target, recognizer);
	return recognizer;
}
/**
* Register a tap gesture on a target element.
*
* @example
* ```ts
* const cleanup = createTapGesture(container, (event) => {
*   store.paused ? store.play() : store.pause();
* }, { pointer: 'mouse' });
* ```
*/
function createTapGesture(target, onActivate, options) {
	return getGestureCoordinator(target).add({
		type: "tap",
		recognizer: getRecognizer(target),
		onActivate,
		pointer: options?.pointer,
		region: options?.region,
		disabled: options?.disabled,
		action: options?.action
	});
}
/**
* Register a doubletap gesture on a target element.
*
* @example
* ```ts
* const cleanup = createDoubleTapGesture(container, (event) => {
*   store.fullscreen ? store.exitFullscreen() : store.requestFullscreen();
* }, { region: 'center' });
* ```
*/
function createDoubleTapGesture(target, onActivate, options) {
	return getGestureCoordinator(target).add({
		type: "doubletap",
		recognizer: getRecognizer(target),
		onActivate,
		pointer: options?.pointer,
		region: options?.region,
		disabled: options?.disabled,
		action: options?.action
	});
}

//#endregion
//#region ../core/dist/dev/dom/hotkey/actions.js
function isHotkeyToggleAction(action) {
	return action.startsWith("toggle");
}
const HOTKEY_ACTIONS = {
	togglePaused({ store }) {
		const playback = selectPlayback(store.state);
		if (!playback) return;
		playback.paused ? playback.play() : playback.pause();
	},
	toggleMuted({ store }) {
		selectVolume(store.state)?.toggleMuted();
	},
	toggleFullscreen({ store }) {
		const fs = selectFullscreen(store.state);
		if (!fs) return;
		fs.fullscreen ? fs.exitFullscreen() : fs.requestFullscreen();
	},
	toggleSubtitles({ store }) {
		selectTextTrack(store.state)?.toggleSubtitles();
	},
	togglePictureInPicture({ store }) {
		const pip = selectPiP(store.state);
		if (!pip) return;
		pip.pip ? pip.exitPictureInPicture() : pip.requestPictureInPicture();
	},
	seekStep({ store, value }) {
		if (isUndefined(value)) return;
		const time = selectTime(store.state);
		if (!time) return;
		time.seek(time.currentTime + value);
	},
	volumeStep({ store, value }) {
		if (isUndefined(value)) return;
		const vol = selectVolume(store.state);
		if (!vol) return;
		vol.setVolume(vol.volume + value);
	},
	speedUp({ store }) {
		const rate = selectPlaybackRate(store.state);
		if (!rate) return;
		const { playbackRates, playbackRate } = rate;
		const idx = playbackRates.indexOf(playbackRate);
		const next = idx < 0 || idx >= playbackRates.length - 1 ? 0 : idx + 1;
		rate.setPlaybackRate(playbackRates[next]);
	},
	speedDown({ store }) {
		const rate = selectPlaybackRate(store.state);
		if (!rate) return;
		const { playbackRates, playbackRate } = rate;
		const idx = playbackRates.indexOf(playbackRate);
		const next = idx <= 0 ? playbackRates.length - 1 : idx - 1;
		rate.setPlaybackRate(playbackRates[next]);
	},
	seekToPercent({ store, value, key }) {
		const time = selectTime(store.state);
		if (!time || time.duration <= 0) return;
		let percent;
		if (!isUndefined(value)) percent = value;
		else if (key >= "0" && key <= "9") percent = Number(key) * 10;
		else return;
		time.seek(percent / 100 * time.duration);
	}
};
function resolveHotkeyAction(name) {
	const resolver = HOTKEY_ACTIONS[name];
	if (!resolver) console.warn(`[vjs-hotkey] Unknown action: "${name}"`);
	return resolver;
}

//#endregion
//#region src/ui/gesture/gesture-element.ts
var GestureElement = class extends MediaElement {
	constructor(..._args) {
		super(..._args);
		this.type = "";
		this.action = "";
		this.value = void 0;
		this.pointer = void 0;
		this.region = void 0;
		this.disabled = false;
	}
	static {
		this.tagName = "media-gesture";
	}
	static {
		this.properties = {
			type: { type: String },
			action: { type: String },
			value: { type: Number },
			pointer: { type: String },
			region: { type: String },
			disabled: { type: Boolean }
		};
	}
	#player = new PlayerController(this, playerContext);
	#container = new ContextConsumer(this, {
		context: containerContext,
		callback: () => this.requestUpdate(),
		subscribe: true
	});
	#cleanup = null;
	connectedCallback() {
		super.connectedCallback();
		this.style.display = "none";
		this.#register();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#unregister();
	}
	update(changed) {
		super.update(changed);
		if (this.isConnected) {
			this.#unregister();
			this.#register();
		}
	}
	#register() {
		const store = this.#player.value;
		const container = this.#container.value?.container;
		if (!this.type || !this.action || !store || !container) return;
		const resolver = resolveGestureAction(this.action);
		if (!resolver) return;
		const { value } = this;
		const onActivate = (event) => {
			resolver({
				store,
				value,
				event
			});
		};
		const options = {
			pointer: this.pointer,
			region: this.region,
			disabled: this.disabled,
			action: this.action
		};
		if (this.type === "doubletap") this.#cleanup = createDoubleTapGesture(container, onActivate, options);
		else this.#cleanup = createTapGesture(container, onActivate, options);
	}
	#unregister() {
		this.#cleanup?.();
		this.#cleanup = null;
	}
};

//#endregion
//#region src/ui/hotkey/hotkey-element.ts
var HotkeyElement = class extends MediaElement {
	constructor(..._args) {
		super(..._args);
		this.keys = "";
		this.action = "";
		this.value = void 0;
		this.disabled = false;
		this.target = "player";
	}
	static {
		this.tagName = "media-hotkey";
	}
	static {
		this.properties = {
			keys: { type: String },
			action: { type: String },
			value: { type: Number },
			disabled: { type: Boolean },
			target: { type: String }
		};
	}
	#player = new PlayerController(this, playerContext);
	#container = new ContextConsumer(this, {
		context: containerContext,
		callback: () => this.requestUpdate(),
		subscribe: true
	});
	#cleanup = null;
	connectedCallback() {
		super.connectedCallback();
		this.style.display = "none";
		this.#register();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#unregister();
	}
	update(changed) {
		super.update(changed);
		if (this.isConnected) {
			this.#unregister();
			this.#register();
		}
	}
	#register() {
		const store = this.#player.value;
		const container = this.#container.value?.container;
		if (!this.keys || !this.action || !store || !container) return;
		const resolver = resolveHotkeyAction(this.action);
		if (!resolver) return;
		const { value, action } = this;
		this.#cleanup = createHotkey(container, {
			keys: this.keys,
			action,
			target: this.target,
			disabled: this.disabled,
			repeatable: !isHotkeyToggleAction(action),
			onActivate: (_event, key) => {
				resolver({
					store,
					key,
					value
				});
			}
		});
	}
	#unregister() {
		this.#cleanup?.();
		this.#cleanup = null;
	}
};

//#endregion
export { GestureElement as n, HotkeyElement as t };
//# sourceMappingURL=hotkey-element-BONs_FyJ.js.map