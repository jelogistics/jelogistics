function search() {
  var id = document.getElementById('employeeId').value + '@df';
  console.log(id);

  const spreadsheetId = '1xQ-UhE36gClbOnCo0X5HvEIEkhEHTWxB4wZ4KMYCSHE'; // Your actual spreadsheet ID
  const range = '시트1!A1:K300'; // Adjust the range as needed
  const apiKey = 'AIzaSyCpQ8NBW47VQaFMGujdDHV1cEAY_kOjbrg'; // Your actual API key
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

  // Generate table headers from the first row
  values[0].forEach(header => {
    resultsHTML += `<th>${header}</th>`;
  });
  resultsHTML += '</tr>';

  // Filter and display only the rows that match the search ID
  values.slice(1).forEach(row => {
    if (row.includes(id)) { // Check if the current row contains the search ID
      resultsHTML += '<tr>';
      row.forEach(cell => {
        resultsHTML += `<td>${cell}</td>`;
      });
      resultsHTML += '</tr>';
    }
  });

  resultsHTML += '</table>';

  // If no results are found
  if (resultsHTML === '<table border="1"><tr></tr></table>') {
    resultsHTML = 'No results found.';
  }

  document.getElementById('results').innerHTML = resultsHTML;
}
