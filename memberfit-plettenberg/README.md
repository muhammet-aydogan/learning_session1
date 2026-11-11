# Memberfit Plettenberg – Redesign-Entwurf

Vollständiger Frontend-Prototyp (One-Pager) für das Fitnessstudio **Memberfit Plettenberg**.
Erster Designentwurf zur Kundenpräsentation – kein Backend, keine Tracking-Skripte.

Grundlage ist die bestehende Seite <https://memberfit.fitness-konzepte.de/plettenberg>
(Texte, Logo, Markenfarbe Gold `#d3a658` auf Schwarz, Schrift Oswald, Bilder).

## Starten

Voraussetzung: Node.js ≥ 18.

```bash
cd memberfit-plettenberg
npm install
npm run dev        # Entwicklungsserver → http://localhost:5173
npm run build      # Produktions-Build nach dist/
npm run preview    # Build lokal ansehen → http://localhost:4173
```

## Technik

| Baustein | Zweck |
| --- | --- |
| HTML5, CSS3, JavaScript (ES-Module) | bewusst ohne UI-Framework: ein One-Pager braucht kein React, bleibt schnell und leicht übergebbar |
| [Vite](https://vite.dev) | Dev-Server und Build |
| [GSAP](https://gsap.com) + ScrollTrigger | Lade-Animation, Scroll-Reveals, Parallax, Zähler |
| [Lenis](https://lenis.darkroom.engineering) | Smooth Scrolling |
| Fontsource (Oswald, Manrope) | Schriften lokal eingebunden, keine Anfrage an Google Fonts (DSGVO) |

## Projektstruktur

```
memberfit-plettenberg/
├── index.html                  Seitenstruktur (semantisches HTML, alle Sektionen)
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.png
│   └── images/                 optimierte WebP-Bilder (2 Größen je Motiv) + Logo
└── src/
    ├── main.js                 Einstieg: rendert Inhalte, startet Interaktion + Animation
    ├── config/
    │   └── site.config.js      ★ ALLE austauschbaren Inhalte: Links, Kontakt, Angebot, FAQ, Galerie
    ├── components/
    │   ├── dom.js              gemeinsame Helfer
    │   ├── nav.js              Sticky-Navigation, aktiver Menüpunkt, mobiles Menü
    │   ├── offer.js            Mitgliedschaft/Angebot (vorläufig, abschaltbar)
    │   ├── faq.js              Akkordeon
    │   ├── gallery.js          Studio-Galerie
    │   ├── lightbox.js         Bildansicht (Tastatur, Wischen)
    │   ├── contact.js          Kontaktdaten in Abschlussbereich + Footer
    │   ├── links.js            Platzhalter-Links (Anmeldung, Impressum …)
    │   └── toast.js            Hinweis-Einblendung
    ├── animations/
    │   ├── index.js            Einstieg, prefers-reduced-motion
    │   ├── smooth-scroll.js    Lenis + Anker-Navigation
    │   ├── hero.js             Lade-Animation + Hero-Parallax
    │   └── scroll.js           Reveals, Parallax, Icon-Zeichnung, Zähler, Laufband
    └── styles/
        ├── main.css            Import-Reihenfolge
        ├── tokens.css          Farben, Schriften, Abstände
        ├── base.css            Reset, Typografie, Layout, Laufband
        ├── buttons.css         Buttons + Chips
        ├── nav.css             Navigation + mobiles Menü
        ├── hero.css
        ├── sections.css        Vorteile, Training, Ausstattung, Galerie
        ├── membership.css      Angebotsbereich
        ├── faq.css
        ├── closing.css         Abschluss-CTA, Kontakt, Footer
        └── overlays.css        Lightbox, Toast
```

## Inhalte ändern

Alles Austauschbare steht in **`src/config/site.config.js`**:

- **Angebot/Preise (vorläufig!)** – `offer`. Preis, Streichpreis, Konditionen und Fußnote sind dort änderbar.
  `enabled: false` blendet sämtliche Preisangaben aus (es bleibt ein neutraler Mitgliedschafts-CTA, die
  laufzeitbezogene FAQ verschwindet mit). `provisional: false` entfernt den Hinweis „Konditionen vorläufig".
- **Anmeldelink** – `links.signup`. Solange `null`, zeigen die Buttons „Angebot sichern" nur einen Hinweis.
- **Impressum / Datenschutz / AGB** – `links.*` (aktuell die URLs der bestehenden Seite).
- **Kontakt** – `contact`. Werte mit `null` erscheinen als „… folgt".
- **FAQ** und **Galerie** – Listen `faq` und `gallery`.
- `showPlaceholderMarks: false` entfernt die gestrichelte Markierung der Platzhalter.

## Platzhalter und fehlende Kundeninformationen

| Was | Status |
| --- | --- |
| Link zur Online-Anmeldung | Platzhalter (`links.signup = null`) |
| Preise und Aktionsbedingungen | vorläufig, von der bestehenden Aktionsseite übernommen, nicht bestätigt |
| Telefonnummer | fehlt |
| Öffnungszeiten (Kontakt + FAQ-Antwort) | fehlen |
| Geräte-/Ausstattungsliste | fehlt (Hinweis im Bereich „Ausstattung") |
| Social-Media-Profile | fehlen (`contact.social` leer, noch nicht dargestellt) |
| Adresse und E-Mail | aus dem Impressum der bestehenden Seite, Schreibweise bestätigen lassen |
| Impressum, Datenschutz, AGB | verlinken auf die bestehenden Seiten/PDF, vor Livegang ersetzen |
| Echte Studiofotos / Video | bisher nur Visualisierungen vorhanden |
| `<meta name="robots" content="noindex">` | im Entwurf gesetzt, vor Livegang entfernen |

## Bildquellen

Alle Bilder stammen von der bestehenden Website des Kunden (ausgeliefert über `onecdn.io`),
wurden zugeschnitten und als WebP optimiert. Es wurden keine Stockfotos ergänzt.

| Datei (`public/images/`) | Inhalt | Verwendung |
| --- | --- | --- |
| `logo-memberfit.*`, `logo-mf.*`, `../favicon.png` | Logo (Wort-Bild-Marke und Monogramm) | Navigation, Footer, Favicon |
| `hero-athletin-*` | Athletin, Kampagnenmotiv | Hero |
| `training-kabelzug-*` | Athletin am Kabelzug, Kampagnenmotiv | Training |
| `athlet-freisteller-*` | Athlet, Kampagnenmotiv | Angebot |
| `studio-kraft-*`, `studio-cardio-*`, `studio-empfang-*`, `studio-lounge-*`, `studio-umkleide-*` | 3D-Visualisierungen des Studios | Ausstattung, Galerie, Abschluss |

**Offen:** Die Nutzungsrechte für die Weiterverwendung auf der neuen Seite muss der Kunde bestätigen –
insbesondere für die Kampagnenmotive (vermutlich von der Agentur der bisherigen Seite bereitgestellt).
Die Studio-Bilder sind Visualisierungen, keine Fotos, und auf der Seite so gekennzeichnet.

## Barrierefreiheit und Performance

- `prefers-reduced-motion`: keine Bewegungs-Animationen, kein Smooth Scrolling, alle Inhalte sofort sichtbar.
- Tastaturbedienung für Navigation, Akkordeon und Lightbox (Fokusfalle, Esc, Pfeiltasten), Skip-Link.
- Bilder als WebP mit `srcset`, Lazy Loading unterhalb des Hero, Hero-Bild per Preload.
- Ohne JavaScript bleiben alle statischen Inhalte lesbar.
