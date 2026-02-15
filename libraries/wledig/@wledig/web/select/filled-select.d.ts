/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CSSResultOrNative } from 'lit';
import { FilledSelect } from './internal/filled-select.js';
declare global {
    interface HTMLElementTagNameMap {
        'wd-filled-select': WdFilledSelect;
    }
}
/**
 * @summary
 * Select menus display a list of choices on temporary surfaces and display the
 * currently selected menu item above the menu.
 *
 * @description
 * The select component allows users to choose a value from a fixed list of
 * available options. Composed of an interactive anchor button and a menu, it is
 * analogous to the native HTML `<select>` element. This is the "filled"
 * variant.
 *
 * @example
 * ```html
 * <wd-filled-select label="fruits">
 *   <!-- An empty selected option will give select an "un-filled" state -->
 *   <wd-select-option selected></wd-select-option>
 *   <wd-select-option value="apple" headline="Apple"></wd-select-option>
 *   <wd-select-option value="banana" headline="Banana"></wd-select-option>
 *   <wd-select-option value="kiwi" headline="Kiwi"></wd-select-option>
 *   <wd-select-option value="orange" headline="Orange"></wd-select-option>
 *   <wd-select-option value="tomato" headline="Tomato"></wd-select-option>
 * </wd-filled-select>
 * ```
 *
 * @final
 * @suppress {visibility}
 */
export declare class WdFilledSelect extends FilledSelect {
    static styles: CSSResultOrNative[];
}
