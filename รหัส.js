const SHEET_NAMES = {
  agents: "agents",
  income: "income",
  withdraws: "withdraws",
  bonus: "bonus",
  orders: "orders"
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
      return String(obj.agent_id || obj.withdraw_id || obj.order_id || "").trim() !== "";
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
    agent: agent
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
      message: "สถานะบัญชีไม่สามารถอัปเดตการอบรมได้",
      status: currentStatus
    };
  }

  const progress = Math.max(
    0,
    Math.min(100, Number(body.progress || 0))
  );

  const updates = {
    status: AGENT_STATUS.TRAINING,
    training_progress: progress
  };

  if (progress >= 100) {
    updates.status = AGENT_STATUS.EXAM;
    updates.training_progress = 100;
    updates.training_completed = true;
    updates.training_completed_at = new Date();
  }

  updateRowFields(SHEET_NAMES.agents, agent._row, updates);

  return {
    ok: true,
    message:
      progress >= 100
        ? "อบรมครบแล้ว ระบบเปิดการสอบให้คุณแล้ว"
        : "บันทึกความคืบหน้าการอบรมแล้ว",
    agent_id: agent.agent_id,
    training_progress: updates.training_progress,
    training_completed: progress >= 100,
    status: updates.status,
    next_page: getNextPageByStatus(updates.status)
  };
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
  const agent = findAgent(body.agent_id);

  if (!agent) {
    return { ok: false, message: "Agent not found" };
  }

  const status = normalizeStatus(agent.status);

  if (status !== AGENT_STATUS.EXAM) {
    return {
      ok: false,
      message: "บัญชียังไม่อยู่ในขั้นตอนการสอบ",
      status: status
    };
  }

  const score = Math.max(
    0,
    Math.min(100, Number(body.score || 0))
  );

  const attempts = Number(agent.exam_attempts || 0) + 1;
  const passed = score >= EXAM_PASS_SCORE;
  const newStatus = passed
    ? AGENT_STATUS.WAIT_APPROVAL
    : AGENT_STATUS.EXAM;

  updateRowFields(SHEET_NAMES.agents, agent._row, {
    exam_score: score,
    exam_passed: passed,
    exam_attempts: attempts,
    exam_date: new Date(),
    status: newStatus
  });

  return {
    ok: true,
    passed: passed,
    score: score,
    pass_score: EXAM_PASS_SCORE,
    attempts: attempts,
    status: newStatus,
    message:
      passed
        ? "สอบผ่านแล้ว กรุณารอการตรวจสอบและอนุมัติจากบริษัท"
        : "คะแนนยังไม่ถึงเกณฑ์ กรุณาทบทวนบทเรียนและสอบใหม่",
    next_page: getNextPageByStatus(newStatus)
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
