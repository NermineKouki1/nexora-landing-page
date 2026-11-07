import { prefersReducedMotion } from "./storage.js";

export function initCounters() {
  const counters = [...document.querySelectorAll("[data-count]")];
  if (counters.length === 0) return;

  const setFinalValue = (counter) => {
    counter.textContent = `${counter.dataset.count}${counter.dataset.suffix ?? ""}`;
  };

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    counters.forEach(setFinalValue);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const counter = entry.target;
        const target = Number(counter.dataset.count);
        const suffix = counter.dataset.suffix ?? "";
        if (!Number.isFinite(target)) {
          observer.unobserve(counter);
          return;
        }

        const duration = 1600;
        const start = performance.now();
        counter.textContent = `0${suffix}`;

        function animate(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = `${Math.round(target * eased)}${suffix}`;
          if (progress < 1) {
            window.requestAnimationFrame(animate);
          } else {
            setFinalValue(counter);
          }
        }

        window.requestAnimationFrame(animate);
        observer.unobserve(counter);
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((counter) => observer.observe(counter));
}
