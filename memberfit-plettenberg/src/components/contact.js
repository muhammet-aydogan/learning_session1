import { site } from '../config/site.config.js';
import { $, esc } from './dom.js';

const placeholder = (label) => `<span data-placeholder>${label} folgt</span>`;

/** Kontaktdaten (Abschlussbereich + Footer) aus der Konfiguration. */
export function renderContact() {
  const c = site.contact;
  const address = c.street && c.city ? `${esc(c.street)}<br />${esc(c.city)}` : placeholder('Adresse');
  const mapsUrl =
    c.street && c.city
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Memberfit ${c.street}, ${c.city}`)}`
      : null;
  const mail = c.email ? `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>` : placeholder('E-Mail');
  const phone = c.phone ? `<a href="tel:${esc(c.phone.replace(/[^+\d]/g, ''))}">${esc(c.phone)}</a>` : placeholder('Telefonnummer');
  const hours = c.openingHours ? esc(c.openingHours) : placeholder('Öffnungszeiten');

  const cards = $('#kontakt-daten');
  if (cards) {
    cards.innerHTML = `
      <div class="contact-card" data-reveal>
        <dt>Adresse</dt>
        <dd>${address}${mapsUrl ? `<a class="contact-card__more" href="${mapsUrl}" target="_blank" rel="noopener">Route planen ↗</a>` : ''}</dd>
      </div>
      <div class="contact-card" data-reveal><dt>E-Mail</dt><dd>${mail}</dd></div>
      <div class="contact-card" data-reveal><dt>Telefon</dt><dd>${phone}</dd></div>
      <div class="contact-card" data-reveal><dt>Öffnungszeiten</dt><dd>${hours}</dd></div>`;
  }

  const footer = $('#footer-contact');
  if (footer) {
    footer.innerHTML = `Memberfit Plettenberg<br />${address}<br />${mail}<br />${phone}`;
  }

  // „Kontakt aufnehmen": direkt E-Mail öffnen, sobald eine Adresse hinterlegt ist.
  const mailBtn = $('[data-contact-mail]');
  if (mailBtn && c.email) mailBtn.href = `mailto:${c.email}`;

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
}
