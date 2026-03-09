const MENU = [
  { label: "หน้าแรก", href: "index.html" },
  {
    label: "เกี่ยวกับเรา",
    children: [
      { label: "บริษัท สยามทำ จำกัด", href: "about.html" },
      { label: "ผลงานวิจัยและพัฒนา", href: "research.html" }
    ]
  },
  {
    label: "ข้อมูลระบบ SSB",
    children: [
      { label: "Stealth Safety Bank System คืออะไร", href: "what-ssb.html" },
      { label: "Stealth Safety Bank คืออะไร", href: "what-ssbmobile.html" },
      { label: "Stealth Safety Book คืออะไร", href: "what-safety-book.html" },
      { label: "Flare Technology คืออะไร", href: "what-flare.html" },
      { label: "อบรมการใช้งาน", href: "ssb-training.html" }
    ]
  },
  {
    label: "ตัวแทนจำหน่าย",
    children: [
      { label: "สมัครเป็นตัวแทนจำหน่าย", href: "agents-partner.html" }
    ]
  },
  { label: "ติดต่อเรา", href: "contact.html" }
];

function fileNameOf(pathname) {
  const p = pathname.split("/").pop();
  return p || "index.html";
}

function buildMenuHtml(currentFile) {
  return MENU.map((item) => {
    if (item.href) {
      return `
        <a class="ssb-nav-link ${currentFile === item.href ? "active" : ""}" href="${item.href}">
          ${item.label}
        </a>
      `;
    }

    const hasActiveChild = item.children.some((c) => c.href === currentFile);

    return `
      <div class="ssb-nav-group ${hasActiveChild ? "open" : ""}">
        <button class="ssb-nav-toggle" type="button">
          <span>${item.label}</span>
          <span class="arrow">${hasActiveChild ? "▲" : "▼"}</span>
        </button>
        <div class="ssb-nav-children">
          ${item.children.map((c) => `
            <a class="ssb-child-link ${currentFile === c.href ? "active" : ""}" href="${c.href}">
              ${c.label}
            </a>
          `).join("")}
        </div>
      </div>
    `;
  }).join("");
}

function bindShellEvents() {
  const menuBtn = document.getElementById("ssbMenuBtn");
  const sidebar = document.getElementById("ssbSidebar");
  const backdrop = document.getElementById("ssbBackdrop");

  menuBtn?.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    backdrop.classList.toggle("show");
  });

  backdrop?.addEventListener("click", () => {
    sidebar.classList.remove("open");
    backdrop.classList.remove("show");
  });

  document.querySelectorAll(".ssb-nav-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.closest(".ssb-nav-group");
      group?.classList.toggle("open");

      const arrow = btn.querySelector(".arrow");
      if (arrow) {
        arrow.textContent = group?.classList.contains("open") ? "▲" : "▼";
      }
    });
  });
}

export function renderSharedShell(pageTitle = "") {
  const host = document.getElementById("appShell");
  if (!host) return;

  const currentFile = fileNameOf(window.location.pathname);

  host.innerHTML = `
    <div class="ssb-shell">
      <div class="ssb-topbar">
        <div class="ssb-topbar-inner">
          <div class="ssb-topbar-left">
            <button id="ssbMenuBtn" class="ssb-menu-btn">☰</button>

            <div class="ssb-brand">
              <img src="images/logo.png" alt="SSB Logo" />
              <div>
                <div class="ssb-brand-title">Stealth Safety Bank</div>
                <div class="ssb-brand-sub">${pageTitle}</div>
              </div>
            </div>
          </div>

          <div class="ssb-company-mini">
            บริษัท สยามทำ จำกัด
          </div>
        </div>
      </div>

      <aside id="ssbSidebar" class="ssb-sidebar">
        <div class="ssb-sidebar-inner">
          <nav class="ssb-nav">
            ${buildMenuHtml(currentFile)}
          </nav>
        </div>
      </aside>

      <div id="ssbBackdrop" class="ssb-backdrop"></div>
    </div>
  `;

  bindShellEvents();
}
