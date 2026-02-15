/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { OutlinedField } from './internal/outlined-field.js';
import { styles as outlinedStyles } from './internal/outlined-styles.js';
import { styles as sharedStyles } from './internal/shared-styles.js';
/**
 * TODO(b/228525797): add docs
 * @final
 * @suppress {visibility}
 */
let WdOutlinedField = class WdOutlinedField extends OutlinedField {
};
WdOutlinedField.styles = [sharedStyles, outlinedStyles];
WdOutlinedField = __decorate([
    customElement('wd-outlined-field')
], WdOutlinedField);
export { WdOutlinedField };
//# sourceMappingURL=outlined-field.js.map