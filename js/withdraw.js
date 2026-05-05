const API_URL = "https://script.google.com/macros/s/AKfycbxPaGc5vaX5Yj6y9jJU1eoS4oKzTXGuIDWcJUNATribqMzpL700PY2xe1k_oBxqupLJhw/exec";

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
