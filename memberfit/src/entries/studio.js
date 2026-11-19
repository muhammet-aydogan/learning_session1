import { initPage } from './common.js';
import { initFaq } from '../components/faq.js';
import { initLightbox } from '../components/lightbox.js';

initPage((scroll) => {
  initFaq();
  initLightbox(scroll);
});
