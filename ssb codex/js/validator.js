export function validateDeviceSelection(sel){
  // Android rule: Samsung only
  if(sel.device_os === "Android" && sel.device_brand !== "Samsung"){
    return {ok:false, msg:"Android รองรับเฉพาะ Samsung เท่านั้น"};
  }
  // iPad rule: Cellular only
  if(sel.device_type === "iPad" && sel.ipad_cellular_only !== true){
    return {ok:false, msg:"iPad ต้องเป็น Cellular เท่านั้น (ห้าม WiFi-only)"};
  }
  // Fingerprint only
  if(sel.lock_key !== "fingerprint"){
    return {ok:false, msg:"ระบบล็อกต้องเป็น Fingerprint เท่านั้น"};
  }
  return {ok:true};
}