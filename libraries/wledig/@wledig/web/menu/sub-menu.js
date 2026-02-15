/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { SubMenu } from './internal/submenu/sub-menu.js';
import { styles } from './internal/submenu/sub-menu-styles.js';
/**
 * @summary Menus display a list of choices on a temporary surface.
 *
 * @description
 * Menu items are the selectable choices within the menu. Menu items must
 * implement the `Menu` interface and also have the `wd-menu`
 * attribute. Additionally menu items are list items so they must also have the
 * `wd-list-item` attribute.
 *
 * Menu items can control a menu by selectively firing the `close-menu` and
 * `deselect-items` events.
 *
 * This menu item will open a sub-menu that is slotted in the `submenu` slot.
 * Additionally, the containing menu must either have `has-overflow` or
 * `positioning=fixed` set to `true` in order to display the containing menu
 * properly.
 *
 * @example
 * ```html
 * <div style="position:relative;">
 *   <button
 *       id="anchor"
 *       @click=${() => this.menuRef.value.show()}>
 *     Click to open menu
 *   </button>
 *   <!--
 *     `has-overflow` is required when using a submenu which overflows the
 *     menu's contents
 *   -->
 *   <wd-menu anchor="anchor" has-overflow ${ref(menuRef)}>
 *     <wd-menu-item headline="This is a headline"></wd-menu-item>
 *     <wd-sub-menu>
 *       <wd-menu-item
 *           slot="item"
 *           headline="this is a submenu item">
 *       </wd-menu-item>
 *       <wd-menu slot="menu">
 *         <wd-menu-item headline="This is an item inside a submenu">
 *         </wd-menu-item>
 *       </wd-menu>
 *     </wd-sub-menu>
 *   </wd-menu>
 * </div>
 * ```
 *
 * @final
 * @suppress {visibility}
 */
let WdSubMenu = class WdSubMenu extends SubMenu {
};
WdSubMenu.styles = [styles];
WdSubMenu = __decorate([
    customElement('wd-sub-menu')
], WdSubMenu);
export { WdSubMenu };
//# sourceMappingURL=sub-menu.js.map