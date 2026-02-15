/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CSSResultOrNative } from 'lit';
import { Card } from './internal/card.js';
declare global {
    interface HTMLElementTagNameMap {
        'wd-outlined-card': WdOutlinedCard;
    }
}
/**
 * @final
 * @suppress {visibility}
 */
export declare class WdOutlinedCard extends Card {
    static styles: CSSResultOrNative[];
}
