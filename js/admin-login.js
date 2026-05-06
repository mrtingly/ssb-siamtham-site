const ADMIN_LOGIN_API_URL = "https://script.google.com/macros/s/AKfycbwxuLFd3Udc9m7OI3XtdvRFDK2pUpUB5mWo0M8d4YF5ak_m6xJ8BuCt8na2t75LpXi3Gw/exec";

function adminJsonp(url){
  return new Promise((resolve, reject)=>{
    const callbackName = "admin_login_cb_" + Date.now();

    window[callbackName] = function(data){
      resolve(data);
      delete window[callbackName];
      script.remove();
    };

    const script = document.createElement("script");
    script.src = url + "&callback=" + callbackName;
    script.onerror = reject;

    document.body.appendChild(script);
  });
}

async function adminLogin(event){
  event.preventDefault();

  const username = document.querySelector("#admin_username").value.trim();
  const password = document.querySelector("#admin_password").value.trim();

  const url =
    ADMIN_LOGIN_API_URL +
    "?action=login" +
    "&username=" + encodeURIComponent(username) +
    "&password=" + encodeURIComponent(password);

  try{
    const result = await adminJsonp(url);

    if(!result.ok){
      alert(result.message || "เข้าสู่ระบบไม่สำเร็จ");
      return;
    }

    if(result.role !== "Admin" && result.role !== "Owner"){
      alert("บัญชีนี้ไม่มีสิทธิ์เข้า Admin");
      return;
    }

    localStorage.setItem("admin_id", result.agent_id);
    localStorage.setItem("admin_name", result.name);
    localStorage.setItem("admin_role", result.role);

    window.location.href = "admin-dashboard.html";

  }catch(err){
    console.error(err);
    alert("เชื่อมต่อระบบไม่ได้");
  }
}
