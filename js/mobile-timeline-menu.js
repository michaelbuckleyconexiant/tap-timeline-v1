document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".tap-timeline-aside-mobile-menu");
  const asidePanel = document.querySelector(".tap-timeline-aside");
  const icon = menuButton.querySelector("i"); // Select the icon inside the button
  const anchorTags = asidePanel.querySelectorAll("a"); // Select all anchor tags inside the aside panel
  const mobileBreakpoint = 800; // Define the mobile breakpoint
  const scrollThreshold = 300; // Adjust scroll value as needed

  if (!menuButton) {
    console.error("Error: .tap-timeline-aside-mobile-menu not found in DOM");
    return;
  }

  // Function to show/hide menu button on scroll
  function toggleMenuVisibility() {
    console.log("Scroll position:", window.scrollY); // Debugging output

    if (window.scrollY > scrollThreshold) {
      console.log("Adding show-menu class"); // Debugging output
      menuButton.classList.add("show-menu");
    } else {
      console.log("Removing show-menu class"); // Debugging output
      menuButton.classList.remove("show-menu");
    }
  }

  // Attach scroll event listener
  window.addEventListener("scroll", toggleMenuVisibility);

  // Menu toggle functionality
  menuButton.addEventListener("click", function () {
    if (asidePanel.style.display === "none" || asidePanel.style.display === "") {
      asidePanel.style.display = "flex"; // Show the panel
      icon.classList.replace("fa-list", "fa-xmark"); // Change to 'X' icon
    } else {
      closeMenu();
    }
  });

  // Close menu when clicking a link on mobile
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

  // Adjust menu visibility on resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > mobileBreakpoint) {
      asidePanel.style.display = "flex"; // Ensure the menu is visible
    } else {
      asidePanel.style.display = "none"; // Hide the menu
    }
  });
});
