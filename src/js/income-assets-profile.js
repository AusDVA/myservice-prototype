/* On page scrolling */

function scrollToAdd() {
  $('html, body').animate({
    scrollTop: $("#add-options").offset().top
  }, 500);
}

/* Clicks on "add" on tile */

function showNewCard(cardType) {
  captureUserList();
  hideAll();
  var myDiv = "#" + cardType + "-card";
  var myForm = myDiv + " #myForm";
  var myDelete = myDiv + " #deleteButton";
  var myAdd = myDiv + " #addButton";
  $(myAdd).html("Add");
  $(myDelete).hide();
  $(myForm).trigger("reset");
  $(myDiv).show();
  $('html, body').animate({
    scrollTop: $("#user-list").offset().top
  }, 1000);
}

/* Clicks on "add" on full card */

function addSummary(cardType) {
  hideAll();
  var myDiv = "#" + cardType + "-summary";
  console.log( myDiv )
  userEntries.push($(myDiv));
  displayUserList();
  $('html, body').animate({
    scrollTop: $("#user-list").offset().top
  }, 1000);
  $(".updated").css("display", "inline-block");
};

/* Clicks on "edit" on Summary Card */

function editCard(cardType) {
  captureUserList();
  hideAll();
  var myDiv = "#" + cardType + "-card";
  console.log( myDiv)
  var myDelete = myDiv + " #deleteButton";
  var myAdd = myDiv + " #addButton";
  $(myDelete).show();
  $(myDiv).show();
}

/* Clicks on "delete" on prepop card edit */

function removeItem(cardType) {

  // hideAll();
  $("#perm-close-1").prop('checked', false);
  var myDiv = "#" + cardType + "-card";
  $( myDiv ).find( ".delete-content").show();
  $( myDiv ).find( ".edit-content").hide();

};

/* Clicks on "cancel" on full card */

function cancelCard(cardType) {
  hideAll();
  $('html, body').animate({
    scrollTop: $("#user-list").offset().top
  }, 1000);
  displayUserList();
}

/* Update list after interaction */

var userEntries = [];

function captureUserList() {
  userEntries = $("[id*=summary]:visible");
}

function displayUserList() {
  $.each(userEntries, function (index, value) {
    $(value).show();
  });
  if (userEntries.length > 0) {
    $("#add-anchor-link-start").hide();
    $("#add-anchor-link-return").show();
  } else {
    $("#add-anchor-link-start").show();
    $("#add-anchor-link-return").hide();
  }
  // $("#add-options").show();
  $("#user-list").show();
  $("#main-pagination").show();

}

/* Generic hide all */

function hideAll() {

  $("#user-list").hide();
  $("#main-pagination").hide();

  $(".hide-on-load").hide();

  $("#bank-accounts-card").hide();
  $("#bank-accounts-summary").hide();
  $("#bank-accounts-summary-deleted").hide();

  $("#bank-accounts-new-card").hide();
  $("#bank-accounts-new-summary").hide();

  $("#shares-listed-update-card").hide();
  $("#shares-listed-update-summary").hide();

  $("#shares-unlisted-update-card").hide();
  $("#shares-unlisted-update-summary").hide();
  
  // $("#church-account-ref").hide();

  // $("#add-anchor-link-start").hide();
  // $("#add-anchor-link-return").hide();

}

$(Document).ready(function () {

  $(document).keypress(function (e) {
    switch (e.which) {
      case 49:
        hidePartner();
        break;
      case 50:
        showPartner();
        break;
      default:
    }
  });

  captureUserList();
  displayUserList();

  function showPartner() {
    $(".partner").show();
    $(".partner-label").text("Our");
  }

  function hidePartner() {
    $(".partner").hide();
    $(".partner-label").text("My");
  }

});