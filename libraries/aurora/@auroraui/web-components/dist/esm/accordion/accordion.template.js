import { elements, html, slotted } from '@aurorasoft/fast-element';
/**
 * @public
 */
export function accordionTemplate() {
    return html `
    <template>
      <slot ${slotted({ property: 'slottedAccordionItems', filter: elements() })}></slot>
    </template>
  `;
}
export const template = accordionTemplate();
//# sourceMappingURL=accordion.template.js.map