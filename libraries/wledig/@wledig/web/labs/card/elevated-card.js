/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { Card } from './internal/card.js';
import { styles as elevatedStyles } from './internal/elevated-styles.js';
import { styles as sharedStyles } from './internal/shared-styles.js';
/**
 * @final
 * @suppress {visibility}
 */
let WdElevatedCard = class WdElevatedCard extends Card {
};
WdElevatedCard.styles = [sharedStyles, elevatedStyles];
WdElevatedCard = __decorate([
    customElement('wd-elevated-card')
], WdElevatedCard);
export { WdElevatedCard };
//# sourceMappingURL=elevated-card.js.map