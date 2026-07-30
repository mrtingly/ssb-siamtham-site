"use strict";

(function () {
  const API_URL = "https://script.google.com/macros/s/AKfycbyKhWE-_SuKreCPyD4tsNmqNMQz2hZ8hQtrckk92mh8rszh1jaNEeuuFBGsPOLKfAziNg/exec";
  const SESSION_KEYS = ["ssb_agent_session", "ssb_agent_session_v1"];
  const CHOICES = new Set(["A", "B", "C", "D"]);
  const AUTO_SAVE_DELAY = 250;

  const state = {
    agentId: "",
    attemptId: "",
    expiresAt: null,
    questions: [],
    currentIndex: 0,
    answers: {},
    timerId: 0,
    autoSaveId: 0,
    loading: false,
    submitting: false,
    expired: false,
    submitted: false
  };

  const els = {};

  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    cacheElements();
    bindBaseEvents();
    bindLanguageRefresh();
    await i18nReady();

    state.agentId = getAgentId();
    if (!state.agentId || !getAgentToken()) {
      window.location.replace("agent-login.html");
      return;
    }

    loadExam();
  }

  function i18nReady() {
    return window.SBOSI18n && window.SBOSI18n.ready ? window.SBOSI18n.ready : Promise.resolve();
  }

  function t(key, replacements, fallback) {
    let text = window.SBOSI18n && window.SBOSI18n.t ? window.SBOSI18n.t(key) : (fallback || key);
    if (text === key && fallback) text = fallback;
    Object.keys(replacements || {}).forEach(function (name) {
      text = text.replace(new RegExp("\\{" + name + "\\}", "g"), String(replacements[name]));
    });
    return text;
  }

  function bindLanguageRefresh() {
    window.addEventListener("sbos:languagechange", function () {
      if (state.questions.length > 0 && !state.submitted && !state.expired) {
        renderExam();
      }
      updateActions();
    });
  }

  function cacheElements() {
    [
      "message",
      "attemptStatus",
      "timerBox",
      "timerText",
      "loadingCard",
      "errorCard",
      "errorTitle",
      "errorText",
      "retryBtn",
      "examCard",
      "questionNumber",
      "answeredCount",
      "progressBar",
      "questionNav",
      "examForm",
      "prevBtn",
      "nextBtn",
      "submitBtn",
      "resultCard",
      "scoreText",
      "resultTitle",
      "resultMessage",
      "resultButton",
      "logoutBtn"
    ].forEach(function (id) {
      els[id] = document.getElementById(id);
    });
  }

  function bindBaseEvents() {
    els.retryBtn.addEventListener("click", function () {
      if (!state.loading) loadExam();
    });
    els.prevBtn.addEventListener("click", previousQuestion);
    els.nextBtn.addEventListener("click", nextQuestion);
    els.submitBtn.addEventListener("click", function () {
      submitExam(false);
    });
    els.logoutBtn.addEventListener("click", logout);
  }

  function readJson(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "null");
    } catch (error) {
      return null;
    }
  }

    function getAgentId() {
    const direct =
      localStorage.getItem("agent_id") ||
      localStorage.getItem("ssb_agent_id") ||
      localStorage.getItem("ssb_current_agent_v1");

    if (direct) return sanitizeAgentId(direct);

    for (const key of SESSION_KEYS) {
      const session = readJson(key);
      if (session && (session.agent_id || session.applicationId)) {
        return sanitizeAgentId(session.agent_id || session.applicationId);
      }
    }

      return "";
    }

    function getAgentToken() {
      return localStorage.getItem("agent_session_token") || "";
    }

  function sanitizeAgentId(value) {
    const text = String(value || "").trim();
    return /^[A-Za-z0-9_-]+$/.test(text) ? text : "";
  }

  function sanitizeChoice(value) {
    const text = String(value || "").trim().toUpperCase();
    return CHOICES.has(text) ? text : "";
  }

  function sanitizeQuestionId(value) {
    return String(value || "").trim().replace(/[^A-Za-z0-9_-]/g, "").slice(0, 80);
  }

  function authPayload() {
    return {
      agent_id: state.agentId || getAgentId(),
      agent_session_token: getAgentToken()
    };
  }

  async function api(action, payload) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(Object.assign({ action: action }, payload || {}))
    });

    if (!response.ok) {
      throw new Error("Network error " + response.status);
    }

    const data = await response.json();
    if (!data || typeof data !== "object") {
      throw new Error("Invalid API response");
    }

    return data;
  }

  async function loadExam() {
    setLoading(true);
    hideError();
    hideResult();
    hideExam();
    showMessage("", "");
    setAttemptStatus(t("exam.preparing", null, "Preparing exam..."));

    try {
      const attempt = await api("startExamAttempt", authPayload());

      if (!attempt.ok) {
        handleStartFailure(attempt);
        return;
      }

      state.attemptId = String(attempt.attempt_id || "").trim();
      state.expiresAt = parseDate(attempt.expires_at);
      state.expired = false;
      state.submitted = false;

      setAttemptStatus(attempt.reused ? t("exam.secureResumed") : t("exam.secureStarted"));

      const questionResult = await api("getExamQuestions", {
        ...authPayload(),
        attempt_id: state.attemptId
      });

      if (!questionResult.ok) {
        if (isExpiredMessage(questionResult.message)) {
          showExpiredState(questionResult.message);
          return;
        }
        throw new Error(questionResult.message || "Unable to load questions");
      }

      state.questions = normalizeQuestions(questionResult.questions || []);
      state.expiresAt = parseDate(questionResult.expires_at) || state.expiresAt;
      state.answers = loadDraft();
      state.currentIndex = 0;

      if (state.questions.length === 0) {
        throw new Error(t("exam.noQuestions"));
      }

      renderExam();
      showExam();
      startTimer();
    } catch (error) {
      showError(t("exam.unableToLoad"), error.message || t("exam.checkConnection"));
      setAttemptStatus(t("exam.connectionProblem"));
    } finally {
      setLoading(false);
    }
  }

  function handleStartFailure(result) {
    const status = String(result.status || "").toUpperCase();
    let message = result.message || t("exam.unavailable");

    if (status && status !== "EXAM") {
      message = t("exam.invalidStatus");
    }

    showError(t("exam.unavailable"), message);
    setAttemptStatus(status ? t("exam.currentStatus", { status: status }) : t("exam.invalidAgent"));
  }

  function normalizeQuestions(items) {
    return items.map(function (item) {
      const questionId = sanitizeQuestionId(item.question_id);
      const choices = Array.isArray(item.choices) ? item.choices : [];

      return {
        question_id: questionId,
        question_order: Number(item.question_order || 0),
        question_text: String(item.question_text || ""),
        choices: choices
          .map(function (choice) {
            return {
              key: sanitizeChoice(choice && choice.key),
              text: String((choice && choice.text) || "")
            };
          })
          .filter(function (choice) {
            return choice.key && choice.text;
          })
      };
    }).filter(function (item) {
      return item.question_id && item.question_text && item.choices.length > 0;
    });
  }

  function parseDate(value) {
    if (!value) return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function draftKey() {
    return "examDraft:" + state.agentId + ":" + state.attemptId;
  }

  function loadDraft() {
    const stored = readJson(draftKey());
    const answers = {};

    Object.keys(stored || {}).forEach(function (questionId) {
      const safeQuestionId = sanitizeQuestionId(questionId);
      const safeChoice = sanitizeChoice(stored[questionId]);
      if (safeQuestionId && safeChoice) {
        answers[safeQuestionId] = safeChoice;
      }
    });

    return answers;
  }

  function scheduleDraftSave() {
    window.clearTimeout(state.autoSaveId);
    state.autoSaveId = window.setTimeout(saveDraft, AUTO_SAVE_DELAY);
  }

  function saveDraft() {
    if (!state.attemptId || state.submitted || state.expired) return;
    localStorage.setItem(draftKey(), JSON.stringify(state.answers));
    setAttemptStatus(t("exam.draftSaved"));
  }

  function clearDraft() {
    if (state.attemptId) {
      localStorage.removeItem(draftKey());
    }
  }

  function renderExam() {
    renderNavigator();
    renderCurrentQuestion();
    updateMeta();
    updateActions();
  }

  function renderNavigator() {
    replaceChildren(els.questionNav);

    state.questions.forEach(function (question, index) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "nav-dot";
      button.textContent = String(index + 1);
      button.setAttribute("aria-label", t("exam.goQuestion", { number: index + 1 }));

      if (index === state.currentIndex) button.classList.add("active");
      if (state.answers[question.question_id]) button.classList.add("answered");

      button.addEventListener("click", function () {
        state.currentIndex = index;
        renderExam();
      });

      els.questionNav.appendChild(button);
    });
  }

  function renderCurrentQuestion() {
    replaceChildren(els.examForm);

    const question = state.questions[state.currentIndex];
    if (!question) return;

    const fieldset = document.createElement("fieldset");
    fieldset.className = "question";
    fieldset.disabled = state.submitting || state.submitted || state.expired;

    const legend = document.createElement("legend");
    legend.textContent = (state.currentIndex + 1) + ". " + question.question_text;
    fieldset.appendChild(legend);

    const choices = document.createElement("div");
    choices.className = "choices";

    question.choices.forEach(function (choice) {
      const label = document.createElement("label");
      label.className = "choice";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "question-" + question.question_id;
      input.value = choice.key;
      input.checked = state.answers[question.question_id] === choice.key;
      if (input.checked) {
        label.classList.add("selected");
      }
      input.setAttribute("aria-label", t("exam.choiceLabel", { choice: choice.key, number: state.currentIndex + 1 }));
      input.addEventListener("change", function () {
        const safeChoice = sanitizeChoice(input.value);
        if (safeChoice) {
          state.answers[question.question_id] = safeChoice;
          syncSelectedChoice(fieldset, question.question_id);
          scheduleDraftSave();
          updateMeta();
          renderNavigator();
        }
      });

      const text = document.createElement("span");
      text.textContent = choice.key + ". " + choice.text;

      label.appendChild(input);
      label.appendChild(text);
      choices.appendChild(label);
    });

    fieldset.appendChild(choices);
    els.examForm.appendChild(fieldset);
  }

  function syncSelectedChoice(container, questionId) {
    const selected = state.answers[questionId] || "";

    Array.prototype.forEach.call(container.querySelectorAll(".choice"), function (label) {
      const input = label.querySelector("input");
      label.classList.toggle("selected", Boolean(input && input.value === selected));
    });
  }

  function replaceChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function updateMeta() {
    const total = state.questions.length;
    const answered = countAnswered();
    els.questionNumber.textContent = t("exam.questionProgress", { current: state.currentIndex + 1, total: total });
    els.answeredCount.textContent = t("exam.answeredCount", { answered: answered, total: total });
    els.progressBar.style.width = total ? ((state.currentIndex + 1) / total * 100) + "%" : "0%";
  }

  function updateActions() {
    const lastIndex = state.questions.length - 1;
    els.prevBtn.disabled = state.currentIndex <= 0 || state.submitting || state.expired;
    els.nextBtn.disabled = state.currentIndex >= lastIndex || state.submitting || state.expired;
    els.submitBtn.disabled = state.submitting || state.submitted || state.expired;
    els.submitBtn.textContent = state.submitting ? t("exam.submitting") : t("exam.submit");
  }

  function countAnswered() {
    return state.questions.filter(function (question) {
      return Boolean(state.answers[question.question_id]);
    }).length;
  }

  function previousQuestion() {
    if (state.currentIndex > 0) {
      state.currentIndex -= 1;
      renderExam();
    }
  }

  function nextQuestion() {
    if (state.currentIndex < state.questions.length - 1) {
      state.currentIndex += 1;
      renderExam();
    }
  }

  function startTimer() {
    window.clearInterval(state.timerId);
    updateTimer();
    state.timerId = window.setInterval(updateTimer, 1000);
  }

  function updateTimer() {
    if (!state.expiresAt) {
      els.timerText.textContent = "--:--";
      return;
    }

    const remainingMs = state.expiresAt.getTime() - Date.now();
    const remainingSeconds = Math.max(0, Math.floor(remainingMs / 1000));
    const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
    const seconds = String(remainingSeconds % 60).padStart(2, "0");

    els.timerText.textContent = minutes + ":" + seconds;
    els.timerBox.classList.toggle("warning", remainingSeconds > 0 && remainingSeconds <= 300);
    els.timerBox.classList.toggle("danger", remainingSeconds > 0 && remainingSeconds <= 60);

    if (remainingSeconds === 300) {
      showMessage("warn", t("exam.fiveMinutes"));
    }

    if (remainingSeconds <= 0) {
      window.clearInterval(state.timerId);
      submitExam(true);
    }
  }

  async function submitExam(autoSubmit) {
    if (state.submitting || state.submitted) return;

    if (!autoSubmit && countAnswered() < state.questions.length) {
      showMessage("warn", t("exam.answerAll"));
      return;
    }

    if (!autoSubmit) {
      const confirmed = window.confirm(t("exam.confirmSubmit"));
      if (!confirmed) return;
    }

    state.submitting = true;
    updateActions();
    setAttemptStatus(autoSubmit ? t("exam.autoSubmitting") : t("exam.submittingAnswers"));

    try {
      const result = await api("submitExamAnswers", {
        ...authPayload(),
        attempt_id: state.attemptId,
        answers: buildPayloadAnswers()
      });

      if (!result.ok) {
        await handleSubmitFailure(result);
        return;
      }

      state.submitted = true;
      clearDraft();

      const verified = await api("getExamResult", {
        ...authPayload(),
        attempt_id: state.attemptId
      });

      showResult(verified.ok ? verified : result);
    } catch (error) {
      state.submitting = false;
      updateActions();
      showMessage("err", error.message || t("exam.submitFailedDetail"));
      showError(t("exam.submitFailed"), t("exam.submitFailedDetail"));
      setAttemptStatus(t("exam.networkSubmit"));
    }
  }

  async function handleSubmitFailure(result) {
    const message = result.message || "Unable to submit exam";

    if (isExpiredMessage(message)) {
      showExpiredState(message);
      return;
    }

    if (isAlreadySubmittedMessage(message)) {
      const verified = await api("getExamResult", {
        ...authPayload(),
        attempt_id: state.attemptId
      });

      if (verified.ok) {
        state.submitted = true;
        clearDraft();
        showResult(verified);
        return;
      }
    }

    state.submitting = false;
    updateActions();
    showMessage("err", message);
  }

  function buildPayloadAnswers() {
    const payload = {};

    state.questions.forEach(function (question) {
      const questionId = sanitizeQuestionId(question.question_id);
      const choice = sanitizeChoice(state.answers[questionId]);

      if (questionId && choice) {
        payload[questionId] = choice;
      }
    });

    return payload;
  }

  function showResult(result) {
    hideExam();
    hideError();
    window.clearInterval(state.timerId);

    const passed = result.passed === true;
    const score = result.score === null || result.score === undefined ? "--" : String(result.score) + "%";
    const status = result.status ? t("exam.statusPrefix", { status: result.status }) : "";

    els.scoreText.textContent = score;
    els.resultTitle.textContent = passed ? t("exam.passed") : t("exam.failed");
    els.resultMessage.textContent = passed
      ? t("exam.verifiedPassed") + status
      : t("exam.verifiedFailed") + status;
    els.resultButton.textContent = passed ? t("exam.goWaiting") : t("exam.reviewTraining");
    els.resultButton.onclick = function () {
      window.location.href = passed ? "agent-waiting.html" : "agent-learning.html";
    };
    els.resultCard.classList.add("show");
    setAttemptStatus(t("exam.submittedVerified"));
    showMessage("ok", t("exam.resultLoaded"));
  }

  function showExpiredState(message) {
    state.expired = true;
    state.submitting = false;
    window.clearInterval(state.timerId);
    clearDraft();
    updateActions();
    hideExam();
    showError(t("exam.expiredTitle"), message || t("exam.expiredDetail"));
    setAttemptStatus(t("exam.expiredStatus"));
  }

  function isExpiredMessage(message) {
    return String(message || "").toLowerCase().indexOf("expired") !== -1;
  }

  function isAlreadySubmittedMessage(message) {
    const text = String(message || "").toLowerCase();
    return text.indexOf("already submitted") !== -1 || text.indexOf("duplicate") !== -1;
  }

  function setLoading(isLoading) {
    state.loading = isLoading;
    els.loadingCard.classList.toggle("show", isLoading);
    els.retryBtn.disabled = isLoading;
  }

  function showExam() {
    els.examCard.classList.add("show");
  }

  function hideExam() {
    els.examCard.classList.remove("show");
  }

  function hideResult() {
    els.resultCard.classList.remove("show");
  }

  function showError(title, text) {
    els.errorTitle.textContent = title;
    els.errorText.textContent = text;
    els.errorCard.classList.add("show");
  }

  function hideError() {
    els.errorCard.classList.remove("show");
  }

  function showMessage(type, text) {
    els.message.className = text ? "message show " + type : "message";
    els.message.textContent = text || "";
  }

  function setAttemptStatus(text) {
    els.attemptStatus.textContent = text;
  }

  async function logout() {
    window.clearInterval(state.timerId);
    const agentId = getAgentId();
    const token = getAgentToken();

    if (agentId && token) {
      try {
        await api("logoutAgent", {
          agent_id: agentId,
          agent_session_token: token
        });
      } catch (error) {}
    }

    [
      "agent_id",
      "agent_name",
      "agent_role",
      "agent_status",
      "agent_session_token",
      "agent_session_expires_at",
      "ssb_agent_id",
      "ssb_current_agent_v1",
      "ssb_agent_session",
      "ssb_agent_session_v1"
    ].forEach(function (key) {
      localStorage.removeItem(key);
    });
    window.location.href = "agent-login.html";
  }
})();
