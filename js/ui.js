const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const body = document.body;
const techHero = $("#techHero");
const logoMenuButton = $("#logoMenuButton");
const centerPulse = $("#centerPulse");
const nodeNote = $("#nodeNote");
const themeToggle = $("#themeToggle");

const infoPopup = $("#infoPopup");
const infoTitle = $("#infoTitle");
const infoVideo = $("#infoVideo");
const infoSubtitle = $("#infoSubtitle");
const infoLead = $("#infoLead");
const infoBadges = $("#infoBadges");
const infoFeatures = $("#infoFeatures");
const infoImpacts = $("#infoImpacts");
const infoUseCases = $("#infoUseCases");
const popupKicker = $("#popupKicker");
const videoNote = $("#videoNote");

const companyPopup = $("#companyPopup");
const popupNav = document.getElementById("popupNav");
const popupNextStep = document.getElementById("popupNextStep");
let currentPopupKey = "ssbmobile";
const contactButton = $("#contactButton");

const agentSearchForm = $("#agentSearchForm");
const agentSearchInput = $("#agentSearchInput");
const agentDropdown = $("#agentDropdown");
const agentResults = $("#agentResults");

const chatWidget = $("#chatWidget");
const chatToggle = $("#chatToggle");

let lastFocusedElement = null;
let audioCtx = null;
let resizeTimer = null;

function isMobileView() {
  return window.innerWidth <= 760;
}

function pulseCenter() {
  if (!centerPulse || isMobileView()) return;
  centerPulse.classList.remove("active");
  void centerPulse.offsetWidth;
  centerPulse.classList.add("active");
}

function syncHeroLabels() {
  const isOpen = techHero?.classList.contains("open");
  nodeNote?.classList.toggle("hidden", !!isOpen);
}

function lockBodyScroll(lock) {
  body.style.overflow = lock ? "hidden" : "";
}

function addResearchMenuLinks() {
  const desktopCompanyMenu = document.querySelector(".menu-group.g-company .submenu-panel");
  if (desktopCompanyMenu && !desktopCompanyMenu.querySelector('[href="research-followup.html"]')) {
    const link = document.createElement("a");
    link.href = "research-followup.html";
    link.className = "submenu-btn sound-click";
    link.textContent = "งานวิจัยของเรา";
    desktopCompanyMenu.appendChild(link);
  }

  const mobileCompanyMenu = document.querySelector('[data-mobile-toggle="company"] .submenu');
  if (mobileCompanyMenu && !mobileCompanyMenu.querySelector('[href="research-followup.html"]')) {
    const link = document.createElement("a");
    link.href = "research-followup.html";
    link.className = "submenu-link sound-click";
    link.textContent = "งานวิจัยของเรา";
    mobileCompanyMenu.appendChild(link);
  }
}

addResearchMenuLinks();
