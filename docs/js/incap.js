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
  var myDiv = "#" + cardType + "-card";
  var myForm = myDiv + " #myForm";
  var myDelete = myDiv + " #deleteButton";
  var myAdd = myDiv + " #addButton";
  $(myAdd).html("Add");
  $(myDelete).hide();
  $(myForm).trigger("reset");
  $(myDiv).show();
  $("#footer-buttons-mask").show();
  // $('html, body').animate({
  //   scrollTop: $("#user-list").offset().top
  // }, 1000);
}

/* Clicks on "add" on full card */

function addSummary(cardType) {
  hideAll();
  var myDiv = "#" + cardType + "-summary";
  console.log(myDiv);
  userEntries.push($(myDiv));
  displayUserList();
  // $('html, body').animate({
  //   scrollTop: $("#user-list").offset().top
  // }, 1000);
};

/* Clicks on "edit" on Summary Card */

function editCard(cardType) {
  captureUserList();
  hideAll();
  var myDiv = "#" + cardType + "-card";
  var myDelete = myDiv + " #deleteButton";
  var myAdd = myDiv + " #addButton";
  $(myAdd).html("Update");
  $(myDelete).show();
  $(myDiv).show();
}

/* Clicks on "delete" on full card */

function removeSummary(cardType) {
  hideAll();
  var myDiv = "#" + cardType + "-summary";
  userEntries.splice($.inArray(myDiv, userEntries), 1);
  displayUserList();
  // $('html, body').animate({
  //   scrollTop: $("#user-list").offset().top
  // }, 1000);
};

/* Clicks on "cancel" on full card */

function cancelCard(cardType) {
  hideAll();
  // $('html, body').animate({
  //   scrollTop: $("#user-list").offset().top
  // }, 1000);
  displayUserList();
}

/* Update list after interaction */

var userEntries = [];

function captureUserList() {
  userEntries = $("[id*=summary]:visible");
}

function displayUserList() {
  console.log(userEntries);
  $.each(userEntries, function (index, value) {
    $(value).show();
  });
  if (userEntries.length > 0) {
    // $("#add-anchor-link-start").hide();
    // $("#add-anchor-link-return").show();
  } else {}
    // $("#add-anchor-link-start").show();
    // $("#add-anchor-link-return").hide();

    // $("#add-options").show();
  $(".hide-on-load").show();
}

/* Generic hide all */

function hideAll() {

  $(".hide-on-load").hide();
  $("#alert-no-service").hide();
  // $(".hide-on-load").hide();

  $("#employment-card").hide();
  $("#employment-summary").hide();

  // $("#add-options").hide();
  // $("#add-anchor-link-start").hide();
  // $("#add-anchor-link-return").hide();
  // $("#footer-buttons-mask").hide();
}