/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CSSResultOrNative } from 'lit';
import { SuggestionChip } from './internal/suggestion-chip.js';
declare global {
    interface HTMLElementTagNameMap {
        'wd-suggestion-chip': WdSuggestionChip;
    }
}
/**
 * TODO(b/243982145): add docs
 *
 * @final
 * @suppress {visibility}
 */
export declare class WdSuggestionChip extends SuggestionChip {
    static styles: CSSResultOrNative[];
}
