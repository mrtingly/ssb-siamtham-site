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

/* =========================================================
   SSBMS PROTECTION SYSTEM MENU
   Click the logo to present the protection architecture first.
========================================================= */
(() => {
  const STYLE_ID = "ssb-protection-menu-style";
  const MODAL_ID = "ssbProtectionMenu";

  const systems = [
    {
      code: "SSBM",
      name: "Stealth Safety Bank Mobile",
      icon: "▣",
      text: "อุปกรณ์ที่ออกแบบและตั้งค่าเพื่อใช้จัดเก็บและทำธุรกรรมเกี่ยวกับทรัพย์สินดิจิทัลโดยเฉพาะ",
      href: "ssb-system.html#ssbmobile"
    },
    {
      code: "SB",
      name: "Safety Book",
      icon: "◈",
      text: "อุปกรณ์จัดเก็บเชิงกายภาพที่ช่วยควบคุมการเข้าถึงและเพิ่มขั้นตอนก่อนเริ่มใช้งานระบบ",
      href: "ssb-system.html#sbpremium"
    },
    {
      code: "SCAN FRING",
      name: "Fact Verification Access",
      icon: "⌁",
      text: "ช่องทางสำหรับเข้าสู่กระบวนการขอความช่วยเหลือและตรวจสอบข้อเท็จจริงเมื่อพบเหตุผิดปกติ",
      href: "ssb-system.html#scanfring"
    },
    {
      code: "SPC",
      name: "Siamtham Protection Center",
      icon: "◎",
      text: "ศูนย์สนับสนุนการตรวจสอบข้อเท็จจริงและช่วยให้ผู้ใช้งานมีช่วงเวลาทบทวนก่อนตัดสินใจ",
      href: "ssb-system.html#spc"
    }
  ];

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .brand-logo, #logoToggle { cursor:pointer; }
      .ssb-protection-backdrop{
        position:fixed;inset:0;z-index:99999;display:none;place-items:center;
        padding:24px;background:rgba(2,13,34,.78);backdrop-filter:blur(18px);
        -webkit-backdrop-filter:blur(18px);font-family:Prompt,system-ui,sans-serif;
      }
      .ssb-protection-backdrop.show{display:grid;animation:ssbFade .22s ease both}
      .ssb-protection-panel{
        position:relative;width:min(1180px,96vw);max-height:92vh;overflow:auto;
        border:1px solid rgba(121,181,255,.28);border-radius:30px;padding:30px;
        color:#fff;background:
          radial-gradient(circle at 75% 0%,rgba(25,113,235,.28),transparent 35%),
          radial-gradient(circle at 15% 90%,rgba(212,164,65,.14),transparent 34%),
          linear-gradient(145deg,#06162f 0%,#082653 55%,#061a38 100%);
        box-shadow:0 36px 90px rgba(0,0,0,.48),inset 0 1px 0 rgba(255,255,255,.10)
      }
      .ssb-protection-panel:before{
        content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;
        background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);
        background-size:34px 34px;mask-image:linear-gradient(to bottom,#000,transparent)
      }
      .ssb-protection-close{
        position:absolute;right:18px;top:16px;width:42px;height:42px;border-radius:50%;
        border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.09);color:#fff;
        font-size:25px;cursor:pointer;z-index:2
      }
      .ssb-protection-head{position:relative;z-index:1;text-align:center;padding:4px 56px 26px}
      .ssb-protection-logo{width:84px;height:84px;object-fit:contain;filter:drop-shadow(0 13px 25px rgba(32,115,233,.35))}
      .ssb-protection-kicker{margin-top:12px;color:#76b8ff;font-size:.76rem;font-weight:800;letter-spacing:.18em;text-transform:uppercase}
      .ssb-protection-head h2{margin:8px 0 7px;font-size:clamp(1.75rem,4vw,3.15rem);line-height:1.14}
      .ssb-protection-head h2 span{color:#f1c66d}
      .ssb-protection-head p{max-width:760px;margin:auto;color:rgba(255,255,255,.72);line-height:1.75}
      .ssb-protection-flow{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;position:relative;z-index:1}
      .ssb-protection-card{
        position:relative;overflow:hidden;min-height:280px;padding:22px;border-radius:22px;
        border:1px solid rgba(139,193,255,.20);background:linear-gradient(180deg,rgba(255,255,255,.095),rgba(255,255,255,.045));
        box-shadow:inset 0 1px 0 rgba(255,255,255,.08);transition:transform .2s ease,border-color .2s ease,background .2s ease
      }
      .ssb-protection-card:hover{transform:translateY(-6px);border-color:rgba(241,198,109,.55);background:linear-gradient(180deg,rgba(38,125,236,.20),rgba(255,255,255,.055))}
      .ssb-protection-card:after{content:"";position:absolute;right:-55px;bottom:-65px;width:150px;height:150px;border-radius:50%;background:rgba(31,116,230,.15);filter:blur(8px)}
      .ssb-protection-icon{width:58px;height:58px;border-radius:17px;display:grid;place-items:center;font-size:28px;color:#f1c66d;background:linear-gradient(145deg,rgba(36,125,244,.28),rgba(255,255,255,.07));border:1px solid rgba(130,190,255,.24)}
      .ssb-protection-card h3{margin:18px 0 3px;font-size:1.28rem;color:#fff}
      .ssb-protection-name{color:#75b8ff;font-size:.78rem;font-weight:700;min-height:38px}
      .ssb-protection-card p{color:rgba(255,255,255,.70);font-size:.88rem;line-height:1.7;margin:13px 0 18px}
      .ssb-protection-link{display:inline-flex;align-items:center;gap:7px;color:#fff;font-weight:800;font-size:.82rem;text-decoration:none;border-bottom:1px solid rgba(241,198,109,.5);padding-bottom:4px}
      .ssb-protection-actions{position:relative;z-index:1;display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:25px}
      .ssb-protection-btn{border:0;border-radius:14px;padding:13px 20px;font-weight:800;cursor:pointer;text-decoration:none;font-family:inherit}
      .ssb-protection-btn.primary{color:#fff;background:linear-gradient(135deg,#176de1,#2d94ff);box-shadow:0 10px 25px rgba(24,111,226,.30)}
      .ssb-protection-btn.secondary{color:#fff;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16)}
      .ssb-protection-note{position:relative;z-index:1;text-align:center;color:rgba(255,255,255,.48);font-size:.72rem;margin:18px 0 0}
      @keyframes ssbFade{from{opacity:0}to{opacity:1}}
      @media(max-width:900px){.ssb-protection-flow{grid-template-columns:repeat(2,1fr)}.ssb-protection-panel{padding:24px}}
      @media(max-width:560px){
        .ssb-protection-backdrop{padding:10px}.ssb-protection-panel{padding:20px 14px;border-radius:22px}.ssb-protection-head{padding:8px 30px 20px}
        .ssb-protection-logo{width:65px;height:65px}.ssb-protection-flow{grid-template-columns:1fr}.ssb-protection-card{min-height:auto}.ssb-protection-actions{display:grid}.ssb-protection-btn{text-align:center;width:100%}
      }
    `;
    document.head.appendChild(style);
  }

  function createModal() {
    let modal = document.getElementById(MODAL_ID);
    if (modal) return modal;

    modal = document.createElement("div");
    modal.id = MODAL_ID;
    modal.className = "ssb-protection-backdrop";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
      <section class="ssb-protection-panel" role="dialog" aria-modal="true" aria-labelledby="ssbProtectionTitle">
        <button class="ssb-protection-close" type="button" aria-label="ปิด">×</button>
        <header class="ssb-protection-head">
          <img class="ssb-protection-logo" src="images/logo.png" alt="SSBMS">
          <div class="ssb-protection-kicker">SSBMS Protection Architecture</div>
          <h2 id="ssbProtectionTitle">ระบบป้องกันเพื่อ<span>ทรัพย์สินดิจิทัล</span></h2>
          <p>องค์ประกอบของ Stealth Safety Bank Mobile System ทำงานร่วมกันเพื่อช่วยลดการเปิดเผย ลดความเสี่ยง และเพิ่มขั้นตอนตรวจสอบก่อนการตัดสินใจทำธุรกรรม</p>
        </header>
        <div class="ssb-protection-flow">
          ${systems.map(item => `
            <article class="ssb-protection-card">
              <div class="ssb-protection-icon">${item.icon}</div>
              <h3>${item.code}</h3>
              <div class="ssb-protection-name">${item.name}</div>
              <p>${item.text}</p>
              <a class="ssb-protection-link" href="${item.href}">ดูรายละเอียด <span>→</span></a>
            </article>
          `).join("")}
        </div>
        <div class="ssb-protection-actions">
          <button class="ssb-protection-btn primary" id="openMainSiteMenu" type="button">เข้าสู่เมนูเว็บไซต์</button>
          <a class="ssb-protection-btn secondary" href="survival-compare.html">ดูแนวคิดระบบความปลอดภัย</a>
        </div>
        <p class="ssb-protection-note">แสดงเฉพาะภาพรวมของระบบ โดยไม่เปิดเผยรายละเอียดการตั้งค่าและติดตั้งภายใน</p>
      </section>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  function openProtectionMenu() {
    addStyles();
    const modal = createModal();
    lastFocusedElement = document.activeElement;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    lockBodyScroll(true);
    modal.querySelector(".ssb-protection-close")?.focus();
  }

  function closeProtectionMenu() {
    const modal = document.getElementById(MODAL_ID);
    if (!modal) return;
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    lockBodyScroll(false);
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") lastFocusedElement.focus();
  }

  function openOriginalSiteMenu() {
    closeProtectionMenu();
    const hero = document.getElementById("techHero");
    if (hero) {
      hero.classList.add("open");
      document.getElementById("heroMenuHint")?.style.setProperty("display", "none");
      document.getElementById("logoToggle")?.classList.add("logo-hit");
      setTimeout(() => document.getElementById("logoToggle")?.classList.remove("logo-hit"), 420);
    }
  }

  function bindProtectionMenu() {
    addStyles();
    const modal = createModal();
    const logoTargets = [document.getElementById("logoToggle"), document.querySelector(".brand-logo")].filter(Boolean);

    logoTargets.forEach(target => {
      target.setAttribute("role", "button");
      target.setAttribute("tabindex", "0");
      target.setAttribute("aria-label", "เปิดดูระบบป้องกัน SSBMS");

      const activate = event => {
        event.preventDefault();
        event.stopPropagation();
        if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
        openProtectionMenu();
      };

      target.addEventListener("click", activate, true);
      target.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") activate(event);
      }, true);
    });

    modal.querySelector(".ssb-protection-close")?.addEventListener("click", closeProtectionMenu);
    modal.querySelector("#openMainSiteMenu")?.addEventListener("click", openOriginalSiteMenu);
    modal.addEventListener("click", event => {
      if (event.target === modal) closeProtectionMenu();
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && modal.classList.contains("show")) closeProtectionMenu();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindProtectionMenu, { once:true });
  } else {
    bindProtectionMenu();
  }
})();
