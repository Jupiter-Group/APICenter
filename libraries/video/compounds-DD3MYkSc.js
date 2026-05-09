import { A as ContextProvider, C as AbortControllerRegistry, D as isUndefined, E as isNumber, N as isEditableTarget, P as isInteractiveActivation, S as throwNoTargetError, T as isNull, b as createState, c as timeFeature, d as playbackRateFeature, f as playbackFeature, g as controlsFeature, h as errorFeature, j as ContextConsumer, k as MediaElement, l as textTrackFeature, m as fullscreenFeature, n as PlayerController, p as pipFeature, r as SnapshotController, s as volumeFeature, u as sourceFeature, v as castFeature, w as isFunction, x as noop, y as bufferFeature } from "./create-player-BKLw7l1a.js";
import { t as listen } from "./listen-CJT7C4kM.js";
import { n as kebabCase, t as pick } from "./pick-D-wCJ3iA.js";
import { i as createContext, o as safeDefine, r as playerContext, t as containerContext } from "./context-0rI_P6jf.js";

//#region ../utils/dist/dom/direction.js
/** Check whether an element's text direction is right-to-left. */
function isRTL(element) {
	const dir = element.closest("[dir]")?.getAttribute("dir");
	if (dir) return dir.toLowerCase() === "rtl";
	return getComputedStyle(element).direction === "rtl";
}

//#endregion
//#region ../utils/dist/dom/supports.js
function supportsAnchorPositioning() {
	return typeof CSS !== "undefined" && CSS.supports("anchor-name: --a");
}

//#endregion
//#region ../utils/dist/dom/platform.js
function isMacOS() {
	return typeof navigator !== "undefined" && /mac/i.test(navigator.userAgent);
}

//#endregion
//#region ../utils/dist/dom/popover.js
function tryShowPopover(el) {
	try {
		el?.showPopover?.();
	} catch {}
}
function tryHidePopover(el) {
	try {
		el?.hidePopover?.();
	} catch {}
}

//#endregion
//#region ../utils/dist/dom/style.js
function applyStyles(element, styles) {
	for (const [prop, value] of Object.entries(styles)) if (typeof value === "string") {
		const key = prop.startsWith("--") ? prop : kebabCase(prop);
		element.style.setProperty(key, value);
	}
}
function resolveCSSLength(el, value) {
	const trimmed = value.trim();
	if (!trimmed) return 0;
	const parsed = Number.parseFloat(trimmed);
	if (Number.isNaN(parsed)) return 0;
	if (/^-?\d*\.?\d+$/.test(trimmed) || trimmed.endsWith("px")) return parsed;
	const doc = el.ownerDocument;
	const root = doc?.documentElement;
	if (trimmed.endsWith("rem")) return parsed * (root ? Number.parseFloat(getComputedStyle(root).fontSize) || 16 : 16);
	if (trimmed.endsWith("em")) return parsed * (el instanceof HTMLElement ? Number.parseFloat(getComputedStyle(el).fontSize) || 16 : 16);
	if (!doc) return parsed;
	const measurementEl = doc.createElement("div");
	measurementEl.style.position = "absolute";
	measurementEl.style.visibility = "hidden";
	measurementEl.style.pointerEvents = "none";
	measurementEl.style.inlineSize = trimmed;
	measurementEl.style.blockSize = "0";
	measurementEl.style.padding = "0";
	measurementEl.style.border = "0";
	measurementEl.style.inset = "0";
	const parent = doc.body ?? doc.documentElement;
	if (!parent) return parsed;
	parent.appendChild(measurementEl);
	const pixels = measurementEl.getBoundingClientRect().width;
	measurementEl.remove();
	return Number.isFinite(pixels) ? pixels : parsed;
}

//#endregion
//#region ../core/dist/dev/core/ui/transition.js
function getTransitionFlags(status) {
	return {
		transitionStarting: status === "starting",
		transitionEnding: status === "ending"
	};
}

//#endregion
//#region ../core/dist/dev/core/ui/alert-dialog/alert-dialog-core.js
var AlertDialogCore = class {
	static defaultProps = {
		open: false,
		defaultOpen: false
	};
	/** Accept props for API consistency. Props are consumed by platform layers. */
	setProps(_props) {}
	#input = null;
	#titleId = void 0;
	#descriptionId = void 0;
	setInput(input) {
		this.#input = input;
	}
	setTitleId(id) {
		this.#titleId = id;
	}
	setDescriptionId(id) {
		this.#descriptionId = id;
	}
	getState() {
		const input = this.#input;
		return {
			open: input.active,
			status: input.status,
			titleId: this.#titleId,
			descriptionId: this.#descriptionId,
			...getTransitionFlags(input.status)
		};
	}
	getAttrs(state) {
		return {
			role: "alertdialog",
			"aria-modal": "true",
			"aria-labelledby": state.titleId,
			"aria-describedby": state.descriptionId
		};
	}
};

//#endregion
//#region ../core/dist/dev/core/ui/alert-dialog/alert-dialog-data-attrs.js
const AlertDialogDataAttrs = {
	open: "data-open",
	transitionStarting: "data-starting-style",
	transitionEnding: "data-ending-style"
};

//#endregion
//#region ../utils/dist/object/defaults.js
/**
* Creates a new object with default values filled in for undefined properties.
*
* @example
* ```ts
* const props = { label: undefined, disabled: true };
* const defaultProps = { label: '', disabled: false };
* defaults(props, defaultProps); // { label: '', disabled: true }
* ```
*/
function defaults(object, defaultValues) {
	const result = { ...defaultValues };
	for (const key in object) if (!isUndefined(object[key])) result[key] = object[key];
	return result;
}

//#endregion
//#region ../store/dist/dev/core/selector.js
const stateContext = {
	target: throwNoTargetError,
	signals: new AbortControllerRegistry(),
	get: throwNoTargetError,
	set: throwNoTargetError
};
/**
* Create a type-safe selector for a slice's state.
*
* The selector returns the slice's state, or `undefined` if the slice
* is not configured in the store.
*
* @example
* ```ts
* const selectPlayback = createSelector(playbackSlice);
* selectPlayback(store.state); // { paused, play, pause, ... } | undefined
* selectPlayback.displayName;  // 'playback' (from slice name)
* ```
*
* @param slice - The slice to create a selector for.
*/
function createSelector(slice) {
	const initialState = slice.state(stateContext);
	const keys = Object.keys(initialState);
	const firstKey = keys[0];
	if (!firstKey) return Object.assign(() => void 0, { displayName: slice.name });
	return Object.assign((state) => {
		if (!(firstKey in state)) return void 0;
		return pick(state, keys);
	}, { displayName: slice.name });
}

//#endregion
//#region ../utils/dist/function/throttle.js
/**
* Throttle: limits `fn` to at most once per `ms` window.
*
* - Default (no options): trailing-edge only — the first call schedules a
*   timer; subsequent calls within the window update the arguments. The
*   function fires once per window with the latest arguments.
* - `{ leading: true }`: leading + trailing — the first call invokes
*   immediately and opens a cooldown window. Subsequent calls within the
*   window are coalesced to a single trailing-edge invocation.
*/
function throttle(fn, ms, options) {
	const leading = options?.leading ?? false;
	let timerId = null;
	let latestArgs;
	let hasPending = false;
	function startCooldown() {
		timerId = setTimeout(() => {
			timerId = null;
			if (hasPending) {
				hasPending = false;
				fn(...latestArgs);
				startCooldown();
			}
		}, ms);
	}
	const throttled = (...args) => {
		latestArgs = args;
		if (leading) if (timerId === null) {
			fn(...latestArgs);
			startCooldown();
		} else hasPending = true;
		else {
			if (timerId !== null) return;
			timerId = setTimeout(() => {
				timerId = null;
				fn(...latestArgs);
			}, ms);
		}
	};
	throttled.cancel = () => {
		if (timerId !== null) {
			clearTimeout(timerId);
			timerId = null;
		}
		hasPending = false;
	};
	return throttled;
}

//#endregion
//#region ../core/dist/dev/core/ui/controls/controls-core.js
var ControlsCore = class {
	#media = null;
	setMedia(media) {
		this.#media = media;
	}
	getState() {
		const media = this.#media;
		return {
			visible: media.controlsVisible,
			userActive: media.userActive
		};
	}
};

//#endregion
//#region ../core/dist/dev/core/ui/controls/controls-data-attrs.js
const ControlsDataAttrs = {
	visible: "data-visible",
	userActive: "data-user-active"
};

//#endregion
//#region ../core/dist/dev/core/ui/error-dialog/error-dialog-core.js
/** Error-dialog core: an alert dialog whose open state is driven by media error state. */
var ErrorDialogCore = class extends AlertDialogCore {
	setProps() {}
};

//#endregion
//#region ../core/dist/dev/core/ui/mute-button/mute-button-core.js
var MuteButtonCore = class MuteButtonCore {
	static defaultProps = {
		label: "",
		disabled: false
	};
	state = createState({
		muted: false,
		volumeLevel: "off",
		label: ""
	});
	#props = { ...MuteButtonCore.defaultProps };
	#media = null;
	constructor(props) {
		if (props) this.setProps(props);
	}
	setProps(props) {
		this.#props = defaults(props, MuteButtonCore.defaultProps);
	}
	getLabel(state) {
		const { label } = this.#props;
		if (isFunction(label)) {
			const customLabel = label(state);
			if (customLabel) return customLabel;
		} else if (label) return label;
		return state.muted ? "Unmute" : "Mute";
	}
	getAttrs(state) {
		return {
			"aria-label": this.getLabel(state),
			"aria-disabled": this.#props.disabled ? "true" : void 0
		};
	}
	setMedia(media) {
		this.#media = media;
	}
	getState() {
		const media = this.#media;
		this.state.patch({
			muted: media.muted || media.volume === 0,
			volumeLevel: getVolumeLevel(media)
		});
		this.state.patch({ label: this.getLabel(this.state.current) });
		return this.state.current;
	}
	toggle(media) {
		if (this.#props.disabled) return;
		media.toggleMuted();
	}
};
function getVolumeLevel(media) {
	if (media.muted || media.volume === 0) return "off";
	if (media.volume < .5) return "low";
	if (media.volume < .75) return "medium";
	return "high";
}

//#endregion
//#region ../core/dist/dev/core/ui/mute-button/mute-button-data-attrs.js
const MuteButtonDataAttrs = {
	muted: "data-muted",
	volumeLevel: "data-volume-level"
};

//#endregion
//#region ../core/dist/dev/core/ui/play-button/play-button-core.js
var PlayButtonCore = class PlayButtonCore {
	static defaultProps = {
		label: "",
		disabled: false
	};
	state = createState({
		paused: true,
		ended: false,
		started: false,
		label: ""
	});
	#props = { ...PlayButtonCore.defaultProps };
	#media = null;
	constructor(props) {
		if (props) this.setProps(props);
	}
	setProps(props) {
		this.#props = defaults(props, PlayButtonCore.defaultProps);
	}
	getLabel(state) {
		const { label } = this.#props;
		if (isFunction(label)) {
			const customLabel = label(state);
			if (customLabel) return customLabel;
		} else if (label) return label;
		if (state.ended) return "Replay";
		return state.paused ? "Play" : "Pause";
	}
	getAttrs(state) {
		return {
			"aria-label": this.getLabel(state),
			"aria-disabled": this.#props.disabled ? "true" : void 0
		};
	}
	setMedia(media) {
		this.#media = media;
	}
	getState() {
		const media = this.#media;
		this.state.patch({
			paused: media.paused,
			ended: media.ended,
			started: media.started
		});
		this.state.patch({ label: this.getLabel(this.state.current) });
		return this.state.current;
	}
	async toggle(media) {
		if (this.#props.disabled) return;
		if (media.paused || media.ended) return media.play();
		media.pause();
	}
};

//#endregion
//#region ../core/dist/dev/core/ui/play-button/play-button-data-attrs.js
const PlayButtonDataAttrs = {
	paused: "data-paused",
	ended: "data-ended",
	started: "data-started"
};

//#endregion
//#region ../core/dist/dev/core/ui/playback-rate-button/playback-rate-button-core.js
var PlaybackRateButtonCore = class PlaybackRateButtonCore {
	static defaultProps = {
		label: "",
		disabled: false
	};
	state = createState({
		rate: 1,
		label: ""
	});
	#props = { ...PlaybackRateButtonCore.defaultProps };
	#media = null;
	constructor(props) {
		if (props) this.setProps(props);
	}
	setProps(props) {
		this.#props = defaults(props, PlaybackRateButtonCore.defaultProps);
	}
	getLabel(state) {
		const { label } = this.#props;
		if (isFunction(label)) {
			const customLabel = label(state);
			if (customLabel) return customLabel;
		} else if (label) return label;
		return `Playback rate ${state.rate}`;
	}
	getAttrs(state) {
		return {
			"aria-label": this.getLabel(state),
			"aria-disabled": this.#props.disabled ? "true" : void 0
		};
	}
	setMedia(media) {
		this.#media = media;
	}
	getState() {
		const media = this.#media;
		this.state.patch({ rate: media.playbackRate });
		this.state.patch({ label: this.getLabel(this.state.current) });
		return this.state.current;
	}
	cycle(media) {
		if (this.#props.disabled) return;
		const { playbackRates, playbackRate } = media;
		if (playbackRates.length === 0) return;
		const idx = playbackRates.indexOf(playbackRate);
		const next = idx === -1 ? playbackRates.find((r) => r > playbackRate) ?? playbackRates[0] : playbackRates[(idx + 1) % playbackRates.length];
		media.setPlaybackRate(next);
	}
};

//#endregion
//#region ../core/dist/dev/core/ui/playback-rate-button/playback-rate-button-data-attrs.js
const PlaybackRateButtonDataAttrs = { rate: "data-rate" };

//#endregion
//#region ../core/dist/dev/core/ui/popover/popover-core.js
var PopoverCore = class PopoverCore {
	static defaultProps = {
		side: "top",
		align: "center",
		modal: false,
		closeOnEscape: true,
		closeOnOutsideClick: true,
		open: false,
		defaultOpen: false,
		openOnHover: false,
		delay: 300,
		closeDelay: 0
	};
	#props = { ...PopoverCore.defaultProps };
	constructor(props) {
		if (props) this.setProps(props);
	}
	setProps(props) {
		this.#props = defaults(props, PopoverCore.defaultProps);
	}
	#input = null;
	setInput(input) {
		this.#input = input;
	}
	getState() {
		const input = this.#input;
		return {
			open: input.active,
			status: input.status,
			side: this.#props.side,
			align: this.#props.align,
			modal: this.#props.modal,
			...getTransitionFlags(input.status)
		};
	}
	getTriggerAttrs(state, popupId) {
		return {
			"aria-expanded": state.open ? "true" : "false",
			"aria-haspopup": "dialog",
			"aria-controls": popupId
		};
	}
	getPopupAttrs(state) {
		return {
			popover: "manual",
			role: "dialog",
			"aria-modal": state.modal === true ? "true" : void 0
		};
	}
};

//#endregion
//#region ../core/dist/dev/core/ui/popover/popover-css-vars.js
const PopoverCSSVars = {
	sideOffset: "--media-popover-side-offset",
	alignOffset: "--media-popover-align-offset",
	anchorWidth: "--media-popover-anchor-width",
	anchorHeight: "--media-popover-anchor-height",
	availableWidth: "--media-popover-available-width",
	availableHeight: "--media-popover-available-height"
};

//#endregion
//#region ../core/dist/dev/core/ui/popover/popover-data-attrs.js
const PopoverDataAttrs = {
	open: "data-open",
	side: "data-side",
	align: "data-align",
	transitionStarting: "data-starting-style",
	transitionEnding: "data-ending-style"
};

//#endregion
//#region ../core/dist/dev/core/ui/seek-button/seek-button-core.js
var SeekButtonCore = class SeekButtonCore {
	static defaultProps = {
		seconds: 30,
		label: "",
		disabled: false
	};
	state = createState({
		seeking: false,
		direction: "forward",
		label: ""
	});
	#props = { ...SeekButtonCore.defaultProps };
	#media = null;
	constructor(props) {
		if (props) this.setProps(props);
	}
	setProps(props) {
		this.#props = defaults(props, SeekButtonCore.defaultProps);
	}
	getLabel(state) {
		const { label } = this.#props;
		if (isFunction(label)) {
			const customLabel = label(state);
			if (customLabel) return customLabel;
		} else if (label) return label;
		const abs = Math.abs(this.#props.seconds);
		return state.direction === "backward" ? `Seek backward ${abs} seconds` : `Seek forward ${abs} seconds`;
	}
	getAttrs(state) {
		return {
			"aria-label": this.getLabel(state),
			"aria-disabled": this.#props.disabled ? "true" : void 0
		};
	}
	setMedia(media) {
		this.#media = media;
	}
	getState() {
		const media = this.#media;
		const direction = this.#props.seconds < 0 ? "backward" : "forward";
		this.state.patch({
			seeking: media.seeking,
			direction
		});
		this.state.patch({ label: this.getLabel(this.state.current) });
		return this.state.current;
	}
	async seek(media) {
		if (this.#props.disabled) return;
		await media.seek(media.currentTime + this.#props.seconds);
	}
};

//#endregion
//#region ../core/dist/dev/core/ui/seek-button/seek-button-data-attrs.js
const SeekButtonDataAttrs = {
	seeking: "data-seeking",
	direction: "data-direction"
};

//#endregion
//#region ../utils/dist/number/number.js
/** Clamp a value between min and max (inclusive). */
function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}
/** Snap a value to the nearest step, offset from min. */
function roundToStep(value, step, min) {
	const nearest = Math.round((value - min) / step) * step + min;
	const dot = `${step}`.indexOf(".");
	return dot === -1 ? nearest : Number(nearest.toFixed(`${step}`.length - dot - 1));
}

//#endregion
//#region ../core/dist/dev/core/ui/slider/slider-core.js
/** Base slider logic: value mapping, ARIA attrs, and step calculations. */
var SliderCore = class SliderCore {
	static defaultProps = {
		label: "",
		step: 1,
		largeStep: 10,
		orientation: "horizontal",
		disabled: false,
		thumbAlignment: "center",
		value: 0,
		min: 0,
		max: 100
	};
	static defaultInput = {
		pointerPercent: 0,
		dragPercent: 0,
		dragging: false,
		pointing: false,
		focused: false
	};
	#props = { ...SliderCore.defaultProps };
	#input = { ...SliderCore.defaultInput };
	get props() {
		return this.#props;
	}
	get input() {
		return this.#input;
	}
	constructor(props) {
		if (props) this.setProps(props);
	}
	setProps(props) {
		this.#props = defaults(props, SliderCore.defaultProps);
	}
	setInput(input) {
		this.#input = input;
	}
	getSliderState(value) {
		const { orientation, disabled, thumbAlignment } = this.#props;
		const { pointerPercent, dragging, pointing, focused } = this.#input;
		return {
			value,
			fillPercent: this.percentFromValue(value),
			pointerPercent,
			dragging,
			pointing,
			interactive: dragging || pointing || focused,
			orientation,
			disabled,
			thumbAlignment
		};
	}
	getLabel(state) {
		const { label } = this.#props;
		if (isFunction(label)) {
			const customLabel = label(state);
			if (customLabel) return customLabel;
		} else if (label) return label;
		return "";
	}
	getAttrs(state) {
		return {
			role: "slider",
			tabIndex: state.disabled ? -1 : 0,
			autoComplete: "off",
			"aria-label": this.getLabel(state),
			"aria-valuemin": this.#props.min,
			"aria-valuemax": this.#props.max,
			"aria-valuenow": state.value,
			"aria-orientation": state.orientation,
			"aria-disabled": state.disabled ? "true" : void 0
		};
	}
	valueFromPercent(percent) {
		const { min, max, step } = this.#props;
		return roundToStep(clamp(min + percent / 100 * (max - min), min, max), step, min);
	}
	/** Convert percent to a clamped value without applying step rounding. */
	rawValueFromPercent(percent) {
		const { min, max } = this.#props;
		return clamp(min + percent / 100 * (max - min), min, max);
	}
	percentFromValue(value) {
		const { min, max } = this.#props;
		if (max === min) return 0;
		return (value - min) / (max - min) * 100;
	}
	/** Step as a percentage of the slider range. */
	getStepPercent() {
		const { step, min, max } = this.#props;
		const range = max - min;
		return range > 0 ? step / range * 100 : 0;
	}
	/** Large step as a percentage of the slider range. */
	getLargeStepPercent() {
		const { largeStep, min, max } = this.#props;
		const range = max - min;
		return range > 0 ? largeStep / range * 100 : 0;
	}
	adjustPercentForAlignment(rawPercent, thumbSize, trackSize) {
		if (this.#props.thumbAlignment === "center" || trackSize === 0) return rawPercent;
		const thumbHalf = thumbSize / trackSize * 100 / 2;
		const minPercent = thumbHalf;
		const maxPercent = 100 - thumbHalf;
		return minPercent + rawPercent / 100 * (maxPercent - minPercent);
	}
};

//#endregion
//#region ../core/dist/dev/core/ui/slider/slider-css-vars.js
/** CSS custom property names for slider visual state. */
const SliderCSSVars = {
	fill: "--media-slider-fill",
	pointer: "--media-slider-pointer",
	buffer: "--media-slider-buffer"
};

//#endregion
//#region ../core/dist/dev/core/ui/slider/slider-data-attrs.js
const SliderDataAttrs = {
	dragging: "data-dragging",
	pointing: "data-pointing",
	interactive: "data-interactive",
	orientation: "data-orientation",
	disabled: "data-disabled"
};

//#endregion
//#region ../core/dist/dev/core/ui/thumbnail/thumbnail-core.js
var ThumbnailCore = class {
	findActiveThumbnail(thumbnails, time) {
		if (thumbnails.length === 0) return void 0;
		let low = 0;
		let high = thumbnails.length - 1;
		let result;
		while (low <= high) {
			const mid = low + high >>> 1;
			const image = thumbnails[mid];
			if (time >= image.startTime) {
				result = image;
				low = mid + 1;
			} else high = mid - 1;
		}
		return result;
	}
	/**
	* Parse CSS constraint strings into numeric `ThumbnailConstraints`.
	*
	* Accepts any object with string `minWidth`/`maxWidth`/`minHeight`/`maxHeight`
	* properties — `CSSStyleDeclaration` satisfies this structurally.
	*/
	parseConstraints(raw) {
		const minW = parseFloat(raw.minWidth);
		const maxW = parseFloat(raw.maxWidth);
		const minH = parseFloat(raw.minHeight);
		const maxH = parseFloat(raw.maxHeight);
		return {
			minWidth: Number.isFinite(minW) ? minW : 0,
			maxWidth: Number.isFinite(maxW) ? maxW : Infinity,
			minHeight: Number.isFinite(minH) ? minH : 0,
			maxHeight: Number.isFinite(maxH) ? maxH : Infinity
		};
	}
	/**
	* Calculate a uniform scale factor that fits `tileWidth × tileHeight` within the
	* given CSS min/max constraints while preserving aspect ratio.
	*
	* - Scales down when the tile exceeds max constraints.
	* - Scales up when the tile is smaller than min constraints.
	* - Returns `1` when no scaling is needed.
	*/
	calculateScale(tileWidth, tileHeight, constraints) {
		const { minWidth, maxWidth, minHeight, maxHeight } = constraints;
		const maxRatio = Math.min(maxWidth / tileWidth, maxHeight / tileHeight);
		const minRatio = Math.max(minWidth / tileWidth, minHeight / tileHeight);
		if (Number.isFinite(maxRatio) && maxRatio < 1) return maxRatio;
		if (Number.isFinite(minRatio) && minRatio > 1) return minRatio;
		return 1;
	}
	/**
	* Compute container and image dimensions for the current thumbnail, scaled to
	* fit within the element's CSS min/max constraints.
	*
	* The container clips the sprite sheet via `overflow: hidden`, and the image is
	* positioned with `transform: translate()` to show the correct tile.
	*/
	resize(thumbnail, imgNaturalWidth, imgNaturalHeight, constraints) {
		const tileWidth = thumbnail.width ?? imgNaturalWidth;
		const tileHeight = thumbnail.height ?? imgNaturalHeight;
		if (!tileWidth || !tileHeight) return void 0;
		const scale = this.calculateScale(tileWidth, tileHeight, constraints);
		const coordX = thumbnail.coords?.x ?? 0;
		const coordY = thumbnail.coords?.y ?? 0;
		const inset = scale !== 1 ? 1 : 0;
		return {
			scale,
			containerWidth: Math.max(0, Math.floor(tileWidth * scale) - inset * 2),
			containerHeight: Math.max(0, Math.floor(tileHeight * scale) - inset * 2),
			imageWidth: Math.ceil(imgNaturalWidth * scale),
			imageHeight: Math.ceil(imgNaturalHeight * scale),
			offsetX: Math.ceil(coordX * scale) + inset,
			offsetY: Math.ceil(coordY * scale) + inset
		};
	}
	getState(loading, error, thumbnail) {
		return {
			loading,
			error,
			hidden: !loading && !thumbnail
		};
	}
	getAttrs(_state) {
		return {
			role: "img",
			"aria-hidden": "true"
		};
	}
};

//#endregion
//#region ../core/dist/dev/core/ui/thumbnail/thumbnail-data-attrs.js
const ThumbnailDataAttrs = {
	loading: "data-loading",
	error: "data-error",
	hidden: "data-hidden"
};

//#endregion
//#region ../core/dist/dev/core/ui/thumbnail/thumbnail-media-fragment.js
/** Parse `url#xywh=x,y,w,h` into a URL and optional sprite coordinates. */
function parseMediaFragment(text, baseURL) {
	const parts = text.trim().split("#");
	const rawURL = parts[0] ?? "";
	const hash = parts[1];
	const url = baseURL ? new URL(rawURL, baseURL).href : rawURL;
	if (!hash) return { url };
	const eqIndex = hash.indexOf("=");
	if (eqIndex === -1) return { url };
	const keys = hash.slice(0, eqIndex);
	const values = hash.slice(eqIndex + 1).split(",").map(Number);
	const data = {};
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const value = values[i];
		if (key && isNumber(value) && !Number.isNaN(value)) data[key] = value;
	}
	const result = { url };
	if (isNumber(data.w)) result.width = data.w;
	if (isNumber(data.h)) result.height = data.h;
	if (isNumber(data.x) && isNumber(data.y)) result.coords = {
		x: data.x,
		y: data.y
	};
	return result;
}
/**
* Convert an array of text cues (e.g. `VTTCue` from a `<track>` element)
* into {@link ThumbnailImage} entries by parsing the media-fragment in
* each cue's text.
*/
function mapCuesToThumbnails(cues, baseURL) {
	const images = [];
	for (const cue of cues) {
		const fragment = parseMediaFragment(cue.text, baseURL);
		const image = {
			url: fragment.url,
			startTime: cue.startTime,
			endTime: cue.endTime
		};
		if (fragment.width) image.width = fragment.width;
		if (fragment.height) image.height = fragment.height;
		if (fragment.coords) image.coords = fragment.coords;
		images.push(image);
	}
	return images;
}

//#endregion
//#region ../utils/dist/time/format.js
const UNIT_LABELS = [
	{
		singular: "hour",
		plural: "hours"
	},
	{
		singular: "minute",
		plural: "minutes"
	},
	{
		singular: "second",
		plural: "seconds"
	}
];
function isValidTime(value) {
	return isNumber(value) && Number.isFinite(value);
}
function toTimeUnitPhrase(value, unitIndex) {
	return `${value} ${value === 1 ? UNIT_LABELS[unitIndex]?.singular : UNIT_LABELS[unitIndex]?.plural}`;
}
/**
* Format seconds to digital display string.
*
* @param seconds - Time in seconds (can be negative)
* @param guide - Guide time (typically duration) to determine display format
* @returns Formatted string like "1:30" or "1:05:30"
*
* @example
* formatTime(90) // "1:30"
* formatTime(3661) // "1:01:01"
* formatTime(35, 3600) // "0:00:35" (guided by 1-hour duration)
* formatTime(35, 600) // "00:35" (guided by 10-minute duration)
*/
function formatTime(seconds, guide) {
	if (!isValidTime(seconds)) return "0:00";
	const negative = seconds < 0;
	const positiveSeconds = Math.abs(seconds);
	const h = Math.floor(positiveSeconds / 3600);
	const m = Math.floor(positiveSeconds / 60 % 60);
	const s = Math.floor(positiveSeconds % 60);
	const guideAbs = guide ? Math.abs(guide) : 0;
	const gh = Math.floor(guideAbs / 3600);
	const gm = Math.floor(guideAbs / 60 % 60);
	const showHours = h > 0 || gh > 0;
	const padMinutes = showHours || gm >= 10;
	const hoursStr = showHours ? `${h}:` : "";
	const minutesStr = `${padMinutes && m < 10 ? "0" : ""}${m}:`;
	const secondsStr = s < 10 ? `0${s}` : `${s}`;
	return `${negative ? "-" : ""}${hoursStr}${minutesStr}${secondsStr}`;
}
/**
* Format seconds to human-readable phrase for screen readers.
*
* @param seconds - Time in seconds (negative indicates remaining)
* @returns Human-readable phrase like "1 minute, 30 seconds"
*
* @example
* formatTimeAsPhrase(90) // "1 minute, 30 seconds"
* formatTimeAsPhrase(3661) // "1 hour, 1 minute, 1 second"
* formatTimeAsPhrase(-270) // "4 minutes, 30 seconds remaining"
*/
function formatTimeAsPhrase(seconds) {
	if (!isValidTime(seconds)) return "";
	const negative = seconds < 0;
	const positiveSeconds = Math.abs(seconds);
	const h = Math.floor(positiveSeconds / 3600);
	const m = Math.floor(positiveSeconds / 60 % 60);
	const s = Math.floor(positiveSeconds % 60);
	if (positiveSeconds === 0) return `${toTimeUnitPhrase(0, 2)}${negative ? " remaining" : ""}`;
	return `${[
		h,
		m,
		s
	].map((value, index) => value > 0 ? toTimeUnitPhrase(value, index) : null).filter(Boolean).join(", ")}${negative ? " remaining" : ""}`;
}
/**
* Convert seconds to ISO 8601 duration for datetime attribute.
*
* @param seconds - Time in seconds
* @returns ISO 8601 duration string like "PT1M30S"
*
* @example
* secondsToIsoDuration(90) // "PT1M30S"
* secondsToIsoDuration(3661) // "PT1H1M1S"
*/
function secondsToIsoDuration(seconds) {
	if (!isValidTime(seconds)) return "PT0S";
	const positiveSeconds = Math.abs(seconds);
	const h = Math.floor(positiveSeconds / 3600);
	const m = Math.floor(positiveSeconds / 60 % 60);
	const s = Math.floor(positiveSeconds % 60);
	let duration = "PT";
	if (h > 0) duration += `${h}H`;
	if (m > 0) duration += `${m}M`;
	if (s > 0 || duration === "PT") duration += `${s}S`;
	return duration;
}

//#endregion
//#region ../core/dist/dev/core/ui/time/time-core.js
const DEFAULT_LABELS = {
	current: "Current time",
	duration: "Duration",
	remaining: "Remaining"
};
var TimeCore = class TimeCore {
	static defaultProps = {
		type: "current",
		negativeSign: "-",
		label: ""
	};
	#props = { ...TimeCore.defaultProps };
	#media = null;
	constructor(props) {
		if (props) this.setProps(props);
	}
	setProps(props) {
		this.#props = defaults(props, TimeCore.defaultProps);
	}
	setMedia(media) {
		this.#media = media;
	}
	#getSeconds() {
		const media = this.#media;
		const { type } = this.#props;
		switch (type) {
			case "current": return media.currentTime;
			case "duration": return media.duration;
			case "remaining": return media.currentTime - media.duration;
			default: return 0;
		}
	}
	#getText() {
		const media = this.#media;
		const seconds = this.#getSeconds();
		return formatTime(Math.abs(seconds), media.duration);
	}
	#getPhrase() {
		const { type } = this.#props;
		const seconds = this.#getSeconds();
		if (type === "remaining") return formatTimeAsPhrase(seconds < 0 ? seconds : -Math.abs(seconds));
		return formatTimeAsPhrase(seconds);
	}
	#getDatetime() {
		const seconds = this.#getSeconds();
		return secondsToIsoDuration(Math.abs(seconds));
	}
	getLabel(state) {
		const { label } = this.#props;
		if (isFunction(label)) {
			const customLabel = label(state);
			if (customLabel) return customLabel;
		} else if (label) return label;
		return DEFAULT_LABELS[this.#props.type];
	}
	getAttrs(state) {
		return {
			"aria-label": this.getLabel(state),
			"aria-valuetext": state.phrase
		};
	}
	getState() {
		const seconds = this.#getSeconds();
		return {
			type: this.#props.type,
			seconds,
			negative: this.#props.type === "remaining" && seconds < 0,
			text: this.#getText(),
			phrase: this.#getPhrase(),
			datetime: this.#getDatetime()
		};
	}
};

//#endregion
//#region ../core/dist/dev/core/ui/time/time-data-attrs.js
const TimeDataAttrs = { type: "data-type" };

//#endregion
//#region ../core/dist/dev/core/ui/time-slider/time-slider-core.js
/** Time-domain slider: maps media time/buffer state to slider state. */
var TimeSliderCore = class TimeSliderCore extends SliderCore {
	static defaultProps = {
		...SliderCore.defaultProps,
		label: "Seek",
		changeThrottle: 100
	};
	#props = { ...TimeSliderCore.defaultProps };
	#media = null;
	constructor(props) {
		super();
		if (props) this.setProps(props);
	}
	setProps(props) {
		this.#props = defaults(props, TimeSliderCore.defaultProps);
		super.setProps({
			...props,
			min: 0
		});
	}
	setMedia(media) {
		this.#media = media;
	}
	getState() {
		const { duration, currentTime, seeking, buffered } = this.#media;
		super.setProps({
			...this.#props,
			min: 0,
			max: duration
		});
		const base = super.getSliderState(currentTime);
		const bufferedEnd = buffered.length > 0 ? buffered[buffered.length - 1][1] : 0;
		const bufferPercent = duration > 0 ? bufferedEnd / duration * 100 : 0;
		return {
			...base,
			currentTime,
			duration,
			seeking,
			bufferPercent
		};
	}
	getLabel(state) {
		return super.getLabel(state) || "Seek";
	}
	getAttrs(state) {
		const base = super.getAttrs(state);
		const announceValue = state.dragging ? this.rawValueFromPercent(state.pointerPercent) : state.value;
		const currentPhrase = formatTimeAsPhrase(announceValue);
		const durationPhrase = formatTimeAsPhrase(state.duration);
		const valuetext = durationPhrase ? `${currentPhrase} of ${durationPhrase}` : currentPhrase;
		return {
			...base,
			"aria-valuenow": announceValue,
			"aria-valuetext": valuetext
		};
	}
};

//#endregion
//#region ../core/dist/dev/core/ui/time-slider/time-slider-data-attrs.js
const TimeSliderDataAttrs = {
	...SliderDataAttrs,
	seeking: "data-seeking"
};

//#endregion
//#region ../core/dist/dev/core/ui/tooltip/tooltip-core.js
var TooltipCore = class TooltipCore {
	static defaultProps = {
		side: "top",
		align: "center",
		open: false,
		defaultOpen: false,
		delay: 600,
		closeDelay: 0,
		disableHoverablePopup: true,
		disabled: false
	};
	#props = { ...TooltipCore.defaultProps };
	constructor(props) {
		if (props) this.setProps(props);
	}
	setProps(props) {
		this.#props = defaults(props, TooltipCore.defaultProps);
	}
	#input = null;
	setInput(input) {
		this.#input = input;
	}
	getState() {
		const input = this.#input;
		return {
			open: input.active,
			status: input.status,
			side: this.#props.side,
			align: this.#props.align,
			...getTransitionFlags(input.status)
		};
	}
	getPopupAttrs(_state) {
		return {
			popover: "manual",
			role: "presentation"
		};
	}
};

//#endregion
//#region ../core/dist/dev/core/ui/tooltip/tooltip-css-vars.js
const TooltipCSSVars = {
	sideOffset: "--media-tooltip-side-offset",
	alignOffset: "--media-tooltip-align-offset",
	anchorWidth: "--media-tooltip-anchor-width",
	anchorHeight: "--media-tooltip-anchor-height",
	availableWidth: "--media-tooltip-available-width",
	availableHeight: "--media-tooltip-available-height"
};

//#endregion
//#region ../core/dist/dev/core/ui/tooltip/tooltip-data-attrs.js
const TooltipDataAttrs = {
	open: "data-open",
	side: "data-side",
	align: "data-align",
	transitionStarting: "data-starting-style",
	transitionEnding: "data-ending-style"
};

//#endregion
//#region ../core/dist/dev/core/ui/tooltip/tooltip-group-core.js
var TooltipGroupCore = class TooltipGroupCore {
	static defaultProps = {
		delay: 600,
		closeDelay: 0,
		timeout: 400
	};
	#props = { ...TooltipGroupCore.defaultProps };
	#lastCloseTime = 0;
	#isOpen = false;
	constructor(props) {
		if (props) this.setProps(props);
	}
	setProps(props) {
		this.#props = defaults(props, TooltipGroupCore.defaultProps);
	}
	get delay() {
		return this.#props.delay;
	}
	get closeDelay() {
		return this.#props.closeDelay;
	}
	shouldSkipDelay() {
		if (this.#isOpen) return true;
		return Date.now() - this.#lastCloseTime < this.#props.timeout;
	}
	notifyOpen() {
		this.#isOpen = true;
	}
	notifyClose() {
		this.#isOpen = false;
		this.#lastCloseTime = Date.now();
	}
};

//#endregion
//#region ../core/dist/dev/core/ui/volume-slider/volume-slider-core.js
/** Volume-domain slider: maps media volume/mute state to slider state. */
var VolumeSliderCore = class VolumeSliderCore extends SliderCore {
	static defaultProps = {
		...SliderCore.defaultProps,
		label: "Volume",
		wheelStep: 5
	};
	#media = null;
	constructor(props) {
		super();
		if (props) this.setProps(props);
	}
	setProps(props) {
		super.setProps(defaults(props, VolumeSliderCore.defaultProps));
	}
	setMedia(media) {
		this.#media = media;
	}
	getState() {
		const media = this.#media;
		const { volume, muted } = media;
		const effectivelyMuted = muted || volume === 0;
		const { dragging, dragPercent } = this.input;
		const volumePercent = volume * 100;
		const value = dragging ? this.valueFromPercent(dragPercent) : volumePercent;
		const base = super.getSliderState(value);
		return {
			...base,
			fillPercent: effectivelyMuted ? 0 : base.fillPercent,
			volume,
			muted: effectivelyMuted,
			availability: media.volumeAvailability
		};
	}
	/** Wheel step as a percentage of the slider range. */
	getWheelStepPercent() {
		const props = this.props;
		const range = props.max - props.min;
		return range > 0 ? props.wheelStep / range * 100 : 0;
	}
	getLabel(state) {
		return super.getLabel(state) || "Volume";
	}
	getAttrs(state) {
		const base = super.getAttrs(state);
		const valuetext = `${Math.round(state.value)} percent${state.muted ? ", muted" : ""}`;
		return {
			...base,
			"aria-valuetext": valuetext
		};
	}
};

//#endregion
//#region ../core/dist/dev/core/ui/volume-slider/volume-slider-data-attrs.js
const VolumeSliderDataAttrs = {
	...SliderDataAttrs,
	availability: "data-availability"
};

//#endregion
//#region ../core/dist/dev/dom/store/selectors.js
/** Select the buffer state (buffered ranges, percent buffered). */
const selectBuffer = createSelector(bufferFeature);
/** Select the cast state (cast connection state, availability). */
const selectCast = createSelector(castFeature);
/** Select the controls state (controls visible, user-active). */
const selectControls = createSelector(controlsFeature);
/** Select the error state (error, dismissed, dismissError). */
const selectError = createSelector(errorFeature);
/** Select the fullscreen state (fullscreen active, availability). */
const selectFullscreen = createSelector(fullscreenFeature);
/** Select the PiP state (picture-in-picture active, availability). */
const selectPiP = createSelector(pipFeature);
/** Select the playback state (paused, ended, play, pause, toggle). */
const selectPlayback = createSelector(playbackFeature);
/** Select the playback rate state (playbackRate, playbackRates, setPlaybackRate). */
const selectPlaybackRate = createSelector(playbackRateFeature);
/** Select the source state (src, type). */
const selectSource = createSelector(sourceFeature);
/** Select the text track state (chapters cues, thumbnail cues). */
const selectTextTrack = createSelector(textTrackFeature);
/** Select the time state (currentTime, duration, seek). */
const selectTime = createSelector(timeFeature);
/** Select the volume state (volume, muted, setVolume, setMuted). */
const selectVolume = createSelector(volumeFeature);

//#endregion
//#region ../core/dist/dev/dom/hotkey/aria.js
const ARIA_MODIFIER_MAP = {
	shift: "Shift",
	ctrl: "Control",
	alt: "Alt",
	meta: "Meta"
};
const MODIFIER_ORDER = [
	"ctrl",
	"shift",
	"alt",
	"meta"
];
/**
* Convert parsed key bindings to a WAI-ARIA `aria-keyshortcuts` formatted string.
*
* @example
* ```ts
* toAriaKeyShortcut(parseHotkeyPattern('Ctrl+Shift+f'));
* // "Control+Shift+f"
*
* toAriaKeyShortcut([...parseHotkeyPattern('k'), ...parseHotkeyPattern('Space')]);
* // "k Space"
* ```
*/
function toAriaKeyShortcut(bindings) {
	return bindings.map((b) => {
		const parts = [];
		for (const mod of MODIFIER_ORDER) if (b.modifiers.has(mod)) parts.push(ARIA_MODIFIER_MAP[mod]);
		parts.push(b.originalKey);
		return parts.join("+");
	}).join(" ");
}

//#endregion
//#region ../core/dist/dev/dom/hotkey/coordinator.js
var HotkeyCoordinator = class {
	#target;
	#bindings = [];
	#nextId = 0;
	#disconnect = null;
	#docDisconnect = null;
	/** Action name → bound keys. Controls query this to set `aria-keyshortcuts`. */
	#ariaRegistry = /* @__PURE__ */ new Map();
	#destroyed = false;
	constructor(target) {
		this.#target = target;
	}
	add(options) {
		const parsed = parseHotkeyPattern(options.keys);
		const binding = {
			parsed,
			options,
			id: this.#nextId++
		};
		this.#bindings.push(binding);
		this.#sortBindings();
		if (options.action) this.#addToAriaRegistry(options.action, parsed);
		if (options.target === "document") this.#connectDocument();
		else this.#connect();
		let removed = false;
		return () => {
			if (removed) return;
			removed = true;
			const idx = this.#bindings.indexOf(binding);
			if (idx !== -1) this.#bindings.splice(idx, 1);
			if (options.action) this.#removeFromAriaRegistry(options.action, parsed);
			this.#maybeDisconnect();
		};
	}
	getAriaKeys(action) {
		const bindings = this.#ariaRegistry.get(action);
		if (!bindings?.length) return void 0;
		return toAriaKeyShortcut(bindings);
	}
	destroy() {
		if (this.#destroyed) return;
		this.#destroyed = true;
		this.#disconnect?.abort();
		this.#disconnect = null;
		this.#docDisconnect?.abort();
		this.#docDisconnect = null;
		this.#bindings = [];
		this.#ariaRegistry.clear();
	}
	#sortBindings() {
		this.#bindings.sort((a, b) => {
			const specDiff = b.parsed[0].modifiers.size - a.parsed[0].modifiers.size;
			if (specDiff !== 0) return specDiff;
			return a.id - b.id;
		});
	}
	#connect() {
		if (this.#disconnect) return;
		this.#disconnect = new AbortController();
		listen(this.#target, "keydown", this.#handleEvent, { signal: this.#disconnect.signal });
	}
	#connectDocument() {
		if (this.#docDisconnect) return;
		this.#docDisconnect = new AbortController();
		listen(document, "keydown", this.#handleEvent, { signal: this.#docDisconnect.signal });
	}
	#maybeDisconnect() {
		const hasPlayer = this.#bindings.some((b) => b.options.target !== "document");
		const hasDoc = this.#bindings.some((b) => b.options.target === "document");
		if (!hasPlayer) {
			this.#disconnect?.abort();
			this.#disconnect = null;
		}
		if (!hasDoc) {
			this.#docDisconnect?.abort();
			this.#docDisconnect = null;
		}
	}
	#handleEvent = (event) => {
		if (event.key === "Unidentified") return;
		if (isInteractiveActivation(event)) return;
		const editable = isEditableTarget(event);
		for (const binding of this.#bindings) {
			const { options, parsed } = binding;
			if (options.disabled) continue;
			if (event.repeat && options.repeatable === false) continue;
			if (options.target === "document" !== (event.currentTarget === document)) continue;
			for (const p of parsed) {
				if (!matchesHotkeyEvent(p, event)) continue;
				if (editable && p.modifiers.size === 0) continue;
				event.preventDefault();
				options.onActivate(event, p.originalKey);
				return;
			}
		}
	};
	#addToAriaRegistry(action, bindings) {
		let existing = this.#ariaRegistry.get(action);
		if (!existing) {
			existing = [];
			this.#ariaRegistry.set(action, existing);
		}
		existing.push(...bindings);
	}
	#removeFromAriaRegistry(action, bindings) {
		const existing = this.#ariaRegistry.get(action);
		if (!existing) return;
		const filtered = existing.filter((b) => !bindings.includes(b));
		if (filtered.length === 0) this.#ariaRegistry.delete(action);
		else this.#ariaRegistry.set(action, filtered);
	}
};

//#endregion
//#region ../core/dist/dev/dom/hotkey/hotkey.js
const MODIFIER_KEYS = new Set([
	"shift",
	"ctrl",
	"alt",
	"meta"
]);
/**
* Parse a key pattern string into one or more bindings.
*
* @example
* ```ts
* parseHotkeyPattern('>');
* // [{ modifiers: Set(), key: '>', originalKey: '>' }]
*
* parseHotkeyPattern('0-9');
* // 10 bindings, one per digit
* ```
*/
function parseHotkeyPattern(pattern) {
	if (pattern === "0-9") return Array.from({ length: 10 }, (_, i) => ({
		modifiers: /* @__PURE__ */ new Set(),
		key: String(i),
		originalKey: String(i)
	}));
	const segments = pattern.split("+");
	const rawKey = segments.pop();
	const modifiers = /* @__PURE__ */ new Set();
	for (const seg of segments) {
		const lower = seg.toLowerCase();
		if (lower === "mod") modifiers.add(isMacOS() ? "meta" : "ctrl");
		else if (MODIFIER_KEYS.has(lower)) modifiers.add(lower);
		else console.warn(`[vjs-hotkey] Unknown modifier: "${seg}" in pattern "${pattern}"`);
	}
	return [{
		modifiers,
		key: rawKey === "Space" ? " " : rawKey.toLowerCase(),
		originalKey: rawKey
	}];
}
/**
* Single non-letter character — layout-dependent modifiers (Shift, Alt/Option)
* were used to produce the character itself, not as deliberate modifiers
* (e.g. Shift+. → ">", Option+Shift → ">" on some Mac layouts).
* Letters excluded because Shift changes case intentionally (k vs K).
* Named keys excluded because event.key.length > 1 (ArrowLeft, Tab, etc.).
*/
function isImplicitModifierKey(key) {
	return key.length === 1 && !/[a-z]/i.test(key);
}
/** Whether a parsed binding matches a keyboard event. */
function matchesHotkeyEvent(binding, event) {
	if (event.key === "Unidentified") return false;
	if (event.key.toLowerCase() !== binding.key) return false;
	const implicit = isImplicitModifierKey(event.key);
	const shiftKey = implicit ? event.shiftKey && binding.modifiers.has("shift") : event.shiftKey;
	const altKey = implicit ? event.altKey && binding.modifiers.has("alt") : event.altKey;
	if (shiftKey !== binding.modifiers.has("shift")) return false;
	if (event.ctrlKey !== binding.modifiers.has("ctrl")) return false;
	if (altKey !== binding.modifiers.has("alt")) return false;
	if (event.metaKey !== binding.modifiers.has("meta")) return false;
	return true;
}
const coordinators = /* @__PURE__ */ new WeakMap();
/** Look up the coordinator for a target element, if one exists. */
function findHotkeyCoordinator(target) {
	return coordinators.get(target);
}
function getCoordinator(target) {
	let coordinator = coordinators.get(target);
	if (!coordinator) {
		coordinator = new HotkeyCoordinator(target);
		coordinators.set(target, coordinator);
	}
	return coordinator;
}
/**
* Register a hotkey binding on a target element.
*
* @example
* ```ts
* const cleanup = createHotkey(container, {
*   keys: 'k',
*   onActivate: () => store.paused ? store.play() : store.pause(),
* });
*
* // Later: remove the binding
* cleanup();
* ```
*
* @returns A cleanup function that removes the binding.
*/
function createHotkey(target, options) {
	return getCoordinator(target).add(options);
}

//#endregion
//#region ../core/dist/dev/dom/ui/dismiss-layer.js
function createDismissLayer(options) {
	const { transition } = options;
	const state = transition.state;
	const abort = new AbortController();
	let docAbort = null;
	function open() {
		if (abort.signal.aborted) return null;
		const { active, status } = state.current;
		if (active && status !== "ending") return null;
		if (status === "ending") transition.cancel();
		return transition.open();
	}
	function close(element) {
		const { active, status } = state.current;
		if (abort.signal.aborted || !active || status === "ending") return null;
		return transition.close(element);
	}
	function setupDocumentListeners() {
		cleanupDocumentListeners();
		if (typeof document === "undefined") return;
		docAbort = new AbortController();
		const { signal } = docAbort;
		listen(document, "keydown", handleKeydown, { signal });
		options.onDocumentActive?.(signal);
	}
	function cleanupDocumentListeners() {
		docAbort?.abort();
		docAbort = null;
	}
	function handleKeydown(event) {
		if (event.key !== "Escape") return;
		if (!state.current.active) return;
		if (!(options.closeOnEscape?.() ?? true)) return;
		options.onEscapeDismiss(event);
	}
	const unsubscribe = state.subscribe(() => {
		if (state.current.active) setupDocumentListeners();
		else cleanupDocumentListeners();
	});
	abort.signal.addEventListener("abort", () => {
		unsubscribe();
		transition.destroy();
		cleanupDocumentListeners();
	});
	function destroy() {
		if (abort.signal.aborted) return;
		abort.abort();
	}
	return {
		input: state,
		open,
		close,
		signal: abort.signal,
		destroy
	};
}

//#endregion
//#region ../core/dist/dev/dom/ui/alert-dialog.js
function createAlertDialog(options) {
	const { onOpenChange } = options;
	let element = null;
	let previousFocus = null;
	let elementAbort = null;
	const layer = createDismissLayer({
		transition: options.transition,
		closeOnEscape: options.closeOnEscape,
		onEscapeDismiss(event) {
			event.stopPropagation();
			applyClose();
		}
	});
	const state = layer.input;
	function applyOpen() {
		previousFocus = document.activeElement;
		const opening = layer.open();
		if (!opening) return;
		onOpenChange(true);
		requestAnimationFrame(() => {
			if (layer.signal.aborted || !state.current.active) return;
			element?.focus();
		});
		opening.then(() => {
			if (layer.signal.aborted || !state.current.active) return;
			options.onOpenChangeComplete?.(true);
		});
	}
	function applyClose() {
		const closing = layer.close(element);
		if (!closing) return;
		onOpenChange(false);
		closing.then(() => {
			if (layer.signal.aborted) return;
			if (previousFocus) {
				previousFocus.focus();
				previousFocus = null;
			}
			options.onOpenChangeComplete?.(false);
		});
	}
	function setupElementListeners() {
		cleanupElementListeners();
		if (!element) return;
		elementAbort = new AbortController();
		const { signal } = elementAbort;
		listen(element, "click", handleElementClick, { signal });
	}
	function cleanupElementListeners() {
		elementAbort?.abort();
		elementAbort = null;
	}
	function handleElementClick(event) {
		if (event.target instanceof HTMLButtonElement) applyClose();
	}
	function setElement(el) {
		element = el;
		setupElementListeners();
	}
	layer.signal.addEventListener("abort", () => {
		cleanupElementListeners();
		element = null;
		previousFocus = null;
	});
	return {
		input: state,
		open: applyOpen,
		close: applyClose,
		setElement,
		destroy: layer.destroy
	};
}

//#endregion
//#region ../core/dist/dev/dom/ui/button.js
function createButton(options) {
	const { onActivate, isDisabled } = options;
	return {
		role: "button",
		tabIndex: 0,
		onClick(event) {
			if (isDisabled()) {
				event.preventDefault();
				return;
			}
			onActivate();
		},
		onPointerDown(event) {
			if (isDisabled()) event.preventDefault();
		},
		onMouseDown(event) {
			if (isDisabled()) event.preventDefault();
		},
		onKeyDown(event) {
			if (event.target !== event.currentTarget) return;
			if (isDisabled()) {
				if (event.key !== "Tab") event.preventDefault();
				return;
			}
			if (event.key === "Enter") {
				event.preventDefault();
				onActivate();
			} else if (event.key === " ") event.preventDefault();
		},
		onKeyUp(event) {
			if (event.target !== event.currentTarget) return;
			if (isDisabled()) return;
			if (event.key === " ") onActivate();
		}
	};
}

//#endregion
//#region ../core/dist/dev/dom/ui/popover/popover.js
function createPopover(options) {
	const { onOpenChange, closeOnOutsideClick } = options;
	let triggerEl = null;
	let popupEl = null;
	let hoverTimeout = null;
	const capturedPointers = /* @__PURE__ */ new Set();
	const layer = createDismissLayer({
		transition: options.transition,
		closeOnEscape: options.closeOnEscape,
		onEscapeDismiss(event) {
			event.preventDefault();
			applyClose("escape", event);
		},
		onDocumentActive(signal) {
			listen(document, "pointerdown", handleDocumentPointerdown, {
				capture: true,
				signal
			});
		}
	});
	const state = layer.input;
	function clearHoverTimeout() {
		if (hoverTimeout !== null) {
			clearTimeout(hoverTimeout);
			hoverTimeout = null;
		}
	}
	function canHover() {
		return globalThis.matchMedia?.("(hover: hover)")?.matches ?? false;
	}
	function canOpenOnFocus() {
		if (!canHover()) return false;
		return globalThis.matchMedia?.("(pointer: fine)")?.matches ?? false;
	}
	function canToggleOnClick() {
		if (!options.openOnHover?.()) return true;
		return canHover();
	}
	/**
	* The transition handler manages animation lifecycle via `createState`:
	*
	* **Open:** `transition.open()` patches `{ active: true, status: 'starting' }`.
	* After one RAF it patches `{ status: 'idle' }` and the promise resolves.
	* Frameworks render `data-starting-style` / `data-ending-style` via
	* `getPopupAttrs(state)` — no imperative DOM mutation needed.
	*
	* **Close:** `transition.close(el)` patches `{ status: 'ending' }` (keeping
	* `active: true` so the element stays mounted). After a double-RAF it waits
	* for `getAnimations()` to settle, then patches `{ active: false, status: 'idle' }`.
	*
	* `onOpenChange` fires immediately (before animations).
	* `onOpenChangeComplete` fires after animations finish.
	*/
	function applyOpen(reason, event) {
		const opening = layer.open();
		if (!opening) return;
		onOpenChange(true, event ? {
			reason,
			event
		} : { reason });
		opening.then(() => {
			if (layer.signal.aborted || !state.current.active) return;
			options.onOpenChangeComplete?.(true);
		});
	}
	function applyClose(reason, event) {
		const closing = layer.close(popupEl);
		if (!closing) return;
		onOpenChange(false, event ? {
			reason,
			event
		} : { reason });
		closing.then(() => {
			if (layer.signal.aborted) return;
			tryHidePopover(popupEl);
			options.onOpenChangeComplete?.(false);
		});
	}
	function open(reason = "click") {
		applyOpen(reason);
	}
	function close(reason = "click") {
		applyClose(reason);
	}
	function handleDocumentPointerdown(event) {
		if (!closeOnOutsideClick() || !state.current.active) return;
		const path = event.composedPath();
		if (triggerEl && path.includes(triggerEl) || popupEl && path.includes(popupEl)) return;
		applyClose("outside-click", event);
	}
	layer.signal.addEventListener("abort", () => {
		clearHoverTimeout();
		capturedPointers.clear();
		triggerEl = null;
		popupEl = null;
	});
	const triggerProps = {
		onClick(event) {
			if (!canToggleOnClick()) return;
			if (state.current.active && state.current.status !== "ending") applyClose("click", event);
			else applyOpen("click", event);
		},
		onPointerEnter(_event) {
			if (!options.openOnHover?.()) return;
			if (!canHover()) return;
			clearHoverTimeout();
			if (state.current.active) return;
			const delay = options.delay?.() ?? 300;
			hoverTimeout = setTimeout(() => applyOpen("hover"), delay);
		},
		onPointerLeave(_event) {
			if (!options.openOnHover?.()) return;
			if (!canHover()) return;
			clearHoverTimeout();
			if (!state.current.active) return;
			const closeDelay = options.closeDelay?.() ?? 0;
			hoverTimeout = setTimeout(() => applyClose("hover"), closeDelay);
		},
		onFocusIn(_event) {
			if (options.openOnHover?.()) {
				if (!canOpenOnFocus()) return;
				applyOpen("focus");
			}
		},
		onFocusOut(event) {
			const relatedTarget = event.relatedTarget;
			if (relatedTarget && (triggerEl?.contains(relatedTarget) || popupEl?.contains(relatedTarget))) return;
			if (options.openOnHover?.()) applyClose("blur");
		}
	};
	const popupProps = {
		onPointerEnter(_event) {
			if (!options.openOnHover?.()) return;
			clearHoverTimeout();
		},
		onPointerLeave(_event) {
			if (!options.openOnHover?.()) return;
			if (capturedPointers.size > 0) return;
			clearHoverTimeout();
			if (!state.current.active) return;
			const closeDelay = options.closeDelay?.() ?? 0;
			hoverTimeout = setTimeout(() => applyClose("hover"), closeDelay);
		},
		onGotPointerCapture(event) {
			capturedPointers.add(event.pointerId);
		},
		onLostPointerCapture(event) {
			capturedPointers.delete(event.pointerId);
		},
		onFocusOut(event) {
			const relatedTarget = event.relatedTarget;
			if (relatedTarget && (triggerEl?.contains(relatedTarget) || popupEl?.contains(relatedTarget))) return;
			applyClose("blur");
		}
	};
	function setTriggerElement(el) {
		triggerEl = el;
	}
	function setPopupElement(el) {
		if (!el && popupEl && state.current.active) tryHidePopover(popupEl);
		popupEl = el;
		if (el) {
			if (state.current.active) tryShowPopover(el);
		}
	}
	return {
		input: state,
		triggerProps,
		popupProps,
		get triggerElement() {
			return triggerEl;
		},
		setTriggerElement,
		setPopupElement,
		open,
		close,
		destroy: layer.destroy
	};
}

//#endregion
//#region ../core/dist/dev/dom/ui/popover/popover-positioning.js
const OPPOSITE_SIDE = {
	top: "bottom",
	bottom: "top",
	left: "right",
	right: "left"
};
/**
* Get positioning styles for the popup element.
*
* When the browser supports CSS Anchor Positioning, returns native CSS properties
* that reference the provided CSS var names for side/align offsets — no JS offset
* values needed.
*
* When rects are provided and anchor positioning is unsupported, falls back to
* manual JS-computed positioning. The caller must resolve offset CSS vars via
* `getComputedStyle` and pass them as `offsets`.
*
* Returns camelCase keys for standard CSS properties and `--*` keys for
* custom properties — compatible with both React's `style` prop and
* `applyStyles()` from `@webplayer/utils/dom`.
*/
function getAnchorPositionStyle(anchorName, opts, triggerRect, popupRect, boundaryRect, offsets, cssVars = PopoverCSSVars) {
	if (supportsAnchorPositioning()) return getAnchorPositionCSS(anchorName, opts, cssVars);
	if (triggerRect && popupRect) return {
		...getManualPositionStyle(triggerRect, popupRect, opts, offsets ?? {
			sideOffset: 0,
			alignOffset: 0
		}),
		...boundaryRect ? getPositioningCSSVars(triggerRect, boundaryRect, opts.side, cssVars) : {},
		position: "fixed",
		inset: "auto",
		margin: "0"
	};
	return {};
}
/** Generate style to set on the trigger for CSS Anchor Positioning. */
function getAnchorNameStyle(anchorName) {
	if (!supportsAnchorPositioning()) return {};
	return { anchorName: `--${anchorName}` };
}
function getAnchorPositionCSS(anchorName, opts, cssVars = PopoverCSSVars) {
	const SIDE_OFFSET_VAR = `var(${cssVars.sideOffset}, 0px)`;
	const ALIGN_OFFSET_VAR = `var(${cssVars.alignOffset}, 0px)`;
	const { side, align } = opts;
	const style = {
		positionAnchor: `--${anchorName}`,
		position: "fixed",
		inset: "auto",
		margin: "0",
		justifySelf: "normal",
		alignSelf: "normal",
		marginInlineStart: "0",
		marginBlockStart: "0"
	};
	const insetProp = OPPOSITE_SIDE[side];
	if (side === "top" || side === "bottom") {
		style[insetProp] = `calc(anchor(${side}) + ${SIDE_OFFSET_VAR})`;
		if (align === "start") style.left = `calc(anchor(left) + ${ALIGN_OFFSET_VAR})`;
		else if (align === "end") style.right = `calc(anchor(right) + ${ALIGN_OFFSET_VAR})`;
		else {
			style.justifySelf = "anchor-center";
			style.marginInlineStart = ALIGN_OFFSET_VAR;
		}
	} else {
		style[insetProp] = `calc(anchor(${side}) + ${SIDE_OFFSET_VAR})`;
		if (align === "start") style.top = `calc(anchor(top) + ${ALIGN_OFFSET_VAR})`;
		else if (align === "end") style.bottom = `calc(anchor(bottom) + ${ALIGN_OFFSET_VAR})`;
		else {
			style.alignSelf = "anchor-center";
			style.marginBlockStart = ALIGN_OFFSET_VAR;
		}
	}
	return style;
}
/**
* Compute CSS variables for sizing constraints relative to the anchor/boundary.
*
* Accepts a `cssVars` map so the same logic works for both popover
* (`--media-popover-*`) and tooltip (`--media-tooltip-*`) namespaces.
*/
function getPositioningCSSVars(triggerRect, boundaryRect, side, cssVars = PopoverCSSVars) {
	const vars = {};
	vars[cssVars.anchorWidth] = `${triggerRect.width}px`;
	vars[cssVars.anchorHeight] = `${triggerRect.height}px`;
	if (side === "top" || side === "bottom") {
		vars[cssVars.availableHeight] = side === "top" ? `${triggerRect.top - boundaryRect.top}px` : `${boundaryRect.bottom - triggerRect.bottom}px`;
		vars[cssVars.availableWidth] = `${boundaryRect.width}px`;
	} else {
		vars[cssVars.availableWidth] = side === "left" ? `${triggerRect.left - boundaryRect.left}px` : `${boundaryRect.right - triggerRect.right}px`;
		vars[cssVars.availableHeight] = `${boundaryRect.height}px`;
	}
	return vars;
}
/**
* Compute manual positioning when CSS Anchor Positioning is not supported.
*
* Returns inline `top`/`left` styles in **viewport coordinates** for use
* with `position: fixed` (the popup is in the top layer). All rects from
* `getBoundingClientRect()` are already viewport-relative.
*
* Offsets are resolved by the caller from CSS custom properties via
* `getComputedStyle()` and passed as `offsets`.
*/
function getManualPositionStyle(triggerRect, popupRect, opts, offsets = {
	sideOffset: 0,
	alignOffset: 0
}) {
	const { side, align } = opts;
	const { sideOffset, alignOffset } = offsets;
	let top = 0;
	let left = 0;
	if (side === "top") top = triggerRect.top - popupRect.height - sideOffset;
	else if (side === "bottom") top = triggerRect.bottom + sideOffset;
	else if (side === "left") left = triggerRect.left - popupRect.width - sideOffset;
	else left = triggerRect.right + sideOffset;
	if (side === "top" || side === "bottom") if (align === "start") left = triggerRect.left + alignOffset;
	else if (align === "end") left = triggerRect.right - popupRect.width + alignOffset;
	else left = triggerRect.left + (triggerRect.width - popupRect.width) / 2 + alignOffset;
	else if (align === "start") top = triggerRect.top + alignOffset;
	else if (align === "end") top = triggerRect.bottom - popupRect.height + alignOffset;
	else top = triggerRect.top + (triggerRect.height - popupRect.height) / 2 + alignOffset;
	return {
		top: `${top}px`,
		left: `${left}px`
	};
}
/**
* Read side-offset and align-offset CSS custom properties from the
* popup element's computed style, returning numeric pixel values.
*/
function resolveOffsets(el, cssVars = PopoverCSSVars) {
	const computed = getComputedStyle(el);
	return {
		sideOffset: resolveCSSLength(el, computed.getPropertyValue(cssVars.sideOffset)),
		alignOffset: resolveCSSLength(el, computed.getPropertyValue(cssVars.alignOffset))
	};
}
/**
* Measure the popup's layout box for positioning.
*
* `getBoundingClientRect()` includes active transforms, which causes the
* fallback position to drift while opening/closing animations scale the popup.
* Using `offsetWidth`/`offsetHeight` preserves the untransformed size.
*/
function getPopupPositionRect(el) {
	const rect = el.getBoundingClientRect();
	const width = el.offsetWidth || rect.width;
	const height = el.offsetHeight || rect.height;
	const adjustedRect = {
		...rect,
		width,
		height,
		right: rect.left + width,
		bottom: rect.top + height
	};
	return {
		...adjustedRect,
		toJSON: () => adjustedRect
	};
}

//#endregion
//#region ../core/dist/dev/dom/utils/pointer.js
/** Convert a pointer event position to a 0–100 percent along an element's rect. */
function getPercentFromPointerEvent(event, rect, orientation, isRTL) {
	let ratio;
	if (orientation === "vertical") ratio = 1 - (event.clientY - rect.top) / rect.height;
	else if (isRTL) ratio = (rect.right - event.clientX) / rect.width;
	else ratio = (event.clientX - rect.left) / rect.width;
	if (!Number.isFinite(ratio)) return 0;
	return clamp(ratio * 100, 0, 100);
}

//#endregion
//#region ../core/dist/dev/dom/ui/slider.js
function createSlider(options) {
	const input = createState({
		pointerPercent: 0,
		dragPercent: 0,
		dragging: false,
		pointing: false,
		focused: false
	});
	const abort = new AbortController();
	const changeThrottleMs = options.changeThrottle ?? 0;
	let isDragging = false, cachedRTL = false, cachedRect = null, capturedPointerId = null, lastDragPercent = 0, committedOnRelease = false;
	const throttledChange = changeThrottleMs > 0 ? throttle((percent) => options.onValueChange?.(percent), changeThrottleMs, { leading: true }) : null;
	/** Fire `onValueChange` — throttled during drag when `changeThrottle > 0`. */
	function fireChange(percent, duringDrag) {
		if (duringDrag && throttledChange) throttledChange(percent);
		else options.onValueChange?.(percent);
	}
	function releaseCapture() {
		if (isNull(capturedPointerId)) return;
		const id = capturedPointerId;
		capturedPointerId = null;
		try {
			options.getElement().releasePointerCapture(id);
		} catch {}
	}
	function endDrag() {
		if (!isDragging) input.patch({ pointing: false });
		else {
			if (!committedOnRelease) options.onValueCommit?.(lastDragPercent);
			isDragging = false;
			input.patch({
				dragging: false,
				pointing: false
			});
			options.onDragEnd?.();
		}
		committedOnRelease = false;
		cleanup();
	}
	function cleanup() {
		throttledChange?.cancel();
		capturedPointerId = null;
		cachedRect = null;
	}
	const rootProps = {
		onPointerDown(event) {
			if (options.isDisabled()) return;
			event.stopPropagation();
			event.preventDefault();
			const el = options.getElement();
			cachedRect = el.getBoundingClientRect();
			cachedRTL = options.isRTL();
			committedOnRelease = false;
			releaseCapture();
			capturedPointerId = event.pointerId;
			el.setPointerCapture(event.pointerId);
			const percent = getPercentFromPointerEvent(event, cachedRect, options.getOrientation(), cachedRTL);
			isDragging = true;
			lastDragPercent = percent;
			input.patch({
				pointing: true,
				dragging: true,
				pointerPercent: percent,
				dragPercent: percent
			});
			options.onDragStart?.();
			options.onValueChange?.(percent);
			options.getThumbElement?.()?.focus({
				preventScroll: true,
				focusVisible: false
			});
		},
		onPointerMove(event) {
			if (options.isDisabled()) return;
			if (!isNull(capturedPointerId)) {
				if (event.pointerType !== "touch" && event.buttons === 0) {
					endDrag();
					return;
				}
				const percent = getPercentFromPointerEvent(event, cachedRect, options.getOrientation(), cachedRTL);
				lastDragPercent = percent;
				input.patch({
					dragPercent: percent,
					pointerPercent: percent
				});
				fireChange(percent, true);
				return;
			}
			const percent = getPercentFromPointerEvent(event, options.getElement().getBoundingClientRect(), options.getOrientation(), options.isRTL());
			input.patch({
				pointing: true,
				pointerPercent: percent
			});
		},
		onPointerUp(event) {
			if (options.isDisabled()) return;
			event.stopPropagation();
			if (isNull(capturedPointerId)) return;
			const percent = getPercentFromPointerEvent(event, cachedRect, options.getOrientation(), cachedRTL);
			throttledChange?.cancel();
			options.onValueChange?.(percent);
			options.onValueCommit?.(percent);
			committedOnRelease = true;
		},
		onPointerLeave() {
			if (!isNull(capturedPointerId)) return;
			input.patch({ pointing: false });
		},
		onLostPointerCapture() {
			endDrag();
		}
	};
	const thumbProps = {
		onKeyDown(event) {
			if (options.isDisabled()) {
				if (event.key !== "Tab") event.preventDefault();
				return;
			}
			const stepPercent = options.getStepPercent();
			const largeStepPercent = options.getLargeStepPercent();
			const rounded = roundToStep(options.getPercent(), stepPercent, 0);
			const horizontalSign = options.isRTL() ? -1 : 1;
			const step = event.shiftKey ? largeStepPercent : stepPercent;
			let newPercent = null;
			switch (event.key) {
				case "ArrowRight":
					newPercent = rounded + step * horizontalSign;
					break;
				case "ArrowLeft":
					newPercent = rounded - step * horizontalSign;
					break;
				case "ArrowUp":
					newPercent = rounded + step;
					break;
				case "ArrowDown":
					newPercent = rounded - step;
					break;
				case "PageUp":
					newPercent = rounded + largeStepPercent;
					break;
				case "PageDown":
					newPercent = rounded - largeStepPercent;
					break;
				case "Home":
					newPercent = 0;
					break;
				case "End":
					newPercent = 100;
					break;
				default:
					if (!event.metaKey && !event.ctrlKey && !event.altKey && event.key >= "0" && event.key <= "9") newPercent = Number(event.key) * 10;
					break;
			}
			if (newPercent !== null) {
				event.preventDefault();
				newPercent = clamp(newPercent, 0, 100);
				input.patch({
					pointerPercent: newPercent,
					dragPercent: newPercent
				});
				options.onValueChange?.(newPercent);
				options.onValueCommit?.(newPercent);
			}
		},
		onFocus() {
			input.patch({ focused: true });
		},
		onBlur() {
			input.patch({ focused: false });
		}
	};
	function adjustForAlignment(state) {
		if (!options.adjustPercent || state.thumbAlignment !== "edge") return state;
		const rootEl = options.getElement();
		const thumbEl = options.getThumbElement?.();
		if (!thumbEl) return state;
		const isHorizontal = state.orientation === "horizontal";
		const thumbSize = isHorizontal ? thumbEl.offsetWidth : thumbEl.offsetHeight;
		const trackSize = isHorizontal ? rootEl.offsetWidth : rootEl.offsetHeight;
		return {
			...state,
			fillPercent: options.adjustPercent(state.fillPercent, thumbSize, trackSize),
			pointerPercent: options.adjustPercent(state.pointerPercent, thumbSize, trackSize)
		};
	}
	let resizeObserver = null;
	if (options.onResize) {
		resizeObserver = new ResizeObserver(() => options.onResize());
		resizeObserver.observe(options.getElement());
	}
	return {
		input,
		rootProps,
		rootStyle: {
			touchAction: "none",
			userSelect: "none"
		},
		thumbProps,
		adjustForAlignment,
		destroy() {
			if (abort.signal.aborted) return;
			abort.abort();
			resizeObserver?.disconnect();
			releaseCapture();
			cleanup();
		}
	};
}

//#endregion
//#region ../core/dist/dev/dom/ui/slider-css-vars.js
function getSliderCSSVars(state) {
	return {
		[SliderCSSVars.fill]: `${state.fillPercent.toFixed(3)}%`,
		[SliderCSSVars.pointer]: `${state.pointerPercent.toFixed(3)}%`
	};
}
function getTimeSliderCSSVars(state) {
	return {
		...getSliderCSSVars(state),
		[SliderCSSVars.buffer]: `${state.bufferPercent.toFixed(3)}%`
	};
}
/** Compute structural positioning styles for a slider preview element. */
function getSliderPreviewStyle(width, overflow) {
	const halfWidth = width / 2;
	return {
		position: "absolute",
		left: overflow === "visible" ? `calc(var(${SliderCSSVars.pointer}) - ${halfWidth}px)` : `min(max(0px, calc(var(${SliderCSSVars.pointer}) - ${halfWidth}px)), calc(100% - ${width}px))`,
		width: "max-content",
		pointerEvents: "none"
	};
}

//#endregion
//#region ../core/dist/dev/dom/ui/thumbnail.js
function createThumbnail(options) {
	const { getContainer, getImg, onStateChange } = options;
	const core = new ThumbnailCore();
	const abort = new AbortController();
	const signal = abort.signal;
	let loading = false;
	let error = false;
	let naturalWidth = 0;
	let naturalHeight = 0;
	let lastSrc = "";
	let imgBound = false;
	let resizeObserver = null;
	function onImgLoad() {
		const img = getImg();
		if (img) {
			naturalWidth = img.naturalWidth;
			naturalHeight = img.naturalHeight;
		}
		loading = false;
		error = false;
		onStateChange();
	}
	function onImgError() {
		loading = false;
		error = true;
		onStateChange();
	}
	function bindImg(img) {
		listen(img, "load", onImgLoad, { signal });
		listen(img, "error", onImgError, { signal });
	}
	function ensureBindings() {
		if (!imgBound) {
			const img = getImg();
			if (img) {
				bindImg(img);
				imgBound = true;
			}
		}
		if (!resizeObserver) {
			const container = getContainer();
			if (container) {
				resizeObserver = new ResizeObserver(onStateChange);
				resizeObserver.observe(container);
			}
		}
	}
	function updateSrc(url) {
		ensureBindings();
		const src = url ?? "";
		if (src === lastSrc) return;
		lastSrc = src;
		if (src) {
			loading = true;
			error = false;
		} else {
			loading = false;
			error = false;
			naturalWidth = 0;
			naturalHeight = 0;
		}
	}
	function connect() {
		ensureBindings();
		const img = getImg();
		if (img?.complete && lastSrc) {
			if (img.naturalWidth > 0) {
				naturalWidth = img.naturalWidth;
				naturalHeight = img.naturalHeight;
				loading = false;
				error = false;
			} else {
				loading = false;
				error = true;
			}
			onStateChange();
		}
	}
	function destroy() {
		abort.abort();
		resizeObserver?.disconnect();
		resizeObserver = null;
	}
	return {
		get loading() {
			return loading;
		},
		get error() {
			return error;
		},
		get naturalWidth() {
			return naturalWidth;
		},
		get naturalHeight() {
			return naturalHeight;
		},
		readConstraints() {
			const el = getContainer();
			if (!el) return {
				minWidth: 0,
				maxWidth: Infinity,
				minHeight: 0,
				maxHeight: Infinity
			};
			return core.parseConstraints(getComputedStyle(el));
		},
		updateSrc,
		connect,
		destroy
	};
}

//#endregion
//#region ../core/dist/dev/dom/ui/tooltip/tooltip.js
/** Map popover reasons to tooltip reasons, filtering out click/outside-click. */
const REASON_MAP = {
	hover: "hover",
	focus: "focus",
	escape: "escape",
	blur: "blur"
};
function createTooltip(options) {
	const popoverOpts = {
		transition: options.transition,
		onOpenChange(open, details) {
			const reason = REASON_MAP[details.reason];
			if (!reason) return;
			const group = options.group?.();
			if (open) group?.notifyOpen();
			else group?.notifyClose();
			const tooltipDetails = details.event ? {
				reason,
				event: details.event
			} : { reason };
			options.onOpenChange(open, tooltipDetails);
		},
		closeOnEscape: () => true,
		closeOnOutsideClick: () => false,
		openOnHover: () => true,
		delay: () => {
			const group = options.group?.();
			if (group?.shouldSkipDelay()) return 0;
			return options.delay?.() ?? group?.delay ?? 600;
		},
		closeDelay: () => {
			const group = options.group?.();
			return options.closeDelay?.() ?? group?.closeDelay ?? 0;
		}
	};
	if (options.onOpenChangeComplete) popoverOpts.onOpenChangeComplete = options.onOpenChangeComplete;
	const popover = createPopover(popoverOpts);
	let isPointerDown = false;
	const { onClick: _, ...baseTriggerProps } = popover.triggerProps;
	const triggerProps = {
		...baseTriggerProps,
		onPointerDown() {
			isPointerDown = true;
		},
		onPointerEnter(event) {
			if (options.disabled?.()) return;
			if (event.pointerType === "touch") return;
			baseTriggerProps.onPointerEnter(event);
		},
		onFocusIn(event) {
			if (options.disabled?.()) return;
			if (isPointerDown) {
				isPointerDown = false;
				return;
			}
			baseTriggerProps.onFocusIn(event);
		}
	};
	const popupProps = {
		...popover.popupProps,
		onPointerEnter(event) {
			if (options.disableHoverablePopup?.()) return;
			popover.popupProps.onPointerEnter(event);
		}
	};
	return {
		...popover,
		triggerProps,
		popupProps,
		get triggerElement() {
			return popover.triggerElement;
		},
		open: () => popover.open("hover"),
		close: () => popover.close("hover")
	};
}

//#endregion
//#region ../core/dist/dev/dom/ui/transition.js
/**
* Manages open/close transition lifecycle via `createState`.
*
* **Open:** patches `{ active: true, status: 'starting' }`, then after a
* double-RAF patches `{ status: 'idle' }` so the browser paints the
* initial ("from") state before transitioning.
*
* **Close:** patches `{ status: 'ending' }` (keeping `active: true` so the
* element stays mounted), then after a double-RAF waits for
* `getAnimations()` to settle before patching `{ active: false, status: 'idle' }`.
*/
function createTransition() {
	const state = createState({
		active: false,
		status: "idle"
	});
	let destroyed = false;
	let rafId1 = 0;
	let rafId2 = 0;
	function open() {
		cancelAnimationFrame(rafId1);
		cancelAnimationFrame(rafId2);
		rafId1 = 0;
		rafId2 = 0;
		state.patch({
			active: true,
			status: "starting"
		});
		return new Promise((resolve) => {
			rafId1 = requestAnimationFrame(() => {
				rafId1 = 0;
				rafId2 = requestAnimationFrame(() => {
					rafId2 = 0;
					if (destroyed || !state.current.active) return resolve();
					state.patch({ status: "idle" });
					resolve();
				});
			});
		});
	}
	function close(el) {
		cancelAnimationFrame(rafId1);
		cancelAnimationFrame(rafId2);
		rafId1 = 0;
		rafId2 = 0;
		state.patch({ status: "ending" });
		return new Promise((resolve) => {
			rafId1 = requestAnimationFrame(() => {
				rafId1 = 0;
				rafId2 = requestAnimationFrame(() => {
					rafId2 = 0;
					if (destroyed) return resolve();
					waitForAnimations(el).finally(() => {
						if (destroyed || state.current.status !== "ending") return resolve();
						state.patch({
							active: false,
							status: "idle"
						});
						resolve();
					});
				});
			});
		});
	}
	function cancel() {
		cancelAnimationFrame(rafId1);
		cancelAnimationFrame(rafId2);
		rafId1 = 0;
		rafId2 = 0;
		if (state.current.status !== "idle") state.patch({ status: "idle" });
	}
	return {
		state,
		open,
		close,
		cancel,
		destroy() {
			if (destroyed) return;
			destroyed = true;
			cancel();
		}
	};
}
function waitForAnimations(el) {
	if (!el) return Promise.resolve();
	const animations = el.getAnimations?.() ?? [];
	if (animations.length === 0) return Promise.resolve();
	return Promise.all(animations.map((a) => a.finished)).then(noop, noop);
}

//#endregion
//#region ../core/dist/dev/dom/ui/wheel-step.js
function createWheelStep(options) {
	return { onWheel(event) {
		if (options.isDisabled()) return;
		const direction = Math.sign(event.deltaY);
		if (direction === 0) return;
		event.preventDefault();
		const stepPercent = options.getStepPercent();
		const newPercent = clamp(options.getPercent() - direction * stepPercent, 0, 100);
		options.onValueChange?.(newPercent);
	} };
}

//#endregion
//#region ../core/dist/dev/dom/utils/element-props.js
/**
* Apply props to a DOM element.
*
* Handles both attributes and event listeners:
* - Event props (onClick, onKeyDown, etc.) are attached as listeners
* - Boolean props: `true` sets empty attribute, `false` removes
* - `undefined` removes the attribute
* - Other props are set as string attributes
*/
function applyElementProps(element, props, options) {
	const signal = options?.signal;
	for (const [key, value] of Object.entries(props)) if (isFunction(value) && key.startsWith("on")) listen(element, key.slice(2).toLowerCase(), value, signal ? { signal } : void 0);
	else if (isUndefined(value) || value === false) element.removeAttribute(key);
	else if (value === true) element.setAttribute(key, "");
	else element.setAttribute(key, String(value));
}

//#endregion
//#region ../core/dist/dev/dom/utils/log.js
const warned = /* @__PURE__ */ new Set();
function logMissingFeature(displayName, featureName) {
	const key = `${displayName}:${featureName}`;
	if (warned.has(key)) return;
	warned.add(key);
	console.warn(`${displayName} requires ${featureName} feature`);
}

//#endregion
//#region ../core/dist/dev/dom/utils/state-data-attrs.js
/**
* Apply state as data attributes to an element.
*
* - `true` → sets `data-keyname=""`
* - truthy string/number → sets `data-keyname="value"`
* - falsy → removes the attribute
*
* @example
* ```ts
* const state = { paused: true, ended: false };
* applyStateDataAttrs(element, state);
* // element has data-paused="", data-ended is removed
* ```
*/
function applyStateDataAttrs(element, state, map) {
	for (const key in state) {
		if (map && !(key in map)) continue;
		const name = map?.[key] ?? toDataAttrName(key), value = state[key];
		if (value === true) element.setAttribute(name, "");
		else if (value) element.setAttribute(name, String(value));
		else element.removeAttribute(name);
	}
}
function toDataAttrName(key) {
	return `data-${key.toLowerCase()}`;
}

//#endregion
//#region src/ui/hotkey/aria-key-shortcuts-controller.ts
/** Provides `aria-keyshortcuts` for a given hotkey action name. */
var AriaKeyShortcutsController = class {
	#action;
	#container;
	constructor(host, action) {
		this.#action = action;
		this.#container = new ContextConsumer(host, {
			context: containerContext,
			subscribe: true
		});
		host.addController(this);
	}
	get value() {
		const container = this.#container.value?.container;
		if (!container) return void 0;
		return findHotkeyCoordinator(container)?.getAriaKeys(this.#action);
	}
	hostConnected() {}
	hostDisconnected() {}
};

//#endregion
//#region src/ui/media-button-element.ts
/** Abstract base for HTML custom elements that render a media-control button. */
var MediaButtonElement = class extends MediaElement {
	constructor(..._args) {
		super(..._args);
		this.disabled = false;
		this.label = "";
		this.hotkeyAction = void 0;
	}
	static {
		this.properties = {
			label: { type: String },
			disabled: { type: Boolean }
		};
	}
	get $state() {
		return this.core.state;
	}
	#disconnect = null;
	#hotkeyRegistry = null;
	connectedCallback() {
		super.connectedCallback();
		if (this.destroyed) return;
		if (this.hotkeyAction && !this.#hotkeyRegistry) this.#hotkeyRegistry = new AriaKeyShortcutsController(this, this.hotkeyAction);
		this.#disconnect = new AbortController();
		const buttonProps = createButton({
			onActivate: () => this.activate(this.mediaState.value),
			isDisabled: () => this.disabled || !this.mediaState.value
		});
		applyElementProps(this, buttonProps, { signal: this.#disconnect.signal });
		if (!this.mediaState.value && this.mediaState.displayName) logMissingFeature(this.localName, this.mediaState.displayName);
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#disconnect?.abort();
		this.#disconnect = null;
	}
	/** Returns the button's current label derived from media state. */
	getLabel() {
		return this.core.state.current.label || void 0;
	}
	willUpdate(changed) {
		super.willUpdate(changed);
		this.core.setProps?.(this);
	}
	update(changed) {
		super.update(changed);
		const media = this.mediaState.value;
		if (!media) return;
		this.core.setMedia(media);
		const state = this.core.getState();
		applyElementProps(this, {
			...this.core.getAttrs?.(state),
			"aria-keyshortcuts": this.#hotkeyRegistry?.value
		});
		applyStateDataAttrs(this, state, this.stateAttrMap);
	}
};

//#endregion
//#region src/ui/mute-button/mute-button-element.ts
var MuteButtonElement = class extends MediaButtonElement {
	constructor(..._args) {
		super(..._args);
		this.core = new MuteButtonCore();
		this.stateAttrMap = MuteButtonDataAttrs;
		this.mediaState = new PlayerController(this, playerContext, selectVolume);
		this.hotkeyAction = "toggleMuted";
	}
	static {
		this.tagName = "media-mute-button";
	}
	activate(state) {
		this.core.toggle(state);
	}
};

//#endregion
//#region src/ui/play-button/play-button-element.ts
var PlayButtonElement = class extends MediaButtonElement {
	constructor(..._args) {
		super(..._args);
		this.core = new PlayButtonCore();
		this.stateAttrMap = PlayButtonDataAttrs;
		this.mediaState = new PlayerController(this, playerContext, selectPlayback);
		this.hotkeyAction = "togglePaused";
	}
	static {
		this.tagName = "media-play-button";
	}
	activate(state) {
		this.core.toggle(state);
	}
};

//#endregion
//#region src/ui/playback-rate-button/playback-rate-button-element.ts
var PlaybackRateButtonElement = class extends MediaButtonElement {
	constructor(..._args) {
		super(..._args);
		this.core = new PlaybackRateButtonCore();
		this.stateAttrMap = PlaybackRateButtonDataAttrs;
		this.mediaState = new PlayerController(this, playerContext, selectPlaybackRate);
	}
	static {
		this.tagName = "media-playback-rate-button";
	}
	activate(state) {
		this.core.cycle(state);
	}
};

//#endregion
//#region src/ui/position-controller.ts
/**
* Reactive controller that manages JS-fallback positioning for floating
* popup elements (tooltips, popovers). Tracks scroll, resize, and
* ResizeObserver events to keep the popup aligned with its trigger.
*
* When native CSS Anchor Positioning is supported, `sync()` is a no-op.
*/
var PositionController = class {
	#host;
	#abort = null;
	#frame = 0;
	#resizeObserver = null;
	#trigger = null;
	constructor(host) {
		this.#host = host;
		host.addController(this);
	}
	/** Discover a trigger element linked via `commandfor` attribute. */
	findTrigger() {
		if (!this.#host.id) return null;
		return this.#host.getRootNode().querySelector(`[commandfor="${this.#host.id}"]`);
	}
	/** Start or update position tracking for the given trigger. */
	sync(trigger) {
		if (supportsAnchorPositioning()) return;
		if (!trigger) return;
		if (this.#abort && this.#trigger === trigger) return;
		this.cleanup();
		this.#abort = new AbortController();
		this.#trigger = trigger;
		const { signal } = this.#abort;
		const reposition = () => {
			cancelAnimationFrame(this.#frame);
			this.#frame = requestAnimationFrame(() => {
				if (signal.aborted) return;
				this.#host.requestUpdate();
			});
		};
		window.addEventListener("scroll", reposition, {
			capture: true,
			passive: true,
			signal
		});
		window.addEventListener("resize", reposition, { signal });
		if (typeof ResizeObserver === "function") {
			this.#resizeObserver = new ResizeObserver(() => {
				reposition();
			});
			this.#resizeObserver.observe(trigger);
			this.#resizeObserver.observe(this.#host);
		}
		reposition();
	}
	/** Stop all position tracking. */
	cleanup() {
		this.#abort?.abort();
		this.#abort = null;
		this.#trigger = null;
		cancelAnimationFrame(this.#frame);
		this.#frame = 0;
		this.#resizeObserver?.disconnect();
		this.#resizeObserver = null;
	}
	hostDisconnected() {
		this.cleanup();
	}
	hostDestroyed() {
		this.cleanup();
	}
};

//#endregion
//#region src/ui/popover/popover-element.ts
var PopoverElement = class extends MediaElement {
	constructor(..._args) {
		super(..._args);
		this.open = PopoverCore.defaultProps.open;
		this.defaultOpen = PopoverCore.defaultProps.defaultOpen;
		this.side = PopoverCore.defaultProps.side;
		this.align = PopoverCore.defaultProps.align;
		this.modal = PopoverCore.defaultProps.modal;
		this.closeOnEscape = PopoverCore.defaultProps.closeOnEscape;
		this.closeOnOutsideClick = PopoverCore.defaultProps.closeOnOutsideClick;
		this.openOnHover = PopoverCore.defaultProps.openOnHover;
		this.delay = PopoverCore.defaultProps.delay;
		this.closeDelay = PopoverCore.defaultProps.closeDelay;
	}
	static {
		this.tagName = "media-popover";
	}
	static {
		this.properties = {
			open: { type: Boolean },
			defaultOpen: {
				type: Boolean,
				attribute: "default-open"
			},
			side: { type: String },
			align: { type: String },
			modal: { type: Boolean },
			closeOnEscape: {
				type: Boolean,
				attribute: "close-on-escape"
			},
			closeOnOutsideClick: {
				type: Boolean,
				attribute: "close-on-outside-click"
			},
			openOnHover: {
				type: Boolean,
				attribute: "open-on-hover"
			},
			delay: { type: Number },
			closeDelay: {
				type: Number,
				attribute: "close-delay"
			}
		};
	}
	#core = new PopoverCore();
	#position = new PositionController(this);
	#popover = null;
	#snapshot = null;
	#disconnect = null;
	#triggerAbort = null;
	#currentTrigger = null;
	connectedCallback() {
		super.connectedCallback();
		if (this.destroyed) return;
		this.#disconnect = new AbortController();
		this.#popover = createPopover({
			transition: createTransition(),
			onOpenChange: (nextOpen, details) => {
				this.open = nextOpen;
				this.dispatchEvent(new CustomEvent("open-change", { detail: {
					open: nextOpen,
					...details
				} }));
			},
			closeOnEscape: () => this.closeOnEscape,
			closeOnOutsideClick: () => this.closeOnOutsideClick,
			openOnHover: () => this.openOnHover,
			delay: () => this.delay,
			closeDelay: () => this.closeDelay
		});
		this.#popover.setPopupElement(this);
		applyElementProps(this, this.#popover.popupProps, { signal: this.#disconnect.signal });
		if (this.#snapshot) this.#snapshot.track(this.#popover.input);
		else this.#snapshot = new SnapshotController(this, this.#popover.input);
	}
	firstUpdated(changed) {
		super.firstUpdated(changed);
		if (this.defaultOpen && !this.open) this.#popover?.open();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#disconnect?.abort();
		this.#disconnect = null;
	}
	destroyCallback() {
		this.#cleanupTrigger();
		this.#popover?.destroy();
		super.destroyCallback();
	}
	willUpdate(changed) {
		super.willUpdate(changed);
		this.#core.setProps(this);
		if (this.#popover && changed.has("open")) {
			const { active: interactionOpen } = this.#popover.input.current;
			if (this.open !== interactionOpen) if (this.open) this.#popover.open();
			else this.#popover.close();
		}
	}
	update(_changed) {
		super.update(_changed);
		if (!this.#popover) return;
		const triggerEl = this.#position.findTrigger();
		this.#syncTrigger(triggerEl);
		const input = this.#popover.input.current;
		this.#core.setInput(input);
		const state = this.#core.getState();
		applyElementProps(this, this.#core.getPopupAttrs(state));
		applyStateDataAttrs(this, state, PopoverDataAttrs);
		if (state.open) tryShowPopover(this);
		else tryHidePopover(this);
		if (this.#currentTrigger) {
			applyElementProps(this.#currentTrigger, this.#core.getTriggerAttrs(state, this.id));
			applyStyles(this.#currentTrigger, getAnchorNameStyle(this.id));
		}
		if (!state.open) {
			this.#position.cleanup();
			return;
		}
		const posOpts = {
			side: state.side,
			align: state.align
		};
		if (supportsAnchorPositioning()) applyStyles(this, getAnchorPositionStyle(this.id, posOpts));
		else {
			const triggerRect = this.#currentTrigger?.getBoundingClientRect();
			const selfRect = getPopupPositionRect(this);
			const boundaryRect = document.documentElement.getBoundingClientRect();
			const offsets = resolveOffsets(this);
			applyStyles(this, getAnchorPositionStyle(this.id, posOpts, triggerRect, selfRect, boundaryRect, offsets));
		}
		this.#position.sync(this.#currentTrigger);
	}
	#syncTrigger(triggerEl) {
		if (triggerEl === this.#currentTrigger) return;
		this.#position.cleanup();
		this.#cleanupTrigger();
		this.#currentTrigger = triggerEl;
		this.#popover?.setTriggerElement(triggerEl);
		if (triggerEl && this.#popover) {
			this.#triggerAbort = new AbortController();
			applyElementProps(triggerEl, this.#popover.triggerProps, { signal: this.#triggerAbort.signal });
		}
	}
	#cleanupTrigger() {
		if (this.#currentTrigger) {
			applyElementProps(this.#currentTrigger, {
				"aria-expanded": void 0,
				"aria-haspopup": void 0,
				"aria-controls": void 0
			});
			this.#currentTrigger.style.removeProperty("anchor-name");
		}
		this.#triggerAbort?.abort();
		this.#triggerAbort = null;
		this.#currentTrigger = null;
	}
};

//#endregion
//#region src/ui/seek-button/seek-button-element.ts
var SeekButtonElement = class extends MediaButtonElement {
	constructor(..._args) {
		super(..._args);
		this.seconds = SeekButtonCore.defaultProps.seconds;
		this.core = new SeekButtonCore();
		this.stateAttrMap = SeekButtonDataAttrs;
		this.mediaState = new PlayerController(this, playerContext, selectTime);
	}
	static {
		this.tagName = "media-seek-button";
	}
	static {
		this.properties = {
			...MediaButtonElement.properties,
			seconds: { type: Number }
		};
	}
	activate(state) {
		this.core.seek(state);
	}
};

//#endregion
//#region src/ui/tooltip/context.ts
const TOOLTIP_GROUP_CONTEXT_KEY = Symbol("@webplayer/tooltip-group");
const tooltipGroupContext = createContext(TOOLTIP_GROUP_CONTEXT_KEY);

//#endregion
//#region src/ui/tooltip/tooltip-element.ts
function isLabelTrigger(el) {
	return "$state" in el;
}
var TooltipElement = class extends MediaElement {
	constructor(..._args) {
		super(..._args);
		this.open = TooltipCore.defaultProps.open;
		this.defaultOpen = TooltipCore.defaultProps.defaultOpen;
		this.side = TooltipCore.defaultProps.side;
		this.align = TooltipCore.defaultProps.align;
		this.delay = TooltipCore.defaultProps.delay;
		this.closeDelay = TooltipCore.defaultProps.closeDelay;
		this.disableHoverablePopup = TooltipCore.defaultProps.disableHoverablePopup;
		this.disabled = TooltipCore.defaultProps.disabled;
	}
	static {
		this.tagName = "media-tooltip";
	}
	static {
		this.properties = {
			open: { type: Boolean },
			defaultOpen: {
				type: Boolean,
				attribute: "default-open"
			},
			side: { type: String },
			align: { type: String },
			delay: { type: Number },
			closeDelay: {
				type: Number,
				attribute: "close-delay"
			},
			disableHoverablePopup: {
				type: Boolean,
				attribute: "disable-hoverable-popup"
			},
			disabled: { type: Boolean }
		};
	}
	#core = new TooltipCore();
	#groupConsumer = new ContextConsumer(this, { context: tooltipGroupContext });
	#position = new PositionController(this);
	#tooltip = null;
	#snapshot = null;
	#disconnect = null;
	#triggerAbort = null;
	#currentTrigger = null;
	connectedCallback() {
		super.connectedCallback();
		if (this.destroyed) return;
		this.#disconnect = new AbortController();
		this.#tooltip = createTooltip({
			transition: createTransition(),
			onOpenChange: (nextOpen, details) => {
				this.open = nextOpen;
				this.dispatchEvent(new CustomEvent("open-change", { detail: {
					open: nextOpen,
					...details
				} }));
			},
			delay: () => this.delay,
			closeDelay: () => this.closeDelay,
			disableHoverablePopup: () => this.disableHoverablePopup,
			disabled: () => this.disabled,
			group: () => this.#groupConsumer.value
		});
		this.#tooltip.setPopupElement(this);
		applyElementProps(this, this.#tooltip.popupProps, { signal: this.#disconnect.signal });
		if (this.#snapshot) this.#snapshot.track(this.#tooltip.input);
		else this.#snapshot = new SnapshotController(this, this.#tooltip.input);
	}
	firstUpdated(changed) {
		super.firstUpdated(changed);
		if (this.defaultOpen && !this.open) this.#tooltip?.open();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#cleanupTrigger();
		this.#tooltip?.destroy();
		this.#tooltip = null;
		this.#disconnect?.abort();
		this.#disconnect = null;
	}
	willUpdate(changed) {
		super.willUpdate(changed);
		this.#core.setProps(this);
		if (this.#tooltip && changed.has("open")) {
			const { active: interactionOpen } = this.#tooltip.input.current;
			if (this.open !== interactionOpen) if (this.open) this.#tooltip.open();
			else this.#tooltip.close();
		}
	}
	update(_changed) {
		super.update(_changed);
		if (!this.#tooltip) return;
		const triggerEl = this.#position.findTrigger();
		this.#syncTrigger(triggerEl);
		const input = this.#tooltip.input.current;
		this.#core.setInput(input);
		const state = this.#core.getState();
		applyElementProps(this, this.#core.getPopupAttrs(state));
		applyStateDataAttrs(this, state, TooltipDataAttrs);
		if (state.open) tryShowPopover(this);
		else tryHidePopover(this);
		if (this.#currentTrigger) applyStyles(this.#currentTrigger, getAnchorNameStyle(this.id));
		if (!state.open) {
			this.#position.cleanup();
			return;
		}
		const posOpts = {
			side: state.side,
			align: state.align
		};
		if (supportsAnchorPositioning()) applyStyles(this, getAnchorPositionStyle(this.id, posOpts, void 0, void 0, void 0, void 0, TooltipCSSVars));
		else {
			const triggerRect = this.#currentTrigger?.getBoundingClientRect();
			const selfRect = getPopupPositionRect(this);
			const boundaryRect = document.documentElement.getBoundingClientRect();
			const offsets = resolveOffsets(this, TooltipCSSVars);
			applyStyles(this, getAnchorPositionStyle(this.id, posOpts, triggerRect, selfRect, boundaryRect, offsets, TooltipCSSVars));
		}
		this.#position.sync(this.#currentTrigger);
	}
	#syncTrigger(triggerEl) {
		if (triggerEl === this.#currentTrigger) return;
		this.#position.cleanup();
		this.#cleanupTrigger();
		this.#currentTrigger = triggerEl;
		this.#tooltip?.setTriggerElement(triggerEl);
		if (triggerEl && this.#tooltip) {
			this.#triggerAbort = new AbortController();
			applyElementProps(triggerEl, this.#tooltip.triggerProps, { signal: this.#triggerAbort.signal });
			if (isLabelTrigger(triggerEl)) {
				this.#syncContent(triggerEl);
				triggerEl.$state.subscribe(() => this.#syncContent(triggerEl), { signal: this.#triggerAbort.signal });
			}
		}
	}
	#syncContent(triggerEl) {
		this.textContent = triggerEl.getLabel() ?? "";
	}
	#cleanupTrigger() {
		if (this.#currentTrigger) this.#currentTrigger.style.removeProperty("anchor-name");
		this.#triggerAbort?.abort();
		this.#triggerAbort = null;
		this.#currentTrigger = null;
	}
};

//#endregion
//#region src/ui/tooltip/tooltip-group-element.ts
var TooltipGroupElement = class extends MediaElement {
	constructor(..._args) {
		super(..._args);
		this.delay = TooltipGroupCore.defaultProps.delay;
		this.closeDelay = TooltipGroupCore.defaultProps.closeDelay;
		this.timeout = TooltipGroupCore.defaultProps.timeout;
	}
	static {
		this.tagName = "media-tooltip-group";
	}
	static {
		this.properties = {
			delay: { type: Number },
			closeDelay: {
				type: Number,
				attribute: "close-delay"
			},
			timeout: { type: Number }
		};
	}
	#core = new TooltipGroupCore();
	#provider = new ContextProvider(this, {
		context: tooltipGroupContext,
		initialValue: this.#core
	});
	update(_changed) {
		super.update(_changed);
		this.#core.setProps(this);
		this.#provider.setValue(this.#core);
	}
};

//#endregion
//#region src/ui/alert-dialog/context.ts
const ALERT_DIALOG_CONTEXT_KEY = Symbol("@webplayer/alert-dialog");
const alertDialogContext = createContext(ALERT_DIALOG_CONTEXT_KEY);

//#endregion
//#region src/ui/alert-dialog/alert-dialog-close-element.ts
var AlertDialogCloseElement = class extends MediaElement {
	constructor(..._args) {
		super(..._args);
		this.disabled = false;
	}
	static {
		this.tagName = "media-alert-dialog-close";
	}
	static {
		this.properties = { disabled: { type: Boolean } };
	}
	#ctx = new ContextConsumer(this, {
		context: alertDialogContext,
		subscribe: true
	});
	#disconnect = null;
	connectedCallback() {
		super.connectedCallback();
		this.#disconnect = new AbortController();
		const buttonProps = createButton({
			onActivate: () => this.#ctx.value?.close(),
			isDisabled: () => this.disabled
		});
		applyElementProps(this, buttonProps, { signal: this.#disconnect.signal });
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#disconnect?.abort();
		this.#disconnect = null;
	}
	update(_changed) {
		super.update(_changed);
		const ctx = this.#ctx.value;
		if (ctx) applyStateDataAttrs(this, ctx.state, ctx.stateAttrMap);
	}
};

//#endregion
//#region src/ui/context-part-element.ts
/**
* Abstract base for compound-component part elements that consume a parent
* context and apply data attributes from `ctx.state` + `ctx.stateAttrMap`.
*
* Subclasses only need to declare the `consumer` property:
*
* ```ts
* export class SliderTrackElement extends ContextPartElement<SliderState> {
*   static readonly tagName = 'media-slider-track';
*   protected readonly consumer = new ContextConsumer(this, { context: sliderContext, subscribe: true });
* }
* ```
*/
var ContextPartElement = class extends MediaElement {
	update(_changed) {
		super.update(_changed);
		const ctx = this.consumer.value;
		if (ctx) applyStateDataAttrs(this, ctx.state, ctx.stateAttrMap);
	}
};

//#endregion
//#region src/ui/alert-dialog/alert-dialog-description-element.ts
var AlertDialogDescriptionElement = class extends ContextPartElement {
	constructor(..._args) {
		super(..._args);
		this.consumer = new ContextConsumer(this, {
			context: alertDialogContext,
			subscribe: true
		});
	}
	static {
		this.tagName = "media-alert-dialog-description";
	}
	update(changed) {
		super.update(changed);
		const descriptionId = this.consumer.value?.state.descriptionId;
		if (descriptionId) this.id = descriptionId;
	}
};

//#endregion
//#region src/ui/alert-dialog/alert-dialog-title-element.ts
var AlertDialogTitleElement = class extends ContextPartElement {
	constructor(..._args) {
		super(..._args);
		this.consumer = new ContextConsumer(this, {
			context: alertDialogContext,
			subscribe: true
		});
	}
	static {
		this.tagName = "media-alert-dialog-title";
	}
	update(changed) {
		super.update(changed);
		const titleId = this.consumer.value?.state.titleId;
		if (titleId) this.id = titleId;
	}
};

//#endregion
//#region src/ui/controls/context.ts
const CONTROLS_CONTEXT_KEY = Symbol("@webplayer/controls");
const controlsContext = createContext(CONTROLS_CONTEXT_KEY);

//#endregion
//#region src/ui/controls/controls-element.ts
var ControlsElement = class extends MediaElement {
	static {
		this.tagName = "media-controls";
	}
	#core = new ControlsCore();
	#mediaState = new PlayerController(this, playerContext, selectControls);
	#provider = new ContextProvider(this, { context: controlsContext });
	connectedCallback() {
		super.connectedCallback();
		if (!this.#mediaState.value && this.#mediaState.displayName) logMissingFeature(this.localName, this.#mediaState.displayName);
	}
	update(_changed) {
		super.update(_changed);
		const media = this.#mediaState.value;
		if (!media) return;
		this.#core.setMedia(media);
		const state = this.#core.getState();
		applyStateDataAttrs(this, state, ControlsDataAttrs);
		this.#provider.setValue({
			state,
			stateAttrMap: ControlsDataAttrs
		});
	}
};

//#endregion
//#region src/ui/controls/controls-group-element.ts
var ControlsGroupElement = class extends ContextPartElement {
	constructor(..._args) {
		super(..._args);
		this.consumer = new ContextConsumer(this, {
			context: controlsContext,
			subscribe: true
		});
	}
	static {
		this.tagName = "media-controls-group";
	}
	connectedCallback() {
		super.connectedCallback();
		if (this.hasAttribute("aria-label") || this.hasAttribute("aria-labelledby")) this.setAttribute("role", "group");
	}
};

//#endregion
//#region src/ui/error-dialog/error-dialog-element.ts
const FALLBACK_MESSAGE = "An error occurred. Please try again.";
let idCounter = 0;
var ErrorDialogElement = class extends MediaElement {
	static {
		this.tagName = "media-error-dialog";
	}
	#core = new ErrorDialogCore();
	#provider = new ContextProvider(this, { context: alertDialogContext });
	#titleId = `vjs-error-dialog-title-${idCounter++}`;
	#descriptionId = `vjs-error-dialog-desc-${idCounter++}`;
	#errorState = new PlayerController(this, playerContext, selectError);
	#dialog = null;
	#snapshot = null;
	#lastErrorMessage = null;
	constructor() {
		super();
		this.#core.setTitleId(this.#titleId);
		this.#core.setDescriptionId(this.#descriptionId);
	}
	connectedCallback() {
		super.connectedCallback();
		if (this.destroyed) return;
		this.#dialog = createAlertDialog({
			transition: createTransition(),
			onOpenChange: (nextOpen) => {
				if (!nextOpen) this.#errorState.value?.dismissError();
			}
		});
		this.#dialog.setElement(this);
		if (this.#snapshot) this.#snapshot.track(this.#dialog.input);
		else this.#snapshot = new SnapshotController(this, this.#dialog.input);
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#dialog?.destroy();
		this.#dialog = null;
	}
	willUpdate(_changed) {
		super.willUpdate(_changed);
		if (!this.#dialog) return;
		const errorState = this.#errorState.value;
		const hasError = Boolean(errorState?.error);
		const { active: isOpen } = this.#dialog.input.current;
		if (errorState?.error) this.#lastErrorMessage = errorState.error.message?.trim() || null;
		const desc = this.querySelector("media-alert-dialog-description");
		if (desc) desc.textContent = this.#lastErrorMessage ?? FALLBACK_MESSAGE;
		if (hasError && !isOpen) this.#dialog.open();
		else if (!hasError && isOpen) this.#dialog.close();
	}
	update(_changed) {
		super.update(_changed);
		if (!this.#dialog) return;
		const input = this.#dialog.input.current;
		this.#core.setInput(input);
		const state = this.#core.getState();
		applyElementProps(this, this.#core.getAttrs(state));
		applyStateDataAttrs(this, state, AlertDialogDataAttrs);
		this.#provider.setValue({
			state,
			stateAttrMap: AlertDialogDataAttrs,
			close: () => this.#dialog?.close()
		});
	}
};

//#endregion
//#region src/ui/slider/context.ts
const SLIDER_CONTEXT_KEY = Symbol("@webplayer/slider");
const sliderContext = createContext(SLIDER_CONTEXT_KEY);

//#endregion
//#region src/ui/slider/slider-buffer-element.ts
var SliderBufferElement = class extends ContextPartElement {
	constructor(..._args) {
		super(..._args);
		this.consumer = new ContextConsumer(this, {
			context: sliderContext,
			subscribe: true
		});
	}
	static {
		this.tagName = "media-slider-buffer";
	}
};

//#endregion
//#region src/ui/slider/slider-fill-element.ts
var SliderFillElement = class extends ContextPartElement {
	constructor(..._args) {
		super(..._args);
		this.consumer = new ContextConsumer(this, {
			context: sliderContext,
			subscribe: true
		});
	}
	static {
		this.tagName = "media-slider-fill";
	}
};

//#endregion
//#region src/ui/slider/slider-preview-element.ts
var SliderPreviewElement = class extends MediaElement {
	constructor(..._args) {
		super(..._args);
		this.overflow = "clamp";
	}
	static {
		this.tagName = "media-slider-preview";
	}
	static {
		this.properties = { overflow: { type: String } };
	}
	#ctx = new ContextConsumer(this, {
		context: sliderContext,
		subscribe: true
	});
	#resizeObserver = null;
	#width = 0;
	connectedCallback() {
		super.connectedCallback();
		this.#resizeObserver = new ResizeObserver(([entry]) => {
			this.#width = entry.contentRect.width;
			this.#applyPosition();
		});
		this.#resizeObserver.observe(this);
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#resizeObserver?.disconnect();
		this.#resizeObserver = null;
	}
	#applyPosition() {
		applyStyles(this, getSliderPreviewStyle(this.#width, this.overflow));
	}
	update(_changed) {
		super.update(_changed);
		const ctx = this.#ctx.value;
		if (ctx) applyStateDataAttrs(this, ctx.state, ctx.stateAttrMap);
		this.#applyPosition();
	}
};

//#endregion
//#region src/ui/slider/slider-thumb-element.ts
var SliderThumbElement = class extends MediaElement {
	static {
		this.tagName = "media-slider-thumb";
	}
	#ctx = new ContextConsumer(this, {
		context: sliderContext,
		subscribe: true
	});
	#disconnect = null;
	#thumbPropsApplied = false;
	connectedCallback() {
		super.connectedCallback();
		this.#disconnect = new AbortController();
		this.#thumbPropsApplied = false;
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#disconnect?.abort();
		this.#disconnect = null;
		this.#thumbPropsApplied = false;
	}
	update(_changed) {
		super.update(_changed);
		const ctx = this.#ctx.value;
		if (!ctx) return;
		if (!this.#thumbPropsApplied && this.#disconnect) {
			applyElementProps(this, ctx.thumbProps, { signal: this.#disconnect.signal });
			this.#thumbPropsApplied = true;
		}
		applyElementProps(this, ctx.thumbAttrs);
		applyStateDataAttrs(this, ctx.state, ctx.stateAttrMap);
	}
};

//#endregion
//#region src/ui/thumbnail/thumbnail-element.ts
const SHADOW_CSS = `\
:host {
  display: inline-block;
  overflow: hidden;
}
img {
  display: block;
}`;
var ThumbnailElement = class extends MediaElement {
	static {
		this.tagName = "media-thumbnail";
	}
	static {
		this.properties = {
			time: { type: Number },
			crossOrigin: {
				type: String,
				attribute: "crossorigin"
			},
			loading: { type: String },
			fetchPriority: {
				type: String,
				attribute: "fetchpriority"
			}
		};
	}
	#core = new ThumbnailCore();
	#img = document.createElement("img");
	#textTracks = new PlayerController(this, playerContext, selectTextTrack);
	#thumbnails = [];
	#externalThumbnails;
	#lastTextTrack;
	#api = null;
	constructor() {
		super();
		this.time = 0;
		const shadow = this.attachShadow({ mode: "open" });
		const style = document.createElement("style");
		style.textContent = SHADOW_CSS;
		shadow.appendChild(style);
		this.#img.alt = "";
		this.#img.setAttribute("part", "img");
		this.#img.setAttribute("aria-hidden", "true");
		this.#img.setAttribute("decoding", "async");
		shadow.appendChild(this.#img);
	}
	/**
	* Set thumbnail images directly, bypassing the automatic `<track>` detection.
	* When set, this takes priority over the text track path.
	*/
	get thumbnails() {
		return this.#externalThumbnails;
	}
	set thumbnails(value) {
		this.#externalThumbnails = value;
		this.requestUpdate();
	}
	connectedCallback() {
		super.connectedCallback();
		if (this.destroyed) return;
		this.#api = createThumbnail({
			getContainer: () => this,
			getImg: () => this.#img,
			onStateChange: () => this.requestUpdate()
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback();
	}
	destroyCallback() {
		this.#api?.destroy();
		super.destroyCallback();
	}
	update(changed) {
		super.update(changed);
		if (this.#externalThumbnails) this.#thumbnails = this.#externalThumbnails;
		else {
			const textTrack = this.#textTracks.value;
			if (textTrack !== this.#lastTextTrack) {
				this.#lastTextTrack = textTrack;
				this.#thumbnails = textTrack && textTrack.thumbnailCues.length > 0 ? mapCuesToThumbnails(textTrack.thumbnailCues, textTrack.thumbnailTrackSrc ?? void 0) : [];
			}
		}
		const thumbnail = this.#core.findActiveThumbnail(this.#thumbnails, this.time);
		applyElementProps(this.#img, {
			crossorigin: this.crossOrigin || void 0,
			loading: this.loading,
			fetchpriority: this.fetchPriority
		});
		this.#api?.updateSrc(thumbnail?.url);
		if (!thumbnail) {
			this.#img.removeAttribute("src");
			this.#resetStyles();
			const state = this.#core.getState(false, false, void 0);
			applyElementProps(this, this.#core.getAttrs(state));
			applyStateDataAttrs(this, state, ThumbnailDataAttrs);
			return;
		}
		if (this.#img.getAttribute("src") !== thumbnail.url) this.#img.src = thumbnail.url;
		const api = this.#api;
		const state = this.#core.getState(api?.loading ?? false, api?.error ?? false, thumbnail);
		applyElementProps(this, this.#core.getAttrs(state));
		applyStateDataAttrs(this, state, ThumbnailDataAttrs);
		if (api?.naturalWidth && api.naturalHeight) {
			const constraints = api.readConstraints();
			const result = this.#core.resize(thumbnail, api.naturalWidth, api.naturalHeight, constraints);
			if (result) this.#applyResize(result);
		}
	}
	#applyResize(result) {
		this.style.width = `${result.containerWidth}px`;
		this.style.height = `${result.containerHeight}px`;
		const imgStyle = this.#img.style;
		imgStyle.width = `${result.imageWidth}px`;
		imgStyle.height = `${result.imageHeight}px`;
		imgStyle.maxWidth = "none";
		imgStyle.transform = result.offsetX || result.offsetY ? `translate(-${result.offsetX}px, -${result.offsetY}px)` : "";
	}
	#resetStyles() {
		this.style.width = "";
		this.style.height = "";
		const imgStyle = this.#img.style;
		imgStyle.width = "";
		imgStyle.height = "";
		imgStyle.maxWidth = "";
		imgStyle.transform = "";
	}
};

//#endregion
//#region src/ui/slider/slider-thumbnail-element.ts
var SliderThumbnailElement = class extends ThumbnailElement {
	static {
		this.tagName = "media-slider-thumbnail";
	}
	#ctx = new ContextConsumer(this, {
		context: sliderContext,
		subscribe: true
	});
	update(changed) {
		const ctx = this.#ctx.value;
		if (ctx) this.time = ctx.pointerValue;
		super.update(changed);
	}
};

//#endregion
//#region src/ui/slider/slider-track-element.ts
var SliderTrackElement = class extends ContextPartElement {
	constructor(..._args) {
		super(..._args);
		this.consumer = new ContextConsumer(this, {
			context: sliderContext,
			subscribe: true
		});
	}
	static {
		this.tagName = "media-slider-track";
	}
};

//#endregion
//#region src/ui/slider/slider-value-element.ts
var SliderValueElement = class extends MediaElement {
	constructor(..._args) {
		super(..._args);
		this.type = "current";
	}
	static {
		this.tagName = "media-slider-value";
	}
	static {
		this.properties = { type: { type: String } };
	}
	#ctx = new ContextConsumer(this, {
		context: sliderContext,
		subscribe: true
	});
	connectedCallback() {
		super.connectedCallback();
		this.setAttribute("aria-live", "off");
	}
	update(_changed) {
		super.update(_changed);
		const ctx = this.#ctx.value;
		if (!ctx) return;
		const value = this.type === "pointer" ? ctx.pointerValue : ctx.state.value;
		this.textContent = ctx.formatValue ? ctx.formatValue(value, this.type) : String(Math.round(value));
		applyStateDataAttrs(this, ctx.state, ctx.stateAttrMap);
	}
};

//#endregion
//#region src/ui/time/time-element.ts
var TimeElement = class extends MediaElement {
	constructor(..._args) {
		super(..._args);
		this.type = TimeCore.defaultProps.type;
		this.negativeSign = TimeCore.defaultProps.negativeSign;
		this.label = TimeCore.defaultProps.label;
	}
	static {
		this.tagName = "media-time";
	}
	static {
		this.properties = {
			type: { type: String },
			negativeSign: {
				type: String,
				attribute: "negative-sign"
			},
			label: { type: String }
		};
	}
	#core = new TimeCore();
	#state = new PlayerController(this, playerContext, selectTime);
	#signSpan = document.createElement("span");
	#textNode = document.createTextNode("");
	connectedCallback() {
		super.connectedCallback();
		if (!this.#signSpan.parentNode) {
			this.#signSpan.setAttribute("aria-hidden", "true");
			this.#signSpan.hidden = true;
			this.appendChild(this.#signSpan);
			this.appendChild(this.#textNode);
		}
		if (!this.#state.value) logMissingFeature(this.localName, this.#state.displayName);
	}
	willUpdate(changed) {
		super.willUpdate(changed);
		this.#core.setProps(this);
	}
	update(changed) {
		super.update(changed);
		const media = this.#state.value;
		if (!media) return;
		this.#core.setMedia(media);
		const state = this.#core.getState();
		this.#signSpan.hidden = !state.negative;
		this.#signSpan.textContent = state.negative ? this.negativeSign : "";
		this.#textNode.textContent = state.text;
		applyElementProps(this, this.#core.getAttrs(state));
		applyStateDataAttrs(this, state, TimeDataAttrs);
	}
};

//#endregion
//#region src/ui/time/time-group-element.ts
var TimeGroupElement = class extends MediaElement {
	static {
		this.tagName = "media-time-group";
	}
};

//#endregion
//#region src/ui/time/time-separator-element.ts
var TimeSeparatorElement = class extends MediaElement {
	static {
		this.tagName = "media-time-separator";
	}
	connectedCallback() {
		super.connectedCallback();
		this.setAttribute("aria-hidden", "true");
		if (!this.textContent?.trim()) this.textContent = "/";
	}
};

//#endregion
//#region src/ui/time-slider/time-slider-element.ts
var TimeSliderElement = class extends MediaElement {
	constructor(..._args) {
		super(..._args);
		this.label = TimeSliderCore.defaultProps.label;
		this.changeThrottle = TimeSliderCore.defaultProps.changeThrottle;
		this.step = TimeSliderCore.defaultProps.step;
		this.largeStep = TimeSliderCore.defaultProps.largeStep;
		this.orientation = TimeSliderCore.defaultProps.orientation;
		this.disabled = TimeSliderCore.defaultProps.disabled;
		this.thumbAlignment = TimeSliderCore.defaultProps.thumbAlignment;
	}
	static {
		this.tagName = "media-time-slider";
	}
	static {
		this.properties = {
			label: { type: String },
			changeThrottle: {
				type: Number,
				attribute: "change-throttle"
			},
			step: { type: Number },
			largeStep: {
				type: Number,
				attribute: "large-step"
			},
			orientation: { type: String },
			disabled: { type: Boolean },
			thumbAlignment: {
				type: String,
				attribute: "thumb-alignment"
			}
		};
	}
	#core = new TimeSliderCore();
	#provider = new ContextProvider(this, { context: sliderContext });
	#timeState = new PlayerController(this, playerContext, selectTime);
	#bufferState = new PlayerController(this, playerContext, selectBuffer);
	#slider = null;
	#disconnect = null;
	connectedCallback() {
		super.connectedCallback();
		if (this.destroyed) return;
		this.#disconnect = new AbortController();
		const signal = this.#disconnect.signal;
		this.#slider = createSlider({
			getElement: () => this,
			getThumbElement: () => this.querySelector("media-slider-thumb"),
			getOrientation: () => this.orientation,
			isRTL: () => isRTL(this),
			isDisabled: () => this.disabled || !this.#timeState.value,
			getPercent: () => {
				const media = this.#timeState.value;
				if (!media) return 0;
				return this.#core.percentFromValue(media.currentTime);
			},
			getStepPercent: () => this.#core.getStepPercent(),
			getLargeStepPercent: () => this.#core.getLargeStepPercent(),
			onValueCommit: (percent) => {
				const media = this.#timeState.value;
				if (media) media.seek(this.#core.rawValueFromPercent(percent));
			},
			changeThrottle: this.changeThrottle,
			onDragStart: () => {
				this.dispatchEvent(new CustomEvent("drag-start", { bubbles: true }));
			},
			onDragEnd: () => {
				this.dispatchEvent(new CustomEvent("drag-end", { bubbles: true }));
			},
			adjustPercent: (raw, thumbSize, trackSize) => this.#core.adjustPercentForAlignment(raw, thumbSize, trackSize),
			onResize: () => this.requestUpdate()
		});
		applyElementProps(this, this.#slider.rootProps, { signal });
		applyStyles(this, this.#slider.rootStyle);
		this.#slider.input.subscribe(() => this.requestUpdate(), { signal });
		if (!this.#timeState.value) logMissingFeature(this.localName, this.#timeState.displayName);
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#disconnect?.abort();
		this.#disconnect = null;
	}
	destroyCallback() {
		this.#slider?.destroy();
		super.destroyCallback();
	}
	willUpdate(_changed) {
		super.willUpdate(_changed);
		this.#core.setProps(this);
	}
	update(_changed) {
		super.update(_changed);
		if (!this.#slider) return;
		const time = this.#timeState.value;
		const buffer = this.#bufferState.value;
		if (!time) return;
		this.#core.setInput(this.#slider.input.current);
		const media = {
			...time,
			...buffer ?? {
				buffered: [],
				seekable: []
			}
		};
		this.#core.setMedia(media);
		const state = this.#core.getState();
		const cssVars = getTimeSliderCSSVars(this.#slider.adjustForAlignment(state));
		applyStyles(this, cssVars);
		applyStateDataAttrs(this, state, TimeSliderDataAttrs);
		this.#provider.setValue({
			state,
			stateAttrMap: TimeSliderDataAttrs,
			pointerValue: this.#core.valueFromPercent(state.pointerPercent),
			thumbAttrs: this.#core.getAttrs(state),
			thumbProps: this.#slider.thumbProps,
			formatValue: (value) => formatTime(value, state.duration)
		});
	}
};

//#endregion
//#region src/ui/volume-slider/volume-slider-element.ts
var VolumeSliderElement = class extends MediaElement {
	constructor(..._args) {
		super(..._args);
		this.label = VolumeSliderCore.defaultProps.label;
		this.step = VolumeSliderCore.defaultProps.step;
		this.largeStep = VolumeSliderCore.defaultProps.largeStep;
		this.wheelStep = VolumeSliderCore.defaultProps.wheelStep;
		this.orientation = VolumeSliderCore.defaultProps.orientation;
		this.disabled = VolumeSliderCore.defaultProps.disabled;
		this.thumbAlignment = VolumeSliderCore.defaultProps.thumbAlignment;
	}
	static {
		this.tagName = "media-volume-slider";
	}
	static {
		this.properties = {
			label: { type: String },
			step: { type: Number },
			largeStep: {
				type: Number,
				attribute: "large-step"
			},
			wheelStep: {
				type: Number,
				attribute: "wheel-step"
			},
			orientation: { type: String },
			disabled: { type: Boolean },
			thumbAlignment: {
				type: String,
				attribute: "thumb-alignment"
			}
		};
	}
	#core = new VolumeSliderCore();
	#provider = new ContextProvider(this, { context: sliderContext });
	#volumeState = new PlayerController(this, playerContext, selectVolume);
	#slider = null;
	#disconnect = null;
	connectedCallback() {
		super.connectedCallback();
		if (this.destroyed) return;
		this.#disconnect = new AbortController();
		const signal = this.#disconnect.signal;
		const isDisabled = () => this.disabled || !this.#volumeState.value;
		const getPercent = () => (this.#volumeState.value?.volume ?? 0) * 100;
		const getStepPercent = () => this.#core.getStepPercent();
		const setVolume = (percent) => this.#setVolume(percent);
		this.#slider = createSlider({
			getElement: () => this,
			getThumbElement: () => this.querySelector("media-slider-thumb"),
			getOrientation: () => this.orientation,
			isRTL: () => isRTL(this),
			isDisabled,
			getPercent,
			getStepPercent,
			getLargeStepPercent: () => this.#core.getLargeStepPercent(),
			onValueChange: setVolume,
			onValueCommit: setVolume,
			onDragStart: () => {
				this.dispatchEvent(new CustomEvent("drag-start", { bubbles: true }));
			},
			onDragEnd: () => {
				this.dispatchEvent(new CustomEvent("drag-end", { bubbles: true }));
			},
			adjustPercent: (raw, thumbSize, trackSize) => this.#core.adjustPercentForAlignment(raw, thumbSize, trackSize),
			onResize: () => this.requestUpdate()
		});
		const wheelProps = createWheelStep({
			isDisabled,
			getPercent,
			getStepPercent: () => this.#core.getWheelStepPercent(),
			onValueChange: setVolume
		});
		applyElementProps(this, this.#slider.rootProps, { signal });
		applyElementProps(this, wheelProps, { signal });
		applyStyles(this, this.#slider.rootStyle);
		this.#slider.input.subscribe(() => this.requestUpdate(), { signal });
		if (!this.#volumeState.value) logMissingFeature(this.localName, this.#volumeState.displayName);
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#disconnect?.abort();
		this.#disconnect = null;
	}
	destroyCallback() {
		this.#slider?.destroy();
		super.destroyCallback();
	}
	willUpdate(_changed) {
		super.willUpdate(_changed);
		this.#core.setProps(this);
	}
	update(_changed) {
		super.update(_changed);
		if (!this.#slider) return;
		const media = this.#volumeState.value;
		if (!media) return;
		this.#core.setInput(this.#slider.input.current);
		this.#core.setMedia(media);
		const state = this.#core.getState();
		const cssVars = getSliderCSSVars(this.#slider.adjustForAlignment(state));
		applyStyles(this, cssVars);
		applyStateDataAttrs(this, state, VolumeSliderDataAttrs);
		this.#provider.setValue({
			state,
			stateAttrMap: VolumeSliderDataAttrs,
			pointerValue: this.#core.valueFromPercent(state.pointerPercent),
			thumbAttrs: this.#core.getAttrs(state),
			thumbProps: this.#slider.thumbProps,
			formatValue: (value) => `${Math.round(value)}%`
		});
	}
	#setVolume(percent) {
		this.#volumeState.value?.setVolume(this.#core.valueFromPercent(percent) / 100);
	}
};

//#endregion
//#region src/define/ui/compounds.ts
function defineControls() {
	safeDefine(ControlsElement);
	safeDefine(ControlsGroupElement);
}
function defineErrorDialog() {
	safeDefine(ErrorDialogElement);
	safeDefine(AlertDialogCloseElement);
	safeDefine(AlertDialogDescriptionElement);
	safeDefine(AlertDialogTitleElement);
}
/** Shared slider sub-elements used by all slider types. */
function defineSliderParts() {
	safeDefine(SliderFillElement);
	safeDefine(SliderPreviewElement);
	safeDefine(SliderThumbElement);
	safeDefine(SliderTrackElement);
	safeDefine(SliderValueElement);
}
function defineTime() {
	safeDefine(TimeElement);
	safeDefine(TimeGroupElement);
	safeDefine(TimeSeparatorElement);
}
function defineTimeSlider() {
	safeDefine(TimeSliderElement);
	defineSliderParts();
	safeDefine(SliderBufferElement);
	safeDefine(SliderThumbnailElement);
}
function defineVolumeSlider() {
	safeDefine(VolumeSliderElement);
	defineSliderParts();
}

//#endregion
export { selectTime as C, selectTextTrack as S, defaults as T, selectCast as _, defineVolumeSlider as a, selectPlayback as b, SeekButtonElement as c, PlayButtonElement as d, MuteButtonElement as f, createHotkey as g, logMissingFeature as h, defineTimeSlider as i, PopoverElement as l, applyStateDataAttrs as m, defineErrorDialog as n, TooltipGroupElement as o, MediaButtonElement as p, defineTime as r, TooltipElement as s, defineControls as t, PlaybackRateButtonElement as u, selectFullscreen as v, selectVolume as w, selectPlaybackRate as x, selectPiP as y };
//# sourceMappingURL=compounds-DD3MYkSc.js.map