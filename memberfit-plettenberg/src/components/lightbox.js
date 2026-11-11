import { $, $$ } from './dom.js';

/** Lightbox mit Tastatur-, Wisch- und Button-Navigation. */
export function initLightbox(items, { lockScroll, unlockScroll }) {
  const box = $('#lightbox');
  if (!box || !items.length) return;

  const img = $('.lightbox__img', box);
  const caption = $('[data-lb-caption]', box);
  const count = $('[data-lb-count]', box);
  let index = 0;
  let opener = null;

  const show = (i, direction = 0) => {
    index = (i + items.length) % items.length;
    const item = items[index];
    img.classList.remove('is-in');
    img.style.setProperty('--from', `${direction * 40}px`);
    const swap = () => {
      img.src = item.src;
      img.alt = item.alt;
      caption.textContent = item.caption;
      count.textContent = `${index + 1} / ${items.length}`;
      const reveal = () => requestAnimationFrame(() => img.classList.add('is-in'));
      img.complete ? reveal() : img.addEventListener('load', reveal, { once: true });
    };
    box.classList.contains('is-open') ? setTimeout(swap, 160) : swap();
  };

  const open = (i, trigger) => {
    opener = trigger;
    box.hidden = false;
    show(i);
    requestAnimationFrame(() => box.classList.add('is-open'));
    lockScroll();
    $('[data-lb-close]', box).focus();
  };

  const close = () => {
    box.classList.remove('is-open');
    unlockScroll();
    setTimeout(() => (box.hidden = true), 320);
    opener?.focus();
  };

  $$('#gallery .tile').forEach((tile) => tile.addEventListener('click', () => open(Number(tile.dataset.index), tile)));
  $('[data-lb-close]', box).addEventListener('click', close);
  $('[data-lb-prev]', box).addEventListener('click', () => show(index - 1, -1));
  $('[data-lb-next]', box).addEventListener('click', () => show(index + 1, 1));
  box.addEventListener('click', (e) => e.target === box && close());

  window.addEventListener('keydown', (e) => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(index - 1, -1);
    if (e.key === 'ArrowRight') show(index + 1, 1);
    if (e.key === 'Tab') {
      // Fokus innerhalb der Lightbox halten
      const focusables = $$('button', box);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) (e.preventDefault(), last.focus());
      else if (!e.shiftKey && document.activeElement === last) (e.preventDefault(), first.focus());
    }
  });

  // Wischen auf Touch-Geräten
  let startX = null;
  box.addEventListener('touchstart', (e) => (startX = e.touches[0].clientX), { passive: true });
  box.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    startX = null;
  });
}
