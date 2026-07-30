"use strict";

const SBOS_ORG_API_URL = "https://script.google.com/macros/s/AKfycbyKhWE-_SuKreCPyD4tsNmqNMQz2hZ8hQtrckk92mh8rszh1jaNEeuuFBGsPOLKfAziNg/exec";

function orgEsc(value){
  return String(value === null || value === undefined ? "" : value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
}

function orgMoney(value){
  return "฿" + Number(value || 0).toLocaleString("th-TH", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function orgAdminAuth(){
  return {
    admin_id: localStorage.getItem("admin_id") || "",
    admin_session_token: localStorage.getItem("admin_session_token") || ""
  };
}

function orgAgentAuth(){
  return {
    agent_id: localStorage.getItem("agent_id") || localStorage.getItem("ssb_agent_id") || "",
    agent_session_token: localStorage.getItem("agent_session_token") || ""
  };
}

function orgAuthPayload(){
  const mode = document.body.dataset.orgRole || "admin";
  return mode === "admin" ? orgAdminAuth() : orgAgentAuth();
}

async function orgPost(action, payload){
  const response = await fetch(SBOS_ORG_API_URL, {
    method: "POST",
    body: JSON.stringify(Object.assign({ action }, payload || {}, orgAuthPayload()))
  });
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (error) {
    return { ok: false, message: text || "Invalid API response" };
  }
}

function orgToast(message, type = "ok"){
  const toast = document.getElementById("orgToast");
  if (!toast) return;
  toast.textContent = message;
  toast.className = "org-toast show " + (type === "err" ? "err" : "");
  setTimeout(() => { toast.className = "org-toast"; }, 2800);
}

function badge(value){
  const normalized = String(value || "ACTIVE").toUpperCase();
  return `<span class="org-badge ${orgEsc(normalized.toLowerCase())}">${orgEsc(normalized)}</span>`;
}

function setText(id, value){
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function renderRows(targetId, rows, columns){
  const target = document.getElementById(targetId);
  if (!target) return;
  if (!rows.length) {
    target.innerHTML = `<tr><td colspan="${columns.length}" class="org-empty">No data</td></tr>`;
    return;
  }
  target.innerHTML = rows.map(row => `<tr>${columns.map(col => `<td>${col(row)}</td>`).join("")}</tr>`).join("");
}

async function loadOrgDashboard(){
  const data = await orgPost("getOrganizationDashboard");
  if (!data.ok) throw new Error(data.message || "Unable to load organization dashboard");
  const summary = data.summary || {};
  const performance = data.performance || {};
  setText("areasCount", summary.areas || 0);
  setText("teamsCount", summary.teams || 0);
  setText("assignmentsCount", summary.assignments || 0);
  setText("unassignedCount", summary.unassigned_agents || 0);
  setText("revenueCount", orgMoney(performance.revenue || 0));
  setText("ordersCount", performance.order_count || 0);
  renderRows("areasRows", data.areas || [], [
    r => orgEsc(r.area_id), r => orgEsc(r.area_name), r => orgEsc(r.area_code || "-"), r => badge(r.status)
  ]);
  renderRows("teamsRows", data.teams || [], [
    r => orgEsc(r.team_id), r => orgEsc(r.team_name), r => orgEsc(r.area_name || r.area_id || "-"), r => orgEsc(r.primary_team_manager_id || "-"), r => badge(r.status)
  ]);
  renderRows("unassignedRows", data.unassigned_agents || [], [
    r => orgEsc(r.agent_id), r => orgEsc([r.first_name, r.last_name].filter(Boolean).join(" ") || "-"), r => orgEsc(r.email || "-"), r => badge(r.status)
  ]);
}

async function loadAreas(){
  const data = await orgPost("listOrganizationAreas");
  if (!data.ok) throw new Error(data.message || "Unable to load areas");
  renderRows("areasRows", data.areas || [], [
    r => orgEsc(r.area_id), r => orgEsc(r.area_name), r => orgEsc(r.area_code || "-"), r => orgEsc(r.description || "-"), r => badge(r.status)
  ]);
}

async function saveAreaForm(event){
  event.preventDefault();
  const form = event.currentTarget;
  const result = await orgPost("saveOrganizationArea", Object.fromEntries(new FormData(form).entries()));
  if (!result.ok) return orgToast(result.message || "Save failed", "err");
  form.reset();
  orgToast("Area saved");
  await loadAreas();
}

async function loadTeams(){
  const [teams, areas] = await Promise.all([orgPost("listOrganizationTeams"), orgPost("listOrganizationAreas")]);
  if (!teams.ok) throw new Error(teams.message || "Unable to load teams");
  fillSelect("areaSelect", (areas.areas || []).map(a => [a.area_id, a.area_name]));
  renderRows("teamsRows", teams.teams || [], [
    r => orgEsc(r.team_id), r => orgEsc(r.team_name), r => orgEsc(r.team_code || "-"), r => orgEsc(r.area_name || r.area_id || "-"), r => orgEsc(r.primary_team_manager_id || "-"), r => badge(r.status)
  ]);
}

async function saveTeamForm(event){
  event.preventDefault();
  const form = event.currentTarget;
  const result = await orgPost("saveOrganizationTeam", Object.fromEntries(new FormData(form).entries()));
  if (!result.ok) return orgToast(result.message || "Save failed", "err");
  form.reset();
  orgToast("Team saved");
  await loadTeams();
}

function fillSelect(id, items){
  const select = document.getElementById(id);
  if (!select) return;
  const current = select.value;
  select.innerHTML = `<option value="">Select</option>` + items.map(([value, label]) => `<option value="${orgEsc(value)}">${orgEsc(label || value)}</option>`).join("");
  select.value = current;
}

async function loadAssignments(){
  const [agents, teams, areas, assignments] = await Promise.all([
    orgPost("listAgents"),
    orgPost("listOrganizationTeams"),
    orgPost("listOrganizationAreas"),
    orgPost("listOrganizationAssignments")
  ]);
  if (!assignments.ok) throw new Error(assignments.message || "Unable to load assignments");
  fillSelect("agentSelect", (agents.agents || []).map(a => [a.agent_id, `${a.agent_id} ${a.first_name || ""} ${a.last_name || ""}`.trim()]));
  fillSelect("managerSelect", (agents.agents || []).map(a => [a.agent_id, `${a.agent_id} ${a.first_name || ""} ${a.last_name || ""}`.trim()]));
  fillSelect("teamSelect", (teams.teams || []).map(t => [t.team_id, t.team_name]));
  fillSelect("managerTeamSelect", (teams.teams || []).map(t => [t.team_id, t.team_name]));
  fillSelect("areaSelect", (areas.areas || []).map(a => [a.area_id, a.area_name]));
  renderRows("assignmentRows", assignments.assignments || [], [
    r => orgEsc(r.assignment_id), r => orgEsc(r.assignment_type), r => orgEsc(r.subject_agent_id), r => orgEsc(r.role), r => orgEsc(r.area_id || "-"), r => orgEsc(r.team_id || "-"), r => badge(r.status)
  ]);
}

async function assignAgentForm(event){
  event.preventDefault();
  const result = await orgPost("assignAgentToTeam", Object.fromEntries(new FormData(event.currentTarget).entries()));
  if (!result.ok) return orgToast(result.message || "Assignment failed", "err");
  orgToast(result.duplicate ? "Assignment already active" : "Agent assigned");
  await loadAssignments();
}

async function assignManagerForm(event){
  event.preventDefault();
  const result = await orgPost("assignManagerRole", Object.fromEntries(new FormData(event.currentTarget).entries()));
  if (!result.ok) return orgToast(result.message || "Role assignment failed", "err");
  orgToast("Manager role assigned");
  await loadAssignments();
}

async function loadManagerDashboard(action){
  const data = await orgPost(action);
  if (!data.ok) throw new Error(data.message || "Unable to load manager dashboard");
  const perf = data.performance || {};
  setText("agentCount", perf.agent_count || 0);
  setText("orderCount", perf.order_count || 0);
  setText("revenueCount", orgMoney(perf.revenue || 0));
  setText("followupCount", perf.open_followups || 0);
  renderRows("agentsRows", data.agents || [], [
    r => orgEsc(r.agent_id), r => orgEsc([r.first_name, r.last_name].filter(Boolean).join(" ") || "-"), r => orgEsc(r.team_name || "-"), r => orgEsc(r.area_name || "-"), r => badge(r.status)
  ]);
  renderRows("ordersRows", data.orders || [], [
    r => orgEsc(r.order_id), r => orgEsc(r.customer_name || "-"), r => orgEsc(r.owner_agent_name || r.owner_agent_id || "-"), r => orgMoney(r.grand_total || r.total || 0), r => badge(r.status)
  ]);
  renderRows("followupRows", data.followups || [], [
    r => orgEsc(r.followup_id), r => orgEsc(r.title), r => orgEsc(r.owner_agent_id), r => orgEsc(r.due_at || "-"), r => badge(r.status)
  ]);
}

async function loadAgentTeam(){
  const [agents, targets, followups] = await Promise.all([
    orgPost("listScopedAgents"),
    orgPost("listSalesTargets"),
    orgPost("listCustomerFollowups")
  ]);
  if (!agents.ok) throw new Error(agents.message || "Unable to load team information");
  const me = (agents.agents || [])[0] || {};
  setText("agentCount", agents.total || 0);
  setText("orderCount", (targets.targets || []).length);
  setText("revenueCount", me.team_name || "-");
  setText("followupCount", (followups.followups || []).filter(f => f.status !== "COMPLETED").length);
  renderRows("agentsRows", agents.agents || [], [
    r => orgEsc(r.agent_id), r => orgEsc([r.first_name, r.last_name].filter(Boolean).join(" ") || "-"), r => orgEsc(r.team_name || "Unassigned"), r => orgEsc(r.area_name || "-"), r => badge(r.status)
  ]);
  renderRows("followupRows", followups.followups || [], [
    r => orgEsc(r.followup_id), r => orgEsc(r.title), r => orgEsc(r.owner_agent_id), r => orgEsc(r.due_at || "-"), r => badge(r.status)
  ]);
}

async function loadTargets(){
  const [targets, teams, areas, agents] = await Promise.all([orgPost("listSalesTargets"), orgPost("listOrganizationTeams"), orgPost("listOrganizationAreas"), orgPost("listAgents")]);
  fillSelect("targetTeam", (teams.teams || []).map(t => [t.team_id, t.team_name]));
  fillSelect("targetArea", (areas.areas || []).map(a => [a.area_id, a.area_name]));
  fillSelect("targetAgent", (agents.agents || []).map(a => [a.agent_id, `${a.agent_id} ${a.first_name || ""}`]));
  renderRows("targetRows", targets.targets || [], [
    r => orgEsc(r.target_id), r => orgEsc(r.target_type), r => orgEsc(r.period), r => orgEsc(r.agent_id || r.team_id || r.area_id || "-"), r => orgEsc(r.target_orders), r => orgMoney(r.target_revenue), r => badge(r.status)
  ]);
}

async function saveTargetForm(event){
  event.preventDefault();
  const result = await orgPost("saveSalesTarget", Object.fromEntries(new FormData(event.currentTarget).entries()));
  if (!result.ok) return orgToast(result.message || "Target save failed", "err");
  orgToast("Target saved");
  await loadTargets();
}

async function loadFollowups(){
  const data = await orgPost("listCustomerFollowups");
  if (!data.ok) throw new Error(data.message || "Unable to load follow-ups");
  renderRows("followupRows", data.followups || [], [
    r => orgEsc(r.followup_id), r => orgEsc(r.title), r => orgEsc(r.owner_agent_id), r => orgEsc(r.customer_id || r.order_id || "-"), r => orgEsc(r.due_at || "-"), r => badge(r.status), r => r.status === "COMPLETED" ? "-" : `<button class="org-btn secondary" type="button" onclick="completeFollowup('${orgEsc(r.followup_id)}')">Complete</button>`
  ]);
}

async function saveFollowupForm(event){
  event.preventDefault();
  const result = await orgPost("saveCustomerFollowup", Object.fromEntries(new FormData(event.currentTarget).entries()));
  if (!result.ok) return orgToast(result.message || "Follow-up save failed", "err");
  event.currentTarget.reset();
  orgToast("Follow-up saved");
  await loadFollowups();
}

async function completeFollowup(id){
  const result = await orgPost("completeCustomerFollowup", { followup_id: id });
  if (!result.ok) return orgToast(result.message || "Complete failed", "err");
  orgToast("Follow-up completed");
  await loadFollowups();
}

window.completeFollowup = completeFollowup;

async function initOrganizationPage(){
  const page = document.body.dataset.orgPage;
  try {
    if (page === "dashboard") await loadOrgDashboard();
    if (page === "areas") await loadAreas();
    if (page === "teams") await loadTeams();
    if (page === "assignments") await loadAssignments();
    if (page === "team-manager") await loadManagerDashboard("getTeamManagerDashboard");
    if (page === "area-manager") await loadManagerDashboard("getAreaManagerDashboard");
    if (page === "agent-team") await loadAgentTeam();
    if (page === "targets") await loadTargets();
    if (page === "followups") await loadFollowups();
    if (page === "performance") {
      const action = document.body.dataset.orgRole === "area" ? "getAreaManagerDashboard" : document.body.dataset.orgRole === "team" ? "getTeamManagerDashboard" : "getOrganizationDashboard";
      await loadManagerDashboard(action === "getOrganizationDashboard" ? "getTeamManagerDashboard" : action).catch(async () => {
        const data = await orgPost("getOrganizationPerformance");
        if (data.ok) {
          const perf = data.performance || {};
          setText("agentCount", perf.agent_count || 0);
          setText("orderCount", perf.order_count || 0);
          setText("revenueCount", orgMoney(perf.revenue || 0));
          setText("followupCount", perf.open_followups || 0);
        }
      });
    }
  } catch (error) {
    orgToast(error.message || "Unable to load page", "err");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("areaForm")?.addEventListener("submit", saveAreaForm);
  document.getElementById("teamForm")?.addEventListener("submit", saveTeamForm);
  document.getElementById("agentAssignForm")?.addEventListener("submit", assignAgentForm);
  document.getElementById("managerAssignForm")?.addEventListener("submit", assignManagerForm);
  document.getElementById("targetForm")?.addEventListener("submit", saveTargetForm);
  document.getElementById("followupForm")?.addEventListener("submit", saveFollowupForm);
  document.getElementById("refreshButton")?.addEventListener("click", initOrganizationPage);
  initOrganizationPage();
});
