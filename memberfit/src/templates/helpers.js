/**
 * Hilfsfunktionen für die Seitenvorlagen (laufen nur beim Build in Node).
 */
import { readFileSync } from 'node:fs';

const manifest = JSON.parse(readFileSync(new URL('../data/images.json', import.meta.url), 'utf8'));

/** HTML-Sonderzeichen maskieren. */
export const esc = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** Preis im deutschen Format: 34.9 → "34,90", 30 → "30". */
export const price = (value, { forceCents = false } = {}) =>
  Number.isInteger(value) && !forceCents
    ? String(value)
    : value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Alle Varianten eines Bildes (z. B. "herne/studio-1") aus dem Manifest, nach Breite sortiert. */
export function variants(name) {
  const list = Object.entries(manifest)
    .filter(([file]) => file.startsWith(`${name}-`) && /^\d+\.webp$/.test(file.slice(name.length + 1)))
    .map(([file, [w, h]]) => ({ src: `/images/${file}`, w, h }))
    .sort((a, b) => a.w - b.w);
  if (!list.length) throw new Error(`Bild nicht gefunden: ${name}`);
  return list;
}

/** Größte Variante – für Lightbox-Links. */
export const largest = (name) => variants(name).at(-1);

/**
 * <img> mit srcset aus dem Manifest.
 * opts: { alt, sizes, cls, lazy, attrs, priority }
 */
export function img(name, { alt = '', sizes = '100vw', cls = '', lazy = true, attrs = '', priority = false } = {}) {
  const v = variants(name);
  const big = v.at(-1);
  const srcset = v.length > 1 ? ` srcset="${v.map((x) => `${x.src} ${x.w}w`).join(', ')}" sizes="${sizes}"` : '';
  return `<img${cls ? ` class="${cls}"` : ''} src="${big.src}"${srcset} width="${big.w}" height="${big.h}"${
    lazy && !priority ? ' loading="lazy"' : ''
  }${priority ? ' fetchpriority="high"' : ''} decoding="async" alt="${esc(alt)}"${attrs ? ` ${attrs}` : ''} />`;
}

/** Externer Link oder Platzhalter-Link (zeigt Hinweis statt zu navigieren). */
export function link(url, label, { cls = '', inner = null, placeholder = 'Dieser Link wird noch hinterlegt.' } = {}) {
  const content = inner ?? `<span>${esc(label)}</span>`;
  if (url) {
    const external = /^https?:/.test(url);
    return `<a${cls ? ` class="${cls}"` : ''} href="${esc(url)}"${external ? ' target="_blank" rel="noopener"' : ''}>${content}</a>`;
  }
  return `<a${cls ? ` class="${cls}"` : ''} href="#" data-placeholder-link data-placeholder-msg="${esc(`Platzhalter: ${placeholder}`)}">${content}</a>`;
}

export const placeholder = (text) => `<span data-placeholder>${esc(text)}</span>`;

export const telHref = (phone) => `tel:+49${phone.replace(/[^\d]/g, '').replace(/^0/, '')}`;

export const mapsUrl = ({ street, zip, city }) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`MemberFit ${street}, ${zip} ${city}`)}`;

export const pad = (n) => String(n).padStart(2, '0');

/* ---------- Icons (Linien-Icons, 48er Raster) ---------- */

const ICONS = {
  cardio: '<path class="draw" d="M6 26h7l4-9 6 18 5-13 3 4h11"/><circle class="draw accent" cx="38" cy="12" r="4"/>',
  strength: '<path class="draw" d="M14 24h20"/><rect class="draw" x="8" y="15" width="6" height="18" rx="2"/><rect class="draw" x="34" y="15" width="6" height="18" rx="2"/><path class="draw accent" d="M4 20v8M44 20v8"/>',
  dumbbell: '<path class="draw" d="M17 31 31 17"/><path class="draw" d="m12 26 10 10M26 12l10 10"/><path class="draw accent" d="m7 31 10 10M31 7l10 10"/>',
  parking: '<rect class="draw" x="7" y="7" width="34" height="34" rx="9"/><path class="draw accent" d="M19 35V14h7a6.5 6.5 0 0 1 0 13h-7"/>',
  drink: '<path class="draw" d="M19 6h10v6l4 6v22a3 3 0 0 1-3 3H18a3 3 0 0 1-3-3V18l4-6z"/><path class="draw accent" d="M15 26c3-2 6 2 9 0s6 2 9 0"/><path class="draw" d="M19 12h10"/>',
  circuit: '<circle class="draw" cx="24" cy="24" r="15"/><path class="draw accent" d="M24 9a15 15 0 0 1 15 15"/><path class="draw" d="m35 20 4 4 4-4"/><path class="draw" d="M24 17v7l5 3"/>',
  device: '<rect class="draw" x="10" y="6" width="28" height="20" rx="4"/><path class="draw accent" d="M16 16h4l2-4 4 8 2-4h4"/><path class="draw" d="M24 26v10M14 42h20M17 36h14"/>',
  coach: '<circle class="draw" cx="18" cy="15" r="6"/><path class="draw" d="M6 39c0-7 5.4-12 12-12s12 5 12 12"/><circle class="draw accent" cx="34" cy="19" r="4.5"/><path class="draw accent" d="M33 29c5.6.4 9 4.4 9 10"/>',
  calendar: '<rect class="draw" x="7" y="10" width="34" height="31" rx="6"/><path class="draw" d="M7 19h34M16 6v8M32 6v8"/><path class="draw accent" d="m17 30 5 5 9-9"/>',
  card: '<rect class="draw" x="5" y="11" width="38" height="26" rx="5"/><path class="draw" d="M5 19h38"/><path class="draw accent" d="M12 29h10"/>',
  smile: '<circle class="draw" cx="24" cy="24" r="18"/><path class="draw accent" d="M16 28c4 5 12 5 16 0"/><path class="draw" d="M18 19v1M30 19v1"/>',
  pin: '<path class="draw" d="M24 43s14-12.5 14-24a14 14 0 0 0-28 0c0 11.5 14 24 14 24z"/><circle class="draw accent" cx="24" cy="19" r="5"/>',
  sparkle: '<path class="draw" d="M22 6c1 8 4 11 12 12-8 1-11 4-12 12-1-8-4-11-12-12 8-1 11-4 12-12z"/><path class="draw accent" d="M36 30c.5 4 2 5.5 6 6-4 .5-5.5 2-6 6-.5-4-2-5.5-6-6 4-.5 5.5-2 6-6z"/>',
};

const UI = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowUpRight: '<path d="M7 17 17 7M9 7h8v8"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  prev: '<path d="M15 5l-7 7 7 7"/>',
  next: '<path d="M9 5l7 7-7 7"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  zoom: '<path d="M4 10V4h6M20 14v6h-6M4 4l7 7M20 20l-7-7"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  facebook: '<path d="M14 21v-8h3l.5-3.5H14V7.5c0-1 .4-1.8 1.9-1.8H18V2.6A24 24 0 0 0 15.2 2.5C12.6 2.5 11 4 11 6.9v2.6H8V13h3v8"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
  swap: '<path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/>',
};

/** Großes Feature-Icon (zeichnet sich beim Einblenden selbst). */
export const icon = (name, cls = 'usp__icon') =>
  `<svg class="${cls} ${cls}--${name}" viewBox="0 0 48 48" aria-hidden="true">${ICONS[name] ?? ICONS.sparkle}</svg>`;

/** Kleines UI-Icon (24er Raster). */
export const ui = (name, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${UI[name]}</svg>`;
