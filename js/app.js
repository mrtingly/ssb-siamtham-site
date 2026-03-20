const popup = document.getElementById("popup");
const openBtn = document.getElementById("openPopup");
const closeBtn = document.getElementById("closePopup");
const video = document.getElementById("video");
const content = document.getElementById("content");

const data = {
  video: "https://www.youtube.com/embed/mD9i39genW8",
  html: `
    <h2>Stealth Safety Bank</h2>
    <p>ระบบเก็บเงินที่ปลอดภัย</p>
    <ul>
      <li>ไม่ใช้ social</li>
      <li>ไม่ใช้ browser</li>
      <li>โอนไป Flare เท่านั้น</li>
    </ul>
  `
};

openBtn.onclick = () => {
  video.src = data.video;
  content.innerHTML = data.html;
  popup.classList.remove("hidden");
};

closeBtn.onclick = () => {
  popup.classList.add("hidden");
  video.src = "";
};

popup.onclick = (e)=>{
  if(e.target === popup){
    popup.classList.add("hidden");
    video.src="";
  }
};
