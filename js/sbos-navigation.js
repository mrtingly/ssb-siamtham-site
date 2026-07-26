"use strict";
window.SBOS_NAV={
 agent:[
  ["agent-dashboard.html","หน้าแรก"],["agent-leads.html","ลูกค้า"],["agent-products.html","สินค้า"],["agent-quotation.html","ใบเสนอราคา"],["agent-orders.html","คำสั่งซื้อ"],["agent-income.html","รายได้"],["agent-team.html","ทีม"],["agent-media.html","สื่อการขาย"],["agent-training.html","อบรม"],["agent-exam.html","สอบ"],["agent-profile.html","โปรไฟล์"]
 ],
 admin:[
  ["admin-dashboard.html","ภาพรวม"],["admin-agent.html","ตรวจตัวแทน"],["admin-agents-list.html","รายชื่อตัวแทน"],["admin-customers.html","ลูกค้า"],["admin-quotations.html","ใบเสนอราคา"],["admin-orders.html","คำสั่งซื้อ"],["admin-installation.html","งานติดตั้ง SSBMS"],["admin-spc.html","SPC"],["admin-bonus.html","คอมมิชชันและโบนัส"],["admin-withdraw.html","ถอนเงิน"],["admin-reports.html","รายงาน"],["admin-settings.html","ตั้งค่า"]
 ],
 render(target,kind="agent"){
  const el=typeof target==="string"?document.querySelector(target):target;if(!el)return;
  const current=location.pathname.split("/").pop()||"index.html";
  el.innerHTML=(this[kind]||[]).map(([href,label])=>`<a href="${href}" class="${current===href?"active":""}">${label}</a>`).join("");
 }
};
document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll("[data-sbos-nav]").forEach(el=>SBOS_NAV.render(el,el.dataset.sbosNav||"agent"))});
