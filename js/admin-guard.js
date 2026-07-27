(function(){
  const publicPages = new Set([
    "admin-login.html",
    "login.html"
  ]);

  const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

  window.adminLogout = function(){
    localStorage.removeItem("admin_id");
    localStorage.removeItem("admin_name");
    localStorage.removeItem("admin_role");

    window.location.href = "admin-login.html";
  };

  if(publicPages.has(currentPage)) return;

  const adminId = localStorage.getItem("admin_id");
  const adminRole = localStorage.getItem("admin_role");

  if(!adminId){
    window.location.href = "admin-login.html";
    return;
  }

  if(adminRole !== "Admin" && adminRole !== "Owner"){
    localStorage.removeItem("admin_id");
    localStorage.removeItem("admin_name");
    localStorage.removeItem("admin_role");

    window.location.href = "admin-login.html";
  }
})();
