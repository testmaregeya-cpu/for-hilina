:root {
  --pink: #ff4d8d;
  --rose: #ff9ec4;
  --bg1: #0f0c29;
  --bg2: #302b63;
  --bg3: #24243e;
  --glass: rgba(255,255,255,0.14);
}

* {
  box-sizing: border-box;
  font-family: system-ui, sans-serif;
}

body {
  margin: 0;
  min-height: 100vh;
  background: linear-gradient(120deg, var(--bg1), var(--bg2), var(--bg3));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: white;
}

/* Floating lights */
.light {
  position: fixed;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, #fff, transparent);
  opacity: 0.6;
  animation: float 8s linear infinite;
}

@keyframes float {
  from { transform: translateY(110vh); }
  to { transform: translateY(-120vh); }
}

/* Card */
.card {
  width: min(420px, 92vw);
  padding: 26px 22px 30px;
  border-radius: 26px;
  background: var(--glass);
  backdrop-filter: blur(18px);
  box-shadow: 0 30px 80px rgba(0,0,0,0.45);
  text-align: center;
  position: relative;
  transition: opacity 0.4s ease;
}

.card.hide {
  opacity: 0;
  pointer-events: none;
}

/* Hero text */
.hero-text {
  height: 180px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 800;
  background: linear-gradient(135deg, var(--pink), var(--rose));
  box-shadow: 0 20px 50px rgba(255,77,141,0.45);
  margin-bottom: 16px;
  animation: floatText 3s ease-in-out infinite;
}

@keyframes floatText {
  50% { transform: translateY(-6px); }
}

h1 {
  font-size: 22px;
  min-height: 60px;
}

.signature {
  font-size: 13px;
  opacity: 0.8;
  margin-bottom: 18px;
}

/* Buttons */
.buttons {
  position: relative;
  height: 120px;
}

button {
  border: none;
  padding: 14px 26px;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
  color: white;
  font-size: 15px;
}

#yes {
  background: linear-gradient(135deg, var(--pink), var(--rose));
}

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

