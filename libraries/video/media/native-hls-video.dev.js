import { t as MediaAttachMixin } from "../media-attach-mixin-CYoNe7Sh.js";
import { o as safeDefine } from "../context-0rI_P6jf.js";
import { n as CustomMediaElement } from "../video-host-BtD61mpF.js";
import { t as NativeHlsMedia } from "../native-hls-lhip4tV9.js";

//#region src/media/native-hls-video/index.ts
var NativeHlsVideo = class extends MediaAttachMixin(CustomMediaElement("video", NativeHlsMedia)) {};

//#endregion
//#region src/define/media/native-hls-video.ts
var NativeHlsVideoElement = class extends NativeHlsVideo {
	static {
		this.tagName = "native-hls-video";
	}
};
safeDefine(NativeHlsVideoElement);

//#endregion
//# sourceMappingURL=native-hls-video.dev.js.map