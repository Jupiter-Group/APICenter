import { declarativeTemplate } from '@aurorasoft/fast-element/declarative.js';
import { AuroraDesignSystem } from '../aurora-design-system.js';
import { tagName } from './progress-bar.options.js';
/**
 * The async definition configuration for the `<aurora-progress-bar>` element.
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
//# sourceMappingURL=progress-bar.definition-async.js.map