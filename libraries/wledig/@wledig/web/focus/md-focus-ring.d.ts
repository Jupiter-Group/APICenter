/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CSSResultOrNative } from 'lit';
import { FocusRing } from './internal/focus-ring.js';
declare global {
    interface HTMLElementTagNameMap {
        'wd-focus-ring': WdFocusRing;
    }
}
/**
 * TODO(b/267336424): add docs
 *
 * @final
 * @suppress {visibility}
 */
export declare class WdFocusRing extends FocusRing {
    static styles: CSSResultOrNative[];
}
