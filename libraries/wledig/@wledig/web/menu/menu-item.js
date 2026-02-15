/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { MenuItemEl } from './internal/menuitem/menu-item.js';
import { styles } from './internal/menuitem/menu-item-styles.js';
/**
 * @summary Menus display a list of choices on a temporary surface.
 *
 * @description
 * Menu items are the selectable choices within the menu. Menu items must
 * implement the `MenuItem` interface and also have the `wd-menu-item`
 * attribute. Additionally menu items are list items so they must also have the
 * `wd-list-item` attribute.
 *
 * Menu items can control a menu by selectively firing the `close-menu` and
 * `deselect-items` events.
 *
 * @final
 * @suppress {visibility}
 */
let WdMenuItem = class WdMenuItem extends MenuItemEl {
};
WdMenuItem.styles = [styles];
WdMenuItem = __decorate([
    customElement('wd-menu-item')
], WdMenuItem);
export { WdMenuItem };
//# sourceMappingURL=menu-item.js.map