import './define.js';
const itemRenderer = () => {
    const badge = document.createElement('aurora-badge');
    badge.appendChild(document.createTextNode('Badge'));
    return badge;
};
export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
//# sourceMappingURL=badge.bench.js.map