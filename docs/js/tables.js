"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function tableDataLabel() {
  document.querySelectorAll(".table-new").forEach(function (table) {
    var rows = _toConsumableArray(table.querySelectorAll("thead th")).map(function (row) {
      return row.textContent;
    });

    table.querySelectorAll("tbody tr").forEach(function (row) {
      row.querySelectorAll("td").forEach(function (col, i) {
        col.setAttribute("data-label", rows[i]);
      });
    });
  });
}

$(document).ready(tableDataLabel);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhYmxlcy5qcyJdLCJuYW1lcyI6WyJ0YWJsZURhdGFMYWJlbCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJ0YWJsZSIsInJvd3MiLCJtYXAiLCJyb3ciLCJ0ZXh0Q29udGVudCIsImNvbCIsImkiLCJzZXRBdHRyaWJ1dGUiLCIkIiwicmVhZHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxTQUFTQSxjQUFULEdBQTBCO0FBQ3hCQyxFQUFBQSxRQUFRLENBQUNDLGdCQUFULENBQTBCLFlBQTFCLEVBQXdDQyxPQUF4QyxDQUFnRCxVQUFBQyxLQUFLLEVBQUk7QUFDdkQsUUFBSUMsSUFBSSxHQUFHLG1CQUFJRCxLQUFLLENBQUNGLGdCQUFOLENBQXVCLFVBQXZCLENBQUosRUFBd0NJLEdBQXhDLENBQTRDLFVBQUFDLEdBQUc7QUFBQSxhQUFJQSxHQUFHLENBQUNDLFdBQVI7QUFBQSxLQUEvQyxDQUFYOztBQUVBSixJQUFBQSxLQUFLLENBQUNGLGdCQUFOLENBQXVCLFVBQXZCLEVBQW1DQyxPQUFuQyxDQUEyQyxVQUFBSSxHQUFHLEVBQUk7QUFDaERBLE1BQUFBLEdBQUcsQ0FBQ0wsZ0JBQUosQ0FBcUIsSUFBckIsRUFBMkJDLE9BQTNCLENBQW1DLFVBQUNNLEdBQUQsRUFBTUMsQ0FBTixFQUFZO0FBQzdDRCxRQUFBQSxHQUFHLENBQUNFLFlBQUosQ0FBaUIsWUFBakIsRUFBK0JOLElBQUksQ0FBQ0ssQ0FBRCxDQUFuQztBQUNELE9BRkQ7QUFHRCxLQUpEO0FBS0QsR0FSRDtBQVNEOztBQUVERSxDQUFDLENBQUNYLFFBQUQsQ0FBRCxDQUFZWSxLQUFaLENBQWtCYixjQUFsQiIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHRhYmxlRGF0YUxhYmVsKCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlLW5ld1wiKS5mb3JFYWNoKHRhYmxlID0+IHtcbiAgICB2YXIgcm93cyA9IFsuLi50YWJsZS5xdWVyeVNlbGVjdG9yQWxsKFwidGhlYWQgdGhcIildLm1hcChyb3cgPT4gcm93LnRleHRDb250ZW50KTtcblxuICAgIHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0Ym9keSB0clwiKS5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICByb3cucXVlcnlTZWxlY3RvckFsbChcInRkXCIpLmZvckVhY2goKGNvbCwgaSkgPT4ge1xuICAgICAgICBjb2wuc2V0QXR0cmlidXRlKFwiZGF0YS1sYWJlbFwiLCByb3dzW2ldKVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxufVxuXG4kKGRvY3VtZW50KS5yZWFkeSh0YWJsZURhdGFMYWJlbCkiXSwiZmlsZSI6InRhYmxlcy5qcyJ9
