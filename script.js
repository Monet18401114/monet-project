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
      home: "index.html",
      about: "about.html",
      coloring: "coloring.html",
      matching: "matching.html",
      notice: "notice.html",
      center: "center.html",
      paperJoin: "paper-login.html",
      colorJoin: "color-login.html",
      language: "language.html"
    };

    if (routes[page]) {
      window.location.href = routes[page];
    }
  });
});
