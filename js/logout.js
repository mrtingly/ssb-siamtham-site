function logout(){
  localStorage.removeItem("agent_id");
  localStorage.removeItem("agent_name");
  localStorage.removeItem("agent_role");

  window.location.href = "login.html";
}

function adminLogout(){
  localStorage.removeItem("admin_id");
  localStorage.removeItem("admin_name");
  localStorage.removeItem("admin_role");

  window.location.href = "login.html";
}
