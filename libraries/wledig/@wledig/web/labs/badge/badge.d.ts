/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CSSResultOrNative } from 'lit';
import { Badge } from './internal/badge.js';
declare global {
    interface HTMLElementTagNameMap {
        'wd-badge': WdBadge;
    }
}
/**
 * @final
 * @suppress {visibility}
 */
export declare class WdBadge extends Badge {
    static styles: CSSResultOrNative[];
}
