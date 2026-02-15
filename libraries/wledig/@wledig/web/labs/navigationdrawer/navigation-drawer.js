/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { NavigationDrawer } from './internal/navigation-drawer.js';
import { styles } from './internal/navigation-drawer-styles.js';
import { styles as sharedStyles } from './internal/shared-styles.js';
/**
 * @final
 * @suppress {visibility}
 */
let WdNavigationDrawer = class WdNavigationDrawer extends NavigationDrawer {
};
WdNavigationDrawer.styles = [sharedStyles, styles];
WdNavigationDrawer = __decorate([
    customElement('wd-navigation-drawer')
], WdNavigationDrawer);
export { WdNavigationDrawer };
//# sourceMappingURL=navigation-drawer.js.map