/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import '../field/outlined-field.js';
import { CSSResultOrNative } from 'lit';
import { OutlinedTextField } from './internal/outlined-text-field.js';
export { type TextFieldType } from './internal/text-field.js';
declare global {
    interface HTMLElementTagNameMap {
        'wd-outlined-text-field': WdOutlinedTextField;
    }
}
/**
 * TODO(b/228525797): Add docs
 * @final
 * @suppress {visibility}
 */
export declare class WdOutlinedTextField extends OutlinedTextField {
    static styles: CSSResultOrNative[];
    protected readonly fieldTag: import("lit-html/static.js").StaticValue;
}
