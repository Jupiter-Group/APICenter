/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CSSResultOrNative } from 'lit';
import { MenuItemEl } from './internal/menuitem/menu-item.js';
export { type MenuItem } from './internal/controllers/menuItemController.js';
export { type CloseMenuEvent } from './internal/controllers/shared.js';
declare global {
    interface HTMLElementTagNameMap {
        'wd-menu-item': WdMenuItem;
    }
}
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
export declare class WdMenuItem extends MenuItemEl {
    static styles: CSSResultOrNative[];
}
