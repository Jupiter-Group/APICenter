/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { NavigationDrawer } from './internal/navigation-drawer.js';
declare global {
    interface HTMLElementTagNameMap {
        'wd-navigation-drawer': WdNavigationDrawer;
    }
}
/**
 * @final
 * @suppress {visibility}
 */
export declare class WdNavigationDrawer extends NavigationDrawer {
    static readonly styles: import("lit").CSSResult[];
}
