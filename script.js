let fields = [
    null,
    null,
    'o',
    'x',
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

function fieldInsert(index) {
  if (!fields[index]) {
      fields[index] = currentPlayer;
      renderCell(index); // Update nur das angeklickte Zelle
      currentPlayer = currentPlayer === 'o' ? 'x' : 'o'; // Wechsle den Spieler
  }
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



  

  
  
  
  