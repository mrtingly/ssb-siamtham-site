function normalizeYouTubeUrl(url) {
  if (!url) return "";

  if (url.includes("/embed/")) return url;

  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch?.[1]) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }

  const longMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (longMatch?.[1]) {
    return `https://www.youtube.com/embed/${longMatch[1]}`;
  }

  return url;
}

function getCurrentKey() {
  const key = window.location.hash.replace("#", "").trim();
  return popupData[key] ? key : "ssbmobile";
}

function setVideoSrc(src) {
  const video = document.getElementById("ssbVideo");
  if (!video) return;

  const finalSrc = normalizeYouTubeUrl(src);
  video.src = "";
  setTimeout(() => {
    video.src = finalSrc || "";
  }, 30);
}

function scrollContentTop() {
  const content = document.getElementById("ssbPageContent");
  if (content) content.scrollTop = 0;
  window.scrollTo({ top: 0, behavior: "auto" });
}

function renderNav(activeKey) {
  const nav = document.getElementById("ssbNav");
  if (!nav) return;

  nav.innerHTML = "";

  sectionOrder.forEach((key, index) => {
    const item = popupData[key];
    if (!item) return;

    const btn = document.createElement("a");
    btn.href = `#${key}`;
    btn.className = "popup-pro-nav-btn" + (key === activeKey ? " active" : "");
    btn.textContent = `${index + 1}. ${item.title}`;
    nav.appendChild(btn);
  });

  const orderBtn = document.createElement("a");
  orderBtn.href = "book.html";
  orderBtn.className = "popup-pro-nav-btn popup-pro-nav-order";
  orderBtn.textContent = `${sectionOrder.length + 1}. เริ่มสั่งจอง`;
  nav.appendChild(orderBtn);
}

function renderBadges(list) {
  const el = document.getElementById("ssbBadges");
  if (!el) return;

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
  if (!el) return;

  el.innerHTML = "";
  (list || []).forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    el.appendChild(li);
  });
}

function renderImpacts(list) {
  const el = document.getElementById("ssbImpacts");
  if (!el) return;

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
  if (!el) return;

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
  if (!el) return;

  el.innerHTML = "";

  if (data.next) {
    const nextBtn = document.createElement("a");
    nextBtn.href = `#${data.next}`;
    nextBtn.className = "popup-cta primary";
    nextBtn.textContent = data.nextLabel || "ถัดไป";
    el.appendChild(nextBtn);
  } else {
    const orderBtn = document.createElement("a");
    orderBtn.href = "book.html";
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

  const kicker = document.getElementById("ssbKicker");
  const title = document.getElementById("ssbTitle");
  const subtitle = document.getElementById("ssbSubtitle");
  const lead = document.getElementById("ssbLead");
  const videoNote = document.getElementById("ssbVideoNote");

  if (kicker) kicker.textContent = data.kicker || "";
  if (title) title.textContent = data.title || "";
  if (subtitle) subtitle.textContent = data.subtitle || "";
  if (lead) lead.textContent = data.lead || "";
  if (videoNote) videoNote.textContent = data.videoNote || "";

  setVideoSrc(data.video || "");
  renderNav(key);
  renderBadges(data.badges);
  renderList("ssbFeatures", data.features);
  renderList("ssbUseCases", data.useCases);
  renderImpacts(data.impacts);
  renderRules(data.rules);
  renderActions(data);
  scrollContentTop();

  document.title = `${data.title} | Siam Tham Co.,Ltd.`;
}

window.addEventListener("hashchange", renderPage);

window.addEventListener("DOMContentLoaded", () => {
  const key = window.location.hash.replace("#", "").trim();

  if (!popupData[key]) {
    window.location.hash = "#ssbmobile";
    return;
  }

  renderPage();
});
