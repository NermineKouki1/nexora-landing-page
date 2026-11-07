import { store } from "./storage.js";

const storageKey = "nexora-offre-fermee";

export function initModal() {
  const dialog = document.querySelector("#modal-offre");
  const reopenButton = document.querySelector("#btn-reafficher-offre");
  const closeButton = dialog?.querySelector(".modal-close");
  const laterButton = dialog?.querySelector(".modal-later");
  const reserveLink = dialog?.querySelector(".modal-reserve");

  if (!(dialog instanceof HTMLDialogElement)) return;

  let opener = null;
  let openTimer = null;

  function openDialog(trigger = document.activeElement) {
    if (dialog.open) return;
    opener = trigger instanceof HTMLElement && trigger !== document.body ? trigger : null;
    dialog.showModal();
  }

  closeButton?.addEventListener("click", () => dialog.close());
  laterButton?.addEventListener("click", () => dialog.close());
  reserveLink?.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    store.set(storageKey, "true");
    if (opener?.isConnected) opener.focus();
    opener = null;
  });

  reopenButton?.addEventListener("click", () => {
    store.remove(storageKey);
    openDialog(reopenButton);
  });

  if (store.get(storageKey) !== "true") {
    openTimer = window.setTimeout(() => {
      openTimer = null;
      openDialog();
    }, 4000);
  }

  window.addEventListener("pagehide", () => {
    if (openTimer !== null) window.clearTimeout(openTimer);
  });
}
