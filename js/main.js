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
    buildEnergyLines();
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
  document.addEventListener("pointerdown", event => {
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

    // ปิด hero เฉพาะคลิกนอกจริงๆ
    if (
      techHero &&
      !techHero.contains(target) &&
      infoPopup?.style.display !== "flex" &&
      companyPopup?.style.display !== "flex"
    ) {
      toggleHeroOpen(false);
      return;
    }

    // ปิด submenu เฉพาะคลิกที่ไม่ใช่เมนู
    if (
      techHero &&
      techHero.contains(target) &&
      !target.closest(".menu-group") &&
      !target.closest(".submenu-panel") &&
      !target.closest(".menu-node") &&
      !target.closest("#logoMenuButton")
    ) {
      $$(".menu-group", techHero).forEach(group => {
        group.classList.remove("open");
      });
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
      toggleHeroOpen(false);
    }

    if (chatWidget?.classList.contains("open")) {
      chatWidget.classList.remove("open");
    }
  });

  window.addEventListener("resize", handleResize);
}

function bindHeroMenu() {
  if (!techHero) return;

  function closeAllSubmenus() {
    $$(".menu-group", techHero).forEach(group => {
      group.classList.remove("open");
    });
  }

  if (logoMenuButton) {
    logoMenuButton.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      toggleHeroOpen();
    });
  }

  techHero.addEventListener("click", event => {
    event.stopPropagation();
  });

  $('[data-action="ssb-system"]', techHero)?.addEventListener("click", event => {
    event.stopPropagation();
    closeAllSubmenus();
    openInfoPopup("ssbmobile");
  });

  $('[data-action="company-about"]', techHero)?.addEventListener("click", event => {
    event.stopPropagation();
    closeAllSubmenus();
    openCompanyPopup();
  });

  $('[data-action="company-contact"]', techHero)?.addEventListener("click", event => {
    event.stopPropagation();
    closeAllSubmenus();
    openCompanyPopup();
  });

  $$("[data-popup]", techHero).forEach(btn => {
    btn.addEventListener("click", event => {
      event.stopPropagation();
      closeAllSubmenus();
      const key = btn.getAttribute("data-popup");
      if (key) openInfoPopup(key);
    });
  });

 $$("[data-menu]", techHero).forEach(btn => {
  btn.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();

    const group = btn.closest(".menu-group");
    if (!group) return;

    // ปิดเมนูอื่น แต่ไม่ปิดตัวที่กด
    $$(".menu-group", techHero).forEach(item => {
      if (item !== group) item.classList.remove("open");
    });

    // บังคับให้ตัวเองเปิดค้างไว้เสมอ
    group.classList.add("open");
  });

  btn.addEventListener("pointerdown", event => {
    event.stopPropagation();
  });
});
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
  buildEnergyLines();
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

