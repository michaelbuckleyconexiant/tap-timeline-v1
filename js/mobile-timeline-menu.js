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
      menuButton.style.cssText = "display: block !important;";
    } else {
      menuButton.style.cssText = "display: none !important;";
    }
  }

  window.addEventListener("scroll", toggleMenuVisibility);

  // Menu toggle functionality
  menuButton.addEventListener("click", function () {
    if (window.getComputedStyle(asidePanel).display === "none") {
      asidePanel.style.display = "flex";
    } else {
      asidePanel.style.display = "none";
    }
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

  // Get all sections with an ID that match anchor hrefs
  const sections = Array.from(document.querySelectorAll("section[id]"));

  function highlightActiveLink() {
    let scrollPosition = window.scrollY + window.innerHeight * 0.3; // Adjusted for better accuracy

    let activeSection = sections.find(section => {
      const rect = section.getBoundingClientRect();
      return rect.top <= scrollPosition && rect.bottom >= scrollPosition;
    });

    if (activeSection) {
      let activeId = activeSection.getAttribute("id");

      // Remove active class from all links
      anchorTags.forEach(anchor => {
        anchor.classList.remove("active-text");
      });

      // Add active class to the matching link
      let activeLink = document.querySelector(`.tap-timeline-aside a[href="#${activeId}"]`);
      if (activeLink) {
        activeLink.classList.add("active-text");
      }
    }
  }

  // Attach scroll event to update active state
  window.addEventListener("scroll", highlightActiveLink);

  // Run on page load to set the initial active link
  highlightActiveLink();

  // Adjust menu visibility on resize
  window.addEventListener("resize", function () {
    asidePanel.style.display = window.innerWidth > mobileBreakpoint ? "flex" : "none";
  });

  // Ensure menu starts hidden and only appears after scrolling
  toggleMenuVisibility();
});
