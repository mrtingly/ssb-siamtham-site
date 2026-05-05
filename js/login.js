const API_URL = "https://script.google.com/macros/s/AKfycbxPaGc5vaX5YjGy9jJUlo0S4oKzTXGuIDWcJUNATribqMzpL70OPY2xelk_oBxqupLJhw/exec";

function jsonp(url){
  return new Promise((resolve, reject) => {
    const callbackName = "jsonp_" + Date.now();

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

async function doLogin(event){
  event.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  if(!username || !password){
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  const url =
    API_URL +
    "?action=login" +
    "&username=" + encodeURIComponent(username) +
    "&password=" + encodeURIComponent(password);

  try{
    const result = await jsonp(url);

    if(!result.ok){
      alert(result.message || "เข้าสู่ระบบไม่สำเร็จ");
      return;
    }

    localStorage.setItem("agent_id", result.agent_id);
    localStorage.setItem("agent_name", result.name);
    localStorage.setItem("agent_role", result.role);

    window.location.href = "agent-dashboard.html";

  }catch(error){
    console.error(error);
    alert("เชื่อมต่อระบบไม่ได้ กรุณาลองใหม่");
  }
}
