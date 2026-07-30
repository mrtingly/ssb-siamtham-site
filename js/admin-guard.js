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
    localStorage.removeItem("admin_session_token");
    localStorage.removeItem("admin_session_expires_at");

    window.location.href = "admin-login.html";
  };

  if(publicPages.has(currentPage)) return;

  const adminId = localStorage.getItem("admin_id");
  const adminRole = localStorage.getItem("admin_role");
  const adminToken = localStorage.getItem("admin_session_token");
  const expiresAt = Number(localStorage.getItem("admin_session_expires_at") || 0);

  if(!adminId || !adminToken || (expiresAt && Date.now() >= expiresAt)){
    window.location.href = "admin-login.html";
    return;
  }

  const normalizedRole = String(adminRole || "").toUpperCase();

  if(normalizedRole !== "ADMIN" && normalizedRole !== "OWNER"){
    localStorage.removeItem("admin_id");
    localStorage.removeItem("admin_name");
    localStorage.removeItem("admin_role");
    localStorage.removeItem("admin_session_token");
    localStorage.removeItem("admin_session_expires_at");

    window.location.href = "admin-login.html";
  }
})();
