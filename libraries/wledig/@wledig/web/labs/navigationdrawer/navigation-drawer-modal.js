/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { NavigationDrawerModal } from './internal/navigation-drawer-modal.js';
import { styles } from './internal/navigation-drawer-modal-styles.js';
import { styles as sharedStyles } from './internal/shared-styles.js';
/**
 * @final
 * @suppress {visibility}
 */
let WdNavigationDrawerModal = class WdNavigationDrawerModal extends NavigationDrawerModal {
};
WdNavigationDrawerModal.styles = [sharedStyles, styles];
WdNavigationDrawerModal = __decorate([
    customElement('wd-navigation-drawer-modal')
], WdNavigationDrawerModal);
export { WdNavigationDrawerModal };
//# sourceMappingURL=navigation-drawer-modal.js.map