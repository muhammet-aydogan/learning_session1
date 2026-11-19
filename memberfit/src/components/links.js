import { $$ } from './dom.js';
import { showToast } from './toast.js';

/** Platzhalter-Links (noch keine URL hinterlegt) zeigen einen Hinweis statt zu navigieren. */
export function initPlaceholderLinks(root = document) {
  $$('[data-placeholder-link]', root).forEach((el) =>
    el.addEventListener('click', (event) => {
      event.preventDefault();
      showToast(el.dataset.placeholderMsg || 'Platzhalter: Dieser Link wird noch hinterlegt.');
    }),
  );
}
