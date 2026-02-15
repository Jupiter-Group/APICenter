/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { Badge } from './internal/badge.js';
import { styles } from './internal/badge-styles.js';
/**
 * @final
 * @suppress {visibility}
 */
let WdBadge = class WdBadge extends Badge {
};
WdBadge.styles = [styles];
WdBadge = __decorate([
    customElement('wd-badge')
], WdBadge);
export { WdBadge };
//# sourceMappingURL=badge.js.map