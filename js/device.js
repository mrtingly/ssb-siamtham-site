import { loadJSON } from "./configLoader.js";
import { ensureBookPreviewDone, formatTHB, updateFlow } from "./ssbFlow.js";

const flow = ensureBookPreviewDone();
if (!flow) {}

const state = {
  apple: null,
  samsung: null,
  selected: {
    deviceVendor: "Apple",
    deviceType: null,
    deviceModel: null,
    storage: null,
    color: null,
    ipad_cellular_only: true,
    device_os: null,
    device_brand: null
  }
};

const el = (id) => document.getElementById(id);

function showStatus(type, msg) {
  const box = el("statusBox");
  box.className = `mb-6 p-4 rounded-2xl border ${
    type === "error"
      ? "bg-red-50 border-red-200 text-red-700"
      : "bg-blue-50 border-blue-200 text-blue-700"
  }`;
  box.textContent = msg;
  box.classList.remove("hidden");
}

function setButtons() {
  el("btnApple").className = `btn border ${state.selected.deviceVendor === "Apple" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-300 bg-white text-slate-700"}`;
  el("btnSamsung").className = `btn border ${state.selected.deviceVendor === "Samsung" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-300 bg-white text-slate-700"}`;
}

function getDeviceOptions() {
  const { deviceType, deviceModel } = state.selected;

  if (deviceType === "iPhone") return state.apple.iphone.find(x => x.model === deviceModel)?.options || [];
  if (deviceType === "iPad") return state.apple.ipad.find(x => x.model === deviceModel)?.options || [];
  if (deviceType === "Samsung Phone") return state.samsung.phones.find(x => x.model === deviceModel)?.options || [];
  return [];
}

function calcDeviceTotal() {
  const option = getDeviceOptions().find(o => String(o.storage) === String(state.selected.storage));
  return Number(option?.sell_price || 0);
}

function updateSummary() {
  const lines = [
    `แบรนด์: ${state.selected.device_brand || "-"}`,
    `ประเภท: ${state.selected.deviceType || "-"}`,
    `รุ่น: ${state.selected.deviceModel || "-"}`,
    `ความจุ: ${state.selected.storage || "-"}`,
    `สี: ${state.selected.color || "-"}`
  ];
  el("summaryBox").innerHTML = lines.map(x => `<div>• ${x}</div>`).join("");
  el("sellTotal").textContent = formatTHB(calcDeviceTotal());
}

function buildMenus() {
  const typeSel = el("deviceTypeSelect");
  const modelSel = el("deviceModelSelect");
  const storageSel = el("deviceStorageSelect");
  const colorSel = el("deviceColorSelect");

  let types = [];
  if (state.selected.deviceVendor === "Apple") types = ["iPhone", "iPad"];
  if (state.selected.deviceVendor === "Samsung") types = ["Samsung Phone"];

  typeSel.innerHTML = types.map(t => `<option value="${t}">${t}</option>`).join("");
  state.selected.deviceType = types[0] || null;

  const rebuildModels = () => {
    let models = [];

    if (state.selected.deviceType === "iPhone") {
      models = state.apple.iphone.map(x => x.model);
      state.selected.device_os = "iOS";
      state.selected.device_brand = "Apple";
    } else if (state.selected.deviceType === "iPad") {
      models = state.apple.ipad.filter(x => x.cellular_only === true).map(x => x.model);
      state.selected.device_os = "iOS";
      state.selected.device_brand = "Apple";
      state.selected.ipad_cellular_only = true;
    } else if (state.selected.deviceType === "Samsung Phone") {
      models = state.samsung.phones.map(x => x.model);
      state.selected.device_os = "Android";
      state.selected.device_brand = "Samsung";
    }

    modelSel.innerHTML = models.map(m => `<option value="${m}">${m}</option>`).join("");
    state.selected.deviceModel = models[0] || null;
    rebuildOptions();
  };

  const rebuildOptions = () => {
    const options = getDeviceOptions();
    const storages = options.map(o => o.storage);
    storageSel.innerHTML = storages.map(s => `<option value="${s}">${s}</option>`).join("");
    state.selected.storage = storages[0] || null;
    rebuildColors();
  };

  const rebuildColors = () => {
    const option = getDeviceOptions().find(o => String(o.storage) === String(state.selected.storage));
    const colors = option?.colors || [];
    colorSel.innerHTML = colors.map(c => `<option value="${c}">${c}</option>`).join("");
    state.selected.color = colors[0] || null;
    updateSummary();
  };

  typeSel.onchange = () => {
    state.selected.deviceType = typeSel.value;
    rebuildModels();
  };

  modelSel.onchange = () => {
    state.selected.deviceModel = modelSel.value;
    rebuildOptions();
  };

  storageSel.onchange = () => {
    state.selected.storage = storageSel.value;
    rebuildColors();
  };

  colorSel.onchange = () => {
    state.selected.color = colorSel.value;
    updateSummary();
  };

  rebuildModels();
}

function bindEvents() {
  el("btnApple").addEventListener("click", () => {
    state.selected.deviceVendor = "Apple";
    setButtons();
    buildMenus();
  });

  el("btnSamsung").addEventListener("click", () => {
    state.selected.deviceVendor = "Samsung";
    setButtons();
    buildMenus();
  });

  el("btnRender").addEventListener("click", () => {
    if (!state.selected.device_brand || !state.selected.deviceModel || !state.selected.storage || !state.selected.color) {
      showStatus("error", "กรุณาเลือกรายละเอียดโทรศัพท์ให้ครบก่อน");
      return;
    }

    updateFlow({
      device: {
        ...state.selected,
        sell_total: calcDeviceTotal()
      },
      device_preview_seen: []
    });

    window.location.href = "device-preview.html";
  });
}

async function main() {
  try {
    state.apple = await loadJSON("config/devicesApple.json");
    state.samsung = await loadJSON("config/devicesSamsung.json");
    setButtons();
    buildMenus();
    bindEvents();
    updateSummary();
  } catch (e) {
    showStatus("error", "โหลดข้อมูลอุปกรณ์ไม่สำเร็จ: " + e.message);
  }
}

main();
