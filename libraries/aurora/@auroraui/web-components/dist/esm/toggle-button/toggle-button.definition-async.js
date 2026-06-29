import { declarativeTemplate } from '@aurorasoft/fast-element/declarative.js';
import { AuroraDesignSystem } from '../aurora-design-system.js';
import { tagName } from './toggle-button.options.js';
/**
 * The async definition configuration for the `<aurora-toggle-button>` element.
 *
 * @public
 * @remarks
 * This is used in server-side rendering (SSR) scenarios where the template
 * is provided as a deferred option to be hydrated later.
 */
export const declarativeDefinition = {
    name: tagName,
    registry: AuroraDesignSystem.registry,
    template: declarativeTemplate(),
};
//# sourceMappingURL=toggle-button.definition-async.js.map