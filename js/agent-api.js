const API_URL = "https://script.google.com/macros/s/AKfycbyKhWE-_SuKreCPyD4tsNmqNMQz2hZ8hQtrckk92mh8rszh1jaNEeuuFBGsPOLKfAziNg/exec";

function money(value){
  return "฿" + Number(value || 0).toLocaleString("th-TH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}

function esc(value){
  return String(value === null || value === undefined ? "" : value).replace(/[&<>"']/g, function(char){
    return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[char];
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

function getCurrentAgentAuthParams(){
  return {
    agent_id: getCurrentAgentId(),
    agent_session_token: localStorage.getItem("agent_session_token") || ""
  };
}

async function apiPostJson(payload){
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(payload)
  });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (error) {
    return { ok: false, message: text || "Invalid API response" };
  }
}

async function agentFinancePost(action, payload){
  const auth = getCurrentAgentAuthParams();
  const result = await apiPostJson(Object.assign({
    action: action,
    agent_id: auth.agent_id,
    agent_session_token: auth.agent_session_token
  }, payload || {}));

  if (result && result.next_page) {
    window.location.href = result.next_page;
  }

  return result;
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
  const auth = getCurrentAgentAuthParams();

  try{
    const data = await apiPostJson({
      action: "getDashboard",
      agent_id: agentId,
      agent_session_token: auth.agent_session_token
    });

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
    alert("เชื่อมต่อ Dashboard ไม่ได้ กรุณาลองใหม่อีกครั้ง");
  }
}

function setText(selector, value){
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

async function logout(){
  const auth = getCurrentAgentAuthParams();
  if (auth.agent_id && auth.agent_session_token) {
    try {
      await apiPostJson({
        action: "logoutAgent",
        agent_id: auth.agent_id,
        agent_session_token: auth.agent_session_token
      });
    } catch (error) {}
  }

  [
    "agent_id", "agent_name", "agent_role", "agent_status",
    "agent_session_token", "agent_session_expires_at",
    "ssb_agent_id", "ssb_current_agent_v1",
    "ssb_agent_session", "ssb_agent_session_v1"
  ].forEach(key => localStorage.removeItem(key));
  window.location.href = "agent-login.html";
}

async function loadWithdrawPage(agentId){
  const auth = getCurrentAgentAuthParams();
  const data = await apiPostJson({
    action: "getDashboard",
    agent_id: agentId,
    agent_session_token: auth.agent_session_token
  });
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
  const auth = getCurrentAgentAuthParams();
  const data = await apiPostJson({
    action: "getDashboard",
    agent_id: agentId,
    agent_session_token: auth.agent_session_token
  });
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
  const auth = getCurrentAgentAuthParams();
  const data = await apiPostJson({
    action: "getDashboard",
    agent_id: agentId,
    agent_session_token: auth.agent_session_token
  });
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
async function loadIncomePageV3(agentId){
  const data = await agentFinancePost("listAgentCommissions", { limit: 200 });
  const walletData = await agentFinancePost("getAgentWallet", {});

  if(!data || !data.ok || !walletData || !walletData.ok){
    alert((data && data.message) || (walletData && walletData.message) || "โหลดรายได้ไม่สำเร็จ");
    return;
  }

  const wallet = walletData.wallet || {};
  const rows = data.commissions || [];
  document.querySelectorAll(".commission").forEach(el => el.textContent = money(wallet.lifetime_earned));
  document.querySelectorAll(".bonus-detail").forEach(el => el.textContent = money(0));
  document.querySelectorAll(".tax").forEach(el => el.textContent = "- " + money(0));
  document.querySelectorAll(".net").forEach(el => el.textContent = money(wallet.available_balance));

  const tbody = document.querySelector("#incomeTable");
  if (!tbody) return;
  tbody.innerHTML = rows.length ? rows.map(item => `
    <tr>
      <td>${esc(item.commission_id || "-")}</td>
      <td>${esc(item.milestone || item.commission_type || "-")}</td>
      <td>${esc(money(item.released_amount || item.pending_amount || 0))}</td>
      <td>${esc(money(0))}</td>
      <td>${esc(money(item.released_amount || 0))}</td>
      <td>${renderIncomeStatus(item.status)}</td>
      <td>${esc(formatDate(item.available_at || item.created_at))}</td>
    </tr>`).join("") : `<tr><td colspan="7">ยังไม่มีรายการคอมมิชชัน</td></tr>`;
}

async function loadWithdrawPageV3(agentId){
  const walletData = await agentFinancePost("getAgentWallet", {});
  const withdrawalData = await agentFinancePost("listAgentWithdrawals", {});

  if(!walletData || !walletData.ok || !withdrawalData || !withdrawalData.ok){
    alert((walletData && walletData.message) || (withdrawalData && withdrawalData.message) || "โหลดข้อมูลถอนไม่สำเร็จ");
    return;
  }

  const wallet = walletData.wallet || {};
  setText(".available", money(wallet.available_balance));

  try {
    const auth = getCurrentAgentAuthParams();
    const dashboard = await apiPostJson({
      action: "getDashboard",
      agent_id: auth.agent_id,
      agent_session_token: auth.agent_session_token
    });
    const agent = dashboard && dashboard.agent ? dashboard.agent : {};
    setText(".bank-name", agent.bank_name || "-");
    setText(".bank-account", agent.bank_account ? "****" + String(agent.bank_account).slice(-4) : "-");
  } catch (error) {}

  const tbody = document.querySelector("#withdrawTable");
  if (!tbody) return;
  const rows = withdrawalData.withdrawals || [];
  tbody.innerHTML = rows.length ? rows.map(w => `
    <tr>
      <td>${esc(w.withdrawal_id || "-")}</td>
      <td>${esc(money(w.requested_amount))}</td>
      <td>${renderWithdrawStatus(w.status)}</td>
      <td>${esc(formatDate(w.requested_at))}</td>
      <td>${esc(formatDate(w.paid_at))}</td>
    </tr>`).join("") : `<tr><td colspan="5">ยังไม่มีประวัติการถอนเงิน</td></tr>`;
}
