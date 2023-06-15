const form = document.querySelector("form");
const submit = document.getElementById("submit");
const firstName = document.getElementById("vorname");
const lastName = document.getElementById("nachname");
const email = document.getElementById("email");
const handywunsch = document.getElementById("handywunsch");

// Event-Listener für das Absenden des Formulars
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let isValid = true;

  if (!validateRequiredField(firstName)) {
    isValid = false;
  }

  if (!validateFirstName(firstName)) {
    isValid = false;
  }

  if (!validateRequiredField(lastName)) {
    isValid = false;
  }

  if (!validateLastName(lastName)) {
    isValid = false;
  }

  if (!validateEmail(email)) {
    isValid = false;
  }

  if (handywunsch.value === "") {
    displayErrorMessage(handywunsch, "Bitte wählen Sie eine Option aus.");
    isValid = false;
  } else {
    clearErrorMessage(handywunsch);
  }

  if (isValid) {
    sendFormToDB();
  }
});

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

// Funktion zur Validierung des Vornamens
function validateFirstName(firstName) {
  const minNameLength = 2;
  const maxNameLength = 50;

  const trimmedValue = firstName.value.trim();
  if (trimmedValue.length < minNameLength) {
    displayErrorMessage(firstName, `Der Vorname muss mindestens ${minNameLength} Buchstaben beinhalten.`);
    return false;
  } else if (trimmedValue.length > maxNameLength) {
    displayErrorMessage(firstName, `Der Vorname darf maximal ${maxNameLength} Buchstaben beinhalten.`);
    return false;
  } else {
    clearErrorMessage(firstName);
    return true;
  }
}


// Funktion zur Validierung eines Pflichtfelds
function validateRequiredField(field) {
  if (field.value.trim() === "") {
    displayErrorMessage(field, "Dieses Feld ist erforderlich.");
    return false;
  } else {
    clearErrorMessage(field);
    field.value = field.value.charAt(0).toUpperCase() + field.value.slice(1);
    return true;
  }
}

// Funktion zur Validierung des Nachnamens
function validateLastName(lastName) {
  const minNameLength = 2;
  const maxNameLength = 50;

  const trimmedValue = lastName.value.trim();
  if (trimmedValue.length < minNameLength) {
    displayErrorMessage(lastName, `Der Nachname muss mindestens ${minNameLength} Buchstaben beinhalten.`);
    return false;
  } else if (trimmedValue.length > maxNameLength) {
    displayErrorMessage(lastName, `Der Nachname darf maximal ${maxNameLength} Buchstaben beinhalen.`);
    return false;
  } else {
    clearErrorMessage(lastName);
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

document.addEventListener("DOMContentLoaded", function () {
  if (firstName) {
    firstName.focus();
  }
});

const sendFormToDB = async () => {
  // Daten aus dem Formular für die Datenbank bereitstellen
  const data = {
    group: "al2", // SQL Gruppen Namen
    pw: "5c5e3920", // SQL Passwort
    tableName: "kontaktformular", // Name der Tabelle in der SQL Datenbank

    columns: {
      Highscore: highscoreForm.value,
      Vorname: firstName.value,
      Nachname: lastName.value,
      Email: email.value,
      Handyauswahl: handywunsch.value,
    },
  };
  // Speichert die Daten in der Datenbank
  await databaseClient.insertInto(data);

  window.location.href = "sendebestaetigung.html";
};
