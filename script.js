const year = document.getElementById('year');

// Set dynamic current year on the footer
if (year) {
  year.textContent = new Date().getFullYear();
}
