/* ===========================
   TYPEWRITER
=========================== */
const roles = [
  "Kaushal Gangwar",
  "Java Developer",
  "Web Developer",
  "MERN Developer",
];
const twEl = document.getElementById("typewriter");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;
let typingSpeed = 80;
let deletingSpeed = 45;
let pauseTime = 1500;
function typeWriter() {
  const current = roles[roleIndex];
   if (!deleting) {
    twEl.textContent = current.substring(0, charIndex);
    charIndex++;
    if (charIndex > current.length) {
      deleting = true;
      setTimeout(typeWriter, pauseTime);
      return;
    }
  } else {
    twEl.textContent = current.substring(0, charIndex);
    charIndex--;
    if (charIndex < 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      charIndex = 0;
    }
  }
  setTimeout(typeWriter, deleting ? deletingSpeed : typingSpeed);
}
typeWriter();
/* ===========================
   REVEAL ANIMATION
=========================== */
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
      }
    });
  },
  {
    threshold: 0.12,
  },
);
revealEls.forEach((el) => observer.observe(el));
/* ===========================
   MOBILE NAVBAR
=========================== */
const burger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
burger?.addEventListener("click", () => {
  const opened = navLinks.style.display === "flex";
  navLinks.style.display = opened ? "none" : "flex";
  navLinks.style.flexDirection = "column";
  navLinks.style.gap = "12px";
  navLinks.style.padding = "15px 0";
});
/* ===========================
   CURRENT YEAR
=========================== */
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}
/* ===========================
   THEME TOGGLE
=========================== */
const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
}
function toggleTheme() {
  const current = root.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}
themeBtn?.addEventListener("click", toggleTheme);
/* ===========================
   CONTACT FORM
=========================== */
const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");
document.getElementById("sendBtn")?.addEventListener("click", () => {
  formMsg.textContent =
    "Thank you! Your message has been received successfully. I'll get back to you soon.";
});
/* ===========================
   PARTICLE BACKGROUND
=========================== */
const canvas = document.getElementById("particles");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let W;
  let H;
  let particles;
  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  function initParticles() {
    const count = Math.floor((W * H) / 15000);
    particles = Array.from(
      {
        length: count,
      },
      () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.6,
      }),
    );
  }
  function animate() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.globalAlpha = 1 - dist / 120;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = "rgba(80,150,255,0.35)";
          ctx.lineWidth = 0.6;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(96,165,250,0.9)";
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  resize();
  initParticles();
  animate();
  window.addEventListener("resize", () => {
    resize();
    initParticles();
  });
}
