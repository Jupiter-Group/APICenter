/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CSSResultOrNative } from 'lit';
import { Elevation } from './internal/elevation.js';
declare global {
    interface HTMLElementTagNameMap {
        'wd-elevation': WdElevation;
    }
}
/**
 * The `<wd-elevation>` custom element with default styles.
 *
 * Elevation is the relative distance between two surfaces along the z-axis.
 *
 * @final
 * @suppress {visibility}
 */
export declare class WdElevation extends Elevation {
    static styles: CSSResultOrNative[];
}
