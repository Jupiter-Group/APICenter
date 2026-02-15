/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import '../field/filled-field.js';
import { customElement } from 'lit/decorators.js';
import { literal } from 'lit/static-html.js';
import { styles as filledStyles } from './internal/filled-styles.js';
import { FilledTextField } from './internal/filled-text-field.js';
import { styles as sharedStyles } from './internal/shared-styles.js';
/**
 * TODO(b/228525797): Add docs
 * @final
 * @suppress {visibility}
 */
let WdFilledTextField = class WdFilledTextField extends FilledTextField {
    constructor() {
        super(...arguments);
        this.fieldTag = literal `wd-filled-field`;
    }
};
WdFilledTextField.styles = [sharedStyles, filledStyles];
WdFilledTextField = __decorate([
    customElement('wd-filled-text-field')
], WdFilledTextField);
export { WdFilledTextField };
//# sourceMappingURL=filled-text-field.js.map