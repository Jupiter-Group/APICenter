/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { Card } from './internal/card.js';
import { styles as filledStyles } from './internal/filled-styles.js';
import { styles as sharedStyles } from './internal/shared-styles.js';
/**
 * @final
 * @suppress {visibility}
 */
let WdFilledCard = class WdFilledCard extends Card {
};
WdFilledCard.styles = [sharedStyles, filledStyles];
WdFilledCard = __decorate([
    customElement('wd-filled-card')
], WdFilledCard);
export { WdFilledCard };
//# sourceMappingURL=filled-card.js.map