(function () {
  "use strict";

  var API_URL = window.getSbosApiEndpoint ? window.getSbosApiEndpoint() : "";

  function authPayload() {
    var payload = {};
    var adminToken = localStorage.getItem("admin_session_token") || "";
    var agentToken = localStorage.getItem("agent_session_token") || "";

    if (adminToken) {
      payload.admin_session_token = adminToken;
      payload.admin_id = localStorage.getItem("admin_id") || "";
      return payload;
    }

    if (agentToken) {
      payload.agent_session_token = agentToken;
      payload.agent_id = localStorage.getItem("agent_id") || localStorage.getItem("ssb_agent_id") || "";
      return payload;
    }

    return payload;
  }

  function requireSession(redirectUrl) {
    var payload = authPayload();
    if (!payload.admin_session_token && !payload.agent_session_token) {
      window.location.href = redirectUrl || "agent-login.html";
      return null;
    }
    return payload;
  }

  function request(action, data, options) {
    var method = options && options.method === "GET" ? "GET" : "POST";
    var body = Object.assign({}, data || {}, { action: action });

    if (method === "GET") {
      var url = new URL(API_URL);
      Object.keys(body).forEach(function (key) {
        if (body[key] !== undefined && body[key] !== null && key.indexOf("session_token") === -1) {
          url.searchParams.set(key, body[key]);
        }
      });
      return fetch(url.toString(), { method: "GET" }).then(parseResponse);
    }

    return fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body)
    }).then(parseResponse);
  }

  function protectedRequest(action, data, options) {
    var auth = requireSession(options && options.redirectUrl);
    if (!auth) return Promise.reject(new Error("Missing session"));
    return request(action, Object.assign({}, data || {}, auth), options);
  }

  function parseResponse(response) {
    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }
    return response.json().then(function (json) {
      if (!json || json.ok === false) {
        throw Object.assign(new Error((json && json.message) || "SPC API error"), { response: json });
      }
      return json;
    });
  }

  function setText(node, value) {
    if (node) node.textContent = value == null || value === "" ? "-" : String(value);
  }

  function clear(node) {
    while (node && node.firstChild) node.removeChild(node.firstChild);
  }

  window.SPC = {
    request: request,
    protectedRequest: protectedRequest,
    requireSession: requireSession,
    setText: setText,
    clear: clear
  };
})();
