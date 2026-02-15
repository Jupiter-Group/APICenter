/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { NavigationBar } from './internal/navigation-bar.js';
import { styles } from './internal/navigation-bar-styles.js';
/**
 * @final
 * @suppress {visibility}
 */
let WdNavigationBar = class WdNavigationBar extends NavigationBar {
};
WdNavigationBar.styles = [styles];
WdNavigationBar = __decorate([
    customElement('wd-navigation-bar')
], WdNavigationBar);
export { WdNavigationBar };
//# sourceMappingURL=navigation-bar.js.map