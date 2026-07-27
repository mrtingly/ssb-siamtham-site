# SBOS Architecture Audit และ Roadmap Phase 1

วันที่วิเคราะห์: 2026-07-27  
ขอบเขต: วิเคราะห์ repository ฝั่ง static website/frontend, HTML/CSS/JavaScript, Google Apps Script contract ที่ frontend เรียกใช้ และเอกสารข้อมูลเดิมใน `docs/ssbms-master-data-model.md`

> หมายเหตุสำคัญ: ใน repository นี้ไม่พบไฟล์ Google Apps Script (`.gs`) หรือ `appsscript.json` จึงวิเคราะห์ฝั่ง Apps Script ได้จาก endpoint/action ที่ frontend เรียกใช้เท่านั้น ยังไม่สามารถ audit logic ฝั่ง server, Google Sheets permissions, trigger, deployment setting หรือ schema จริงใน Spreadsheet ได้ครบจนกว่าจะนำ source Apps Script เข้ามา version control

## 1. ภาพรวมระบบ

SBOS / SSBMS ใน repo นี้เป็น static web application ที่ deploy ได้บน static hosting เช่น GitHub Pages ผ่าน `CNAME` โดยมี backend เป็น Google Apps Script Web App หลาย endpoint และใช้ Google Sheets เป็น data store โดยนัย

ระบบแบ่งออกเป็น 4 กลุ่มใหญ่:

1. Public marketing website
   - หน้าแรกและบทความสินค้า/ระบบ เช่น `index.html`, `ssb-system.html`, `survival-compare.html`, `what-*.html`, `news.html`
   - ใช้ CSS/JS ชุด hero, popup, search, theme และ Google Translate

2. Customer/order flow
   - เลือก Safety Book, device, training proof และส่ง order
   - ไฟล์หลัก: `book.html`, `book-preview.html`, `device.html`, `device-preview.html`, `training.html`, `js/ssbFlow.js`, `js/order.js`, `js/api.js`

3. Agent ERP
   - สมัคร, login, อบรม, สอบ, รออนุมัติ, dashboard, income/bonus/withdraw, product quotation/order
   - ไฟล์หลัก: `agent-register.html`, `agent-login.html`, `agent-learning.html`, `agent-exam.html`, `agent-waiting.html`, `agent-dashboard.html`, `agent-products.html`, `agent-quotation.html`, `agent-orders.html`, `js/login.js`, `js/register.js`, `js/agent-api.js`, `js/withdraw.js`

4. Admin ERP
   - login admin, dashboard, ตรวจตัวแทน, อนุมัติ/ระงับ, commission/bonus, withdraw, quotation/order center
   - ไฟล์หลัก: `admin-login.html`, `admin-dashboard.html`, `admin-agent.html`, `admin-agents-list.html`, `admin-quotations.html`, `admin-orders.html`, `admin-bonus.html`, `admin-withdraw.html`, `js/admin-login.js`, `js/admin-guard.js`, `js/admin-actions.js`

## 2. โครงสร้างไฟล์

```text
/
  index.html                         # public entry point
  login.html                         # login selector
  agent-*.html                       # agent ERP pages
  admin-*.html                       # admin ERP pages
  book*.html, device*.html           # customer configuration flow
  training.html                      # customer training proof flow
  lead-form.html                     # public lead capture form
  ssb-system*.html, survival-*.html  # product/system presentation pages
  what-*.html, news.html             # content pages
  css/
    base/layout/hero/popup/...       # public website styles
    agent-*.css, admin-*.css         # ERP styles บางส่วน
    sbos-core.css                    # shared ERP primitive styles
  js/
    main/ui/popup/data               # public website interaction/data
    ssbFlow/book/device/training     # customer flow state machine
    api/order/config                 # order API wrapper + Apps Script endpoint
    login/register/agent-api         # agent auth + agent API helpers
    admin-login/admin-actions/guard  # admin auth + admin API helpers
    sbos-core/sbos-api/navigation    # prototype shared SBOS helpers
  config/
    safetyBook.json
    devicesApple.json
    devicesSamsung.json
    agentsRules.json
    catalog.json                     # empty
    uiTheme.json                     # empty
  data/
    product-prices.json              # central product price data for agent products
  docs/
    ssbms-master-data-model.md       # target master data model
    sbos-architecture-audit-phase1.md
  images/, audio/
  invoice/                           # empty invoice stubs
```

## 3. เทคโนโลยีที่ใช้

- HTML static pages, ส่วนใหญ่เป็น plain HTML พร้อม inline JavaScript/CSS ในหลายหน้า
- CSS plain CSS ไม่มี build step
- JavaScript แบบผสม:
  - classic scripts: `js/main.js`, `js/login.js`, `js/agent-api.js`
  - ES modules: `js/book.js`, `js/device.js`, `js/training.js`, `js/order.js`
  - inline scripts ใน `agent-dashboard.html`, `agent-learning.html`, `agent-exam.html`, `admin-agent.html`, `admin-orders.html`, `admin-quotations.html`
- Google Apps Script Web App เป็น backend ผ่าน `fetch()` และ JSONP
- Google Sheets เป็น data store ตาม design document และ endpoint contract
- External services:
  - Google Fonts
  - Google Translate
  - flagcdn/simpleicons CDN
  - Google Apps Script endpoints
- ไม่พบ `package.json`, bundler, test runner, lint config, Apps Script source หรือ deployment config ใน repo

## 4. Entry Point ของระบบ

- Public website: `index.html`
- Login selector: `login.html`
- Agent login: `agent-login.html`
- Admin login: `admin-login.html`
- Agent post-login routing:
  - `REGISTERED` / `TRAINING` -> `agent-learning.html`
  - `EXAM` -> `agent-exam.html`
  - `WAIT_APPROVAL` / `PENDING` -> `agent-waiting.html`
  - `APPROVED` -> `agent-dashboard.html`
- Customer order flow:
  - `book.html` -> `book-preview.html` -> `device.html` -> `device-preview.html` -> `training.html` -> order submit
- Agent sales prototype:
  - `agent-products.html` -> `agent-quotation.html` -> `admin-quotations.html` -> `admin-orders.html`

## 5. API และ Apps Script Contract ที่พบ

พบ Apps Script Web App URL อย่างน้อย 5 ตัว:

1. Agent lifecycle endpoint  
   ใช้ใน `js/login.js`, `js/register.js`, `js/agent-api.js`, `agent-dashboard.html`, `agent-learning.html`, `agent-exam.html`, `agent-waiting.html`, `admin-agent.html`
   - `login`
   - `registerAgent`
   - `getDashboard`
   - `getAgentStatus`
   - `updateTrainingProgress`
   - `submitExam`
   - `getAgent`
   - `approveAgent`
   - `rejectAgent`
   - `suspendAgent`

2. Admin/withdraw endpoint  
   ใช้ใน `js/admin-login.js`, `js/admin-actions.js`, `js/withdraw.js`
   - `login`
   - `approveAgent`
   - `rejectAgent`
   - `markWithdrawPaid`
   - `rejectWithdraw`
   - `requestWithdraw`

3. Order submit endpoint  
   ใช้ใน `js/config.js`, `js/order.js`, `js/api.js`
   - payload ผ่าน `FormData(payload=JSON.stringify(...))`
   - action จาก flow ปัจจุบันไม่ชัดใน wrapper แต่ใช้สำหรับส่ง order/customer flow

4. Lead form endpoint  
   ใช้ใน `lead-form.html`
   - submit lead form ผ่าน `fetch(SCRIPT_URL, POST)`

5. อีก endpoint ใน `js/order.js`
   - ใช้ submit order โดยตรง แยกจาก `js/config.js`

ข้อสังเกต:

- Endpoint กระจาย hard-code หลายไฟล์ ไม่มี single source of truth
- มีทั้ง JSONP GET และ POST `text/plain`/`FormData` ปะปนกัน
- บาง action admin agent ใช้ GET เปลี่ยนสถานะ ซึ่งเสี่ยงต่อ CSRF/replay และ audit ยาก
- ยังไม่พบ token/session validation ฝั่ง frontend นอกจาก `localStorage`; ต้องยืนยัน enforcement ฝั่ง Apps Script

## 6. Login และ Session

Agent login:

- หน้า: `agent-login.html`
- logic: `js/login.js`
- ส่ง `action=login`, `username`, `password` ผ่าน JSONP GET
- เมื่อสำเร็จบันทึก `localStorage` keys:
  - `agent_id`
  - `agent_name`
  - `agent_role`
  - `agent_status`
  - `ssb_agent_id`
  - `ssb_current_agent_v1`
  - `ssb_agent_session`
  - `ssb_agent_session_v1`
- route ตามสถานะตัวแทน

Admin login:

- หน้า: `admin-login.html`
- logic: `js/admin-login.js`
- ส่ง `action=login`, `username`, `password` ผ่าน JSONP GET
- ตรวจ role เป็น `Admin` หรือ `Owner`
- บันทึก `admin_id`, `admin_name`, `admin_role`

Guards:

- `js/agent-guard.js` ตรวจเฉพาะ `agent_id`
- `js/admin-guard.js` ตรวจ `admin_id` และ `admin_role`
- guard เป็น client-side gate เท่านั้น ไม่ใช่ security boundary

ความเสี่ยง:

- password อยู่ใน query string ของ JSONP GET ทำให้มีโอกาสติด browser history, proxy log, analytics/referrer
- ไม่มี session token หมดอายุ, refresh, server-side signed token หรือ HttpOnly cookie
- localStorage แก้ไขเองได้ จึงห้ามใช้เป็น authorization จริง
- `admin-login.html` load `js/admin-guard.js` ด้วย ซึ่งอาจ redirect ก่อน login หาก guard ทำงานไม่แยกหน้า

## 7. Dashboard

Agent dashboard:

- `agent-dashboard.html` มี inline JS เรียก `getDashboard`
- แสดง profile, income, bonus, tax, net, order count
- มี logic ซ้ำกับ `js/agent-api.js`
- menu link ไปไฟล์ที่ยังไม่มี: `agent-media.html`, `agent-settings.html`

Admin dashboard:

- `admin-dashboard.html` แสดง KPI จาก `localStorage`
- ไม่ดึงจาก Apps Script/Sheets
- menu link ไปไฟล์ที่ยังไม่มี: `admin-installation.html`
- เหมาะเป็น prototype UI มากกว่าระบบ production

## 8. ระบบตัวแทน

สถานะตัวแทนที่พบ:

- `REGISTERED`
- `TRAINING`
- `EXAM`
- `WAIT_APPROVAL`
- `PENDING`
- `APPROVED`
- `REJECTED`
- `SUSPENDED`

Flow:

1. สมัครตัวแทนผ่าน `agent-register.html` -> `registerAgent`
2. Login ผ่าน `agent-login.html` -> `login`
3. อบรมผ่าน `agent-learning.html` -> `getAgentStatus`, `updateTrainingProgress`
4. สอบผ่าน `agent-exam.html` -> `submitExam`
5. รอ admin ผ่าน `agent-waiting.html`
6. Admin ตรวจ/อนุมัติผ่าน `admin-agent.html`
7. Approved เข้า `agent-dashboard.html`

ช่องว่าง:

- `admin-agents-list.html` เป็น static mock list ไม่ได้ list จาก API
- `agent-team.html`, `agent-leads.html`, `agent-tax.html`, `agent-history.html` เป็น stub ขนาดเล็ก
- `agent-profile.html` มีข้อมูลจำกัด
- ไม่มีระบบ team hierarchy ที่ทำงานจริงตาม data model

## 9. ระบบอบรม

- `agent-learning.html` มีบทเรียน 5 บท hard-code ในหน้า
- progress เพิ่มทีละ 20% ผ่าน `updateTrainingProgress`
- เมื่อครบ 100% เปิดทางไป `agent-exam.html`
- มี placeholder video box ไม่มี asset/video จริง

ความเสี่ยง:

- บทเรียนและ progress logic อยู่ inline ทำให้แก้ยากและทดสอบยาก
- frontend เป็นผู้กำหนด next progress จึง backend ต้อง validate อย่างเข้มว่าข้ามขั้นไม่ได้

## 10. ระบบสอบ

- `agent-exam.html` มีข้อสอบ 10 ข้อ hard-code ในหน้า
- timer 20 นาทีใน client
- คำนวณ score ใน frontend แล้วส่ง `submitExam` พร้อม `score`
- ผ่านที่ 80%

ความเสี่ยงสูง:

- คำตอบและคะแนนอยู่ใน browser ทั้งหมด ผู้ใช้แก้ score ก่อนส่งได้
- timer เป็น client-side เท่านั้น
- backend ต้องตรวจคำตอบเอง แต่ contract ปัจจุบันส่ง score อย่างเดียว จึงมีแนวโน้มไม่ปลอดภัย

## 11. ระบบ Admin

ทำงานจริงบางส่วน:

- `admin-login.html` login ผ่าน Apps Script endpoint
- `admin-agent.html` ค้นหา agent และ approve/reject/suspend ผ่าน Apps Script
- `admin-withdraw.html` ใช้ `js/admin-actions.js`

ยังเป็น prototype/local:

- `admin-dashboard.html` อ่าน KPI จาก `localStorage`
- `admin-quotations.html` อ่าน `ssb_signed_quotes` จาก browser localStorage
- `admin-orders.html` อ่าน/เขียน `ssb_orders` และ `ssb_install_jobs` ใน browser localStorage
- `admin-agents-list.html` เป็น mock/static

## 12. Google Sheets และ Apps Script

เอกสาร data model เดิมใน `docs/ssbms-master-data-model.md` ครอบคลุม Sheets ที่ควรมี:

- Agents
- Customers
- Products
- Quotations
- Orders
- InstallJobs
- SPCCases
- Commissions
- Training
- Exams
- AuditLogs

สถานะ repo ปัจจุบัน:

- ไม่มี source Apps Script
- ไม่มี schema mapping จริงจาก Sheets
- frontend action names ไม่ตรงกับ action names ใน data model บางส่วน เช่น document เสนอ `loginAgent`, `getAgentDashboard` แต่ frontend ใช้ `login`, `getDashboard`
- ต้องทำ API contract กลางและ version control Apps Script ใน Phase 1

## 13. ไฟล์ไม่ได้ใช้งาน / Stub / Broken References

ไฟล์ว่างหรือเกือบว่าง:

- `about.html`
- `company.html`
- `contact.html`
- `config/catalog.json`
- `config/uiTheme.json`
- `invoice/invoice.html`
- `invoice/invoice.js`
- `js/app.js`
- `css/main.css`
- `css/styles.css`
- `images/book.jpg`
- `images/books/test.jpg`
- `audio/Stealth Safety Bank (1).mp3`

Stub pages:

- `agent-history.html`
- `agent-leads.html`
- `agent-tax.html`
- `agent-team.html`

Broken references ที่พบ:

- `admin-installation.html` ถูก link แต่ไม่มีไฟล์
- `agent-media.html` ถูก link แต่ไม่มีไฟล์
- `agent-settings.html` ถูก link แต่ไม่มีไฟล์
- `join-agent.html` ถูก link ใน `news.html` แต่ไม่มีไฟล์
- `js/ssb-system-mobile.js` ถูก link ใน `ssb-system-mobile.html` แต่ไม่มีไฟล์
- `sounds/ui-click.mp3` ถูกอ้างใน `ssb-system.html` และ `survival-compare.html` แต่ไม่มีไฟล์
- `order.js` และ `configurator.js` ถูกอ้างแบบไม่มี `js/` path ในบางหน้า จึงต้องตรวจว่าตั้งใจเป็น root file หรือผิด path

## 14. Bugs / Functional Risks

1. Admin guard บนหน้า login  
   `admin-login.html` load `js/admin-guard.js`; ถ้าไม่มี `admin_id` จะ redirect ไป `login.html` ได้ ทำให้หน้า login admin อาจใช้งานไม่ได้ในบางกรณี

2. Agent guard บนหน้า register  
   `agent-register.html` load `js/agent-guard.js`; ถ้าไม่มี `agent_id` guard จะ redirect ไป `login.html` อาจทำให้สมัครตัวแทนไม่ได้

3. ข้อมูล quotation/order ไม่ sync  
   `agent-quotation.html`, `admin-quotations.html`, `admin-orders.html` ใช้ localStorage จึงใช้ได้เฉพาะ browser เดียวกัน

4. Inline JS ซ้ำหลายจุด  
   dashboard/learning/exam/admin-agent มี API/jsonp/session logic ซ้ำ ทำให้แก้ bug หนึ่งต้องแก้หลายไฟล์

5. Broken navigation  
   link ไปหน้า/asset ที่ไม่มีจริงหลายรายการ ทำให้ UX สะดุดและเกิด 404

6. Endpoint duplication  
   API URL อยู่หลายไฟล์และมีหลาย endpoint สำหรับ domain คล้ายกัน เสี่ยง deploy ผิด environment

## 15. Security Audit

ความเสี่ยงระดับสูง:

- Login ส่ง password ผ่าน JSONP GET query string
- JSONP execute remote script โดยตรง ไม่มี CORS/security isolation
- localStorage ใช้เป็น session/role/admin permission
- exam ส่ง score จาก client แทนส่ง answers ให้ backend ตรวจ
- write actions บางส่วนใช้ GET เช่น approve/reject/suspend
- ไม่มี CSRF token, nonce, idempotency key หรือ server-issued session token ใน frontend
- API URLs hard-code public ใน source
- ไม่มี audit logging ที่บังคับใช้จาก frontend flow ปัจจุบัน

แนวทาง Phase 1:

- เปลี่ยน login/write actions เป็น POST เท่านั้น
- Apps Script ต้องออก signed session token หรือ opaque session id พร้อม expiry
- backend ต้อง validate role/status ทุก action
- exam ต้องส่ง answers หรือ attempt id และให้ backend ตรวจคะแนน
- admin actions ต้องมี audit log ทุกครั้ง

## 16. Performance Audit

ปัญหาหลัก:

- HTML หลายไฟล์ใหญ่และมี inline CSS/JS มาก ทำให้ cache/reuse ยาก
- `news.html` ใหญ่มากประมาณ 108 KB
- `agent-dashboard.html`, `agent-learning.html`, `agent-exam.html` มี inline script/style เยอะ
- โหลด external CDN หลายตัวใน public pages
- ไม่มี bundling/minify/cache strategy
- รูปภาพจำนวนมากไม่มีการจัด asset budget หรือ responsive image strategy ที่สม่ำเสมอ
- JSONP เพิ่ม script tag ต่อ request และควบคุม timeout/retry ไม่สม่ำเสมอ

## 17. Roadmap SBOS Phase 1

ปรับแผนตามคำสั่งล่าสุด: Phase 1 มีเป้าหมายเดียว คือทำให้ flow ตัวแทนใช้งานได้จริงตั้งแต่ `สมัครสมาชิก -> Login -> อบรม -> สอบ -> รออนุมัติ -> Admin อนุมัติ -> Dashboard ตัวแทน`

ข้อจำกัดของ Phase 1:

- ห้าม refactor ระบบทั้งหมด
- ใช้โครงสร้างเดิมของระบบให้มากที่สุด
- ห้ามเปลี่ยน architecture โดยไม่จำเป็น
- ห้ามย้ายระบบทั้งหมดไป backend
- ห้ามแก้ระบบอื่นที่ยังใช้งานได้

ดังนั้นรายการงานเดิมด้านล่างถือเป็น backlog หลัง Phase 1 ยกเว้นงานที่เกี่ยวข้องโดยตรงกับ flow ตัวแทนนี้เท่านั้น

### งานที่ 1: รวม API Configuration และ Contract

ผลลัพธ์:

- มี `js/sbos-config.js` หรือใช้ `js/config.js` เป็น single source of truth
- กำหนด environment endpoint ชัดเจน
- นิยาม action names ให้ตรงกับ Apps Script และ `docs/ssbms-master-data-model.md`

ไฟล์ที่ต้องแก้:

- `js/config.js`
- `js/login.js`
- `js/register.js`
- `js/agent-api.js`
- `js/admin-login.js`
- `js/admin-actions.js`
- `js/withdraw.js`
- `js/order.js`
- `lead-form.html`
- `agent-dashboard.html`
- `agent-learning.html`
- `agent-exam.html`
- `admin-agent.html`

### งานที่ 2: ปรับ Auth และ Guards

ผลลัพธ์:

- login ใช้ POST ไม่ส่ง password ใน URL
- frontend เก็บ session token/expiry แทน role/id ลอย ๆ
- guard ไม่ block หน้า login/register
- Apps Script validate session/role ทุก protected action

ไฟล์ที่ต้องแก้:

- `agent-login.html`
- `admin-login.html`
- `agent-register.html`
- `js/login.js`
- `js/admin-login.js`
- `js/agent-guard.js`
- `js/admin-guard.js`
- Apps Script project

### งานที่ 3: Version Control Apps Script และ Google Sheets Schema

ผลลัพธ์:

- เพิ่ม source Apps Script เข้า repo เช่น `apps-script/`
- มี `appsscript.json`
- มี sheet schema/bootstrap script
- action contract ตรงกับ frontend

ไฟล์ที่ต้องเพิ่ม/แก้:

- `apps-script/appsscript.json`
- `apps-script/Code.gs`
- `apps-script/Auth.gs`
- `apps-script/Agents.gs`
- `apps-script/Training.gs`
- `apps-script/Exams.gs`
- `apps-script/Quotations.gs`
- `apps-script/Orders.gs`
- `apps-script/Withdraws.gs`
- `apps-script/AuditLogs.gs`
- `docs/ssbms-master-data-model.md`

### งานที่ 4: ทำ Agent Lifecycle ให้เป็นข้อมูลกลางจริง

ผลลัพธ์:

- register -> training -> exam -> waiting -> approved flow ทำงานจาก Sheets ทั้งหมด
- `admin-agents-list.html` ดึง agent list จริง
- admin approve/reject/suspend มี audit log

ไฟล์ที่ต้องแก้:

- `agent-register.html`
- `agent-learning.html`
- `agent-exam.html`
- `agent-waiting.html`
- `agent-dashboard.html`
- `admin-agent.html`
- `admin-agents-list.html`
- `js/register.js`
- `js/login.js`
- `js/agent-api.js`
- `js/admin-actions.js`
- Apps Script project

### งานที่ 5: ย้าย Quotation/Order จาก localStorage ไป Sheets

ผลลัพธ์:

- agent สร้าง quotation เข้า Sheets
- customer signature เก็บเป็น record/Drive URL
- admin quotation list ดึงจาก Sheets
- approve quotation แล้วสร้าง order กลาง
- agent/admin order list sync ข้ามเครื่อง

ไฟล์ที่ต้องแก้:

- `agent-products.html`
- `agent-quotation.html`
- `agent-orders.html`
- `agent-order-detail.html`
- `admin-quotations.html`
- `admin-orders.html`
- `js/sbos-api.js`
- `js/sbos-core.js`
- Apps Script project

### งานที่ 6: แก้ระบบสอบให้ปลอดภัย

ผลลัพธ์:

- backend เก็บ question bank/answers
- frontend รับเฉพาะคำถามหรือ attempt id
- ส่ง answers ให้ backend ตรวจ
- limit attempts และบันทึก submittedAt/userAgent

ไฟล์ที่ต้องแก้:

- `agent-exam.html`
- อาจแยกเป็น `js/agent-exam.js`
- Apps Script project
- `docs/ssbms-master-data-model.md`

### งานที่ 7: Cleanup Navigation, Stub, Missing Assets

ผลลัพธ์:

- ไม่มี link 404 ใน nav หลัก
- stub pages ถูกทำให้ใช้งานได้จริงหรือซ่อนจากเมนู
- path script/asset ถูกต้อง

ไฟล์ที่ต้องแก้:

- `admin-dashboard.html`
- `admin-orders.html`
- `admin-quotations.html`
- `agent-dashboard.html`
- `agent-products.html`
- `news.html`
- `ssb-system.html`
- `survival-compare.html`
- `ssb-system-mobile.html`
- `agent-history.html`
- `agent-leads.html`
- `agent-tax.html`
- `agent-team.html`

### งานที่ 8: แยก Inline JS/CSS ที่เสี่ยงเป็น Modules

ผลลัพธ์:

- ลด duplication
- API/session helpers อยู่ที่เดียว
- หน้าใหญ่โหลดเร็วขึ้นและดูแลได้ง่ายขึ้น

ไฟล์ที่ต้องแก้/เพิ่ม:

- `agent-dashboard.html` -> `js/agent-dashboard.js`
- `agent-learning.html` -> `js/agent-learning.js`
- `agent-exam.html` -> `js/agent-exam.js`
- `admin-agent.html` -> `js/admin-agent.js`
- `admin-orders.html` -> `js/admin-orders.js`
- `admin-quotations.html` -> `js/admin-quotations.js`
- CSS ที่เกี่ยวข้องใน `css/`

## 18. ลำดับแนะนำสำหรับ Phase 1

1. ดึง/สร้าง Apps Script source เข้า repo และยืนยัน Google Sheets schema
2. รวม API config และ action contract
3. แก้ auth: POST login, session token, guards
4. ทำ agent lifecycle จริงให้จบก่อน: register/login/training/exam/admin approve/dashboard
5. แก้ exam scoring ให้ backend ตรวจ
6. ย้าย quotation/order จาก localStorage ไป Apps Script/Sheets
7. ทำ admin dashboard/list จากข้อมูลกลาง
8. cleanup broken links/stubs/assets
9. แยก inline JS/CSS และเพิ่ม smoke tests/manual QA checklist

## 19. จุดที่ต้องรอการยืนยันก่อนเริ่มเขียนโค้ด

1. ต้องการใช้ Apps Script endpoint ตัวใดเป็น production หลัก หรือจะสร้าง endpoint ใหม่สำหรับ SBOS Phase 1
2. มีสิทธิ์เข้าถึง source Apps Script/Google Sheet ปัจจุบันหรือไม่
3. ต้องการให้ Phase 1 ครอบคลุม quotation/order ทันที หรือเริ่มจาก agent lifecycle ก่อน
4. policy การ login ต้องการแบบ session token ใน Sheets/CacheService หรือใช้ OAuth/Google Identity ในอนาคต
5. หน้า stub ใดควรทำจริงใน Phase 1 และหน้าใดควรซ่อนจากเมนูชั่วคราว
