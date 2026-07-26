const API_URL = "https://script.google.com/macros/s/AKfycbyKhWE-_SuKreCPyD4tsNmqNMQz2hZ8hQtrckk92mh8rszh1jaNEeuuFBGsPOLKfAziNg/exec";

function jsonp(url) {
  return new Promise((resolve, reject) => {
    const callbackName = "cb_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
    const script = document.createElement("script");

    const cleanup = () => {
      try { delete window[callbackName]; } catch (error) { window[callbackName] = undefined; }
      if (script.parentNode) script.parentNode.removeChild(script);
    };

    window[callbackName] = function (data) {
      cleanup();
      resolve(data);
    };

    script.src = url + "&callback=" + encodeURIComponent(callbackName) + "&_=" + Date.now();
    script.async = true;
    script.onerror = function () {
      cleanup();
      reject(new Error("JSONP request failed"));
    };

    document.body.appendChild(script);
  });
}

function togglePassword() {
  const passwordInput = document.querySelector("#password");
  if (!passwordInput) return;
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
}

function clearOldAgentSession() {
  [
    "agent_id",
    "agent_name",
    "agent_role",
    "agent_status",
    "ssb_agent_id",
    "ssb_current_agent_v1",
    "ssb_agent_session",
    "ssb_agent_session_v1"
  ].forEach(key => localStorage.removeItem(key));
}

function saveAgentSession(res, username) {
  clearOldAgentSession();

  const status = String(res.status || "").trim().toUpperCase();
  const session = {
    agent_id: res.agent_id,
    applicationId: res.agent_id,
    username,
    name: res.name || "",
    role: res.role || "Agent",
    status,
    training_progress: Number(res.training_progress || 0),
    training_completed: res.training_completed === true,
    exam_score: Number(res.exam_score || 0),
    exam_passed: res.exam_passed === true,
    exam_attempts: Number(res.exam_attempts || 0),
    loginAt: new Date().toISOString()
  };

  localStorage.setItem("agent_id", res.agent_id);
  localStorage.setItem("agent_name", res.name || "");
  localStorage.setItem("agent_role", res.role || "Agent");
  localStorage.setItem("agent_status", status);
  localStorage.setItem("ssb_agent_id", res.agent_id);
  localStorage.setItem("ssb_current_agent_v1", res.agent_id);
  localStorage.setItem("ssb_agent_session", JSON.stringify(session));
  localStorage.setItem("ssb_agent_session_v1", JSON.stringify(session));
}

function routeByStatus(res) {
  const status = String(res.status || "").trim().toUpperCase();

  if (status === "REGISTERED" || status === "TRAINING") {
    return "agent-learning.html";
  }

  if (status === "EXAM") {
    return "agent-exam.html";
  }

  if (status === "WAIT_APPROVAL" || status === "PENDING") {
    return "agent-waiting.html";
  }

  if (status === "APPROVED") {
    return "agent-dashboard.html";
  }

  return "agent-login.html";
}

async function doLogin(e) {
  e.preventDefault();

  const usernameInput = document.querySelector("#username");
  const passwordInput = document.querySelector("#password");
  const submitButton = e.target.querySelector('button[type="submit"]');
  const username = usernameInput ? usernameInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value.trim() : "";

  if (!username || !password) {
    alert("กรุณากรอก Agent ID หรือ Email และ Password");
    return;
  }

  const url = API_URL + "?action=login" +
    "&username=" + encodeURIComponent(username) +
    "&password=" + encodeURIComponent(password);

  try {
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "กำลังเข้าสู่ระบบ...";
    }

    const res = await jsonp(url);

    if (!res || !res.ok) {
      alert((res && res.message) || "เข้าสู่ระบบไม่สำเร็จ");
      return;
    }

    saveAgentSession(res, username);
    window.location.replace(routeByStatus(res));

  } catch (err) {
    console.error("Agent login error:", err);
    alert("เชื่อมต่อระบบไม่ได้ กรุณาลองใหม่อีกครั้ง");
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "เข้าสู่ระบบ";
    }
  }
}