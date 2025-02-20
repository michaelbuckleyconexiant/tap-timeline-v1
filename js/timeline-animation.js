document.addEventListener("DOMContentLoaded", function () {
    function activateSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (!targetSection) return;

        document.querySelectorAll(".tap-timeline-aside-dot").forEach(dot => dot.classList.remove("active-dot"));
        document.querySelectorAll(".tap-timeline-aside-blurb").forEach(link => link.classList.remove("active-text"));

        document.querySelectorAll(`a[href='#${sectionId}']`).forEach(activeLink => {
            activeLink.classList.add("active-text");

            const parentSection = activeLink.closest(".tap-timeline-aside-section");
            if (parentSection) {
                const dot = parentSection.querySelector(".tap-timeline-aside-dot");
                if (dot) {
                    dot.classList.add("active-dot");
                }
            }
        });

        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Sidebar elements
    const menuButton = document.querySelector(".tap-timeline-aside-mobile-menu");
    const sidebar = document.querySelector(".tap-timeline-aside");

    document.body.addEventListener("click", function (event) {
        const link = event.target.closest("a[href^='#']");
        if (link && link.getAttribute("href")) {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1).trim();
            activateSection(targetId);
            history.pushState(null, "", `#${targetId}`);

            if (window.innerWidth <= 800 && sidebar) {
                sidebar.classList.remove("open");

                // Ensure the menu icon switches back when closed
                const icon = menuButton.querySelector("i");
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-list");
            }
        }
    });

    window.addEventListener("load", function () {
        const currentHash = window.location.hash.substring(1).trim();
        if (currentHash) {
            activateSection(currentHash);
        }
    });

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

    // Sidebar toggle functionality with icon change
    if (menuButton && sidebar) {
        menuButton.addEventListener("click", function () {
            sidebar.classList.toggle("open");

            // Find the icon inside the button
            const icon = menuButton.querySelector("i");

            // Toggle the FontAwesome icon class
            if (sidebar.classList.contains("open")) {
                icon.classList.remove("fa-list");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-list");
            }
        });

        document.addEventListener("click", function (event) {
            if (!sidebar.contains(event.target) && !menuButton.contains(event.target)) {
                sidebar.classList.remove("open");

                // Ensure the icon switches back when closing
                const icon = menuButton.querySelector("i");
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-list");
            }
        });
    }

// Sticky Menu Functionality
let stickyMenu = document.querySelector(".sticky-menu");
let trigger = document.querySelector("#trigger-mobile-menu");
let hasAppeared = false;

let stickyObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {  
                stickyMenu.classList.add("visible"); 
                hasAppeared = true; // Keep it visible once triggered
            } else if (entry.boundingClientRect.top > window.innerHeight) {
                // Hide when trigger moves completely below viewport
                stickyMenu.classList.remove("visible");
                hasAppeared = false;
            }
        });
    },
    { threshold: 0.1 }
);

stickyObserver.observe(trigger);

// Ensure sticky-menu starts hidden
stickyMenu.classList.remove("visible");

// Prevent it from disappearing when the trigger scrolls past the top
window.addEventListener("scroll", () => {
    if (hasAppeared) {
        stickyMenu.classList.add("visible");
    }
});



});

//WORKING