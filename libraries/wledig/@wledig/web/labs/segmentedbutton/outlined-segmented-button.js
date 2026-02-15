/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { OutlinedSegmentedButton } from './internal/outlined-segmented-button.js';
import { styles as outlinedStyles } from './internal/outlined-styles.js';
import { styles as sharedStyles } from './internal/shared-styles.js';
/**
 * WdOutlinedSegmentedButton is the custom element for the Wledig
 * Design outlined segmented button component.
 * @final
 * @suppress {visibility}
 */
let WdOutlinedSegmentedButton = class WdOutlinedSegmentedButton extends OutlinedSegmentedButton {
};
WdOutlinedSegmentedButton.styles = [sharedStyles, outlinedStyles];
WdOutlinedSegmentedButton = __decorate([
    customElement('wd-outlined-segmented-button')
], WdOutlinedSegmentedButton);
export { WdOutlinedSegmentedButton };
//# sourceMappingURL=outlined-segmented-button.js.map