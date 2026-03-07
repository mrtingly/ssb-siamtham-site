const STORAGE_KEY = "ssb_flow";

export function getFlow() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return {
      book: null,
      book_preview_seen: [],
      device: null,
      device_preview_seen: [],
      training: null
    };
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      book: parsed.book || null,
      book_preview_seen: parsed.book_preview_seen || [],
      device: parsed.device || null,
      device_preview_seen: parsed.device_preview_seen || [],
      training: parsed.training || null
    };
  } catch {
    return {
      book: null,
      book_preview_seen: [],
      device: null,
      device_preview_seen: [],
      training: null
    };
  }
}

export function saveFlow(next) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function updateFlow(patch) {
  const current = getFlow();
  const next = { ...current, ...patch };
  saveFlow(next);
  return next;
}

export function normalizeKey(v) {
  return String(v || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9_-]/g, "");
}

export function formatTHB(n) {
  return "฿" + Number(n || 0).toLocaleString("th-TH");
}

export function buildBookItemKeys(book) {
  if (!book) return [];
  return [
    `book_${normalizeKey(book.sizeKey)}`,
    `out_${normalizeKey(book.outsideMaterialKey)}_${normalizeKey(book.outsideColorName)}`,
    `in_${normalizeKey(book.insideMaterialKey)}_${normalizeKey(book.insideColorName)}`,
    "lock_fingerprint"
  ];
}

export function buildDeviceItemKeys(device) {
  if (!device) return [];
  return [
    `device_${normalizeKey(device.device_brand)}_${normalizeKey(device.deviceModel)}_${normalizeKey(device.storage)}`
  ];
}

export function buildSummaryLines(flow) {
  const lines = [];

  if (flow.book) {
    lines.push(`Safety Book: ${flow.book.sizeName || flow.book.sizeKey || "-"}`);
    lines.push(
      `Outside: ${flow.book.outsideMaterialName || flow.book.outsideMaterialKey || "-"} / ${flow.book.outsideColorLabel || flow.book.outsideColorName || "-"}`
    );
    lines.push(
      `Inside: ${flow.book.insideMaterialName || flow.book.insideMaterialKey || "-"} / ${flow.book.insideColorLabel || flow.book.insideColorName || "-"}`
    );
    lines.push(`Lock: Fingerprint`);
  }

  if (flow.device) {
    lines.push(
      `Device: ${flow.device.deviceType || "-"} / ${flow.device.deviceModel || "-"} / ${flow.device.storage || "-"} / ${flow.device.color || "-"}`
    );
  }

  if (flow.training?.trained === true) {
    lines.push(`Training: ผ่านการอบรมแล้ว`);
  }

  return lines;
}

export function buildFinalDraft(flow) {
  const item_keys = [
    ...buildBookItemKeys(flow.book),
    ...buildDeviceItemKeys(flow.device)
  ];

  const sell_total =
    Number(flow.book?.sell_total || 0) +
    Number(flow.device?.sell_total || 0);

  return {
    selection: {
      ...(flow.book || {}),
      ...(flow.device || {})
    },
    item_keys,
    sell_total,
    summaryLines: buildSummaryLines(flow)
  };
}

export function ensureBookSelected() {
  const flow = getFlow();
  if (!flow.book) {
    window.location.href = "book.html";
    return null;
  }
  return flow;
}

export function ensureBookPreviewDone() {
  const flow = getFlow();
  if (!flow.book) {
    window.location.href = "book.html";
    return null;
  }
  if ((flow.book_preview_seen || []).length < 8) {
    window.location.href = "book-preview.html";
    return null;
  }
  return flow;
}

export function ensureDeviceSelected() {
  const flow = getFlow();
  if (!flow.device) {
    window.location.href = "device.html";
    return null;
  }
  return flow;
}

export function ensureDevicePreviewDone() {
  const flow = getFlow();
  if (!flow.device) {
    window.location.href = "device.html";
    return null;
  }
  if ((flow.device_preview_seen || []).length < 4) {
    window.location.href = "device-preview.html";
    return null;
  }
  return flow;
}

export function ensureTrainingDone() {
  const flow = getFlow();
  if (!flow.training?.trained || !flow.training?.training_image_base64) {
    window.location.href = "training.html";
    return null;
  }
  return flow;
}
