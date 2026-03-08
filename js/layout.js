function renderSiteChrome(titleText, stepText) {

  const header = `
    <div style="background:#0f172a;color:white;font-size:12px;padding:8px 16px;line-height:1.6;">
      <div style="max-width:1200px;margin:auto;">
        <div><strong>บริษัท สยามทำ จำกัด</strong></div>
        <div>54 ซอย 53 ถนนพุทธมณฑลสาย 1 แขวงฉิมพลี เขตตลิ่งชัน กรุงเทพ</div>
        <div>Serial Number: 0105566099954</div>
        <div>โทร 02-043-2988 | มือถือ 063-656-1447 / 064-951-4888 / 080-204-5455</div>
      </div>
    </div>

    <div style="background:white;border-bottom:1px solid #e2e8f0;padding:16px;">
      <div style="max-width:1200px;margin:auto;display:flex;align-items:center;gap:12px;">
        <img src="images/logo.png" style="height:50px;width:50px;border-radius:12px;object-fit:cover;border:1px solid #e2e8f0;" />
        <div>
          <div style="font-weight:700;font-size:18px;">Stealth Safety Bank</div>
          <div style="font-size:13px;color:#64748b;">${titleText}</div>
        </div>
      </div>
    </div>
  `;

  const footer = `
    <div style="margin-top:60px;background:white;border-top:1px solid #e2e8f0;padding:30px 16px;font-size:13px;color:#64748b;">
      <div style="max-width:1200px;margin:auto;">
        <div style="font-weight:700;color:#0f172a;margin-bottom:6px;">บริษัท สยามทำ จำกัด</div>
        <div>54 ซอย 53 ถนนพุทธมณฑลสาย 1 แขวงฉิมพลี เขตตลิ่งชัน กรุงเทพ</div>
        <div>Serial Number: 0105566099954</div>
        <div style="margin-top:8px;">โทร 02-043-2988</div>
        <div>มือถือ 063-656-1447 / 064-951-4888 / 080-204-5455</div>
        <div style="margin-top:15px;">© 2026 Stealth Safety Bank System</div>
      </div>
    </div>
  `;

  document.getElementById("siteHeader").innerHTML = header;
  document.getElementById("siteFooter").innerHTML = footer;
}
