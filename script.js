// Futuristic background animation (neon particles)
// Glitch on hover, smooth scroll, and form UX

// ---- Neon Particles BG Animation ----
const bg = document.getElementById("bg-anim");
const canvas = document.createElement("canvas");
canvas.style.width = "100vw";
canvas.style.height = "100vh";
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-2";
canvas.style.pointerEvents = "none";
bg.appendChild(canvas);

const ctx = canvas.getContext("2d");
let w, h, particles;

function resize() {
  w = canvas.width = window.innerWidth * window.devicePixelRatio;
  h = canvas.height = window.innerHeight * window.devicePixelRatio;
}
window.addEventListener("resize", resize);
resize();

function Particle() {
  this.x = Math.random() * w;
  this.y = Math.random() * h;
  this.r = Math.random() * 2 + 1;
  this.alpha = Math.random() * 0.4 + 0.3;
  this.dx = (Math.random() - 0.5) * 0.8;
  this.dy = (Math.random() - 0.5) * 0.8;
  this.color = Math.random() > 0.5 ? "#0ff0fc" : "#00ffe7";
}
function createParticles(num) {
  particles = [];
  for (let i = 0; i < num; i++) particles.push(new Particle());
}
createParticles(90);

function animateParticles() {
  ctx.clearRect(0, 0, w, h);
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * window.devicePixelRatio, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 18;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    // Move
    p.x += p.dx;
    p.y += p.dy;
    // Bounce
    if (p.x < 0 || p.x > w) p.dx *= -1;
    if (p.y < 0 || p.y > h) p.dy *= -1;
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ---- Smooth Scroll for navigation ----
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ---- Glitch Flicker on Hover for Name ----
const glitch = document.querySelector('.glitch');
glitch.addEventListener('mouseover', () => {
  glitch.classList.add('glitch-flicker');
  setTimeout(() => glitch.classList.remove('glitch-flicker'), 480);
});

// ---- Contact Form UX ----
document.getElementById("contact-form").addEventListener("submit", function(e){
  e.preventDefault();
  this.querySelector("button").disabled = true;
  this.querySelector("button").textContent = "Sending...";
  setTimeout(() => {
    this.querySelector("button").textContent = "Sent!";
    setTimeout(() => {
      this.reset();
      this.querySelector("button").textContent = "Send";
      this.querySelector("button").disabled = false;
    }, 1800);
  }, 1200);
});

// ---- Vanilla Tilt (3D cards) ----
if (window.VanillaTilt) {
  VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 18,
    speed: 600,
    glare: true,
    "max-glare": 0.31,
    gyroscope: true,
    scale: 1.06,
  });
}