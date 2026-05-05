const API_URL = "https://script.google.com/macros/s/AKfycbxPaGc5vaX5Yj6y9jJU1eoS4oKzTXGuIDWcJUNATribqMzpL700PY2xe1k_oBxqupLJhw/exec";

async function submitRegister(event){
  event.preventDefault();

  const data = {
    action: "registerAgent",
    first_name: document.querySelector("#first_name").value.trim(),
    last_name: document.querySelector("#last_name").value.trim(),
    phone: document.querySelector("#phone").value.trim(),
    email: document.querySelector("#email").value.trim(),
    password: document.querySelector("#password").value.trim(),
    line: document.querySelector("#line").value.trim(),
    facebook: document.querySelector("#facebook").value.trim(),
    tiktok: document.querySelector("#tiktok").value.trim(),
    youtube: document.querySelector("#youtube").value.trim(),
    address: document.querySelector("#address").value.trim(),
    bank_name: document.querySelector("#bank_name").value.trim(),
    bank_account: document.querySelector("#bank_account").value.trim(),
    team_manager: document.querySelector("#team_manager").value.trim(),
    am: document.querySelector("#am")?.value.trim() || ""
  };

  try{
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if(result.ok){
      alert("สมัครสำเร็จ รอการอนุมัติ");
      window.location.href = "agent-login.html";
    }else{
      alert(result.message || "สมัครไม่สำเร็จ");
    }

  }catch(error){
    console.error(error);
    alert("เชื่อมต่อระบบไม่ได้ กรุณาลองใหม่");
  }
}
