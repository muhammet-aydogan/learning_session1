/**
 * ZENTRALE INHALTS-KONFIGURATION – Memberfit Plettenberg
 * ------------------------------------------------------------------
 * Alles, was vor dem Livegang mit dem Kunden abgestimmt werden muss,
 * steht in dieser Datei: Links, Kontaktdaten, Angebot/Preise, FAQ,
 * Galerie. Werte mit `null` gelten als PLATZHALTER und werden auf der
 * Seite als „folgt" dargestellt.
 */

export const site = {
  /** Platzhalter auf der Seite sichtbar markieren (für die Kundenpräsentation). */
  showPlaceholderMarks: true,

  links: {
    /**
     * PLATZHALTER: echter Link zur Online-Anmeldung.
     * Solange `null`, zeigen die Buttons „Angebot sichern" einen Hinweis
     * statt zu navigieren.
     */
    signup: null,
    // Von der bestehenden Website übernommen – vor Livegang prüfen/ersetzen.
    impressum: 'https://memberfit.fitness-konzepte.de/impressum',
    datenschutz: 'https://memberfit.fitness-konzepte.de/datenschutz',
    agb: 'https://online-mitgliedschaften.de/wp-content/uploads/2026/03/ALLGEMEINE-GESCHAeFTSBEDINGUNGEN-MONATSVERTRAG.pdf',
  },

  contact: {
    // Quelle: Impressum der bestehenden Website – Schreibweise bitte vom Kunden bestätigen lassen.
    street: 'Adolfsternbergstr. 3',
    city: '58840 Plettenberg',
    email: 'studio@memberfit-plettenberg.de',
    phone: null, // PLATZHALTER – nicht bekannt
    openingHours: null, // PLATZHALTER – nicht bekannt
    social: [], // PLATZHALTER – z. B. { label: 'Instagram', url: '…' }
  },

  /**
   * ANGEBOT – VORLÄUFIG!
   * Alle Werte stammen von der Aktionsseite der bestehenden Website und
   * sind NICHT als aktuell bestätigt zu behandeln.
   *  - `enabled: false`   blendet den Preis-/Angebotsblock komplett aus
   *                       (es bleibt ein neutraler Mitgliedschafts-CTA).
   *  - `provisional: true` zeigt den Hinweis „Konditionen vorläufig".
   */
  offer: {
    enabled: true,
    provisional: true,
    label: 'Aktionsangebot',
    title: 'Deine Mitgliedschaft',
    price: 34.9,
    regularPrice: 39.9,
    priceUnit: 'pro Monat',
    conditions: [
      '12 Monate Erstlaufzeit',
      'Danach monatlich kündbar',
      'Anmeldegebühr entfällt bei Online-Anmeldung',
      'Chipband einmalig 19,90 €',
    ],
    cta: 'Angebot sichern',
    // Fußnote laut bestehender Website (sinngemäß gekürzt) – rechtlich prüfen lassen.
    footnote:
      'Erstlaufzeit 12 Monate, danach monatlich kündbar mit einer Frist von einem Monat in Textform. ' +
      'Monatsbeitrag 34,90 € statt 39,90 €. Die Anmeldegebühr entfällt bei Online-Anmeldung. ' +
      'Einmalig 19,90 € für das Chipband, Einzug zu Vertragsbeginn. Es gelten die Allgemeinen Geschäftsbedingungen.',
  },

  /** FAQ – Antworten aus den Texten der bestehenden Website abgeleitet. `a: null` = Platzhalter. */
  faq: [
    {
      q: 'Wie läuft die Anmeldung ab?',
      a: 'Du gibst deine Kontaktdaten an und meldest dich anschließend ganz entspannt online an – das dauert nur etwa zwei Minuten.',
    },
    {
      q: 'Was kann ich alles nutzen?',
      a: 'Du kannst bei Memberfit Personal Training, einen modern ausgestatteten Cardio- und Kraftgerätebereich sowie eine kostenlose Getränkeflat nutzen. Damit hast du alles für effektives Training und deine Regeneration an einem Ort.',
    },
    {
      q: 'An wen kann ich mich bei Fragen wenden?',
      a: 'Während des Trainings vor Ort stehen dir die Trainer jederzeit zur Verfügung. Bei Fragen zum Training, zum Trainingsprogramm oder zu den Geräten kannst du dich direkt an das kompetente Trainerteam wenden.',
    },
    {
      q: 'Gibt es Parkplätze am Studio?',
      a: 'Ja. Kostenlose Parkplätze findest du direkt vor unserem Studio – für eine entspannte und unkomplizierte Anreise.',
    },
    {
      q: 'Wie lange läuft die Mitgliedschaft?',
      a: 'Die Mitgliedschaft hat eine Erstlaufzeit von 12 Monaten und ist danach monatlich kündbar.',
      requiresOffer: true, // nur anzeigen, solange das (vorläufige) Angebot aktiv ist
    },
    {
      q: 'Welche Öffnungszeiten hat das Studio?',
      a: null, // PLATZHALTER – Öffnungszeiten fehlen
    },
  ],

  /**
   * GALERIE – Bilder der bestehenden Website (3D-Visualisierungen des Studios).
   * `size` steuert die Kachelgröße im Grid: 'wide' | 'tall' | 'std'.
   */
  gallery: [
    { file: 'studio-kraft', alt: 'Visualisierung der Trainingsfläche mit Kraftgeräten', caption: 'Trainingsfläche', size: 'wide' },
    { file: 'studio-empfang', alt: 'Visualisierung des Eingangsbereichs mit Holzlamellenwand', caption: 'Eingangsbereich', size: 'std' },
    { file: 'studio-cardio', alt: 'Visualisierung des Cardio- und Gerätebereichs', caption: 'Cardio & Geräte', size: 'tall' },
    { file: 'studio-lounge', alt: 'Visualisierung des Loungebereichs mit Blick auf die Trainingsfläche', caption: 'Lounge', size: 'wide' },
    { file: 'studio-umkleide', alt: 'Visualisierung des Umkleidebereichs mit Spinden', caption: 'Umkleide', size: 'std' },
  ],
};

/** Preis im deutschen Format, z. B. 34.9 → "34,90" */
export const formatPrice = (value) =>
  value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
