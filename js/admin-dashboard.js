(function () {
  const API_URL = "https://script.google.com/macros/s/AKfycbyKhWE-_SuKreCPyD4tsNmqNMQz2hZ8hQtrckk92mh8rszh1jaNEeuuFBGsPOLKfAziNg/exec";
  const PAGE_SIZE = 10;
  const REQUEST_TIMEOUT_MS = 30000;
  const SEARCH_DEBOUNCE_MS = 280;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const state = {
    agents: [],
    pendingAgents: [],
    currentPage: 1,
    searchQuery: "",
    statusFilter: "",
    searchTimer: null,
    hasError: false,
    liveState: "ready",
    lastUpdatedAt: null,
    lastSummary: {
      total: 0,
      wait_approval: 0,
      approved: 0,
      suspended: 0,
      rejected: 0
    },
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

  function i18nReady() {
    return window.SBOSI18n && window.SBOSI18n.ready ? window.SBOSI18n.ready : Promise.resolve();
  }

  function t(key, fallback) {
    if (window.SBOSI18n && typeof window.SBOSI18n.t === "function") {
      const translated = window.SBOSI18n.t(key);
      return translated === key && fallback ? fallback : translated;
    }
    return fallback || key;
  }

  function tf(key, values, fallback) {
    let text = t(key, fallback);
    Object.keys(values || {}).forEach(function (name) {
      text = text.replace(new RegExp("\\{" + name + "\\}", "g"), String(values[name]));
    });
    return text;
  }

  function currentLocale() {
    return window.SBOSI18n && window.SBOSI18n.getLanguage && window.SBOSI18n.getLanguage() === "en" ? "en-US" : "th-TH";
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

  function statusLabel(status) {
    const normalized = normalizeStatus(status);
    return t("adminDashboard.status." + normalized, normalized);
  }

  function formatDate(value) {
    const raw = valueText(value);
    if (raw === "-") return "-";

    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) return raw;

    return date.toLocaleDateString(currentLocale(), {
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
    badge.textContent = statusLabel(status);
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
    if (!els.toastRegion) return null;

    const toast = document.createElement("div");
    toast.className = "toast " + type;
    toast.textContent = message;
    els.toastRegion.appendChild(toast);

    window.setTimeout(function () {
      toast.remove();
    }, 4200);

    return toast;
  }

  function updateLiveState(stateName) {
    if (!els.liveStatus) return;

    state.liveState = stateName;
    els.liveStatus.className = "live-pill " + stateName;
    if (stateName === "loading") {
      els.liveStatus.textContent = t("adminDashboard.syncing", "Syncing");
      return;
    }
    if (stateName === "error") {
      els.liveStatus.textContent = t("adminDashboard.needsAttention", "Needs attention");
      return;
    }
    els.liveStatus.textContent = t("adminDashboard.liveData", "Live data");
  }

  function renderLastUpdated() {
    if (!els.lastUpdated) return;

    if (!state.lastUpdatedAt) {
      els.lastUpdated.textContent = t("adminDashboard.lastUpdatedEmpty", "Last updated: -");
      return;
    }

    const time = state.lastUpdatedAt.toLocaleTimeString(currentLocale(), {
      hour: "2-digit",
      minute: "2-digit"
    });
    els.lastUpdated.textContent = tf("adminDashboard.lastUpdated", { time: time }, "Last updated: {time}");
  }

  function updateLastUpdated() {
    state.lastUpdatedAt = new Date();
    renderLastUpdated();
  }

  function animateNumber(element, fromValue, toValue) {
    if (!element) return;

    const from = Number(fromValue || 0);
    const to = Number(toValue || 0);
    if (prefersReducedMotion || from === to) {
      setText(element, to);
      return;
    }

    const startedAt = window.performance.now();
    const duration = 640;

    function step(now) {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = String(Math.round(from + (to - from) * eased));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }

  function isAnyLoading() {
    return state.loading.summary || state.loading.pending || state.loading.agents;
  }

  function setLoading(section, isLoading) {
    state.loading[section] = isLoading;
    updateLiveState(isAnyLoading() ? "loading" : (state.hasError ? "error" : "ready"));

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
    setText(els.pageStatusTitle, title || t("adminDashboard.unableToLoad", "Unable to load data"));
    setText(els.pageStatusText, message || t("adminDashboard.tryAgain", "Please try again."));
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
        reject(new Error(t("adminDashboard.apiTimeout", "API request timed out")));
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
        reject(new Error(t("adminDashboard.unableToLoad", "Unable to load data")));
      };

      document.body.appendChild(script);
    }).then(function (data) {
      if (!data || typeof data !== "object") {
        throw new Error(t("adminDashboard.apiInvalid", "Invalid API response"));
      }
      if (data.ok === false) {
        throw new Error(data.message || "API Error");
      }
      return data;
    });
  }

  function renderSummary(summary) {
    const safeSummary = summary || {};
    const nextSummary = {
      total: Number(safeSummary.total || 0),
      wait_approval: Number(safeSummary.wait_approval || 0),
      approved: Number(safeSummary.approved || 0),
      suspended: Number(safeSummary.suspended || 0),
      rejected: Number(safeSummary.rejected || 0)
    };

    animateNumber(els.summaryTotal, state.lastSummary.total, nextSummary.total);
    animateNumber(els.summaryPending, state.lastSummary.wait_approval, nextSummary.wait_approval);
    animateNumber(els.summaryApproved, state.lastSummary.approved, nextSummary.approved);
    animateNumber(els.summarySuspended, state.lastSummary.suspended, nextSummary.suspended);
    animateNumber(els.summaryRejected, state.lastSummary.rejected, nextSummary.rejected);
    state.lastSummary = nextSummary;
  }

  function renderPending() {
    clearChildren(els.pendingTableBody);

    if (!state.pendingAgents.length) {
      setHidden(els.pendingEmpty, false);
      els.pendingTableBody.appendChild(createEmptyRow(7, t("adminDashboard.pending.emptyRow", "No pending agents")));
      setText(els.pendingMeta, tf("adminDashboard.pending.count", { count: 0 }, "{count} items"));
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
      approveButton.setAttribute("aria-label", tf("adminDashboard.aria.approveAgent", { agentId: agentId }, "Approve agent {agentId}"));
      approveButton.textContent = busy ? t("adminDashboard.action.working", "Working...") : t("adminDashboard.action.approve", "Approve");

      rejectButton.type = "button";
      rejectButton.className = "action-btn reject";
      rejectButton.dataset.action = "reject";
      rejectButton.dataset.agentId = agentId;
      rejectButton.disabled = busy;
      rejectButton.setAttribute("aria-label", tf("adminDashboard.aria.rejectAgent", { agentId: agentId }, "Reject agent {agentId}"));
      rejectButton.textContent = busy ? t("adminDashboard.action.working", "Working...") : t("adminDashboard.action.reject", "Reject");

      actionWrap.append(approveButton, rejectButton);
      actionCell.appendChild(actionWrap);
      row.appendChild(actionCell);
      els.pendingTableBody.appendChild(row);
    });

    setText(els.pendingMeta, tf("adminDashboard.pending.count", { count: state.pendingAgents.length }, "{count} items"));
  }

  function filteredAgents() {
    const query = state.searchQuery.trim().toLocaleLowerCase("th-TH");
    const status = state.statusFilter;

    return state.agents.filter(function (agent) {
      if (status && normalizeStatus(agent.status) !== status) {
        return false;
      }

      if (!query) {
        return true;
      }

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
      els.agentsTableBody.appendChild(createEmptyRow(7, t("adminDashboard.agents.emptyRow", "No agents found")));
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
    setText(els.agentsMeta, tf("adminDashboard.agents.meta", {
      filtered: filtered.length,
      total: state.agents.length
    }, "{filtered} items from {total} total"));
    setText(els.paginationInfo, filtered.length ? tf("adminDashboard.pagination", {
      start: shownStart,
      end: shownEnd,
      total: filtered.length
    }, "Showing {start}-{end} of {total}") : t("adminDashboard.paginationEmpty", "Showing 0-0 of 0"));
    setText(els.searchResultCount, tf("adminDashboard.results", { count: filtered.length }, "{count} results"));

    if (els.prevPageButton) els.prevPageButton.disabled = state.currentPage <= 1;
    if (els.nextPageButton) els.nextPageButton.disabled = state.currentPage >= totalPages;
    if (els.clearSearchButton) els.clearSearchButton.hidden = !state.searchQuery;
  }

  async function loadSummary() {
    setLoading("summary", true);
    try {
      const data = await jsonp("getAdminDashboard");
      renderSummary(data.summary);
      clearPageError();
      updateLastUpdated();
      return true;
    } catch (error) {
      state.hasError = true;
      showPageError(t("adminDashboard.unableToLoad", "Unable to load data"), t("adminDashboard.tryAgain", "Please try again."));
      showToast("error", t("adminDashboard.unableToLoad", "Unable to load data"));
      updateLiveState("error");
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
      state.hasError = true;
      state.pendingAgents = [];
      renderPending();
      setHidden(els.pendingError, false);
      setText(els.pendingMeta, t("adminDashboard.pending.error", "Pending Agents failed to load"));
      showToast("error", t("adminDashboard.pending.error", "Pending Agents failed to load"));
      updateLiveState("error");
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
      state.hasError = true;
      state.agents = [];
      renderAgents();
      setHidden(els.agentsError, false);
      setText(els.agentsMeta, t("adminDashboard.agents.error", "Agents failed to load"));
      showToast("error", t("adminDashboard.agents.error", "Agents failed to load"));
      updateLiveState("error");
      return false;
    } finally {
      setLoading("agents", false);
    }
  }

  async function refreshAgentData() {
    state.hasError = false;
    const results = await Promise.all([
      loadSummary().catch(function () { return false; }),
      loadPending().catch(function () { return false; }),
      loadAgents().catch(function () { return false; })
    ]);

    const failed = results.some(function (result) {
      return result === false;
    });

    if (!failed) {
      clearPageError();
      state.hasError = false;
      updateLiveState("ready");
    } else {
      updateLiveState("error");
    }
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
      ? tf("adminDashboard.confirmApprove", { agentId: cleanAgentId }, "Approve agent {agentId}?")
      : tf("adminDashboard.confirmReject", { agentId: cleanAgentId }, "Reject agent {agentId}?"));

    if (!confirmed) {
      showToast("warning", t("adminDashboard.actionCancelled", "Action cancelled"));
      return;
    }

    state.busyAgentIds.add(cleanAgentId);
    renderPending();
    const loadingToast = showToast("loading", isApprove ? t("adminDashboard.approving", "Approving agent...") : t("adminDashboard.rejecting", "Rejecting agent..."));

    try {
      await jsonp(isApprove ? "approveAgent" : "rejectAgent", { agent_id: cleanAgentId });
      if (loadingToast) loadingToast.remove();
      showToast("success", isApprove ? t("adminDashboard.approveSuccess", "Agent approved") : t("adminDashboard.rejectSuccess", "Agent rejected"));
      await refreshAgentData();
    } catch (error) {
      if (loadingToast) loadingToast.remove();
      showToast("error", error.message || t("adminDashboard.updateFailed", "Unable to update agent status"));
      await loadPending();
    } finally {
      state.busyAgentIds.delete(cleanAgentId);
      renderPending();
    }
  }

  function renderLocalizedDynamicText() {
    updateLiveState(state.liveState);
    renderLastUpdated();
    renderPending();
    renderAgents();
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
        window.clearTimeout(state.searchTimer);
        const value = event.target.value || "";
        state.searchTimer = window.setTimeout(function () {
          state.searchQuery = value;
          state.currentPage = 1;
          renderAgents();
        }, SEARCH_DEBOUNCE_MS);
      });
    }

    if (els.clearSearchButton) {
      els.clearSearchButton.addEventListener("click", function () {
        if (els.agentSearch) els.agentSearch.value = "";
        state.searchQuery = "";
        state.currentPage = 1;
        renderAgents();
        if (els.agentSearch) els.agentSearch.focus();
      });
    }

    if (els.statusFilter) {
      els.statusFilter.addEventListener("change", function (event) {
        state.statusFilter = event.target.value || "";
        state.currentPage = 1;
        renderAgents();
      });
    }

    if (els.refreshButton) {
      els.refreshButton.addEventListener("click", function () {
        if (!isAnyLoading()) loadAll();
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
          showToast("error", error.message || t("adminDashboard.genericError", "Something went wrong"));
        });
      });
    }

    window.addEventListener("sbos:languagechange", renderLocalizedDynamicText);
  }

  function cacheElements() {
    [
      "adminName",
      "pageStatus",
      "pageStatusTitle",
      "pageStatusText",
      "retryAllButton",
      "refreshButton",
      "liveStatus",
      "lastUpdated",
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
      "clearSearchButton",
      "statusFilter",
      "searchResultCount",
      "agentsTableBody",
      "paginationInfo",
      "prevPageButton",
      "nextPageButton",
      "toastRegion"
    ].forEach(function (id) {
      els[id] = byId(id);
    });
  }

  async function init() {
    await i18nReady();
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
