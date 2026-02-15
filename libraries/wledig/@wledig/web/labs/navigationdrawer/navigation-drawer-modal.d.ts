/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { NavigationDrawerModal } from './internal/navigation-drawer-modal.js';
declare global {
    interface HTMLElementTagNameMap {
        'wd-navigation-drawer-modal': WdNavigationDrawerModal;
    }
}
/**
 * @final
 * @suppress {visibility}
 */
export declare class WdNavigationDrawerModal extends NavigationDrawerModal {
    static readonly styles: import("lit").CSSResult[];
}
