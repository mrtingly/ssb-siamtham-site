"use strict";

async function requestWithdraw() {
  const auth = getCurrentAgentAuthParams();

  if (!auth.agent_id || !auth.agent_session_token) {
    alert("กรุณาเข้าสู่ระบบก่อน");
    window.location.href = "agent-login.html";
    return;
  }

  const amount = prompt("กรอกจำนวนเงินที่ต้องการถอน");
  const numericAmount = Number(String(amount || "").replace(/,/g, ""));

  if (!amount || !Number.isFinite(numericAmount) || numericAmount <= 0) {
    alert("จำนวนเงินไม่ถูกต้อง");
    return;
  }

  const idempotencyKey = [
    "WITHDRAWAL_UI",
    auth.agent_id,
    Date.now(),
    Math.floor(Math.random() * 100000)
  ].join(":");

  try {
    const result = await apiPostJson({
      action: "createWithdrawalRequest",
      agent_id: auth.agent_id,
      agent_session_token: auth.agent_session_token,
      amount: numericAmount,
      idempotency_key: idempotencyKey
    });

    if (result && result.ok) {
      alert("ส่งคำขอถอนเงินสำเร็จ");
      location.reload();
      return;
    }

    alert((result && result.message) || "ถอนเงินไม่สำเร็จ");
  } catch (error) {
    alert("ระบบขัดข้อง กรุณาลองใหม่");
  }
}
