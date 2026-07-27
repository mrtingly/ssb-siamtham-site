const SHEET_NAMES = {
  agents: "agents",
  income: "income",
  withdraws: "withdraws",
  bonus: "bonus",
  orders: "orders",
  trainingLessons: "training_lessons",
  trainingProgress: "agent_training_progress",
  examQuestions: "exam_questions",
  examAttempts: "exam_attempts",
  auditLogs: "audit_logs"
};

const AGENT_STATUS = {
  REGISTERED: "REGISTERED",
  TRAINING: "TRAINING",
  EXAM: "EXAM",
  WAIT_APPROVAL: "WAIT_APPROVAL",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  SUSPENDED: "SUSPENDED"
};

const EXAM_PASS_SCORE = 80;
const SECURE_EXAM_DURATION_MINUTES = 30;

/* =========================================================
   ROUTER
========================================================= */

function doGet(e) {
  try {
    const action = String((e && e.parameter && e.parameter.action) || "").trim();
    let result;

    switch (action) {
      case "getAgent":
        result = getAgent(e.parameter.agent_id);
        break;

      case "getAgentStatus":
        result = getAgentStatus(e.parameter.agent_id);
        break;

      case "getDashboard":
        result = getDashboard(e.parameter.agent_id);
        break;

      case "listAgents":
        result = listAgents(e.parameter);
        break;

      case "listPendingAgents":
        result = listPendingAgents(e.parameter);
        break;

      case "getAdminDashboard":
        result = getAdminDashboard(e.parameter);
        break;

      case "listTrainingLessons":
        result = listTrainingLessons(e.parameter);
        break;

      case "getTrainingProgress":
        result = getTrainingProgress(e.parameter);
        break;

      case "getExamQuestions":
        result = getExamQuestions(e.parameter);
        break;

      case "getExamResult":
        result = getExamResult(e.parameter);
        break;

      case "login":
        result = login({
          username: e.parameter.username,
          password: e.parameter.password
        });
        break;

      case "approveAgent":
        result = updateAgentStatus(e.parameter.agent_id, AGENT_STATUS.APPROVED);
        break;

      case "rejectAgent":
        result = updateAgentStatus(e.parameter.agent_id, AGENT_STATUS.REJECTED);
        break;

      case "suspendAgent":
        result = updateAgentStatus(e.parameter.agent_id, AGENT_STATUS.SUSPENDED);
        break;

      case "markWithdrawPaid":
        result = updateWithdrawStatus(e.parameter.withdraw_id, "PAID");
        break;

      case "rejectWithdraw":
        result = updateWithdrawStatus(e.parameter.withdraw_id, "REJECTED");
        break;

      default:
        result = { ok: false, message: "Invalid GET action" };
    }

    return output(e, result);

  } catch (err) {
    return output(e, {
      ok: false,
      message: err && err.message ? err.message : String(err)
    });
  }
}

function doPost(e) {
  try {
    const raw = e && e.postData ? e.postData.contents : "{}";
    const body = JSON.parse(raw || "{}");
    const action = String(body.action || "").trim();
    let result;

    switch (action) {
      case "registerAgent":
        result = registerAgent(body);
        break;

      case "login":
        result = login(body);
        break;

      case "startTraining":
        result = startTraining(body);
        break;

      case "updateTrainingProgress":
        result = updateTrainingProgress(body);
        break;

      case "completeTraining":
        result = completeTraining(body);
        break;

      case "submitExam":
        result = submitExam(body);
        break;

      case "listAgents":
        result = listAgents(body);
        break;

      case "listPendingAgents":
        result = listPendingAgents(body);
        break;

      case "getAdminDashboard":
        result = getAdminDashboard(body);
        break;

      case "listTrainingLessons":
        result = listTrainingLessons(body);
        break;

      case "getTrainingProgress":
        result = getTrainingProgress(body);
        break;

      case "completeTrainingLesson":
        result = completeTrainingLesson(body);
        break;

      case "startExamAttempt":
        result = startExamAttempt(body);
        break;

      case "getExamQuestions":
        result = getExamQuestions(body);
        break;

      case "submitExamAnswers":
        result = submitExamAnswers(body);
        break;

      case "getExamResult":
        result = getExamResult(body);
        break;

      case "requestWithdraw":
        result = requestWithdraw(body);
        break;

      case "createBonus":
        result = createBonus(body);
        break;

      case "approveAgent":
        result = updateAgentStatus(body.agent_id, AGENT_STATUS.APPROVED);
        break;

      case "rejectAgent":
        result = updateAgentStatus(body.agent_id, AGENT_STATUS.REJECTED);
        break;

      case "suspendAgent":
        result = updateAgentStatus(body.agent_id, AGENT_STATUS.SUSPENDED);
        break;

      case "markWithdrawPaid":
        result = updateWithdrawStatus(body.withdraw_id, "PAID");
        break;

      case "rejectWithdraw":
        result = updateWithdrawStatus(body.withdraw_id, "REJECTED");
        break;

      default:
        result = { ok: false, message: "Invalid POST action" };
    }

    return json(result);

  } catch (err) {
    return json({
      ok: false,
      message: err && err.message ? err.message : String(err)
    });
  }
}

/* =========================================================
   HELPERS
========================================================= */

function getSheet(name) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(name);

  if (!sheet) {
    throw new Error("Sheet not found: " + name);
  }

  return sheet;
}

function getOrCreateSheet(name, headers) {
  const spreadsheet = SpreadsheetApp.getActive();
  let sheet = spreadsheet.getSheetByName(name);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
  }

  const currentHeaders = getHeaders(sheet);

  if (currentHeaders.length === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    return sheet;
  }

  const missingHeaders = headers.filter(function (header) {
    return currentHeaders.indexOf(header) === -1;
  });

  if (missingHeaders.length > 0) {
    sheet
      .getRange(1, currentHeaders.length + 1, 1, missingHeaders.length)
      .setValues([missingHeaders]);
  }

  return sheet;
}

function getHeaders(sheet) {
  const lastColumn = sheet.getLastColumn();

  if (lastColumn < 1) {
    return [];
  }

  return sheet
    .getRange(1, 1, 1, lastColumn)
    .getValues()[0]
    .map(function (header) {
      return String(header || "").trim();
    });
}

function sheetToObjects(sheetName) {
  const sheet = getSheet(sheetName);
  const values = sheet.getDataRange().getValues();

  if (values.length < 2) {
    return [];
  }

  const headers = values.shift().map(function (header) {
    return String(header || "").trim();
  });

  return values
    .map(function (row, index) {
      const obj = { _row: index + 2 };

      headers.forEach(function (header, columnIndex) {
        if (header) {
          obj[header] = row[columnIndex];
        }
      });

      return obj;
    })
    .filter(function (obj) {
      return [
        obj.agent_id,
        obj.withdraw_id,
        obj.order_id,
        obj.bonus_id,
        obj.lesson_id,
        obj.progress_id,
        obj.question_id,
        obj.attempt_id,
        obj.audit_id
      ].some(function (value) {
        return String(value || "").trim() !== "";
      });
    });
}

function appendObject(sheetName, data) {
  const sheet = getSheet(sheetName);
  const headers = getHeaders(sheet);

  if (headers.length === 0) {
    throw new Error("Missing header row in sheet: " + sheetName);
  }

  const row = headers.map(function (header) {
    return Object.prototype.hasOwnProperty.call(data, header)
      ? data[header]
      : "";
  });

  sheet.appendRow(row);
}

function updateRowFields(sheetName, rowNumber, fields) {
  const sheet = getSheet(sheetName);
  const headers = getHeaders(sheet);

  Object.keys(fields).forEach(function (fieldName) {
    const columnIndex = headers.indexOf(fieldName) + 1;

    if (columnIndex <= 0) {
      throw new Error("Missing column: " + fieldName);
    }

    sheet.getRange(rowNumber, columnIndex).setValue(fields[fieldName]);
  });
}

function sum(rows, key) {
  return rows.reduce(function (total, row) {
    return total + Number(row[key] || 0);
  }, 0);
}

function json(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function output(e, data) {
  const callback =
    e &&
    e.parameter &&
    e.parameter.callback
      ? String(e.parameter.callback).trim()
      : "";

  if (callback) {
    return ContentService
      .createTextOutput(callback + "(" + JSON.stringify(data) + ")")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return json(data);
}

function requireFields(body, fields) {
  const missing = fields.filter(function (fieldName) {
    return !String(body[fieldName] || "").trim();
  });

  if (missing.length > 0) {
    return {
      ok: false,
      message: "ข้อมูลไม่ครบ",
      missing: missing
    };
  }

  return { ok: true };
}

function findAgent(agentId) {
  const normalizedId = String(agentId || "").trim();

  if (!normalizedId) {
    return null;
  }

  return sheetToObjects(SHEET_NAMES.agents).find(function (agent) {
    return String(agent.agent_id || "").trim() === normalizedId;
  }) || null;
}

function booleanValue(value) {
  return (
    value === true ||
    String(value || "").trim().toLowerCase() === "true"
  );
}

function normalizeStatus(status) {
  const value = String(status || "").trim().toUpperCase();

  // รองรับข้อมูลเก่าที่เคยใช้ PENDING
  if (value === "PENDING") {
    return AGENT_STATUS.WAIT_APPROVAL;
  }

  return value;
}

function getNextPageByStatus(status) {
  const normalized = normalizeStatus(status);

  if (
    normalized === AGENT_STATUS.REGISTERED ||
    normalized === AGENT_STATUS.TRAINING
  ) {
    return "agent-learning.html";
  }

  if (normalized === AGENT_STATUS.EXAM) {
    return "agent-exam.html";
  }

  if (normalized === AGENT_STATUS.WAIT_APPROVAL) {
    return "agent-waiting.html";
  }

  if (normalized === AGENT_STATUS.APPROVED) {
    return "agent-dashboard.html";
  }

  return "";
}

/* =========================================================
   PHASE 2C-1 TRAINING + EXAM SECURITY HELPERS
========================================================= */

const TRAINING_LESSON_HEADERS = [
  "lesson_id",
  "lesson_order",
  "title",
  "subtitle",
  "content",
  "is_active",
  "created_at",
  "updated_at"
];

const TRAINING_PROGRESS_HEADERS = [
  "progress_id",
  "agent_id",
  "lesson_id",
  "lesson_order",
  "status",
  "completed_at",
  "created_at",
  "updated_at"
];

const EXAM_QUESTION_HEADERS = [
  "question_id",
  "question_order",
  "question_text",
  "choice_a",
  "choice_b",
  "choice_c",
  "choice_d",
  "correct_choice",
  "is_active",
  "created_at",
  "updated_at"
];

const EXAM_ATTEMPT_HEADERS = [
  "attempt_id",
  "agent_id",
  "status",
  "started_at",
  "expires_at",
  "submitted_at",
  "question_ids",
  "answers_json",
  "score",
  "passed",
  "created_at",
  "updated_at"
];

const AUDIT_LOG_HEADERS = [
  "audit_id",
  "agent_id",
  "actor_id",
  "action",
  "status",
  "message",
  "metadata_json",
  "created_at"
];

const DEFAULT_TRAINING_LESSONS = [
  {
    lesson_id: "LESSON-001",
    lesson_order: 1,
    title: "Company and SBOS overview",
    subtitle: "Understand the business, product promise, and agent role.",
    content: "Company overview, SBOS workflow, agent responsibility, and customer trust."
  },
  {
    lesson_id: "LESSON-002",
    lesson_order: 2,
    title: "Product knowledge",
    subtitle: "Learn product components, benefits, limits, and approved messaging.",
    content: "Product explanation, approved claims, customer use cases, and service boundaries."
  },
  {
    lesson_id: "LESSON-003",
    lesson_order: 3,
    title: "Sales and customer service",
    subtitle: "Follow a clear sales process from discovery to follow-up.",
    content: "Customer discovery, quotation basics, order handoff, and after-sales care."
  },
  {
    lesson_id: "LESSON-004",
    lesson_order: 4,
    title: "Ethics and compliance",
    subtitle: "Protect customers and keep communication honest.",
    content: "No false claims, no unauthorized fees, privacy care, and escalation rules."
  },
  {
    lesson_id: "LESSON-005",
    lesson_order: 5,
    title: "Agent dashboard and compensation",
    subtitle: "Understand dashboard access, income, team, withdrawal, and records.",
    content: "Agent ID, referral flow, income status, bonus, team data, and dashboard usage."
  }
];

const DEFAULT_EXAM_QUESTIONS = [
  {
    question_id: "EXAM-001",
    question_order: 1,
    question_text: "What is the most important responsibility of an SBOS agent?",
    choices: ["Give accurate information and care for customers", "Guarantee every risk is removed", "Set prices without approval", "Ask customers for bank passwords"],
    correct_choice: "A"
  },
  {
    question_id: "EXAM-002",
    question_order: 2,
    question_text: "How should an agent explain product benefits?",
    choices: ["Use approved facts and avoid exaggerated claims", "Promise impossible results", "Hide important conditions", "Add extra service fees freely"],
    correct_choice: "A"
  },
  {
    question_id: "EXAM-003",
    question_order: 3,
    question_text: "How should customer personal data be handled?",
    choices: ["Use it only for approved business purposes", "Share it in public groups", "Send it to every team member", "Reuse it without consent"],
    correct_choice: "A"
  },
  {
    question_id: "EXAM-004",
    question_order: 4,
    question_text: "What should an agent do when a customer is unsure?",
    choices: ["Explain clearly and allow time to decide", "Pressure the customer to pay", "Skip complex details", "Promise anything to close the sale"],
    correct_choice: "A"
  },
  {
    question_id: "EXAM-005",
    question_order: 5,
    question_text: "What is the right first step in a sales conversation?",
    choices: ["Understand the customer's problem and needs", "Request payment immediately", "Ask for all personal documents", "Offer the most expensive product first"],
    correct_choice: "A"
  },
  {
    question_id: "EXAM-006",
    question_order: 6,
    question_text: "Which behavior matches SBOS agent ethics?",
    choices: ["Do not collect unauthorized extra fees", "Change company prices alone", "Use customer data personally", "Create unsupported advertising claims"],
    correct_choice: "A"
  },
  {
    question_id: "EXAM-007",
    question_order: 7,
    question_text: "What should an agent do when unsure about product details?",
    choices: ["Check with the company or responsible person first", "Guess an answer", "Use unverified information", "Avoid the customer"],
    correct_choice: "A"
  },
  {
    question_id: "EXAM-008",
    question_order: 8,
    question_text: "What is the agent dashboard used for?",
    choices: ["Tracking agent data, sales, income, and related records", "Storing customer bank passwords", "Changing company data", "Approving yourself as admin"],
    correct_choice: "A"
  },
  {
    question_id: "EXAM-009",
    question_order: 9,
    question_text: "When does an agent receive full dashboard access?",
    choices: ["After passing the exam and receiving admin approval", "Immediately after opening the website", "After entering only a name", "Before training"],
    correct_choice: "A"
  },
  {
    question_id: "EXAM-010",
    question_order: 10,
    question_text: "What happens after passing the exam?",
    choices: ["The agent waits for admin review and approval", "Money is paid immediately", "The agent becomes a manager automatically", "Training data is deleted"],
    correct_choice: "A"
  }
];

function ensurePhase2C1Sheets() {
  getOrCreateSheet(SHEET_NAMES.trainingLessons, TRAINING_LESSON_HEADERS);
  getOrCreateSheet(SHEET_NAMES.trainingProgress, TRAINING_PROGRESS_HEADERS);
  getOrCreateSheet(SHEET_NAMES.examQuestions, EXAM_QUESTION_HEADERS);
  getOrCreateSheet(SHEET_NAMES.examAttempts, EXAM_ATTEMPT_HEADERS);
  getOrCreateSheet(SHEET_NAMES.auditLogs, AUDIT_LOG_HEADERS);
  seedTrainingLessons();
  seedExamQuestions();
}

function seedTrainingLessons() {
  const existing = sheetToObjects(SHEET_NAMES.trainingLessons);

  if (existing.length > 0) {
    return;
  }

  const now = new Date();

  DEFAULT_TRAINING_LESSONS.forEach(function (lesson) {
    appendObject(SHEET_NAMES.trainingLessons, {
      lesson_id: lesson.lesson_id,
      lesson_order: lesson.lesson_order,
      title: lesson.title,
      subtitle: lesson.subtitle,
      content: lesson.content,
      is_active: true,
      created_at: now,
      updated_at: now
    });
  });
}

function seedExamQuestions() {
  const existing = sheetToObjects(SHEET_NAMES.examQuestions);

  if (existing.length > 0) {
    return;
  }

  const now = new Date();

  DEFAULT_EXAM_QUESTIONS.forEach(function (question) {
    appendObject(SHEET_NAMES.examQuestions, {
      question_id: question.question_id,
      question_order: question.question_order,
      question_text: question.question_text,
      choice_a: question.choices[0],
      choice_b: question.choices[1],
      choice_c: question.choices[2],
      choice_d: question.choices[3],
      correct_choice: question.correct_choice,
      is_active: true,
      created_at: now,
      updated_at: now
    });
  });
}

function writeAuditLog(action, agentId, status, message, metadata) {
  getOrCreateSheet(SHEET_NAMES.auditLogs, AUDIT_LOG_HEADERS);

  appendObject(SHEET_NAMES.auditLogs, {
    audit_id: makeId("AUDIT"),
    agent_id: cleanString(agentId, 80),
    actor_id: cleanString((metadata && metadata.actor_id) || "", 80),
    action: cleanString(action, 120),
    status: cleanString(status, 40),
    message: cleanString(message, 500),
    metadata_json: JSON.stringify(metadata || {}),
    created_at: new Date()
  });
}

function getActiveTrainingLessons() {
  ensurePhase2C1Sheets();

  return sheetToObjects(SHEET_NAMES.trainingLessons)
    .filter(function (lesson) {
      return booleanValue(lesson.is_active);
    })
    .sort(function (a, b) {
      return Number(a.lesson_order || 0) - Number(b.lesson_order || 0);
    });
}

function getActiveExamQuestions() {
  ensurePhase2C1Sheets();

  return sheetToObjects(SHEET_NAMES.examQuestions)
    .filter(function (question) {
      return booleanValue(question.is_active);
    })
    .sort(function (a, b) {
      return Number(a.question_order || 0) - Number(b.question_order || 0);
    });
}

function publicLesson(lesson) {
  return {
    lesson_id: cleanString(lesson.lesson_id, 80),
    lesson_order: Number(lesson.lesson_order || 0),
    title: cleanString(lesson.title, 300),
    subtitle: cleanString(lesson.subtitle, 500),
    content: cleanString(lesson.content, 3000),
    is_active: booleanValue(lesson.is_active)
  };
}

function publicExamQuestion(question) {
  return {
    question_id: cleanString(question.question_id, 80),
    question_order: Number(question.question_order || 0),
    question_text: cleanString(question.question_text, 1000),
    choices: [
      { key: "A", text: cleanString(question.choice_a, 1000) },
      { key: "B", text: cleanString(question.choice_b, 1000) },
      { key: "C", text: cleanString(question.choice_c, 1000) },
      { key: "D", text: cleanString(question.choice_d, 1000) }
    ]
  };
}

function findAttempt(attemptId) {
  const normalizedId = cleanString(attemptId, 120);

  if (!normalizedId) {
    return null;
  }

  ensurePhase2C1Sheets();

  return sheetToObjects(SHEET_NAMES.examAttempts).find(function (attempt) {
    return String(attempt.attempt_id || "").trim() === normalizedId;
  }) || null;
}

function parseJsonValue(value, fallback) {
  try {
    return JSON.parse(String(value || ""));
  } catch (err) {
    return fallback;
  }
}

function normalizeAnswerChoice(choice) {
  const value = cleanString(choice, 5).toUpperCase();

  if (["A", "B", "C", "D"].indexOf(value) !== -1) {
    return value;
  }

  if (["0", "1", "2", "3"].indexOf(value) !== -1) {
    return ["A", "B", "C", "D"][Number(value)];
  }

  return "";
}

function normalizeAnswers(bodyAnswers) {
  if (!bodyAnswers) {
    return {};
  }

  if (typeof bodyAnswers === "string") {
    bodyAnswers = parseJsonValue(bodyAnswers, {});
  }

  if (Array.isArray(bodyAnswers)) {
    return bodyAnswers.reduce(function (result, item) {
      const questionId = cleanString(item && item.question_id, 80);
      const choice = normalizeAnswerChoice(item && item.choice);

      if (questionId && choice) {
        result[questionId] = choice;
      }

      return result;
    }, {});
  }

  return Object.keys(bodyAnswers || {}).reduce(function (result, questionId) {
    const normalizedQuestionId = cleanString(questionId, 80);
    const choice = normalizeAnswerChoice(bodyAnswers[questionId]);

    if (normalizedQuestionId && choice) {
      result[normalizedQuestionId] = choice;
    }

    return result;
  }, {});
}

/* =========================================================
   PHASE 2C-1 TRAINING API
========================================================= */

function listTrainingLessons(options) {
  const params = options || {};
  const agentId = validateAgentId(params.agent_id || "");
  const lessons = getActiveTrainingLessons().map(publicLesson);
  let progress = null;

  if (agentId) {
    progress = getTrainingProgress({ agent_id: agentId });
  }

  return {
    ok: true,
    total: lessons.length,
    lessons: lessons,
    progress: progress && progress.ok ? progress.progress : null
  };
}

function getTrainingProgress(options) {
  const params = options || {};
  const agentId = validateAgentId(params.agent_id);

  if (!agentId) {
    return { ok: false, message: "Invalid agent_id" };
  }

  const agent = findAgent(agentId);

  if (!agent) {
    return { ok: false, message: "Agent not found" };
  }

  ensurePhase2C1Sheets();

  const lessons = getActiveTrainingLessons();
  const progressRows = sheetToObjects(SHEET_NAMES.trainingProgress)
    .filter(function (item) {
      return (
        String(item.agent_id || "").trim() === agentId &&
        String(item.status || "").trim().toUpperCase() === "COMPLETED"
      );
    });
  const completedLessonIds = progressRows.reduce(function (result, item) {
    result[String(item.lesson_id || "").trim()] = true;
    return result;
  }, {});
  const completedCount = lessons.filter(function (lesson) {
    return completedLessonIds[String(lesson.lesson_id || "").trim()];
  }).length;
  const progress = lessons.length
    ? Math.round((completedCount / lessons.length) * 100)
    : Number(agent.training_progress || 0);

  return {
    ok: true,
    agent_id: agentId,
    status: normalizeStatus(agent.status),
    total_lessons: lessons.length,
    completed_lessons: completedCount,
    progress: Math.max(Number(agent.training_progress || 0), progress),
    training_progress: Math.max(Number(agent.training_progress || 0), progress),
    training_completed: booleanValue(agent.training_completed) || progress >= 100,
    lessons: lessons.map(function (lesson) {
      const lessonId = String(lesson.lesson_id || "").trim();

      return {
        lesson_id: lessonId,
        lesson_order: Number(lesson.lesson_order || 0),
        completed: Boolean(completedLessonIds[lessonId])
      };
    }),
    next_page: getNextPageByStatus(agent.status)
  };
}

function completeTrainingLesson(body) {
  const agentId = validateAgentId(body && body.agent_id);

  if (!agentId) {
    return { ok: false, message: "Invalid agent_id" };
  }

  const agent = findAgent(agentId);

  if (!agent) {
    writeAuditLog("completeTrainingLesson", agentId, "FAILED", "Agent not found", {});
    return { ok: false, message: "Agent not found" };
  }

  const currentStatus = normalizeStatus(agent.status);

  if (
    currentStatus !== AGENT_STATUS.REGISTERED &&
    currentStatus !== AGENT_STATUS.TRAINING
  ) {
    writeAuditLog("completeTrainingLesson", agentId, "FAILED", "Invalid agent status", {
      status: currentStatus
    });
    return {
      ok: false,
      message: "Agent status cannot update training",
      status: currentStatus
    };
  }

  ensurePhase2C1Sheets();

  const lessons = getActiveTrainingLessons();
  const requestedLessonId = cleanString(body.lesson_id, 80);
  const requestedOrder = Number(body.lesson_order || 0);
  const lesson = lessons.find(function (item) {
    return requestedLessonId
      ? String(item.lesson_id || "").trim() === requestedLessonId
      : Number(item.lesson_order || 0) === requestedOrder;
  });

  if (!lesson) {
    writeAuditLog("completeTrainingLesson", agentId, "FAILED", "Lesson not found", {
      lesson_id: requestedLessonId,
      lesson_order: requestedOrder
    });
    return { ok: false, message: "Lesson not found" };
  }

  const progressRows = sheetToObjects(SHEET_NAMES.trainingProgress)
    .filter(function (item) {
      return (
        String(item.agent_id || "").trim() === agentId &&
        String(item.status || "").trim().toUpperCase() === "COMPLETED"
      );
    });
  const completedLessonIds = progressRows.reduce(function (result, item) {
    result[String(item.lesson_id || "").trim()] = true;
    return result;
  }, {});
  const lessonId = String(lesson.lesson_id || "").trim();
  const completedCount = lessons.filter(function (item) {
    return completedLessonIds[String(item.lesson_id || "").trim()];
  }).length;
  const expectedOrder = completedCount + 1;

  if (completedLessonIds[lessonId]) {
    return getTrainingProgress({ agent_id: agentId });
  }

  if (Number(lesson.lesson_order || 0) !== expectedOrder) {
    writeAuditLog("completeTrainingLesson", agentId, "FAILED", "Lesson order violation", {
      requested_order: Number(lesson.lesson_order || 0),
      expected_order: expectedOrder
    });
    return {
      ok: false,
      message: "Lessons must be completed in order",
      expected_lesson_order: expectedOrder
    };
  }

  const now = new Date();

  appendObject(SHEET_NAMES.trainingProgress, {
    progress_id: makeId("TRN"),
    agent_id: agentId,
    lesson_id: lessonId,
    lesson_order: Number(lesson.lesson_order || 0),
    status: "COMPLETED",
    completed_at: now,
    created_at: now,
    updated_at: now
  });

  const newCompletedCount = completedCount + 1;
  const progress = lessons.length
    ? Math.round((newCompletedCount / lessons.length) * 100)
    : 100;
  const updates = {
    status: AGENT_STATUS.TRAINING,
    training_progress: Math.min(100, progress)
  };

  if (progress >= 100) {
    updates.status = AGENT_STATUS.EXAM;
    updates.training_progress = 100;
    updates.training_completed = true;
    updates.training_completed_at = now;
  }

  updateRowFields(SHEET_NAMES.agents, agent._row, updates);
  writeAuditLog("completeTrainingLesson", agentId, "SUCCESS", "Lesson completed", {
    lesson_id: lessonId,
    lesson_order: Number(lesson.lesson_order || 0),
    progress: updates.training_progress
  });

  return {
    ok: true,
    agent_id: agentId,
    lesson_id: lessonId,
    lesson_order: Number(lesson.lesson_order || 0),
    training_progress: updates.training_progress,
    training_completed: updates.training_progress >= 100,
    status: updates.status,
    next_page: getNextPageByStatus(updates.status)
  };
}

/* =========================================================
   PHASE 2C-1 SECURE EXAM API
========================================================= */

function startExamAttempt(body) {
  const agentId = validateAgentId(body && body.agent_id);

  if (!agentId) {
    return { ok: false, message: "Invalid agent_id" };
  }

  const agent = findAgent(agentId);

  if (!agent) {
    writeAuditLog("startExamAttempt", agentId, "FAILED", "Agent not found", {});
    return { ok: false, message: "Agent not found" };
  }

  const status = normalizeStatus(agent.status);

  if (status !== AGENT_STATUS.EXAM) {
    writeAuditLog("startExamAttempt", agentId, "FAILED", "Invalid agent status", {
      status: status
    });
    return {
      ok: false,
      message: "Agent status cannot start exam",
      status: status
    };
  }

  ensurePhase2C1Sheets();

  const now = new Date();
  const activeAttempt = sheetToObjects(SHEET_NAMES.examAttempts).find(function (attempt) {
    const expiresAt = attempt.expires_at ? new Date(attempt.expires_at).getTime() : 0;

    return (
      String(attempt.agent_id || "").trim() === agentId &&
      String(attempt.status || "").trim().toUpperCase() === "IN_PROGRESS" &&
      expiresAt > now.getTime()
    );
  });

  if (activeAttempt) {
    return {
      ok: true,
      agent_id: agentId,
      attempt_id: activeAttempt.attempt_id,
      status: "IN_PROGRESS",
      expires_at: activeAttempt.expires_at,
      reused: true
    };
  }

  const questions = getActiveExamQuestions();

  if (questions.length === 0) {
    return { ok: false, message: "No active exam questions" };
  }

  const attemptId = makeId("EXATT");
  const expiresAt = new Date(now.getTime() + SECURE_EXAM_DURATION_MINUTES * 60 * 1000);

  appendObject(SHEET_NAMES.examAttempts, {
    attempt_id: attemptId,
    agent_id: agentId,
    status: "IN_PROGRESS",
    started_at: now,
    expires_at: expiresAt,
    submitted_at: "",
    question_ids: JSON.stringify(questions.map(function (question) {
      return cleanString(question.question_id, 80);
    })),
    answers_json: "",
    score: "",
    passed: "",
    created_at: now,
    updated_at: now
  });

  writeAuditLog("startExamAttempt", agentId, "SUCCESS", "Exam attempt started", {
    attempt_id: attemptId,
    question_count: questions.length
  });

  return {
    ok: true,
    agent_id: agentId,
    attempt_id: attemptId,
    status: "IN_PROGRESS",
    question_count: questions.length,
    expires_at: expiresAt
  };
}

function getExamQuestions(options) {
  const params = options || {};
  const agentId = validateAgentId(params.agent_id);
  const attemptId = cleanString(params.attempt_id, 120);

  if (!agentId || !attemptId) {
    return { ok: false, message: "Missing agent_id or attempt_id" };
  }

  const attempt = findAttempt(attemptId);

  if (!attempt || String(attempt.agent_id || "").trim() !== agentId) {
    return { ok: false, message: "Exam attempt not found" };
  }

  if (String(attempt.status || "").trim().toUpperCase() !== "IN_PROGRESS") {
    return { ok: false, message: "Exam attempt is not active" };
  }

  if (attempt.expires_at && new Date(attempt.expires_at).getTime() < new Date().getTime()) {
    return { ok: false, message: "Exam attempt expired" };
  }

  const questionIds = parseJsonValue(attempt.question_ids, []);
  const questionsById = getActiveExamQuestions().reduce(function (result, question) {
    result[String(question.question_id || "").trim()] = question;
    return result;
  }, {});
  const questions = questionIds
    .map(function (questionId) {
      return questionsById[String(questionId || "").trim()];
    })
    .filter(Boolean)
    .map(publicExamQuestion);

  return {
    ok: true,
    agent_id: agentId,
    attempt_id: attemptId,
    expires_at: attempt.expires_at,
    total: questions.length,
    questions: questions
  };
}

function submitExamAnswers(body) {
  const agentId = validateAgentId(body && body.agent_id);
  const attemptId = cleanString(body && body.attempt_id, 120);

  if (!agentId || !attemptId) {
    return { ok: false, message: "Missing agent_id or attempt_id" };
  }

  const agent = findAgent(agentId);

  if (!agent) {
    writeAuditLog("submitExamAnswers", agentId, "FAILED", "Agent not found", {
      attempt_id: attemptId
    });
    return { ok: false, message: "Agent not found" };
  }

  const currentStatus = normalizeStatus(agent.status);

  if (currentStatus !== AGENT_STATUS.EXAM) {
    writeAuditLog("submitExamAnswers", agentId, "FAILED", "Invalid agent status", {
      attempt_id: attemptId,
      status: currentStatus
    });
    return {
      ok: false,
      message: "Agent status cannot submit exam",
      status: currentStatus
    };
  }

  const attempt = findAttempt(attemptId);

  if (!attempt || String(attempt.agent_id || "").trim() !== agentId) {
    return { ok: false, message: "Exam attempt not found" };
  }

  if (String(attempt.status || "").trim().toUpperCase() !== "IN_PROGRESS") {
    writeAuditLog("submitExamAnswers", agentId, "FAILED", "Duplicate exam submission", {
      attempt_id: attemptId,
      current_attempt_status: attempt.status
    });
    return { ok: false, message: "Exam attempt already submitted" };
  }

  if (attempt.expires_at && new Date(attempt.expires_at).getTime() < new Date().getTime()) {
    updateRowFields(SHEET_NAMES.examAttempts, attempt._row, {
      status: "EXPIRED",
      updated_at: new Date()
    });
    writeAuditLog("submitExamAnswers", agentId, "FAILED", "Exam attempt expired", {
      attempt_id: attemptId
    });
    return { ok: false, message: "Exam attempt expired" };
  }

  const answers = normalizeAnswers(body.answers);
  const questionIds = parseJsonValue(attempt.question_ids, []);
  const questionsById = getActiveExamQuestions().reduce(function (result, question) {
    result[String(question.question_id || "").trim()] = question;
    return result;
  }, {});
  let correctCount = 0;
  const gradedAnswers = {};

  questionIds.forEach(function (questionId) {
    const normalizedQuestionId = cleanString(questionId, 80);
    const question = questionsById[normalizedQuestionId];
    const selected = normalizeAnswerChoice(answers[normalizedQuestionId]);
    const correct = normalizeAnswerChoice(question && question.correct_choice);

    gradedAnswers[normalizedQuestionId] = selected || "";

    if (question && selected && selected === correct) {
      correctCount += 1;
    }
  });

  const totalQuestions = questionIds.length;
  const score = clampScore(totalQuestions ? (correctCount / totalQuestions) * 100 : 0);
  const passed = score >= EXAM_PASS_SCORE;
  const nextStatus = passed ? AGENT_STATUS.WAIT_APPROVAL : AGENT_STATUS.EXAM;
  const attempts = Number(agent.exam_attempts || 0) + 1;
  const now = new Date();

  updateRowFields(SHEET_NAMES.examAttempts, attempt._row, {
    status: "SUBMITTED",
    submitted_at: now,
    answers_json: JSON.stringify(gradedAnswers),
    score: score,
    passed: passed,
    updated_at: now
  });

  updateRowFields(SHEET_NAMES.agents, agent._row, {
    exam_score: score,
    exam_passed: passed,
    exam_attempts: attempts,
    exam_date: now,
    status: nextStatus
  });

  writeAuditLog("submitExamAnswers", agentId, "SUCCESS", "Exam attempt submitted", {
    attempt_id: attemptId,
    score: score,
    passed: passed,
    total_questions: totalQuestions,
    correct_count: correctCount
  });

  return {
    ok: true,
    agent_id: agentId,
    attempt_id: attemptId,
    score: score,
    passed: passed,
    pass_score: EXAM_PASS_SCORE,
    attempts: attempts,
    status: nextStatus,
    next_page: getNextPageByStatus(nextStatus)
  };
}

function getExamResult(options) {
  const params = options || {};
  const agentId = validateAgentId(params.agent_id);
  const attemptId = cleanString(params.attempt_id || "", 120);

  if (!agentId) {
    return { ok: false, message: "Invalid agent_id" };
  }

  ensurePhase2C1Sheets();

  let attempt = attemptId ? findAttempt(attemptId) : null;

  if (!attempt) {
    const attempts = sheetToObjects(SHEET_NAMES.examAttempts)
      .filter(function (item) {
        return String(item.agent_id || "").trim() === agentId;
      })
      .sort(function (a, b) {
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      });

    attempt = attempts[0] || null;
  }

  if (!attempt || String(attempt.agent_id || "").trim() !== agentId) {
    return { ok: false, message: "Exam result not found" };
  }

  return {
    ok: true,
    agent_id: agentId,
    attempt_id: attempt.attempt_id,
    status: attempt.status,
    started_at: attempt.started_at,
    submitted_at: attempt.submitted_at,
    score: attempt.score === "" ? null : clampScore(attempt.score),
    passed: attempt.passed === "" ? null : booleanValue(attempt.passed),
    pass_score: EXAM_PASS_SCORE
  };
}

/* =========================================================
   REGISTER
========================================================= */

function registerAgent(body) {
  const required = [
    "first_name",
    "last_name",
    "phone",
    "email",
    "password",
    "line",
    "facebook",
    "tiktok",
    "youtube",
    "address",
    "bank_name",
    "bank_account",
    "team_manager"
  ];

  const validation = requireFields(body, required);

  if (!validation.ok) {
    return validation;
  }

  const email = String(body.email || "").trim().toLowerCase();
  const phone = String(body.phone || "").trim();
  const agents = sheetToObjects(SHEET_NAMES.agents);

  const emailExists = agents.some(function (agent) {
    return String(agent.email || "").trim().toLowerCase() === email;
  });

  if (emailExists) {
    return { ok: false, message: "อีเมลนี้ถูกใช้แล้ว" };
  }

  const phoneExists = agents.some(function (agent) {
    return String(agent.phone || "").trim() === phone;
  });

  if (phoneExists) {
    return { ok: false, message: "เบอร์โทรศัพท์นี้ถูกใช้แล้ว" };
  }

  const agentId = "AGT-" + Date.now();
  const now = new Date();

  appendObject(SHEET_NAMES.agents, {
    agent_id: agentId,
    first_name: String(body.first_name || "").trim(),
    last_name: String(body.last_name || "").trim(),
    phone: phone,
    email: email,
    password: String(body.password || "").trim(),
    line: String(body.line || "").trim(),
    facebook: String(body.facebook || "").trim(),
    tiktok: String(body.tiktok || "").trim(),
    youtube: String(body.youtube || "").trim(),
    address: String(body.address || "").trim(),
    bank_name: String(body.bank_name || "").trim(),
    bank_account: String(body.bank_account || "").trim(),
    team_manager: String(body.team_manager || "").trim(),
    am: String(body.am || "").trim(),
    role: "Agent",
    status: AGENT_STATUS.REGISTERED,
    photo_url: String(body.photo_url || "").trim(),
    created_at: now,
    training_progress: 0,
    training_completed: false,
    training_completed_at: "",
    exam_score: 0,
    exam_passed: false,
    exam_attempts: 0,
    exam_date: "",
    approved_date: ""
  });

  return {
    ok: true,
    message: "สมัครสำเร็จ กรุณาเข้าสู่ระบบเพื่อเริ่มการอบรม",
    agent_id: agentId,
    status: AGENT_STATUS.REGISTERED,
    next_page: "agent-login.html"
  };
}

/* =========================================================
   LOGIN
========================================================= */

function login(body) {
  const username = String(body.username || "").trim();
  const password = String(body.password || "").trim();

  if (!username || !password) {
    return { ok: false, message: "กรุณากรอกข้อมูลให้ครบ" };
  }

  const agents = sheetToObjects(SHEET_NAMES.agents);

  const user = agents.find(function (agent) {
    return (
      String(agent.agent_id || "").trim() === username ||
      String(agent.email || "").trim().toLowerCase() === username.toLowerCase()
    );
  });

  if (!user) {
    return { ok: false, message: "ไม่พบตัวแทน" };
  }

  if (String(user.password || "").trim() !== password) {
    return { ok: false, message: "รหัสผ่านไม่ถูกต้อง" };
  }

  const status = normalizeStatus(user.status);

  if (status === AGENT_STATUS.REJECTED) {
    return { ok: false, message: "บัญชีนี้ไม่ได้รับการอนุมัติ" };
  }

  if (status === AGENT_STATUS.SUSPENDED) {
    return { ok: false, message: "บัญชีนี้ถูกระงับ กรุณาติดต่อบริษัท" };
  }

  const nextPage = getNextPageByStatus(status);

  if (!nextPage) {
    return {
      ok: false,
      message: "สถานะบัญชีไม่ถูกต้อง กรุณาติดต่อผู้ดูแลระบบ",
      status: status
    };
  }

  return {
    ok: true,
    agent_id: user.agent_id,
    name: (
      String(user.first_name || "") +
      " " +
      String(user.last_name || "")
    ).trim(),
    role: user.role || "Agent",
    status: status,
    training_progress: Number(user.training_progress || 0),
    training_completed: booleanValue(user.training_completed),
    exam_score: Number(user.exam_score || 0),
    exam_passed: booleanValue(user.exam_passed),
    exam_attempts: Number(user.exam_attempts || 0),
    next_page: nextPage
  };
}

/* =========================================================
   AGENT
========================================================= */

function getAgent(agentId) {
  const agent = findAgent(agentId);

  if (!agent) {
    return { ok: false, message: "Agent not found" };
  }

  agent.status = normalizeStatus(agent.status);

  return {
    ok: true,
    agent: publicAgent(agent)
  };
}

function getAgentStatus(agentId) {
  const agent = findAgent(agentId);

  if (!agent) {
    return { ok: false, message: "Agent not found" };
  }

  const status = normalizeStatus(agent.status);

  return {
    ok: true,
    agent_id: agent.agent_id,
    status: status,
    training_progress: Number(agent.training_progress || 0),
    training_completed: booleanValue(agent.training_completed),
    exam_score: Number(agent.exam_score || 0),
    exam_passed: booleanValue(agent.exam_passed),
    exam_attempts: Number(agent.exam_attempts || 0),
    next_page: getNextPageByStatus(status)
  };
}

function updateAgentStatus(agentId, status) {
  const agent = findAgent(agentId);

  if (!agent) {
    return { ok: false, message: "Agent not found" };
  }

  const normalizedStatus = normalizeStatus(status);
  const updates = {
    status: normalizedStatus
  };

  if (normalizedStatus === AGENT_STATUS.APPROVED) {
    updates.approved_date = new Date();
  }

  updateRowFields(SHEET_NAMES.agents, agent._row, updates);

  return {
    ok: true,
    message: "Agent status updated",
    agent_id: agentId,
    status: normalizedStatus,
    next_page: getNextPageByStatus(normalizedStatus)
  };
}

/* =========================================================
   TRAINING
========================================================= */

function startTraining(body) {
  const agent = findAgent(body.agent_id);

  if (!agent) {
    return { ok: false, message: "Agent not found" };
  }

  const status = normalizeStatus(agent.status);

  if (
    status !== AGENT_STATUS.REGISTERED &&
    status !== AGENT_STATUS.TRAINING
  ) {
    return {
      ok: false,
      message: "สถานะบัญชีไม่สามารถเริ่มอบรมได้",
      status: status
    };
  }

  updateRowFields(SHEET_NAMES.agents, agent._row, {
    status: AGENT_STATUS.TRAINING
  });

  return {
    ok: true,
    message: "เริ่มการอบรมแล้ว",
    agent_id: agent.agent_id,
    status: AGENT_STATUS.TRAINING,
    next_page: "agent-learning.html"
  };
}

function updateTrainingProgress(body) {
  const agent = findAgent(body.agent_id);

  if (!agent) {
    return { ok: false, message: "Agent not found" };
  }

  const currentStatus = normalizeStatus(agent.status);

  if (
    currentStatus !== AGENT_STATUS.REGISTERED &&
    currentStatus !== AGENT_STATUS.TRAINING
  ) {
    return {
      ok: false,
      message: "Agent status cannot update training",
      status: currentStatus
    };
  }

  const requestedProgress = Math.max(
    0,
    Math.min(100, Number(body.progress || 0))
  );
  const lessons = getActiveTrainingLessons();
  const progressResult = getTrainingProgress({ agent_id: agent.agent_id });
  const currentProgress = progressResult.ok
    ? Number(progressResult.training_progress || 0)
    : Number(agent.training_progress || 0);
  const completedCount = progressResult.ok
    ? Number(progressResult.completed_lessons || 0)
    : Math.floor(currentProgress / Math.max(1, Math.round(100 / Math.max(1, lessons.length))));
  const expectedProgress = lessons.length
    ? Math.round(((completedCount + 1) / lessons.length) * 100)
    : 100;

  if (requestedProgress <= currentProgress) {
    return progressResult.ok
      ? progressResult
      : {
          ok: true,
          agent_id: agent.agent_id,
          training_progress: currentProgress,
          training_completed: booleanValue(agent.training_completed),
          status: currentStatus,
          next_page: getNextPageByStatus(currentStatus)
        };
  }

  if (requestedProgress > expectedProgress || completedCount >= lessons.length) {
    writeAuditLog("updateTrainingProgress", agent.agent_id, "FAILED", "Legacy progress order violation", {
      requested_progress: requestedProgress,
      current_progress: currentProgress,
      expected_progress: expectedProgress
    });
    return {
      ok: false,
      message: "Training progress must follow lesson order",
      expected_progress: expectedProgress,
      current_progress: currentProgress
    };
  }

  return completeTrainingLesson({
    agent_id: agent.agent_id,
    lesson_order: completedCount + 1
  });
}
function completeTraining(body) {
  return updateTrainingProgress({
    agent_id: body.agent_id,
    progress: 100
  });
}

/* =========================================================
   EXAM
========================================================= */

function submitExam(body) {
  if (body && body.attempt_id && body.answers) {
    return submitExamAnswers(body);
  }

  const agentId = validateAgentId(body && body.agent_id);

  if (agentId) {
    writeAuditLog("submitExam", agentId, "FAILED", "Legacy score submission rejected", {
      reason: "Backend no longer trusts client-submitted scores"
    });
  }

  return {
    ok: false,
    message: "Secure exam submission requires attempt_id and answers",
    code: "SECURE_EXAM_REQUIRED"
  };
}
/* =========================================================
   DASHBOARD
========================================================= */

function getDashboard(agentId) {
  const agentResult = getAgent(agentId);

  if (!agentResult.ok) {
    return agentResult;
  }

  const status = normalizeStatus(agentResult.agent.status);

  if (status !== AGENT_STATUS.APPROVED) {
    return {
      ok: false,
      message: "บัญชียังไม่ได้รับอนุมัติให้ใช้งาน Dashboard",
      status: status,
      next_page: getNextPageByStatus(status)
    };
  }

  const income = sheetToObjects(SHEET_NAMES.income).filter(function (item) {
    return String(item.agent_id || "") === String(agentId || "");
  });

  const withdraws = sheetToObjects(SHEET_NAMES.withdraws).filter(function (item) {
    return String(item.agent_id || "") === String(agentId || "");
  });

  const bonus = sheetToObjects(SHEET_NAMES.bonus).filter(function (item) {
    return String(item.agent_id || "") === String(agentId || "");
  });

  const orders = sheetToObjects(SHEET_NAMES.orders).filter(function (item) {
    return String(item.agent_id || "") === String(agentId || "");
  });

  const totalIncome = sum(income, "net_amount");
  const available = sum(
    income.filter(function (item) {
      return String(item.status || "") === "AVAILABLE";
    }),
    "net_amount"
  );
  const waiting = sum(
    income.filter(function (item) {
      return String(item.status || "") === "WAIT_7_DAYS";
    }),
    "net_amount"
  );
  const withdrawn = sum(
    withdraws.filter(function (item) {
      return String(item.status || "") === "PAID";
    }),
    "amount"
  );
  const totalBonus = sum(
    bonus.filter(function (item) {
      return String(item.status || "") === "APPROVED";
    }),
    "amount"
  );
  const commission = sum(income, "amount");
  const tax = sum(income, "tax");
  const net = totalIncome + totalBonus - tax;

  return {
    ok: true,
    agent: agentResult.agent,
    summary: {
      totalIncome: totalIncome,
      available: available,
      waiting: waiting,
      withdrawn: withdrawn,
      totalBonus: totalBonus,
      commission: commission,
      tax: tax,
      net: net
    },
    income: income,
    withdraws: withdraws,
    bonus: bonus,
    orders: orders
  };
}

function cleanString(value, maxLength) {
  const limit = Math.max(1, Number(maxLength || 500));
  return String(value === null || value === undefined ? "" : value)
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim()
    .slice(0, limit);
}

function validateAgentId(agentId) {
  const normalizedId = cleanString(agentId, 80);

  if (!normalizedId || !/^[A-Za-z0-9_-]+$/.test(normalizedId)) {
    return "";
  }

  return normalizedId;
}

function clampScore(score) {
  return Math.max(0, Math.min(100, Math.round(Number(score || 0))));
}

function makeId(prefix) {
  return prefix + "-" + Date.now() + "-" + Math.floor(Math.random() * 100000);
}

/* =========================================================
   ADMIN DASHBOARD
========================================================= */

function publicAgent(agent) {
  const status = normalizeStatus(agent.status);

  return {
    agent_id: agent.agent_id || "",
    first_name: agent.first_name || "",
    last_name: agent.last_name || "",
    name: (
      String(agent.first_name || "") +
      " " +
      String(agent.last_name || "")
    ).trim(),
    phone: agent.phone || "",
    email: agent.email || "",
    line: agent.line || "",
    facebook: agent.facebook || "",
    tiktok: agent.tiktok || "",
    youtube: agent.youtube || "",
    address: agent.address || "",
    bank_name: agent.bank_name || "",
    bank_account: agent.bank_account || "",
    team_manager: agent.team_manager || "",
    am: agent.am || "",
    role: agent.role || "Agent",
    status: status,
    photo_url: agent.photo_url || "",
    created_at: agent.created_at || "",
    training_progress: Number(agent.training_progress || 0),
    training_completed: booleanValue(agent.training_completed),
    training_completed_at: agent.training_completed_at || "",
    exam_score: Number(agent.exam_score || 0),
    exam_passed: booleanValue(agent.exam_passed),
    exam_attempts: Number(agent.exam_attempts || 0),
    exam_date: agent.exam_date || "",
    approved_date: agent.approved_date || "",
    next_page: getNextPageByStatus(status)
  };
}

function filterAgents(agents, options) {
  const params = options || {};
  const status = normalizeStatus(params.status || "");
  const query = String(params.q || params.query || params.search || "").trim().toLowerCase();
  const teamManager = String(params.team_manager || params.teamManager || "").trim().toLowerCase();
  const am = String(params.am || "").trim().toLowerCase();

  return agents.filter(function (agent) {
    if (status && normalizeStatus(agent.status) !== status) {
      return false;
    }

    if (
      teamManager &&
      String(agent.team_manager || "").trim().toLowerCase() !== teamManager
    ) {
      return false;
    }

    if (
      am &&
      String(agent.am || "").trim().toLowerCase() !== am
    ) {
      return false;
    }

    if (!query) {
      return true;
    }

    const searchable = [
      agent.agent_id,
      agent.first_name,
      agent.last_name,
      agent.phone,
      agent.email,
      agent.line,
      agent.team_manager,
      agent.am
    ].join(" ").toLowerCase();

    return searchable.indexOf(query) !== -1;
  });
}

function summarizeAgents(agents) {
  const summary = {
    total: agents.length,
    registered: 0,
    training: 0,
    exam: 0,
    wait_approval: 0,
    approved: 0,
    rejected: 0,
    suspended: 0,
    training_completed: 0,
    exam_passed: 0,
    average_exam_score: 0,
    average_training_progress: 0
  };

  let scoreTotal = 0;
  let scoreCount = 0;
  let progressTotal = 0;

  agents.forEach(function (agent) {
    const status = normalizeStatus(agent.status);

    if (status === AGENT_STATUS.REGISTERED) summary.registered += 1;
    if (status === AGENT_STATUS.TRAINING) summary.training += 1;
    if (status === AGENT_STATUS.EXAM) summary.exam += 1;
    if (status === AGENT_STATUS.WAIT_APPROVAL) summary.wait_approval += 1;
    if (status === AGENT_STATUS.APPROVED) summary.approved += 1;
    if (status === AGENT_STATUS.REJECTED) summary.rejected += 1;
    if (status === AGENT_STATUS.SUSPENDED) summary.suspended += 1;

    if (booleanValue(agent.training_completed)) {
      summary.training_completed += 1;
    }

    if (booleanValue(agent.exam_passed)) {
      summary.exam_passed += 1;
    }

    const progress = Number(agent.training_progress || 0);
    progressTotal += Math.max(0, Math.min(100, progress));

    if (agent.exam_score !== "" && agent.exam_score !== null && agent.exam_score !== undefined) {
      scoreTotal += Number(agent.exam_score || 0);
      scoreCount += 1;
    }
  });

  summary.average_training_progress = summary.total
    ? Math.round(progressTotal / summary.total)
    : 0;
  summary.average_exam_score = scoreCount
    ? Math.round(scoreTotal / scoreCount)
    : 0;

  return summary;
}

function summarizeFinancials() {
  const income = sheetToObjects(SHEET_NAMES.income);
  const withdraws = sheetToObjects(SHEET_NAMES.withdraws);
  const bonus = sheetToObjects(SHEET_NAMES.bonus);
  const orders = sheetToObjects(SHEET_NAMES.orders);

  const availableIncome = income.filter(function (item) {
    return String(item.status || "").trim().toUpperCase() === "AVAILABLE";
  });

  const paidWithdraws = withdraws.filter(function (item) {
    return String(item.status || "").trim().toUpperCase() === "PAID";
  });

  const approvedBonus = bonus.filter(function (item) {
    return String(item.status || "").trim().toUpperCase() === "APPROVED";
  });

  return {
    income_count: income.length,
    withdraw_count: withdraws.length,
    bonus_count: bonus.length,
    order_count: orders.length,
    total_income: sum(income, "net_amount"),
    available_income: sum(availableIncome, "net_amount"),
    paid_withdraw: sum(paidWithdraws, "amount"),
    approved_bonus: sum(approvedBonus, "amount")
  };
}

function listAgents(options) {
  const params = options || {};
  const limit = Math.max(1, Math.min(500, Number(params.limit || 200)));
  const offset = Math.max(0, Number(params.offset || 0));
  const agents = filterAgents(sheetToObjects(SHEET_NAMES.agents), params)
    .map(publicAgent);
  const rows = agents.slice(offset, offset + limit);

  return {
    ok: true,
    total: agents.length,
    limit: limit,
    offset: offset,
    agents: rows,
    summary: summarizeAgents(agents)
  };
}

function listPendingAgents(options) {
  const params = {};
  Object.keys(options || {}).forEach(function (key) {
    params[key] = options[key];
  });
  params.status = AGENT_STATUS.WAIT_APPROVAL;

  return listAgents(params);
}

function getAdminDashboard(options) {
  const params = options || {};
  const agents = sheetToObjects(SHEET_NAMES.agents);
  const publicAgents = agents.map(publicAgent);
  const pendingAgents = publicAgents.filter(function (agent) {
    return agent.status === AGENT_STATUS.WAIT_APPROVAL;
  });
  const recentLimit = Math.max(1, Math.min(50, Number(params.recent_limit || params.limit || 10)));

  return {
    ok: true,
    summary: summarizeAgents(agents),
    statistics: summarizeFinancials(),
    pending_agents: pendingAgents.slice(0, recentLimit),
    recent_agents: publicAgents.slice(Math.max(0, publicAgents.length - recentLimit)).reverse()
  };
}

/* =========================================================
   WITHDRAW
========================================================= */

function requestWithdraw(body) {
  const agentId = String(body.agent_id || "").trim();
  const amount = Number(body.amount || 0);

  if (!agentId || amount <= 0) {
    return {
      ok: false,
      message: "ข้อมูลถอนเงินไม่ถูกต้อง"
    };
  }

  appendObject(SHEET_NAMES.withdraws, {
    withdraw_id: "WD-" + Date.now(),
    agent_id: agentId,
    amount: amount,
    status: "PENDING",
    request_date: new Date(),
    paid_date: "",
    note: String(body.note || "").trim()
  });

  return {
    ok: true,
    message: "ส่งคำขอถอนเงินเรียบร้อย"
  };
}

function updateWithdrawStatus(withdrawId, status) {
  const normalizedId = String(withdrawId || "").trim();

  if (!normalizedId) {
    return { ok: false, message: "Missing withdraw_id" };
  }

  const item = sheetToObjects(SHEET_NAMES.withdraws).find(function (withdraw) {
    return String(withdraw.withdraw_id || "").trim() === normalizedId;
  });

  if (!item) {
    return { ok: false, message: "Withdraw not found" };
  }

  const updates = {
    status: status
  };

  if (status === "PAID") {
    updates.paid_date = new Date();
  }

  updateRowFields(SHEET_NAMES.withdraws, item._row, updates);

  return {
    ok: true,
    message: "Withdraw status updated",
    withdraw_id: normalizedId,
    status: status
  };
}

/* =========================================================
   BONUS
========================================================= */

function createBonus(body) {
  const agentId = String(body.agent_id || "").trim();
  const amount = Number(body.amount || 0);

  if (!agentId || amount <= 0) {
    return {
      ok: false,
      message: "ข้อมูลโบนัสไม่ถูกต้อง"
    };
  }

  appendObject(SHEET_NAMES.bonus, {
    bonus_id: "BONUS-" + Date.now(),
    agent_id: agentId,
    type: String(body.type || "โบนัสพิเศษ").trim(),
    amount: amount,
    month: String(body.month || "").trim(),
    status: "APPROVED",
    note: String(body.note || "").trim(),
    created_by: String(body.created_by || "OWNER").trim(),
    created_at: new Date()
  });

  return {
    ok: true,
    message: "สร้างโบนัสเรียบร้อย"
  };
}
