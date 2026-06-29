import { AuroraDesignSystem } from '../aurora-design-system.js';
import { tagName } from './field.options.js';
import { styles } from './field.styles.js';
import { template } from './field.template.js';
/**
 * The definition for the `<aurora-field>` element.
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
//# sourceMappingURL=field.definition.js.map