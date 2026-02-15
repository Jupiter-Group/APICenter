/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CSSResultOrNative } from 'lit';
import { Card } from './internal/card.js';
declare global {
    interface HTMLElementTagNameMap {
        'wd-filled-card': WdFilledCard;
    }
}
/**
 * @final
 * @suppress {visibility}
 */
export declare class WdFilledCard extends Card {
    static styles: CSSResultOrNative[];
}
