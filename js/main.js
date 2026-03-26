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
      ) return;

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

function handleResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    applyThemeByViewport();
    syncHeroLabels();
  }, 120);
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
      infoPopup?.style.display !== "flex" &&
      companyPopup?.style.display !== "flex"
    ) {
      $$(".menu-group", techHero).forEach(group => group.classList.remove("open"));
      techHero.classList.remove("open");
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;

    if (infoPopup?.classList.contains("show")) {
      closeInfoPopup();
      return;
    }

    if (companyPopup?.classList.contains("show")) {
      closeCompanyPopup();
      return;
    }

    if (agentDropdown?.classList.contains("open")) {
      closeAgentDropdown();
    }

    if (techHero?.classList.contains("open")) {
      $$(".menu-group", techHero).forEach(group => group.classList.remove("open"));
      techHero.classList.remove("open");
    }

    if (chatWidget?.classList.contains("open")) {
      chatWidget.classList.remove("open");
    }
  });

  window.addEventListener("resize", handleResize);
}

function bindHeroMenu() {
  const hero = $("#techHero");
  const logoToggle = $("#logoToggle");
  const hint = $("#heroMenuHint");

  if (!hero || !logoToggle) return;

  function closeAllSubmenus() {
    $$(".menu-group", hero).forEach(group => {
      group.classList.remove("open");
    });
  }

  function openHeroMenu() {
    hero.classList.add("open");
    if (hint) hint.style.display = "none";
  }

  function closeHeroMenu() {
    hero.classList.remove("open");
    closeAllSubmenus();
    if (hint) hint.style.display = "";
  }

  function toggleSubmenu(group) {
    if (!group) return;

    const isOpen = group.classList.contains("open");
    closeAllSubmenus();

    if (!isOpen) {
      group.classList.add("open");
    }
  }

  logoToggle.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();

    if (hero.classList.contains("open")) {
      closeHeroMenu();
    } else {
      openHeroMenu();
    }
  });

  hero.addEventListener("click", event => {
    event.stopPropagation();
  });

  $('[data-action="ssb-system"]', hero)?.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    openHeroMenu();
    closeAllSubmenus();
    openInfoPopup("ssb");
  });

  $('[data-action="company-about"]', hero)?.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    closeAllSubmenus();
    openCompanyPopup();
  });

  $('[data-action="company-contact"]', hero)?.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    closeAllSubmenus();
    openCompanyPopup();
  });

  $$("[data-popup]", hero).forEach(btn => {
    btn.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      closeAllSubmenus();

      const key = btn.getAttribute("data-popup");
      if (key) openInfoPopup(key);
    });
  });

  $$("[data-link]", hero).forEach(btn => {
    btn.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      closeAllSubmenus();

      const url = btn.getAttribute("data-link");
      if (url) window.location.href = url;
    });
  });

  $$("[data-menu]", hero).forEach(btn => {
    btn.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();

      if (!hero.classList.contains("open")) return;

      const group = btn.closest(".menu-group");
      toggleSubmenu(group);
    });
  });

  closeHeroMenu();
}
function bindPopups() {
  $("#closeInfoPopupTop")?.addEventListener("click", closeInfoPopup);
  $("#closeInfoPopupBottom")?.addEventListener("click", closeInfoPopup);
  $("#closeInfoPopupInline")?.addEventListener("click", closeInfoPopup);

  $("#closeCompanyPopupTop")?.addEventListener("click", closeCompanyPopup);
  $("#closeCompanyPopupBottom")?.addEventListener("click", closeCompanyPopup);

  infoPopup?.addEventListener("click", event => {
    if (event.target === infoPopup) closeInfoPopup();
  });

  companyPopup?.addEventListener("click", event => {
    if (event.target === companyPopup) closeCompanyPopup();
  });

  infoPopup?.addEventListener("keydown", event => {
    trapFocus(event, infoPopup);
  });

  companyPopup?.addEventListener("keydown", event => {
    trapFocus(event, companyPopup);
  });
}

function bindChatWidget() {
  if (!chatWidget || !chatToggle) return;

  chatToggle.addEventListener("click", event => {
    event.stopPropagation();
    chatWidget.classList.toggle("open");
  });
}

function bindSounds() {
  $$(".sound-click").forEach(el => {
    el.addEventListener("click", () => playClickSound("normal"));
  });

  $('.menu-node.bottom[href="book.html"]')?.addEventListener("click", () => {
    playClickSound("confirm");
  });
}

function bindThemeToggle() {
  if (!themeToggle) return;

  themeToggle.addEventListener("click", () => {
    if (isMobileView()) return;

    body.classList.toggle("light-mode");
    localStorage.setItem("theme", body.classList.contains("light-mode") ? "light" : "dark");
  });
}

window.addEventListener("load", () => {
  applyThemeByViewport();

  if (techHero) {
    techHero.classList.remove("open");
  }

  syncHeroLabels();
  renderAgentResults("");

  bindLanguageButtons();
  bindAgentSearch();
  bindHeroMenu();
  bindPopups();
  bindChatWidget();
  bindSounds();
  bindThemeToggle();
  bindGlobalEvents();

if (popupNav) {
  popupNav.querySelectorAll("[data-step]").forEach(btn => {
    btn.addEventListener("click", () => {
      popupNav.querySelectorAll(".popup-pro-nav-btn").forEach(item => {
        item.classList.remove("active");
      });
      btn.classList.add("active");
      renderPopupStep(btn.dataset.step);
    });
  });
}

  if (popupNextStep) {
    popupNextStep.addEventListener("click", () => {
      const next = popupNextStep.dataset.next;
      if (next) renderPopupStep(next);
    });
  }

  syncActiveLangFromCookie();
});

document.querySelectorAll('.menu-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('no-submenu')) return;

    const parent = btn.closest('.menu-item');
    if (!parent) return;

    const isOpen = parent.classList.contains('open');

    document.querySelectorAll('.mobile-menu-v2 .menu-item').forEach(item => {
      if (item !== parent) item.classList.remove('open');
    });

    if (isOpen) {
      parent.classList.remove('open');
    } else {
      parent.classList.add('open');
    }
  });
});

document.querySelectorAll('.mobile-menu-v2 [data-action="ssb-system"]').forEach(btn => {
  btn.addEventListener('click', () => {
    if (typeof openInfoPopup === 'function') {
      openInfoPopup('ssbmobile');
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("techHero");
  const logoToggle = document.getElementById("logoToggle");
  const menuHint = document.getElementById("heroMenuHint");

  if (!hero || !logoToggle) return;

  const groups = Array.from(hero.querySelectorAll(".menu-group"));
  const submenuButtons = Array.from(hero.querySelectorAll(".submenu-btn"));

  const closeAllSubmenus = () => {
    groups.forEach(group => group.classList.remove("open"));
  };

  const pulseLogo = () => {
    logoToggle.classList.remove("logo-hit");
    void logoToggle.offsetWidth;
    logoToggle.classList.add("logo-hit");
    setTimeout(() => logoToggle.classList.remove("logo-hit"), 700);
  };

  const runFlow = (type) => {
    hero.classList.remove("flow-m1", "flow-company", "flow-product", "flow-agent");

    if (type) {
      void hero.offsetWidth;
      hero.classList.add(type);
      setTimeout(() => {
        hero.classList.remove(type);
      }, 900);
    }

    pulseLogo();
  };

  const flashNode = (node) => {
    if (!node) return;
    node.classList.remove("menu-hit");
    void node.offsetWidth;
    node.classList.add("menu-hit");
    setTimeout(() => node.classList.remove("menu-hit"), 700);
  };

  const openHeroMenu = () => {
    hero.classList.add("open");
    if (menuHint) menuHint.style.display = "none";
  };

  const closeHeroMenu = () => {
    hero.classList.remove("open");
    closeAllSubmenus();
    if (menuHint) menuHint.style.display = "";
  };

  const toggleHeroMenu = () => {
    if (hero.classList.contains("open")) {
      closeHeroMenu();
    } else {
      openHeroMenu();
    }
  };

  logoToggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleHeroMenu();
  });

  groups.forEach(group => {
    const mainBtn = group.querySelector(".main-node .node-shell");
    if (!mainBtn) return;

    mainBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!hero.classList.contains("open")) {
        openHeroMenu();
      }

      const wasOpen = group.classList.contains("open");
      closeAllSubmenus();
      if (!wasOpen) group.classList.add("open");

      flashNode(mainBtn);

      if (group.classList.contains("g-company")) runFlow("flow-company");
      if (group.classList.contains("g-product")) runFlow("flow-product");
      if (group.classList.contains("g-agent")) runFlow("flow-agent");
    });
  });

  const m1Button = hero.querySelector(".m1 .node-shell");
  if (m1Button) {
    m1Button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      flashNode(m1Button);
      runFlow("flow-m1");
    });
  }

  submenuButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      flashNode(btn);

      const parentGroup = btn.closest(".menu-group");
      if (parentGroup?.classList.contains("g-company")) runFlow("flow-company");
      if (parentGroup?.classList.contains("g-product")) runFlow("flow-product");
      if (parentGroup?.classList.contains("g-agent")) runFlow("flow-agent");
    });
  });

  const orderBtn = hero.querySelector(".m5 .node-shell");
  if (orderBtn) {
    orderBtn.addEventListener("click", () => {
      pulseLogo();
    });
  }

  document.addEventListener("click", (e) => {
    if (!hero.contains(e.target)) {
      closeAllSubmenus();
    }
  });

  closeHeroMenu();
});
