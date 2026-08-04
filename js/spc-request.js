(function () {
  "use strict";

  function byId(id) {
    return document.getElementById(id);
  }

  function formValue(form, name) {
    var field = form.elements[name];
    return field ? field.value.trim() : "";
  }

  function setMessage(message, type) {
    var node = byId("spcMessage");
    if (!node) return;
    node.className = "spc-message" + (type ? " " + type : "");
    node.textContent = message || "";
  }

  function handleCreate(event) {
    event.preventDefault();
    var form = event.currentTarget;
    var submit = form.querySelector("button[type='submit']");
    submit.disabled = true;
    setMessage("กำลังส่งคำขอให้ SPC ตรวจสอบ...");

    SPC.request("spcCreateCase", {
      customer_name: formValue(form, "customer_name"),
      customer_phone: formValue(form, "customer_phone"),
      customer_email: formValue(form, "customer_email"),
      claimed_organization: formValue(form, "claimed_organization"),
      claimed_person: formValue(form, "claimed_person"),
      incident_category: formValue(form, "incident_category"),
      incident_description: formValue(form, "incident_description"),
      risk_level: formValue(form, "risk_level"),
      transaction_in_progress: form.elements.transaction_in_progress.checked,
      amount_involved: formValue(form, "amount_involved"),
      source: "SPC_REQUEST_PAGE"
    }).then(function (result) {
      setMessage("รับเรื่องแล้ว หมายเลขเคส: " + result.case_id + " กรุณาบันทึกรหัสติดตามไว้", "success");
      var token = byId("publicToken");
      if (token) token.value = result.public_case_token || "";
      form.reset();
    }).catch(function (error) {
      setMessage((error.response && error.response.message) || error.message || "ไม่สามารถส่งคำขอได้", "error");
    }).finally(function () {
      submit.disabled = false;
    });
  }

  function handleStatus(event) {
    event.preventDefault();
    var token = formValue(event.currentTarget, "public_case_token");
    var submit = event.currentTarget.querySelector("button[type='submit']");
    submit.disabled = true;
    setMessage("กำลังตรวจสอบสถานะ...");

    SPC.request("spcGetCasePublicStatus", { public_case_token: token }, { method: "GET" })
      .then(renderStatus)
      .catch(function (error) {
        setMessage((error.response && error.response.message) || error.message || "ไม่พบสถานะเคส", "error");
      })
      .finally(function () {
        submit.disabled = false;
      });
  }

  function renderStatus(result) {
    var caseData = result.case || {};
    setMessage("โหลดสถานะสำเร็จ", "success");
    SPC.setText(byId("caseNumber"), caseData.case_id);
    SPC.setText(byId("caseStatus"), caseData.status);
    SPC.setText(byId("caseSubmittedAt"), caseData.submitted_at);
    SPC.setText(byId("caseInstruction"), caseData.current_instruction);
    SPC.setText(byId("caseResult"), caseData.result_summary || "ยังไม่มีผลการตรวจสอบ");
    SPC.setText(byId("officerName"), caseData.assigned_officer && caseData.assigned_officer.officer_name);
    SPC.setText(byId("officerId"), caseData.assigned_officer && caseData.assigned_officer.officer_id);
    var card = byId("statusCard");
    if (card) card.hidden = false;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var createForm = byId("spcRequestForm");
    var statusForm = byId("spcStatusForm");
    if (createForm) createForm.addEventListener("submit", handleCreate);
    if (statusForm) statusForm.addEventListener("submit", handleStatus);
  });
})();
