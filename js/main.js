(() => {
  "use strict";

  const q = (selector, root = document) => root.querySelector(selector);
  const qa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const body = document.body;

  const techHero = q("#techHero");
  const infoPopup = q("#infoPopup");
  const companyPopup = q("#companyPopup");

  const popupNav = q("#popupNav");
  const popupNextStep = q("#popupNextStep");

  const agentSearchForm = q("#agentSearchForm");
  const agentSearchInput = q("#agentSearchInput");
  const agentDropdown = q("#agentDropdown");
  const agentResults = q("#agentResults");

  const chatWidget = q("#chatWidget");
  const chatToggle = q("#chatToggle");

  const themeToggle = q("#themeToggle");

  let resizeTimer = null;

  function isMobileView() {
    return window.matchMedia("(max-width: 1023px)").matches;
  }

  function callIfExists(fnName, ...args) {
    if (typeof window[fnName] === "function") {
      try {
        return window[fnName](...args);
      } catch (error) {
        console.warn(`${fnName} failed:`, error);
      }
    }
    return undefined;
  }

  function openInfoPopupSafe(key) {
    callIfExists("openInfoPopup", key);
  }

  function closeInfoPopupSafe() {
    callIfExists("closeInfoPopup");
  }

  function openCompanyPopupSafe() {
    if (typeof window.openCompanyPopup === "function") {
      callIfExists("openCompanyPopup");
      return;
    }

    if (!companyPopup) return;
    companyPopup.classList.add("show");
    companyPopup.setAttribute("aria-hidden", "false");
    body.classList.add("popup-open");
  }

  function closeCompanyPopupSafe() {
    if (typeof window.closeCompanyPopup === "function") {
      callIfExists("closeCompanyPopup");
      return;
    }

    if (!companyPopup) return;
    companyPopup.classList.remove("show");
    companyPopup.setAttribute("aria-hidden", "true");
    body.classList.remove("popup-open");
  }

  function renderPopupStepSafe(step) {
    callIfExists("renderPopupStep", step);
  }

  function trapFocusSafe(event, container) {
    if (typeof window.trapFocus === "function") {
      callIfExists("trapFocus", event, container);
      return;
    }

    if (event.key !== "Tab" || !container) return;

    const focusables = qa(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      container
    ).filter(el => !el.disabled && el.offsetParent !== null);

    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function playClick(type = "normal") {
    callIfExists("playClickSound", type);
  }

  function applyThemeByViewport() {
    if (isMobileView()) {
      body.classList.remove("light-mode");
      return;
    }

    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      body.classList.add("light-mode");
    } else {
      body.classList.remove("light-mode");
    }
  }

  function bindThemeToggle() {
    if (!themeToggle) return;

    themeToggle.addEventListener("click", () => {
      if (isMobileView()) return;

      body.classList.toggle("light-mode");
      localStorage.setItem(
        "theme",
        body.classList.contains("light-mode") ? "light" : "dark"
      );
    });
  }

  function googleTranslateElementInit() {
    if (!window.google?.translate?.TranslateElement) return;

    new google.translate.TranslateElement(
      {
        pageLanguage: "th",
        includedLanguages: "th,en",
        autoDisplay: false,
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
      },
      "google_translate_element"
    );

    syncActiveLangFromCookie();
  }
  window.googleTranslateElementInit = googleTranslateElementInit;

  function setActiveLang(lang) {
    qa(".lang-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }

  function getTranslateCookieLang() {
    const match = document.cookie.match(/(?:^|;\s*)googtrans=\/th\/([^;]+)/);
    return match ? decodeURIComponent(match[1]) : "th";
  }

  function setTranslateCookie(lang) {
    const value = lang === "th" ? "/th/th" : `/th/${lang}`;
    const hostParts = location.hostname.split(".");

    document.cookie = `googtrans=${value};path=/`;

    if (hostParts.length >= 2) {
      const rootDomain = "." + hostParts.slice(-2).join(".");
      document.cookie = `googtrans=${value};path=/;domain=${rootDomain}`;
    }
  }

  function clearTranslateCookie() {
    const hostParts = location.hostname.split(".");

    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    if (hostParts.length >= 2) {
      const rootDomain = "." + hostParts.slice(-2).join(".");
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${rootDomain};`;
    }
  }

  function syncActiveLangFromCookie() {
    const lang = getTranslateCookieLang();
    setActiveLang(["th", "en"].includes(lang) ? lang : "th");
  }

  function changeLanguage(lang) {
    const combo = q(".goog-te-combo");

    if (lang === "th") {
      clearTranslateCookie();

      if (combo) {
        combo.value = "th";
        combo.dispatchEvent(new Event("change"));
      }

      setActiveLang("th");
      setTimeout(() => location.reload(), 120);
      return;
    }

    setTranslateCookie(lang);
    setActiveLang(lang);

    if (combo) {
      combo.value = lang;
      combo.dispatchEvent(new Event("change"));

      setTimeout(() => {
        if (
          document.body.classList.contains("translated-ltr") ||
          document.body.classList.contains("translated-rtl")
        ) {
          return;
        }
        location.reload();
      }, 700);
    } else {
      location.reload();
    }
  }

  function bindLanguageButtons() {
    qa(".lang-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        if (!lang) return;
        changeLanguage(lang);
      });
    });
  }

  function syncHeroLabels() {
    const desktopTitle = q("#heroSystemTitle");
    const mobileTitle = q(".mobile-hero-title");

    if (desktopTitle) {
      desktopTitle.setAttribute("aria-hidden", isMobileView() ? "true" : "false");
    }

    if (mobileTitle) {
      mobileTitle.setAttribute("aria-hidden", isMobileView() ? "false" : "true");
    }
  }

  function closeMobileSubmenus() {
    qa(".mobile-menu-v2 .menu-item.open").forEach(item => {
      item.classList.remove("open");
    });
  }

  function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      applyThemeByViewport();
      syncHeroLabels();

      if (!isMobileView()) {
        closeMobileSubmenus();
      }
    }, 120);
  }

  function normalizeText(value) {
    return String(value || "").trim().toLowerCase();
  }

  function getAgentData() {
    if (Array.isArray(window.AGENTS)) return window.AGENTS;
    if (Array.isArray(window.agentsData)) return window.agentsData;
    if (Array.isArray(window.agentData)) return window.agentData;
    return [];
  }

  function buildAgentSearchText(agent) {
    return [
      agent?.name,
      agent?.full_name,
      agent?.nickname,
      agent?.agent_code,
      agent?.code,
      agent?.phone,
      agent?.mobile,
      agent?.email,
      agent?.province,
      agent?.area
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  }

  function openAgentDropdown() {
    if (!agentDropdown) return;
    agentDropdown.classList.add("open");
  }

  function closeAgentDropdown() {
    if (!agentDropdown) return;
    agentDropdown.classList.remove("open");
  }

  function renderAgentResults(keyword = "") {
    if (!agentResults) return;

    const agents = getAgentData();
    const qText = normalizeText(keyword);

    let filtered = agents;

    if (qText) {
      filtered = agents.filter(agent => buildAgentSearchText(agent).includes(qText));
    }

    const topResults = filtered.slice(0, 8);

    if (!topResults.length) {
      agentResults.innerHTML = `
        <div class="agent-result-empty th-font">
          ไม่พบข้อมูลตัวแทน
        </div>
      `;
      return;
    }

    agentResults.innerHTML = topResults
      .map(agent => {
        const name = agent?.name || agent?.full_name || "Agent";
        const code = agent?.agent_code || agent?.code || "-";
        const province = agent?.province || "";
        const phone = agent?.phone || agent?.mobile || "";
        const href = `agent-profile.html?code=${encodeURIComponent(code)}`;

        return `
          <a class="agent-result-item" href="${href}">
            <div class="agent-result-name th-font">${name}</div>
            <div class="agent-result-meta en-font">Code: ${code}</div>
            ${
              province || phone
                ? `<div class="agent-result-sub th-font">${[province, phone].filter(Boolean).join(" • ")}</div>`
                : ""
            }
          </a>
        `;
      })
      .join("");
  }

  function bindAgentSearch() {
    if (!agentSearchInput || !agentSearchForm) return;

    agentSearchInput.addEventListener("focus", () => {
      renderAgentResults(agentSearchInput.value);
      openAgentDropdown();
    });

    agentSearchInput.addEventListener("input", () => {
      renderAgentResults(agentSearchInput.value);
      openAgentDropdown();
    });

    agentSearchInput.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeAgentDropdown();
        agentSearchInput.blur();
      }
    });

    agentSearchForm.addEventListener("submit", event => {
      event.preventDefault();
      const keyword = agentSearchInput.value.trim();

      if (!keyword) {
        renderAgentResults("");
        openAgentDropdown();
        return;
      }

      window.location.href = `agent-profile.html?search=${encodeURIComponent(keyword)}`;
    });
  }

  function flashNode(el) {
    if (!el) return;
    el.classList.add("menu-hit");
    setTimeout(() => el.classList.remove("menu-hit"), 420);
  }

  function pulseLogo() {
    const logo = q("#logoToggle");
    if (!logo) return;
    logo.classList.add("logo-hit");
    setTimeout(() => logo.classList.remove("logo-hit"), 420);
  }

  function runFlow(flowClass) {
    if (!techHero) return;

    techHero.classList.remove("flow-m1", "flow-company", "flow-product", "flow-agent");
    void techHero.offsetWidth;
    techHero.classList.add(flowClass);

    setTimeout(() => {
      techHero.classList.remove(flowClass);
    }, 900);
  }

  function bindHeroMenu() {
    const hero = q("#techHero");
    const logoToggle = q("#logoToggle");
    const hint = q("#heroMenuHint");

    if (!hero || !logoToggle) return;

    const desktopLayer = q(".menu-layer-v2", hero);
    if (!desktopLayer) return;

    const menuGroups = qa(".menu-group", desktopLayer);
    const submenuButtons = qa(".submenu-btn", desktopLayer);
    const mainMenuButtons = qa(".menu-group > .main-node [data-menu]", desktopLayer);
    const popupButtons = qa("[data-popup]", desktopLayer);
    const linkButtons = qa("[data-link]", desktopLayer);

    const companyAboutButtons = qa('[data-action="company-about"]', desktopLayer);
    const companyContactButtons = qa('[data-action="company-contact"]', desktopLayer);
    const orderBtn = desktopLayer.querySelector(".m5 .node-shell");

    function closeAllSubmenus() {
      menuGroups.forEach(group => group.classList.remove("open"));
    }

    function updateHint() {
      if (!hint) return;
      hint.style.display = hero.classList.contains("open") ? "none" : "";
    }

    function openHeroMenu() {
      hero.classList.add("open");
      updateHint();
      pulseLogo();
    }

    function closeHeroMenu() {
      hero.classList.remove("open");
      closeAllSubmenus();
      updateHint();
    }

    function toggleHeroMenu() {
      if (hero.classList.contains("open")) {
        closeHeroMenu();
      } else {
        openHeroMenu();
      }
    }

    function toggleSubmenu(group) {
      if (!group) return;

      const wasOpen = group.classList.contains("open");
      closeAllSubmenus();

      if (!wasOpen) {
        group.classList.add("open");
      }
    }

    logoToggle.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      toggleHeroMenu();
    });

    hero.addEventListener("click", event => {
      event.stopPropagation();
    });

    mainMenuButtons.forEach(btn => {
      btn.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        const group = btn.closest(".menu-group");
        if (!group) return;

        if (!hero.classList.contains("open")) {
          openHeroMenu();
        }

        toggleSubmenu(group);
        flashNode(btn.closest(".node-shell") || btn);
        pulseLogo();

        if (group.classList.contains("g-company")) runFlow("flow-company");
        if (group.classList.contains("g-product")) runFlow("flow-product");
        if (group.classList.contains("g-agent")) runFlow("flow-agent");
      });
    });

    submenuButtons.forEach(btn => {
      btn.addEventListener("click", event => {
        event.stopPropagation();
        flashNode(btn);
        pulseLogo();

        const parentGroup = btn.closest(".menu-group");
        if (parentGroup?.classList.contains("g-company")) runFlow("flow-company");
        if (parentGroup?.classList.contains("g-product")) runFlow("flow-product");
        if (parentGroup?.classList.contains("g-agent")) runFlow("flow-agent");
      });
    });

    companyAboutButtons.forEach(btn => {
      btn.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        closeAllSubmenus();
        pulseLogo();
        runFlow("flow-company");
        openCompanyPopupSafe();
      });
    });

    companyContactButtons.forEach(btn => {
      btn.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        closeAllSubmenus();
        pulseLogo();
        runFlow("flow-company");
        openCompanyPopupSafe();
      });
    });

    popupButtons.forEach(btn => {
      btn.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        closeAllSubmenus();

        const key = btn.getAttribute("data-popup");
        if (key) openInfoPopupSafe(key);
      });
    });

    linkButtons.forEach(btn => {
      btn.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        closeAllSubmenus();

        const url = btn.getAttribute("data-link");
        if (url) {
          window.location.href = url;
        }
      });
    });

    if (orderBtn) {
      orderBtn.addEventListener("click", () => {
        pulseLogo();
        playClick("confirm");
      });
    }

    closeHeroMenu();
  }

  function bindPopups() {
    q("#closeInfoPopupTop")?.addEventListener("click", closeInfoPopupSafe);
    q("#closeInfoPopupBottom")?.addEventListener("click", closeInfoPopupSafe);
    q("#closeInfoPopupInline")?.addEventListener("click", closeInfoPopupSafe);

    q("#closeCompanyPopupTop")?.addEventListener("click", closeCompanyPopupSafe);
    q("#closeCompanyPopupBottom")?.addEventListener("click", closeCompanyPopupSafe);

    infoPopup?.addEventListener("click", event => {
      if (event.target === infoPopup) {
        closeInfoPopupSafe();
      }
    });

    companyPopup?.addEventListener("click", event => {
      if (event.target === companyPopup) {
        closeCompanyPopupSafe();
      }
    });

    infoPopup?.addEventListener("keydown", event => {
      trapFocusSafe(event, infoPopup);
    });

    companyPopup?.addEventListener("keydown", event => {
      trapFocusSafe(event, companyPopup);
    });
  }

  function bindMobileMenu() {
    const mobileRoot = q(".mobile-menu-v2");
    if (!mobileRoot) return;

    const mobileItems = qa(".menu-item.menu-item-toggle", mobileRoot);
    const mobileCompanyAboutButtons = qa('[data-action="company-about"]', mobileRoot);
    const mobileCompanyContactButtons = qa('[data-action="company-contact"]', mobileRoot);
    const mobileLinkButtons = qa("[data-link]", mobileRoot);

    mobileItems.forEach(item => {
      const btn = item.querySelector(":scope > .menu-btn");
      if (!btn) return;

      btn.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        const isOpen = item.classList.contains("open");

        mobileItems.forEach(other => {
          if (other !== item) other.classList.remove("open");
        });

        item.classList.toggle("open", !isOpen);
      });
    });

    mobileCompanyAboutButtons.forEach(btn => {
      btn.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        openCompanyPopupSafe();
      });
    });

    mobileCompanyContactButtons.forEach(btn => {
      btn.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        openCompanyPopupSafe();
      });
    });

    mobileLinkButtons.forEach(btn => {
      btn.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        const url = btn.getAttribute("data-link");
        if (url) {
          window.location.href = url;
        }
      });
    });
  }

  function bindChatWidget() {
    if (isMobileView()) return;
    if (!chatWidget || !chatToggle) return;

    chatToggle.addEventListener("click", event => {
      event.stopPropagation();
      chatWidget.classList.toggle("open");
    });
  }

  function bindSounds() {
    qa(".sound-click").forEach(el => {
      el.addEventListener("click", () => playClick("normal"));
    });
  }

  function bindGlobalEvents() {
    document.addEventListener("click", event => {
      const target = event.target;

      if (agentDropdown && agentSearchForm) {
        const clickedSearchZone =
          agentDropdown.contains(target) || agentSearchForm.contains(target);

        if (!clickedSearchZone) {
          closeAgentDropdown();
        }
      }

      if (!isMobileView() && chatWidget && !chatWidget.contains(target)) {
        chatWidget.classList.remove("open");
      }

      if (
        techHero &&
        !techHero.contains(target) &&
        !infoPopup?.classList.contains("show") &&
        !companyPopup?.classList.contains("show")
      ) {
        qa(".menu-group", techHero).forEach(group => group.classList.remove("open"));
        techHero.classList.remove("open");

        const hint = q("#heroMenuHint");
        if (hint) hint.style.display = "";
      }

      const mobileRoot = q(".mobile-menu-v2");
      if (mobileRoot && !mobileRoot.contains(target)) {
        closeMobileSubmenus();
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key !== "Escape") return;

      if (infoPopup?.classList.contains("show")) {
        closeInfoPopupSafe();
        return;
      }

      if (companyPopup?.classList.contains("show")) {
        closeCompanyPopupSafe();
        return;
      }

      if (agentDropdown?.classList.contains("open")) {
        closeAgentDropdown();
      }

      if (techHero?.classList.contains("open")) {
        qa(".menu-group", techHero).forEach(group => group.classList.remove("open"));
        techHero.classList.remove("open");

        const hint = q("#heroMenuHint");
        if (hint) hint.style.display = "";
      }

      closeMobileSubmenus();

      if (!isMobileView() && chatWidget?.classList.contains("open")) {
        chatWidget.classList.remove("open");
      }
    });

    window.addEventListener("resize", handleResize);
  }

  function bindPopupStepNav() {
    if (popupNav) {
      popupNav.querySelectorAll("[data-step]").forEach(btn => {
        btn.addEventListener("click", () => {
          popupNav.querySelectorAll(".popup-pro-nav-btn").forEach(item => {
            item.classList.remove("active");
          });

          btn.classList.add("active");
          renderPopupStepSafe(btn.dataset.step);
        });
      });
    }

    if (popupNextStep) {
      popupNextStep.addEventListener("click", () => {
        const next = popupNextStep.dataset.next;
        if (next) renderPopupStepSafe(next);
      });
    }
  }

  function init() {
    applyThemeByViewport();
    syncHeroLabels();
    syncActiveLangFromCookie();
    renderAgentResults("");

    bindLanguageButtons();
    bindAgentSearch();
    bindHeroMenu();
    bindPopups();
    bindMobileMenu();
    bindChatWidget();
    bindSounds();
    bindThemeToggle();
    bindGlobalEvents();
    bindPopupStepNav();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
