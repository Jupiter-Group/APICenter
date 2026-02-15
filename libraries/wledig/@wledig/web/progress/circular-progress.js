/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { CircularProgress } from './internal/circular-progress.js';
import { styles } from './internal/circular-progress-styles.js';
/**
 * @summary Circular progress indicators display progress by animating along an
 * invisible circular track in a clockwise direction. They can be applied
 * directly to a surface, such as a button or card.
 *
 * @description
 * Progress indicators inform users about the status of ongoing processes.
 * - Determinate indicators display how long a process will take.
 * - Indeterminate indicators express an unspecified amount of wait time.
 *
 * @final
 * @suppress {visibility}
 */
let WdCircularProgress = class WdCircularProgress extends CircularProgress {
};
WdCircularProgress.styles = [styles];
WdCircularProgress = __decorate([
    customElement('wd-circular-progress')
], WdCircularProgress);
export { WdCircularProgress };
//# sourceMappingURL=circular-progress.js.map