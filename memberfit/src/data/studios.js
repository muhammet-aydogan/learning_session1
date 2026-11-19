/**
 * STUDIO-DATEN – MemberFit
 * ------------------------------------------------------------------
 * Jede Studioseite (/<slug>/) und die Studio-Liste der Landing Page
 * werden beim Build aus diesen Daten erzeugt (scripts/generate-pages.mjs).
 *
 * Quelle: memberfit.de/<studio> (Stand: November 2026) sowie die
 * Anmeldeseiten unter memberfit.fitness-konzepte.de.
 *
 * Konventionen
 *  - `null` = Platzhalter: wird auf der Seite als „… folgt" markiert.
 *  - `offer.provisional: true` zeigt den Hinweis „Konditionen vorläufig".
 *  - `offer.enabled: false` blendet alle Preise des Studios aus.
 *  - Bildnamen beziehen sich auf public/images/<name>-<breite>.webp.
 */

/* ---------- Gemeinsame Bausteine (identisch auf memberfit.de) ---------- */

const FEATURE_PLAN = {
  title: 'Individuelle Trainingspläne',
  text: 'Expertenratschläge und maßgeschneiderte Trainingspläne für deine Bedürfnisse, um optimale Ergebnisse zu erzielen.',
  points: ['Persönlicher Plan für deine Ziele', 'Plan passend zu deinem Level', 'Fortschritt im Blick', 'Schnelles Ziel'],
  image: 'shared/trainingsplan',
  alt: 'Trainer bespricht einen Trainingsplan mit einer Sportlerin',
};

const FEATURE_SOLARIUM = {
  title: 'Solarium & Massage',
  text: 'Entspanne nach deinem Workout mit einer Massage oder bräune dich in unseren top Bräunungsgeräten.',
  points: ['Entspannung nach deinem Training', 'Moderne Solarien für Bräune', 'Schnell regenerieren', 'Mehr Erholung'],
  image: 'shared/solarium',
  alt: 'Geöffnetes Solarium mit rotem Licht',
};

const FEATURE_COURSES = {
  title: 'Trainingskurse',
  text: 'Unser Kursangebot umfasst eine breite Palette an Kursen, die darauf abzielen, deine Fitness zu verbessern und deine Trainingsziele zu erreichen.',
  points: ['Kurse für jedes Fitness Level', 'Training mit guten Coaches', 'Mehr Spaß zusammen', 'Neue Energie'],
  image: 'shared/kurse',
  alt: 'Gruppe beim Dehnen in einem Kursraum',
};

const SERVICE = {
  cardio: { icon: 'cardio', title: 'Ausdauertraining', text: 'Steigere deine Kondition und verbessere deine Herz-Kreislauf-Gesundheit mit modernen Laufbändern, Crosstrainern und Fahrradergometern.' },
  strength: { icon: 'strength', title: 'Krafttraining', text: 'Baue gezielt Muskeln auf und stärke deinen Körper mit hochwertigen Kraftgeräten und individuellen Trainingsplänen.' },
  freeweights: { icon: 'dumbbell', title: 'Freihantelbereich', text: 'Maximale Bewegungsfreiheit für dein Training – ob Anfänger oder Profi, hier findest du alles für dein effektives Workout.' },
  parking: { icon: 'parking', title: 'Kostenlos parken', text: 'Bequem und stressfrei parken – kostenfreie Parkplätze direkt vor der Tür.' },
  drinks: { icon: 'drink', title: 'Getränke', text: 'Bleib hydriert! Erfrischende Sportgetränke und Wasser stehen dir jederzeit zur Verfügung.' },
  circuit: { icon: 'circuit', title: 'Zirkeltraining', text: 'Effizientes Ganzkörpertraining in kurzer Zeit – ideal, um Kraft, Ausdauer und Beweglichkeit zu kombinieren.' },
};

/** Drei Tarife wie auf memberfit.de (Mettmann, Herne, Erkrath). */
const tiers = ({ flex = 40, flexRegular = 45 } = {}) => [
  {
    name: '24 Monate Member',
    price: 30,
    regularPrice: 35,
    term: '24 Monate Laufzeit',
    text: 'Volle Leistung zum fairen Preis! Alle Vorteile des All-In-Pakets – mit fester Laufzeit von 24 Monaten und klaren Konditionen.',
  },
  {
    name: '12 Monate Member',
    price: 35,
    regularPrice: 40,
    term: '12 Monate Laufzeit',
    text: 'Volle Leistung zum fairen Preis! Alle Vorteile des All-In-Pakets – mit fester Laufzeit von 12 Monaten und klaren Konditionen.',
  },
  {
    name: 'Flex Member',
    price: flex,
    regularPrice: flexRegular,
    term: 'Monatlich kündbar',
    text: 'Maximale Flexibilität ohne Kompromisse! Alle Vorteile des All-In-Pakets – die Mitgliedschaft ist monatlich kündbar.',
    badge: 'Beliebt',
  },
];

const HOURS_LATE = [
  { days: 'Montag – Freitag', time: '6:00 – 24:00 Uhr' },
  { days: 'Samstag & Sonntag', time: '9:00 – 21:00 Uhr' },
];

const MEMBERFIT_AGB = 'https://memberfit.de/agb';

/* ---------- Studios ---------- */

export const studios = [
  {
    slug: 'mettmann',
    city: 'Mettmann',
    status: 'open',
    heroImage: 'mettmann/hero',
    heroPosition: '62% 30%',
    intro:
      'Wir bringen frischen Wind in dein Training! MemberFit steht für ein modernes Fitnesserlebnis mit neuem Design, topaktuellen Geräten und einer größeren Auswahl an Kursen.',
    address: { street: 'Elberfelder Str. 81', zip: '40822', city: 'Mettmann' },
    phone: '02104 9570037',
    email: 'info@memberfit.de',
    hours: [...HOURS_LATE, { days: 'Feiertage', time: '8:00 – 18:00 Uhr' }],
    rating: { value: '4,6', count: 149 },
    social: [
      { label: 'Instagram', url: 'https://www.instagram.com/memberfitmettmann/' },
      { label: 'Facebook', url: 'https://www.facebook.com/p/Memberfit-Mettmann-100063489253807/' },
    ],
    links: {
      signup: 'https://checkout.moresports.io/4015716/checkout/memberfit_mettmann/rates/1210023930',
      trial: 'https://checkout.moresports.io/4015716/checkout/memberfit_mettmann/trial-session/1210023930',
      impressum: 'https://memberfit.de/impressum-mettmann',
      datenschutz: 'https://memberfit.de/datenschutz-mettmann',
      agb: MEMBERFIT_AGB,
      cancel: 'https://public.magicline.com/#/contractTermination?tenant=memberfit&studio=1210023930',
    },
    highlights: ['Solarium & Massage', 'Kurse', 'Bis 24 Uhr'],
    features: [FEATURE_PLAN, FEATURE_SOLARIUM, FEATURE_COURSES],
    services: [SERVICE.cardio, SERVICE.strength, SERVICE.freeweights, SERVICE.parking, SERVICE.drinks, SERVICE.circuit],
    gallery: [
      { file: 'mettmann/studio-1', alt: 'Cardiobereich mit Crosstrainern und Ergometern vor großen Fenstern', caption: 'Cardiobereich', size: 'big' },
      { file: 'mettmann/studio-3', alt: 'Kraftbereich mit Geräten und Kabelzug', caption: 'Kraftbereich', size: 'std' },
      { file: 'mettmann/studio-2', alt: 'Reihe von Ausdauergeräten im hellen Trainingsraum', caption: 'Ausdauer', size: 'std' },
    ],
    courses: {
      days: [
        { day: 'Montag', items: [['Kickboxen', '17:15 – 18:15'], ['Stepfit', '18:30 – 19:30'], ['Pilates', '19:30 – 20:30']] },
        { day: 'Dienstag', items: [['Fit in the morning', '10:00 – 11:00'], ['Fit & Entspannt', '11:00 – 12:00'], ['Dance Fit', '18:30 – 19:30'], ['Strong Nation', '19:30 – 20:30']] },
        { day: 'Mittwoch', items: [['HYROX', '18:00 – 19:00'], ['HYROX', '19:00 – 20:00']] },
        { day: 'Donnerstag', items: [['Fit in the morning', '10:00 – 11:00'], ['Fit & Entspannt', '11:00 – 12:00']] },
        { day: 'Samstag', items: [['Kickboxen', '09:30 – 10:30']] },
      ],
    },
    offer: {
      enabled: true,
      provisional: true,
      kind: 'tiers',
      label: 'Oktober Special',
      headline: 'Trainiere ab 30\u00a0€ im Monat.',
      included: ['Ausdauertraining', 'Krafttraining', 'Kurse', 'Solarium', 'Massageliege', 'Getränke'],
      tiers: tiers(),
      fee: 'zzgl. einmaliger Anmeldegebühr von 49,80 €',
    },
    faq: 'default',
    reviews: [],
    referral: true,
  },

  {
    slug: 'herne',
    city: 'Herne',
    status: 'open',
    heroImage: 'herne/hero',
    heroPosition: '58% 28%',
    intro:
      'Wir bringen frischen Wind in dein Training! MemberFit steht für ein modernes Fitnesserlebnis mit neuem Design, topaktuellen Geräten und einer größeren Auswahl an Kursen.',
    address: { street: 'Roonstraße 23', zip: '44629', city: 'Herne' },
    phone: '02323 2078761',
    email: 'info@memberfit.de',
    hours: HOURS_LATE,
    rating: { value: '4,6', count: 587 },
    social: [
      { label: 'Instagram', url: 'https://www.instagram.com/memberfit.herne/' },
      // TODO Kunde: Facebook-Seite trägt noch den alten Namen (cleverfitherne).
      { label: 'Facebook', url: 'https://www.facebook.com/cleverfitherne/' },
    ],
    links: {
      signup: 'https://checkout.moresports.io/4015716/checkout/memberfit_herne/rates/1217908280',
      trial: 'https://checkout.moresports.io/4015716/checkout/memberfit_herne/trial-session/1217908280',
      impressum: 'https://memberfit.de/impressum-herne',
      datenschutz: 'https://memberfit.de/datenschutz-herne',
      agb: MEMBERFIT_AGB,
      // TODO Kunde: Link nutzt auf memberfit.de die Studio-ID von Mettmann.
      cancel: 'https://public.magicline.com/#/contractTermination?tenant=memberfit&studio=1210023930',
    },
    highlights: ['Solarium & Massage', 'Kurse', 'Bis 24 Uhr'],
    features: [FEATURE_PLAN, FEATURE_SOLARIUM, FEATURE_COURSES],
    services: [SERVICE.cardio, SERVICE.strength, SERVICE.freeweights, SERVICE.parking, SERVICE.drinks, SERVICE.circuit],
    gallery: [
      { file: 'herne/studio-2', alt: 'Functional-Bereich mit Rack und Kunstrasen', caption: 'Functional', size: 'big' },
      { file: 'herne/studio-1', alt: 'Kraftgerät vor einem Bildschirm im Gerätebereich', caption: 'Gerätebereich', size: 'std' },
      { file: 'herne/studio-3', alt: 'Kurzhanteln im Hantelständer', caption: 'Freihantel', size: 'std' },
      { file: 'herne/studio-5', alt: 'Reihe von Fahrradergometern', caption: 'Cardio', size: 'std' },
      { file: 'herne/studio-6', alt: 'Massageliege im Wellnessbereich', caption: 'Massage', size: 'std' },
      { file: 'herne/studio-4', alt: 'Trainingsbereich mit roter Wand', caption: 'Studio', size: 'std' },
    ],
    courses: {
      days: [
        { day: 'Dienstag', items: [['Latino Dance', '18:30 – 19:30']] },
        { day: 'Donnerstag', items: [['Body Fit', '19:00 – 20:00']] },
      ],
    },
    offer: {
      enabled: true,
      provisional: true,
      kind: 'tiers',
      label: 'MemberFit Special',
      headline: 'Monatlich kündbar ab 30\u00a0€.',
      included: ['Ausdauertraining', 'Krafttraining', 'Kurse', 'Solarium', 'Massageliege', 'Getränke'],
      // TODO Kunde: Flex-Tarif steht auf memberfit.de mit 30 € (statt 45 €) – bitte bestätigen.
      tiers: tiers({ flex: 30, flexRegular: 45 }),
      fee: 'zzgl. einmaliger Anmeldegebühr von 49,80 €',
    },
    faq: 'default',
    reviews: [],
    referral: true,
  },

  {
    slug: 'erkrath',
    city: 'Erkrath',
    status: 'opening',
    statusLabel: 'Neueröffnung 2026',
    heroImage: 'erkrath/hero',
    heroPosition: '50% 50%',
    intro:
      'Bald ist es so weit: MemberFit eröffnet in Erkrath. Ein modernes Fitnesserlebnis mit neuem Design, Premium-Geräten und HYROX-Training. Sichere dir jetzt dein Eröffnungsangebot.',
    address: { street: 'Bahnstraße 17', zip: '40699', city: 'Erkrath' },
    // TODO Kunde: Nummer stammt aus dem Impressum (identisch mit Mettmann).
    phone: '02104 9570037',
    email: 'info@memberfit.de',
    hours: [
      { days: 'Montag – Freitag', time: '6:00 – 22:00 Uhr' },
      { days: 'Samstag & Sonntag', time: '9:00 – 21:00 Uhr' },
    ],
    rating: null,
    social: [{ label: 'Instagram', url: 'https://www.instagram.com/memberfit_erkrath/' }],
    links: {
      signup: 'https://checkout.moresports.io/4015716/checkout/memberfit_erkrath/rates/1221196720',
      trial: null,
      impressum: 'https://memberfit.de/impressum-erkrath',
      datenschutz: 'https://memberfit.de/datenschutz-erkrath',
      agb: MEMBERFIT_AGB,
      cancel: 'https://public.magicline.com/#/contractTermination?tenant=memberfit&studio=1210023930',
    },
    highlights: ['Neueröffnung', 'HYROX', 'Premium-Geräte'],
    features: [
      { ...FEATURE_PLAN, points: ['Plan passend zu deinem Level', 'Fortschritt im Blick', 'Schnelles Ziel'] },
      {
        title: 'Moderne Geräte',
        text: 'Bei uns trainierst du ausschließlich an hochwertigen SHUA Premium-Geräten für maximale Ergebnisse und ein erstklassiges Trainingserlebnis.',
        points: ['Neueste Gerätetechnologie', 'Höchster Trainingskomfort', 'Für Anfänger & Profis'],
        image: 'erkrath/geraete',
        alt: 'Premium-Kraftgerät (Produktbild)',
      },
      {
        title: 'HYROX',
        text: 'Unser HYROX-Training kombiniert funktionelle Kraft, Ausdauer und Wettkampfvorbereitung in einem ganzheitlichen Konzept. Egal ob Einsteiger oder ambitionierter Athlet – wir helfen dir dabei, stärker, schneller und fitter zu werden.',
        points: ['Kraft & Ausdauer gleichzeitig verbessern', 'Mehr Leistungsfähigkeit im Alltag', 'Für jedes Fitnesslevel geeignet'],
        image: 'erkrath/hyrox',
        alt: 'Visualisierung des HYROX-Bereichs mit Rack',
      },
    ],
    services: [
      SERVICE.cardio,
      SERVICE.strength,
      SERVICE.freeweights,
      { icon: 'device', title: 'Premium-Geräte', text: 'Trainiere an modernsten Fitnessgeräten der neuesten Generation und erlebe höchste Qualität und Leistung für dein Training.' },
      SERVICE.drinks,
      SERVICE.circuit,
    ],
    galleryNote: 'Die Bilder zeigen Visualisierungen des zukünftigen Studios.',
    gallery: [
      { file: 'erkrath/studio-1', alt: 'Visualisierung der Trainingsfläche von oben', caption: 'Trainingsfläche', size: 'wide' },
      { file: 'erkrath/studio-2', alt: 'Visualisierung der Lounge mit Theke und Sitzbereich', caption: 'Lounge', size: 'std' },
      { file: 'erkrath/studio-4', alt: 'Visualisierung des Cardiobereichs von oben', caption: 'Cardio', size: 'std' },
      { file: 'erkrath/studio-3', alt: 'Visualisierung des Kraftbereichs mit Geräten', caption: 'Kraftbereich', size: 'wide' },
    ],
    courses: null,
    offer: {
      enabled: true,
      provisional: true,
      kind: 'tiers',
      label: 'Eröffnungsangebot',
      headline: 'Fitness ab 30\u00a0€ im Monat.',
      image: 'erkrath/neueroeffnung',
      included: ['Ausdauertraining', 'Krafttraining', 'Getränke'],
      tiers: tiers(),
      fee: 'zzgl. einmaliger Anmeldegebühr von 49,80 €',
    },
    faq: [
      { q: 'Kann ich bei MemberFit Erkrath parken?', a: 'Eigene Parkplätze haben wir leider nicht. Du kannst jedoch die öffentlichen Parkplätze in der Umgebung nutzen.' },
      { q: 'Kann ich in jedem MemberFit trainieren?', a: 'Ja! Wenn du bereits Mitglied in einem anderen MemberFit Studio bist, kannst du selbstverständlich auch bei uns in Erkrath trainieren.' },
      { q: 'Welche Geräte gibt es im MemberFit Erkrath?', a: 'Im MemberFit Erkrath trainierst du ausschließlich an hochwertigen SHUA Premium-Geräten. Dank modernster Gerätetechnologie und höchstem Trainingskomfort bieten wir optimale Trainingsbedingungen.' },
      { q: 'Akzeptiert ihr Wellpass, Urban Sports Club oder Wellhub?', a: 'Ja! Bei uns kannst du mit Wellpass, Urban Sports Club und Wellhub trainieren.' },
      { q: 'Gibt es Trainer für Trainingspläne?', a: 'Ja. Unsere Trainer erstellen dir einen individuellen Trainingsplan und helfen dir, deine Ziele schneller zu erreichen.' },
      // TODO Kunde: Eröffnungsdatum fehlt (memberfit.de nennt nur „coming soon 2026").
      { q: 'Wann eröffnet MemberFit Erkrath?', a: null },
    ],
    reviews: [],
    referral: true,
    referralText:
      'Kennst du jemanden, der auf der Suche nach einem modernen Fitnessstudio ist? Teile unsere Neueröffnung per WhatsApp – für jede erfolgreiche Empfehlung erhältst du einen Monat kostenloses Training.',
  },

  {
    slug: 'luedenscheid',
    city: 'Lüdenscheid',
    status: 'open',
    heroImage: 'luedenscheid/hero',
    heroPosition: '50% 45%',
    intro:
      'Wir bringen frischen Wind in dein Training! MemberFit steht für ein modernes Fitnesserlebnis mit neuem Design, topaktuellen Geräten und einer größeren Auswahl an Kursen.',
    address: { street: 'Noltestraße 13', zip: '58511', city: 'Lüdenscheid' },
    phone: '02351 6750607',
    email: 'studio@memberfit-luedenscheid.de',
    hours: HOURS_LATE,
    rating: { value: '4,9', count: 193 },
    social: [
      { label: 'Instagram', url: 'https://www.instagram.com/memberfit_luedenscheid/' },
      // TODO Kunde: Facebook-Seite trägt noch den alten Namen (cleverfitluedenscheid).
      { label: 'Facebook', url: 'https://www.facebook.com/cleverfitluedenscheid/' },
    ],
    links: {
      signup: 'https://memberfit.fitness-konzepte.de/luedenscheid',
      trial: 'https://memberfit.fitness-konzepte.de/luedenscheid',
      impressum: 'https://memberfit.de/impressum-l%C3%BCdenscheid',
      datenschutz: 'https://memberfit.de/datenschutz-luedenscheid',
      agb: MEMBERFIT_AGB,
      cancel: null,
    },
    highlights: ['Solarium & Massage', 'Kurse', 'Bis 24 Uhr'],
    features: [FEATURE_PLAN, FEATURE_SOLARIUM, FEATURE_COURSES],
    services: [SERVICE.cardio, SERVICE.strength, SERVICE.freeweights, SERVICE.parking, SERVICE.drinks, SERVICE.circuit],
    gallery: [
      { file: 'luedenscheid/studio-6', alt: 'Functional-Bereich mit beleuchtetem Trainingsrahmen', caption: 'Functional', size: 'big' },
      { file: 'luedenscheid/studio-1', alt: 'Laufbänder im Cardiobereich', caption: 'Cardio', size: 'std' },
      { file: 'luedenscheid/studio-3', alt: 'Kraftgeräte mit roten Rahmen', caption: 'Kraftbereich', size: 'std' },
      { file: 'luedenscheid/studio-5', alt: 'Hantelablage im Freihantelbereich', caption: 'Freihantel', size: 'wide' },
      { file: 'luedenscheid/studio-4', alt: 'Kraftgerät vor einer Wandgrafik', caption: 'Gerätebereich', size: 'std' },
      { file: 'luedenscheid/studio-2', alt: 'Rack mit roten Elementen', caption: 'Rack', size: 'std' },
      { file: 'luedenscheid/studio-7', alt: 'Zwei Power-Plate-Geräte', caption: 'Power Plate', size: 'wide' },
    ],
    courses: null,
    offer: {
      enabled: true,
      provisional: true,
      kind: 'single',
      label: 'Dein Start 2026',
      title: 'Monatlich kündbar',
      // TODO Kunde: memberfit.de nennt 19,90 €, die Anmeldeseite 29,99 € – bitte klären.
      price: 19.9,
      regularPrice: 39.9,
      priceUnit: 'pro Monat',
      conditions: ['Monatlich kündbar', 'Modernes Studio mit Top-Ausstattung', 'Professionelle Betreuung', 'Garantiert fair & sicher'],
      footnote: null,
    },
    faq: 'default',
    reviews: [
      { text: 'Super schönes Studio mit großer Auswahl an Geräten, immer sauber und gepflegt! Die Mitarbeiter sind alle nett und hilfsbereit. Weiter so!', author: 'M. W.' },
      { text: 'Ich bin sehr zufrieden mit diesem Fitnessstudio! Es ist immer sauber, die Atmosphäre ist freundlich und die Geräte sind modern und top gepflegt. Absolut empfehlenswert!', author: 'Melina K.' },
      { text: 'Super Fitnessstudio. Die Mitarbeiter sind aufmerksam und super freundlich. Man fühlt sich als Neuling sofort wohl. Das Studio ist sehr sauber und modern.', author: 'Kelly' },
    ],
    referral: true,
  },

  {
    slug: 'plettenberg',
    city: 'Plettenberg',
    status: 'open',
    heroImage: 'plettenberg/hero-athletin',
    heroPosition: '68% 30%',
    intro:
      'Entdecke dein Trainingserlebnis in Plettenberg. Moderne Ausstattung, persönliche Betreuung und die richtige Umgebung für deine Ziele.',
    address: { street: 'Adolf-Sternberg-Straße 3', zip: '58840', city: 'Plettenberg' },
    phone: '02391 6018971',
    email: 'studio@memberfit-plettenberg.de',
    hours: HOURS_LATE,
    rating: null,
    social: [
      // TODO Kunde: Instagram-Link auf memberfit.de zeigt auf eine Suchseite, nicht auf ein Profil.
      { label: 'Instagram', url: 'https://www.instagram.com/popular/memberfit-plettenberg/' },
      { label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61576587903878' },
    ],
    links: {
      signup: 'https://memberfit.fitness-konzepte.de/plettenberg?oid=op_44e59034-f11f-4157-9e94-c2dc087b0708',
      trial: null,
      impressum: 'https://memberfit.de/impressum-plettenberg',
      datenschutz: 'https://memberfit.fitness-konzepte.de/datenschutz',
      agb: 'https://online-mitgliedschaften.de/wp-content/uploads/2026/03/ALLGEMEINE-GESCHAeFTSBEDINGUNGEN-MONATSVERTRAG.pdf',
      cancel: null,
    },
    highlights: ['Personal Training', 'HYROX Area', 'Bis 24 Uhr'],
    features: [
      {
        title: 'Personal Training',
        text: 'In Zusammenarbeit mit unseren qualifizierten Trainern werden persönliche Trainings- und Ernährungskonzepte entwickelt.',
        points: ['Personal Training', 'Individuelle Trainingskonzepte', 'Ernährungskonzepte', 'Cardio- und Krafttraining'],
        image: 'plettenberg/training-kabelzug',
        alt: 'Athletin beim Training am Kabelzug',
      },
      {
        title: 'Digital Fitness Floor',
        text: 'Der Digital Fitness Floor mit E-Gym-Geräten unterstützt dein Training durch KI-gestützte Trainingspläne und smarte, vernetzte Geräte. Dank Kraftmessungen und abgestimmten Leistungsniveaus trainierst du effektiver in kürzerer Zeit.',
        points: ['KI-gestützte Trainingspläne', 'Vernetzte Geräte', 'Kraftmessung', 'BIO Age'],
        image: 'shared/trainingsplan',
        alt: 'Trainer bespricht einen Trainingsplan mit einer Sportlerin',
      },
      { ...FEATURE_SOLARIUM, image: 'plettenberg/solarium', alt: 'Modernes Solarium (Produktbild)' },
    ],
    services: [
      { icon: 'cardio', title: 'Cardio von Matrix', text: 'Steigere deine Kondition und verbessere deine Herz-Kreislauf-Gesundheit mit modernen Laufbändern, Crosstrainern und Fahrradergometern.' },
      SERVICE.strength,
      { icon: 'dumbbell', title: 'Geräte von gym80', text: 'Hochwertige Kraftgeräte für dein Training – ob Anfänger oder Profi, hier findest du alles für dein effektives Workout.' },
      SERVICE.parking,
      { icon: 'drink', title: 'Jetmix Bar', text: 'Kostenlose Getränkeflatrate: Genieße unbegrenzt kostenfreie Getränke – jederzeit während deines Trainings.' },
      { icon: 'circuit', title: 'HYROX Area', text: 'Effizientes Ganzkörpertraining in kurzer Zeit – ideal, um Kraft, Ausdauer und Beweglichkeit zu kombinieren.' },
    ],
    gallery: [
      { file: 'plettenberg/studio-2', alt: 'Kraftbereich mit roten Plate-Loaded-Geräten', caption: 'Kraftbereich', size: 'tall' },
      { file: 'plettenberg/studio-1', alt: 'Functional-Bereich mit Kunstrasen und Medizinball', caption: 'Functional', size: 'tall' },
      { file: 'plettenberg/studio-6', alt: 'Jetmix-Getränkebar im Studio', caption: 'Jetmix Bar', size: 'tall' },
      { file: 'plettenberg/studio-4', alt: 'Racks und Freihantelbereich', caption: 'Freihantel', size: 'std' },
      { file: 'plettenberg/studio-3', alt: 'Trainingsfläche mit Holzlamellenwand', caption: 'Trainingsfläche', size: 'std' },
      { file: 'plettenberg/studio-5', alt: 'Plate-Loaded-Kraftgeräte', caption: 'Geräte', size: 'std' },
    ],
    courses: null,
    offer: {
      enabled: true,
      provisional: true,
      kind: 'single',
      label: 'Eröffnungsangebot',
      title: 'Gründungsmitgliedschaft',
      price: 34.9,
      regularPrice: 39.9,
      priceUnit: 'pro Monat',
      conditions: [
        'Nur für die ersten 50 Gründungsmitglieder',
        '12 Monate Erstlaufzeit, danach monatlich kündbar',
        'Startgebühr (19,90 €) entfällt bei Online-Anmeldung',
        'Chipband einmalig 19,90 €',
      ],
      footnote:
        'Erstlaufzeit 12 Monate, danach monatlich kündbar mit einer Frist von einem Monat in Textform. Monatsbeitrag 34,90 € statt 39,90 €. Die Anmeldegebühr entfällt bei Online-Anmeldung. Einmalig 19,90 € für das Chipband, Einzug zu Vertragsbeginn. Es gelten die Allgemeinen Geschäftsbedingungen.',
    },
    faq: [
      { q: 'Wie läuft die Anmeldung ab?', a: 'Du gibst deine Kontaktdaten an und meldest dich anschließend ganz entspannt online an – das dauert nur etwa zwei Minuten.' },
      { q: 'Was kann ich alles nutzen?', a: 'Du kannst bei Memberfit Personal Training, einen modern ausgestatteten Cardio- und Kraftgerätebereich sowie eine kostenlose Getränkeflat nutzen. Damit hast du alles für effektives Training und deine Regeneration an einem Ort.' },
      { q: 'An wen kann ich mich bei Fragen wenden?', a: 'Während des Trainings vor Ort stehen dir die Trainer jederzeit zur Verfügung. Bei Fragen zum Training, zum Trainingsprogramm oder zu den Geräten kannst du dich direkt an das kompetente Trainerteam wenden.' },
      'parking',
      'hours',
    ],
    reviews: [],
    referral: true,
  },
];

/** Kleinster sichtbarer Monatspreis eines Studios (für die Landing Page). */
export function lowestPrice(studio) {
  const { offer } = studio;
  if (!offer?.enabled) return null;
  const prices = offer.kind === 'tiers' ? offer.tiers.map((t) => t.price) : [offer.price];
  return Math.min(...prices);
}
