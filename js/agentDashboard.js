const el = (id) => document.getElementById(id);

const raw = localStorage.getItem("ssb_agent_session");
if (!raw) {
  window.location.href = "agent-login.html";
}

const agent = raw ? JSON.parse(raw) : null;

el("agentInfo").innerHTML = `
  <div><b>Agent Code:</b> ${agent.agent_code || "-"}</div>
  <div><b>Name:</b> ${agent.agent_name || "-"}</div>
  <div><b>Phone:</b> ${agent.phone || "-"}</div>
  <div><b>Commission Rate:</b> ${agent.commission_rate || "-"}</div>
  <div><b>Status:</b> ${agent.status || "-"}</div>
`;

el("btnLogout").addEventListener("click", () => {
  localStorage.removeItem("ssb_agent_session");
  window.location.href = "agent-login.html";
});

