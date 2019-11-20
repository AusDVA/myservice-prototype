function tableDataLabel() {
  document.querySelectorAll(".table-new").forEach(table => {
    var rows = [...table.querySelectorAll("thead th")].map(row => row.textContent);

    table.querySelectorAll("tbody tr").forEach(row => {
      row.querySelectorAll("td").forEach((col, i) => {
        col.setAttribute("data-label", rows[i])
      })
    })
  })
}

$(document).ready(tableDataLabel)