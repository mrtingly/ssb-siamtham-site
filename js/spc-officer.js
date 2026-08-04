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

  function caseLink(caseId) {
    var a = document.createElement("a");
    a.href = "spc-case-detail.html?case_id=" + encodeURIComponent(caseId);
    a.textContent = caseId;
    return a;
  }

  function loadDashboard() {
    var list = byId("caseList");
    if (!list) return;
    message("กำลังโหลดเคส SPC...");
    SPC.protectedRequest("spcOfficerDashboard", {}, { redirectUrl: "agent-login.html" })
      .then(function (result) {
        renderDashboard(result);
        message("โหลดข้อมูลสำเร็จ", "success");
      })
      .catch(function (error) {
        message((error.response && error.response.message) || error.message || "โหลดข้อมูลไม่ได้", "error");
      });
  }

  function renderDashboard(result) {
    var list = byId("caseList");
    SPC.clear(list);
    var summary = result.summary || {};
    SPC.setText(byId("summaryTotal"), summary.total || 0);
    SPC.setText(byId("summaryNew"), summary.new || 0);
    SPC.setText(byId("summaryWaiting"), summary.waiting_for_agency || 0);
    SPC.setText(byId("summaryReady"), summary.ready_to_report || 0);
    (result.cases || []).forEach(function (caseData) {
      var card = document.createElement("article");
      card.className = "spc-case";
      var title = document.createElement("h2");
      title.appendChild(caseLink(caseData.case_id));
      var meta = document.createElement("p");
      meta.textContent = [caseData.customer_name, caseData.status, caseData.first_callback_due_at].filter(Boolean).join(" | ");
      var actions = document.createElement("div");
      actions.className = "spc-actions";
      if (caseData.status === "NEW") {
        var accept = document.createElement("button");
        accept.className = "spc-button";
        accept.type = "button";
        accept.textContent = "Accept";
        accept.setAttribute("aria-label", "Accept SPC case " + caseData.case_id);
        accept.addEventListener("click", function () { acceptCase(caseData.case_id, accept); });
        actions.appendChild(accept);
      }
      card.appendChild(title);
      card.appendChild(meta);
      card.appendChild(actions);
      list.appendChild(card);
    });
    if (!(result.cases || []).length) {
      var empty = document.createElement("p");
      empty.textContent = "ยังไม่มีเคสในคิว";
      list.appendChild(empty);
    }
  }

  function acceptCase(caseId, button) {
    button.disabled = true;
    SPC.protectedRequest("spcAcceptCase", { case_id: caseId }, { redirectUrl: "agent-login.html" })
      .then(function () {
        message("รับเคสสำเร็จ", "success");
        loadDashboard();
      })
      .catch(function (error) {
        message((error.response && error.response.message) || error.message || "รับเคสไม่สำเร็จ", "error");
      })
      .finally(function () {
        button.disabled = false;
      });
  }

  function queryParam(name) {
    return new URLSearchParams(window.location.search).get(name) || "";
  }

  function loadDetail() {
    var caseId = queryParam("case_id");
    if (!byId("caseDetail") || !caseId) return;
    SPC.protectedRequest("spcGetCaseDetail", { case_id: caseId }, { redirectUrl: "agent-login.html" })
      .then(function (result) {
        renderDetail(result.case || {});
        message("โหลดข้อมูลเคสสำเร็จ", "success");
      })
      .catch(function (error) {
        message((error.response && error.response.message) || error.message || "โหลดเคสไม่ได้", "error");
      });
  }

  function renderDetail(caseData) {
    SPC.setText(byId("detailCaseId"), caseData.case_id);
    SPC.setText(byId("detailStatus"), caseData.status);
    SPC.setText(byId("detailCustomer"), caseData.customer_name);
    SPC.setText(byId("detailPhone"), caseData.customer_phone);
    SPC.setText(byId("detailOrg"), caseData.claimed_organization);
    SPC.setText(byId("detailDescription"), caseData.incident_description);
    renderChecklists(caseData);
  }

  function renderChecklists(caseData) {
    var wrap = byId("checklistWrap");
    if (!wrap) return;
    SPC.clear(wrap);
    (caseData.checklists || []).forEach(function (checklist) {
      var section = document.createElement("section");
      section.className = "spc-case";
      var h = document.createElement("h3");
      h.textContent = checklist.applicable_state;
      section.appendChild(h);
      (checklist.items || []).forEach(function (item) {
        var label = document.createElement("label");
        label.className = "spc-field";
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = Boolean(item.value);
        checkbox.addEventListener("change", function () {
          submitChecklist(caseData.case_id, checklist.checklist_instance_id, item.checklist_item_id, checkbox);
        });
        var span = document.createElement("span");
        span.textContent = item.label;
        label.appendChild(checkbox);
        label.appendChild(span);
        section.appendChild(label);
      });
      wrap.appendChild(section);
    });
  }

  function submitChecklist(caseId, instanceId, itemId, checkbox) {
    checkbox.disabled = true;
    SPC.protectedRequest("spcSubmitChecklistResult", {
      case_id: caseId,
      checklist_instance_id: instanceId,
      checklist_item_id: itemId,
      value: checkbox.checked ? "DONE" : ""
    }, { redirectUrl: "agent-login.html" })
      .then(function () { message("บันทึก checklist แล้ว", "success"); })
      .catch(function (error) {
        checkbox.checked = !checkbox.checked;
        message((error.response && error.response.message) || error.message || "บันทึก checklist ไม่สำเร็จ", "error");
      })
      .finally(function () { checkbox.disabled = false; });
  }

  function bindAction(id, action, payloadBuilder) {
    var button = byId(id);
    if (!button) return;
    button.addEventListener("click", function () {
      var payload = payloadBuilder ? payloadBuilder() : {};
      payload.case_id = queryParam("case_id");
      button.disabled = true;
      SPC.protectedRequest(action, payload, { redirectUrl: "agent-login.html" })
        .then(function (result) {
          message("ดำเนินการสำเร็จ: " + (result.status || action), "success");
          loadDetail();
        })
        .catch(function (error) {
          message((error.response && error.response.message) || error.message || "ดำเนินการไม่สำเร็จ", "error");
        })
        .finally(function () { button.disabled = false; });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var refresh = byId("refreshOfficerDashboard");
    if (refresh) refresh.addEventListener("click", loadDashboard);
    loadDashboard();
    loadDetail();
    bindAction("startCallback", "spcStartFirstCallback", function () {
      return { contact_method: "PHONE", comment: "First callback started." };
    });
    bindAction("completeCallback", "spcCompleteFirstCallback", function () {
      return { comment: "Time Barrier warning provided." };
    });
    bindAction("waitingAgency", "spcSetWaitingForAgency", function () {
      return { comment: byId("workNote").value.trim() || "Waiting for agency response." };
    });
    bindAction("scheduleFollowUp", "spcScheduleFollowUp", function () {
      return { comment: byId("workNote").value.trim() || "Follow up required." };
    });
    bindAction("addVerification", "spcAddVerificationRecord", function () {
      return {
        organization_name: byId("organizationName").value.trim(),
        contact_method: byId("contactMethod").value.trim(),
        verification_action: byId("verificationAction").value.trim(),
        verification_result: byId("verificationResult").value.trim()
      };
    });
    bindAction("prepareResult", "spcPrepareResult", function () {
      return {
        result_type: byId("resultType").value,
        result_summary: byId("resultSummary").value.trim()
      };
    });
    bindAction("reportResult", "spcReportResult", function () {
      return { comment: "Result reported to customer." };
    });
  });
})();
