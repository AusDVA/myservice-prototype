'use strict';

// Pull in the json content 
$.ajax({
  url: '/docs/data/claim-il-conditions.json',
  async: false,
  dataType: 'json'
}).done(function (data) {

  console.log('Claim data back');

  localStorage.setItem('claimIlStraightThrough', JSON.stringify(data));

  // populate the user dropdown list with users from the json
  // var $userSelect = $('#user-drop-down');
  // $userSelect.empty();
  // $userSelect.append('<option>-- Select a user --</option>');
  // $.each(data.person, function (key, value) {
  //   $userSelect.append('<option value=' + value._id + '>' + value.nameFull + '</option>');
  // });

  claimToCondition();
});

// put the user from user.js in to local storage and the users clients in to session storage 
function claimToCondition() {

  console.log('Claim lookup ');

  var claimData = JSON.parse(localStorage.getItem('claimIlStraightThrough'));

  $.each(claimData, function (index, condition) {

    // console.log(condition);
    // console.log('condition = ' + condition.label);

    $.each(condition.documentTypeRequired, function (index, documentTypeRequired) {

      // console.log('- - - required doc = ' + documentTypeRequired.name);

    });
  });
  // $('.pt-current-user-number-of-claims').html(user.numberOfClaims);


  var availableTags = [];

  $("#tags").autocomplete({
    // source: availableTags,
    source: claimData,
    select: function select(event, ui) {

      console.log('selected = ');

      // checking if it's a condition that is a candidate for a computer based decision 
      if (ui.item.category === 'cbd') {

        console.log(ui.item.label);

        $.each(claimData, function (index, condition) {

          // console.log('ui.item.category');
          // console.log(ui.item.category);
          // console.log('condition.label');
          // console.log(condition.label);

          if (ui.item.label === condition.label) {
            console.log('element found');

            console.log(this);
            var requiredDocsHtml = '';
            $.each(this.documentTypeRequired, function (index, docsRequired) {
              console.log('docsRequired');
              console.log(docsRequired);

              // if (docsRequired.name !== "any") {
              requiredDocsHtml += '<li>' + docsRequired.name + '</li>';
              // }
            });

            if (requiredDocsHtml != '') {
              $('.pt-il-claim-required-docs').html('<ul>' + requiredDocsHtml) + '</ul>';
              $('.pt-required-docs').show();
              $('.pt-no-required-docs').hide();
            } else {
              $('.pt-no-required-docs').show();
              $('.pt-required-docs').hide();
            }
          }
        });
      }
    }
  });
}