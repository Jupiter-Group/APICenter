import { html, ref } from '@aurorasoft/fast-element';
export function progressTemplate() {
    return html ` <div class="indicator" part="indicator" ${ref('indicator')}></div> `;
}
export const template = progressTemplate();
//# sourceMappingURL=progress-bar.template.js.map