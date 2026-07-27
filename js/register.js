const REGISTER_API_URL = "https://script.google.com/macros/s/AKfycbyKhWE-_SuKreCPyD4tsNmqNMQz2hZ8hQtrckk92mh8rszh1jaNEeuuFBGsPOLKfAziNg/exec";

function t(key) {
  return window.SBOSI18n ? window.SBOSI18n.t(key) : key;
}

async function submitRegister(event){
  event.preventDefault();

  const submitButton = event.target.querySelector('button[type="submit"]');
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
    if(submitButton){
      submitButton.disabled = true;
      submitButton.textContent = t("register.loading");
    }

    const res = await fetch(REGISTER_API_URL,{
      method:"POST",
      headers:{"Content-Type":"text/plain;charset=utf-8"},
      body:JSON.stringify(data)
    });

    const result = await res.json();

    if(result.ok){
      alert(result.message || t("register.success"));
      window.location.href = "agent-login.html";
    }else{
      alert(result.message || t("register.failed"));
    }

  }catch(err){
    console.error("Register error:",err);
    alert(t("register.networkError"));
  }finally{
    if(submitButton){
      submitButton.disabled = false;
      submitButton.textContent = t("register.submit");
    }
  }
}
