let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
]

let currentPlayer = 'o'; // Füge currentPlayer hinzu



function init() {
    render();
}

function render() {
  const content = document.getElementById('content');
  content.innerHTML = ''; // Clear previous content

  let tableHTML = '<table>';

  for (let i = 0; i < 3; i++) {
      tableHTML += '<tr>';

      for (let j = 0; j < 3; j++) {
          const index = i * 3 + j;
          let cellContent = '';

          if (!fields[index]) {
              cellContent = `<td onclick="fieldInsert(${index})"></td>`;
          } else {
              cellContent = `<td>${fields[index] === 'o' ? generateCircleHtml() : generateCrossHtml()}</td>`;
          }

          tableHTML += cellContent;
      }

      tableHTML += '</tr>';
  }

  tableHTML += '</table>';
  content.innerHTML += tableHTML;
}

function renderCell(index) {
  const cell = document.querySelector(`[onclick="fieldInsert(${index})"]`);
  
  if (cell) {
      const cellContent = fields[index] === 'o' ? generateCircleHtml() : generateCrossHtml();
      cell.innerHTML = cellContent;
      cell.onclick = null; // Deaktiviere die onclick Funktion
  }
}

// Füge einen Aufruf von checkWinner() in die fieldInsert-Funktion ein, um nach jedem Zug zu überprüfen
function fieldInsert(index) {
  if (!fields[index]) {
      fields[index] = currentPlayer;
      renderCell(index);
      checkWinner(); // Überprüfe, ob ein Spieler gewonnen hat
      currentPlayer = currentPlayer === 'o' ? 'x' : 'o';
  }
}

function checkWinner() {
  const winningCombinations = [
      // Hier kannst du alle möglichen Gewinnkombinationen definieren
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
  ];

  for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
          // Ein Spieler hat gewonnen
          alert(`Spieler ${fields[a]} hat gewonnen!`);
          disableClicks(); // Deaktiviere die onclick-Funktion für alle Zellen
          drawWinningLine(combination); // Zeichne eine Linie über die Gewinnkombination
          return;
      }
  }

  // Überprüfe auf Unentschieden
  if (isBoardFull()) {
      alert('Unentschieden!');
      disableClicks(); // Deaktiviere die onclick-Funktion für alle Zellen
  }
}


function disableClicks() {
  // Deaktiviere die onclick-Funktion für alle Zellen
  const cells = document.querySelectorAll('[onclick^="fieldInsert"]');
  cells.forEach(function(cell) {
      cell.onclick = null;
  });
}

function isBoardFull() {
  // Überprüfe, ob das Spielfeld voll ist
  return fields.every(function(cell) {
      return cell !== null;
  });
}


function drawWinningLine(combination) {
  // Zeichne eine Linie über die Gewinnkombination
  // Hier könntest du Logik hinzufügen, um visuell die Gewinnkombination darzustellen
  // Zum Beispiel könntest du die Linie über die entsprechenden <td>-Elemente zeichnen.
  // Implementiere dies entsprechend deinen Design-Präferenzen.
  // ...
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



  

  
  
  
  