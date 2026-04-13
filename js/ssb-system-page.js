(function () {
  const themeToggle = document.getElementById("themeToggle");
  if (!themeToggle) return;

  themeToggle.addEventListener("click", function () {
    const html = document.documentElement;
    const isLight = html.classList.contains("light-mode");
    html.classList.toggle("light-mode", !isLight);
    html.classList.toggle("dark-mode", isLight);
    localStorage.setItem("theme", !isLight ? "light" : "dark");
  });
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

  const SVG_NS = "http://www.w3.org/2000/svg";

  let systemOpened = false;
  let activeTimeout = null;

  const attackMap = {
    psychological: {
      label: "Psychological → Time Barrier + SPC",
      targets: ["system-time-barrier", "system-spc"],
      detail: {
        kicker: "Attack Detail",
        title: "Psychological",
        subtitle: "การโจมตีที่ใช้แรงกดดัน เร่งเวลา และทำให้เหยื่อขาดสติ",
        meaning: "มิจฉาชีพใช้แรงกดดัน ความกลัว ความรีบ และการควบคุมอารมณ์ เพื่อบังคับให้เหยื่อตัดสินใจผิดในเวลาสั้น ๆ",
        protection: "SSB ใช้ Time Barrier เพื่อหยุดความเร่งรีบ และใช้ SPC รับช่วงตรวจสอบแทนผู้ใช้งานเมื่อมีความเสี่ยง ทำให้การกดดันทางจิตวิทยาไม่สามารถแปลงเป็นการโอนเงินจริงได้ง่าย",
        reason: "ระบบนี้ไม่ได้เน้นสู้กับคำพูดของมิจฉาชีพโดยตรง แต่เน้นแทรกจังหวะให้ผู้ใช้กลับมามีสติ และมีทีมรับช่วงทันทีเมื่อเริ่มผิดปกติ",
        tags: ["Time Barrier", "SPC"]
      }
    },
    phishing: {
      label: "Phishing → FD + Safety Book",
      targets: ["system-fd", "system-safety-book"],
      detail: {
        kicker: "Attack Detail",
        title: "Phishing",
        subtitle: "ลิงก์ปลอม หน้าเว็บปลอม หรือข้อความหลอกให้เปิดเผยข้อมูลสำคัญ",
        meaning: "Phishing ทำงานได้เพราะผู้ใช้เปิดข้อมูลบนอุปกรณ์ที่ใช้งานจริงในชีวิตประจำวัน และมักเชื่อว่ากำลังคุยกับหน่วยงานจริง",
        protection: "SSB แยกอุปกรณ์ใช้งานทั่วไปออกจากระบบการเงินจริง และใช้ Safety Book ซ่อน/แยกการเข้าถึงเครื่องหลัก ทำให้เส้นทาง phishing ไม่แตะระบบเงินจริงโดยตรง",
        reason: "เมื่อเครื่องใช้งานประจำวันไม่ใช่เครื่องธุรกรรมหลัก มูลค่าของ phishing จะลดลงทันที เพราะเป้าหมายหลักไม่ได้อยู่บนพื้นผิวโจมตีเดียวกัน",
        tags: ["FD", "Safety Book"]
      }
    },
    remote: {
      label: "Remote → FD + Safety Book",
      targets: ["system-fd", "system-safety-book"],
      detail: {
        kicker: "Attack Detail",
        title: "Remote",
        subtitle: "การควบคุมเครื่องจากระยะไกลผ่านแอป เครื่องมือช่วยเหลือ หรือมัลแวร์",
        meaning: "ผู้โจมตีพยายามเข้าแทนที่ผู้ใช้บนอุปกรณ์เดียวกัน เพื่อสั่งงาน มองเห็น และบังคับทำธุรกรรมแทน",
        protection: "SSB ใช้ FD เป็นจุดรับแรงแทนระบบหลัก และใช้ Safety Book ทำให้เครื่องจริงไม่เปิดเผยตัวหรืออยู่ในสถานะพร้อมให้ควบคุมตลอดเวลา",
        reason: "เมื่อเครื่องหลักถูกแยกออกจากการใช้งานประจำวัน โอกาสที่ remote access จะเข้าถึงเส้นทางเงินจริงจึงลดลงอย่างมีนัยสำคัญ",
        tags: ["FD", "Safety Book"]
      }
    },
    "fake-app": {
      label: "Fake App → FD + Safety Book",
      targets: ["system-fd", "system-safety-book"],
      detail: {
        kicker: "Attack Detail",
        title: "Fake App",
        subtitle: "แอปปลอมที่หลอกว่าถูกต้อง แต่มีหน้าที่เข้าถึงข้อมูลหรือธุรกรรม",
        meaning: "แอปปลอมอาศัยการติดตั้งบนเครื่องที่ผู้ใช้ใช้ทุกวัน จากนั้นค่อยแทรกตัวเข้าถึงข้อมูล การแจ้งเตือน หรือสิทธิ์สำคัญ",
        protection: "SSB ลดความเสี่ยงนี้ด้วยการแยกเครื่องใช้งานออกจากเครื่องธุรกรรมจริง และเก็บระบบหลักด้วย Safety Book อย่างมีวินัย",
        reason: "แนวคิดไม่ใช่แค่กันแอปปลอม แต่คือทำให้แอปปลอมไม่มีโอกาสสัมผัสระบบการเงินจริงตั้งแต่ต้นทาง",
        tags: ["FD", "Safety Book"]
      }
    }
  };

  const systemMap = {
    fd: {
      kicker: "Defense Detail",
      title: "FD - Flare Device",
      subtitle: "จุดรับแรงแทนระบบหลัก และเป็นชั้นเบี่ยงความสนใจจากเป้าหมายจริง",
      meaning: "FD คืออุปกรณ์ที่เปิดเผยต่อโลกภายนอก ใช้รับความเสี่ยงแทน เพื่อไม่ให้ระบบหลักต้องออกไปอยู่บนพื้นผิวการโจมตีโดยตรง",
      protection: "FD ช่วยให้มิจฉาชีพหรือมัลแวร์เจอเพียงชั้นภายนอก ขณะที่เครื่องหรือระบบหลักยังถูกแยกออกไว้",
      reason: "แนวคิดคือไม่ได้เอาเครื่องสำคัญไปเสี่ยงตรง ๆ แต่ใช้ชั้นภายนอกเป็นตัวรับแรงและลดโอกาสที่ศัตรูจะเจอเป้าหมายจริง",
      tags: ["รับแรงแทน", "ลดการเปิดเผย", "ลดเป้าหมายจริง"]
    },
    "safety-book": {
      kicker: "Defense Detail",
      title: "Safety Book",
      subtitle: "ชั้นแยกเก็บ ลดการเข้าถึง และลดการมองเห็นจากภายนอก",
      meaning: "Safety Book คือระบบจัดเก็บและอำพรางเครื่องหรือองค์ประกอบสำคัญ ให้ไม่เปิดเผยตัวต่อคนทั่วไปหรือการเข้าถึงที่ไม่ควรเกิดขึ้น",
      protection: "มันช่วยแยกชิ้นส่วนสำคัญออกจากการใช้งานประจำวัน และลดโอกาสการสังเกต การหยิบใช้ หรือการแตะต้องโดยไม่จำเป็น",
      reason: "ถ้าศัตรูไม่รู้ว่าอะไรคือของจริง โอกาสโจมตีสำเร็จก็ลดลงตั้งแต่ต้นทาง",
      tags: ["แยกเก็บ", "อำพราง", "ลดการเข้าถึง"]
    },
    "time-barrier": {
      kicker: "Defense Detail",
      title: "Time Barrier",
      subtitle: "หน่วงเวลาเพื่อคืนสติและหยุดการตัดสินใจผิดพลาด",
      meaning: "Time Barrier คือกลไกที่ทำให้การเข้าถึงเงินหรือขั้นตอนสำคัญไม่เกิดขึ้นเร็วเกินไป เพื่อหยุดการตัดสินใจแบบถูกกดดัน",
      protection: "เมื่อผู้ใช้ต้องผ่านเวลาและลำดับขั้นตอน ความเสี่ยงจากความกลัว ความรีบ หรือคำสั่งเร่งด่วนจะลดลง",
      reason: "หลายเหตุการณ์เสียหายเกิดขึ้นในไม่กี่นาที ระบบนี้จึงใส่เวลาเข้าไปเพื่อคืนการควบคุมให้ผู้ใช้",
      tags: ["คืนสติ", "หยุดความรีบ", "คุมจังหวะตัดสินใจ"]
    },
    spc: {
      kicker: "Defense Detail",
      title: "SPC",
      subtitle: "ศูนย์ช่วยเหลือที่รับช่วงตรวจสอบและตอบโต้แทนผู้ใช้งาน",
      meaning: "SPC ทำหน้าที่เป็นชั้นมนุษย์ของระบบ เมื่อผู้ใช้เริ่มไม่แน่ใจหรือเสี่ยง จะมีคนรับช่วงวิเคราะห์และประสานแทนทันที",
      protection: "ช่วยหยุดการสนทนาหรือกระบวนการเสี่ยง และแยกผู้ใช้ให้ออกจากแรงกดดันตรงหน้า",
      reason: "ในสถานการณ์จริง ผู้ใช้บางครั้งต้องการคนรับช่วงแทนมากกว่าข้อมูล ระบบนี้จึงออกแบบให้มีชั้นสนับสนุนจริงเข้ามาช่วย",
      tags: ["รับช่วงแทน", "ตรวจสอบ", "ช่วยตัดวงจรเสี่ยง"]
    }
  };

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

  function openSystem() {
    systemOpened = true;
    showcase.classList.add("is-open");
    attackColumn.classList.add("ready");
    systemColumn.classList.add("ready");
    statusBar.textContent = "กดไอคอน 1 ครั้งเพื่อดูการป้องกัน หรือกด 2 ครั้งเพื่ออ่านรายละเอียด";
  }

  function collapseSystem() {
    clearStates();
    closeDetail(true);
    systemOpened = false;
    showcase.classList.remove("is-open");
    attackColumn.classList.remove("ready");
    systemColumn.classList.remove("ready");
    statusBar.textContent = "กดโลโก้เพื่อเริ่มต้น";
  }

  function hideLogoMode() {
    logoMode.classList.add("is-hidden");
  }

  function showLogoMode() {
    logoMode.classList.remove("is-hidden");
  }

  function openDetail(payload) {
    hideLogoMode();

    detailKicker.textContent = payload.kicker;
    detailTitle.textContent = payload.title;
    detailSubtitle.textContent = payload.subtitle;
    detailMeaning.textContent = payload.meaning;
    detailProtection.textContent = payload.protection;
    detailReason.textContent = payload.reason;

    detailTags.innerHTML = "";
    payload.tags.forEach(tag => {
      const span = document.createElement("span");
      span.className = "defense-tag";
      span.textContent = tag;
      detailTags.appendChild(span);
    });

    detailMode.classList.add("is-open");
    detailMode.setAttribute("aria-hidden", "false");
  }

  function closeDetail(silent = false) {
    detailMode.classList.remove("is-open");
    detailMode.setAttribute("aria-hidden", "true");
    showLogoMode();
    if (!silent && systemOpened) {
      statusBar.textContent = "กดไอคอน 1 ครั้งเพื่อดูการป้องกัน หรือกด 2 ครั้งเพื่ออ่านรายละเอียด";
    }
  }

  function clearStates() {
    clearTimeout(activeTimeout);
    ensureSvgDefs();
    document.querySelectorAll(".beam-path").forEach(path => path.remove());
    logoCore.classList.remove("is-burst");
    document.querySelectorAll(".icon-card").forEach(el => {
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
    ids.forEach(id => {
      const target = document.getElementById(id);
      if (target) target.classList.add("is-target");
    });

    activeTimeout = setTimeout(() => {
      ids.forEach(id => {
        const target = document.getElementById(id);
        if (target) target.classList.remove("is-target");
      });
      logoCore.classList.remove("is-burst");
      document.querySelectorAll(".icon-card.is-source").forEach(el => {
        el.classList.remove("is-source");
      });
      ensureSvgDefs();
      if (systemOpened && !detailMode.classList.contains("is-open")) {
        statusBar.textContent = "กดไอคอน 1 ครั้งเพื่อดูการป้องกัน หรือกด 2 ครั้งเพื่ออ่านรายละเอียด";
      }
    }, 5200);
  }

  function runAttackFlow(attackKey, sourceCard) {
    const config = attackMap[attackKey];
    if (!config || !systemOpened) return;

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
    if (!systemOpened) return;
    closeDetail(true);
    clearStates();
    showLogoMode();

    sourceCard.classList.add("is-target");
    statusBar.textContent = "System Focus → " + (systemMap[systemKey]?.title || "System");

    activeTimeout = setTimeout(() => {
      sourceCard.classList.remove("is-target");
      if (systemOpened) {
        statusBar.textContent = "กดไอคอน 1 ครั้งเพื่อดูการป้องกัน หรือกด 2 ครั้งเพื่ออ่านรายละเอียด";
      }
    }, 2200);
  }

  ensureSvgDefs();
  sizeSvg();

  logoCore.addEventListener("click", function () {
    if (!systemOpened) {
      openSystem();
      return;
    }

    if (detailMode.classList.contains("is-open")) {
      closeDetail();
      return;
    }

    collapseSystem();
  });

  document.querySelectorAll("[data-kind='attack']").forEach(btn => {
    btn.addEventListener("click", function () {
      const attackKey = btn.getAttribute("data-key");
      const sourceCard = btn.closest(".icon-card");
      runAttackFlow(attackKey, sourceCard);
    });

    btn.addEventListener("dblclick", function (event) {
      event.preventDefault();
      const attackKey = btn.getAttribute("data-key");
      if (!systemOpened) return;
      clearStates();
      openDetail(attackMap[attackKey].detail);
      statusBar.textContent = attackMap[attackKey].detail.title + " • เปิดรายละเอียดแล้ว";
    });
  });

  document.querySelectorAll("[data-kind='system']").forEach(btn => {
    btn.addEventListener("click", function () {
      const systemKey = btn.getAttribute("data-key");
      const sourceCard = btn.closest(".icon-card");
      runSystemFocus(systemKey, sourceCard);
    });

    btn.addEventListener("dblclick", function (event) {
      event.preventDefault();
      const systemKey = btn.getAttribute("data-key");
      if (!systemOpened) return;
      clearStates();
      openDetail(systemMap[systemKey]);
      statusBar.textContent = systemMap[systemKey].title + " • เปิดรายละเอียดแล้ว";
    });
  });

  detailClose.addEventListener("click", function () {
    closeDetail();
  });

  window.addEventListener("resize", function () {
    sizeSvg();
    ensureSvgDefs();
  });
})();

// ===== SAFE AI POPUP =====
window.addEventListener("load", () => {
  const aiPopup = document.getElementById("aiPopup");
  const aiMessage = document.getElementById("aiMessage");
  const aiClose = document.getElementById("aiClose");

  if (!aiPopup || !aiMessage || !aiClose) return;

  const message = "ทุกการโจมตีต้องมีเป้าหมาย...\nแต่ระบบนี้ ไม่มีตัวตนให้โจมตี\nStealth Safety Bank Mobile System กำลังทำงาน";

  let i = 0;

  function typeText(){
    if(i < message.length){
      aiMessage.textContent += message.charAt(i);
      i++;
      setTimeout(typeText, 28);
    }
  }

  setTimeout(() => {
    aiPopup.classList.add("active");
    typeText();
  }, 800);

  aiClose.addEventListener("click", () => {
    aiPopup.classList.remove("active");
  });
});
