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
  const beamLayer = document.getElementById("beamLayer");
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

  function openSystem() {
    systemOpened = true;
    showcase.classList.add("is-open");
    attackColumn.classList.add("ready");
    systemColumn.classList.add("ready");
    statusBar.textContent = "กดไอคอน 1 ครั้งเพื่อดูการป้องกัน หรือกด 2 ครั้งเพื่ออ่านรายละเอียด";
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

  function closeDetail() {
    detailMode.classList.remove("is-open");
    detailMode.setAttribute("aria-hidden", "true");
    showLogoMode();
    statusBar.textContent = "กดไอคอน 1 ครั้งเพื่อดูการป้องกัน หรือกด 2 ครั้งเพื่ออ่านรายละเอียด";
  }

  function clearStates() {
    clearTimeout(activeTimeout);
    beamLayer.innerHTML = "";
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

  function createBeam(from, to, type) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.sqrt((dx * dx) + (dy * dy));
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    const beam = document.createElement("span");
    beam.className = "beam " + type;
    beam.style.setProperty("--x1", from.x + "px");
    beam.style.setProperty("--y1", from.y + "px");
    beam.style.setProperty("--length", length + "px");
    beam.style.setProperty("--angle", angle + "deg");
    beamLayer.appendChild(beam);

    requestAnimationFrame(() => {
      beam.classList.add("show");
    });
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
      beamLayer.innerHTML = "";
      document.querySelectorAll(".icon-card.is-source").forEach(el => {
        el.classList.remove("is-source");
      });
      statusBar.textContent = "กดไอคอน 1 ครั้งเพื่อดูการป้องกัน หรือกด 2 ครั้งเพื่ออ่านรายละเอียด";
    }, 5200);
  }

  function runAttackFlow(attackKey, sourceCard) {
    const config = attackMap[attackKey];
    if (!config || !systemOpened) return;

    detailMode.classList.remove("is-open");
    detailMode.setAttribute("aria-hidden", "true");
    showLogoMode();
    clearStates();

    const parentRect = showcase.getBoundingClientRect();
    const sourceCenter = getCenter(sourceCard, parentRect);
    const logoCenter = getCenter(logoCore, parentRect);

    sourceCard.classList.add("is-source");
    logoCore.classList.add("is-burst");
    statusBar.textContent = config.label;

    createBeam(sourceCenter, logoCenter, "inbound");

    setTimeout(() => {
      config.targets.forEach((id) => {
        const targetCard = document.getElementById(id);
        if (!targetCard) return;
        const targetCenter = getCenter(targetCard, parentRect);
        createBeam(logoCenter, targetCenter, "outbound");
      });
    }, 420);

    setTimeout(() => {
      blinkTargets(config.targets);
    }, 850);
  }

  function runSystemFocus(systemKey, sourceCard) {
    if (!systemOpened) return;
    clearStates();
    detailMode.classList.remove("is-open");
    detailMode.setAttribute("aria-hidden", "true");
    showLogoMode();

    sourceCard.classList.add("is-target");
    statusBar.textContent = "System Focus → " + (systemMap[systemKey]?.title || "System");

    activeTimeout = setTimeout(() => {
      sourceCard.classList.remove("is-target");
      statusBar.textContent = "กดไอคอน 1 ครั้งเพื่อดูการป้องกัน หรือกด 2 ครั้งเพื่ออ่านรายละเอียด";
    }, 2200);
  }

  logoCore.addEventListener("click", function () {
    if (!systemOpened) {
      openSystem();
      return;
    }

    if (detailMode.classList.contains("is-open")) {
      closeDetail();
      return;
    }

    logoCore.classList.add("is-burst");
    statusBar.textContent = "ระบบพร้อมใช้งานแล้ว เลือกไอคอนได้เลย";
    setTimeout(() => {
      logoCore.classList.remove("is-burst");
    }, 600);
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

  detailClose.addEventListener("click", closeDetail);

  window.addEventListener("resize", function () {
    beamLayer.innerHTML = "";
  });
})();
