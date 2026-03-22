if (techHero) {
    techHero.classList.remove("open");
  }

  syncHeroLabels();
  buildEnergyLines();
  renderAgentResults("");

  bindLanguageButtons();
  bindAgentSearch();
  bindHeroMenu();
  bindPopups();
  bindChatWidget();
  bindSounds();
  bindThemeToggle();
  bindGlobalEvents();

if (popupNav) {
  popupNav.querySelectorAll("[data-step]").forEach(btn => {
    btn.addEventListener("click", () => {
      popupNav.querySelectorAll(".popup-pro-nav-btn").forEach(item => {
        item.classList.remove("active");
      });
      btn.classList.add("active");
      renderPopupStep(btn.dataset.step);
    });
  });
}
  
  if (popupNav) {
    popupNav.querySelectorAll("[data-step]").forEach(btn => {
      btn.addEventListener("click", () => {
        renderPopupStep(btn.dataset.step);
      });
    });
  }

  if (popupNextStep) {
    popupNextStep.addEventListener("click", () => {
      const next = popupNextStep.dataset.next;
      if (next) renderPopupStep(next);
    });
  }

  syncActiveLangFromCookie();
});

// ===== POPUP SYSTEM V4 =====

const popup = document.getElementById("popupSystem");
const popupTitle = document.getElementById("popupTitle");
const popupSubtitle = document.getElementById("popupSubtitle");
const popupShort = document.getElementById("popupShort");
const popupFull = document.getElementById("popupFull");
const popupVideo = document.getElementById("popupVideoFrame");

const closeBtn = document.getElementById("popupCloseBtn");
const modeBtns = document.querySelectorAll(".mode-btn");

// 🔥 OPEN
function openPopupV4(data){
  popupTitle.textContent = data.title;
  popupSubtitle.textContent = data.subtitle;
  popupShort.innerHTML = data.short;
  popupFull.innerHTML = data.full;
  popupVideo.src = data.video;

  popup.classList.add("show");
}

// ❌ CLOSE
function closePopupV4(){
  popup.classList.remove("show");
  popupVideo.src = "";
}

closeBtn.addEventListener("click", closePopupV4);

// 🔘 MODE SWITCH
modeBtns.forEach(btn=>{
  btn.addEventListener("click", ()=>{
    modeBtns.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");

    if(btn.dataset.mode === "short"){
      popupShort.classList.remove("hidden");
      popupFull.classList.add("hidden");
    }else{
      popupShort.classList.add("hidden");
      popupFull.classList.remove("hidden");
    }
  });
});
