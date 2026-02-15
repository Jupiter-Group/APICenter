/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { SegmentedButton } from './segmented-button.js';
/**
 * b/265346443 - add docs
 */
export declare class OutlinedSegmentedButton extends SegmentedButton {
    protected getRenderClasses(): {
        'wd3-segmented-button--outlined': boolean;
        'wd3-segmented-button--selected': boolean;
        'wd3-segmented-button--unselected': boolean;
        'wd3-segmented-button--with-label': boolean;
        'wd3-segmented-button--without-label': boolean;
        'wd3-segmented-button--with-icon': boolean;
        'wd3-segmented-button--with-checkmark': boolean;
        'wd3-segmented-button--without-checkmark': boolean;
        'wd3-segmented-button--selecting': boolean;
        'wd3-segmented-button--deselecting': boolean;
    };
    protected renderOutline(): import("lit-html").TemplateResult<1>;
}
