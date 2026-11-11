import { $, $$ } from './dom.js';

/** Sticky-Navigation: Scroll-Zustand, aktiver Menüpunkt, mobiles Menü. */
export function initNav({ lockScroll, unlockScroll }) {
  const nav = $('#nav');
  const burger = $('#burger');
  const menu = $('#mobile-menu');

  // Optische Veränderung beim Scrollen
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Aktiven Menüpunkt hervorheben
  const links = $$('[data-nav]');
  const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.removeAttribute('aria-current'));
        byId.get(entry.target.id)?.setAttribute('aria-current', 'true');
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  $$('[data-section]').forEach((section) => spy.observe(section));

  // Mobiles Menü
  const setOpen = (open) => {
    document.documentElement.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    menu.setAttribute('aria-hidden', String(!open));
    menu.inert = !open;
    open ? lockScroll() : unlockScroll();
  };
  burger.addEventListener('click', () => setOpen(burger.getAttribute('aria-expanded') !== 'true'));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setOpen(false)));
  window.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));
  window.matchMedia('(min-width: 1080px)').addEventListener('change', (e) => e.matches && setOpen(false));
}
