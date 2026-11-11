import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Smooth Scrolling (Lenis) + Anker-Navigation.
 * Bei `prefers-reduced-motion` bleibt das native Scrollen aktiv.
 * Liefert lock/unlock für Overlays (mobiles Menü, Lightbox).
 */
export function initSmoothScroll(reducedMotion) {
  let lenis = null;
  let locks = 0;

  if (!reducedMotion) {
    lenis = new Lenis({ lerp: 0.11, anchors: false });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  const navHeight = () => document.getElementById('nav')?.offsetHeight ?? 0;

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || link.hasAttribute('data-placeholder-link')) return;
    const id = link.getAttribute('href');
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    if (lenis) {
      // Lenis berücksichtigt `scroll-padding-top` (Höhe der Navigation) selbst.
      lenis.scrollTo(target, { duration: 1.15 });
    } else {
      const offset = id === '#start' ? 0 : navHeight() - 1;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset });
    }
    history.replaceState(null, '', id);
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });

  return {
    lockScroll() {
      locks += 1;
      lenis?.stop();
      document.documentElement.classList.add('is-locked');
    },
    unlockScroll() {
      locks = Math.max(0, locks - 1);
      if (locks) return;
      lenis?.start();
      document.documentElement.classList.remove('is-locked');
    },
  };
}
