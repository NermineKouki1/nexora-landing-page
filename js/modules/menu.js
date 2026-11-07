export function initMenu() {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector("#menu-toggle");
  const nav = document.querySelector("#main-menu");
  const sections = [
    "accueil",
    "apropos",
    "services",
    "equipe",
    "temoignages",
    "contact"
  ]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!header) return;

  let previousY = window.scrollY;
  let frameRequested = false;

  const showHeader = () => header.classList.remove("is-hidden");

  window.addEventListener(
    "scroll",
    () => {
      if (frameRequested) return;
      frameRequested = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - previousY;

        if (Math.abs(delta) > 4) {
          if (currentY <= 120 || delta < 0 || menuToggle?.checked) {
            showHeader();
          } else {
            header.classList.add("is-hidden");
          }
          previousY = currentY;
        }

        frameRequested = false;
      });
    },
    { passive: true }
  );

  header.addEventListener("focusin", showHeader);
  menuToggle?.addEventListener("change", () => {
    if (menuToggle.checked) showHeader();
  });
  nav?.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (menuToggle) menuToggle.checked = false;
    });
  });

  const links = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  if ("IntersectionObserver" in window && sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleSections.length === 0) return;

        const activeId = visibleSections[0].target.id;
        links.forEach((link) => {
          if (link.hash === `#${activeId}`) {
            link.classList.add("active");
            link.setAttribute("aria-current", "true");
          } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
          }
        });
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.1, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
  }
}
