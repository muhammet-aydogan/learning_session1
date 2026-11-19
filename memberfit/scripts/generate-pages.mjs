/**
 * Erzeugt die HTML-Seiten aus Vorlagen + Daten:
 *   index.html                 ← src/templates/landing.js
 *   <slug>/index.html          ← src/templates/studio.js (je Studio)
 *
 * Hinweis: Wird ein Studio umbenannt oder entfernt, den alten Ordner manuell löschen.
 *
 * Wird automatisch von `npm run dev` und `npm run build` ausgeführt
 * (über das Vite-Plugin in vite.config.js). Manuell: node scripts/generate-pages.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../src/data/site.js';
import { studios } from '../src/data/studios.js';
import { renderLanding } from '../src/templates/landing.js';
import { renderStudio } from '../src/templates/studio.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pages = { 'index.html': renderLanding({ site, studios }) };
for (const studio of studios) pages[`${studio.slug}/index.html`] = renderStudio({ site, studio, studios });

for (const [file, html] of Object.entries(pages)) {
  const target = join(root, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html);
}
console.log(`[memberfit] ${Object.keys(pages).length} Seiten erzeugt: ${Object.keys(pages).join(', ')}`);
