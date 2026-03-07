import { loadJSON } from "./configLoader.js";
import { formatTHB, calcSellTotal } from "./pricing.js";
import { validateSelection } from "./validator.js";

const state = {
  safety: null,
  apple: null,
  samsung: null,

  selected: {
    sizeKey: null,
    outsideMaterialKey: null,
    outsideColorName: null,
    insideMaterialKey: null,
    insideColorName: null,
    lockKey: "fingerprint",

    deviceVendor: "Apple", // Apple | Samsung
    deviceType: null,      // iPhone | iPad | Samsung Phone | Samsung Tablet
    deviceModel: null,
    storage: null,
    color: null,
    ipad_cellular_only: true, // enforced when iPad
    device_os: null,          // iOS | Android
    device_brand: null        // Apple | Samsung
  }
};

const el = (id) => document.getElementById(id);

function showStatus(type, msg) {
  const box = el("statusBox");
  box.className = `mb-4 p-3 rounded-lg border ${
    type === "error" ? "bg-red-50 border-red-200 text-red-700" :
    type === "ok" ? "bg-green-50 border-green-200 text-green-700" :
    "bg-slate-50 border-slate-200 text-slate-700"
  }`;
  box.textContent = msg;
  box.classList.remove("hidden");
}

function clearStatus() {
  el("statusBox").classList.add("hidden");
}

function setButtonsActive(vendor) {
  el("btnApple").className = `border rounded-xl p-3 text-left hover:bg-slate-50 ${vendor==="Apple" ? "border-blue-500 bg-blue-50" : ""}`;
  el("btnSamsung").className = `border rounded-xl p-3 text-left hover:bg-slate-50 ${vendor==="Samsung" ? "border-blue-500 bg-blue-50" : ""}`;
}

function initSafetyUI() {
  // Size
  const sizeSel = el("sizeSelect");
  sizeSel.innerHTML = state.safety.sizes.map(s => `<option value="${s.key}">${s.name}</option>`).join("");
  state.selected.sizeKey = state.safety.sizes[0]?.key || null;

  // Outside materials
  const outMatSel = el("outsideMaterialSelect");
  outMatSel.innerHTML = state.safety.outsideMaterials.map(m => `<option value="${m.key}">${m.name}</option>`).join("");
  state.selected.outsideMaterialKey = state.safety.outsideMaterials[0]?.key || null;

  // Inside materials
  const inMatSel = el("insideMaterialSelect");
  inMatSel.innerHTML = state.safety.insideMaterials.map(m => `<option value="${m.key}">${m.name}</option>`).join("");
  state.selected.insideMaterialKey = state.safety.insideMaterials[0]?.key || null;

  // Lock (fingerprint only)
  const lockSel = el("lockSelect");
  lockSel.innerHTML = state.safety.locks
    .filter(l => l.key === "fingerprint")
    .map(l => `<option value="${l.key}">${l.name}</option>`).join("");
  state.selected.lockKey = "fingerprint";

  renderOutsideColors();
  renderInsideColors();
  bindSafetyEvents();
}

function renderOutsideColors() {
  const mat = state.safety.outsideMaterials.find(m => m.key === state.selected.outsideMaterialKey);
  const box = el("outsideColors");
  if (!mat || !mat.colors?.length) {
    box.innerHTML = `<div class="text-sm text-slate-500">No colors</div>`;
    state.selected.outsideColorName = null;
    return;
  }
  if (!state.selected.outsideColorName) state.selected.outsideColorName = mat.colors[0].name;

  box.innerHTML = mat.colors.map(c => {
    const active = c.name === state.selected.outsideColorName;
    return `
      <button data-color="${c.name}" class="border rounded-xl p-2 flex items-center gap-2 hover:bg-slate-50 ${active ? "border-blue-500 bg-blue-50" : ""}">
        <span class="w-4 h-4 rounded-full border" style="background:${c.hex}"></span>
        <span class="text-sm">${c.name}</span>
      </button>
    `;
  }).join("");

  box.querySelectorAll("button[data-color]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.selected.outsideColorName = btn.getAttribute("data-color");
      renderOutsideColors();
      updateSummary();
    });
  });
}

function renderInsideColors() {
  const mat = state.safety.insideMaterials.find(m => m.key === state.selected.insideMaterialKey);
  const box = el("insideColors");
  if (!mat || !mat.colors?.length) {
    box.innerHTML = `<div class="text-sm text-slate-500">No colors</div>`;
    state.selected.insideColorName = null;
    return;
  }
  if (!state.selected.insideColorName) state.selected.insideColorName = mat.colors[0].name;

  box.innerHTML = mat.colors.map(c => {
    const active = c.name === state.selected.insideColorName;
    return `
      <button data-color="${c.name}" class="border rounded-xl p-2 flex items-center gap-2 hover:bg-slate-50 ${active ? "border-blue-500 bg-blue-50" : ""}">
        <span class="w-4 h-4 rounded-full border" style="background:${c.hex}"></span>
        <span class="text-sm">${c.name}</span>
      </button>
    `;
  }).join("");

  box.querySelectorAll("button[data-color]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.selected.insideColorName = btn.getAttribute("data-color");
      renderInsideColors();
      updateSummary();
    });
  });
}

function bindSafetyEvents() {
  el("sizeSelect").addEventListener("change", (e) => {
    state.selected.sizeKey = e.target.value;
    updateSummary();
  });

  el("outsideMaterialSelect").addEventListener("change", (e) => {
    state.selected.outsideMaterialKey = e.target.value;
    state.selected.outsideColorName = null;
    renderOutsideColors();
    updateSummary();
  });

  el("insideMaterialSelect").addEventListener("change", (e) => {
    state.selected.insideMaterialKey = e.target.value;
    state.selected.insideColorName = null;
    renderInsideColors();
    updateSummary();
  });

  el("lockSelect").addEventListener("change", () => {
    // force fingerprint
    state.selected.lockKey = "fingerprint";
    el("lockSelect").value = "fingerprint";
    updateSummary();
  });
}

function initDeviceUI() {
  setButtonsActive(state.selected.deviceVendor);

  el("btnApple").addEventListener("click", () => {
    state.selected.deviceVendor = "Apple";
    setButtonsActive("Apple");
    buildDeviceMenus();
  });

  el("btnSamsung").addEventListener("click", () => {
    state.selected.deviceVendor = "Samsung";
    setButtonsActive("Samsung");
    buildDeviceMenus();
  });

  buildDeviceMenus();
}

function buildDeviceMenus() {
  clearStatus();

  const typeSel = el("deviceTypeSelect");
  const modelSel = el("deviceModelSelect");
  const storageSel = el("deviceStorageSelect");
  const colorSel = el("deviceColorSelect");

  let types = [];
  if (state.selected.deviceVendor === "Apple") types = ["iPhone", "iPad"];
  if (state.selected.deviceVendor === "Samsung") types = ["Samsung Phone", "Samsung Tablet"];

  typeSel.innerHTML = types.map(t => `<option value="${t}">${t}</option>`).join("");
  state.selected.deviceType = types[0];

  typeSel.onchange = () => {
    state.selected.deviceType = typeSel.value;
    rebuildModels();
  };

  const rebuildModels = () => {
    let models = [];

    if (state.selected.deviceType === "iPhone") {
      models = state.apple.iphone.map(x => x.model);
      state.selected.device_os = "iOS";
      state.selected.device_brand = "Apple";
      state.selected.ipad_cellular_only = true;
    } else if (state.selected.deviceType === "iPad") {
      // enforce cellular only
      models = state.apple.ipad
        .filter(x => x.cellular_only === true)
        .map(x => x.model);
      state.selected.device_os = "iOS";
      state.selected.device_brand = "Apple";
      state.selected.ipad_cellular_only = true;
    } else if (state.selected.deviceType === "Samsung Phone") {
      models = state.samsung.phones.map(x => x.model);
      state.selected.device_os = "Android";
      state.selected.device_brand = "Samsung";
      state.selected.ipad_cellular_only = true;
    } else if (state.selected.deviceType === "Samsung Tablet") {
      models = state.samsung.tablets.map(x => x.model);
      state.selected.device_os = "Android";
      state.selected.device_brand = "Samsung";
      state.selected.ipad_cellular_only = true;
    }

    modelSel.innerHTML = models.map(m => `<option value="${m}">${m}</option>`).join("");
    state.selected.deviceModel = models[0] || null;

    modelSel.onchange = () => {
      state.selected.deviceModel = modelSel.value;
      rebuildOptions();
    };

    rebuildOptions();
  };

  const rebuildOptions = () => {
    const options = getDeviceOptions();
    const storages = options.map(o => o.storage);
    storageSel.innerHTML = storages.map(s => `<option value="${s}">${s}</option>`).join("");
    state.selected.storage = storages[0] || null;

    storageSel.onchange = () => {
      state.selected.storage = storageSel.value;
      rebuildColors();
    };

    rebuildColors();
  };

  const rebuildColors = () => {
    const option = getDeviceOptions().find(o => o.storage === state.selected.storage);
    const colors = option?.colors || [];
    colorSel.innerHTML = colors.map(c => `<option value="${c}">${c}</option>`).join("");
    state.selected.color = colors[0] || null;

    colorSel.onchange = () => {
      state.selected.color = colorSel.value;
      updateSummary();
    };

    updateSummary();
  };

  rebuildModels();
}

function getDeviceOptions() {
  const { deviceType, deviceModel } = state.selected;

  if (deviceType === "iPhone") {
    return (state.apple.iphone.find(x => x.model === deviceModel)?.options) || [];
  }
  if (deviceType === "iPad") {
    return (state.apple.ipad.find(x => x.model === deviceModel)?.options) || [];
  }
  if (deviceType === "Samsung Phone") {
    return (state.samsung.phones.find(x => x.model === deviceModel)?.options) || [];
  }
  if (deviceType === "Samsung Tablet") {
    return (state.samsung.tablets.find(x => x.model === deviceModel)?.options) || [];
  }
  return [];
}

function updateSummary() {
  const s = state.selected;

  const size = state.safety.sizes.find(x => x.key === s.sizeKey);
  const outMat = state.safety.outsideMaterials.find(x => x.key === s.outsideMaterialKey);
  const inMat = state.safety.insideMaterials.find(x => x.key === s.insideMaterialKey);

  const summary = [
    `Safety Book: ${size?.name || "-"}`,
    `Outside: ${outMat?.name || "-"} / ${s.outsideColorName || "-"}`,
    `Inside: ${inMat?.name || "-"} / ${s.insideColorName || "-"}`,
    `Lock: Fingerprint`,
    `Device: ${s.deviceType || "-"} / ${s.deviceModel || "-"} / ${s.storage || "-"} / ${s.color || "-"}`
  ];

  el("summaryBox").innerHTML = summary.map(line => `<div>• ${line}</div>`).join("");

  const total = calcSellTotal(state.safety, state.apple, state.samsung, state.selected);
  el("sellTotal").textContent = formatTHB(total);
}

function wireActions() {
  el("btnValidate").addEventListener("click", () => {
    const r = validateSelection(state.selected);
    if (!r.ok) return showStatus("error", r.msg);
    showStatus("ok", "ผ่านกฎ SSB แล้ว ✅ (Samsung-only / iPad Cellular-only / Fingerprint-only)");
  });

el("btnNext").addEventListener("click", () => {
  const r = validateSelection(state.selected);
  if (!r.ok) return showStatus("error", r.msg);

  const total = calcSellTotal(state.safety, state.apple, state.samsung, state.selected);

  const summaryLines = [
    `Safety Book: ${state.selected.sizeKey}`,
    `Outside: ${state.selected.outsideMaterialKey} / ${state.selected.outsideColorName}`,
    `Inside: ${state.selected.insideMaterialKey} / ${state.selected.insideColorName}`,
    `Lock: fingerprint`,
    `Device: ${state.selected.deviceType} / ${state.selected.deviceModel} / ${state.selected.storage} / ${state.selected.color}`
  ];

  const item_keys = [
    `SB_SIZE_${state.selected.sizeKey}`,
    `SB_OUT_${state.selected.outsideMaterialKey}_${state.selected.outsideColorName}`,
    `SB_IN_${state.selected.insideMaterialKey}_${state.selected.insideColorName}`,
    `LOCK_fingerprint`,
    `DEV_${state.selected.deviceType}_${state.selected.deviceModel}_${state.selected.storage}`
  ];

  localStorage.setItem("ssb_draft", JSON.stringify({
    selection: state.selected,
    item_keys,
    sell_total: total,
    summaryLines
  }));

  window.location.href = "agents.html";
});
}

async function main() {
  try {
    state.safety = await loadJSON("config/safetyBook.json");
    state.apple  = await loadJSON("config/devicesApple.json");
    state.samsung= await loadJSON("config/devicesSamsung.json");

    initSafetyUI();
    initDeviceUI();
    wireActions();
    updateSummary();
  } catch (e) {
    showStatus("error", "โหลด config ไม่สำเร็จ: " + e.message);
  }
}

main();


