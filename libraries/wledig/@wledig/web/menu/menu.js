/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { Menu } from './internal/menu.js';
import { styles } from './internal/menu-styles.js';
export { CloseReason, FocusState, } from './internal/controllers/shared.js';
export { Corner } from './internal/menu.js';
/**
 * @summary Menus display a list of choices on a temporary surface.
 *
 * @description
 * Menus appear when users interact with a button, action, or other control.
 *
 * They can be opened from a variety of elements, most commonly icon buttons,
 * buttons, and text fields.
 *
 * wd-menu listens for the `close-menu` and `deselect-items` events.
 *
 * - `close-menu` closes the menu when dispatched from a child element.
 * - `deselect-items` deselects all of its immediate menu-item children.
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
 *     menu's contents.
 *
 *     Additionally, `anchor` ingests an idref which do not pass through shadow
 *     roots. You can also set `.anchorElement` to an element reference if
 *     necessary.
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
let WdMenu = class WdMenu extends Menu {
};
WdMenu.styles = [styles];
WdMenu = __decorate([
    customElement('wd-menu')
], WdMenu);
export { WdMenu };
//# sourceMappingURL=menu.js.map