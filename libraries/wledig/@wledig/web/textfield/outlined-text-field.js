/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import '../field/outlined-field.js';
import { customElement } from 'lit/decorators.js';
import { literal } from 'lit/static-html.js';
import { styles as outlinedStyles } from './internal/outlined-styles.js';
import { OutlinedTextField } from './internal/outlined-text-field.js';
import { styles as sharedStyles } from './internal/shared-styles.js';
/**
 * TODO(b/228525797): Add docs
 * @final
 * @suppress {visibility}
 */
let WdOutlinedTextField = class WdOutlinedTextField extends OutlinedTextField {
    constructor() {
        super(...arguments);
        this.fieldTag = literal `wd-outlined-field`;
    }
};
WdOutlinedTextField.styles = [sharedStyles, outlinedStyles];
WdOutlinedTextField = __decorate([
    customElement('wd-outlined-text-field')
], WdOutlinedTextField);
export { WdOutlinedTextField };
//# sourceMappingURL=outlined-text-field.js.map