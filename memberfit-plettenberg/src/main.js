import '@fontsource/oswald/latin-500.css';
import '@fontsource/oswald/latin-600.css';
import '@fontsource/oswald/latin-700.css';
import '@fontsource-variable/manrope/wght.css';
import './styles/main.css';

import { site } from './config/site.config.js';
import { initSmoothScroll } from './animations/smooth-scroll.js';
import { initAnimations } from './animations/index.js';
import { initNav } from './components/nav.js';
import { renderOffer } from './components/offer.js';
import { renderFaq } from './components/faq.js';
import { renderGallery } from './components/gallery.js';
import { initLightbox } from './components/lightbox.js';
import { renderContact } from './components/contact.js';
import { initLinks } from './components/links.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.documentElement.classList.toggle('show-placeholders', site.showPlaceholderMarks);

// 1. Inhalte aus der Konfiguration rendern
renderOffer();
renderFaq();
const galleryItems = renderGallery();
renderContact();
initLinks();

// 2. Interaktion
const scroll = initSmoothScroll(reducedMotion);
initNav(scroll);
initLightbox(galleryItems, scroll);

// 3. Animationen (nachdem alle Elemente im DOM sind)
initAnimations(reducedMotion);
