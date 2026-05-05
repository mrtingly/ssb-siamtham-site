const API_URL = "ใส่ URL Apps Script";

async function submitRegister(e){
  e.preventDefault();

  const data = {
    action: "registerAgent",
    first_name: document.querySelector("#first_name").value,
    last_name: document.querySelector("#last_name").value,
    phone: document.querySelector("#phone").value,
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
    line: document.querySelector("#line").value,
    facebook: document.querySelector("#facebook").value,
    tiktok: document.querySelector("#tiktok").value,
    youtube: document.querySelector("#youtube").value,
    address: document.querySelector("#address").value,
    bank_name: document.querySelector("#bank_name").value,
    bank_account: document.querySelector("#bank_account").value,
    team_manager: document.querySelector("#team_manager").value
  };

  const res = await fetch(API_URL,{
    method:"POST",
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if(result.ok){
    alert("สมัครสำเร็จ");
    window.location.href = "agent-login.html";
  }else{
    alert("เกิดข้อผิดพลาด");
  }
}
