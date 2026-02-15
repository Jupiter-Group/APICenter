/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CSSResultOrNative } from 'lit';
import { FilledField } from './internal/filled-field.js';
declare global {
    interface HTMLElementTagNameMap {
        'wd-filled-field': WdFilledField;
    }
}
/**
 * TODO(b/228525797): add docs
 * @final
 * @suppress {visibility}
 */
export declare class WdFilledField extends FilledField {
    static styles: CSSResultOrNative[];
}
