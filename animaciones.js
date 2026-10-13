
// Menú móvil
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Barras de progreso
const barIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.bar i').forEach(b => b.style.width = b.dataset.w + '%');
      barIO.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.about-card').forEach(el => barIO.observe(el));

// Contadores animados
const numIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = +el.dataset.count;
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const tick = () => {
        cur += step;
        if (cur >= target) { el.textContent = target; }
        else { el.textContent = cur; requestAnimationFrame(tick); }
      };
      tick();
      numIO.unobserve(el);
    }
  });
}, { threshold: 0.6 });
document.querySelectorAll('.stat .num').forEach(el => numIO.observe(el));
