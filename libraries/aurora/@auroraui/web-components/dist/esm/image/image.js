import { __decorate } from "tslib";
import { attr, FASTElement } from '@aurorasoft/fast-element';
/**
 * The base class used for constucting a aurora image custom element
 *
 * @tag aurora-image
 *
 * @slot - The default slot. Accepts any `<img>`, `<picture>`, `<video>`, or `<canvas>` element.
 *
 * @public
 */
export class Image extends FASTElement {
}
__decorate([
    attr({ mode: 'boolean' })
], Image.prototype, "block", void 0);
__decorate([
    attr({ mode: 'boolean' })
], Image.prototype, "bordered", void 0);
__decorate([
    attr({ mode: 'boolean' })
], Image.prototype, "shadow", void 0);
__decorate([
    attr
], Image.prototype, "fit", void 0);
__decorate([
    attr
], Image.prototype, "shape", void 0);
//# sourceMappingURL=image.js.map