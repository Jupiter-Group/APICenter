import './define.js';
const itemRenderer = () => {
    const label = document.createElement('aurora-label');
    label.appendChild(document.createTextNode('Label'));
    return label;
};
export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
//# sourceMappingURL=label.bench.js.map