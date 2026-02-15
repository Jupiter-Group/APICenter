// Import all the Wledig Web Components you need
import '@wledig/web/textfield/filled-text-field.js';
import '@wledig/web/button/filled-button.js';

// Example: Button click
const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
    const nameField = document.getElementById('name');
    const name = nameField.value || 'Guest';
    alert(`Hello, ${name}! Wledig Web Loaded!`);
});
