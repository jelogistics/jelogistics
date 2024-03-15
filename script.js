function search() {
    var id = document.getElementById('employeeId').value;
    fetch('https://script.google.com/macros/s/AKfycbyo_Goc2vs7z8oSaHnRgGfjIEgymoM6xZxr_UPKUsN4npWgZ6VHzZ8yNKW5CWXsILTU/exec?id=' + id)
      .then(response => response.json())
      .then(data => {
        var table = document.getElementById('results');
        table.innerHTML = ''; // 테이블을 초기화합니다.
        data.forEach(row => {
          var tr = document.createElement('tr');
          row.forEach(cell => {
            var td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
          });
          table.appendChild(tr);
        });
      });
  }  