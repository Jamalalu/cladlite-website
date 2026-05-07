// CLADLITE™ marketing site — small interactions only.

document.getElementById('year').textContent = new Date().getFullYear();

// ─── Sticky nav background once scrolled past hero ──────────
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 24) nav.classList.add('is-scrolled');
  else nav.classList.remove('is-scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ─── Mobile burger ──────────────────────────────────────────
const burger = document.getElementById('navBurger');
const links = document.querySelector('.nav__links');
burger?.addEventListener('click', () => links?.classList.toggle('is-open'));
links?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('is-open')));

// ─── Reveal-on-scroll ───────────────────────────────────────
const revealTargets = document.querySelectorAll(
  '.brand-strip__copy, .cert-grid li, .innovation__title, .innovation__copy,' +
  ' .features__head, .feat, .bullets li,' +
  ' .visualizer__copy, .visualizer__shot-frame,' +
  ' .series__head, .series-card,'
  + ' .finishes__head, .cat,' +
  ' .project,' +
  ' .technical__head, .tbl,' +
  ' .refurb__inner > *,' +
  ' .sustain__grid > *,' +
  ' .install__head, .install__pillars li, .install__diagram, .install__key, .install__supplies li,' +
  ' .final__hero, .final__contact'
);
revealTargets.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
revealTargets.forEach(el => io.observe(el));

// ─── Lightbox ────────────────────────────────────────────────
// Click any [data-lightbox] image to open it in a fullscreen overlay.
// Esc closes, ← → cycle through siblings sharing the same group name.
(() => {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lbImage   = lightbox.querySelector('.lightbox__image');
  const lbCaption = lightbox.querySelector('.lightbox__caption');
  const btnClose  = lightbox.querySelector('.lightbox__close');
  const btnPrev   = lightbox.querySelector('.lightbox__nav--prev');
  const btnNext   = lightbox.querySelector('.lightbox__nav--next');

  let group = [];
  let index = 0;

  const render = () => {
    const img = group[index];
    if (!img) return;
    lbImage.src = img.src;
    lbImage.alt = img.alt || '';
    lbCaption.textContent = img.alt || '';
    const multi = group.length > 1;
    btnPrev.style.display = multi ? '' : 'none';
    btnNext.style.display = multi ? '' : 'none';
  };

  const open = (img) => {
    const name = img.dataset.lightbox;
    group = Array.from(document.querySelectorAll(`[data-lightbox="${name}"]`));
    index = group.indexOf(img);
    render();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const step = (dir) => {
    if (group.length < 2) return;
    index = (index + dir + group.length) % group.length;
    render();
  };

  document.querySelectorAll('[data-lightbox]').forEach(img => {
    img.addEventListener('click', () => open(img));
  });
  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', () => step(-1));
  btnNext.addEventListener('click', () => step(+1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  step(-1);
    if (e.key === 'ArrowRight') step(+1);
  });
})();
