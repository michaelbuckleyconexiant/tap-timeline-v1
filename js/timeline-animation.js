document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".tap-timeline-aside-mobile-menu");
  const asidePanel = document.querySelector(".tap-timeline-aside");
  const icon = menuButton.querySelector("i"); // Select the icon inside the button
  const anchorTags = asidePanel.querySelectorAll("a"); // Select all anchor tags inside the aside panel
  const mobileBreakpoint = 800; // Define the mobile breakpoint

  menuButton.addEventListener("click", function () {
    if (asidePanel.style.display === "none" || asidePanel.style.display === "") {
      asidePanel.style.display = "flex"; // Show the panel
      icon.classList.replace("fa-list", "fa-xmark"); // Change to 'X' icon
    } else {
      closeMenu();
    }
  });

  anchorTags.forEach(anchor => {
    anchor.addEventListener("click", function () {
      if (window.innerWidth <= mobileBreakpoint) {
        closeMenu(); // Close the menu only if it's on mobile
      }
    });
  });

  // Function to close the menu
  function closeMenu() {
    asidePanel.style.display = "none"; // Hide the panel
    icon.classList.replace("fa-xmark", "fa-list"); // Change back to timeline icon
  }

  // Event listener for window resizing to check screen width
  window.addEventListener("resize", function () {
    if (window.innerWidth > mobileBreakpoint) {
      // When the window is resized larger than the mobile breakpoint, show the menu if it was hidden
      asidePanel.style.display = "flex"; // Ensure the menu is visible
    } else {
      // If the window is resized back to mobile size, keep the menu hidden
      asidePanel.style.display = "none"; // Hide the menu
    }
  });

});