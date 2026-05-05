const WITHDRAW_API_URL = "https://script.google.com/macros/s/AKfycbwxuLFd3Udc9m7OI3XtdvRFDK2pUpUB5mWo0M8d4YF5ak_m6xJ8BuCt8na2t75LpXi3Gw/exec";

async function requestWithdraw(){
  const agentId = localStorage.getItem("agent_id");

  if(!agentId){
    alert("กรุณาเข้าสู่ระบบก่อน");
    window.location.href = "agent-login.html";
    return;
  }

  const amount = prompt("กรอกจำนวนเงินที่ต้องการถอน");

  if(!amount || isNaN(amount) || Number(amount) <= 0){
    alert("จำนวนเงินไม่ถูกต้อง");
    return;
  }

  try{
    const res = await fetch(WITHDRAW_API_URL,{
      method:"POST",
      body: JSON.stringify({
        action:"requestWithdraw",
        agent_id: agentId,
        amount: Number(amount)
      })
    });

    const result = await res.json();

    if(result.ok){
      alert("ส่งคำขอถอนเงินสำเร็จ");
      location.reload();
    }else{
      alert(result.message || "ถอนเงินไม่สำเร็จ");
    }

  }catch(err){
    console.error(err);
    alert("ระบบขัดข้อง กรุณาลองใหม่");
  }
}
