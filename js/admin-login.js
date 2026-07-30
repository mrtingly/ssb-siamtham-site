const ADMIN_LOGIN_API_URL = "https://script.google.com/macros/s/AKfycbyKhWE-_SuKreCPyD4tsNmqNMQz2hZ8hQtrckk92mh8rszh1jaNEeuuFBGsPOLKfAziNg/exec";

async function adminApiPost(payload) {
  const response = await fetch(ADMIN_LOGIN_API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload || {})
  });

  if (!response.ok) {
    return { ok: false, message: "Network error " + response.status };
  }

  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch (error) {
    return { ok: false, message: "Invalid API response" };
  }
}

async function adminLogin(event) {
  event.preventDefault();

  const username = document.querySelector("#admin_username").value.trim();
  const password = document.querySelector("#admin_password").value.trim();

  try {
    const result = await adminApiPost({
      action: "login",
      username: username,
      password: password
    });

    if (!result.ok) {
      alert(result.message || "เข้าสู่ระบบไม่สำเร็จ");
      return;
    }

    const normalizedRole = String(result.role || "").toUpperCase();
    if (normalizedRole !== "ADMIN" && normalizedRole !== "OWNER") {
      alert("บัญชีนี้ไม่มีสิทธิ์เข้า Admin");
      return;
    }

    if (!result.admin_session_token) {
      alert("Admin session could not be created. Please login again.");
      return;
    }

    localStorage.setItem("admin_id", result.agent_id);
    localStorage.setItem("admin_name", result.name);
    localStorage.setItem("admin_role", result.role);
    localStorage.setItem("admin_session_token", result.admin_session_token);
    localStorage.setItem("admin_session_expires_at", String(Date.now() + Number(result.admin_session_expires_in || 0) * 1000));

    window.location.href = "admin-dashboard.html";

  } catch (error) {
    alert("เชื่อมต่อระบบไม่ได้");
  }
}
