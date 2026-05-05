const API_URL = "https://script.google.com/macros/s/AKfycbxPaGc5vaX5Yj6y9jJU1eoS4oKzTXGuIDWcJUNATribqMzpL700PY2xe1k_oBxqupLJhw/exec";

async function doLogin(event){
  event.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  if(!username || !password){
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  try{
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "login",
        username: username,
        password: password
      })
    });

    const result = await response.json();

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
