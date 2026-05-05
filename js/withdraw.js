const API_URL = "วาง_URL_APPS_SCRIPT_ตรงนี้";

async function requestWithdraw(){
  const agentId = localStorage.getItem("agent_id");

  if(!agentId){
    alert("กรุณา login");
    return;
  }

  const amount = prompt("กรอกจำนวนเงินที่ต้องการถอน");

  if(!amount || isNaN(amount) || Number(amount) <= 0){
    alert("จำนวนเงินไม่ถูกต้อง");
    return;
  }

  try{
    const res = await fetch(API_URL,{
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
      alert(result.message);
    }

  }catch(err){
    console.error(err);
    alert("ระบบขัดข้อง");
  }
}
