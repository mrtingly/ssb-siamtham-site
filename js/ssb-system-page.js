(function () {
  function syncSystemMenuImages() {
    const isLight = document.documentElement.classList.contains("light-mode");

    document.querySelectorAll("img[data-light][data-dark]").forEach((img) => {
      const nextSrc = isLight ? img.dataset.light : img.dataset.dark;
      if (nextSrc && img.getAttribute("src") !== nextSrc) {
        img.setAttribute("src", nextSrc);
      }
    });
  }

  const themeToggle = document.getElementById("themeToggle");

  syncSystemMenuImages();

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const html = document.documentElement;
      const isLight = html.classList.contains("light-mode");

      html.classList.toggle("light-mode", !isLight);
      html.classList.toggle("dark-mode", isLight);
      localStorage.setItem("theme", !isLight ? "light" : "dark");

      syncSystemMenuImages();
    });
  }

  window.addEventListener("pageshow", syncSystemMenuImages);
})();

(function () {
  const showcase = document.getElementById("showcase");
  const logoCore = document.getElementById("logoCore");
  const beamSvg = document.getElementById("beamSvg");
  const statusBar = document.getElementById("statusBar");

  const logoMode = document.getElementById("logoMode");
  const detailMode = document.getElementById("detailMode");
  const detailClose = document.getElementById("detailClose");

  const detailKicker = document.getElementById("detailKicker");
  const detailTitle = document.getElementById("detailTitle");
  const detailSubtitle = document.getElementById("detailSubtitle");
  const detailMeaning = document.getElementById("detailMeaning");
  const detailProtection = document.getElementById("detailProtection");
  const detailReason = document.getElementById("detailReason");
  const detailTags = document.getElementById("detailTags");

  const attackColumn = document.getElementById("attackColumn");
  const systemColumn = document.getElementById("systemColumn");

  const radarLayer = document.getElementById("logoRadarLayer");
  const aiMode = document.getElementById("aiMode");
  const aiText = document.getElementById("aiText");
  const aiDetailBtn = document.getElementById("aiDetailBtn");
  const aiClose = document.getElementById("aiClose");

  const SVG_NS = "http://www.w3.org/2000/svg";

  if (
    !showcase ||
    !logoCore ||
    !beamSvg ||
    !statusBar ||
    !logoMode ||
    !attackColumn ||
    !systemColumn
  ) {
    return;
  }

  let systemOpened = false;
  let activeTimeout = null;
  let radarInterval = null;
  let scanIndex = 0;
  let aiSpeech = null;
  let currentDetailUrl = "";

  const attackMap = {
    psychological: {
      label: "Psychological → Time Barrier + SPC",
      targets: ["system-time-barrier", "system-spc"],
      detail: {
        kicker: "Attack Detail",
        title: "Psychological",
        subtitle: "การกดดัน หลอกลวง เร่งรัดการตัดสินใจ",
        meaning: "มิจฉาชีพใช้แรงกดดัน ความกลัว ความรีบ และการควบคุมอารมณ์ เพื่อบังคับให้เหยื่อตัดสินใจภายใต้เวลาจำกัด",
        protection: "SSB ใช้ Time Barrier และ SPC เพื่อคืนสติผู้ใช้งาน และเพิ่มชั้นการตรวจสอบก่อนเกิดความเสียหาย",
        reason: "ระบบถูกออกแบบให้ควบคุมจังหวะการตัดสินใจ เพื่อให้ผู้ใช้งานมีเวลาทบทวนและตรวจสอบได้มากขึ้น",
        tags: ["Time Barrier", "SPC"]
      },
      aiScript:
        "คุณกำลังดูภัยคุกคามด้านการกดดันและเร่งรัดการตัดสินใจ ระบบนี้คือการอัปเกรดความปลอดภัยด้วย Time Barrier และ SPC เพื่อเพิ่มเวลา เพิ่มสติ และเพิ่มการควบคุมก่อนตัดสินใจสำคัญ",
      detailUrl: "psychological.html"
    },

    phishing: {
      label: "Phishing → FD + Safety Book",
      targets: ["system-fd", "system-safety-book"],
      detail: {
        kicker: "Attack Detail",
        title: "Phishing",
        subtitle: "ลิงก์ปลอม หน้าเว็บปลอม และการลวงข้อมูล",
        meaning: "Phishing ทำงานผ่านการชักจูงให้ผู้ใช้กดลิงก์ เปิดหน้าเว็บปลอม หรือเปิดเผยข้อมูลสำคัญบนอุปกรณ์ประจำวัน",
        protection: "SSB แยกอุปกรณ์ใช้งานทั่วไปออกจากระบบธุรกรรม และใช้ Safety Book ลดการเข้าถึงเครื่องหลัก",
        reason: "เมื่อเครื่องประจำวันไม่ใช่เครื่องธุรกรรมหลัก มูลค่าของ phishing จะลดลงทันที",
        tags: ["FD", "Safety Book"]
      },
      aiScript:
        "คุณกำลังดูภัยคุกคามแบบฟิชชิ่ง ระบบนี้คือการอัปเกรดความปลอดภัยด้วยการแยกอุปกรณ์ใช้งานทั่วไปออกจากระบบธุรกรรมหลัก พร้อมจัดเก็บเครื่องสำคัญภายใต้ Safety Book",
      detailUrl: "phishing.html"
    },

    remote: {
      label: "Remote → FD + Safety Book",
      targets: ["system-fd", "system-safety-book"],
      detail: {
        kicker: "Attack Detail",
        title: "Remote",
        subtitle: "การควบคุมอุปกรณ์จากระยะไกล",
        meaning: "ผู้โจมตีใช้เครื่องมือหรือแอปเพื่อมองเห็น สั่งงาน หรือควบคุมอุปกรณ์แทนผู้ใช้งาน",
        protection: "SSB ใช้ FD เป็นชั้นรับแรงแทนระบบหลัก และใช้ Safety Book ลดการเปิดเผยเครื่องจริง",
        reason: "เมื่อเครื่องหลักอยู่ภายใต้การแยกใช้งานอย่างมีระบบ โอกาสเข้าถึงโดยตรงก็ลดลงอย่างมาก",
        tags: ["FD", "Safety Book"]
      },
      aiScript:
        "คุณกำลังดูภัยคุกคามจากการควบคุมระยะไกล ระบบนี้คือการอัปเกรดความปลอดภัยด้วยการแยกเครื่องหลักออกจากการใช้งานทั่วไป และเพิ่มชั้นรับแรงผ่าน Flare Device",
      detailUrl: "remote.html"
    },

    "fake-app": {
      label: "Fake App → FD + Safety Book",
      targets: ["system-fd", "system-safety-book"],
      detail: {
        kicker: "Attack Detail",
        title: "Fake App",
        subtitle: "แอปปลอมที่เข้าถึงข้อมูลหรือธุรกรรม",
        meaning: "แอปปลอมอาศัยความน่าเชื่อถือปลอม เพื่อขอสิทธิ์ เข้าถึงข้อมูล และเชื่อมโยงสู่ความเสียหาย",
        protection: "SSB ลดความเสี่ยงนี้ด้วยการแยกเครื่องใช้งานออกจากเครื่องธุรกรรมจริง และเก็บเครื่องสำคัญอย่างมีวินัย",
        reason: "แนวคิดสำคัญคือยกระดับความปลอดภัยตั้งแต่โครงสร้างการใช้งาน ไม่ใช่เพียงการป้องกันปลายทาง",
        tags: ["FD", "Safety Book"]
      },
      aiScript:
        "คุณกำลังดูภัยคุกคามจากแอปปลอม ระบบนี้คือการอัปเกรดความปลอดภัยด้วยการแยกบทบาทของอุปกรณ์ และจัดเก็บระบบสำคัญให้อยู่ภายใต้การควบคุมที่สูงขึ้น",
      detailUrl: "fake-app.html"
    }
  };

  const systemMap = {
    fd: {
      kicker: "Defense Detail",
      title: "FD - Flare Device",
      subtitle: "จุดรับแรงแทนระบบหลัก",
      meaning: "FD คืออุปกรณ์ที่เปิดเผยต่อโลกภายนอก เพื่อรับแรงกระทบแทนระบบหลัก",
      protection: "FD ช่วยลดการสัมผัสโดยตรงกับเครื่องหรือโครงสร้างที่สำคัญจริง",
      reason: "เป็นชั้นเบี่ยงความสนใจและเพิ่มความยืดหยุ่นให้ระบบโดยรวม",
      tags: ["รับแรงแทน", "ลดการเปิดเผย", "เสริมความปลอดภัย"],
      aiScript:
        "คุณกำลังดู Flare Device ชั้นรับแรงของระบบ Stealth Safety Bank Mobile System ออกแบบมาเพื่อยกระดับความปลอดภัย ด้วยการแยกจุดเปิดเผยออกจากระบบหลัก",
      detailUrl: "fd.html"
    },

    "safety-book": {
      kicker: "Defense Detail",
      title: "Safety Book",
      subtitle: "ชั้นแยกเก็บ ลดการเข้าถึง และลดการมองเห็น",
      meaning: "Safety Book คือระบบจัดเก็บและอำพรางองค์ประกอบสำคัญ เพื่อเพิ่มระดับการควบคุม",
      protection: "ช่วยลดการเข้าถึงโดยไม่จำเป็น และเพิ่มความเป็นส่วนตัวในการจัดเก็บ",
      reason: "การซ่อนตำแหน่งและแยกเก็บอย่างมีระบบ ช่วยยกระดับความปลอดภัยของทั้งโครงสร้าง",
      tags: ["แยกเก็บ", "อำพราง", "ควบคุมการเข้าถึง"],
      aiScript:
        "คุณกำลังดู Safety Book โครงสร้างการจัดเก็บที่ยกระดับความปลอดภัย ด้วยการลดการมองเห็น ลดการเข้าถึง และเพิ่มการควบคุมต่อองค์ประกอบสำคัญของระบบ",
      detailUrl: "safety-book.html"
    },

    "time-barrier": {
      kicker: "Defense Detail",
      title: "Time Barrier",
      subtitle: "หน่วงเวลาเพื่อคืนสติและเพิ่มการควบคุม",
      meaning: "Time Barrier คือกลไกที่เพิ่มเวลาให้ผู้ใช้งานก่อนตัดสินใจในจุดสำคัญ",
      protection: "ช่วยลดผลกระทบจากความรีบ ความกลัว และแรงกดดัน",
      reason: "เวลา คือหนึ่งในกลไกสำคัญของระบบป้องกันภัยขั้นสูง",
      tags: ["คืนสติ", "เพิ่มเวลา", "เพิ่มการควบคุม"],
      aiScript:
        "คุณกำลังดู Time Barrier กลไกสำคัญที่ยกระดับความปลอดภัย ด้วยการเพิ่มเวลาให้ผู้ใช้งานได้ทบทวนและควบคุมการตัดสินใจได้มากขึ้น",
      detailUrl: "time-barrier.html"
    },

    spc: {
      kicker: "Defense Detail",
      title: "SPC",
      subtitle: "ศูนย์ช่วยเหลือและรับช่วงตรวจสอบแทนผู้ใช้งาน",
      meaning: "SPC คือชั้นสนับสนุนของระบบ ที่เข้ามารับช่วงการตรวจสอบเมื่อเกิดความเสี่ยง",
      protection: "ช่วยเพิ่มความมั่นใจในการตัดสินใจ และเพิ่มการควบคุมในช่วงเวลาสำคัญ",
      reason: "ระบบที่แข็งแรงควรมีทั้งเทคโนโลยีและการสนับสนุนเชิงปฏิบัติการ",
      tags: ["รับช่วงแทน", "ตรวจสอบ", "สนับสนุน"],
      aiScript:
        "คุณกำลังดู SPC ศูนย์ช่วยเหลือของระบบ Stealth Safety Bank Mobile System ออกแบบมาเพื่อยกระดับความปลอดภัย ด้วยการรับช่วงตรวจสอบและสนับสนุนผู้ใช้งานในช่วงเวลาสำคัญ",
      detailUrl: "spc.html"
    }
  };

  const radarDotMap = [
    { x: 66, y: 26 },
    { x: 76, y: 48 },
    { x: 63, y: 71 },
    { x: 39, y: 79 },
    { x: 24, y: 58 },
    { x: 28, y: 34 }
  ];

  function buildRadarDots() {
    if (!radarLayer) return;

    radarLayer.querySelectorAll(".logo-scan-dot").forEach((dot) => dot.remove());

    radarDotMap.forEach((point, index) => {
      const dot = document.createElement("span");
      dot.className = "logo-scan-dot";
      dot.dataset.index = String(index);
      dot.style.left = `${point.x}%`;
      dot.style.top = `${point.y}%`;
      radarLayer.appendChild(dot);
    });
  }

  function pulseNextRadarDot() {
    if (!radarLayer || !systemOpened) return;

    const dots = Array.from(radarLayer.querySelectorAll(".logo-scan-dot"));
    if (!dots.length) return;

    dots.forEach((dot) => dot.classList.remove("is-hit"));

    const current = dots[scanIndex % dots.length];
    current.classList.add("is-hit");

    setTimeout(() => {
      current.classList.remove("is-hit");
    }, 420);

    scanIndex += 1;
  }

  function startRadarLoop() {
    stopRadarLoop();
    scanIndex = 0;
    radarInterval = setInterval(pulseNextRadarDot, 640);
  }

  function stopRadarLoop() {
    if (radarInterval) {
      clearInterval(radarInterval);
      radarInterval = null;
    }

    if (radarLayer) {
      radarLayer.querySelectorAll(".logo-scan-dot").forEach((dot) => {
        dot.classList.remove("is-hit");
      });
    }
  }

  function ensureSvgDefs() {
    beamSvg.innerHTML = "";

    const defs = document.createElementNS(SVG_NS, "defs");

    const inboundGradient = document.createElementNS(SVG_NS, "linearGradient");
    inboundGradient.setAttribute("id", "beamInboundGradient");
    inboundGradient.setAttribute("x1", "0%");
    inboundGradient.setAttribute("y1", "0%");
    inboundGradient.setAttribute("x2", "100%");
    inboundGradient.setAttribute("y2", "0%");

    [["0%", "rgba(255,170,82,0)"], ["35%", "#ffb864"], ["100%", "#ffffff"]].forEach(([offset, color]) => {
      const stop = document.createElementNS(SVG_NS, "stop");
      stop.setAttribute("offset", offset);
      stop.setAttribute("stop-color", color);
      inboundGradient.appendChild(stop);
    });

    const outboundGradient = document.createElementNS(SVG_NS, "linearGradient");
    outboundGradient.setAttribute("id", "beamOutboundGradient");
    outboundGradient.setAttribute("x1", "0%");
    outboundGradient.setAttribute("y1", "0%");
    outboundGradient.setAttribute("x2", "100%");
    outboundGradient.setAttribute("y2", "0%");

    [["0%", "#ffffff"], ["42%", "rgba(104,244,255,.96)"], ["100%", "rgba(119,216,255,0)"]].forEach(([offset, color]) => {
      const stop = document.createElementNS(SVG_NS, "stop");
      stop.setAttribute("offset", offset);
      stop.setAttribute("stop-color", color);
      outboundGradient.appendChild(stop);
    });

    defs.appendChild(inboundGradient);
    defs.appendChild(outboundGradient);
    beamSvg.appendChild(defs);
  }

  function sizeSvg() {
    const rect = showcase.getBoundingClientRect();
    beamSvg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
    beamSvg.setAttribute("width", rect.width);
    beamSvg.setAttribute("height", rect.height);
  }

  function stopAiSpeech() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    aiSpeech = null;
  }

  function speakAi(text) {
    stopAiSpeech();

    if (!("speechSynthesis" in window) || !text) return;

    aiSpeech = new SpeechSynthesisUtterance(text);
    aiSpeech.lang = "th-TH";
    aiSpeech.rate = 0.95;
    aiSpeech.pitch = 1;
    aiSpeech.volume = 1;

    window.speechSynthesis.speak(aiSpeech);
  }

  function hideLogoMode() {
    logoMode.classList.add("is-hidden");
  }

  function showLogoMode() {
    logoMode.classList.remove("is-hidden");
  }

  function closeDetail(silent = false) {
    if (!detailMode) return;

    detailMode.classList.remove("is-open");
    detailMode.setAttribute("aria-hidden", "true");
    showLogoMode();

    if (!silent && systemOpened) {
      statusBar.textContent = "กดไอคอน 1 ครั้งเพื่อดูการป้องกัน หรือกด 2 ครั้งเพื่อให้ AI อธิบาย";
    }
  }

  function closeAiMode(silent = false) {
    if (!aiMode) return;

    aiMode.classList.remove("show");
    currentDetailUrl = "";
    stopAiSpeech();
    showLogoMode();

    if (!silent && systemOpened) {
      statusBar.textContent = "กดไอคอน 1 ครั้งเพื่อดูการป้องกัน หรือกด 2 ครั้งเพื่อให้ AI อธิบาย";
    }
  }

  function openAiMode(payload) {
    if (!aiMode || !aiText || !payload) return;

    closeDetail(true);
    hideLogoMode();

    currentDetailUrl = payload.detailUrl || "";
    aiText.textContent = payload.aiScript || payload.subtitle || payload.title || "";

    aiMode.classList.add("show");
    speakAi(aiText.textContent);

    statusBar.textContent = (payload.title || "AI System") + " • AI พร้อมอธิบาย";
  }

  function clearStates() {
    clearTimeout(activeTimeout);
    ensureSvgDefs();
    beamSvg.querySelectorAll(".beam-path").forEach((path) => path.remove());

    logoCore.classList.remove("is-burst");

    document.querySelectorAll(".icon-card").forEach((el) => {
      el.classList.remove("is-source", "is-target");
    });
  }

  function getCenter(el, parentRect) {
    const r = el.getBoundingClientRect();
    return {
      x: r.left - parentRect.left + (r.width / 2),
      y: r.top - parentRect.top + (r.height / 2)
    };
  }

  function getRelayPoint(parentRect) {
    const logoRect = logoCore.getBoundingClientRect();
    return {
      x: logoRect.left - parentRect.left + (logoRect.width / 2),
      y: logoRect.top - parentRect.top + (logoRect.height / 2)
    };
  }

  function createStraightBeam(from, to, type) {
    const path = document.createElementNS(SVG_NS, "path");
    const d = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;

    path.setAttribute("d", d);
    path.setAttribute("class", `beam-path ${type}`);
    beamSvg.appendChild(path);

    const len = path.getTotalLength();
    const visibleSegment = Math.max(78, len * 0.22);

    path.style.strokeDasharray = `${visibleSegment} ${len}`;
    path.style.strokeDashoffset = `${len}`;
    path.style.setProperty("--beam-len", `${len}`);
    path.classList.add("animate");
  }

  function blinkTargets(ids) {
    ids.forEach((id) => {
      const target = document.getElementById(id);
      if (target) target.classList.add("is-target");
    });

    activeTimeout = setTimeout(() => {
      ids.forEach((id) => {
        const target = document.getElementById(id);
        if (target) target.classList.remove("is-target");
      });

      logoCore.classList.remove("is-burst");

      document.querySelectorAll(".icon-card.is-source").forEach((el) => {
        el.classList.remove("is-source");
      });

      ensureSvgDefs();

      if (systemOpened && !aiMode?.classList.contains("show")) {
        statusBar.textContent = "กดไอคอน 1 ครั้งเพื่อดูการป้องกัน หรือกด 2 ครั้งเพื่อให้ AI อธิบาย";
      }
    }, 5200);
  }

  function runAttackFlow(attackKey, sourceCard) {
    const config = attackMap[attackKey];
    if (!config || !systemOpened || !sourceCard) return;

    closeAiMode(true);
    closeDetail(true);
    clearStates();
    showLogoMode();

    const parentRect = showcase.getBoundingClientRect();
    const sourceCenter = getCenter(sourceCard, parentRect);
    const relayPoint = getRelayPoint(parentRect);

    sourceCard.classList.add("is-source");
    logoCore.classList.add("is-burst");
    statusBar.textContent = config.label;

    createStraightBeam(sourceCenter, relayPoint, "inbound");

    setTimeout(() => {
      config.targets.forEach((id) => {
        const targetCard = document.getElementById(id);
        if (!targetCard) return;

        const targetCenter = getCenter(targetCard, parentRect);
        createStraightBeam(relayPoint, targetCenter, "outbound");
      });
    }, 360);

    setTimeout(() => {
      blinkTargets(config.targets);
    }, 760);
  }

  function runSystemFocus(systemKey, sourceCard) {
    if (!systemOpened || !sourceCard) return;

    closeAiMode(true);
    closeDetail(true);
    clearStates();
    showLogoMode();

    sourceCard.classList.add("is-target");
    statusBar.textContent = "System Focus → " + (systemMap[systemKey]?.title || "System");

    activeTimeout = setTimeout(() => {
      sourceCard.classList.remove("is-target");

      if (systemOpened && !aiMode?.classList.contains("show")) {
        statusBar.textContent = "กดไอคอน 1 ครั้งเพื่อดูการป้องกัน หรือกด 2 ครั้งเพื่อให้ AI อธิบาย";
      }
    }, 2200);
  }

  function openSystem() {
    systemOpened = true;
    showcase.classList.add("is-open");
    attackColumn.classList.add("ready");
    systemColumn.classList.add("ready");
    statusBar.textContent = "กดไอคอน 1 ครั้งเพื่อดูการป้องกัน หรือกด 2 ครั้งเพื่อให้ AI อธิบาย";
    startRadarLoop();
  }

  function collapseSystem() {
    clearStates();
    closeAiMode(true);
    closeDetail(true);
    systemOpened = false;
    showcase.classList.remove("is-open");
    attackColumn.classList.remove("ready");
    systemColumn.classList.remove("ready");
    statusBar.textContent = "กดโลโก้เพื่อเริ่มต้น";
    stopRadarLoop();
  }

  ensureSvgDefs();
  sizeSvg();
  buildRadarDots();

  logoCore.addEventListener("click", function () {
    if (!systemOpened) {
      openSystem();
      return;
    }

    if (aiMode?.classList.contains("show")) {
      closeAiMode();
      return;
    }

    if (detailMode?.classList.contains("is-open")) {
      closeDetail();
      return;
    }

    collapseSystem();
  });

  document.querySelectorAll("[data-kind='attack']").forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      const attackKey = btn.getAttribute("data-key");
      const sourceCard = btn.closest(".icon-card");
      runAttackFlow(attackKey, sourceCard);
    });

    btn.addEventListener("dblclick", function (event) {
      event.preventDefault();
      event.stopPropagation();

      const attackKey = btn.getAttribute("data-key");
      if (!systemOpened) return;

      clearStates();
      openAiMode(attackMap[attackKey]);
    });
  });

  document.querySelectorAll("[data-kind='system']").forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      const systemKey = btn.getAttribute("data-key");
      const sourceCard = btn.closest(".icon-card");
      runSystemFocus(systemKey, sourceCard);
    });

    btn.addEventListener("dblclick", function (event) {
      event.preventDefault();
      event.stopPropagation();

      const systemKey = btn.getAttribute("data-key");
      if (!systemOpened) return;

      clearStates();
      openAiMode(systemMap[systemKey]);
    });
  });

  if (aiClose) {
    aiClose.addEventListener("click", function (event) {
      event.preventDefault();
      closeAiMode();
    });
  }

  if (aiDetailBtn) {
    aiDetailBtn.addEventListener("click", function (event) {
      event.preventDefault();
      if (!currentDetailUrl) return;
      window.location.href = currentDetailUrl;
    });
  }

  if (detailClose) {
    detailClose.addEventListener("click", function (event) {
      event.preventDefault();
      closeDetail();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (aiMode?.classList.contains("show")) {
        closeAiMode();
        return;
      }

      if (detailMode?.classList.contains("is-open")) {
        closeDetail();
      }
    }
  });

  window.addEventListener("resize", function () {
    sizeSvg();
    ensureSvgDefs();
    buildRadarDots();
  });
})();
