import { prefersReducedMotion } from "./storage.js";

export function initReveal() {
  const elements = [...document.querySelectorAll("[data-reveal]")];
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => {
      element.classList.add("is-visible");
      element.removeAttribute("data-reveal");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        element.classList.add("is-visible");
        const finishReveal = (event) => {
          if (event.propertyName !== "opacity") return;
          element.removeAttribute("data-reveal");
          element.removeEventListener("transitionend", finishReveal);
        };
        element.addEventListener("transitionend", finishReveal);
        observer.unobserve(element);
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((element) => observer.observe(element));
}
