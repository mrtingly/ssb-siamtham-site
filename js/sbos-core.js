"use strict";
window.SBOS={
  version:"1.0.0",
  roles:{OWNER:"owner",ADMIN:"admin",MANAGER:"manager",LEADER:"leader",AGENT:"agent",CUSTOMER:"customer"},
  status:{DRAFT:"draft",PENDING:"pending",CUSTOMER_SIGNED:"customer_signed",APPROVED:"approved",REJECTED:"rejected",INSTALLING:"installing",SHIPPING:"shipping",COMPLETED:"completed",CANCELLED:"cancelled"},
  storage:{
    get(key,fallback){try{const v=localStorage.getItem(key);return v===null?fallback:JSON.parse(v)}catch{return fallback}},
    set(key,value){localStorage.setItem(key,JSON.stringify(value));return value},
    push(key,value){const list=this.get(key,[]);list.unshift(value);this.set(key,list);return list}
  },
  id(prefix){const d=new Date(),stamp=`${d.getFullYear()}${String(d.getMonth()+1).padStart(2,"0")}${String(d.getDate()).padStart(2,"0")}`;const seqKey=`sbos_seq_${prefix}_${stamp}`;const n=Number(localStorage.getItem(seqKey)||0)+1;localStorage.setItem(seqKey,n);return `${prefix}-${stamp}-${String(n).padStart(4,"0")}`},
  money(value){return "฿"+Number(value||0).toLocaleString("th-TH",{minimumFractionDigits:2,maximumFractionDigits:2})},
  currentUser(){return {id:localStorage.getItem("agent_id")||localStorage.getItem("ssb_agent_id")||localStorage.getItem("admin_id")||"-",name:localStorage.getItem("agent_name")||localStorage.getItem("ssb_agent_name")||localStorage.getItem("admin_name")||"ผู้ใช้งาน",role:localStorage.getItem("agent_role")||localStorage.getItem("admin_role")||"agent"}},
  can(allowed){return allowed.includes(this.currentUser().role)},
  statusLabel(status){return ({draft:"ร่าง",pending:"รอดำเนินการ",customer_signed:"ลูกค้าเซ็นแล้ว",approved:"อนุมัติแล้ว",rejected:"ไม่อนุมัติ",installing:"กำลังติดตั้ง",shipping:"กำลังจัดส่ง",completed:"สำเร็จ",cancelled:"ยกเลิก"})[status]||status},
  statusClass(status){return `sb-status-${status}`},
  notify(title,message,type="info"){const item={id:this.id("NT"),title,message,type,createdAt:new Date().toISOString(),read:false};this.storage.push("sbos_notifications",item);window.dispatchEvent(new CustomEvent("sbos:notification",{detail:item}));return item},
  audit(action,entity,entityId,detail={}){const user=this.currentUser();return this.storage.push("sbos_audit_logs",{id:this.id("LOG"),action,entity,entityId,detail,user,createdAt:new Date().toISOString(),userAgent:navigator.userAgent})}
};
