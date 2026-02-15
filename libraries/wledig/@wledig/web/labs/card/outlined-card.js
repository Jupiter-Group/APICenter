/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { Card } from './internal/card.js';
import { styles as outlinedStyles } from './internal/outlined-styles.js';
import { styles as sharedStyles } from './internal/shared-styles.js';
/**
 * @final
 * @suppress {visibility}
 */
let WdOutlinedCard = class WdOutlinedCard extends Card {
};
WdOutlinedCard.styles = [sharedStyles, outlinedStyles];
WdOutlinedCard = __decorate([
    customElement('wd-outlined-card')
], WdOutlinedCard);
export { WdOutlinedCard };
//# sourceMappingURL=outlined-card.js.map