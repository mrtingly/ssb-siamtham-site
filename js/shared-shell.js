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
    label: "สินค้าของเรา",
    children: [
      { label: "Stealth Safety Bank Mobile System", href: "products.html" }
    ]
  },
  {
    label: "ตัวแทนจำหน่าย",
    children: [
      { label: "ตรวจชื่อตัวแทนจำหน่าย", href: "dealer-check.html" },
      { label: "สมัครเป็นตัวแทนจำหน่าย", href: "dealer-apply.html" },
      { label: "ระบบคำนวณผลงาน", href: "dealer-calculator.html" }
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
      const active = currentFile === item.href ? "active" : "";
      return `
        <a class="ssb-nav-link ${active}" href="${item.href}">
          <span>${item.label}</span>
        </a>
      `;
    }

    const hasActiveChild = item.children.some(c => c.href === currentFile);
    const groupClass = hasActiveChild ? "ssb-nav-group open" : "ssb-nav-group";

    return `
      <div class="${groupClass}">
        <button class="ssb-nav-toggle" type="button">
          <span>${item.label}</span>
          <span>${hasActiveChild ? "−" : "+"}</span>
        </button>
        <div class="ssb-nav-children">
          ${item.children.map(c => `
            <a class="ssb-child-link ${currentFile === c.href ? "active" : ""}" href="${c.href}">
              ${c.label}
            </a>
          `).join("")}
        </div>
      </div>
    `;
  }).join("");
}

function bindSidebar() {
  const btn = document.getElementById("ssbMenuBtn");
  const sidebar = document.getElementById("ssbSidebar");
  const backdrop = document.getElementById("ssbBackdrop");

  btn?.addEventListener("click", () => {
    sidebar?.classList.toggle("open");
    backdrop?.classList.toggle("show");
  });

  backdrop?.addEventListener("click", () => {
    sidebar?.classList.remove("open");
    backdrop?.classList.remove("show");
  });

  document.querySelectorAll(".ssb-nav-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const group = toggle.closest(".ssb-nav-group");
      group?.classList.toggle("open");
      const mark = toggle.querySelector("span:last-child");
      if (mark) mark.textContent = group?.classList.contains("open") ? "−" : "+";
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
        <div class="ssb-topbar-left">
          <button id="ssbMenuBtn" class="ssb-menu-btn" aria-label="Open menu">☰</button>
          <div class="ssb-brand">
            <img src="images/logo.png" alt="SSB Logo" />
            <div>
              <div class="ssb-brand-title">Stealth Safety Bank</div>
              <div class="ssb-brand-sub">${pageTitle || "Stealth Technology"}</div>
            </div>
          </div>
        </div>
        <div class="ssb-company-mini">
          บริษัท สยามทำ จำกัด · 02-043-2988
        </div>
      </div>

      <div class="ssb-layout">
        <aside id="ssbSidebar" class="ssb-sidebar">
          <div class="ssb-sidebar-title">เมนูหลัก</div>
          <nav class="ssb-nav">
            ${buildMenuHtml(currentFile)}
          </nav>

          <div class="ssb-company-card">
            <div><strong>บริษัท สยามทำ จำกัด</strong></div>
            <div>54 ซอย 53 ถนนพุทธมณฑลสาย 1 แขวงฉิมพลี เขตตลิ่งชัน กรุงเทพ</div>
            <div>Serial Number: 0105566099954</div>
            <div>โทร 02-043-2988</div>
            <div>มือถือ 063-656-1447 / 064-951-4888 / 080-204-5455</div>
          </div>
        </aside>

        <div id="ssbBackdrop" class="ssb-backdrop"></div>
      </div>
    </div>
  `;

  bindSidebar();
}
