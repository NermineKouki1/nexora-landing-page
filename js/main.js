import { initMenu } from "./modules/menu.js";
import { initCarousel } from "./modules/carousel.js";
import { initForm } from "./modules/form.js";
import { initModal } from "./modules/modal.js";
import { initReveal } from "./modules/reveal.js";
import { initCounters } from "./modules/counters.js";

function init() {
  initMenu();
  initCarousel();
  initForm();
  initModal();
  initReveal();
  initCounters();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
