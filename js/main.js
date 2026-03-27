/* =========================
   MAIN.JS
   Clean desktop hero logic
   + mobile safe
   + no duplicate listeners
   ========================= */

/* ---------- helpers ---------- */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

/* ---------- globals ---------- */
const body = document.body;

const techHero = $("#techHero");
const infoPopup = $("#infoPopup");
const companyPopup = $("#companyPopup");

const popupNav = $("#popupNav");
const popupNextStep = $("#popupNextStep");

const agentSearchForm = $("#agentSearchForm");
const agentSearchInput = $("#agentSearchInput");
const agentDropdown = $("#agentDropdown");
const agentResults = $("#agentResults");

const chatWidget = $("#chatWidget");
const chatToggle = $("#chatToggle");

const themeToggle = $("#themeToggle");

let resizeTimer = null;

/* ---------- basic safe helpers ---------- */
function isMobileView() {
  return window.matchMedia("(max-width: 1023px)").matches;
}

function safeCall(fnName, ...args) {
  if (typeof window[fnName] === "function") {
    return window[fnName](...args);
  }
  return undefined;
}

function safeOpenInfoPopup(key) {
  safeCall("openInfoPopup", key);
}

function safeCloseInfoPopup() {
  safeCall("closeInfoPopup");
}

function safeOpenCompanyPopup() {
  safeCall("openCompanyPopup");
}

function safeCloseCompanyPopup() {
  safeCall("closeCompanyPopup");
}

function safeRenderPopupStep(step) {
  safeCall("renderPopupStep", step);
}

function safeTrapFocus(event, container) {
  safeCall("trapFocus", event, container);
}

function playClick(type = "normal") {
  safeCall("playClickSound", type);
}

/* ---------- theme ---------- */
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

/* ---------- language ---------- */
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
  $$(".lang-btn").forEach(btn => {
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
  const combo = $(".goog-te-combo");

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
  $$(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      changeLanguage(btn.dataset.lang);
    });
  });
}

/* ---------- hero label sync ---------- */
function syncHeroLabels() {
  const desktopTitle = $("#heroSystemTitle");
  const mobileTitle = $(".mobile-hero-title");

  if (desktopTitle) {
    desktopTitle.setAttribute("aria-hidden", isMobileView() ? "true" : "false");
  }

  if (mobileTitle) {
    mobileTitle.setAttribute("aria-hidden", isMobileView() ? "false" : "true");
  }
}

/* ---------- resize ---------- */
function handleResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    applyThemeByViewport();
    syncHeroLabels();
  }, 120);
}

/* ---------- agent search ---------- */
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
  const q = normalizeText(keyword);

  let filtered = agents;

  if (q) {
    filtered = agents.filter(agent => buildAgentSearchText(agent).includes(q));
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

/* ---------- desktop hero animation ---------- */
function flashNode(el) {
  if (!el) return;
  el.classList.add("menu-hit");
  setTimeout(() => el.classList.remove("menu-hit"), 420);
}

function pulseLogo() {
  const logo = $("#logoToggle");
  if (!logo) return;
  logo.classList.add("logo-hit");
  setTimeout(() => logo.classList.remove("logo-hit"), 420);
}

function runFlow(flowClass) {
  if (!techHero) return;

  techHero.classList.remove("flow-m1", "flow-company", "flow-product", "flow-agent");

  // force reflow so animation restarts every click
  void techHero.offsetWidth;

  techHero.classList.add(flowClass);

  setTimeout(() => {
    techHero.classList.remove(flowClass);
  }, 900);
}

/* ---------- desktop hero menu ---------- */
function bindHeroMenu() {
  const hero = $("#techHero");
  const logoToggle = $("#logoToggle");
  const hint = $("#heroMenuHint");

  if (!hero || !logoToggle) return;

  const menuGroups = $$(".menu-group", hero);
  const submenuButtons = $$(".submenu-btn", hero);
  const mainMenuButtons = $$("[data-menu]", hero);
  const popupButtons = $$("[data-popup]", hero);
  const linkButtons = $$("[data-link]", hero);

  const ssbSystemButton = $('[data-action="ssb-system"]', hero);
  const companyAboutButton = $('[data-action="company-about"]', hero);
  const companyContactButton = $('[data-action="company-contact"]', hero);
  const orderBtn = hero.querySelector(".m5 .node-shell");

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

  if (ssbSystemButton) {
    ssbSystemButton.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();

      openHeroMenu();
      closeAllSubmenus();
      flashNode(ssbSystemButton.closest(".node-shell") || ssbSystemButton);
      pulseLogo();
      runFlow("flow-m1");
      safeOpenInfoPopup("ssbmobile");
    });
  }

  if (companyAboutButton) {
    companyAboutButton.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();

      closeAllSubmenus();
      pulseLogo();
      runFlow("flow-company");
      safeOpenCompanyPopup();
    });
  }

  if (companyContactButton) {
    companyContactButton.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();

      closeAllSubmenus();
      pulseLogo();
      runFlow("flow-company");
      safeOpenCompanyPopup();
    });
  }

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

  popupButtons.forEach(btn => {
    btn.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();

      closeAllSubmenus();

      const key = btn.getAttribute("data-popup");
      if (key) safeOpenInfoPopup(key);
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

/* ---------- popups ---------- */
function bindPopups() {
  $("#closeInfoPopupTop")?.addEventListener("click", safeCloseInfoPopup);
  $("#closeInfoPopupBottom")?.addEventListener("click", safeCloseInfoPopup);
  $("#closeInfoPopupInline")?.addEventListener("click", safeCloseInfoPopup);

  $("#closeCompanyPopupTop")?.addEventListener("click", safeCloseCompanyPopup);
  $("#closeCompanyPopupBottom")?.addEventListener("click", safeCloseCompanyPopup);

  infoPopup?.addEventListener("click", event => {
    if (event.target === infoPopup) safeCloseInfoPopup();
  });

  companyPopup?.addEventListener("click", event => {
    if (event.target === companyPopup) safeCloseCompanyPopup();
  });

  infoPopup?.addEventListener("keydown", event => {
    safeTrapFocus(event, infoPopup);
  });

  companyPopup?.addEventListener("keydown", event => {
    safeTrapFocus(event, companyPopup);
  });
}

/* ---------- mobile menu ---------- */
function bindMobileMenu() {
  const mobileItems = $$(".mobile-menu-v2 .menu-item");
  const mobileButtons = $$(".mobile-menu-v2 .menu-btn");
  const mobileSSBButtons = $$('.mobile-menu-v2 [data-action="ssb-system"]');

  mobileButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("no-submenu")) return;

      const parent = btn.closest(".menu-item");
      if (!parent) return;

      const isOpen = parent.classList.contains("open");

      mobileItems.forEach(item => {
        if (item !== parent) item.classList.remove("open");
      });

      if (isOpen) {
        parent.classList.remove("open");
      } else {
        parent.classList.add("open");
      }
    });
  });

  mobileSSBButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      safeOpenInfoPopup("ssbmobile");
    });
  });
}

/* ---------- chat ---------- */
function bindChatWidget() {
  if (!chatWidget || !chatToggle) return;

  chatToggle.addEventListener("click", event => {
    event.stopPropagation();
    chatWidget.classList.toggle("open");
  });
}

/* ---------- sounds ---------- */
function bindSounds() {
  $$(".sound-click").forEach(el => {
    el.addEventListener("click", () => playClick("normal"));
  });
}

/* ---------- global events ---------- */
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

    if (chatWidget && !chatWidget.contains(target)) {
      chatWidget.classList.remove("open");
    }

    if (
      techHero &&
      !techHero.contains(target) &&
      !infoPopup?.classList.contains("show") &&
      !companyPopup?.classList.contains("show")
    ) {
      $$(".menu-group", techHero).forEach(group => group.classList.remove("open"));
      techHero.classList.remove("open");

      const hint = $("#heroMenuHint");
      if (hint) hint.style.display = "";
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;

    if (infoPopup?.classList.contains("show")) {
      safeCloseInfoPopup();
      return;
    }

    if (companyPopup?.classList.contains("show")) {
      safeCloseCompanyPopup();
      return;
    }

    if (agentDropdown?.classList.contains("open")) {
      closeAgentDropdown();
    }

    if (techHero?.classList.contains("open")) {
      $$(".menu-group", techHero).forEach(group => group.classList.remove("open"));
      techHero.classList.remove("open");

      const hint = $("#heroMenuHint");
      if (hint) hint.style.display = "";
    }

    if (chatWidget?.classList.contains("open")) {
      chatWidget.classList.remove("open");
    }
  });

  window.addEventListener("resize", handleResize);
}

/* ---------- popup nav ---------- */
function bindPopupStepNav() {
  if (popupNav) {
    popupNav.querySelectorAll("[data-step]").forEach(btn => {
      btn.addEventListener("click", () => {
        popupNav.querySelectorAll(".popup-pro-nav-btn").forEach(item => {
          item.classList.remove("active");
        });

        btn.classList.add("active");
        safeRenderPopupStep(btn.dataset.step);
      });
    });
  }

  if (popupNextStep) {
    popupNextStep.addEventListener("click", () => {
      const next = popupNextStep.dataset.next;
      if (next) safeRenderPopupStep(next);
    });
  }
}

/* ---------- init ---------- */
window.addEventListener("load", () => {
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
});
