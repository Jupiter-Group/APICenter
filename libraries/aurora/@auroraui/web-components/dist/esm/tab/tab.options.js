import { AuroraDesignSystem } from '../aurora-design-system.js';
/**
 * Predicate function that determines if the element should be considered a tab.
 *
 * @param element - The element to check.
 * @param tagName - The tag name to check.
 * @returns true if the element is a tab.
 * @public
 */
export function isTab(element, tagName = '-tab') {
    if (element?.nodeType !== Node.ELEMENT_NODE) {
        return false;
    }
    return element.tagName.toLowerCase().endsWith(tagName);
}
/**
 * The tag name for the tab element.
 *
 * @public
 */
export const tagName = `${AuroraDesignSystem.prefix}-tab`;
//# sourceMappingURL=tab.options.js.map