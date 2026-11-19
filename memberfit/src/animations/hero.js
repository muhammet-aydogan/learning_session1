import { gsap } from 'gsap';

/** Auftritt beim Laden: Bild-Zoom, zeilenweiser Textaufbau, gestaffelte Fades. */
export function animateHero() {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.1 });

  tl.from('[data-hero-img]', { scale: 1.18, duration: 2.2, ease: 'power2.out' }, 0)
    .from('.nav__inner', { y: -24, autoAlpha: 0, duration: 0.9 }, 0.15)
    .from('[data-hero-line]', { yPercent: 115, rotate: 3, duration: 1.15, stagger: 0.12 }, 0.25)
    .from('[data-hero-fade]', { y: 26, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' }, 0.75);

  // Leichte Parallax-Bewegung des Hintergrunds beim Scrollen
  gsap.to('[data-hero-img]', {
    yPercent: 14,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.fromTo(
    '.hero__content',
    { yPercent: 0, opacity: 1 },
    {
      yPercent: -8,
      opacity: 0.25,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: '35% top', end: 'bottom top', scrub: true },
    },
  );

  return tl;
}
