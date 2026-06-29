import { AuroraDesignSystem } from '../aurora-design-system.js';
import { tagName } from './text-input.options.js';
import { styles } from './text-input.styles.js';
import { template } from './text-input.template.js';
/**
 * The definition for the `<aurora-text-input>` element.
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
//# sourceMappingURL=text-input.definition.js.map