const ADMIN_API_URL = "https://script.google.com/macros/s/AKfycbwxuLFd3Udc9m7OI3XtdvRFDK2pUpUB5mWo0M8d4YF5ak_m6xJ8BuCt8na2t75LpXi3Gw/exec";

function adminJsonp(url){
  return new Promise((resolve, reject)=>{
    const callbackName = "admin_cb_" + Date.now();

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

async function approveAgent(agentId){
  if(!confirm("ยืนยันอนุมัติตัวแทนนี้?")) return;

  const url = `${ADMIN_API_URL}?action=approveAgent&agent_id=${encodeURIComponent(agentId)}`;
  const res = await adminJsonp(url);

  alert(res.message || "อนุมัติเรียบร้อย");
  location.reload();
}

async function rejectAgent(agentId){
  if(!confirm("ยืนยันไม่อนุมัติตัวแทนนี้?")) return;

  const url = `${ADMIN_API_URL}?action=rejectAgent&agent_id=${encodeURIComponent(agentId)}`;
  const res = await adminJsonp(url);

  alert(res.message || "ไม่อนุมัติเรียบร้อย");
  location.reload();
}

async function markWithdrawPaid(withdrawId){
  if(!confirm("ยืนยันว่าจ่ายเงินรายการนี้แล้ว?")) return;

  const url = `${ADMIN_API_URL}?action=markWithdrawPaid&withdraw_id=${encodeURIComponent(withdrawId)}`;
  const res = await adminJsonp(url);

  alert(res.message || "บันทึกว่าจ่ายแล้ว");
  location.reload();
}

async function rejectWithdraw(withdrawId){
  if(!confirm("ยืนยันปฏิเสธรายการถอนนี้?")) return;

  const url = `${ADMIN_API_URL}?action=rejectWithdraw&withdraw_id=${encodeURIComponent(withdrawId)}`;
  const res = await adminJsonp(url);

  alert(res.message || "ปฏิเสธรายการถอนแล้ว");
  location.reload();
}
