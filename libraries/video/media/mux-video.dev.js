import { t as MediaAttachMixin } from "../media-attach-mixin-CYoNe7Sh.js";
import { o as safeDefine } from "../context-0rI_P6jf.js";
import { n as CustomMediaElement } from "../video-host-BtD61mpF.js";
import "../hls-CcSAx_3I.js";
import { n as MuxVideoMedia } from "../mux-BhHIeG3e.js";

//#region src/media/mux-video/index.ts
var MuxVideo = class extends MediaAttachMixin(CustomMediaElement("video", MuxVideoMedia)) {
	static get observedAttributes() {
		return [
			...super.observedAttributes,
			"type",
			"prefer-playback",
			"debug"
		];
	}
};

//#endregion
//#region src/define/media/mux-video.ts
var MuxVideoElement = class extends MuxVideo {
	static {
		this.tagName = "mux-video";
	}
};
safeDefine(MuxVideoElement);

//#endregion
//# sourceMappingURL=mux-video.dev.js.map