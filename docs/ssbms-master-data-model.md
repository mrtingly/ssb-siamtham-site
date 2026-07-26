# SSBMS Agent & Admin ERP — Master Data Model

เอกสารนี้เป็นโครงสร้างข้อมูลกลางสำหรับเชื่อม Agent ERP, Admin ERP, Google Apps Script และ Google Sheets ในครั้งเดียวภายหลัง

## หลักการ

- ใช้ `id` แบบไม่ซ้ำสำหรับทุกตาราง
- เก็บ `createdAt`, `updatedAt`, `createdBy`, `status` ทุกธุรกรรม
- หลังลูกค้าเซ็นใบเสนอราคา ให้ล็อกข้อมูลสินค้า ราคา สี ความจุ และยอดรวม
- ห้ามแก้ไขเอกสารที่ลงนามแล้ว ให้ยกเลิกใบเดิมและสร้างใบใหม่
- เก็บ Audit Log แยกทุกการเปลี่ยนแปลง

## Google Sheets ที่ต้องสร้าง

### 1. Agents

| Field | Description |
|---|---|
| agentId | รหัสตัวแทน เช่น AG000001 |
| username | ชื่อผู้ใช้ |
| fullName | ชื่อ-นามสกุล |
| phone | เบอร์โทร |
| email | อีเมล |
| parentAgentId | รหัสแม่ทีม |
| teamSide | L / R |
| role | agent / leader / admin |
| trainingStatus | not_started / in_progress / passed |
| examStatus | not_started / passed / failed |
| approvalStatus | pending / approved / suspended |
| joinedAt | วันที่สมัคร |
| approvedAt | วันที่อนุมัติ |
| createdAt | วันที่สร้าง |
| updatedAt | วันที่แก้ไข |

### 2. Customers

| Field | Description |
|---|---|
| customerId | รหัสลูกค้า |
| fullName | ชื่อลูกค้า |
| phone | เบอร์โทร |
| email | อีเมล |
| address | ที่อยู่ |
| province | จังหวัด |
| agentId | ตัวแทนผู้ดูแล |
| pdpaConsent | สถานะยินยอม |
| createdAt | วันที่สร้าง |
| updatedAt | วันที่แก้ไข |

### 3. Products

| Field | Description |
|---|---|
| productId | รหัสสินค้า |
| brand | Samsung / Apple / iPad |
| series | Galaxy A / S / Z / iPhone / iPad mini |
| model | รุ่นสินค้า |
| storage | ความจุ |
| colorCode | รหัสสี |
| colorName | ชื่อสีทางการ |
| phonePrice | ราคาปัจจุบัน |
| serviceFee | ค่าดำเนินการ SSBMS 45,000 บาท |
| vatRate | VAT 7% |
| stockStatus | ready / low / out / verify |
| priceUpdatedAt | วันที่อัปเดตราคา |
| active | เปิดขายหรือไม่ |

### 4. Quotations

| Field | Description |
|---|---|
| quotationId | เลขที่ใบเสนอราคา เช่น QT-20260727-0001 |
| agentId | ตัวแทนผู้สร้าง |
| customerId | ลูกค้า |
| productId | สินค้า |
| brand | แบรนด์ |
| model | รุ่น |
| storage | ความจุ |
| colorName | สี |
| phonePrice | ราคาเครื่อง |
| serviceFee | ค่าดำเนินการ |
| subtotal | ยอดก่อน VAT |
| vatAmount | VAT |
| grandTotal | ยอดสุทธิ |
| priceDate | วันที่ตรวจสอบราคา |
| quotationStatus | draft / sent / customer_signed / cancelled / expired |
| customerSignature | ลายเซ็นแบบ Data URL หรือ Drive URL |
| signedName | ชื่อผู้ลงนาม |
| signedAt | วันเวลาที่เซ็น |
| signedUserAgent | Browser/Device |
| consent1 | รับทราบรายละเอียดสินค้า |
| consent2 | รับทราบราคาปัจจุบัน |
| consent3 | รับทราบค่าดำเนินการ SSBMS |
| consent4 | ยินยอมให้บริษัทจัดเตรียมสินค้า |
| lockedAt | วันเวลาที่ล็อกเอกสาร |
| createdAt | วันที่สร้าง |
| updatedAt | วันที่แก้ไข |

### 5. Orders

| Field | Description |
|---|---|
| orderId | เลขที่คำสั่งซื้อ SO-... |
| quotationId | อ้างอิงใบเสนอราคา |
| customerId | ลูกค้า |
| agentId | ตัวแทน |
| status | pending_payment / pending_admin / approved / installing / ready_to_ship / delivered / completed / cancelled |
| paymentStatus | unpaid / partial / paid / refunded |
| paymentAmount | ยอดชำระ |
| paymentReference | เลขอ้างอิง |
| approvedBy | ผู้อนุมัติ |
| approvedAt | วันที่อนุมัติ |
| createdAt | วันที่สร้าง |
| updatedAt | วันที่แก้ไข |

### 6. InstallJobs

| Field | Description |
|---|---|
| installJobId | รหัสงานติดตั้ง |
| orderId | คำสั่งซื้อ |
| ssbmSerial | Serial เครื่อง SSBM |
| safetyBookSerial | Serial Safety Book |
| simNumber | หมายเลข SIM |
| simExpiry | วันหมดอายุ SIM |
| spcCode | รหัส SPC |
| qrCodeRef | อ้างอิง QR |
| assignedTo | ผู้รับผิดชอบ |
| status | queued / preparing / configuring / qc / ready / delivered |
| qcBy | ผู้ตรวจ QC |
| qcAt | วันเวลา QC |
| deliveredAt | วันส่งมอบ |

### 7. SPCCases

| Field | Description |
|---|---|
| caseId | เลขที่เคส |
| customerId | ลูกค้า |
| orderId | ระบบที่เกี่ยวข้อง |
| spcCode | รหัส SPC |
| category | ประเภทเหตุการณ์ |
| description | รายละเอียด |
| status | open / verifying / responded / closed |
| openedAt | เวลาเปิดเคส |
| responseAt | เวลาตอบกลับ |
| closedAt | เวลาปิดเคส |
| handledBy | เจ้าหน้าที่ SPC |

### 8. Commissions

| Field | Description |
|---|---|
| commissionId | รหัสรายการ |
| orderId | คำสั่งซื้อ |
| agentId | ผู้ได้รับ |
| commissionType | direct / pair / matching / bonus |
| amount | จำนวนเงิน |
| status | pending / approved / paid / reversed |
| approvedAt | วันที่อนุมัติ |
| paidAt | วันที่จ่าย |

### 9. Training

| Field | Description |
|---|---|
| trainingId | รหัสการอบรม |
| agentId | ตัวแทน |
| courseId | หลักสูตร |
| progress | เปอร์เซ็นต์ |
| completedAt | วันที่เรียนจบ |
| status | not_started / in_progress / completed |

### 10. Exams

| Field | Description |
|---|---|
| examResultId | รหัสผลสอบ |
| agentId | ตัวแทน |
| examId | ข้อสอบ |
| score | คะแนน |
| result | passed / failed |
| submittedAt | วันที่สอบ |
| approvedBy | ผู้อนุมัติ |

### 11. AuditLogs

| Field | Description |
|---|---|
| logId | รหัส Log |
| actorId | ผู้กระทำ |
| actorRole | agent / customer / admin / system |
| action | create / update / sign / approve / cancel / deliver |
| entityType | quotation / order / agent / customer / install_job |
| entityId | รหัสรายการ |
| beforeData | JSON ก่อนแก้ |
| afterData | JSON หลังแก้ |
| ipAddress | IP ถ้ามี |
| userAgent | Browser/Device |
| createdAt | วันเวลา |

## Workflow หลัก

1. Agent เลือกสินค้าและสร้าง Quotation
2. Customer ตรวจสอบและลงลายมือชื่อ
3. Quotation เปลี่ยนเป็น `customer_signed` และล็อกข้อมูล
4. Admin ตรวจสอบและสร้าง Order
5. Order ผ่านการชำระเงินและอนุมัติ
6. ระบบสร้าง InstallJob
7. เตรียม SSBM, Safety Book, SIM, SPC และ QC
8. ส่งมอบและปิดงาน
9. สร้าง Commission หลังสถานะ Completed

## API Actions ที่ Google Apps Script ต้องรองรับ

- `loginAgent`
- `getProducts`
- `getProductPrices`
- `createCustomer`
- `createQuotation`
- `signQuotation`
- `listAgentQuotations`
- `listAdminQuotations`
- `approveQuotation`
- `createOrder`
- `updateOrderStatus`
- `createInstallJob`
- `updateInstallJob`
- `createSPCCase`
- `calculateCommission`
- `getAgentDashboard`
- `getAdminDashboard`
- `writeAuditLog`

## Security Rules

- Agent อ่านได้เฉพาะข้อมูลของตนเองและทีมตามสิทธิ์
- Customer เปิดได้เฉพาะเอกสารผ่าน Token แบบหมดอายุ
- Admin เท่านั้นที่อนุมัติราคา คำสั่งซื้อ และงานติดตั้ง
- ลายเซ็นและเอกสารที่ล็อกแล้วห้ามแก้ไข
- ทุก Write Action ต้องบันทึก AuditLogs
