// Importiere die notwendigen Hooks von React
import { useState } from "react";
// Importiere die Daten und Styles
import data from "./data";
import "./styles.css";

function Accordian() {
  // Zustand für die aktuelle Auswahl (einzelne Auswahl)
  const [selected, setSelected] = useState(null);
  // Zustand, um die Mehrfachauswahl zu aktivieren oder zu deaktivieren
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  // Zustand für die Liste der aktuell ausgewählten IDs (bei Mehrfachauswahl)
  const [multiple, setMultiple] = useState([]);

  // Funktion zur Behandlung der Einzelauswahl
  function handleSingleSelection(getCurrentId) {
    // Setze die Auswahl zurück, wenn der aktuelle ID bereits ausgewählt ist, sonst wähle sie aus
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  // Funktion zur Behandlung der Mehrfachauswahl
  function handleMultiSelection(getCurrentId) {
    // Erstelle eine Kopie des aktuellen Auswahl-Arrays
    let cpyMutiple = [...multiple];
    // Finde den Index der aktuellen ID in der Auswahl
    const findIndexOfCurrentId = cpyMutiple.indexOf(getCurrentId);

    console.log(findIndexOfCurrentId); // Debugging-Zweck, um den Index anzuzeigen
    // Wenn die ID nicht gefunden wird, füge sie zur Auswahl hinzu
    if (findIndexOfCurrentId === -1) cpyMutiple.push(getCurrentId);
    // Wenn die ID gefunden wird, entferne sie aus der Auswahl
    else cpyMutiple.splice(findIndexOfCurrentId, 1);

    // Aktualisiere den Zustand mit der neuen Auswahl
    setMultiple(cpyMutiple);
  }

  console.log(selected, multiple); // Debugging-Zweck, um den aktuellen Zustand anzuzeigen

  return (
    <div className="acc-wrapper">
      {/* Button zum Aktivieren oder Deaktivieren der Mehrfachauswahl */}
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multi Selection
      </button>
      <div className="accordian">
        {/* Überprüfen, ob Daten vorhanden sind */}
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div key={dataItem.id} className="item">
              {/* Titel des Akkordeons */}
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id) // Mehrfachauswahl aktiv
                    : () => handleSingleSelection(dataItem.id) // Einzelne Auswahl aktiv
                }
                className="title"
              >
                <h3>{dataItem.question}</h3> {/* Frage anzeigen */}
                <span>+</span> {/* Symbol für das Akkordeon */}
              </div>
              {/* Anzeige der Antwort basierend auf der Auswahl */}
              {enableMultiSelection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="acc-content ">{dataItem.answer}</div> // Antwort anzeigen, wenn ausgewählt
                  )
                : selected === dataItem.id && (
                    <div className="acc-content ">{dataItem.answer}</div> // Antwort anzeigen, wenn ausgewählt
                  )}
            </div>
          ))
        ) : (
          <div>No data found!</div> // Nachricht, wenn keine Daten vorhanden sind
        )}
      </div>
    </div>
  );
}

export default Accordian;