const adminId = localStorage.getItem("admin_id");
const adminRole = localStorage.getItem("admin_role");

if(!adminId){
  window.location.href = "admin-login.html";
}

if(adminRole !== "Admin" && adminRole !== "Owner"){
  alert("ไม่มีสิทธิ์เข้าใช้งาน");

  localStorage.removeItem("admin_id");
  localStorage.removeItem("admin_name");
  localStorage.removeItem("admin_role");

  window.location.href = "admin-login.html";
}
