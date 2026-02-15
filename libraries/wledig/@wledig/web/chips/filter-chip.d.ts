/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CSSResultOrNative } from 'lit';
import { FilterChip } from './internal/filter-chip.js';
declare global {
    interface HTMLElementTagNameMap {
        'wd-filter-chip': WdFilterChip;
    }
}
/**
 * TODO(b/243982145): add docs
 *
 * @final
 * @suppress {visibility}
 */
export declare class WdFilterChip extends FilterChip {
    static styles: CSSResultOrNative[];
}
