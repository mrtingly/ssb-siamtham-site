(function(){
  const publicPages = new Set([
    "agent-login.html",
    "agent-register.html",
    "login.html"
  ]);

  const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  if(publicPages.has(currentPage)) return;

  function readJson(key){
    try{
      return JSON.parse(localStorage.getItem(key) || "null");
    }catch(error){
      return null;
    }
  }

  function getAgentId(){
    const direct =
      localStorage.getItem("agent_id") ||
      localStorage.getItem("ssb_agent_id") ||
      localStorage.getItem("ssb_current_agent_v1");

    if(direct) return direct;

    for(const key of ["ssb_agent_session", "ssb_agent_session_v1"]){
      const session = readJson(key);
      if(session && (session.agent_id || session.applicationId)){
        return session.agent_id || session.applicationId;
      }
    }

    return "";
  }

  if(!getAgentId()){
    window.location.href = "agent-login.html";
    return;
  }

  const token = localStorage.getItem("agent_session_token");
  const expiresAt = Number(localStorage.getItem("agent_session_expires_at") || 0);

  if(!token || (expiresAt && Date.now() >= expiresAt)){
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
})();
