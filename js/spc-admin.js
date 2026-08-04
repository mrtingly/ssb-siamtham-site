(function () {
  "use strict";

  function byId(id) {
    return document.getElementById(id);
  }

  function message(text, type) {
    var node = byId("spcMessage");
    if (!node) return;
    node.className = "spc-message" + (type ? " " + type : "");
    node.textContent = text || "";
  }

  function loadAdmin() {
    SPC.protectedRequest("spcAdminDashboard", {}, { redirectUrl: "admin-login.html" })
      .then(function (result) {
        renderAdmin(result);
        message("โหลด SPC Admin สำเร็จ", "success");
      })
      .catch(function (error) {
        message((error.response && error.response.message) || error.message || "โหลด SPC Admin ไม่ได้", "error");
      });
  }

  function renderAdmin(result) {
    var summary = result.summary || {};
    SPC.setText(byId("summaryTotal"), summary.total || 0);
    SPC.setText(byId("summaryNew"), summary.new || 0);
    SPC.setText(byId("summaryEscalated"), summary.escalated || 0);
    SPC.setText(byId("summaryBreached"), summary.sla_breached || 0);
    renderCases(result.recent_cases || []);
    renderOfficers(result.officers || []);
  }

  function renderCases(cases) {
    var body = byId("caseRows");
    SPC.clear(body);
    cases.forEach(function (caseData) {
      var tr = document.createElement("tr");
      ["case_id", "customer_name", "status", "assigned_officer_id", "first_callback_due_at"].forEach(function (field) {
        var td = document.createElement("td");
        td.textContent = caseData[field] || "-";
        tr.appendChild(td);
      });
      body.appendChild(tr);
    });
  }

  function renderOfficers(officers) {
    var body = byId("officerRows");
    SPC.clear(body);
    officers.forEach(function (officer) {
      var tr = document.createElement("tr");
      ["officer_id", "officer_name", "department", "status"].forEach(function (field) {
        var td = document.createElement("td");
        td.textContent = officer[field] || "-";
        tr.appendChild(td);
      });
      body.appendChild(tr);
    });
  }

  function createOfficer(event) {
    event.preventDefault();
    var form = event.currentTarget;
    var button = form.querySelector("button[type='submit']");
    button.disabled = true;
    SPC.protectedRequest("spcCreateOfficer", {
      agent_id: form.elements.agent_id.value.trim(),
      admin_id: form.elements.admin_id.value.trim(),
      officer_name: form.elements.officer_name.value.trim(),
      department: form.elements.department.value.trim(),
      role: form.elements.role.value,
      official_profile_url: form.elements.official_profile_url.value.trim()
    }, { redirectUrl: "admin-login.html" })
      .then(function () {
        form.reset();
        message("สร้างเจ้าหน้าที่ SPC สำเร็จ", "success");
        loadAdmin();
      })
      .catch(function (error) {
        message((error.response && error.response.message) || error.message || "สร้างเจ้าหน้าที่ไม่สำเร็จ", "error");
      })
      .finally(function () {
        button.disabled = false;
      });
  }

  function runIntegrity() {
    var button = byId("runIntegrity");
    button.disabled = true;
    SPC.protectedRequest("spcRunIntegrityCheck", {}, { redirectUrl: "admin-login.html" })
      .then(function (result) {
        var list = byId("integrityList");
        SPC.clear(list);
        (result.anomalies || []).forEach(function (item) {
          var li = document.createElement("li");
          li.textContent = item.case_id + " - " + item.issue;
          list.appendChild(li);
        });
        if (!(result.anomalies || []).length) {
          var ok = document.createElement("li");
          ok.textContent = "ไม่พบ anomaly";
          list.appendChild(ok);
        }
        message("Integrity check เสร็จแล้ว", "success");
      })
      .catch(function (error) {
        message((error.response && error.response.message) || error.message || "Integrity check ไม่สำเร็จ", "error");
      })
      .finally(function () {
        button.disabled = false;
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    loadAdmin();
    var refresh = byId("refreshSpcAdmin");
    if (refresh) refresh.addEventListener("click", loadAdmin);
    var form = byId("officerForm");
    if (form) form.addEventListener("submit", createOfficer);
    var integrity = byId("runIntegrity");
    if (integrity) integrity.addEventListener("click", runIntegrity);
  });
})();
