document.addEventListener("DOMContentLoaded", () => {
  const initNavigation = () => {
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
  };

  const initGlossarySearch = () => {
    const searchRoot = document.querySelector("[data-glossary-search]");
    if (!searchRoot) {
      return;
    }

    const input = searchRoot.querySelector("[data-glossary-input]");
    const resultCount = searchRoot.querySelector("[data-glossary-result-count]");
    const emptyState = searchRoot.querySelector("[data-glossary-empty]");
    const filterButtons = Array.from(searchRoot.querySelectorAll("[data-glossary-filter]"));
    const sections = Array.from(document.querySelectorAll("[data-glossary-section]"));
    const entries = Array.from(document.querySelectorAll("[data-glossary-entry], .term-card"));

    if (!input || entries.length === 0) {
      return;
    }

    const normalize = (value) => value.toLowerCase().replace(/\s+/g, " ").trim();
    let activeFilter = "all";

    const entryKind = (entry) => {
      return entry.dataset.glossaryKind || entry.closest("[data-glossary-section]")?.dataset.glossarySection || "";
    };

    const entryText = (entry) => {
      return normalize([entry.dataset.glossarySearch, entry.textContent].filter(Boolean).join(" "));
    };

    const syncButtons = () => {
      filterButtons.forEach((button) => {
        const isActive = button.dataset.glossaryFilter === activeFilter;
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
    };

    const applyFilters = () => {
      const query = normalize(input.value);
      let visibleCount = 0;

      entries.forEach((entry) => {
        const kind = entryKind(entry);
        const matchesFilter = activeFilter === "all" || kind === activeFilter;
        const matchesQuery = query === "" || entryText(entry).includes(query);
        const show = matchesFilter && matchesQuery;

        entry.hidden = !show;
        if (show) {
          visibleCount += 1;
        }
      });

      sections.forEach((section) => {
        const visibleEntries = section.querySelectorAll("[data-glossary-entry]:not([hidden]), .term-card:not([hidden])").length;
        section.hidden = visibleEntries === 0;
      });

      if (resultCount) {
        resultCount.textContent = visibleCount === 1 ? "1 matching term" : `${visibleCount} matching terms`;
      }

      if (emptyState) {
        emptyState.hidden = visibleCount > 0;
      }
    };

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.glossaryFilter || "all";
        syncButtons();
        applyFilters();
      });
    });

    input.addEventListener("input", applyFilters);

    syncButtons();
    applyFilters();
  };

  initNavigation();
  initGlossarySearch();
});
