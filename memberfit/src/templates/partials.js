/**
 * Gemeinsame Seitenbausteine: <head>, Navigation, mobiles Menü, Footer, Overlays.
 * `root` ist der relative Pfad zur Startseite ('' auf der Landing Page, '../' auf Studioseiten).
 */
import { esc, ui, link, placeholder, telHref } from './helpers.js';

export function head({ title, description, site, entry }) {
  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- Diese Datei wird aus src/templates erzeugt – Änderungen dort vornehmen. -->
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="theme-color" content="#0b0b0c" />
    ${site.noindex ? '<meta name="robots" content="noindex, nofollow" />' : ''}
    <link rel="icon" type="image/png" href="/favicon.png" />
    <script>
      document.documentElement.classList.add('js');
      // Sicherheitsnetz: Inhalte spätestens nach 3 s zeigen, falls das Skript nicht lädt.
      setTimeout(function () { document.documentElement.classList.add('is-ready'); }, 3000);
    </script>
    <script type="module" src="/src/entries/${entry}.js"></script>
  </head>`;
}

/** Dropdown „Standort wählen" (Desktop) – listet alle Studios. */
function switcher({ studios, current, root }) {
  const label = current ? current.city : 'Standort wählen';
  return `
        <div class="switcher" data-switcher>
          <button class="switcher__btn" type="button" aria-expanded="false" aria-controls="switcher-list">
            ${ui('pin', 'ico switcher__pin')}<span>${esc(label)}</span>${ui('chevron', 'ico switcher__chev')}
          </button>
          <div class="switcher__panel" id="switcher-list" role="menu" hidden>
            <p class="switcher__title">Unsere Studios</p>
            ${studios
              .map(
                (s) => `<a role="menuitem" href="${root}${s.slug}/"${current?.slug === s.slug ? ' aria-current="page"' : ''}>
              <span>${esc(s.city)}</span>${s.status === 'opening' ? '<em>Neu</em>' : ''}${ui('arrowUpRight')}</a>`,
              )
              .join('')}
            <a class="switcher__all" role="menuitem" href="${root ? `${root}#studios` : '#studios'}">Alle Standorte im Überblick</a>
          </div>
        </div>`;
}

export function nav({ studios, current, root, links, cta }) {
  return `
    <a class="skip-link" href="#main">Zum Inhalt springen</a>
    <div class="scroll-progress" aria-hidden="true"><span></span></div>

    <header class="nav" id="nav">
      <div class="nav__inner">
        <a class="brand" href="${root || './'}" aria-label="MemberFit – Startseite">
          <img class="brand__mark" src="/images/brand/logo-mf.webp" width="640" height="400" alt="" />
          <span class="brand__text">
            <span class="brand__name">MemberFit</span>
            <span class="brand__place">${esc(current ? current.city : 'Fitnessstudios')}</span>
          </span>
        </a>

        <nav class="nav__links" aria-label="Hauptnavigation">
          ${links.map((l) => `<a href="#${l.id}" data-nav>${esc(l.label)}</a>`).join('\n          ')}
        </nav>
        ${switcher({ studios, current, root })}
        ${link(cta.url, cta.label, { cls: 'btn btn--primary btn--sm nav__cta', placeholder: cta.placeholder })}

        <button class="burger" id="burger" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Menü öffnen">
          <span></span><span></span>
        </button>
      </div>
    </header>

    <div class="mobile-menu" id="mobile-menu" aria-hidden="true" inert>
      <nav class="mobile-menu__links" aria-label="Mobile Navigation">
        ${links.map((l, i) => `<a href="#${l.id}"><em>${String(i + 1).padStart(2, '0')}</em>${esc(l.label)}</a>`).join('\n        ')}
      </nav>
      <div class="mobile-menu__studios">
        <p class="mobile-menu__label">Standorte</p>
        <div class="mobile-menu__chips">
          ${studios
            .map(
              (s) =>
                `<a class="chip-link${current?.slug === s.slug ? ' is-current' : ''}" href="${root}${s.slug}/"${
                  current?.slug === s.slug ? ' aria-current="page"' : ''
                }>${esc(s.city)}</a>`,
            )
            .join('')}
        </div>
      </div>
      <div class="mobile-menu__foot">
        ${link(cta.url, cta.label, { cls: 'btn btn--primary btn--block', placeholder: cta.placeholder })}
        <p class="mobile-menu__claim">Fitness · Gesundheit · Lifestyle</p>
      </div>
    </div>`;
}

export function footer({ site, studios, current, root, links }) {
  const legal = current ? current.links : site.legal;
  const contact = current
    ? `MemberFit ${esc(current.city)}<br />${esc(current.address.street)}<br />${esc(current.address.zip)} ${esc(current.address.city)}<br />
          ${current.phone ? `<a href="${telHref(current.phone)}">${esc(current.phone)}</a>` : placeholder('Telefon folgt')}<br />
          <a href="mailto:${esc(current.email)}">${esc(current.email)}</a>`
    : `MemberFit<br /><a href="mailto:${esc(site.email)}">${esc(site.email)}</a>`;

  return `
    <footer class="footer">
      <div class="container footer__grid">
        <div class="footer__brand">
          <img src="/images/brand/logo-memberfit.webp" width="640" height="379" loading="lazy" alt="MemberFit – Fitness, Gesundheit, Lifestyle" />
          <p>${current ? `Dein Fitnessstudio in ${esc(current.city)}.` : 'Fünf Studios. Ein Anspruch: dein bestes Training.'}</p>
        </div>
        <nav class="footer__col" aria-label="Standorte">
          <h2 class="footer__title">Standorte</h2>
          ${studios
            .map(
              (s) =>
                `<a href="${root}${s.slug}/"${current?.slug === s.slug ? ' aria-current="page"' : ''}>MemberFit ${esc(s.city)}${
                  s.status === 'opening' ? ' <em class="tag">Neu</em>' : ''
                }</a>`,
            )
            .join('\n          ')}
        </nav>
        <nav class="footer__col" aria-label="Seitennavigation">
          <h2 class="footer__title">${current ? 'Auf dieser Seite' : 'Navigation'}</h2>
          ${current ? `<a href="${root}">Alle Studios</a>` : ''}
          ${links.map((l) => `<a href="#${l.id}">${esc(l.label)}</a>`).join('\n          ')}
        </nav>
        <div class="footer__col">
          <h2 class="footer__title">Kontakt</h2>
          <address>${contact}</address>
        </div>
      </div>
      <div class="container footer__bottom">
        <p>© <span data-year>2026</span> MemberFit${current ? ` ${esc(current.city)}` : ''}</p>
        <nav class="footer__legal" aria-label="Rechtliches">
          ${link(legal.impressum, 'Impressum')}
          ${link(legal.datenschutz, 'Datenschutz')}
          ${link(legal.agb, 'AGB')}
          ${current ? link(current.links.cancel, 'Vertrag kündigen', { placeholder: 'Der Link zur Online-Kündigung wird noch hinterlegt.' }) : ''}
        </nav>
      </div>
    </footer>`;
}

export function overlays() {
  return `
    <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Bildansicht" hidden>
      <button class="lightbox__close" type="button" data-lb-close aria-label="Schließen">${ui('close', '')}</button>
      <button class="lightbox__nav lightbox__nav--prev" type="button" data-lb-prev aria-label="Vorheriges Bild">${ui('prev', '')}</button>
      <figure class="lightbox__figure">
        <img class="lightbox__img" alt="" />
        <figcaption class="lightbox__caption"><span data-lb-caption></span><span data-lb-count></span></figcaption>
      </figure>
      <button class="lightbox__nav lightbox__nav--next" type="button" data-lb-next aria-label="Nächstes Bild">${ui('next', '')}</button>
    </div>
    <div class="toast" id="toast" role="status" aria-live="polite"></div>`;
}

/** Laufband mit dem Marken-Claim. */
export const marquee = (extra) => {
  const words = ['Fitness', 'Gesundheit', 'Lifestyle', extra];
  const run = words.map((w, i) => `<span${i % 2 ? ' class="is-outline"' : ''}>${esc(w)}</span><i></i>`).join('');
  return `
      <div class="marquee" aria-hidden="true">
        <div class="marquee__track">${run}${run}</div>
      </div>`;
};
