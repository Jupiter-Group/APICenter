import { t as MediaAttachMixin } from "../media-attach-mixin-CYoNe7Sh.js";
import { o as safeDefine } from "../context-0rI_P6jf.js";
import { n as CustomMediaElement } from "../video-host-BtD61mpF.js";
import "../hls-CcSAx_3I.js";
import { t as MuxAudioMedia } from "../mux-BhHIeG3e.js";

//#region src/media/mux-audio/index.ts
var MuxAudio = class extends MediaAttachMixin(CustomMediaElement("audio", MuxAudioMedia)) {
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
//#region src/define/media/mux-audio.ts
var MuxAudioElement = class extends MuxAudio {
	static {
		this.tagName = "mux-audio";
	}
};
safeDefine(MuxAudioElement);

//#endregion
//# sourceMappingURL=mux-audio.dev.js.map