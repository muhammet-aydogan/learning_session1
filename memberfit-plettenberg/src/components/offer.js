import { site, formatPrice } from '../config/site.config.js';
import { $, asset, esc, ARROW } from './dom.js';

const CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>';

/**
 * Mitgliedschaft & Angebot.
 * VORLÄUFIG: Sämtliche Preise/Konditionen kommen aus `site.offer`
 * (src/config/site.config.js) und lassen sich dort ändern oder mit
 * `enabled: false` vollständig ausblenden.
 */
export function renderOffer() {
  const root = $('#offer-root');
  const { offer } = site;
  if (!root) return;

  if (!offer.enabled) {
    root.innerHTML = `
      <div class="offer offer--neutral" data-reveal>
        <p class="eyebrow"><span class="eyebrow__dot"></span>Mitgliedschaft</p>
        <h2 class="h2">Werde Teil von<br /><span class="text-gold">Memberfit Plettenberg.</span></h2>
        <p class="lead">Melde dich online an oder lass dich persönlich im Studio beraten.</p>
        <div class="offer__actions">
          <a class="btn btn--primary btn--lg" data-link="signup" href="#"><span>Jetzt Mitglied werden</span>${ARROW}</a>
          <a class="btn btn--ghost btn--lg" href="#kontakt"><span>Kontakt aufnehmen</span></a>
        </div>
      </div>`;
    return;
  }

  const [euros, cents] = formatPrice(offer.price).split(',');

  root.innerHTML = `
    <div class="offer">
      <div class="offer__intro">
        <p class="eyebrow" data-reveal><span class="eyebrow__dot"></span>Mitgliedschaft</p>
        <h2 class="h2" data-reveal-title>Starte jetzt.<br /><span class="text-gold">Zum Aktionspreis.</span></h2>
        <p class="lead" data-reveal>
          Modernes Studio, professionelle Betreuung und faire Konditionen – garantiert ohne versteckte Kosten.
        </p>
        <picture class="offer__athlete" aria-hidden="true">
          <img data-drift="-6"
            src="${asset('images/athlet-freisteller-900.webp')}"
            srcset="${asset('images/athlet-freisteller-500.webp')} 500w, ${asset('images/athlet-freisteller-900.webp')} 900w"
            sizes="(min-width: 1000px) 30vw, 0px" width="900" height="1654" loading="lazy" alt="" />
        </picture>
      </div>

      <article class="price-card" data-reveal data-cursor-glow aria-labelledby="offer-title">
        <div class="price-card__top">
          <span class="chip chip--gold">${esc(offer.label)}</span>
          ${offer.provisional ? '<span class="chip chip--muted" title="Preise und Bedingungen stammen von der bestehenden Website und sind noch nicht bestätigt.">Konditionen vorläufig</span>' : ''}
        </div>
        <h3 class="price-card__title" id="offer-title">${esc(offer.title)}</h3>

        <p class="price" aria-label="${formatPrice(offer.price)} Euro ${esc(offer.priceUnit)}${offer.regularPrice ? `, statt ${formatPrice(offer.regularPrice)} Euro` : ''}">
          <span class="price__value" aria-hidden="true">
            <span data-count="${Number(euros)}">${euros}</span><span class="price__cents">,${cents}</span><span class="price__cur">€</span>
          </span>
          <span class="price__meta" aria-hidden="true">
            <span>${esc(offer.priceUnit)}</span>
            ${offer.regularPrice ? `<s>statt ${formatPrice(offer.regularPrice)} €</s>` : ''}
          </span>
        </p>

        <ul class="price-card__list">
          ${offer.conditions.map((c) => `<li>${CHECK}<span>${esc(c)}</span></li>`).join('')}
        </ul>

        <a class="btn btn--primary btn--lg btn--block" data-link="signup" href="#"><span>${esc(offer.cta)}</span>${ARROW}</a>
        ${offer.footnote ? `<p class="price-card__note">* ${esc(offer.footnote)}</p>` : ''}
      </article>
    </div>`;
}
