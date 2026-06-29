import { declarativeTemplate } from '@aurorasoft/fast-element/declarative.js';
import { AuroraDesignSystem } from '../aurora-design-system.js';
import { tagName } from './tree-item.options.js';
/**
 * The async definition for the `<aurora-tree-item>` element.
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
//# sourceMappingURL=tree-item.definition-async.js.map