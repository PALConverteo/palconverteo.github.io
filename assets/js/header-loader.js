document.addEventListener("DOMContentLoaded", function() {
  fetch("header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header-placeholder").innerHTML = data;
      // Now that the header DOM is loaded, initialize the auth script logic.
      if (typeof initializeAuth === 'function') {
        initializeAuth();
      }
    });
}); 