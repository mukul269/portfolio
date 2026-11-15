// MKD — small interactions: sticky nav, mobile menu, scroll reveals, odometer.
document.documentElement.classList.add('js');

const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('nav-links');

const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const setMenu = (open) => {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  links.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
};
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
links.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// Reveal elements as they scroll into view
const revealTargets = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealTargets.forEach((el) => io.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('in'));
}

// Odometer ticks up while the hero is on screen
const odo = document.querySelector('.odo');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (odo && !reduceMotion) {
  let km = parseInt(odo.textContent, 10);
  setInterval(() => {
    km = (km + 1) % 10000;
    odo.textContent = String(km).padStart(4, '0');
  }, 1400);
}

document.getElementById('year').textContent = new Date().getFullYear();
