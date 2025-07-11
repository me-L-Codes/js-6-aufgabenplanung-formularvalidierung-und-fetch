

document.addEventListener("DOMContentLoaded", () => {

    // Formular- und Listenreferenzen
    const form = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");

    // Event-Listener für das Absenden des Formulars
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const description = document.getElementById("taskDescription").value.trim();
        const dueDate = document.getElementById("dueDate").value;
        const priority = document.getElementById("priority").value;

        const descError = document.getElementById("descError");
        const dateError = document.getElementById("dateError");
        const priorityError = document.getElementById("priorityError");
        
        descError.textContent = "";
        dateError.textContent = "";
        priorityError.textContent = "";

        let valid = true;
        
        // Validierung der Felder
        if (!description) {
            descError.textContent = "Bitte eine Aufgabenbeschreibung eingeben.";
            valid = false;
        }
        if (!dueDate) {
            dateError.textContent = "Bitte ein Fälligkeitsdatum auswählen.";
            valid = false;
        }

        if (priority === "") { // Falls noch "Bitte auswählen" gesetzt ist
            priorityError.textContent = "Bitte eine Priorität auswählen.";
            valid = false;
        }

        // Falls eines der Felder ungültig ist, abbrechen
        if (!valid) {
            return;
        }
    
        // Aufgabe zur Liste hinzufügen
        const li = document.createElement("li");
        li.innerHTML = `<strong>${description}</strong> - Fällig am: ${dueDate} - Priorität: ${priority}`;
        taskList.appendChild(li);

        // Daten asynchron an die API senden
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Datenformat
                },
                body: JSON.stringify({
                    taskDescription: description, // Aufgabenbeschreibung
                    dueDate: dueDate,             // Fälligkeitsdatum
                    priority: priority            // Priorität
                })
            });

            // Warten auf die Antwort der API und JSON-Daten extrahieren
            const data = await response.json();
            console.log('Antwort von der API:', data);

        } catch (error) {
            console.error('Fehler beim Senden der Aufgabe:', error);
        }

        form.reset(); // Formular nach erfolgreicher Übertragung zurücksetzen
    });
});


