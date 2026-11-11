import { site } from '../config/site.config.js';
import { $$ } from './dom.js';
import { showToast } from './toast.js';

/**
 * Verdrahtet alle Elemente mit `data-link="<name>"` mit den URLs aus der
 * Konfiguration. Fehlt eine URL (Platzhalter), erscheint ein Hinweis.
 */
export function initLinks(root = document) {
  $$('[data-link]', root).forEach((el) => {
    const key = el.dataset.link;
    const url = site.links[key];
    if (url) {
      el.href = url;
      el.target = '_blank';
      el.rel = 'noopener';
      return;
    }
    el.href = '#';
    el.dataset.placeholderLink = '';
    el.addEventListener('click', (event) => {
      event.preventDefault();
      showToast(
        key === 'signup'
          ? 'Platzhalter: Der Link zur Online-Anmeldung wird hier hinterlegt.'
          : `Platzhalter: Der Link „${el.textContent.trim()}" wird noch hinterlegt.`,
      );
    });
  });
}
