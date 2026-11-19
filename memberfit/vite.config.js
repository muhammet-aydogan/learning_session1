import { defineConfig } from 'vite';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { studios } from './src/data/studios.js';

/** Seiten vor dem Start erzeugen und im Dev-Modus bei Änderungen an Daten/Vorlagen neu erzeugen. */
function memberfitPages() {
  const generate = () => execFileSync(process.execPath, ['scripts/generate-pages.mjs'], { stdio: 'inherit' });
  return {
    name: 'memberfit-pages',
    buildStart: generate,
    configureServer(server) {
      generate();
      const watched = [resolve('src/data'), resolve('src/templates')];
      server.watcher.add(watched);
      server.watcher.on('change', (file) => {
        if (!watched.some((dir) => file.startsWith(dir))) return;
        try {
          generate();
          server.ws.send({ type: 'full-reload' });
        } catch (error) {
          server.config.logger.error(String(error));
        }
      });
    },
  };
}

export default defineConfig({
  // Relative Pfade: der Build läuft auch in einem Unterordner (z. B. GitHub Pages).
  base: './',
  plugins: [memberfitPages()],
  build: {
    rollupOptions: {
      input: Object.fromEntries([
        ['index', resolve('index.html')],
        ...studios.map((s) => [s.slug, resolve(s.slug, 'index.html')]),
      ]),
    },
  },
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
});
