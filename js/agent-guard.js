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
  }
})();
