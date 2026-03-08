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
      return `<a class="ssb-nav-link ${active}" href="${item.href}"><span>${item.label}</span></a>`;
    }

    const hasActiveChild = item.children.some(c => c.href === currentFile);
    return `
      <div class="ssb-nav-group ${hasActiveChild ? "open" : ""}">
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
  const main = document.querySelector(".ssb-main");

  btn?.addEventListener("click", () => {
    const willOpen = !sidebar.classList.contains("open");
    sidebar.classList.toggle("open");
    backdrop.classList.toggle("show", willOpen);

    if (window.innerWidth > 1024) {
      main?.classList.toggle("shifted", willOpen);
    }
  });

  backdrop?.addEventListener("click", () => {
    sidebar?.classList.remove("open");
    backdrop?.classList.remove("show");
    main?.classList.remove("shifted");
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
  const shell = document.getElementById("appShell");
  if (!shell) return;

  shell.innerHTML = `
    <div class="ssb-topbar">
      <div class="ssb-container">
        <button id="menuToggle" class="ssb-menu-btn">☰</button>
        <div class="ssb-brand">
          <img src="images/logo.png" />
          <div>
            <div class="ssb-title">Stealth Safety Bank</div>
            <div class="ssb-sub">${pageTitle}</div>
          </div>
        </div>
      </div>
    </div>

    <aside id="ssbSidebar" class="ssb-sidebar">
      <div class="ssb-sidebar-inner">
        <div class="ssb-menu-title">เมนูหลัก</div>

        <a href="index.html">หน้าแรก</a>
        <a href="about.html">เกี่ยวกับเรา</a>
        <a href="book.html">เลือก Safety Book</a>
        <a href="agents.html">ตัวแทนจำหน่าย</a>
        <a href="contact.html">ติดต่อเรา</a>
      </div>
    </aside>
  `;

  const toggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("ssbSidebar");

  toggle?.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    document.body.classList.toggle("menu-open");
  });
}
