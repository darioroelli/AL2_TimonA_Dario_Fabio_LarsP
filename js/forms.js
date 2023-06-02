const form = document.querySelector("form");
const submitButton = document.getElementById("submit");
const firstName = document.getElementById("fname");
const lastName = document.getElementById("lname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const privacyCheckbox = document.getElementById("privacy");

// Event-Listener für das Absenden des Formulars
form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  // Validierung der Eingaben
  let isValid = true;

  if (!validateRequiredField(firstName)) {
    isValid = false;
  }
  
  if (!validateRequiredField(lastName)) {
    isValid = false;
  }
  
  if (!validateEmail(email)) {
    isValid = false;
  }
  
  if (!validatePhone(phone)) {
    isValid = false;
  }
  
  if (!privacyCheckbox.checked) {
    isValid = false;
    displayErrorMessage(privacyCheckbox, "Sie müssen den Datenschutzhinweis akzeptieren.");
  }
  
  if (isValid) {
    // Formular absenden
    form.submit();
  }
});

// Funktion zur Validierung eines Pflichtfelds
function validateRequiredField(field) {
  if (field.value.trim() === "") {
    displayErrorMessage(field, "Dieses Feld ist erforderlich.");
    return false;
  } else {
    clearErrorMessage(field);
    return true;
  }
}

// Funktion zur Validierung der E-Mail-Adresse
function validateEmail(emailField) {
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailPattern.test(emailField.value)) {
    displayErrorMessage(emailField, "Bitte geben Sie eine gültige E-Mail-Adresse ein.");
    return false;
  } else {
    clearErrorMessage(emailField);
    return true;
  }
}

// Funktion zur Validierung der Telefonnummer
function validatePhone(phoneField) {
  const phonePattern = /^\+41\d{9}$/;
  if (!phonePattern.test(phoneField.value)) {
    displayErrorMessage(phoneField, "Bitte geben Sie eine gültige schweizerische Telefonnummer ein (z.B. +41791234567).");
    return false;
  } else {
    clearErrorMessage(phoneField);
    return true;
  }
}

// Funktion zur Anzeige einer Fehlermeldung
function displayErrorMessage(field, message) {
  const errorElement = document.createElement("div");
  errorElement.classList.add("error-message");
  errorElement.innerText = message;
  field.classList.add("error");
  field.parentNode.insertBefore(errorElement, field.nextSibling);
}

// Funktion zum Entfernen einer Fehlermeldung
function clearErrorMessage(field) {
  const errorElement = field.parentNode.querySelector(".error-message");
  if (errorElement) {
    field.parentNode.removeChild(errorElement);
  }
  field.classList.remove("error");
}