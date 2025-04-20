document.getElementById("load-url").addEventListener("click", function() {
    var url = document.getElementById("url-input").value;

    // Simple URL validation (basic)
    if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
        document.getElementById("custom-iframe").src = url;
    } else {
        alert("Please enter a valid URL (starting with http:// or https://)");
    }
});
