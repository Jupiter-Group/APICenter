/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CSSResultOrNative } from 'lit';
import { NavigationTab } from './internal/navigation-tab.js';
declare global {
    interface HTMLElementTagNameMap {
        'wd-navigation-tab': WdNavigationTab;
    }
}
/**
 * @final
 * @suppress {visibility}
 */
export declare class WdNavigationTab extends NavigationTab {
    static styles: CSSResultOrNative[];
}
