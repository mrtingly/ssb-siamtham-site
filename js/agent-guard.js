const agentId = localStorage.getItem("agent_id");

if(!agentId){
  window.location.href = "login.html";
}
