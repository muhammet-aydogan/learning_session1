import { $, $$ } from './dom.js';

/**
 * Landing Page: Die Studio-Liste steuert die große Vorschau.
 * Hover und Tastaturfokus haben Vorrang; ohne Maus über der Liste
 * folgt die Vorschau der Zeile, die gerade in der Bildschirmmitte liegt.
 */
export function initStudioList() {
  const list = $('.studio-list');
  const rows = $$('.studio-row');
  const items = new Map($$('[data-preview]').map((el) => [el.dataset.preview, el]));
  if (!list || !rows.length || !items.size) return;

  let hovering = false;
  const activate = (slug) => {
    rows.forEach((r) => r.classList.toggle('is-active', r.dataset.studio === slug));
    items.forEach((el, key) => el.classList.toggle('is-active', key === slug));
  };

  rows.forEach((row) => {
    const link = $('a', row);
    link.addEventListener('pointerenter', () => activate(row.dataset.studio));
    link.addEventListener('focus', () => activate(row.dataset.studio));
  });
  list.addEventListener('pointerenter', () => (hovering = true));
  list.addEventListener('pointerleave', () => (hovering = false));

  const observer = new IntersectionObserver(
    (entries) => {
      if (hovering) return;
      const hit = entries.find((entry) => entry.isIntersecting);
      if (hit) activate(hit.target.dataset.studio);
    },
    { rootMargin: '-45% 0px -45% 0px' },
  );
  rows.forEach((row) => observer.observe(row));
  activate(rows[0].dataset.studio);
}
