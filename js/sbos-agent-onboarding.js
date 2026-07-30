(function(){
'use strict';
const KEYS={agents:'sbos_agents',session:'sbos_agent_session',audit:'sbos_audit_logs'};
const read=(k,fallback)=>{try{const v=JSON.parse(localStorage.getItem(k));return v??fallback}catch{return fallback}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const now=()=>new Date().toISOString();
const uid=prefix=>`${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
function agents(){const list=read(KEYS.agents,[]);return Array.isArray(list)?list:[]}
function saveAgents(list){write(KEYS.agents,list)}
function audit(action,detail={}){const logs=read(KEYS.audit,[]);logs.push({id:uid('LOG'),action,detail,createdAt:now()});write(KEYS.audit,logs.slice(-1000))}
function normalizeEmail(v){return String(v||'').trim().toLowerCase()}
function register(payload){
 const list=agents(); const email=normalizeEmail(payload.email); const phone=String(payload.phone||'').replace(/\D/g,'');
 if(!payload.fullName||!email||!phone||!payload.password) throw new Error('กรุณากรอกข้อมูลให้ครบถ้วน');
 if(payload.password.length<6) throw new Error('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
 if(list.some(a=>a.email===email)) throw new Error('อีเมลนี้ถูกสมัครแล้ว');
 const id=uid('AGT');
 const agent={id,agentCode:id,fullName:String(payload.fullName).trim(),email,phone,lineId:String(payload.lineId||'').trim(),teamCode:String(payload.teamCode||'').trim(),password:payload.password,status:'training',trainingCompleted:false,examPassed:false,examScore:0,approvedAt:null,approvedBy:null,createdAt:now(),updatedAt:now()};
 list.push(agent);saveAgents(list);audit('agent_registered',{agentId:id,email});return sanitize(agent)
}
function login(email,password){const user=agents().find(a=>a.email===normalizeEmail(email)&&a.password===password);if(!user) throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง');write(KEYS.session,{agentId:user.id,createdAt:now()});audit('agent_login',{agentId:user.id});return sanitize(user)}
function logout(){const s=session();if(s)audit('agent_logout',{agentId:s.agentId});localStorage.removeItem(KEYS.session)}
function session(){return read(KEYS.session,null)}
function current(){const s=session();if(!s)return null;const user=agents().find(a=>a.id===s.agentId);return user?sanitize(user):null}
function sanitize(a){if(!a)return null;const {password,...safe}=a;return safe}
function update(agentId,patch){const list=agents();const i=list.findIndex(a=>a.id===agentId);if(i<0)throw new Error('ไม่พบข้อมูลตัวแทน');list[i]={...list[i],...patch,updatedAt:now()};saveAgents(list);return sanitize(list[i])}
function completeTraining(agentId){audit('training_completed',{agentId});return update(agentId,{trainingCompleted:true,status:'exam_ready'})}
function submitExam(agentId,score){const passed=Number(score)>=80;audit('exam_submitted',{agentId,score,passed});return update(agentId,{examScore:Number(score),examPassed:passed,status:passed?'pending_approval':'exam_failed'})}
function approve(agentId,adminName='Admin'){audit('agent_approved',{agentId,adminName});return update(agentId,{status:'approved',approvedAt:now(),approvedBy:adminName})}
function reject(agentId,adminName='Admin'){audit('agent_rejected',{agentId,adminName});return update(agentId,{status:'rejected',approvedAt:null,approvedBy:adminName})}
function all(){return agents().map(sanitize)}
function routeFor(user){if(!user)return'agent-login.html';if(user.status==='approved')return'agent-dashboard.html';return'agent-onboarding.html'}
window.SBOSAgent={register,login,logout,current,completeTraining,submitExam,approve,reject,all,routeFor,update};
})();