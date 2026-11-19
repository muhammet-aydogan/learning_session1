/**
 * Landing Page memberfit.de – listet alle Studios.
 */
import { lowestPrice } from '../data/studios.js';
import { esc, img, icon, ui, price, pad } from './helpers.js';
import { head, nav, footer, overlays, marquee } from './partials.js';

const LINKS = [
  { id: 'studios', label: 'Studios' },
  { id: 'vorteile', label: 'Vorteile' },
  { id: 'so-gehts', label: "So geht's" },
  { id: 'leistungen', label: 'Leistungen' },
  { id: 'kontakt', label: 'Kontakt' },
];

/** Kurzform der Öffnungszeiten für die Studio-Liste. */
const hoursShort = (s) => s.hours.map((h) => `${h.days.replace('Montag – Freitag', 'Mo–Fr').replace('Samstag & Sonntag', 'Sa–So')} ${h.time.replace(':00', '').replace(':00', '')}`)[0];

function studioRow(s, i, root) {
  const from = lowestPrice(s);
  return `
            <li class="studio-row" data-reveal data-studio="${s.slug}">
              <a class="studio-row__link" href="${root}${s.slug}/" data-studio-link="${s.slug}">
                <span class="studio-row__media" aria-hidden="true">${img(s.heroImage, { sizes: '(min-width: 1000px) 1px, 92vw', cls: 'studio-row__img' })}</span>
                <span class="studio-row__no">${pad(i + 1)}</span>
                <span class="studio-row__main">
                  <span class="studio-row__city">${esc(s.city)}${s.status === 'opening' ? ` <em class="tag tag--gold">${esc(s.statusLabel)}</em>` : ''}</span>
                  <span class="studio-row__meta">${ui('pin')}${esc(s.address.street)}, ${esc(s.address.zip)} ${esc(s.address.city)}</span>
                  <span class="studio-row__meta">${ui('clock')}${esc(hoursShort(s))}</span>
                </span>
                <span class="studio-row__side">
                  ${from !== null ? `<span class="studio-row__price"><small>ab</small> ${price(from)}&nbsp;€<small>/Monat*</small></span>` : ''}
                  <span class="studio-row__go">Zum Studio ${ui('arrow')}</span>
                </span>
              </a>
            </li>`;
}

function preview(studios) {
  return `
          <aside class="studio-preview" aria-hidden="true">
            ${studios
              .map(
                (s, i) => `
            <div class="studio-preview__item${i === 0 ? ' is-active' : ''}" data-preview="${s.slug}">
              ${img(s.heroImage, { sizes: '(min-width: 1000px) 40vw, 1px', cls: 'studio-preview__img', attrs: `style="object-position:${s.heroPosition}"` })}
              <div class="studio-preview__body">
                <span class="studio-preview__label">MemberFit</span>
                <span class="studio-preview__city">${esc(s.city)}</span>
                <span class="studio-preview__tags">${s.highlights.map((h) => `<span>${esc(h)}</span>`).join('')}</span>
              </div>
            </div>`,
              )
              .join('')}
          </aside>`;
}

export function renderLanding({ site, studios }) {
  const root = '';
  const L = site.landing;
  const minPrice = Math.min(...studios.map(lowestPrice).filter((p) => p !== null));

  return `${head({
    title: 'MemberFit – Fitnessstudios in Mettmann, Herne, Erkrath, Lüdenscheid und Plettenberg',
    description:
      'MemberFit: fünf Fitnessstudios mit modernen Geräten, motivierender Atmosphäre und fairen Mitgliedschaften. Finde dein Studio und werde heute noch Member.',
    site,
    entry: 'landing',
  })}
  <body class="page-landing">
    ${nav({ studios, current: null, root, links: LINKS, cta: { url: '#studios', label: 'Studio wählen' } })}

    <main id="main">
      <!-- ============ HERO ============ -->
      <section class="hero hero--landing" id="start" data-section>
        <div class="hero__media" aria-hidden="true">
          ${img(L.heroImage, { sizes: '100vw', cls: 'hero__img', priority: true, attrs: 'data-hero-img style="object-position:62% 30%"' })}
          <div class="hero__overlay"></div>
          <div class="hero__glow"></div>
        </div>

        <div class="container hero__content">
          <p class="eyebrow" data-hero-fade><span class="eyebrow__dot"></span>${studios.length} Studios<span class="hide-sm">&nbsp;· ${esc(site.claim)}</span></p>
          <h1 class="hero__title" aria-label="Werde heute noch Member.">
            <span class="line" aria-hidden="true"><span data-hero-line>Werde heute</span></span>
            <span class="line" aria-hidden="true"><span data-hero-line>noch <span class="text-gold">Member.</span></span></span>
          </h1>
          <p class="hero__lead" data-hero-fade>
            Moderne Geräte, motivierende Atmosphäre und faire Mitgliedschaften – in ${studios.length} Studios.
            Wähle deinen Standort und starte noch heute.
          </p>
          <div class="hero__actions" data-hero-fade>
            <a class="btn btn--primary btn--lg" href="#studios"><span>Studio wählen</span>${ui('arrow', 'btn__arrow')}</a>
            <a class="btn btn--ghost btn--lg" href="#so-gehts"><span>So geht's</span></a>
          </div>
        </div>

        <nav class="hero__studios container" aria-label="Schnellwahl Studio" data-hero-fade>
          <span class="hero__studios-label">Direkt zu</span>
          ${studios.map((s) => `<a href="${root}${s.slug}/">${esc(s.city)}${ui('arrowUpRight')}</a>`).join('')}
        </nav>

        <a class="scroll-hint" href="#studios" data-hero-fade aria-label="Weiter zu den Studios">
          <span class="scroll-hint__label">Scroll</span><span class="scroll-hint__line"></span>
        </a>
      </section>

      ${marquee('MemberFit')}

      <!-- ============ STUDIOS ============ -->
      <section class="section studios" id="studios" data-section>
        <div class="container">
          <header class="section-head section-head--split">
            <div>
              <p class="eyebrow" data-reveal><span class="eyebrow__dot"></span>Unsere Studios</p>
              <h2 class="h2" data-reveal-title>${studios.length} Studios.<br /><span class="text-gold">Dein Standort.</span></h2>
            </div>
            <p class="lead" data-reveal>
              Wähle dein Studio: Öffnungszeiten, Angebote, Kurse und Anmeldung findest du auf der jeweiligen Studioseite.
            </p>
          </header>

          <div class="studios__layout">
            <ol class="studio-list">${studios.map((s, i) => studioRow(s, i, root)).join('')}
            </ol>
            ${preview(studios)}
          </div>
          <p class="note" data-reveal>* Aktuelle Aktionspreise der Studios, Stand der bestehenden Website – Konditionen vorläufig, Details auf der Studioseite.</p>
        </div>
      </section>

      <!-- ============ VORTEILE ============ -->
      <section class="section usps" id="vorteile" data-section>
        <div class="container">
          <header class="section-head">
            <p class="eyebrow" data-reveal><span class="eyebrow__dot"></span>Warum MemberFit</p>
            <h2 class="h2" data-reveal-title>Alles drin.<br /><span class="text-gold">Nichts versteckt.</span></h2>
          </header>
          <ul class="usp-grid">
            ${L.benefits
              .map(
                (b, i) => `
            <li class="usp" data-reveal data-cursor-glow>
              <span class="usp__no">${pad(i + 1)}</span>
              ${icon(b.icon)}
              <h3 class="usp__title">${esc(b.title)}</h3>
              <p class="usp__text">${esc(b.text)}</p>
            </li>`,
              )
              .join('')}
          </ul>
        </div>
      </section>

      <!-- ============ SO GEHT'S ============ -->
      <section class="section steps" id="so-gehts" data-section>
        <div class="container steps__grid">
          <div class="steps__copy">
            <p class="eyebrow" data-reveal><span class="eyebrow__dot"></span>Loslegen</p>
            <h2 class="h2" data-reveal-title>Mitglied werden<br /><span class="text-gold">mit nur 1 Klick.</span></h2>
            <ol class="steps__list">
              ${L.steps
                .map(
                  (step, i) => `
              <li class="step" data-reveal>
                <span class="step__no">${i + 1}</span>
                <span class="step__text">${esc(step)}</span>
              </li>`,
                )
                .join('')}
            </ol>
            <a class="btn btn--primary btn--lg" href="#studios" data-reveal><span>Studio wählen</span>${ui('arrow', 'btn__arrow')}</a>
          </div>
          <figure class="steps__visual" data-reveal="clip">
            ${img(L.stepsImage, { sizes: '(min-width: 1000px) 45vw, 100vw', alt: 'Zwei lachende Sportlerinnen', attrs: 'data-parallax="6"' })}
            <figcaption class="steps__caption">Starte<br />noch heute.</figcaption>
          </figure>
        </div>
      </section>

      <!-- ============ LEISTUNGEN ============ -->
      <section class="section services" id="leistungen" data-section>
        <div class="container">
          <header class="section-head section-head--split">
            <div>
              <p class="eyebrow" data-reveal><span class="eyebrow__dot"></span>Leistungen</p>
              <h2 class="h2" data-reveal-title>Unsere<br /><span class="text-gold">Leistungen.</span></h2>
            </div>
            <p class="lead" data-reveal>
              Bei MemberFit bieten wir dir alles, was du für ein effektives und abwechslungsreiches Training brauchst.
            </p>
          </header>
          <ul class="usp-grid usp-grid--3">
            ${L.services
              .map(
                (s, i) => `
            <li class="usp usp--compact" data-reveal data-cursor-glow>
              <span class="usp__no">${pad(i + 1)}</span>
              ${icon(s.icon)}
              <h3 class="usp__title">${esc(s.title)}</h3>
              <p class="usp__text">${esc(s.text)}</p>
            </li>`,
              )
              .join('')}
          </ul>
          <p class="note" data-reveal>${esc(L.servicesNote)}</p>
        </div>
      </section>

      <!-- ============ EINDRÜCKE ============ -->
      <section class="impressions" aria-label="Eindrücke aus unseren Studios">
        <div class="impressions__track">
          ${[...L.impressions, ...L.impressions]
            .map((im, i) => `<figure class="impressions__item"${i >= L.impressions.length ? ' aria-hidden="true"' : ''}>${img(im.file, { alt: i >= L.impressions.length ? '' : im.alt, sizes: '360px' })}</figure>`)
            .join('')}
        </div>
      </section>

      <!-- ============ ABSCHLUSS-CTA ============ -->
      <section class="section closing" id="kontakt" data-section>
        <div class="closing__media" aria-hidden="true">
          ${img('landing/impression-3', { sizes: '100vw', attrs: 'data-parallax="10"' })}
        </div>
        <div class="container closing__inner">
          <p class="eyebrow" data-reveal><span class="eyebrow__dot"></span>Bereit?</p>
          <h2 class="h1" data-reveal-title>Dein nächster Schritt<br /><span class="text-gold">beginnt hier.</span></h2>
          <p class="lead" data-reveal>Finde dein MemberFit Studio${Number.isFinite(minPrice) ? ` – Mitgliedschaften schon ab ${price(minPrice)}&nbsp;€ im Monat*` : ''}.</p>
          <div class="closing__studios" data-reveal>
            ${studios.map((s) => `<a class="studio-chip" href="${root}${s.slug}/"><span>${esc(s.city)}</span>${ui('arrow')}</a>`).join('')}
          </div>
          <p class="closing__mail" data-reveal>Fragen? Schreib uns an <a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>
        </div>
      </section>
    </main>
    ${footer({ site, studios, current: null, root, links: LINKS })}
    ${overlays()}
  </body>
</html>
`;
}
