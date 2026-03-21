const popupData = {
  ssbmobile: {
    kicker: "SSB Mobile System",
    title: "SSB Mobile System",
    subtitle: "ระบบความปลอดภัยทางการเงิน ที่ออกแบบให้ลดความเสี่ยงตั้งแต่ต้นทาง",
    lead: "Stealth Safety Bank Mobile System คือการออกแบบทั้งโครงสร้างการใช้งาน ไม่ใช่แค่เพิ่มแอปหรือเพิ่มระบบ แต่เป็นการแยกหน้าที่ของอุปกรณ์ออกจากกันอย่างชัดเจน เพื่อให้เงิน การใช้งาน และความเสี่ยง ไม่อยู่ในที่เดียวกัน",
    badges: ["แยกความเสี่ยง", "ลด Attack Surface", "ควบคุมเป็นระบบ", "ไม่ปะปน"],
    features: [
      "รวม SSB, SB, Flare และกฎการใช้งานไว้ในระบบเดียว",
      "ลดความเสี่ยงจาก phishing, malware และการหลอกให้โอน",
      "ออกแบบให้ผู้ใช้ควบคุมความปลอดภัยได้จากวิธีใช้งานจริง"
    ],
    useCases: [
      "ผู้ที่ต้องการแยกเงินออกจากมือถือใช้งานทั่วไป",
      "ผู้ที่ต้องการระบบป้องกันแบบมีหลักการ ไม่ใช่แค่ความรู้สึก",
      "ผู้ที่ต้องการความปลอดภัยเชิงโครงสร้าง"
    ],
    impacts: [
      { value: "แยกชัด", label: "เงิน การใช้งาน และความเสี่ยง ถูกแบ่งหน้าที่ชัดเจน" },
      { value: "ลดเสี่ยง", label: "ตัดโอกาสการโจมตีจากการใช้งานปะปน" },
      { value: "ควบคุมได้", label: "ทุกขั้นตอนมีกรอบใช้งานที่ชัดเจน" }
    ],
    rules: [
      "แยกหน้าที่ของอุปกรณ์ = ลดความเสี่ยง",
      "SSB ไม่ควรปะปนกับการใช้งานทั่วไป",
      "ทุกการใช้งานภายนอกควรผ่าน Flare ก่อน"
    ],
    next: "ssb",
    nextLabel: "ไปที่ SSB",
    video: "https://www.youtube-nocookie.com/embed/mD9i39genW8",
    videoNote: "ระบบความปลอดภัยทางการเงินเชิงโครงสร้าง"
  },

  ssb: {
    kicker: "SSB",
    title: "Stealth Safety Bank (SSB)",
    subtitle: "เครื่องเก็บเงินหลัก ที่มีหน้าที่เพียงเก็บเงินและโอนเข้า Flare เท่านั้น",
    lead: "SSB คือเครื่องที่ออกแบบมาเพื่อเก็บเงิน ไม่ใช่เครื่องใช้งานทั่วไป ไม่ใช้พูดคุย ไม่ใช้เล่น ไม่ใช้ติดต่อใคร และไม่ควรใช้โอนให้บุคคลอื่นโดยตรง เพราะหน้าที่ของเครื่องนี้คือจุดเก็บเงินหลักของระบบเท่านั้น",
    badges: ["เครื่องเก็บเงินหลัก", "ไม่ใช้ชีวิตประจำวัน", "ไม่โอนตรงหาคนอื่น", "หน้าที่ชัดเจน"],
    features: [
      "ใช้สำหรับเก็บเงินและโอนเข้า Flare เท่านั้น",
      "ไม่ควรใช้งานเหมือนมือถือทั่วไป",
      "เป็นหัวใจหลักของการแยกความเสี่ยงในระบบ"
    ],
    useCases: [
      "ใช้เป็นเครื่องเก็บเงินหลัก",
      "ใช้โอนเข้า Flare เมื่อต้องใช้งานเงินจริง",
      "ใช้ในระบบที่ต้องการแยกเงินออกจากความเสี่ยง"
    ],
    impacts: [
      { value: "นิ่ง", label: "ลดความเสี่ยงจากการใช้งานจิปาถะ" },
      { value: "ชัด", label: "ทำหน้าที่เดียว คือเก็บเงินและโอนเข้า Flare" },
      { value: "ปลอดภัยขึ้น", label: "ยิ่งไม่ปะปน ยิ่งลดโอกาสเสียหาย" }
    ],
    rules: [
      "SSB ไม่ใช่เครื่องใช้งานทั่วไป",
      "SSB มีหน้าที่เก็บเงินและโอนเข้า Flare เท่านั้น",
      "ห้ามใช้ SSB โอนให้บุคคลอื่นโดยตรง"
    ],
    next: "sb",
    nextLabel: "ไปที่ SB",
    video: "https://www.youtube-nocookie.com/embed/mD9i39genW8",
    videoNote: "SSB คือจุดเก็บเงินหลักของระบบ"
  },

  sb: {
    kicker: "SB",
    title: "Stealth Safety Book (SB)",
    subtitle: "กล่องอำพรางและกันสัญญาณ สำหรับเก็บ SSB ให้ปลอดภัยทั้งทางกายภาพและการเข้าถึงจากภายนอก",
    lead: "SB คือกล่องเก็บที่ภายนอกดูเหมือนหนังสือทั่วไป แต่ภายในมีหน้าที่สำคัญในการเก็บ SSB และช่วยลดโอกาสการเข้าถึงจากภายนอก ทั้งยังช่วยอำพรางไม่ให้ระบบดูโดดเด่นหรือถูกสังเกตได้ง่าย",
    badges: ["อำพรางเหมือนหนังสือ", "กันสัญญาณ", "เก็บ SSB", "เสริมความปลอดภัย"],
    features: [
      "ลดการถูกสังเกตด้วยรูปลักษณ์ที่ดูกลมกลืน",
      "ทำหน้าที่เป็นชั้นป้องกันเพิ่มเติมก่อนเข้าถึง SSB",
      "ช่วยให้ระบบมีทั้งความปลอดภัยเชิงกายภาพและการจัดเก็บ"
    ],
    useCases: [
      "ใช้เก็บ SSB เมื่อไม่ใช้งาน",
      "ใช้เป็นจุดซ่อนระบบไม่ให้ถูกสังเกตง่าย",
      "ใช้ในบ้านหรือสำนักงานที่ต้องการความปลอดภัยแบบไม่สะดุดตา"
    ],
    impacts: [
      { value: "แนบเนียน", label: "ไม่ดึงดูดความสนใจเหมือนกล่องทั่วไป" },
      { value: "ซ่อนระบบ", label: "ช่วยลดโอกาสการพบเจอหรือเข้าถึง SSB" },
      { value: "เสริมชั้น", label: "ทำให้ระบบครบถ้วนมากขึ้นทั้งกายภาพและการใช้งาน" }
    ],
    rules: [
      "SB ใช้เก็บ SSB เมื่อไม่ใช้งาน",
      "ลดการถูกสังเกต และลดการเข้าถึงจากภายนอก",
      "ของมีค่า ไม่ควรดูเหมือนของมีค่า"
    ],
    next: "flare",
    nextLabel: "ไปที่ Flare",
    video: "https://www.youtube-nocookie.com/embed/mD9i39genW8",
    videoNote: "SB คือส่วนที่ช่วยอำพรางและกันสัญญาณ"
  },

  flare: {
    kicker: "Flare",
    title: "Flare",
    subtitle: "เครื่องใช้งานจริง ที่ทำหน้าที่รับความเสี่ยงแทน SSB",
    lead: "Flare คือเครื่องที่ใช้สำหรับการใช้งานจริงในชีวิตประจำวัน เช่น รับเงินจาก SSB โอนเงิน ใช้จ่าย หรือติดต่อบุคคลอื่น โดยแนวคิดของ Flare คือให้เป็นเครื่องที่รับความเสี่ยงแทน SSB หากเกิดเหตุผิดปกติ ความเสียหายจะถูกจำกัดให้อยู่ที่ Flare ไม่ลามไปถึงเครื่องเก็บเงินหลัก",
    badges: ["เครื่องใช้งานจริง", "รับเงินจาก SSB", "รับความเสี่ยงแทน", "จำกัดความเสียหาย"],
    features: [
      "ใช้เป็นเครื่องกลางสำหรับการใช้งานภายนอกทั้งหมด",
      "ช่วยจำกัดวงความเสียหาย หากมีการโจมตีหรือถูกหลอก",
      "เป็นจุดเชื่อมระหว่างระบบเก็บเงินกับโลกภายนอก"
    ],
    useCases: [
      "ใช้รับเงินจาก SSB ก่อนนำไปใช้จริง",
      "ใช้โอนให้บุคคลอื่นแทนการใช้ SSB",
      "ใช้เป็นเครื่องภายนอกที่ยอมรับความเสี่ยงแทนระบบหลัก"
    ],
    impacts: [
      { value: "ล่อเป้า", label: "ให้ Flare รับความเสี่ยงแทน SSB โดยตรง" },
      { value: "จำกัดวง", label: "หากเกิดปัญหา ความเสียหายจะอยู่ที่ Flare" },
      { value: "ใช้งานจริง", label: "เป็นเครื่องสำหรับโอน ใช้จ่าย และติดต่อภายนอก" }
    ],
    rules: [
      "Flare ใช้เป็นเครื่องทำธุรกรรมจริง",
      "Flare รับความเสี่ยงแทน SSB",
      "หากเกิดความเสียหาย ต้องจำกัดให้อยู่ที่ Flare"
    ],
    next: "usage",
    nextLabel: "ไปที่ วิธีการใช้งาน",
    video: "https://www.youtube-nocookie.com/embed/mD9i39genW8",
    videoNote: "Flare คือเครื่องที่ใช้ทำธุรกรรมจริง"
  },

  usage: {
    kicker: "Key System",
    title: "วิธีการใช้งาน",
    subtitle: "กฎการใช้งานคือหัวใจของความปลอดภัยทั้งหมด",
    lead: "ระบบนี้จะปลอดภัยได้ ไม่ใช่เพราะมีอุปกรณ์หลายชิ้นเท่านั้น แต่เพราะมีวิธีการใช้งานที่ชัดเจนและเคร่งครัด โดยกฎสำคัญที่สุดคือ SSB ใช้เพื่อเก็บเงินและโอนเข้า Flare เท่านั้น ห้ามโอนให้บุคคลอื่นโดยตรง",
    badges: ["หัวใจของระบบ", "SSB โอนได้แค่ Flare", "ห้ามปะปนการใช้งาน", "กฎต้องชัด"],
    features: [
      "SSB ใช้เพื่อเก็บเงินและโอนเข้า Flare เท่านั้น",
      "หากต้องการโอนให้ใคร ต้องโอนไปที่ Flare ก่อน",
      "การแยกบทบาทระหว่าง SSB และ Flare คือหัวใจของระบบ"
    ],
    useCases: [
      "เปิด SB แล้วนำ SSB ออกมาใช้งานเฉพาะตอนจำเป็น",
      "โอนจาก SSB เข้า Flare ก่อนทุกครั้ง",
      "ปิดเครื่องและเก็บกลับ SB ทันทีหลังใช้งานเสร็จ"
    ],
    impacts: [
      { value: "ชัดเจน", label: "รู้ทันทีว่าเครื่องไหนทำหน้าที่อะไร" },
      { value: "ลดพลาด", label: "มีกฎชัด จึงลดโอกาสความผิดพลาด" },
      { value: "ปลอดภัยจริง", label: "ความปลอดภัยเกิดจากวินัยในการใช้" }
    ],
    rules: [
      "SSB ใช้เพื่อเก็บเงินและโอนเข้า Flare เท่านั้น",
      "ห้ามโอนจาก SSB ให้บุคคลอื่นโดยตรง",
      "หากต้องใช้งานภายนอก ให้โอนเข้า Flare ก่อนทุกครั้ง"
    ],
    next: "sbpremium",
    nextLabel: "ไปที่ SB Premium",
    video: "https://www.youtube-nocookie.com/embed/mD9i39genW8",
    videoNote: "วิธีการใช้งานคือ Key System ของระบบนี้"
  },

  sbpremium: {
    kicker: "SB Premium",
    title: "SB Premium",
    subtitle: "กล่องพจนานุกรมกันสัญญาณ งานหนังคุณภาพสูง จากช่างฝีมือระดับมืออาชีพ",
    lead: "SB Premium ไม่ใช่เพียงกล่องเก็บของ แต่คืออุปกรณ์ความปลอดภัยเชิงกายภาพ ที่ออกแบบให้แนบเนียนที่สุด ภายนอกดูเหมือนหนังสือทั่วไป แต่ภายในคือพื้นที่สำหรับปกป้องอุปกรณ์สำคัญจากทั้งสายตาและสัญญาณ",
    badges: ["งานหนังพรีเมียม", "ช่างฝีมือระดับประเทศ", "แนบเนียน", "กันสัญญาณ"],
    features: [
      "ผลิตจากงานหนังคุณภาพสูง โดยช่างฝีมือที่มีชื่อเสียง",
      "ออกแบบให้ไม่สะดุดสายตาและดูเหมือนของธรรมดา",
      "เป็นงานเฉพาะทางความปลอดภัย ไม่ใช่สินค้าทั่วไป"
    ],
    useCases: [
      "ผู้ที่ใช้ SSB และต้องการเก็บอย่างปลอดภัย",
      "ผู้ที่ต้องการเก็บเงินหรืออุปกรณ์แบบไม่เปิดเผย",
      "ผู้ที่ต้องการความเรียบร้อยและความแนบเนียน"
    ],
    impacts: [
      { value: "พรีเมียม", label: "งานผลิตคุณภาพสูง ดูดีและใช้งานจริง" },
      { value: "มั่นใจ", label: "จัดเก็บได้อย่างเป็นระบบและปลอดภัยขึ้น" },
      { value: "แนบเนียน", label: "ลดโอกาสการสังเกตจากภายนอก" }
    ],
    rules: [
      "ซ่อนให้เนียน ดีกว่าป้องกันแบบเปิดเผย",
      "เก็บ SSB ให้เป็นสัดส่วนและพร้อมใช้งาน",
      "ของมีค่า ไม่ควรดูเหมือนของมีค่า"
    ],
    next: "custom",
    nextLabel: "ไปที่ Custom System",
    video: "https://www.youtube-nocookie.com/embed/mD9i39genW8",
    videoNote: "SB Premium คือกล่องอำพรางระดับพรีเมียม"
  },

  custom: {
    kicker: "Custom System",
    title: "Custom Stealth Safety Bank Mobile System",
    subtitle: "ออกแบบระบบความปลอดภัยให้ซ่อนอยู่ในสิ่งที่คุณต้องการ",
    lead: "สำหรับผู้ที่ต้องการความปลอดภัยระดับสูง เราสามารถออกแบบระบบ Stealth ตามรูปแบบการใช้งานจริงของคุณ ไม่ว่าจะเป็นห้อง เฟอร์นิเจอร์ ตุ๊กตา เตียง คอมพิวเตอร์ หรือโครงสร้างอื่น ๆ ตามอุปกรณ์และความต้องการของลูกค้า",
    badges: ["สั่งทำตามต้องการ", "ไม่มีรูปแบบตายตัว", "เฉพาะบุคคล", "ระดับสูง"],
    features: [
      "สร้างตามโครงสร้างจริงและการใช้งานจริงของลูกค้า",
      "ไม่มีรูปแบบตายตัว จึงยากต่อการคาดเดา",
      "คิดราคาและออกแบบตามโครงสร้างและอุปกรณ์ที่เลือก"
    ],
    useCases: [
      "ผู้มีทรัพย์สินสูง",
      "นักลงทุน เจ้าของธุรกิจ หรือผู้ที่ต้องการระบบเฉพาะตัว",
      "ผู้ที่ต้องการซ่อนระบบในเฟอร์นิเจอร์ ห้อง หรือของใช้ต่าง ๆ"
    ],
    impacts: [
      { value: "เฉพาะตัว", label: "ระบบที่ออกแบบมาเพื่อคุณโดยเฉพาะ" },
      { value: "ยากต่อการคาดเดา", label: "ไม่มีรูปแบบสำเร็จรูปให้เดาได้ง่าย" },
      { value: "ระดับสูง", label: "ความปลอดภัยที่ผูกกับชีวิตจริงของลูกค้า" }
    ],
    rules: [
      "ความปลอดภัยที่ดีที่สุด คือระบบที่ไม่มีใครรู้ว่ามีอยู่",
      "ซ่อนในสิ่งที่คนไม่สงสัย",
      "ออกแบบให้ตรงกับพฤติกรรมและพื้นที่จริง"
    ],
    next: null,
    nextLabel: "เริ่มสั่งจอง",
    video: "https://www.youtube-nocookie.com/embed/mD9i39genW8",
    videoNote: "Custom System คือระบบที่ออกแบบเฉพาะบุคคล"
  }
};

const agentMockData = [
  { name: "Agent Premium Bangkok", area: "Bangkok", code: "AG-BKK-001" },
  { name: "Somchai SSB", area: "Nonthaburi", code: "AG-NB-014" },
  { name: "Siam Safety Agent", area: "Bangkok", code: "AG-BKK-022" },
  { name: "Agent Taling Chan", area: "Bangkok", code: "AG-BKK-031" },
  { name: "SSB North Team", area: "Chiang Mai", code: "AG-CNX-004" },
  { name: "Agent Eastern Secure", area: "Chonburi", code: "AG-CBI-002" }
];

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

function renderBadges(items = []) {
  if (!infoBadges) return;
  infoBadges.innerHTML = items.map(item => `<span class="popup-badge th-font">${item}</span>`).join("");
}

function renderFeatures(items = [], target) {
  if (!target) return;
  target.innerHTML = items.map(item => `<li class="th-font">${item}</li>`).join("");
}

function renderImpacts(items = []) {
  if (!infoImpacts) return;
  infoImpacts.innerHTML = items.map(item => `
    <div class="impact-card">
      <div class="impact-value th-font">${item.value}</div>
      <div class="impact-label th-font">${item.label}</div>
    </div>
  `).join("");
}

function getFocusableElements(container) {
  if (!container) return [];
  return $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', container)
    .filter(el => !el.hasAttribute("disabled"));
}

function trapFocus(event, container) {
  if (event.key !== "Tab") return;

  const focusables = getFocusableElements(container);
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

function openPopup(el) {
  if (!el) return;

  lastFocusedElement = document.activeElement;
  el.style.display = "flex";
  el.setAttribute("aria-hidden", "false");

  requestAnimationFrame(() => el.classList.add("show"));
  lockBodyScroll(true);
  pulseCenter();

  const focusables = getFocusableElements(el);
  if (focusables.length) {
    setTimeout(() => focusables[0].focus(), 50);
  }
}

function closePopup(el, onAfterClose) {
  if (!el) return;

  el.classList.remove("show");
  el.setAttribute("aria-hidden", "true");

  setTimeout(() => {
    el.style.display = "none";

    if (typeof onAfterClose === "function") {
      onAfterClose();
    }

    const infoOpen = infoPopup?.style.display === "flex";
    const companyOpen = companyPopup?.style.display === "flex";

    if (!infoOpen && !companyOpen) {
      lockBodyScroll(false);
    }

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }, 180);
}

function setPopupNavActive(key) {
  document.querySelectorAll(".popup-pro-nav-btn[data-step]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.step === key);
  });
}

function renderPopupStep(key) {
  const data = popupData[key];
  if (!data) return;

  currentPopupKey = key;

  if (popupKicker) popupKicker.textContent = data.kicker;
  if (infoTitle) infoTitle.textContent = data.title;
  if (infoSubtitle) infoSubtitle.textContent = data.subtitle;
  if (infoLead) infoLead.textContent = data.lead;
  if (videoNote) videoNote.textContent = data.videoNote || "";

  renderBadges(data.badges || []);
  renderFeatures(data.features || [], infoFeatures);
  renderFeatures(data.useCases || [], infoUseCases);
  renderImpacts(data.impacts || []);

  const rule1 = document.getElementById("popupRule1");
  const rule2 = document.getElementById("popupRule2");
  const rule3 = document.getElementById("popupRule3");

  if (rule1) rule1.textContent = data.rules?.[0] || "";
  if (rule2) rule2.textContent = data.rules?.[1] || "";
  if (rule3) rule3.textContent = data.rules?.[2] || "";

  if (popupNextStep) {
    if (data.next) {
      popupNextStep.style.display = "inline-flex";
      popupNextStep.textContent = data.nextLabel || "ไปขั้นถัดไป";
      popupNextStep.dataset.next = data.next;
    } else {
      popupNextStep.style.display = "none";
      popupNextStep.dataset.next = "";
    }
  }

  if (infoVideo) {
    const params = new URLSearchParams({
      rel: "0",
      autoplay: "0",
      mute: "0",
      controls: "1",
      modestbranding: "1",
      playsinline: "1"
    });

    infoVideo.src = `${data.video}?${params.toString()}`;
  }

  if (document.querySelector(".popup-pro-content")) {
    document.querySelector(".popup-pro-content").scrollTop = 0;
  }

  setPopupNavActive(key);
}

function openInfoPopup(key) {
  renderPopupStep(key);
  openPopup(infoPopup);
}

function closeInfoPopup() {
  closePopup(infoPopup, () => {
    if (infoVideo) infoVideo.src = "";
  });
}

function openCompanyPopup() {
  openPopup(companyPopup);
}

function closeCompanyPopup() {
  closePopup(companyPopup);
}

function buildEnergyLines() {
  if (isMobileView() || !techHero || !logoMenuButton) return;

  const heroRect = techHero.getBoundingClientRect();
  const logoRect = logoMenuButton.getBoundingClientRect();

  const cx = ((logoRect.left + logoRect.width / 2) - heroRect.left) / heroRect.width * 1000;
  const cy = ((logoRect.top + logoRect.height / 2) - heroRect.top) / heroRect.height * 700;

  const sources = $$(".energy-source", techHero);

  sources.forEach((el, index) => {
    const rect = el.getBoundingClientRect();
    const localX = ((rect.left + rect.width / 2) - heroRect.left) / heroRect.width * 1000;
    const localY = ((rect.top + rect.height / 2) - heroRect.top) / heroRect.height * 700;

    const bend = localX < cx ? 72 : -72;
    const midX1 = localX + bend;
    const midX2 = cx - bend * 0.55;
    const d = `M ${localX} ${localY} C ${midX1} ${localY}, ${midX2} ${cy}, ${cx} ${cy}`;

    const line = $(`#line${index + 1}`);
    const run = $(`#run${index + 1}`);

    if (line) line.setAttribute("d", d);
    if (run) run.setAttribute("d", d);
  });
}

function renderAgentResults(keyword = "") {
  if (!agentResults) return;

  const q = keyword.trim().toLowerCase();
  const matches = agentMockData.filter(item => {
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      item.area.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q)
    );
  });

  if (!matches.length) {
    agentResults.innerHTML = `<div class="agent-empty th-font">ไม่พบตัวแทนที่ค้นหา</div>`;
    return;
  }

  agentResults.innerHTML = matches.map(item => `
    <button class="agent-item sound-click" type="button" data-agent="${item.name}">
      <div class="agent-name th-font">${item.name}</div>
      <div class="agent-meta th-font">${item.area} • ${item.code}</div>
    </button>
  `).join("");

  $$(".agent-item", agentResults).forEach(btn => {
    btn.addEventListener("click", () => {
      const agent = btn.getAttribute("data-agent") || "";
      window.location.href = `agent-profile.html?agent=${encodeURIComponent(agent)}`;
    });
  });
}

function openAgentDropdown() {
  agentDropdown?.classList.add("open");
}

function closeAgentDropdown() {
  agentDropdown?.classList.remove("open");
}

function toggleHeroOpen(force) {
  if (!techHero) return;

  if (typeof force === "boolean") {
    techHero.classList.toggle("open", force);
  } else {
    techHero.classList.toggle("open");
  }

  syncHeroLabels();
  pulseCenter();
}

function getAudioCtx() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioCtx = new AudioContextClass();
  }
  return audioCtx;
}

function playClickSound(type = "normal") {
  const ctx = getAudioCtx();
  if (!ctx) return;

  if (ctx.state === "suspended") {
    ctx.resume();
  }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = type === "confirm" ? "triangle" : "sine";
  osc.frequency.setValueAtTime(type === "confirm" ? 520 : 680, now);
  osc.frequency.exponentialRampToValueAtTime(type === "confirm" ? 260 : 340, now + 0.045);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(type === "confirm" ? 1800 : 2400, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(type === "confirm" ? 0.06 : 0.035, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + (type === "confirm" ? 0.16 : 0.09));

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + (type === "confirm" ? 0.18 : 0.1));
}

function applyThemeByViewport() {
  if (isMobileView()) {
    body.classList.add("light-mode");
    return;
  }

  const savedTheme = localStorage.getItem("theme");
  body.classList.toggle("light-mode", savedTheme === "light");
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

function bindHeroMenu() {
  if (logoMenuButton && techHero) {
    logoMenuButton.addEventListener("click", event => {
      event.stopPropagation();
      toggleHeroOpen();
    });
  }

  if (!techHero) return;

  techHero.addEventListener("click", event => {
    event.stopPropagation();
  });

  $$("[data-popup]", techHero).forEach(btn => {
    btn.addEventListener("click", event => {
      event.stopPropagation();
      const key = btn.getAttribute("data-popup");
      openInfoPopup(key);
    });
  });

  if (contactButton) {
    contactButton.addEventListener("click", event => {
      event.stopPropagation();
      openCompanyPopup();
    });
  }
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

    if (
      techHero &&
      !techHero.contains(target) &&
      infoPopup?.style.display !== "flex" &&
      companyPopup?.style.display !== "flex"
    ) {
      toggleHeroOpen(false);
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

  if (popupNav) {
    popupNav.querySelectorAll("[data-step]").forEach(btn => {
      btn.addEventListener("click", () => {
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

// ===== POPUP SYSTEM V4 =====

const popup = document.getElementById("popupSystem");
const popupTitle = document.getElementById("popupTitle");
const popupSubtitle = document.getElementById("popupSubtitle");
const popupShort = document.getElementById("popupShort");
const popupFull = document.getElementById("popupFull");
const popupVideo = document.getElementById("popupVideoFrame");

const closeBtn = document.getElementById("popupCloseBtn");
const modeBtns = document.querySelectorAll(".mode-btn");

// 🔥 OPEN
function openPopupV4(data){
  popupTitle.textContent = data.title;
  popupSubtitle.textContent = data.subtitle;
  popupShort.innerHTML = data.short;
  popupFull.innerHTML = data.full;
  popupVideo.src = data.video;

  popup.classList.add("show");
}

// ❌ CLOSE
function closePopupV4(){
  popup.classList.remove("show");
  popupVideo.src = "";
}

closeBtn.addEventListener("click", closePopupV4);

// 🔘 MODE SWITCH
modeBtns.forEach(btn=>{
  btn.addEventListener("click", ()=>{
    modeBtns.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");

    if(btn.dataset.mode === "short"){
      popupShort.classList.remove("hidden");
      popupFull.classList.add("hidden");
    }else{
      popupShort.classList.add("hidden");
      popupFull.classList.remove("hidden");
    }
  });
});
