function sbosApiUrl(){
  return "https://script.google.com/macros/s/AKfycbyKhWE-_SuKreCPyD4tsNmqNMQz2hZ8hQtrckk92mh8rszh1jaNEeuuFBGsPOLKfAziNg/exec";
}

async function postLogout(payload){
  try {
    await fetch(sbosApiUrl(), {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      keepalive: true
    });
  } catch (error) {}
}

async function logout(){
  const agentId = localStorage.getItem("agent_id") || localStorage.getItem("ssb_agent_id") || localStorage.getItem("ssb_current_agent_v1") || "";
  const token = localStorage.getItem("agent_session_token") || "";

  if (agentId && token) {
    await postLogout({
      action: "logoutAgent",
      agent_id: agentId,
      agent_session_token: token
    });
  }

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

async function adminLogout(){
  const adminId = localStorage.getItem("admin_id") || "";
  const token = localStorage.getItem("admin_session_token") || "";

  if (adminId && token) {
    await postLogout({
      action: "logoutAdmin",
      admin_id: adminId,
      admin_session_token: token
    });
  }

  localStorage.removeItem("admin_id");
  localStorage.removeItem("admin_name");
  localStorage.removeItem("admin_role");
  localStorage.removeItem("admin_session_token");
  localStorage.removeItem("admin_session_expires_at");

  window.location.href = "admin-login.html";
}
