/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { styles } from '../menu/internal/menuitem/menu-item-styles.js';
import { SelectOptionEl } from './internal/selectoption/select-option.js';
/**
 * @summary
 * Select menus display a list of choices on temporary surfaces and display the
 * currently selected menu item above the menu.
 *
 * @description
 * The select component allows users to choose a value from a fixed list of
 * available options. Composed of an interactive anchor button and a menu, it is
 * analogous to the native HTML `<select>` element. This is the option that
 * can be placed inside of an wd-select.
 *
 * This component is a subclass of `wd-menu-item` and can accept the same slots,
 * properties, and events as `wd-menu-item`.
 *
 * @example
 * ```html
 * <wd-outlined-select label="fruits">
 *   <!-- An empty selected option will give select an "un-filled" state -->
 *   <wd-select-option selected></wd-select-option>
 *   <wd-select-option value="apple" headline="Apple"></wd-select-option>
 *   <wd-select-option value="banana" headline="Banana"></wd-select-option>
 *   <wd-select-option value="kiwi" headline="Kiwi"></wd-select-option>
 *   <wd-select-option value="orange" headline="Orange"></wd-select-option>
 *   <wd-select-option value="tomato" headline="Tomato"></wd-select-option>
 * </wd-outlined-select>
 * ```
 *
 * @final
 * @suppress {visibility}
 */
let WdSelectOption = class WdSelectOption extends SelectOptionEl {
};
WdSelectOption.styles = [styles];
WdSelectOption = __decorate([
    customElement('wd-select-option')
], WdSelectOption);
export { WdSelectOption };
//# sourceMappingURL=select-option.js.map