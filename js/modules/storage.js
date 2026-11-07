export const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

export const store = {
  get(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      console.warn("Le stockage local est indisponible.", error);
      return null;
    }
  },

  set(key, value) {
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.warn("Impossible d'enregistrer cette préférence localement.", error);
      return false;
    }
  },

  remove(key) {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn("Impossible de supprimer cette préférence locale.", error);
      return false;
    }
  }
};
