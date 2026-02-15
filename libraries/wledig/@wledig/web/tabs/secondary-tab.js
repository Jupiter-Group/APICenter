/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { SecondaryTab } from './internal/secondary-tab.js';
import { styles as secondaryStyles } from './internal/secondary-tab-styles.js';
import { styles as sharedStyles } from './internal/tab-styles.js';
// TODO(b/267336507): add docs
/**
 * @summary Tab allow users to display a tab within a Tabs.
 *
 * @final
 * @suppress {visibility}
 */
let WdSecondaryTab = class WdSecondaryTab extends SecondaryTab {
};
WdSecondaryTab.styles = [sharedStyles, secondaryStyles];
WdSecondaryTab = __decorate([
    customElement('wd-secondary-tab')
], WdSecondaryTab);
export { WdSecondaryTab };
//# sourceMappingURL=secondary-tab.js.map