"use strict";

(function () {
  const STORAGE_KEY = "sbos_language";
  const DEFAULT_LANG = "th";
  const SUPPORTED_LANGS = new Set(["th", "en"]);

  const state = {
    lang: DEFAULT_LANG,
    dictionaries: {},
    ready: null
  };

  function normalizeLang(value) {
    const lang = String(value || "").trim().toLowerCase();
    return SUPPORTED_LANGS.has(lang) ? lang : DEFAULT_LANG;
  }

  function getStoredLang() {
    try {
      return normalizeLang(localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      return DEFAULT_LANG;
    }
  }

  function setStoredLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, normalizeLang(lang));
    } catch (error) {
      // Language preference is non-critical.
    }
  }

  async function loadDictionary(lang) {
    const safeLang = normalizeLang(lang);
    if (state.dictionaries[safeLang]) return state.dictionaries[safeLang];

    const response = await fetch("lang/" + safeLang + ".json", { cache: "no-store" });
    if (!response.ok) throw new Error("Unable to load language: " + safeLang);

    const dictionary = await response.json();
    state.dictionaries[safeLang] = dictionary && typeof dictionary === "object" ? dictionary : {};
    return state.dictionaries[safeLang];
  }

  async function ensureLanguage(lang) {
    state.lang = normalizeLang(lang);
    await loadDictionary(DEFAULT_LANG);

    if (state.lang !== DEFAULT_LANG) {
      try {
        await loadDictionary(state.lang);
      } catch (error) {
        state.lang = DEFAULT_LANG;
      }
    }
  }

  function t(key) {
    const safeKey = String(key || "");
    const current = state.dictionaries[state.lang] || {};
    const fallback = state.dictionaries[DEFAULT_LANG] || {};
    return current[safeKey] || fallback[safeKey] || safeKey;
  }

  function setText(element, key) {
    if (!element || !key) return;
    element.textContent = t(key);
  }

  function setAttr(element, attr, key) {
    if (!element || !attr || !key) return;
    element.setAttribute(attr, t(key));
  }

  function applyTranslations(root) {
    const scope = root || document;

    scope.querySelectorAll("[data-i18n]").forEach(function (element) {
      setText(element, element.getAttribute("data-i18n"));
    });

    scope.querySelectorAll("[data-i18n-placeholder]").forEach(function (element) {
      setAttr(element, "placeholder", element.getAttribute("data-i18n-placeholder"));
    });

    scope.querySelectorAll("[data-i18n-aria-label]").forEach(function (element) {
      setAttr(element, "aria-label", element.getAttribute("data-i18n-aria-label"));
    });

    scope.querySelectorAll("[data-i18n-title]").forEach(function (element) {
      setAttr(element, "title", element.getAttribute("data-i18n-title"));
    });

    const pageTitleKey = document.documentElement.getAttribute("data-i18n-page-title");
    if (pageTitleKey) {
      document.title = t(pageTitleKey);
    }

    document.documentElement.lang = state.lang;
    updateLanguageButtons();
  }

  function updateLanguageButtons() {
    document.querySelectorAll("[data-sbos-lang]").forEach(function (button) {
      const lang = normalizeLang(button.getAttribute("data-sbos-lang"));
      button.setAttribute("aria-pressed", lang === state.lang ? "true" : "false");
    });
  }

  async function setLanguage(lang) {
    await ensureLanguage(lang);
    setStoredLang(state.lang);
    applyTranslations();
    window.dispatchEvent(new CustomEvent("sbos:languagechange", { detail: { lang: state.lang } }));
    return state.lang;
  }

  function bindLanguageSwitch() {
    document.querySelectorAll("[data-sbos-lang]").forEach(function (button) {
      button.addEventListener("click", function () {
        setLanguage(button.getAttribute("data-sbos-lang"));
      });
    });
  }

  async function init() {
    await ensureLanguage(getStoredLang());
    bindLanguageSwitch();
    applyTranslations();
  }

  state.ready = document.readyState === "loading"
    ? new Promise(function (resolve) {
        document.addEventListener("DOMContentLoaded", function () {
          init().then(resolve);
        }, { once: true });
      })
    : init();

  window.SBOSI18n = {
    ready: state.ready,
    t,
    setLanguage,
    getLanguage: function () {
      return state.lang;
    },
    apply: applyTranslations
  };
})();
