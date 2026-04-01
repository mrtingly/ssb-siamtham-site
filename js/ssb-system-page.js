const sectionOrder = ["ssbmobile", "ssb", "sb", "flare", "usage", "sbpremium", "custom"];

function getCurrentKey() {
  const key = window.location.hash.replace("#", "").trim();
  return popupData[key] ? key : "ssbmobile";
}

function scrollContentTop() {
  const content = document.getElementById("ssbPageContent");
  if (content) content.scrollTop = 0;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderNav(activeKey) {
  const nav = document.getElementById("ssbNav");
  nav.innerHTML = "";

  sectionOrder.forEach((key) => {
    const item = popupData[key];
    if (!item) return;

    const btn = document.createElement("a");
    btn.href = `#${key}`;
    btn.className = "popup-pro-nav-btn" + (key === activeKey ? " active" : "");
    btn.textContent = item.title || key;
    nav.appendChild(btn);
  });
}

function renderBadges(list) {
  const el = document.getElementById("ssbBadges");
  el.innerHTML = "";

  (list || []).forEach((text) => {
    const span = document.createElement("span");
    span.className = "popup-badge";
    span.textContent = text;
    el.appendChild(span);
  });
}

function renderList(targetId, list) {
  const el = document.getElementById(targetId);
  el.innerHTML = "";

  (list || []).forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    el.appendChild(li);
  });
}

function renderImpacts(list) {
  const el = document.getElementById("ssbImpacts");
  el.innerHTML = "";

  (list || []).forEach((item) => {
    const card = document.createElement("div");
    card.className = "impact-card";

    const value = document.createElement("div");
    value.className = "impact-value";
    value.textContent = item.value || "";

    const label = document.createElement("div");
    label.className = "impact-label";
    label.textContent = item.label || "";

    card.appendChild(value);
    card.appendChild(label);
    el.appendChild(card);
  });
}

function renderRules(list) {
  const el = document.getElementById("ssbRules");
  el.innerHTML = "";

  (list || []).forEach((text) => {
    const div = document.createElement("div");
    div.className = "popup-pro-rule-line";
    div.textContent = text;
    el.appendChild(div);
  });
}

function renderActions(data) {
  const el = document.getElementById("ssbActions");
  el.innerHTML = "";

  if (data.next) {
    const nextBtn = document.createElement("a");
    nextBtn.href = `#${data.next}`;
    nextBtn.className = "popup-cta primary";
    nextBtn.textContent = data.nextLabel || "ถัดไป";
    el.appendChild(nextBtn);
  } else {
    const orderBtn = document.createElement("a");
    orderBtn.href = "configurator.html";
    orderBtn.className = "popup-cta primary";
    orderBtn.textContent = data.nextLabel || "เริ่มสั่งจอง";
    el.appendChild(orderBtn);
  }

  const homeBtn = document.createElement("a");
  homeBtn.href = "index.html";
  homeBtn.className = "popup-cta secondary";
  homeBtn.textContent = "กลับหน้าแรก";
  el.appendChild(homeBtn);
}

function renderPage() {
  const key = getCurrentKey();
  const data = popupData[key];
  if (!data) return;

  const video = document.getElementById("ssbVideo");

  document.getElementById("ssbKicker").textContent = data.kicker || "";
  document.getElementById("ssbTitle").textContent = data.title || "";
  document.getElementById("ssbSubtitle").textContent = data.subtitle || "";
  document.getElementById("ssbLead").textContent = data.lead || "";
  document.getElementById("ssbVideoNote").textContent = data.videoNote || "";

  if (video) {
    video.src = data.video || "";
  }

  renderNav(key);
  renderBadges(data.badges);
  renderList("ssbFeatures", data.features);
  renderList("ssbUseCases", data.useCases);
  renderImpacts(data.impacts);
  renderRules(data.rules);
  renderActions(data);

  scrollContentTop();
}

window.addEventListener("hashchange", renderPage);

window.addEventListener("DOMContentLoaded", () => {
  if (!window.location.hash || !popupData[window.location.hash.replace("#", "").trim()]) {
    window.location.hash = "#ssbmobile";
  } else {
    renderPage();
  }
});
