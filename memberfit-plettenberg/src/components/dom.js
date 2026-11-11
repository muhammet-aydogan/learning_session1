/** Kleine DOM-Helfer, die von allen Komponenten geteilt werden. */
export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/** Pfad zu einer Datei aus /public (funktioniert auch bei relativem Build). */
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

/** HTML-Sonderzeichen maskieren – für Inhalte aus der Konfiguration. */
export const esc = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const ARROW = '<svg class="btn__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>';
