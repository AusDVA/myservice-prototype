"use strict";

/* On page scrolling */

function scrollToAdd() {
  $('html, body').animate({
    scrollTop: $("#add-options").offset().top
  }, 1000);
}

/* Clicks on "add" on tile */

function showNewCard(cardType) {
  captureUserList();
  hideAll();
  myDiv = "#" + cardType + "-card";
  myForm = myDiv + " #myForm";
  myDelete = myDiv + " #deleteButton";
  myAdd = myDiv + " #addButton";
  $(myAdd).html("Add");
  $(myDelete).hide();
  $(myForm).trigger("reset");
  $(myDiv).show();
  $("#footer-buttons-mask").show();
  $('html, body').animate({
    scrollTop: $("#user-list").offset().top
  }, 1000);
}

/* Clicks on "add" on full card */

function addSummary(cardType) {
  hideAll();
  myDiv = "#" + cardType + "-summary";
  userEntries.push($(myDiv));
  displayUserList();
  $('html, body').animate({
    scrollTop: $("#user-list").offset().top
  }, 1000);
};

/* Clicks on "edit" on Summary Card */

function editCard(cardType) {
  captureUserList();
  hideAll();
  myDiv = "#" + cardType + "-card";
  myDelete = myDiv + " #deleteButton";
  myAdd = myDiv + " #addButton";
  $(myAdd).html("Update");
  $(myDelete).show();
  $(myDiv).show();
}

/* Clicks on "delete" on full card */

function removeSummary(cardType) {
  hideAll();
  myDiv = "#" + cardType + "-summary";
  userEntries.splice($.inArray(myDiv, userEntries), 1);
  displayUserList();
  $('html, body').animate({
    scrollTop: $("#user-list").offset().top
  }, 1000);
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
  $("#add-options").show();
}

/* Generic hide all */

function hideAll() {

  $(".hide-on-load").hide();

  $("#bank-accounts-card").hide();
  $("#bank-accounts-summary").hide();
  $("#church-account-ref").hide();

  $("#cash-held-card").hide();
  $("#cash-held-summary").hide();

  $("#superannuation-card").hide();
  $("#superannuation-summary").hide();

  $("#shares-card").hide();
  $("#shares-summary").hide();

  $("#managed-investments-card").hide();
  $("#managed-investments-summary").hide();

  $("#other-investments-card").hide();
  $("#other-investments-summary").hide();

  $("#money-loaned-card").hide();
  $("#money-loaned-summary").hide();

  $("#bonds-and-debentures-card").hide();
  $("#bonds-and-debentures-summary").hide();

  $("#other-payments-card").hide();
  $("#other-payments-summary").hide();

  $("#employment-income-card").hide();
  $("#employment-income-summary").hide();

  $("#past-employment-card").hide();
  $("#past-employment-summary").hide();

  $("#super-pension-card").hide();
  $("#super-pension-summary").hide();

  $("#foreign-pension-card").hide();
  $("#foreign-pension-summary").hide();

  $("#boarders-and-lodgers-card").hide();
  $("#boarders-and-lodgers-summary").hide();

  $("#purchased-income-streams-card").hide();
  $("#purchased-income-streams-summary").hide();

  $("#foreign-income-and-assets-card").hide();
  $("#foreign-income-and-assets-summary").hide();

  $("#real-estate-card").hide();
  $("#real-estate-summary").hide();

  $("#farm-card").hide();
  $("#farm-summary").hide();

  $("#self-managed-super-card").hide();
  $("#self-managed-super-summary").hide();

  $("#businesses-card").hide();
  $("#businesses-summary").hide();

  $("#home-contents-card").hide();
  $("#home-contents-summary").hide();

  $("#vehicles-card").hide();
  $("#vehicles-summary").hide();

  $("#other-personal-assets-card").hide();
  $("#other-personal-assets-summary").hide();

  $("#life-insurance-card").hide();
  $("#life-insurance-summary").hide();

  $("#gifts-card").hide();
  $("#gifts-summary").hide();

  $("#maintenance-paid-to-former-partner-card").hide();
  $("#maintenance-paid-to-former-partner-summary").hide();

  $("#addtional-other-personal-assets-card").hide();
  $("#addtional-other-personal-assets-summary").hide();

  $("#add-options").hide();
  $("#add-anchor-link-start").hide();
  $("#add-anchor-link-return").hide();
  $("#footer-buttons-mask").hide();
}