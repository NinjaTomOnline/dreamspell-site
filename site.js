document.documentElement.classList.add("nav-js-ready");

document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll(".topbar");

  headers.forEach((header) => {
    const button = header.querySelector(".nav-toggle");
    const buttonText = header.querySelector(".nav-toggle-text");
    const nav = header.querySelector(".nav");

    if (!button || !buttonText || !nav) {
      return;
    }

    const setOpen = (isOpen) => {
      header.classList.toggle("is-nav-open", isOpen);
      button.setAttribute("aria-expanded", isOpen ? "true" : "false");
      button.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
      buttonText.textContent = isOpen ? "Close" : "Menu";
    };

    const closeMenu = () => setOpen(false);

    setOpen(false);

    button.addEventListener("click", () => {
      setOpen(!header.classList.contains("is-nav-open"));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (!header.classList.contains("is-nav-open")) {
        return;
      }

      if (header.contains(event.target)) {
        return;
      }

      closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    const mediaQuery = window.matchMedia("(max-width: 980px)");
    const handleBreakpointChange = (event) => {
      if (!event.matches) {
        closeMenu();
      }
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleBreakpointChange);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(handleBreakpointChange);
    }
  });
});
