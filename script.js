let fields = [null, null, null, null, null, null, null, null, null];

let currentPlayer = "o"; // Füge currentPlayer hinzu

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function init() {
  render();
}

function render() {
  const content = document.getElementById("content");
  content.innerHTML = ""; // Clear previous content

  const currentPlayerDisplay = document.getElementById("currentPlayerDisplay");
  currentPlayerDisplay.innerHTML = `Aktueller Spieler: ${
    currentPlayer === "o" ? generateCircleHtml() : generateCrossHtml()
  }`;

  let tableHTML = "<table>";

  for (let i = 0; i < 3; i++) {
    tableHTML += "<tr>";

    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      let cellContent = "";

      if (!fields[index]) {
        cellContent = `<td onclick="fieldInsert(${index})"></td>`;
      } else {
        cellContent = `<td>${
          fields[index] === "o" ? generateCircleHtml() : generateCrossHtml()
        }</td>`;
      }

      tableHTML += cellContent;
    }

    tableHTML += "</tr>";
  }

  tableHTML += "</table>";
  content.innerHTML += tableHTML;

  updateCurrentPlayerDisplay();
}

function renderCell(index) {
  const cell = document.querySelector(`[onclick="fieldInsert(${index})"]`);

  if (cell) {
    const cellContent =
      fields[index] === "o" ? generateCircleHtml() : generateCrossHtml();
    cell.innerHTML = cellContent;
    cell.onclick = null; // Deaktiviere die onclick Funktion
  }
}

function updateCurrentPlayerDisplay() {
  const currentPlayerDisplay = document.getElementById("currentPlayerDisplay");
  currentPlayerDisplay.innerHTML = `Aktueller Spieler: ${
    currentPlayer === "o" ? generateCircleHtml() : generateCrossHtml()
  }`;
}

function fieldInsert(index) {
  if (!fields[index]) {
    fields[index] = currentPlayer;
    renderCell(index);
    checkWinner(); // Überprüfe, ob ein Spieler gewonnen hat
    currentPlayer = currentPlayer === "o" ? "x" : "o";
    updateCurrentPlayerDisplay(); // Aktualisiere den angezeigten Spieler
  }
}

function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      // Ein Spieler hat gewonnen
      displayWinner(fields[a]);
      winningTdsChangeColor(combination); // Hervorhebe die gewinnende Kombination
      disableClicks(); // Deaktiviere die onclick-Funktion für alle Zellen
      return;
    }
  }

  // Überprüfe auf Unentschieden
  if (isBoardFull()) {
    disableClicks(); // Deaktiviere die onclick-Funktion für alle Zellen
    displayDraw();
  }
}

function displayWinner(player) {
  const winnerDisplay = document.getElementById("winnerDisplay");
  const playerSymbol =
    player === "o" ? generateCircleHtml() : generateCrossHtml();
  winnerDisplay.innerHTML = `Herzlichen Glückwunsch, Spieler ${playerSymbol} hat gewonnen!`;
  newGame()
}

function displayDraw() {
  const winnerDisplay = document.getElementById('winnerDisplay');
  winnerDisplay.innerHTML = 'Unentschieden!';
  newGame();
}


function disableClicks() {
  // Deaktiviere die onclick-Funktion für alle Zellen
  const cells = document.querySelectorAll('[onclick^="fieldInsert"]');
  cells.forEach(function (cell) {
    cell.onclick = null;
  });
}

function isBoardFull() {
  // Überprüfe, ob das Spielfeld voll ist
  return fields.every(function (cell) {
    return cell !== null;
  });
}

function winningTdsChangeColor(combination) {
  for (let i = 0; i < combination.length; i++) {
    const index = combination[i];
    const cellSelector = `[onclick="fieldInsert(${index})"]`;
    const cell = document.querySelector(cellSelector);

    if (cell) {
      const backgroundColor = "rgba(255,255,255,0.3)";
      cell.style.backgroundColor = backgroundColor;
    }
  }
}

function newGame() {
  const winnerDisplay = document.getElementById('button-div');
  winnerDisplay.innerHTML = '<button onclick="startNewGame()">Neues Spiel</button>';
}

function startNewGame() {
  // Setze alle Felder zurück
  fields = Array(9).fill(null);

  // Wechsle den Startspieler basierend auf dem letzten Verlierer
  currentPlayer = currentPlayer === 'o' ? 'o' : 'x';

  // Rendere das aktualisierte Spielfeld
  render();

  // Verstecke den Gewinner-Button
  const winnerDisplay = document.getElementById('winnerDisplay');
  winnerDisplay.innerHTML = '';

  const newGameDisplay = document.getElementById('button-div');
  newGameDisplay.innerHTML = '';
}



function generateCircleHtml() {
  return `<svg height="48" width="48" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="20" stroke="#00b0e7" stroke-width="8" fill="transparent" stroke-opacity="0">
              <animate attributeName="stroke-opacity" from="0" to="1" dur="0.25s" fill="freeze"/>
          </circle>
        </svg>`;
}

function generateCrossHtml() {
  return `<svg height="48" width="48" xmlns="http://www.w3.org/2000/svg">
          <line x1="5" y1="5" x2="43" y2="43" stroke="#FFC000" stroke-width="8" stroke-opacity="0">
              <animate attributeName="stroke-opacity" from="0" to="1" dur="0.25s" fill="freeze"/>
          </line>
          <line x1="43" y1="5" x2="5" y2="43" stroke="#FFC000" stroke-width="8" stroke-opacity="0">
              <animate attributeName="stroke-opacity" from="0" to="1" dur="0.25s" fill="freeze"/>
          </line>
        </svg>`;
}
