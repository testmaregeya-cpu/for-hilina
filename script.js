// ===== ELEMENTS =====
const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const arena = document.getElementById("arena");
const question = document.getElementById("question");
const success = document.getElementById("success");

// ===== MAGICAL TEXT FLOW =====
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

// ===== FLOATING LIGHTS (BACKGROUND MAGIC) =====
for (let i = 0; i < 45; i++) {
  const light = document.createElement("div");
  light.className = "light";
  light.style.left = Math.random() * 100 + "vw";
  light.style.animationDuration = 5 + Math.random() * 6 + "s";
  document.body.appendChild(light);
}

// ===== UTIL =====
function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

// ===== NO BUTTON EVADE LOGIC =====
function evade(pointerX, pointerY) {
  const arenaRect = arena.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const btnCenterX = btnRect.left + btnRect.width / 2;
  const btnCenterY = btnRect.top + btnRect.height / 2;

  let dx = btnCenterX - pointerX;
  let dy = btnCenterY - pointerY;

  const distance = Math.hypot(dx, dy) || 1;
  const force = 95;

  dx = (dx / distance) * force;
  dy = (dy / distance) * force;

  let newX = btnRect.left + dx - arenaRect.left;
  let newY = btnRect.top + dy - arenaRect.top;

  newX = clamp(newX, 0, arenaRect.width - btnRect.width);
  newY = clamp(newY, 0, arenaRect.height - btnRect.height);

  noBtn.style.left = newX + "px";
  noBtn.style.top = newY + "px";
}

// ===== TEXT MORPH WHEN CLOSE =====
function changeTextMagically() {
  const now = Date.now();
  if (now - lastTextChange < 800) return;

  if (textIndex < magicTexts.length) {
    question.style.opacity = 0;
    setTimeout(() => {
      question.textContent = magicTexts[textIndex];
      question.style.opacity = 1;
      textIndex++;
    }, 180);
    lastTextChange = now;
  }
}

// ===== PROXIMITY CHECK =====
function checkProximity(x, y) {
  const btnRect = noBtn.getBoundingClientRect();
  const dist = Math.hypot(
    x - (btnRect.left + btnRect.width / 2),
    y - (btnRect.top + btnRect.height / 2)
  );

  if (dist < 90) {
    evade(x, y);
    changeTextMagically();
  }
}

// ===== DESKTOP =====
arena.addEventListener("mousemove", (e) => {
  checkProximity(e.clientX, e.clientY);
});

// ===== MOBILE =====
arena.addEventListener(
  "touchmove",
  (e) => {
    const t = e.touches[0];
    checkProximity(t.clientX, t.clientY);
  },
  { passive: true }
);

// ===== YES CLICK (DRAMATIC ENDING) =====
yesBtn.addEventListener("click", () => {
  success.classList.add("show");
  launchBalloons();

  // flower reveal after pause
  setTimeout(() => {
    document.getElementById("flower").classList.add("show");
  }, 1800);
});

// ===== BALLOONS =====
function launchBalloons() {
  const container = document.getElementById("balloons");
  const colors = ["#ff4d8d", "#ff9ec4", "#ffd1e6", "#ffffff"];

  for (let i = 0; i < 28; i++) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.left = Math.random() * 100 + "vw";
    balloon.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    balloon.style.animationDelay = Math.random() * 0.8 + "s";
    container.appendChild(balloon);

    setTimeout(() => balloon.remove(), 4200);
  }
}
