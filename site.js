document.addEventListener("DOMContentLoaded", () => {
  const normalize = (value) => value.toLowerCase().replace(/\s+/g, " ").trim();

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

  const initConceptSearch = () => {
    const searchRoot = document.querySelector("[data-concept-search]");
    if (!searchRoot) {
      return;
    }

    const input = searchRoot.querySelector("[data-concept-input]");
    const resultCount = searchRoot.querySelector("[data-concept-result-count]");
    const emptyState = searchRoot.querySelector("[data-concept-empty]");
    const filterButtons = Array.from(searchRoot.querySelectorAll("[data-concept-filter]"));
    const sections = Array.from(document.querySelectorAll("[data-concept-section]"));
    const entries = Array.from(document.querySelectorAll("[data-concept-entry]"));

    if (!input || entries.length === 0) {
      return;
    }

    let activeFilter = "all";
    const initialQuery = new URLSearchParams(window.location.search).get("q");
    if (initialQuery) {
      input.value = initialQuery;
    }

    const entryKind = (entry) => entry.dataset.conceptKind || entry.closest("[data-concept-section]")?.dataset.conceptSection || "";
    const entryText = (entry) => normalize([entry.dataset.conceptSearch, entry.textContent].filter(Boolean).join(" "));

    const syncButtons = () => {
      filterButtons.forEach((button) => {
        const isActive = button.dataset.conceptFilter === activeFilter;
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
        const visibleEntries = section.querySelectorAll("[data-concept-entry]:not([hidden])").length;
        section.hidden = visibleEntries === 0;
      });

      if (resultCount) {
        resultCount.textContent = visibleCount === 1 ? "1 matching topic" : `${visibleCount} matching topics`;
      }

      if (emptyState) {
        emptyState.hidden = visibleCount > 0;
      }
    };

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.conceptFilter || "all";
        syncButtons();
        applyFilters();
      });
    });

    input.addEventListener("input", applyFilters);

    syncButtons();
    applyFilters();
  };

  const initFooterAnnualCluster = () => {
    const footers = document.querySelectorAll(".footer");
    if (footers.length === 0) {
      return;
    }

    const markup = `
      <div class="footer-block footer-annual-cluster">
        <p class="footer-title">Annual Study</p>
        <div class="footer-link-grid footer-annual-links">
          <a class="button secondary" href="dreamspell-annual-cycle.html">Annual Hub</a>
          <a class="button secondary" href="13-moon-calendar-meaning.html">13 Moons</a>
          <a class="button secondary" href="day-out-of-time-meaning.html">Day Out of Time</a>
          <a class="button secondary" href="dreamspell-new-year-meaning.html">New Year</a>
          <a class="button secondary" href="dreamspell-year-bearer-meaning.html">Year Bearer</a>
        </div>
      </div>
    `;

    footers.forEach((footer) => {
      if (footer.querySelector(".footer-annual-cluster")) {
        return;
      }

      footer.insertAdjacentHTML("beforeend", markup);
    });
  };

  const initMeaningSummaries = () => {
    const pageName = window.location.pathname.split("/").pop() || "index.html";
    const summary = {
      "13-moon-calendar-meaning.html": {
        title: "What people usually mean by “13 Moon calendar”",
        copy: "Most people are not asking for a technical breakdown first. They usually want a simple yearly frame they can hold in memory before they learn the daily cycle.",
        bullets: [
          "A cleaner annual rhythm than the standard month grid",
          "A way to hold the whole Dreamspell year before zooming into kin",
          "The yearly layer that gives context to the daily Tzolkin"
        ]
      },
      "moon-meaning.html": {
        title: "What people usually mean by one Dreamspell moon",
        copy: "They usually want one named moon understood as a usable study unit, not just a label in a longer list.",
        bullets: [
          "A single 28-day chapter inside the year",
          "A named period with its own totem and theme",
          "A practical way to study the annual rhythm in smaller pieces"
        ]
      },
      "day-out-of-time-meaning.html": {
        title: "What people usually mean by the Day Out of Time",
        copy: "They are usually asking about the threshold day that sits between counted years and explains how the annual handoff works.",
        bullets: [
          "Why July 25 is treated differently from the moon days",
          "How the counted year closes before the new one opens",
          "The pause that makes the annual transition easier to understand"
        ]
      },
      "dreamspell-new-year-meaning.html": {
        title: "What people usually mean by Dreamspell new year",
        copy: "They usually want the broad annual restart explained, not just the date alone.",
        bullets: [
          "The opening of the next annual 13-Moon cycle",
          "The yearly restart that follows the Day Out of Time",
          "The wider annual idea behind the specific July 26 date"
        ]
      },
      "dreamspell-year-bearer-meaning.html": {
        title: "What people usually mean by year bearer",
        copy: "They usually want the yearly signature language that people attach to the new cycle, not a separate hidden calendar system.",
        bullets: [
          "A shorthand for the character of the year",
          "The annual use of tone-and-seal language",
          "A way to talk about the quality of the new cycle"
        ]
      },
      "july-26-new-year-meaning.html": {
        title: "What people usually mean by July 26 in Dreamspell",
        copy: "They usually want the concrete opening date of the new annual cycle after learning there is a threshold day before it.",
        bullets: [
          "The annual restart date in Gregorian terms",
          "The day after the Day Out of Time threshold",
          "The specific date that makes the new-year idea practical"
        ]
      },
      "tzolkin-meaning.html": {
        title: "What people usually mean by the Tzolkin",
        copy: "They are usually asking for the daily cycle behind kin, not a full abstract theory of every Dreamspell concept at once.",
        bullets: [
          "The 260-day rhythm behind daily kin study",
          "The cycle created by 13 tones and 20 seals",
          "The daily layer that works inside the larger annual frame"
        ]
      },
      "galactic-tones-meaning.html": {
        title: "What people usually mean by galactic tones",
        copy: "They usually want the action or movement language that shapes a cycle, not just a numbered list.",
        bullets: [
          "The 13-stage movement inside a cycle",
          "The part of a kin that describes how energy moves",
          "The sequence that also shapes a wavespell"
        ]
      },
      "solar-seals-meaning.html": {
        title: "What people usually mean by solar seals",
        copy: "They usually want the symbolic names and qualities that give a kin its recognizable character.",
        bullets: [
          "The symbolic half of a kin signature",
          "The names like Dragon, Seed, Moon, and Skywalker",
          "The imagery that pairs with tones to create a daily identity"
        ]
      },
      "kin-meaning.html": {
        title: "What people usually mean by kin",
        copy: "They usually want to know how one Dreamspell day gets its full name and why it matters in practice.",
        bullets: [
          "One daily signature in the 260-day cycle",
          "The combination of one tone and one seal",
          "The daily unit people actually check inside the app"
        ]
      },
      "wavespell-meaning.html": {
        title: "What people usually mean by a wavespell",
        copy: "They usually want the 13-day arc behind the tones explained as a process, not just a vocabulary word.",
        bullets: [
          "A 13-day sequence moving through all tones",
          "A way to see one day inside a larger unfolding arc",
          "The process language that complements kin study"
        ]
      },
      "year-bearer-colors.html": {
        title: "What people usually mean by year-bearer colors",
        copy: "They usually want the color-family side of the yearly signature explained in the same plain language they already use for seals and kin.",
        bullets: [
          "The four Dreamspell color families at the yearly level",
          "How color language changes the feel of a year-bearer reading",
          "Why yearly color talk still depends on the seal vocabulary"
        ]
      },
      "year-bearer-kin.html": {
        title: "What people usually mean by year-bearer kin",
        copy: "They usually want the kin structure behind the yearly signature, not just a high-level yearly slogan.",
        bullets: [
          "How tone and seal create the yearly signature language",
          "Why year-bearer talk still depends on kin study",
          "How the annual and daily layers connect in practice"
        ]
      }
    }[pageName];

    if (!summary || document.querySelector(".what-people-mean")) {
      return;
    }

    const anchor = document.querySelector(".intent-strip");
    if (!anchor) {
      return;
    }

    const section = document.createElement("section");
    section.className = "section what-people-mean";
    section.innerHTML = `
      <div class="section-header">
        <div>
          <p class="eyebrow">What People Usually Mean</p>
          <h2>${summary.title}</h2>
        </div>
        <p>${summary.copy}</p>
      </div>
      <div class="grid">
        ${summary.bullets.map((bullet) => `
          <article class="card span-4 meaning-card">
            <p>${bullet}</p>
          </article>
        `).join("")}
      </div>
    `;

    anchor.insertAdjacentElement("afterend", section);
  };

  const initScreenshotLightbox = () => {
    const triggers = Array.from(document.querySelectorAll("[data-lightbox-trigger]"));
    if (triggers.length === 0) {
      return;
    }

    const dialog = document.createElement("dialog");
    dialog.className = "lightbox-dialog";
    dialog.innerHTML = `
      <form method="dialog" class="lightbox-shell">
        <button class="lightbox-close" type="submit" aria-label="Close screenshot preview">Close</button>
        <div class="lightbox-media">
          <img class="lightbox-image" alt="">
        </div>
        <div class="lightbox-copy">
          <p class="lightbox-title"></p>
          <p class="lightbox-description"></p>
        </div>
      </form>
    `;

    document.body.appendChild(dialog);

    const image = dialog.querySelector(".lightbox-image");
    const title = dialog.querySelector(".lightbox-title");
    const description = dialog.querySelector(".lightbox-description");

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        image.src = trigger.dataset.lightboxSrc || "";
        image.alt = trigger.dataset.lightboxAlt || "";
        title.textContent = trigger.dataset.lightboxTitle || "";
        description.textContent = trigger.dataset.lightboxCopy || "";
        if (typeof dialog.showModal === "function") {
          dialog.showModal();
        }
      });
    });

    dialog.addEventListener("click", (event) => {
      const shell = dialog.querySelector(".lightbox-shell");
      if (!shell.contains(event.target)) {
        dialog.close();
      }
    });
  };

  initNavigation();
  initGlossarySearch();
  initConceptSearch();
  initFooterAnnualCluster();
  initMeaningSummaries();
  initScreenshotLightbox();
});
