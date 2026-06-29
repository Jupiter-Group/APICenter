import { FASTElement } from '@aurorasoft/fast-element';
/**
 * The base class used for constructing a aurora-spinner custom element
 * @public
 */
export class BaseSpinner extends FASTElement {
    constructor() {
        super();
        /**
         * The internal {@link https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
         *
         * @internal
         */
        this.elementInternals = this.attachInternals();
        this.elementInternals.role = 'progressbar';
    }
}
//# sourceMappingURL=spinner.base.js.map