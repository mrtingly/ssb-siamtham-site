import { submitOrder } from "./api.js";
import { formatTHB } from "./pricing.js";

const ENDPOINT_URL = "https://script.google.com/macros/s/AKfycbyih-9I_oOtMzPkgLNPwZq-NCZ_JMkTetSHbwjoJggB5gcx7Nsjn9QPddjpzoVChs6irg/exec"; // <<<<<< สำคัญ

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

function getDraft() {
  const raw = localStorage.getItem("ssb_draft");
  return raw ? JSON.parse(raw) : null;
}

function setAgentUI(on) {
  el("agentFields").classList.toggle("hidden", !on);
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = () => reject(new Error("File read failed"));
    fr.readAsDataURL(file);
  });
}

function renderSummary(draft) {
  el("summaryBox").innerHTML = draft.summaryLines.map(x => `<div>• ${x}</div>`).join("");
  el("sellTotal").textContent = formatTHB(draft.sell_total);
}

async function main() {
  const draft = getDraft();
  if (!draft) {
    showStatus("error", "ไม่พบข้อมูลจาก Configurator — กรุณากลับไปเลือกสินค้าใหม่");
    return;
  }

  renderSummary(draft);

  el("haveAgent").addEventListener("change", (e) => {
    setAgentUI(e.target.checked);
  });

  el("cardFile").addEventListener("change", async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const dataUrl = await fileToDataUrl(f);
    el("cardPreview").src = dataUrl;
    el("cardPreview").classList.remove("hidden");
  });

  el("btnSubmit").addEventListener("click", async () => {
    try {
      const customer = {
        name: el("custName").value.trim(),
        phone: el("custPhone").value.trim(),
        email: el("custEmail").value.trim()
      };

      if (!customer.name || !customer.phone) {
        return showStatus("error", "กรุณากรอก ชื่อ-นามสกุล และ เบอร์โทร");
      }

      const haveAgent = el("haveAgent").checked;
      let agent = { have_agent: false };

      if (haveAgent) {
        const file = el("cardFile").files?.[0];
        const confirm = el("cardConfirm").checked;

        if (!el("agentCode").value.trim()) return showStatus("error", "กรุณากรอก Agent Code");
        if (!file) return showStatus("error", "กรุณาอัปโหลดรูปบัตรตัวแทน");
        if (!confirm) return showStatus("error", "กรุณาติ๊กยืนยันว่าบัตรจริงตรงกับข้อมูล");

        const cardBase64 = await fileToDataUrl(file);

        agent = {
          have_agent: true,
          agent_code: el("agentCode").value.trim(),
          agent_name: el("agentName").value.trim(),
          agent_phone: el("agentPhone").value.trim(),
          card_image_base64: cardBase64
        };
      }

      const payload = {
        customer,
        agent,
        selection: draft.selection,
        item_keys: draft.item_keys,
        sell_total: draft.sell_total
      };

      showStatus("info", "กำลังส่งออเดอร์ไป Google Sheet...");
      const res = await submitOrder(ENDPOINT_URL, payload);
      showStatus("ok", `สำเร็จ ✅ Order ID: ${res.order_id}`);
    } catch (e) {
      showStatus("error", "ส่งไม่สำเร็จ: " + e.message);
    }
  });
}

main();
