import { $ } from './dom.js';

let timer;

/** Kurzer Hinweis am unteren Bildschirmrand (z. B. für Platzhalter-Links). */
export function showToast(message, duration = 3800) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('is-visible');
  clearTimeout(timer);
  timer = setTimeout(() => el.classList.remove('is-visible'), duration);
}
