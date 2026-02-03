const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const arena = document.getElementById("arena");
const question = document.getElementById("question");
const success = document.getElementById("success");

const texts = [
  "Will you be my Valentine?",
  "Are you sure? 😳",
  "Your heart says yes 💗",
  "Almost there…",
  "Hilina Mesfin says YES 💘"
];

let idx = 0;

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function evade(x, y) {
  const a = arena.getBoundingClientRect();
  const b = noBtn.getBoundingClientRect();

  let dx = b.left + b.width / 2 - x;
  let dy = b.top + b.height / 2 - y;
  const d = Math.hypot(dx, dy) || 1;

  dx = (dx / d) * 90;
  dy = (dy / d) * 90;

  let nx = b.left + dx - a.left;
  let ny = b.top + dy - a.top;

  noBtn.style.left = clamp(nx, 0, a.width - b.width) + "px";
  noBtn.style.top = clamp(ny, 0, a.height - b.height) + "px";

  if (idx < texts.length) {
    question.textContent = texts[idx++];
  }
}

arena.addEventListener("mousemove", e => evade(e.clientX, e.clientY));
arena.addEventListener("touchmove", e => {
  const t = e.touches[0];
  evade(t.clientX, t.clientY);
}, { passive: true });

yesBtn.addEventListener("click", () => {
  document.querySelector(".card").classList.add("hide");
  success.classList.add("show");
  launchBalloons();

  setTimeout(() => {
    document.getElementById("flower").classList.add("show");
  }, 1800);
});

function launchBalloons() {
  const c = document.getElementById("balloons");
  const colors = ["#ff4d8d", "#ff9ec4", "#ffd1e6", "#fff"];

  for (let i = 0; i < 25; i++) {
    const b = document.createElement("div");
    b.className = "balloon";
    b.style.left = Math.random() * 100 + "vw";
    b.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.appendChild(b);
    setTimeout(() => b.remove(), 4000);
  }
}

document.getElementById("restart").onclick = () => location.reload();
  // ===== YES CLICK =====
  yesBtn.addEventListener("click", () => {
    card.classList.add("hide");
    success.classList.add("show");
    launchBalloons();

    setTimeout(() => {
      flower.classList.add("show");
    }, 1500);
  });

  // ===== REPLAY =====
  restart.addEventListener("click", () => {
    location.reload();
  });

  // ===== BALLOONS =====
  function launchBalloons() {
    const box = document.getElementById("balloons");
    const colors = ["#ff4d8d", "#ff9ec4", "#ffd1e6", "#ffffff"];

    for (let i = 0; i < 25; i++) {
      const b = document.createElement("div");
      b.className = "balloon";
      b.style.left = Math.random() * 100 + "vw";
      b.style.background = colors[Math.floor(Math.random() * colors.length)];
      box.appendChild(b);
      setTimeout(() => b.remove(), 4000);
    }
  }

});}

#no {
  position: absolute;
  background: rgba(255,255,255,0.2);
  left: 60%;
  top: 20px;
  transition: 0.25s;
}

/* Overlay */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.overlay.show {
  display: flex;
}

.success-card {
  background: white;
  color: #222;
  padding: 26px;
  border-radius: 20px;
}

/* Balloons */
#balloons {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 20;
}

.balloon {
  position: absolute;
  bottom: -80px;
  width: 30px;
  height: 40px;
  border-radius: 50%;
  animation: rise 3.5s ease-in forwards;
}

@keyframes rise {
  to {
    transform: translateY(-120vh);
    opacity: 0;
  }
}

/* Final scene */
.flower {
  position: fixed;
  inset: 0;
  background: linear-gradient(120deg, #0f0c29, #302b63, #24243e);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.8s ease;
  z-index: 100;
}

.flower.show {
  opacity: 1;
  pointer-events: auto;
}

.flower img {
  width: 260px;
  border-radius: 22px;
  margin-bottom: 16px;
}

#restart {
  margin-top: 14px;
  background: linear-gradient(135deg, var(--pink), var(--rose));
}

/* Mobile */
@media (max-width: 480px) {
  .buttons { height: 160px; }
  #yes { margin-bottom: 14px; }
  #no {
    left: 50% !important;
    top: 80px !important;
    transform: translateX(-50%);
  }
}



