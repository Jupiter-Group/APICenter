import { t as MediaAttachMixin } from "../media-attach-mixin-CYoNe7Sh.js";
import { o as safeDefine } from "../context-0rI_P6jf.js";
import { n as CustomMediaElement } from "../video-host-BtD61mpF.js";
import { t as HlsMedia } from "../hls-CcSAx_3I.js";

//#region src/media/hls-video/index.ts
var HlsVideo = class extends MediaAttachMixin(CustomMediaElement("video", HlsMedia)) {
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
//#region src/define/media/hls-video.ts
var HlsVideoElement = class extends HlsVideo {
	static {
		this.tagName = "hls-video";
	}
};
safeDefine(HlsVideoElement);

//#endregion
//# sourceMappingURL=hls-video.dev.js.map