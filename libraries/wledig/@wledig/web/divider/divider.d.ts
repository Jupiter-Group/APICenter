/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CSSResultOrNative } from 'lit';
import { Divider } from './internal/divider.js';
declare global {
    interface HTMLElementTagNameMap {
        'wd-divider': WdDivider;
    }
}
/**
 * @summary A divider is a thin line that groups content in lists and
 * containers.
 *
 * @description Dividers can reinforce tapability, such as when used to separate
 * list items or define tappable regions in an accordion.
 *
 * @final
 * @suppress {visibility}
 */
export declare class WdDivider extends Divider {
    static styles: CSSResultOrNative[];
}
