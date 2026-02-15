/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { Elevation } from './internal/elevation.js';
import { styles } from './internal/elevation-styles.js';
/**
 * The `<wd-elevation>` custom element with default styles.
 *
 * Elevation is the relative distance between two surfaces along the z-axis.
 *
 * @final
 * @suppress {visibility}
 */
let WdElevation = class WdElevation extends Elevation {
};
WdElevation.styles = [styles];
WdElevation = __decorate([
    customElement('wd-elevation')
], WdElevation);
export { WdElevation };
//# sourceMappingURL=elevation.js.map