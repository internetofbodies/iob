// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Select the checkbox and menu
  const mobileMenuToggle = document.querySelector('#check');
  const navbarMenu = document.querySelector('.navbar__menu');
  
  // Add event listener to the checkbox to toggle the active class
  mobileMenuToggle.addEventListener('change', function() {
    if (mobileMenuToggle.checked) {
      navbarMenu.classList.add('active'); // Add active class when menu is opened
    } else {
      navbarMenu.classList.remove('active'); // Remove active class when menu is closed
    }
  });
});
