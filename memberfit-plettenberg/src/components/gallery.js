import { site } from '../config/site.config.js';
import { $, asset, esc } from './dom.js';

const ZOOM = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10V4h6M20 14v6h-6M4 4l7 7M20 20l-7-7" /></svg>';

/** Studio-Galerie: asymmetrisches Grid, Kacheln öffnen die Lightbox. */
export function renderGallery() {
  const root = $('#gallery');
  if (!root) return [];

  root.innerHTML = site.gallery
    .map(
      (img, i) => `
      <button class="tile tile--${img.size}" type="button" data-index="${i}" data-reveal="clip" aria-label="${esc(img.caption)} – Bild vergrößern">
        <img src="${asset(`images/${img.file}-800.webp`)}"
          srcset="${asset(`images/${img.file}-800.webp`)} 800w, ${asset(`images/${img.file}-1600.webp`)} 1600w"
          sizes="(min-width: 900px) 80vw, 140vw" width="1600" height="900" loading="lazy" alt="${esc(img.alt)}" />
        <span class="tile__caption"><em>${String(i + 1).padStart(2, '0')}</em>${esc(img.caption)}</span>
        <span class="tile__zoom">${ZOOM}</span>
      </button>`,
    )
    .join('');

  // Fallback: lädt ein Bild nicht, wird die Kachel als neutraler Platzhalter gezeigt.
  root.querySelectorAll('img').forEach((el) =>
    el.addEventListener('error', () => el.closest('.tile').classList.add('is-broken'), { once: true }),
  );

  return site.gallery.map((img) => ({
    src: asset(`images/${img.file}-1600.webp`),
    alt: img.alt,
    caption: img.caption,
  }));
}
