import { defineConfig } from 'vite';

export default defineConfig({
  // Relative Pfade: der Build läuft auch in einem Unterordner oder per Datei-Vorschau.
  base: './',
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
});
