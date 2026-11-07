const namePattern = /^\p{L}[\p{L}\s'’-]*$/u;
const tunisianPhonePattern = /^(?:\+216|00216)?[2-579]\d{7}$/;
const emailPattern = /^[A-Z0-9_!#$%&'*+/=?^`{|}~-]+(?:\.[A-Z0-9_!#$%&'*+/=?^`{|}~-]+)*@(?:[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?\.)+[A-Z]{2,}$/i;

export function initForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const fields = {
    nom: form.elements.namedItem("nom"),
    email: form.elements.namedItem("email"),
    telephone: form.elements.namedItem("telephone"),
    message: form.elements.namedItem("message"),
    consent: form.elements.namedItem("consent")
  };
  const counter = form.querySelector("#compteur-message");
  const success = form.querySelector(".form-success");
  const submitButton = form.querySelector('button[type="submit"]');
  let submissionPending = false;

  form.noValidate = true;

  function getError(fieldName, field) {
    const value = field.value.trim();
    if (fieldName === "nom") {
      if (!value) return "Veuillez saisir votre nom.";
      if (value.length < 3) return "Le nom doit contenir au moins 3 caractères.";
      if (!namePattern.test(value)) return "Utilisez uniquement des lettres, espaces, apostrophes ou traits d'union.";
    }
    if (fieldName === "email") {
      if (!value) return "Veuillez saisir votre adresse e-mail.";
      if (!emailPattern.test(value) || !field.validity.valid) return "Veuillez saisir une adresse e-mail valide.";
    }
    if (fieldName === "telephone" && value && !tunisianPhonePattern.test(value)) {
      return "Saisissez un numéro tunisien valide de 8 chiffres, avec l'indicatif +216 ou 00216 facultatif.";
    }
    if (fieldName === "message") {
      if (!value) return "Veuillez saisir votre message.";
      if (value.length < 20) return "Le message doit contenir au moins 20 caractères.";
      if (value.length > 500) return "Le message ne peut pas dépasser 500 caractères.";
    }
    if (fieldName === "consent" && !field.checked) {
      return "Votre accord est nécessaire pour envoyer le formulaire.";
    }
    return "";
  }

  function validateField(fieldName, field) {
    const errorElement = form.querySelector(`#erreur-${fieldName}`);
    const error = getError(fieldName, field);
    if (error) {
      field.setAttribute("aria-invalid", "true");
      if (errorElement) errorElement.textContent = error;
    } else {
      field.removeAttribute("aria-invalid");
      if (errorElement) errorElement.textContent = "";
    }
    return !error;
  }

  Object.entries(fields).forEach(([fieldName, field]) => {
    if (!field) return;
    field.addEventListener("blur", () => validateField(fieldName, field));
    field.addEventListener("input", () => {
      if (field.hasAttribute("aria-invalid")) validateField(fieldName, field);
      if (fieldName === "message" && counter) {
        counter.textContent = `${field.value.length} / 500`;
      }
      if (success && !success.hidden) success.hidden = true;
    });
    if (fieldName === "consent") {
      field.addEventListener("change", () => {
        if (field.hasAttribute("aria-invalid")) validateField(fieldName, field);
      });
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (submissionPending) return;

    const invalidFields = Object.entries(fields)
      .filter(([, field]) => field)
      .filter(([fieldName, field]) => !validateField(fieldName, field));

    if (invalidFields.length > 0) {
      invalidFields[0][1].focus();
      return;
    }

    submissionPending = true;
    if (submitButton) submitButton.disabled = true;
    window.setTimeout(() => {
      const name = fields.nom.value.trim();
      if (success) {
        success.textContent = `Merci ${name} ! Votre message a bien été envoyé. Nous vous répondrons sous 24 heures.`;
        success.hidden = false;
      }
      form.reset();
      Object.entries(fields).forEach(([fieldName, field]) => {
        if (!field) return;
        field.removeAttribute("aria-invalid");
        const errorElement = form.querySelector(`#erreur-${fieldName}`);
        if (errorElement) errorElement.textContent = "";
      });
      if (counter) counter.textContent = "0 / 500";
      submissionPending = false;
      if (submitButton) submitButton.disabled = false;
    }, 600);
  });
}
