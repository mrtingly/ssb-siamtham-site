import { ensureBookSelected, formatTHB, getFlow, updateFlow } from "./ssbFlow.js";

const flow = ensureBookSelected();
if (!flow) {}

const el = (id) => document.getElementById(id);

const slides = [
  {
    id: "book_front",
    title: "ภาพภายนอก 1 — ด้านหน้า",
    desc: "โชว์หน้าปก Safety Book ตามวัสดุภายนอกที่เลือก",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "book_spine",
    title: "ภาพภายนอก 2 — ด้านสัน",
    desc: "โชว์ตัวเล่มแบบตั้งให้เห็นสัน Safety Book",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "book_landscape",
    title: "ภาพภายนอก 3 — วางแนวนอน",
    desc: "โชว์ตัวเล่มแบบนอนเพื่อให้เห็นมิติของสินค้า",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "book_table",
    title: "ภาพภายนอก 4 — วางบนโต๊ะ",
    desc: "โชว์ภาพ Safety Book วางบนโต๊ะเหมือนหนังสือจริง",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "inside_main",
    title: "ภาพภายใน 1 — ภายในที่ลูกค้าเลือก",
    desc: "โชว์วัสดุภายในตามที่ลูกค้าเลือกไว้",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "inside_fingerprint",
    title: "ภาพภายใน 2 — ระบบสแกนนิ้วมือ",
    desc: "โชว์ระบบล็อคแบบ Fingerprint",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "inside_charger",
    title: "ภาพภายใน 3 — ช่องเก็บที่ชาร์จแบต",
    desc: "โชว์พื้นที่สำหรับเก็บอุปกรณ์ชาร์จแบต",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "inside_signal_block",
    title: "ภาพภายใน 4 — ช่องเก็บโทรศัพท์กันสัญญาณ",
    desc: "โชว์พื้นที่เก็บโทรศัพท์ในระบบป้องกันสัญญาณ",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80"
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
  const seen = new Set(flow.book_preview_seen || []);
  seen.add(id);
  const next = Array.from(seen);
  flow.book_preview_seen = next;
  updateFlow({ book_preview_seen: next });
}

function renderSummary() {
  const b = flow.book;
  const lines = [
    `ขนาด: ${b.sizeName || b.sizeKey || "-"}`,
    `ภายนอก: ${b.outsideMaterialName || "-"} / ${b.outsideColorLabel || "-"}`,
    `ภายใน: ${b.insideMaterialName || "-"} / ${b.insideColorLabel || "-"}`,
    `ระบบล็อค: Fingerprint`,
    `ราคา Safety Book: ${formatTHB(b.sell_total || 0)}`
  ];
  el("summaryBox").innerHTML = lines.map(x => `<div>• ${x}</div>`).join("");
}

function renderSlide() {
  const slide = slides[current];
  el("slideTitle").textContent = slide.title;
  el("slideDesc").textContent = slide.desc;
  el("slideImage").src = slide.image;

  markSeen(slide.id);

  const seenCount = (flow.book_preview_seen || []).length;
  el("seenCount").textContent = seenCount;

  const btn = el("btnToDevice");
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

  el("btnToDevice").addEventListener("click", () => {
    if ((flow.book_preview_seen || []).length < slides.length) {
      showStatus("error", "กรุณาดูภาพ Safety Book ให้ครบทั้ง 8 ภาพก่อน");
      return;
    }
    window.location.href = "device.html";
  });
}

renderSummary();
bindEvents();
renderSlide();
