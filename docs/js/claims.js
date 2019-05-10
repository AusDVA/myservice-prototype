'use strict';

// Pull in the json content 
$.ajax({
  url: '/docs/data/claim-il-conditions.json',
  async: false,
  dataType: 'json'
}).done(function (data) {

  console.log('Claim data back');

  localStorage.setItem('claimIlStraightThrough', JSON.stringify(data));

  claimToCondition();
});

// put the user from user.js in to local storage and the users clients in to session storage 
function claimToCondition() {

  console.log('Claim lookup ');

  var claimData = JSON.parse(localStorage.getItem('claimIlStraightThrough'));

  $("#tags").autocomplete({
    // source: availableTags,
    source: claimData,
    select: function select(event, ui) {

      console.log('selected = ');

      $('.pt-type-ahead-type').hide();
      // checking if it's a condition that is a candidate for a computer based decision 
      if (ui.item.category === 'cbd') {

        // populate the claim dropdown list with the matched data from the json
        var $docType = $('.pt-doc-type');
        $docType.empty();
        $docType.append('<option>-- Select type --</option>');

        $.each(claimData, function (index, condition) {

          if (ui.item.label === condition.label) {
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
          $('.file-upload-row--add-another').before(clonedDiv);

          clonedDiv = $('#trData1').clone(true);
        });
      } else {
        $('.pt-no-required-docs').show();
        $('.pt-required-docs').hide();
      }
    }

  });
}