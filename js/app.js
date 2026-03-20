// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {

  const techHero = document.getElementById("techHero");
  const logoBtn = document.getElementById("logoMenuButton");

  const infoPopup = document.getElementById("infoPopup");
  const companyPopup = document.getElementById("companyPopup");

  const infoTitle = document.getElementById("infoTitle");
  const infoSubtitle = document.getElementById("infoSubtitle");
  const infoLead = document.getElementById("infoLead");
  const infoVideo = document.getElementById("infoVideo");

  // ================= DATA =================
  const popupData = {
    ssbmobile: {
      title: "Stealth Safety Bank Mobile System",
      subtitle: "ระบบความปลอดภัยทางการเงินเชิงโครงสร้าง",
      lead: "ระบบที่ออกแบบมาเพื่อตัดความเสี่ยงตั้งแต่ต้นทาง",
      video: "https://www.youtube-nocookie.com/embed/mD9i39genW8"
    },
    stealthbank: {
      title: "Stealth Safety Bank",
      subtitle: "เครื่องเก็บเงิน",
      lead: "แยกการใช้งานออกจากโลกภายนอก",
      video: "https://www.youtube-nocookie.com/embed/mD9i39genW8"
    },
    safetybook: {
      title: "Stealth Safety Book",
      subtitle: "กล่องกันสัญญาณ",
      lead: "ป้องกันการเข้าถึง",
      video: "https://www.youtube-nocookie.com/embed/mD9i39genW8"
    }
  };

  // ================= MENU =================
  logoBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    techHero?.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!techHero?.contains(e.target)) {
      techHero?.classList.remove("open");
    }
  });

  // ================= POPUP OPEN =================
  document.querySelectorAll("[data-popup]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      const key = btn.getAttribute("data-popup");
      const data = popupData[key];
      if (!data) return;

      infoTitle.textContent = data.title;
      infoSubtitle.textContent = data.subtitle;
      infoLead.textContent = data.lead;

      infoVideo.src = data.video;

      openPopup(infoPopup);
    });
  });

  // ================= POPUP =================
  function openPopup(el){
    if(!el) return;
    el.style.display = "flex";
    setTimeout(()=> el.classList.add("show"),10);
    document.body.style.overflow = "hidden";
  }

  function closePopup(el){
    if(!el) return;
    el.classList.remove("show");
    setTimeout(()=>{
      el.style.display = "none";
      document.body.style.overflow = "";
    },200);
  }

  // ================= CLOSE =================
  document.getElementById("closeInfoPopupTop")?.addEventListener("click", () => {
    infoVideo.src = "";
    closePopup(infoPopup);
  });

  document.getElementById("closeInfoPopupBottom")?.addEventListener("click", () => {
    infoVideo.src = "";
    closePopup(infoPopup);
  });

  infoPopup?.addEventListener("click", (e)=>{
    if(e.target === infoPopup){
      infoVideo.src = "";
      closePopup(infoPopup);
    }
  });

  // ================= COMPANY =================
  document.getElementById("contactButton")?.addEventListener("click", ()=>{
    openPopup(companyPopup);
  });

  document.getElementById("closeCompanyPopupTop")?.addEventListener("click", ()=>{
    closePopup(companyPopup);
  });

  document.getElementById("closeCompanyPopupBottom")?.addEventListener("click", ()=>{
    closePopup(companyPopup);
  });

  companyPopup?.addEventListener("click", (e)=>{
    if(e.target === companyPopup){
      closePopup(companyPopup);
    }
  });

  // ================= CHAT =================
  const chatWidget = document.getElementById("chatWidget");
  const chatToggle = document.getElementById("chatToggle");

  chatToggle?.addEventListener("click",(e)=>{
    e.stopPropagation();
    chatWidget.classList.toggle("open");
  });

  document.addEventListener("click",(e)=>{
    if(!chatWidget?.contains(e.target)){
      chatWidget?.classList.remove("open");
    }
  });

});
