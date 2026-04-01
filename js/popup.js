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

    const companyOpen = companyPopup?.style.display === "flex";

    if (!companyOpen) {
      lockBodyScroll(false);
    }

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }, 180);
}

function openCompanyPopup() {
  openPopup(companyPopup);
}

function closeCompanyPopup() {
  closePopup(companyPopup);
}

function buildEnergyLines() {
  if (!techHero || !logoMenuButton) return;

  const cx = 500;
  const cy = 350;

  const positions = [
    { x: 260, y: 240 },
    { x: 740, y: 240 },
    { x: 260, y: 460 },
    { x: 740, y: 460 }
  ];

  positions.forEach((pos, index) => {
    const bend = pos.x < cx ? 120 : -120;

    const d = `
      M ${pos.x} ${pos.y}
      C ${pos.x + bend} ${pos.y},
        ${cx - bend} ${cy},
        ${cx} ${cy}
    `;

    const line = document.getElementById(`line${index + 1}`);
    const run = document.getElementById(`run${index + 1}`);

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
