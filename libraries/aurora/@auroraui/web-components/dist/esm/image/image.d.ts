import { FASTElement } from '@aurorasoft/fast-element';
import { ImageFit, ImageShape } from './image.options.js';
/**
 * The base class used for constucting a aurora image custom element
 *
 * @tag aurora-image
 *
 * @slot - The default slot. Accepts any `<img>`, `<picture>`, `<video>`, or `<canvas>` element.
 *
 * @public
 */
export declare class Image extends FASTElement {
    /**
     * Image layout
     *
     * @public
     * @remarks
     * HTML attribute: block.
     */
    block?: boolean;
    /**
     * Image border
     *
     * @public
     * @remarks
     * HTML attribute: border.
     */
    bordered?: boolean;
    /**
     * Image shadow
     *
     * @public
     * @remarks
     * HTML attribute: shadow.
     */
    shadow?: boolean;
    /**
     * Image fit
     *
     * @public
     * @remarks
     * HTML attribute: fit.
     */
    fit?: ImageFit;
    /**
     * Image shape
     *
     * @public
     * @remarks
     * HTML attribute: shape.
     */
    shape?: ImageShape;
}
