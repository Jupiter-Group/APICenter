/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { styles as forcedColorsStyles } from './internal/forced-colors-styles.js';
import { Slider } from './internal/slider.js';
import { styles } from './internal/slider-styles.js';
/**
 * @summary Sliders allow users to view and select a value (or range) along
 * a track.
 *
 * @description
 * Changes made with sliders are immediate, allowing the user to make slider
 * adjustments while determining a selection. Sliders shouldn’t be used to
 * adjust settings with any delay in providing user feedback. Sliders reflect
 * the current state of the settings they control.
 *
 * __Example usages:__
 * - Sliders are ideal for adjusting settings such as volume and brightness, or
 * for applying image filters.
 *
 * @final
 * @suppress {visibility}
 */
let WdSlider = class WdSlider extends Slider {
};
WdSlider.styles = [styles, forcedColorsStyles];
WdSlider = __decorate([
    customElement('wd-slider')
], WdSlider);
export { WdSlider };
//# sourceMappingURL=slider.js.map