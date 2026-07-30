const SHEET_NAMES = {
  agents: "agents",
  income: "income",
  withdraws: "withdraws",
  bonus: "bonus",
  orders: "orders",
  customers: "customers",
  quotations: "quotations",
  orderStatusLogs: "order_status_logs",
  products: "products",
  productPricing: "product_pricing",
  depositPolicies: "deposit_policies",
  payments: "payments",
  commissionRules: "commission_rules",
  commissions: "commissions",
  walletAccounts: "wallet_accounts",
  walletLedger: "wallet_ledger",
  withdrawalRequests: "withdrawal_requests",
  financeAuditLogs: "finance_audit_logs",
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
const ADMIN_SESSION_TTL_SECONDS = 21600;
const AGENT_SESSION_TTL_SECONDS = 21600;

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
        result = getDashboard(e.parameter);
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

      case "getCustomer":
        result = getCustomer(e.parameter);
        break;

      case "listCustomers":
        result = listCustomers(e.parameter);
        break;

      case "getQuotation":
        result = getQuotation(e.parameter);
        break;

      case "listQuotations":
        result = listQuotations(e.parameter);
        break;

      case "getOrder":
        result = getOrder(e.parameter);
        break;

      case "listOrders":
        result = listOrders(e.parameter);
        break;

      case "listOrderStatusLogs":
        result = listOrderStatusLogs(e.parameter);
        break;

      case "listProducts":
        result = listProducts(e.parameter);
        break;

      case "getProduct":
        result = getProduct(e.parameter);
        break;

      case "listPricing":
        result = listPricing(e.parameter);
        break;

      case "getDepositPolicy":
        result = getDepositPolicy(e.parameter);
        break;

      case "calculatePricing":
        result = calculatePricing(e.parameter);
        break;

      case "listPayments":
        result = listPayments(e.parameter);
        break;

      case "getAgentCommissionSummary":
      case "listAgentCommissions":
      case "getAgentCommissionDetail":
      case "getAgentWallet":
      case "listAgentWalletLedger":
      case "createWithdrawalRequest":
      case "listAgentWithdrawals":
      case "getAgentWithdrawalDetail":
      case "getFinanceDashboard":
      case "listAllCommissions":
      case "getCommissionDetailAdmin":
      case "holdCommission":
      case "releaseCommissionHold":
      case "reverseCommission":
      case "listWalletAccountsAdmin":
      case "getWalletAccountAdmin":
      case "listWithdrawalsAdmin":
      case "getWithdrawalDetailAdmin":
      case "approveWithdrawal":
      case "rejectWithdrawal":
      case "markWithdrawalPaid":
      case "createWalletAdjustment":
      case "getCommissionConfiguration":
      case "saveCommissionConfiguration":
      case "runFinanceIntegrityCheck":
        result = protectedPostRequired(action);
        break;

      case "listTrainingLessons":
        result = listTrainingLessons(e.parameter);
        break;

      case "getTrainingProgress":
        result = getTrainingProgress(e.parameter);
        break;

      case "getExamQuestions":
        result = protectedPostRequired("getExamQuestions");
        break;

      case "getExamResult":
        result = protectedPostRequired("getExamResult");
        break;

      case "login":
        result = login({
          username: e.parameter.username,
          password: e.parameter.password
        });
        break;

      case "approveAgent":
        result = protectedPostRequired("approveAgent");
        break;

      case "rejectAgent":
        result = protectedPostRequired("rejectAgent");
        break;

      case "suspendAgent":
        result = protectedPostRequired("suspendAgent");
        break;

      case "markWithdrawPaid":
        result = protectedPostRequired("markWithdrawPaid");
        break;

      case "rejectWithdraw":
        result = protectedPostRequired("rejectWithdraw");
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
    const body = parseRequestBody(raw);
    const action = String(body.action || "").trim();
    let result;

    switch (action) {
      case "registerAgent":
        result = registerAgent(body);
        break;

      case "login":
        result = login(body);
        break;

      case "logoutAgent":
        result = logoutAgent(body);
        break;

      case "logoutAdmin":
        result = logoutAdmin(body);
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

      case "getDashboard":
        result = getDashboard(body);
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
        {
          const admin = requireAdminActor(body);
          result = admin.ok ? createBonus(Object.assign({}, body, { created_by: admin.actor_id })) : admin;
        }
        break;

      case "createCustomer":
        result = createCustomer(body);
        break;

      case "getCustomer":
        result = getCustomer(body);
        break;

      case "listCustomers":
        result = listCustomers(body);
        break;

      case "createQuotation":
        result = createQuotation(body);
        break;

      case "getQuotation":
        result = getQuotation(body);
        break;

      case "listQuotations":
        result = listQuotations(body);
        break;

      case "approveQuotation":
        result = approveQuotation(body);
        break;

      case "rejectQuotation":
        result = rejectQuotation(body);
        break;

      case "createOrderFromQuotation":
        result = createOrderFromQuotation(body);
        break;

      case "getOrder":
        result = getOrder(body);
        break;

      case "listOrders":
        result = listOrders(body);
        break;

      case "updateOrderStatus":
        result = updateOrderStatus(body);
        break;

      case "createProduct":
        result = createProduct(body);
        break;

      case "updateProduct":
        result = updateProduct(body);
        break;

      case "deleteProduct":
        result = deleteProduct(body);
        break;

      case "upsertPricing":
        result = upsertPricing(body);
        break;

      case "updateDepositPolicy":
        result = updateDepositPolicy(body);
        break;

      case "calculatePricing":
        result = calculatePricing(body);
        break;

      case "createPayment":
        result = createPayment(body);
        break;

      case "listPayments":
        result = listPayments(body);
        break;

      case "reviewPayment":
        result = reviewPayment(body);
        break;

      case "getAgentCommissionSummary":
        result = getAgentCommissionSummary(body);
        break;

      case "listAgentCommissions":
        result = listAgentCommissions(body);
        break;

      case "getAgentCommissionDetail":
        result = getAgentCommissionDetail(body);
        break;

      case "getAgentWallet":
        result = getAgentWallet(body);
        break;

      case "listAgentWalletLedger":
        result = listAgentWalletLedger(body);
        break;

      case "createWithdrawalRequest":
        result = createWithdrawalRequest(body);
        break;

      case "listAgentWithdrawals":
        result = listAgentWithdrawals(body);
        break;

      case "getAgentWithdrawalDetail":
        result = getAgentWithdrawalDetail(body);
        break;

      case "getFinanceDashboard":
        result = getFinanceDashboard(body);
        break;

      case "listAllCommissions":
        result = listAllCommissions(body);
        break;

      case "getCommissionDetailAdmin":
        result = getCommissionDetailAdmin(body);
        break;

      case "holdCommission":
        result = holdCommission(body);
        break;

      case "releaseCommissionHold":
        result = releaseCommissionHold(body);
        break;

      case "reverseCommission":
        result = reverseCommission(body);
        break;

      case "listWalletAccountsAdmin":
        result = listWalletAccountsAdmin(body);
        break;

      case "getWalletAccountAdmin":
        result = getWalletAccountAdmin(body);
        break;

      case "listWithdrawalsAdmin":
        result = listWithdrawalsAdmin(body);
        break;

      case "getWithdrawalDetailAdmin":
        result = getWithdrawalDetailAdmin(body);
        break;

      case "approveWithdrawal":
        result = approveWithdrawal(body);
        break;

      case "rejectWithdrawal":
        result = rejectWithdrawal(body);
        break;

      case "markWithdrawalPaid":
        result = markWithdrawalPaid(body);
        break;

      case "createWalletAdjustment":
        result = createWalletAdjustment(body);
        break;

      case "getCommissionConfiguration":
        result = getCommissionConfiguration(body);
        break;

      case "saveCommissionConfiguration":
        result = saveCommissionConfiguration(body);
        break;

      case "runFinanceIntegrityCheck":
        result = runFinanceIntegrityCheck(body);
        break;

      case "approveAgent":
        {
          const admin = requireAdminActor(body);
          result = admin.ok ? updateAgentStatus(body.agent_id, AGENT_STATUS.APPROVED) : admin;
        }
        break;

      case "rejectAgent":
        {
          const admin = requireAdminActor(body);
          result = admin.ok ? updateAgentStatus(body.agent_id, AGENT_STATUS.REJECTED) : admin;
        }
        break;

      case "suspendAgent":
        {
          const admin = requireAdminActor(body);
          result = admin.ok ? updateAgentStatus(body.agent_id, AGENT_STATUS.SUSPENDED) : admin;
        }
        break;

      case "markWithdrawPaid":
        {
          const admin = requireAdminActor(body);
          result = admin.ok ? updateWithdrawStatus(body, "PAID") : admin;
        }
        break;

      case "rejectWithdraw":
        {
          const admin = requireAdminActor(body);
          result = admin.ok ? updateWithdrawStatus(body, "REJECTED") : admin;
        }
        break;

      default:
        result = { ok: false, message: "Invalid POST action" };
    }

    return json(result);

  } catch (err) {
    if (err && err.publicError && err.response) {
      return json(err.response);
    }

    return json({
      ok: false,
      error: "INTERNAL_ERROR",
      message: "Unable to process request."
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
        obj.customer_id,
        obj.quotation_id,
        obj.status_log_id,
        obj.product_id,
        obj.pricing_id,
        obj.policy_id,
        obj.payment_id,
        obj.rule_id,
        obj.commission_id,
        obj.wallet_id,
        obj.ledger_id,
        obj.withdrawal_id,
        obj.log_id,
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

function parseRequestBody(raw) {
  try {
    return JSON.parse(raw || "{}");
  } catch (error) {
    throw {
      publicError: true,
      response: {
        ok: false,
        error: "INVALID_REQUEST",
        message: "Invalid request."
      }
    };
  }
}

function protectedPostRequired(action) {
  return {
    ok: false,
    error: "POST_REQUIRED",
    message: action + " requires POST request."
  };
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

const CUSTOMER_HEADERS = [
  "customer_id",
  "owner_agent_id",
  "team_leader_id",
  "team_leader_name",
  "customer_name",
  "phone",
  "email",
  "line_id",
  "tax_id",
  "address",
  "status",
  "created_at",
  "updated_at"
];

const QUOTATION_HEADERS = [
  "quotation_id",
  "customer_id",
  "owner_agent_id",
  "agent_id",
  "owner_agent_name",
  "team_leader_id",
  "team_leader_name",
  "status",
  "product_id",
  "sku",
  "collection",
  "brand",
  "series",
  "model",
  "storage",
  "color",
  "price_date",
  "phone_price",
  "service_fee",
  "promotion",
  "discount",
  "subtotal",
  "vat_rate",
  "vat",
  "total",
  "grand_total",
  "payment_option",
  "deposit_percent",
  "deposit_amount",
  "balance_amount",
  "line_items_json",
  "customer_json",
  "signer_name",
  "signature_data_url",
  "user_agent",
  "order_id",
  "rejected_reason",
  "created_at",
  "updated_at",
  "submitted_at",
  "approved_at",
  "rejected_at"
];

const ORDER_HEADERS = [
  "order_id",
  "quotation_id",
  "customer_id",
  "owner_agent_id",
  "agent_id",
  "owner_agent_name",
  "team_leader_id",
  "team_leader_name",
  "customer_name",
  "customer_phone",
  "customer_email",
  "customer_address",
  "status",
  "product_id",
  "sku",
  "collection",
  "brand",
  "series",
  "model",
  "storage",
  "color",
  "subtotal",
  "vat",
  "total",
  "grand_total",
  "payment_option",
  "deposit_percent",
  "deposit_amount",
  "balance_amount",
  "paid_amount",
  "payment_status",
  "line_items_json",
  "timeline_json",
  "created_at",
  "updated_at",
  "approved_at",
  "paid_at",
  "installing_at",
  "completed_at",
  "cancelled_at"
];

const ORDER_STATUS_LOG_HEADERS = [
  "status_log_id",
  "order_id",
  "quotation_id",
  "customer_id",
  "owner_agent_id",
  "from_status",
  "to_status",
  "actor_id",
  "actor_role",
  "note",
  "created_at"
];

const PRODUCT_HEADERS = [
  "product_id",
  "collection",
  "brand",
  "model",
  "storage",
  "color",
  "sku",
  "status",
  "created_at",
  "updated_at"
];

const PRODUCT_PRICING_HEADERS = [
  "pricing_id",
  "product_id",
  "sku",
  "product_price",
  "service_fee",
  "vat_rate",
  "promotion",
  "discount",
  "status",
  "effective_from",
  "effective_to",
  "created_at",
  "updated_at"
];

const DEPOSIT_POLICY_HEADERS = [
  "policy_id",
  "enabled",
  "deposit_percent",
  "status",
  "created_at",
  "updated_at"
];

const PAYMENT_HEADERS = [
  "payment_id",
  "order_id",
  "quotation_id",
  "customer_id",
  "owner_agent_id",
  "team_leader_id",
  "payment_type",
  "amount",
  "status",
  "method",
  "reference",
  "note",
  "submitted_at",
  "reviewed_at",
  "reviewed_by",
  "created_at",
  "updated_at"
];

const COMMISSION_RULE_HEADERS = [
  "rule_id",
  "product_id",
  "collection",
  "commission_type",
  "commission_value",
  "commissionable_base",
  "deposit_release_percent",
  "final_release_percent",
  "status",
  "effective_from",
  "effective_to",
  "created_at",
  "updated_at",
  "created_by",
  "updated_by",
  "note"
];

const COMMISSION_HEADERS = [
  "commission_id",
  "idempotency_key",
  "agent_id",
  "customer_id",
  "quotation_id",
  "order_id",
  "payment_id",
  "product_id",
  "commission_rule_id",
  "commission_type",
  "milestone",
  "gross_order_amount",
  "commissionable_amount",
  "total_order_commission",
  "released_amount",
  "pending_amount",
  "status",
  "source_status",
  "created_at",
  "available_at",
  "held_at",
  "reversed_at",
  "reference_commission_id",
  "note",
  "is_test",
  "qa_batch"
];

const WALLET_ACCOUNT_HEADERS = [
  "wallet_id",
  "agent_id",
  "status",
  "currency",
  "pending_balance",
  "available_balance",
  "held_balance",
  "reserved_balance",
  "lifetime_earned",
  "lifetime_withdrawn",
  "version",
  "created_at",
  "updated_at",
  "is_test",
  "qa_batch"
];

const WALLET_LEDGER_HEADERS = [
  "ledger_id",
  "wallet_id",
  "agent_id",
  "entry_type",
  "direction",
  "amount",
  "balance_bucket",
  "reference_type",
  "reference_id",
  "idempotency_key",
  "status",
  "note",
  "created_by_type",
  "created_by_id",
  "created_at",
  "is_test",
  "qa_batch"
];

const WITHDRAWAL_REQUEST_HEADERS = [
  "withdrawal_id",
  "agent_id",
  "wallet_id",
  "requested_amount",
  "fee_amount",
  "net_amount",
  "status",
  "bank_account_reference",
  "requested_at",
  "reviewed_at",
  "approved_at",
  "rejected_at",
  "paid_at",
  "reviewer_admin_id",
  "payment_reference",
  "rejection_reason",
  "idempotency_key",
  "is_test",
  "qa_batch"
];

const FINANCE_AUDIT_LOG_HEADERS = [
  "log_id",
  "entity_type",
  "entity_id",
  "action",
  "previous_status",
  "new_status",
  "amount",
  "actor_type",
  "actor_id",
  "reason",
  "metadata_json",
  "created_at",
  "is_test",
  "qa_batch"
];

const QUOTATION_STATUS = {
  DRAFT: "DRAFT",
  SUBMITTED: "SUBMITTED",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CONVERTED: "CONVERTED"
};

const ORDER_STATUS = {
  NEW: "NEW",
  PAYMENT_PENDING: "PAYMENT_PENDING",
  PAYMENT_REVIEW: "PAYMENT_REVIEW",
  DEPOSIT_PAID: "DEPOSIT_PAID",
  PAID_IN_FULL: "PAID_IN_FULL",
  PAID: "PAID",
  PREPARING: "PREPARING",
  READY_TO_INSTALL: "READY_TO_INSTALL",
  INSTALLING: "INSTALLING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED"
};

const ORDER_STATUS_TRANSITIONS = {
  NEW: ["PAYMENT_PENDING", "CANCELLED"],
  PAYMENT_PENDING: ["PAYMENT_REVIEW", "PAID", "CANCELLED"],
  PAYMENT_REVIEW: ["DEPOSIT_PAID", "PAID_IN_FULL", "PAID", "PAYMENT_PENDING", "CANCELLED"],
  DEPOSIT_PAID: ["PREPARING", "PAYMENT_REVIEW", "CANCELLED"],
  PAID_IN_FULL: ["PREPARING", "CANCELLED"],
  PAID: ["PREPARING", "CANCELLED"],
  PREPARING: ["READY_TO_INSTALL", "CANCELLED"],
  READY_TO_INSTALL: ["INSTALLING", "CANCELLED"],
  INSTALLING: ["COMPLETED", "CANCELLED"],
  COMPLETED: [],
  CANCELLED: []
};

const DEFAULT_PRODUCTS = [
  { collection: "Silver Galaxy A Series Collection", brand: "Samsung", model: "Galaxy A17 5G", storage: "128GB", color: "Black", sku: "SSB-SIL-A17-128-BLK", product_price: 7990 },
  { collection: "Silver Galaxy A Series Collection", brand: "Samsung", model: "Galaxy A17 5G", storage: "256GB", color: "Black", sku: "SSB-SIL-A17-256-BLK", product_price: 8990 },
  { collection: "Silver Galaxy A Series Collection", brand: "Samsung", model: "Galaxy A27 5G", storage: "256GB", color: "Light Blue", sku: "SSB-SIL-A27-256-LBL", product_price: 12990 },
  { collection: "Gold Galaxy S Series Collection", brand: "Samsung", model: "Galaxy S26", storage: "256GB", color: "Navy", sku: "SSB-GLD-S26-256-NVY", product_price: 32900 },
  { collection: "Gold Galaxy S Series Collection", brand: "Samsung", model: "Galaxy S26 Ultra", storage: "512GB", color: "Titanium Black", sku: "SSB-GLD-S26U-512-TBK", product_price: 48900 },
  { collection: "Platinum Apple iPhone & iPad Collection", brand: "Apple", model: "iPhone 17", storage: "256GB", color: "Black", sku: "SSB-PLT-IP17-256-BLK", product_price: 32900 },
  { collection: "Platinum Apple iPhone & iPad Collection", brand: "Apple", model: "iPhone 17 Pro", storage: "256GB", color: "Silver", sku: "SSB-PLT-IP17P-256-SLV", product_price: 43900 },
  { collection: "Platinum Apple iPhone & iPad Collection", brand: "iPad", model: "iPad mini Cellular", storage: "256GB", color: "Blue", sku: "SSB-PLT-IPADM-256-BLU", product_price: 25900 }
];

const DEFAULT_SERVICE_FEE = 45000;
const DEFAULT_VAT_RATE = 0.07;
const DEFAULT_DEPOSIT_PERCENT = 30;

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
  const agentAuth = requireExamAgentActor(body || {});

  if (!agentAuth.ok) {
    return agentAuth;
  }

  const agentId = agentAuth.agent_id;
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
  const agentAuth = requireExamAgentActor(params);

  if (!agentAuth.ok) {
    return agentAuth;
  }

  const agentId = agentAuth.agent_id;
  const attemptId = cleanString(params.attempt_id, 120);

  if (!attemptId) {
    return { ok: false, message: "Missing attempt_id" };
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
  const agentAuth = requireExamAgentActor(body || {});

  if (!agentAuth.ok) {
    return agentAuth;
  }

  const agentId = agentAuth.agent_id;
  const attemptId = cleanString(body && body.attempt_id, 120);

  if (!attemptId) {
    return { ok: false, message: "Missing attempt_id" };
  }

  if (
    Object.prototype.hasOwnProperty.call(body || {}, "score") ||
    Object.prototype.hasOwnProperty.call(body || {}, "exam_score") ||
    Object.prototype.hasOwnProperty.call(body || {}, "passed") ||
    Object.prototype.hasOwnProperty.call(body || {}, "pass") ||
    Object.prototype.hasOwnProperty.call(body || {}, "exam_passed")
  ) {
    writeAuditLog("submitExamAnswers", agentId, "FAILED", "Client score/pass tampering rejected", {
      attempt_id: attemptId
    });
    return {
      ok: false,
      message: "Exam score is calculated by backend only",
      code: "CLIENT_SCORE_REJECTED"
    };
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
  const allowedQuestionIds = questionIds.reduce(function (result, questionId) {
    const normalizedQuestionId = cleanString(questionId, 80);
    if (normalizedQuestionId) {
      result[normalizedQuestionId] = true;
    }
    return result;
  }, {});
  const unexpectedQuestionIds = Object.keys(answers).filter(function (questionId) {
    return !allowedQuestionIds[cleanString(questionId, 80)];
  });

  if (unexpectedQuestionIds.length > 0) {
    writeAuditLog("submitExamAnswers", agentId, "FAILED", "Unexpected exam question submitted", {
      attempt_id: attemptId,
      question_count: unexpectedQuestionIds.length
    });
    return {
      ok: false,
      message: "Submitted answers contain invalid question_id",
      code: "INVALID_QUESTION_ID"
    };
  }

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
  const agentAuth = requireExamAgentActor(params);

  if (!agentAuth.ok) {
    return agentAuth;
  }

  const agentId = agentAuth.agent_id;
  const attemptId = cleanString(params.attempt_id || "", 120);

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

  const response = {
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

  response.agent_session_token = createAgentSession(user);
  response.agent_session_expires_in = AGENT_SESSION_TTL_SECONDS;

  if (isAdminRole(user.role)) {
    response.admin_session_token = createAdminSession(user);
    response.admin_session_expires_in = ADMIN_SESSION_TTL_SECONDS;
  }

  return response;
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

function getDashboard(params) {
  ensureSalesSheets();
  const options = typeof params === "object" && params !== null
    ? params
    : { agent_id: params };
  const agentAuth = requireAgentActor(options);

  if (!agentAuth.ok) {
    return agentAuth;
  }

  const agentId = agentAuth.agent_id;
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

  const orders = sheetToObjects(SHEET_NAMES.orders)
    .filter(function (item) {
      return String(item.agent_id || item.owner_agent_id || "") === String(agentId || "");
    })
    .map(publicOrder);
  const orderSummary = summarizeOrders(orders);
  const walletResult = getWalletProjection(agentId);
  const wallet = walletResult.wallet || {};
  const commissions = sheetToObjects(SHEET_NAMES.commissions).filter(function (item) {
    return cleanString(item.agent_id, 80) === cleanString(agentId, 80);
  });
  const financeWithdrawals = sheetToObjects(SHEET_NAMES.withdrawalRequests).filter(function (item) {
    return cleanString(item.agent_id, 80) === cleanString(agentId, 80);
  });

  const legacyTotalIncome = sum(income, "net_amount");
  const ledgerAvailable = Number(wallet.available_balance || 0);
  const ledgerPending = Number(wallet.pending_balance || 0);
  const totalIncome = Number(wallet.lifetime_earned || 0) || legacyTotalIncome;
  const available = commissions.length ? ledgerAvailable : sum(
    income.filter(function (item) {
      return String(item.status || "") === "AVAILABLE";
    }),
    "net_amount"
  );
  const waiting = commissions.length ? ledgerPending : sum(
    income.filter(function (item) {
      return String(item.status || "") === "WAIT_7_DAYS";
    }),
    "net_amount"
  );
  const withdrawn = financeWithdrawals.length ? Number(wallet.lifetime_withdrawn || 0) : sum(
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
  const commission = commissions.length ? totalIncome : sum(income, "amount");
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
      net: net,
      orders: orderSummary.total,
      depositPending: orderSummary.depositPending,
      depositApproved: orderSummary.depositApproved,
      paid: orderSummary.paid,
      completed: orderSummary.completed,
      cancelled: orderSummary.cancelled
      ,
      commissionPending: Number(wallet.pending_balance || 0),
      availableWallet: Number(wallet.available_balance || 0),
      reservedWithdrawal: Number(wallet.reserved_balance || 0),
      heldCommission: Number(wallet.held_balance || 0),
      lifetimeEarned: Number(wallet.lifetime_earned || 0),
      lifetimeWithdrawn: Number(wallet.lifetime_withdrawn || 0),
      latestCommission: commissions.length ? publicCommission(commissions[commissions.length - 1]) : null,
      latestWithdrawal: financeWithdrawals.length ? publicWithdrawal(financeWithdrawals[financeWithdrawals.length - 1]) : null
    },
    income: income,
    withdraws: withdraws,
    commissions: commissions.map(publicCommission),
    wallet: publicWallet(wallet),
    finance_withdrawals: financeWithdrawals.map(publicWithdrawal),
    bonus: bonus,
    orders: orders
  };
}

function summarizeOrders(orders) {
  const list = orders || [];
  return {
    total: list.length,
    depositPending: list.filter(function (order) {
      return [ORDER_STATUS.PAYMENT_PENDING, ORDER_STATUS.PAYMENT_REVIEW].indexOf(normalizeSalesStatus(order.status)) !== -1;
    }).length,
    depositApproved: list.filter(function (order) {
      return normalizeSalesStatus(order.status) === ORDER_STATUS.DEPOSIT_PAID;
    }).length,
    paid: list.filter(function (order) {
      return [ORDER_STATUS.PAID, ORDER_STATUS.PAID_IN_FULL].indexOf(normalizeSalesStatus(order.status)) !== -1;
    }).length,
    completed: list.filter(function (order) {
      return normalizeSalesStatus(order.status) === ORDER_STATUS.COMPLETED;
    }).length,
    cancelled: list.filter(function (order) {
      return normalizeSalesStatus(order.status) === ORDER_STATUS.CANCELLED;
    }).length
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
  const admin = requireAdminActor(params);
  if (!admin.ok) return admin;

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
  const admin = requireAdminActor(params);
  if (!admin.ok) return admin;

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
   SALES OPERATING SYSTEM V3-1
========================================================= */

function ensureSalesSheets() {
  getOrCreateSheet(SHEET_NAMES.customers, CUSTOMER_HEADERS);
  getOrCreateSheet(SHEET_NAMES.quotations, QUOTATION_HEADERS);
  getOrCreateSheet(SHEET_NAMES.orders, ORDER_HEADERS);
  getOrCreateSheet(SHEET_NAMES.orderStatusLogs, ORDER_STATUS_LOG_HEADERS);
  getOrCreateSheet(SHEET_NAMES.products, PRODUCT_HEADERS);
  getOrCreateSheet(SHEET_NAMES.productPricing, PRODUCT_PRICING_HEADERS);
  getOrCreateSheet(SHEET_NAMES.depositPolicies, DEPOSIT_POLICY_HEADERS);
  getOrCreateSheet(SHEET_NAMES.payments, PAYMENT_HEADERS);
  getOrCreateSheet(SHEET_NAMES.auditLogs, AUDIT_LOG_HEADERS);
  ensureFinanceSheets();
  seedV3ProductCatalog();
  seedDepositPolicy();
}

function ensureFinanceSheets() {
  getOrCreateSheet(SHEET_NAMES.commissionRules, COMMISSION_RULE_HEADERS);
  getOrCreateSheet(SHEET_NAMES.commissions, COMMISSION_HEADERS);
  getOrCreateSheet(SHEET_NAMES.walletAccounts, WALLET_ACCOUNT_HEADERS);
  getOrCreateSheet(SHEET_NAMES.walletLedger, WALLET_LEDGER_HEADERS);
  getOrCreateSheet(SHEET_NAMES.withdrawalRequests, WITHDRAWAL_REQUEST_HEADERS);
  getOrCreateSheet(SHEET_NAMES.financeAuditLogs, FINANCE_AUDIT_LOG_HEADERS);
  seedCommissionRulePlaceholders();
}

function seedCommissionRulePlaceholders() {
  const products = sheetToObjects(SHEET_NAMES.products);
  const existing = sheetToObjects(SHEET_NAMES.commissionRules);
  const now = new Date();

  products.forEach(function (product) {
    const productId = cleanString(product.product_id, 80);
    const exists = existing.some(function (rule) {
      return cleanString(rule.product_id, 80) === productId;
    });

    if (!productId || exists) return;

    appendObject(SHEET_NAMES.commissionRules, {
      rule_id: makeId("CMR"),
      product_id: productId,
      collection: cleanString(product.collection, 180),
      commission_type: "FIXED",
      commission_value: 0,
      commissionable_base: "GRAND_TOTAL",
      deposit_release_percent: 0,
      final_release_percent: 100,
      status: "CONFIG_REQUIRED",
      effective_from: now,
      effective_to: "",
      created_at: now,
      updated_at: now,
      created_by: "SYSTEM",
      updated_by: "SYSTEM",
      note: "Set commission rule before financial release."
    });
  });
}

function normalizeSalesStatus(status) {
  return cleanString(status, 60).toUpperCase();
}

function findApprovedAgent(agentId) {
  const normalizedId = validateAgentId(agentId);

  if (!normalizedId) {
    return {
      ok: false,
      message: "Invalid agent_id"
    };
  }

  const agent = findAgent(normalizedId);

  if (!agent) {
    return {
      ok: false,
      message: "Agent not found"
    };
  }

  if (normalizeStatus(agent.status) !== AGENT_STATUS.APPROVED) {
    return {
      ok: false,
      message: "Agent is not approved for sales actions",
      status: normalizeStatus(agent.status),
      next_page: getNextPageByStatus(agent.status)
    };
  }

  return {
    ok: true,
    agent: agent
  };
}

function createAgentSession(user) {
  const token = "AGT-" + Utilities.getUuid();
  const tokenHash = hashSessionToken(token);
  const payload = {
    agent_id: cleanString(user.agent_id, 80),
    status: normalizeStatus(user.status),
    created_at: new Date().toISOString()
  };

  CacheService
    .getScriptCache()
    .put("agent_session:" + tokenHash, JSON.stringify(payload), AGENT_SESSION_TTL_SECONDS);

  return token;
}

function hashSessionToken(token) {
  const digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    cleanString(token, 240),
    Utilities.Charset.UTF_8
  );
  return Utilities.base64EncodeWebSafe(digest).replace(/=+$/g, "");
}

function verifyAgentSession(body) {
  const token = cleanString(
    body && (body.agent_session_token || body.agentToken || body.session_token || body.token),
    200
  );
  const agentId = cleanString(body && (body.agent_id || body.agentId), 80);

  if (!token || !agentId) {
    return {
      ok: false,
      message: "Agent session required"
    };
  }

  const raw = CacheService.getScriptCache().get("agent_session:" + hashSessionToken(token));

  if (!raw) {
    return {
      ok: false,
      message: "Agent session expired or invalid",
      next_page: "agent-login.html"
    };
  }

  const session = parseJsonValue(raw, {});

  if (cleanString(session.agent_id, 80) !== agentId) {
    return {
      ok: false,
      message: "Agent session mismatch"
    };
  }

  const agent = findAgent(agentId);

  if (!agent) {
    return {
      ok: false,
      message: "Agent not found"
    };
  }

  const currentStatus = normalizeStatus(agent.status);

  if (currentStatus === AGENT_STATUS.REJECTED || currentStatus === AGENT_STATUS.SUSPENDED) {
    return {
      ok: false,
      message: "Agent session expired or invalid",
      status: currentStatus,
      next_page: "agent-login.html"
    };
  }

  return {
    ok: true,
    agent_id: cleanString(agent.agent_id, 80),
    status: currentStatus,
    agent: agent
  };
}

function logoutAgent(body) {
  const token = cleanString(
    body && (body.agent_session_token || body.agentToken || body.session_token || body.token),
    200
  );
  const agentId = cleanString(body && (body.agent_id || body.agentId), 80);

  if (!token || !agentId) {
    return {
      ok: true,
      revoked: false,
      message: "No active agent session"
    };
  }

  const session = verifyAgentSession({
    agent_id: agentId,
    agent_session_token: token
  });

  CacheService.getScriptCache().remove("agent_session:" + hashSessionToken(token));

  return {
    ok: true,
    revoked: Boolean(session.ok),
    message: "Agent session revoked"
  };
}

function requireAgentActor(body) {
  const session = verifyAgentSession(body || {});

  if (!session.ok) {
    return {
      ok: false,
      message: session.message,
      next_page: session.next_page
    };
  }

  return session;
}

function requireExamAgentActor(body) {
  const session = requireAgentActor(body || {});

  if (!session.ok) {
    return session;
  }

  const requestedAgentId = validateAgentId(body && body.agent_id);

  if (requestedAgentId && requestedAgentId !== session.agent_id) {
    return {
      ok: false,
      message: "Agent session mismatch"
    };
  }

  return session;
}

function isAdminRole(role) {
  const normalizedRole = cleanString(role, 40).toUpperCase();
  return normalizedRole === "ADMIN" || normalizedRole === "OWNER";
}

function createAdminSession(user) {
  const token = "ADM-" + Utilities.getUuid();
  const tokenHash = hashSessionToken(token);
  const payload = {
    agent_id: cleanString(user.agent_id, 80),
    role: cleanString(user.role, 40),
    created_at: new Date().toISOString()
  };

  CacheService
    .getScriptCache()
    .put("admin_session:" + tokenHash, JSON.stringify(payload), ADMIN_SESSION_TTL_SECONDS);

  return token;
}

function verifyAdminSession(body) {
  const token = cleanString(
    body && (body.admin_session_token || body.adminToken || body.session_token || body.token),
    200
  );
  const adminId = cleanString(body && (body.admin_id || body.actor_id || body.actorId), 80);

  if (!token || !adminId) {
    return {
      ok: false,
      message: "Admin session required"
    };
  }

  const raw = CacheService.getScriptCache().get("admin_session:" + hashSessionToken(token));

  if (!raw) {
    return {
      ok: false,
      message: "Admin session expired or invalid"
    };
  }

  const session = parseJsonValue(raw, {});

  if (cleanString(session.agent_id, 80) !== adminId) {
    return {
      ok: false,
      message: "Admin session mismatch"
    };
  }

  const user = findAgent(adminId);

  if (!user || !isAdminRole(user.role)) {
    return {
      ok: false,
      message: "Admin permission required"
    };
  }

  return {
    ok: true,
    actor_id: cleanString(user.agent_id, 80),
    role: cleanString(user.role, 40),
    user: user
  };
}

function logoutAdmin(body) {
  const token = cleanString(
    body && (body.admin_session_token || body.adminToken || body.session_token || body.token),
    200
  );
  const adminId = cleanString(body && (body.admin_id || body.actor_id || body.actorId), 80);

  if (!token || !adminId) {
    return {
      ok: true,
      revoked: false,
      message: "No active admin session"
    };
  }

  const session = verifyAdminSession({
    admin_id: adminId,
    admin_session_token: token
  });

  CacheService.getScriptCache().remove("admin_session:" + hashSessionToken(token));

  return {
    ok: true,
    revoked: Boolean(session.ok),
    message: "Admin session revoked"
  };
}

function requireAdminActor(body) {
  const session = verifyAdminSession(body || {});

  if (!session.ok) {
    return {
      ok: false,
      message: session.message
    };
  }

  return session;
}

function agentFullName(agent) {
  return (
    cleanString(agent.first_name, 120) +
    " " +
    cleanString(agent.last_name, 120)
  ).trim();
}

function seedV3ProductCatalog() {
  const products = sheetToObjects(SHEET_NAMES.products);
  const pricing = sheetToObjects(SHEET_NAMES.productPricing);
  const now = new Date();

  if (products.length === 0) {
    DEFAULT_PRODUCTS.forEach(function (item) {
      appendObject(SHEET_NAMES.products, {
        product_id: makeId("PRD"),
        collection: item.collection,
        brand: item.brand,
        model: item.model,
        storage: item.storage,
        color: item.color,
        sku: item.sku,
        status: "ACTIVE",
        created_at: now,
        updated_at: now
      });
    });
  }

  if (pricing.length === 0) {
    sheetToObjects(SHEET_NAMES.products).forEach(function (product) {
      const seed = DEFAULT_PRODUCTS.find(function (item) {
        return cleanString(item.sku, 120) === cleanString(product.sku, 120);
      });

      appendObject(SHEET_NAMES.productPricing, {
        pricing_id: makeId("PRICE"),
        product_id: product.product_id,
        sku: product.sku,
        product_price: seed ? Number(seed.product_price || 0) : 0,
        service_fee: DEFAULT_SERVICE_FEE,
        vat_rate: DEFAULT_VAT_RATE,
        promotion: "",
        discount: 0,
        status: "ACTIVE",
        effective_from: now,
        effective_to: "",
        created_at: now,
        updated_at: now
      });
    });
  }
}

function seedDepositPolicy() {
  if (sheetToObjects(SHEET_NAMES.depositPolicies).length > 0) {
    return;
  }

  const now = new Date();
  appendObject(SHEET_NAMES.depositPolicies, {
    policy_id: makeId("DPP"),
    enabled: true,
    deposit_percent: DEFAULT_DEPOSIT_PERCENT,
    status: "ACTIVE",
    created_at: now,
    updated_at: now
  });
}

function publicProduct(product) {
  return {
    product_id: cleanString(product.product_id, 80),
    collection: cleanString(product.collection, 180),
    brand: cleanString(product.brand, 120),
    model: cleanString(product.model, 160),
    storage: cleanString(product.storage, 80),
    color: cleanString(product.color, 120),
    sku: cleanString(product.sku, 120),
    status: normalizeSalesStatus(product.status || "ACTIVE"),
    created_at: product.created_at || "",
    updated_at: product.updated_at || ""
  };
}

function publicPricing(pricing) {
  return {
    pricing_id: cleanString(pricing.pricing_id, 80),
    product_id: cleanString(pricing.product_id, 80),
    sku: cleanString(pricing.sku, 120),
    product_price: Number(pricing.product_price || 0),
    service_fee: Number(pricing.service_fee || 0),
    vat_rate: Number(pricing.vat_rate || 0),
    promotion: cleanString(pricing.promotion, 200),
    discount: Number(pricing.discount || 0),
    status: normalizeSalesStatus(pricing.status || "ACTIVE"),
    effective_from: pricing.effective_from || "",
    effective_to: pricing.effective_to || "",
    created_at: pricing.created_at || "",
    updated_at: pricing.updated_at || ""
  };
}

function activeDepositPolicy() {
  ensureSalesSheets();
  const policies = sheetToObjects(SHEET_NAMES.depositPolicies)
    .filter(function (policy) {
      return normalizeSalesStatus(policy.status || "ACTIVE") === "ACTIVE";
    });

  return policies[policies.length - 1] || {
    policy_id: "",
    enabled: true,
    deposit_percent: DEFAULT_DEPOSIT_PERCENT,
    status: "ACTIVE"
  };
}

function publicDepositPolicy(policy) {
  const percent = Math.max(0, Math.min(100, Number(policy.deposit_percent || 0)));
  return {
    policy_id: cleanString(policy.policy_id, 80),
    enabled: booleanValue(policy.enabled),
    deposit_percent: percent,
    status: normalizeSalesStatus(policy.status || "ACTIVE"),
    created_at: policy.created_at || "",
    updated_at: policy.updated_at || ""
  };
}

function findProductById(productId) {
  const normalizedId = cleanString(productId, 80);
  if (!normalizedId) return null;
  ensureSalesSheets();
  return sheetToObjects(SHEET_NAMES.products).find(function (product) {
    return cleanString(product.product_id, 80) === normalizedId;
  }) || null;
}

function findProductForPricing(options) {
  const productId = cleanString(options && (options.product_id || options.productId), 80);
  const sku = cleanString(options && options.sku, 120).toLowerCase();
  const brand = cleanString(options && options.brand, 120).toLowerCase();
  const model = cleanString(options && options.model, 160).toLowerCase();
  const storage = cleanString(options && options.storage, 80).toLowerCase();
  const color = cleanString(options && options.color, 120).toLowerCase();

  ensureSalesSheets();
  return sheetToObjects(SHEET_NAMES.products).find(function (product) {
    if (productId && cleanString(product.product_id, 80) === productId) return true;
    if (sku && cleanString(product.sku, 120).toLowerCase() === sku) return true;
    return (
      model &&
      cleanString(product.model, 160).toLowerCase() === model &&
      (!brand || cleanString(product.brand, 120).toLowerCase() === brand) &&
      (!storage || cleanString(product.storage, 80).toLowerCase() === storage) &&
      (!color || cleanString(product.color, 120).toLowerCase() === color)
    );
  }) || null;
}

function activePricingForProduct(product) {
  if (!product) return null;
  ensureSalesSheets();
  const productId = cleanString(product.product_id, 80);
  const sku = cleanString(product.sku, 120);
  const now = new Date();

  const rows = sheetToObjects(SHEET_NAMES.productPricing)
    .filter(function (pricing) {
      if (normalizeSalesStatus(pricing.status || "ACTIVE") !== "ACTIVE") return false;
      if (
        cleanString(pricing.product_id, 80) !== productId &&
        cleanString(pricing.sku, 120) !== sku
      ) {
        return false;
      }

      const from = pricing.effective_from ? new Date(pricing.effective_from) : null;
      const to = pricing.effective_to ? new Date(pricing.effective_to) : null;
      return (!from || from <= now) && (!to || to >= now);
    });

  return rows[rows.length - 1] || null;
}

function calculateBackendPricing(options) {
  const product = findProductForPricing(options || {});

  if (!product || normalizeSalesStatus(product.status || "ACTIVE") !== "ACTIVE") {
    return {
      ok: false,
      message: "Active product not found"
    };
  }

  const pricing = activePricingForProduct(product);

  if (!pricing) {
    return {
      ok: false,
      message: "Active pricing not found",
      product: publicProduct(product)
    };
  }

  const productPrice = Math.max(0, Number(pricing.product_price || 0));
  const serviceFee = Math.max(0, Number(pricing.service_fee || DEFAULT_SERVICE_FEE));
  const discount = Math.max(0, Number(pricing.discount || 0));
  const vatRate = Math.max(0, Math.min(1, Number(pricing.vat_rate || DEFAULT_VAT_RATE)));
  const subtotal = Math.max(0, productPrice + serviceFee - discount);
  const vat = Math.max(0, subtotal * vatRate);
  const grandTotal = Math.max(0, subtotal + vat);
  const policy = publicDepositPolicy(activeDepositPolicy());
  const requestedPaymentOption = normalizeSalesStatus((options && (options.payment_option || options.paymentOption)) || "DEPOSIT");
  const paymentOption = requestedPaymentOption === "FULL" || requestedPaymentOption === "FULL_PAYMENT"
    ? "FULL"
    : (policy.enabled ? "DEPOSIT" : "FULL");
  const depositPercent = paymentOption === "DEPOSIT" && policy.enabled ? policy.deposit_percent : 100;
  const depositAmount = Math.round(grandTotal * depositPercent) / 100;
  const balanceAmount = Math.max(0, grandTotal - depositAmount);
  const lineItems = [
    {
      type: "DEVICE",
      product_id: product.product_id,
      sku: product.sku,
      name: product.model,
      description: [product.storage, product.color].filter(Boolean).join(" / "),
      quantity: 1,
      unit_price: productPrice,
      total: productPrice
    },
    {
      type: "SERVICE",
      name: "SSBMS Installation Service",
      description: "System setup and installation service",
      quantity: 1,
      unit_price: serviceFee,
      total: serviceFee
    }
  ];

  if (discount > 0) {
    lineItems.push({
      type: "DISCOUNT",
      name: pricing.promotion || "Discount",
      description: "Approved backend discount",
      quantity: 1,
      unit_price: -discount,
      total: -discount
    });
  }

  return {
    ok: true,
    product: publicProduct(product),
    pricing: publicPricing(pricing),
    policy: policy,
    quote: {
      product_price: productPrice,
      service_fee: serviceFee,
      promotion: cleanString(pricing.promotion, 200),
      discount: discount,
      subtotal: subtotal,
      vat_rate: vatRate,
      vat: vat,
      total: grandTotal,
      grand_total: grandTotal,
      payment_option: paymentOption,
      deposit_percent: depositPercent,
      deposit_amount: depositAmount,
      balance_amount: balanceAmount,
      line_items: lineItems
    }
  };
}

function listProducts(params) {
  ensureSalesSheets();
  const options = params || {};
  const query = cleanString(options.q || options.search, 200).toLowerCase();
  const status = normalizeSalesStatus(options.status || "");
  const includeInactive = booleanValue(options.include_inactive || options.includeInactive);
  if (includeInactive) {
    const admin = requireAdminActor(options);
    if (!admin.ok) return admin;
  }

  const products = sheetToObjects(SHEET_NAMES.products)
    .filter(function (product) {
      const normalizedStatus = normalizeSalesStatus(product.status || "ACTIVE");
      if (!includeInactive && normalizedStatus !== "ACTIVE") return false;
      if (status && normalizedStatus !== status) return false;
      if (!query) return true;
      return [
        product.collection,
        product.brand,
        product.model,
        product.storage,
        product.color,
        product.sku
      ].join(" ").toLowerCase().indexOf(query) !== -1;
    })
    .map(function (product) {
      const publicItem = publicProduct(product);
      const pricing = activePricingForProduct(product);
      publicItem.pricing = pricing ? publicPricing(pricing) : null;
      return publicItem;
    });

  return {
    ok: true,
    total: products.length,
    products: products
  };
}

function getProduct(params) {
  ensureSalesSheets();
  const product = findProductForPricing(params || {});
  if (!product) {
    return { ok: false, message: "Product not found" };
  }
  const pricing = activePricingForProduct(product);
  return {
    ok: true,
    product: publicProduct(product),
    pricing: pricing ? publicPricing(pricing) : null
  };
}

function createProduct(body) {
  ensureSalesSheets();
  const admin = requireAdminActor(body);
  if (!admin.ok) return admin;

  const sku = cleanString(body && body.sku, 120);
  if (!sku) return { ok: false, message: "SKU is required" };

  const duplicate = sheetToObjects(SHEET_NAMES.products).find(function (product) {
    return cleanString(product.sku, 120).toLowerCase() === sku.toLowerCase();
  });
  if (duplicate) {
    return { ok: false, message: "SKU already exists", product: publicProduct(duplicate) };
  }

  const now = new Date();
  const product = {
    product_id: makeId("PRD"),
    collection: cleanString(body.collection, 180),
    brand: cleanString(body.brand, 120),
    model: cleanString(body.model, 160),
    storage: cleanString(body.storage, 80),
    color: cleanString(body.color, 120),
    sku: sku,
    status: normalizeSalesStatus(body.status || "ACTIVE") === "INACTIVE" ? "INACTIVE" : "ACTIVE",
    created_at: now,
    updated_at: now
  };

  if (!product.collection || !product.brand || !product.model || !product.storage || !product.color) {
    return { ok: false, message: "Product information is incomplete" };
  }

  appendObject(SHEET_NAMES.products, product);
  writeAuditLog("createProduct", "", "SUCCESS", "Product created", {
    actor_id: admin.actor_id,
    product_id: product.product_id,
    sku: product.sku
  });

  return { ok: true, product: publicProduct(product) };
}

function updateProduct(body) {
  ensureSalesSheets();
  const admin = requireAdminActor(body);
  if (!admin.ok) return admin;

  const product = findProductById(body && body.product_id);
  if (!product) return { ok: false, message: "Product not found" };

  const updates = {
    collection: cleanString(body.collection || product.collection, 180),
    brand: cleanString(body.brand || product.brand, 120),
    model: cleanString(body.model || product.model, 160),
    storage: cleanString(body.storage || product.storage, 80),
    color: cleanString(body.color || product.color, 120),
    sku: cleanString(body.sku || product.sku, 120),
    status: normalizeSalesStatus(body.status || product.status || "ACTIVE") === "INACTIVE" ? "INACTIVE" : "ACTIVE",
    updated_at: new Date()
  };

  updateRowFields(SHEET_NAMES.products, product._row, updates);
  writeAuditLog("updateProduct", "", "SUCCESS", "Product updated", {
    actor_id: admin.actor_id,
    product_id: product.product_id
  });

  return { ok: true, product: publicProduct(Object.assign({}, product, updates)) };
}

function deleteProduct(body) {
  body = body || {};
  body.status = "INACTIVE";
  const result = updateProduct(body);
  if (result.ok) {
    result.message = "Product deactivated";
  }
  return result;
}

function listPricing(params) {
  ensureSalesSheets();
  const admin = requireAdminActor(params || {});
  if (!admin.ok) return admin;

  return {
    ok: true,
    total: sheetToObjects(SHEET_NAMES.productPricing).length,
    pricing: sheetToObjects(SHEET_NAMES.productPricing).map(publicPricing)
  };
}

function upsertPricing(body) {
  ensureSalesSheets();
  const admin = requireAdminActor(body);
  if (!admin.ok) return admin;

  const product = findProductForPricing(body || {});
  if (!product) return { ok: false, message: "Product not found for pricing" };
  const productPrice = Number(body.product_price || body.productPrice || 0);
  const serviceFee = Number(body.service_fee || body.serviceFee || DEFAULT_SERVICE_FEE);
  const vatRate = Number(body.vat_rate || body.vatRate || DEFAULT_VAT_RATE);
  const discount = Number(body.discount || 0);

  if (productPrice < 0 || serviceFee < 0 || discount < 0 || vatRate < 0 || vatRate > 1) {
    return {
      ok: false,
      message: "Invalid pricing values"
    };
  }

  const existingId = cleanString(body.pricing_id || body.pricingId, 80);
  const existing = existingId
    ? sheetToObjects(SHEET_NAMES.productPricing).find(function (item) {
        return cleanString(item.pricing_id, 80) === existingId;
      })
    : null;
  const now = new Date();
  const data = {
    pricing_id: existing ? existing.pricing_id : makeId("PRICE"),
    product_id: product.product_id,
    sku: product.sku,
    product_price: productPrice,
    service_fee: serviceFee,
    vat_rate: vatRate,
    promotion: cleanString(body.promotion, 200),
    discount: discount,
    status: normalizeSalesStatus(body.status || "ACTIVE") === "INACTIVE" ? "INACTIVE" : "ACTIVE",
    effective_from: body.effective_from || body.effectiveFrom || now,
    effective_to: body.effective_to || body.effectiveTo || "",
    created_at: existing ? existing.created_at : now,
    updated_at: now
  };

  if (existing) {
    updateRowFields(SHEET_NAMES.productPricing, existing._row, data);
  } else {
    appendObject(SHEET_NAMES.productPricing, data);
  }

  writeAuditLog("upsertPricing", "", "SUCCESS", "Pricing updated", {
    actor_id: admin.actor_id,
    product_id: product.product_id,
    pricing_id: data.pricing_id
  });

  return { ok: true, pricing: publicPricing(data) };
}

function getDepositPolicy(params) {
  return {
    ok: true,
    policy: publicDepositPolicy(activeDepositPolicy())
  };
}

function updateDepositPolicy(body) {
  ensureSalesSheets();
  const admin = requireAdminActor(body);
  if (!admin.ok) return admin;

  const current = activeDepositPolicy();
  const now = new Date();
  const percent = Number(body.deposit_percent || body.depositPercent || 0);

  if (percent < 0 || percent > 100) {
    return {
      ok: false,
      message: "Deposit percent must be between 0 and 100"
    };
  }
  const updates = {
    enabled: booleanValue(body.enabled),
    deposit_percent: percent,
    status: "ACTIVE",
    updated_at: now
  };

  if (current && current._row) {
    updateRowFields(SHEET_NAMES.depositPolicies, current._row, updates);
    Object.assign(current, updates);
  } else {
    current.policy_id = makeId("DPP");
    Object.assign(current, updates, { created_at: now });
    appendObject(SHEET_NAMES.depositPolicies, current);
  }

  writeAuditLog("updateDepositPolicy", "", "SUCCESS", "Deposit policy updated", {
    actor_id: admin.actor_id,
    enabled: updates.enabled,
    deposit_percent: updates.deposit_percent
  });

  return { ok: true, policy: publicDepositPolicy(current) };
}

function calculatePricing(params) {
  const result = calculateBackendPricing(params || {});
  if (!result.ok) return result;
  return result;
}

function publicCustomer(customer) {
  return {
    customer_id: cleanString(customer.customer_id, 80),
    owner_agent_id: cleanString(customer.owner_agent_id, 80),
    team_leader_id: cleanString(customer.team_leader_id, 80),
    team_leader_name: cleanString(customer.team_leader_name, 160),
    name: cleanString(customer.customer_name, 200),
    customer_name: cleanString(customer.customer_name, 200),
    phone: cleanString(customer.phone, 80),
    email: cleanString(customer.email, 180),
    line_id: cleanString(customer.line_id, 120),
    tax_id: cleanString(customer.tax_id, 80),
    address: cleanString(customer.address, 500),
    status: cleanString(customer.status || "ACTIVE", 40),
    created_at: customer.created_at || "",
    updated_at: customer.updated_at || ""
  };
}

function publicQuotation(quotation) {
  return {
    quotation_id: cleanString(quotation.quotation_id, 80),
    quoteId: cleanString(quotation.quotation_id, 80),
    customer_id: cleanString(quotation.customer_id, 80),
    owner_agent_id: cleanString(quotation.owner_agent_id || quotation.agent_id, 80),
    agent_id: cleanString(quotation.agent_id || quotation.owner_agent_id, 80),
    owner_agent_name: cleanString(quotation.owner_agent_name, 200),
    agentName: cleanString(quotation.owner_agent_name, 200),
    team_leader_id: cleanString(quotation.team_leader_id, 80),
    team_leader_name: cleanString(quotation.team_leader_name, 160),
    status: normalizeSalesStatus(quotation.status || QUOTATION_STATUS.DRAFT),
    product_id: cleanString(quotation.product_id, 80),
    productId: cleanString(quotation.product_id, 80),
    sku: cleanString(quotation.sku, 120),
    collection: cleanString(quotation.collection, 180),
    brand: cleanString(quotation.brand, 120),
    series: cleanString(quotation.series, 160),
    model: cleanString(quotation.model, 160),
    storage: cleanString(quotation.storage, 80),
    color: cleanString(quotation.color, 120),
    price_date: cleanString(quotation.price_date, 80),
    phone_price: Number(quotation.phone_price || 0),
    phonePrice: Number(quotation.phone_price || 0),
    service_fee: Number(quotation.service_fee || 0),
    serviceFee: Number(quotation.service_fee || 0),
    promotion: cleanString(quotation.promotion, 200),
    discount: Number(quotation.discount || 0),
    subtotal: Number(quotation.subtotal || 0),
    vat_rate: Number(quotation.vat_rate || 0),
    vat: Number(quotation.vat || 0),
    total: Number(quotation.total || quotation.grand_total || 0),
    grand_total: Number(quotation.grand_total || quotation.total || 0),
    grandTotal: Number(quotation.grand_total || quotation.total || 0),
    payment_option: cleanString(quotation.payment_option, 40),
    deposit_percent: Number(quotation.deposit_percent || 0),
    deposit_amount: Number(quotation.deposit_amount || 0),
    balance_amount: Number(quotation.balance_amount || 0),
    line_items: parseJsonValue(quotation.line_items_json, []),
    customer: parseJsonValue(quotation.customer_json, {}),
    signer_name: cleanString(quotation.signer_name, 200),
    signerName: cleanString(quotation.signer_name, 200),
    signature_data_url: cleanString(quotation.signature_data_url, 120000),
    signature: cleanString(quotation.signature_data_url, 120000),
    order_id: cleanString(quotation.order_id, 80),
    orderId: cleanString(quotation.order_id, 80),
    rejected_reason: cleanString(quotation.rejected_reason, 500),
    created_at: quotation.created_at || "",
    createdAt: quotation.created_at || "",
    updated_at: quotation.updated_at || "",
    submitted_at: quotation.submitted_at || "",
    signedAt: quotation.submitted_at || "",
    approved_at: quotation.approved_at || "",
    rejected_at: quotation.rejected_at || ""
  };
}

function publicOrder(order) {
  return {
    order_id: cleanString(order.order_id, 80),
    orderId: cleanString(order.order_id, 80),
    quotation_id: cleanString(order.quotation_id, 80),
    quoteId: cleanString(order.quotation_id, 80),
    customer_id: cleanString(order.customer_id, 80),
    owner_agent_id: cleanString(order.owner_agent_id || order.agent_id, 80),
    agent_id: cleanString(order.agent_id || order.owner_agent_id, 80),
    agentId: cleanString(order.agent_id || order.owner_agent_id, 80),
    owner_agent_name: cleanString(order.owner_agent_name, 200),
    agentName: cleanString(order.owner_agent_name, 200),
    team_leader_id: cleanString(order.team_leader_id, 80),
    team_leader_name: cleanString(order.team_leader_name, 160),
    customer_name: cleanString(order.customer_name, 200),
    customerName: cleanString(order.customer_name, 200),
    customer_phone: cleanString(order.customer_phone, 80),
    customer_email: cleanString(order.customer_email, 180),
    customer_address: cleanString(order.customer_address, 500),
    customer: {
      name: cleanString(order.customer_name, 200),
      phone: cleanString(order.customer_phone, 80),
      email: cleanString(order.customer_email, 180),
      address: cleanString(order.customer_address, 500)
    },
    status: normalizeSalesStatus(order.status || ORDER_STATUS.NEW),
    product_id: cleanString(order.product_id, 80),
    productId: cleanString(order.product_id, 80),
    sku: cleanString(order.sku, 120),
    collection: cleanString(order.collection, 180),
    brand: cleanString(order.brand, 120),
    series: cleanString(order.series, 160),
    model: cleanString(order.model, 160),
    storage: cleanString(order.storage, 80),
    color: cleanString(order.color, 120),
    subtotal: Number(order.subtotal || 0),
    vat: Number(order.vat || 0),
    total: Number(order.total || order.grand_total || 0),
    grand_total: Number(order.grand_total || order.total || 0),
    grandTotal: Number(order.grand_total || order.total || 0),
    payment_option: cleanString(order.payment_option, 40),
    deposit_percent: Number(order.deposit_percent || 0),
    deposit_amount: Number(order.deposit_amount || 0),
    balance_amount: Number(order.balance_amount || 0),
    paid_amount: Number(order.paid_amount || 0),
    payment_status: cleanString(order.payment_status || "PENDING", 80),
    payment_summary: summarizePaymentsForOrder(order.order_id),
    line_items: parseJsonValue(order.line_items_json, []),
    timeline: parseJsonValue(order.timeline_json, []),
    created_at: order.created_at || "",
    createdAt: order.created_at || "",
    updated_at: order.updated_at || "",
    updatedAt: order.updated_at || "",
    approved_at: order.approved_at || "",
    paid_at: order.paid_at || "",
    installing_at: order.installing_at || "",
    completed_at: order.completed_at || "",
    cancelled_at: order.cancelled_at || ""
  };
}

function publicPayment(payment) {
  return {
    payment_id: cleanString(payment.payment_id, 80),
    order_id: cleanString(payment.order_id, 80),
    quotation_id: cleanString(payment.quotation_id, 80),
    customer_id: cleanString(payment.customer_id, 80),
    owner_agent_id: cleanString(payment.owner_agent_id, 80),
    team_leader_id: cleanString(payment.team_leader_id, 80),
    payment_type: normalizeSalesStatus(payment.payment_type || "DEPOSIT"),
    amount: Number(payment.amount || 0),
    status: normalizeSalesStatus(payment.status || "SUBMITTED"),
    method: cleanString(payment.method, 120),
    reference: cleanString(payment.reference, 180),
    note: cleanString(payment.note, 500),
    submitted_at: payment.submitted_at || "",
    reviewed_at: payment.reviewed_at || "",
    reviewed_by: cleanString(payment.reviewed_by, 80),
    created_at: payment.created_at || "",
    updated_at: payment.updated_at || ""
  };
}

function paymentsForOrder(orderId) {
  ensureSalesSheets();
  const normalizedId = cleanString(orderId, 80);
  if (!normalizedId) return [];
  return sheetToObjects(SHEET_NAMES.payments).filter(function (payment) {
    return cleanString(payment.order_id, 80) === normalizedId;
  });
}

function summarizePaymentsForOrder(orderId) {
  const payments = paymentsForOrder(orderId);
  const approved = payments.filter(function (payment) {
    return normalizeSalesStatus(payment.status || "") === "APPROVED";
  });
  const submitted = payments.filter(function (payment) {
    return normalizeSalesStatus(payment.status || "") === "SUBMITTED";
  });

  return {
    total_payments: payments.length,
    approved_amount: sum(approved, "amount"),
    submitted_amount: sum(submitted, "amount"),
    latest_status: payments.length ? normalizeSalesStatus(payments[payments.length - 1].status || "") : "NONE"
  };
}

function findCustomerById(customerId) {
  ensureSalesSheets();
  const normalizedId = cleanString(customerId, 80);

  return sheetToObjects(SHEET_NAMES.customers).find(function (customer) {
    return cleanString(customer.customer_id, 80) === normalizedId;
  }) || null;
}

function findQuotationById(quotationId) {
  ensureSalesSheets();
  const normalizedId = cleanString(quotationId, 80);

  return sheetToObjects(SHEET_NAMES.quotations).find(function (quotation) {
    return cleanString(quotation.quotation_id, 80) === normalizedId;
  }) || null;
}

function findOrderById(orderId) {
  ensureSalesSheets();
  const normalizedId = cleanString(orderId, 80);

  return sheetToObjects(SHEET_NAMES.orders).find(function (order) {
    return cleanString(order.order_id, 80) === normalizedId;
  }) || null;
}

function findDuplicateCustomer(agentId, phone, email) {
  const normalizedPhone = cleanString(phone, 80).toLowerCase();
  const normalizedEmail = cleanString(email, 180).toLowerCase();

  if (!normalizedPhone && !normalizedEmail) {
    return null;
  }

  return sheetToObjects(SHEET_NAMES.customers).find(function (customer) {
    if (cleanString(customer.owner_agent_id, 80) !== agentId) {
      return false;
    }

    const phoneMatches =
      normalizedPhone &&
      cleanString(customer.phone, 80).toLowerCase() === normalizedPhone;
    const emailMatches =
      normalizedEmail &&
      cleanString(customer.email, 180).toLowerCase() === normalizedEmail;

    return phoneMatches || emailMatches;
  }) || null;
}

function createCustomer(body) {
  ensureSalesSheets();
  const agentAuth = requireAgentActor(body || {});
  if (!agentAuth.ok) return agentAuth;

  const agentResult = findApprovedAgent(agentAuth.agent_id);

  if (!agentResult.ok) {
    return agentResult;
  }

  const agent = agentResult.agent;
  const agentId = cleanString(agent.agent_id, 80);
  const name = cleanString(body.customer_name || body.name, 200);
  const phone = cleanString(body.phone, 80);
  const email = cleanString(body.email, 180);

  if (!name) {
    return {
      ok: false,
      message: "Customer name is required"
    };
  }

  const duplicate = findDuplicateCustomer(agentId, phone, email);

  if (duplicate) {
    return {
      ok: false,
      message: "Customer already exists for this agent",
      code: "DUPLICATE_CUSTOMER",
      customer: publicCustomer(duplicate)
    };
  }

  const now = new Date();
  const customer = {
    customer_id: makeId("CUS"),
    owner_agent_id: agentId,
    team_leader_id: cleanString(agent.team_manager, 80),
    team_leader_name: cleanString(agent.team_manager, 160),
    customer_name: name,
    phone: phone,
    email: email,
    line_id: cleanString(body.line_id || body.lineId, 120),
    tax_id: cleanString(body.tax_id || body.taxId, 80),
    address: cleanString(body.address, 500),
    status: "ACTIVE",
    created_at: now,
    updated_at: now
  };

  appendObject(SHEET_NAMES.customers, customer);
  writeAuditLog("createCustomer", agentId, "SUCCESS", "Customer created", {
    actor_id: agentId,
    customer_id: customer.customer_id
  });

  return {
    ok: true,
    customer: publicCustomer(customer)
  };
}

function getCustomer(params) {
  ensureSalesSheets();
  const agentAuth = requireAgentActor(params || {});
  if (!agentAuth.ok) return agentAuth;

  const customer = findCustomerById(params && params.customer_id);

  if (!customer) {
    return {
      ok: false,
      message: "Customer not found"
    };
  }

  const requestedAgentId = agentAuth.agent_id;

  if (
    requestedAgentId &&
    cleanString(customer.owner_agent_id, 80) !== requestedAgentId
  ) {
    return {
      ok: false,
      message: "Customer access denied"
    };
  }

  return {
    ok: true,
    customer: publicCustomer(customer)
  };
}

function listCustomers(params) {
  ensureSalesSheets();
  const options = params || {};
  const agentId = validateAgentId(options.agent_id);
  const query = cleanString(options.q || options.search, 200).toLowerCase();
  const limit = Math.max(1, Math.min(500, Number(options.limit || 200)));
  const offset = Math.max(0, Number(options.offset || 0));

  if (agentId) {
    const agentAuth = requireAgentActor(options);
    if (!agentAuth.ok) return agentAuth;
    if (agentAuth.agent_id !== agentId) {
      return { ok: false, message: "Agent session mismatch" };
    }

    const agentResult = findApprovedAgent(agentId);

    if (!agentResult.ok) {
      return agentResult;
    }
  } else {
    const admin = requireAdminActor(options);
    if (!admin.ok) return admin;
  }

  const customers = sheetToObjects(SHEET_NAMES.customers)
    .filter(function (customer) {
      if (agentId && cleanString(customer.owner_agent_id, 80) !== agentId) {
        return false;
      }

      if (!query) {
        return true;
      }

      return [
        customer.customer_id,
        customer.customer_name,
        customer.phone,
        customer.email,
        customer.line_id
      ].join(" ").toLowerCase().indexOf(query) !== -1;
    })
    .map(publicCustomer);

  return {
    ok: true,
    total: customers.length,
    limit: limit,
    offset: offset,
    customers: customers.slice(offset, offset + limit)
  };
}

function getOrCreateCustomerForQuotation(body, agent) {
  const agentId = cleanString(agent.agent_id, 80);
  const providedId = cleanString(body.customer_id, 80);

  if (providedId) {
    const existing = findCustomerById(providedId);

    if (!existing) {
      return {
        ok: false,
        message: "Customer not found"
      };
    }

    if (cleanString(existing.owner_agent_id, 80) !== agentId) {
      return {
        ok: false,
        message: "Customer access denied"
      };
    }

    const updates = {
      customer_name: cleanString(body.customer_name || (body.customer && body.customer.name) || existing.customer_name, 200),
      phone: cleanString(body.customer_phone || (body.customer && body.customer.phone) || existing.phone, 80),
      email: cleanString(body.customer_email || (body.customer && body.customer.email) || existing.email, 180),
      line_id: cleanString(body.customer_line_id || (body.customer && body.customer.line_id) || existing.line_id, 120),
      tax_id: cleanString(body.customer_tax_id || (body.customer && (body.customer.tax_id || body.customer.taxId)) || existing.tax_id, 80),
      address: cleanString(body.customer_address || (body.customer && body.customer.address) || existing.address, 500),
      updated_at: new Date()
    };

    updateRowFields(SHEET_NAMES.customers, existing._row, updates);
    Object.keys(updates).forEach(function (key) {
      existing[key] = updates[key];
    });

    return {
      ok: true,
      customer: existing
    };
  }

  const name = cleanString(body.customer_name || (body.customer && body.customer.name), 200);
  const phone = cleanString(body.customer_phone || (body.customer && body.customer.phone), 80);
  const email = cleanString(body.customer_email || (body.customer && body.customer.email), 180);
  const duplicate = findDuplicateCustomer(agentId, phone, email);

  if (duplicate) {
    return {
      ok: true,
      customer: duplicate,
      reused: true
    };
  }

  const customerResult = createCustomer({
    agent_id: agentId,
    agent_session_token: body.agent_session_token || body.agentToken || body.session_token || body.token,
    customer_name: name,
    phone: phone,
    email: email,
    line_id: body.customer_line_id || (body.customer && body.customer.line_id),
    tax_id: body.customer_tax_id || (body.customer && (body.customer.tax_id || body.customer.taxId)),
    address: body.customer_address || (body.customer && body.customer.address)
  });

  if (!customerResult.ok) {
    return customerResult;
  }

  return {
    ok: true,
    customer: findCustomerById(customerResult.customer.customer_id)
  };
}

function buildQuotationLineItems(body) {
  const lineItems = body.line_items && body.line_items.length
    ? body.line_items
    : [
        {
          type: "DEVICE",
          name: cleanString(body.model, 160),
          description: [
            cleanString(body.storage, 80),
            cleanString(body.color, 120)
          ].filter(Boolean).join(" / "),
          quantity: 1,
          unit_price: Number(body.phone_price || body.phonePrice || 0),
          total: Number(body.phone_price || body.phonePrice || 0)
        },
        {
          type: "SERVICE",
          name: "SSBMS Installation Service",
          description: "System setup and installation service",
          quantity: 1,
          unit_price: Number(body.service_fee || body.serviceFee || 45000),
          total: Number(body.service_fee || body.serviceFee || 45000)
        }
      ];

  return lineItems.map(function (item) {
    const quantity = Math.max(1, Number(item.quantity || 1));
    const unitPrice = Math.max(0, Number(item.unit_price || item.unitPrice || 0));

    return {
      type: cleanString(item.type, 80),
      name: cleanString(item.name, 200),
      description: cleanString(item.description, 500),
      quantity: quantity,
      unit_price: unitPrice,
      total: Math.max(0, Number(item.total || quantity * unitPrice))
    };
  });
}

function buildQuotationData(body, agent, customer, existing) {
  const now = new Date();
  const pricingResult = calculateBackendPricing(body || {});

  if (!pricingResult.ok) {
    throw new Error(pricingResult.message || "Pricing calculation failed");
  }

  const product = pricingResult.product;
  const quote = pricingResult.quote;
  const lineItems = quote.line_items;
  const subtotal = quote.subtotal;
  const vatRate = quote.vat_rate;
  const vat = quote.vat;
  const total = quote.grand_total;
  const requestedStatus = normalizeSalesStatus(body.status || (body.submit ? QUOTATION_STATUS.SUBMITTED : QUOTATION_STATUS.DRAFT));
  const status = requestedStatus === QUOTATION_STATUS.SUBMITTED
    ? QUOTATION_STATUS.SUBMITTED
    : QUOTATION_STATUS.DRAFT;
  const customerPayload = {
    name: cleanString(body.customer_name || (body.customer && body.customer.name) || customer.customer_name, 200),
    phone: cleanString(body.customer_phone || (body.customer && body.customer.phone) || customer.phone, 80),
    email: cleanString(body.customer_email || (body.customer && body.customer.email) || customer.email, 180),
    tax_id: cleanString(body.customer_tax_id || (body.customer && (body.customer.tax_id || body.customer.taxId)) || customer.tax_id, 80),
    address: cleanString(body.customer_address || (body.customer && body.customer.address) || customer.address, 500)
  };

  return {
    quotation_id: existing ? existing.quotation_id : makeId("QT"),
    customer_id: customer.customer_id,
    owner_agent_id: agent.agent_id,
    agent_id: agent.agent_id,
    owner_agent_name: agentFullName(agent) || cleanString(body.agent_name || body.agentName, 200),
    team_leader_id: cleanString(agent.team_manager, 80),
    team_leader_name: cleanString(agent.team_manager, 160),
    status: status,
    product_id: cleanString(product.product_id, 80),
    sku: cleanString(product.sku, 120),
    collection: cleanString(product.collection, 180),
    brand: cleanString(product.brand, 120),
    series: cleanString(body.series || product.collection, 160),
    model: cleanString(product.model, 160),
    storage: cleanString(product.storage, 80),
    color: cleanString(product.color, 120),
    price_date: cleanString(body.price_date || body.priceDate, 80),
    phone_price: Number(quote.product_price || 0),
    service_fee: Number(quote.service_fee || 0),
    promotion: cleanString(quote.promotion, 200),
    discount: Number(quote.discount || 0),
    subtotal: subtotal,
    vat_rate: vatRate,
    vat: vat,
    total: total,
    grand_total: total,
    payment_option: cleanString(quote.payment_option, 40),
    deposit_percent: Number(quote.deposit_percent || 0),
    deposit_amount: Number(quote.deposit_amount || 0),
    balance_amount: Number(quote.balance_amount || 0),
    line_items_json: JSON.stringify(lineItems),
    customer_json: JSON.stringify(customerPayload),
    signer_name: cleanString(body.signer_name || body.signerName, 200),
    signature_data_url: cleanString(body.signature_data_url || body.signature, 120000),
    user_agent: cleanString(body.user_agent || body.userAgent, 500),
    order_id: existing ? cleanString(existing.order_id, 80) : "",
    rejected_reason: "",
    created_at: existing ? existing.created_at : now,
    updated_at: now,
    submitted_at: status === QUOTATION_STATUS.SUBMITTED
      ? (existing && existing.submitted_at ? existing.submitted_at : now)
      : (existing ? existing.submitted_at : ""),
    approved_at: existing ? existing.approved_at : "",
    rejected_at: ""
  };
}

function createQuotation(body) {
  ensureSalesSheets();
  const agentAuth = requireAgentActor(body || {});
  if (!agentAuth.ok) return agentAuth;
  if (validateAgentId(body && body.agent_id) !== agentAuth.agent_id) {
    return { ok: false, message: "Agent session mismatch" };
  }

  const agentResult = findApprovedAgent(agentAuth.agent_id);

  if (!agentResult.ok) {
    return agentResult;
  }

  const agent = agentResult.agent;
  const existingId = cleanString(body.quotation_id || body.quoteId, 80);
  const existing = existingId ? findQuotationById(existingId) : null;

  if (existingId && !existing) {
    return {
      ok: false,
      message: "Quotation not found"
    };
  }

  if (
    existing &&
    cleanString(existing.owner_agent_id || existing.agent_id, 80) !== cleanString(agent.agent_id, 80)
  ) {
    return {
      ok: false,
      message: "Quotation access denied"
    };
  }

  if (
    existing &&
    [
      QUOTATION_STATUS.SUBMITTED,
      QUOTATION_STATUS.APPROVED,
      QUOTATION_STATUS.CONVERTED,
      QUOTATION_STATUS.REJECTED
    ].indexOf(normalizeSalesStatus(existing.status)) !== -1
  ) {
    return {
      ok: false,
      message: "Quotation cannot be changed after submission",
      status: normalizeSalesStatus(existing.status)
    };
  }

  if (
    !cleanString(body.product_id || body.productId || body.sku || body.model, 160) &&
    !existing
  ) {
    return {
      ok: false,
      message: "Quotation product model is required"
    };
  }

  const pricingPreflight = calculateBackendPricing(body || {});

  if (!pricingPreflight.ok) {
    return {
      ok: false,
      message: pricingPreflight.message || "Pricing calculation failed"
    };
  }

  const customerResult = getOrCreateCustomerForQuotation(body, agent);

  if (!customerResult.ok) {
    return customerResult;
  }

  const quotation = buildQuotationData(body, agent, customerResult.customer, existing);

  if (existing) {
    updateRowFields(SHEET_NAMES.quotations, existing._row, quotation);
  } else {
    appendObject(SHEET_NAMES.quotations, quotation);
  }

  writeAuditLog("createQuotation", agent.agent_id, "SUCCESS", "Quotation saved", {
    actor_id: agent.agent_id,
    customer_id: quotation.customer_id,
    quotation_id: quotation.quotation_id,
    status: quotation.status
  });

  return {
    ok: true,
    quotation: publicQuotation(quotation),
    customer: publicCustomer(customerResult.customer),
    reused_customer: Boolean(customerResult.reused)
  };
}

function getQuotation(params) {
  ensureSalesSheets();
  const agentAuth = requireAgentActor(params || {});
  if (!agentAuth.ok) return agentAuth;

  const quotation = findQuotationById(params && (params.quotation_id || params.quoteId));

  if (!quotation) {
    return {
      ok: false,
      message: "Quotation not found"
    };
  }

  const agentId = agentAuth.agent_id;

  if (
    agentId &&
    cleanString(quotation.owner_agent_id || quotation.agent_id, 80) !== agentId
  ) {
    return {
      ok: false,
      message: "Quotation access denied"
    };
  }

  return {
    ok: true,
    quotation: publicQuotation(quotation)
  };
}

function listQuotations(params) {
  ensureSalesSheets();
  const options = params || {};
  const agentId = validateAgentId(options.agent_id);
  const status = normalizeSalesStatus(options.status || "");
  const query = cleanString(options.q || options.search, 200).toLowerCase();
  const limit = Math.max(1, Math.min(500, Number(options.limit || 200)));
  const offset = Math.max(0, Number(options.offset || 0));

  if (agentId) {
    const agentAuth = requireAgentActor(options);
    if (!agentAuth.ok) return agentAuth;
    if (agentAuth.agent_id !== agentId) {
      return { ok: false, message: "Agent session mismatch" };
    }

    const agentResult = findApprovedAgent(agentId);

    if (!agentResult.ok) {
      return agentResult;
    }
  } else {
    const admin = requireAdminActor(options);
    if (!admin.ok) return admin;
  }

  const quotations = sheetToObjects(SHEET_NAMES.quotations)
    .filter(function (quotation) {
      if (agentId && cleanString(quotation.owner_agent_id || quotation.agent_id, 80) !== agentId) {
        return false;
      }

      if (status && normalizeSalesStatus(quotation.status) !== status) {
        return false;
      }

      if (!query) {
        return true;
      }

      return [
        quotation.quotation_id,
        quotation.customer_json,
        quotation.owner_agent_name,
        quotation.model,
        quotation.storage,
        quotation.color
      ].join(" ").toLowerCase().indexOf(query) !== -1;
    })
    .map(publicQuotation);

  return {
    ok: true,
    total: quotations.length,
    limit: limit,
    offset: offset,
    quotations: quotations.slice(offset, offset + limit)
  };
}

function approveQuotation(body) {
  ensureSalesSheets();
  const admin = requireAdminActor(body);
  if (!admin.ok) return admin;

  const quotation = findQuotationById(body && (body.quotation_id || body.quoteId));

  if (!quotation) {
    return {
      ok: false,
      message: "Quotation not found"
    };
  }

  const status = normalizeSalesStatus(quotation.status);

  if (status !== QUOTATION_STATUS.SUBMITTED && status !== "CUSTOMER_SIGNED") {
    return {
      ok: false,
      message: "Only submitted quotations can be approved",
      status: status
    };
  }

  const updates = {
    status: QUOTATION_STATUS.APPROVED,
    approved_at: new Date(),
    rejected_at: "",
    rejected_reason: "",
    updated_at: new Date()
  };

  updateRowFields(SHEET_NAMES.quotations, quotation._row, updates);
  writeAuditLog("approveQuotation", quotation.owner_agent_id || quotation.agent_id, "SUCCESS", "Quotation approved", {
    actor_id: admin.actor_id,
    quotation_id: quotation.quotation_id
  });

  const updated = findQuotationById(quotation.quotation_id);

  return {
    ok: true,
    quotation: publicQuotation(updated || quotation)
  };
}

function rejectQuotation(body) {
  ensureSalesSheets();
  const admin = requireAdminActor(body);
  if (!admin.ok) return admin;

  const quotation = findQuotationById(body && (body.quotation_id || body.quoteId));

  if (!quotation) {
    return {
      ok: false,
      message: "Quotation not found"
    };
  }

  const status = normalizeSalesStatus(quotation.status);

  if (status === QUOTATION_STATUS.CONVERTED) {
    return {
      ok: false,
      message: "Converted quotation cannot be rejected"
    };
  }

  const updates = {
    status: QUOTATION_STATUS.REJECTED,
    rejected_at: new Date(),
    rejected_reason: cleanString(body.reason || body.note, 500),
    updated_at: new Date()
  };

  updateRowFields(SHEET_NAMES.quotations, quotation._row, updates);
  writeAuditLog("rejectQuotation", quotation.owner_agent_id || quotation.agent_id, "SUCCESS", "Quotation rejected", {
    actor_id: admin.actor_id,
    quotation_id: quotation.quotation_id,
    reason: updates.rejected_reason
  });

  const updated = findQuotationById(quotation.quotation_id);

  return {
    ok: true,
    quotation: publicQuotation(updated || quotation)
  };
}

function appendOrderStatusLog(order, fromStatus, toStatus, actorId, actorRole, note) {
  const log = {
    status_log_id: makeId("OSL"),
    order_id: order.order_id,
    quotation_id: order.quotation_id,
    customer_id: order.customer_id,
    owner_agent_id: order.owner_agent_id || order.agent_id,
    from_status: cleanString(fromStatus, 80),
    to_status: cleanString(toStatus, 80),
    actor_id: cleanString(actorId, 80),
    actor_role: cleanString(actorRole || "ADMIN", 80),
    note: cleanString(note, 500),
    created_at: new Date()
  };

  appendObject(SHEET_NAMES.orderStatusLogs, log);

  return log;
}

function createOrderFromQuotation(body) {
  ensureSalesSheets();
  const admin = requireAdminActor(body);
  if (!admin.ok) return admin;

  const quotation = findQuotationById(body && (body.quotation_id || body.quoteId));

  if (!quotation) {
    return {
      ok: false,
      message: "Quotation not found"
    };
  }

  const status = normalizeSalesStatus(quotation.status);

  if (status !== QUOTATION_STATUS.APPROVED && status !== QUOTATION_STATUS.CONVERTED) {
    return {
      ok: false,
      message: "Order can be created from approved quotation only",
      status: status
    };
  }

  const existingOrder = sheetToObjects(SHEET_NAMES.orders).find(function (order) {
    return cleanString(order.quotation_id, 80) === cleanString(quotation.quotation_id, 80);
  });

  if (existingOrder) {
    return {
      ok: true,
      already_exists: true,
      order: publicOrder(existingOrder)
    };
  }

  const customer = parseJsonValue(quotation.customer_json, {});
  const now = new Date();
  const order = {
    order_id: makeId("SO"),
    quotation_id: quotation.quotation_id,
    customer_id: quotation.customer_id,
    owner_agent_id: quotation.owner_agent_id || quotation.agent_id,
    agent_id: quotation.agent_id || quotation.owner_agent_id,
    owner_agent_name: quotation.owner_agent_name,
    team_leader_id: quotation.team_leader_id,
    team_leader_name: quotation.team_leader_name,
    customer_name: customer.name || "",
    customer_phone: customer.phone || "",
    customer_email: customer.email || "",
    customer_address: customer.address || "",
    status: ORDER_STATUS.PAYMENT_PENDING,
    product_id: quotation.product_id,
    sku: quotation.sku,
    collection: quotation.collection,
    brand: quotation.brand,
    series: quotation.series,
    model: quotation.model,
    storage: quotation.storage,
    color: quotation.color,
    subtotal: Number(quotation.subtotal || 0),
    vat: Number(quotation.vat || 0),
    total: Number(quotation.total || quotation.grand_total || 0),
    grand_total: Number(quotation.grand_total || quotation.total || 0),
    payment_option: quotation.payment_option || "DEPOSIT",
    deposit_percent: Number(quotation.deposit_percent || 0),
    deposit_amount: Number(quotation.deposit_amount || 0),
    balance_amount: Number(quotation.balance_amount || 0),
    paid_amount: 0,
    payment_status: "PENDING",
    line_items_json: quotation.line_items_json,
    timeline_json: JSON.stringify([
      {
        status: ORDER_STATUS.PAYMENT_PENDING,
        at: now,
        by: admin.actor_id,
        note: "Order created from approved quotation"
      }
    ]),
    created_at: now,
    updated_at: now,
    approved_at: now,
    paid_at: "",
    installing_at: "",
    completed_at: "",
    cancelled_at: ""
  };

  appendObject(SHEET_NAMES.orders, order);
  updateRowFields(SHEET_NAMES.quotations, quotation._row, {
    status: QUOTATION_STATUS.CONVERTED,
    order_id: order.order_id,
    updated_at: now
  });
  appendOrderStatusLog(order, "", ORDER_STATUS.PAYMENT_PENDING, admin.actor_id, admin.role, "Order created");
  writeAuditLog("createOrderFromQuotation", order.owner_agent_id, "SUCCESS", "Order created from quotation", {
    actor_id: admin.actor_id,
    quotation_id: quotation.quotation_id,
    order_id: order.order_id
  });

  return {
    ok: true,
    order: publicOrder(order)
  };
}

function getOrder(params) {
  ensureSalesSheets();
  const agentAuth = requireAgentActor(params || {});
  if (!agentAuth.ok) return agentAuth;

  const order = findOrderById(params && (params.order_id || params.orderId));

  if (!order) {
    return {
      ok: false,
      message: "Order not found"
    };
  }

  const agentId = agentAuth.agent_id;

  if (
    agentId &&
    cleanString(order.owner_agent_id || order.agent_id, 80) !== agentId
  ) {
    return {
      ok: false,
      message: "Order access denied"
    };
  }

  return {
    ok: true,
    order: publicOrder(order),
    status_logs: listOrderStatusLogs({
      order_id: order.order_id,
      internal: true
    }).logs
  };
}

function listOrders(params) {
  ensureSalesSheets();
  const options = params || {};
  const agentId = validateAgentId(options.agent_id);
  const status = normalizeSalesStatus(options.status || "");
  const query = cleanString(options.q || options.search, 200).toLowerCase();
  const limit = Math.max(1, Math.min(500, Number(options.limit || 200)));
  const offset = Math.max(0, Number(options.offset || 0));

  if (agentId) {
    const agentAuth = requireAgentActor(options);
    if (!agentAuth.ok) return agentAuth;
    if (agentAuth.agent_id !== agentId) {
      return { ok: false, message: "Agent session mismatch" };
    }

    const agentResult = findApprovedAgent(agentId);

    if (!agentResult.ok) {
      return agentResult;
    }
  } else {
    const admin = requireAdminActor(options);
    if (!admin.ok) return admin;
  }

  const orders = sheetToObjects(SHEET_NAMES.orders)
    .filter(function (order) {
      if (agentId && cleanString(order.owner_agent_id || order.agent_id, 80) !== agentId) {
        return false;
      }

      if (status && normalizeSalesStatus(order.status) !== status) {
        return false;
      }

      if (!query) {
        return true;
      }

      return [
        order.order_id,
        order.quotation_id,
        order.customer_name,
        order.customer_phone,
        order.owner_agent_name,
        order.agent_id,
        order.model,
        order.storage,
        order.color
      ].join(" ").toLowerCase().indexOf(query) !== -1;
    })
    .map(publicOrder);

  return {
    ok: true,
    total: orders.length,
    limit: limit,
    offset: offset,
    orders: orders.slice(offset, offset + limit)
  };
}

function listOrderStatusLogs(params) {
  ensureSalesSheets();
  if (!(params && params.internal === true)) {
    return { ok: false, message: "Order status log access denied" };
  }

  const orderId = cleanString(params && (params.order_id || params.orderId), 80);
  const logs = sheetToObjects(SHEET_NAMES.orderStatusLogs)
    .filter(function (log) {
      return !orderId || cleanString(log.order_id, 80) === orderId;
    })
    .map(function (log) {
      return {
        status_log_id: cleanString(log.status_log_id, 80),
        order_id: cleanString(log.order_id, 80),
        quotation_id: cleanString(log.quotation_id, 80),
        customer_id: cleanString(log.customer_id, 80),
        owner_agent_id: cleanString(log.owner_agent_id, 80),
        from_status: cleanString(log.from_status, 80),
        to_status: cleanString(log.to_status, 80),
        actor_id: cleanString(log.actor_id, 80),
        actor_role: cleanString(log.actor_role, 80),
        note: cleanString(log.note, 500),
        created_at: log.created_at || ""
      };
    });

  return {
    ok: true,
    total: logs.length,
    logs: logs
  };
}

function listPayments(params) {
  ensureSalesSheets();
  const options = params || {};
  const agentId = validateAgentId(options.agent_id);
  const orderId = cleanString(options.order_id || options.orderId, 80);
  const status = normalizeSalesStatus(options.status || "");

  if (agentId) {
    const agentAuth = requireAgentActor(options);
    if (!agentAuth.ok) return agentAuth;
    if (agentAuth.agent_id !== agentId) {
      return { ok: false, message: "Agent session mismatch" };
    }

    const agentResult = findApprovedAgent(agentId);
    if (!agentResult.ok) return agentResult;
  } else {
    const admin = requireAdminActor(options);
    if (!admin.ok) return admin;
  }

  const payments = sheetToObjects(SHEET_NAMES.payments)
    .filter(function (payment) {
      if (agentId && cleanString(payment.owner_agent_id, 80) !== agentId) return false;
      if (orderId && cleanString(payment.order_id, 80) !== orderId) return false;
      if (status && normalizeSalesStatus(payment.status || "") !== status) return false;
      return true;
    })
    .map(publicPayment);

  return {
    ok: true,
    total: payments.length,
    payments: payments
  };
}

function createPayment(body) {
  ensureSalesSheets();
  const agentAuth = requireAgentActor(body || {});
  if (!agentAuth.ok) return agentAuth;

  const order = findOrderById(body && (body.order_id || body.orderId));
  if (!order) return { ok: false, message: "Order not found" };

  const agentId = validateAgentId(body && body.agent_id);
  if (agentId !== agentAuth.agent_id) {
    return { ok: false, message: "Agent session mismatch" };
  }
  if (agentId && cleanString(order.owner_agent_id || order.agent_id, 80) !== agentId) {
    return { ok: false, message: "Payment access denied" };
  }

  if (agentId) {
    const agentResult = findApprovedAgent(agentId);
    if (!agentResult.ok) return agentResult;
  }

  const currentStatus = normalizeSalesStatus(order.status || "");
  if ([ORDER_STATUS.COMPLETED, ORDER_STATUS.CANCELLED].indexOf(currentStatus) !== -1) {
    return { ok: false, message: "Final order cannot accept payment", status: currentStatus };
  }

  const type = normalizeSalesStatus(body.payment_type || body.paymentType || order.payment_option || "DEPOSIT");
  const allowedTypes = ["DEPOSIT", "FULL", "FULL_PAYMENT", "SECOND_PAYMENT", "INSTALLMENT"];
  if (allowedTypes.indexOf(type) === -1) {
    return { ok: false, message: "Invalid payment type" };
  }

  const amount = Math.max(0, Number(body.amount || 0));
  const expectedAmount = type === "DEPOSIT"
    ? Number(order.deposit_amount || 0)
    : Number(order.grand_total || order.total || 0);
  if (amount <= 0 || amount > Number(order.grand_total || order.total || 0)) {
    return { ok: false, message: "Invalid payment amount" };
  }

  if (expectedAmount > 0 && amount < expectedAmount * 0.5) {
    return { ok: false, message: "Payment amount is below allowed minimum" };
  }

  const reference = cleanString(body.reference || body.ref, 180);
  const duplicatePayment = sheetToObjects(SHEET_NAMES.payments).find(function (item) {
    return (
      cleanString(item.order_id, 80) === cleanString(order.order_id, 80) &&
      normalizeSalesStatus(item.payment_type || "") === (type === "FULL_PAYMENT" ? "FULL" : type) &&
      reference &&
      cleanString(item.reference, 180).toLowerCase() === reference.toLowerCase() &&
      ["SUBMITTED", "APPROVED"].indexOf(normalizeSalesStatus(item.status || "")) !== -1
    );
  });

  if (duplicatePayment) {
    return {
      ok: false,
      message: "Duplicate payment reference",
      payment: publicPayment(duplicatePayment)
    };
  }

  const now = new Date();
  const payment = {
    payment_id: makeId("PAY"),
    order_id: order.order_id,
    quotation_id: order.quotation_id,
    customer_id: order.customer_id,
    owner_agent_id: order.owner_agent_id || order.agent_id,
    team_leader_id: order.team_leader_id,
    payment_type: type === "FULL_PAYMENT" ? "FULL" : type,
    amount: amount,
    status: "SUBMITTED",
    method: cleanString(body.method || "TRANSFER", 120),
    reference: reference,
    note: cleanString(body.note, 500),
    submitted_at: now,
    reviewed_at: "",
    reviewed_by: "",
    created_at: now,
    updated_at: now
  };

  appendObject(SHEET_NAMES.payments, payment);
  if (currentStatus === ORDER_STATUS.PAYMENT_PENDING) {
    updateOrderStatus({
      order_id: order.order_id,
      status: ORDER_STATUS.PAYMENT_REVIEW,
      actor_id: agentId || payment.owner_agent_id,
      note: "Payment submitted",
      internal: true
    });
  }

  writeAuditLog("createPayment", payment.owner_agent_id, "SUCCESS", "Payment submitted", {
    actor_id: agentId || payment.owner_agent_id,
    order_id: order.order_id,
    payment_id: payment.payment_id,
    payment_type: payment.payment_type,
    amount: payment.amount
  });

  return {
    ok: true,
    payment: publicPayment(payment),
    order: publicOrder(findOrderById(order.order_id) || order)
  };
}

function reviewPayment(body) {
  return withFinanceLock(function () {
  ensureSalesSheets();
  const admin = requireAdminActor(body);
  if (!admin.ok) return admin;

  const paymentId = cleanString(body && (body.payment_id || body.paymentId), 80);
  const payment = sheetToObjects(SHEET_NAMES.payments).find(function (item) {
    return cleanString(item.payment_id, 80) === paymentId;
  });

  if (!payment) return { ok: false, message: "Payment not found" };

  const currentStatus = normalizeSalesStatus(payment.status || "");
  if (currentStatus !== "SUBMITTED") {
    return { ok: false, message: "Payment already reviewed", status: currentStatus };
  }

  const decision = normalizeSalesStatus(body.status || body.decision || "APPROVED");
  if (["APPROVED", "REJECTED"].indexOf(decision) === -1) {
    return { ok: false, message: "Invalid payment review status" };
  }

  const order = findOrderById(payment.order_id);
  if (!order) return { ok: false, message: "Order not found for payment" };

  const now = new Date();
  const updates = {
    status: decision,
    reviewed_at: now,
    reviewed_by: admin.actor_id,
    note: cleanString(body.note || payment.note, 500),
    updated_at: now
  };

  updateRowFields(SHEET_NAMES.payments, payment._row, updates);
  Object.assign(payment, updates);

  var commissionResult = null;

  if (decision === "APPROVED") {
    const summary = summarizePaymentsForOrder(order.order_id);
    const grandTotal = Number(order.grand_total || order.total || 0);
    const paymentType = normalizeSalesStatus(payment.payment_type || "");
    const nextStatus = paymentType === "DEPOSIT" && summary.approved_amount < grandTotal
      ? ORDER_STATUS.DEPOSIT_PAID
      : ORDER_STATUS.PAID_IN_FULL;

    updateRowFields(SHEET_NAMES.orders, order._row, {
      paid_amount: Math.min(grandTotal, summary.approved_amount),
      payment_status: nextStatus,
      updated_at: now
    });

    updateOrderStatus({
      order_id: order.order_id,
      status: nextStatus,
      actor_id: updates.reviewed_by,
      note: "Payment approved",
      internal: true
    });
    commissionResult = createCommissionForApprovedPayment(payment, admin);
  } else {
    updateRowFields(SHEET_NAMES.orders, order._row, {
      payment_status: "REJECTED",
      updated_at: now
    });
    if (normalizeSalesStatus(order.status || "") === ORDER_STATUS.PAYMENT_REVIEW) {
      updateOrderStatus({
        order_id: order.order_id,
        status: ORDER_STATUS.PAYMENT_PENDING,
        actor_id: updates.reviewed_by,
        note: "Payment rejected",
        internal: true
      });
    }
  }

  writeAuditLog("reviewPayment", payment.owner_agent_id, "SUCCESS", "Payment reviewed", {
    actor_id: updates.reviewed_by,
    order_id: order.order_id,
    payment_id: payment.payment_id,
    decision: decision
  });

  return {
    ok: true,
    payment: publicPayment(payment),
    order: publicOrder(findOrderById(order.order_id) || order),
    commission_result: commissionResult
  };
  });
}

function updateOrderStatus(body) {
  ensureSalesSheets();
  let admin = null;
  if (!(body && body.internal)) {
    admin = requireAdminActor(body);
    if (!admin.ok) return admin;
  }

  const order = findOrderById(body && (body.order_id || body.orderId));

  if (!order) {
    return {
      ok: false,
      message: "Order not found"
    };
  }

  const currentStatus = normalizeSalesStatus(order.status || ORDER_STATUS.NEW);
  const nextStatus = normalizeSalesStatus(body.status);
  const allowed = Object.keys(ORDER_STATUS).map(function (key) {
    return ORDER_STATUS[key];
  });

  if (allowed.indexOf(nextStatus) === -1) {
    return {
      ok: false,
      message: "Invalid order status"
    };
  }

  if (currentStatus === ORDER_STATUS.COMPLETED || currentStatus === ORDER_STATUS.CANCELLED) {
    return {
      ok: false,
      message: "Final order status cannot be changed",
      status: currentStatus
    };
  }

  if (
    currentStatus !== nextStatus &&
    (ORDER_STATUS_TRANSITIONS[currentStatus] || []).indexOf(nextStatus) === -1
  ) {
    return {
      ok: false,
      message: "Invalid order status transition",
      from_status: currentStatus,
      to_status: nextStatus
    };
  }

  const now = new Date();
  const timeline = parseJsonValue(order.timeline_json, []);
  timeline.push({
    status: nextStatus,
    at: now,
    by: cleanString((admin && admin.actor_id) || body.actor_id || body.admin_id || "ADMIN", 80),
    note: cleanString(body.note, 500)
  });

  const updates = {
    status: nextStatus,
    timeline_json: JSON.stringify(timeline),
    updated_at: now
  };

  if (
    nextStatus === ORDER_STATUS.PAID ||
    nextStatus === ORDER_STATUS.PAID_IN_FULL ||
    nextStatus === ORDER_STATUS.DEPOSIT_PAID
  ) updates.paid_at = now;
  if (nextStatus === ORDER_STATUS.INSTALLING) updates.installing_at = now;
  if (nextStatus === ORDER_STATUS.COMPLETED) updates.completed_at = now;
  if (nextStatus === ORDER_STATUS.CANCELLED) updates.cancelled_at = now;

  updateRowFields(SHEET_NAMES.orders, order._row, updates);
  appendOrderStatusLog(order, currentStatus, nextStatus, (admin && admin.actor_id) || body.actor_id || body.admin_id || "ADMIN", (admin && admin.role) || "ADMIN", body.note);
  writeAuditLog("updateOrderStatus", order.owner_agent_id || order.agent_id, "SUCCESS", "Order status updated", {
    actor_id: cleanString((admin && admin.actor_id) || body.actor_id || body.admin_id || "ADMIN", 80),
    order_id: order.order_id,
    from_status: currentStatus,
    to_status: nextStatus
  });

  const updated = findOrderById(order.order_id);

  return {
    ok: true,
    order: publicOrder(updated || order)
  };
}

/* =========================================================
   WITHDRAW
========================================================= */

function financeError(code, message, extra) {
  const response = Object.assign({
    ok: false,
    error: code,
    message: message
  }, extra || {});
  return response;
}

function toSatang(value) {
  if (value === "" || value === null || value === undefined) return 0;
  const text = cleanString(value, 80).replace(/,/g, "");
  if (!/^-?\d+(\.\d{1,2})?$/.test(text)) return NaN;
  return Math.round(Number(text) * 100);
}

function fromSatang(value) {
  return Math.round(Number(value || 0)) / 100;
}

function percentSatang(amountSatang, percent) {
  return Math.round(Number(amountSatang || 0) * Math.max(0, Math.min(100, Number(percent || 0))) / 100);
}

function withFinanceLock(fn) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(15000)) {
    return financeError("FINANCE_LOCK_TIMEOUT", "Finance system is busy. Please try again.");
  }

  try {
    return fn();
  } finally {
    lock.releaseLock();
  }
}

function isQaRecord(record) {
  const values = [
    record && record.is_test,
    record && record.qa_batch,
    record && record.record_environment,
    record && record.agent_id,
    record && record.owner_agent_id,
    record && record.customer_id,
    record && record.quotation_id,
    record && record.order_id,
    record && record.payment_id,
    record && record.reference,
    record && record.customer_name,
    record && record.owner_agent_name,
    record && record.note
  ].join(" ").toUpperCase();
  return booleanValue(record && record.is_test) || values.indexOf("QA_") !== -1 || values.indexOf("SANDBOX") !== -1 || values.indexOf("TEST") !== -1;
}

function qaBatchFor(record) {
  return cleanString((record && record.qa_batch) || "", 120) || (isQaRecord(record || {}) ? "LEGACY_QA" : "");
}

function shouldExcludeFromFinance(record) {
  return isQaRecord(record || {});
}

function writeFinanceAudit(entityType, entityId, action, previousStatus, newStatus, amount, actorType, actorId, reason, metadata, isTest, qaBatch) {
  ensureFinanceSheets();
  appendObject(SHEET_NAMES.financeAuditLogs, {
    log_id: makeId("FAL"),
    entity_type: cleanString(entityType, 80),
    entity_id: cleanString(entityId, 120),
    action: cleanString(action, 120),
    previous_status: cleanString(previousStatus, 60),
    new_status: cleanString(newStatus, 60),
    amount: fromSatang(toSatang(amount || 0)),
    actor_type: cleanString(actorType, 40),
    actor_id: cleanString(actorId, 80),
    reason: cleanString(reason, 500),
    metadata_json: JSON.stringify(metadata || {}),
    created_at: new Date(),
    is_test: Boolean(isTest),
    qa_batch: cleanString(qaBatch, 120)
  });
}

function publicCommissionRule(rule) {
  return {
    rule_id: cleanString(rule.rule_id, 80),
    product_id: cleanString(rule.product_id, 80),
    collection: cleanString(rule.collection, 180),
    commission_type: normalizeSalesStatus(rule.commission_type || "FIXED"),
    commission_value: Number(rule.commission_value || 0),
    commissionable_base: normalizeSalesStatus(rule.commissionable_base || "GRAND_TOTAL"),
    deposit_release_percent: Number(rule.deposit_release_percent || 0),
    final_release_percent: Number(rule.final_release_percent || 100),
    status: normalizeSalesStatus(rule.status || "CONFIG_REQUIRED"),
    effective_from: rule.effective_from || "",
    effective_to: rule.effective_to || "",
    created_at: rule.created_at || "",
    updated_at: rule.updated_at || "",
    note: cleanString(rule.note, 500)
  };
}

function publicCommission(row) {
  return {
    commission_id: cleanString(row.commission_id, 80),
    idempotency_key: cleanString(row.idempotency_key, 220),
    agent_id: cleanString(row.agent_id, 80),
    customer_id: cleanString(row.customer_id, 80),
    quotation_id: cleanString(row.quotation_id, 80),
    order_id: cleanString(row.order_id, 80),
    payment_id: cleanString(row.payment_id, 80),
    product_id: cleanString(row.product_id, 80),
    commission_rule_id: cleanString(row.commission_rule_id, 80),
    commission_type: normalizeSalesStatus(row.commission_type),
    milestone: normalizeSalesStatus(row.milestone),
    gross_order_amount: Number(row.gross_order_amount || 0),
    commissionable_amount: Number(row.commissionable_amount || 0),
    total_order_commission: Number(row.total_order_commission || 0),
    released_amount: Number(row.released_amount || 0),
    pending_amount: Number(row.pending_amount || 0),
    status: normalizeSalesStatus(row.status),
    source_status: normalizeSalesStatus(row.source_status),
    created_at: row.created_at || "",
    available_at: row.available_at || "",
    held_at: row.held_at || "",
    reversed_at: row.reversed_at || "",
    reference_commission_id: cleanString(row.reference_commission_id, 80),
    note: cleanString(row.note, 500),
    is_test: booleanValue(row.is_test),
    qa_batch: cleanString(row.qa_batch, 120)
  };
}

function publicWallet(row) {
  return {
    wallet_id: cleanString(row.wallet_id, 80),
    agent_id: cleanString(row.agent_id, 80),
    status: normalizeSalesStatus(row.status || "ACTIVE"),
    currency: cleanString(row.currency || "THB", 10),
    pending_balance: Number(row.pending_balance || 0),
    available_balance: Number(row.available_balance || 0),
    held_balance: Number(row.held_balance || 0),
    reserved_balance: Number(row.reserved_balance || 0),
    lifetime_earned: Number(row.lifetime_earned || 0),
    lifetime_withdrawn: Number(row.lifetime_withdrawn || 0),
    version: Number(row.version || 0),
    created_at: row.created_at || "",
    updated_at: row.updated_at || "",
    is_test: booleanValue(row.is_test),
    qa_batch: cleanString(row.qa_batch, 120)
  };
}

function publicLedger(row) {
  return {
    ledger_id: cleanString(row.ledger_id, 80),
    wallet_id: cleanString(row.wallet_id, 80),
    agent_id: cleanString(row.agent_id, 80),
    entry_type: normalizeSalesStatus(row.entry_type),
    direction: normalizeSalesStatus(row.direction),
    amount: Number(row.amount || 0),
    balance_bucket: normalizeSalesStatus(row.balance_bucket),
    reference_type: normalizeSalesStatus(row.reference_type),
    reference_id: cleanString(row.reference_id, 120),
    idempotency_key: cleanString(row.idempotency_key, 220),
    status: normalizeSalesStatus(row.status || "POSTED"),
    note: cleanString(row.note, 500),
    created_by_type: cleanString(row.created_by_type, 40),
    created_by_id: cleanString(row.created_by_id, 80),
    created_at: row.created_at || "",
    is_test: booleanValue(row.is_test),
    qa_batch: cleanString(row.qa_batch, 120)
  };
}

function publicWithdrawal(row) {
  return {
    withdrawal_id: cleanString(row.withdrawal_id, 80),
    agent_id: cleanString(row.agent_id, 80),
    wallet_id: cleanString(row.wallet_id, 80),
    requested_amount: Number(row.requested_amount || 0),
    fee_amount: Number(row.fee_amount || 0),
    net_amount: Number(row.net_amount || 0),
    status: normalizeSalesStatus(row.status || "PENDING"),
    bank_account_reference: cleanString(row.bank_account_reference, 120),
    requested_at: row.requested_at || "",
    reviewed_at: row.reviewed_at || "",
    approved_at: row.approved_at || "",
    rejected_at: row.rejected_at || "",
    paid_at: row.paid_at || "",
    payment_reference: cleanString(row.payment_reference, 160),
    rejection_reason: cleanString(row.rejection_reason, 500),
    is_test: booleanValue(row.is_test),
    qa_batch: cleanString(row.qa_batch, 120)
  };
}

function findWalletAccount(agentId) {
  ensureFinanceSheets();
  const normalizedId = validateAgentId(agentId);
  if (!normalizedId) return null;
  return sheetToObjects(SHEET_NAMES.walletAccounts).find(function (wallet) {
    return cleanString(wallet.agent_id, 80) === normalizedId;
  }) || null;
}

function ensureWalletAccount(agentId, seedRecord) {
  ensureFinanceSheets();
  const normalizedId = validateAgentId(agentId);
  if (!normalizedId) throw new Error("Invalid agent_id");

  let wallet = findWalletAccount(normalizedId);
  if (wallet) return wallet;

  const now = new Date();
  wallet = {
    wallet_id: makeId("WAL"),
    agent_id: normalizedId,
    status: "ACTIVE",
    currency: "THB",
    pending_balance: 0,
    available_balance: 0,
    held_balance: 0,
    reserved_balance: 0,
    lifetime_earned: 0,
    lifetime_withdrawn: 0,
    version: 1,
    created_at: now,
    updated_at: now,
    is_test: isQaRecord(seedRecord || { agent_id: normalizedId }),
    qa_batch: qaBatchFor(seedRecord || {})
  };

  appendObject(SHEET_NAMES.walletAccounts, wallet);
  return wallet;
}

function appendLedgerEntry(data) {
  ensureFinanceSheets();
  const idempotencyKey = cleanString(data.idempotency_key, 220);
  if (idempotencyKey) {
    const existing = sheetToObjects(SHEET_NAMES.walletLedger).find(function (entry) {
      return cleanString(entry.idempotency_key, 220) === idempotencyKey;
    });
    if (existing) return existing;
  }

  const wallet = ensureWalletAccount(data.agent_id, data);
  const entry = {
    ledger_id: makeId("LED"),
    wallet_id: wallet.wallet_id,
    agent_id: cleanString(data.agent_id, 80),
    entry_type: normalizeSalesStatus(data.entry_type),
    direction: normalizeSalesStatus(data.direction),
    amount: fromSatang(toSatang(data.amount || 0)),
    balance_bucket: normalizeSalesStatus(data.balance_bucket),
    reference_type: normalizeSalesStatus(data.reference_type),
    reference_id: cleanString(data.reference_id, 120),
    idempotency_key: idempotencyKey,
    status: "POSTED",
    note: cleanString(data.note, 500),
    created_by_type: cleanString(data.created_by_type || "SYSTEM", 40),
    created_by_id: cleanString(data.created_by_id || "SYSTEM", 80),
    created_at: new Date(),
    is_test: Boolean(data.is_test),
    qa_batch: cleanString(data.qa_batch, 120)
  };

  appendObject(SHEET_NAMES.walletLedger, entry);
  updateWalletProjection(entry.agent_id);
  return entry;
}

function calculateWalletProjection(agentId) {
  const normalizedId = validateAgentId(agentId);
  const projection = {
    pending_balance: 0,
    available_balance: 0,
    held_balance: 0,
    reserved_balance: 0,
    lifetime_earned: 0,
    lifetime_withdrawn: 0
  };

  sheetToObjects(SHEET_NAMES.walletLedger)
    .filter(function (entry) {
      return cleanString(entry.agent_id, 80) === normalizedId && normalizeSalesStatus(entry.status || "POSTED") === "POSTED";
    })
    .forEach(function (entry) {
      const amount = toSatang(entry.amount || 0);
      const signed = normalizeSalesStatus(entry.direction) === "DEBIT" ? -amount : amount;
      const bucket = normalizeSalesStatus(entry.balance_bucket);
      if (bucket === "PENDING") projection.pending_balance += signed;
      if (bucket === "AVAILABLE") projection.available_balance += signed;
      if (bucket === "HELD") projection.held_balance += signed;
      if (bucket === "RESERVED") projection.reserved_balance += signed;
      if (normalizeSalesStatus(entry.entry_type) === "COMMISSION_RELEASE" && normalizeSalesStatus(entry.direction) === "CREDIT") {
        projection.lifetime_earned += amount;
      }
      if (normalizeSalesStatus(entry.entry_type) === "WITHDRAWAL_PAID" && normalizeSalesStatus(entry.direction) === "DEBIT") {
        projection.lifetime_withdrawn += amount;
      }
    });

  Object.keys(projection).forEach(function (key) {
    projection[key] = fromSatang(projection[key]);
  });

  return projection;
}

function updateWalletProjection(agentId) {
  const wallet = ensureWalletAccount(agentId, {});
  const projection = calculateWalletProjection(agentId);
  const hasNegative = projection.available_balance < 0 || projection.pending_balance < 0 || projection.held_balance < 0 || projection.reserved_balance < 0;

  if (hasNegative) {
    throw new Error("Finance integrity error: negative wallet balance");
  }

  const updates = Object.assign({}, projection, {
    version: Number(wallet.version || 0) + 1,
    updated_at: new Date()
  });
  updateRowFields(SHEET_NAMES.walletAccounts, wallet._row, updates);
  return Object.assign({}, wallet, updates);
}

function getWalletProjection(agentId) {
  ensureFinanceSheets();
  const wallet = ensureWalletAccount(agentId, {});
  const updated = updateWalletProjection(agentId);
  return { ok: true, wallet: updated || wallet };
}

function activeCommissionRuleForOrder(order) {
  ensureFinanceSheets();
  const productId = cleanString(order.product_id, 80);
  const collection = cleanString(order.collection, 180).toLowerCase();
  const now = new Date();
  const rules = sheetToObjects(SHEET_NAMES.commissionRules).filter(function (rule) {
    if (normalizeSalesStatus(rule.status || "") !== "ACTIVE") return false;
    if (productId && cleanString(rule.product_id, 80) === productId) return true;
    if (collection && cleanString(rule.collection, 180).toLowerCase() === collection && !cleanString(rule.product_id, 80)) return true;
    return false;
  }).filter(function (rule) {
    const from = rule.effective_from ? new Date(rule.effective_from) : null;
    const to = rule.effective_to ? new Date(rule.effective_to) : null;
    return (!from || from <= now) && (!to || to >= now);
  });
  return rules[rules.length - 1] || null;
}

function commissionableBaseSatang(order, rule) {
  const base = normalizeSalesStatus(rule.commissionable_base || "GRAND_TOTAL");
  if (base === "SUBTOTAL") return toSatang(order.subtotal || 0);
  if (base === "SERVICE_FEE") return 0;
  if (base === "PRODUCT_PRICE") return toSatang(Math.max(0, Number(order.subtotal || 0) - Number(order.vat || 0)));
  return toSatang(order.grand_total || order.total || 0);
}

function totalCommissionSatang(order, rule) {
  const baseSatang = commissionableBaseSatang(order, rule);
  const type = normalizeSalesStatus(rule.commission_type || "FIXED");
  const value = Number(rule.commission_value || 0);
  if (type === "PERCENT" || type === "PERCENTAGE") {
    return percentSatang(baseSatang, value);
  }
  return toSatang(value);
}

function commissionIdempotencyKey(payment, agentId, milestone) {
  return [
    "COMMISSION",
    cleanString(payment.payment_id, 80),
    cleanString(agentId, 80),
    normalizeSalesStatus(payment.payment_type || ""),
    normalizeSalesStatus(milestone || "")
  ].join(":");
}

function createCommissionForApprovedPayment(payment, actor) {
  ensureSalesSheets();
  ensureFinanceSheets();

  if (normalizeSalesStatus(payment.status || "") !== "APPROVED") {
    return { ok: true, skipped: true, reason: "PAYMENT_NOT_APPROVED" };
  }

  const order = findOrderById(payment.order_id);
  if (!order) return financeError("NOT_FOUND", "Order not found for commission.");

  const agentId = cleanString(order.owner_agent_id || order.agent_id || payment.owner_agent_id, 80);
  const isTest = shouldExcludeFromFinance(order) || shouldExcludeFromFinance(payment);
  const qaBatch = qaBatchFor(order) || qaBatchFor(payment);
  const milestone = normalizeSalesStatus(payment.payment_type || "PAYMENT");
  const existing = sheetToObjects(SHEET_NAMES.commissions).find(function (item) {
    return cleanString(item.idempotency_key, 220) === commissionIdempotencyKey(payment, agentId, milestone);
  });

  if (existing) {
    return { ok: true, duplicate: true, commission: publicCommission(existing) };
  }

  const rule = activeCommissionRuleForOrder(order);
  const now = new Date();
  const key = commissionIdempotencyKey(payment, agentId, milestone);

  if (!rule) {
    const missing = {
      commission_id: makeId("COM"),
      idempotency_key: key,
      agent_id: agentId,
      customer_id: order.customer_id,
      quotation_id: order.quotation_id,
      order_id: order.order_id,
      payment_id: payment.payment_id,
      product_id: order.product_id,
      commission_rule_id: "",
      commission_type: "CONFIG_REQUIRED",
      milestone: milestone,
      gross_order_amount: Number(order.grand_total || order.total || 0),
      commissionable_amount: 0,
      total_order_commission: 0,
      released_amount: 0,
      pending_amount: 0,
      status: "CONFIG_REQUIRED",
      source_status: "APPROVED",
      created_at: now,
      available_at: "",
      held_at: "",
      reversed_at: "",
      reference_commission_id: "",
      note: "Commission rule is required before release.",
      is_test: isTest,
      qa_batch: qaBatch
    };
    appendObject(SHEET_NAMES.commissions, missing);
    writeFinanceAudit("COMMISSION", missing.commission_id, "COMMISSION_CONFIG_REQUIRED", "", "CONFIG_REQUIRED", 0, "ADMIN", actor.actor_id, "Missing active commission rule", { order_id: order.order_id, payment_id: payment.payment_id }, isTest, qaBatch);
    return { ok: false, error: "COMMISSION_CONFIG_REQUIRED", message: "Commission configuration required.", commission: publicCommission(missing) };
  }

  const totalSatang = totalCommissionSatang(order, rule);
  if (!isFinite(totalSatang) || totalSatang <= 0) {
    return financeError("COMMISSION_CONFIG_REQUIRED", "Commission rule value must be greater than zero.");
  }

  const previousReleasedSatang = sheetToObjects(SHEET_NAMES.commissions)
    .filter(function (item) {
      return cleanString(item.order_id, 80) === cleanString(order.order_id, 80) &&
        cleanString(item.agent_id, 80) === agentId &&
        ["AVAILABLE", "PAID", "HELD"].indexOf(normalizeSalesStatus(item.status || "")) !== -1;
    })
    .reduce(function (sumValue, item) {
      return sumValue + toSatang(item.released_amount || 0);
    }, 0);
  const paymentSummary = summarizePaymentsForOrder(order.order_id);
  const grandTotalSatang = toSatang(order.grand_total || order.total || 0);
  const approvedSatang = toSatang(paymentSummary.approved_amount || 0);
  const desiredSatang = approvedSatang >= grandTotalSatang
    ? totalSatang
    : percentSatang(totalSatang, milestone === "DEPOSIT" ? rule.deposit_release_percent : rule.final_release_percent);
  const releaseSatang = Math.max(0, Math.min(totalSatang - previousReleasedSatang, desiredSatang - previousReleasedSatang));
  const status = releaseSatang > 0 ? "AVAILABLE" : "PENDING";
  const commission = {
    commission_id: makeId("COM"),
    idempotency_key: key,
    agent_id: agentId,
    customer_id: order.customer_id,
    quotation_id: order.quotation_id,
    order_id: order.order_id,
    payment_id: payment.payment_id,
    product_id: order.product_id,
    commission_rule_id: rule.rule_id,
    commission_type: normalizeSalesStatus(rule.commission_type),
    milestone: milestone,
    gross_order_amount: Number(order.grand_total || order.total || 0),
    commissionable_amount: fromSatang(commissionableBaseSatang(order, rule)),
    total_order_commission: fromSatang(totalSatang),
    released_amount: fromSatang(releaseSatang),
    pending_amount: fromSatang(Math.max(0, totalSatang - previousReleasedSatang - releaseSatang)),
    status: status,
    source_status: "APPROVED",
    created_at: now,
    available_at: status === "AVAILABLE" ? now : "",
    held_at: "",
    reversed_at: "",
    reference_commission_id: "",
    note: "Created from approved payment.",
    is_test: isTest,
    qa_batch: qaBatch
  };

  appendObject(SHEET_NAMES.commissions, commission);

  if (releaseSatang > 0) {
    appendLedgerEntry({
      agent_id: agentId,
      entry_type: "COMMISSION_RELEASE",
      direction: "CREDIT",
      amount: fromSatang(releaseSatang),
      balance_bucket: "AVAILABLE",
      reference_type: "COMMISSION",
      reference_id: commission.commission_id,
      idempotency_key: "LEDGER:" + key + ":AVAILABLE",
      note: "Commission released from approved payment.",
      created_by_type: "ADMIN",
      created_by_id: actor.actor_id,
      is_test: isTest,
      qa_batch: qaBatch
    });
  }

  writeFinanceAudit("COMMISSION", commission.commission_id, "COMMISSION_CREATED", "", status, commission.released_amount, "ADMIN", actor.actor_id, "Payment approved", { order_id: order.order_id, payment_id: payment.payment_id }, isTest, qaBatch);
  return { ok: true, commission: publicCommission(commission), wallet: publicWallet(findWalletAccount(agentId) || {}) };
}

function financeAgentSession(body) {
  const session = requireAgentActor(body || {});
  if (!session.ok) return session;
  const agentResult = findApprovedAgent(session.agent_id);
  if (!agentResult.ok) return agentResult;
  return session;
}

function getAgentCommissionSummary(body) {
  const session = financeAgentSession(body);
  if (!session.ok) return session;
  const commissions = sheetToObjects(SHEET_NAMES.commissions).filter(function (item) {
    return cleanString(item.agent_id, 80) === session.agent_id;
  });
  const wallet = getWalletProjection(session.agent_id).wallet;
  return { ok: true, data: { summary: publicWallet(wallet), total_commissions: commissions.length }, summary: publicWallet(wallet) };
}

function listAgentCommissions(body) {
  const session = financeAgentSession(body);
  if (!session.ok) return session;
  const status = normalizeSalesStatus(body && body.status);
  const q = cleanString(body && (body.q || body.search), 200).toLowerCase();
  const limit = Math.max(1, Math.min(200, Number(body && body.limit || 100)));
  const offset = Math.max(0, Number(body && body.offset || 0));
  const rows = sheetToObjects(SHEET_NAMES.commissions).filter(function (item) {
    if (cleanString(item.agent_id, 80) !== session.agent_id) return false;
    if (status && normalizeSalesStatus(item.status) !== status) return false;
    if (!q) return true;
    return [item.commission_id, item.order_id, item.payment_id, item.product_id, item.milestone, item.status].join(" ").toLowerCase().indexOf(q) !== -1;
  }).map(publicCommission);
  return { ok: true, total: rows.length, limit: limit, offset: offset, commissions: rows.slice(offset, offset + limit) };
}

function getAgentCommissionDetail(body) {
  const session = financeAgentSession(body);
  if (!session.ok) return session;
  const id = cleanString(body && (body.commission_id || body.commissionId), 80);
  const row = sheetToObjects(SHEET_NAMES.commissions).find(function (item) {
    return cleanString(item.commission_id, 80) === id && cleanString(item.agent_id, 80) === session.agent_id;
  });
  return row ? { ok: true, commission: publicCommission(row) } : financeError("NOT_FOUND", "Commission not found.");
}

function getAgentWallet(body) {
  const session = financeAgentSession(body);
  if (!session.ok) return session;
  const wallet = getWalletProjection(session.agent_id).wallet;
  return { ok: true, wallet: publicWallet(wallet) };
}

function listAgentWalletLedger(body) {
  const session = financeAgentSession(body);
  if (!session.ok) return session;
  const limit = Math.max(1, Math.min(200, Number(body && body.limit || 100)));
  const offset = Math.max(0, Number(body && body.offset || 0));
  const rows = sheetToObjects(SHEET_NAMES.walletLedger).filter(function (item) {
    return cleanString(item.agent_id, 80) === session.agent_id;
  }).map(publicLedger).reverse();
  return { ok: true, total: rows.length, limit: limit, offset: offset, ledger: rows.slice(offset, offset + limit) };
}

function maskedAgentBank(agent) {
  const account = cleanString(agent.bank_account || agent.account_number, 80);
  const tail = account.slice(-4);
  return [cleanString(agent.bank_name, 120), tail ? "****" + tail : ""].filter(Boolean).join(" ");
}

function createWithdrawalRequest(body) {
  return withFinanceLock(function () {
    const session = financeAgentSession(body);
    if (!session.ok) return session;
    const agent = session.agent || findAgent(session.agent_id) || {};
    const amountSatang = toSatang(body && body.amount);
    if (!isFinite(amountSatang) || amountSatang <= 0) {
      return financeError("INVALID_AMOUNT", "Withdrawal amount is invalid.");
    }

    const wallet = getWalletProjection(session.agent_id).wallet;
    if (toSatang(wallet.available_balance) < amountSatang) {
      return financeError("INSUFFICIENT_BALANCE", "Available balance is not enough.");
    }

    const idempotencyKey = cleanString(body && body.idempotency_key, 220) || "WITHDRAWAL:" + session.agent_id + ":" + amountSatang + ":" + Math.floor(Date.now() / 10000);
    const existing = sheetToObjects(SHEET_NAMES.withdrawalRequests).find(function (item) {
      return cleanString(item.idempotency_key, 220) === idempotencyKey;
    });
    if (existing) return { ok: true, duplicate: true, withdrawal: publicWithdrawal(existing), wallet: publicWallet(getWalletProjection(session.agent_id).wallet) };

    const isTest = isQaRecord(agent) || isQaRecord(body || {});
    const qaBatch = qaBatchFor(agent) || qaBatchFor(body || {});
    const now = new Date();
    const withdrawal = {
      withdrawal_id: makeId("WDR"),
      agent_id: session.agent_id,
      wallet_id: wallet.wallet_id,
      requested_amount: fromSatang(amountSatang),
      fee_amount: 0,
      net_amount: fromSatang(amountSatang),
      status: "PENDING",
      bank_account_reference: maskedAgentBank(agent),
      requested_at: now,
      reviewed_at: "",
      approved_at: "",
      rejected_at: "",
      paid_at: "",
      reviewer_admin_id: "",
      payment_reference: "",
      rejection_reason: "",
      idempotency_key: idempotencyKey,
      is_test: isTest,
      qa_batch: qaBatch
    };

    appendObject(SHEET_NAMES.withdrawalRequests, withdrawal);
    appendLedgerEntry({
      agent_id: session.agent_id,
      entry_type: "WITHDRAWAL_RESERVE",
      direction: "DEBIT",
      amount: withdrawal.requested_amount,
      balance_bucket: "AVAILABLE",
      reference_type: "WITHDRAWAL",
      reference_id: withdrawal.withdrawal_id,
      idempotency_key: "LEDGER:" + idempotencyKey + ":AVAILABLE",
      note: "Withdrawal reservation.",
      created_by_type: "AGENT",
      created_by_id: session.agent_id,
      is_test: isTest,
      qa_batch: qaBatch
    });
    appendLedgerEntry({
      agent_id: session.agent_id,
      entry_type: "WITHDRAWAL_RESERVE",
      direction: "CREDIT",
      amount: withdrawal.requested_amount,
      balance_bucket: "RESERVED",
      reference_type: "WITHDRAWAL",
      reference_id: withdrawal.withdrawal_id,
      idempotency_key: "LEDGER:" + idempotencyKey + ":RESERVED",
      note: "Withdrawal reservation.",
      created_by_type: "AGENT",
      created_by_id: session.agent_id,
      is_test: isTest,
      qa_batch: qaBatch
    });
    writeFinanceAudit("WITHDRAWAL", withdrawal.withdrawal_id, "WITHDRAWAL_REQUESTED", "", "PENDING", withdrawal.requested_amount, "AGENT", session.agent_id, cleanString(body && body.note, 500), {}, isTest, qaBatch);
    return { ok: true, withdrawal: publicWithdrawal(withdrawal), wallet: publicWallet(getWalletProjection(session.agent_id).wallet) };
  });
}

function listAgentWithdrawals(body) {
  const session = financeAgentSession(body);
  if (!session.ok) return session;
  const rows = sheetToObjects(SHEET_NAMES.withdrawalRequests).filter(function (item) {
    return cleanString(item.agent_id, 80) === session.agent_id;
  }).map(publicWithdrawal).reverse();
  return { ok: true, total: rows.length, withdrawals: rows };
}

function getAgentWithdrawalDetail(body) {
  const session = financeAgentSession(body);
  if (!session.ok) return session;
  const id = cleanString(body && (body.withdrawal_id || body.withdrawalId), 80);
  const row = sheetToObjects(SHEET_NAMES.withdrawalRequests).find(function (item) {
    return cleanString(item.withdrawal_id, 80) === id && cleanString(item.agent_id, 80) === session.agent_id;
  });
  return row ? { ok: true, withdrawal: publicWithdrawal(row) } : financeError("NOT_FOUND", "Withdrawal not found.");
}

function financeAdminSession(body) {
  const admin = requireAdminActor(body || {});
  return admin.ok ? admin : financeError("FORBIDDEN", admin.message || "Admin permission required.");
}

function getFinanceDashboard(body) {
  const admin = financeAdminSession(body);
  if (!admin.ok) return admin;
  ensureFinanceSheets();
  const includeQa = booleanValue(body && body.include_qa);
  const commissions = sheetToObjects(SHEET_NAMES.commissions).filter(function (item) { return includeQa || !isQaRecord(item); });
  const wallets = sheetToObjects(SHEET_NAMES.walletAccounts).filter(function (item) { return includeQa || !isQaRecord(item); }).map(function (wallet) {
    return publicWallet(updateWalletProjection(wallet.agent_id));
  });
  const withdrawals = sheetToObjects(SHEET_NAMES.withdrawalRequests).filter(function (item) { return includeQa || !isQaRecord(item); });
  const anomalies = listFinanceAnomalies(includeQa);
  return {
    ok: true,
    summary: {
      total_pending_commission: sum(commissions.filter(function (c) { return normalizeSalesStatus(c.status) === "PENDING"; }), "pending_amount"),
      total_available_commission: sum(commissions.filter(function (c) { return normalizeSalesStatus(c.status) === "AVAILABLE"; }), "released_amount"),
      total_wallet_liability: sum(wallets, "available_balance") + sum(wallets, "reserved_balance"),
      total_reserved_withdrawal: sum(wallets, "reserved_balance"),
      pending_withdrawals_count: withdrawals.filter(function (w) { return normalizeSalesStatus(w.status) === "PENDING"; }).length,
      approved_not_paid_count: withdrawals.filter(function (w) { return normalizeSalesStatus(w.status) === "APPROVED"; }).length,
      paid_total: sum(withdrawals.filter(function (w) { return normalizeSalesStatus(w.status) === "PAID"; }), "net_amount"),
      commission_config_missing_count: commissions.filter(function (c) { return normalizeSalesStatus(c.status) === "CONFIG_REQUIRED"; }).length,
      finance_anomaly_count: anomalies.length
    },
    recent_activity: sheetToObjects(SHEET_NAMES.financeAuditLogs).slice(-20).reverse(),
    anomalies: anomalies
  };
}

function listAllCommissions(body) {
  const admin = financeAdminSession(body);
  if (!admin.ok) return admin;
  const includeQa = booleanValue(body && body.include_qa);
  const status = normalizeSalesStatus(body && body.status);
  const q = cleanString(body && (body.q || body.search), 200).toLowerCase();
  const rows = sheetToObjects(SHEET_NAMES.commissions).filter(function (item) {
    if (!includeQa && isQaRecord(item)) return false;
    if (status && normalizeSalesStatus(item.status) !== status) return false;
    if (!q) return true;
    return [item.commission_id, item.agent_id, item.order_id, item.payment_id, item.product_id, item.status].join(" ").toLowerCase().indexOf(q) !== -1;
  }).map(publicCommission).reverse();
  return { ok: true, total: rows.length, commissions: rows };
}

function getCommissionDetailAdmin(body) {
  const admin = financeAdminSession(body);
  if (!admin.ok) return admin;
  const id = cleanString(body && (body.commission_id || body.commissionId), 80);
  const row = sheetToObjects(SHEET_NAMES.commissions).find(function (item) {
    return cleanString(item.commission_id, 80) === id;
  });
  return row ? { ok: true, commission: publicCommission(row) } : financeError("NOT_FOUND", "Commission not found.");
}

function updateCommissionStatus(body, action, nextStatus) {
  return withFinanceLock(function () {
    const admin = financeAdminSession(body);
    if (!admin.ok) return admin;
    const reason = cleanString(body && body.reason, 500);
    if ((action === "HOLD" || action === "REVERSE") && !reason) return financeError("INVALID_REQUEST", "Reason is required.");
    const id = cleanString(body && (body.commission_id || body.commissionId), 80);
    const row = sheetToObjects(SHEET_NAMES.commissions).find(function (item) { return cleanString(item.commission_id, 80) === id; });
    if (!row) return financeError("NOT_FOUND", "Commission not found.");
    const current = normalizeSalesStatus(row.status);
    const amount = Number(row.released_amount || 0);
    const isTest = isQaRecord(row);
    const qaBatch = qaBatchFor(row);
    const transitions = {
      HOLD: ["PENDING", "AVAILABLE"],
      RELEASE_HOLD: ["HELD"],
      REVERSE: ["PENDING", "AVAILABLE", "HELD"]
    };
    if (transitions[action].indexOf(current) === -1) return financeError("INVALID_STATUS_TRANSITION", "Invalid commission status transition.", { status: current });
    if (action === "HOLD" && current === "AVAILABLE" && amount > 0) {
      appendLedgerEntry({ agent_id: row.agent_id, entry_type: "COMMISSION_HOLD", direction: "DEBIT", amount: amount, balance_bucket: "AVAILABLE", reference_type: "COMMISSION", reference_id: row.commission_id, idempotency_key: "HOLD:" + row.commission_id + ":AVAILABLE", note: reason, created_by_type: "ADMIN", created_by_id: admin.actor_id, is_test: isTest, qa_batch: qaBatch });
      appendLedgerEntry({ agent_id: row.agent_id, entry_type: "COMMISSION_HOLD", direction: "CREDIT", amount: amount, balance_bucket: "HELD", reference_type: "COMMISSION", reference_id: row.commission_id, idempotency_key: "HOLD:" + row.commission_id + ":HELD", note: reason, created_by_type: "ADMIN", created_by_id: admin.actor_id, is_test: isTest, qa_batch: qaBatch });
    }
    if (action === "RELEASE_HOLD" && amount > 0) {
      appendLedgerEntry({ agent_id: row.agent_id, entry_type: "COMMISSION_UNHOLD", direction: "DEBIT", amount: amount, balance_bucket: "HELD", reference_type: "COMMISSION", reference_id: row.commission_id, idempotency_key: "UNHOLD:" + row.commission_id + ":HELD", note: reason, created_by_type: "ADMIN", created_by_id: admin.actor_id, is_test: isTest, qa_batch: qaBatch });
      appendLedgerEntry({ agent_id: row.agent_id, entry_type: "COMMISSION_UNHOLD", direction: "CREDIT", amount: amount, balance_bucket: "AVAILABLE", reference_type: "COMMISSION", reference_id: row.commission_id, idempotency_key: "UNHOLD:" + row.commission_id + ":AVAILABLE", note: reason, created_by_type: "ADMIN", created_by_id: admin.actor_id, is_test: isTest, qa_batch: qaBatch });
    }
    if (action === "REVERSE" && amount > 0 && current !== "PENDING") {
      appendLedgerEntry({ agent_id: row.agent_id, entry_type: "COMMISSION_REVERSAL", direction: "DEBIT", amount: amount, balance_bucket: current === "HELD" ? "HELD" : "AVAILABLE", reference_type: "COMMISSION", reference_id: row.commission_id, idempotency_key: "REVERSE:" + row.commission_id, note: reason, created_by_type: "ADMIN", created_by_id: admin.actor_id, is_test: isTest, qa_batch: qaBatch });
    }
    const updates = { status: nextStatus, note: reason || row.note };
    if (nextStatus === "HELD") updates.held_at = new Date();
    if (nextStatus === "REVERSED") updates.reversed_at = new Date();
    updateRowFields(SHEET_NAMES.commissions, row._row, updates);
    writeFinanceAudit("COMMISSION", row.commission_id, action, current, nextStatus, amount, "ADMIN", admin.actor_id, reason, {}, isTest, qaBatch);
    return { ok: true, commission: publicCommission(Object.assign({}, row, updates)), wallet: publicWallet(getWalletProjection(row.agent_id).wallet) };
  });
}

function holdCommission(body) { return updateCommissionStatus(body, "HOLD", "HELD"); }
function releaseCommissionHold(body) { return updateCommissionStatus(body, "RELEASE_HOLD", "AVAILABLE"); }
function reverseCommission(body) { return updateCommissionStatus(body, "REVERSE", "REVERSED"); }

function listWalletAccountsAdmin(body) {
  const admin = financeAdminSession(body);
  if (!admin.ok) return admin;
  const includeQa = booleanValue(body && body.include_qa);
  const wallets = sheetToObjects(SHEET_NAMES.walletAccounts).filter(function (item) { return includeQa || !isQaRecord(item); }).map(function (wallet) {
    return publicWallet(updateWalletProjection(wallet.agent_id));
  });
  return { ok: true, total: wallets.length, wallets: wallets };
}

function getWalletAccountAdmin(body) {
  const admin = financeAdminSession(body);
  if (!admin.ok) return admin;
  const agentId = validateAgentId(body && body.agent_id);
  if (!agentId) return financeError("INVALID_REQUEST", "Invalid agent_id.");
  const wallet = getWalletProjection(agentId).wallet;
  const ledger = sheetToObjects(SHEET_NAMES.walletLedger).filter(function (entry) { return cleanString(entry.agent_id, 80) === agentId; }).map(publicLedger).reverse();
  return { ok: true, wallet: publicWallet(wallet), ledger: ledger };
}

function listWithdrawalsAdmin(body) {
  const admin = financeAdminSession(body);
  if (!admin.ok) return admin;
  const includeQa = booleanValue(body && body.include_qa);
  const status = normalizeSalesStatus(body && body.status);
  const rows = sheetToObjects(SHEET_NAMES.withdrawalRequests).filter(function (item) {
    if (!includeQa && isQaRecord(item)) return false;
    if (status && normalizeSalesStatus(item.status) !== status) return false;
    return true;
  }).map(publicWithdrawal).reverse();
  return { ok: true, total: rows.length, withdrawals: rows };
}

function getWithdrawalDetailAdmin(body) {
  const admin = financeAdminSession(body);
  if (!admin.ok) return admin;
  const id = cleanString(body && (body.withdrawal_id || body.withdrawalId), 80);
  const row = sheetToObjects(SHEET_NAMES.withdrawalRequests).find(function (item) { return cleanString(item.withdrawal_id, 80) === id; });
  return row ? { ok: true, withdrawal: publicWithdrawal(row) } : financeError("NOT_FOUND", "Withdrawal not found.");
}

function transitionWithdrawal(body, action, nextStatus) {
  return withFinanceLock(function () {
    const admin = financeAdminSession(body);
    if (!admin.ok) return admin;
    const id = cleanString(body && (body.withdrawal_id || body.withdrawalId), 80);
    const row = sheetToObjects(SHEET_NAMES.withdrawalRequests).find(function (item) { return cleanString(item.withdrawal_id, 80) === id; });
    if (!row) return financeError("NOT_FOUND", "Withdrawal not found.");
    const current = normalizeSalesStatus(row.status);
    const amount = Number(row.requested_amount || 0);
    const isTest = isQaRecord(row);
    const qaBatch = qaBatchFor(row);
    const reason = cleanString(body && (body.reason || body.rejection_reason), 500);
    if (action === "REJECT" && !reason) return financeError("INVALID_REQUEST", "Reject reason is required.");
    if (action === "APPROVE" && current !== "PENDING") return financeError("INVALID_STATUS_TRANSITION", "Only pending withdrawal can be approved.");
    if (action === "REJECT" && ["PENDING", "APPROVED"].indexOf(current) === -1) return financeError("INVALID_STATUS_TRANSITION", "Withdrawal cannot be rejected.");
    if (action === "PAID" && current !== "APPROVED") return financeError("INVALID_STATUS_TRANSITION", "Only approved withdrawal can be marked paid.");

    const updates = { status: nextStatus, reviewed_at: new Date(), reviewer_admin_id: admin.actor_id };
    if (action === "APPROVE") updates.approved_at = new Date();
    if (action === "REJECT") {
      updates.rejected_at = new Date();
      updates.rejection_reason = reason;
      appendLedgerEntry({ agent_id: row.agent_id, entry_type: "WITHDRAWAL_REJECTED", direction: "DEBIT", amount: amount, balance_bucket: "RESERVED", reference_type: "WITHDRAWAL", reference_id: row.withdrawal_id, idempotency_key: "REJECT:" + row.withdrawal_id + ":RESERVED", note: reason, created_by_type: "ADMIN", created_by_id: admin.actor_id, is_test: isTest, qa_batch: qaBatch });
      appendLedgerEntry({ agent_id: row.agent_id, entry_type: "WITHDRAWAL_REJECTED", direction: "CREDIT", amount: amount, balance_bucket: "AVAILABLE", reference_type: "WITHDRAWAL", reference_id: row.withdrawal_id, idempotency_key: "REJECT:" + row.withdrawal_id + ":AVAILABLE", note: reason, created_by_type: "ADMIN", created_by_id: admin.actor_id, is_test: isTest, qa_batch: qaBatch });
    }
    if (action === "PAID") {
      updates.paid_at = new Date();
      updates.payment_reference = cleanString(body && body.payment_reference, 160);
      appendLedgerEntry({ agent_id: row.agent_id, entry_type: "WITHDRAWAL_PAID", direction: "DEBIT", amount: amount, balance_bucket: "RESERVED", reference_type: "WITHDRAWAL", reference_id: row.withdrawal_id, idempotency_key: "PAID:" + row.withdrawal_id, note: updates.payment_reference, created_by_type: "ADMIN", created_by_id: admin.actor_id, is_test: isTest, qa_batch: qaBatch });
    }
    updateRowFields(SHEET_NAMES.withdrawalRequests, row._row, updates);
    writeFinanceAudit("WITHDRAWAL", row.withdrawal_id, "WITHDRAWAL_" + action, current, nextStatus, amount, "ADMIN", admin.actor_id, reason || updates.payment_reference, {}, isTest, qaBatch);
    return { ok: true, withdrawal: publicWithdrawal(Object.assign({}, row, updates)), wallet: publicWallet(getWalletProjection(row.agent_id).wallet) };
  });
}

function approveWithdrawal(body) { return transitionWithdrawal(body, "APPROVE", "APPROVED"); }
function rejectWithdrawal(body) { return transitionWithdrawal(body, "REJECT", "REJECTED"); }
function markWithdrawalPaid(body) { return transitionWithdrawal(body, "PAID", "PAID"); }

function createWalletAdjustment(body) {
  return withFinanceLock(function () {
    const admin = financeAdminSession(body);
    if (!admin.ok) return admin;
    const agentId = validateAgentId(body && body.agent_id);
    const reason = cleanString(body && body.reason, 500);
    const direction = normalizeSalesStatus(body && body.direction);
    const amountSatang = toSatang(body && body.amount);
    if (!agentId || !reason || ["CREDIT", "DEBIT"].indexOf(direction) === -1 || !isFinite(amountSatang) || amountSatang <= 0) {
      return financeError("INVALID_REQUEST", "Adjustment requires agent, direction, amount, and reason.");
    }
    const wallet = getWalletProjection(agentId).wallet;
    if (direction === "DEBIT" && toSatang(wallet.available_balance) < amountSatang) return financeError("INSUFFICIENT_BALANCE", "Adjustment debit exceeds available balance.");
    const idempotencyKey = cleanString(body && body.idempotency_key, 220) || "ADJUSTMENT:" + agentId + ":" + direction + ":" + amountSatang + ":" + cleanString(body && body.reference, 120);
    const entry = appendLedgerEntry({ agent_id: agentId, entry_type: "ADJUSTMENT", direction: direction, amount: fromSatang(amountSatang), balance_bucket: "AVAILABLE", reference_type: "ADJUSTMENT", reference_id: cleanString(body && body.reference, 120) || idempotencyKey, idempotency_key: idempotencyKey, note: reason, created_by_type: "ADMIN", created_by_id: admin.actor_id, is_test: isQaRecord(body || {}), qa_batch: qaBatchFor(body || {}) });
    writeFinanceAudit("WALLET", agentId, "WALLET_ADJUSTED", "", direction, fromSatang(amountSatang), "ADMIN", admin.actor_id, reason, { ledger_id: entry.ledger_id }, isQaRecord(body || {}), qaBatchFor(body || {}));
    return { ok: true, ledger: publicLedger(entry), wallet: publicWallet(getWalletProjection(agentId).wallet) };
  });
}

function getCommissionConfiguration(body) {
  const admin = financeAdminSession(body);
  if (!admin.ok) return admin;
  ensureFinanceSheets();
  return { ok: true, rules: sheetToObjects(SHEET_NAMES.commissionRules).map(publicCommissionRule) };
}

function saveCommissionConfiguration(body) {
  return withFinanceLock(function () {
    const admin = financeAdminSession(body);
    if (!admin.ok) return admin;
    ensureFinanceSheets();
    const productId = cleanString(body && (body.product_id || body.productId), 80);
    const collection = cleanString(body && body.collection, 180);
    const type = normalizeSalesStatus(body && body.commission_type || "FIXED");
    const base = normalizeSalesStatus(body && body.commissionable_base || "GRAND_TOTAL");
    const valueSatang = type === "FIXED" ? toSatang(body && body.commission_value) : Number(body && body.commission_value);
    const depositPercent = Number(body && body.deposit_release_percent);
    const finalPercent = Number(body && body.final_release_percent);
    if ((!productId && !collection) || ["FIXED", "PERCENT", "PERCENTAGE"].indexOf(type) === -1 || !isFinite(valueSatang) || valueSatang < 0 || !isFinite(depositPercent) || !isFinite(finalPercent) || depositPercent < 0 || depositPercent > 100 || finalPercent < 0 || finalPercent > 100) {
      return financeError("INVALID_REQUEST", "Invalid commission configuration.");
    }
    const status = normalizeSalesStatus(body && body.status || "ACTIVE");
    const now = new Date();
    const existingId = cleanString(body && body.rule_id, 80);
    const rows = sheetToObjects(SHEET_NAMES.commissionRules);
    const existing = rows.find(function (rule) {
      return existingId ? cleanString(rule.rule_id, 80) === existingId : (productId && cleanString(rule.product_id, 80) === productId);
    });
    const rule = {
      rule_id: existing ? existing.rule_id : makeId("CMR"),
      product_id: productId,
      collection: collection,
      commission_type: type === "PERCENTAGE" ? "PERCENT" : type,
      commission_value: type === "FIXED" ? fromSatang(valueSatang) : Number(body.commission_value || 0),
      commissionable_base: base,
      deposit_release_percent: depositPercent,
      final_release_percent: finalPercent,
      status: status,
      effective_from: body.effective_from || (existing && existing.effective_from) || now,
      effective_to: body.effective_to || "",
      created_at: existing ? existing.created_at : now,
      updated_at: now,
      created_by: existing ? existing.created_by : admin.actor_id,
      updated_by: admin.actor_id,
      note: cleanString(body && body.note, 500)
    };
    if (existing) updateRowFields(SHEET_NAMES.commissionRules, existing._row, rule); else appendObject(SHEET_NAMES.commissionRules, rule);
    writeFinanceAudit("COMMISSION_RULE", rule.rule_id, existing ? "COMMISSION_RULE_UPDATED" : "COMMISSION_RULE_CREATED", existing ? existing.status : "", rule.status, rule.commission_value, "ADMIN", admin.actor_id, cleanString(body && body.reason, 500), { product_id: productId, collection: collection }, false, "");
    return { ok: true, rule: publicCommissionRule(rule) };
  });
}

function listFinanceAnomalies(includeQa) {
  ensureFinanceSheets();
  const anomalies = [];
  const wallets = sheetToObjects(SHEET_NAMES.walletAccounts).filter(function (wallet) { return includeQa || !isQaRecord(wallet); });
  wallets.forEach(function (wallet) {
    const projection = calculateWalletProjection(wallet.agent_id);
    ["pending_balance", "available_balance", "held_balance", "reserved_balance"].forEach(function (key) {
      if (Number(projection[key] || 0) < 0) {
        anomalies.push({ type: "NEGATIVE_BALANCE", agent_id: wallet.agent_id, bucket: key, amount: projection[key] });
      }
      if (Math.abs(Number(projection[key] || 0) - Number(wallet[key] || 0)) > 0.01) {
        anomalies.push({ type: "PROJECTION_MISMATCH", agent_id: wallet.agent_id, bucket: key, expected: projection[key], actual: Number(wallet[key] || 0) });
      }
    });
  });
  const keys = {};
  sheetToObjects(SHEET_NAMES.walletLedger).forEach(function (entry) {
    const key = cleanString(entry.idempotency_key, 220);
    if (!key) return;
    keys[key] = (keys[key] || 0) + 1;
  });
  Object.keys(keys).forEach(function (key) {
    if (keys[key] > 1) anomalies.push({ type: "DUPLICATE_IDEMPOTENCY_KEY", idempotency_key: key, count: keys[key] });
  });
  return anomalies;
}

function runFinanceIntegrityCheck(body) {
  const admin = financeAdminSession(body);
  if (!admin.ok) return admin;
  return { ok: true, anomalies: listFinanceAnomalies(booleanValue(body && body.include_qa)) };
}

function requestWithdraw(body) {
  return createWithdrawalRequest(body || {});
}

function updateWithdrawStatus(withdrawId, status) {
  const body = typeof withdrawId === "object" ? withdrawId : { withdrawal_id: withdrawId };
  const next = normalizeSalesStatus(status || (body && body.status));
  if (next === "PAID") return markWithdrawalPaid(body);
  if (next === "APPROVED") return approveWithdrawal(body);
  if (next === "REJECTED") return rejectWithdrawal(body);
  return financeError("INVALID_STATUS_TRANSITION", "Unsupported withdrawal status.");
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
