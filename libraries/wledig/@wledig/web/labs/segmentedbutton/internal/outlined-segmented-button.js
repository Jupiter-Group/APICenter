/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { html } from 'lit';
import { SegmentedButton } from './segmented-button.js';
/**
 * b/265346443 - add docs
 */
export class OutlinedSegmentedButton extends SegmentedButton {
    getRenderClasses() {
        return {
            ...super.getRenderClasses(),
            'wd3-segmented-button--outlined': true,
        };
    }
    renderOutline() {
        return html `<span class="wd3-segmented-button__outline"></span>`;
    }
}
//# sourceMappingURL=outlined-segmented-button.js.map