// Pull in the json content 
$.ajax({
  url: '/docs/data/claim-il-conditions.json',
  async: false,
  dataType: 'json'
}).done(function (data) {

  localStorage.setItem('claimIlStraightThrough', JSON.stringify(data));

  setClaimCondition();
});


// put the user from user.js in to local storage and the users clients in to session storage 
function setClaimCondition() {


  const claimDataAll = JSON.parse(localStorage.getItem('claimIlStraightThrough'));


  $("#tags").autocomplete({
    // source: availableTags,
    source: claimDataAll,
    select: function (event, ui) {


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

        var requiredDocsHtml = '';

        if (this.documentTypeRequired.length === 1) {


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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjbGFpbXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gUHVsbCBpbiB0aGUganNvbiBjb250ZW50IFxuJC5hamF4KHtcbiAgdXJsOiAnL2RvY3MvZGF0YS9jbGFpbS1pbC1jb25kaXRpb25zLmpzb24nLFxuICBhc3luYzogZmFsc2UsXG4gIGRhdGFUeXBlOiAnanNvbidcbn0pLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcblxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2xhaW1JbFN0cmFpZ2h0VGhyb3VnaCcsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblxuICBzZXRDbGFpbUNvbmRpdGlvbigpO1xufSk7XG5cblxuLy8gcHV0IHRoZSB1c2VyIGZyb20gdXNlci5qcyBpbiB0byBsb2NhbCBzdG9yYWdlIGFuZCB0aGUgdXNlcnMgY2xpZW50cyBpbiB0byBzZXNzaW9uIHN0b3JhZ2UgXG5mdW5jdGlvbiBzZXRDbGFpbUNvbmRpdGlvbigpIHtcblxuXG4gIGNvbnN0IGNsYWltRGF0YUFsbCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NsYWltSWxTdHJhaWdodFRocm91Z2gnKSk7XG5cblxuICAkKFwiI3RhZ3NcIikuYXV0b2NvbXBsZXRlKHtcbiAgICAvLyBzb3VyY2U6IGF2YWlsYWJsZVRhZ3MsXG4gICAgc291cmNlOiBjbGFpbURhdGFBbGwsXG4gICAgc2VsZWN0OiBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XG5cblxuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnY2xhaW1Db25kaXRpb24nLCBKU09OLnN0cmluZ2lmeSh1aS5pdGVtKSk7XG5cblxuICAgICAgLy8gJCgnLnB0LXR5cGUtYWhlYWQtdHlwZScpLmhpZGUoKTtcblxuXG4gICAgfVxuXG4gIH0pO1xuXG59XG5cbmZ1bmN0aW9uIGdldENsYWltQ29uZGl0aW9uKCkge1xuXG4gIGNvbnN0IGNsYWltRGF0YUFsbCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NsYWltSWxTdHJhaWdodFRocm91Z2gnKSk7XG4gIGNvbnN0IGNsYWltRGF0YUNsYWltID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdjbGFpbUNvbmRpdGlvbicpKTtcbiAgLy8gY2hlY2tpbmcgaWYgaXQncyBhIGNvbmRpdGlvbiB0aGF0IGlzIGEgY2FuZGlkYXRlIGZvciBhIGNvbXB1dGVyIGJhc2VkIGRlY2lzaW9uIFxuICBpZiAoY2xhaW1EYXRhQ2xhaW0uY2F0ZWdvcnkgPT09ICdjYmQnKSB7XG5cblxuICAgIC8vIHBvcHVsYXRlIHRoZSBjbGFpbSBkcm9wZG93biBsaXN0IHdpdGggdGhlIG1hdGNoZWQgZGF0YSBmcm9tIHRoZSBqc29uXG4gICAgdmFyICRkb2NUeXBlID0gJCgnLnB0LWRvYy10eXBlJyk7XG4gICAgJGRvY1R5cGUuZW1wdHkoKTtcbiAgICAkZG9jVHlwZS5hcHBlbmQoJzxvcHRpb24+LS0gU2VsZWN0IHR5cGUgLS08L29wdGlvbj4nKTtcblxuICAgICQuZWFjaChjbGFpbURhdGFBbGwsIGZ1bmN0aW9uIChpbmRleCwgY29uZGl0aW9uKSB7XG5cbiAgICAgIGlmIChjbGFpbURhdGFDbGFpbS5sYWJlbCA9PT0gY29uZGl0aW9uLmxhYmVsKSB7XG5cbiAgICAgICAgdmFyIHJlcXVpcmVkRG9jc0h0bWwgPSAnJztcblxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudFR5cGVSZXF1aXJlZC5sZW5ndGggPT09IDEpIHtcblxuXG4gICAgICAgICAgcmVxdWlyZWREb2NzSHRtbCArPSB0aGlzLmRvY3VtZW50VHlwZVJlcXVpcmVkWzBdLm5hbWU7XG4gICAgICAgICAgJGRvY1R5cGUuYXBwZW5kKCc8b3B0aW9uIHZhbHVlPScgKyB0aGlzLmRvY3VtZW50VHlwZVJlcXVpcmVkWzBdLm5hbWUgKyAnPicgKyB0aGlzLmRvY3VtZW50VHlwZVJlcXVpcmVkWzBdLm5hbWUgKyAnPC9vcHRpb24+Jyk7XG4gICAgICAgICAgJCgnLnB0LWlsLWNsYWltLXJlcXVpcmVkLW1vbm8tZG9jJykuc2hvdygpO1xuICAgICAgICAgICQoJy5wdC1pbC1jbGFpbS1yZXF1aXJlZC1tdWx0aS1kb2MnKS5oaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVxdWlyZWREb2NzSHRtbCArPSAnPHVsPic7XG4gICAgICAgICAgJC5lYWNoKHRoaXMuZG9jdW1lbnRUeXBlUmVxdWlyZWQsIGZ1bmN0aW9uIChpbmRleCwgZG9jc1JlcXVpcmVkKSB7XG4gICAgICAgICAgICByZXF1aXJlZERvY3NIdG1sICs9ICc8bGk+JyArIGRvY3NSZXF1aXJlZC5uYW1lICsgJzwvbGk+JztcbiAgICAgICAgICAgICRkb2NUeXBlLmFwcGVuZCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBkb2NzUmVxdWlyZWQubmFtZSArICdcIj4nICsgZG9jc1JlcXVpcmVkLm5hbWUgKyAnPC9vcHRpb24+Jyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmVxdWlyZWREb2NzSHRtbCArPSAnPC91bD4nO1xuICAgICAgICAgICQoJy5wdC1pbC1jbGFpbS1yZXF1aXJlZC1tb25vLWRvYycpLmhpZGUoKTtcbiAgICAgICAgICAkKCcucHQtaWwtY2xhaW0tcmVxdWlyZWQtbXVsdGktZG9jJykuc2hvdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJyZXF1aXJlZERvY3NIdG1sXCIpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXF1aXJlZERvY3NIdG1sKTtcbiAgICAgICAgJCgnLnB0LWlsLWNsYWltLXJlcXVpcmVkLWRvY3MtbGlzdCcpLmh0bWwocmVxdWlyZWREb2NzSHRtbCk7XG4gICAgICAgIGlmIChyZXF1aXJlZERvY3NIdG1sICE9ICcnKSB7XG5cbiAgICAgICAgICAkKCcucHQtcmVxdWlyZWQtZG9jcycpLnNob3coKTtcbiAgICAgICAgICAkKCcucHQtbm8tcmVxdWlyZWQtZG9jcycpLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBhbGVydCgnc2hvdyBibGFuaycpO1xuICAgICAgICAgIC8vICQoJy5wdC1pbC1jbGFpbS1yZXF1aXJlZC1kb2NzLWxpc3QnKS5odG1sKHJlcXVpcmVkRG9jc0h0bWwpO1xuICAgICAgICAgIC8vICQoJy5wdC1uby1yZXF1aXJlZC1kb2NzJykuc2hvdygpO1xuICAgICAgICAgIC8vICQoJy5wdC1yZXF1aXJlZC1kb2NzJykuaGlkZSgpO1xuICAgICAgICAgIC8vICQoJy5wdC1pbC1jbGFpbS1yZXF1aXJlZC1tb25vLWRvYycpLmhpZGUoKTtcbiAgICAgICAgICAvLyAkKCcucHQtaWwtY2xhaW0tcmVxdWlyZWQtbXVsdGktZG9jJykuaGlkZSgpO1xuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgdmFyIGNsb25lZERpdiA9ICQoJyN0ckRhdGExJykuY2xvbmUodHJ1ZSk7XG5cbiAgICAkKFwiI2FkZC1hbm90aGVyLWRvY1wiKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cbiAgICAgIHZhciByYW5kb20gPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgY2xvbmVkRGl2LmF0dHIoXCJpZFwiLCByYW5kb20pO1xuICAgICAgJCgnLmZpbGUtdXBsb2FkLWRlZmF1bHRfX3Jvdy0tYWRkLWFub3RoZXInKS5iZWZvcmUoY2xvbmVkRGl2KTtcblxuICAgICAgY2xvbmVkRGl2ID0gJCgnI3RyRGF0YTEnKS5jbG9uZSh0cnVlKTtcbiAgICB9KTtcblxuXG5cbiAgfSBlbHNlIHtcbiAgICAkKCcucHQtbm8tcmVxdWlyZWQtZG9jcycpLnNob3coKTtcbiAgICAkKCcucHQtcmVxdWlyZWQtZG9jcycpLmhpZGUoKTtcbiAgfVxufSJdLCJmaWxlIjoiY2xhaW1zLmpzIn0=
