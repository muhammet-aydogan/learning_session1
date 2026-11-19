/** Kleine DOM-Helfer, die von allen Komponenten geteilt werden. */
export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
