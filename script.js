let fields = [
    null,
    null,
    'o',
    'x',
    'o',
    'o',
    null,
    'x',
    null,
]

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
  
        if (fields[index]) {
          if (fields[index] === 'o') {
            cellContent = generateCircleHtml();
          } else if (fields[index] === 'x') {
            cellContent = generateCrossHtml();
          }
        }
  
        tableHTML += `<td>${cellContent}</td>`;
      }
  
      tableHTML += '</tr>';
    }
  
    tableHTML += '</table>';
    content.innerHTML += tableHTML;
  }
  

  function generateCircleHtml() {
    return '<svg height="48" width="48">' +
             '<circle cx="24" cy="24" r="20" stroke="#00b0e7" stroke-width="8" fill="transparent"/>' +
           '</svg>';
  }

  function generateCrossHtml() {
    return '<svg height="48" width="48">' +
             '<line x1="5" y1="5" x2="43" y2="43" stroke="#FFC000" stroke-width="8"/>' +
             '<line x1="43" y1="5" x2="5" y2="43" stroke="#FFC000" stroke-width="8"/>' +
           '</svg>';
  }
  

  
  
  
  