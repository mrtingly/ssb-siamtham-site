const SHEET_NAMES = {
  agents: "agents",
  income: "income",
  withdraws: "withdraws",
  bonus: "bonus",
  orders: "orders",
  customers: "customers",
  quotations: "quotations",
  orderStatusLogs: "order_status_logs",
  productCollections: "product_collections",
  productModels: "product_models",
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
  pricingAllocationVersions: "pricing_allocation_versions",
  accountingAccounts: "accounting_accounts",
  accountingJournals: "accounting_journals",
  accountingLedger: "accounting_ledger",
  companyRevenueLedger: "company_revenue_ledger",
  expenseAllocationLedger: "expense_allocation_ledger",
  vatLedger: "vat_ledger",
  accountingReconciliation: "accounting_reconciliation",
  accountingAuditLogs: "accounting_audit_logs",
  agentCompensationAgreements: "agent_compensation_agreements",
  agentCompensationTiers: "agent_compensation_tiers",
  teamCommissionAllocations: "team_commission_allocations",
  financeSettings: "finance_settings",
  organizationAreas: "organization_areas",
  organizationTeams: "organization_teams",
  organizationAssignments: "organization_assignments",
  organizationRoleHistory: "organization_role_history",
  organizationSnapshots: "organization_snapshots",
  salesTargets: "sales_targets",
  customerFollowups: "customer_followups",
  organizationAuditLogs: "organization_audit_logs",
  cmsContent: "cms_content",
  cmsLocalizations: "cms_content_localizations",
  cmsRevisions: "cms_revisions",
  cmsMedia: "cms_media",
  cmsPublicationJobs: "cms_publication_jobs",
  cmsAuditLogs: "cms_audit_logs",
  cmsSiteSettings: "cms_site_settings",
  cmsNavigation: "cms_navigation",
  spcCases: "spc_cases",
  spcCaseEvents: "spc_case_events",
  spcOfficers: "spc_officers",
  spcContactAttempts: "spc_contact_attempts",
  spcChecklistTemplates: "spc_checklist_templates",
  spcChecklistItems: "spc_checklist_items",
  spcChecklistInstances: "spc_checklist_instances",
  spcChecklistResults: "spc_checklist_results",
  spcOrganizations: "spc_organizations",
  spcVerificationHistory: "spc_verification_history",
  spcAuditLogs: "spc_audit_logs",
  spcSettings: "spc_settings",
  spcPermissions: "spc_permissions",
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

      case "listCollections":
        result = listCollections(e.parameter);
        break;

      case "getCollection":
        result = getCollection(e.parameter);
        break;

      case "listProductModels":
        result = listProductModels(e.parameter);
        break;

      case "getProductModel":
        result = getProductModel(e.parameter);
        break;

      case "listProductVariants":
      case "listProductOptions":
        result = listProductVariants(e.parameter);
        break;

      case "resolveProductConfiguration":
        result = resolveProductConfiguration(e.parameter);
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

      case "cmsPublicBundle":
        result = cmsPublicBundle(e.parameter);
        break;

      case "cmsPublicContent":
        result = cmsPublicContent(e.parameter);
        break;

      case "cmsPublicProducts":
        result = cmsPublicProducts(e.parameter);
        break;

      case "cmsPublicCollections":
        result = cmsPublicCollections(e.parameter);
        break;

      case "cmsPublicPromotions":
        result = cmsPublicPromotions(e.parameter);
        break;

      case "cmsPublicBanners":
        result = cmsPublicBanners(e.parameter);
        break;

      case "cmsPublicFaq":
        result = cmsPublicFaq(e.parameter);
        break;

      case "cmsPublicArticles":
        result = cmsPublicArticles(e.parameter);
        break;

      case "spcGetCasePublicStatus":
        result = spcGetCasePublicStatus(e.parameter);
        break;

      case "spcGetPublicOfficerVerification":
        result = spcGetPublicOfficerVerification(e.parameter);
        break;

      case "spcVerifyContactCode":
        result = spcVerifyContactCode(Object.assign({}, e.parameter, { consume: false }));
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
      case "getPricingAllocation":
      case "savePricingAllocationVersion":
      case "activatePricingVersion":
      case "listPricingVersions":
      case "validatePricingAllocation":
      case "runPricingIntegrityCheck":
      case "listChartOfAccounts":
      case "createAccountingAccount":
      case "updateAccountingAccount":
      case "listAccountingJournals":
      case "getAccountingJournal":
      case "listGeneralLedger":
      case "listVatLedger":
      case "listCompanyRevenue":
      case "listExpenseAllocations":
      case "runAccountingReconciliation":
      case "listAgentCompensationAgreements":
      case "createAgentCompensationAgreement":
      case "updateAgentCompensationAgreement":
      case "approveAgentCompensationAgreement":
      case "listTierPlans":
      case "createTierPlan":
      case "updateTierPlan":
      case "calculateOrderCompensation":
      case "listMyIncome":
      case "listTeamCommissionSummary":
      case "listTeamMemberIncome":
      case "listManagerCommission":
      case "postApprovedPaymentAccounting":
      case "reverseAccountingPosting":
      case "rebuildSafeProjection":
      case "runAccountingIntegrityCheck":
      case "getOrganizationDashboard":
      case "listOrganizationAreas":
      case "saveOrganizationArea":
      case "listOrganizationTeams":
      case "saveOrganizationTeam":
      case "assignAgentToTeam":
      case "assignManagerRole":
      case "listOrganizationAssignments":
      case "getTeamManagerDashboard":
      case "getAreaManagerDashboard":
      case "listScopedAgents":
      case "listScopedCustomers":
      case "listScopedOrders":
      case "saveSalesTarget":
      case "listSalesTargets":
      case "saveCustomerFollowup":
      case "completeCustomerFollowup":
      case "listCustomerFollowups":
      case "getOrganizationPerformance":
      case "runOrganizationIntegrityCheck":
      case "cmsAdminDashboard":
      case "cmsSaveContent":
      case "cmsPublishContent":
      case "cmsUnpublishContent":
      case "cmsScheduleContent":
      case "cmsRollbackRevision":
      case "cmsRegisterMedia":
      case "cmsSaveSiteSetting":
      case "cmsSaveNavigationItem":
      case "cmsIntegrityCheck":
      case "cmsListContentAdmin":
      case "cmsGetContentAdmin":
      case "cmsListRevisions":
      case "cmsListAuditLogs":
      case "spcCreateCase":
      case "spcAcknowledgeResult":
      case "spcOfficerDashboard":
      case "spcGetCaseDetail":
      case "spcAcceptCase":
      case "spcStartFirstCallback":
      case "spcCompleteFirstCallback":
      case "spcSubmitChecklistResult":
      case "spcAddCaseEvent":
      case "spcAddVerificationRecord":
      case "spcSetWaitingForAgency":
      case "spcScheduleFollowUp":
      case "spcPrepareResult":
      case "spcReportResult":
      case "spcSupervisorDashboard":
      case "spcAssignOfficer":
      case "spcReassignCase":
      case "spcReviewCase":
      case "spcEscalateCase":
      case "spcOverrideTransition":
      case "spcAdminDashboard":
      case "spcCreateOfficer":
      case "spcUpdateOfficer":
      case "spcManageChecklistTemplate":
      case "spcManageOrganization":
      case "spcViewAuditLogs":
      case "spcRunIntegrityCheck":
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

      case "listProducts":
        result = listProducts(body);
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

      case "createCollection":
        result = createCollection(body);
        break;

      case "updateCollection":
        result = updateCollection(body);
        break;

      case "setCollectionStatus":
        result = setCollectionStatus(body);
        break;

      case "createProductModel":
        result = createProductModel(body);
        break;

      case "updateProductModel":
        result = updateProductModel(body);
        break;

      case "setProductModelStatus":
        result = setProductModelStatus(body);
        break;

      case "createProductVariant":
        result = createProductVariant(body);
        break;

      case "updateProductVariant":
        result = updateProductVariant(body);
        break;

      case "setProductVariantStatus":
        result = setProductVariantStatus(body);
        break;

      case "saveSimpleProductModel":
        result = saveSimpleProductModel(body);
        break;

      case "listCollections":
        result = listCollections(body);
        break;

      case "getCollection":
        result = getCollection(body);
        break;

      case "listProductModels":
        result = listProductModels(body);
        break;

      case "getProductModel":
        result = getProductModel(body);
        break;

      case "listProductVariants":
      case "listProductOptions":
        result = listProductVariants(body);
        break;

      case "resolveProductConfiguration":
        result = resolveProductConfiguration(body);
        break;

      case "upsertPricing":
        result = upsertPricing(body);
        break;

      case "runProductIntegrityCheck":
        result = runProductIntegrityCheck(body);
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

      case "getPricingAllocation":
        result = getPricingAllocation(body);
        break;

      case "savePricingAllocationVersion":
        result = savePricingAllocationVersion(body);
        break;

      case "activatePricingVersion":
        result = activatePricingVersion(body);
        break;

      case "listPricingVersions":
        result = listPricingVersions(body);
        break;

      case "validatePricingAllocation":
        result = validatePricingAllocation(body);
        break;

      case "runPricingIntegrityCheck":
        result = runPricingIntegrityCheck(body);
        break;

      case "listChartOfAccounts":
        result = listChartOfAccounts(body);
        break;

      case "createAccountingAccount":
        result = createAccountingAccount(body);
        break;

      case "updateAccountingAccount":
        result = updateAccountingAccount(body);
        break;

      case "listAccountingJournals":
        result = listAccountingJournals(body);
        break;

      case "getAccountingJournal":
        result = getAccountingJournal(body);
        break;

      case "listGeneralLedger":
        result = listGeneralLedger(body);
        break;

      case "listVatLedger":
        result = listVatLedger(body);
        break;

      case "listCompanyRevenue":
        result = listCompanyRevenue(body);
        break;

      case "listExpenseAllocations":
        result = listExpenseAllocations(body);
        break;

      case "runAccountingReconciliation":
        result = runAccountingReconciliation(body);
        break;

      case "listAgentCompensationAgreements":
        result = listAgentCompensationAgreements(body);
        break;

      case "createAgentCompensationAgreement":
        result = createAgentCompensationAgreement(body);
        break;

      case "updateAgentCompensationAgreement":
        result = updateAgentCompensationAgreement(body);
        break;

      case "approveAgentCompensationAgreement":
        result = approveAgentCompensationAgreement(body);
        break;

      case "listTierPlans":
        result = listTierPlans(body);
        break;

      case "createTierPlan":
        result = createTierPlan(body);
        break;

      case "updateTierPlan":
        result = updateTierPlan(body);
        break;

      case "calculateOrderCompensation":
        result = calculateOrderCompensation(body);
        break;

      case "listMyIncome":
        result = listMyIncome(body);
        break;

      case "listTeamCommissionSummary":
        result = listTeamCommissionSummary(body);
        break;

      case "listTeamMemberIncome":
        result = listTeamMemberIncome(body);
        break;

      case "listManagerCommission":
        result = listManagerCommission(body);
        break;

      case "postApprovedPaymentAccounting":
        result = postApprovedPaymentAccounting(body);
        break;

      case "reverseAccountingPosting":
        result = reverseAccountingPosting(body);
        break;

      case "rebuildSafeProjection":
        result = rebuildSafeProjection(body);
        break;

      case "runAccountingIntegrityCheck":
        result = runAccountingReconciliation(body);
        break;

      case "getOrganizationDashboard":
        result = getOrganizationDashboard(body);
        break;

      case "listOrganizationAreas":
        result = listOrganizationAreas(body);
        break;

      case "saveOrganizationArea":
        result = saveOrganizationArea(body);
        break;

      case "listOrganizationTeams":
        result = listOrganizationTeams(body);
        break;

      case "saveOrganizationTeam":
        result = saveOrganizationTeam(body);
        break;

      case "assignAgentToTeam":
        result = assignAgentToTeam(body);
        break;

      case "assignManagerRole":
        result = assignManagerRole(body);
        break;

      case "listOrganizationAssignments":
        result = listOrganizationAssignments(body);
        break;

      case "getTeamManagerDashboard":
        result = getTeamManagerDashboard(body);
        break;

      case "getAreaManagerDashboard":
        result = getAreaManagerDashboard(body);
        break;

      case "listScopedAgents":
        result = listScopedAgents(body);
        break;

      case "listScopedCustomers":
        result = listScopedCustomers(body);
        break;

      case "listScopedOrders":
        result = listScopedOrders(body);
        break;

      case "saveSalesTarget":
        result = saveSalesTarget(body);
        break;

      case "listSalesTargets":
        result = listSalesTargets(body);
        break;

      case "saveCustomerFollowup":
        result = saveCustomerFollowup(body);
        break;

      case "completeCustomerFollowup":
        result = completeCustomerFollowup(body);
        break;

      case "listCustomerFollowups":
        result = listCustomerFollowups(body);
        break;

      case "getOrganizationPerformance":
        result = getOrganizationPerformance(body);
        break;

      case "runOrganizationIntegrityCheck":
        result = runOrganizationIntegrityCheck(body);
        break;

      case "cmsAdminDashboard":
        result = cmsAdminDashboard(body);
        break;

      case "cmsSaveContent":
        result = cmsSaveContent(body);
        break;

      case "cmsPublishContent":
        result = cmsPublishContent(body);
        break;

      case "cmsUnpublishContent":
        result = cmsUnpublishContent(body);
        break;

      case "cmsScheduleContent":
        result = cmsScheduleContent(body);
        break;

      case "cmsRollbackRevision":
        result = cmsRollbackRevision(body);
        break;

      case "cmsRegisterMedia":
        result = cmsRegisterMedia(body);
        break;

      case "cmsSaveSiteSetting":
        result = cmsSaveSiteSetting(body);
        break;

      case "cmsSaveNavigationItem":
        result = cmsSaveNavigationItem(body);
        break;

      case "cmsIntegrityCheck":
        result = cmsIntegrityCheck(body);
        break;

      case "cmsListContentAdmin":
        result = cmsListContentAdmin(body);
        break;

      case "cmsGetContentAdmin":
        result = cmsGetContentAdmin(body);
        break;

      case "cmsListRevisions":
        result = cmsListRevisions(body);
        break;

      case "cmsListAuditLogs":
        result = cmsListAuditLogs(body);
        break;

      case "spcCreateCase":
        result = spcCreateCase(body);
        break;

      case "spcGetCasePublicStatus":
        result = spcGetCasePublicStatus(body);
        break;

      case "spcGetPublicOfficerVerification":
        result = spcGetPublicOfficerVerification(body);
        break;

      case "spcVerifyContactCode":
        result = spcVerifyContactCode(body);
        break;

      case "spcAcknowledgeResult":
        result = spcAcknowledgeResult(body);
        break;

      case "spcOfficerDashboard":
        result = spcOfficerDashboard(body);
        break;

      case "spcGetCaseDetail":
        result = spcGetCaseDetail(body);
        break;

      case "spcAcceptCase":
        result = spcAcceptCase(body);
        break;

      case "spcStartFirstCallback":
        result = spcStartFirstCallback(body);
        break;

      case "spcCompleteFirstCallback":
        result = spcCompleteFirstCallback(body);
        break;

      case "spcSubmitChecklistResult":
        result = spcSubmitChecklistResult(body);
        break;

      case "spcAddCaseEvent":
        result = spcAddCaseEvent(body);
        break;

      case "spcAddVerificationRecord":
        result = spcAddVerificationRecord(body);
        break;

      case "spcSetWaitingForAgency":
        result = spcSetWaitingForAgency(body);
        break;

      case "spcScheduleFollowUp":
        result = spcScheduleFollowUp(body);
        break;

      case "spcPrepareResult":
        result = spcPrepareResult(body);
        break;

      case "spcReportResult":
        result = spcReportResult(body);
        break;

      case "spcSupervisorDashboard":
        result = spcSupervisorDashboard(body);
        break;

      case "spcAssignOfficer":
        result = spcAssignOfficer(body);
        break;

      case "spcReassignCase":
        result = spcReassignCase(body);
        break;

      case "spcReviewCase":
        result = spcReviewCase(body);
        break;

      case "spcEscalateCase":
        result = spcEscalateCase(body);
        break;

      case "spcOverrideTransition":
        result = spcOverrideTransition(body);
        break;

      case "spcAdminDashboard":
        result = spcAdminDashboard(body);
        break;

      case "spcCreateOfficer":
        result = spcCreateOfficer(body);
        break;

      case "spcUpdateOfficer":
        result = spcUpdateOfficer(body);
        break;

      case "spcManageChecklistTemplate":
        result = spcManageChecklistTemplate(body);
        break;

      case "spcManageOrganization":
        result = spcManageOrganization(body);
        break;

      case "spcViewAuditLogs":
        result = spcViewAuditLogs(body);
        break;

      case "spcRunIntegrityCheck":
        result = spcRunIntegrityCheck(body);
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
        obj.collection_id,
        obj.model_id,
        obj.product_id,
        obj.pricing_id,
        obj.policy_id,
        obj.payment_id,
        obj.rule_id,
        obj.commission_id,
        obj.wallet_id,
        obj.ledger_id,
        obj.withdrawal_id,
        obj.pricing_version_id,
        obj.account_id,
        obj.journal_id,
        obj.ledger_entry_id,
        obj.company_revenue_id,
        obj.expense_allocation_id,
        obj.vat_ledger_id,
        obj.reconciliation_id,
        obj.accounting_audit_id,
        obj.agreement_id,
        obj.tier_plan_id,
        obj.allocation_id,
        obj.setting_id,
        obj.log_id,
        obj.area_id,
        obj.team_id,
        obj.assignment_id,
        obj.role_history_id,
        obj.snapshot_id,
        obj.target_id,
        obj.followup_id,
        obj.content_id,
        obj.localization_id,
        obj.revision_id,
        obj.media_id,
        obj.job_id,
        obj.setting_id,
        obj.nav_id,
        obj.case_id,
        obj.event_id,
        obj.officer_id,
        obj.contact_attempt_id,
        obj.template_id,
        obj.checklist_item_id,
        obj.checklist_instance_id,
        obj.result_id,
        obj.organization_id,
        obj.verification_id,
        obj.permission_id,
        obj.spc_audit_id,
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
  const action =
    e &&
    e.parameter &&
    e.parameter.action
      ? String(e.parameter.action).trim()
      : "";
  let callback =
    e &&
    e.parameter &&
    e.parameter.callback
      ? String(e.parameter.callback).trim()
      : "";

  if (action.indexOf("spc") === 0) {
    callback = "";
  }

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
  "updated_at",
  "is_test",
  "qa_batch"
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
  "quantity",
  "pricing_version_id",
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
  "pricing_snapshot_json",
  "accounting_snapshot_json",
  "compensation_snapshot_json",
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
  "rejected_at",
  "is_test",
  "qa_batch"
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
  "quantity",
  "pricing_version_id",
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
  "pricing_snapshot_json",
  "accounting_snapshot_json",
  "compensation_snapshot_json",
  "timeline_json",
  "created_at",
  "updated_at",
  "approved_at",
  "paid_at",
  "installing_at",
  "completed_at",
  "cancelled_at",
  "is_test",
  "qa_batch"
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
  "created_at",
  "is_test",
  "qa_batch"
];

const PRODUCT_HEADERS = [
  "product_id",
  "collection",
  "brand",
  "model",
  "model_id",
  "storage",
  "memory_label",
  "color",
  "color_code",
  "color_hex",
  "sku",
  "image_url",
  "asset_key",
  "stock_quantity",
  "stock_status",
  "display_order",
  "status",
  "created_at",
  "updated_at",
  "created_by",
  "updated_by",
  "is_test",
  "qa_batch"
];

const PRODUCT_COLLECTION_HEADERS = [
  "collection_id",
  "collection_name",
  "short_name",
  "brand",
  "series",
  "description",
  "theme_key",
  "image_url",
  "asset_key",
  "display_order",
  "status",
  "created_at",
  "updated_at",
  "created_by",
  "updated_by",
  "is_test",
  "qa_batch"
];

const PRODUCT_MODEL_HEADERS = [
  "model_id",
  "collection_id",
  "collection_name",
  "brand",
  "series",
  "model_name",
  "model_code",
  "description",
  "image_url",
  "asset_key",
  "display_order",
  "status",
  "created_at",
  "updated_at",
  "created_by",
  "updated_by",
  "is_test",
  "qa_batch"
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
  "updated_at",
  "is_test",
  "qa_batch"
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

const PRICING_ALLOCATION_VERSION_HEADERS = [
  "pricing_version_id",
  "product_id",
  "sku",
  "effective_from",
  "effective_until",
  "status",
  "device_price",
  "setup_fee",
  "safety_book_cost",
  "fingerprint_cost",
  "signal_shield_cost",
  "assembly_cost",
  "annual_sim_cost",
  "operation_cost",
  "spc_cost",
  "central_commission_pool",
  "company_revenue_allocation",
  "selling_price_before_vat",
  "vat_rate",
  "vat_amount",
  "selling_price_including_vat",
  "deposit_policy_id",
  "created_by",
  "approved_by",
  "change_reason",
  "created_at",
  "updated_at",
  "is_test",
  "qa_batch"
];

const ACCOUNTING_ACCOUNT_HEADERS = [
  "account_id",
  "account_code",
  "account_name",
  "account_type",
  "normal_balance",
  "status",
  "created_at",
  "updated_at",
  "created_by"
];

const ACCOUNTING_JOURNAL_HEADERS = [
  "journal_id",
  "journal_type",
  "source_type",
  "source_id",
  "order_id",
  "payment_id",
  "status",
  "posted_at",
  "created_by",
  "note",
  "idempotency_key",
  "is_test",
  "qa_batch"
];

const ACCOUNTING_LEDGER_HEADERS = [
  "ledger_entry_id",
  "journal_id",
  "account_code",
  "account_name",
  "direction",
  "amount",
  "currency",
  "order_id",
  "payment_id",
  "product_id",
  "sku",
  "pricing_version_id",
  "component",
  "idempotency_key",
  "status",
  "created_at",
  "created_by",
  "is_test",
  "qa_batch"
];

const COMPANY_REVENUE_LEDGER_HEADERS = [
  "company_revenue_id",
  "order_id",
  "payment_id",
  "pricing_version_id",
  "component",
  "amount",
  "status",
  "created_at",
  "idempotency_key",
  "is_test",
  "qa_batch"
];

const EXPENSE_ALLOCATION_LEDGER_HEADERS = [
  "expense_allocation_id",
  "order_id",
  "payment_id",
  "pricing_version_id",
  "component",
  "amount",
  "status",
  "created_at",
  "idempotency_key",
  "is_test",
  "qa_batch"
];

const VAT_LEDGER_HEADERS = [
  "vat_ledger_id",
  "order_id",
  "payment_id",
  "pricing_version_id",
  "vat_rate",
  "vat_amount",
  "status",
  "created_at",
  "idempotency_key",
  "is_test",
  "qa_batch"
];

const ACCOUNTING_RECONCILIATION_HEADERS = [
  "reconciliation_id",
  "run_at",
  "status",
  "issue_type",
  "severity",
  "entity_type",
  "entity_id",
  "message",
  "metadata_json",
  "created_by",
  "is_test",
  "qa_batch"
];

const ACCOUNTING_AUDIT_LOG_HEADERS = [
  "accounting_audit_id",
  "entity_type",
  "entity_id",
  "action",
  "status",
  "actor_id",
  "message",
  "metadata_json",
  "created_at",
  "is_test",
  "qa_batch"
];

const AGENT_COMPENSATION_AGREEMENT_HEADERS = [
  "agreement_id",
  "agent_id",
  "team_manager_id",
  "team_id",
  "collection",
  "model",
  "sku",
  "agreement_type",
  "value",
  "tier_plan_id",
  "status",
  "effective_from",
  "effective_until",
  "approved_by",
  "created_by",
  "change_reason",
  "created_at",
  "updated_at",
  "is_test",
  "qa_batch"
];

const AGENT_COMPENSATION_TIER_HEADERS = [
  "tier_plan_id",
  "tier_name",
  "tier_type",
  "min_quantity",
  "max_quantity",
  "min_sales_amount",
  "max_sales_amount",
  "commission_type",
  "commission_value",
  "status",
  "effective_from",
  "effective_until",
  "created_by",
  "approved_by",
  "created_at",
  "updated_at",
  "is_test",
  "qa_batch"
];

const TEAM_COMMISSION_ALLOCATION_HEADERS = [
  "allocation_id",
  "order_id",
  "payment_id",
  "agent_id",
  "team_manager_id",
  "team_id",
  "pricing_version_id",
  "central_commission_pool",
  "member_commission",
  "manager_retained_commission",
  "sim_income",
  "spc_income",
  "status",
  "created_at",
  "idempotency_key",
  "is_test",
  "qa_batch"
];

const FINANCE_SETTING_HEADERS = [
  "setting_id",
  "setting_key",
  "setting_value",
  "status",
  "created_at",
  "updated_at",
  "updated_by"
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

const ORGANIZATION_AREA_HEADERS = [
  "area_id",
  "area_code",
  "area_name",
  "description",
  "status",
  "created_at",
  "updated_at",
  "created_by",
  "updated_by",
  "is_test",
  "qa_batch"
];

const ORGANIZATION_TEAM_HEADERS = [
  "team_id",
  "team_code",
  "team_name",
  "area_id",
  "primary_team_manager_id",
  "description",
  "status",
  "created_at",
  "updated_at",
  "created_by",
  "updated_by",
  "is_test",
  "qa_batch"
];

const ORGANIZATION_ASSIGNMENT_HEADERS = [
  "assignment_id",
  "assignment_type",
  "subject_agent_id",
  "role",
  "area_id",
  "team_id",
  "status",
  "effective_from",
  "effective_to",
  "created_at",
  "updated_at",
  "created_by",
  "updated_by",
  "reason",
  "is_test",
  "qa_batch"
];

const ORGANIZATION_ROLE_HISTORY_HEADERS = [
  "role_history_id",
  "agent_id",
  "previous_role",
  "new_role",
  "sales_enabled",
  "effective_at",
  "created_at",
  "created_by",
  "reason",
  "is_test",
  "qa_batch"
];

const ORGANIZATION_SNAPSHOT_HEADERS = [
  "snapshot_id",
  "entity_type",
  "entity_id",
  "sales_owner_agent_id",
  "area_id",
  "area_name",
  "team_id",
  "team_name",
  "team_manager_id",
  "area_manager_id",
  "snapshot_at",
  "source",
  "is_test",
  "qa_batch"
];

const SALES_TARGET_HEADERS = [
  "target_id",
  "target_type",
  "agent_id",
  "team_id",
  "area_id",
  "period",
  "target_orders",
  "target_revenue",
  "status",
  "created_at",
  "updated_at",
  "created_by",
  "updated_by",
  "is_test",
  "qa_batch"
];

const CUSTOMER_FOLLOWUP_HEADERS = [
  "followup_id",
  "customer_id",
  "order_id",
  "owner_agent_id",
  "team_id",
  "area_id",
  "title",
  "note",
  "due_at",
  "status",
  "completed_at",
  "created_at",
  "updated_at",
  "created_by",
  "updated_by",
  "is_test",
  "qa_batch"
];

const ORGANIZATION_AUDIT_LOG_HEADERS = [
  "log_id",
  "entity_type",
  "entity_id",
  "action",
  "actor_role",
  "actor_id",
  "previous_value_json",
  "new_value_json",
  "message",
  "created_at",
  "is_test",
  "qa_batch"
];

const CMS_CONTENT_HEADERS = [
  "content_id",
  "content_type",
  "content_key",
  "slug",
  "parent_id",
  "related_entity_type",
  "related_entity_id",
  "status",
  "visibility",
  "display_order",
  "featured",
  "publish_at",
  "unpublish_at",
  "current_revision",
  "price_display_policy",
  "availability_message",
  "audience",
  "placement",
  "metadata_json",
  "created_at",
  "updated_at",
  "created_by",
  "updated_by",
  "is_test",
  "qa_batch"
];

const CMS_LOCALIZATION_HEADERS = [
  "localization_id",
  "content_id",
  "locale",
  "title",
  "subtitle",
  "summary",
  "body",
  "cta_label",
  "cta_url",
  "seo_title",
  "seo_description",
  "seo_keywords",
  "image_alt",
  "metadata_json",
  "created_at",
  "updated_at"
];

const CMS_REVISION_HEADERS = [
  "revision_id",
  "content_id",
  "revision_number",
  "snapshot_json",
  "change_summary",
  "created_by",
  "created_at",
  "status",
  "is_test",
  "qa_batch"
];

const CMS_MEDIA_HEADERS = [
  "media_id",
  "media_type",
  "source_type",
  "file_name",
  "public_url",
  "storage_reference",
  "mime_type",
  "file_size",
  "width",
  "height",
  "alt_text_th",
  "alt_text_en",
  "checksum",
  "status",
  "created_by",
  "created_at",
  "updated_at",
  "is_test",
  "qa_batch"
];

const CMS_PUBLICATION_JOB_HEADERS = [
  "job_id",
  "content_id",
  "action",
  "scheduled_at",
  "executed_at",
  "status",
  "attempt_count",
  "last_error",
  "created_by",
  "created_at",
  "is_test",
  "qa_batch"
];

const CMS_AUDIT_LOG_HEADERS = [
  "log_id",
  "entity_type",
  "entity_id",
  "action",
  "actor_id",
  "previous_value_json",
  "new_value_json",
  "message",
  "created_at",
  "is_test",
  "qa_batch"
];

const CMS_SITE_SETTING_HEADERS = [
  "setting_id",
  "setting_key",
  "setting_value",
  "locale",
  "status",
  "updated_at",
  "updated_by",
  "is_test",
  "qa_batch"
];

const CMS_NAVIGATION_HEADERS = [
  "nav_id",
  "label_th",
  "label_en",
  "href",
  "placement",
  "display_order",
  "status",
  "audience",
  "created_at",
  "updated_at",
  "created_by",
  "updated_by",
  "is_test",
  "qa_batch"
];

const SPC_CASE_HEADERS = [
  "case_id",
  "public_case_token",
  "customer_name",
  "customer_phone",
  "customer_email",
  "claimed_organization",
  "claimed_person",
  "incident_category",
  "incident_description",
  "risk_level",
  "transaction_in_progress",
  "amount_involved",
  "source",
  "status",
  "assigned_officer_id",
  "supervisor_id",
  "accepted_at",
  "sla_started_at",
  "first_callback_due_at",
  "first_callback_started_at",
  "first_callback_completed_at",
  "first_callback_sla_status",
  "time_barrier_given_at",
  "result_type",
  "result_summary",
  "result_reported_at",
  "customer_acknowledged_at",
  "closed_at",
  "created_at",
  "updated_at",
  "is_test",
  "qa_batch"
];

const SPC_CASE_EVENT_HEADERS = [
  "event_id",
  "case_id",
  "event_type",
  "from_status",
  "to_status",
  "actor_id",
  "actor_role",
  "officer_id",
  "comment",
  "evidence_json",
  "created_at"
];

const SPC_OFFICER_HEADERS = [
  "officer_id",
  "agent_id",
  "admin_id",
  "officer_name",
  "photo_url",
  "department",
  "role",
  "status",
  "official_profile_url",
  "valid_from",
  "valid_until",
  "created_at",
  "updated_at",
  "created_by",
  "is_test",
  "qa_batch"
];

const SPC_CONTACT_ATTEMPT_HEADERS = [
  "contact_attempt_id",
  "case_id",
  "officer_id",
  "contact_method",
  "verification_code",
  "issued_at",
  "expires_at",
  "used_at",
  "status",
  "created_at",
  "updated_at"
];

const SPC_CHECKLIST_TEMPLATE_HEADERS = [
  "template_id",
  "name",
  "applicable_state",
  "incident_category",
  "version",
  "status",
  "created_at",
  "updated_at"
];

const SPC_CHECKLIST_ITEM_HEADERS = [
  "checklist_item_id",
  "template_id",
  "sequence",
  "label",
  "field_type",
  "required",
  "requires_evidence",
  "blocking",
  "validation_rule",
  "status"
];

const SPC_CHECKLIST_INSTANCE_HEADERS = [
  "checklist_instance_id",
  "case_id",
  "template_id",
  "template_version",
  "applicable_state",
  "status",
  "created_at",
  "updated_at"
];

const SPC_CHECKLIST_RESULT_HEADERS = [
  "result_id",
  "checklist_instance_id",
  "case_id",
  "checklist_item_id",
  "value",
  "evidence_json",
  "completed_by",
  "completed_at",
  "updated_at"
];

const SPC_ORGANIZATION_HEADERS = [
  "organization_id",
  "organization_name",
  "organization_type",
  "official_contact",
  "official_url",
  "status",
  "created_at",
  "updated_at",
  "created_by"
];

const SPC_VERIFICATION_HISTORY_HEADERS = [
  "verification_id",
  "case_id",
  "organization_id",
  "organization_name",
  "contact_method",
  "contact_reference",
  "verification_action",
  "verification_result",
  "evidence_json",
  "recorded_by",
  "recorded_at"
];

const SPC_AUDIT_LOG_HEADERS = [
  "spc_audit_id",
  "entity_type",
  "entity_id",
  "action",
  "actor_id",
  "actor_role",
  "officer_id",
  "customer_id",
  "previous_state",
  "current_state",
  "request_id",
  "browser",
  "ip_or_unavailable",
  "evidence_json",
  "attachment_json",
  "comment",
  "created_at"
];

const SPC_SETTING_HEADERS = [
  "setting_id",
  "setting_key",
  "setting_value",
  "status",
  "updated_at",
  "updated_by"
];

const SPC_PERMISSION_HEADERS = [
  "permission_id",
  "actor_id",
  "actor_type",
  "officer_id",
  "role",
  "status",
  "created_at",
  "updated_at",
  "created_by"
];

const SPC_STATUS = {
  NEW: "NEW",
  ACCEPTED: "ACCEPTED",
  FIRST_CALLBACK_IN_PROGRESS: "FIRST_CALLBACK_IN_PROGRESS",
  FIRST_CALLBACK_COMPLETED: "FIRST_CALLBACK_COMPLETED",
  VERIFYING: "VERIFYING",
  WAITING_FOR_AGENCY: "WAITING_FOR_AGENCY",
  FOLLOW_UP_REQUIRED: "FOLLOW_UP_REQUIRED",
  READY_TO_REPORT: "READY_TO_REPORT",
  RESULT_REPORTED: "RESULT_REPORTED",
  CUSTOMER_ACKNOWLEDGED: "CUSTOMER_ACKNOWLEDGED",
  CLOSED: "CLOSED",
  ESCALATED: "ESCALATED",
  CANCELLED: "CANCELLED"
};

const SPC_ROLES = {
  CUSTOMER: "CUSTOMER",
  OFFICER: "OFFICER",
  SUPERVISOR: "SUPERVISOR",
  ADMIN: "ADMIN"
};

const SPC_RESULT_TYPES = {
  CONFIRMED_FALSE: "CONFIRMED_FALSE",
  CONFIRMED_TRUE: "CONFIRMED_TRUE",
  UNABLE_TO_VERIFY: "UNABLE_TO_VERIFY",
  PARTIALLY_VERIFIED: "PARTIALLY_VERIFIED"
};

const SPC_EVENT_TYPES = {
  CASE_CREATED: "CASE_CREATED",
  CASE_ACCEPTED: "CASE_ACCEPTED",
  OFFICER_ASSIGNED: "OFFICER_ASSIGNED",
  FIRST_CALLBACK_STARTED: "FIRST_CALLBACK_STARTED",
  FIRST_CALLBACK_COMPLETED: "FIRST_CALLBACK_COMPLETED",
  TIME_BARRIER_GIVEN: "TIME_BARRIER_GIVEN",
  VERIFICATION_STARTED: "VERIFICATION_STARTED",
  AGENCY_CONTACT_ATTEMPTED: "AGENCY_CONTACT_ATTEMPTED",
  AGENCY_RESPONSE_RECEIVED: "AGENCY_RESPONSE_RECEIVED",
  FOLLOW_UP_SCHEDULED: "FOLLOW_UP_SCHEDULED",
  RESULT_PREPARED: "RESULT_PREPARED",
  RESULT_REPORTED: "RESULT_REPORTED",
  CUSTOMER_ACKNOWLEDGED: "CUSTOMER_ACKNOWLEDGED",
  CASE_CLOSED: "CASE_CLOSED",
  CASE_ESCALATED: "CASE_ESCALATED",
  CASE_CANCELLED: "CASE_CANCELLED",
  SUPERVISOR_OVERRIDE: "SUPERVISOR_OVERRIDE"
};

const SPC_TRANSITIONS = {
  NEW: ["ACCEPTED", "CANCELLED", "ESCALATED"],
  ACCEPTED: ["FIRST_CALLBACK_IN_PROGRESS", "CANCELLED", "ESCALATED"],
  FIRST_CALLBACK_IN_PROGRESS: ["FIRST_CALLBACK_COMPLETED", "CANCELLED", "ESCALATED"],
  FIRST_CALLBACK_COMPLETED: ["VERIFYING", "CANCELLED", "ESCALATED"],
  VERIFYING: ["WAITING_FOR_AGENCY", "READY_TO_REPORT", "CANCELLED", "ESCALATED"],
  WAITING_FOR_AGENCY: ["FOLLOW_UP_REQUIRED", "READY_TO_REPORT", "CANCELLED", "ESCALATED"],
  FOLLOW_UP_REQUIRED: ["VERIFYING", "WAITING_FOR_AGENCY", "READY_TO_REPORT", "CANCELLED", "ESCALATED"],
  READY_TO_REPORT: ["RESULT_REPORTED", "CANCELLED", "ESCALATED"],
  RESULT_REPORTED: ["CUSTOMER_ACKNOWLEDGED", "ESCALATED"],
  CUSTOMER_ACKNOWLEDGED: ["CLOSED"],
  ESCALATED: ["VERIFYING", "WAITING_FOR_AGENCY", "READY_TO_REPORT", "CANCELLED"],
  CANCELLED: [],
  CLOSED: []
};

const SPC_ACTIVE_STATUSES = [
  SPC_STATUS.NEW,
  SPC_STATUS.ACCEPTED,
  SPC_STATUS.FIRST_CALLBACK_IN_PROGRESS,
  SPC_STATUS.FIRST_CALLBACK_COMPLETED,
  SPC_STATUS.VERIFYING,
  SPC_STATUS.WAITING_FOR_AGENCY,
  SPC_STATUS.FOLLOW_UP_REQUIRED,
  SPC_STATUS.READY_TO_REPORT,
  SPC_STATUS.RESULT_REPORTED,
  SPC_STATUS.CUSTOMER_ACKNOWLEDGED,
  SPC_STATUS.ESCALATED
];

const SPC_PROHIBITED_PATTERN = /\b(otp|pin|password|passcode|cvv|banking password|screen sharing|remote control|anydesk|teamviewer|quick support|install app|money transfer|โอนเงิน|รหัสผ่าน|รหัส otp|รหัสโอทีพี|เลข cvv|แชร์หน้าจอ|ควบคุมเครื่อง|ติดตั้งแอป)\b/i;

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

const DEFAULT_SERVICE_FEE = 0;
const DEFAULT_VAT_RATE = 0.07;
const DEFAULT_DEPOSIT_PERCENT = 30;
const DEFAULT_SIM_INCOME = 500;
const DEFAULT_SPC_INCOME = 500;

const PRICING_ALLOCATION_COMPONENTS = [
  "device_price",
  "setup_fee",
  "safety_book_cost",
  "fingerprint_cost",
  "signal_shield_cost",
  "assembly_cost",
  "annual_sim_cost",
  "operation_cost",
  "spc_cost",
  "central_commission_pool",
  "company_revenue_allocation"
];

const ACCOUNTING_SEED_ACCOUNTS = [
  ["1000", "Cash / Bank", "ASSET", "DEBIT"],
  ["2000", "VAT Payable", "LIABILITY", "CREDIT"],
  ["3000", "Deferred Revenue", "LIABILITY", "CREDIT"],
  ["4000", "SSBMS Bundle Revenue", "REVENUE", "CREDIT"],
  ["4100", "Company Revenue Allocation", "REVENUE", "CREDIT"],
  ["5000", "Device Cost Allocation", "EXPENSE", "DEBIT"],
  ["5100", "Setup Cost Allocation", "EXPENSE", "DEBIT"],
  ["5200", "Safety Book Cost Allocation", "EXPENSE", "DEBIT"],
  ["5300", "SPC Cost Allocation", "EXPENSE", "DEBIT"],
  ["5400", "SIM Cost Allocation", "EXPENSE", "DEBIT"],
  ["5500", "Central Commission Pool", "EXPENSE", "DEBIT"],
  ["5600", "Agent SIM Income", "EXPENSE", "DEBIT"],
  ["5700", "Agent SPC Income", "EXPENSE", "DEBIT"],
  ["CUSTOMER_RECEIVABLE", "Customer Receivable", "ASSET", "DEBIT"],
  ["CASH_RECEIVED", "Cash Received", "ASSET", "DEBIT"],
  ["PAYMENT_CLEARING", "Payment Clearing", "ASSET", "DEBIT"],
  ["OUTPUT_VAT_PAYABLE", "Output VAT Payable", "LIABILITY", "CREDIT"],
  ["PRODUCT_DEVICE_ALLOCATION", "Product Device Allocation", "EXPENSE", "DEBIT"],
  ["SYSTEM_SETUP_ALLOCATION", "System Setup Allocation", "EXPENSE", "DEBIT"],
  ["SAFETY_BOOK_ALLOCATION", "Safety Book Allocation", "EXPENSE", "DEBIT"],
  ["FINGERPRINT_ALLOCATION", "Fingerprint Allocation", "EXPENSE", "DEBIT"],
  ["SIGNAL_PROTECTION_ALLOCATION", "Signal Protection Allocation", "EXPENSE", "DEBIT"],
  ["ASSEMBLY_ALLOCATION", "Assembly Allocation", "EXPENSE", "DEBIT"],
  ["ANNUAL_SIM_ALLOCATION", "Annual SIM Allocation", "EXPENSE", "DEBIT"],
  ["OPERATION_ALLOCATION", "Operation Allocation", "EXPENSE", "DEBIT"],
  ["SPC_ALLOCATION", "SPC Allocation", "EXPENSE", "DEBIT"],
  ["CENTRAL_COMMISSION_POOL", "Central Commission Pool", "EXPENSE", "DEBIT"],
  ["AGENT_SALES_COMMISSION", "Agent Sales Commission", "EXPENSE", "DEBIT"],
  ["TEAM_MANAGER_RETAINED_COMMISSION", "Team Manager Retained Commission", "EXPENSE", "DEBIT"],
  ["AGENT_SIM_INCOME", "Agent SIM Income", "EXPENSE", "DEBIT"],
  ["AGENT_SPC_INCOME", "Agent SPC Income", "EXPENSE", "DEBIT"],
  ["COMPANY_REVENUE_ALLOCATION", "Company Revenue Allocation", "REVENUE", "CREDIT"],
  ["SALES_BEFORE_VAT_CONTROL", "Sales Before VAT Control", "REVENUE", "CREDIT"],
  ["SALES_TOTAL_INCL_VAT_CONTROL", "Sales Total Incl VAT Control", "REVENUE", "CREDIT"]
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
  const username = String(body.username || body.agent_id || body.email || "").trim();
  const password = String(body.password || "");

  if (!username || !password) {
    return { ok: false, code: "MISSING_CREDENTIALS", message: "กรุณากรอกข้อมูลให้ครบ" };
  }

  const agents = sheetToObjects(SHEET_NAMES.agents);
  const normalizedUsername = username.toLowerCase();

  const user = agents.find(function (agent) {
    return (
      String(agent.agent_id || "").trim() === username ||
      String(agent.email || "").trim().toLowerCase() === normalizedUsername
    );
  });

  if (!user) {
    return { ok: false, code: "ACCOUNT_NOT_FOUND", message: "ไม่พบตัวแทน" };
  }

  if (String(user.password || "") !== password) {
    return { ok: false, code: "INVALID_PASSWORD", message: "รหัสผ่านไม่ถูกต้อง" };
  }

  const status = normalizeStatus(user.status);

  if (status === AGENT_STATUS.REJECTED) {
    return { ok: false, code: "ACCOUNT_REJECTED", message: "บัญชีนี้ไม่ได้รับการอนุมัติ", status: status };
  }

  if (status === AGENT_STATUS.SUSPENDED) {
    return { ok: false, code: "ACCOUNT_SUSPENDED", message: "บัญชีนี้ถูกระงับ กรุณาติดต่อบริษัท", status: status };
  }

  if (status === "INACTIVE") {
    return { ok: false, code: "ACCOUNT_INACTIVE", message: "บัญชีนี้ยังไม่พร้อมใช้งาน", status: status };
  }

  const nextPage = getNextPageByStatus(status);

  if (!nextPage) {
    return {
      ok: false,
      code: "INVALID_ACCOUNT_STATUS",
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

  const orgRole = normalizeOrgRole(user.role);
  if (status === AGENT_STATUS.APPROVED && orgRole === ORG_ROLE.TEAM_MANAGER) {
    response.next_page = "team-manager-dashboard.html";
  }
  if (status === AGENT_STATUS.APPROVED && orgRole === ORG_ROLE.AREA_MANAGER) {
    response.next_page = "area-manager-dashboard.html";
  }

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

  const organizationSnapshot = snapshotForAgent(agentId);
  agentResult.agent.organization = organizationSnapshot;

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
      latestWithdrawal: financeWithdrawals.length ? publicWithdrawal(financeWithdrawals[financeWithdrawals.length - 1]) : null,
      organizationTeamId: organizationSnapshot.team_id,
      organizationTeamName: organizationSnapshot.team_name,
      organizationAreaId: organizationSnapshot.area_id,
      organizationAreaName: organizationSnapshot.area_name
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
   SIAMTHAM PROTECTION CENTER PHASE 2
========================================================= */

function ensureSpcSheets() {
  const cacheKey = "SBOS_SPC_SHEETS_READY_P2";
  try {
    const cache = CacheService.getScriptCache();
    if (cache.get(cacheKey) === "1") return;
  } catch (error) {}

  getOrCreateSheet(SHEET_NAMES.spcCases, SPC_CASE_HEADERS);
  getOrCreateSheet(SHEET_NAMES.spcCaseEvents, SPC_CASE_EVENT_HEADERS);
  getOrCreateSheet(SHEET_NAMES.spcOfficers, SPC_OFFICER_HEADERS);
  getOrCreateSheet(SHEET_NAMES.spcContactAttempts, SPC_CONTACT_ATTEMPT_HEADERS);
  getOrCreateSheet(SHEET_NAMES.spcChecklistTemplates, SPC_CHECKLIST_TEMPLATE_HEADERS);
  getOrCreateSheet(SHEET_NAMES.spcChecklistItems, SPC_CHECKLIST_ITEM_HEADERS);
  getOrCreateSheet(SHEET_NAMES.spcChecklistInstances, SPC_CHECKLIST_INSTANCE_HEADERS);
  getOrCreateSheet(SHEET_NAMES.spcChecklistResults, SPC_CHECKLIST_RESULT_HEADERS);
  getOrCreateSheet(SHEET_NAMES.spcOrganizations, SPC_ORGANIZATION_HEADERS);
  getOrCreateSheet(SHEET_NAMES.spcVerificationHistory, SPC_VERIFICATION_HISTORY_HEADERS);
  getOrCreateSheet(SHEET_NAMES.spcAuditLogs, SPC_AUDIT_LOG_HEADERS);
  getOrCreateSheet(SHEET_NAMES.spcSettings, SPC_SETTING_HEADERS);
  getOrCreateSheet(SHEET_NAMES.spcPermissions, SPC_PERMISSION_HEADERS);
  seedSpcDefaults();

  try {
    CacheService.getScriptCache().put(cacheKey, "1", 21600);
  } catch (error) {}
}

function seedSpcDefaults() {
  const now = new Date();
  const settings = sheetToObjects(SHEET_NAMES.spcSettings);
  [
    { setting_key: "first_callback_sla_minutes", setting_value: "15" },
    { setting_key: "contact_code_ttl_minutes", setting_value: "15" }
  ].forEach(function (setting) {
    const exists = settings.some(function (row) {
      return cleanString(row.setting_key, 120) === setting.setting_key;
    });
    if (!exists) {
      appendObject(SHEET_NAMES.spcSettings, {
        setting_id: makeId("SPCSET"),
        setting_key: setting.setting_key,
        setting_value: setting.setting_value,
        status: "ACTIVE",
        updated_at: now,
        updated_by: "SYSTEM"
      });
    }
  });

  seedSpcChecklistTemplate("SPC-TPL-FIRST-CALLBACK-V1", "First Callback Checklist", SPC_STATUS.FIRST_CALLBACK_COMPLETED, [
    "customer contact attempted",
    "customer contact completed or outcome recorded",
    "officer identity verification provided",
    "customer informed of Time Barrier",
    "customer warned not to transact",
    "prohibited-data warning respected",
    "incident summary recorded",
    "missing information recorded",
    "next action explained"
  ]);
  seedSpcChecklistTemplate("SPC-TPL-READY-REPORT-V1", "Ready To Report Checklist", SPC_STATUS.READY_TO_REPORT, [
    "claimed organization recorded",
    "verification attempt recorded",
    "verification source recorded",
    "verification result recorded",
    "evidence references recorded",
    "unresolved facts recorded",
    "customer instruction prepared",
    "required supervisor review completed when applicable"
  ]);
}

function seedSpcChecklistTemplate(templateId, name, state, labels) {
  const now = new Date();
  const templates = sheetToObjects(SHEET_NAMES.spcChecklistTemplates);
  const templateExists = templates.some(function (template) {
    return cleanString(template.template_id, 120) === templateId;
  });

  if (!templateExists) {
    appendObject(SHEET_NAMES.spcChecklistTemplates, {
      template_id: templateId,
      name: name,
      applicable_state: state,
      incident_category: "GENERAL",
      version: 1,
      status: "ACTIVE",
      created_at: now,
      updated_at: now
    });
  }

  const items = sheetToObjects(SHEET_NAMES.spcChecklistItems);
  labels.forEach(function (label, index) {
    const exists = items.some(function (item) {
      return cleanString(item.template_id, 120) === templateId && Number(item.sequence || 0) === index + 1;
    });
    if (!exists) {
      appendObject(SHEET_NAMES.spcChecklistItems, {
        checklist_item_id: templateId + "-I" + String(index + 1),
        template_id: templateId,
        sequence: index + 1,
        label: label,
        field_type: "CHECKBOX",
        required: true,
        requires_evidence: false,
        blocking: true,
        validation_rule: "",
        status: "ACTIVE"
      });
    }
  });
}

function spcSettingNumber(key, fallback) {
  const row = sheetToObjects(SHEET_NAMES.spcSettings).find(function (setting) {
    return cleanString(setting.setting_key, 120) === key && cleanString(setting.status, 40).toUpperCase() === "ACTIVE";
  });
  const value = row ? Number(row.setting_value || fallback) : Number(fallback);
  return Number.isFinite(value) ? value : Number(fallback);
}

function spcNormalizeStatus(status) {
  const value = cleanString(status, 80).toUpperCase();
  return Object.keys(SPC_STATUS).map(function (key) { return SPC_STATUS[key]; }).indexOf(value) !== -1
    ? value
    : "";
}

function spcNormalizeRole(role) {
  const value = cleanString(role, 80).toUpperCase();
  return Object.keys(SPC_ROLES).map(function (key) { return SPC_ROLES[key]; }).indexOf(value) !== -1
    ? value
    : "";
}

function spcProhibitedWarning(text) {
  return SPC_PROHIBITED_PATTERN.test(String(text || ""));
}

function spcSafeText(value, maxLength) {
  return cleanString(value, maxLength || 1000)
    .replace(SPC_PROHIBITED_PATTERN, "[REDACTED_SENSITIVE_REQUEST]");
}

function spcCaseById(caseId) {
  const id = cleanString(caseId, 120);
  return sheetToObjects(SHEET_NAMES.spcCases).find(function (row) {
    return cleanString(row.case_id, 120) === id;
  }) || null;
}

function spcCaseByToken(token) {
  const publicToken = cleanString(token, 160);
  return sheetToObjects(SHEET_NAMES.spcCases).find(function (row) {
    return cleanString(row.public_case_token, 160) === publicToken;
  }) || null;
}

function spcOfficerById(officerId) {
  const id = cleanString(officerId, 120);
  return sheetToObjects(SHEET_NAMES.spcOfficers).find(function (officer) {
    return cleanString(officer.officer_id, 120) === id && cleanString(officer.status, 40).toUpperCase() === "ACTIVE";
  }) || null;
}

function spcOfficerByActor(actorId) {
  const id = cleanString(actorId, 120);
  return sheetToObjects(SHEET_NAMES.spcOfficers).find(function (officer) {
    return (
      cleanString(officer.agent_id, 120) === id ||
      cleanString(officer.admin_id, 120) === id ||
      cleanString(officer.officer_id, 120) === id
    ) && cleanString(officer.status, 40).toUpperCase() === "ACTIVE";
  }) || null;
}

function spcGenerateCaseId(now) {
  const year = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy");
  const prefix = "SPC-" + year + "-";
  const existing = sheetToObjects(SHEET_NAMES.spcCases).filter(function (item) {
    return cleanString(item.case_id, 80).indexOf(prefix) === 0;
  });
  return prefix + String(existing.length + 1).padStart(6, "0");
}

function spcPublicToken() {
  return "SPCT-" + Utilities.getUuid().replace(/-/g, "") + Utilities.getUuid().replace(/-/g, "").slice(0, 12);
}

function spcActor(body) {
  const admin = requireAdminActor(body || {});
  if (admin.ok) {
    const adminActorId = cleanString(admin.actor_id || (admin.user && admin.user.agent_id) || "ADMIN", 160);
    return {
      ok: true,
      actor_id: adminActorId,
      actor_role: SPC_ROLES.ADMIN,
      admin: admin.user,
      officer: spcOfficerByActor(adminActorId)
    };
  }

  const agent = requireAgentActor(body || {});
  if (!agent.ok) return agent;

  const actorId = cleanString(agent.agent.agent_id, 120);
  const permission = sheetToObjects(SHEET_NAMES.spcPermissions).find(function (row) {
    return cleanString(row.actor_id, 120) === actorId && cleanString(row.status, 40).toUpperCase() === "ACTIVE";
  });

  if (!permission) {
    return { ok: false, error: "SPC_FORBIDDEN", message: "No SPC permission." };
  }

  return {
    ok: true,
    actor_id: actorId,
    actor_role: spcNormalizeRole(permission.role),
    agent: agent.agent,
    permission: permission,
    officer: spcOfficerById(permission.officer_id) || spcOfficerByActor(actorId)
  };
}

function spcRequireRole(body, roles) {
  ensureSpcSheets();
  const actor = spcActor(body || {});
  if (!actor.ok) return actor;
  if (roles.indexOf(actor.actor_role) === -1) {
    return { ok: false, error: "SPC_FORBIDDEN", message: "SPC role not allowed." };
  }
  return actor;
}

function spcRequireAssigned(caseRow, actor) {
  if ([SPC_ROLES.ADMIN, SPC_ROLES.SUPERVISOR].indexOf(actor.actor_role) !== -1) return { ok: true };
  const officerId = actor.officer ? cleanString(actor.officer.officer_id, 120) : "";
  if (!officerId || cleanString(caseRow.assigned_officer_id, 120) !== officerId) {
    return { ok: false, error: "SPC_NOT_ASSIGNED", message: "Case is not assigned to this officer." };
  }
  return { ok: true };
}

function spcAudit(entityType, entityId, action, actor, previousState, currentState, comment, evidence) {
  appendObject(SHEET_NAMES.spcAuditLogs, {
    spc_audit_id: makeId("SPCAUD"),
    entity_type: entityType,
    entity_id: entityId,
    action: action,
    actor_id: actor && actor.actor_id ? actor.actor_id : "PUBLIC",
    actor_role: actor && actor.actor_role ? actor.actor_role : SPC_ROLES.CUSTOMER,
    officer_id: actor && actor.officer ? actor.officer.officer_id : "",
    customer_id: "",
    previous_state: previousState || "",
    current_state: currentState || "",
    request_id: makeId("REQ"),
    browser: cleanString(evidence && evidence.browser, 240),
    ip_or_unavailable: "UNAVAILABLE",
    evidence_json: JSON.stringify(evidence || {}),
    attachment_json: "[]",
    comment: cleanString(comment, 1000),
    created_at: new Date()
  });
}

function spcCaseEvent(caseId, eventType, fromStatus, toStatus, actor, comment, evidence) {
  appendObject(SHEET_NAMES.spcCaseEvents, {
    event_id: makeId("SPCEVT"),
    case_id: caseId,
    event_type: eventType,
    from_status: fromStatus || "",
    to_status: toStatus || "",
    actor_id: actor && actor.actor_id ? actor.actor_id : "PUBLIC",
    actor_role: actor && actor.actor_role ? actor.actor_role : SPC_ROLES.CUSTOMER,
    officer_id: actor && actor.officer ? actor.officer.officer_id : "",
    comment: cleanString(comment, 1000),
    evidence_json: JSON.stringify(evidence || {}),
    created_at: new Date()
  });
}

function spcCreateChecklistInstances(caseId) {
  const now = new Date();
  sheetToObjects(SHEET_NAMES.spcChecklistTemplates).forEach(function (template) {
    if (cleanString(template.status, 40).toUpperCase() !== "ACTIVE") return;
    appendObject(SHEET_NAMES.spcChecklistInstances, {
      checklist_instance_id: makeId("SPCCLI"),
      case_id: caseId,
      template_id: cleanString(template.template_id, 120),
      template_version: Number(template.version || 1),
      applicable_state: cleanString(template.applicable_state, 80),
      status: "ACTIVE",
      created_at: now,
      updated_at: now
    });
  });
}

function spcChecklistMissing(caseId, applicableState) {
  const instances = sheetToObjects(SHEET_NAMES.spcChecklistInstances).filter(function (instance) {
    return cleanString(instance.case_id, 120) === caseId &&
      cleanString(instance.applicable_state, 80) === applicableState &&
      cleanString(instance.status, 40).toUpperCase() === "ACTIVE";
  });
  const items = sheetToObjects(SHEET_NAMES.spcChecklistItems);
  const results = sheetToObjects(SHEET_NAMES.spcChecklistResults);
  const missing = [];
  instances.forEach(function (instance) {
    items.filter(function (item) {
      return cleanString(item.template_id, 120) === cleanString(instance.template_id, 120) &&
        booleanValue(item.required) &&
        booleanValue(item.blocking) &&
        cleanString(item.status, 40).toUpperCase() === "ACTIVE";
    }).forEach(function (item) {
      const completed = results.some(function (result) {
        return cleanString(result.case_id, 120) === caseId &&
          cleanString(result.checklist_instance_id, 120) === cleanString(instance.checklist_instance_id, 120) &&
          cleanString(result.checklist_item_id, 120) === cleanString(item.checklist_item_id, 160) &&
          String(result.value || "").trim() !== "";
      });
      if (!completed) missing.push(cleanString(item.label, 240));
    });
  });
  return missing;
}

function spcVerificationCount(caseId) {
  return sheetToObjects(SHEET_NAMES.spcVerificationHistory).filter(function (row) {
    return cleanString(row.case_id, 120) === caseId;
  }).length;
}

function spcValidateTransition(caseRow, toStatus, actor, options) {
  const fromStatus = spcNormalizeStatus(caseRow.status);
  const next = spcNormalizeStatus(toStatus);
  if (!fromStatus || !next || (SPC_TRANSITIONS[fromStatus] || []).indexOf(next) === -1) {
    return { ok: false, error: "SPC_INVALID_TRANSITION", message: "Invalid SPC state transition." };
  }
  if ([SPC_STATUS.CLOSED, SPC_STATUS.CANCELLED].indexOf(fromStatus) !== -1) {
    return { ok: false, error: "SPC_CASE_LOCKED", message: "Closed or cancelled case cannot be mutated." };
  }
  if (next === SPC_STATUS.FIRST_CALLBACK_COMPLETED) {
    const missingFirst = spcChecklistMissing(cleanString(caseRow.case_id, 120), SPC_STATUS.FIRST_CALLBACK_COMPLETED);
    if (missingFirst.length > 0) return { ok: false, error: "SPC_CHECKLIST_REQUIRED", message: "First callback checklist is incomplete.", missing: missingFirst };
  }
  if (next === SPC_STATUS.READY_TO_REPORT) {
    const missingReport = spcChecklistMissing(cleanString(caseRow.case_id, 120), SPC_STATUS.READY_TO_REPORT);
    if (missingReport.length > 0) return { ok: false, error: "SPC_CHECKLIST_REQUIRED", message: "Ready-to-report checklist is incomplete.", missing: missingReport };
    if (spcVerificationCount(cleanString(caseRow.case_id, 120)) < 1) return { ok: false, error: "SPC_VERIFICATION_REQUIRED", message: "Verification record is required." };
  }
  if (next === SPC_STATUS.CANCELLED && !cleanString(options && options.reason, 500)) {
    return { ok: false, error: "SPC_REASON_REQUIRED", message: "Cancellation requires a reason." };
  }
  if (next === SPC_STATUS.CLOSED && fromStatus !== SPC_STATUS.CUSTOMER_ACKNOWLEDGED) {
    return { ok: false, error: "SPC_RESULT_REQUIRED", message: "Case must be acknowledged before closing." };
  }
  return spcRequireAssigned(caseRow, actor);
}

function spcTransitionCase(body, toStatus, eventType, options) {
  ensureSpcSheets();
  const actor = spcRequireRole(body, [SPC_ROLES.OFFICER, SPC_ROLES.SUPERVISOR, SPC_ROLES.ADMIN]);
  if (!actor.ok) return actor;

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const caseRow = spcCaseById(body.case_id);
    if (!caseRow) return { ok: false, error: "SPC_CASE_NOT_FOUND", message: "Case not found." };
    const validation = spcValidateTransition(caseRow, toStatus, actor, options || {});
    if (!validation.ok) return validation;

    const now = new Date();
    const fromStatus = spcNormalizeStatus(caseRow.status);
    const fields = {
      status: toStatus,
      updated_at: now
    };
    if (toStatus === SPC_STATUS.FIRST_CALLBACK_IN_PROGRESS) fields.first_callback_started_at = now;
    if (toStatus === SPC_STATUS.FIRST_CALLBACK_COMPLETED) {
      fields.first_callback_completed_at = now;
      fields.time_barrier_given_at = now;
      fields.first_callback_sla_status = new Date(caseRow.first_callback_due_at).getTime() >= now.getTime() ? "ON_TIME" : "BREACHED";
    }
    if (toStatus === SPC_STATUS.RESULT_REPORTED) fields.result_reported_at = now;
    if (toStatus === SPC_STATUS.CUSTOMER_ACKNOWLEDGED) fields.customer_acknowledged_at = now;
    if (toStatus === SPC_STATUS.CLOSED) fields.closed_at = now;
    Object.keys((options && options.fields) || {}).forEach(function (key) {
      fields[key] = options.fields[key];
    });

    updateRowFields(SHEET_NAMES.spcCases, caseRow._row, fields);
    spcCaseEvent(caseRow.case_id, eventType, fromStatus, toStatus, actor, options && options.comment, options && options.evidence);
    spcAudit("SPC_CASE", caseRow.case_id, eventType, actor, fromStatus, toStatus, options && options.comment, options && options.evidence);
    return { ok: true, case_id: caseRow.case_id, from_status: fromStatus, status: toStatus };
  } finally {
    lock.releaseLock();
  }
}

function spcPublicCase(caseRow) {
  const officer = spcOfficerById(caseRow.assigned_officer_id);
  return {
    case_id: caseRow.case_id,
    customer_name: caseRow.customer_name,
    submitted_at: caseRow.created_at,
    status: caseRow.status,
    current_instruction: "Do not transfer money, disclose credentials, install apps, share screens, or follow suspicious instructions while SPC verifies the facts.",
    assigned_officer: officer ? spcPublicOfficer(officer) : null,
    result_type: caseRow.result_type || "",
    result_summary: caseRow.result_summary || "",
    result_reported_at: caseRow.result_reported_at || ""
  };
}

function spcPrivateCase(caseRow) {
  const clone = {};
  Object.keys(caseRow || {}).forEach(function (key) {
    if (key !== "_row" && key !== "public_case_token") clone[key] = caseRow[key];
  });
  clone.events = sheetToObjects(SHEET_NAMES.spcCaseEvents).filter(function (event) {
    return cleanString(event.case_id, 120) === cleanString(caseRow.case_id, 120);
  });
  clone.verifications = sheetToObjects(SHEET_NAMES.spcVerificationHistory).filter(function (item) {
    return cleanString(item.case_id, 120) === cleanString(caseRow.case_id, 120);
  });
  clone.checklists = spcCaseChecklistPayload(cleanString(caseRow.case_id, 120));
  return clone;
}

function spcPublicOfficer(officer) {
  return {
    officer_id: officer.officer_id,
    officer_name: officer.officer_name,
    photo_url: officer.photo_url,
    department: officer.department,
    official_profile_url: officer.official_profile_url,
    valid_from: officer.valid_from,
    valid_until: officer.valid_until,
    status: officer.status
  };
}

function spcCaseChecklistPayload(caseId) {
  const instances = sheetToObjects(SHEET_NAMES.spcChecklistInstances).filter(function (instance) {
    return cleanString(instance.case_id, 120) === caseId;
  });
  const items = sheetToObjects(SHEET_NAMES.spcChecklistItems);
  const results = sheetToObjects(SHEET_NAMES.spcChecklistResults);
  return instances.map(function (instance) {
    const instanceId = cleanString(instance.checklist_instance_id, 120);
    return {
      checklist_instance_id: instanceId,
      template_id: instance.template_id,
      applicable_state: instance.applicable_state,
      items: items.filter(function (item) {
        return cleanString(item.template_id, 120) === cleanString(instance.template_id, 120) &&
          cleanString(item.status, 40).toUpperCase() === "ACTIVE";
      }).map(function (item) {
        const result = results.find(function (row) {
          return cleanString(row.checklist_instance_id, 120) === instanceId &&
            cleanString(row.checklist_item_id, 160) === cleanString(item.checklist_item_id, 160);
        });
        return {
          checklist_item_id: item.checklist_item_id,
          sequence: Number(item.sequence || 0),
          label: item.label,
          field_type: item.field_type,
          required: booleanValue(item.required),
          requires_evidence: booleanValue(item.requires_evidence),
          blocking: booleanValue(item.blocking),
          value: result ? result.value : "",
          evidence_json: result ? result.evidence_json : ""
        };
      })
    };
  });
}

function spcCreateCase(body) {
  ensureSpcSheets();
  const required = requireFields(body || {}, ["customer_name", "customer_phone", "incident_description"]);
  if (!required.ok) return required;

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const now = new Date();
    const caseId = spcGenerateCaseId(now);
    const dueAt = new Date(now.getTime() + spcSettingNumber("first_callback_sla_minutes", 15) * 60000);
    const rawDescription = cleanString(body.incident_description, 3000);
    const warning = spcProhibitedWarning(rawDescription);
    appendObject(SHEET_NAMES.spcCases, {
      case_id: caseId,
      public_case_token: spcPublicToken(),
      customer_name: spcSafeText(body.customer_name, 160),
      customer_phone: spcSafeText(body.customer_phone, 80),
      customer_email: spcSafeText(body.customer_email, 160),
      claimed_organization: spcSafeText(body.claimed_organization, 180),
      claimed_person: spcSafeText(body.claimed_person, 180),
      incident_category: spcSafeText(body.incident_category || "GENERAL", 80),
      incident_description: spcSafeText(rawDescription, 3000),
      risk_level: spcSafeText(body.risk_level || "UNKNOWN", 80),
      transaction_in_progress: booleanValue(body.transaction_in_progress),
      amount_involved: Math.max(0, Number(body.amount_involved || 0)),
      source: spcSafeText(body.source || "WEB", 80),
      status: SPC_STATUS.NEW,
      assigned_officer_id: "",
      supervisor_id: "",
      accepted_at: "",
      sla_started_at: now,
      first_callback_due_at: dueAt,
      first_callback_started_at: "",
      first_callback_completed_at: "",
      first_callback_sla_status: "",
      time_barrier_given_at: "",
      result_type: "",
      result_summary: "",
      result_reported_at: "",
      customer_acknowledged_at: "",
      closed_at: "",
      created_at: now,
      updated_at: now,
      is_test: booleanValue(body.is_test),
      qa_batch: spcSafeText(body.qa_batch, 120)
    });
    spcCreateChecklistInstances(caseId);
    const actor = { actor_id: "PUBLIC", actor_role: SPC_ROLES.CUSTOMER };
    spcCaseEvent(caseId, SPC_EVENT_TYPES.CASE_CREATED, "", SPC_STATUS.NEW, actor, warning ? "Sensitive pattern detected and sanitized." : "", { sensitive_warning: warning });
    spcAudit("SPC_CASE", caseId, SPC_EVENT_TYPES.CASE_CREATED, actor, "", SPC_STATUS.NEW, warning ? "Sensitive pattern detected and sanitized." : "", { sensitive_warning: warning });
    return {
      ok: true,
      case_id: caseId,
      public_case_token: spcCaseById(caseId).public_case_token,
      first_callback_due_at: dueAt,
      warning: warning ? "Sensitive request pattern was detected and sanitized." : ""
    };
  } finally {
    lock.releaseLock();
  }
}

function spcGetCasePublicStatus(body) {
  ensureSpcSheets();
  const caseRow = spcCaseByToken(body.public_case_token || body.token);
  if (!caseRow) return { ok: false, error: "SPC_CASE_NOT_FOUND", message: "Case not found." };
  return { ok: true, case: spcPublicCase(caseRow) };
}

function spcAcknowledgeResult(body) {
  ensureSpcSheets();
  const caseRow = spcCaseByToken(body.public_case_token || body.token);
  if (!caseRow) return { ok: false, error: "SPC_CASE_NOT_FOUND", message: "Case not found." };
  if (spcNormalizeStatus(caseRow.status) !== SPC_STATUS.RESULT_REPORTED) {
    return { ok: false, error: "SPC_INVALID_TRANSITION", message: "Result is not ready for acknowledgement." };
  }
  const actor = { actor_id: "PUBLIC", actor_role: SPC_ROLES.CUSTOMER };
  const now = new Date();
  updateRowFields(SHEET_NAMES.spcCases, caseRow._row, {
    status: SPC_STATUS.CUSTOMER_ACKNOWLEDGED,
    customer_acknowledged_at: now,
    updated_at: now
  });
  spcCaseEvent(caseRow.case_id, SPC_EVENT_TYPES.CUSTOMER_ACKNOWLEDGED, SPC_STATUS.RESULT_REPORTED, SPC_STATUS.CUSTOMER_ACKNOWLEDGED, actor, cleanString(body.comment, 500), {});
  spcAudit("SPC_CASE", caseRow.case_id, SPC_EVENT_TYPES.CUSTOMER_ACKNOWLEDGED, actor, SPC_STATUS.RESULT_REPORTED, SPC_STATUS.CUSTOMER_ACKNOWLEDGED, cleanString(body.comment, 500), {});
  return { ok: true, case_id: caseRow.case_id, status: SPC_STATUS.CUSTOMER_ACKNOWLEDGED };
}

function spcOfficerDashboard(body) {
  const actor = spcRequireRole(body, [SPC_ROLES.OFFICER, SPC_ROLES.SUPERVISOR, SPC_ROLES.ADMIN]);
  if (!actor.ok) return actor;
  const officerId = actor.officer ? cleanString(actor.officer.officer_id, 120) : "";
  const cases = sheetToObjects(SHEET_NAMES.spcCases).filter(function (row) {
    if ([SPC_ROLES.ADMIN, SPC_ROLES.SUPERVISOR].indexOf(actor.actor_role) !== -1) return true;
    return !row.assigned_officer_id || cleanString(row.assigned_officer_id, 120) === officerId;
  });
  return { ok: true, role: actor.actor_role, officer: actor.officer ? spcPublicOfficer(actor.officer) : null, summary: spcSummarizeCases(cases), cases: cases.map(spcPrivateCase) };
}

function spcSupervisorDashboard(body) {
  const actor = spcRequireRole(body, [SPC_ROLES.SUPERVISOR, SPC_ROLES.ADMIN]);
  if (!actor.ok) return actor;
  const cases = sheetToObjects(SHEET_NAMES.spcCases);
  return { ok: true, summary: spcSummarizeCases(cases), cases: cases.map(spcPrivateCase), officers: sheetToObjects(SHEET_NAMES.spcOfficers).map(spcPublicOfficer) };
}

function spcAdminDashboard(body) {
  const actor = spcRequireRole(body, [SPC_ROLES.ADMIN]);
  if (!actor.ok) return actor;
  const cases = sheetToObjects(SHEET_NAMES.spcCases);
  return { ok: true, summary: spcSummarizeCases(cases), recent_cases: cases.slice(Math.max(0, cases.length - 50)).reverse().map(spcPrivateCase), officers: sheetToObjects(SHEET_NAMES.spcOfficers).map(spcPublicOfficer) };
}

function spcSummarizeCases(cases) {
  const summary = { total: cases.length, sla_breached: 0 };
  Object.keys(SPC_STATUS).forEach(function (key) { summary[SPC_STATUS[key].toLowerCase()] = 0; });
  cases.forEach(function (caseRow) {
    const status = spcNormalizeStatus(caseRow.status);
    if (summary[status.toLowerCase()] !== undefined) summary[status.toLowerCase()] += 1;
    if (cleanString(caseRow.first_callback_sla_status, 40) === "BREACHED") summary.sla_breached += 1;
  });
  return summary;
}

function spcGetCaseDetail(body) {
  const actor = spcRequireRole(body, [SPC_ROLES.OFFICER, SPC_ROLES.SUPERVISOR, SPC_ROLES.ADMIN]);
  if (!actor.ok) return actor;
  const caseRow = spcCaseById(body.case_id);
  if (!caseRow) return { ok: false, error: "SPC_CASE_NOT_FOUND", message: "Case not found." };
  const assigned = spcRequireAssigned(caseRow, actor);
  if (!assigned.ok) return assigned;
  return { ok: true, case: spcPrivateCase(caseRow) };
}

function spcAcceptCase(body) {
  ensureSpcSheets();
  const actor = spcRequireRole(body, [SPC_ROLES.OFFICER, SPC_ROLES.SUPERVISOR, SPC_ROLES.ADMIN]);
  if (!actor.ok) return actor;
  const officer = actor.officer || spcOfficerById(body.officer_id);
  if (!officer) return { ok: false, error: "SPC_OFFICER_REQUIRED", message: "SPC officer record is required." };

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const caseRow = spcCaseById(body.case_id);
    if (!caseRow) return { ok: false, error: "SPC_CASE_NOT_FOUND", message: "Case not found." };
    if (spcNormalizeStatus(caseRow.status) !== SPC_STATUS.NEW || cleanString(caseRow.assigned_officer_id, 120)) {
      return { ok: false, error: "SPC_ALREADY_ACCEPTED", message: "Case was already accepted." };
    }
    const now = new Date();
    updateRowFields(SHEET_NAMES.spcCases, caseRow._row, {
      status: SPC_STATUS.ACCEPTED,
      assigned_officer_id: officer.officer_id,
      accepted_at: now,
      updated_at: now
    });
    actor.officer = officer;
    spcCaseEvent(caseRow.case_id, SPC_EVENT_TYPES.CASE_ACCEPTED, SPC_STATUS.NEW, SPC_STATUS.ACCEPTED, actor, cleanString(body.comment, 500), {});
    spcAudit("SPC_CASE", caseRow.case_id, SPC_EVENT_TYPES.CASE_ACCEPTED, actor, SPC_STATUS.NEW, SPC_STATUS.ACCEPTED, "", {});
    return { ok: true, case_id: caseRow.case_id, status: SPC_STATUS.ACCEPTED, assigned_officer_id: officer.officer_id };
  } finally {
    lock.releaseLock();
  }
}

function spcStartFirstCallback(body) {
  const actor = spcRequireRole(body, [SPC_ROLES.OFFICER, SPC_ROLES.SUPERVISOR, SPC_ROLES.ADMIN]);
  if (!actor.ok) return actor;
  const caseRow = spcCaseById(body.case_id);
  if (!caseRow) return { ok: false, error: "SPC_CASE_NOT_FOUND", message: "Case not found." };
  const assigned = spcRequireAssigned(caseRow, actor);
  if (!assigned.ok) return assigned;

  const now = new Date();
  const ttl = spcSettingNumber("contact_code_ttl_minutes", 15);
  const code = String(Math.floor(100000 + Math.random() * 900000));
  const transition = spcTransitionCase(body, SPC_STATUS.FIRST_CALLBACK_IN_PROGRESS, SPC_EVENT_TYPES.FIRST_CALLBACK_STARTED, { comment: cleanString(body.comment, 500), evidence: { contact_method: body.contact_method } });
  if (!transition.ok) return transition;
  appendObject(SHEET_NAMES.spcContactAttempts, {
    contact_attempt_id: makeId("SPCCON"),
    case_id: caseRow.case_id,
    officer_id: caseRow.assigned_officer_id,
    contact_method: spcSafeText(body.contact_method || "PHONE", 80),
    verification_code: code,
    issued_at: now,
    expires_at: new Date(now.getTime() + ttl * 60000),
    used_at: "",
    status: "ACTIVE",
    created_at: now,
    updated_at: now
  });
  return { ok: true, case_id: caseRow.case_id, status: SPC_STATUS.FIRST_CALLBACK_IN_PROGRESS, contact_verification_code: code };
}

function spcCompleteFirstCallback(body) {
  const result = spcTransitionCase(body, SPC_STATUS.FIRST_CALLBACK_COMPLETED, SPC_EVENT_TYPES.FIRST_CALLBACK_COMPLETED, { comment: cleanString(body.comment, 500), evidence: { time_barrier: true } });
  if (!result.ok) return result;
  const verify = spcTransitionCase(body, SPC_STATUS.VERIFYING, SPC_EVENT_TYPES.VERIFICATION_STARTED, { comment: "Verification started after first callback." });
  return verify.ok ? verify : result;
}

function spcSubmitChecklistResult(body) {
  const actor = spcRequireRole(body, [SPC_ROLES.OFFICER, SPC_ROLES.SUPERVISOR, SPC_ROLES.ADMIN]);
  if (!actor.ok) return actor;
  const caseRow = spcCaseById(body.case_id);
  if (!caseRow) return { ok: false, error: "SPC_CASE_NOT_FOUND", message: "Case not found." };
  const assigned = spcRequireAssigned(caseRow, actor);
  if (!assigned.ok) return assigned;
  const instanceId = cleanString(body.checklist_instance_id, 120);
  const itemId = cleanString(body.checklist_item_id, 160);
  const instance = sheetToObjects(SHEET_NAMES.spcChecklistInstances).find(function (row) {
    return cleanString(row.checklist_instance_id, 120) === instanceId && cleanString(row.case_id, 120) === cleanString(caseRow.case_id, 120);
  });
  if (!instance || !itemId) return { ok: false, error: "SPC_CHECKLIST_NOT_FOUND", message: "Checklist item not found." };
  const now = new Date();
  appendObject(SHEET_NAMES.spcChecklistResults, {
    result_id: makeId("SPCCLR"),
    checklist_instance_id: instanceId,
    case_id: caseRow.case_id,
    checklist_item_id: itemId,
    value: spcSafeText(body.value || "DONE", 500),
    evidence_json: JSON.stringify(body.evidence || {}),
    completed_by: actor.actor_id,
    completed_at: now,
    updated_at: now
  });
  spcAudit("SPC_CHECKLIST", caseRow.case_id, "CHECKLIST_RESULT_SUBMITTED", actor, "", caseRow.status, "", { checklist_item_id: itemId });
  return { ok: true, case_id: caseRow.case_id };
}

function spcAddCaseEvent(body) {
  const actor = spcRequireRole(body, [SPC_ROLES.OFFICER, SPC_ROLES.SUPERVISOR, SPC_ROLES.ADMIN]);
  if (!actor.ok) return actor;
  const caseRow = spcCaseById(body.case_id);
  if (!caseRow) return { ok: false, error: "SPC_CASE_NOT_FOUND", message: "Case not found." };
  const assigned = spcRequireAssigned(caseRow, actor);
  if (!assigned.ok) return assigned;
  spcCaseEvent(caseRow.case_id, spcSafeText(body.event_type || "NOTE_ADDED", 80), caseRow.status, caseRow.status, actor, spcSafeText(body.comment, 1000), body.evidence || {});
  spcAudit("SPC_CASE", caseRow.case_id, "CASE_EVENT_ADDED", actor, caseRow.status, caseRow.status, spcSafeText(body.comment, 1000), body.evidence || {});
  return { ok: true };
}

function spcAddVerificationRecord(body) {
  const actor = spcRequireRole(body, [SPC_ROLES.OFFICER, SPC_ROLES.SUPERVISOR, SPC_ROLES.ADMIN]);
  if (!actor.ok) return actor;
  const caseRow = spcCaseById(body.case_id);
  if (!caseRow) return { ok: false, error: "SPC_CASE_NOT_FOUND", message: "Case not found." };
  const assigned = spcRequireAssigned(caseRow, actor);
  if (!assigned.ok) return assigned;
  const now = new Date();
  appendObject(SHEET_NAMES.spcVerificationHistory, {
    verification_id: makeId("SPCVER"),
    case_id: caseRow.case_id,
    organization_id: spcSafeText(body.organization_id, 120),
    organization_name: spcSafeText(body.organization_name || caseRow.claimed_organization, 180),
    contact_method: spcSafeText(body.contact_method, 80),
    contact_reference: spcSafeText(body.contact_reference, 240),
    verification_action: spcSafeText(body.verification_action, 800),
    verification_result: spcSafeText(body.verification_result, 800),
    evidence_json: JSON.stringify(body.evidence || {}),
    recorded_by: actor.actor_id,
    recorded_at: now
  });
  spcCaseEvent(caseRow.case_id, SPC_EVENT_TYPES.AGENCY_RESPONSE_RECEIVED, caseRow.status, caseRow.status, actor, "Verification record added.", body.evidence || {});
  spcAudit("SPC_VERIFICATION", caseRow.case_id, "VERIFICATION_RECORD_ADDED", actor, caseRow.status, caseRow.status, "", body.evidence || {});
  return { ok: true };
}

function spcSetWaitingForAgency(body) {
  return spcTransitionCase(body, SPC_STATUS.WAITING_FOR_AGENCY, SPC_EVENT_TYPES.AGENCY_CONTACT_ATTEMPTED, { comment: cleanString(body.comment || body.follow_up_note, 800), evidence: { follow_up_at: body.follow_up_at || "" } });
}

function spcScheduleFollowUp(body) {
  return spcTransitionCase(body, SPC_STATUS.FOLLOW_UP_REQUIRED, SPC_EVENT_TYPES.FOLLOW_UP_SCHEDULED, { comment: cleanString(body.comment || body.follow_up_note, 800), evidence: { follow_up_at: body.follow_up_at || "" } });
}

function spcPrepareResult(body) {
  const resultType = cleanString(body.result_type, 80).toUpperCase();
  if (Object.keys(SPC_RESULT_TYPES).map(function (key) { return SPC_RESULT_TYPES[key]; }).indexOf(resultType) === -1) {
    return { ok: false, error: "SPC_INVALID_RESULT_TYPE", message: "Invalid result type." };
  }
  return spcTransitionCase(body, SPC_STATUS.READY_TO_REPORT, SPC_EVENT_TYPES.RESULT_PREPARED, {
    comment: spcSafeText(body.result_summary, 1500),
    evidence: body.evidence || {},
    fields: {
      result_type: resultType,
      result_summary: spcSafeText(body.result_summary, 1500)
    }
  });
}

function spcReportResult(body) {
  return spcTransitionCase(body, SPC_STATUS.RESULT_REPORTED, SPC_EVENT_TYPES.RESULT_REPORTED, { comment: cleanString(body.comment, 800), evidence: body.evidence || {} });
}

function spcAssignOfficer(body) {
  return spcAssignOfficerInternal(body, false);
}

function spcReassignCase(body) {
  return spcAssignOfficerInternal(body, true);
}

function spcAssignOfficerInternal(body, reassign) {
  const actor = spcRequireRole(body, [SPC_ROLES.SUPERVISOR, SPC_ROLES.ADMIN]);
  if (!actor.ok) return actor;
  const caseRow = spcCaseById(body.case_id);
  const officer = spcOfficerById(body.officer_id);
  if (!caseRow || !officer) return { ok: false, error: "SPC_NOT_FOUND", message: "Case or officer not found." };
  if (!reassign && cleanString(caseRow.assigned_officer_id, 120)) {
    return { ok: false, error: "SPC_ALREADY_ASSIGNED", message: "Case already has assigned officer." };
  }
  if (reassign && !cleanString(body.reason, 500)) {
    return { ok: false, error: "SPC_REASON_REQUIRED", message: "Reassignment requires a reason." };
  }
  updateRowFields(SHEET_NAMES.spcCases, caseRow._row, { assigned_officer_id: officer.officer_id, status: caseRow.status === SPC_STATUS.NEW ? SPC_STATUS.ACCEPTED : caseRow.status, updated_at: new Date() });
  spcCaseEvent(caseRow.case_id, SPC_EVENT_TYPES.OFFICER_ASSIGNED, caseRow.status, caseRow.status === SPC_STATUS.NEW ? SPC_STATUS.ACCEPTED : caseRow.status, actor, cleanString(body.reason || body.comment, 500), { officer_id: officer.officer_id });
  spcAudit("SPC_CASE", caseRow.case_id, reassign ? "OFFICER_REASSIGNED" : "OFFICER_ASSIGNED", actor, caseRow.status, caseRow.status, cleanString(body.reason || body.comment, 500), { officer_id: officer.officer_id });
  return { ok: true, case_id: caseRow.case_id, assigned_officer_id: officer.officer_id };
}

function spcReviewCase(body) {
  const actor = spcRequireRole(body, [SPC_ROLES.SUPERVISOR, SPC_ROLES.ADMIN]);
  if (!actor.ok) return actor;
  const caseRow = spcCaseById(body.case_id);
  if (!caseRow) return { ok: false, error: "SPC_CASE_NOT_FOUND", message: "Case not found." };
  spcAudit("SPC_CASE", caseRow.case_id, "CASE_REVIEWED", actor, caseRow.status, caseRow.status, cleanString(body.comment, 1000), {});
  return { ok: true };
}

function spcEscalateCase(body) {
  return spcTransitionCase(body, SPC_STATUS.ESCALATED, SPC_EVENT_TYPES.CASE_ESCALATED, { comment: cleanString(body.reason || body.comment, 1000), evidence: {} });
}

function spcOverrideTransition(body) {
  const actor = spcRequireRole(body, [SPC_ROLES.SUPERVISOR, SPC_ROLES.ADMIN]);
  if (!actor.ok) return actor;
  if (!cleanString(body.reason, 500)) return { ok: false, error: "SPC_REASON_REQUIRED", message: "Override requires reason." };
  const caseRow = spcCaseById(body.case_id);
  const next = spcNormalizeStatus(body.to_status);
  if (!caseRow || !next) return { ok: false, error: "SPC_INVALID_OVERRIDE", message: "Invalid override." };
  const now = new Date();
  const updates = { status: next, updated_at: now };
  if (next === SPC_STATUS.CLOSED) updates.closed_at = now;
  updateRowFields(SHEET_NAMES.spcCases, caseRow._row, updates);
  spcCaseEvent(caseRow.case_id, SPC_EVENT_TYPES.SUPERVISOR_OVERRIDE, caseRow.status, next, actor, cleanString(body.reason, 1000), {});
  spcAudit("SPC_CASE", caseRow.case_id, SPC_EVENT_TYPES.SUPERVISOR_OVERRIDE, actor, caseRow.status, next, cleanString(body.reason, 1000), {});
  return { ok: true, case_id: caseRow.case_id, status: next };
}

function spcCreateOfficer(body) {
  const actor = spcRequireRole(body, [SPC_ROLES.ADMIN]);
  if (!actor.ok) return actor;
  const required = requireFields(body || {}, ["officer_name"]);
  if (!required.ok) return required;
  const now = new Date();
  const officerId = cleanString(body.officer_id, 120) || makeId("SPCOFF");
  appendObject(SHEET_NAMES.spcOfficers, {
    officer_id: officerId,
    agent_id: validateAgentId(body.agent_id),
    admin_id: spcSafeText(body.admin_id, 160),
    officer_name: spcSafeText(body.officer_name, 160),
    photo_url: spcSafeText(body.photo_url, 500),
    department: spcSafeText(body.department || "SPC", 120),
    role: spcNormalizeRole(body.role) || SPC_ROLES.OFFICER,
    status: "ACTIVE",
    official_profile_url: spcSafeText(body.official_profile_url, 500),
    valid_from: body.valid_from || now,
    valid_until: body.valid_until || "",
    created_at: now,
    updated_at: now,
    created_by: actor.actor_id,
    is_test: booleanValue(body.is_test),
    qa_batch: spcSafeText(body.qa_batch, 120)
  });
  const permissionActorId = validateAgentId(body.agent_id) || spcSafeText(body.admin_id, 160) || officerId;
  appendObject(SHEET_NAMES.spcPermissions, {
    permission_id: makeId("SPCPERM"),
    actor_id: permissionActorId,
    actor_type: validateAgentId(body.agent_id) ? "AGENT" : "ADMIN",
    officer_id: officerId,
    role: spcNormalizeRole(body.role) || SPC_ROLES.OFFICER,
    status: "ACTIVE",
    created_at: now,
    updated_at: now,
    created_by: actor.actor_id
  });
  spcAudit("SPC_OFFICER", officerId, "OFFICER_CREATED", actor, "", "ACTIVE", "", {});
  return { ok: true, officer: spcPublicOfficer(spcOfficerById(officerId)) };
}

function spcUpdateOfficer(body) {
  const actor = spcRequireRole(body, [SPC_ROLES.ADMIN]);
  if (!actor.ok) return actor;
  const officer = spcOfficerById(body.officer_id);
  if (!officer) return { ok: false, error: "SPC_OFFICER_NOT_FOUND", message: "Officer not found." };
  const fields = {
    officer_name: spcSafeText(body.officer_name || officer.officer_name, 160),
    photo_url: spcSafeText(body.photo_url || officer.photo_url, 500),
    department: spcSafeText(body.department || officer.department, 120),
    role: spcNormalizeRole(body.role) || officer.role,
    status: spcSafeText(body.status || officer.status, 40),
    official_profile_url: spcSafeText(body.official_profile_url || officer.official_profile_url, 500),
    valid_from: body.valid_from || officer.valid_from,
    valid_until: body.valid_until || officer.valid_until,
    updated_at: new Date()
  };
  updateRowFields(SHEET_NAMES.spcOfficers, officer._row, fields);
  spcAudit("SPC_OFFICER", officer.officer_id, "OFFICER_UPDATED", actor, officer.status, fields.status, "", {});
  return { ok: true, officer: spcPublicOfficer(spcOfficerById(officer.officer_id)) };
}

function spcManageChecklistTemplate(body) {
  const actor = spcRequireRole(body, [SPC_ROLES.ADMIN]);
  if (!actor.ok) return actor;
  return { ok: true, templates: sheetToObjects(SHEET_NAMES.spcChecklistTemplates), items: sheetToObjects(SHEET_NAMES.spcChecklistItems) };
}

function spcManageOrganization(body) {
  const actor = spcRequireRole(body, [SPC_ROLES.ADMIN]);
  if (!actor.ok) return actor;
  if (cleanString(body.organization_name, 180)) {
    const now = new Date();
    appendObject(SHEET_NAMES.spcOrganizations, {
      organization_id: makeId("SPCORG"),
      organization_name: spcSafeText(body.organization_name, 180),
      organization_type: spcSafeText(body.organization_type, 80),
      official_contact: spcSafeText(body.official_contact, 240),
      official_url: spcSafeText(body.official_url, 500),
      status: "ACTIVE",
      created_at: now,
      updated_at: now,
      created_by: actor.actor_id
    });
  }
  return { ok: true, organizations: sheetToObjects(SHEET_NAMES.spcOrganizations) };
}

function spcViewAuditLogs(body) {
  const actor = spcRequireRole(body, [SPC_ROLES.SUPERVISOR, SPC_ROLES.ADMIN]);
  if (!actor.ok) return actor;
  const limit = Math.max(1, Math.min(500, Number(body.limit || 100)));
  const logs = sheetToObjects(SHEET_NAMES.spcAuditLogs).slice(-limit).reverse();
  return { ok: true, audit_logs: logs };
}

function spcRunIntegrityCheck(body) {
  const actor = spcRequireRole(body, [SPC_ROLES.ADMIN]);
  if (!actor.ok) return actor;
  const anomalies = [];
  sheetToObjects(SHEET_NAMES.spcCases).forEach(function (caseRow) {
    if (!caseRow.public_case_token) anomalies.push({ case_id: caseRow.case_id, issue: "MISSING_PUBLIC_TOKEN" });
    if (!spcNormalizeStatus(caseRow.status)) anomalies.push({ case_id: caseRow.case_id, issue: "INVALID_STATUS" });
    if (caseRow.status === SPC_STATUS.ACCEPTED && !caseRow.assigned_officer_id) anomalies.push({ case_id: caseRow.case_id, issue: "ACCEPTED_WITHOUT_OFFICER" });
    if (caseRow.status === SPC_STATUS.RESULT_REPORTED && !caseRow.result_summary) anomalies.push({ case_id: caseRow.case_id, issue: "RESULT_WITHOUT_SUMMARY" });
  });
  return { ok: true, anomalies: anomalies, checked_at: new Date() };
}

function spcGetPublicOfficerVerification(body) {
  ensureSpcSheets();
  const caseRow = spcCaseByToken(body.public_case_token || body.token);
  if (!caseRow) return { ok: false, error: "SPC_CASE_NOT_FOUND", message: "Case not found." };
  const officer = spcOfficerById(caseRow.assigned_officer_id);
  const attempts = sheetToObjects(SHEET_NAMES.spcContactAttempts).filter(function (attempt) {
    return cleanString(attempt.case_id, 120) === cleanString(caseRow.case_id, 120);
  }).map(function (attempt) {
    return {
      contact_attempt_id: attempt.contact_attempt_id,
      contact_method: attempt.contact_method,
      issued_at: attempt.issued_at,
      expires_at: attempt.expires_at,
      status: attempt.status
    };
  });
  return { ok: true, case_id: caseRow.case_id, officer: officer ? spcPublicOfficer(officer) : null, contact_attempts: attempts };
}

function spcVerifyContactCode(body) {
  ensureSpcSheets();
  const code = cleanString(body.verification_code || body.code, 20);
  const token = cleanString(body.public_case_token || body.token, 160);
  const caseRow = spcCaseByToken(token);
  if (!caseRow || !code) return { ok: false, error: "SPC_INVALID_CODE", message: "Invalid verification code." };
  const attempt = sheetToObjects(SHEET_NAMES.spcContactAttempts).find(function (row) {
    return cleanString(row.case_id, 120) === cleanString(caseRow.case_id, 120) &&
      cleanString(row.verification_code, 20) === code &&
      !row.used_at &&
      cleanString(row.status, 40).toUpperCase() === "ACTIVE";
  });
  if (!attempt) return { ok: false, error: "SPC_INVALID_CODE", message: "Invalid or used verification code." };
  if (new Date(attempt.expires_at).getTime() < new Date().getTime()) {
    return { ok: false, error: "SPC_EXPIRED_CODE", message: "Verification code expired." };
  }
  if (booleanValue(body.consume)) {
    updateRowFields(SHEET_NAMES.spcContactAttempts, attempt._row, { used_at: new Date(), status: "USED", updated_at: new Date() });
  }
  return { ok: true, case_id: caseRow.case_id, officer: spcPublicOfficer(spcOfficerById(attempt.officer_id) || {}) };
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
  const includeStatistics = String(params.include_statistics || "").trim().toLowerCase() === "true";
  let statistics = {};

  if (includeStatistics) {
    try {
      statistics = summarizeFinancials();
    } catch (error) {
      statistics = {
        unavailable: true
      };
    }
  }

  return {
    ok: true,
    summary: summarizeAgents(agents),
    statistics: statistics,
    pending_agents: pendingAgents.slice(0, recentLimit),
    recent_agents: publicAgents.slice(Math.max(0, publicAgents.length - recentLimit)).reverse()
  };
}

/* =========================================================
   SALES OPERATING SYSTEM V3-1
========================================================= */

function ensureSalesSheets() {
  const cacheKey = "SBOS_SALES_SHEETS_READY_PRODUCT_SIMPLE_V1";
  try {
    const cache = CacheService.getScriptCache();
    if (cache.get(cacheKey) === "1") return;
  } catch (error) {}
  getOrCreateSheet(SHEET_NAMES.customers, CUSTOMER_HEADERS);
  getOrCreateSheet(SHEET_NAMES.quotations, QUOTATION_HEADERS);
  getOrCreateSheet(SHEET_NAMES.orders, ORDER_HEADERS);
  getOrCreateSheet(SHEET_NAMES.orderStatusLogs, ORDER_STATUS_LOG_HEADERS);
  getOrCreateSheet(SHEET_NAMES.productCollections, PRODUCT_COLLECTION_HEADERS);
  getOrCreateSheet(SHEET_NAMES.productModels, PRODUCT_MODEL_HEADERS);
  getOrCreateSheet(SHEET_NAMES.products, PRODUCT_HEADERS);
  getOrCreateSheet(SHEET_NAMES.productPricing, PRODUCT_PRICING_HEADERS);
  getOrCreateSheet(SHEET_NAMES.depositPolicies, DEPOSIT_POLICY_HEADERS);
  getOrCreateSheet(SHEET_NAMES.payments, PAYMENT_HEADERS);
  getOrCreateSheet(SHEET_NAMES.auditLogs, AUDIT_LOG_HEADERS);
  ensureFinanceSheets();
  ensureOrganizationSheets();
  seedV3ProductCatalog();
  seedProductCatalogMetadata();
  seedDepositPolicy();
  try {
    CacheService.getScriptCache().put(cacheKey, "1", 21600);
  } catch (error) {}
}

function ensureCmsSheets() {
  const cacheKey = "SBOS_CMS_SHEETS_READY_V3_5";
  try {
    const cache = CacheService.getScriptCache();
    if (cache.get(cacheKey) === "1") return;
  } catch (error) {}
  getOrCreateSheet(SHEET_NAMES.cmsContent, CMS_CONTENT_HEADERS);
  getOrCreateSheet(SHEET_NAMES.cmsLocalizations, CMS_LOCALIZATION_HEADERS);
  getOrCreateSheet(SHEET_NAMES.cmsRevisions, CMS_REVISION_HEADERS);
  getOrCreateSheet(SHEET_NAMES.cmsMedia, CMS_MEDIA_HEADERS);
  getOrCreateSheet(SHEET_NAMES.cmsPublicationJobs, CMS_PUBLICATION_JOB_HEADERS);
  getOrCreateSheet(SHEET_NAMES.cmsAuditLogs, CMS_AUDIT_LOG_HEADERS);
  getOrCreateSheet(SHEET_NAMES.cmsSiteSettings, CMS_SITE_SETTING_HEADERS);
  getOrCreateSheet(SHEET_NAMES.cmsNavigation, CMS_NAVIGATION_HEADERS);
  seedCmsDefaults();
  try {
    CacheService.getScriptCache().put(cacheKey, "1", 21600);
  } catch (error) {}
}

function ensureOrganizationSheets() {
  getOrCreateSheet(SHEET_NAMES.organizationAreas, ORGANIZATION_AREA_HEADERS);
  getOrCreateSheet(SHEET_NAMES.organizationTeams, ORGANIZATION_TEAM_HEADERS);
  getOrCreateSheet(SHEET_NAMES.organizationAssignments, ORGANIZATION_ASSIGNMENT_HEADERS);
  getOrCreateSheet(SHEET_NAMES.organizationRoleHistory, ORGANIZATION_ROLE_HISTORY_HEADERS);
  getOrCreateSheet(SHEET_NAMES.organizationSnapshots, ORGANIZATION_SNAPSHOT_HEADERS);
  getOrCreateSheet(SHEET_NAMES.salesTargets, SALES_TARGET_HEADERS);
  getOrCreateSheet(SHEET_NAMES.customerFollowups, CUSTOMER_FOLLOWUP_HEADERS);
  getOrCreateSheet(SHEET_NAMES.organizationAuditLogs, ORGANIZATION_AUDIT_LOG_HEADERS);
}

function ensureFinanceSheets() {
  getOrCreateSheet(SHEET_NAMES.commissionRules, COMMISSION_RULE_HEADERS);
  getOrCreateSheet(SHEET_NAMES.commissions, COMMISSION_HEADERS);
  getOrCreateSheet(SHEET_NAMES.walletAccounts, WALLET_ACCOUNT_HEADERS);
  getOrCreateSheet(SHEET_NAMES.walletLedger, WALLET_LEDGER_HEADERS);
  getOrCreateSheet(SHEET_NAMES.withdrawalRequests, WITHDRAWAL_REQUEST_HEADERS);
  getOrCreateSheet(SHEET_NAMES.financeAuditLogs, FINANCE_AUDIT_LOG_HEADERS);
  getOrCreateSheet(SHEET_NAMES.pricingAllocationVersions, PRICING_ALLOCATION_VERSION_HEADERS);
  getOrCreateSheet(SHEET_NAMES.accountingAccounts, ACCOUNTING_ACCOUNT_HEADERS);
  getOrCreateSheet(SHEET_NAMES.accountingJournals, ACCOUNTING_JOURNAL_HEADERS);
  getOrCreateSheet(SHEET_NAMES.accountingLedger, ACCOUNTING_LEDGER_HEADERS);
  getOrCreateSheet(SHEET_NAMES.companyRevenueLedger, COMPANY_REVENUE_LEDGER_HEADERS);
  getOrCreateSheet(SHEET_NAMES.expenseAllocationLedger, EXPENSE_ALLOCATION_LEDGER_HEADERS);
  getOrCreateSheet(SHEET_NAMES.vatLedger, VAT_LEDGER_HEADERS);
  getOrCreateSheet(SHEET_NAMES.accountingReconciliation, ACCOUNTING_RECONCILIATION_HEADERS);
  getOrCreateSheet(SHEET_NAMES.accountingAuditLogs, ACCOUNTING_AUDIT_LOG_HEADERS);
  getOrCreateSheet(SHEET_NAMES.agentCompensationAgreements, AGENT_COMPENSATION_AGREEMENT_HEADERS);
  getOrCreateSheet(SHEET_NAMES.agentCompensationTiers, AGENT_COMPENSATION_TIER_HEADERS);
  getOrCreateSheet(SHEET_NAMES.teamCommissionAllocations, TEAM_COMMISSION_ALLOCATION_HEADERS);
  getOrCreateSheet(SHEET_NAMES.financeSettings, FINANCE_SETTING_HEADERS);
  seedCommissionRulePlaceholders();
  seedAccountingDefaults();
  seedPricingAllocationVersions();
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

function readFinanceSetting(key, fallback) {
  ensureFinanceSheets();
  const normalized = cleanString(key, 120);
  const row = sheetToObjects(SHEET_NAMES.financeSettings).find(function (item) {
    return cleanString(item.setting_key, 120) === normalized &&
      normalizeSalesStatus(item.status || "ACTIVE") === "ACTIVE";
  });
  return row ? cleanString(row.setting_value, 500) : fallback;
}

function seedFinanceSetting(key, value) {
  const rows = sheetToObjects(SHEET_NAMES.financeSettings);
  const exists = rows.some(function (item) {
    return cleanString(item.setting_key, 120) === key;
  });
  if (exists) return;
  const now = new Date();
  appendObject(SHEET_NAMES.financeSettings, {
    setting_id: makeId("FSET"),
    setting_key: key,
    setting_value: String(value),
    status: "ACTIVE",
    created_at: now,
    updated_at: now,
    updated_by: "SYSTEM"
  });
}

function seedAccountingDefaults() {
  const accountRows = sheetToObjects(SHEET_NAMES.accountingAccounts);
  const existingCodes = {};
  accountRows.forEach(function (row) {
    existingCodes[cleanString(row.account_code, 40)] = true;
  });
  const now = new Date();
  ACCOUNTING_SEED_ACCOUNTS.forEach(function (item) {
    if (existingCodes[item[0]]) return;
    appendObject(SHEET_NAMES.accountingAccounts, {
      account_id: makeId("ACC"),
      account_code: item[0],
      account_name: item[1],
      account_type: item[2],
      normal_balance: item[3],
      status: "ACTIVE",
      created_at: now,
      updated_at: now,
      created_by: "SYSTEM"
    });
  });
  seedFinanceSetting("agent_sim_income", DEFAULT_SIM_INCOME);
  seedFinanceSetting("agent_spc_income", DEFAULT_SPC_INCOME);
  seedFinanceSetting("manager_direct_sale_policy", "MANAGER_RETAINS_CENTRAL_POOL");
}

function pricingAllocationTotalsSatang(row) {
  const totals = {
    components: 0,
    beforeVat: Math.max(0, toSatang(row.selling_price_before_vat || 0)),
    vat: Math.max(0, toSatang(row.vat_amount || 0)),
    includingVat: Math.max(0, toSatang(row.selling_price_including_vat || 0))
  };
  PRICING_ALLOCATION_COMPONENTS.forEach(function (key) {
    const value = Math.max(0, toSatang(row[key] || 0));
    totals.components += isFinite(value) ? value : NaN;
  });
  return totals;
}

function pricingAllocationIssues(row) {
  const issues = [];
  const totals = pricingAllocationTotalsSatang(row || {});
  const vatRate = Math.max(0, Math.min(1, Number(row && row.vat_rate || DEFAULT_VAT_RATE)));
  PRICING_ALLOCATION_COMPONENTS.forEach(function (key) {
    const amount = toSatang(row && row[key] || 0);
    if (!isFinite(amount) || amount < 0) issues.push({ type: "INVALID_COMPONENT", component: key });
  });
  if (!isFinite(totals.components)) issues.push({ type: "INVALID_COMPONENT_SUM" });
  if (totals.components !== totals.beforeVat) {
    issues.push({
      type: "COMPONENT_SUM_MISMATCH",
      expected: fromSatang(totals.beforeVat),
      actual: fromSatang(totals.components)
    });
  }
  const expectedVat = Math.round(totals.beforeVat * vatRate);
  if (Math.abs(expectedVat - totals.vat) > 1) {
    issues.push({
      type: "VAT_MISMATCH",
      expected: fromSatang(expectedVat),
      actual: fromSatang(totals.vat)
    });
  }
  if (totals.beforeVat + totals.vat !== totals.includingVat) {
    issues.push({
      type: "TOTAL_MISMATCH",
      expected: fromSatang(totals.beforeVat + totals.vat),
      actual: fromSatang(totals.includingVat)
    });
  }
  return issues;
}

function publicPricingAllocation(row, includeInternal) {
  const safe = {
    pricing_version_id: cleanString(row.pricing_version_id, 80),
    product_id: cleanString(row.product_id, 80),
    sku: cleanString(row.sku, 120),
    effective_from: row.effective_from || "",
    effective_until: row.effective_until || "",
    status: normalizeSalesStatus(row.status || "DRAFT"),
    selling_price_before_vat: Number(row.selling_price_before_vat || 0),
    vat_rate: Number(row.vat_rate || 0),
    vat_amount: Number(row.vat_amount || 0),
    selling_price_including_vat: Number(row.selling_price_including_vat || 0),
    deposit_policy_id: cleanString(row.deposit_policy_id, 80),
    created_at: row.created_at || "",
    updated_at: row.updated_at || "",
    is_test: booleanValue(row.is_test),
    qa_batch: cleanString(row.qa_batch, 120)
  };
  if (includeInternal) {
    PRICING_ALLOCATION_COMPONENTS.forEach(function (key) {
      safe[key] = Number(row[key] || 0);
    });
    safe.created_by = cleanString(row.created_by, 80);
    safe.approved_by = cleanString(row.approved_by, 80);
    safe.change_reason = cleanString(row.change_reason, 500);
    safe.integrity_issues = pricingAllocationIssues(row);
  }
  return safe;
}

function allocationSnapshot(row, quantity) {
  const safe = publicPricingAllocation(row, true);
  safe.quantity = Math.max(1, Number(quantity || 1));
  safe.components = {};
  PRICING_ALLOCATION_COMPONENTS.forEach(function (key) {
    safe.components[key] = Number(row[key] || 0);
  });
  return safe;
}

function activePricingAllocationForProduct(product) {
  if (!product) return null;
  ensureSalesSheets();
  const productId = cleanString(product.product_id, 80);
  const sku = cleanString(product.sku, 120);
  const now = new Date();
  const rows = sheetToObjects(SHEET_NAMES.pricingAllocationVersions)
    .filter(function (row) {
      if (normalizeSalesStatus(row.status || "") !== "ACTIVE") return false;
      if (cleanString(row.product_id, 80) !== productId && cleanString(row.sku, 120) !== sku) return false;
      const from = row.effective_from ? new Date(row.effective_from) : null;
      const until = row.effective_until ? new Date(row.effective_until) : null;
      return (!from || from <= now) && (!until || until >= now);
    });
  return rows[rows.length - 1] || null;
}

function seedPricingAllocationVersions() {
  const products = sheetToObjects(SHEET_NAMES.products);
  const pricingRows = sheetToObjects(SHEET_NAMES.productPricing);
  const allocations = sheetToObjects(SHEET_NAMES.pricingAllocationVersions);
  const now = new Date();
  products.forEach(function (product) {
    const productId = cleanString(product.product_id, 80);
    const sku = cleanString(product.sku, 120);
    const exists = allocations.some(function (row) {
      return normalizeSalesStatus(row.status || "") === "ACTIVE" &&
        (cleanString(row.product_id, 80) === productId || cleanString(row.sku, 120) === sku);
    });
    if (!productId || !sku || exists) return;
    const pricing = pricingRows.filter(function (row) {
      return normalizeSalesStatus(row.status || "ACTIVE") === "ACTIVE" &&
        (cleanString(row.product_id, 80) === productId || cleanString(row.sku, 120) === sku);
    }).pop();
    if (!pricing) return;
    const productPriceSatang = Math.max(0, toSatang(pricing.product_price || 0));
    const setupSatang = Math.max(0, toSatang(pricing.service_fee || 0));
    const discountSatang = Math.max(0, toSatang(pricing.discount || 0));
    const beforeVatSatang = Math.max(0, productPriceSatang + setupSatang - discountSatang);
    const vatRate = Math.max(0, Math.min(1, Number(pricing.vat_rate || DEFAULT_VAT_RATE)));
    const vatSatang = Math.round(beforeVatSatang * vatRate);
    const policy = sheetToObjects(SHEET_NAMES.depositPolicies).filter(function (item) {
      return normalizeSalesStatus(item.status || "ACTIVE") === "ACTIVE";
    }).pop() || {};
    appendObject(SHEET_NAMES.pricingAllocationVersions, {
      pricing_version_id: makeId("PAV"),
      product_id: productId,
      sku: sku,
      effective_from: now,
      effective_until: "",
      status: "ACTIVE",
      device_price: fromSatang(productPriceSatang),
      setup_fee: fromSatang(Math.max(0, setupSatang - discountSatang)),
      safety_book_cost: 0,
      fingerprint_cost: 0,
      signal_shield_cost: 0,
      assembly_cost: 0,
      annual_sim_cost: 0,
      operation_cost: 0,
      spc_cost: 0,
      central_commission_pool: 0,
      company_revenue_allocation: 0,
      selling_price_before_vat: fromSatang(beforeVatSatang),
      vat_rate: vatRate,
      vat_amount: fromSatang(vatSatang),
      selling_price_including_vat: fromSatang(beforeVatSatang + vatSatang),
      deposit_policy_id: cleanString(policy.policy_id, 80),
      created_by: "SYSTEM",
      approved_by: "SYSTEM",
      change_reason: "V3-7 migration from legacy product_pricing without changing public price.",
      created_at: now,
      updated_at: now,
      is_test: isQaRecord(product),
      qa_batch: qaBatchFor(product)
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
  return ["ADMIN", "OWNER", "FINANCE_ADMIN", "MARKETING_MANAGER"].indexOf(normalizedRole) !== -1;
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

function seedProductCatalogMetadata() {
  const products = sheetToObjects(SHEET_NAMES.products);
  const existingCollections = sheetToObjects(SHEET_NAMES.productCollections);
  const existingModels = sheetToObjects(SHEET_NAMES.productModels);
  const now = new Date();
  const collections = {};
  const models = {};

  existingCollections.forEach(function (row) {
    const key = catalogKey([row.collection_name]);
    if (key) collections[key] = true;
    const expectedTheme = inferredThemeKey(row.collection_name, row.brand);
    const currentTheme = cleanString(row.theme_key, 40).toLowerCase();
    if (
      key &&
      expectedTheme &&
      currentTheme !== expectedTheme &&
      cleanString(row.created_by, 80).toUpperCase() === "SYSTEM"
    ) {
      updateRowFields(SHEET_NAMES.productCollections, row._row, {
        theme_key: expectedTheme,
        updated_at: now,
        updated_by: "SYSTEM"
      });
    }
  });

  existingModels.forEach(function (row) {
    const key = catalogKey([row.collection_name, row.brand, row.model_name]);
    if (key) models[key] = cleanString(row.model_id, 80);
  });

  products.forEach(function (product) {
    const collectionName = cleanString(product.collection, 180);
    const brand = cleanString(product.brand, 120);
    const modelName = cleanString(product.model, 160);
    const collectionKey = catalogKey([collectionName]);
    const modelKey = catalogKey([collectionName, brand, modelName]);
    if (collectionName && !collections[collectionKey]) {
      appendObject(SHEET_NAMES.productCollections, {
        collection_id: catalogId("COL", [collectionName]),
        collection_name: collectionName,
        short_name: collectionName.split(" ")[0] || collectionName,
        brand: brand,
        series: "",
        description: "",
        theme_key: inferredThemeKey(collectionName, brand),
        image_url: "",
        asset_key: "",
        display_order: 999,
        status: "ACTIVE",
        created_at: now,
        updated_at: now,
        created_by: "SYSTEM",
        updated_by: "SYSTEM",
        is_test: isQaRecord(product),
        qa_batch: qaBatchFor(product)
      });
      collections[collectionKey] = true;
    }
    if (collectionName && brand && modelName && !models[modelKey]) {
      const modelId = catalogId("MDL", [collectionName, brand, modelName]);
      appendObject(SHEET_NAMES.productModels, {
        model_id: modelId,
        collection_id: catalogId("COL", [collectionName]),
        collection_name: collectionName,
        brand: brand,
        series: "",
        model_name: modelName,
        model_code: "",
        description: "",
        image_url: "",
        asset_key: "",
        display_order: 999,
        status: "ACTIVE",
        created_at: now,
        updated_at: now,
        created_by: "SYSTEM",
        updated_by: "SYSTEM",
        is_test: isQaRecord(product),
        qa_batch: qaBatchFor(product)
      });
      models[modelKey] = modelId;
    }
    if (!cleanString(product.model_id, 80) && models[modelKey]) {
      updateRowFields(SHEET_NAMES.products, product._row, {
        model_id: models[modelKey],
        memory_label: cleanString(product.memory_label || product.storage, 80),
        updated_at: product.updated_at || now,
        updated_by: product.updated_by || "SYSTEM"
      });
    }
  });
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
    collection_id: catalogId("COL", [product.collection]),
    collection: cleanString(product.collection, 180),
    brand: cleanString(product.brand, 120),
    product_model_id: cleanString(product.model_id, 80) || catalogId("MDL", [product.collection, product.brand, product.model]),
    model_id: cleanString(product.model_id, 80) || catalogId("MDL", [product.collection, product.brand, product.model]),
    model: cleanString(product.model, 160),
    storage: cleanString(product.storage, 80),
    memory_label: cleanString(product.memory_label || product.storage, 80),
    color: cleanString(product.color, 120),
    color_name: cleanString(product.color, 120),
    color_code: cleanString(product.color_code, 80),
    color_hex: cleanString(product.color_hex, 40),
    sku: cleanString(product.sku, 120),
    image_url: cleanString(product.image_url, 500),
    asset_key: cleanString(product.asset_key, 180),
    stock_quantity: stockQuantityValue(product),
    stock_status: stockStatusValue(product),
    stock_is_set: stockIsSet(product),
    display_order: catalogDisplayOrder(product.display_order),
    status: normalizeSalesStatus(product.status || "ACTIVE"),
    created_at: product.created_at || "",
    updated_at: product.updated_at || "",
    is_test: booleanValue(product.is_test),
    qa_batch: cleanString(product.qa_batch, 120)
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

function normalizeCatalogStatus(status) {
  const normalized = normalizeSalesStatus(status || "ACTIVE");
  return ["ACTIVE", "INACTIVE", "ARCHIVED"].indexOf(normalized) !== -1 ? normalized : "ACTIVE";
}

function normalizeThemeKey(value) {
  const key = cleanString(value, 40).toLowerCase();
  if (["silver", "gold", "platinum"].indexOf(key) !== -1) return key;
  if (key.indexOf("gold") !== -1 || key.indexOf("galaxy s") !== -1) return "gold";
  if (key.indexOf("platinum") !== -1 || key.indexOf("apple") !== -1 || key.indexOf("iphone") !== -1 || key.indexOf("ipad") !== -1) return "platinum";
  return "silver";
}

function inferredThemeKey(collectionName, brand) {
  return normalizeThemeKey([collectionName, brand].filter(Boolean).join(" "));
}

function catalogDisplayOrder(value) {
  const number = Number(value);
  return isFinite(number) ? number : 999;
}

function stockIsSet(product) {
  return product && product.stock_quantity !== undefined && String(product.stock_quantity).trim() !== "";
}

function stockQuantityValue(product) {
  if (!stockIsSet(product)) return null;
  return Math.max(0, Math.floor(Number(product.stock_quantity || 0)));
}

function stockStatusValue(product) {
  if (!stockIsSet(product)) return "NOT_SET";
  return stockQuantityValue(product) > 0 ? "IN_STOCK" : "OUT_OF_STOCK";
}

function normalizeStockQuantity(value) {
  if (value === undefined || value === null || String(value).trim() === "") return "";
  return Math.max(0, Math.floor(Number(value || 0)));
}

function stockAllowsQuantity(product, quantity) {
  if (!stockIsSet(product)) return true;
  return Math.max(1, Number(quantity || 1)) <= stockQuantityValue(product);
}

function publicCollection(row) {
  return {
    collection_id: cleanString(row.collection_id, 80),
    collection_name: cleanString(row.collection_name || row.collection, 180),
    collection: cleanString(row.collection_name || row.collection, 180),
    short_name: cleanString(row.short_name, 80),
    brand: cleanString(row.brand, 120),
    series: cleanString(row.series, 160),
    description: cleanString(row.description, 500),
    theme_key: normalizeThemeKey(row.theme_key || row.collection_name || row.collection || row.brand),
    image_url: cleanString(row.image_url, 500),
    asset_key: cleanString(row.asset_key, 180),
    display_order: catalogDisplayOrder(row.display_order),
    status: normalizeCatalogStatus(row.status || "ACTIVE"),
    created_at: row.created_at || "",
    updated_at: row.updated_at || "",
    is_test: booleanValue(row.is_test),
    qa_batch: cleanString(row.qa_batch, 120)
  };
}

function publicProductModel(row) {
  return {
    product_model_id: cleanString(row.model_id || row.product_model_id, 80),
    model_id: cleanString(row.model_id || row.product_model_id, 80),
    collection_id: cleanString(row.collection_id, 80),
    collection: cleanString(row.collection_name || row.collection, 180),
    collection_name: cleanString(row.collection_name || row.collection, 180),
    brand: cleanString(row.brand, 120),
    series: cleanString(row.series, 160),
    model: cleanString(row.model_name || row.model, 160),
    model_name: cleanString(row.model_name || row.model, 160),
    model_code: cleanString(row.model_code, 80),
    description: cleanString(row.description, 500),
    image_url: cleanString(row.image_url, 500),
    asset_key: cleanString(row.asset_key, 180),
    display_order: catalogDisplayOrder(row.display_order),
    status: normalizeCatalogStatus(row.status || "ACTIVE"),
    created_at: row.created_at || "",
    updated_at: row.updated_at || "",
    is_test: booleanValue(row.is_test),
    qa_batch: cleanString(row.qa_batch, 120)
  };
}

function collectionRows() {
  ensureSalesSheets();
  return sheetToObjects(SHEET_NAMES.productCollections);
}

function modelRows() {
  ensureSalesSheets();
  return sheetToObjects(SHEET_NAMES.productModels);
}

function findCollectionRow(params) {
  const input = params || {};
  const id = cleanString(input.collection_id || input.collectionId, 80);
  const name = cleanString(input.collection_name || input.collection || input.name, 180).toLowerCase();
  return collectionRows().find(function (row) {
    return (id && cleanString(row.collection_id, 80) === id) ||
      (name && cleanString(row.collection_name, 180).toLowerCase() === name);
  }) || null;
}

function findModelRow(params) {
  const input = params || {};
  const id = cleanString(input.model_id || input.product_model_id || input.productModelId, 80);
  const collectionId = cleanString(input.collection_id || input.collectionId, 80);
  const collectionName = cleanString(input.collection_name || input.collection, 180).toLowerCase();
  const brand = cleanString(input.brand, 120).toLowerCase();
  const modelName = cleanString(input.model_name || input.model || input.product_model || input.productModel, 160).toLowerCase();
  return modelRows().find(function (row) {
    if (id && cleanString(row.model_id, 80) === id) return true;
    if (!modelName) return false;
    if (collectionId && cleanString(row.collection_id, 80) !== collectionId) return false;
    if (collectionName && cleanString(row.collection_name, 180).toLowerCase() !== collectionName) return false;
    if (brand && cleanString(row.brand, 120).toLowerCase() !== brand) return false;
    return cleanString(row.model_name, 160).toLowerCase() === modelName;
  }) || null;
}

function collectionStatusIndex() {
  const index = {};
  collectionRows().forEach(function (row) {
    const item = publicCollection(row);
    if (item.collection) index[item.collection.toLowerCase()] = item.status;
    if (item.collection_id) index[item.collection_id] = item.status;
  });
  return index;
}

function modelStatusIndex() {
  const index = {};
  modelRows().forEach(function (row) {
    const item = publicProductModel(row);
    const key = catalogKey([item.collection, item.brand, item.model]);
    if (key) index[key] = item.status;
    if (item.model_id) index[item.model_id] = item.status;
  });
  return index;
}

function isProductVisibleByParentStatus(product, collections, models) {
  const collectionName = cleanString(product.collection, 180).toLowerCase();
  const modelId = cleanString(product.model_id, 80);
  const modelKey = catalogKey([product.collection, product.brand, product.model]);
  const collectionStatus = collections[collectionName] || collections[cleanString(product.collection_id, 80)] || "ACTIVE";
  const modelStatus = models[modelId] || models[modelKey] || "ACTIVE";
  return normalizeCatalogStatus(collectionStatus) === "ACTIVE" && normalizeCatalogStatus(modelStatus) === "ACTIVE";
}

function withCatalogLock(fn) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    return fn();
  } finally {
    lock.releaseLock();
  }
}

function writeCatalogAudit(action, entityType, entityId, admin, beforeValue, afterValue, reason) {
  writeAuditLog(action, "", "SUCCESS", "Catalog mutation", {
    actor: admin && admin.actor_id,
    role: admin && admin.role,
    entity_type: entityType,
    entity_id: entityId,
    before: beforeValue || {},
    after: afterValue || {},
    reason: cleanString(reason, 500)
  });
}

function catalogKey(parts) {
  return (parts || []).map(function (part) {
    return cleanString(part, 220).toLowerCase();
  }).join("|");
}

function catalogId(prefix, parts) {
  const key = catalogKey(parts);
  let hash = 0;
  for (let index = 0; index < key.length; index += 1) {
    hash = ((hash << 5) - hash + key.charCodeAt(index)) | 0;
  }
  const safe = cleanString(parts && parts[parts.length - 1], 80)
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 28) || "ITEM";
  return prefix + "-" + safe + "-" + Math.abs(hash).toString(36).toUpperCase();
}

function activeProductRows(includeInactive) {
  ensureSalesSheets();
  const collections = collectionStatusIndex();
  const models = modelStatusIndex();
  return sheetToObjects(SHEET_NAMES.products).filter(function (product) {
    if (includeInactive) return true;
    if (normalizeCatalogStatus(product.status || "ACTIVE") !== "ACTIVE") return false;
    return isProductVisibleByParentStatus(product, collections, models);
  });
}

function productMatchesField(product, field, expected) {
  const value = cleanString(expected, 220);
  if (!value) return true;
  return cleanString(product[field], 220).toLowerCase() === value.toLowerCase();
}

function safeSheetText(value, maxLength) {
  const text = cleanString(value, maxLength);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function productQuantity(options) {
  const raw = options && (options.quantity || options.qty);
  const quantity = raw === undefined || raw === "" ? 1 : Number(raw);
  if (!isFinite(quantity) || Math.floor(quantity) !== quantity || quantity < 1 || quantity > 99) {
    return {
      ok: false,
      message: "Invalid quantity"
    };
  }
  return {
    ok: true,
    quantity: quantity
  };
}

function pricingVersion(pricing) {
  if (!pricing) return "";
  return [
    cleanString(pricing.pricing_id, 80),
    pricing.updated_at || pricing.effective_from || pricing.created_at || ""
  ].join("@");
}

function productDisplay(product) {
  return {
    collection_id: catalogId("COL", [product.collection]),
    product_model_id: cleanString(product.model_id, 80) || catalogId("MDL", [product.collection, product.brand, product.model]),
    variant_id: catalogId("VAR", [product.collection, product.brand, product.model, product.storage]),
    color_id: catalogId("CLR", [product.collection, product.brand, product.model, product.storage, product.color]),
    product_id: cleanString(product.product_id, 80),
    sku: cleanString(product.sku, 120),
    collection: cleanString(product.collection, 180),
    brand: cleanString(product.brand, 120),
    model_id: cleanString(product.model_id, 80) || catalogId("MDL", [product.collection, product.brand, product.model]),
    model: cleanString(product.model, 160),
    storage: cleanString(product.storage, 80),
    memory_label: cleanString(product.memory_label || product.storage, 80),
    color: cleanString(product.color, 120),
    color_name: cleanString(product.color, 120),
    color_code: cleanString(product.color_code, 80),
    color_hex: cleanString(product.color_hex, 40),
    image_url: cleanString(product.image_url, 500),
    asset_key: cleanString(product.asset_key, 180),
    stock_quantity: stockQuantityValue(product),
    stock_status: stockStatusValue(product),
    stock_is_set: stockIsSet(product),
    display_order: catalogDisplayOrder(product.display_order),
    description: [product.model, product.storage, product.color].filter(Boolean).join(" / "),
    status: normalizeSalesStatus(product.status || "ACTIVE")
  };
}

function resolveProductSelection(options, requireExact) {
  const params = options || {};
  const includeInactive = booleanValue(params.include_inactive || params.includeInactive);
  const products = activeProductRows(includeInactive);
  const productId = cleanString(params.product_id || params.productId, 80);
  const sku = cleanString(params.sku, 120);
  let candidates = products;

  if (productId) {
    candidates = candidates.filter(function (product) {
      return cleanString(product.product_id, 80) === productId;
    });
  }

  if (sku) {
    candidates = candidates.filter(function (product) {
      return cleanString(product.sku, 120).toLowerCase() === sku.toLowerCase();
    });
  }

  [
    ["collection", params.collection || params.collection_id || params.collectionId],
    ["brand", params.brand],
    ["model", params.model || params.product_model || params.productModel],
    ["storage", params.storage || params.storage_option || params.storageOption || params.variant || params.variant_id || params.variantId],
    ["color", params.color || params.color_option || params.colorOption]
  ].forEach(function (pair) {
    if (cleanString(pair[1], 220)) {
      candidates = candidates.filter(function (product) {
        return productMatchesField(product, pair[0], pair[1]);
      });
    }
  });

  if (productId && candidates.length === 0) {
    return { ok: false, message: "Invalid product configuration" };
  }

  if (requireExact && candidates.length !== 1) {
    return {
      ok: false,
      message: candidates.length > 1 ? "Product configuration is ambiguous" : "Product configuration is not available",
      matches: candidates.length
    };
  }

  return {
    ok: true,
    product: candidates[0] || null,
    matches: candidates
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
  const result = resolveProductSelection(options || {}, true);
  return result.ok ? result.product : null;
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
  const quantityResult = productQuantity(options || {});
  if (!quantityResult.ok) return quantityResult;

  const resolved = resolveProductSelection(options || {}, true);
  if (!resolved.ok) return resolved;
  const product = resolved.product;

  if (!product || normalizeSalesStatus(product.status || "ACTIVE") !== "ACTIVE") {
    return {
      ok: false,
      message: "Active product not found"
    };
  }

  if (!stockAllowsQuantity(product, quantityResult.quantity)) {
    return {
      ok: false,
      code: "INSUFFICIENT_STOCK",
      message: "Requested quantity exceeds available stock",
      stock_quantity: stockQuantityValue(product),
      stock_status: stockStatusValue(product)
    };
  }

  const allocation = activePricingAllocationForProduct(product);

  if (!allocation) {
    return {
      ok: false,
      message: "Active pricing allocation not found",
      product: publicProduct(product)
    };
  }

  const quantity = quantityResult.quantity;
  const unitPreVatSatang = Math.max(0, toSatang(allocation.selling_price_before_vat || 0));
  const vatRate = Math.max(0, Math.min(1, Number(allocation.vat_rate || DEFAULT_VAT_RATE)));
  const unitVatSatang = Math.max(0, toSatang(allocation.vat_amount || 0)) || Math.round(unitPreVatSatang * vatRate);
  const subtotalSatang = unitPreVatSatang * quantity;
  const vatSatang = Math.max(0, unitVatSatang * quantity);
  const grandTotalSatang = Math.max(0, subtotalSatang + vatSatang);
  const policy = publicDepositPolicy(activeDepositPolicy());
  const requestedPaymentOption = normalizeSalesStatus((options && (options.payment_option || options.paymentOption)) || "DEPOSIT");
  const paymentOption = requestedPaymentOption === "FULL" || requestedPaymentOption === "FULL_PAYMENT"
    ? "FULL"
    : (policy.enabled ? "DEPOSIT" : "FULL");
  const depositPercent = paymentOption === "DEPOSIT" && policy.enabled ? policy.deposit_percent : 100;
  const depositAmountSatang = percentSatang(grandTotalSatang, depositPercent);
  const balanceAmountSatang = Math.max(0, grandTotalSatang - depositAmountSatang);
  const productPrice = fromSatang(unitPreVatSatang);
  const serviceFee = 0;
  const discount = 0;
  const unitPreVatAmount = fromSatang(unitPreVatSatang);
  const subtotal = fromSatang(subtotalSatang);
  const vat = fromSatang(vatSatang);
  const grandTotal = fromSatang(grandTotalSatang);
  const depositAmount = fromSatang(depositAmountSatang);
  const balanceAmount = fromSatang(balanceAmountSatang);
  const lineItems = [
    {
      type: "SSBMS_BUNDLE",
      product_id: product.product_id,
      sku: product.sku,
      name: "SSBMS System Bundle - " + cleanString(product.model, 160),
      description: [
        "การตั้งค่าและติดตั้งระบบ SSBMS",
        product.storage,
        product.color
      ].filter(Boolean).join(" / "),
      quantity: quantity,
      unit_price: unitPreVatAmount,
      total: subtotal
    }
  ];

  return {
    ok: true,
    product: productDisplay(product),
    pricing: publicPricingAllocation(allocation, false),
    pricing_allocation: publicPricingAllocation(allocation, false),
    policy: policy,
    pricing_version: cleanString(allocation.pricing_version_id, 80),
    calculated_at: new Date(),
    quote: {
      product_id: cleanString(product.product_id, 80),
      sku: cleanString(product.sku, 120),
      quantity: quantity,
      product_price: productPrice,
      service_fee: serviceFee,
      unit_pre_vat_amount: unitPreVatAmount,
      promotion: "",
      discount: discount,
      subtotal: subtotal,
      taxable_amount: subtotal,
      vat_rate: vatRate,
      vat: vat,
      vat_amount: vat,
      total: grandTotal,
      grand_total: grandTotal,
      total_including_vat: grandTotal,
      payment_option: paymentOption,
      deposit_percent: depositPercent,
      deposit_amount: depositAmount,
      balance_amount: balanceAmount,
      outstanding_balance: balanceAmount,
      pricing_version: cleanString(allocation.pricing_version_id, 80),
      pricing_version_id: cleanString(allocation.pricing_version_id, 80),
      calculated_at: new Date(),
      line_items: lineItems,
      bundle_warning: "สินค้านี้เป็นชุดระบบ SSBMS ไม่ใช่โทรศัพท์มือถือเพียงอย่างเดียว",
      pricing_snapshot: allocationSnapshot(allocation, quantity)
    }
  };
}

function safeStartingPrice(product) {
  const allocation = activePricingAllocationForProduct(product);
  if (!allocation) return null;
  return Number(allocation.selling_price_including_vat || 0);
}

function listCollections(params) {
  const options = params || {};
  const includeInactive = booleanValue(options.include_inactive || options.includeInactive);
  if (includeInactive) {
    const admin = requireAdminActor(options);
    if (!admin.ok) return admin;
  }
  const map = {};
  collectionRows().forEach(function (row) {
    const item = publicCollection(row);
    if (!includeInactive && item.status !== "ACTIVE") return;
    const key = catalogKey([item.collection]);
    if (!key) return;
    map[key] = Object.assign({}, item, {
      brands: {},
      active_sku_count: 0,
      model_count: 0,
      starting_price: null
    });
  });
  activeProductRows(includeInactive).forEach(function (product) {
    if (!includeInactive && !activePricingAllocationForProduct(product)) return;
    const key = catalogKey([product.collection]);
    if (!key) return;
    if (!map[key]) {
      map[key] = {
        collection_id: catalogId("COL", [product.collection]),
        collection_name: cleanString(product.collection, 180),
        collection: cleanString(product.collection, 180),
        short_name: cleanString(product.collection, 80),
        brand: cleanString(product.brand, 120),
        series: "",
        description: "",
        theme_key: normalizeThemeKey(product.collection || product.brand),
        image_url: "",
        asset_key: "",
        display_order: 999,
        status: "ACTIVE",
        brands: {},
        active_sku_count: 0,
        model_count: 0,
        starting_price: null
      };
    }
    map[key].brands[cleanString(product.brand, 120)] = true;
    map[key].active_sku_count += normalizeSalesStatus(product.status || "ACTIVE") === "ACTIVE" ? 1 : 0;
    const price = safeStartingPrice(product);
    if (price !== null && (map[key].starting_price === null || price < map[key].starting_price)) {
      map[key].starting_price = price;
    }
  });
  const collections = Object.keys(map).map(function (key) {
    const item = map[key];
    item.brands = Object.keys(item.brands).filter(Boolean).sort();
    item.model_count = listProductModels({ collection: item.collection }).total || 0;
    return item;
  }).sort(function (a, b) {
    return catalogDisplayOrder(a.display_order) - catalogDisplayOrder(b.display_order) || a.collection.localeCompare(b.collection);
  });
  return { ok: true, total: collections.length, collections: collections };
}

function listProductModels(params) {
  const options = params || {};
  const includeInactive = booleanValue(options.include_inactive || options.includeInactive);
  if (includeInactive) {
    const admin = requireAdminActor(options);
    if (!admin.ok) return admin;
  }
  const collection = cleanString(options.collection, 180).toLowerCase();
  const brand = cleanString(options.brand, 120).toLowerCase();
  const query = cleanString(options.q || options.search, 200).toLowerCase();
  const map = {};
  const collectionIndex = {};
  collectionRows().forEach(function (row) {
    const item = publicCollection(row);
    collectionIndex[item.collection.toLowerCase()] = item;
  });
  modelRows().forEach(function (row) {
    const item = publicProductModel(row);
    const parent = collectionIndex[item.collection.toLowerCase()];
    if (!includeInactive && item.status !== "ACTIVE") return;
    if (!includeInactive && parent && parent.status !== "ACTIVE") return;
    if (collection && item.collection.toLowerCase() !== collection) return;
    if (brand && item.brand.toLowerCase() !== brand) return;
    if (query && [item.collection, item.brand, item.model, item.model_code].join(" ").toLowerCase().indexOf(query) === -1) return;
    const key = catalogKey([item.collection, item.brand, item.model]);
    if (!key) return;
    map[key] = Object.assign({}, item, {
      theme_key: parent ? parent.theme_key : normalizeThemeKey(item.collection || item.brand),
      collection_image_url: parent ? parent.image_url : "",
      collection_asset_key: parent ? parent.asset_key : "",
      variant_count: 0,
      color_count: 0,
      sku_count: 0,
      starting_price: null,
      default_product_id: "",
      default_sku: "",
      total_stock: 0,
      stock_set_count: 0,
      low_stock_count: 0,
      storages: {},
      colors: {}
    });
  });
  activeProductRows(includeInactive).forEach(function (product) {
    if (collection && cleanString(product.collection, 180).toLowerCase() !== collection) return;
    if (brand && cleanString(product.brand, 120).toLowerCase() !== brand) return;
    if (query && [product.collection, product.brand, product.model, product.storage, product.color, product.sku].join(" ").toLowerCase().indexOf(query) === -1) return;
    const allocation = activePricingAllocationForProduct(product);
    if (!includeInactive && !allocation) return;
    const key = catalogKey([product.collection, product.brand, product.model]);
    if (!map[key]) {
      map[key] = {
        product_model_id: cleanString(product.model_id, 80) || catalogId("MDL", [product.collection, product.brand, product.model]),
        model_id: cleanString(product.model_id, 80) || catalogId("MDL", [product.collection, product.brand, product.model]),
        collection_id: catalogId("COL", [product.collection]),
        collection: cleanString(product.collection, 180),
        collection_name: cleanString(product.collection, 180),
        brand: cleanString(product.brand, 120),
        model: cleanString(product.model, 160),
        model_name: cleanString(product.model, 160),
        model_code: "",
        description: "",
        image_url: cleanString(product.image_url, 500),
        asset_key: cleanString(product.asset_key, 180),
        theme_key: collectionIndex[cleanString(product.collection, 180).toLowerCase()] ? collectionIndex[cleanString(product.collection, 180).toLowerCase()].theme_key : normalizeThemeKey(product.collection || product.brand),
        collection_image_url: collectionIndex[cleanString(product.collection, 180).toLowerCase()] ? collectionIndex[cleanString(product.collection, 180).toLowerCase()].image_url : "",
        collection_asset_key: collectionIndex[cleanString(product.collection, 180).toLowerCase()] ? collectionIndex[cleanString(product.collection, 180).toLowerCase()].asset_key : "",
        display_order: catalogDisplayOrder(product.display_order),
        variant_count: 0,
        color_count: 0,
        sku_count: 0,
        starting_price: null,
        default_product_id: cleanString(product.product_id, 80),
        default_sku: cleanString(product.sku, 120),
        total_stock: 0,
        stock_set_count: 0,
        low_stock_count: 0,
        status: normalizeCatalogStatus(product.status || "ACTIVE"),
        storages: {},
        colors: {}
      };
    }
    map[key].sku_count += 1;
    map[key].storages[cleanString(product.storage, 80)] = true;
    map[key].colors[cleanString(product.color, 120)] = true;
    if (stockIsSet(product)) {
      map[key].stock_set_count += 1;
      map[key].total_stock += stockQuantityValue(product);
      if (stockQuantityValue(product) > 0 && stockQuantityValue(product) <= 3) {
        map[key].low_stock_count += 1;
      }
    }
    const price = safeStartingPrice(product);
    if (price !== null && (map[key].starting_price === null || price < map[key].starting_price)) {
      map[key].starting_price = price;
      map[key].default_product_id = cleanString(product.product_id, 80);
      map[key].default_sku = cleanString(product.sku, 120);
    }
  });
  const models = Object.keys(map).map(function (key) {
    const item = map[key];
    item.storage_options = Object.keys(item.storages).filter(Boolean).sort();
    item.color_options = Object.keys(item.colors).filter(Boolean).sort();
    item.variant_count = item.storage_options.length;
    item.color_count = item.color_options.length;
    delete item.storages;
    delete item.colors;
    return item;
  }).sort(function (a, b) {
    return catalogDisplayOrder(a.display_order) - catalogDisplayOrder(b.display_order) ||
      [a.collection, a.brand, a.model].join(" ").localeCompare([b.collection, b.brand, b.model].join(" "));
  });
  return { ok: true, total: models.length, models: models };
}

function listProductVariants(params) {
  const options = params || {};
  const includeInactive = booleanValue(options.include_inactive || options.includeInactive);
  if (includeInactive) {
    const admin = requireAdminActor(options);
    if (!admin.ok) return admin;
  }
  const collection = cleanString(options.collection, 180).toLowerCase();
  const brand = cleanString(options.brand, 120).toLowerCase();
  const model = cleanString(options.model || options.product_model || options.productModel, 160).toLowerCase();
  const rows = activeProductRows(includeInactive).filter(function (product) {
    if (!includeInactive && !activePricingAllocationForProduct(product)) return false;
    if (collection && cleanString(product.collection, 180).toLowerCase() !== collection) return false;
    if (brand && cleanString(product.brand, 120).toLowerCase() !== brand) return false;
    if (model && cleanString(product.model, 160).toLowerCase() !== model) return false;
    return true;
  });
  const variantMap = {};
  rows.forEach(function (product) {
    const key = catalogKey([product.collection, product.brand, product.model, product.storage]);
    if (!variantMap[key]) {
      variantMap[key] = {
        variant_id: catalogId("VAR", [product.collection, product.brand, product.model, product.storage]),
        model_id: cleanString(product.model_id, 80) || catalogId("MDL", [product.collection, product.brand, product.model]),
        collection: cleanString(product.collection, 180),
        brand: cleanString(product.brand, 120),
        model: cleanString(product.model, 160),
        storage: cleanString(product.storage, 80),
        memory_label: cleanString(product.memory_label || product.storage, 80),
        colors: [],
        sku_count: 0
      };
    }
    variantMap[key].sku_count += 1;
    variantMap[key].colors.push({
      color: cleanString(product.color, 120),
      color_name: cleanString(product.color, 120),
      color_code: cleanString(product.color_code, 80),
      color_hex: cleanString(product.color_hex, 40),
      image_url: cleanString(product.image_url, 500),
      asset_key: cleanString(product.asset_key, 180),
      stock_quantity: stockQuantityValue(product),
      stock_status: stockStatusValue(product),
      stock_is_set: stockIsSet(product),
      product_id: cleanString(product.product_id, 80),
      sku: cleanString(product.sku, 120),
      status: normalizeSalesStatus(product.status || "ACTIVE"),
      available: normalizeSalesStatus(product.status || "ACTIVE") === "ACTIVE" && (!stockIsSet(product) || stockQuantityValue(product) > 0)
    });
  });
  const variants = Object.keys(variantMap).map(function (key) {
    const item = variantMap[key];
    item.colors.sort(function (a, b) { return a.color.localeCompare(b.color); });
    return item;
  }).sort(function (a, b) {
    return a.storage.localeCompare(b.storage);
  });
  return { ok: true, total: variants.length, variants: variants };
}

function getCollection(params) {
  const row = findCollectionRow(params || {});
  if (!row) return { ok: false, message: "Collection not found" };
  return { ok: true, collection: publicCollection(row) };
}

function getProductModel(params) {
  const row = findModelRow(params || {});
  if (!row) return { ok: false, message: "Product model not found" };
  return { ok: true, model: publicProductModel(row) };
}

function createCollection(body) {
  return withCatalogLock(function () {
    const admin = requireAdminActor(body || {});
    if (!admin.ok) return admin;
    ensureSalesSheets();
    const name = safeSheetText(body.collection_name || body.collection || body.name, 180);
    if (!name) return { ok: false, message: "Collection name is required" };
    const duplicate = findCollectionRow({ collection_name: name });
    if (duplicate) return { ok: false, message: "Collection already exists", collection: publicCollection(duplicate) };
    const now = new Date();
    const row = {
      collection_id: makeId("COL"),
      collection_name: name,
      short_name: safeSheetText(body.short_name || name, 80),
      brand: safeSheetText(body.brand, 120),
      series: safeSheetText(body.series, 160),
      description: safeSheetText(body.description, 500),
      theme_key: normalizeThemeKey(body.theme_key || name),
      image_url: safeSheetText(body.image_url, 500),
      asset_key: safeSheetText(body.asset_key, 180),
      display_order: catalogDisplayOrder(body.display_order),
      status: normalizeCatalogStatus(body.status || "ACTIVE"),
      created_at: now,
      updated_at: now,
      created_by: admin.actor_id,
      updated_by: admin.actor_id,
      is_test: isQaRecord(body || {}),
      qa_batch: qaBatchFor(body || {})
    };
    appendObject(SHEET_NAMES.productCollections, row);
    writeCatalogAudit("createCollection", "COLLECTION", row.collection_id, admin, null, publicCollection(row), body.reason);
    return { ok: true, collection: publicCollection(row) };
  });
}

function updateCollection(body) {
  return withCatalogLock(function () {
    const admin = requireAdminActor(body || {});
    if (!admin.ok) return admin;
    ensureSalesSheets();
    const row = findCollectionRow(body || {});
    if (!row) return { ok: false, message: "Collection not found" };
    const beforeValue = publicCollection(row);
    const updates = {
      collection_name: safeSheetText(body.collection_name || body.collection || row.collection_name, 180),
      short_name: safeSheetText(body.short_name || row.short_name, 80),
      brand: safeSheetText(body.brand || row.brand, 120),
      series: safeSheetText(body.series || row.series, 160),
      description: safeSheetText(body.description || row.description, 500),
      theme_key: normalizeThemeKey(body.theme_key || row.theme_key),
      image_url: safeSheetText(body.image_url || row.image_url, 500),
      asset_key: safeSheetText(body.asset_key || row.asset_key, 180),
      display_order: catalogDisplayOrder(body.display_order !== undefined ? body.display_order : row.display_order),
      status: normalizeCatalogStatus(body.status || row.status),
      updated_at: new Date(),
      updated_by: admin.actor_id
    };
    const renamed = cleanString(updates.collection_name, 180) !== cleanString(row.collection_name, 180);
    if (renamed && findCollectionRow({ collection_name: updates.collection_name })) {
      return { ok: false, message: "Collection name already exists" };
    }
    updateRowFields(SHEET_NAMES.productCollections, row._row, updates);
    if (renamed) {
      modelRows().forEach(function (model) {
        if (cleanString(model.collection_name, 180).toLowerCase() === cleanString(row.collection_name, 180).toLowerCase()) {
          updateRowFields(SHEET_NAMES.productModels, model._row, {
            collection_name: updates.collection_name,
            collection_id: updates.collection_id || row.collection_id,
            updated_at: new Date(),
            updated_by: admin.actor_id
          });
        }
      });
      sheetToObjects(SHEET_NAMES.products).forEach(function (product) {
        if (cleanString(product.collection, 180).toLowerCase() === cleanString(row.collection_name, 180).toLowerCase()) {
          updateRowFields(SHEET_NAMES.products, product._row, {
            collection: updates.collection_name,
            updated_at: new Date(),
            updated_by: admin.actor_id
          });
        }
      });
    }
    const updated = Object.assign({}, row, updates);
    writeCatalogAudit("updateCollection", "COLLECTION", row.collection_id, admin, beforeValue, publicCollection(updated), body.reason);
    return { ok: true, collection: publicCollection(updated) };
  });
}

function setCollectionStatus(body) {
  body = Object.assign({}, body || {}, { status: body && body.status });
  return updateCollection(body);
}

function createProductModel(body) {
  return withCatalogLock(function () {
    const admin = requireAdminActor(body || {});
    if (!admin.ok) return admin;
    ensureSalesSheets();
    const collection = findCollectionRow(body || {});
    const collectionName = safeSheetText((collection && collection.collection_name) || body.collection_name || body.collection, 180);
    const brand = safeSheetText(body.brand || (collection && collection.brand), 120);
    const modelName = safeSheetText(body.model_name || body.model, 160);
    if (!collectionName || !brand || !modelName) return { ok: false, message: "Collection, brand and model are required" };
    const duplicate = findModelRow({ collection: collectionName, brand: brand, model: modelName });
    if (duplicate) return { ok: false, message: "Product model already exists", model: publicProductModel(duplicate) };
    const now = new Date();
    const row = {
      model_id: makeId("MDL"),
      collection_id: collection ? collection.collection_id : catalogId("COL", [collectionName]),
      collection_name: collectionName,
      brand: brand,
      series: safeSheetText(body.series || (collection && collection.series), 160),
      model_name: modelName,
      model_code: safeSheetText(body.model_code || body.modelCode, 80),
      description: safeSheetText(body.description, 500),
      image_url: safeSheetText(body.image_url, 500),
      asset_key: safeSheetText(body.asset_key, 180),
      display_order: catalogDisplayOrder(body.display_order),
      status: normalizeCatalogStatus(body.status || "ACTIVE"),
      created_at: now,
      updated_at: now,
      created_by: admin.actor_id,
      updated_by: admin.actor_id,
      is_test: isQaRecord(body || {}),
      qa_batch: qaBatchFor(body || {})
    };
    appendObject(SHEET_NAMES.productModels, row);
    writeCatalogAudit("createProductModel", "MODEL", row.model_id, admin, null, publicProductModel(row), body.reason);
    return { ok: true, model: publicProductModel(row) };
  });
}

function updateProductModel(body) {
  return withCatalogLock(function () {
    const admin = requireAdminActor(body || {});
    if (!admin.ok) return admin;
    ensureSalesSheets();
    const row = findModelRow(body || {});
    if (!row) return { ok: false, message: "Product model not found" };
    const collection = findCollectionRow(body || {}) || findCollectionRow({ collection_id: row.collection_id, collection_name: row.collection_name });
    const beforeValue = publicProductModel(row);
    const updates = {
      collection_id: collection ? collection.collection_id : cleanString(row.collection_id, 80),
      collection_name: safeSheetText((collection && collection.collection_name) || body.collection_name || body.collection || row.collection_name, 180),
      brand: safeSheetText(body.brand || row.brand, 120),
      series: safeSheetText(body.series || row.series, 160),
      model_name: safeSheetText(body.model_name || body.model || row.model_name, 160),
      model_code: safeSheetText(body.model_code || body.modelCode || row.model_code, 80),
      description: safeSheetText(body.description || row.description, 500),
      image_url: safeSheetText(body.image_url || row.image_url, 500),
      asset_key: safeSheetText(body.asset_key || row.asset_key, 180),
      display_order: catalogDisplayOrder(body.display_order !== undefined ? body.display_order : row.display_order),
      status: normalizeCatalogStatus(body.status || row.status),
      updated_at: new Date(),
      updated_by: admin.actor_id
    };
    const renamed = catalogKey([updates.collection_name, updates.brand, updates.model_name]) !== catalogKey([row.collection_name, row.brand, row.model_name]);
    if (renamed && findModelRow({ collection: updates.collection_name, brand: updates.brand, model: updates.model_name })) {
      return { ok: false, message: "Product model already exists" };
    }
    updateRowFields(SHEET_NAMES.productModels, row._row, updates);
    if (renamed) {
      sheetToObjects(SHEET_NAMES.products).forEach(function (product) {
        const sameModelId = cleanString(product.model_id, 80) && cleanString(product.model_id, 80) === cleanString(row.model_id, 80);
        const sameNames = catalogKey([product.collection, product.brand, product.model]) === catalogKey([row.collection_name, row.brand, row.model_name]);
        if (sameModelId || sameNames) {
          updateRowFields(SHEET_NAMES.products, product._row, {
            collection: updates.collection_name,
            brand: updates.brand,
            model_id: row.model_id,
            model: updates.model_name,
            updated_at: new Date(),
            updated_by: admin.actor_id
          });
        }
      });
    }
    const updated = Object.assign({}, row, updates);
    writeCatalogAudit("updateProductModel", "MODEL", row.model_id, admin, beforeValue, publicProductModel(updated), body.reason);
    return { ok: true, model: publicProductModel(updated) };
  });
}

function setProductModelStatus(body) {
  body = Object.assign({}, body || {}, { status: body && body.status });
  return updateProductModel(body);
}

function resolveProductConfiguration(params) {
  const quantityResult = productQuantity(params || {});
  if (!quantityResult.ok) return quantityResult;
  const resolved = resolveProductSelection(params || {}, true);
  if (!resolved.ok) return resolved;
  const allocation = activePricingAllocationForProduct(resolved.product);
  const legacyPricing = activePricingForProduct(resolved.product);
  return {
    ok: true,
    configuration: productDisplay(resolved.product),
    product: productDisplay(resolved.product),
    availability: normalizeSalesStatus(resolved.product.status || "ACTIVE") === "ACTIVE" ? "AVAILABLE" : "INACTIVE",
    pricing_eligible: Boolean(allocation),
    pricing_version: allocation ? cleanString(allocation.pricing_version_id, 80) : pricingVersion(legacyPricing),
    quantity: quantityResult.quantity
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
      const normalizedStatus = normalizeCatalogStatus(product.status || "ACTIVE");
      if (!includeInactive && normalizedStatus !== "ACTIVE") return false;
      if (!includeInactive && !isProductVisibleByParentStatus(product, collectionStatusIndex(), modelStatusIndex())) return false;
      if (!includeInactive && !activePricingAllocationForProduct(product)) return false;
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
      const allocation = activePricingAllocationForProduct(product);
      const legacyPricing = activePricingForProduct(product);
      publicItem.pricing = allocation ? publicPricingAllocation(allocation, false) : (legacyPricing ? publicPricing(legacyPricing) : null);
      publicItem.pricing_allocation = allocation ? publicPricingAllocation(allocation, includeInactive) : null;
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
  const allocation = activePricingAllocationForProduct(product);
  return {
    ok: true,
    product: publicProduct(product),
    pricing: allocation ? publicPricingAllocation(allocation, false) : (pricing ? publicPricing(pricing) : null),
    pricing_allocation: allocation ? publicPricingAllocation(allocation, true) : null
  };
}

function createProduct(body) {
  return withCatalogLock(function () {
  ensureSalesSheets();
  const admin = requireAdminActor(body);
  if (!admin.ok) return admin;

  const sku = safeSheetText(body && body.sku, 120);
  if (!sku) return { ok: false, message: "SKU is required" };

  const duplicate = sheetToObjects(SHEET_NAMES.products).find(function (product) {
    return cleanString(product.sku, 120).toLowerCase() === sku.toLowerCase();
  });
  if (duplicate) {
    return { ok: false, message: "SKU already exists", product: publicProduct(duplicate) };
  }

  const modelRow = findModelRow(body || {});
  const collectionRow = findCollectionRow(body || {}) || (modelRow ? findCollectionRow({ collection_id: modelRow.collection_id, collection_name: modelRow.collection_name }) : null);
  const now = new Date();
  const product = {
    product_id: makeId("PRD"),
    collection: safeSheetText((collectionRow && collectionRow.collection_name) || (modelRow && modelRow.collection_name) || body.collection_name || body.collection, 180),
    brand: safeSheetText(body.brand || (modelRow && modelRow.brand) || (collectionRow && collectionRow.brand), 120),
    model_id: cleanString((modelRow && modelRow.model_id) || body.model_id || body.product_model_id, 80),
    model: safeSheetText((modelRow && modelRow.model_name) || body.model_name || body.model, 160),
    storage: safeSheetText(body.storage || body.memory_label, 80),
    memory_label: safeSheetText(body.memory_label || body.storage, 80),
    color: safeSheetText(body.color_name || body.color, 120),
    color_code: safeSheetText(body.color_code, 80),
    color_hex: safeSheetText(body.color_hex, 40),
    sku: sku,
    image_url: safeSheetText(body.image_url, 500),
    asset_key: safeSheetText(body.asset_key, 180),
    stock_quantity: normalizeStockQuantity(body.stock_quantity !== undefined ? body.stock_quantity : body.stock),
    stock_status: "",
    display_order: catalogDisplayOrder(body.display_order),
    status: normalizeCatalogStatus(body.status || "ACTIVE"),
    created_at: now,
    updated_at: now,
    created_by: admin.actor_id,
    updated_by: admin.actor_id,
    is_test: isQaRecord(body || {}),
    qa_batch: qaBatchFor(body || {})
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
  writeCatalogAudit("createProductVariant", "VARIANT", product.product_id, admin, null, publicProduct(product), body.reason);

  return { ok: true, product: publicProduct(product) };
  });
}

function updateProduct(body) {
  return withCatalogLock(function () {
  ensureSalesSheets();
  const admin = requireAdminActor(body);
  if (!admin.ok) return admin;

  const product = findProductById(body && body.product_id);
  if (!product) return { ok: false, message: "Product not found" };
  const beforeValue = publicProduct(product);
  const modelRow = findModelRow(body || {});
  const collectionRow = findCollectionRow(body || {}) || (modelRow ? findCollectionRow({ collection_id: modelRow.collection_id, collection_name: modelRow.collection_name }) : null);

  const updates = {
    collection: safeSheetText((collectionRow && collectionRow.collection_name) || (modelRow && modelRow.collection_name) || body.collection_name || body.collection || product.collection, 180),
    brand: safeSheetText(body.brand || (modelRow && modelRow.brand) || (collectionRow && collectionRow.brand) || product.brand, 120),
    model_id: cleanString((modelRow && modelRow.model_id) || body.model_id || body.product_model_id || product.model_id, 80),
    model: safeSheetText((modelRow && modelRow.model_name) || body.model_name || body.model || product.model, 160),
    storage: safeSheetText(body.storage || body.memory_label || product.storage, 80),
    memory_label: safeSheetText(body.memory_label || body.storage || product.memory_label || product.storage, 80),
    color: safeSheetText(body.color_name || body.color || product.color, 120),
    color_code: safeSheetText(body.color_code || product.color_code, 80),
    color_hex: safeSheetText(body.color_hex || product.color_hex, 40),
    sku: safeSheetText(body.sku || product.sku, 120),
    image_url: safeSheetText(body.image_url || product.image_url, 500),
    asset_key: safeSheetText(body.asset_key || product.asset_key, 180),
    stock_quantity: body.stock_quantity !== undefined || body.stock !== undefined
      ? normalizeStockQuantity(body.stock_quantity !== undefined ? body.stock_quantity : body.stock)
      : product.stock_quantity,
    stock_status: "",
    display_order: catalogDisplayOrder(body.display_order !== undefined ? body.display_order : product.display_order),
    status: normalizeCatalogStatus(body.status || product.status || "ACTIVE"),
    updated_at: new Date(),
    updated_by: admin.actor_id
  };

  const duplicate = sheetToObjects(SHEET_NAMES.products).find(function (item) {
    return cleanString(item.product_id, 80) !== cleanString(product.product_id, 80) &&
      cleanString(item.sku, 120).toLowerCase() === updates.sku.toLowerCase();
  });

  if (duplicate) {
    return { ok: false, message: "SKU already exists", product: publicProduct(duplicate) };
  }

  updateRowFields(SHEET_NAMES.products, product._row, updates);
  writeAuditLog("updateProduct", "", "SUCCESS", "Product updated", {
    actor_id: admin.actor_id,
    product_id: product.product_id
  });
  writeCatalogAudit("updateProductVariant", "VARIANT", product.product_id, admin, beforeValue, publicProduct(Object.assign({}, product, updates)), body.reason);

  return { ok: true, product: publicProduct(Object.assign({}, product, updates)) };
  });
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

function createProductVariant(body) {
  return createProduct(body || {});
}

function updateProductVariant(body) {
  return updateProduct(body || {});
}

function setProductVariantStatus(body) {
  return updateProduct(Object.assign({}, body || {}, { status: body && body.status }));
}

function simpleProductArray(value) {
  if (Array.isArray(value)) return value;
  return parseJsonValue(value, []);
}

function skuPart(value, fallback) {
  const cleaned = cleanString(value || fallback || "", 80).toUpperCase().replace(/[^A-Z0-9]+/g, "");
  return cleaned || "SKU";
}

function generatedSimpleSku(collectionName, modelCode, modelName, storage, color, existingSkus) {
  const prefix = normalizeThemeKey(collectionName) === "gold" ? "GLD" : normalizeThemeKey(collectionName) === "platinum" ? "PLT" : "SIL";
  const storagePart = skuPart(storage).replace(/GB$/, "").replace(/TB$/, "T");
  const colorPart = skuPart(color).slice(0, 3);
  const modelPart = skuPart(modelCode || modelName).slice(0, 8);
  let sku = ["SSB", prefix, modelPart, storagePart, colorPart].filter(Boolean).join("-");
  let counter = 2;
  while (existingSkus[sku.toLowerCase()]) {
    sku = ["SSB", prefix, modelPart, storagePart, colorPart, counter].filter(Boolean).join("-");
    counter += 1;
  }
  existingSkus[sku.toLowerCase()] = true;
  return sku;
}

function findProductByModelStorageColor(modelRow, storage, color) {
  const modelId = cleanString(modelRow && modelRow.model_id, 80);
  const key = catalogKey([
    modelRow && modelRow.collection_name,
    modelRow && modelRow.brand,
    modelRow && modelRow.model_name,
    storage,
    color
  ]);
  return sheetToObjects(SHEET_NAMES.products).find(function (product) {
    const sameId = modelId && cleanString(product.model_id, 80) === modelId;
    const sameKey = catalogKey([product.collection, product.brand, product.model, product.storage, product.color]) === key;
    const sameOption = cleanString(product.storage, 80).toLowerCase() === cleanString(storage, 80).toLowerCase() &&
      cleanString(product.color, 120).toLowerCase() === cleanString(color, 120).toLowerCase();
    return (sameId && sameOption) || sameKey;
  }) || null;
}

function saveSimplePricingVersion(product, beforeVat, vatRate, admin, body) {
  const active = activePricingAllocationForProduct(product);
  const beforeVatSatang = Math.max(0, toSatang(beforeVat || 0));
  const normalizedVatRate = Math.max(0, Math.min(1, Number(vatRate || DEFAULT_VAT_RATE)));
  if (
    active &&
    toSatang(active.selling_price_before_vat || 0) === beforeVatSatang &&
    Number(active.vat_rate || 0) === normalizedVatRate
  ) {
    return { changed: false, allocation: publicPricingAllocation(active, true) };
  }

  sheetToObjects(SHEET_NAMES.pricingAllocationVersions).forEach(function (item) {
    if (
      normalizeSalesStatus(item.status || "") === "ACTIVE" &&
      (cleanString(item.product_id, 80) === cleanString(product.product_id, 80) ||
        cleanString(item.sku, 120).toLowerCase() === cleanString(product.sku, 120).toLowerCase())
    ) {
      updateRowFields(SHEET_NAMES.pricingAllocationVersions, item._row, {
        status: "INACTIVE",
        effective_until: new Date(),
        updated_at: new Date()
      });
    }
  });

  const data = normalizeAllocationBody(Object.assign({}, body || {}, {
    product_id: product.product_id,
    sku: product.sku,
    status: "ACTIVE",
    device_price: fromSatang(beforeVatSatang),
    setup_fee: 0,
    safety_book_cost: 0,
    fingerprint_cost: 0,
    signal_shield_cost: 0,
    assembly_cost: 0,
    annual_sim_cost: 0,
    operation_cost: 0,
    spc_cost: 0,
    central_commission_pool: 0,
    company_revenue_allocation: 0,
    vat_rate: normalizedVatRate,
    change_reason: "Simple product management price update"
  }), product, null, admin);
  const issues = pricingAllocationIssues(data);
  if (issues.length) {
    return financeError("PRICING_INTEGRITY_ERROR", "Pricing allocation does not reconcile.", { issues: issues });
  }
  data.approved_by = admin.actor_id;
  appendObject(SHEET_NAMES.pricingAllocationVersions, data);
  writeAccountingAudit("PRICING_ALLOCATION", data.pricing_version_id, "PRICING_VERSION_ACTIVATED", "SUCCESS", admin.actor_id, "Simple product pricing activated", data);
  return { changed: true, allocation: publicPricingAllocation(data, true) };
}

function saveSimpleProductModel(body) {
  return withCatalogLock(function () {
    const admin = requireAdminActor(body || {});
    if (!admin.ok) return admin;
    ensureSalesSheets();
    const collection = findCollectionRow(body || {});
    const collectionName = safeSheetText((collection && collection.collection_name) || body.collection_name || body.collection, 180);
    const brand = safeSheetText(body.brand || (collection && collection.brand), 120);
    const modelName = safeSheetText(body.model_name || body.model, 160);
    if (!collectionName || !brand || !modelName) {
      return { ok: false, message: "Collection, brand and product model are required" };
    }

    const now = new Date();
    let modelRow = cleanString(body.model_id || body.product_model_id, 80)
      ? findModelRow({ model_id: body.model_id || body.product_model_id })
      : findModelRow({ collection: collectionName, brand: brand, model: modelName });
    const modelPayload = {
      collection_id: collection ? collection.collection_id : catalogId("COL", [collectionName]),
      collection_name: collectionName,
      brand: brand,
      series: safeSheetText(body.series || (collection && collection.series), 160),
      model_name: modelName,
      model_code: safeSheetText(body.model_code || body.modelCode, 80),
      description: safeSheetText(body.description, 500),
      image_url: safeSheetText(body.image_url, 500),
      asset_key: safeSheetText(body.asset_key, 180),
      display_order: catalogDisplayOrder(body.display_order),
      status: normalizeCatalogStatus(body.status || "ACTIVE"),
      updated_at: now,
      updated_by: admin.actor_id
    };

    if (modelRow) {
      updateRowFields(SHEET_NAMES.productModels, modelRow._row, modelPayload);
      modelRow = Object.assign({}, modelRow, modelPayload);
    } else {
      modelRow = Object.assign({}, modelPayload, {
        model_id: makeId("MDL"),
        created_at: now,
        created_by: admin.actor_id,
        is_test: isQaRecord(body || {}),
        qa_batch: qaBatchFor(body || {})
      });
      appendObject(SHEET_NAMES.productModels, modelRow);
    }

    const storages = simpleProductArray(body.storage_options || body.storages);
    const colors = simpleProductArray(body.color_options || body.colors);
    const combinations = simpleProductArray(body.combinations);
    if (!storages.length || !colors.length || !combinations.length) {
      return { ok: false, message: "At least one storage, one color and one valid combination are required" };
    }

    const storageMap = {};
    storages.forEach(function (item) {
      const label = safeSheetText(item && (item.storage || item.label), 80);
      if (!label) return;
      storageMap[label] = {
        storage: label,
        ram: safeSheetText(item.ram || item.ram_label, 80),
        base_price: Math.max(0, Number(item.base_price || item.price || 0)),
        status: normalizeCatalogStatus(item.status || (item.active === false ? "INACTIVE" : "ACTIVE")),
        display_order: catalogDisplayOrder(item.display_order)
      };
    });

    const colorMap = {};
    colors.forEach(function (item) {
      const name = safeSheetText(item && (item.color || item.name), 120);
      if (!name) return;
      colorMap[name] = {
        color: name,
        color_code: safeSheetText(item.color_code || item.code, 80),
        color_hex: safeSheetText(item.color_hex || item.hex, 40),
        price_adjustment: Number(item.price_adjustment || item.adjustment || 0),
        image_url: safeSheetText(item.image_url, 500),
        asset_key: safeSheetText(item.asset_key, 180),
        status: normalizeCatalogStatus(item.status || (item.active === false ? "INACTIVE" : "ACTIVE"))
      };
    });

    const existingSkus = {};
    sheetToObjects(SHEET_NAMES.products).forEach(function (product) {
      existingSkus[cleanString(product.sku, 120).toLowerCase()] = true;
    });

    const saved = [];
    combinations.forEach(function (combo) {
      const storage = storageMap[safeSheetText(combo.storage, 80)];
      const color = colorMap[safeSheetText(combo.color, 120)];
      if (!storage || !color) return;
      const existing = findProductByModelStorageColor(modelRow, storage.storage, color.color);
      const comboActive = combo.enabled !== false && storage.status === "ACTIVE" && color.status === "ACTIVE";
      const sku = existing
        ? cleanString(existing.sku, 120)
        : safeSheetText(combo.sku, 120) || generatedSimpleSku(collectionName, modelPayload.model_code, modelName, storage.storage, color.color, existingSkus);
      const duplicate = sheetToObjects(SHEET_NAMES.products).find(function (product) {
        return cleanString(product.sku, 120).toLowerCase() === sku.toLowerCase() &&
          (!existing || cleanString(product.product_id, 80) !== cleanString(existing.product_id, 80));
      });
      if (duplicate) throw new Error("Duplicate SKU: " + sku);
      const productData = {
        collection: collectionName,
        brand: brand,
        model_id: modelRow.model_id,
        model: modelName,
        storage: storage.storage,
        memory_label: storage.ram || storage.storage,
        color: color.color,
        color_code: color.color_code,
        color_hex: color.color_hex,
        sku: sku,
        image_url: safeSheetText(combo.image_url || color.image_url || modelPayload.image_url, 500),
        asset_key: safeSheetText(combo.asset_key || color.asset_key || modelPayload.asset_key, 180),
        stock_quantity: normalizeStockQuantity(combo.stock_quantity !== undefined ? combo.stock_quantity : combo.stock),
        stock_status: "",
        display_order: catalogDisplayOrder(combo.display_order || storage.display_order),
        status: comboActive ? normalizeCatalogStatus(combo.status || "ACTIVE") : "INACTIVE",
        updated_at: now,
        updated_by: admin.actor_id
      };
      let productRow;
      if (existing) {
        updateRowFields(SHEET_NAMES.products, existing._row, productData);
        productRow = Object.assign({}, existing, productData);
      } else {
        productRow = Object.assign({}, productData, {
          product_id: makeId("PRD"),
          created_at: now,
          created_by: admin.actor_id,
          is_test: isQaRecord(body || {}),
          qa_batch: qaBatchFor(body || {})
        });
        appendObject(SHEET_NAMES.products, productRow);
      }
      const beforeVat = Math.max(0, Number(storage.base_price || 0) + Number(color.price_adjustment || 0));
      const pricing = productRow.status === "ACTIVE"
        ? saveSimplePricingVersion(productRow, beforeVat, Number(body.vat_rate || DEFAULT_VAT_RATE), admin, body)
        : { changed: false, allocation: activePricingAllocationForProduct(productRow) ? publicPricingAllocation(activePricingAllocationForProduct(productRow), true) : null };
      if (pricing && pricing.ok === false) throw new Error(pricing.message || "Pricing allocation failed");
      saved.push({ product: publicProduct(productRow), pricing: pricing.allocation || null, price_changed: Boolean(pricing.changed) });
    });

    writeCatalogAudit("saveSimpleProductModel", "MODEL", modelRow.model_id, admin, null, {
      model: publicProductModel(modelRow),
      variants: saved.length
    }, body.reason);

    return {
      ok: true,
      model: publicProductModel(modelRow),
      total_variants: saved.length,
      variants: saved
    };
  });
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
    promotion: safeSheetText(body.promotion, 200),
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

function runProductIntegrityCheck(body) {
  ensureSalesSheets();
  const admin = requireAdminActor(body || {});
  if (!admin.ok) return admin;

  const products = sheetToObjects(SHEET_NAMES.products);
  const pricingRows = sheetToObjects(SHEET_NAMES.productPricing);
  const allocationRows = sheetToObjects(SHEET_NAMES.pricingAllocationVersions);
  const collections = collectionRows();
  const models = modelRows();
  const quotations = sheetToObjects(SHEET_NAMES.quotations);
  const issues = [];
  const byProductId = {};
  const bySku = {};
  const byConfiguration = {};
  const collectionByName = {};
  const modelByKey = {};

  collections.forEach(function (collection) {
    const item = publicCollection(collection);
    if (!item.collection_id) issues.push({ severity: "HIGH", type: "MISSING_COLLECTION_ID", collection: item.collection });
    if (!item.collection) issues.push({ severity: "HIGH", type: "MISSING_COLLECTION_NAME", collection_id: item.collection_id });
    collectionByName[item.collection.toLowerCase()] = item;
  });

  models.forEach(function (model) {
    const item = publicProductModel(model);
    const key = catalogKey([item.collection, item.brand, item.model]);
    if (!item.model_id) issues.push({ severity: "HIGH", type: "MISSING_MODEL_ID", model: item.model });
    if (!item.collection) issues.push({ severity: "HIGH", type: "MODEL_WITHOUT_COLLECTION", model_id: item.model_id });
    if (item.collection && collectionByName[item.collection.toLowerCase()] && collectionByName[item.collection.toLowerCase()].status === "ARCHIVED" && item.status === "ACTIVE") {
      issues.push({ severity: "HIGH", type: "ARCHIVED_COLLECTION_WITH_ACTIVE_MODEL", collection_id: item.collection_id, model_id: item.model_id });
    }
    if (key) modelByKey[key] = item;
  });

  products.forEach(function (product) {
    const productId = cleanString(product.product_id, 80);
    const sku = cleanString(product.sku, 120);
    const configKey = catalogKey([product.collection, product.brand, product.model, product.storage, product.color]);
    const statusValue = normalizeCatalogStatus(product.status || "ACTIVE");
    const modelKey = catalogKey([product.collection, product.brand, product.model]);
    const collectionMeta = collectionByName[cleanString(product.collection, 180).toLowerCase()];
    const modelMeta = modelByKey[modelKey];

    if (!productId) issues.push({ severity: "HIGH", type: "MISSING_PRODUCT_ID", sku: sku });
    if (!sku) issues.push({ severity: "HIGH", type: "MISSING_SKU", product_id: productId });
    if (!cleanString(product.collection, 180)) issues.push({ severity: "MEDIUM", type: "MISSING_COLLECTION", product_id: productId, sku: sku });
    if (!cleanString(product.model, 160)) issues.push({ severity: "MEDIUM", type: "MISSING_MODEL", product_id: productId, sku: sku });
    if (!cleanString(product.storage, 80)) issues.push({ severity: "MEDIUM", type: "MISSING_VARIANT", product_id: productId, sku: sku });
    if (!cleanString(product.color, 120)) issues.push({ severity: "LOW", type: "MISSING_COLOR", product_id: productId, sku: sku });
    if (statusValue === "ACTIVE" && !activePricingAllocationForProduct(product)) issues.push({ severity: "HIGH", type: "ACTIVE_VARIANT_WITHOUT_ACTIVE_PRICING", product_id: productId, sku: sku });
    if (stockIsSet(product) && Number(product.stock_quantity || 0) < 0) issues.push({ severity: "HIGH", type: "NEGATIVE_STOCK", product_id: productId, sku: sku });
    if (statusValue === "ACTIVE" && !stockIsSet(product)) issues.push({ severity: "LOW", type: "STOCK_NOT_SET", product_id: productId, sku: sku });
    if (statusValue === "ACTIVE" && !cleanString(product.image_url || product.asset_key, 500)) issues.push({ severity: "LOW", type: "IMAGE_NOT_SET", product_id: productId, sku: sku });
    if (statusValue === "ACTIVE" && collectionMeta && collectionMeta.status === "ARCHIVED") issues.push({ severity: "HIGH", type: "ARCHIVED_COLLECTION_WITH_ACTIVE_VARIANT", product_id: productId, sku: sku });
    if (statusValue === "ACTIVE" && modelMeta && modelMeta.status === "ARCHIVED") issues.push({ severity: "HIGH", type: "ARCHIVED_MODEL_WITH_ACTIVE_VARIANT", product_id: productId, sku: sku });

    if (productId) {
      byProductId[productId] = (byProductId[productId] || 0) + 1;
    }
    if (sku) {
      bySku[sku.toLowerCase()] = (bySku[sku.toLowerCase()] || 0) + 1;
    }
    if (configKey) {
      byConfiguration[configKey] = (byConfiguration[configKey] || 0) + 1;
    }
  });

  Object.keys(byProductId).forEach(function (key) {
    if (byProductId[key] > 1) issues.push({ severity: "HIGH", type: "DUPLICATE_PRODUCT_ID", product_id: key, count: byProductId[key] });
  });
  Object.keys(bySku).forEach(function (key) {
    if (bySku[key] > 1) issues.push({ severity: "HIGH", type: "DUPLICATE_SKU", sku: key, count: bySku[key] });
  });
  Object.keys(byConfiguration).forEach(function (key) {
    if (byConfiguration[key] > 1) issues.push({ severity: "HIGH", type: "DUPLICATE_CONFIGURATION", configuration_key: key, count: byConfiguration[key] });
  });

  pricingRows.forEach(function (pricing) {
    const pricingId = cleanString(pricing.pricing_id, 80);
    const product = findProductForPricing({ product_id: pricing.product_id, sku: pricing.sku, include_inactive: true });
    const productPrice = toSatang(pricing.product_price || 0);
    const serviceFee = toSatang(pricing.service_fee || 0);
    const discount = toSatang(pricing.discount || 0);
    if (!product) issues.push({ severity: "HIGH", type: "PRICING_ORPHAN_PRODUCT", pricing_id: pricingId, product_id: pricing.product_id, sku: pricing.sku });
    if (!isFinite(productPrice) || productPrice < 0) issues.push({ severity: "HIGH", type: "INVALID_PRODUCT_PRICE", pricing_id: pricingId });
    if (!isFinite(serviceFee) || serviceFee < 0) issues.push({ severity: "HIGH", type: "INVALID_SERVICE_FEE", pricing_id: pricingId });
    if (!isFinite(discount) || discount < 0) issues.push({ severity: "MEDIUM", type: "INVALID_DISCOUNT", pricing_id: pricingId });
    if (Number(pricing.vat_rate || 0) < 0 || Number(pricing.vat_rate || 0) > 1) issues.push({ severity: "HIGH", type: "INVALID_VAT_RATE", pricing_id: pricingId });
  });

  allocationRows.forEach(function (allocation) {
    if (normalizeCatalogStatus(allocation.status || "") !== "ACTIVE") return;
    const product = findProductById(allocation.product_id) || findProductForPricing({ sku: allocation.sku, include_inactive: true });
    if (!product) issues.push({ severity: "HIGH", type: "ACTIVE_PRICING_WITHOUT_VARIANT", pricing_version_id: allocation.pricing_version_id, sku: allocation.sku });
    pricingAllocationIssues(allocation).forEach(function (issue) {
      issues.push(Object.assign({ severity: "HIGH", pricing_version_id: allocation.pricing_version_id, sku: allocation.sku }, issue));
    });
  });

  models.forEach(function (model) {
    const item = publicProductModel(model);
    const hasActiveVariant = products.some(function (product) {
      return normalizeCatalogStatus(product.status || "ACTIVE") === "ACTIVE" &&
        catalogKey([product.collection, product.brand, product.model]) === catalogKey([item.collection, item.brand, item.model]);
    });
    if (item.status === "ACTIVE" && !hasActiveVariant) {
      issues.push({ severity: "MEDIUM", type: "ACTIVE_MODEL_WITHOUT_ACTIVE_VARIANT", model_id: item.model_id, model: item.model });
    }
  });

  quotations.forEach(function (quotation) {
    const status = normalizeSalesStatus(quotation.status || "");
    if (["DRAFT", "SUBMITTED", "APPROVED"].indexOf(status) !== -1) {
      const product = findProductById(quotation.product_id);
      if (product && normalizeSalesStatus(product.status || "ACTIVE") !== "ACTIVE") {
        issues.push({ severity: "MEDIUM", type: "ACTIVE_QUOTATION_INACTIVE_PRODUCT", quotation_id: quotation.quotation_id, product_id: quotation.product_id });
      }
    }
  });

  return {
    ok: true,
    total_issues: issues.length,
    critical_or_high: issues.filter(function (issue) { return issue.severity === "HIGH" || issue.severity === "CRITICAL"; }).length,
    issues: issues
  };
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
  const quotationLineItems = parseJsonValue(quotation.line_items_json, []);
  const deviceLine = quotationLineItems.find(function (item) {
    return ["DEVICE", "SSBMS_BUNDLE"].indexOf(cleanString(item.type, 80).toUpperCase()) !== -1;
  }) || {};
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
    quantity: Math.max(1, Number(quotation.quantity || deviceLine.quantity || 1)),
    pricing_version_id: cleanString(quotation.pricing_version_id, 80),
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
    line_items: quotationLineItems,
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
  const orderLineItems = parseJsonValue(order.line_items_json, []);
  const deviceLine = orderLineItems.find(function (item) {
    return ["DEVICE", "SSBMS_BUNDLE"].indexOf(cleanString(item.type, 80).toUpperCase()) !== -1;
  }) || {};
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
    quantity: Math.max(1, Number(order.quantity || deviceLine.quantity || 1)),
    pricing_version_id: cleanString(order.pricing_version_id, 80),
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
    line_items: orderLineItems,
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
    updated_at: now,
    is_test: booleanValue(body.is_test) || isQaRecord(body || {}),
    qa_batch: cleanString(body.qa_batch, 120)
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
    address: body.customer_address || (body.customer && body.customer.address),
    is_test: booleanValue(body.is_test) || isQaRecord(body || {}),
    qa_batch: cleanString(body.qa_batch, 120)
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
          type: "SSBMS_BUNDLE",
          name: cleanString(body.model || "SSBMS System Bundle", 160),
          description: [
            "การตั้งค่าและติดตั้งระบบ SSBMS",
            cleanString(body.storage, 80),
            cleanString(body.color, 120)
          ].filter(Boolean).join(" / "),
          quantity: 1,
          unit_price: Number(body.phone_price || body.phonePrice || 0),
          total: Number(body.phone_price || body.phonePrice || 0)
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
    quantity: Math.max(1, Number(quote.quantity || 1)),
    pricing_version_id: cleanString(quote.pricing_version_id || quote.pricing_version, 80),
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
    pricing_snapshot_json: JSON.stringify(quote.pricing_snapshot || {}),
    accounting_snapshot_json: JSON.stringify({ status: "UNPOSTED", created_at: now }),
    compensation_snapshot_json: JSON.stringify({ status: "UNALLOCATED", created_at: now }),
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
    rejected_at: "",
    is_test: booleanValue(body.is_test) || isQaRecord(body || {}) || isQaRecord(customer || {}),
    qa_batch: cleanString(body.qa_batch, 120) || qaBatchFor(customer || {})
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
  const isTest = isQaRecord(order || {});
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
    created_at: new Date(),
    is_test: isTest,
    qa_batch: qaBatchFor(order || {})
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

  const quotationSnapshot = parseJsonValue(quotation.pricing_snapshot_json, {});
  if (!quotationSnapshot || !quotationSnapshot.pricing_version_id || !quotationSnapshot.components) {
    return financeError("ORDER_PRICING_SNAPSHOT_REQUIRED", "Order requires a complete pricing snapshot before creation.");
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
    quantity: Math.max(1, Number(quotation.quantity || 1)),
    pricing_version_id: cleanString(quotation.pricing_version_id, 80),
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
    pricing_snapshot_json: quotation.pricing_snapshot_json,
    accounting_snapshot_json: quotation.accounting_snapshot_json,
    compensation_snapshot_json: quotation.compensation_snapshot_json,
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
    cancelled_at: "",
    is_test: isQaRecord(quotation),
    qa_batch: qaBatchFor(quotation)
  };

  appendObject(SHEET_NAMES.orders, order);
  appendOrganizationSnapshot("ORDER", order.order_id, order.owner_agent_id || order.agent_id, "createOrderFromQuotation", order);
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
    updated_at: now,
    is_test: isQaRecord(body || {}) || isQaRecord(order),
    qa_batch: cleanString(body.qa_batch, 120) || qaBatchFor(order)
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
  const reviewStartedAt = Date.now();
  const reviewTiming = [];
  function markReviewPhase(phase) {
    reviewTiming.push({ phase: phase, elapsed_ms: Date.now() - reviewStartedAt });
  }
  markReviewPhase("auth");

  const paymentId = cleanString(body && (body.payment_id || body.paymentId), 80);
  const payment = sheetToObjects(SHEET_NAMES.payments).find(function (item) {
    return cleanString(item.payment_id, 80) === paymentId;
  });
  markReviewPhase("payment_lookup");

  if (!payment) return { ok: false, message: "Payment not found" };

  const currentStatus = normalizeSalesStatus(payment.status || "");
  if (currentStatus !== "SUBMITTED") {
    const decision = normalizeSalesStatus(body.status || body.decision || "APPROVED");
    if (currentStatus === "APPROVED" && decision === "APPROVED") {
      const order = findOrderById(payment.order_id);
      if (!order) return { ok: false, message: "Order not found for payment" };
      if (!hasCompletePricingSnapshot(order)) {
        return financeError("ORDER_PRICING_SNAPSHOT_REQUIRED", "Payment approval requires a complete order pricing snapshot.");
      }
      const accountingResult = postApprovedPaymentAccountingInternal(payment, { actor_id: cleanString(body.admin_id || body.actor_id || "ADMIN", 80) });
      markReviewPhase("accounting_verify");
      const commissionResult = usesV37Compensation(order)
        ? { ok: true, skipped: true, reason: "V3_7_COMPENSATION_ENGINE_ACTIVE" }
        : createCommissionForApprovedPayment(payment, { actor_id: cleanString(body.admin_id || body.actor_id || "ADMIN", 80) });
      const compensationResult = postTeamCompensationForApprovedPayment(payment, { actor_id: cleanString(body.admin_id || body.actor_id || "ADMIN", 80) });
      markReviewPhase("compensation_verify");
      return {
        ok: true,
        duplicate: true,
        message: "Payment already approved; financial postings verified.",
        status: currentStatus,
        payment: publicPayment(payment),
        order: publicOrder(order),
        commission_result: commissionResult,
        accounting_result: accountingResult,
        compensation_result: compensationResult,
        timing_ms: reviewTiming
      };
    }
    return { ok: false, message: "Payment already reviewed", status: currentStatus };
  }

  const decision = normalizeSalesStatus(body.status || body.decision || "APPROVED");
  if (["APPROVED", "REJECTED"].indexOf(decision) === -1) {
    return { ok: false, message: "Invalid payment review status" };
  }

  const order = findOrderById(payment.order_id);
  if (!order) return { ok: false, message: "Order not found for payment" };
  markReviewPhase("order_lookup");

  if (decision === "APPROVED" && !hasCompletePricingSnapshot(order)) {
    return financeError("ORDER_PRICING_SNAPSHOT_REQUIRED", "Payment approval requires a complete order pricing snapshot.");
  }

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
  markReviewPhase("payment_update");

  var commissionResult = null;
  var accountingResult = null;
  var compensationResult = null;

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
    markReviewPhase("order_payment_update");

    updateOrderStatus({
      order_id: order.order_id,
      status: nextStatus,
      actor_id: updates.reviewed_by,
      note: "Payment approved",
      internal: true
    });
    markReviewPhase("order_status_update");
    accountingResult = postApprovedPaymentAccountingInternal(payment, admin);
    markReviewPhase("accounting_posting");
    commissionResult = usesV37Compensation(order)
      ? { ok: true, skipped: true, reason: "V3_7_COMPENSATION_ENGINE_ACTIVE" }
      : createCommissionForApprovedPayment(payment, admin);
    compensationResult = postTeamCompensationForApprovedPayment(payment, admin);
    markReviewPhase("compensation_posting");
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
  markReviewPhase("audit_log");

  return {
    ok: true,
    payment: publicPayment(payment),
    order: publicOrder(findOrderById(order.order_id) || order),
    commission_result: commissionResult,
    accounting_result: accountingResult,
    compensation_result: compensationResult,
    timing_ms: reviewTiming
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

function sheetIdempotencyMap(sheetName) {
  const map = {};
  sheetToObjects(sheetName).forEach(function (row) {
    const key = cleanString(row.idempotency_key, 220);
    if (key) map[key] = row;
  });
  return map;
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

function appendLedgerEntry(data, options) {
  ensureFinanceSheets();
  const opts = options || {};
  const keyMap = opts.key_map || opts.keyMap || null;
  const idempotencyKey = cleanString(data.idempotency_key, 220);
  if (idempotencyKey) {
    const existing = keyMap
      ? keyMap[idempotencyKey]
      : sheetToObjects(SHEET_NAMES.walletLedger).find(function (entry) {
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
  if (keyMap && idempotencyKey) keyMap[idempotencyKey] = entry;
  if (!opts.skip_projection && !opts.skipProjection) updateWalletProjection(entry.agent_id);
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
      if (normalizeSalesStatus(entry.entry_type) === "COMMISSION_REVERSAL" && normalizeSalesStatus(entry.direction) === "DEBIT") {
        projection.lifetime_earned -= amount;
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
  const accountingLedger = sheetToObjects(SHEET_NAMES.accountingLedger).filter(function (item) { return includeQa || !isQaRecord(item); });
  const companyRevenue = sheetToObjects(SHEET_NAMES.companyRevenueLedger).filter(function (item) { return includeQa || !isQaRecord(item); });
  const expenseAllocations = sheetToObjects(SHEET_NAMES.expenseAllocationLedger).filter(function (item) { return includeQa || !isQaRecord(item); });
  const vatRows = sheetToObjects(SHEET_NAMES.vatLedger).filter(function (item) { return includeQa || !isQaRecord(item); });
  const wallets = sheetToObjects(SHEET_NAMES.walletAccounts).filter(function (item) {
    if (!existingAgentId(item.agent_id)) return false;
    return includeQa || !isQaRecord(item);
  }).map(function (wallet) {
    return publicWallet(updateWalletProjection(wallet.agent_id));
  });
  const withdrawals = sheetToObjects(SHEET_NAMES.withdrawalRequests).filter(function (item) { return includeQa || !isQaRecord(item); });
  const anomalies = listFinanceAnomalies(includeQa);
  const byComponent = function (rows, component) {
    return sum(rows.filter(function (row) {
      return cleanString(row.component, 120) === component && normalizeSalesStatus(row.status || "POSTED") === "POSTED";
    }), "amount");
  };
  const commissionByType = function (type) {
    return sum(commissions.filter(function (row) {
      return normalizeSalesStatus(row.commission_type || "") === type && normalizeSalesStatus(row.status || "") === "AVAILABLE";
    }), "released_amount");
  };
  return {
    ok: true,
    summary: {
      approved_payments_total: byComponent(accountingLedger, "cash_received"),
      sales_before_vat: byComponent(accountingLedger, "bundle_revenue"),
      sales_total_including_vat: byComponent(accountingLedger, "cash_received"),
      output_vat_payable: sum(vatRows.filter(function (row) { return normalizeSalesStatus(row.status || "POSTED") === "POSTED"; }), "vat_amount"),
      company_revenue_allocation: sum(companyRevenue.filter(function (row) { return normalizeSalesStatus(row.status || "POSTED") === "POSTED"; }), "amount"),
      product_service_allocations: sum(expenseAllocations.filter(function (row) {
        const component = cleanString(row.component, 120);
        return normalizeSalesStatus(row.status || "POSTED") === "POSTED" && component !== "central_commission_pool";
      }), "amount"),
      central_commission_pool: byComponent(expenseAllocations, "central_commission_pool"),
      agent_sales_commission: commissionByType("SALES_COMMISSION"),
      team_manager_retained_commission: commissionByType("TEAM_MANAGER_RETAINED_COMMISSION"),
      agent_sim_income: commissionByType("SIM_INCOME"),
      agent_spc_income: commissionByType("SPC_INCOME"),
      total_pending_commission: sum(commissions.filter(function (c) { return normalizeSalesStatus(c.status) === "PENDING"; }), "pending_amount"),
      total_available_commission: sum(commissions.filter(function (c) { return normalizeSalesStatus(c.status) === "AVAILABLE"; }), "released_amount"),
      total_wallet_liability: sum(wallets, "available_balance") + sum(wallets, "reserved_balance"),
      total_reserved_withdrawal: sum(wallets, "reserved_balance"),
      pending_withdrawals_count: withdrawals.filter(function (w) { return normalizeSalesStatus(w.status) === "PENDING"; }).length,
      approved_not_paid_count: withdrawals.filter(function (w) { return normalizeSalesStatus(w.status) === "APPROVED"; }).length,
      paid_total: sum(withdrawals.filter(function (w) { return normalizeSalesStatus(w.status) === "PAID"; }), "net_amount"),
      reversal_count: accountingLedger.filter(function (row) {
        return cleanString(row.component, 120).indexOf("reversal:") === 0;
      }).length,
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
  const wallets = sheetToObjects(SHEET_NAMES.walletAccounts).filter(function (item) {
    if (!existingAgentId(item.agent_id)) return false;
    return includeQa || !isQaRecord(item);
  }).map(function (wallet) {
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
  const wallets = sheetToObjects(SHEET_NAMES.walletAccounts).filter(function (wallet) {
    if (!existingAgentId(wallet.agent_id)) return false;
    return includeQa || !isQaRecord(wallet);
  });
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
    if (!includeQa && isQaRecord(entry)) return;
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

function pricingAdminSession(body) {
  const admin = financeAdminSession(body);
  if (!admin.ok) return admin;
  return admin;
}

function getPricingAllocation(body) {
  const admin = pricingAdminSession(body || {});
  if (!admin.ok) return admin;
  ensureSalesSheets();
  const product = findProductForPricing(body || {});
  if (!product) return financeError("NOT_FOUND", "Product not found for pricing allocation.");
  const allocation = activePricingAllocationForProduct(product);
  return {
    ok: true,
    product: publicProduct(product),
    allocation: allocation ? publicPricingAllocation(allocation, true) : null
  };
}

function normalizeAllocationBody(body, product, existing, admin) {
  const now = new Date();
  const data = {
    pricing_version_id: existing ? existing.pricing_version_id : makeId("PAV"),
    product_id: product.product_id,
    sku: product.sku,
    effective_from: body.effective_from || body.effectiveFrom || now,
    effective_until: body.effective_until || body.effectiveUntil || "",
    status: normalizeSalesStatus(body.status || "DRAFT"),
    deposit_policy_id: cleanString(body.deposit_policy_id || body.depositPolicyId || activeDepositPolicy().policy_id, 80),
    created_by: existing ? existing.created_by : admin.actor_id,
    approved_by: existing ? existing.approved_by : "",
    change_reason: safeSheetText(body.change_reason || body.reason || "Pricing allocation updated", 500),
    created_at: existing ? existing.created_at : now,
    updated_at: now,
    is_test: booleanValue(body.is_test) || isQaRecord(body),
    qa_batch: cleanString(body.qa_batch, 120)
  };
  PRICING_ALLOCATION_COMPONENTS.forEach(function (key) {
    data[key] = fromSatang(Math.max(0, toSatang(body[key] || 0)));
  });
  const beforeVatSatang = PRICING_ALLOCATION_COMPONENTS.reduce(function (total, key) {
    return total + Math.max(0, toSatang(data[key] || 0));
  }, 0);
  const vatRate = Math.max(0, Math.min(1, Number(body.vat_rate || body.vatRate || DEFAULT_VAT_RATE)));
  const vatSatang = Math.round(beforeVatSatang * vatRate);
  data.selling_price_before_vat = fromSatang(beforeVatSatang);
  data.vat_rate = vatRate;
  data.vat_amount = fromSatang(vatSatang);
  data.selling_price_including_vat = fromSatang(beforeVatSatang + vatSatang);
  return data;
}

function savePricingAllocationVersion(body) {
  return withFinanceLock(function () {
    const admin = pricingAdminSession(body || {});
    if (!admin.ok) return admin;
    ensureSalesSheets();
    const product = findProductForPricing(body || {});
    if (!product) return financeError("NOT_FOUND", "Product not found for pricing allocation.");
    const id = cleanString(body && (body.pricing_version_id || body.pricingVersionId), 80);
    const existing = id ? sheetToObjects(SHEET_NAMES.pricingAllocationVersions).find(function (row) {
      return cleanString(row.pricing_version_id, 80) === id;
    }) : null;
    const data = normalizeAllocationBody(body || {}, product, existing, admin);
    const issues = pricingAllocationIssues(data);
    if (issues.length) {
      return financeError("PRICING_INTEGRITY_ERROR", "Pricing allocation does not reconcile.", { issues: issues });
    }
    if (normalizeSalesStatus(data.status) === "ACTIVE") data.status = "DRAFT";
    if (existing) updateRowFields(SHEET_NAMES.pricingAllocationVersions, existing._row, data); else appendObject(SHEET_NAMES.pricingAllocationVersions, data);
    writeAccountingAudit("PRICING_ALLOCATION", data.pricing_version_id, existing ? "PRICING_VERSION_UPDATED" : "PRICING_VERSION_CREATED", "SUCCESS", admin.actor_id, "Pricing allocation saved", data);
    return { ok: true, allocation: publicPricingAllocation(data, true) };
  });
}

function activatePricingVersion(body) {
  return withFinanceLock(function () {
    const admin = pricingAdminSession(body || {});
    if (!admin.ok) return admin;
    ensureSalesSheets();
    const id = cleanString(body && (body.pricing_version_id || body.pricingVersionId), 80);
    const row = sheetToObjects(SHEET_NAMES.pricingAllocationVersions).find(function (item) {
      return cleanString(item.pricing_version_id, 80) === id;
    });
    if (!row) return financeError("NOT_FOUND", "Pricing version not found.");
    const issues = pricingAllocationIssues(row);
    if (issues.length) return financeError("PRICING_INTEGRITY_ERROR", "Pricing allocation does not reconcile.", { issues: issues });
    sheetToObjects(SHEET_NAMES.pricingAllocationVersions).forEach(function (item) {
      if (
        cleanString(item.pricing_version_id, 80) !== id &&
        normalizeSalesStatus(item.status || "") === "ACTIVE" &&
        (cleanString(item.product_id, 80) === cleanString(row.product_id, 80) || cleanString(item.sku, 120) === cleanString(row.sku, 120))
      ) {
        updateRowFields(SHEET_NAMES.pricingAllocationVersions, item._row, {
          status: "INACTIVE",
          effective_until: new Date(),
          updated_at: new Date()
        });
      }
    });
    const updates = {
      status: "ACTIVE",
      approved_by: admin.actor_id,
      updated_at: new Date()
    };
    updateRowFields(SHEET_NAMES.pricingAllocationVersions, row._row, updates);
    const updated = Object.assign({}, row, updates);
    writeAccountingAudit("PRICING_ALLOCATION", id, "PRICING_VERSION_ACTIVATED", "SUCCESS", admin.actor_id, "Pricing allocation activated", updated);
    return { ok: true, allocation: publicPricingAllocation(updated, true) };
  });
}

function listPricingVersions(body) {
  const admin = pricingAdminSession(body || {});
  if (!admin.ok) return admin;
  ensureSalesSheets();
  const productId = cleanString(body && body.product_id, 80);
  const sku = cleanString(body && body.sku, 120).toLowerCase();
  const rows = sheetToObjects(SHEET_NAMES.pricingAllocationVersions).filter(function (row) {
    if (productId && cleanString(row.product_id, 80) !== productId) return false;
    if (sku && cleanString(row.sku, 120).toLowerCase() !== sku) return false;
    return true;
  }).map(function (row) { return publicPricingAllocation(row, true); }).reverse();
  return { ok: true, total: rows.length, pricing_versions: rows };
}

function validatePricingAllocation(body) {
  const admin = pricingAdminSession(body || {});
  if (!admin.ok) return admin;
  const product = findProductForPricing(body || {});
  const row = product ? normalizeAllocationBody(body || {}, product, null, admin) : (body || {});
  const issues = pricingAllocationIssues(row);
  return { ok: true, valid: issues.length === 0, issues: issues, allocation: publicPricingAllocation(row, true) };
}

function runPricingIntegrityCheck(body) {
  const admin = pricingAdminSession(body || {});
  if (!admin.ok) return admin;
  ensureSalesSheets();
  const issues = [];
  const activeKeys = {};
  sheetToObjects(SHEET_NAMES.products).forEach(function (product) {
    if (normalizeSalesStatus(product.status || "ACTIVE") !== "ACTIVE") return;
    if (!activePricingAllocationForProduct(product)) {
      issues.push({ severity: "HIGH", type: "MISSING_ACTIVE_PRICING_ALLOCATION", product_id: product.product_id, sku: product.sku });
    }
  });
  sheetToObjects(SHEET_NAMES.pricingAllocationVersions).forEach(function (row) {
    if (normalizeSalesStatus(row.status || "") === "ACTIVE") {
      const key = cleanString(row.product_id, 80) || cleanString(row.sku, 120).toLowerCase();
      activeKeys[key] = (activeKeys[key] || 0) + 1;
    }
    pricingAllocationIssues(row).forEach(function (issue) {
      issues.push(Object.assign({ severity: "HIGH", pricing_version_id: row.pricing_version_id, sku: row.sku }, issue));
    });
  });
  Object.keys(activeKeys).forEach(function (key) {
    if (activeKeys[key] > 1) issues.push({ severity: "HIGH", type: "DUPLICATE_ACTIVE_PRICING_VERSION", key: key, count: activeKeys[key] });
  });
  return { ok: true, total_issues: issues.length, critical_or_high: issues.filter(function (i) { return i.severity === "HIGH" || i.severity === "CRITICAL"; }).length, issues: issues };
}

function writeAccountingAudit(entityType, entityId, action, status, actorId, message, metadata) {
  ensureFinanceSheets();
  appendObject(SHEET_NAMES.accountingAuditLogs, {
    accounting_audit_id: makeId("AAU"),
    entity_type: cleanString(entityType, 80),
    entity_id: cleanString(entityId, 120),
    action: cleanString(action, 120),
    status: cleanString(status || "SUCCESS", 60),
    actor_id: cleanString(actorId, 80),
    message: cleanString(message, 500),
    metadata_json: JSON.stringify(metadata || {}),
    created_at: new Date(),
    is_test: isQaRecord(metadata || {}),
    qa_batch: qaBatchFor(metadata || {})
  });
}

function publicAccountingAccount(row) {
  return {
    account_id: cleanString(row.account_id, 80),
    account_code: cleanString(row.account_code, 40),
    account_name: cleanString(row.account_name, 160),
    account_type: normalizeSalesStatus(row.account_type),
    normal_balance: normalizeSalesStatus(row.normal_balance),
    status: normalizeSalesStatus(row.status || "ACTIVE"),
    created_at: row.created_at || "",
    updated_at: row.updated_at || ""
  };
}

function listChartOfAccounts(body) {
  const admin = financeAdminSession(body || {});
  if (!admin.ok) return admin;
  ensureFinanceSheets();
  const rows = sheetToObjects(SHEET_NAMES.accountingAccounts).map(publicAccountingAccount);
  return { ok: true, total: rows.length, accounts: rows };
}

function saveAccountingAccount(body, existing) {
  const code = cleanString(body && body.account_code, 40);
  if (!code) return financeError("INVALID_REQUEST", "account_code is required.");
  const now = new Date();
  return {
    account_id: existing ? existing.account_id : makeId("ACC"),
    account_code: code,
    account_name: safeSheetText(body.account_name || (existing && existing.account_name), 160),
    account_type: normalizeSalesStatus(body.account_type || (existing && existing.account_type) || "EXPENSE"),
    normal_balance: normalizeSalesStatus(body.normal_balance || (existing && existing.normal_balance) || "DEBIT"),
    status: normalizeSalesStatus(body.status || (existing && existing.status) || "ACTIVE") === "INACTIVE" ? "INACTIVE" : "ACTIVE",
    created_at: existing ? existing.created_at : now,
    updated_at: now,
    created_by: existing ? existing.created_by : cleanString(body.created_by || "ADMIN", 80)
  };
}

function createAccountingAccount(body) {
  const admin = financeAdminSession(body || {});
  if (!admin.ok) return admin;
  ensureFinanceSheets();
  const code = cleanString(body && body.account_code, 40);
  const duplicate = sheetToObjects(SHEET_NAMES.accountingAccounts).find(function (row) { return cleanString(row.account_code, 40) === code; });
  if (duplicate) return financeError("DUPLICATE_ACCOUNT", "Account code already exists.");
  const row = saveAccountingAccount(Object.assign({}, body, { created_by: admin.actor_id }), null);
  appendObject(SHEET_NAMES.accountingAccounts, row);
  writeAccountingAudit("ACCOUNT", row.account_code, "ACCOUNT_CREATED", "SUCCESS", admin.actor_id, "Accounting account created", row);
  return { ok: true, account: publicAccountingAccount(row) };
}

function updateAccountingAccount(body) {
  const admin = financeAdminSession(body || {});
  if (!admin.ok) return admin;
  ensureFinanceSheets();
  const id = cleanString(body && (body.account_id || body.accountId), 80);
  const code = cleanString(body && body.account_code, 40);
  const existing = sheetToObjects(SHEET_NAMES.accountingAccounts).find(function (row) {
    return (id && cleanString(row.account_id, 80) === id) || (code && cleanString(row.account_code, 40) === code);
  });
  if (!existing) return financeError("NOT_FOUND", "Account not found.");
  const row = saveAccountingAccount(body || {}, existing);
  updateRowFields(SHEET_NAMES.accountingAccounts, existing._row, row);
  writeAccountingAudit("ACCOUNT", row.account_code, "ACCOUNT_UPDATED", "SUCCESS", admin.actor_id, "Accounting account updated", row);
  return { ok: true, account: publicAccountingAccount(row) };
}

function accountNameByCode(code) {
  const row = sheetToObjects(SHEET_NAMES.accountingAccounts).find(function (account) {
    return cleanString(account.account_code, 40) === cleanString(code, 40);
  });
  return row ? cleanString(row.account_name, 160) : "";
}

function appendAccountingLedgerEntry(data, options) {
  ensureFinanceSheets();
  const opts = options || {};
  const keyMap = opts.key_map || opts.keyMap || null;
  const key = cleanString(data.idempotency_key, 220);
  if (key) {
    const existing = keyMap
      ? keyMap[key]
      : sheetToObjects(SHEET_NAMES.accountingLedger).find(function (entry) {
        return cleanString(entry.idempotency_key, 220) === key;
      });
    if (existing) return existing;
  }
  const accountCode = cleanString(data.account_code, 40);
  const row = {
    ledger_entry_id: makeId("ALED"),
    journal_id: cleanString(data.journal_id, 80),
    account_code: accountCode,
    account_name: accountNameByCode(accountCode),
    direction: normalizeSalesStatus(data.direction),
    amount: fromSatang(Math.max(0, toSatang(data.amount || 0))),
    currency: "THB",
    order_id: cleanString(data.order_id, 80),
    payment_id: cleanString(data.payment_id, 80),
    product_id: cleanString(data.product_id, 80),
    sku: cleanString(data.sku, 120),
    pricing_version_id: cleanString(data.pricing_version_id, 80),
    component: cleanString(data.component, 120),
    idempotency_key: key,
    status: "POSTED",
    created_at: new Date(),
    created_by: cleanString(data.created_by || "SYSTEM", 80),
    is_test: Boolean(data.is_test),
    qa_batch: cleanString(data.qa_batch, 120)
  };
  appendObject(SHEET_NAMES.accountingLedger, row);
  if (keyMap && key) keyMap[key] = row;
  return row;
}

function appendTypedAccountingLedger(sheetName, idField, prefix, data, options) {
  const opts = options || {};
  const keyMap = opts.key_map || opts.keyMap || null;
  const key = cleanString(data.idempotency_key, 220);
  if (key) {
    const existing = keyMap
      ? keyMap[key]
      : sheetToObjects(sheetName).find(function (row) {
        return cleanString(row.idempotency_key, 220) === key;
      });
    if (existing) return existing;
  }
  const row = Object.assign({}, data);
  row[idField] = makeId(prefix);
  row.amount = fromSatang(Math.max(0, toSatang(row.amount || 0)));
  row.status = row.status || "POSTED";
  row.created_at = row.created_at || new Date();
  appendObject(sheetName, row);
  if (keyMap && key) keyMap[key] = row;
  return row;
}

function hasCompletePricingSnapshot(order) {
  const snapshot = parseJsonValue(order && order.pricing_snapshot_json, {});
  return Boolean(snapshot && snapshot.pricing_version_id && snapshot.components);
}

function usesV37Compensation(order) {
  const snapshot = parseJsonValue(order && order.pricing_snapshot_json, {});
  return Boolean(snapshot && snapshot.pricing_version_id && snapshot.components &&
    isFinite(toSatang((snapshot.components || {}).central_commission_pool || 0)));
}

function existingAgentId(agentId) {
  const id = validateAgentId(agentId);
  return id && findAgent(id) ? id : "";
}

function pricingSnapshotForOrder(order) {
  const snapshot = parseJsonValue(order.pricing_snapshot_json, {});
  if (snapshot && snapshot.pricing_version_id) return snapshot;
  return {
    pricing_version_id: cleanString(order.pricing_version_id, 80) || "LEGACY",
    product_id: cleanString(order.product_id, 80),
    sku: cleanString(order.sku, 120),
    quantity: Math.max(1, Number(order.quantity || 1)),
    selling_price_before_vat: Number(order.subtotal || 0),
    vat_amount: Number(order.vat || 0),
    selling_price_including_vat: Number(order.grand_total || order.total || 0),
    components: {},
    legacy: true
  };
}

function postApprovedPaymentAccountingInternal(payment, actor) {
  ensureSalesSheets();
  ensureFinanceSheets();
  if (normalizeSalesStatus(payment.status || "") !== "APPROVED") return { ok: true, skipped: true, reason: "PAYMENT_NOT_APPROVED" };
  const order = findOrderById(payment.order_id);
  if (!order) return financeError("NOT_FOUND", "Order not found for accounting.");
  if (!hasCompletePricingSnapshot(order)) return financeError("ORDER_PRICING_SNAPSHOT_REQUIRED", "Accounting posting requires a complete order pricing snapshot.");
  const snapshot = pricingSnapshotForOrder(order);
  const paymentSatang = Math.max(0, toSatang(payment.amount || 0));
  const totalSatang = Math.max(1, toSatang(order.grand_total || order.total || snapshot.selling_price_including_vat || 0));
  const ratio = Math.min(1, paymentSatang / totalSatang);
  const isTest = shouldExcludeFromFinance(order) || shouldExcludeFromFinance(payment);
  const qaBatch = qaBatchFor(order) || qaBatchFor(payment);
  const journalKey = ["ACCT", order.order_id, payment.payment_id, "APPROVED_PAYMENT"].join(":");
  const accountingLedgerKeys = sheetIdempotencyMap(SHEET_NAMES.accountingLedger);
  const typedLedgerKeys = {};
  function typedLedgerKeyMap(sheetName) {
    if (!typedLedgerKeys[sheetName]) typedLedgerKeys[sheetName] = sheetIdempotencyMap(sheetName);
    return typedLedgerKeys[sheetName];
  }
  const existingJournal = sheetToObjects(SHEET_NAMES.accountingJournals).find(function (row) {
    return cleanString(row.idempotency_key, 220) === journalKey;
  });
  const journal = existingJournal || {
    journal_id: makeId("AJR"),
    journal_type: "APPROVED_PAYMENT",
    source_type: "PAYMENT",
    source_id: payment.payment_id,
    order_id: order.order_id,
    payment_id: payment.payment_id,
    status: "POSTED",
    posted_at: new Date(),
    created_by: actor.actor_id || "SYSTEM",
    note: "Approved payment accounting posting",
    idempotency_key: journalKey,
    is_test: isTest,
    qa_batch: qaBatch
  };
  if (!existingJournal) appendObject(SHEET_NAMES.accountingJournals, journal);

  appendAccountingLedgerEntry({
    journal_id: journal.journal_id,
    account_code: "1000",
    direction: "DEBIT",
    amount: fromSatang(paymentSatang),
    order_id: order.order_id,
    payment_id: payment.payment_id,
    product_id: order.product_id,
    sku: order.sku,
    pricing_version_id: snapshot.pricing_version_id,
    component: "cash_received",
    idempotency_key: journalKey + ":1000",
    created_by: actor.actor_id,
    is_test: isTest,
    qa_batch: qaBatch
  }, { key_map: accountingLedgerKeys });

  const revenueSatang = Math.round(toSatang(snapshot.selling_price_before_vat || order.subtotal || 0) * ratio);
  const vatSatang = Math.round(toSatang(snapshot.vat_amount || order.vat || 0) * ratio);
  appendAccountingLedgerEntry({ journal_id: journal.journal_id, account_code: "4000", direction: "CREDIT", amount: fromSatang(revenueSatang), order_id: order.order_id, payment_id: payment.payment_id, product_id: order.product_id, sku: order.sku, pricing_version_id: snapshot.pricing_version_id, component: "bundle_revenue", idempotency_key: journalKey + ":4000", created_by: actor.actor_id, is_test: isTest, qa_batch: qaBatch }, { key_map: accountingLedgerKeys });
  appendAccountingLedgerEntry({ journal_id: journal.journal_id, account_code: "2000", direction: "CREDIT", amount: fromSatang(vatSatang), order_id: order.order_id, payment_id: payment.payment_id, product_id: order.product_id, sku: order.sku, pricing_version_id: snapshot.pricing_version_id, component: "vat", idempotency_key: journalKey + ":2000", created_by: actor.actor_id, is_test: isTest, qa_batch: qaBatch }, { key_map: accountingLedgerKeys });

  const componentAccountMap = {
    device_price: ["5000", SHEET_NAMES.expenseAllocationLedger],
    setup_fee: ["5100", SHEET_NAMES.expenseAllocationLedger],
    safety_book_cost: ["5200", SHEET_NAMES.expenseAllocationLedger],
    fingerprint_cost: ["5100", SHEET_NAMES.expenseAllocationLedger],
    signal_shield_cost: ["5100", SHEET_NAMES.expenseAllocationLedger],
    assembly_cost: ["5100", SHEET_NAMES.expenseAllocationLedger],
    annual_sim_cost: ["5400", SHEET_NAMES.expenseAllocationLedger],
    operation_cost: ["5100", SHEET_NAMES.expenseAllocationLedger],
    spc_cost: ["5300", SHEET_NAMES.expenseAllocationLedger],
    central_commission_pool: ["5500", SHEET_NAMES.expenseAllocationLedger],
    company_revenue_allocation: ["4100", SHEET_NAMES.companyRevenueLedger]
  };
  const components = snapshot.components || {};
  Object.keys(componentAccountMap).forEach(function (component) {
    const amountSatang = Math.round(toSatang(components[component] || 0) * Number(snapshot.quantity || 1) * ratio);
    if (amountSatang <= 0) return;
    const accountCode = componentAccountMap[component][0];
    appendAccountingLedgerEntry({ journal_id: journal.journal_id, account_code: accountCode, direction: accountCode === "4100" ? "CREDIT" : "DEBIT", amount: fromSatang(amountSatang), order_id: order.order_id, payment_id: payment.payment_id, product_id: order.product_id, sku: order.sku, pricing_version_id: snapshot.pricing_version_id, component: component, idempotency_key: journalKey + ":" + component, created_by: actor.actor_id, is_test: isTest, qa_batch: qaBatch }, { key_map: accountingLedgerKeys });
    appendTypedAccountingLedger(componentAccountMap[component][1], componentAccountMap[component][1] === SHEET_NAMES.companyRevenueLedger ? "company_revenue_id" : "expense_allocation_id", componentAccountMap[component][1] === SHEET_NAMES.companyRevenueLedger ? "CREV" : "EAL", { order_id: order.order_id, payment_id: payment.payment_id, pricing_version_id: snapshot.pricing_version_id, component: component, amount: fromSatang(amountSatang), status: "POSTED", idempotency_key: journalKey + ":typed:" + component, is_test: isTest, qa_batch: qaBatch }, { key_map: typedLedgerKeyMap(componentAccountMap[component][1]) });
  });
  appendTypedAccountingLedger(SHEET_NAMES.vatLedger, "vat_ledger_id", "VAT", { order_id: order.order_id, payment_id: payment.payment_id, pricing_version_id: snapshot.pricing_version_id, vat_rate: Number(snapshot.vat_rate || DEFAULT_VAT_RATE), vat_amount: fromSatang(vatSatang), status: "POSTED", idempotency_key: journalKey + ":VAT", is_test: isTest, qa_batch: qaBatch }, { key_map: typedLedgerKeyMap(SHEET_NAMES.vatLedger) });
  writeAccountingAudit("PAYMENT", payment.payment_id, "PAYMENT_ACCOUNTING_POSTED", "SUCCESS", actor.actor_id, "Approved payment posted to accounting ledger", { order_id: order.order_id, payment_id: payment.payment_id, journal_id: journal.journal_id, is_test: isTest, qa_batch: qaBatch });
  return { ok: true, journal_id: journal.journal_id, duplicate: Boolean(existingJournal) };
}

function postApprovedPaymentAccounting(body) {
  return withFinanceLock(function () {
    const admin = financeAdminSession(body || {});
    if (!admin.ok) return admin;
    const paymentId = cleanString(body && (body.payment_id || body.paymentId), 80);
    const payment = sheetToObjects(SHEET_NAMES.payments).find(function (row) {
      return cleanString(row.payment_id, 80) === paymentId;
    });
    if (!payment) return financeError("NOT_FOUND", "Payment not found.");
    return postApprovedPaymentAccountingInternal(payment, admin);
  });
}

function publicAccountingJournal(row) {
  return {
    journal_id: cleanString(row.journal_id, 80),
    journal_type: normalizeSalesStatus(row.journal_type),
    source_type: normalizeSalesStatus(row.source_type),
    source_id: cleanString(row.source_id, 120),
    order_id: cleanString(row.order_id, 80),
    payment_id: cleanString(row.payment_id, 80),
    status: normalizeSalesStatus(row.status || "POSTED"),
    posted_at: row.posted_at || "",
    note: cleanString(row.note, 500),
    is_test: booleanValue(row.is_test),
    qa_batch: cleanString(row.qa_batch, 120)
  };
}

function publicAccountingLedger(row) {
  return {
    ledger_entry_id: cleanString(row.ledger_entry_id, 80),
    journal_id: cleanString(row.journal_id, 80),
    account_code: cleanString(row.account_code, 40),
    account_name: cleanString(row.account_name, 160),
    direction: normalizeSalesStatus(row.direction),
    amount: Number(row.amount || 0),
    currency: cleanString(row.currency || "THB", 10),
    order_id: cleanString(row.order_id, 80),
    payment_id: cleanString(row.payment_id, 80),
    product_id: cleanString(row.product_id, 80),
    sku: cleanString(row.sku, 120),
    pricing_version_id: cleanString(row.pricing_version_id, 80),
    component: cleanString(row.component, 120),
    status: normalizeSalesStatus(row.status || "POSTED"),
    created_at: row.created_at || "",
    is_test: booleanValue(row.is_test),
    qa_batch: cleanString(row.qa_batch, 120)
  };
}

function listAccountingJournals(body) {
  const admin = financeAdminSession(body || {});
  if (!admin.ok) return admin;
  const includeQa = booleanValue(body && body.include_qa);
  const rows = sheetToObjects(SHEET_NAMES.accountingJournals).filter(function (row) {
    return includeQa || !isQaRecord(row);
  }).map(publicAccountingJournal).reverse();
  return { ok: true, total: rows.length, journals: rows };
}

function getAccountingJournal(body) {
  const admin = financeAdminSession(body || {});
  if (!admin.ok) return admin;
  const id = cleanString(body && (body.journal_id || body.journalId), 80);
  const journal = sheetToObjects(SHEET_NAMES.accountingJournals).find(function (row) { return cleanString(row.journal_id, 80) === id; });
  if (!journal) return financeError("NOT_FOUND", "Journal not found.");
  const entries = sheetToObjects(SHEET_NAMES.accountingLedger).filter(function (entry) { return cleanString(entry.journal_id, 80) === id; }).map(publicAccountingLedger);
  return { ok: true, journal: publicAccountingJournal(journal), entries: entries };
}

function listGeneralLedger(body) {
  const admin = financeAdminSession(body || {});
  if (!admin.ok) return admin;
  const includeQa = booleanValue(body && body.include_qa);
  const accountCode = cleanString(body && body.account_code, 40);
  const rows = sheetToObjects(SHEET_NAMES.accountingLedger).filter(function (row) {
    if (!includeQa && isQaRecord(row)) return false;
    if (accountCode && cleanString(row.account_code, 40) !== accountCode) return false;
    return true;
  }).map(publicAccountingLedger).reverse();
  return { ok: true, total: rows.length, ledger: rows };
}

function listVatLedger(body) {
  const admin = financeAdminSession(body || {});
  if (!admin.ok) return admin;
  const rows = sheetToObjects(SHEET_NAMES.vatLedger).filter(function (row) { return booleanValue(body && body.include_qa) || !isQaRecord(row); });
  return { ok: true, total: rows.length, vat_ledger: rows.reverse() };
}

function listCompanyRevenue(body) {
  const admin = financeAdminSession(body || {});
  if (!admin.ok) return admin;
  const rows = sheetToObjects(SHEET_NAMES.companyRevenueLedger).filter(function (row) { return booleanValue(body && body.include_qa) || !isQaRecord(row); });
  return { ok: true, total: rows.length, company_revenue: rows.reverse() };
}

function listExpenseAllocations(body) {
  const admin = financeAdminSession(body || {});
  if (!admin.ok) return admin;
  const rows = sheetToObjects(SHEET_NAMES.expenseAllocationLedger).filter(function (row) { return booleanValue(body && body.include_qa) || !isQaRecord(row); });
  return { ok: true, total: rows.length, expense_allocations: rows.reverse() };
}

function runAccountingReconciliation(body) {
  const admin = financeAdminSession(body || {});
  if (!admin.ok) return admin;
  ensureFinanceSheets();
  const includeQa = booleanValue(body && body.include_qa);
  const issues = [];
  const legacyIssues = [];
  const ledgerKeys = {};
  sheetToObjects(SHEET_NAMES.accountingLedger).forEach(function (entry) {
    if (!includeQa && isQaRecord(entry)) return;
    const key = cleanString(entry.idempotency_key, 220);
    if (key) ledgerKeys[key] = (ledgerKeys[key] || 0) + 1;
  });
  Object.keys(ledgerKeys).forEach(function (key) {
    if (ledgerKeys[key] > 1) issues.push({ severity: "CRITICAL", type: "DUPLICATE_ACCOUNTING_IDEMPOTENCY_KEY", idempotency_key: key, count: ledgerKeys[key] });
  });
  const orders = sheetToObjects(SHEET_NAMES.orders);
  const journals = sheetToObjects(SHEET_NAMES.accountingJournals);
  const allocations = sheetToObjects(SHEET_NAMES.teamCommissionAllocations);
  const commissions = sheetToObjects(SHEET_NAMES.commissions);
  const payments = sheetToObjects(SHEET_NAMES.payments);
  sheetToObjects(SHEET_NAMES.orders).forEach(function (order) {
    if (!includeQa && isQaRecord(order)) return;
    const status = normalizeSalesStatus(order.status || "");
    const isLegacy = !hasCompletePricingSnapshot(order);
    if (["DEPOSIT_PAID", "PAID", "PAID_IN_FULL", "PREPARING", "READY_TO_INSTALL", "INSTALLING", "COMPLETED"].indexOf(status) !== -1) {
      const approved = summarizePaymentsForOrder(order.order_id).approved_amount;
      if (approved > 0) {
        const journal = journals.find(function (row) { return cleanString(row.order_id, 80) === cleanString(order.order_id, 80); });
        if (!journal) {
          const target = isLegacy ? legacyIssues : issues;
          target.push({
            severity: isLegacy ? "MEDIUM" : "HIGH",
            type: isLegacy ? "LEGACY_REVIEW_REQUIRED" : "MISSING_ACCOUNTING_POSTING",
            order_id: order.order_id,
            original_type: "MISSING_ACCOUNTING_POSTING"
          });
        }
      }
    }
    if (isLegacy) {
      legacyIssues.push({
        severity: "MEDIUM",
        type: "LEGACY_ORDER_MISSING_PRICING_SNAPSHOT",
        classification: "LEGACY_REVIEW_REQUIRED",
        order_id: order.order_id,
        original_total: Number(order.grand_total || order.total || 0),
        available_fields: Object.keys(order).filter(function (key) { return cleanString(order[key], 200000); }),
        missing_fields: ["pricing_snapshot_json"]
      });
    } else {
      const snapshot = pricingSnapshotForOrder(order);
      const componentSatang = Object.keys(snapshot.components || {}).reduce(function (total, key) {
        return total + Math.max(0, toSatang(snapshot.components[key] || 0));
      }, 0);
      const beforeVatSatang = toSatang(snapshot.selling_price_before_vat || order.subtotal || 0);
      const vatSatang = toSatang(snapshot.vat_amount || order.vat || 0);
      const totalSatang = toSatang(snapshot.selling_price_including_vat || order.grand_total || order.total || 0);
      if (componentSatang !== beforeVatSatang) {
        issues.push({ severity: "HIGH", type: "ORDER_PRICING_COMPONENT_MISMATCH", order_id: order.order_id, expected: fromSatang(beforeVatSatang), actual: fromSatang(componentSatang) });
      }
      if (beforeVatSatang + vatSatang !== totalSatang) {
        issues.push({ severity: "HIGH", type: "ORDER_PRICING_VAT_MISMATCH", order_id: order.order_id, expected: fromSatang(beforeVatSatang + vatSatang), actual: fromSatang(totalSatang) });
      }
      const allocation = allocations.find(function (row) {
        return cleanString(row.order_id, 80) === cleanString(order.order_id, 80) && normalizeSalesStatus(row.status || "ALLOCATED") !== "REVERSED";
      });
      if (allocation) {
        const centralSatang = toSatang(allocation.central_commission_pool || 0);
        const distributedSatang = toSatang(allocation.member_commission || 0) + toSatang(allocation.manager_retained_commission || 0);
        if (centralSatang !== distributedSatang && cleanString(allocation.team_manager_id, 80)) {
          issues.push({ severity: "HIGH", type: "CENTRAL_POOL_DISTRIBUTION_MISMATCH", order_id: order.order_id, expected: fromSatang(centralSatang), actual: fromSatang(distributedSatang) });
        }
      }
      ["SIM_INCOME", "SPC_INCOME"].forEach(function (component) {
        const count = commissions.filter(function (row) {
          return cleanString(row.order_id, 80) === cleanString(order.order_id, 80) &&
            normalizeSalesStatus(row.commission_type || "") === component &&
            normalizeSalesStatus(row.status || "") !== "REVERSED";
        }).length;
        if (count > 1) issues.push({ severity: "HIGH", type: "DUPLICATE_" + component, order_id: order.order_id, count: count });
      });
    }
  });
  payments.forEach(function (payment) {
    if (!includeQa && isQaRecord(payment)) return;
    if (normalizeSalesStatus(payment.status || "") !== "APPROVED") return;
    const order = orders.find(function (item) { return cleanString(item.order_id, 80) === cleanString(payment.order_id, 80); });
    if (order && !hasCompletePricingSnapshot(order)) return;
    const journalKey = ["ACCT", payment.order_id, payment.payment_id, "APPROVED_PAYMENT"].join(":");
    const journal = journals.find(function (row) { return cleanString(row.idempotency_key, 220) === journalKey; });
    if (!journal) issues.push({ severity: "HIGH", type: "APPROVED_PAYMENT_WITHOUT_ACCOUNTING_POSTING", order_id: payment.order_id, payment_id: payment.payment_id });
  });
  const runAt = new Date();
  issues.concat(legacyIssues).forEach(function (issue) {
    appendObject(SHEET_NAMES.accountingReconciliation, {
      reconciliation_id: makeId("REC"),
      run_at: runAt,
      status: "REPORT_ONLY",
      issue_type: issue.type,
      severity: issue.severity,
      entity_type: issue.order_id ? "ORDER" : "LEDGER",
      entity_id: issue.order_id || issue.idempotency_key || "",
      message: issue.type,
      metadata_json: JSON.stringify(issue),
      created_by: admin.actor_id,
      is_test: false,
      qa_batch: ""
    });
  });
  return {
    ok: true,
    report_only: true,
    total_issues: issues.length + legacyIssues.length,
    critical_or_high: issues.filter(function (i) { return i.severity === "HIGH" || i.severity === "CRITICAL"; }).length,
    new_system: {
      total_issues: issues.length,
      critical_or_high: issues.filter(function (i) { return i.severity === "HIGH" || i.severity === "CRITICAL"; }).length,
      issues: issues
    },
    legacy_backlog: {
      total_issues: legacyIssues.length,
      status: legacyIssues.length ? "LEGACY_REVIEW_REQUIRED" : "LEGACY_RECONCILED",
      issues: legacyIssues
    },
    issues: issues.concat(legacyIssues)
  };
}

function reverseAccountingPosting(body) {
  return withFinanceLock(function () {
    const admin = financeAdminSession(body || {});
    if (!admin.ok) return admin;
    const paymentId = cleanString(body && (body.payment_id || body.paymentId), 80);
    const orderId = cleanString(body && (body.order_id || body.orderId), 80);
    const reason = cleanString(body && body.reason, 500);
    if (!paymentId && !orderId) return financeError("INVALID_REQUEST", "Reversal requires payment_id or order_id.");
    if (!reason) return financeError("INVALID_REQUEST", "Reversal reason is required.");

    const order = orderId ? findOrderById(orderId) : null;
    const payment = paymentId ? sheetToObjects(SHEET_NAMES.payments).find(function (row) {
      return cleanString(row.payment_id, 80) === paymentId;
    }) : null;
    const resolvedOrder = order || (payment ? findOrderById(payment.order_id) : null);
    if (!resolvedOrder) return financeError("NOT_FOUND", "Order not found for reversal.");

    const qaAllowed = isQaRecord(body || {}) || isQaRecord(resolvedOrder) || (payment && isQaRecord(payment));
    if (!qaAllowed) {
      return financeError("QA_ONLY_REVERSAL_REQUIRED", "Automated reversal is restricted to QA/test transactions.");
    }

    const targetOrderId = cleanString(resolvedOrder.order_id, 80);
    const targetPaymentId = payment ? cleanString(payment.payment_id, 80) : paymentId;
    const qaBatch = qaBatchFor(body || {}) || qaBatchFor(resolvedOrder) || qaBatchFor(payment || {});
    const reverseKey = ["REVERSAL", targetOrderId, targetPaymentId || "ALL"].join(":");
    const accountingLedgerRows = sheetToObjects(SHEET_NAMES.accountingLedger);
    const accountingLedgerKeys = {};
    accountingLedgerRows.forEach(function (entry) {
      const key = cleanString(entry.idempotency_key, 220);
      if (key) accountingLedgerKeys[key] = entry;
    });
    const walletLedgerKeys = sheetIdempotencyMap(SHEET_NAMES.walletLedger);
    const existingJournal = sheetToObjects(SHEET_NAMES.accountingJournals).find(function (row) {
      return cleanString(row.idempotency_key, 220) === reverseKey;
    });

    const journal = existingJournal || {
      journal_id: makeId("AJR"),
      journal_type: "REVERSAL",
      source_type: targetPaymentId ? "PAYMENT" : "ORDER",
      source_id: targetPaymentId || targetOrderId,
      order_id: targetOrderId,
      payment_id: targetPaymentId,
      status: "POSTED",
      posted_at: new Date(),
      created_by: admin.actor_id,
      note: reason,
      idempotency_key: reverseKey,
      is_test: true,
      qa_batch: qaBatch
    };
    if (!existingJournal) appendObject(SHEET_NAMES.accountingJournals, journal);

    let accountingReversed = 0;
    accountingLedgerRows.filter(function (entry) {
      if (cleanString(entry.order_id, 80) !== targetOrderId) return false;
      if (targetPaymentId && cleanString(entry.payment_id, 80) !== targetPaymentId) return false;
      if (cleanString(entry.component, 120).indexOf("reversal:") === 0) return false;
      return normalizeSalesStatus(entry.status || "POSTED") === "POSTED";
    }).forEach(function (entry) {
      const key = "REVERSAL:" + cleanString(entry.idempotency_key, 220);
      const row = appendAccountingLedgerEntry({
        journal_id: journal.journal_id,
        account_code: entry.account_code,
        direction: normalizeSalesStatus(entry.direction) === "DEBIT" ? "CREDIT" : "DEBIT",
        amount: Number(entry.amount || 0),
        order_id: targetOrderId,
        payment_id: cleanString(entry.payment_id, 80),
        product_id: entry.product_id,
        sku: entry.sku,
        pricing_version_id: entry.pricing_version_id,
        component: "reversal:" + cleanString(entry.component, 100),
        idempotency_key: key,
        created_by: admin.actor_id,
        is_test: true,
        qa_batch: qaBatch
      }, { key_map: accountingLedgerKeys });
      if (cleanString(row.idempotency_key, 220) === key) accountingReversed += 1;
    });

    let commissionReversed = 0;
    const affectedAgents = {};
    sheetToObjects(SHEET_NAMES.commissions).filter(function (commission) {
      if (cleanString(commission.order_id, 80) !== targetOrderId) return false;
      if (targetPaymentId && cleanString(commission.payment_id, 80) !== targetPaymentId) return false;
      return ["AVAILABLE", "HELD", "PENDING", "REVERSED"].indexOf(normalizeSalesStatus(commission.status || "")) !== -1;
    }).forEach(function (commission) {
      const amount = Number(commission.released_amount || 0);
      const current = normalizeSalesStatus(commission.status || "");
      const reversalLedgerKey = "REVERSAL:LEDGER:" + cleanString(commission.commission_id, 80);
      const hasReversalLedger = Boolean(walletLedgerKeys[reversalLedgerKey]);
      if (amount > 0 && current !== "PENDING" && !hasReversalLedger) {
        appendLedgerEntry({
          agent_id: commission.agent_id,
          entry_type: "COMMISSION_REVERSAL",
          direction: "DEBIT",
          amount: amount,
          balance_bucket: current === "HELD" ? "HELD" : "AVAILABLE",
          reference_type: "COMMISSION",
          reference_id: commission.commission_id,
          idempotency_key: reversalLedgerKey,
          note: reason,
          created_by_type: "ADMIN",
          created_by_id: admin.actor_id,
          is_test: true,
          qa_batch: qaBatch
        }, { key_map: walletLedgerKeys, skip_projection: true });
      }
      if (current !== "REVERSED") {
        updateRowFields(SHEET_NAMES.commissions, commission._row, {
          status: "REVERSED",
          reversed_at: new Date(),
          note: cleanString((commission.note || "") + " | Reversed: " + reason, 500)
        });
      }
      affectedAgents[cleanString(commission.agent_id, 80)] = true;
      commissionReversed += 1;
    });

    sheetToObjects(SHEET_NAMES.teamCommissionAllocations).forEach(function (allocation) {
      if (cleanString(allocation.order_id, 80) !== targetOrderId) return;
      if (targetPaymentId && cleanString(allocation.payment_id, 80) !== targetPaymentId) return;
      if (normalizeSalesStatus(allocation.status || "") === "REVERSED") return;
      updateRowFields(SHEET_NAMES.teamCommissionAllocations, allocation._row, { status: "REVERSED" });
    });

    Object.keys(affectedAgents).forEach(function (agentId) {
      if (existingAgentId(agentId)) updateWalletProjection(agentId);
    });

    writeAccountingAudit("REVERSAL", targetPaymentId || targetOrderId, "ACCOUNTING_REVERSAL_POSTED", "SUCCESS", admin.actor_id, reason, {
      order_id: targetOrderId,
      payment_id: targetPaymentId,
      accounting_reversed: accountingReversed,
      commissions_reversed: commissionReversed,
      is_test: true,
      qa_batch: qaBatch
    });
    writeFinanceAudit("REVERSAL", targetPaymentId || targetOrderId, "FINANCE_REVERSAL_POSTED", "", "REVERSED", 0, "ADMIN", admin.actor_id, reason, {
      order_id: targetOrderId,
      payment_id: targetPaymentId,
      accounting_reversed: accountingReversed,
      commissions_reversed: commissionReversed
    }, true, qaBatch);

    return {
      ok: true,
      duplicate: Boolean(existingJournal),
      journal: publicAccountingJournal(journal),
      accounting_reversed: accountingReversed,
      commissions_reversed: commissionReversed,
      order_id: targetOrderId,
      payment_id: targetPaymentId
    };
  });
}

function rebuildSafeProjection(body) {
  const admin = financeAdminSession(body || {});
  if (!admin.ok) return admin;
  return runAccountingReconciliation(body || {});
}

function publicCompensationAgreement(row) {
  return {
    agreement_id: cleanString(row.agreement_id, 80),
    agent_id: cleanString(row.agent_id, 80),
    team_manager_id: cleanString(row.team_manager_id, 80),
    team_id: cleanString(row.team_id, 80),
    collection: cleanString(row.collection, 180),
    model: cleanString(row.model, 160),
    sku: cleanString(row.sku, 120),
    agreement_type: normalizeSalesStatus(row.agreement_type || "FIXED_PER_UNIT"),
    value: Number(row.value || 0),
    tier_plan_id: cleanString(row.tier_plan_id, 80),
    status: normalizeSalesStatus(row.status || "DRAFT"),
    effective_from: row.effective_from || "",
    effective_until: row.effective_until || "",
    approved_by: cleanString(row.approved_by, 80),
    created_at: row.created_at || "",
    updated_at: row.updated_at || "",
    is_test: booleanValue(row.is_test),
    qa_batch: cleanString(row.qa_batch, 120)
  };
}

function publicTierPlan(row) {
  return {
    tier_plan_id: cleanString(row.tier_plan_id, 80),
    tier_name: cleanString(row.tier_name, 160),
    tier_type: normalizeSalesStatus(row.tier_type || "TIER_BY_QUANTITY"),
    min_quantity: Number(row.min_quantity || 0),
    max_quantity: Number(row.max_quantity || 0),
    min_sales_amount: Number(row.min_sales_amount || 0),
    max_sales_amount: Number(row.max_sales_amount || 0),
    commission_type: normalizeSalesStatus(row.commission_type || "FIXED_PER_UNIT"),
    commission_value: Number(row.commission_value || 0),
    status: normalizeSalesStatus(row.status || "DRAFT"),
    effective_from: row.effective_from || "",
    effective_until: row.effective_until || "",
    created_at: row.created_at || "",
    updated_at: row.updated_at || "",
    is_test: booleanValue(row.is_test),
    qa_batch: cleanString(row.qa_batch, 120)
  };
}

function listAgentCompensationAgreements(body) {
  const admin = financeAdminSession(body || {});
  if (!admin.ok) return admin;
  const agentId = validateAgentId(body && body.agent_id);
  const rows = sheetToObjects(SHEET_NAMES.agentCompensationAgreements).filter(function (row) {
    return !agentId || cleanString(row.agent_id, 80) === agentId;
  }).map(publicCompensationAgreement).reverse();
  return { ok: true, total: rows.length, agreements: rows };
}

function saveCompensationAgreement(body, existing, admin) {
  const now = new Date();
  const type = normalizeSalesStatus(body.agreement_type || (existing && existing.agreement_type) || "FIXED_PER_UNIT");
  const allowed = ["FIXED_PER_UNIT", "PERCENT_OF_CENTRAL_POOL", "TIER_BY_QUANTITY", "TIER_BY_SALES_AMOUNT"];
  if (allowed.indexOf(type) === -1) throw new Error("Invalid agreement_type");
  const agentId = validateAgentId(body.agent_id || (existing && existing.agent_id));
  if (!agentId) throw new Error("Invalid agent_id");
  return {
    agreement_id: existing ? existing.agreement_id : makeId("AGR"),
    agent_id: agentId,
    team_manager_id: cleanString(body.team_manager_id || (existing && existing.team_manager_id), 80),
    team_id: cleanString(body.team_id || (existing && existing.team_id), 80),
    collection: safeSheetText(body.collection || (existing && existing.collection), 180),
    model: safeSheetText(body.model || (existing && existing.model), 160),
    sku: safeSheetText(body.sku || (existing && existing.sku), 120),
    agreement_type: type,
    value: Math.max(0, Number(body.value || (existing && existing.value) || 0)),
    tier_plan_id: cleanString(body.tier_plan_id || (existing && existing.tier_plan_id), 80),
    status: normalizeSalesStatus(body.status || (existing && existing.status) || "DRAFT"),
    effective_from: body.effective_from || (existing && existing.effective_from) || now,
    effective_until: body.effective_until || (existing && existing.effective_until) || "",
    approved_by: existing ? existing.approved_by : "",
    created_by: existing ? existing.created_by : admin.actor_id,
    change_reason: safeSheetText(body.change_reason || body.reason || "Compensation agreement saved", 500),
    created_at: existing ? existing.created_at : now,
    updated_at: now,
    is_test: booleanValue(body.is_test) || isQaRecord(body),
    qa_batch: cleanString(body.qa_batch, 120)
  };
}

function createAgentCompensationAgreement(body) {
  const admin = financeAdminSession(body || {});
  if (!admin.ok) return admin;
  try {
    const row = saveCompensationAgreement(body || {}, null, admin);
    appendObject(SHEET_NAMES.agentCompensationAgreements, row);
    writeFinanceAudit("COMPENSATION_AGREEMENT", row.agreement_id, "AGREEMENT_CREATED", "", row.status, row.value, "ADMIN", admin.actor_id, row.change_reason, row, row.is_test, row.qa_batch);
    return { ok: true, agreement: publicCompensationAgreement(row) };
  } catch (error) {
    return financeError("INVALID_REQUEST", error.message || "Invalid compensation agreement.");
  }
}

function updateAgentCompensationAgreement(body) {
  const admin = financeAdminSession(body || {});
  if (!admin.ok) return admin;
  const id = cleanString(body && (body.agreement_id || body.agreementId), 80);
  const existing = sheetToObjects(SHEET_NAMES.agentCompensationAgreements).find(function (row) { return cleanString(row.agreement_id, 80) === id; });
  if (!existing) return financeError("NOT_FOUND", "Compensation agreement not found.");
  try {
    const row = saveCompensationAgreement(body || {}, existing, admin);
    if (normalizeSalesStatus(row.status) === "ACTIVE") row.status = "DRAFT";
    updateRowFields(SHEET_NAMES.agentCompensationAgreements, existing._row, row);
    writeFinanceAudit("COMPENSATION_AGREEMENT", row.agreement_id, "AGREEMENT_UPDATED", existing.status, row.status, row.value, "ADMIN", admin.actor_id, row.change_reason, row, row.is_test, row.qa_batch);
    return { ok: true, agreement: publicCompensationAgreement(row) };
  } catch (error) {
    return financeError("INVALID_REQUEST", error.message || "Invalid compensation agreement.");
  }
}

function approveAgentCompensationAgreement(body) {
  const admin = financeAdminSession(body || {});
  if (!admin.ok) return admin;
  const id = cleanString(body && (body.agreement_id || body.agreementId), 80);
  const row = sheetToObjects(SHEET_NAMES.agentCompensationAgreements).find(function (item) { return cleanString(item.agreement_id, 80) === id; });
  if (!row) return financeError("NOT_FOUND", "Compensation agreement not found.");
  const updates = { status: "ACTIVE", approved_by: admin.actor_id, updated_at: new Date() };
  updateRowFields(SHEET_NAMES.agentCompensationAgreements, row._row, updates);
  writeFinanceAudit("COMPENSATION_AGREEMENT", row.agreement_id, "AGREEMENT_APPROVED", row.status, "ACTIVE", row.value, "ADMIN", admin.actor_id, cleanString(body && body.reason, 500), row, isQaRecord(row), qaBatchFor(row));
  return { ok: true, agreement: publicCompensationAgreement(Object.assign({}, row, updates)) };
}

function listTierPlans(body) {
  const admin = financeAdminSession(body || {});
  if (!admin.ok) return admin;
  const rows = sheetToObjects(SHEET_NAMES.agentCompensationTiers).map(publicTierPlan).reverse();
  return { ok: true, total: rows.length, tier_plans: rows };
}

function saveTierPlan(body, existing, admin) {
  const now = new Date();
  return {
    tier_plan_id: existing ? existing.tier_plan_id : makeId("TIER"),
    tier_name: safeSheetText(body.tier_name || (existing && existing.tier_name), 160),
    tier_type: normalizeSalesStatus(body.tier_type || (existing && existing.tier_type) || "TIER_BY_QUANTITY"),
    min_quantity: Math.max(0, Number(body.min_quantity || (existing && existing.min_quantity) || 0)),
    max_quantity: Math.max(0, Number(body.max_quantity || (existing && existing.max_quantity) || 0)),
    min_sales_amount: Math.max(0, Number(body.min_sales_amount || (existing && existing.min_sales_amount) || 0)),
    max_sales_amount: Math.max(0, Number(body.max_sales_amount || (existing && existing.max_sales_amount) || 0)),
    commission_type: normalizeSalesStatus(body.commission_type || (existing && existing.commission_type) || "FIXED_PER_UNIT"),
    commission_value: Math.max(0, Number(body.commission_value || (existing && existing.commission_value) || 0)),
    status: normalizeSalesStatus(body.status || (existing && existing.status) || "DRAFT"),
    effective_from: body.effective_from || (existing && existing.effective_from) || now,
    effective_until: body.effective_until || (existing && existing.effective_until) || "",
    created_by: existing ? existing.created_by : admin.actor_id,
    approved_by: existing ? existing.approved_by : "",
    created_at: existing ? existing.created_at : now,
    updated_at: now,
    is_test: booleanValue(body.is_test) || isQaRecord(body),
    qa_batch: cleanString(body.qa_batch, 120)
  };
}

function createTierPlan(body) {
  const admin = financeAdminSession(body || {});
  if (!admin.ok) return admin;
  const row = saveTierPlan(body || {}, null, admin);
  appendObject(SHEET_NAMES.agentCompensationTiers, row);
  return { ok: true, tier_plan: publicTierPlan(row) };
}

function updateTierPlan(body) {
  const admin = financeAdminSession(body || {});
  if (!admin.ok) return admin;
  const id = cleanString(body && (body.tier_plan_id || body.tierPlanId), 80);
  const existing = sheetToObjects(SHEET_NAMES.agentCompensationTiers).find(function (row) { return cleanString(row.tier_plan_id, 80) === id; });
  if (!existing) return financeError("NOT_FOUND", "Tier plan not found.");
  const row = saveTierPlan(body || {}, existing, admin);
  updateRowFields(SHEET_NAMES.agentCompensationTiers, existing._row, row);
  return { ok: true, tier_plan: publicTierPlan(row) };
}

function activeAgreementForOrder(order) {
  const now = new Date();
  const agentId = cleanString(order.owner_agent_id || order.agent_id, 80);
  const rows = sheetToObjects(SHEET_NAMES.agentCompensationAgreements).filter(function (row) {
    if (normalizeSalesStatus(row.status || "") !== "ACTIVE") return false;
    if (cleanString(row.agent_id, 80) !== agentId) return false;
    if (cleanString(row.sku, 120) && cleanString(row.sku, 120) !== cleanString(order.sku, 120)) return false;
    if (cleanString(row.model, 160) && cleanString(row.model, 160) !== cleanString(order.model, 160)) return false;
    if (cleanString(row.collection, 180) && cleanString(row.collection, 180) !== cleanString(order.collection, 180)) return false;
    const from = row.effective_from ? new Date(row.effective_from) : null;
    const until = row.effective_until ? new Date(row.effective_until) : null;
    return (!from || from <= now) && (!until || until >= now);
  });
  return rows[rows.length - 1] || null;
}

function calculateAgreementCommissionSatang(order, agreement, centralPoolSatang) {
  if (!agreement) return 0;
  const quantity = Math.max(1, Number(order.quantity || 1));
  const type = normalizeSalesStatus(agreement.agreement_type || "");
  if (type === "FIXED_PER_UNIT") return Math.min(centralPoolSatang, toSatang(agreement.value || 0) * quantity);
  if (type === "PERCENT_OF_CENTRAL_POOL") return Math.min(centralPoolSatang, percentSatang(centralPoolSatang, Number(agreement.value || 0)));
  if (type === "TIER_BY_QUANTITY" || type === "TIER_BY_SALES_AMOUNT") {
    const tiers = sheetToObjects(SHEET_NAMES.agentCompensationTiers).filter(function (tier) {
      if (normalizeSalesStatus(tier.status || "") !== "ACTIVE") return false;
      if (cleanString(tier.tier_plan_id, 80) !== cleanString(agreement.tier_plan_id, 80)) return false;
      if (type === "TIER_BY_QUANTITY") {
        const minQ = Number(tier.min_quantity || 0);
        const maxQ = Number(tier.max_quantity || 0);
        return quantity >= minQ && (!maxQ || quantity <= maxQ);
      }
      const total = Number(order.grand_total || order.total || 0);
      const minA = Number(tier.min_sales_amount || 0);
      const maxA = Number(tier.max_sales_amount || 0);
      return total >= minA && (!maxA || total <= maxA);
    });
    const tier = tiers[tiers.length - 1];
    if (!tier) return 0;
    const tierType = normalizeSalesStatus(tier.commission_type || "FIXED_PER_UNIT");
    if (tierType === "PERCENT_OF_CENTRAL_POOL" || tierType === "PERCENT") return Math.min(centralPoolSatang, percentSatang(centralPoolSatang, Number(tier.commission_value || 0)));
    return Math.min(centralPoolSatang, toSatang(tier.commission_value || 0) * quantity);
  }
  return 0;
}

function compensationIdempotencyKey(order, payment, component, agentId) {
  return ["V37COMP", cleanString(order.order_id, 80), cleanString(agentId, 80), component].join(":");
}

function appendV37Commission(order, payment, agentId, component, amountSatang, actor, note, options) {
  if (amountSatang <= 0) return null;
  const opts = options || {};
  const commissionKeyMap = opts.commission_key_map || opts.commissionKeyMap || null;
  const walletLedgerKeyMap = opts.wallet_ledger_key_map || opts.walletLedgerKeyMap || null;
  const key = compensationIdempotencyKey(order, payment, component, agentId);
  const existing = commissionKeyMap
    ? commissionKeyMap[key]
    : sheetToObjects(SHEET_NAMES.commissions).find(function (row) { return cleanString(row.idempotency_key, 220) === key; });
  if (existing) return existing;
  const now = new Date();
  const isTest = shouldExcludeFromFinance(order) || shouldExcludeFromFinance(payment);
  const qaBatch = qaBatchFor(order) || qaBatchFor(payment);
  const commission = {
    commission_id: makeId("COM"),
    idempotency_key: key,
    agent_id: agentId,
    customer_id: order.customer_id,
    quotation_id: order.quotation_id,
    order_id: order.order_id,
    payment_id: payment.payment_id,
    product_id: order.product_id,
    commission_rule_id: "V3-7",
    commission_type: component,
    milestone: normalizeSalesStatus(payment.payment_type || "PAYMENT"),
    gross_order_amount: Number(order.grand_total || order.total || 0),
    commissionable_amount: Number(order.grand_total || order.total || 0),
    total_order_commission: fromSatang(amountSatang),
    released_amount: fromSatang(amountSatang),
    pending_amount: 0,
    status: "AVAILABLE",
    source_status: "APPROVED",
    created_at: now,
    available_at: now,
    held_at: "",
    reversed_at: "",
    reference_commission_id: "",
    note: cleanString(note || "V3-7 compensation from approved payment.", 500),
    is_test: isTest,
    qa_batch: qaBatch
  };
  appendObject(SHEET_NAMES.commissions, commission);
  if (commissionKeyMap) commissionKeyMap[key] = commission;
  appendLedgerEntry({
    agent_id: agentId,
    entry_type: "COMMISSION_RELEASE",
    direction: "CREDIT",
    amount: fromSatang(amountSatang),
    balance_bucket: "AVAILABLE",
    reference_type: "COMMISSION",
    reference_id: commission.commission_id,
    idempotency_key: "LEDGER:" + key,
    note: component,
    created_by_type: "ADMIN",
    created_by_id: actor.actor_id,
    is_test: isTest,
    qa_batch: qaBatch
  }, { key_map: walletLedgerKeyMap, skip_projection: Boolean(walletLedgerKeyMap) });
  if (opts.affected_agents) opts.affected_agents[cleanString(agentId, 80)] = true;
  return commission;
}

function calculateOrderCompensationSnapshot(order) {
  const snapshot = pricingSnapshotForOrder(order);
  const quantity = Math.max(1, Number(snapshot.quantity || order.quantity || 1));
  const centralPoolSatang = Math.max(0, toSatang((snapshot.components || {}).central_commission_pool || 0) * quantity);
  const agreement = activeAgreementForOrder(order);
  const memberSatang = calculateAgreementCommissionSatang(order, agreement, centralPoolSatang);
  const assignment = agentTeamAssignment(order.owner_agent_id || order.agent_id) || {};
  const assignedTeam = assignment.team_id ? findTeamById(assignment.team_id) : null;
  const orderManagerId = existingAgentId(order.team_leader_id);
  const managerId = orderManagerId ||
    existingAgentId((assignedTeam && assignedTeam.primary_team_manager_id) || "") ||
    existingAgentId(agreement && agreement.team_manager_id);
  return {
    pricing_version_id: cleanString(snapshot.pricing_version_id, 80),
    central_pool: fromSatang(centralPoolSatang),
    member_commission: fromSatang(memberSatang),
    manager_retained_commission: fromSatang(Math.max(0, centralPoolSatang - memberSatang)),
    unassigned_central_commission: managerId ? 0 : fromSatang(Math.max(0, centralPoolSatang - memberSatang)),
    team_manager_id: managerId,
    agreement_id: agreement ? cleanString(agreement.agreement_id, 80) : "",
    sim_income: Number(readFinanceSetting("agent_sim_income", DEFAULT_SIM_INCOME)),
    spc_income: Number(readFinanceSetting("agent_spc_income", DEFAULT_SPC_INCOME))
  };
}

function calculateOrderCompensation(body) {
  const admin = financeAdminSession(body || {});
  if (!admin.ok) return admin;
  const order = findOrderById(body && (body.order_id || body.orderId));
  if (!order) return financeError("NOT_FOUND", "Order not found.");
  return { ok: true, compensation: calculateOrderCompensationSnapshot(order) };
}

function postTeamCompensationForApprovedPayment(payment, actor) {
  ensureSalesSheets();
  ensureFinanceSheets();
  if (normalizeSalesStatus(payment.status || "") !== "APPROVED") return { ok: true, skipped: true, reason: "PAYMENT_NOT_APPROVED" };
  const order = findOrderById(payment.order_id);
  if (!order) return financeError("NOT_FOUND", "Order not found for compensation.");
  const agentId = cleanString(order.owner_agent_id || order.agent_id, 80);
  const isTest = shouldExcludeFromFinance(order) || shouldExcludeFromFinance(payment);
  const qaBatch = qaBatchFor(order) || qaBatchFor(payment);
  const comp = calculateOrderCompensationSnapshot(order);
  const simSatang = toSatang(comp.sim_income || 0);
  const spcSatang = toSatang(comp.spc_income || 0);
  const memberSatang = toSatang(comp.member_commission || 0);
  const managerSatang = comp.team_manager_id ? toSatang(comp.manager_retained_commission || 0) : 0;
  const commissionKeys = sheetIdempotencyMap(SHEET_NAMES.commissions);
  const walletLedgerKeys = sheetIdempotencyMap(SHEET_NAMES.walletLedger);
  const affectedAgents = {};
  const commissionOptions = {
    commission_key_map: commissionKeys,
    wallet_ledger_key_map: walletLedgerKeys,
    affected_agents: affectedAgents
  };
  appendV37Commission(order, payment, agentId, "SIM_INCOME", simSatang, actor, "Agent SIM income from SSBMS bundle.", commissionOptions);
  appendV37Commission(order, payment, agentId, "SPC_INCOME", spcSatang, actor, "Agent SPC income from SSBMS bundle.", commissionOptions);
  appendV37Commission(order, payment, agentId, "SALES_COMMISSION", memberSatang, actor, "Agent sales commission from central commission pool.", commissionOptions);
  appendV37Commission(order, payment, comp.team_manager_id, "TEAM_MANAGER_RETAINED_COMMISSION", managerSatang, actor, "Team manager retained commission from central commission pool.", commissionOptions);
  const allocationKey = ["TEAMPOOL", order.order_id].join(":");
  const existing = sheetToObjects(SHEET_NAMES.teamCommissionAllocations).find(function (row) { return cleanString(row.idempotency_key, 220) === allocationKey; });
  if (!existing) {
    const assignment = agentTeamAssignment(agentId) || {};
    appendObject(SHEET_NAMES.teamCommissionAllocations, {
      allocation_id: makeId("TCA"),
      order_id: order.order_id,
      payment_id: payment.payment_id,
      agent_id: agentId,
      team_manager_id: comp.team_manager_id,
      team_id: cleanString(assignment.team_id, 80),
      pricing_version_id: comp.pricing_version_id,
      central_commission_pool: comp.central_pool,
      member_commission: comp.member_commission,
      manager_retained_commission: comp.manager_retained_commission,
      sim_income: comp.sim_income,
      spc_income: comp.spc_income,
      status: "ALLOCATED",
      created_at: new Date(),
      idempotency_key: allocationKey,
      is_test: isTest,
      qa_batch: qaBatch
    });
  } else if (cleanString(existing.team_manager_id, 80) !== cleanString(comp.team_manager_id, 80)) {
    updateRowFields(SHEET_NAMES.teamCommissionAllocations, existing._row, {
      team_manager_id: comp.team_manager_id,
      member_commission: comp.member_commission,
      manager_retained_commission: comp.manager_retained_commission,
      status: "ALLOCATED"
    });
  }
  Object.keys(affectedAgents).forEach(function (id) {
    if (existingAgentId(id)) updateWalletProjection(id);
  });
  return { ok: true, compensation: comp, duplicate: Boolean(existing) };
}

function listMyIncome(body) {
  return listAgentCommissions(body || {});
}

function teamManagerActor(body) {
  return requireOrganizationActor(body || {}, [ORG_ROLE.ADMIN, ORG_ROLE.TEAM_MANAGER]);
}

function visibleTeamCommissionRows(actor) {
  const teamIds = scopedTeamIdsForActor(actor);
  return sheetToObjects(SHEET_NAMES.teamCommissionAllocations).filter(function (row) {
    if (actor.role === ORG_ROLE.ADMIN) return true;
    return teamIds.indexOf(cleanString(row.team_id, 80)) !== -1 ||
      cleanString(row.team_manager_id, 80) === cleanString(actor.agent_id, 80);
  });
}

function publicTeamCommissionAllocation(row, includeMemberDetail) {
  const item = {
    allocation_id: cleanString(row.allocation_id, 80),
    order_id: cleanString(row.order_id, 80),
    payment_id: cleanString(row.payment_id, 80),
    team_manager_id: cleanString(row.team_manager_id, 80),
    team_id: cleanString(row.team_id, 80),
    pricing_version_id: cleanString(row.pricing_version_id, 80),
    central_commission_pool: Number(row.central_commission_pool || 0),
    member_commission: Number(row.member_commission || 0),
    manager_retained_commission: Number(row.manager_retained_commission || 0),
    status: normalizeSalesStatus(row.status || "ALLOCATED"),
    created_at: row.created_at || "",
    is_test: booleanValue(row.is_test),
    qa_batch: cleanString(row.qa_batch, 120)
  };
  if (includeMemberDetail) {
    item.agent_id = cleanString(row.agent_id, 80);
    item.sim_income = Number(row.sim_income || 0);
    item.spc_income = Number(row.spc_income || 0);
  }
  return item;
}

function listTeamCommissionSummary(body) {
  const actor = teamManagerActor(body || {});
  if (!actor.ok) return actor;
  const rows = visibleTeamCommissionRows(actor).filter(function (row) { return booleanValue(body && body.include_qa) || !isQaRecord(row); });
  return {
    ok: true,
    total: rows.length,
    summary: {
      central_commission_pool: sum(rows, "central_commission_pool"),
      member_commission: sum(rows, "member_commission"),
      manager_retained_commission: sum(rows, "manager_retained_commission"),
      sim_income: sum(rows, "sim_income"),
      spc_income: sum(rows, "spc_income")
    },
    allocations: rows.map(function (row) { return publicTeamCommissionAllocation(row, true); }).reverse()
  };
}

function listTeamMemberIncome(body) {
  const actor = teamManagerActor(body || {});
  if (!actor.ok) return actor;
  const rows = visibleTeamCommissionRows(actor).filter(function (row) { return booleanValue(body && body.include_qa) || !isQaRecord(row); });
  return { ok: true, total: rows.length, member_income: rows.map(function (row) { return publicTeamCommissionAllocation(row, true); }).reverse() };
}

function listManagerCommission(body) {
  const actor = teamManagerActor(body || {});
  if (!actor.ok) return actor;
  const rows = visibleTeamCommissionRows(actor).filter(function (row) { return booleanValue(body && body.include_qa) || !isQaRecord(row); });
  return {
    ok: true,
    total: rows.length,
    manager_commission: rows.map(function (row) { return publicTeamCommissionAllocation(row, false); }).reverse(),
    summary: { retained_commission: sum(rows, "manager_retained_commission") }
  };
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
   SBOS V3-4 SINGLE SALES ORGANIZATION
========================================================= */

const ORG_ROLE = {
  ADMIN: "ADMIN",
  AREA_MANAGER: "AREA_MANAGER",
  TEAM_MANAGER: "TEAM_MANAGER",
  AGENT: "AGENT"
};

function normalizeOrgRole(role) {
  const value = cleanString(role, 60).toUpperCase().replace(/\s+/g, "_");
  if (value === "OWNER") return ORG_ROLE.ADMIN;
  if (value === "AREA_MANAGER" || value === "AM") return ORG_ROLE.AREA_MANAGER;
  if (value === "TEAM_MANAGER" || value === "TM" || value === "MANAGER") return ORG_ROLE.TEAM_MANAGER;
  if (value === "ADMIN") return ORG_ROLE.ADMIN;
  return ORG_ROLE.AGENT;
}

function isManagerRole(role) {
  const normalized = normalizeOrgRole(role);
  return normalized === ORG_ROLE.TEAM_MANAGER || normalized === ORG_ROLE.AREA_MANAGER;
}

function withOrganizationLock(fn) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(15000)) {
    return { ok: false, error: "ORG_LOCK_TIMEOUT", message: "Organization system is busy. Please try again." };
  }
  try {
    return fn();
  } finally {
    lock.releaseLock();
  }
}

function writeOrganizationAudit(entityType, entityId, action, actor, previousValue, newValue, message, seed) {
  ensureOrganizationSheets();
  appendObject(SHEET_NAMES.organizationAuditLogs, {
    log_id: makeId("OAL"),
    entity_type: cleanString(entityType, 80),
    entity_id: cleanString(entityId, 120),
    action: cleanString(action, 120),
    actor_role: cleanString(actor && actor.role, 60),
    actor_id: cleanString(actor && (actor.actor_id || actor.agent_id), 80),
    previous_value_json: JSON.stringify(previousValue || {}),
    new_value_json: JSON.stringify(newValue || {}),
    message: cleanString(message, 500),
    created_at: new Date(),
    is_test: isQaRecord(seed || {}),
    qa_batch: qaBatchFor(seed || {})
  });
}

function publicOrganizationArea(row) {
  return {
    area_id: cleanString(row.area_id, 80),
    area_code: cleanString(row.area_code, 80),
    area_name: cleanString(row.area_name, 180),
    description: cleanString(row.description, 500),
    status: normalizeSalesStatus(row.status || "ACTIVE"),
    created_at: row.created_at || "",
    updated_at: row.updated_at || "",
    is_test: booleanValue(row.is_test),
    qa_batch: cleanString(row.qa_batch, 120)
  };
}

function publicOrganizationTeam(row) {
  const area = findAreaById(row.area_id);
  return {
    team_id: cleanString(row.team_id, 80),
    team_code: cleanString(row.team_code, 80),
    team_name: cleanString(row.team_name, 180),
    area_id: cleanString(row.area_id, 80),
    area_name: area ? cleanString(area.area_name, 180) : "",
    primary_team_manager_id: cleanString(row.primary_team_manager_id, 80),
    description: cleanString(row.description, 500),
    status: normalizeSalesStatus(row.status || "ACTIVE"),
    created_at: row.created_at || "",
    updated_at: row.updated_at || "",
    is_test: booleanValue(row.is_test),
    qa_batch: cleanString(row.qa_batch, 120)
  };
}

function publicOrganizationAssignment(row) {
  return {
    assignment_id: cleanString(row.assignment_id, 80),
    assignment_type: normalizeSalesStatus(row.assignment_type || "AGENT_TEAM"),
    subject_agent_id: cleanString(row.subject_agent_id, 80),
    role: normalizeOrgRole(row.role),
    area_id: cleanString(row.area_id, 80),
    team_id: cleanString(row.team_id, 80),
    status: normalizeSalesStatus(row.status || "ACTIVE"),
    effective_from: row.effective_from || "",
    effective_to: row.effective_to || "",
    created_at: row.created_at || "",
    updated_at: row.updated_at || "",
    created_by: cleanString(row.created_by, 80),
    updated_by: cleanString(row.updated_by, 80),
    reason: cleanString(row.reason, 500),
    is_test: booleanValue(row.is_test),
    qa_batch: cleanString(row.qa_batch, 120)
  };
}

function publicSalesTarget(row) {
  return {
    target_id: cleanString(row.target_id, 80),
    target_type: normalizeSalesStatus(row.target_type || "AGENT"),
    agent_id: cleanString(row.agent_id, 80),
    team_id: cleanString(row.team_id, 80),
    area_id: cleanString(row.area_id, 80),
    period: cleanString(row.period, 40),
    target_orders: Number(row.target_orders || 0),
    target_revenue: Number(row.target_revenue || 0),
    status: normalizeSalesStatus(row.status || "ACTIVE"),
    created_at: row.created_at || "",
    updated_at: row.updated_at || "",
    is_test: booleanValue(row.is_test),
    qa_batch: cleanString(row.qa_batch, 120)
  };
}

function publicCustomerFollowup(row) {
  return {
    followup_id: cleanString(row.followup_id, 80),
    customer_id: cleanString(row.customer_id, 80),
    order_id: cleanString(row.order_id, 80),
    owner_agent_id: cleanString(row.owner_agent_id, 80),
    team_id: cleanString(row.team_id, 80),
    area_id: cleanString(row.area_id, 80),
    title: cleanString(row.title, 200),
    note: cleanString(row.note, 800),
    due_at: row.due_at || "",
    status: normalizeSalesStatus(row.status || "OPEN"),
    completed_at: row.completed_at || "",
    created_at: row.created_at || "",
    updated_at: row.updated_at || "",
    is_test: booleanValue(row.is_test),
    qa_batch: cleanString(row.qa_batch, 120)
  };
}

function findAreaById(areaId) {
  ensureOrganizationSheets();
  const id = cleanString(areaId, 80);
  if (!id) return null;
  return sheetToObjects(SHEET_NAMES.organizationAreas).find(function (area) {
    return cleanString(area.area_id, 80) === id;
  }) || null;
}

function findTeamById(teamId) {
  ensureOrganizationSheets();
  const id = cleanString(teamId, 80);
  if (!id) return null;
  return sheetToObjects(SHEET_NAMES.organizationTeams).find(function (team) {
    return cleanString(team.team_id, 80) === id;
  }) || null;
}

function activeAssignments(type) {
  ensureOrganizationSheets();
  const normalizedType = normalizeSalesStatus(type || "");
  return sheetToObjects(SHEET_NAMES.organizationAssignments).filter(function (assignment) {
    if (normalizeSalesStatus(assignment.status || "ACTIVE") !== "ACTIVE") return false;
    return !normalizedType || normalizeSalesStatus(assignment.assignment_type || "") === normalizedType;
  });
}

function agentTeamAssignment(agentId) {
  const id = validateAgentId(agentId);
  if (!id) return null;
  const rows = activeAssignments("AGENT_TEAM").filter(function (assignment) {
    return cleanString(assignment.subject_agent_id, 80) === id;
  });
  return rows[rows.length - 1] || null;
}

function managerAssignments(agentId, role) {
  const id = validateAgentId(agentId);
  if (!id) return [];
  const normalizedRole = normalizeOrgRole(role);
  return activeAssignments(normalizedRole === ORG_ROLE.AREA_MANAGER ? "AREA_MANAGER" : "TEAM_MANAGER")
    .filter(function (assignment) {
      return cleanString(assignment.subject_agent_id, 80) === id && normalizeOrgRole(assignment.role) === normalizedRole;
    });
}

function organizationRoleForAgent(agent) {
  return normalizeOrgRole(agent && agent.role);
}

function requireOrganizationActor(body, allowedRoles) {
  const admin = verifyAdminSession(body || {});
  if (admin.ok) {
    return { ok: true, actor_id: admin.actor_id, agent_id: admin.actor_id, role: ORG_ROLE.ADMIN, agent: admin.user, admin: true };
  }
  const session = verifyAgentSession(body || {});
  if (!session.ok) {
    return { ok: false, message: session.message, next_page: session.next_page };
  }
  const role = organizationRoleForAgent(session.agent);
  const allowed = (allowedRoles || [ORG_ROLE.ADMIN, ORG_ROLE.AREA_MANAGER, ORG_ROLE.TEAM_MANAGER, ORG_ROLE.AGENT]).map(normalizeOrgRole);
  if (allowed.indexOf(role) === -1) {
    return { ok: false, message: "Organization permission required", role: role };
  }
  return { ok: true, actor_id: session.agent_id, agent_id: session.agent_id, role: role, agent: session.agent, admin: false };
}

function requireOrganizationAdmin(body) {
  const admin = requireAdminActor(body || {});
  if (!admin.ok) return admin;
  return { ok: true, actor_id: admin.actor_id, agent_id: admin.actor_id, role: ORG_ROLE.ADMIN, agent: admin.user };
}

function scopedTeamIdsForActor(actor) {
  if (!actor || actor.role === ORG_ROLE.ADMIN) {
    return sheetToObjects(SHEET_NAMES.organizationTeams).map(function (team) { return cleanString(team.team_id, 80); });
  }
  if (actor.role === ORG_ROLE.TEAM_MANAGER) {
    return managerAssignments(actor.agent_id, ORG_ROLE.TEAM_MANAGER).map(function (item) {
      return cleanString(item.team_id, 80);
    }).filter(Boolean);
  }
  if (actor.role === ORG_ROLE.AREA_MANAGER) {
    const areaIds = managerAssignments(actor.agent_id, ORG_ROLE.AREA_MANAGER).map(function (item) {
      return cleanString(item.area_id, 80);
    });
    return sheetToObjects(SHEET_NAMES.organizationTeams).filter(function (team) {
      return areaIds.indexOf(cleanString(team.area_id, 80)) !== -1;
    }).map(function (team) {
      return cleanString(team.team_id, 80);
    });
  }
  const assignment = agentTeamAssignment(actor.agent_id);
  return assignment ? [cleanString(assignment.team_id, 80)] : [];
}

function scopedAreaIdsForActor(actor) {
  if (!actor || actor.role === ORG_ROLE.ADMIN) {
    return sheetToObjects(SHEET_NAMES.organizationAreas).map(function (area) { return cleanString(area.area_id, 80); });
  }
  if (actor.role === ORG_ROLE.AREA_MANAGER) {
    return managerAssignments(actor.agent_id, ORG_ROLE.AREA_MANAGER).map(function (item) {
      return cleanString(item.area_id, 80);
    }).filter(Boolean);
  }
  const teamIds = scopedTeamIdsForActor(actor);
  return sheetToObjects(SHEET_NAMES.organizationTeams).filter(function (team) {
    return teamIds.indexOf(cleanString(team.team_id, 80)) !== -1;
  }).map(function (team) {
    return cleanString(team.area_id, 80);
  }).filter(Boolean);
}

function agentIdsForTeamIds(teamIds) {
  const ids = teamIds || [];
  return activeAssignments("AGENT_TEAM").filter(function (assignment) {
    return ids.indexOf(cleanString(assignment.team_id, 80)) !== -1;
  }).map(function (assignment) {
    return cleanString(assignment.subject_agent_id, 80);
  });
}

function visibleAgentIdsForActor(actor) {
  if (actor.role === ORG_ROLE.ADMIN) {
    return sheetToObjects(SHEET_NAMES.agents).map(function (agent) { return cleanString(agent.agent_id, 80); });
  }
  if (actor.role === ORG_ROLE.AGENT) {
    return [actor.agent_id];
  }
  return agentIdsForTeamIds(scopedTeamIdsForActor(actor));
}

function snapshotForAgent(agentId) {
  const assignment = agentTeamAssignment(agentId);
  const team = assignment ? findTeamById(assignment.team_id) : null;
  const area = team ? findAreaById(team.area_id) : null;
  const teamManager = team && team.primary_team_manager_id
    ? cleanString(team.primary_team_manager_id, 80)
    : "";
  const areaManager = area
    ? (managerAssignmentsForArea(area.area_id)[0] || "")
    : "";
  return {
    sales_owner_agent_id: cleanString(agentId, 80),
    area_id: area ? cleanString(area.area_id, 80) : "",
    area_name: area ? cleanString(area.area_name, 180) : "",
    team_id: team ? cleanString(team.team_id, 80) : "",
    team_name: team ? cleanString(team.team_name, 180) : "",
    team_manager_id: teamManager,
    area_manager_id: areaManager,
    organization_snapshot_at: new Date()
  };
}

function managerAssignmentsForArea(areaId) {
  const id = cleanString(areaId, 80);
  return activeAssignments("AREA_MANAGER").filter(function (assignment) {
    return cleanString(assignment.area_id, 80) === id;
  }).map(function (assignment) {
    return cleanString(assignment.subject_agent_id, 80);
  });
}

function appendOrganizationSnapshot(entityType, entityId, agentId, source, seed) {
  const snap = snapshotForAgent(agentId);
  appendObject(SHEET_NAMES.organizationSnapshots, {
    snapshot_id: makeId("OSS"),
    entity_type: cleanString(entityType, 80),
    entity_id: cleanString(entityId, 120),
    sales_owner_agent_id: snap.sales_owner_agent_id,
    area_id: snap.area_id,
    area_name: snap.area_name,
    team_id: snap.team_id,
    team_name: snap.team_name,
    team_manager_id: snap.team_manager_id,
    area_manager_id: snap.area_manager_id,
    snapshot_at: snap.organization_snapshot_at,
    source: cleanString(source, 120),
    is_test: isQaRecord(seed || {}),
    qa_batch: qaBatchFor(seed || {})
  });
  return snap;
}

function listOrganizationAreas(body) {
  ensureSalesSheets();
  const actor = requireOrganizationActor(body, [ORG_ROLE.ADMIN, ORG_ROLE.AREA_MANAGER, ORG_ROLE.TEAM_MANAGER]);
  if (!actor.ok) return actor;
  const scoped = scopedAreaIdsForActor(actor);
  const rows = sheetToObjects(SHEET_NAMES.organizationAreas).filter(function (area) {
    return actor.role === ORG_ROLE.ADMIN || scoped.indexOf(cleanString(area.area_id, 80)) !== -1;
  }).map(publicOrganizationArea);
  return { ok: true, total: rows.length, areas: rows };
}

function saveOrganizationArea(body) {
  return withOrganizationLock(function () {
    ensureSalesSheets();
    const admin = requireOrganizationAdmin(body);
    if (!admin.ok) return admin;
    const areaId = cleanString(body && body.area_id, 80);
    const existing = areaId ? findAreaById(areaId) : null;
    const now = new Date();
    const data = {
      area_id: existing ? existing.area_id : makeId("AREA"),
      area_code: cleanString(body.area_code || body.areaCode || (existing && existing.area_code), 80),
      area_name: cleanString(body.area_name || body.areaName || (existing && existing.area_name), 180),
      description: cleanString(body.description || (existing && existing.description), 500),
      status: normalizeSalesStatus(body.status || (existing && existing.status) || "ACTIVE") === "INACTIVE" ? "INACTIVE" : "ACTIVE",
      created_at: existing ? existing.created_at : now,
      updated_at: now,
      created_by: existing ? existing.created_by : admin.actor_id,
      updated_by: admin.actor_id,
      is_test: booleanValue(body.is_test) || isQaRecord(body),
      qa_batch: cleanString(body.qa_batch, 120)
    };
    if (!data.area_name) return { ok: false, message: "Area name is required" };
    if (existing) updateRowFields(SHEET_NAMES.organizationAreas, existing._row, data); else appendObject(SHEET_NAMES.organizationAreas, data);
    writeOrganizationAudit("AREA", data.area_id, existing ? "AREA_UPDATED" : "AREA_CREATED", admin, existing || {}, data, "Area saved", data);
    return { ok: true, area: publicOrganizationArea(data) };
  });
}

function listOrganizationTeams(body) {
  ensureSalesSheets();
  const actor = requireOrganizationActor(body, [ORG_ROLE.ADMIN, ORG_ROLE.AREA_MANAGER, ORG_ROLE.TEAM_MANAGER]);
  if (!actor.ok) return actor;
  const teamIds = scopedTeamIdsForActor(actor);
  const areaId = cleanString(body && body.area_id, 80);
  const rows = sheetToObjects(SHEET_NAMES.organizationTeams).filter(function (team) {
    if (actor.role !== ORG_ROLE.ADMIN && teamIds.indexOf(cleanString(team.team_id, 80)) === -1) return false;
    if (areaId && cleanString(team.area_id, 80) !== areaId) return false;
    return true;
  }).map(publicOrganizationTeam);
  return { ok: true, total: rows.length, teams: rows };
}

function saveOrganizationTeam(body) {
  return withOrganizationLock(function () {
    ensureSalesSheets();
    const admin = requireOrganizationAdmin(body);
    if (!admin.ok) return admin;
    const teamId = cleanString(body && body.team_id, 80);
    const existing = teamId ? findTeamById(teamId) : null;
    const areaId = cleanString(body.area_id || (existing && existing.area_id), 80);
    if (areaId) {
      const area = findAreaById(areaId);
      if (!area || normalizeSalesStatus(area.status || "ACTIVE") !== "ACTIVE") {
        return { ok: false, message: "Active area is required" };
      }
    }
    const now = new Date();
    const data = {
      team_id: existing ? existing.team_id : makeId("TEAM"),
      team_code: cleanString(body.team_code || body.teamCode || (existing && existing.team_code), 80),
      team_name: cleanString(body.team_name || body.teamName || (existing && existing.team_name), 180),
      area_id: areaId,
      primary_team_manager_id: cleanString(body.primary_team_manager_id || body.manager_id || (existing && existing.primary_team_manager_id), 80),
      description: cleanString(body.description || (existing && existing.description), 500),
      status: normalizeSalesStatus(body.status || (existing && existing.status) || "ACTIVE") === "INACTIVE" ? "INACTIVE" : "ACTIVE",
      created_at: existing ? existing.created_at : now,
      updated_at: now,
      created_by: existing ? existing.created_by : admin.actor_id,
      updated_by: admin.actor_id,
      is_test: booleanValue(body.is_test) || isQaRecord(body),
      qa_batch: cleanString(body.qa_batch, 120)
    };
    if (!data.team_name) return { ok: false, message: "Team name is required" };
    if (existing) updateRowFields(SHEET_NAMES.organizationTeams, existing._row, data); else appendObject(SHEET_NAMES.organizationTeams, data);
    writeOrganizationAudit("TEAM", data.team_id, existing ? "TEAM_UPDATED" : "TEAM_CREATED", admin, existing || {}, data, "Team saved", data);
    return { ok: true, team: publicOrganizationTeam(data) };
  });
}

function closeActiveAssignments(type, subjectAgentId, admin, reason) {
  activeAssignments(type).forEach(function (assignment) {
    if (cleanString(assignment.subject_agent_id, 80) === cleanString(subjectAgentId, 80)) {
      updateRowFields(SHEET_NAMES.organizationAssignments, assignment._row, {
        status: "INACTIVE",
        effective_to: new Date(),
        updated_at: new Date(),
        updated_by: admin.actor_id,
        reason: cleanString(reason || assignment.reason, 500)
      });
    }
  });
}

function assignAgentToTeam(body) {
  return withOrganizationLock(function () {
    ensureSalesSheets();
    const admin = requireOrganizationAdmin(body);
    if (!admin.ok) return admin;
    const agentId = validateAgentId(body && body.agent_id);
    const teamId = cleanString(body && body.team_id, 80);
    if (!agentId || !teamId) return { ok: false, message: "agent_id and team_id are required" };
    const agent = findAgent(agentId);
    const team = findTeamById(teamId);
    if (!agent) return { ok: false, message: "Agent not found" };
    if (!team || normalizeSalesStatus(team.status || "ACTIVE") !== "ACTIVE") return { ok: false, message: "Active team is required" };
    const existing = agentTeamAssignment(agentId);
    if (existing && cleanString(existing.team_id, 80) === teamId) {
      return { ok: true, duplicate: true, assignment: publicOrganizationAssignment(existing) };
    }
    closeActiveAssignments("AGENT_TEAM", agentId, admin, body.reason || "Agent moved to a new team");
    const now = new Date();
    const row = {
      assignment_id: makeId("ASN"),
      assignment_type: "AGENT_TEAM",
      subject_agent_id: agentId,
      role: ORG_ROLE.AGENT,
      area_id: cleanString(team.area_id, 80),
      team_id: teamId,
      status: "ACTIVE",
      effective_from: now,
      effective_to: "",
      created_at: now,
      updated_at: now,
      created_by: admin.actor_id,
      updated_by: admin.actor_id,
      reason: cleanString(body.reason || "Admin assignment", 500),
      is_test: booleanValue(body.is_test) || isQaRecord(agent) || isQaRecord(body),
      qa_batch: cleanString(body.qa_batch, 120) || qaBatchFor(agent)
    };
    appendObject(SHEET_NAMES.organizationAssignments, row);
    writeOrganizationAudit("ASSIGNMENT", row.assignment_id, "AGENT_ASSIGNED_TO_TEAM", admin, existing || {}, row, "Agent assigned to team", row);
    return { ok: true, assignment: publicOrganizationAssignment(row), snapshot: snapshotForAgent(agentId) };
  });
}

function assignManagerRole(body) {
  return withOrganizationLock(function () {
    ensureSalesSheets();
    const admin = requireOrganizationAdmin(body);
    if (!admin.ok) return admin;
    const agentId = validateAgentId(body && body.agent_id);
    const newRole = normalizeOrgRole(body && body.role);
    if (!agentId || [ORG_ROLE.TEAM_MANAGER, ORG_ROLE.AREA_MANAGER, ORG_ROLE.AGENT].indexOf(newRole) === -1) {
      return { ok: false, message: "Valid agent_id and role are required" };
    }
    const agent = findAgent(agentId);
    if (!agent) return { ok: false, message: "Agent not found" };
    const areaId = cleanString(body && body.area_id, 80);
    const teamId = cleanString(body && body.team_id, 80);
    if (newRole === ORG_ROLE.TEAM_MANAGER && !teamId) return { ok: false, message: "team_id is required for Team Manager" };
    if (newRole === ORG_ROLE.AREA_MANAGER && !areaId) return { ok: false, message: "area_id is required for Area Manager" };
    if (teamId) {
      const team = findTeamById(teamId);
      if (!team || normalizeSalesStatus(team.status || "ACTIVE") !== "ACTIVE") return { ok: false, message: "Active team is required" };
    }
    if (areaId) {
      const area = findAreaById(areaId);
      if (!area || normalizeSalesStatus(area.status || "ACTIVE") !== "ACTIVE") return { ok: false, message: "Active area is required" };
    }
    const now = new Date();
    const previousRole = cleanString(agent.role || "Agent", 60);
    updateRowFields(SHEET_NAMES.agents, agent._row, { role: newRole });
    appendObject(SHEET_NAMES.organizationRoleHistory, {
      role_history_id: makeId("ORH"),
      agent_id: agentId,
      previous_role: previousRole,
      new_role: newRole,
      sales_enabled: true,
      effective_at: now,
      created_at: now,
      created_by: admin.actor_id,
      reason: cleanString(body.reason || "Role changed by Admin", 500),
      is_test: booleanValue(body.is_test) || isQaRecord(agent) || isQaRecord(body),
      qa_batch: cleanString(body.qa_batch, 120) || qaBatchFor(agent)
    });
    if (newRole === ORG_ROLE.TEAM_MANAGER) {
      const existing = managerAssignments(agentId, ORG_ROLE.TEAM_MANAGER).filter(function (item) {
        return cleanString(item.team_id, 80) === teamId;
      })[0];
      if (!existing) {
        appendObject(SHEET_NAMES.organizationAssignments, {
          assignment_id: makeId("ASN"),
          assignment_type: "TEAM_MANAGER",
          subject_agent_id: agentId,
          role: ORG_ROLE.TEAM_MANAGER,
          area_id: cleanString((findTeamById(teamId) || {}).area_id, 80),
          team_id: teamId,
          status: "ACTIVE",
          effective_from: now,
          effective_to: "",
          created_at: now,
          updated_at: now,
          created_by: admin.actor_id,
          updated_by: admin.actor_id,
          reason: cleanString(body.reason || "Team Manager assignment", 500),
          is_test: booleanValue(body.is_test) || isQaRecord(agent) || isQaRecord(body),
          qa_batch: cleanString(body.qa_batch, 120) || qaBatchFor(agent)
        });
      }
      const team = findTeamById(teamId);
      if (team && !cleanString(team.primary_team_manager_id, 80)) {
        updateRowFields(SHEET_NAMES.organizationTeams, team._row, { primary_team_manager_id: agentId, updated_at: now, updated_by: admin.actor_id });
      }
    }
    if (newRole === ORG_ROLE.AREA_MANAGER) {
      const existingArea = managerAssignments(agentId, ORG_ROLE.AREA_MANAGER).filter(function (item) {
        return cleanString(item.area_id, 80) === areaId;
      })[0];
      if (!existingArea) {
        appendObject(SHEET_NAMES.organizationAssignments, {
          assignment_id: makeId("ASN"),
          assignment_type: "AREA_MANAGER",
          subject_agent_id: agentId,
          role: ORG_ROLE.AREA_MANAGER,
          area_id: areaId,
          team_id: "",
          status: "ACTIVE",
          effective_from: now,
          effective_to: "",
          created_at: now,
          updated_at: now,
          created_by: admin.actor_id,
          updated_by: admin.actor_id,
          reason: cleanString(body.reason || "Area Manager assignment", 500),
          is_test: booleanValue(body.is_test) || isQaRecord(agent) || isQaRecord(body),
          qa_batch: cleanString(body.qa_batch, 120) || qaBatchFor(agent)
        });
      }
    }
    if (newRole === ORG_ROLE.AGENT) {
      closeActiveAssignments("TEAM_MANAGER", agentId, admin, body.reason || "Manager role removed");
      closeActiveAssignments("AREA_MANAGER", agentId, admin, body.reason || "Manager role removed");
    }
    writeOrganizationAudit("ROLE", agentId, "ROLE_CHANGED", admin, { role: previousRole }, { role: newRole, area_id: areaId, team_id: teamId }, "Role changed", agent);
    return { ok: true, agent_id: agentId, previous_role: previousRole, role: newRole };
  });
}

function listOrganizationAssignments(body) {
  ensureSalesSheets();
  const actor = requireOrganizationActor(body, [ORG_ROLE.ADMIN, ORG_ROLE.AREA_MANAGER, ORG_ROLE.TEAM_MANAGER]);
  if (!actor.ok) return actor;
  const teamIds = scopedTeamIdsForActor(actor);
  const areaIds = scopedAreaIdsForActor(actor);
  const type = normalizeSalesStatus(body && body.assignment_type);
  const rows = sheetToObjects(SHEET_NAMES.organizationAssignments).filter(function (row) {
    if (type && normalizeSalesStatus(row.assignment_type) !== type) return false;
    if (actor.role === ORG_ROLE.ADMIN) return true;
    const rowTeam = cleanString(row.team_id, 80);
    const rowArea = cleanString(row.area_id, 80);
    return (rowTeam && teamIds.indexOf(rowTeam) !== -1) || (rowArea && areaIds.indexOf(rowArea) !== -1);
  }).map(publicOrganizationAssignment);
  return { ok: true, total: rows.length, assignments: rows };
}

function enrichAgentOrganization(agent) {
  const assignment = agentTeamAssignment(agent.agent_id);
  const team = assignment ? findTeamById(assignment.team_id) : null;
  const area = team ? findAreaById(team.area_id) : null;
  const item = publicAgent(agent);
  item.organization_role = normalizeOrgRole(agent.role);
  item.team_id = team ? cleanString(team.team_id, 80) : "";
  item.team_name = team ? cleanString(team.team_name, 180) : "";
  item.area_id = area ? cleanString(area.area_id, 80) : "";
  item.area_name = area ? cleanString(area.area_name, 180) : "";
  return item;
}

function listScopedAgents(body) {
  ensureSalesSheets();
  const actor = requireOrganizationActor(body, [ORG_ROLE.ADMIN, ORG_ROLE.AREA_MANAGER, ORG_ROLE.TEAM_MANAGER, ORG_ROLE.AGENT]);
  if (!actor.ok) return actor;
  const visible = visibleAgentIdsForActor(actor);
  const q = cleanString(body && (body.q || body.search), 200).toLowerCase();
  const rows = sheetToObjects(SHEET_NAMES.agents).filter(function (agent) {
    if (visible.indexOf(cleanString(agent.agent_id, 80)) === -1) return false;
    if (!q) return true;
    return [agent.agent_id, agent.first_name, agent.last_name, agent.email, agent.phone, agent.role].join(" ").toLowerCase().indexOf(q) !== -1;
  }).map(enrichAgentOrganization);
  return { ok: true, total: rows.length, agents: rows };
}

function listScopedCustomers(body) {
  ensureSalesSheets();
  const actor = requireOrganizationActor(body, [ORG_ROLE.ADMIN, ORG_ROLE.AREA_MANAGER, ORG_ROLE.TEAM_MANAGER, ORG_ROLE.AGENT]);
  if (!actor.ok) return actor;
  const visible = visibleAgentIdsForActor(actor);
  const rows = sheetToObjects(SHEET_NAMES.customers).filter(function (customer) {
    return visible.indexOf(cleanString(customer.owner_agent_id, 80)) !== -1;
  }).map(publicCustomer);
  return { ok: true, total: rows.length, customers: rows };
}

function listScopedOrders(body) {
  ensureSalesSheets();
  const actor = requireOrganizationActor(body, [ORG_ROLE.ADMIN, ORG_ROLE.AREA_MANAGER, ORG_ROLE.TEAM_MANAGER, ORG_ROLE.AGENT]);
  if (!actor.ok) return actor;
  const visible = visibleAgentIdsForActor(actor);
  const rows = sheetToObjects(SHEET_NAMES.orders).filter(function (order) {
    return visible.indexOf(cleanString(order.owner_agent_id || order.agent_id, 80)) !== -1;
  }).map(publicOrder);
  return { ok: true, total: rows.length, orders: rows };
}

function calculateOrganizationPerformance(actor) {
  ensureSalesSheets();
  const visible = visibleAgentIdsForActor(actor);
  const orders = sheetToObjects(SHEET_NAMES.orders).filter(function (order) {
    return visible.indexOf(cleanString(order.owner_agent_id || order.agent_id, 80)) !== -1;
  });
  const activeOrders = orders.filter(function (order) { return !isQaRecord(order); });
  const paidStatuses = ["DEPOSIT_PAID", "PAID", "PAID_IN_FULL", "PREPARING", "READY_TO_INSTALL", "INSTALLING", "COMPLETED"];
  const paidOrders = activeOrders.filter(function (order) {
    return paidStatuses.indexOf(normalizeSalesStatus(order.status)) !== -1;
  });
  const completed = activeOrders.filter(function (order) {
    return normalizeSalesStatus(order.status) === "COMPLETED";
  });
  const revenue = paidOrders.reduce(function (total, order) {
    return total + Number(order.grand_total || order.total || 0);
  }, 0);
  const openFollowups = sheetToObjects(SHEET_NAMES.customerFollowups).filter(function (followup) {
    return visible.indexOf(cleanString(followup.owner_agent_id, 80)) !== -1 && normalizeSalesStatus(followup.status || "OPEN") === "OPEN" && !isQaRecord(followup);
  });
  return {
    agent_count: visible.length,
    order_count: activeOrders.length,
    paid_order_count: paidOrders.length,
    completed_order_count: completed.length,
    revenue: revenue,
    open_followups: openFollowups.length,
    qa_excluded: true
  };
}

function getOrganizationDashboard(body) {
  ensureSalesSheets();
  const admin = requireOrganizationAdmin(body);
  if (!admin.ok) return admin;
  const areas = sheetToObjects(SHEET_NAMES.organizationAreas).map(publicOrganizationArea);
  const teams = sheetToObjects(SHEET_NAMES.organizationTeams).map(publicOrganizationTeam);
  const assignments = activeAssignments("").map(publicOrganizationAssignment);
  const agents = sheetToObjects(SHEET_NAMES.agents);
  const unassignedAgents = agents.filter(function (agent) {
    return normalizeStatus(agent.status) === AGENT_STATUS.APPROVED && !isQaRecord(agent) && !agentTeamAssignment(agent.agent_id);
  }).map(publicAgent);
  const productionAreas = areas.filter(function (area) { return !area.is_test; });
  const productionTeams = teams.filter(function (team) { return !team.is_test; });
  const productionAssignments = assignments.filter(function (assignment) { return !assignment.is_test; });
  return {
    ok: true,
    summary: {
      areas: productionAreas.length,
      active_areas: productionAreas.filter(function (area) { return area.status === "ACTIVE"; }).length,
      teams: productionTeams.length,
      active_teams: productionTeams.filter(function (team) { return team.status === "ACTIVE"; }).length,
      assignments: productionAssignments.length,
      unassigned_agents: unassignedAgents.length,
      team_managers: productionAssignments.filter(function (item) { return item.assignment_type === "TEAM_MANAGER"; }).length,
      area_managers: productionAssignments.filter(function (item) { return item.assignment_type === "AREA_MANAGER"; }).length,
      qa_excluded: true
    },
    performance: calculateOrganizationPerformance({ role: ORG_ROLE.ADMIN }),
    areas: areas,
    teams: teams,
    assignments: assignments,
    unassigned_agents: unassignedAgents
  };
}

function getTeamManagerDashboard(body) {
  ensureSalesSheets();
  const actor = requireOrganizationActor(body, [ORG_ROLE.TEAM_MANAGER, ORG_ROLE.ADMIN]);
  if (!actor.ok) return actor;
  return {
    ok: true,
    role: actor.role,
    teams: listOrganizationTeams(body).teams || [],
    agents: listScopedAgents(body).agents || [],
    customers: listScopedCustomers(body).customers || [],
    orders: listScopedOrders(body).orders || [],
    followups: listCustomerFollowups(body).followups || [],
    performance: calculateOrganizationPerformance(actor)
  };
}

function getAreaManagerDashboard(body) {
  ensureSalesSheets();
  const actor = requireOrganizationActor(body, [ORG_ROLE.AREA_MANAGER, ORG_ROLE.ADMIN]);
  if (!actor.ok) return actor;
  return {
    ok: true,
    role: actor.role,
    areas: listOrganizationAreas(body).areas || [],
    teams: listOrganizationTeams(body).teams || [],
    agents: listScopedAgents(body).agents || [],
    orders: listScopedOrders(body).orders || [],
    followups: listCustomerFollowups(body).followups || [],
    performance: calculateOrganizationPerformance(actor)
  };
}

function saveSalesTarget(body) {
  return withOrganizationLock(function () {
    ensureSalesSheets();
    const admin = requireOrganizationAdmin(body);
    if (!admin.ok) return admin;
    const targetId = cleanString(body && body.target_id, 80);
    const existing = targetId ? sheetToObjects(SHEET_NAMES.salesTargets).find(function (target) { return cleanString(target.target_id, 80) === targetId; }) : null;
    const targetType = normalizeSalesStatus(body.target_type || "AGENT");
    const now = new Date();
    const data = {
      target_id: existing ? existing.target_id : makeId("TGT"),
      target_type: ["AGENT", "TEAM", "AREA"].indexOf(targetType) !== -1 ? targetType : "AGENT",
      agent_id: validateAgentId(body.agent_id) || "",
      team_id: cleanString(body.team_id, 80),
      area_id: cleanString(body.area_id, 80),
      period: cleanString(body.period || Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM"), 40),
      target_orders: Math.max(0, Number(body.target_orders || body.targetOrders || 0)),
      target_revenue: Math.max(0, Number(body.target_revenue || body.targetRevenue || 0)),
      status: normalizeSalesStatus(body.status || (existing && existing.status) || "ACTIVE") === "INACTIVE" ? "INACTIVE" : "ACTIVE",
      created_at: existing ? existing.created_at : now,
      updated_at: now,
      created_by: existing ? existing.created_by : admin.actor_id,
      updated_by: admin.actor_id,
      is_test: booleanValue(body.is_test) || isQaRecord(body),
      qa_batch: cleanString(body.qa_batch, 120)
    };
    if (existing) updateRowFields(SHEET_NAMES.salesTargets, existing._row, data); else appendObject(SHEET_NAMES.salesTargets, data);
    writeOrganizationAudit("TARGET", data.target_id, existing ? "TARGET_UPDATED" : "TARGET_CREATED", admin, existing || {}, data, "Sales target saved", data);
    return { ok: true, target: publicSalesTarget(data) };
  });
}

function listSalesTargets(body) {
  ensureSalesSheets();
  const actor = requireOrganizationActor(body, [ORG_ROLE.ADMIN, ORG_ROLE.AREA_MANAGER, ORG_ROLE.TEAM_MANAGER, ORG_ROLE.AGENT]);
  if (!actor.ok) return actor;
  const teamIds = scopedTeamIdsForActor(actor);
  const areaIds = scopedAreaIdsForActor(actor);
  const rows = sheetToObjects(SHEET_NAMES.salesTargets).filter(function (target) {
    if (actor.role === ORG_ROLE.ADMIN) return true;
    if (cleanString(target.agent_id, 80) === actor.agent_id) return true;
    if (teamIds.indexOf(cleanString(target.team_id, 80)) !== -1) return true;
    if (areaIds.indexOf(cleanString(target.area_id, 80)) !== -1) return true;
    return false;
  }).map(publicSalesTarget);
  return { ok: true, total: rows.length, targets: rows };
}

function saveCustomerFollowup(body) {
  return withOrganizationLock(function () {
    ensureSalesSheets();
    const actor = requireOrganizationActor(body, [ORG_ROLE.ADMIN, ORG_ROLE.AREA_MANAGER, ORG_ROLE.TEAM_MANAGER, ORG_ROLE.AGENT]);
    if (!actor.ok) return actor;
    const customerId = cleanString(body && body.customer_id, 80);
    const orderId = cleanString(body && body.order_id, 80);
    let ownerAgentId = validateAgentId(body && body.owner_agent_id) || "";
    if (customerId) {
      const customer = findCustomerById(customerId);
      if (!customer) return { ok: false, message: "Customer not found" };
      ownerAgentId = cleanString(customer.owner_agent_id, 80);
    }
    if (orderId) {
      const order = findOrderById(orderId);
      if (!order) return { ok: false, message: "Order not found" };
      ownerAgentId = cleanString(order.owner_agent_id || order.agent_id, 80);
    }
    if (!ownerAgentId) ownerAgentId = actor.agent_id;
    if (visibleAgentIdsForActor(actor).indexOf(ownerAgentId) === -1) {
      return { ok: false, message: "Follow-up scope denied" };
    }
    const snapshot = snapshotForAgent(ownerAgentId);
    const followupId = cleanString(body && body.followup_id, 80);
    const existing = followupId ? sheetToObjects(SHEET_NAMES.customerFollowups).find(function (item) { return cleanString(item.followup_id, 80) === followupId; }) : null;
    const now = new Date();
    const data = {
      followup_id: existing ? existing.followup_id : makeId("FUP"),
      customer_id: customerId,
      order_id: orderId,
      owner_agent_id: ownerAgentId,
      team_id: snapshot.team_id,
      area_id: snapshot.area_id,
      title: cleanString(body.title || (existing && existing.title), 200),
      note: cleanString(body.note || (existing && existing.note), 800),
      due_at: body.due_at || body.dueAt || (existing && existing.due_at) || "",
      status: normalizeSalesStatus(body.status || (existing && existing.status) || "OPEN"),
      completed_at: existing ? existing.completed_at : "",
      created_at: existing ? existing.created_at : now,
      updated_at: now,
      created_by: existing ? existing.created_by : actor.actor_id,
      updated_by: actor.actor_id,
      is_test: booleanValue(body.is_test) || isQaRecord(body),
      qa_batch: cleanString(body.qa_batch, 120)
    };
    if (!data.title) return { ok: false, message: "Follow-up title is required" };
    if (existing) updateRowFields(SHEET_NAMES.customerFollowups, existing._row, data); else appendObject(SHEET_NAMES.customerFollowups, data);
    writeOrganizationAudit("FOLLOWUP", data.followup_id, existing ? "FOLLOWUP_UPDATED" : "FOLLOWUP_CREATED", actor, existing || {}, data, "Follow-up saved", data);
    return { ok: true, followup: publicCustomerFollowup(data) };
  });
}

function completeCustomerFollowup(body) {
  return withOrganizationLock(function () {
    ensureSalesSheets();
    const actor = requireOrganizationActor(body, [ORG_ROLE.ADMIN, ORG_ROLE.AREA_MANAGER, ORG_ROLE.TEAM_MANAGER, ORG_ROLE.AGENT]);
    if (!actor.ok) return actor;
    const id = cleanString(body && body.followup_id, 80);
    const row = sheetToObjects(SHEET_NAMES.customerFollowups).find(function (item) {
      return cleanString(item.followup_id, 80) === id;
    });
    if (!row) return { ok: false, message: "Follow-up not found" };
    if (visibleAgentIdsForActor(actor).indexOf(cleanString(row.owner_agent_id, 80)) === -1) {
      return { ok: false, message: "Follow-up scope denied" };
    }
    const updates = {
      status: "COMPLETED",
      completed_at: new Date(),
      updated_at: new Date(),
      updated_by: actor.actor_id
    };
    updateRowFields(SHEET_NAMES.customerFollowups, row._row, updates);
    writeOrganizationAudit("FOLLOWUP", id, "FOLLOWUP_COMPLETED", actor, row, Object.assign({}, row, updates), "Follow-up completed", row);
    return { ok: true, followup: publicCustomerFollowup(Object.assign({}, row, updates)) };
  });
}

function listCustomerFollowups(body) {
  ensureSalesSheets();
  const actor = requireOrganizationActor(body, [ORG_ROLE.ADMIN, ORG_ROLE.AREA_MANAGER, ORG_ROLE.TEAM_MANAGER, ORG_ROLE.AGENT]);
  if (!actor.ok) return actor;
  const visible = visibleAgentIdsForActor(actor);
  const status = normalizeSalesStatus(body && body.status);
  const rows = sheetToObjects(SHEET_NAMES.customerFollowups).filter(function (item) {
    if (visible.indexOf(cleanString(item.owner_agent_id, 80)) === -1) return false;
    if (status && normalizeSalesStatus(item.status || "OPEN") !== status) return false;
    return true;
  }).map(publicCustomerFollowup);
  return { ok: true, total: rows.length, followups: rows };
}

function getOrganizationPerformance(body) {
  ensureSalesSheets();
  const actor = requireOrganizationActor(body, [ORG_ROLE.ADMIN, ORG_ROLE.AREA_MANAGER, ORG_ROLE.TEAM_MANAGER, ORG_ROLE.AGENT]);
  if (!actor.ok) return actor;
  return { ok: true, performance: calculateOrganizationPerformance(actor) };
}

function runOrganizationIntegrityCheck(body) {
  ensureSalesSheets();
  const admin = requireOrganizationAdmin(body);
  if (!admin.ok) return admin;
  const anomalies = [];
  const activeAgentAssignments = {};
  activeAssignments("AGENT_TEAM").forEach(function (assignment) {
    const agentId = cleanString(assignment.subject_agent_id, 80);
    activeAgentAssignments[agentId] = (activeAgentAssignments[agentId] || 0) + 1;
  });
  Object.keys(activeAgentAssignments).forEach(function (agentId) {
    if (activeAgentAssignments[agentId] > 1) anomalies.push({ type: "DUPLICATE_ACTIVE_AGENT_ASSIGNMENT", agent_id: agentId, count: activeAgentAssignments[agentId] });
  });
  sheetToObjects(SHEET_NAMES.organizationTeams).forEach(function (team) {
    const areaId = cleanString(team.area_id, 80);
    if (areaId && !findAreaById(areaId)) anomalies.push({ type: "TEAM_AREA_NOT_FOUND", team_id: team.team_id, area_id: areaId });
  });
  sheetToObjects(SHEET_NAMES.commissions).forEach(function (commission) {
    const order = findOrderById(commission.order_id);
    const commissionType = normalizeSalesStatus(commission.commission_type || "");
    const allowedManagerCommission = commissionType === "TEAM_MANAGER_RETAINED_COMMISSION";
    if (order && !allowedManagerCommission && cleanString(commission.agent_id, 80) !== cleanString(order.owner_agent_id || order.agent_id, 80)) {
      anomalies.push({ type: "COMMISSION_OWNER_MISMATCH", commission_id: commission.commission_id, order_id: order.order_id });
    }
  });
  return { ok: true, anomalies: anomalies, no_manager_commission: false, single_sales_only: true };
}

/* =========================================================
   SBOS V3-5 LIGHTWEIGHT BUSINESS CMS
========================================================= */

const CMS_STATUS = {
  DRAFT: "DRAFT",
  REVIEW: "REVIEW",
  SCHEDULED: "SCHEDULED",
  PUBLISHED: "PUBLISHED",
  UNPUBLISHED: "UNPUBLISHED",
  ARCHIVED: "ARCHIVED"
};

const CMS_CONTENT_TYPES = [
  "SITE_SETTINGS",
  "PAGE",
  "PAGE_SECTION",
  "BANNER",
  "PROMOTION",
  "COLLECTION_CONTENT",
  "PRODUCT_CONTENT",
  "FAQ",
  "ARTICLE",
  "ANNOUNCEMENT",
  "CONTACT_INFORMATION",
  "LEGAL_CONTENT",
  "NAVIGATION_ITEM",
  "FOOTER_CONTENT",
  "MEDIA_ASSET"
];

const CMS_PRICE_POLICIES = [
  "SHOW_PRICE",
  "HIDE_PRICE",
  "CONTACT_FOR_PRICE",
  "STARTING_FROM",
  "CHECK_CURRENT_PRICE",
  "TEMPORARILY_UNAVAILABLE"
];

function cmsNormalizeType(type) {
  const value = normalizeSalesStatus(type || "PAGE_SECTION");
  return CMS_CONTENT_TYPES.indexOf(value) !== -1 ? value : "PAGE_SECTION";
}

function cmsNormalizeStatus(status) {
  const value = normalizeSalesStatus(status || CMS_STATUS.DRAFT);
  return Object.keys(CMS_STATUS).map(function (key) { return CMS_STATUS[key]; }).indexOf(value) !== -1 ? value : CMS_STATUS.DRAFT;
}

function cmsNormalizeLocale(locale) {
  const value = cleanString(locale || "th", 10).toLowerCase();
  return value === "en" ? "en" : "th";
}

function cmsIsPublished(row, now) {
  const status = cmsNormalizeStatus(row.status);
  if (status !== CMS_STATUS.PUBLISHED) return false;
  if (isQaRecord(row)) return false;
  const at = now || new Date();
  const publishAt = row.publish_at ? new Date(row.publish_at) : null;
  const unpublishAt = row.unpublish_at ? new Date(row.unpublish_at) : null;
  return (!publishAt || publishAt <= at) && (!unpublishAt || unpublishAt > at);
}

function cmsWithLock(fn) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(15000)) {
    return { ok: false, error: "CMS_LOCK_TIMEOUT", message: "CMS is busy. Please try again." };
  }
  try {
    return fn();
  } finally {
    lock.releaseLock();
  }
}

function cmsSanitizeText(value, maxLength) {
  return cleanString(value, maxLength || 2000)
    .replace(/<\s*script/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/data:/gi, "");
}

function cmsSafeSpreadsheetText(value, maxLength) {
  const text = cmsSanitizeText(value, maxLength);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function cmsSafeUrl(value) {
  const url = cleanString(value, 1000);
  if (!url) return "";
  if (/^(https?:\/\/|\/|\.\/|images\/|css\/|js\/|agent-|admin-|what-|ssb-|contact\.html|index\.html|products\.html|collections\.html|promotions\.html|faq\.html|articles\.html)/i.test(url) && !/javascript:|data:|<|>|onerror=/i.test(url)) {
    return url;
  }
  throw new Error("Unsafe URL");
}

function cmsValidateMetadata(raw) {
  if (!raw) return "{}";
  const value = typeof raw === "string" ? raw : JSON.stringify(raw);
  const parsed = parseJsonValue(value, null);
  if (parsed === null || Array.isArray(parsed)) throw new Error("Invalid metadata");
  const text = JSON.stringify(parsed);
  if (/<\s*script|javascript:|on\w+\s*=|<iframe/i.test(text)) throw new Error("Unsafe metadata");
  return text;
}

function cmsWriteAudit(entityType, entityId, action, admin, previousValue, newValue, message, seed) {
  ensureCmsSheets();
  appendObject(SHEET_NAMES.cmsAuditLogs, {
    log_id: makeId("CAL"),
    entity_type: cleanString(entityType, 80),
    entity_id: cleanString(entityId, 120),
    action: cleanString(action, 120),
    actor_id: cleanString(admin && admin.actor_id, 80),
    previous_value_json: JSON.stringify(previousValue || {}),
    new_value_json: JSON.stringify(newValue || {}),
    message: cleanString(message, 500),
    created_at: new Date(),
    is_test: isQaRecord(seed || {}),
    qa_batch: qaBatchFor(seed || {})
  });
}

function cmsPublicLocalization(contentId, locale) {
  const requested = cmsNormalizeLocale(locale);
  const rows = sheetToObjects(SHEET_NAMES.cmsLocalizations).filter(function (item) {
    return cleanString(item.content_id, 80) === cleanString(contentId, 80);
  });
  const local = rows.find(function (item) { return cmsNormalizeLocale(item.locale) === requested; }) ||
    rows.find(function (item) { return cmsNormalizeLocale(item.locale) === "th"; }) ||
    {};
  return {
    locale: cmsNormalizeLocale(local.locale || "th"),
    title: cleanString(local.title, 300),
    subtitle: cleanString(local.subtitle, 500),
    summary: cleanString(local.summary, 1000),
    body: cleanString(local.body, 8000),
    cta_label: cleanString(local.cta_label, 120),
    cta_url: cleanString(local.cta_url, 1000),
    seo_title: cleanString(local.seo_title, 300),
    seo_description: cleanString(local.seo_description, 500),
    seo_keywords: cleanString(local.seo_keywords, 500),
    image_alt: cleanString(local.image_alt, 300),
    metadata: parseJsonValue(local.metadata_json, {})
  };
}

function cmsPublicContentRow(row, locale) {
  const local = cmsPublicLocalization(row.content_id, locale);
  return {
    content_id: cleanString(row.content_id, 80),
    content_type: cmsNormalizeType(row.content_type),
    content_key: cleanString(row.content_key, 180),
    slug: cleanString(row.slug, 180),
    parent_id: cleanString(row.parent_id, 80),
    related_entity_type: cleanString(row.related_entity_type, 80),
    related_entity_id: cleanString(row.related_entity_id, 80),
    status: cmsNormalizeStatus(row.status),
    visibility: normalizeSalesStatus(row.visibility || "PUBLIC"),
    display_order: Number(row.display_order || 0),
    featured: booleanValue(row.featured),
    price_display_policy: normalizeSalesStatus(row.price_display_policy || "CHECK_CURRENT_PRICE"),
    availability_message: cleanString(row.availability_message, 500),
    audience: normalizeSalesStatus(row.audience || "PUBLIC"),
    placement: normalizeSalesStatus(row.placement || ""),
    metadata: parseJsonValue(row.metadata_json, {}),
    localization: local,
    updated_at: row.updated_at || ""
  };
}

function cmsCreateRevision(contentId, admin, summary) {
  const content = findCmsContent(contentId);
  if (!content) return null;
  const localizations = sheetToObjects(SHEET_NAMES.cmsLocalizations).filter(function (item) {
    return cleanString(item.content_id, 80) === cleanString(contentId, 80);
  });
  const revisions = sheetToObjects(SHEET_NAMES.cmsRevisions).filter(function (item) {
    return cleanString(item.content_id, 80) === cleanString(contentId, 80);
  });
  const nextNumber = revisions.reduce(function (max, item) {
    return Math.max(max, Number(item.revision_number || 0));
  }, 0) + 1;
  const revision = {
    revision_id: makeId("REV"),
    content_id: contentId,
    revision_number: nextNumber,
    snapshot_json: JSON.stringify({ content: content, localizations: localizations }),
    change_summary: cleanString(summary || "Content updated", 500),
    created_by: admin.actor_id,
    created_at: new Date(),
    status: cmsNormalizeStatus(content.status),
    is_test: isQaRecord(content),
    qa_batch: qaBatchFor(content)
  };
  appendObject(SHEET_NAMES.cmsRevisions, revision);
  updateRowFields(SHEET_NAMES.cmsContent, content._row, { current_revision: nextNumber });
  return revision;
}

function seedCmsDefaults() {
  const settings = sheetToObjects(SHEET_NAMES.cmsSiteSettings);
  if (!settings.some(function (item) { return cleanString(item.setting_key, 120) === "company_name_th"; })) {
    [
      ["company_name_th", "บริษัท สยามทำ จำกัด", "th"],
      ["company_name_en", "Siamtham Co., Ltd.", "en"],
      ["short_company_name", "SBOS", "th"],
      ["phone", "", "th"],
      ["email", "", "th"],
      ["announcement_bar", "SBOS V3-5 Lightweight Business CMS active", "th"],
      ["default_seo_title", "SBOS", "th"],
      ["default_seo_description", "Siamtham Business Operating System", "th"]
    ].forEach(function (row) {
      appendObject(SHEET_NAMES.cmsSiteSettings, {
        setting_id: makeId("SET"),
        setting_key: row[0],
        setting_value: row[1],
        locale: row[2],
        status: "ACTIVE",
        updated_at: new Date(),
        updated_by: "SYSTEM",
        is_test: false,
        qa_batch: ""
      });
    });
  }
  if (sheetToObjects(SHEET_NAMES.cmsNavigation).length === 0) {
    [
      ["Home", "หน้าหลัก", "index.html", "PUBLIC_MAIN", 1],
      ["Products", "สินค้า", "products.html", "PUBLIC_MAIN", 2],
      ["Promotions", "โปรโมชัน", "promotions.html", "PUBLIC_MAIN", 3],
      ["FAQ", "คำถามที่พบบ่อย", "faq.html", "PUBLIC_MAIN", 4],
      ["Articles", "บทความ", "articles.html", "PUBLIC_MAIN", 5],
      ["Contact", "ติดต่อเรา", "contact.html", "PUBLIC_MAIN", 6]
    ].forEach(function (item) {
      appendObject(SHEET_NAMES.cmsNavigation, {
        nav_id: makeId("NAV"),
        label_th: item[1],
        label_en: item[0],
        href: item[2],
        placement: item[3],
        display_order: item[4],
        status: "ACTIVE",
        audience: "PUBLIC",
        created_at: new Date(),
        updated_at: new Date(),
        created_by: "SYSTEM",
        updated_by: "SYSTEM",
        is_test: false,
        qa_batch: ""
      });
    });
  }
}

function findCmsContent(contentId) {
  ensureCmsSheets();
  const id = cleanString(contentId, 80);
  return sheetToObjects(SHEET_NAMES.cmsContent).find(function (item) {
    return cleanString(item.content_id, 80) === id;
  }) || null;
}

function cmsValidateRelated(type, relatedType, relatedId) {
  const normalizedType = cmsNormalizeType(type);
  const relType = normalizeSalesStatus(relatedType || "");
  const relId = cleanString(relatedId, 80);
  if (normalizedType === "PRODUCT_CONTENT") {
    if (relType !== "PRODUCT" || !relId || !findProductById(relId)) throw new Error("Valid product reference is required");
  }
  if (normalizedType === "COLLECTION_CONTENT") {
    const allowed = ["SILVER", "GOLD", "PLATINUM"];
    if (relType !== "COLLECTION" || allowed.indexOf(relId.toUpperCase()) === -1) throw new Error("Valid collection reference is required");
  }
}

function cmsSaveContent(body) {
  return cmsWithLock(function () {
    ensureCmsSheets();
    ensureSalesSheets();
    const admin = requireAdminActor(body);
    if (!admin.ok) return admin;
    const existingId = cleanString(body.content_id, 80);
    const existing = existingId ? findCmsContent(existingId) : null;
    const type = cmsNormalizeType(body.content_type || (existing && existing.content_type));
    const relatedType = normalizeSalesStatus(body.related_entity_type || (existing && existing.related_entity_type));
    const relatedId = cleanString(body.related_entity_id || (existing && existing.related_entity_id), 80);
    try {
      cmsValidateRelated(type, relatedType, relatedId);
    } catch (error) {
      return { ok: false, message: error.message };
    }
    const now = new Date();
    const status = cmsNormalizeStatus(body.status || (existing && existing.status) || CMS_STATUS.DRAFT);
    const slug = cleanString(body.slug || (existing && existing.slug) || body.content_key, 180).toLowerCase();
    if (slug) {
      const duplicateSlug = sheetToObjects(SHEET_NAMES.cmsContent).find(function (item) {
        return cleanString(item.slug, 180).toLowerCase() === slug && cleanString(item.content_id, 80) !== existingId && !isQaRecord(item);
      });
      if (duplicateSlug) return { ok: false, message: "Duplicate slug" };
    }
    let metadataJson;
    try {
      metadataJson = cmsValidateMetadata(body.metadata_json || body.metadata || (existing && existing.metadata_json) || "{}");
    } catch (error) {
      return { ok: false, message: error.message };
    }
    let ctaUrl;
    try {
      ctaUrl = cmsSafeUrl(body.cta_url || "");
    } catch (error) {
      return { ok: false, message: "Unsafe CTA URL" };
    }
    const pricePolicy = normalizeSalesStatus(body.price_display_policy || (existing && existing.price_display_policy) || "CHECK_CURRENT_PRICE");
    const content = {
      content_id: existing ? existing.content_id : makeId("CMS"),
      content_type: type,
      content_key: cmsSafeSpreadsheetText(body.content_key || (existing && existing.content_key) || slug || makeId("KEY"), 180),
      slug: slug,
      parent_id: cleanString(body.parent_id || (existing && existing.parent_id), 80),
      related_entity_type: relatedType,
      related_entity_id: relatedId,
      status: status,
      visibility: normalizeSalesStatus(body.visibility || (existing && existing.visibility) || "PUBLIC"),
      display_order: Number(body.display_order || (existing && existing.display_order) || 0),
      featured: booleanValue(body.featured || (existing && existing.featured)),
      publish_at: body.publish_at || (existing && existing.publish_at) || "",
      unpublish_at: body.unpublish_at || (existing && existing.unpublish_at) || "",
      current_revision: existing ? existing.current_revision : 0,
      price_display_policy: CMS_PRICE_POLICIES.indexOf(pricePolicy) !== -1 ? pricePolicy : "CHECK_CURRENT_PRICE",
      availability_message: cmsSafeSpreadsheetText(body.availability_message || (existing && existing.availability_message), 500),
      audience: normalizeSalesStatus(body.audience || (existing && existing.audience) || "PUBLIC"),
      placement: normalizeSalesStatus(body.placement || (existing && existing.placement) || ""),
      metadata_json: metadataJson,
      created_at: existing ? existing.created_at : now,
      updated_at: now,
      created_by: existing ? existing.created_by : admin.actor_id,
      updated_by: admin.actor_id,
      is_test: booleanValue(body.is_test) || isQaRecord(body),
      qa_batch: cleanString(body.qa_batch, 120)
    };
    const localization = {
      locale: cmsNormalizeLocale(body.locale || "th"),
      title: cmsSafeSpreadsheetText(body.title, 300),
      subtitle: cmsSafeSpreadsheetText(body.subtitle, 500),
      summary: cmsSafeSpreadsheetText(body.summary, 1000),
      body: cmsSafeSpreadsheetText(body.body, 8000),
      cta_label: cmsSafeSpreadsheetText(body.cta_label, 120),
      cta_url: ctaUrl,
      seo_title: cmsSafeSpreadsheetText(body.seo_title, 300),
      seo_description: cmsSafeSpreadsheetText(body.seo_description, 500),
      seo_keywords: cmsSafeSpreadsheetText(body.seo_keywords, 500),
      image_alt: cmsSafeSpreadsheetText(body.image_alt, 300),
      metadata_json: cmsValidateMetadata(body.localization_metadata_json || "{}")
    };
    if (existing) {
      cmsCreateRevision(existing.content_id, admin, body.change_summary || "Before content update");
      updateRowFields(SHEET_NAMES.cmsContent, existing._row, content);
    } else {
      appendObject(SHEET_NAMES.cmsContent, content);
    }
    const localRows = sheetToObjects(SHEET_NAMES.cmsLocalizations);
    const existingLocal = localRows.find(function (item) {
      return cleanString(item.content_id, 80) === content.content_id && cmsNormalizeLocale(item.locale) === localization.locale;
    });
    const localData = Object.assign({
      localization_id: existingLocal ? existingLocal.localization_id : makeId("LOC"),
      content_id: content.content_id,
      created_at: existingLocal ? existingLocal.created_at : now,
      updated_at: now
    }, localization);
    if (existingLocal) updateRowFields(SHEET_NAMES.cmsLocalizations, existingLocal._row, localData); else appendObject(SHEET_NAMES.cmsLocalizations, localData);
    const revision = cmsCreateRevision(content.content_id, admin, body.change_summary || "Content saved");
    cmsWriteAudit("CONTENT", content.content_id, existing ? "CMS_CONTENT_UPDATED" : "CMS_CONTENT_CREATED", admin, existing || {}, content, "Content saved", content);
    return { ok: true, content: cmsPublicContentRow(content, localization.locale), revision: revision };
  });
}

function cmsChangeContentStatus(body, status, action) {
  return cmsWithLock(function () {
    ensureCmsSheets();
    const admin = requireAdminActor(body);
    if (!admin.ok) return admin;
    const content = findCmsContent(body.content_id);
    if (!content) return { ok: false, message: "Content not found" };
    const next = cmsNormalizeStatus(status);
    const now = new Date();
    const updates = {
      status: next,
      publish_at: next === CMS_STATUS.PUBLISHED ? (content.publish_at || now) : (body.publish_at || content.publish_at || ""),
      unpublish_at: body.unpublish_at || content.unpublish_at || "",
      updated_at: now,
      updated_by: admin.actor_id
    };
    updateRowFields(SHEET_NAMES.cmsContent, content._row, updates);
    const updated = Object.assign({}, content, updates);
    cmsCreateRevision(content.content_id, admin, action);
    cmsWriteAudit("CONTENT", content.content_id, action, admin, { status: content.status }, updates, "Content status changed", updated);
    return { ok: true, content: cmsPublicContentRow(updated, body.locale || "th") };
  });
}

function cmsPublishContent(body) {
  return cmsChangeContentStatus(body, CMS_STATUS.PUBLISHED, "CMS_CONTENT_PUBLISHED");
}

function cmsUnpublishContent(body) {
  return cmsChangeContentStatus(body, CMS_STATUS.UNPUBLISHED, "CMS_CONTENT_UNPUBLISHED");
}

function cmsScheduleContent(body) {
  return cmsWithLock(function () {
    ensureCmsSheets();
    const admin = requireAdminActor(body);
    if (!admin.ok) return admin;
    const content = findCmsContent(body.content_id);
    if (!content) return { ok: false, message: "Content not found" };
    const scheduledAt = body.scheduled_at || body.publish_at;
    if (!scheduledAt || isNaN(new Date(scheduledAt).getTime())) return { ok: false, message: "Valid schedule date required" };
    updateRowFields(SHEET_NAMES.cmsContent, content._row, { status: CMS_STATUS.SCHEDULED, publish_at: scheduledAt, updated_at: new Date(), updated_by: admin.actor_id });
    appendObject(SHEET_NAMES.cmsPublicationJobs, {
      job_id: makeId("JOB"),
      content_id: content.content_id,
      action: "PUBLISH",
      scheduled_at: scheduledAt,
      executed_at: "",
      status: "SCHEDULED",
      attempt_count: 0,
      last_error: "",
      created_by: admin.actor_id,
      created_at: new Date(),
      is_test: isQaRecord(content),
      qa_batch: qaBatchFor(content)
    });
    cmsWriteAudit("CONTENT", content.content_id, "CMS_CONTENT_SCHEDULED", admin, { status: content.status }, { status: CMS_STATUS.SCHEDULED, publish_at: scheduledAt }, "Content scheduled", content);
    return { ok: true, content_id: content.content_id, status: CMS_STATUS.SCHEDULED, publish_at: scheduledAt };
  });
}

function cmsRollbackRevision(body) {
  return cmsWithLock(function () {
    ensureCmsSheets();
    const admin = requireAdminActor(body);
    if (!admin.ok) return admin;
    const revisionId = cleanString(body.revision_id, 80);
    const revision = sheetToObjects(SHEET_NAMES.cmsRevisions).find(function (item) {
      return cleanString(item.revision_id, 80) === revisionId;
    });
    if (!revision) return { ok: false, message: "Revision not found" };
    const snapshot = parseJsonValue(revision.snapshot_json, {});
    const content = snapshot.content;
    if (!content || !content.content_id) return { ok: false, message: "Invalid revision snapshot" };
    const current = findCmsContent(content.content_id);
    if (!current) return { ok: false, message: "Content not found" };
    content.updated_at = new Date();
    content.updated_by = admin.actor_id;
    updateRowFields(SHEET_NAMES.cmsContent, current._row, content);
    cmsWriteAudit("CONTENT", content.content_id, "CMS_REVISION_ROLLBACK", admin, current, content, "Revision rollback", content);
    return { ok: true, content: cmsPublicContentRow(content, body.locale || "th") };
  });
}

function cmsRegisterMedia(body) {
  return cmsWithLock(function () {
    ensureCmsSheets();
    const admin = requireAdminActor(body);
    if (!admin.ok) return admin;
    let url;
    try {
      url = cmsSafeUrl(body.public_url || body.url);
    } catch (error) {
      return { ok: false, message: "Unsafe media URL" };
    }
    const media = {
      media_id: makeId("MED"),
      media_type: normalizeSalesStatus(body.media_type || "IMAGE"),
      source_type: normalizeSalesStatus(body.source_type || "URL"),
      file_name: cmsSafeSpreadsheetText(body.file_name || url.split("/").pop(), 200),
      public_url: url,
      storage_reference: cleanString(body.storage_reference, 500),
      mime_type: cleanString(body.mime_type || "image/webp", 120),
      file_size: Math.max(0, Number(body.file_size || 0)),
      width: Math.max(0, Number(body.width || 0)),
      height: Math.max(0, Number(body.height || 0)),
      alt_text_th: cmsSafeSpreadsheetText(body.alt_text_th, 300),
      alt_text_en: cmsSafeSpreadsheetText(body.alt_text_en, 300),
      checksum: cleanString(body.checksum, 200),
      status: normalizeSalesStatus(body.status || "ACTIVE"),
      created_by: admin.actor_id,
      created_at: new Date(),
      updated_at: new Date(),
      is_test: booleanValue(body.is_test) || isQaRecord(body),
      qa_batch: cleanString(body.qa_batch, 120)
    };
    appendObject(SHEET_NAMES.cmsMedia, media);
    cmsWriteAudit("MEDIA", media.media_id, "CMS_MEDIA_REGISTERED", admin, {}, media, "Media registered", media);
    return { ok: true, media: media };
  });
}

function cmsSaveSiteSetting(body) {
  return cmsWithLock(function () {
    ensureCmsSheets();
    const admin = requireAdminActor(body);
    if (!admin.ok) return admin;
    const key = cleanString(body.setting_key || body.key, 120);
    if (!key) return { ok: false, message: "setting_key is required" };
    const locale = cmsNormalizeLocale(body.locale || "th");
    const existing = sheetToObjects(SHEET_NAMES.cmsSiteSettings).find(function (item) {
      return cleanString(item.setting_key, 120) === key && cmsNormalizeLocale(item.locale) === locale;
    });
    const row = {
      setting_id: existing ? existing.setting_id : makeId("SET"),
      setting_key: key,
      setting_value: cmsSafeSpreadsheetText(body.setting_value || body.value, 3000),
      locale: locale,
      status: normalizeSalesStatus(body.status || "ACTIVE"),
      updated_at: new Date(),
      updated_by: admin.actor_id,
      is_test: booleanValue(body.is_test) || isQaRecord(body),
      qa_batch: cleanString(body.qa_batch, 120)
    };
    if (existing) updateRowFields(SHEET_NAMES.cmsSiteSettings, existing._row, row); else appendObject(SHEET_NAMES.cmsSiteSettings, row);
    cmsWriteAudit("SETTING", key, "CMS_SETTING_SAVED", admin, existing || {}, row, "Setting saved", row);
    return { ok: true, setting: row };
  });
}

function cmsSaveNavigationItem(body) {
  return cmsWithLock(function () {
    ensureCmsSheets();
    const admin = requireAdminActor(body);
    if (!admin.ok) return admin;
    let href;
    try {
      href = cmsSafeUrl(body.href);
    } catch (error) {
      return { ok: false, message: "Unsafe navigation URL" };
    }
    const existingId = cleanString(body.nav_id, 80);
    const existing = existingId ? sheetToObjects(SHEET_NAMES.cmsNavigation).find(function (item) { return cleanString(item.nav_id, 80) === existingId; }) : null;
    const now = new Date();
    const row = {
      nav_id: existing ? existing.nav_id : makeId("NAV"),
      label_th: cmsSafeSpreadsheetText(body.label_th, 120),
      label_en: cmsSafeSpreadsheetText(body.label_en, 120),
      href: href,
      placement: normalizeSalesStatus(body.placement || "PUBLIC_MAIN"),
      display_order: Number(body.display_order || 0),
      status: normalizeSalesStatus(body.status || "ACTIVE"),
      audience: normalizeSalesStatus(body.audience || "PUBLIC"),
      created_at: existing ? existing.created_at : now,
      updated_at: now,
      created_by: existing ? existing.created_by : admin.actor_id,
      updated_by: admin.actor_id,
      is_test: booleanValue(body.is_test) || isQaRecord(body),
      qa_batch: cleanString(body.qa_batch, 120)
    };
    if (!row.label_th && !row.label_en) return { ok: false, message: "Navigation label is required" };
    if (existing) updateRowFields(SHEET_NAMES.cmsNavigation, existing._row, row); else appendObject(SHEET_NAMES.cmsNavigation, row);
    cmsWriteAudit("NAVIGATION", row.nav_id, existing ? "CMS_NAV_UPDATED" : "CMS_NAV_CREATED", admin, existing || {}, row, "Navigation saved", row);
    return { ok: true, navigation: row };
  });
}

function cmsListContentAdmin(body) {
  ensureCmsSheets();
  const admin = requireAdminActor(body);
  if (!admin.ok) return admin;
  const type = cmsNormalizeType(body.content_type || "");
  const q = cleanString(body.q || body.search, 200).toLowerCase();
  const rows = sheetToObjects(SHEET_NAMES.cmsContent).filter(function (item) {
    if (body.content_type && cmsNormalizeType(item.content_type) !== type) return false;
    if (!q) return true;
    return [item.content_id, item.content_key, item.slug, item.content_type, item.status, item.related_entity_id].join(" ").toLowerCase().indexOf(q) !== -1;
  }).map(function (row) { return cmsPublicContentRow(row, body.locale || "th"); });
  return { ok: true, total: rows.length, contents: rows };
}

function cmsGetContentAdmin(body) {
  ensureCmsSheets();
  const admin = requireAdminActor(body);
  if (!admin.ok) return admin;
  const content = findCmsContent(body.content_id);
  if (!content) return { ok: false, message: "Content not found" };
  const localizations = sheetToObjects(SHEET_NAMES.cmsLocalizations).filter(function (item) {
    return cleanString(item.content_id, 80) === cleanString(content.content_id, 80);
  });
  return { ok: true, content: content, public_content: cmsPublicContentRow(content, body.locale || "th"), localizations: localizations };
}

function cmsListRevisions(body) {
  ensureCmsSheets();
  const admin = requireAdminActor(body);
  if (!admin.ok) return admin;
  const contentId = cleanString(body.content_id, 80);
  const rows = sheetToObjects(SHEET_NAMES.cmsRevisions).filter(function (item) {
    return !contentId || cleanString(item.content_id, 80) === contentId;
  }).map(function (item) {
    return {
      revision_id: item.revision_id,
      content_id: item.content_id,
      revision_number: Number(item.revision_number || 0),
      change_summary: cleanString(item.change_summary, 500),
      created_by: cleanString(item.created_by, 80),
      created_at: item.created_at || "",
      status: cmsNormalizeStatus(item.status),
      is_test: booleanValue(item.is_test),
      qa_batch: cleanString(item.qa_batch, 120)
    };
  });
  return { ok: true, total: rows.length, revisions: rows };
}

function cmsListAuditLogs(body) {
  ensureCmsSheets();
  const admin = requireAdminActor(body);
  if (!admin.ok) return admin;
  const limit = Math.max(1, Math.min(300, Number(body.limit || 100)));
  return { ok: true, logs: sheetToObjects(SHEET_NAMES.cmsAuditLogs).slice(-limit).reverse() };
}

function cmsAdminDashboard(body) {
  ensureCmsSheets();
  const admin = requireAdminActor(body);
  if (!admin.ok) return admin;
  const contents = sheetToObjects(SHEET_NAMES.cmsContent);
  const media = sheetToObjects(SHEET_NAMES.cmsMedia);
  const revisions = sheetToObjects(SHEET_NAMES.cmsRevisions);
  const published = contents.filter(function (item) { return cmsIsPublished(item); });
  const draft = contents.filter(function (item) { return cmsNormalizeStatus(item.status) === CMS_STATUS.DRAFT; });
  return {
    ok: true,
    summary: {
      contents: contents.length,
      published: published.length,
      draft: draft.length,
      media: media.length,
      revisions: revisions.length,
      qa_excluded_public: true
    },
    recent_content: contents.slice(-20).reverse().map(function (row) { return cmsPublicContentRow(row, body.locale || "th"); })
  };
}

function cmsPublicSettings(locale) {
  const requested = cmsNormalizeLocale(locale);
  const settings = {};
  sheetToObjects(SHEET_NAMES.cmsSiteSettings).filter(function (item) {
    return normalizeSalesStatus(item.status || "ACTIVE") === "ACTIVE" && !isQaRecord(item);
  }).forEach(function (item) {
    const key = cleanString(item.setting_key, 120);
    const itemLocale = cmsNormalizeLocale(item.locale || "th");
    if (itemLocale === "th" && settings[key] === undefined) settings[key] = cleanString(item.setting_value, 3000);
    if (itemLocale === requested) settings[key] = cleanString(item.setting_value, 3000);
  });
  return settings;
}

function cmsPublicNavigation(locale, placement) {
  const requested = cmsNormalizeLocale(locale);
  const place = normalizeSalesStatus(placement || "PUBLIC_MAIN");
  return sheetToObjects(SHEET_NAMES.cmsNavigation).filter(function (item) {
    return normalizeSalesStatus(item.status || "ACTIVE") === "ACTIVE" && normalizeSalesStatus(item.placement || "PUBLIC_MAIN") === place && normalizeSalesStatus(item.audience || "PUBLIC") === "PUBLIC" && !isQaRecord(item);
  }).sort(function (a, b) {
    return Number(a.display_order || 0) - Number(b.display_order || 0);
  }).map(function (item) {
    return {
      nav_id: cleanString(item.nav_id, 80),
      label: requested === "en" ? (cleanString(item.label_en, 120) || cleanString(item.label_th, 120)) : cleanString(item.label_th, 120),
      href: cleanString(item.href, 1000),
      placement: normalizeSalesStatus(item.placement || "PUBLIC_MAIN"),
      audience: "PUBLIC"
    };
  });
}

function cmsPublicList(type, params) {
  const options = params || {};
  const locale = cmsNormalizeLocale(options.locale || "th");
  const contentType = cmsNormalizeType(type);
  const placement = normalizeSalesStatus(options.placement || "");
  const audience = normalizeSalesStatus(options.audience || "PUBLIC");
  const now = new Date();
  const rows = sheetToObjects(SHEET_NAMES.cmsContent).filter(function (item) {
    if (cmsNormalizeType(item.content_type) !== contentType) return false;
    if (!cmsIsPublished(item, now)) return false;
    if (placement && normalizeSalesStatus(item.placement || "") !== placement) return false;
    if (normalizeSalesStatus(item.audience || "PUBLIC") !== "PUBLIC" && normalizeSalesStatus(item.audience || "") !== audience) return false;
    return true;
  }).sort(function (a, b) {
    return Number(a.display_order || 0) - Number(b.display_order || 0);
  }).map(function (row) {
    return cmsPublicContentRow(row, locale);
  });
  return rows;
}

function cmsPublicBundle(params) {
  ensureCmsSheets();
  const locale = cmsNormalizeLocale(params && params.locale);
  return {
    ok: true,
    marker: "SBOS V3-5",
    locale: locale,
    settings: cmsPublicSettings(locale),
    navigation: cmsPublicNavigation(locale, "PUBLIC_MAIN"),
    banners: cmsPublicList("BANNER", Object.assign({}, params, { locale: locale })),
    home_sections: cmsPublicList("PAGE_SECTION", Object.assign({}, params, { locale: locale })),
    collections: cmsPublicList("COLLECTION_CONTENT", Object.assign({}, params, { locale: locale })),
    products: cmsPublicProducts(params).products,
    promotions: cmsPublicList("PROMOTION", Object.assign({}, params, { locale: locale })),
    faq: cmsPublicList("FAQ", Object.assign({}, params, { locale: locale })).slice(0, 12),
    articles: cmsPublicList("ARTICLE", Object.assign({}, params, { locale: locale })).slice(0, 12)
  };
}

function cmsPublicContent(params) {
  ensureCmsSheets();
  const locale = cmsNormalizeLocale(params && params.locale);
  const slug = cleanString(params && params.slug, 180).toLowerCase();
  const id = cleanString(params && params.content_id, 80);
  const row = sheetToObjects(SHEET_NAMES.cmsContent).find(function (item) {
    if (!cmsIsPublished(item)) return false;
    if (id && cleanString(item.content_id, 80) === id) return true;
    return slug && cleanString(item.slug, 180).toLowerCase() === slug;
  });
  return row ? { ok: true, content: cmsPublicContentRow(row, locale) } : { ok: false, message: "Content not found" };
}

function cmsPublicProducts(params) {
  ensureCmsSheets();
  const locale = cmsNormalizeLocale(params && params.locale);
  const productContents = cmsPublicList("PRODUCT_CONTENT", Object.assign({}, params, { locale: locale }));
  const byProduct = {};
  productContents.forEach(function (item) {
    byProduct[item.related_entity_id] = item;
  });
  const products = sheetToObjects(SHEET_NAMES.products).filter(function (product) {
    return normalizeSalesStatus(product.status || "ACTIVE") === "ACTIVE" && !isQaRecord(product);
  }).map(function (product) {
    return Object.assign({}, product, {
      cms_content: byProduct[product.product_id] || null,
      price_authority: "PRICING_ENGINE",
      content_authority: "CMS"
    });
  });
  return { ok: true, total: products.length, products: products };
}

function cmsPublicCollections(params) {
  ensureCmsSheets();
  return { ok: true, collections: cmsPublicList("COLLECTION_CONTENT", params || {}) };
}

function cmsPublicPromotions(params) {
  ensureCmsSheets();
  return { ok: true, promotions: cmsPublicList("PROMOTION", params || {}) };
}

function cmsPublicBanners(params) {
  ensureCmsSheets();
  return { ok: true, banners: cmsPublicList("BANNER", params || {}) };
}

function cmsPublicFaq(params) {
  ensureCmsSheets();
  return { ok: true, faq: cmsPublicList("FAQ", params || {}) };
}

function cmsPublicArticles(params) {
  ensureCmsSheets();
  return { ok: true, articles: cmsPublicList("ARTICLE", params || {}) };
}

function cmsIntegrityCheck(body) {
  ensureSalesSheets();
  const admin = requireAdminActor(body);
  if (!admin.ok) return admin;
  const anomalies = [];
  const slugs = {};
  sheetToObjects(SHEET_NAMES.cmsContent).forEach(function (item) {
    const slug = cleanString(item.slug, 180).toLowerCase();
    if (slug && !isQaRecord(item)) {
      slugs[slug] = (slugs[slug] || 0) + 1;
    }
    if (cmsNormalizeType(item.content_type) === "PRODUCT_CONTENT" && !findProductById(item.related_entity_id)) {
      anomalies.push({ type: "PRODUCT_REFERENCE_NOT_FOUND", content_id: item.content_id, product_id: item.related_entity_id });
    }
    if (cmsNormalizeStatus(item.status) === CMS_STATUS.PUBLISHED && isQaRecord(item)) {
      anomalies.push({ type: "QA_CONTENT_PUBLISHED", content_id: item.content_id });
    }
    if (/commission|wallet/i.test(String(item.metadata_json || ""))) {
      anomalies.push({ type: "FINANCE_MUTATION_REFERENCE", content_id: item.content_id });
    }
  });
  Object.keys(slugs).forEach(function (slug) {
    if (slugs[slug] > 1) anomalies.push({ type: "DUPLICATE_SLUG", slug: slug, count: slugs[slug] });
  });
  return { ok: true, anomalies: anomalies, public_draft_leak_protected: true, product_pricing_authoritative: true };
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
