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

  const claimData = JSON.parse(localStorage.getItem('claimIlStraightThrough'));


  $.each(claimData, function (index, condition) {

    // console.log(condition);
    // console.log('condition = ' + condition.label);

    $.each(condition.documentTypeRequired, function (index, documentTypeRequired) {


      // console.log('- - - required doc = ' + documentTypeRequired.name);

    });

  });
  // $('.pt-current-user-number-of-claims').html(user.numberOfClaims);



  $("#tags").autocomplete({
    // source: availableTags,
    source: claimData,
    select: function (event, ui) {

      console.log('selected = ');
      // checking if it's a condition that is a candidate for a computer based decision 
      if (ui.item.category === 'cbd') {

        $.each(claimData, function (index, condition) {

          console.log('ui.item.category');
          console.log(ui.item.category);
          console.log('condition.label');
          console.log(condition.label);

          if (ui.item.label === condition.label) {
            console.log('element found');

            console.log(this.documentTypeRequired.length);
            var requiredDocsHtml = '';

            if (this.documentTypeRequired.length === 1) {

              console.log(this.documentTypeRequired);

              requiredDocsHtml += this.documentTypeRequired[0].name;
              $('.pt-il-claim-required-mono-doc').show();
              $('.pt-il-claim-required-multi-doc').hide();
            } else {
              requiredDocsHtml += '<ul>';
              $.each(this.documentTypeRequired, function (index, docsRequired) {
                requiredDocsHtml += '<li>' + docsRequired.name + '</li>';
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

      } else {
        $('.pt-no-required-docs').show();
        $('.pt-required-docs').hide();
      }

    }
  });

}