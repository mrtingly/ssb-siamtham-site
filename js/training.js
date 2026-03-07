import { buildFinalDraft, ensureDevicePreviewDone, saveFlow } from "./ssbFlow.js";

const flow = ensureDevicePreviewDone();
if (!flow) {}

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

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = () => reject(new Error("File read failed"));
    fr.readAsDataURL(file);
  });
}

function bindPreview() {
  el("trainingFile").addEventListener("change", async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    const dataUrl = await fileToDataUrl(f);
    el("trainingPreview").src = dataUrl;
    el("trainingPreview").classList.remove("hidden");
    el("trainingFallback").classList.add("hidden");
  });
}

function bindSubmit() {
  el("btnToAgents").addEventListener("click", async () => {
    const file = el("trainingFile").files?.[0];
    const confirm = el("trainedConfirm").checked;

    if (!file) {
      showStatus("error", "กรุณาอัปโหลดรูปยืนยันการอบรมก่อน");
      return;
    }

    if (!confirm) {
      showStatus("error", "กรุณาติ๊กยืนยันว่าลูกค้าได้รับการอบรมแล้ว");
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);

      flow.training = {
        trained: true,
        training_image_base64: dataUrl
      };

      saveFlow(flow);

      const finalDraft = buildFinalDraft(flow);
      localStorage.setItem("ssb_draft", JSON.stringify(finalDraft));

      window.location.href = "agents.html";
    } catch (e) {
      showStatus("error", "บันทึกรูปไม่สำเร็จ: " + e.message);
    }
  });
}

bindPreview();
bindSubmit();
