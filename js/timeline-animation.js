document.addEventListener("DOMContentLoaded", function () {
    function activateSection(sectionId) {
        // Ensure the ID exists
        const targetSection = document.getElementById(sectionId);
        if (!targetSection) return;

        // Remove active states from all dots, links, and texts
        document.querySelectorAll(".tap-timeline-aside-dot").forEach(dot => dot.classList.remove("active-dot"));
        document.querySelectorAll(".tap-timeline-aside-blurb").forEach(link => link.classList.remove("active-text"));

        // Find all corresponding links and activate them
        document.querySelectorAll(`a[href='#${sectionId}']`).forEach(activeLink => {
            activeLink.classList.add("active-text");

            // Find the parent section and its dot
            const parentSection = activeLink.closest(".tap-timeline-aside-section");
            if (parentSection) {
                const dot = parentSection.querySelector(".tap-timeline-aside-dot");
                if (dot) {
                    dot.classList.add("active-dot");
                }
            }
        });

        // Smooth scrolling to the section
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Sidebar elements
    const menuButton = document.querySelector(".tap-timeline-aside-mobile-menu");
    const sidebar = document.querySelector(".tap-timeline-aside");

    // Click event for sidebar navigation
    document.body.addEventListener("click", function (event) {
        const link = event.target.closest("a[href^='#']");
        if (link && link.getAttribute("href")) {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1).trim();
            activateSection(targetId);
            history.pushState(null, "", `#${targetId}`);

            // Close sidebar when a section link is clicked (only on mobile)
            if (window.innerWidth <= 800 && sidebar) {
                sidebar.classList.remove("open");
            }
        }
    });

    // Activate section on page load if a hash exists
    window.addEventListener("load", function () {
        const currentHash = window.location.hash.substring(1).trim();
        if (currentHash) {
            activateSection(currentHash);
        }
    });

    // Scroll Detection for Active State
    const sections = document.querySelectorAll(".tap-timeline-section");

    if (sections.length === 0) {
        console.warn("No .tap-timeline-section elements found!");
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const section = entry.target;
            const sectionId = section.getAttribute("id");

            if (!sectionId) return;

            const correspondingLinks = document.querySelectorAll(`a[href="#${sectionId}"]`);
            correspondingLinks.forEach(link => {
                const parentSection = link.closest(".tap-timeline-aside-section");
                const dot = parentSection ? parentSection.querySelector(".tap-timeline-aside-dot") : null;

                if (entry.isIntersecting) {
                    link.classList.add("active-text");
                    if (dot) dot.classList.add("active-dot");
                } else {
                    link.classList.remove("active-text");
                    if (dot) dot.classList.remove("active-dot");
                }
            });
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    console.log("Scroll observer initialized with", sections.length, "sections.");

    // Sidebar toggle functionality
    if (menuButton && sidebar) {
        menuButton.addEventListener("click", function () {
            sidebar.classList.toggle("open");
        });

        document.addEventListener("click", function (event) {
            if (!sidebar.contains(event.target) && !menuButton.contains(event.target)) {
                sidebar.classList.remove("open");
            }
        });
    }

    // Sticky Menu Functionality
    let stickyMenu = document.querySelector(".sticky-menu");
    let trigger = document.querySelector("#trigger-mobile-menu");

    let stickyObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                let triggerPosition = trigger.getBoundingClientRect().top;

                if (triggerPosition <= 0) {
                    stickyMenu.classList.add("visible");
                } else {
                    stickyMenu.classList.remove("visible");
                }
            });
        },
        { threshold: 0 }
    );

    stickyObserver.observe(trigger);
});

// WORKING