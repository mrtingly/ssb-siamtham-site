const ADMIN_API_URL = "https://script.google.com/macros/s/AKfycbyKhWE-_SuKreCPyD4tsNmqNMQz2hZ8hQtrckk92mh8rszh1jaNEeuuFBGsPOLKfAziNg/exec";

function adminAuthPayload() {
  return {
    admin_id: localStorage.getItem("admin_id") || "",
    admin_session_token: localStorage.getItem("admin_session_token") || ""
  };
}

async function adminPost(action, payload) {
  const auth = adminAuthPayload();

  if (!auth.admin_id || !auth.admin_session_token) {
    window.location.href = "admin-login.html";
    return { ok: false, message: "Admin session required" };
  }

  const response = await fetch(ADMIN_API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(Object.assign({ action: action }, payload || {}, auth))
  });

  if (!response.ok) {
    return { ok: false, message: "Network error " + response.status };
  }

  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch (error) {
    return { ok: false, message: "Invalid API response" };
  }
}

window.adminPost = adminPost;
window.adminAuthPayload = adminAuthPayload;

function handleAdminActionResult(result, successMessage) {
  if (!result || !result.ok) {
    const message = result && result.message ? result.message : "Admin action failed";
    if (/session/i.test(message)) {
      window.location.href = "admin-login.html";
      return;
    }

    alert(message);
    return;
  }

  alert(result.message || successMessage);
  location.reload();
}

async function approveAgent(agentId) {
  if (!confirm("ยืนยันอนุมัติตัวแทนนี้?")) return;

  const result = await adminPost("approveAgent", { agent_id: agentId });
  handleAdminActionResult(result, "อนุมัติเรียบร้อย");
}

async function rejectAgent(agentId) {
  if (!confirm("ยืนยันไม่อนุมัติตัวแทนนี้?")) return;

  const result = await adminPost("rejectAgent", { agent_id: agentId });
  handleAdminActionResult(result, "ไม่อนุมัติเรียบร้อย");
}

async function markWithdrawPaid(withdrawId) {
  if (!confirm("ยืนยันว่านำจ่ายรายการถอนนี้แล้ว?")) return;

  const reference = prompt("Payment reference (optional)") || "";
  const result = await adminPost("markWithdrawalPaid", {
    withdrawal_id: withdrawId,
    payment_reference: reference
  });
  handleAdminActionResult(result, "บันทึกว่านำจ่ายแล้ว");
}

async function rejectWithdraw(withdrawId) {
  if (!confirm("ยืนยันปฏิเสธรายการถอนนี้?")) return;

  const reason = prompt("Reject reason") || "";

  if (!reason.trim()) {
    alert("Reject reason is required");
    return;
  }

  const result = await adminPost("rejectWithdrawal", {
    withdrawal_id: withdrawId,
    reason: reason
  });
  handleAdminActionResult(result, "ปฏิเสธรายการถอนแล้ว");
}
