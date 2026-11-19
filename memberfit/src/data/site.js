/**
 * MARKEN- UND LANDING-PAGE-DATEN – MemberFit (memberfit.de)
 * Quelle der Texte: memberfit.de (Stand: November 2026).
 */
export const site = {
  brand: 'MemberFit',
  claim: 'Fitness · Gesundheit · Lifestyle',
  /** Platzhalter auf der Seite sichtbar markieren (für die Kundenpräsentation). */
  showPlaceholderMarks: true,
  /** Entwurf nicht indexieren. Vor dem Livegang auf false setzen. */
  noindex: true,

  email: 'info@memberfit.de',
  legal: {
    impressum: 'https://memberfit.de/impressum',
    // TODO Kunde: memberfit.de verlinkt hier die Datenschutzerklärung von Mettmann.
    datenschutz: 'https://memberfit.de/datenschutz-mettmann',
    agb: 'https://memberfit.de/agb',
  },

  landing: {
    heroImage: 'landing/hero',
    benefits: [
      { icon: 'card', title: 'Mitgliedschaft', text: 'Profitiere von flexiblen Mitgliedschaften und fairen Konditionen. Trainiere so oft du möchtest und nutze unser vielfältiges Angebot an Geräten und Kursen.' },
      { icon: 'smile', title: 'Zufriedenheit', text: 'Die Zufriedenheit unserer Mitglieder steht für uns an erster Stelle. Wir sorgen für eine motivierende Atmosphäre, in der du dich wohlfühlst.' },
      { icon: 'pin', title: 'Top Standorte', text: 'Unsere Studios befinden sich an gut erreichbaren Standorten. So kannst du dein Training ganz einfach in deinen Alltag integrieren.' },
      { icon: 'sparkle', title: 'Sauberkeit', text: 'Sauberkeit und Hygiene haben bei uns höchste Priorität. Alle Trainingsbereiche werden regelmäßig gereinigt.' },
    ],
    steps: ['Online abschließen', 'Ins Studio kommen', 'Startpaket abholen', 'Training starten'],
    stepsImage: 'landing/start',
    services: [
      { icon: 'cardio', title: 'Ausdauertraining', text: 'Moderne Laufbänder, Crosstrainer und Fahrradergometer für deine Kondition.' },
      { icon: 'strength', title: 'Krafttraining', text: 'Hochwertige Kraftgeräte und individuelle Trainingspläne für gezielten Muskelaufbau.' },
      { icon: 'dumbbell', title: 'Freihantelbereich', text: 'Maximale Bewegungsfreiheit – ob Anfänger oder Profi.' },
      { icon: 'parking', title: 'Kostenlos parken', text: 'Kostenfreie Parkplätze direkt vor der Tür.' },
      { icon: 'drink', title: 'Getränke', text: 'Sportgetränke und Wasser stehen dir jederzeit zur Verfügung.' },
      { icon: 'circuit', title: 'Zirkeltraining', text: 'Effizientes Ganzkörpertraining für Kraft, Ausdauer und Beweglichkeit.' },
      { icon: 'device', title: 'E-Gym Geräte', text: 'Moderne, smarte Geräte für ein effektives und sicheres Training.' },
      { icon: 'coach', title: 'MemberFit Coaches', text: 'Erfahrene Coaches unterstützen dich dabei, deine Ziele zu erreichen.' },
      { icon: 'calendar', title: 'Individuelle Kurse', text: 'Abwechslungsreiche Kurse für jedes Fitnesslevel.' },
    ],
    servicesNote: 'Das Angebot unterscheidet sich je Standort – die Details findest du auf der Seite deines Studios.',
    impressions: [
      { file: 'landing/impression-1', alt: 'Cardiobereich mit Crosstrainern' },
      { file: 'landing/impression-3', alt: 'Kraftgeräte im hellen Trainingsraum' },
      { file: 'landing/impression-2', alt: 'Rack mit Hantelbank' },
      { file: 'landing/impression-4', alt: 'Kabelzug und Kraftstationen' },
      { file: 'landing/impression-5', alt: 'Trainingsbereich mit Pflanzen am Fenster' },
      { file: 'landing/impression-6', alt: 'Hantelbänke im Freihantelbereich' },
    ],
  },
};
