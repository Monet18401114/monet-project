const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");
const progressFill = document.getElementById("progressFill");

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play().then(() => {
      playBtn.textContent = "Ⅱ";
    }).catch(() => {
      alert("음원 파일은 아직 등록되지 않았습니다.");
    });
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  const percent = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = percent + "%";
});

audio.addEventListener("ended", () => {
  playBtn.textContent = "▶";
  progressFill.style.width = "0%";
});

progress.addEventListener("click", (event) => {
  if (!audio.duration) return;

  const rect = progress.getBoundingClientRect();
  const clicked = event.clientX - rect.left;
  const ratio = clicked / rect.width;

  audio.currentTime = audio.duration * ratio;
});

prevBtn.addEventListener("click", () => {
  audio.currentTime = 0;
});

nextBtn.addEventListener("click", () => {
  alert("다음 곡은 아직 등록되지 않았습니다.");
});

document.querySelectorAll("[data-page]").forEach((button) => {
  button.addEventListener("click", () => {
    const page = button.dataset.page;

    const routes = {
      home: "#",
      about: "about.html",
      coloring: "coloring.html",
      matching: "matching.html",
      notice: "notice.html",
      center: "center.html",
      paperJoin: "paper-login.html",
      colorJoin: "color-login.html",
      language: "language.html"
    };

    if (page === "home") {
  window.scrollTo({ top: 0, behavior: "smooth" });
  return;
}

if (routes[page]) {
  window.location.href = routes[page];
}
  });
});
/*==========================
LOGIN
==========================*/

const loginOverlay=document.getElementById("loginOverlay");
const loadingOverlay=document.getElementById("loadingOverlay");
const errorOverlay=document.getElementById("errorOverlay");

const captcha=document.getElementById("captchaText");
const captchaInput=document.getElementById("captchaInput");

let race="";
let group="";

function makeCaptcha(){

const chars="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

let code="";

for(let i=0;i<5;i++){

code+=chars[Math.floor(Math.random()*chars.length)];

}

captcha.innerText=code;

}

makeCaptcha();

document
.getElementById("refreshCaptcha")
.onclick=makeCaptcha;

document.querySelectorAll(".raceBtn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".raceBtn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    race = btn.dataset.race;

    if (race === "color") {
      group = "";
      document.querySelectorAll(".groupBtn").forEach(b => {
        b.classList.remove("active");
        b.disabled = true;
        b.style.opacity = "0.35";
      });
    } else {
      document.querySelectorAll(".groupBtn").forEach(b => {
        b.disabled = false;
        b.style.opacity = "1";
      });
    }
  };
});

document.querySelectorAll(".groupBtn").forEach(btn => {
  btn.onclick = () => {
    if (btn.disabled) return;

    document.querySelectorAll(".groupBtn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    group = btn.dataset.group;
  };
});

document
.getElementById("loginBtn")
.onclick=()=>{

if(captchaInput.value!==captcha.innerText){

alert("인증번호가 올바르지 않습니다.");

makeCaptcha();

return;

}

if(race==="paper"&&group==="bad"){

loginOverlay.style.display="none";

errorOverlay.style.display="flex";

let n=5;

const timer=setInterval(()=>{

n--;

document.getElementById("countDown").innerText=n;

if(n===0){

clearInterval(timer);

location.href="https://www.google.com";

}

},1000);

return;

}

loginOverlay.style.display="none";

loadingOverlay.style.display="flex";

let p=0;

const load=setInterval(()=>{

p+=5;

document
.getElementById("loadingBar")
.value=p;

if(p>=100){

clearInterval(load);

loadingOverlay.style.display="none";

}

},60);

};
// 선택 버튼 표시 보정
document.querySelectorAll(".raceBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".raceBtn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    race = btn.dataset.race;

    if (race === "color") {
      group = "";
      document.querySelectorAll(".groupBtn").forEach(b => {
        b.classList.remove("active");
        b.disabled = true;
        b.style.opacity = "0.35";
      });
    }

    if (race === "paper") {
      document.querySelectorAll(".groupBtn").forEach(b => {
        b.disabled = false;
        b.style.opacity = "1";
      });
    }
  });
});

document.querySelectorAll(".groupBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.disabled) return;

    document.querySelectorAll(".groupBtn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    group = btn.dataset.group;
  });
});
// 모네 소개 메뉴 연결
document.querySelectorAll("[data-page='about']").forEach(btn => {
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();

    const target = document.getElementById("monetAboutSection");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, true);
});

// 마네모네 반짝 글자 클릭용
document.querySelectorAll(".secret-spark").forEach(letter => {
  letter.addEventListener("click", () => {
    console.log("모네의 비밀 편지 팝업 연결 예정");
  });
});
const homeSection = document.getElementById("homeSection");
const aboutSection = document.getElementById("monetAboutSection");

function showPage(pageName) {
  if (homeSection) homeSection.style.display = "none";
  if (aboutSection) aboutSection.style.display = "none";

  if (pageName === "home" && homeSection) {
    homeSection.style.display = "block";
  }

  if (pageName === "about" && aboutSection) {
    aboutSection.style.display = "block";
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-page='home']").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    showPage("home");
  }, true);
});

document.querySelectorAll("[data-page='about']").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    showPage("about");
  }, true);
});
// =======================
// Page Switch System
// =======================

const homeSection = document.getElementById("homeSection");
const aboutSection = document.getElementById("monetAboutSection");

function showMonetPage(pageName) {
  if (homeSection) homeSection.style.display = "none";
  if (aboutSection) aboutSection.style.display = "none";

  if (pageName === "home" && homeSection) {
    homeSection.style.display = "block";
  }

  if (pageName === "about" && aboutSection) {
    aboutSection.style.display = "block";
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-page='home']").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    showMonetPage("home");
  }, true);
});

document.querySelectorAll("[data-page='about']").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    showMonetPage("about");
  }, true);
});
