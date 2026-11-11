import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const $$ = (sel) => gsap.utils.toArray(sel);

/** Überschriften: Zeilen in Masken verpacken und nacheinander hochfahren. */
function revealTitles() {
  $$('[data-reveal-title]').forEach((title) => {
    const lines = title.innerHTML.split(/<br\s*\/?>/i);
    title.innerHTML = lines.map((line) => `<span class="line"><span>${line}</span></span>`).join('');
    gsap.from(title.querySelectorAll('.line > span'), {
      yPercent: 110,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.1,
      scrollTrigger: { trigger: title, start: 'top 88%', once: true },
    });
  });
}

/** Standard-Reveal (Fade + Slide) und Clip-Reveal für Bilder, gestaffelt pro Batch. */
function revealBlocks() {
  const blocks = $$('[data-reveal]:not([data-reveal="clip"])');
  gsap.set(blocks, { autoAlpha: 0, y: 36 });
  ScrollTrigger.batch(blocks, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.09,
        overwrite: true,
        onComplete: () => batch.forEach((el) => el.classList.add('is-revealed')),
      }),
  });

  const clips = $$('[data-reveal="clip"]');
  gsap.set(clips, { clipPath: 'inset(0 0 100% 0 round 20px)' });
  ScrollTrigger.batch(clips, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        clipPath: 'inset(0 0 0% 0 round 20px)',
        duration: 1.2,
        ease: 'power4.inOut',
        stagger: 0.12,
        onComplete: () => gsap.set(batch, { clearProps: 'clipPath' }),
      }),
  });
}

/** Parallax für Bilder (data-parallax) und frei driftende Elemente (data-drift). */
function parallax() {
  $$('[data-parallax]').forEach((img) => {
    const amount = Number(img.dataset.parallax) || 8;
    gsap.fromTo(
      img,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: 'none',
        scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });
  $$('[data-drift]').forEach((el) => {
    const amount = Number(el.dataset.drift) || 10;
    gsap.fromTo(
      el,
      { yPercent: -amount },
      { yPercent: amount, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 } },
    );
  });
}

/** Icons zeichnen sich beim Einblenden selbst (stroke-dashoffset). */
function drawIcons() {
  $$('.usp').forEach((card) => {
    const paths = card.querySelectorAll('.draw');
    paths.forEach((p) => {
      const length = p.getTotalLength();
      gsap.set(p, { strokeDasharray: length, strokeDashoffset: length });
    });
    gsap.to(paths, {
      strokeDashoffset: 0,
      duration: 1.3,
      ease: 'power2.inOut',
      stagger: 0.12,
      scrollTrigger: { trigger: card, start: 'top 85%', once: true },
    });
  });
}

/** Preis zählt beim Einblenden hoch. */
function countUp() {
  $$('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const state = { value: 0 };
    gsap.to(state, {
      value: target,
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: () => (el.textContent = Math.round(state.value)),
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });
}

/** Laufband reagiert auf die Scroll-Geschwindigkeit, Fortschrittsbalken oben. */
function ambient() {
  const track = document.querySelector('.marquee__track');
  if (track) {
    const loop = gsap.to(track, { xPercent: -50, duration: 28, ease: 'none', repeat: -1 });
    ScrollTrigger.create({
      onUpdate: (self) => {
        const boost = gsap.utils.clamp(1, 5, 1 + Math.abs(self.getVelocity()) / 600);
        gsap.to(loop, { timeScale: boost, duration: 0.2, overwrite: true });
        gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.2 });
      },
    });
  }

  gsap.to('.scroll-progress span', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
  });

  gsap.to('[data-float]', { y: -10, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
}

export function initScrollAnimations() {
  revealTitles();
  revealBlocks();
  parallax();
  drawIcons();
  countUp();
  ambient();
}
