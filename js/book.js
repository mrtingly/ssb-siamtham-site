import { loadJSON } from "./configLoader.js";
import { formatTHB, updateFlow } from "./ssbFlow.js";

const state = {
  safety: null,
  selected: {
    sizeKey: null,
    outsideMaterialKey: null,
    outsideColorName: null,
    insideMaterialKey: null,
    insideColorName: null,
    lockKey: "fingerprint"
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

function renderOutsideColors() {
  const mat = state.safety.outsideMaterials.find(m => m.key === state.selected.outsideMaterialKey);
  const box = el("outsideColors");

  if (!mat?.colors?.length) {
    box.innerHTML = "";
    state.selected.outsideColorName = null;
    return;
  }

  if (!state.selected.outsideColorName) {
    state.selected.outsideColorName = mat.colors[0].name;
  }

  box.innerHTML = mat.colors.map(c => {
    const active = c.name === state.selected.outsideColorName;
    return `
      <button data-color="${c.name}" class="swatch ${active ? "active" : ""} border rounded-2xl p-3 text-left bg-white">
        <div class="flex items-center gap-2">
          <span class="w-5 h-5 rounded-full border" style="background:${c.hex || "#ddd"}"></span>
          <span class="text-sm font-medium">${c.label_th || c.name}</span>
        </div>
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

  if (!mat?.colors?.length) {
    box.innerHTML = "";
    state.selected.insideColorName = null;
    return;
  }

  if (!state.selected.insideColorName) {
    state.selected.insideColorName = mat.colors[0].name;
  }

  box.innerHTML = mat.colors.map(c => {
    const active = c.name === state.selected.insideColorName;
    return `
      <button data-color="${c.name}" class="swatch ${active ? "active" : ""} border rounded-2xl p-3 text-left bg-white">
        <div class="flex items-center gap-2">
          <span class="w-5 h-5 rounded-full border" style="background:${c.hex || "#ddd"}"></span>
          <span class="text-sm font-medium">${c.label_th || c.name}</span>
        </div>
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

function calcBookTotal() {
  const size = state.safety.sizes.find(x => x.key === state.selected.sizeKey);
  const outMat = state.safety.outsideMaterials.find(x => x.key === state.selected.outsideMaterialKey);
  const outColor = outMat?.colors?.find(x => x.name === state.selected.outsideColorName);
  const inMat = state.safety.insideMaterials.find(x => x.key === state.selected.insideMaterialKey);
  const inColor = inMat?.colors?.find(x => x.name === state.selected.insideColorName);
  const lock = state.safety.locks.find(x => x.key === "fingerprint");

  return Number(size?.sell_price || 0)
    + Number(outColor?.sell_price || 0)
    + Number(inColor?.sell_price || 0)
    + Number(lock?.sell_price || 0);
}

function updateSummary() {
  const size = state.safety.sizes.find(x => x.key === state.selected.sizeKey);
  const outMat = state.safety.outsideMaterials.find(x => x.key === state.selected.outsideMaterialKey);
  const outColor = outMat?.colors?.find(x => x.name === state.selected.outsideColorName);
  const inMat = state.safety.insideMaterials.find(x => x.key === state.selected.insideMaterialKey);
  const inColor = inMat?.colors?.find(x => x.name === state.selected.insideColorName);

  const lines = [
    `ขนาด: ${size?.name || "-"}`,
    `ภายนอก: ${outMat?.name || "-"} / ${outColor?.label_th || outColor?.name || "-"}`,
    `ภายใน: ${inMat?.name || "-"} / ${inColor?.label_th || inColor?.name || "-"}`,
    `ระบบล็อค: Fingerprint`
  ];

  el("summaryBox").innerHTML = lines.map(x => `<div>• ${x}</div>`).join("");
  el("sellTotal").textContent = formatTHB(calcBookTotal());
}

function bindEvents() {
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

  el("btnRender").addEventListener("click", () => {
    const size = state.safety.sizes.find(x => x.key === state.selected.sizeKey);
    const outMat = state.safety.outsideMaterials.find(x => x.key === state.selected.outsideMaterialKey);
    const outColor = outMat?.colors?.find(x => x.name === state.selected.outsideColorName);
    const inMat = state.safety.insideMaterials.find(x => x.key === state.selected.insideMaterialKey);
    const inColor = inMat?.colors?.find(x => x.name === state.selected.insideColorName);

    if (!size || !outMat || !outColor || !inMat || !inColor) {
      showStatus("error", "กรุณาเลือกข้อมูล Safety Book ให้ครบก่อน");
      return;
    }

    updateFlow({
      book: {
        ...state.selected,
        sizeName: size.name,
        outsideMaterialName: outMat.name,
        outsideColorLabel: outColor.label_th || outColor.name,
        insideMaterialName: inMat.name,
        insideColorLabel: inColor.label_th || inColor.name,
        sell_total: calcBookTotal()
      },
      book_preview_seen: []
    });

    window.location.href = "book-preview.html";
  });
}

async function main() {
  try {
    state.safety = await loadJSON("config/safetyBook.json");

    el("sizeSelect").innerHTML = state.safety.sizes.map(x => `<option value="${x.key}">${x.name}</option>`).join("");
    el("outsideMaterialSelect").innerHTML = state.safety.outsideMaterials.map(x => `<option value="${x.key}">${x.name}</option>`).join("");
    el("insideMaterialSelect").innerHTML = state.safety.insideMaterials.map(x => `<option value="${x.key}">${x.name}</option>`).join("");
    el("lockSelect").innerHTML = state.safety.locks
      .filter(x => x.key === "fingerprint")
      .map(x => `<option value="${x.key}">${x.name}</option>`)
      .join("");

    state.selected.sizeKey = state.safety.sizes[0]?.key || null;
    state.selected.outsideMaterialKey = state.safety.outsideMaterials[0]?.key || null;
    state.selected.insideMaterialKey = state.safety.insideMaterials[0]?.key || null;

    renderOutsideColors();
    renderInsideColors();
    bindEvents();
    updateSummary();
  } catch (e) {
    showStatus("error", "โหลดข้อมูล Safety Book ไม่สำเร็จ: " + e.message);
  }
}

main();
