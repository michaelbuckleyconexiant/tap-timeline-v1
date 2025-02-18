document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".tap-timeline-aside-mobile-menu");
  const asidePanel = document.querySelector(".tap-timeline-aside");
  const icon = menuButton.querySelector("i");
  const anchorTags = asidePanel.querySelectorAll("a");
  const mobileBreakpoint = 800;
  const scrollThreshold = 300;

  if (!menuButton || !asidePanel) {
    console.error("Error: Required elements not found in DOM");
    return;
  }

  // Hide menu button initially with !important
  menuButton.style.cssText = "display: none !important;";

  // Function to show the menu button after scrolling
  function toggleMenuVisibility() {
    if (window.scrollY > scrollThreshold) {
      menuButton.style.cssText = "display: block !important;"; // Show menu button
    } else {
      menuButton.style.cssText = "display: none !important;"; // Hide menu button
    }
  }

  window.addEventListener("scroll", toggleMenuVisibility);

  // Menu toggle functionality
  menuButton.addEventListener("click", function () {
    asidePanel.style.display = asidePanel.style.display === "none" ? "flex" : "none";
    icon.classList.toggle("fa-list");
    icon.classList.toggle("fa-xmark");
  });

  // Close menu when clicking a link on mobile
  anchorTags.forEach(anchor => {
    anchor.addEventListener("click", function () {
      if (window.innerWidth <= mobileBreakpoint) {
        asidePanel.style.display = "none";
        icon.classList.add("fa-list");
        icon.classList.remove("fa-xmark");
      }
    });
  });

  // Adjust menu visibility on resize
  window.addEventListener("resize", function () {
    asidePanel.style.display = window.innerWidth > mobileBreakpoint ? "flex" : "none";
  });

  // Ensure menu starts hidden and only appears after scrolling
  toggleMenuVisibility();
});
