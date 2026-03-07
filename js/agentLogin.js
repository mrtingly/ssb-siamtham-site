import { ENDPOINT_URL } from "./config.js";

const el = (id) => document.getElementById(id);

function showStatus(type, msg) {
  const box = el("statusBox");
  box.className = `mb-4 p-3 rounded-lg border ${
    type === "error"
      ? "bg-red-50 border-red-200 text-red-700"
      : "bg-green-50 border-green-200 text-green-700"
  }`;
  box.textContent = msg;
  box.classList.remove("hidden");
}

async function agentLogin(payload) {
  const fd = new FormData();
  fd.append("payload", JSON.stringify(payload));

  const res = await fetch(ENDPOINT_URL, {
    method: "POST",
    body: fd
  });

  const text = await res.text();
  let data = {};
  try {
    data = JSON.parse(text);
  } catch {
    data = { ok: false, message: text };
  }
  return data;
}

el("btnLogin").addEventListener("click", async () => {
  const agent_code = el("agentCode").value.trim();
  const phone = el("agentPhone").value.trim();

  if (!agent_code || !phone) {
    showStatus("error", "กรุณากรอก Agent Code และเบอร์โทร");
    return;
  }

  const res = await agentLogin({
    action: "agent_login",
    agent_code,
    phone
  });

  if (res.ok) {
    localStorage.setItem("ssb_agent_session", JSON.stringify(res.agent));
    window.location.href = "agent-dashboard.html";
  } else {
    showStatus("error", res.message || "Login failed");
  }
});
