/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import '../../../focus/wd-focus-ring.js';
import '../../../ripple/ripple.js';
import '../../badge/badge.js';
import { html, LitElement, nothing } from 'lit';
import { property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { mixinDelegatesAria } from '../../../internal/aria/delegate.js';
// Separate variable needed for closure.
const navigationTabBaseClass = mixinDelegatesAria(LitElement);
/**
 * b/265346501 - add docs
 *
 * @fires navigation-tab-rendered {Event} Dispatched when the navigation tab's
 * DOM has rendered and custom element definition has loaded. --bubbles
 * --composed
 * @fires navigation-tab-interaction {CustomEvent<{state: WdNavigationTab}>}
 * Dispatched when the navigation tab has been clicked. --bubbles --composed
 */
export class NavigationTab extends navigationTabBaseClass {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.active = false;
        this.hideInactiveLabel = false;
        this.badgeValue = '';
        this.showBadge = false;
    }
    render() {
        // Needed for closure conformance
        const { ariaLabel } = this;
        return html ` <button
      class="wd3-navigation-tab ${classMap(this.getRenderClasses())}"
      role="tab"
      aria-selected="${this.active}"
      aria-label=${ariaLabel || nothing}
      tabindex="${this.active ? 0 : -1}"
      @click="${this.handleClick}">
      <wd-focus-ring part="focus-ring" inward></wd-focus-ring>
      <wd-ripple
        ?disabled="${this.disabled}"
        class="wd3-navigation-tab__ripple"></wd-ripple>
      <span aria-hidden="true" class="wd3-navigation-tab__icon-content"
        ><span class="wd3-navigation-tab__active-indicator"></span
        ><span class="wd3-navigation-tab__icon"
          ><slot name="inactive-icon"></slot
        ></span>
        <span class="wd3-navigation-tab__icon wd3-navigation-tab__icon--active"
          ><slot name="active-icon"></slot></span
        >${this.renderBadge()}</span
      >${this.renderLabel()}
    </button>`;
    }
    getRenderClasses() {
        return {
            'wd3-navigation-tab--hide-inactive-label': this.hideInactiveLabel,
            'wd3-navigation-tab--active': this.active,
        };
    }
    renderBadge() {
        return this.showBadge
            ? html `<wd-badge .value="${this.badgeValue}"></wd-badge>`
            : nothing;
    }
    renderLabel() {
        // Needed for closure conformance
        const { ariaLabel } = this;
        const ariaHidden = ariaLabel ? 'true' : 'false';
        return !this.label
            ? nothing
            : html ` <span
          aria-hidden="${ariaHidden}"
          class="wd3-navigation-tab__label-text"
          >${this.label}</span
        >`;
    }
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        const event = new Event('navigation-tab-rendered', {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }
    focus() {
        const buttonElement = this.buttonElement;
        if (buttonElement) {
            buttonElement.focus();
        }
    }
    blur() {
        const buttonElement = this.buttonElement;
        if (buttonElement) {
            buttonElement.blur();
        }
    }
    handleClick() {
        // b/269772145 - connect to ripple
        this.dispatchEvent(new CustomEvent('navigation-tab-interaction', {
            detail: { state: this },
            bubbles: true,
            composed: true,
        }));
    }
}
__decorate([
    property({ type: Boolean })
], NavigationTab.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], NavigationTab.prototype, "active", void 0);
__decorate([
    property({ type: Boolean, attribute: 'hide-inactive-label' })
], NavigationTab.prototype, "hideInactiveLabel", void 0);
__decorate([
    property()
], NavigationTab.prototype, "label", void 0);
__decorate([
    property({ attribute: 'badge-value' })
], NavigationTab.prototype, "badgeValue", void 0);
__decorate([
    property({ type: Boolean, attribute: 'show-badge' })
], NavigationTab.prototype, "showBadge", void 0);
__decorate([
    query('button')
], NavigationTab.prototype, "buttonElement", void 0);
//# sourceMappingURL=navigation-tab.js.map