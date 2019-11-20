function tableDataLabel() {
  [...document.querySelectorAll(".table-new")].map(table => {
    var rows = [...table.querySelectorAll("thead th")].map(row => row.textContent);

    [...table.querySelectorAll("tbody tr")].map(row => {
      [...row.querySelectorAll("td")].map((col, i) => {
        col.setAttribute("data-label", rows[i])
      })
    })
  })
}

$(document).ready(tableDataLabel)