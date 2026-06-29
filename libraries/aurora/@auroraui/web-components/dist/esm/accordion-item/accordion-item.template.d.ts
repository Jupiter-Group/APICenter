import { type ElementViewTemplate } from '@aurorasoft/fast-element';
import type { AccordionItem, AccordionItemOptions } from './accordion-item.js';
export declare function accordionItemTemplate<T extends AccordionItem>(options?: AccordionItemOptions): ElementViewTemplate<T>;
/**
 * The template for the aurora-accordion component.
 * @public
 */
export declare const template: ElementViewTemplate<AccordionItem>;
