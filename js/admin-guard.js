const adminId = localStorage.getItem("admin_id");
const adminRole = localStorage.getItem("admin_role");

if(!adminId){
  window.location.href = "login.html";
}

if(adminRole !== "Admin" && adminRole !== "Owner"){
  localStorage.removeItem("admin_id");
  localStorage.removeItem("admin_name");
  localStorage.removeItem("admin_role");

  window.location.href = "login.html";
}

function adminLogout(){
  localStorage.removeItem("admin_id");
  localStorage.removeItem("admin_name");
  localStorage.removeItem("admin_role");

  window.location.href = "login.html";
}
