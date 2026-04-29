const API_URL = "https://script.google.com/macros/s/AKfycbxPaGc5vaX5YjGy9jJUlo0S4oKzTXGuIDWcJUNATribqMzpL70OPY2xelk_oBxqupLJhw/exec";
async function loadDashboard(agentId){
  const res = await fetch(`${API_URL}?action=getDashboard&agent_id=${agentId}`);
  const data = await res.json();

  console.log(data);

  if(!data.ok) return;

  // ตัวอย่างเอาไปแสดง
  document.querySelector(".total-income").innerText = data.summary.totalIncome;
  document.querySelector(".available").innerText = data.summary.available;
  document.querySelector(".waiting").innerText = data.summary.waiting;
}
