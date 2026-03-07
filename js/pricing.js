export function formatTHB(n) {
  return "฿" + Number(n || 0).toLocaleString("th-TH");
}

export function calcSellTotal(safety, apple, samsung, sel) {
  let total = 0;

  // Safety size price
  const size = safety?.sizes?.find((s) => s.key === sel?.sizeKey);
  total += Number(size?.sell_price || 0);

  // Outside color price
  const outMat = safety?.outsideMaterials?.find(
    (m) => m.key === sel?.outsideMaterialKey
  );
  const outColor = outMat?.colors?.find(
    (c) => c.name === sel?.outsideColorName
  );
  total += Number(outColor?.sell_price || 0);

  // Inside color price
  const inMat = safety?.insideMaterials?.find(
    (m) => m.key === sel?.insideMaterialKey
  );
  const inColor = inMat?.colors?.find(
    (c) => c.name === sel?.insideColorName
  );
  total += Number(inColor?.sell_price || 0);

  // Lock price (fingerprint only)
  const lock = safety?.locks?.find((l) => l.key === "fingerprint");
  total += Number(lock?.sell_price || 0);

  // Device price
  const opt = getDeviceOption(apple, samsung, sel);
  total += Number(opt?.sell_price || 0);

  return total;
}

function getDeviceOption(apple, samsung, sel) {
  let options = [];

  if (sel?.deviceType === "iPhone") {
    options =
      apple?.iphone?.find((x) => x.model === sel?.deviceModel)?.options || [];
  } else if (sel?.deviceType === "iPad") {
    options =
      apple?.ipad?.find((x) => x.model === sel?.deviceModel)?.options || [];
  } else if (sel?.deviceType === "Samsung Phone") {
    options =
      samsung?.phones?.find((x) => x.model === sel?.deviceModel)?.options || [];
  } else if (sel?.deviceType === "Samsung Tablet") {
    options =
      samsung?.tablets?.find((x) => x.model === sel?.deviceModel)?.options || [];
  }

  return options.find((o) => String(o.storage) === String(sel?.storage)) || null;
}

export function buildItemKeys(sel) {
  const keys = [];

  if (sel?.sizeKey) {
    keys.push(`book_${normalizeKey(sel.sizeKey)}`);
  }

  if (sel?.outsideMaterialKey && sel?.outsideColorName) {
    keys.push(
      `out_${normalizeKey(sel.outsideMaterialKey)}_${normalizeKey(sel.outsideColorName)}`
    );
  }

  if (sel?.insideMaterialKey && sel?.insideColorName) {
    keys.push(
      `in_${normalizeKey(sel.insideMaterialKey)}_${normalizeKey(sel.insideColorName)}`
    );
  }

  // ตอนนี้ระบบล็อกเป็น fingerprint only
  keys.push("lock_fingerprint");

  if (sel?.device_brand && sel?.deviceModel && sel?.storage) {
    keys.push(
      `device_${normalizeKey(sel.device_brand)}_${normalizeKey(sel.deviceModel)}_${normalizeKey(sel.storage)}`
    );
  }

  return keys;
}

export function buildSummaryLines(sel) {
  return [
    `ขนาด: ${sel?.sizeKey || "-"}`,
    `ภายนอก: ${sel?.outsideMaterialKey || "-"} / ${sel?.outsideColorName || "-"}`,
    `ภายใน: ${sel?.insideMaterialKey || "-"} / ${sel?.insideColorName || "-"}`,
    `ล็อก: fingerprint`,
    `อุปกรณ์: ${sel?.device_brand || "-"} ${sel?.deviceModel || "-"} ${sel?.storage || "-"}`
  ];
}

function normalizeKey(v) {
  return String(v || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9_-]/g, "");
}
