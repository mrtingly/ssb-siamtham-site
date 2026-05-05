const API_URL = "https://script.google.com/macros/s/AKfycbwxuLFd3Udc9m7OI3XtdvRFDK2pUpUB5mWo0M8d4YF5ak_m6xJ8BuCt8na2t75LpXi3Gw/exec";

function money(value){
  return "฿" + Number(value || 0).toLocaleString("th-TH");
}

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

async function loadDashboard(agentId){
  const url = `${API_URL}?action=getDashboard&agent_id=${encodeURIComponent(agentId)}`;

  try{
    const data = await jsonp(url);

    if(!data.ok){
      alert(data.message || "โหลดข้อมูลไม่สำเร็จ");
      return;
    }

    const agent = data.agent;
    const summary = data.summary;

    document.querySelector(".agent-name").innerText = `${agent.first_name || ""} ${agent.last_name || ""}`;
    document.querySelector(".agent-code").innerText = agent.agent_id || "-";
    document.querySelector(".agent-phone").innerText = agent.phone || "-";
    document.querySelector(".agent-email").innerText = agent.email || "-";

    document.querySelector(".total-income").innerText = money(summary.totalIncome);
    document.querySelector(".available").innerText = money(summary.available);
    document.querySelector(".waiting").innerText = money(summary.waiting);
    document.querySelector(".bonus").innerText = money(summary.totalBonus);

    document.querySelector(".commission").innerText = money(summary.commission);
    document.querySelector(".bonus-detail").innerText = money(summary.totalBonus);
    document.querySelector(".tax").innerText = "- " + money(summary.tax);
    document.querySelector(".net").innerText = money(summary.net);

  }catch(err){
    console.error(err);
    alert("เชื่อมต่อ Dashboard ไม่ได้");
  }
}

function logout(){
  localStorage.removeItem("agent_id");
  localStorage.removeItem("agent_name");
  localStorage.removeItem("agent_role");
  window.location.href = "agent-login.html";
}
