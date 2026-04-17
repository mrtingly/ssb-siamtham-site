(function () {
  const body = document.body;
  const root = document.documentElement;
  const menuToggle = document.getElementById("menuToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const drawerClose = document.getElementById("drawerClose");
  const drawerBackdrop = document.getElementById("drawerBackdrop");
  const langButtons = document.querySelectorAll("[data-set-lang]");

  function setLanguage(lang) {
    root.classList.remove("lang-th", "lang-en");
    root.classList.add("lang-" + lang);
    localStorage.setItem("ssbMobileLang", lang);

    langButtons.forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-set-lang") === lang);
    });

    document.documentElement.lang = lang === "th" ? "th" : "en";
  }

  function openDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add("is-open");
    mobileDrawer.setAttribute("aria-hidden", "false");
    body.style.overflow = "hidden";
  }

  function closeDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove("is-open");
    mobileDrawer.setAttribute("aria-hidden", "true");
    body.style.overflow = "";
  }

  const savedLang = localStorage.getItem("ssbMobileLang") || "th";
  setLanguage(savedLang);

  langButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLanguage(btn.getAttribute("data-set-lang"));
    });
  });

  if (menuToggle) menuToggle.addEventListener("click", openDrawer);
  if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener("click", closeDrawer);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDrawer();
  });
})();
