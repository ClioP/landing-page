const year = document.getElementById('year');

// Set dynamic current year on the footer
if (year) {
  year.textContent = new Date().getFullYear();
}

// Mobile navigation control
function initMobileNav() {
  const navToggle = document.querySelector('.site-nav-toggle');

  // * Guard
  // Stop if the nav toggle button is not present on this page.
  if (!navToggle) return;

  const navMenu = document.getElementById(navToggle.getAttribute('aria-controls'));
  const menuText = navToggle.querySelector('.site-nav-toggle-text');

  // * Guard
  // Stop if the controlled nav menu or button text is missing.
  if (!navMenu || !menuText) return;

  // * Helper Function
  // Convert the string attribute value to a boolean
  // and heck whether the menu is currently open.......
  const isMenuOpen = () => navToggle.getAttribute('aria-expanded') === 'true';

  // * Helper Function
  // Close the menu and reset the button text.
  const closeMenu = () => {
    navToggle.setAttribute('aria-expanded', 'false');
    menuText.textContent = 'Menu';
  };

  // Toggle menu state when the button is clicked.
  navToggle.addEventListener('click', () => {
    const isOpen = isMenuOpen();

    // Flip the boolean state and write it back as a string attribute value.
    navToggle.setAttribute('aria-expanded', String(!isOpen));

    // Update the accessible button text.
    const newState = !isOpen;
    menuText.textContent = newState ? 'Close menu' : 'Menu';
  });

  const navLinks = navMenu.querySelectorAll('.nav-link');

  // Close menu when clicking on a nav link.
  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu when Escape is pressed.
  document.addEventListener('keydown', (event) => {
    const isEscape = event.key === 'Escape';
    const isOpen = isMenuOpen();

    if (!isEscape || !isOpen) return;

    closeMenu();
  });
}

// Remove focus from the currently focused element when Escape is pressed.
function initEscapeBlur() {
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;

    const activeElement = document.activeElement;

    if (!activeElement || activeElement === document.body) return;

    activeElement.blur();
  });
}

initMobileNav();
initEscapeBlur();
