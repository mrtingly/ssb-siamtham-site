const API_URL = "https://script.google.com/macros/s/AKfycbyKhWE-_SuKreCPyD4tsNmqNMQz2hZ8hQtrckk92mh8rszh1jaNEeuuFBGsPOLKfAziNg/exec";

function money(value){
  return "฿" + Number(value || 0).toLocaleString("th-TH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}

function jsonp(url){
  return new Promise((resolve, reject) => {
    const callbackName = "cb_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
    const script = document.createElement("script");

    const cleanup = () => {
      try { delete window[callbackName]; } catch (error) { window[callbackName] = undefined; }
      if (script.parentNode) script.parentNode.removeChild(script);
    };

    window[callbackName] = function(data){
      cleanup();
      resolve(data);
    };

    script.src = url + (url.includes("?") ? "&" : "?") + "callback=" + encodeURIComponent(callbackName) + "&_=" + Date.now();
    script.async = true;
    script.onerror = function(){
      cleanup();
      reject(new Error("JSONP request failed"));
    };

    document.body.appendChild(script);
  });
}

function getCurrentAgentId(){
  const direct = localStorage.getItem("agent_id") || localStorage.getItem("ssb_agent_id") || localStorage.getItem("ssb_current_agent_v1");
  if (direct) return direct;

  for (const key of ["ssb_agent_session", "ssb_agent_session_v1"]){
    try {
      const session = JSON.parse(localStorage.getItem(key) || "null");
      if (session && (session.agent_id || session.applicationId)) {
        return session.agent_id || session.applicationId;
      }
    } catch (error) {}
  }

  return "";
}

function routeByStatus(status){
  const value = String(status || "").trim().toUpperCase();
  if (value === "REGISTERED" || value === "TRAINING") return "agent-learning.html";
  if (value === "EXAM") return "agent-exam.html";
  if (value === "WAIT_APPROVAL" || value === "PENDING") return "agent-waiting.html";
  if (value === "APPROVED") return "agent-dashboard.html";
  return "agent-login.html";
}

async function loadDashboard(agentId){
  const url = `${API_URL}?action=getDashboard&agent_id=${encodeURIComponent(agentId)}`;

  try{
    const data = await jsonp(url);

    if(!data || !data.ok){
      const nextPage = data && data.next_page ? data.next_page : routeByStatus(data && data.status);
      if (nextPage && nextPage !== "agent-dashboard.html") {
        window.location.href = nextPage;
        return;
      }
      alert((data && data.message) || "โหลดข้อมูลไม่สำเร็จ");
      return;
    }

    const agent = data.agent || {};
    const summary = data.summary || {};

    setText(".agent-name", `${agent.first_name || ""} ${agent.last_name || ""}`.trim() || "-");
    setText(".agent-code", agent.agent_id || "-");
    setText(".agent-phone", agent.phone || "-");
    setText(".agent-email", agent.email || "-");
    setText(".agent-line", agent.line || "-");
    setText(".agent-manager", agent.team_manager || "-");
    setText(".agent-am", agent.am || "-");
    setText(".agent-bank", [agent.bank_name, agent.bank_account].filter(Boolean).join(" ") || "-");
    setText(".agent-role", agent.role || "Agent");
    setText(".team-manager-value", agent.team_manager || "-");
    setText(".am-value", agent.am || "-");

    const statusElement = document.querySelector(".agent-status");
    if (statusElement) {
      statusElement.textContent = String(agent.status || "APPROVED").toUpperCase();
      statusElement.className = "agent-status approved";
    }

    const photo = document.querySelector(".agent-photo img");
    if (photo && agent.photo_url) photo.src = agent.photo_url;

    setText(".total-income", money(summary.totalIncome));
    setText(".available", money(summary.available));
    setText(".waiting", money(summary.waiting));
    setText(".bonus", money(summary.totalBonus));
    setText(".commission", money(summary.commission));
    setText(".bonus-detail", money(summary.totalBonus));
    setText(".tax", "- " + money(summary.tax));
    setText(".net", money(summary.net));

  }catch(err){
    console.error("Dashboard error:", err);
    alert("เชื่อมต่อ Dashboard ไม่ได้ กรุณาลองใหม่อีกครั้ง");
  }
}

function setText(selector, value){
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function logout(){
  [
    "agent_id", "agent_name", "agent_role", "agent_status",
    "ssb_agent_id", "ssb_current_agent_v1",
    "ssb_agent_session", "ssb_agent_session_v1"
  ].forEach(key => localStorage.removeItem(key));
  window.location.href = "agent-login.html";
}

async function loadWithdrawPage(agentId){
  const data = await jsonp(`${API_URL}?action=getDashboard&agent_id=${encodeURIComponent(agentId)}`);
  if(!data || !data.ok){
    alert((data && data.message) || "โหลดข้อมูลไม่สำเร็จ");
    return;
  }

  const agent = data.agent || {};
  const summary = data.summary || {};
  setText(".available", money(summary.available));
  setText(".bank-name", agent.bank_name || "-");
  setText(".bank-account", agent.bank_account || "-");

  const tbody = document.querySelector("#withdrawTable");
  if (!tbody) return;
  const rows = data.withdraws || [];
  tbody.innerHTML = rows.length ? rows.map(w => `
    <tr>
      <td>${w.withdraw_id || "-"}</td>
      <td>${money(w.amount)}</td>
      <td>${renderWithdrawStatus(w.status)}</td>
      <td>${formatDate(w.request_date)}</td>
      <td>${formatDate(w.paid_date)}</td>
    </tr>`).join("") : `<tr><td colspan="5">ยังไม่มีประวัติการถอนเงิน</td></tr>`;
}

function renderWithdrawStatus(status){
  const value = String(status || "PENDING").toUpperCase();
  if(value === "PAID") return `<span class="status paid">PAID</span>`;
  if(value === "REJECTED") return `<span class="status rejected">REJECTED</span>`;
  return `<span class="status pending">PENDING</span>`;
}

function formatDate(value){
  if(!value) return "-";
  const date = new Date(value);
  if(isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("th-TH");
}

async function loadIncomePage(agentId){
  const data = await jsonp(`${API_URL}?action=getDashboard&agent_id=${encodeURIComponent(agentId)}`);
  if(!data || !data.ok){
    alert((data && data.message) || "โหลดข้อมูลรายได้ไม่สำเร็จ");
    return;
  }

  const summary = data.summary || {};
  document.querySelectorAll(".commission").forEach(el => el.textContent = money(summary.commission));
  document.querySelectorAll(".bonus-detail").forEach(el => el.textContent = money(summary.totalBonus));
  document.querySelectorAll(".tax").forEach(el => el.textContent = "- " + money(summary.tax));
  document.querySelectorAll(".net").forEach(el => el.textContent = money(summary.net));

  const tbody = document.querySelector("#incomeTable");
  if (!tbody) return;
  const rows = data.income || [];
  tbody.innerHTML = rows.length ? rows.map(item => `
    <tr>
      <td>${item.income_id || "-"}</td>
      <td>${item.type || "-"}</td>
      <td>${money(item.amount)}</td>
      <td>${money(item.tax)}</td>
      <td>${money(item.net_amount)}</td>
      <td>${renderIncomeStatus(item.status)}</td>
      <td>${formatDate(item.available_date)}</td>
    </tr>`).join("") : `<tr><td colspan="7">ยังไม่มีรายการรายได้</td></tr>`;
}

function renderIncomeStatus(status){
  const value = String(status || "WAIT_7_DAYS").toUpperCase();
  if(value === "AVAILABLE") return `<span class="status available">AVAILABLE</span>`;
  if(value === "PAID") return `<span class="status paid">PAID</span>`;
  return `<span class="status waiting">WAIT_7_DAYS</span>`;
}

async function loadBonusPage(agentId){
  const data = await jsonp(`${API_URL}?action=getDashboard&agent_id=${encodeURIComponent(agentId)}`);
  if(!data || !data.ok){
    alert((data && data.message) || "โหลดโบนัสไม่สำเร็จ");
    return;
  }

  const bonus = data.bonus || [];
  const total = bonus.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  setText(".total-bonus", money(total));
  setText(".month-bonus", money(total));

  const table = document.querySelector("#bonusTable");
  if (!table) return;
  table.innerHTML = bonus.length ? bonus.map(item => `
    <tr>
      <td>${item.bonus_id || "-"}</td>
      <td>${item.type || "-"}</td>
      <td>${money(item.amount)}</td>
      <td>${item.month || "-"}</td>
      <td>${item.status || "-"}</td>
      <td>${item.note || "-"}</td>
    </tr>`).join("") : `<tr><td colspan="6">ไม่มีโบนัส</td></tr>`;
}
