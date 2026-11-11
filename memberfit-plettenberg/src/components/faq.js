import { site } from '../config/site.config.js';
import { $, $$, esc } from './dom.js';

/** FAQ-Akkordeon: Inhalte aus der Konfiguration, animiert per CSS-Grid. */
export function renderFaq() {
  const root = $('#faq-root');
  if (!root) return;

  const items = site.faq.filter((item) => !item.requiresOffer || site.offer.enabled);

  root.innerHTML = items
    .map((item, i) => {
      const answer = item.a
        ? `<p>${esc(item.a)}</p>`
        : '<p data-placeholder>Platzhalter – diese Antwort wird mit den Angaben des Studios ergänzt.</p>';
      return `
      <div class="acc" data-reveal>
        <h3 class="acc__heading">
          <button class="acc__trigger" type="button" id="faq-t-${i}" aria-expanded="false" aria-controls="faq-p-${i}">
            <span class="acc__no">${String(i + 1).padStart(2, '0')}</span>
            <span class="acc__q">${esc(item.q)}</span>
            <span class="acc__icon" aria-hidden="true"></span>
          </button>
        </h3>
        <div class="acc__panel" id="faq-p-${i}" role="region" aria-labelledby="faq-t-${i}" inert>
          <div class="acc__inner">${answer}</div>
        </div>
      </div>`;
    })
    .join('');

  const accs = $$('.acc', root);
  const toggle = (acc, open) => {
    acc.classList.toggle('is-open', open);
    $('.acc__trigger', acc).setAttribute('aria-expanded', String(open));
    $('.acc__panel', acc).inert = !open;
  };
  accs.forEach((acc) => {
    $('.acc__trigger', acc).addEventListener('click', () => {
      const willOpen = !acc.classList.contains('is-open');
      accs.forEach((other) => toggle(other, false));
      toggle(acc, willOpen);
    });
  });
  if (accs[0]) toggle(accs[0], true);
}
