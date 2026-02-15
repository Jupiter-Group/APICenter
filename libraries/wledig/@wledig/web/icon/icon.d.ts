/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CSSResultOrNative } from 'lit';
import { Icon } from './internal/icon.js';
declare global {
    interface HTMLElementTagNameMap {
        'wd-icon': WdIcon;
    }
}
/**
 * @final
 * @suppress {visibility}
 */
export declare class WdIcon extends Icon {
    /** @nocollapse */
    static styles: CSSResultOrNative[];
}
