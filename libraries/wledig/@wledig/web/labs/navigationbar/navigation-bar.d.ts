/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CSSResultOrNative } from 'lit';
import { NavigationBar } from './internal/navigation-bar.js';
declare global {
    interface HTMLElementTagNameMap {
        'wd-navigation-bar': WdNavigationBar;
    }
}
/**
 * @final
 * @suppress {visibility}
 */
export declare class WdNavigationBar extends NavigationBar {
    static styles: CSSResultOrNative[];
}
