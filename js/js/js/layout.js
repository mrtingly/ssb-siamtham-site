export function renderSiteChrome(pageTitle = "", pageStep = "") {
  const headerHost = document.getElementById("siteHeader");
  const footerHost = document.getElementById("siteFooter");

  const topBar = `
    <div class="w-full bg-slate-950 text-slate-100 text-[11px] sm:text-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-2 leading-5">
        <div class="font-semibold">บริษัท สยามทำ จำกัด</div>
        <div>54 ซอย 53 ถนนพุทธมณฑลสาย 1 แขวงฉิมพลี เขตตลิ่งชัน กรุงเทพ</div>
        <div>Serial Number: 0105566099954</div>
        <div>โทร 02-043-2988 | มือถือ 063-656-1447 / 064-951-4888 / 080-204-5455</div>
      </div>
    </div>
  `;

  const header = `
    ${topBar}
    <header class="bg-white/95 backdrop-blur border-b border-slate-200 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3 min-w-0">
          <img
            src="images/logo.png"
            alt="Stealth Safety Bank Logo"
            class="h-11 w-11 sm:h-14 sm:w-14 rounded-xl object-cover border border-slate-200 shadow-sm bg-white"
          />
          <div class="min-w-0">
            <div class="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
              Stealth Safety Bank
            </div>
            <div class="text-xs sm:text-sm text-slate-500 truncate">
              ${pageTitle || "Stealth Technology"}
            </div>
          </div>
        </div>

        <div class="hidden lg:block text-right">
          <div class="text-sm font-semibold text-slate-800">Stealth Technology</div>
          <div class="text-xs text-slate-500">${pageStep || "Secure • Invisible • Premium"}</div>
        </div>
      </div>
    </header>
  `;

  const footer = `
    <footer class="mt-14 border-t border-slate-200 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div class="grid md:grid-cols-3 gap-6">
          <div class="flex items-start gap-3">
            <img
              src="images/logo.png"
              alt="Stealth Safety Bank Logo"
              class="h-12 w-12 rounded-xl object-cover border border-slate-200 shadow-sm bg-white"
            />
            <div>
              <div class="font-bold text-slate-900">Stealth Safety Bank</div>
              <div class="text-sm text-slate-500">Stealth Technology</div>
            </div>
          </div>

          <div class="text-sm text-slate-600 leading-7">
            <div class="font-semibold text-slate-800 mb-1">ข้อมูลบริษัท</div>
            <div>บริษัท สยามทำ จำกัด</div>
            <div>54 ซอย 53 ถนนพุทธมณฑลสาย 1 แขวงฉิมพลี เขตตลิ่งชัน กรุงเทพ</div>
            <div>Serial Number: 0105566099954</div>
          </div>

          <div class="text-sm text-slate-600 leading-7">
            <div class="font-semibold text-slate-800 mb-1">ติดต่อ</div>
            <div>โทร 02-043-2988</div>
            <div>มือถือ 063-656-1447</div>
            <div>มือถือ 064-951-4888</div>
            <div>มือถือ 080-204-5455</div>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-500 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <div>© 2026 Stealth Safety Bank System by Siam Tham Co., Ltd.</div>
          <div>Responsive for Desktop / Android / iPhone / iPad</div>
        </div>
      </div>
    </footer>
  `;

  if (headerHost) headerHost.innerHTML = header;
  if (footerHost) footerHost.innerHTML = footer;
}
