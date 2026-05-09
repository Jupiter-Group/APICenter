import { O as MediaContainerElement, i as audioFeatures, k as MediaElement, t as createPlayer } from "./create-player-BKLw7l1a.js";
import { o as safeDefine } from "./context-0rI_P6jf.js";

//#region src/define/audio/player.ts
const { ProviderMixin } = createPlayer({ features: audioFeatures });
var AudioPlayerElement = class extends ProviderMixin(MediaElement) {
	static {
		this.tagName = "audio-player";
	}
};
safeDefine(AudioPlayerElement);
safeDefine(MediaContainerElement);

//#endregion
export { AudioPlayerElement as t };
//# sourceMappingURL=player-BVGWmIbQ.js.map