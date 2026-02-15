/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { FocusRing } from './internal/focus-ring.js';
import { styles } from './internal/focus-ring-styles.js';
/**
 * TODO(b/267336424): add docs
 *
 * @final
 * @suppress {visibility}
 */
let WdFocusRing = class WdFocusRing extends FocusRing {
};
WdFocusRing.styles = [styles];
WdFocusRing = __decorate([
    customElement('wd-focus-ring')
], WdFocusRing);
export { WdFocusRing };
//# sourceMappingURL=wd-focus-ring.js.map