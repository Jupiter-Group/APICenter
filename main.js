// Load components (from your own server)
import "https://apicenter.pages.dev/libraries/wledig/button/filled-button.js";
import "https://apicenter.pages.dev/libraries/wledig/textfield/filled-text-field.js";

// App logic
const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  alert("Hello Material Web!");
});
