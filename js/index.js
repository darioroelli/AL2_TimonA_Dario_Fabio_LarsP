// Warte, bis das DOM vollständig geladen ist
document.addEventListener("DOMContentLoaded", function() {
    // Selektiere alle FAQ-Toggles
    var toggles = document.querySelectorAll(".toggle");
  
    // Füge jedem Toggle einen Event Listener hinzu
    toggles.forEach(function(toggle) {
      var question = toggle.querySelector("h3");
      var answer = toggle.querySelector(".answer");
  
      // Initialisiere den Toggle-Zustand
      toggle.classList.remove("active");
      answer.style.display = "none";
  
      // Hinzufügen des Event Listeners für den Klick auf die Frage
      question.addEventListener("click", function() {
        // Überprüfe den aktuellen Zustand des Toggles
        var isActive = toggle.classList.contains("active");
  
        if (isActive) {
          // Toggle ist aktiv, also schließe die Antwort
          toggle.classList.remove("active");
          answer.style.display = "none";
        } else {
          // Toggle ist inaktiv, also öffne die Antwort
          toggle.classList.add("active");
          answer.style.display = "block";
        }
      });
    });
  });
  