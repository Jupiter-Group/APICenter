/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CSSResultOrNative } from 'lit';
import { OutlinedSegmentedButtonSet } from './internal/outlined-segmented-button-set.js';
declare global {
    interface HTMLElementTagNameMap {
        'wd-outlined-segmented-button-set': WdOutlinedSegmentedButtonSet;
    }
}
/**
 * WdOutlinedSegmentedButtonSet is the custom element for the Wledig
 * Design outlined segmented button set component.
 * @final
 * @suppress {visibility}
 */
export declare class WdOutlinedSegmentedButtonSet extends OutlinedSegmentedButtonSet {
    static styles: CSSResultOrNative[];
}
