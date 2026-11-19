import { $, $$ } from './dom.js';

/** FAQ-Akkordeon: Markup kommt aus dem Build, hier nur das Auf- und Zuklappen. */
export function initFaq() {
  const accs = $$('[data-accordion] .acc');
  const toggle = (acc, open) => {
    acc.classList.toggle('is-open', open);
    $('.acc__trigger', acc).setAttribute('aria-expanded', String(open));
    $('.acc__panel', acc).inert = !open;
  };
  accs.forEach((acc) =>
    $('.acc__trigger', acc).addEventListener('click', () => {
      const willOpen = !acc.classList.contains('is-open');
      accs.forEach((other) => toggle(other, false));
      toggle(acc, willOpen);
    }),
  );
}
