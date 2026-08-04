"use strict";
// SBOS V3-5 marker: CMS admin APIs use POST body admin session only.

const SBOS_CMS_API_URL = window.getSbosApiEndpoint ? window.getSbosApiEndpoint() : "";

function cmsEsc(value){
  return String(value === null || value === undefined ? "" : value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
}

function cmsAuth(){
  return {
    admin_id: localStorage.getItem("admin_id") || "",
    admin_session_token: localStorage.getItem("admin_session_token") || ""
  };
}

async function cmsPost(action, payload){
  const auth = cmsAuth();
  if (!auth.admin_id || !auth.admin_session_token) {
    window.location.href = "admin-login.html";
    return { ok:false, message:"Admin session required" };
  }
  const res = await fetch(SBOS_CMS_API_URL, {
    method:"POST",
    body:JSON.stringify(Object.assign({ action }, payload || {}, auth))
  });
  const text = await res.text();
  try { return JSON.parse(text); } catch (error) { return { ok:false, message:text || "Invalid API response" }; }
}

function cmsToast(message, type="ok"){
  const el = document.getElementById("cmsToast");
  if (!el) return;
  el.textContent = message;
  el.className = "cms-toast show " + (type === "err" ? "err" : "");
  setTimeout(() => { el.className = "cms-toast"; }, 2800);
}

function cmsBadge(value){
  const v = String(value || "DRAFT").toUpperCase();
  const badge = document.createElement("span");
  badge.className = "cms-badge " + v.toLowerCase().replace(/[^a-z0-9_-]/g, "");
  badge.textContent = v;
  return badge;
}

function cmsSet(id, value){
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function cmsRows(targetId, rows, cols){
  const target = document.getElementById(targetId);
  if (!target) return;
  if (!rows.length) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = cols.length;
    td.className = "cms-empty";
    td.textContent = "No data";
    tr.appendChild(td);
    target.replaceChildren(tr);
    return;
  }
  const fragment = document.createDocumentFragment();
  rows.forEach(row => {
    const tr = document.createElement("tr");
    cols.forEach(fn => {
      const td = document.createElement("td");
      const value = fn(row);
      if (value instanceof Node) {
        td.appendChild(value);
      } else if (Array.isArray(value)) {
        value.forEach(item => {
          if (item instanceof Node) td.appendChild(item);
        });
      } else {
        td.textContent = String(value === null || value === undefined ? "" : value);
      }
      tr.appendChild(td);
    });
    fragment.appendChild(tr);
  });
  target.replaceChildren(fragment);
}

function cmsActionButtons(contentId){
  const wrap = document.createElement("div");
  wrap.className = "cms-actions";
  const publish = document.createElement("button");
  publish.className = "cms-btn secondary";
  publish.type = "button";
  publish.textContent = "Publish";
  publish.addEventListener("click", () => cmsPublish(contentId));
  const unpublish = document.createElement("button");
  unpublish.className = "cms-btn danger";
  unpublish.type = "button";
  unpublish.textContent = "Unpublish";
  unpublish.addEventListener("click", () => cmsUnpublish(contentId));
  wrap.append(publish, unpublish);
  return wrap;
}

async function cmsLoadDashboard(){
  const data = await cmsPost("cmsAdminDashboard");
  if (!data.ok) throw new Error(data.message || "Unable to load CMS");
  const s = data.summary || {};
  cmsSet("contentsCount", s.contents || 0);
  cmsSet("publishedCount", s.published || 0);
  cmsSet("draftCount", s.draft || 0);
  cmsSet("mediaCount", s.media || 0);
  cmsRows("contentRows", data.recent_content || [], [
    r => r.content_id || "-",
    r => r.content_type || "-",
    r => r.localization?.title || r.content_key || "-",
    r => cmsBadge(r.status),
    r => r.related_entity_id || "-"
  ]);
}

async function cmsLoadContent(type){
  const data = await cmsPost("cmsListContentAdmin", { content_type:type });
  if (!data.ok) throw new Error(data.message || "Unable to load content");
  cmsRows("contentRows", data.contents || [], [
    r => r.content_id || "-",
    r => r.content_type || "-",
    r => r.localization?.title || r.content_key || "-",
    r => r.slug || "-",
    r => cmsBadge(r.status),
    r => cmsActionButtons(r.content_id)
  ]);
}

function cmsContentPayload(form){
  const data = Object.fromEntries(new FormData(form).entries());
  if (document.body.dataset.cmsType && !data.content_type) data.content_type = document.body.dataset.cmsType;
  return data;
}

async function cmsSaveForm(event){
  event.preventDefault();
  const result = await cmsPost("cmsSaveContent", cmsContentPayload(event.currentTarget));
  if (!result.ok) return cmsToast(result.message || "Save failed", "err");
  event.currentTarget.reset();
  cmsToast("Content saved");
  await cmsInit();
}

async function cmsPublish(id){
  const result = await cmsPost("cmsPublishContent", { content_id:id });
  if (!result.ok) return cmsToast(result.message || "Publish failed", "err");
  cmsToast("Published");
  await cmsInit();
}

async function cmsUnpublish(id){
  const result = await cmsPost("cmsUnpublishContent", { content_id:id });
  if (!result.ok) return cmsToast(result.message || "Unpublish failed", "err");
  cmsToast("Unpublished");
  await cmsInit();
}

async function cmsSaveSettingForm(event){
  event.preventDefault();
  const result = await cmsPost("cmsSaveSiteSetting", Object.fromEntries(new FormData(event.currentTarget).entries()));
  if (!result.ok) return cmsToast(result.message || "Setting save failed", "err");
  cmsToast("Setting saved");
}

async function cmsSaveNavForm(event){
  event.preventDefault();
  const result = await cmsPost("cmsSaveNavigationItem", Object.fromEntries(new FormData(event.currentTarget).entries()));
  if (!result.ok) return cmsToast(result.message || "Navigation save failed", "err");
  cmsToast("Navigation saved");
}

async function cmsRegisterMediaForm(event){
  event.preventDefault();
  const result = await cmsPost("cmsRegisterMedia", Object.fromEntries(new FormData(event.currentTarget).entries()));
  if (!result.ok) return cmsToast(result.message || "Media register failed", "err");
  cmsToast("Media registered");
}

async function cmsLoadIntegrity(){
  const data = await cmsPost("cmsIntegrityCheck");
  if (!data.ok) throw new Error(data.message || "Integrity failed");
  cmsRows("integrityRows", data.anomalies || [], [
    r => r.type || "-",
    r => r.content_id || r.slug || "-",
    r => JSON.stringify(r)
  ]);
}

async function cmsLoadAudit(){
  const data = await cmsPost("cmsListAuditLogs", { limit:200 });
  if (!data.ok) throw new Error(data.message || "Audit failed");
  cmsRows("auditRows", data.logs || [], [
    r => r.log_id || "-",
    r => r.action || "-",
    r => r.entity_id || "-",
    r => r.actor_id || "-",
    r => r.created_at || "-"
  ]);
}

async function cmsInit(){
  const page = document.body.dataset.cmsPage || "dashboard";
  try {
    if (page === "dashboard") await cmsLoadDashboard();
    if (page === "content") await cmsLoadContent(document.body.dataset.cmsType || "");
    if (page === "integrity") await cmsLoadIntegrity();
    if (page === "audit") await cmsLoadAudit();
  } catch (error) {
    cmsToast(error.message || "Unable to load CMS", "err");
  }
}

window.cmsPublish = cmsPublish;
window.cmsUnpublish = cmsUnpublish;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("cmsContentForm")?.addEventListener("submit", cmsSaveForm);
  document.getElementById("cmsSettingForm")?.addEventListener("submit", cmsSaveSettingForm);
  document.getElementById("cmsNavForm")?.addEventListener("submit", cmsSaveNavForm);
  document.getElementById("cmsMediaForm")?.addEventListener("submit", cmsRegisterMediaForm);
  document.getElementById("refreshButton")?.addEventListener("click", cmsInit);
  cmsInit();
});
