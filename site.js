document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll(".topbar");

  headers.forEach((header) => {
    const toggle = header.querySelector(".nav-toggle-input");
    const nav = header.querySelector(".nav");

    if (!toggle || !nav) {
      return;
    }

    const syncMenuState = () => {
      document.body.classList.toggle("menu-open", toggle.checked);
    };

    const closeMenu = () => {
      toggle.checked = false;
      syncMenuState();
    };

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    toggle.addEventListener("change", syncMenuState);

    document.addEventListener("click", (event) => {
      if (!toggle.checked) {
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

    syncMenuState();
  });
});
