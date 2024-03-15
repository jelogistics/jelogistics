function search() {
    var id = document.getElementById('employeeId').value;
    fetch('https://script.google.com/macros/s/AKfycbzwR5TTHkuTtkFOKbgApl4yp7XfGjzLCNOPx8tR6yjpbA9QvSZjlpeNoj4F1-ha1upd/exec?id=' + id)
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
