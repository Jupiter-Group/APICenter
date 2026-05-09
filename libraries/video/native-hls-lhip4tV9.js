import { t as HTMLVideoElementHost } from "./video-host-BtD61mpF.js";

//#region ../core/dist/dev/core/media/media-error.js
var MediaError = class MediaError extends Error {
	static MEDIA_ERR_ABORTED = 1;
	static MEDIA_ERR_NETWORK = 2;
	static MEDIA_ERR_DECODE = 3;
	static MEDIA_ERR_SRC_NOT_SUPPORTED = 4;
	static MEDIA_ERR_ENCRYPTED = 5;
	static MEDIA_ERR_CUSTOM = 100;
	static defaultMessages = {
		1: "You aborted the media playback",
		2: "A network error caused the media download to fail.",
		3: "A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.",
		4: "An unsupported error occurred. The server or network failed, or your browser does not support this format.",
		5: "The media is encrypted and there are no keys to decrypt it."
	};
	name;
	code;
	context;
	fatal;
	data;
	constructor(message, code = MediaError.MEDIA_ERR_CUSTOM, fatal, context) {
		super(message);
		this.name = "MediaError";
		this.code = code;
		this.context = context;
		this.fatal = fatal ?? (code >= MediaError.MEDIA_ERR_NETWORK && code <= MediaError.MEDIA_ERR_ENCRYPTED);
		if (!this.message) this.message = MediaError.defaultMessages[this.code] ?? "";
	}
};

//#endregion
//#region ../core/dist/dev/dom/media/native-hls/errors.js
function NativeHlsMediaErrorsMixin(BaseClass) {
	class NativeHlsMediaErrors extends BaseClass {
		#disconnect = null;
		#error = null;
		get error() {
			return this.#error;
		}
		attach(target) {
			super.attach?.(target);
			this.#init(target);
		}
		detach() {
			this.#destroy();
			super.detach?.();
		}
		destroy() {
			this.#destroy();
			super.destroy?.();
		}
		#destroy() {
			this.#disconnect?.abort();
			this.#disconnect = null;
			this.#error = null;
		}
		#init(target) {
			this.#destroy();
			this.#disconnect = new AbortController();
			const signal = this.#disconnect.signal;
			target.addEventListener("error", (event) => {
				event.stopImmediatePropagation();
				const native = target.error;
				if (!native) return;
				const error = new MediaError(native.message, native.code, true);
				this.#error = error;
				this.dispatchEvent(new ErrorEvent("error", {
					error,
					message: error.message
				}));
			}, {
				signal,
				capture: true
			});
			target.addEventListener("emptied", () => {
				this.#error = null;
			}, { signal });
		}
	}
	return NativeHlsMediaErrors;
}

//#endregion
//#region ../core/dist/dev/dom/media/native-hls/index.js
var NativeHlsMediaBase = class extends HTMLVideoElementHost {
	#src = "";
	#preload = "metadata";
	get engine() {
		return null;
	}
	get src() {
		return this.#src;
	}
	set src(src) {
		this.#src = src;
		if (this.target) this.target.src = src;
	}
	get preload() {
		return this.#preload;
	}
	set preload(value) {
		this.#preload = value;
		if (this.target) this.target.preload = value;
	}
	attach(target) {
		super.attach(target);
		if (this.preload !== target.preload) target.preload = this.preload;
		if (this.src) target.src = this.src;
	}
	detach() {
		super.detach();
	}
	destroy() {
		this.detach();
	}
};
var NativeHlsMedia = class extends NativeHlsMediaErrorsMixin(NativeHlsMediaBase) {};

//#endregion
export { MediaError as n, NativeHlsMedia as t };
//# sourceMappingURL=native-hls-lhip4tV9.js.map