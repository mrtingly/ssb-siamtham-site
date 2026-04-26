const data = {
  f22: {
    title: "F-22 Survival System",
    text:
      "F-22 ลดโอกาสถูกตรวจจับด้วยการควบคุมช่วงเปิดเผยตัวให้สั้นที่สุด เปิดช่องอาวุธเพียงชั่วคราว ยิงแล้วเปลี่ยนตำแหน่ง พร้อมระบบเอาตัวรอดหลายชั้น",
    attack: [
      "Radar Detection",
      "Missile Lock",
      "SAM Threat",
      "Moment of Exposure"
    ],
    defense: [
      "Stealth Shape",
      "Internal Weapon Bay",
      "Sensor Fusion",
      "Flare / Chaff",
      "High Maneuverability"
    ],
    details: [
      {
        title: "เปิดเผยตัวสั้น",
        desc: "ช่วงเปิดช่องอาวุธเกิดขึ้นสั้นมาก เพื่อลดโอกาสถูกตรวจจับ"
      },
      {
        title: "ยิงแล้วเปลี่ยนตำแหน่ง",
        desc: "หลังโจมตีจะไม่อยู่ในเส้นทางเดิมเพื่อลดโอกาสถูกล็อกเป้า"
      },
      {
        title: "ระบบหลอกเป้า",
        desc: "ใช้ flare, chaff และการหลบหลีกเพื่อลดโอกาสถูกยิงโดน"
      }
    ]
  },

  ssb: {
    title: "SSB Survival System",
    text:
      "SSB คือสมาร์ทโฟนที่ถูกลดช่องทางเสี่ยง เหลือเฉพาะแอปธนาคารและระบบความปลอดภัยของเครื่อง เมื่อเปิดใช้งานถือเป็นช่วงเปิดเผยตัว จึงต้องใช้ให้สั้น ปิดทันที และกลับสู่โหมดล่องหน",
    attack: [
      "Phishing",
      "Malware App",
      "Remote Control App",
      "User Exposure",
      "Banking Attack Surface"
    ],
    defense: [
      "Banking App Only",
      "OS Security",
      "Reduced Apps",
      "Short Usage Window",
      "Power Off",
      "Safety Book"
    ],
    details: [
      {
        title: "ลดช่องทางโจมตี",
        desc: "ตัดแอปและการใช้งานที่ไม่จำเป็น ลดพื้นที่เสี่ยงของเครื่อง"
      },
      {
        title: "เปิดใช้เท่าที่จำเป็น",
        desc: "เปิดเครื่องเฉพาะเวลาทำธุรกรรม แล้วปิดทันทีหลังใช้งาน"
      },
      {
        title: "พึ่งระบบความปลอดภัยหลัก",
        desc: "ใช้ความปลอดภัยของสมาร์ทโฟนและแอปธนาคารเป็นแนวป้องกันหลัก"
      }
    ]
  }
};

const buttons = document.querySelectorAll(".mode-btn");
const cards = document.querySelectorAll(".system-card");

const attackList = document.getElementById("attackList");
const defenseList = document.getElementById("defenseList");
const detailTitle = document.getElementById("detailTitle");
const detailText = document.getElementById("detailText");
const detailGrid = document.getElementById("detailGrid");

function renderMode(mode) {
  const item = data[mode];

  buttons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.mode === mode);
  });

  cards.forEach(card => {
    card.classList.toggle("active-card", card.dataset.target === mode);
  });

  attackList.innerHTML = item.attack.map(text => `<li>${text}</li>`).join("");
  defenseList.innerHTML = item.defense.map(text => `<li>${text}</li>`).join("");

  detailTitle.textContent = item.title;
  detailText.textContent = item.text;

  detailGrid.innerHTML = item.details.map(detail => `
    <div class="detail-item">
      <strong>${detail.title}</strong>
      <span>${detail.desc}</span>
    </div>
  `).join("");
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    renderMode(btn.dataset.mode);
  });
});

cards.forEach(card => {
  card.addEventListener("click", () => {
    const mode = card.dataset.target;
    renderMode(mode);

    document.getElementById("detailPanel").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

renderMode("f22");
