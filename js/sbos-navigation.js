"use strict";

window.SBOS_NAV = {
  agent: [
    ["agent-dashboard.html", "Dashboard"],
    ["agent-leads.html", "Customers"],
    ["agent-products.html", "Products"],
    ["agent-quotation.html", "Quotations"],
    ["agent-orders.html", "Orders"],
    ["agent-income.html", "Income"],
    ["agent-wallet.html", "Wallet"],
    ["agent-commissions.html", "Commissions"],
    ["agent-withdrawals.html", "Withdrawals"],
    ["agent-team.html", "Team"],
    ["agent-exam.html", "Exam"],
    ["agent-profile.html", "Profile"]
  ],
  admin: [
    ["admin-dashboard.html", "Dashboard"],
    ["admin-agent.html", "Review Agents"],
    ["admin-agents-list.html", "Agents"],
    ["admin-quotations.html", "Quotations"],
    ["admin-orders.html", "Orders"],
    ["admin-finance.html", "Finance"],
    ["admin-commissions.html", "Commissions"],
    ["admin-wallets.html", "Wallets"],
    ["admin-withdraw.html", "Withdrawals"],
    ["admin-commission-settings.html", "Commission Settings"],
    ["admin-bonus.html", "Bonus"]
  ],
  render(target, kind = "agent") {
    const element = typeof target === "string" ? document.querySelector(target) : target;
    if (!element) return;
    const current = location.pathname.split("/").pop() || "index.html";
    element.innerHTML = (this[kind] || [])
      .map(([href, label]) => `<a href="${href}" class="${current === href ? "active" : ""}">${label}</a>`)
      .join("");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-sbos-nav]").forEach(element => {
    SBOS_NAV.render(element, element.dataset.sbosNav || "agent");
  });
});
