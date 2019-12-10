// Pull in the json content 
$.ajax({
  url: '/docs/data/claim-il-conditions.json',
  async: false,
  dataType: 'json'
}).done(function (data) {

  console.log('Claim data back');

  localStorage.setItem('claimIlStraightThrough', JSON.stringify(data));

  setClaimCondition();
});


// put the user from user.js in to local storage and the users clients in to session storage 
function setClaimCondition() {

  console.log('Claim lookup ');

  const claimDataAll = JSON.parse(localStorage.getItem('claimIlStraightThrough'));


  $("#tags").autocomplete({
    // source: availableTags,
    source: claimDataAll,
    select: function (event, ui) {

      console.log('selected = ');

      sessionStorage.setItem('claimCondition', JSON.stringify(ui.item));


      // $('.pt-type-ahead-type').hide();


    }

  });

}

function getClaimCondition() {

  const claimDataAll = JSON.parse(localStorage.getItem('claimIlStraightThrough'));
  const claimDataClaim = JSON.parse(sessionStorage.getItem('claimCondition'));
  // checking if it's a condition that is a candidate for a computer based decision 
  if (claimDataClaim.category === 'cbd') {


    // populate the claim dropdown list with the matched data from the json
    var $docType = $('.pt-doc-type');
    $docType.empty();
    $docType.append('<option>-- Select type --</option>');

    $.each(claimDataAll, function (index, condition) {

      if (claimDataClaim.label === condition.label) {
        console.log('element found');

        var requiredDocsHtml = '';

        if (this.documentTypeRequired.length === 1) {

          console.log(this.documentTypeRequired);

          requiredDocsHtml += this.documentTypeRequired[0].name;
          $docType.append('<option value=' + this.documentTypeRequired[0].name + '>' + this.documentTypeRequired[0].name + '</option>');
          $('.pt-il-claim-required-mono-doc').show();
          $('.pt-il-claim-required-multi-doc').hide();
        } else {
          requiredDocsHtml += '<ul>';
          $.each(this.documentTypeRequired, function (index, docsRequired) {
            requiredDocsHtml += '<li>' + docsRequired.name + '</li>';
            $docType.append('<option value="' + docsRequired.name + '">' + docsRequired.name + '</option>');
          });
          requiredDocsHtml += '</ul>';
          $('.pt-il-claim-required-mono-doc').hide();
          $('.pt-il-claim-required-multi-doc').show();
        }

        // console.log("requiredDocsHtml");
        // console.log(requiredDocsHtml);
        $('.pt-il-claim-required-docs-list').html(requiredDocsHtml);
        if (requiredDocsHtml != '') {

          $('.pt-required-docs').show();
          $('.pt-no-required-docs').hide();
        } else {
          // alert('show blank');
          // $('.pt-il-claim-required-docs-list').html(requiredDocsHtml);
          // $('.pt-no-required-docs').show();
          // $('.pt-required-docs').hide();
          // $('.pt-il-claim-required-mono-doc').hide();
          // $('.pt-il-claim-required-multi-doc').hide();

        }
      }
    });


    var clonedDiv = $('#trData1').clone(true);

    $("#add-another-doc").click(function () {

      var random = Math.random();
      clonedDiv.attr("id", random);
      $('.file-upload-default__row--add-another').before(clonedDiv);

      clonedDiv = $('#trData1').clone(true);
    });



  } else {
    $('.pt-no-required-docs').show();
    $('.pt-required-docs').hide();
  }
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjbGFpbXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gUHVsbCBpbiB0aGUganNvbiBjb250ZW50IFxyXG4kLmFqYXgoe1xyXG4gIHVybDogJy9kb2NzL2RhdGEvY2xhaW0taWwtY29uZGl0aW9ucy5qc29uJyxcclxuICBhc3luYzogZmFsc2UsXHJcbiAgZGF0YVR5cGU6ICdqc29uJ1xyXG59KS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gIGNvbnNvbGUubG9nKCdDbGFpbSBkYXRhIGJhY2snKTtcclxuXHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NsYWltSWxTdHJhaWdodFRocm91Z2gnLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcblxyXG4gIHNldENsYWltQ29uZGl0aW9uKCk7XHJcbn0pO1xyXG5cclxuXHJcbi8vIHB1dCB0aGUgdXNlciBmcm9tIHVzZXIuanMgaW4gdG8gbG9jYWwgc3RvcmFnZSBhbmQgdGhlIHVzZXJzIGNsaWVudHMgaW4gdG8gc2Vzc2lvbiBzdG9yYWdlIFxyXG5mdW5jdGlvbiBzZXRDbGFpbUNvbmRpdGlvbigpIHtcclxuXHJcbiAgY29uc29sZS5sb2coJ0NsYWltIGxvb2t1cCAnKTtcclxuXHJcbiAgY29uc3QgY2xhaW1EYXRhQWxsID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2xhaW1JbFN0cmFpZ2h0VGhyb3VnaCcpKTtcclxuXHJcblxyXG4gICQoXCIjdGFnc1wiKS5hdXRvY29tcGxldGUoe1xyXG4gICAgLy8gc291cmNlOiBhdmFpbGFibGVUYWdzLFxyXG4gICAgc291cmNlOiBjbGFpbURhdGFBbGwsXHJcbiAgICBzZWxlY3Q6IGZ1bmN0aW9uIChldmVudCwgdWkpIHtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKCdzZWxlY3RlZCA9ICcpO1xyXG5cclxuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnY2xhaW1Db25kaXRpb24nLCBKU09OLnN0cmluZ2lmeSh1aS5pdGVtKSk7XHJcblxyXG5cclxuICAgICAgLy8gJCgnLnB0LXR5cGUtYWhlYWQtdHlwZScpLmhpZGUoKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICB9KTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldENsYWltQ29uZGl0aW9uKCkge1xyXG5cclxuICBjb25zdCBjbGFpbURhdGFBbGwgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjbGFpbUlsU3RyYWlnaHRUaHJvdWdoJykpO1xyXG4gIGNvbnN0IGNsYWltRGF0YUNsYWltID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdjbGFpbUNvbmRpdGlvbicpKTtcclxuICAvLyBjaGVja2luZyBpZiBpdCdzIGEgY29uZGl0aW9uIHRoYXQgaXMgYSBjYW5kaWRhdGUgZm9yIGEgY29tcHV0ZXIgYmFzZWQgZGVjaXNpb24gXHJcbiAgaWYgKGNsYWltRGF0YUNsYWltLmNhdGVnb3J5ID09PSAnY2JkJykge1xyXG5cclxuXHJcbiAgICAvLyBwb3B1bGF0ZSB0aGUgY2xhaW0gZHJvcGRvd24gbGlzdCB3aXRoIHRoZSBtYXRjaGVkIGRhdGEgZnJvbSB0aGUganNvblxyXG4gICAgdmFyICRkb2NUeXBlID0gJCgnLnB0LWRvYy10eXBlJyk7XHJcbiAgICAkZG9jVHlwZS5lbXB0eSgpO1xyXG4gICAgJGRvY1R5cGUuYXBwZW5kKCc8b3B0aW9uPi0tIFNlbGVjdCB0eXBlIC0tPC9vcHRpb24+Jyk7XHJcblxyXG4gICAgJC5lYWNoKGNsYWltRGF0YUFsbCwgZnVuY3Rpb24gKGluZGV4LCBjb25kaXRpb24pIHtcclxuXHJcbiAgICAgIGlmIChjbGFpbURhdGFDbGFpbS5sYWJlbCA9PT0gY29uZGl0aW9uLmxhYmVsKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2VsZW1lbnQgZm91bmQnKTtcclxuXHJcbiAgICAgICAgdmFyIHJlcXVpcmVkRG9jc0h0bWwgPSAnJztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRUeXBlUmVxdWlyZWQubGVuZ3RoID09PSAxKSB7XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy5kb2N1bWVudFR5cGVSZXF1aXJlZCk7XHJcblxyXG4gICAgICAgICAgcmVxdWlyZWREb2NzSHRtbCArPSB0aGlzLmRvY3VtZW50VHlwZVJlcXVpcmVkWzBdLm5hbWU7XHJcbiAgICAgICAgICAkZG9jVHlwZS5hcHBlbmQoJzxvcHRpb24gdmFsdWU9JyArIHRoaXMuZG9jdW1lbnRUeXBlUmVxdWlyZWRbMF0ubmFtZSArICc+JyArIHRoaXMuZG9jdW1lbnRUeXBlUmVxdWlyZWRbMF0ubmFtZSArICc8L29wdGlvbj4nKTtcclxuICAgICAgICAgICQoJy5wdC1pbC1jbGFpbS1yZXF1aXJlZC1tb25vLWRvYycpLnNob3coKTtcclxuICAgICAgICAgICQoJy5wdC1pbC1jbGFpbS1yZXF1aXJlZC1tdWx0aS1kb2MnKS5oaWRlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlcXVpcmVkRG9jc0h0bWwgKz0gJzx1bD4nO1xyXG4gICAgICAgICAgJC5lYWNoKHRoaXMuZG9jdW1lbnRUeXBlUmVxdWlyZWQsIGZ1bmN0aW9uIChpbmRleCwgZG9jc1JlcXVpcmVkKSB7XHJcbiAgICAgICAgICAgIHJlcXVpcmVkRG9jc0h0bWwgKz0gJzxsaT4nICsgZG9jc1JlcXVpcmVkLm5hbWUgKyAnPC9saT4nO1xyXG4gICAgICAgICAgICAkZG9jVHlwZS5hcHBlbmQoJzxvcHRpb24gdmFsdWU9XCInICsgZG9jc1JlcXVpcmVkLm5hbWUgKyAnXCI+JyArIGRvY3NSZXF1aXJlZC5uYW1lICsgJzwvb3B0aW9uPicpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXF1aXJlZERvY3NIdG1sICs9ICc8L3VsPic7XHJcbiAgICAgICAgICAkKCcucHQtaWwtY2xhaW0tcmVxdWlyZWQtbW9uby1kb2MnKS5oaWRlKCk7XHJcbiAgICAgICAgICAkKCcucHQtaWwtY2xhaW0tcmVxdWlyZWQtbXVsdGktZG9jJykuc2hvdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJyZXF1aXJlZERvY3NIdG1sXCIpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcXVpcmVkRG9jc0h0bWwpO1xyXG4gICAgICAgICQoJy5wdC1pbC1jbGFpbS1yZXF1aXJlZC1kb2NzLWxpc3QnKS5odG1sKHJlcXVpcmVkRG9jc0h0bWwpO1xyXG4gICAgICAgIGlmIChyZXF1aXJlZERvY3NIdG1sICE9ICcnKSB7XHJcblxyXG4gICAgICAgICAgJCgnLnB0LXJlcXVpcmVkLWRvY3MnKS5zaG93KCk7XHJcbiAgICAgICAgICAkKCcucHQtbm8tcmVxdWlyZWQtZG9jcycpLmhpZGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gYWxlcnQoJ3Nob3cgYmxhbmsnKTtcclxuICAgICAgICAgIC8vICQoJy5wdC1pbC1jbGFpbS1yZXF1aXJlZC1kb2NzLWxpc3QnKS5odG1sKHJlcXVpcmVkRG9jc0h0bWwpO1xyXG4gICAgICAgICAgLy8gJCgnLnB0LW5vLXJlcXVpcmVkLWRvY3MnKS5zaG93KCk7XHJcbiAgICAgICAgICAvLyAkKCcucHQtcmVxdWlyZWQtZG9jcycpLmhpZGUoKTtcclxuICAgICAgICAgIC8vICQoJy5wdC1pbC1jbGFpbS1yZXF1aXJlZC1tb25vLWRvYycpLmhpZGUoKTtcclxuICAgICAgICAgIC8vICQoJy5wdC1pbC1jbGFpbS1yZXF1aXJlZC1tdWx0aS1kb2MnKS5oaWRlKCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIHZhciBjbG9uZWREaXYgPSAkKCcjdHJEYXRhMScpLmNsb25lKHRydWUpO1xyXG5cclxuICAgICQoXCIjYWRkLWFub3RoZXItZG9jXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIHZhciByYW5kb20gPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICBjbG9uZWREaXYuYXR0cihcImlkXCIsIHJhbmRvbSk7XHJcbiAgICAgICQoJy5maWxlLXVwbG9hZC1kZWZhdWx0X19yb3ctLWFkZC1hbm90aGVyJykuYmVmb3JlKGNsb25lZERpdik7XHJcblxyXG4gICAgICBjbG9uZWREaXYgPSAkKCcjdHJEYXRhMScpLmNsb25lKHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgfSBlbHNlIHtcclxuICAgICQoJy5wdC1uby1yZXF1aXJlZC1kb2NzJykuc2hvdygpO1xyXG4gICAgJCgnLnB0LXJlcXVpcmVkLWRvY3MnKS5oaWRlKCk7XHJcbiAgfVxyXG59Il0sImZpbGUiOiJjbGFpbXMuanMifQ==
