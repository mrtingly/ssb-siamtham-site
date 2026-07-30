function logout(){
  [
    "agent_id",
    "agent_name",
    "agent_role",
    "agent_status",
    "agent_session_token",
    "agent_session_expires_at",
    "ssb_agent_id",
    "ssb_current_agent_v1",
    "ssb_agent_session",
    "ssb_agent_session_v1"
  ].forEach(key => localStorage.removeItem(key));

  window.location.href = "agent-login.html";
}

function adminLogout(){
  localStorage.removeItem("admin_id");
  localStorage.removeItem("admin_name");
  localStorage.removeItem("admin_role");
  localStorage.removeItem("admin_session_token");
  localStorage.removeItem("admin_session_expires_at");

  window.location.href = "admin-login.html";
}
