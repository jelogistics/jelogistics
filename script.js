function search() {
  var id = document.getElementById('employeeId').value + '@df';
  console.log(id);

  const spreadsheetId = '1xQ-UhE36gClbOnCo0X5HvEIEkhEHTWxB4wZ4KMYCSHE';
  const range = '시트1!C1:K300';
  const apiKey = 'AIzaSyCpQ8NBW47VQaFMGujdDHV1cEAY_kOjbrg';
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayResults(data, id);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      document.getElementById('results').innerHTML = 'Error loading results.';
    });
}

function displayResults(data, id) {
  const values = data.values;
  let resultsHTML = '<table border="1"><tr>';

  
  values[0].forEach(header => {
    resultsHTML += `<th>${header}</th>`;
  });
  resultsHTML += '</tr>';

  
  values.slice(1).forEach(row => {
    if (row.includes(id)) {
      resultsHTML += '<tr>';
      row.forEach(cell => {
        resultsHTML += `<td>${cell}</td>`;
      });
      resultsHTML += '</tr>';
    }
  });

  resultsHTML += '</table>';

 
  if (resultsHTML === '<table border="1"><tr></tr></table>') {
    resultsHTML = 'No results found.';
  }

  document.getElementById('results').innerHTML = resultsHTML;
}
