const API_URL = "https://script.google.com/macros/s/AKfycbwxuLFd3Udc9m7OI3XtdvRFDK2pUpUB5mWo0M8d4YF5ak_m6xJ8BuCt8na2t75LpXi3Gw/exec";

function jsonp(url){
  return new Promise((resolve, reject) => {
    const callbackName = "cb_" + Date.now();

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

async function doLogin(e){
  e.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  const url =
    API_URL +
    "?action=login" +
    "&username=" + encodeURIComponent(username) +
    "&password=" + encodeURIComponent(password);

  try{
    const res = await jsonp(url);

    if(!res.ok){
      alert(res.message || "เข้าสู่ระบบไม่สำเร็จ");
      return;
    }

    localStorage.setItem("agent_id", res.agent_id);
    localStorage.setItem("agent_name", res.name);
    localStorage.setItem("agent_role", res.role);

    window.location.href = "agent-dashboard.html";

  }catch(err){
    console.error(err);
    alert("เชื่อมต่อระบบไม่ได้");
  }
}
