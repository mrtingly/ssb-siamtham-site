export function formatTHB(n){
  return "฿" + Number(n || 0).toLocaleString("th-TH");
}

export function calcSellTotal(safety, apple, samsung, sel){
  let total = 0;

  // Safety size price
  const size = safety.sizes.find(s => s.key === sel.sizeKey);
  total += Number(size?.sell_price || 0);

  // Outside color price
  const outMat = safety.outsideMaterials.find(m => m.key === sel.outsideMaterialKey);
  const outColor = outMat?.colors?.find(c => c.name === sel.outsideColorName);
  total += Number(outColor?.sell_price || 0);

  // Inside color price
  const inMat = safety.insideMaterials.find(m => m.key === sel.insideMaterialKey);
  const inColor = inMat?.colors?.find(c => c.name === sel.insideColorName);
  total += Number(inColor?.sell_price || 0);

  // Lock (fingerprint)
  const lock = safety.locks.find(l => l.key === "fingerprint");
  total += Number(lock?.sell_price || 0);

  // Device price (sell_price in config)
  const opt = getDeviceOption(apple, samsung, sel);
  total += Number(opt?.sell_price || 0);

  return total;
}

function getDeviceOption(apple, samsung, sel){
  let options = [];
  if(sel.deviceType === "iPhone"){
    options = apple.iphone.find(x => x.model === sel.deviceModel)?.options || [];
  }else if(sel.deviceType === "iPad"){
    options = apple.ipad.find(x => x.model === sel.deviceModel)?.options || [];
  }else if(sel.deviceType === "Samsung Phone"){
    options = samsung.phones.find(x => x.model === sel.deviceModel)?.options || [];
  }else if(sel.deviceType === "Samsung Tablet"){
    options = samsung.tablets.find(x => x.model === sel.deviceModel)?.options || [];
  }
  return options.find(o => o.storage === sel.storage) || null;
}
