import { declarativeTemplate } from '@aurorasoft/fast-element/declarative.js';
import { AuroraDesignSystem } from '../aurora-design-system.js';
import { tagName } from './label.options.js';
/**
 * The async definition configuration for the `<aurora-label>` element.
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
//# sourceMappingURL=label.definition-async.js.map