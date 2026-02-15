/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { Tabs } from './internal/tabs.js';
import { styles } from './internal/tabs-styles.js';
// TODO(b/267336507): add docs
/**
 * @summary Tabs displays a list of selectable tabs.
 *
 * @final
 * @suppress {visibility}
 */
let WdTabs = class WdTabs extends Tabs {
};
WdTabs.styles = [styles];
WdTabs = __decorate([
    customElement('wd-tabs')
], WdTabs);
export { WdTabs };
//# sourceMappingURL=tabs.js.map