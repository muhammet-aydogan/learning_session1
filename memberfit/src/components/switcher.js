import { $, $$ } from './dom.js';

/** Dropdown „Standort wählen" in der Navigation. */
export function initSwitcher() {
  $$('[data-switcher]').forEach((root) => {
    const btn = $('.switcher__btn', root);
    const panel = $('.switcher__panel', root);
    let timer;

    const setOpen = (open) => {
      clearTimeout(timer);
      btn.setAttribute('aria-expanded', String(open));
      if (open) {
        panel.hidden = false;
        requestAnimationFrame(() => root.classList.add('is-open'));
      } else {
        root.classList.remove('is-open');
        timer = setTimeout(() => (panel.hidden = true), 260);
      }
    };

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      setOpen(btn.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('click', (e) => {
      if (!root.contains(e.target) && btn.getAttribute('aria-expanded') === 'true') setOpen(false);
    });
    root.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        btn.focus();
      }
    });
    root.addEventListener('focusout', (e) => {
      if (e.relatedTarget && !root.contains(e.relatedTarget)) setOpen(false);
    });
  });
}
