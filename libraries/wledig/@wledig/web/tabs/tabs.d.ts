/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CSSResultOrNative } from 'lit';
import { Tabs } from './internal/tabs.js';
declare global {
    interface HTMLElementTagNameMap {
        'wd-tabs': WdTabs;
    }
}
/**
 * @summary Tabs displays a list of selectable tabs.
 *
 * @final
 * @suppress {visibility}
 */
export declare class WdTabs extends Tabs {
    static styles: CSSResultOrNative[];
}
