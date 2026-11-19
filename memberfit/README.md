# MemberFit – Website-Entwurf (memberfit.de)

Frontend-Prototyp für **MemberFit**: eine Landing Page für memberfit.de, die alle Studios auflistet,
und je Standort eine eigene Studioseite im Design des Plettenberg-Entwurfs.

| Seite | Pfad |
| --- | --- |
| Landing Page | `/` |
| MemberFit Mettmann | `/mettmann/` |
| MemberFit Herne | `/herne/` |
| MemberFit Erkrath (Neueröffnung) | `/erkrath/` |
| MemberFit Lüdenscheid | `/luedenscheid/` |
| MemberFit Plettenberg | `/plettenberg/` |

Live-Vorschau: <https://muhammet-aydogan.github.io/learning_session1/>

![Landing Page](docs/vorschau-landing-hero.jpg)

## Starten

Voraussetzung: Node.js ≥ 18.

```bash
cd memberfit
npm install
npm run dev        # Entwicklungsserver → http://localhost:5173
npm run build      # Produktions-Build nach dist/
npm run preview    # Build lokal ansehen → http://localhost:4173
```

## Veröffentlichung (GitHub Pages)

Jeder Push auf `main` baut das Projekt und veröffentlicht `dist/` über den Workflow
`.github/workflows/deploy.yml`. Voraussetzung im Repository: Settings → Pages → Source „GitHub Actions".
Alle Pfade sind relativ, die Seite funktioniert deshalb auch unter einem Unterpfad.

## So ist das Projekt aufgebaut

Die HTML-Seiten werden **beim Start bzw. Build aus Vorlagen und Daten erzeugt**. Eine Studioseite gibt es
nur einmal als Vorlage; ein neues Studio braucht nur einen neuen Eintrag in `src/data/studios.js`
(und seine Bilder).

```
memberfit/
├── src/
│   ├── data/
│   │   ├── studios.js          ★ ALLE Studio-Inhalte: Adresse, Zeiten, Links, Angebote, Galerie, FAQ, Kurse …
│   │   ├── site.js             ★ Marke + Landing Page (Vorteile, Schritte, Leistungen, Rechtliches)
│   │   └── images.json         Bildmaße (erzeugt von scripts/image-manifest.py)
│   ├── templates/              Seitenvorlagen (laufen beim Build in Node)
│   │   ├── landing.js          Landing Page
│   │   ├── studio.js           Studioseite (eine Vorlage für alle Standorte)
│   │   ├── partials.js         <head>, Navigation mit Standortwahl, Footer, Lightbox
│   │   └── helpers.js          Bilder (srcset), Icons, Links, Preisformat
│   ├── entries/                JavaScript-Einstieg je Seitentyp (landing.js, studio.js, common.js)
│   ├── components/             Navigation, Standortwahl, Studio-Liste, FAQ, Lightbox, Platzhalter-Links, Toast
│   ├── animations/             Smooth Scrolling, Hero-Animation, Scroll-Reveals, Parallax
│   └── styles/                 tokens, base, buttons, nav, hero, sections, membership, faq, closing,
│                               overlays, multi (Standortwahl, Landing, Tarife, Kurse, …)
├── public/
│   ├── favicon.png
│   └── images/                 WebP-Bilder: brand/, landing/, shared/, <studio>/
├── scripts/
│   ├── generate-pages.mjs      erzeugt index.html + <studio>/index.html
│   └── image-manifest.py       aktualisiert src/data/images.json
├── docs/                       Vorschaubilder
└── vite.config.js              Multi-Page-Build, startet den Generator automatisch
```

`index.html` und die Studio-Ordner (`mettmann/` usw.) sind **erzeugte Dateien** und nicht im Repository.
Änderungen immer in `src/templates` oder `src/data` vornehmen; im Dev-Modus werden die Seiten dann
automatisch neu erzeugt und der Browser lädt neu.

## Inhalte ändern

Alles Austauschbare steht in **`src/data/studios.js`** (je Studio) und **`src/data/site.js`** (Marke, Landing Page):

- **Angebot/Preise (vorläufig!)** – `offer` je Studio. Zwei Varianten:
  `kind: 'tiers'` (drei Tarife wie in Mettmann, Herne, Erkrath) oder `kind: 'single'` (ein Aktionsangebot wie
  in Lüdenscheid und Plettenberg). `enabled: false` blendet alle Preise des Studios aus (auch in der
  Studio-Liste der Landing Page); `provisional: false` entfernt den Hinweis „Konditionen vorläufig".
- **Links** – `links.signup`, `links.trial` (Probetraining), Impressum, Datenschutz, AGB, `links.cancel`
  (Online-Kündigung). Ein Link mit `null` wird zum Platzhalter: Klick zeigt einen Hinweis.
- **Öffnungszeiten, Telefon, E-Mail, Social Media** – je Studio.
- **Leistungen** (`services`), **Training & Betreuung** (`features`), **Galerie** (`gallery`), **Kursplan**
  (`courses`, `null` = kein Kursplan), **Bewertungen** (`rating`, `reviews`), **FAQ** (`faq`).
- **Galerie-Kachelformate** – `size: 'big' | 'wide' | 'tall' | 'std'` (2×2, 2×1, 1×2, 1×1 im 3-Spalten-Raster).
  Die Kombination je Studio ist so gewählt, dass keine Lücken entstehen.
- **FAQ** – `faq: 'default'` erzeugt passende Fragen aus den Studio-Daten (Anmeldung, Probetraining,
  Trainingsplan, Kurse, Solarium, Parken, Öffnungszeiten). Alternativ eine eigene Liste; Einträge wie
  `'parking'` oder `'hours'` greifen auf dieselben Bausteine zurück.
- `site.noindex` – vor dem Livegang auf `false` setzen. `site.showPlaceholderMarks` steuert die Markierung.

Neue Bilder: WebP-Dateien nach `public/images/<ordner>/<name>-<breite>.webp` legen und
`npm run images` ausführen (benötigt Python mit Pillow).

## Quellen

- Texte, Öffnungszeiten, Tarife, Kurspläne, Kontakt- und Anmeldelinks: memberfit.de und die
  Studio-Unterseiten (Stand: November 2026), dazu die Anmeldeseiten unter memberfit.fitness-konzepte.de.
- Bilder: ausschließlich von memberfit.de und der bisherigen Plettenberg-Seite, als WebP optimiert.
  Erkrath zeigt Visualisierungen des zukünftigen Studios (auf der Seite so gekennzeichnet).
  Allgemeine Motive (Trainingsplan, Solarium, Kurse, Empfehlung) liegen in `public/images/shared/`.

## Offene Punkte für den Kunden

Im Code sind sie mit `TODO Kunde` markiert:

| Thema | Stand |
| --- | --- |
| Alle Preise und Aktionen | vorläufig (Aktionen wie „Oktober Special" teils veraltet) |
| Lüdenscheid: Preis | memberfit.de nennt 19,90 €, die Anmeldeseite 29,99 € bzw. 29,90 € |
| Herne: Flex-Tarif | 30 € statt 45 € – günstiger als der 24-Monats-Tarif, bitte prüfen |
| Erkrath: Eröffnungsdatum | fehlt (FAQ-Platzhalter) |
| Erkrath: Telefon | Nummer aus dem Impressum ist identisch mit Mettmann |
| Online-Kündigung | Herne und Erkrath nutzen auf memberfit.de die Studio-ID von Mettmann; für Lüdenscheid und Plettenberg fehlt der Link |
| Social Media | Facebook-Seiten Herne/Lüdenscheid tragen noch den alten Markennamen; Plettenberg-Instagram verweist auf eine Suchseite |
| Datenschutz (Landing Page) | memberfit.de verlinkt die Erklärung von Mettmann |
| Bildrechte | Kampagnen- und Stockmotive von memberfit.de – Nutzungsrechte bestätigen lassen |
| Bewertungen | Zahlen und Zitate von memberfit.de; Quelle (z. B. Google) angeben |
| `noindex` | im Entwurf aktiv, vor dem Livegang entfernen |

## Barrierefreiheit und Performance

- `prefers-reduced-motion`: keine Bewegungs-Animationen, kein Smooth Scrolling, alle Inhalte sofort sichtbar.
- Tastaturbedienung für Navigation, Standortwahl (Esc), Akkordeon und Lightbox (Fokusfalle, Pfeiltasten), Skip-Link.
- Inhalte stehen fertig im HTML (kein Nachladen per JavaScript) – gut für Suchmaschinen und ohne JavaScript lesbar.
- Bilder als WebP mit `srcset` und echten Maßen (kein Layout-Springen), Lazy Loading unterhalb des Hero.
- Schriften lokal eingebunden (Fontsource), keine Anfrage an Google Fonts.
