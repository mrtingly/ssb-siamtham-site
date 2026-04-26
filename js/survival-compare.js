(function () {
  function syncThemeImages() {
    const isLight = document.documentElement.classList.contains("light-mode");

    document.querySelectorAll("img[data-light][data-dark]").forEach((img) => {
      const nextSrc = isLight ? img.dataset.light : img.dataset.dark;
      if (nextSrc && img.getAttribute("src") !== nextSrc) {
        img.setAttribute("src", nextSrc);
      }
    });
  }

  const themeToggle = document.getElementById("themeToggle");

  syncThemeImages();

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const html = document.documentElement;
      const isLight = html.classList.contains("light-mode");

      html.classList.toggle("light-mode", !isLight);
      html.classList.toggle("dark-mode", isLight);
      localStorage.setItem("theme", !isLight ? "light" : "dark");

      syncThemeImages();
    });
  }

  window.addEventListener("pageshow", syncThemeImages);
})();

(function () {
  const clickSound = document.getElementById("clickSound");

  function playClickSound() {
    if (!clickSound) return;

    clickSound.pause();
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
  }

  document.querySelectorAll(".sound-click").forEach((el) => {
    el.addEventListener("click", playClickSound);
  });
})();

(function () {
  const selectScreen = document.getElementById("survivalSelect");
  const selectF22 = document.getElementById("selectF22");
  const showcase = document.getElementById("showcase");
  const survivalBottom = document.getElementById("survivalBottom");
  const backToSelect = document.getElementById("backToSelect");

  if (!selectScreen || !selectF22 || !showcase || !survivalBottom) return;

  selectF22.addEventListener("click", function () {
    selectScreen.hidden = true;
    showcase.hidden = false;
    survivalBottom.hidden = false;

    setTimeout(() => {
      showcase.classList.add("is-open");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 40);
  });

  if (backToSelect) {
    backToSelect.addEventListener("click", function () {
      showcase.classList.remove("is-open");
      showcase.hidden = true;
      survivalBottom.hidden = true;
      selectScreen.hidden = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
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

  const SVG_NS = "http://www.w3.org/2000/svg";

  if (
    !showcase ||
    !logoCore ||
    !beamSvg ||
    !statusBar ||
    !logoMode ||
    !detailMode ||
    !detailClose ||
    !detailKicker ||
    !detailTitle ||
    !detailSubtitle ||
    !detailMeaning ||
    !detailProtection ||
    !detailReason ||
    !detailTags ||
    !attackColumn ||
    !systemColumn
  ) {
    return;
  }

  let activeTimeout = null;
  let radarInterval = null;
  let scanIndex = 0;

  const attackMap = {
    radar: {
      label: "Radar Detection → Stealth + Sensor Fusion",
      targets: ["system-stealth", "system-sensor"],
      detail: {
        kicker: "Attack Detail",
        title: "Radar Detection",
        subtitle: "การตรวจจับและล็อกเป้าด้วยคลื่นเรดาร์",
        meaning:
          "ภัยจากเรดาร์คือการค้นหา ตรวจจับ และสร้างข้อมูลตำแหน่งของเครื่องบิน เพื่อส่งต่อให้ระบบอาวุธล็อกเป้าหมาย",
        protection:
          "F-22 ลดโอกาสถูกเห็นด้วยรูปทรงพรางเรดาร์ วัสดุลดการสะท้อน และใช้ข้อมูลเซ็นเซอร์เพื่อรับรู้ภัยก่อนถูกบีบให้อยู่ในตำแหน่งเสี่ยง",
        reason:
          "หลักสำคัญคือไม่ให้ศัตรูได้ข้อมูลตำแหน่งที่แม่นยำพอจะยิงได้ การอยู่รอดเริ่มตั้งแต่การลดการถูกเห็น",
        tags: ["Stealth Technology", "Sensor Fusion"]
      }
    },

    sam: {
      label: "Surface-to-Air Missile → Stealth + Chaff + Maneuver",
      targets: ["system-stealth", "system-chaff", "system-maneuver"],
      detail: {
        kicker: "Attack Detail",
        title: "Surface-to-Air Missile",
        subtitle: "ขีปนาวุธพื้นสู่อากาศจากระบบป้องกันภัยทางอากาศ",
        meaning:
          "SAM เป็นภัยจากภาคพื้นดินที่อาศัยเรดาร์หรือระบบตรวจจับเพื่อยิงขีปนาวุธขึ้นสกัดเครื่องบิน",
        protection:
          "F-22 ลดโอกาสเข้าเงื่อนไขถูกยิงด้วยสเตลธ์ ถ้าถูกคุกคามจะใช้การหลบหลีก ชาฟฟ์ และการเปลี่ยนตำแหน่งเพื่อทำให้การติดตามยากขึ้น",
        reason:
          "ไม่ใช่แค่หลบหลังถูกยิง แต่ต้องทำให้ระบบภาคพื้นดินจับตำแหน่งได้ยากตั้งแต่ต้น",
        tags: ["Stealth Technology", "Chaff Dispenser", "High-G Maneuver"]
      }
    },

    aam: {
      label: "Air-to-Air Missile → Flare + Chaff + Maneuver",
      targets: ["system-flare", "system-chaff", "system-maneuver"],
      detail: {
        kicker: "Attack Detail",
        title: "Air-to-Air Missile",
        subtitle: "ขีปนาวุธอากาศสู่อากาศจากเครื่องบินฝ่ายตรงข้าม",
        meaning:
          "ภัยจากขีปนาวุธอากาศสู่อากาศเกิดเมื่อฝ่ายตรงข้ามสามารถตรวจจับ เข้าใกล้ หรือล็อกเป้าได้",
        protection:
          "F-22 ใช้ความได้เปรียบจากการเห็นก่อน ยิงก่อน และหากเข้าสู่ช่วงเสี่ยงจะใช้แฟลร์ ชาฟฟ์ และการหลบหลีกเพื่อตัดการติดตาม",
        reason:
          "หลักการคือไม่ปล่อยให้ศัตรูได้โอกาสยิงง่าย และถ้าเกิดการยิง ต้องทำให้ขีปนาวุธติดตามยากที่สุด",
        tags: ["Flare Dispenser", "Chaff Dispenser", "High-G Maneuver"]
      }
    },

    gun: {
      label: "Anti Aircraft Gun → Maneuver + Sensor Fusion",
      targets: ["system-maneuver", "system-sensor"],
      detail: {
        kicker: "Attack Detail",
        title: "Anti Aircraft Gun",
        subtitle: "ปืนต่อต้านอากาศยานในระยะใกล้",
        meaning:
          "ปืนต่อต้านอากาศยานเป็นภัยในระยะใกล้ที่อาศัยตำแหน่ง มุมยิง และการคาดการณ์เส้นทางบิน",
        protection:
          "F-22 ต้องหลีกเลี่ยงการเข้าใกล้พื้นที่เสี่ยง ใช้ข้อมูลเซ็นเซอร์เพื่อรู้ตำแหน่งภัย และใช้การบินเปลี่ยนทิศทางเพื่อลดโอกาสถูกยิง",
        reason:
          "ถ้าระบบล่องหนช่วยลดการเห็นในระยะไกล การหลบหลีกและการไม่เข้าเขตอันตรายคือชั้นเอาตัวรอดในระยะใกล้",
        tags: ["High-G Maneuver", "Sensor Fusion"]
      }
    },

    ir: {
      label: "Visual / IR Tracking → Flare + Maneuver + Sensor Fusion",
      targets: ["system-flare", "system-maneuver", "system-sensor"],
      detail: {
        kicker: "Attack Detail",
        title: "Visual / IR Tracking",
        subtitle: "การตรวจจับด้วยสายตาและอินฟราเรด",
        meaning:
          "ภัยแบบนี้ไม่ได้พึ่งเรดาร์เพียงอย่างเดียว แต่อาศัยการมองเห็น ความร้อน หรือเซ็นเซอร์ติดตามเป้าหมาย",
        protection:
          "F-22 ใช้การรับรู้สถานการณ์ร่วมกับเซ็นเซอร์ ลดการอยู่ในมุมเสี่ยง ใช้แฟลร์หลอกระบบนำความร้อน และหลบหลีกเพื่อตัดการติดตาม",
        reason:
          "สเตลธ์ด้านเรดาร์ไม่ใช่คำตอบทั้งหมด จึงต้องมีชั้นป้องกันต่อภัยจากสายตาและความร้อนด้วย",
        tags: ["Flare Dispenser", "High-G Maneuver", "Sensor Fusion"]
      }
    }
  };

  const systemMap = {
    stealth: {
      kicker: "Defense Detail",
      title: "Stealth Technology",
      subtitle: "เทคโนโลยีลดการตรวจจับ",
      meaning:
        "สเตลธ์คือการลดการสะท้อนและลดสัญญาณที่ทำให้ศัตรูตรวจจับได้ง่าย",
      protection:
        "ช่วยให้ F-22 ถูกค้นพบได้ยากขึ้น โดยเฉพาะก่อนเข้าสู่ช่วงที่ต้องเปิดเผยตัว เช่น การเปิดช่องอาวุธหรือการโจมตี",
      reason:
        "ยิ่งศัตรูเห็นช้าเท่าไร F-22 ยิ่งมีเวลาตัดสินใจและควบคุมจังหวะการรบมากขึ้น",
      tags: ["Low Signature", "First Look", "Exposure Control"]
    },

    flare: {
      kicker: "Defense Detail",
      title: "Flare Dispenser",
      subtitle: "เป้าลวงความร้อน",
      meaning:
        "แฟลร์คือเป้าลวงความร้อนที่ใช้เบี่ยงเบนขีปนาวุธนำวิถีด้วยความร้อน",
      protection:
        "เมื่อมีภัยจาก IR หรือขีปนาวุธนำความร้อน แฟลร์ช่วยสร้างเป้าหมายลวงให้ระบบติดตามสับสน",
      reason:
        "เป็นชั้นป้องกันช่วงท้าย เมื่อเครื่องบินถูกคุกคามแล้ว ต้องเพิ่มโอกาสให้หลุดจากการติดตาม",
      tags: ["IR Decoy", "Heat Signature", "Last Defense"]
    },

    chaff: {
      kicker: "Defense Detail",
      title: "Chaff Dispenser",
      subtitle: "เป้าลวงเรดาร์",
      meaning:
        "ชาฟฟ์คือวัสดุสะท้อนเรดาร์ที่ปล่อยออกมาเพื่อรบกวนหรือเบี่ยงเบนการล็อกเป้าด้วยเรดาร์",
      protection:
        "ใช้เพื่อลดคุณภาพการติดตามของเรดาร์หรือขีปนาวุธที่พึ่งเรดาร์ในการนำวิถี",
      reason:
        "เมื่อถูกจับด้วยเรดาร์ การสร้างสัญญาณรบกวนและเป้าลวงช่วยเพิ่มโอกาสรอด",
      tags: ["Radar Decoy", "Lock Break", "Tracking Disruption"]
    },

    maneuver: {
      kicker: "Defense Detail",
      title: "High-G Maneuver",
      subtitle: "การบินหลบหลีกด้วยแรง G สูง",
      meaning:
        "การหลบหลีกคือการเปลี่ยนทิศทาง ความสูง หรือพลังงานของเครื่องบินเพื่อทำให้การติดตามยากขึ้น",
      protection:
        "F-22 ใช้ความคล่องตัวสูงเพื่อลดโอกาสถูกติดตามต่อเนื่อง โดยเฉพาะเมื่อมีภัยเข้าใกล้",
      reason:
        "ถ้าถูกยิงแล้ว การอยู่นิ่งหรือบินเส้นทางเดิมคือความเสี่ยง การเปลี่ยนจังหวะช่วยทำให้ระบบยิงตามไม่ทัน",
      tags: ["Evade", "Energy Maneuver", "Break Lock"]
    },

    sensor: {
      kicker: "Defense Detail",
      title: "Sensor Fusion",
      subtitle: "รวมข้อมูลเซ็นเซอร์เพื่อรับรู้ภัย",
      meaning:
        "Sensor Fusion คือการรวมข้อมูลจากหลายแหล่งให้กลายเป็นภาพสนามรบที่เข้าใจง่ายและเร็วขึ้น",
      protection:
        "ช่วยให้ F-22 รู้ภัยก่อน ตัดสินใจก่อน และเลือกเส้นทางหรือวิธีตอบสนองได้ดีขึ้น",
      reason:
        "การเอาตัวรอดไม่ได้อยู่ที่โล่ป้องกันอย่างเดียว แต่อยู่ที่การรู้ก่อนและตัดสินใจก่อน",
      tags: ["Detect", "Decide", "Situational Awareness"]
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

  function ensureSvgDefs() {
    beamSvg.innerHTML = "";

    const defs = document.createElementNS(SVG_NS, "defs");

    const inboundGradient = document.createElementNS(SVG_NS, "linearGradient");
    inboundGradient.setAttribute("id", "beamInboundGradient");
    inboundGradient.setAttribute("x1", "0%");
    inboundGradient.setAttribute("y1", "0%");
    inboundGradient.setAttribute("x2", "100%");
    inboundGradient.setAttribute("y2", "0%");

    [
      ["0%", "rgba(255,70,70,0)"],
      ["35%", "#ff4545"],
      ["100%", "#ffffff"]
    ].forEach(([offset, color]) => {
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

    [
      ["0%", "#ffffff"],
      ["42%", "rgba(104,244,255,.96)"],
      ["100%", "rgba(119,216,255,0)"]
    ].forEach(([offset, color]) => {
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
    if (!radarLayer || showcase.hidden) return;

    const dots = Array.from(radarLayer.querySelectorAll(".logo-scan-dot"));
    if (!dots.length) return;

    dots.forEach((dot) => dot.classList.remove("is-hit"));

    const current = dots[scanIndex % dots.length];
    current.classList.add("is-hit");

    setTimeout(() => current.classList.remove("is-hit"), 420);
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
  }

  function hideLogoMode() {
    logoMode.classList.add("is-hidden");
  }

  function showLogoMode() {
    logoMode.classList.remove("is-hidden");
  }

  function openDetail(payload) {
    if (!payload) return;

    hideLogoMode();

    detailKicker.textContent = payload.kicker || "";
    detailTitle.textContent = payload.title || "";
    detailSubtitle.textContent = payload.subtitle || "";
    detailMeaning.textContent = payload.meaning || "";
    detailProtection.textContent = payload.protection || "";
    detailReason.textContent = payload.reason || "";

    detailTags.innerHTML = "";
    (payload.tags || []).forEach((tag) => {
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

    if (!silent) {
      statusBar.textContent = "กดไอคอนการโจมตีด้านซ้าย เพื่อดูแสงวิ่งไปยังระบบเอาตัวรอด";
    }
  }

  function clearStates() {
    clearTimeout(activeTimeout);
    ensureSvgDefs();

    logoCore.classList.remove("is-burst");

    document.querySelectorAll(".icon-card").forEach((el) => {
      el.classList.remove("is-source", "is-target");
    });
  }

  function getCenter(el, parentRect) {
    const r = el.getBoundingClientRect();

    return {
      x: r.left - parentRect.left + r.width / 2,
      y: r.top - parentRect.top + r.height / 2
    };
  }

  function getRelayPoint(parentRect) {
    const logoRect = logoCore.getBoundingClientRect();

    return {
      x: logoRect.left - parentRect.left + logoRect.width / 2,
      y: logoRect.top - parentRect.top + logoRect.height / 2
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
      statusBar.textContent = "กดไอคอนการโจมตีด้านซ้าย เพื่อดูแสงวิ่งไปยังระบบเอาตัวรอด";
    }, 5200);
  }

function runAttackFlow(attackKey, sourceCard) {
  const config = attackMap[attackKey];
  if (!config || !sourceCard) return;

  closeDetail(true);
  clearStates();
  showLogoMode();

  let round = 0;
  const maxRound = 3;

  function fireOnce() {
    clearStates();
    sizeSvg();
    ensureSvgDefs();

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
    }, 260);

    round += 1;

    if (round < maxRound) {
      activeTimeout = setTimeout(fireOnce, 900);
    } else {
      activeTimeout = setTimeout(() => {
        clearStates();
        statusBar.textContent =
          "กดไอคอนการโจมตีด้านซ้าย เพื่อดูแสงวิ่งไปยังระบบเอาตัวรอด";
      }, 1400);
    }
  }

  fireOnce();
}

  function runSystemFocus(systemKey, sourceCard) {
    if (!sourceCard) return;

    closeDetail(true);
    clearStates();
    showLogoMode();

    sourceCard.classList.add("is-target");
    statusBar.textContent = "Defense Focus → " + (systemMap[systemKey]?.title || "System");

    activeTimeout = setTimeout(() => {
      sourceCard.classList.remove("is-target");
      statusBar.textContent = "กดไอคอนการโจมตีด้านซ้าย เพื่อดูแสงวิ่งไปยังระบบเอาตัวรอด";
    }, 2200);
  }

  ensureSvgDefs();
  sizeSvg();
  buildRadarDots();
  startRadarLoop();

  logoCore.addEventListener("click", function () {
    closeDetail();
    statusBar.textContent = "F-22 Survival Core พร้อมทำงาน";
    logoCore.classList.add("is-burst");

    setTimeout(() => {
      logoCore.classList.remove("is-burst");
    }, 900);
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
      clearStates();
      openDetail(attackMap[attackKey]?.detail);
      statusBar.textContent = (attackMap[attackKey]?.detail?.title || "Detail") + " • เปิดรายละเอียดแล้ว";
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
      clearStates();
      openDetail(systemMap[systemKey]);
      statusBar.textContent = (systemMap[systemKey]?.title || "Detail") + " • เปิดรายละเอียดแล้ว";
    });
  });

  detailClose.addEventListener("click", function (event) {
    event.preventDefault();
    closeDetail();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && detailMode.classList.contains("is-open")) {
      closeDetail();
    }
  });

  window.addEventListener("resize", function () {
    sizeSvg();
    ensureSvgDefs();
    buildRadarDots();
  });
})();
