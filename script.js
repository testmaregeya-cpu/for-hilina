const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const arena = document.getElementById("arena");
const question = document.getElementById("question");
const success = document.getElementById("success");
const restartBtn = document.getElementById("restart");

// Text flow
const magicTexts = [
  "Will you be my Valentine?",
  "Are you really sure?",
  "Hmm… that didn’t feel like a No 😳",
  "Your heart already knows 💗",
  "This is slowly becoming a Yes…",
  "Hilina Mesfin, you’re smiling right now 😌",
  "Okay… just tap Yes 💖",
  "Hilina Mesfin says YES 💘"
];

let textIndex = 0;
let lastTextChange = 0;

// Floating lights
for (let i = 0; i < 40; i++) {
  const light = document.createElement("div");
  light.className = "light";
  light.style.left = Math.random() * 100 + "vw";
  light.style.animationDuration = 5 + Math.random() * 6 + "s";
  document.body.appendChild(light);
}

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

// No button evade
function evade(x, y) {
  const a = arena.getBoundingClientRect();
  const b = noBtn.getBoundingClientRect();

  let dx = (b.left + b.width / 2) - x;
  let dy = (b.top + b.height / 2) - y;
  const d = Math.hypot(dx, dy) || 1;

  dx = (dx / d) * 90;
  dy = (dy / d) * 90;

  let nx = b.left + dx - a.left;
  let ny = b.top + dy - a.top;

  nx = clamp(nx, 0, a.width - b.width);
  ny = clamp(ny, 0, a.height - b.height);

  noBtn.style.left = nx + "px";
  noBtn.style.top = ny + "px";
}

// Change text
function changeText() {
  const now = Date.now();
  if (now - lastTextChange < 800) return;

  if (textIndex < magicTexts.length) {
    question.style.opacity = 0;
    setTimeout(() => {
      question.textContent = magicTexts[textIndex++];
      question.style.opacity = 1;
    }, 180);
    lastTextChange = now;
  }
}

// Events
arena.addEventListener("mousemove", e => {
  evade(e.clientX, e.clientY);
  changeText();
});

arena.addEventListener("touchmove", e => {
  const t = e.touches[0];
  evade(t.clientX, t.clientY);
  changeText();
}, { passive: true });

// Yes click
yesBtn.addEventListener("click", () => {
  success.classList.add("show");
  launchBalloons();

  setTimeout(() => {
    const flower = document.getElementById("flower");
    flower.classList.add("show");

    setTimeout(() => {
      restartBtn.classList.remove("hidden");
      restartBtn.classList.add("show");
    }, 2000);

  }, 1800);
});

// Replay
restartBtn.addEventListener("click", () => {
  document.getElementById("flower").classList.remove("show");
  restartBtn.classList.remove("show");
  restartBtn.classList.add("hidden");
  success.classList.remove("show");

  question.textContent = "Hilina Mesfin, will you be my Valentine?";
  textIndex = 0;

  noBtn.style.left = "60%";
  noBtn.style.top = "20px";
});

// Balloons
function launchBalloons() {
  const box = document.getElementById("balloons");
  const colors = ["#ff4d8d", "#ff9ec4", "#fff"];

  for (let i = 0; i < 25; i++) {
    const b = document.createElement("div");
    b.className = "balloon";
    b.style.left = Math.random() * 100 + "vw";
    b.style.background = colors[Math.floor(Math.random() * colors.length)];
    box.appendChild(b);
    setTimeout(() => b.remove(), 4000);
  }
}

