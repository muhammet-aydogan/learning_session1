/**
 * Studioseite – eine Vorlage für alle Standorte (Design des Plettenberg-Entwurfs).
 */
import { esc, img, icon, ui, price, pad, link, placeholder, telHref, mapsUrl } from './helpers.js';
import { head, nav, footer, overlays, marquee } from './partials.js';

const ARROW = ui('arrow', 'btn__arrow');

/* ---------- Navigation ---------- */
const navLinks = (s) =>
  [
    { id: 'leistungen', label: 'Leistungen' },
    { id: 'training', label: 'Training' },
    { id: 'studio', label: 'Studio' },
    s.courses && { id: 'kurse', label: 'Kurse' },
    { id: 'mitgliedschaft', label: 'Mitgliedschaft' },
    !s.courses && { id: 'faq', label: 'FAQ' },
    { id: 'kontakt', label: 'Kontakt' },
  ].filter(Boolean);

/* ---------- FAQ ---------- */
const hasParking = (s) => s.services.some((x) => x.icon === 'parking');
const hasFeature = (s, title) => s.features.some((f) => f.title === title);
const hoursText = (s) => s.hours.map((h) => `${h.days}: ${h.time}`).join(' · ');

function faqBuilders(s) {
  return {
    signup: {
      q: 'Wie werde ich Mitglied?',
      a: 'Ganz einfach online: Wähle über „Mitglied werden" deine Mitgliedschaft und schließe sie in wenigen Minuten ab. Anschließend kommst du ins Studio, holst dein Startpaket ab und startest mit dem Training.',
    },
    trial: s.links.trial && {
      q: 'Kann ich vorher ein Probetraining machen?',
      a: 'Ja. Über „Probetraining" vereinbarst du online dein kostenloses Probetraining und lernst das Studio in Ruhe kennen.',
    },
    hours: { q: `Wann hat MemberFit ${s.city} geöffnet?`, a: `${hoursText(s)}.` },
    parking: hasParking(s) && { q: 'Gibt es Parkplätze?', a: 'Ja. Kostenlose Parkplätze findest du direkt vor dem Studio – für eine entspannte und unkomplizierte Anreise.' },
    plan: hasFeature(s, 'Individuelle Trainingspläne') && {
      q: 'Bekomme ich einen Trainingsplan?',
      a: 'Ja. Du erhältst einen individuellen Trainingsplan, der zu deinen Zielen und deinem Level passt – mit Expertenratschlägen unserer Trainer.',
    },
    courses: s.courses && {
      q: 'Welche Kurse gibt es?',
      a: `Alle Kurse und Zeiten findest du im Kursplan auf dieser Seite – zum Beispiel ${[...new Set(s.courses.days.flatMap((d) => d.items.map(([n]) => n)))].slice(0, 4).join(', ')}.`,
    },
    solarium: hasFeature(s, 'Solarium & Massage') && {
      q: 'Gibt es Solarium und Massage?',
      a: 'Ja. Nach dem Training kannst du dich mit einer Massage entspannen oder unsere modernen Solarien nutzen.',
    },
  };
}

function faqItems(s) {
  const b = faqBuilders(s);
  const list = s.faq === 'default' ? ['signup', 'trial', 'plan', 'courses', 'solarium', 'parking', 'hours'] : s.faq;
  return list.map((entry) => (typeof entry === 'string' ? b[entry] : entry)).filter(Boolean);
}

function faqSection(s) {
  const items = faqItems(s);
  return `
      <section class="section faq" id="faq" data-section>
        <div class="container faq__grid">
          <header class="faq__head">
            <p class="eyebrow" data-reveal><span class="eyebrow__dot"></span>FAQ</p>
            <h2 class="h2" data-reveal-title>Häufig gestellte<br />Fragen.</h2>
            <p class="lead" data-reveal>Noch etwas offen? Unser Team in ${esc(s.city)} hilft dir gerne persönlich weiter.</p>
            <a class="btn btn--line" href="#kontakt" data-reveal><span>Kontakt aufnehmen</span>${ARROW}</a>
          </header>
          <div class="accordion" data-accordion>
            ${items
              .map(
                (item, i) => `
            <div class="acc${i === 0 ? ' is-open' : ''}" data-reveal>
              <h3 class="acc__heading">
                <button class="acc__trigger" type="button" id="faq-t-${i}" aria-expanded="${i === 0}" aria-controls="faq-p-${i}">
                  <span class="acc__no">${pad(i + 1)}</span>
                  <span class="acc__q">${esc(item.q)}</span>
                  <span class="acc__icon" aria-hidden="true"></span>
                </button>
              </h3>
              <div class="acc__panel" id="faq-p-${i}" role="region" aria-labelledby="faq-t-${i}"${i === 0 ? '' : ' inert'}>
                <div class="acc__inner">${
                  item.a ? `<p>${esc(item.a)}</p>` : '<p data-placeholder>Platzhalter – diese Antwort wird mit den Angaben des Studios ergänzt.</p>'
                }</div>
              </div>
            </div>`,
              )
              .join('')}
          </div>
        </div>
      </section>`;
}

/* ---------- Mitgliedschaft ---------- */

const CHECK = ui('check', '');

function provisionalChip(offer) {
  return offer.provisional
    ? '<span class="chip chip--muted" title="Preise und Bedingungen stammen von der bestehenden Website und sind noch nicht bestätigt.">Konditionen vorläufig</span>'
    : '';
}

function priceBlock(value, regular, unit) {
  const [euros, cents] = price(value, { forceCents: !Number.isInteger(value) }).split(',');
  return `
          <p class="price" aria-label="${price(value, { forceCents: true })} Euro ${esc(unit)}${regular ? `, statt ${price(regular, { forceCents: true })} Euro` : ''}">
            <span class="price__value" aria-hidden="true"><span data-count="${Number(euros)}">${euros}</span>${
              cents ? `<span class="price__cents">,${cents}</span>` : ''
            }<span class="price__cur">€</span></span>
            <span class="price__meta" aria-hidden="true"><span>${esc(unit)}</span>${regular ? `<s>statt ${price(regular)}&nbsp;€</s>` : ''}</span>
          </p>`;
}

function tiersOffer(s) {
  const o = s.offer;
  return `
        <div class="offer offer--tiers">
          <header class="section-head section-head--split offer__head">
            <div>
              <p class="eyebrow" data-reveal><span class="eyebrow__dot"></span>${esc(o.label)}</p>
              <h2 class="h2" data-reveal-title>Member werden.<br /><span class="text-gold">${esc(o.headline)}</span></h2>
            </div>
            ${
              o.image
                ? `<figure class="offer__banner" data-reveal="clip">${img(o.image, { sizes: '(min-width: 900px) 40vw, 100vw', alt: 'Neueröffnung – Sportlerin jubelt im Studio' })}</figure>`
                : `<p class="lead" data-reveal>Flexible Mitgliedschaft für jedes Trainingsziel. Alle Tarife enthalten das All-In-Paket – garantiert fair & sicher.</p>`
            }
          </header>
          <div class="offer__meta" data-reveal>
            <span class="offer__label">Im All-In-Paket</span>
            <ul class="offer__included">${o.included.map((x) => `<li>${CHECK}${esc(x)}</li>`).join('')}</ul>
            ${provisionalChip(o)}
          </div>
          <div class="tiers">
            ${o.tiers
              .map(
                (t) => `
            <article class="tier${t.badge ? ' tier--featured' : ''}" data-reveal data-cursor-glow>
              <div class="tier__top">
                <span class="tier__term">${esc(t.term)}</span>
                ${t.badge ? `<span class="chip chip--gold">${esc(t.badge)}</span>` : ''}
              </div>
              <h3 class="tier__name">${esc(t.name)}</h3>
              ${priceBlock(t.price, t.regularPrice, 'pro Monat')}
              <p class="tier__text">${esc(t.text)}</p>
              ${link(s.links.signup, 'Mitglied werden', {
                cls: `btn ${t.badge ? 'btn--primary' : 'btn--ghost'} btn--block`,
                inner: `<span>Mitglied werden</span>${ARROW}`,
                placeholder: 'Der Link zur Online-Anmeldung wird hier hinterlegt.',
              })}
            </article>`,
              )
              .join('')}
          </div>
          ${o.fee ? `<p class="note offer__fee" data-reveal>* Alle Preise ${esc(o.fee)}.</p>` : ''}
        </div>`;
}

function singleOffer(s) {
  const o = s.offer;
  const athlete = s.slug === 'plettenberg';
  return `
        <div class="offer">
          <div class="offer__intro">
            <p class="eyebrow" data-reveal><span class="eyebrow__dot"></span>Mitgliedschaft</p>
            <h2 class="h2" data-reveal-title>Starte jetzt.<br /><span class="text-gold">Zum Aktionspreis.</span></h2>
            <p class="lead" data-reveal>Modernes Studio, professionelle Betreuung und faire Konditionen – garantiert ohne versteckte Kosten.</p>
            ${
              athlete
                ? `<picture class="offer__athlete" aria-hidden="true">${img('plettenberg/athlet-freisteller', {
                    sizes: '(min-width: 1000px) 30vw, 1px',
                    attrs: 'data-drift="-6"',
                  })}</picture>`
                : ''
            }
          </div>
          <article class="price-card" data-reveal data-cursor-glow aria-labelledby="offer-title">
            <div class="price-card__top">
              <span class="chip chip--gold">${esc(o.label)}</span>
              ${provisionalChip(o)}
            </div>
            <h3 class="price-card__title" id="offer-title">${esc(o.title)}</h3>
            ${priceBlock(o.price, o.regularPrice, o.priceUnit)}
            <ul class="price-card__list">${o.conditions.map((c) => `<li>${CHECK}<span>${esc(c)}</span></li>`).join('')}</ul>
            ${link(s.links.signup, 'Angebot sichern', {
              cls: 'btn btn--primary btn--lg btn--block',
              inner: `<span>Angebot sichern</span>${ARROW}`,
              placeholder: 'Der Link zur Online-Anmeldung wird hier hinterlegt.',
            })}
            ${o.footnote ? `<p class="price-card__note">* ${esc(o.footnote)}</p>` : ''}
          </article>
        </div>`;
}

function neutralOffer(s) {
  return `
        <div class="offer offer--neutral" data-reveal>
          <p class="eyebrow"><span class="eyebrow__dot"></span>Mitgliedschaft</p>
          <h2 class="h2">Werde Teil von<br /><span class="text-gold">MemberFit ${esc(s.city)}.</span></h2>
          <p class="lead">Melde dich online an oder lass dich persönlich im Studio beraten.</p>
          <div class="offer__actions">
            ${link(s.links.signup, 'Jetzt Mitglied werden', { cls: 'btn btn--primary btn--lg', inner: `<span>Jetzt Mitglied werden</span>${ARROW}` })}
            <a class="btn btn--ghost btn--lg" href="#kontakt"><span>Kontakt aufnehmen</span></a>
          </div>
        </div>`;
}

function trialStrip(s) {
  if (!s.links.trial) return '';
  return `
        <div class="trial" data-reveal>
          <div>
            <p class="trial__eyebrow">Noch unsicher?</p>
            <p class="trial__title">Teste uns beim kostenlosen Probetraining.</p>
          </div>
          ${link(s.links.trial, 'Kostenloses Probetraining', { cls: 'btn btn--ghost btn--lg', inner: `<span>Kostenloses Probetraining</span>${ARROW}` })}
        </div>`;
}

function membershipSection(s) {
  const o = s.offer;
  const body = !o?.enabled ? neutralOffer(s) : o.kind === 'tiers' ? tiersOffer(s) : singleOffer(s);
  return `
      <section class="section membership" id="mitgliedschaft" data-section>
        <div class="membership__bg" aria-hidden="true"></div>
        <!-- Angebot: src/data/studios.js → ${s.slug}.offer (vorläufig, abschaltbar) -->
        <div class="container">
          ${body}
          ${trialStrip(s)}
        </div>
      </section>`;
}

/* ---------- Weitere Bereiche ---------- */

function featuresSection(s) {
  return `
      <section class="section features" id="training" data-section>
        <div class="container">
          <header class="section-head section-head--split">
            <div>
              <p class="eyebrow" data-reveal><span class="eyebrow__dot"></span>Training & Betreuung</p>
              <h2 class="h2" data-reveal-title>Mit Struktur<br /><span class="text-gold">schneller ans Ziel.</span></h2>
            </div>
            <p class="lead" data-reveal>MemberFit bringt dich mit Struktur und Coaching schneller zu deinen Zielen.</p>
          </header>
          <div class="feature-list">
            ${s.features
              .map(
                (f, i) => `
            <article class="feature${i % 2 ? ' feature--flip' : ''}">
              <figure class="feature__media" data-reveal="clip">
                ${img(f.image, { sizes: '(min-width: 900px) 46vw, 100vw', alt: f.alt, attrs: 'data-parallax="7"' })}
              </figure>
              <div class="feature__body">
                <span class="feature__no" data-reveal>${pad(i + 1)}</span>
                <h3 class="feature__title" data-reveal>${esc(f.title)}</h3>
                <p class="feature__text" data-reveal>${esc(f.text)}</p>
                <ul class="feature__points">${f.points.map((p) => `<li data-reveal>${CHECK}${esc(p)}</li>`).join('')}</ul>
              </div>
            </article>`,
              )
              .join('')}
          </div>
        </div>
      </section>`;
}

function servicesSection(s) {
  return `
      <section class="section usps" id="leistungen" data-section>
        <div class="container">
          <header class="section-head section-head--split">
            <div>
              <p class="eyebrow" data-reveal><span class="eyebrow__dot"></span>Unsere Leistungen</p>
              <h2 class="h2" data-reveal-title>Alles drin.<br /><span class="text-gold">Nichts versteckt.</span></h2>
            </div>
            <p class="lead" data-reveal>Bei MemberFit ${esc(s.city)} findest du alles für ein effektives und abwechslungsreiches Training.</p>
          </header>
          <ul class="usp-grid usp-grid--3">
            ${s.services
              .map(
                (x, i) => `
            <li class="usp usp--compact" data-reveal data-cursor-glow>
              <span class="usp__no">${pad(i + 1)}</span>
              ${icon(x.icon)}
              <h3 class="usp__title">${esc(x.title)}</h3>
              <p class="usp__text">${esc(x.text)}</p>
            </li>`,
              )
              .join('')}
          </ul>
        </div>
      </section>`;
}

function gallerySection(s) {
  return `
      <section class="section studio" id="studio" data-section>
        <div class="container">
          <header class="section-head section-head--split">
            <div>
              <p class="eyebrow" data-reveal><span class="eyebrow__dot"></span>Unser Studio</p>
              <h2 class="h2" data-reveal-title>Einblicke in<br /><span class="text-gold">MemberFit ${esc(s.city)}.</span></h2>
            </div>
            <p class="lead" data-reveal>Besuche uns in ${esc(s.city)} – ${esc(s.address.street)}. Klicke auf ein Bild für die Großansicht.</p>
          </header>
          <div class="gallery gallery--${s.gallery.length}" id="gallery">
            ${s.gallery
              .map(
                (g, i) => `
            <button class="tile tile--${g.size}" type="button" data-index="${i}" data-caption="${esc(g.caption)}" data-reveal="clip" aria-label="${esc(g.caption)} – Bild vergrößern">
              ${img(g.file, { sizes: '(min-width: 900px) 60vw, 100vw', alt: g.alt })}
              <span class="tile__caption"><em>${pad(i + 1)}</em>${esc(g.caption)}</span>
              <span class="tile__zoom">${ui('zoom', '')}</span>
            </button>`,
              )
              .join('')}
          </div>
          ${s.galleryNote ? `<p class="note" data-reveal>${esc(s.galleryNote)}</p>` : ''}
        </div>
      </section>`;
}

function coursesSection(s) {
  if (!s.courses) return '';
  return `
      <section class="section courses" id="kurse" data-section>
        <div class="container">
          <header class="section-head section-head--split">
            <div>
              <p class="eyebrow" data-reveal><span class="eyebrow__dot"></span>Kursplan</p>
              <h2 class="h2" data-reveal-title>Unsere<br /><span class="text-gold">Kurse.</span></h2>
            </div>
            <p class="lead" data-reveal>Gemeinsam trainieren, motiviert bleiben: Kurse für jedes Fitnesslevel – inklusive in deiner Mitgliedschaft.</p>
          </header>
          <div class="schedule" style="--days:${s.courses.days.length}">
            ${s.courses.days
              .map(
                (d) => `
            <div class="schedule__day" data-reveal>
              <h3 class="schedule__name">${esc(d.day)}</h3>
              <ul>${d.items.map(([name, time]) => `<li><strong>${esc(name)}</strong><span>${esc(time)} Uhr</span></li>`).join('')}</ul>
            </div>`,
              )
              .join('')}
          </div>
          <p class="note" data-reveal>Kursplan laut bestehender Website – Änderungen vorbehalten.</p>
        </div>
      </section>`;
}

function reviewsSection(s) {
  if (!s.reviews?.length) return '';
  return `
      <section class="section reviews" aria-labelledby="reviews-title">
        <div class="container reviews__grid">
          <header class="reviews__head">
            <p class="eyebrow" data-reveal><span class="eyebrow__dot"></span>Zufriedenheit</p>
            <h2 class="h2" id="reviews-title" data-reveal-title>${esc(s.rating.value)}<span class="reviews__of"> / 5</span></h2>
            <p class="reviews__stars" data-reveal aria-label="${esc(s.rating.value)} von 5 Sternen">${ui('star', 'star').repeat(5)}</p>
            <p class="lead" data-reveal>aus ${s.rating.count} Bewertungen unserer Mitglieder.</p>
          </header>
          <ul class="reviews__list">
            ${s.reviews
              .map(
                (r) => `
            <li class="review" data-reveal data-cursor-glow>
              <p class="review__text">„${esc(r.text)}"</p>
              <p class="review__author">${esc(r.author)}</p>
            </li>`,
              )
              .join('')}
          </ul>
        </div>
      </section>`;
}

function referralSection(s) {
  if (!s.referral) return '';
  const text =
    s.status === 'opening'
      ? `Neues Fitnessstudio in ${s.city}! MemberFit ${s.city} eröffnet bald – sichere dir jetzt das Eröffnungsangebot: `
      : `Ich trainiere bei MemberFit ${s.city} und kann dir das Studio empfehlen! Hier kannst du dich online anmelden: `;
  const share = `https://wa.me/?text=${encodeURIComponent(text + (s.links.signup ?? ''))}`;
  return `
      <section class="section referral" id="empfehlung" aria-labelledby="referral-title">
        <div class="container">
          <div class="referral__card" data-reveal>
            <figure class="referral__media">${img('shared/empfehlung', { sizes: '(min-width: 900px) 30vw, 100vw', alt: 'Zwei Mitglieder geben sich ein High Five' })}</figure>
            <div class="referral__body">
              <p class="eyebrow"><span class="eyebrow__dot"></span>Empfehle MemberFit</p>
              <h2 class="h2" id="referral-title">1 Monat<br /><span class="text-gold">gratis.</span></h2>
              <p class="lead">${esc(
                s.referralText ??
                  `Trainierst du bereits bei MemberFit ${s.city}? Teile deine Erfahrung mit Freunden – für jede erfolgreiche Empfehlung über WhatsApp erhältst du einen Monat kostenloses Training.`,
              )}</p>
              <a class="btn btn--primary btn--lg" href="${esc(share)}" target="_blank" rel="noopener"><span>Per WhatsApp teilen</span>${ui('share', 'btn__arrow')}</a>
            </div>
          </div>
        </div>
      </section>`;
}

function contactSection(s, studios, root) {
  const a = s.address;
  const others = studios.filter((x) => x.slug !== s.slug);
  return `
      <section class="section closing" id="kontakt" data-section>
        <div class="closing__media" aria-hidden="true">${img(s.gallery[0].file, { sizes: '100vw', attrs: 'data-parallax="10"' })}</div>
        <div class="container closing__inner">
          <p class="eyebrow" data-reveal><span class="eyebrow__dot"></span>${s.status === 'opening' ? 'Bald geht es los' : 'Bereit?'}</p>
          <h2 class="h1" data-reveal-title>Werde heute noch<br /><span class="text-gold">Member bei uns.</span></h2>
          <p class="lead" data-reveal>Entdecke MemberFit ${esc(s.city)} und starte mit deinem Training.</p>
          <div class="closing__actions" data-reveal>
            ${link(s.links.signup, 'Jetzt Mitglied werden', { cls: 'btn btn--primary btn--lg', inner: `<span>Jetzt Mitglied werden</span>${ARROW}` })}
            ${
              s.links.trial
                ? link(s.links.trial, 'Probetraining', { cls: 'btn btn--ghost btn--lg', inner: '<span>Probetraining</span>' })
                : `<a class="btn btn--ghost btn--lg" href="mailto:${esc(s.email)}"><span>Kontakt aufnehmen</span></a>`
            }
          </div>

          <div class="contact-cards">
            <div class="contact-card" data-reveal>
              <p class="contact-card__label">${ui('pin')}Adresse</p>
              <p class="contact-card__value">${esc(a.street)}<br />${esc(a.zip)} ${esc(a.city)}</p>
              <a class="contact-card__more" href="${mapsUrl(a)}" target="_blank" rel="noopener">Route planen ↗</a>
            </div>
            <div class="contact-card contact-card--hours" data-reveal>
              <p class="contact-card__label">${ui('clock')}Öffnungszeiten</p>
              <dl class="hours">${s.hours.map((h) => `<div><dt>${esc(h.days)}</dt><dd>${esc(h.time)}</dd></div>`).join('')}</dl>
            </div>
            <div class="contact-card" data-reveal>
              <p class="contact-card__label">${ui('phone')}Kontakt</p>
              <p class="contact-card__value">
                ${s.phone ? `<a href="${telHref(s.phone)}">${esc(s.phone)}</a>` : placeholder('Telefon folgt')}<br />
                <a href="mailto:${esc(s.email)}">${esc(s.email)}</a>
              </p>
              ${
                s.social.length
                  ? `<p class="contact-card__social">${s.social
                      .map((x) => `<a href="${esc(x.url)}" target="_blank" rel="noopener" aria-label="${esc(x.label)}">${ui(x.label.toLowerCase(), 'ico')}</a>`)
                      .join('')}</p>`
                  : ''
              }
            </div>
          </div>

          <div class="other-studios" data-reveal>
            <p class="other-studios__label">${ui('swap')}Weitere Standorte</p>
            <div class="closing__studios">
              ${others.map((x) => `<a class="studio-chip" href="${root}${x.slug}/"><span>${esc(x.city)}</span>${ui('arrow')}</a>`).join('')}
            </div>
          </div>
        </div>
      </section>`;
}

/* ---------- Hero ---------- */

function hero(s) {
  const lines =
    s.status === 'opening'
      ? [['Neueröffnung.', ''], ['Bald ist es', ''], ['so weit.', 'text-gold']]
      : [['Dein Training.', ''], ['Dein Fortschritt.', ''], ['Dein MemberFit.', 'text-gold']];
  const facts = [
    `${ui('pin')}${esc(s.address.street)}, ${esc(s.address.city)}`,
    `${ui('clock')}${esc(s.hours[0].days.replace('Montag – Freitag', 'Mo–Fr'))} ${esc(s.hours[0].time)}`,
    s.rating && `${ui('star')}${esc(s.rating.value)} / 5 · ${s.rating.count} Bewertungen`,
    hasParking(s) && `${ui('check')}Kostenlos parken`,
  ].filter(Boolean);
  return `
      <section class="hero" id="start" data-section>
        <div class="hero__media" aria-hidden="true">
          ${img(s.heroImage, { sizes: '100vw', cls: 'hero__img', priority: true, attrs: `data-hero-img style="object-position:${s.heroPosition}"` })}
          <div class="hero__overlay"></div>
          <div class="hero__glow"></div>
        </div>

        <div class="container hero__content">
          <p class="eyebrow" data-hero-fade>
            <span class="eyebrow__dot"></span>MemberFit ${esc(s.city)}
            ${s.status === 'opening' ? `<span class="tag tag--gold">${esc(s.statusLabel)}</span>` : ''}
          </p>
          <h1 class="hero__title" aria-label="${esc(lines.map(([t]) => t).join(' '))} – MemberFit ${esc(s.city)}">
            ${lines.map(([t, c]) => `<span class="line" aria-hidden="true"><span data-hero-line${c ? ` class="${c}"` : ''}>${esc(t)}</span></span>`).join('\n            ')}
          </h1>
          <p class="hero__lead" data-hero-fade>${esc(s.intro)}</p>
          <div class="hero__actions" data-hero-fade>
            ${link(s.links.signup, 'Jetzt Mitglied werden', { cls: 'btn btn--primary btn--lg', inner: `<span>Jetzt Mitglied werden</span>${ARROW}` })}
            ${
              s.links.trial
                ? link(s.links.trial, 'Probetraining', { cls: 'btn btn--ghost btn--lg', inner: '<span>Probetraining</span>' })
                : '<a class="btn btn--ghost btn--lg" href="#studio"><span>Studio entdecken</span></a>'
            }
          </div>
        </div>

        <ul class="hero__facts container" data-hero-fade>
          ${facts.map((f) => `<li>${f}</li>`).join('')}
        </ul>

        <a class="scroll-hint" href="#leistungen" data-hero-fade aria-label="Weiter zu den Leistungen">
          <span class="scroll-hint__label">Scroll</span><span class="scroll-hint__line"></span>
        </a>
      </section>`;
}

/* ---------- Seite ---------- */

export function renderStudio({ site, studio: s, studios }) {
  const root = '../';
  const links = navLinks(s);
  const from = s.offer?.enabled ? Math.min(...(s.offer.kind === 'tiers' ? s.offer.tiers.map((t) => t.price) : [s.offer.price])) : null;

  return `${head({
    title: `MemberFit ${s.city} – Fitnessstudio in ${s.city}`,
    description: `MemberFit ${s.city}${s.status === 'opening' ? ' – Neueröffnung' : ''}: ${s.address.street}, ${s.address.zip} ${s.address.city}. ${s.highlights.join(', ')}${
      from !== null ? `. Mitgliedschaft ab ${price(from)} € im Monat` : ''
    }.`,
    site,
    entry: 'studio',
  })}
  <body class="page-studio" data-studio="${s.slug}">
    ${nav({
      studios,
      current: s,
      root,
      links,
      cta: { url: s.links.signup, label: 'Mitglied werden', placeholder: 'Der Link zur Online-Anmeldung wird hier hinterlegt.' },
    })}

    <main id="main">
      ${hero(s)}
      ${marquee(s.city)}
      ${servicesSection(s)}
      ${featuresSection(s)}
      ${gallerySection(s)}
      ${coursesSection(s)}
      ${membershipSection(s)}
      ${reviewsSection(s)}
      ${referralSection(s)}
      ${faqSection(s)}
      ${contactSection(s, studios, root)}
    </main>
    ${footer({ site, studios, current: s, root, links: [...links, { id: 'faq', label: 'FAQ' }].filter((l, i, arr) => arr.findIndex((x) => x.id === l.id) === i) })}
    ${overlays()}
  </body>
</html>
`;
}
