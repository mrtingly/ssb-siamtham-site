/* =========================
   STATE
========================= */
const state = {
  popupOpen: false,
  activePopup: null
};

/* =========================
   ELEMENTS
========================= */
const popup = document.getElementById("infoPopup");
const popupTitle = document.getElementById("popupTitle");
const popupSubtitle = document.getElementById("popupSubtitle");
const popupLead = document.getElementById("popupLead");
const popupCore = document.getElementById("popupCoreConcept");
const popupPoints = document.getElementById("popupKeyPoints");
const popupWhy = document.getElementById("popupWhyItMatters");
const popupMissing = document.getElementById("popupIfMissing");
const popupTruth = document.getElementById("popupImportantTruth");
const popupConnect = document.getElementById("popupSystemConnection");
const popupVideo = document.getElementById("popupVideo");

const closeBtn = document.getElementById("closeInfoPopup");

/* =========================
   OPEN POPUP
========================= */
function openPopup(key) {
  const data = POPUP_DATA[key];
  if (!data) return;

  state.popupOpen = true;
  state.activePopup = key;

  // TEXT
  popupTitle.textContent = data.title;
  popupSubtitle.textContent = data.subtitle;
  popupLead.textContent = data.lead;
  popupCore.textContent = data.core;
  popupWhy.textContent = data.why;
  popupMissing.textContent = data.missing;
  popupTruth.textContent = data.truth;
  popupConnect.textContent = data.connect;

  // VIDEO
  popupVideo.src = data.video;

  // POINTS
  popupPoints.innerHTML = "";
  data.points.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    popupPoints.appendChild(li);
  });

  // SHOW
  popup.classList.add("is-open");
}

/* =========================
   CLOSE POPUP
========================= */
function closePopup() {
  state.popupOpen = false;
  state.activePopup = null;

  popup.classList.remove("is-open");

  // stop video
  popupVideo.src = "";
}

/* =========================
   MENU CLICK
========================= */
document.querySelectorAll("[data-popup]").forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.getAttribute("data-popup");
    openPopup(key);
  });
});

/* =========================
   CLOSE EVENTS
========================= */
closeBtn.addEventListener("click", closePopup);

popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    closePopup();
  }
});

/* =========================
   ESC CLOSE
========================= */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && state.popupOpen) {
    closePopup();
  }
});

/* =========================
   HERO MENU TOGGLE
========================= */
const logoBtn = document.getElementById("logoMenuButton");
const heroCard = document.getElementById("heroCard");

logoBtn.addEventListener("click", () => {
  heroCard.classList.toggle("is-open");
});

/* =========================
   CHAT TOGGLE
========================= */
const chatToggle = document.getElementById("chatToggle");
const chatMenu = document.getElementById("chatMenu");

chatToggle.addEventListener("click", () => {
  chatMenu.classList.toggle("is-open");
});

/* =========================
   THEME
========================= */
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("theme-light");
});

/* =========================
   CONTACT POPUP
========================= */
const contactBtn = document.getElementById("contactButton");
const contactPopup = document.getElementById("contactPopup");
const closeContact = document.getElementById("closeContactPopup");

contactBtn.addEventListener("click", () => {
  contactPopup.classList.add("is-open");
});

closeContact.addEventListener("click", () => {
  contactPopup.classList.remove("is-open");
});

contactPopup.addEventListener("click", (e) => {
  if (e.target === contactPopup) {
    contactPopup.classList.remove("is-open");
  }
});

/* =========================
   GOOGLE TRANSLATE
========================= */
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: 'th',
      includedLanguages: 'en,zh-CN,ja,ko',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    },
    'google_translate_element'
  );
}
