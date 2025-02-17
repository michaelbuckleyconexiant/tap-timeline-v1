document.addEventListener("DOMContentLoaded", function () {
    // Prevent browser from restoring scroll position automatically
    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }

    function activateSection(sectionId, shouldScroll = true) {
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

        // Only scroll if explicitly allowed (prevents jumping on initial load)
        if (shouldScroll) {
            targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    // Click event for sidebar navigation
    document.body.addEventListener("click", function (event) {
        const link = event.target.closest("a[href^='#']");
        if (link && link.getAttribute("href")) {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1).trim();
            activateSection(targetId);
            history.pushState(null, "", `#${targetId}`);
        }
    });

    // Prevent browser from auto-scrolling to anchor tags on load
    window.addEventListener("load", function () {
        const currentHash = window.location.hash.substring(1).trim();
        if (currentHash) {
            setTimeout(() => {
                activateSection(currentHash, true);
            }, 100); // Short delay to allow natural rendering
        } else {
            // If there's no hash, reset the scroll position to top
            window.scrollTo(0, 0);
        }
    });

    // Scroll Detection for Active State
    const sections = document.querySelectorAll(".tap-timeline-section"); // Select all timeline sections
    const dots = document.querySelectorAll(".tap-timeline-aside-dot");
    const blurbs = document.querySelectorAll(".tap-timeline-aside-blurb");

    if (sections.length === 0) {
        console.warn("No .tap-timeline-section elements found!");
        return;
    }

    const observerOptions = {
        root: null, // Observing relative to viewport
        rootMargin: "0px", // Adjusted to prevent premature activation
        threshold: 0.5 // Activates when at least 50% of a section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const section = entry.target;
            const sectionId = section.getAttribute("id");

            if (!sectionId) return;

            // Find matching sidebar elements
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

    // Enable scroll observer (Disable this if you suspect it is causing scroll issues)
    sections.forEach(section => {
        observer.observe(section);
    });

    console.log("Scroll observer initialized with", sections.length, "sections.");
});
