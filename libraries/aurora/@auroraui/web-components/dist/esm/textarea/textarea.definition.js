import { AuroraDesignSystem } from '../aurora-design-system.js';
import { tagName } from './textarea.options.js';
import { styles } from './textarea.styles.js';
import { template } from './textarea.template.js';
/**
 * The definition for the `<aurora-textarea>` element.
 *
 * @public
 */
export const definition = {
    name: tagName,
    registry: AuroraDesignSystem.registry,
    shadowOptions: {
        delegatesFocus: true,
    },
    styles,
    template,
};
//# sourceMappingURL=textarea.definition.js.map