const ADMIN_LOGIN_API_URL = window.getSbosApiEndpoint ? window.getSbosApiEndpoint() : "";

async function adminApiPost(payload) {
  const controller = new AbortController();
  const timeoutId = setTimeout(function () {
    controller.abort();
  }, 20000);

  let response;
  try {
    response = await fetch(ADMIN_LOGIN_API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload || {}),
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeoutId);
  }

  const text = await response.text();
  const contentType = response.headers.get("content-type") || "";

  if (!response.ok) {
    return { ok: false, code: "HTTP_ERROR", message: "Network error " + response.status };
  }

  if (contentType.indexOf("text/html") !== -1 || /^\s*</.test(text)) {
    return {
      ok: false,
      code: "NON_JSON_RESPONSE",
      message: "ระบบยืนยันตัวตนไม่พร้อมใช้งาน กรุณาลองใหม่อีกครั้ง"
    };
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    return { ok: false, code: "INVALID_JSON", message: "Invalid API response" };
  }
}

function showAdminLoginMessage(message, type) {
  const box = document.querySelector("#adminLoginMessage");
  if (!box) {
    alert(message);
    return;
  }
  box.hidden = false;
  box.className = "login-message" + (type ? " " + type : "");
  box.textContent = message;
}

function clearAdminLoginMessage() {
  const box = document.querySelector("#adminLoginMessage");
  if (!box) return;
  box.hidden = true;
  box.textContent = "";
  box.className = "login-message";
}

async function adminLogin(event) {
  event.preventDefault();

  const usernameInput = document.querySelector("#admin_username");
  const passwordInput = document.querySelector("#admin_password");
  const submitButton = event.target.querySelector('button[type="submit"]');
  const username = usernameInput ? usernameInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value.trim() : "";

  if (!username || !password) {
    showAdminLoginMessage("กรุณากรอกข้อมูลให้ครบ", "error");
    return;
  }

  try {
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Signing in...";
    }
    clearAdminLoginMessage();

    const result = await adminApiPost({
      action: "login",
      username: username,
      password: password
    });

    if (!result.ok) {
      showAdminLoginMessage(result.message || "เข้าสู่ระบบไม่สำเร็จ", "error");
      return;
    }

    const normalizedRole = String(result.role || "").toUpperCase();
    if (normalizedRole !== "ADMIN" && normalizedRole !== "OWNER") {
      showAdminLoginMessage("บัญชีนี้ไม่มีสิทธิ์เข้า Admin", "error");
      return;
    }

    if (!result.admin_session_token) {
      showAdminLoginMessage("Admin session could not be created. Please login again.", "error");
      return;
    }

    localStorage.setItem("admin_id", result.agent_id);
    localStorage.setItem("admin_name", result.name || "");
    localStorage.setItem("admin_role", result.role || "");
    localStorage.setItem("admin_session_token", result.admin_session_token);
    localStorage.setItem("admin_session_expires_at", String(Date.now() + Number(result.admin_session_expires_in || 0) * 1000));

    window.location.href = "admin-dashboard.html";
  } catch (error) {
    const message = error && error.name === "AbortError"
      ? "ระบบใช้เวลาตอบสนองนานเกินไป กรุณาลองใหม่อีกครั้ง"
      : "เชื่อมต่อระบบไม่ได้";
    showAdminLoginMessage(message, "error");
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "เข้าสู่ระบบ Admin";
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#adminLoginForm");
  if (form) form.addEventListener("submit", adminLogin);
});
