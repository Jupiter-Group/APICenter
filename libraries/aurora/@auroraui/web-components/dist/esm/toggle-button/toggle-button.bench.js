import './define.js';
const itemRenderer = () => {
    const btn = document.createElement('aurora-toggle-button');
    btn.appendChild(document.createTextNode('Toggle button'));
    return btn;
};
export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
//# sourceMappingURL=toggle-button.bench.js.map