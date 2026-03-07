import { ensureDeviceSelected, formatTHB, getFlow, updateFlow } from "./ssbFlow.js";

const flow = ensureDeviceSelected();
if (!flow) {}

const el = (id) => document.getElementById(id);

const slides = [
  {
    id: "device_front",
    title: "ภาพโทรศัพท์ 1 — ด้านหน้าเครื่อง",
    desc: "แสดงหน้าจอด้านหน้าของโทรศัพท์รุ่นที่เลือก",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "device_back",
    title: "ภาพโทรศัพท์ 2 — ด้านหลังเครื่อง",
    desc: "แสดงด้านหลังของตัวเครื่อง",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "device_angle",
    title: "ภาพโทรศัพท์ 3 — มุมเอียงโชว์ตัวเครื่อง",
    desc: "แสดงมุมมองเฉียงของตัวเครื่อง",
    image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "device_with_book",
    title: "ภาพโทรศัพท์ 4 — ใช้งานร่วมกับ Safety Book",
    desc: "แสดงแนวคิดการใช้งานร่วมกับระบบ Safety Book",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80"
  }
];

let current = 0;

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

function markSeen(id) {
  const seen = new Set(flow.device_preview_seen || []);
  seen.add(id);
  const next = Array.from(seen);
  flow.device_preview_seen = next;
  updateFlow({ device_preview_seen: next });
}

function renderSummary() {
  const d = flow.device;
  const lines = [
    `แบรนด์: ${d.device_brand || "-"}`,
    `ประเภท: ${d.deviceType || "-"}`,
    `รุ่น: ${d.deviceModel || "-"}`,
    `ความจุ: ${d.storage || "-"}`,
    `สี: ${d.color || "-"}`,
    `ราคาโทรศัพท์: ${formatTHB(d.sell_total || 0)}`
  ];
  el("summaryBox").innerHTML = lines.map(x => `<div>• ${x}</div>`).join("");
}

function renderSlide() {
  const slide = slides[current];
  el("slideTitle").textContent = slide.title;
  el("slideDesc").textContent = slide.desc;
  el("slideImage").src = slide.image;

  markSeen(slide.id);

  const seenCount = (flow.device_preview_seen || []).length;
  el("seenCount").textContent = seenCount;

  const btn = el("btnToTraining");
  if (seenCount >= slides.length) {
    btn.disabled = false;
    btn.className = "btn w-full mt-6 bg-blue-600 text-white";
  } else {
    btn.disabled = true;
    btn.className = "btn w-full mt-6 bg-slate-300 text-slate-600 cursor-not-allowed";
  }
}

function bindEvents() {
  el("btnPrev").addEventListener("click", () => {
    current = current === 0 ? slides.length - 1 : current - 1;
    renderSlide();
  });

  el("btnNext").addEventListener("click", () => {
    current = current === slides.length - 1 ? 0 : current + 1;
    renderSlide();
  });

  el("btnToTraining").addEventListener("click", () => {
    if ((flow.device_preview_seen || []).length < slides.length) {
      showStatus("error", "กรุณาดูภาพโทรศัพท์ให้ครบทั้ง 4 ภาพก่อน");
      return;
    }
    window.location.href = "training.html";
  });
}

renderSummary();
bindEvents();
renderSlide();
