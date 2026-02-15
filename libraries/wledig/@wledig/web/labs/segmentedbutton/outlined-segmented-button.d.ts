/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CSSResultOrNative } from 'lit';
import { OutlinedSegmentedButton } from './internal/outlined-segmented-button.js';
declare global {
    interface HTMLElementTagNameMap {
        'wd-outlined-segmented-button': WdOutlinedSegmentedButton;
    }
}
/**
 * WdOutlinedSegmentedButton is the custom element for the Wledig
 * Design outlined segmented button component.
 * @final
 * @suppress {visibility}
 */
export declare class WdOutlinedSegmentedButton extends OutlinedSegmentedButton {
    static styles: CSSResultOrNative[];
}
