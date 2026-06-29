import { html } from '@aurorasoft/fast-element';
import { endSlotTemplate, startSlotTemplate } from '../patterns/start-end.js';
/**
 * Generates a template for the CounterBadge component.
 *
 * @public
 */
export function counterBadgeTemplate(options = {}) {
    return html `
    ${startSlotTemplate(options)}
    <span>${x => x.displayValue}</span>
    ${endSlotTemplate(options)}
  `;
}
/**
 * The template for the aurora-counter-badge component.
 *
 * @public
 */
export const template = counterBadgeTemplate();
//# sourceMappingURL=counter-badge.template.js.map