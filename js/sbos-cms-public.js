"use strict";
// SBOS V3-5 marker: public CMS renderer reads published content without admin token.

const SBOS_CMS_PUBLIC_API = "https://script.google.com/macros/s/AKfycbyKhWE-_SuKreCPyD4tsNmqNMQz2hZ8hQtrckk92mh8rszh1jaNEeuuFBGsPOLKfAziNg/exec";

async function cmsPublicGet(action, params = {}) {
  const query = new URLSearchParams(Object.assign({ action }, params));
  const res = await fetch(SBOS_CMS_PUBLIC_API + "?" + query.toString(), { cache: "no-store" });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (error) {
    return { ok: false, message: text || "Invalid CMS response" };
  }
}

function cmsLocale() {
  try {
    return localStorage.getItem("sbos_language") || "th";
  } catch (error) {
    return "th";
  }
}

function cmsText(value, fallback = "") {
  return String(value === null || value === undefined || value === "" ? fallback : value);
}

function cmsSafeLink(value) {
  const raw = cmsText(value, "#").trim();
  if (!raw || raw === "#") return "#";
  if (/^(https?:\/\/|mailto:|tel:|\/|[a-z0-9._-]+\.html)/i.test(raw)) return raw;
  return "#";
}

function cmsPublicCard(item) {
  const content = item.cms_content || item;
  const localization = content.localization || item.localization || {};
  const article = document.createElement("article");
  article.className = "cms-public-card";

  const title = document.createElement("h3");
  title.textContent = cmsText(localization.title || content.content_key || item.model, "-");
  article.appendChild(title);

  const summaryText = localization.summary || localization.subtitle || content.availability_message || item.collection || "";
  if (summaryText) {
    const summary = document.createElement("p");
    summary.textContent = cmsText(summaryText);
    article.appendChild(summary);
  }

  const cta = localization.cta_label || "View details";
  const href = cmsSafeLink(localization.cta_url || content.slug || "agent-products.html");
  if (href !== "#") {
    const link = document.createElement("a");
    link.href = href;
    link.textContent = cmsText(cta, "View details");
    article.appendChild(link);
  }

  return article;
}

function cmsRowsFromResponse(action, data) {
  if (action === "cmsPublicBundle") {
    return []
      .concat(data.banners || [])
      .concat(data.promotions || [])
      .concat(data.products || [])
      .concat(data.faq || [])
      .concat(data.articles || []);
  }
  if (Array.isArray(data.products)) return data.products;
  if (Array.isArray(data.collections)) return data.collections;
  if (Array.isArray(data.promotions)) return data.promotions;
  if (Array.isArray(data.banners)) return data.banners;
  if (Array.isArray(data.faq)) return data.faq;
  if (Array.isArray(data.articles)) return data.articles;
  if (data.content) return [data.content];
  return [];
}

async function renderCmsPublic() {
  const targets = Array.from(document.querySelectorAll("[data-cms-public]"));
  if (!targets.length) return;

  await Promise.all(targets.map(async target => {
    const type = target.dataset.cmsPublic || "";
    const action = target.dataset.cmsAction || "cmsPublicBundle";
    const data = await cmsPublicGet(action, { locale: cmsLocale(), content_type: type });
    if (!data || !data.ok) return;

    const bar = document.querySelector("[data-cms-announcement]");
    if (bar && data.settings && data.settings.announcement_bar) {
      bar.textContent = cmsText(data.settings.announcement_bar);
      bar.hidden = false;
    }

    const rows = cmsRowsFromResponse(action, data);
    if (!rows.length) return;

    const fragment = document.createDocumentFragment();
    rows.forEach(item => fragment.appendChild(cmsPublicCard(item)));
    target.replaceChildren(fragment);
  }));
}

document.addEventListener("DOMContentLoaded", () => {
  renderCmsPublic().catch(() => {});
});
