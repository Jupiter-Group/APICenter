/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { styles as elevatedStyles } from './internal/elevated-styles.js';
import { styles as sharedStyles } from './internal/shared-styles.js';
import { SuggestionChip } from './internal/suggestion-chip.js';
import { styles } from './internal/suggestion-styles.js';
/**
 * TODO(b/243982145): add docs
 *
 * @final
 * @suppress {visibility}
 */
let WdSuggestionChip = class WdSuggestionChip extends SuggestionChip {
};
WdSuggestionChip.styles = [sharedStyles, elevatedStyles, styles];
WdSuggestionChip = __decorate([
    customElement('wd-suggestion-chip')
], WdSuggestionChip);
export { WdSuggestionChip };
//# sourceMappingURL=suggestion-chip.js.map