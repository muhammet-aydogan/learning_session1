import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateHero } from './hero.js';
import { initScrollAnimations } from './scroll.js';

gsap.registerPlugin(ScrollTrigger);

/** Lichtkegel, der dem Mauszeiger über Karten folgt (nur Geräte mit Maus). */
function cursorGlow() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll('[data-cursor-glow]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
  });
}

/**
 * Einstieg für alle Animationen.
 * Bei `prefers-reduced-motion` werden keine Bewegungs-Animationen
 * registriert – alle Inhalte sind dann sofort sichtbar.
 */
export function initAnimations(reducedMotion) {
  cursorGlow();
  if (reducedMotion) {
    document.documentElement.classList.add('reduced-motion', 'is-ready');
    return;
  }
  animateHero();
  document.documentElement.classList.add('is-ready');
  initScrollAnimations();

  // Layout kann sich nach dem Laden von Schriften/Bildern verschieben.
  window.addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
