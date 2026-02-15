/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CSSResultOrNative } from 'lit';
import { AssistChip } from './internal/assist-chip.js';
declare global {
    interface HTMLElementTagNameMap {
        'wd-assist-chip': WdAssistChip;
    }
}
/**
 * TODO(b/243982145): add docs
 *
 * @final
 * @suppress {visibility}
 */
export declare class WdAssistChip extends AssistChip {
    static styles: CSSResultOrNative[];
}
