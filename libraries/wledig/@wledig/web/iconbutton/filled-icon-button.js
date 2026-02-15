/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { styles } from './internal/filled-styles.js';
import { IconButton } from './internal/icon-button.js';
import { styles as sharedStyles } from './internal/shared-styles.js';
/**
 * @summary Icon buttons help people take supplementary actions with a single
 * tap.
 *
 * @description
 * __Emphasis:__ Low emphasis – For optional or supplementary actions with the
 * least amount of prominence.
 *
 * __Rationale:__ The most compact and unobtrusive type of button, icon buttons
 * are used for optional supplementary actions such as "Bookmark" or "Star."
 *
 * __Example usages:__
 * - Add to Favorites
 * - Print
 *
 * @final
 * @suppress {visibility}
 */
let WdFilledIconButton = class WdFilledIconButton extends IconButton {
    getRenderClasses() {
        return {
            ...super.getRenderClasses(),
            'filled': true,
            'toggle-filled': this.toggle,
        };
    }
};
WdFilledIconButton.styles = [sharedStyles, styles];
WdFilledIconButton = __decorate([
    customElement('wd-filled-icon-button')
], WdFilledIconButton);
export { WdFilledIconButton };
//# sourceMappingURL=filled-icon-button.js.map