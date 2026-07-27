(function () {
  const API_URL = "https://script.google.com/macros/s/AKfycbyKhWE-_SuKreCPyD4tsNmqNMQz2hZ8hQtrckk92mh8rszh1jaNEeuuFBGsPOLKfAziNg/exec";
  const PAGE_SIZE = 10;
  const REQUEST_TIMEOUT_MS = 30000;

  const state = {
    agents: [],
    pendingAgents: [],
    currentPage: 1,
    searchQuery: "",
    loading: {
      summary: false,
      pending: false,
      agents: false
    },
    busyAgentIds: new Set()
  };

  const els = {};

  function byId(id) {
    return document.getElementById(id);
  }

  function valueText(value) {
    if (value === null || value === undefined) return "-";
    const clean = String(value).trim();
    return clean || "-";
  }

  function setText(element, value) {
    if (element) element.textContent = valueText(value);
  }

  function setHidden(element, hidden) {
    if (element) element.hidden = hidden;
  }

  function fullName(agent) {
    const directName = valueText(agent && agent.name);
    if (directName !== "-") return directName;

    const firstName = valueText(agent && agent.first_name);
    const lastName = valueText(agent && agent.last_name);
    return [firstName, lastName].filter(function (part) {
      return part !== "-";
    }).join(" ") || "-";
  }

  function normalizeStatus(status) {
    return valueText(status).toUpperCase().replace(/[^A-Z0-9]+/g, "_");
  }

  function formatDate(value) {
    const raw = valueText(value);
    if (raw === "-") return "-";

    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) return raw;

    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  function clearChildren(element) {
    if (!element) return;
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function createCell(value) {
    const cell = document.createElement("td");
    cell.textContent = valueText(value);
    return cell;
  }

  function createAgentNameCell(agent) {
    const cell = document.createElement("td");
    const wrap = document.createElement("div");
    const name = document.createElement("strong");
    const sub = document.createElement("span");

    wrap.className = "agent-name";
    name.textContent = fullName(agent);
    sub.textContent = valueText(agent.email || agent.role || "Agent");

    wrap.append(name, sub);
    cell.appendChild(wrap);
    return cell;
  }

  function createStatusCell(status) {
    const cell = document.createElement("td");
    const badge = document.createElement("span");
    const normalized = normalizeStatus(status);

    badge.className = "status-badge " + normalized.toLowerCase();
    badge.textContent = normalized;
    cell.appendChild(badge);
    return cell;
  }

  function createEmptyRow(colspan, message) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.className = "empty-row";
    cell.colSpan = colspan;
    cell.textContent = message;
    row.appendChild(cell);
    return row;
  }

  function showToast(type, message) {
    if (!els.toastRegion) return;

    const toast = document.createElement("div");
    toast.className = "toast " + type;
    toast.textContent = message;
    els.toastRegion.appendChild(toast);

    window.setTimeout(function () {
      toast.remove();
    }, 4200);
  }

  function isAnyLoading() {
    return state.loading.summary || state.loading.pending || state.loading.agents;
  }

  function setLoading(section, isLoading) {
    state.loading[section] = isLoading;

    if (section === "summary") {
      document.querySelectorAll(".summary-card").forEach(function (card) {
        card.classList.toggle("is-loading", isLoading);
      });
      if (els.retryAllButton) els.retryAllButton.disabled = isLoading || isAnyLoading();
    }

    if (section === "pending") {
      setHidden(els.pendingLoading, !isLoading);
      if (els.retryPendingButton) els.retryPendingButton.disabled = isLoading;
    }

    if (section === "agents") {
      setHidden(els.agentsLoading, !isLoading);
      if (els.retryAgentsButton) els.retryAgentsButton.disabled = isLoading;
    }
  }

  function showPageError(title, message) {
    setHidden(els.pageStatus, false);
    setText(els.pageStatusTitle, title || "ไม่สามารถโหลดข้อมูลได้");
    setText(els.pageStatusText, message || "กรุณาลองใหม่อีกครั้ง");
  }

  function clearPageError() {
    setHidden(els.pageStatus, true);
  }

  function jsonp(action, params) {
    const callbackName = "sbos_admin_cb_" + Date.now() + "_" + Math.floor(Math.random() * 100000);
    const query = new URLSearchParams(Object.assign({}, params || {}, {
      action: action,
      callback: callbackName,
      _: Date.now()
    }));

    return new Promise(function (resolve, reject) {
      const script = document.createElement("script");
      let settled = false;
      const timer = window.setTimeout(function () {
        cleanup();
        reject(new Error("เชื่อมต่อ API เกินเวลาที่กำหนด"));
      }, REQUEST_TIMEOUT_MS);

      function cleanup() {
        if (settled) return;
        settled = true;
        window.clearTimeout(timer);
        try {
          delete window[callbackName];
        } catch (error) {
          window[callbackName] = undefined;
        }
        if (script.parentNode) script.parentNode.removeChild(script);
      }

      window[callbackName] = function (data) {
        cleanup();
        resolve(data);
      };

      script.async = true;
      script.src = API_URL + "?" + query.toString();
      script.onerror = function () {
        cleanup();
        reject(new Error("ไม่สามารถโหลดข้อมูลได้"));
      };

      document.body.appendChild(script);
    }).then(function (data) {
      if (!data || typeof data !== "object") {
        throw new Error("API ส่งข้อมูลไม่ถูกต้อง");
      }
      if (data.ok === false) {
        throw new Error(data.message || "API Error");
      }
      return data;
    });
  }

  function renderSummary(summary) {
    const safeSummary = summary || {};
    setText(els.summaryTotal, Number(safeSummary.total || 0));
    setText(els.summaryPending, Number(safeSummary.wait_approval || 0));
    setText(els.summaryApproved, Number(safeSummary.approved || 0));
    setText(els.summarySuspended, Number(safeSummary.suspended || 0));
    setText(els.summaryRejected, Number(safeSummary.rejected || 0));
  }

  function renderPending() {
    clearChildren(els.pendingTableBody);

    if (!state.pendingAgents.length) {
      setHidden(els.pendingEmpty, false);
      els.pendingTableBody.appendChild(createEmptyRow(7, "ไม่มีตัวแทนที่รออนุมัติ"));
      setText(els.pendingMeta, "0 รายการ");
      return;
    }

    setHidden(els.pendingEmpty, true);
    state.pendingAgents.forEach(function (agent) {
      const agentId = valueText(agent.agent_id);
      const busy = state.busyAgentIds.has(agentId);
      const row = document.createElement("tr");
      const actionCell = document.createElement("td");
      const actionWrap = document.createElement("div");
      const approveButton = document.createElement("button");
      const rejectButton = document.createElement("button");

      row.appendChild(createAgentNameCell(agent));
      row.appendChild(createCell(agentId));
      row.appendChild(createCell(agent.phone));
      row.appendChild(createCell(agent.email));
      row.appendChild(createCell(formatDate(agent.created_at)));
      row.appendChild(createStatusCell(agent.status));

      actionWrap.className = "row-actions";
      approveButton.type = "button";
      approveButton.className = "action-btn approve";
      approveButton.dataset.action = "approve";
      approveButton.dataset.agentId = agentId;
      approveButton.disabled = busy;
      approveButton.setAttribute("aria-label", "Approve agent " + agentId);
      approveButton.textContent = busy ? "Working..." : "Approve";

      rejectButton.type = "button";
      rejectButton.className = "action-btn reject";
      rejectButton.dataset.action = "reject";
      rejectButton.dataset.agentId = agentId;
      rejectButton.disabled = busy;
      rejectButton.setAttribute("aria-label", "Reject agent " + agentId);
      rejectButton.textContent = busy ? "Working..." : "Reject";

      actionWrap.append(approveButton, rejectButton);
      actionCell.appendChild(actionWrap);
      row.appendChild(actionCell);
      els.pendingTableBody.appendChild(row);
    });

    setText(els.pendingMeta, `${state.pendingAgents.length} รายการ`);
  }

  function filteredAgents() {
    const query = state.searchQuery.trim().toLocaleLowerCase("th-TH");
    if (!query) return state.agents.slice();

    return state.agents.filter(function (agent) {
      const searchable = [
        fullName(agent),
        agent.agent_id,
        agent.email,
        agent.facebook,
        agent.line,
        agent.phone
      ].map(valueText).join(" ").toLocaleLowerCase("th-TH");

      return searchable.indexOf(query) !== -1;
    });
  }

  function renderAgents() {
    clearChildren(els.agentsTableBody);

    const filtered = filteredAgents();
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    state.currentPage = Math.min(Math.max(1, state.currentPage), totalPages);

    const start = (state.currentPage - 1) * PAGE_SIZE;
    const pageRows = filtered.slice(start, start + PAGE_SIZE);

    if (!pageRows.length) {
      setHidden(els.agentsEmpty, false);
      els.agentsTableBody.appendChild(createEmptyRow(7, "ไม่พบข้อมูลตัวแทน"));
    } else {
      setHidden(els.agentsEmpty, true);
      pageRows.forEach(function (agent) {
        const row = document.createElement("tr");
        row.appendChild(createCell(agent.agent_id));
        row.appendChild(createAgentNameCell(agent));
        row.appendChild(createCell(agent.phone));
        row.appendChild(createCell(agent.email));
        row.appendChild(createCell(agent.facebook));
        row.appendChild(createCell(agent.line));
        row.appendChild(createStatusCell(agent.status));
        els.agentsTableBody.appendChild(row);
      });
    }

    const shownStart = filtered.length ? start + 1 : 0;
    const shownEnd = Math.min(start + PAGE_SIZE, filtered.length);
    setText(els.agentsMeta, `${filtered.length} รายการจากทั้งหมด ${state.agents.length} รายการ`);
    setText(els.paginationInfo, `แสดง ${shownStart}-${shownEnd} จาก ${filtered.length} รายการ`);

    if (els.prevPageButton) els.prevPageButton.disabled = state.currentPage <= 1;
    if (els.nextPageButton) els.nextPageButton.disabled = state.currentPage >= totalPages;
  }

  async function loadSummary() {
    setLoading("summary", true);
    try {
      const data = await jsonp("getAdminDashboard");
      renderSummary(data.summary);
      clearPageError();
      return true;
    } catch (error) {
      showPageError("ไม่สามารถโหลดข้อมูลได้", "Dashboard Summary โหลดไม่สำเร็จ");
      showToast("error", "Dashboard Summary โหลดไม่สำเร็จ");
      return false;
    } finally {
      setLoading("summary", false);
    }
  }

  async function loadPending() {
    setLoading("pending", true);
    setHidden(els.pendingError, true);
    try {
      const data = await jsonp("listPendingAgents");
      state.pendingAgents = Array.isArray(data.agents) ? data.agents : [];
      renderPending();
      return true;
    } catch (error) {
      state.pendingAgents = [];
      renderPending();
      setHidden(els.pendingError, false);
      setText(els.pendingMeta, "Pending Agents โหลดไม่สำเร็จ");
      showToast("error", "Pending Agents โหลดไม่สำเร็จ");
      return false;
    } finally {
      setLoading("pending", false);
    }
  }

  async function loadAgents() {
    setLoading("agents", true);
    setHidden(els.agentsError, true);
    try {
      const data = await jsonp("listAgents", { limit: 500 });
      state.agents = Array.isArray(data.agents) ? data.agents : [];
      renderAgents();
      return true;
    } catch (error) {
      state.agents = [];
      renderAgents();
      setHidden(els.agentsError, false);
      setText(els.agentsMeta, "Agents โหลดไม่สำเร็จ");
      showToast("error", "Agents โหลดไม่สำเร็จ");
      return false;
    } finally {
      setLoading("agents", false);
    }
  }

  async function refreshAgentData() {
    const results = await Promise.all([
      loadSummary().catch(function () { return false; }),
      loadPending().catch(function () { return false; }),
      loadAgents().catch(function () { return false; })
    ]);

    const failed = results.some(function (result) {
      return result === false;
    });

    if (!failed) clearPageError();
    return !failed;
  }

  async function loadAll() {
    if (isAnyLoading()) return;
    if (els.retryAllButton) els.retryAllButton.disabled = true;
    await refreshAgentData();
    if (els.retryAllButton) els.retryAllButton.disabled = false;
  }

  async function updateAgentStatus(agentId, action) {
    const cleanAgentId = valueText(agentId);
    if (cleanAgentId === "-") return;

    const isApprove = action === "approve";
    const confirmed = window.confirm(isApprove
      ? `ยืนยันอนุมัติตัวแทน ${cleanAgentId}?`
      : `ยืนยันปฏิเสธตัวแทน ${cleanAgentId}?`);

    if (!confirmed) {
      showToast("warning", "ยกเลิกการดำเนินการ");
      return;
    }

    state.busyAgentIds.add(cleanAgentId);
    renderPending();

    try {
      await jsonp(isApprove ? "approveAgent" : "rejectAgent", { agent_id: cleanAgentId });
      showToast("success", isApprove ? "อนุมัติตัวแทนเรียบร้อย" : "ปฏิเสธตัวแทนเรียบร้อย");
      await refreshAgentData();
    } catch (error) {
      showToast("error", error.message || "ไม่สามารถอัปเดตสถานะตัวแทนได้");
      await loadPending();
    } finally {
      state.busyAgentIds.delete(cleanAgentId);
      renderPending();
    }
  }

  function bindEvents() {
    if (els.retryAllButton) {
      els.retryAllButton.addEventListener("click", function () {
        if (!isAnyLoading()) loadAll();
      });
    }

    if (els.retryPendingButton) {
      els.retryPendingButton.addEventListener("click", function () {
        if (!state.loading.pending) loadPending();
      });
    }

    if (els.retryAgentsButton) {
      els.retryAgentsButton.addEventListener("click", function () {
        if (!state.loading.agents) loadAgents();
      });
    }

    if (els.agentSearch) {
      els.agentSearch.addEventListener("input", function (event) {
        state.searchQuery = event.target.value || "";
        state.currentPage = 1;
        renderAgents();
      });
    }

    if (els.prevPageButton) {
      els.prevPageButton.addEventListener("click", function () {
        state.currentPage -= 1;
        renderAgents();
      });
    }

    if (els.nextPageButton) {
      els.nextPageButton.addEventListener("click", function () {
        state.currentPage += 1;
        renderAgents();
      });
    }

    if (els.pendingTableBody) {
      els.pendingTableBody.addEventListener("click", function (event) {
        const button = event.target.closest("button[data-action][data-agent-id]");
        if (!button || button.disabled) return;
        updateAgentStatus(button.dataset.agentId, button.dataset.action).catch(function (error) {
          showToast("error", error.message || "เกิดข้อผิดพลาด");
        });
      });
    }
  }

  function cacheElements() {
    [
      "adminName",
      "pageStatus",
      "pageStatusTitle",
      "pageStatusText",
      "retryAllButton",
      "summaryTotal",
      "summaryPending",
      "summaryApproved",
      "summarySuspended",
      "summaryRejected",
      "pendingMeta",
      "pendingLoading",
      "pendingError",
      "pendingEmpty",
      "retryPendingButton",
      "pendingTableBody",
      "agentsMeta",
      "agentsLoading",
      "agentsError",
      "agentsEmpty",
      "retryAgentsButton",
      "agentSearch",
      "agentsTableBody",
      "paginationInfo",
      "prevPageButton",
      "nextPageButton",
      "toastRegion"
    ].forEach(function (id) {
      els[id] = byId(id);
    });
  }

  function init() {
    cacheElements();
    setText(els.adminName, localStorage.getItem("admin_name") || localStorage.getItem("admin_role") || "Admin");
    renderSummary({});
    renderPending();
    renderAgents();
    bindEvents();
    loadAll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
