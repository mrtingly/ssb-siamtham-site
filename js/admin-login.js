const ADMIN_LOGIN_API_URL = "https://script.google.com/macros/s/AKfycbyKhWE-_SuKreCPyD4tsNmqNMQz2hZ8hQtrckk92mh8rszh1jaNEeuuFBGsPOLKfAziNg/exec";

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

    const normalizedRole = String(result.role || "").toUpperCase();
    if(normalizedRole !== "ADMIN" && normalizedRole !== "OWNER"){
      alert("บัญชีนี้ไม่มีสิทธิ์เข้า Admin");
      return;
    }

    if(!result.admin_session_token){
      alert("Admin session could not be created. Please login again.");
      return;
    }

    localStorage.setItem("admin_id", result.agent_id);
    localStorage.setItem("admin_name", result.name);
    localStorage.setItem("admin_role", result.role);
    localStorage.setItem("admin_session_token", result.admin_session_token);
    localStorage.setItem("admin_session_expires_at", String(Date.now() + Number(result.admin_session_expires_in || 0) * 1000));

    window.location.href = "admin-dashboard.html";

  }catch(err){
    console.error(err);
    alert("เชื่อมต่อระบบไม่ได้");
  }
}
