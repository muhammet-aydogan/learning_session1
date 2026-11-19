/* Gemeinsamer Einstieg für alle Seiten: Schriften, Styles, Navigation, Animationen. */
import '@fontsource/oswald/latin-500.css';
import '@fontsource/oswald/latin-600.css';
import '@fontsource/oswald/latin-700.css';
import '@fontsource-variable/manrope/wght.css';
import '../styles/main.css';

import { initSmoothScroll } from '../animations/smooth-scroll.js';
import { initAnimations } from '../animations/index.js';
import { initNav } from '../components/nav.js';
import { initSwitcher } from '../components/switcher.js';
import { initPlaceholderLinks } from '../components/links.js';

/** Startet alles Gemeinsame; `setup` erhält { lockScroll, unlockScroll } für seitenspezifische Teile. */
export function initPage(setup = () => {}) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('show-placeholders');
  document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

  initPlaceholderLinks();
  const scroll = initSmoothScroll(reducedMotion);
  initNav(scroll);
  initSwitcher();
  setup(scroll);

  // Animationen zuletzt – alle Elemente sind dann im DOM.
  initAnimations(reducedMotion);
}
