const REGISTER_API_URL = "https://script.google.com/macros/s/AKfycbwxuLFd3Udc9m7OI3XtdvRFDK2pUpUB5mWo0M8d4YF5ak_m6xJ8BuCt8na2t75LpXi3Gw/exec";

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
    const res = await fetch(REGISTER_API_URL,{
      method:"POST",
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if(result.ok){
      alert("สมัครสำเร็จ รอการอนุมัติ");
      window.location.href = "agent-login.html";
    }else{
      alert(result.message || "สมัครไม่สำเร็จ");
    }

  }catch(err){
    console.error(err);
    alert("เชื่อมต่อระบบไม่ได้ กรุณาลองใหม่");
  }
}
