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

  const mobileMenuQuery = window.matchMedia('(width < 48rem)');

  // * Helper Function
  // Convert the string attribute value to a boolean
  // and check whether the menu is currently open.
  const isMenuOpen = () => navToggle.getAttribute('aria-expanded') === 'true';

  // * Helper Function
  // Apply the open/closed menu state to the toggle, label, and nav interaction.
  // Keeps aria-expanded, accessible text, and nav focusability in sync.
  const setMenuState = (isOpen) => {
    navToggle.setAttribute('aria-expanded', String(isOpen));
    menuText.textContent = isOpen ? 'Close menu' : 'Menu';
    navMenu.inert = mobileMenuQuery.matches && !isOpen;
  };

  setMenuState(isMenuOpen());

  // Re-check whether the nav should be inert when the viewport crosses the 48rem breakpoint.
  mobileMenuQuery.addEventListener('change', (event) => {
    if (!event.matches) {
      // Crossed into tablet/desktop: forces the menu closed so state is clean if we return to mobile.
      setMenuState(false);
    } else {
      // Crossed into mobile: applies current state (will set inert correctly).
      setMenuState(isMenuOpen());
    }
  });

  // * Helper Function
  // Apply the closed menu state.
  const closeMenu = () => {
    setMenuState(false);
  };

  // Toggle menu state when the button is clicked.
  navToggle.addEventListener('click', () => {
    setMenuState(!isMenuOpen());
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
    navToggle.focus();

    // Prevent the global Escape blur handler from also running.
    event.stopImmediatePropagation();
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

function initJoinModal() {
  const joinButton = document.querySelector('#join-button');
  const joinDialog = document.querySelector('#join-dialog');

  // * Guard
  // Stop if the open modal button or the dialog are not present on this page.
  if (!joinButton || !joinDialog) return;

  const closeDialog = joinDialog.querySelector('#close-dialog');
  const modalLink = joinDialog.querySelector('.button');

  // * Guard
  // Stop if the close modal button or the link button are not present on this page.
  if (!closeDialog || !modalLink) return;

  joinButton.addEventListener('click', () => {
    joinDialog.showModal();
  });

  closeDialog.addEventListener('click', () => {
    joinDialog.close();
  });

  joinDialog.addEventListener('click', (event) => {
    if (event.target !== joinDialog) return;

    joinDialog.close();
  });

  modalLink.addEventListener('click', () => {
    joinDialog.close();
  });
}

initMobileNav();
initEscapeBlur();
initJoinModal();
