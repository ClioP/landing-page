const year = document.getElementById('year');

// Set dynamic current year on the footer
if (year) {
  year.textContent = new Date().getFullYear();
}

// Mobile navigation
function initMobileNav() {
  const navToggle = document.querySelector('.site-nav-toggle');

  if (!navToggle) return;

  const navMenu = document.getElementById(navToggle.getAttribute('aria-controls'));
  const menuText = navToggle.querySelector('.site-nav-toggle-text');

  if (!navMenu || !menuText) return;

  navToggle.addEventListener('click', () => {
    const expandedValue = navToggle.getAttribute('aria-expanded');

    // Convert the string attribute value to a boolean.
    const isOpen = expandedValue === 'true';

    // Flip the boolean state and write it back as a string attribute value.
    navToggle.setAttribute('aria-expanded', String(!isOpen));

    // Set the .site-nav-toggle-text text
    const newState = !isOpen;
    menuText.textContent = newState ? 'Close menu' : 'Menu';
  });
}

initMobileNav();
