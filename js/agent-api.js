const API_URL = "https://script.google.com/macros/s/AKfycbxPaGc5vaX5Yj6y9jJU1eoS4oKzTXGuIDWcJUNATribqMzpL700PY2xe1k_oBxqupLJhw/exec";

function money(value){
  return "฿" + Number(value || 0).toLocaleString("th-TH");
}

async function loadDashboard(agentId){
  try{
    const res = await fetch(`${API_URL}?action=getDashboard&agent_id=${agentId}`);
    const data = await res.json();

    console.log(data);

    if(!data.ok){
      alert(data.message);
      return;
    }

    const agent = data.agent;
    const summary = data.summary;

    // 🔹 Profile
    document.querySelector(".agent-name").innerText =
      `${agent.first_name} ${agent.last_name}`;

    document.querySelector(".agent-code").innerText =
      agent.agent_id;

    document.querySelector(".agent-phone").innerText =
      agent.phone;

    document.querySelector(".agent-email").innerText =
      agent.email;

    // 🔹 เงิน
    document.querySelector(".total-income").innerText =
      money(summary.totalIncome);

    document.querySelector(".available").innerText =
      money(summary.available);

    document.querySelector(".waiting").innerText =
      money(summary.waiting);

    document.querySelector(".bonus").innerText =
      money(summary.totalBonus);

    // 🔹 panel ล่าง
    document.querySelector(".commission").innerText =
      money(summary.commission);

    document.querySelector(".bonus-detail").innerText =
      money(summary.totalBonus);

    document.querySelector(".tax").innerText =
      "- " + money(summary.tax);

    document.querySelector(".net").innerText =
      money(summary.net);

  }catch(err){
    console.error(err);
    alert("โหลดข้อมูลไม่สำเร็จ");
  }
}

function logout(){
  localStorage.clear();
  window.location.href = "agent-login.html";
}
