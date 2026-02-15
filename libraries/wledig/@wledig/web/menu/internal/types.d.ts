/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Event properties used by the adapter and foundation.
 */
export interface WDCMenuItemEventDetail {
    index: number;
}
/**
 * Event properties specific to the default component implementation.
 */
export interface WDCMenuItemComponentEventDetail extends WDCMenuItemEventDetail {
    item: Element;
}
export interface WDCMenuItemEvent extends Event {
    readonly detail: WDCMenuItemEventDetail;
}
export interface WDCMenuItemComponentEvent extends Event {
    readonly detail: WDCMenuItemComponentEventDetail;
}
