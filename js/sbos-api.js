"use strict";
window.SBOS_API={
  endpoint:localStorage.getItem("sbos_apps_script_url")||"https://script.google.com/macros/s/AKfycbyKhWE-_SuKreCPyD4tsNmqNMQz2hZ8hQtrckk92mh8rszh1jaNEeuuFBGsPOLKfAziNg/exec",
  configure(url){this.endpoint=String(url||"").trim();localStorage.setItem("sbos_apps_script_url",this.endpoint)},
  async request(action,payload={}){
    if(!this.endpoint)throw new Error("ยังไม่ได้ตั้งค่า Google Apps Script Web App URL");
    const response=await fetch(this.endpoint,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({action,payload,clientVersion:window.SBOS?.version||"1.0.0",sentAt:new Date().toISOString()})});
    if(!response.ok)throw new Error(`API ${response.status}`);
    const data=await response.json();if(data?.ok===false)throw new Error(data.message||"API error");return data;
  },
  quotations:{list:()=>SBOS_API.request("quotations.list"),create:p=>SBOS_API.request("quotations.create",p),approve:p=>SBOS_API.request("quotations.approve",p)},
  orders:{list:()=>SBOS_API.request("orders.list"),create:p=>SBOS_API.request("orders.create",p),updateStatus:p=>SBOS_API.request("orders.updateStatus",p)},
  customers:{list:()=>SBOS_API.request("customers.list"),upsert:p=>SBOS_API.request("customers.upsert",p)},
  agents:{
    list:(status="")=>SBOS_API.request("agents.list",{status}),
    pending:()=>SBOS_API.request("agents.list",{status:"WAIT_APPROVAL"}),
    approve:p=>SBOS_API.request("agents.approve",p),
    reject:p=>SBOS_API.request("agents.reject",p),
    suspend:p=>SBOS_API.request("agents.suspend",p),
    status:agentId=>SBOS_API.request("agents.status",{agentId})
  }
};