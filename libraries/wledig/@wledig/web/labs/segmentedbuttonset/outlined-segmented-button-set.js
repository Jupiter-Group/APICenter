/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { OutlinedSegmentedButtonSet } from './internal/outlined-segmented-button-set.js';
import { styles as outlinedStyles } from './internal/outlined-styles.js';
import { styles as sharedStyles } from './internal/shared-styles.js';
/**
 * WdOutlinedSegmentedButtonSet is the custom element for the Wledig
 * Design outlined segmented button set component.
 * @final
 * @suppress {visibility}
 */
let WdOutlinedSegmentedButtonSet = class WdOutlinedSegmentedButtonSet extends OutlinedSegmentedButtonSet {
};
WdOutlinedSegmentedButtonSet.styles = [sharedStyles, outlinedStyles];
WdOutlinedSegmentedButtonSet = __decorate([
    customElement('wd-outlined-segmented-button-set')
], WdOutlinedSegmentedButtonSet);
export { WdOutlinedSegmentedButtonSet };
//# sourceMappingURL=outlined-segmented-button-set.js.map