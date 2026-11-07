import { prefersReducedMotion } from "./storage.js";

export class Carousel {
  constructor(root) {
    this.root = root;
    this.track = root.querySelector(".carousel-track");
    this.slides = [...root.querySelectorAll('[aria-roledescription="diapositive"]')];
    this.dots = root.querySelector(".carousel-dots");
    this.previousButton = root.querySelector(".carousel-prev");
    this.nextButton = root.querySelector(".carousel-next");
    this.toggleButton = root.querySelector(".btn-pause");
    this.status = root.querySelector(".carousel-status");
    this.index = 0;
    this.timer = null;
    this.userPaused = prefersReducedMotion;
    this.pointerPaused = false;
    this.focusPaused = false;
    this.touchStartX = null;

    if (!this.track || this.slides.length === 0 || !this.dots) return;
    this.createDots();
    this.bindEvents();
    this.update();
    this.startTimer();
  }

  createDots() {
    this.slides.forEach((slide, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "dot";
      dot.setAttribute("aria-label", `Afficher le témoignage ${index + 1}`);
      dot.addEventListener("click", () => this.goTo(index));
      this.dots.append(dot);
    });
  }

  bindEvents() {
    this.previousButton?.addEventListener("click", () => this.goTo(this.index - 1));
    this.nextButton?.addEventListener("click", () => this.goTo(this.index + 1));
    this.toggleButton?.addEventListener("click", () => {
      this.userPaused = !this.userPaused;
      this.updateToggle();
      this.startTimer();
    });

    this.root.addEventListener("mouseenter", () => {
      this.pointerPaused = true;
      this.startTimer();
    });
    this.root.addEventListener("mouseleave", () => {
      this.pointerPaused = false;
      this.startTimer();
    });
    this.root.addEventListener("focusin", () => {
      this.focusPaused = true;
      this.startTimer();
    });
    this.root.addEventListener("focusout", (event) => {
      if (!this.root.contains(event.relatedTarget)) {
        this.focusPaused = false;
        this.startTimer();
      }
    });
    this.root.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        this.goTo(this.index - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        this.goTo(this.index + 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        this.goTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        this.goTo(this.slides.length - 1);
      }
    });
    this.root.addEventListener(
      "touchstart",
      (event) => {
        this.touchStartX = event.changedTouches[0]?.screenX ?? null;
      },
      { passive: true }
    );
    this.root.addEventListener(
      "touchend",
      (event) => {
        const endX = event.changedTouches[0]?.screenX;
        if (this.touchStartX === null || endX === undefined) return;
        const difference = endX - this.touchStartX;
        if (Math.abs(difference) > 40) this.goTo(this.index + (difference < 0 ? 1 : -1));
        this.touchStartX = null;
      },
      { passive: true }
    );

    this.updateToggle();
  }

  goTo(index) {
    this.index = (index + this.slides.length) % this.slides.length;
    this.update();
  }

  update() {
    this.track.style.transform = `translateX(-${this.index * 100}%)`;
    this.slides.forEach((slide, slideIndex) => {
      slide.setAttribute("aria-hidden", String(slideIndex !== this.index));
    });
    [...this.dots.children].forEach((dot, dotIndex) => {
      if (dotIndex === this.index) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
    if (this.status) {
      this.status.textContent = `Témoignage ${this.index + 1} sur ${this.slides.length}`;
    }
  }

  updateToggle() {
    if (!this.toggleButton) return;
    const playing = !this.userPaused;
    this.toggleButton.textContent = playing ? "Pause" : "Lecture";
    this.toggleButton.setAttribute(
      "aria-label",
      playing ? "Mettre en pause le carrousel" : "Reprendre le carrousel"
    );
  }

  startTimer() {
    this.stopTimer();
    if (this.userPaused || this.pointerPaused || this.focusPaused) return;
    this.timer = window.setInterval(() => this.goTo(this.index + 1), 5000);
  }

  stopTimer() {
    if (this.timer !== null) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  }
}

export function initCarousel() {
  const root = document.querySelector(".carousel");
  if (root) new Carousel(root);
}
