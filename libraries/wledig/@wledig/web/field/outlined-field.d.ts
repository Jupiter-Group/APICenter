/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CSSResultOrNative } from 'lit';
import { OutlinedField } from './internal/outlined-field.js';
declare global {
    interface HTMLElementTagNameMap {
        'wd-outlined-field': WdOutlinedField;
    }
}
/**
 * TODO(b/228525797): add docs
 * @final
 * @suppress {visibility}
 */
export declare class WdOutlinedField extends OutlinedField {
    static styles: CSSResultOrNative[];
}
