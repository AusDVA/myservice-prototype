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
  } else {
    // $("#add-anchor-link-start").show();
    // $("#add-anchor-link-return").hide();
  }
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmNhcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBPbiBwYWdlIHNjcm9sbGluZyAqL1xuXG5mdW5jdGlvbiBzY3JvbGxUb0FkZCgpIHtcbiAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgIHNjcm9sbFRvcDogJChcIiNhZGQtb3B0aW9uc1wiKS5vZmZzZXQoKS50b3BcbiAgfSwgMTAwMCk7XG59XG5cbi8qIENsaWNrcyBvbiBcImFkZFwiIG9uIHRpbGUgKi9cblxuZnVuY3Rpb24gc2hvd05ld0NhcmQoY2FyZFR5cGUpIHtcbiAgY2FwdHVyZVVzZXJMaXN0KCk7XG4gIGhpZGVBbGwoKTtcbiAgdmFyIG15RGl2ID0gXCIjXCIgKyBjYXJkVHlwZSArIFwiLWNhcmRcIjtcbiAgdmFyIG15Rm9ybSA9IG15RGl2ICsgXCIgI215Rm9ybVwiO1xuICB2YXIgbXlEZWxldGUgPSBteURpdiArIFwiICNkZWxldGVCdXR0b25cIjtcbiAgdmFyIG15QWRkID0gbXlEaXYgKyBcIiAjYWRkQnV0dG9uXCI7XG4gICQobXlBZGQpLmh0bWwoXCJBZGRcIik7XG4gICQobXlEZWxldGUpLmhpZGUoKTtcbiAgJChteUZvcm0pLnRyaWdnZXIoXCJyZXNldFwiKTtcbiAgJChteURpdikuc2hvdygpO1xuICAkKFwiI2Zvb3Rlci1idXR0b25zLW1hc2tcIikuc2hvdygpO1xuICAvLyAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gIC8vICAgc2Nyb2xsVG9wOiAkKFwiI3VzZXItbGlzdFwiKS5vZmZzZXQoKS50b3BcbiAgLy8gfSwgMTAwMCk7XG59XG5cbi8qIENsaWNrcyBvbiBcImFkZFwiIG9uIGZ1bGwgY2FyZCAqL1xuXG5mdW5jdGlvbiBhZGRTdW1tYXJ5KGNhcmRUeXBlKSB7XG4gIGhpZGVBbGwoKTtcbiAgdmFyIG15RGl2ID0gXCIjXCIgKyBjYXJkVHlwZSArIFwiLXN1bW1hcnlcIjtcbiAgY29uc29sZS5sb2cobXlEaXYpO1xuICB1c2VyRW50cmllcy5wdXNoKCQobXlEaXYpKTtcbiAgZGlzcGxheVVzZXJMaXN0KCk7XG4gIC8vICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgLy8gICBzY3JvbGxUb3A6ICQoXCIjdXNlci1saXN0XCIpLm9mZnNldCgpLnRvcFxuICAvLyB9LCAxMDAwKTtcbn07XG5cbi8qIENsaWNrcyBvbiBcImVkaXRcIiBvbiBTdW1tYXJ5IENhcmQgKi9cblxuZnVuY3Rpb24gZWRpdENhcmQoY2FyZFR5cGUpIHtcbiAgY2FwdHVyZVVzZXJMaXN0KCk7XG4gIGhpZGVBbGwoKTtcbiAgdmFyIG15RGl2ID0gXCIjXCIgKyBjYXJkVHlwZSArIFwiLWNhcmRcIjtcbiAgdmFyIG15RGVsZXRlID0gbXlEaXYgKyBcIiAjZGVsZXRlQnV0dG9uXCI7XG4gIHZhciBteUFkZCA9IG15RGl2ICsgXCIgI2FkZEJ1dHRvblwiO1xuICAkKG15QWRkKS5odG1sKFwiVXBkYXRlXCIpO1xuICAkKG15RGVsZXRlKS5zaG93KCk7XG4gICQobXlEaXYpLnNob3coKTtcbn1cblxuLyogQ2xpY2tzIG9uIFwiZGVsZXRlXCIgb24gZnVsbCBjYXJkICovXG5cbmZ1bmN0aW9uIHJlbW92ZVN1bW1hcnkoY2FyZFR5cGUpIHtcbiAgaGlkZUFsbCgpO1xuICB2YXIgbXlEaXYgPSBcIiNcIiArIGNhcmRUeXBlICsgXCItc3VtbWFyeVwiO1xuICB1c2VyRW50cmllcy5zcGxpY2UoJC5pbkFycmF5KG15RGl2LCB1c2VyRW50cmllcyksIDEpO1xuICBkaXNwbGF5VXNlckxpc3QoKTtcbiAgLy8gJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAvLyAgIHNjcm9sbFRvcDogJChcIiN1c2VyLWxpc3RcIikub2Zmc2V0KCkudG9wXG4gIC8vIH0sIDEwMDApO1xufTtcblxuLyogQ2xpY2tzIG9uIFwiY2FuY2VsXCIgb24gZnVsbCBjYXJkICovXG5cbmZ1bmN0aW9uIGNhbmNlbENhcmQoY2FyZFR5cGUpIHtcbiAgaGlkZUFsbCgpO1xuICAvLyAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gIC8vICAgc2Nyb2xsVG9wOiAkKFwiI3VzZXItbGlzdFwiKS5vZmZzZXQoKS50b3BcbiAgLy8gfSwgMTAwMCk7XG4gIGRpc3BsYXlVc2VyTGlzdCgpO1xufVxuXG4vKiBVcGRhdGUgbGlzdCBhZnRlciBpbnRlcmFjdGlvbiAqL1xuXG52YXIgdXNlckVudHJpZXMgPSBbXTtcblxuZnVuY3Rpb24gY2FwdHVyZVVzZXJMaXN0KCkge1xuICB1c2VyRW50cmllcyA9ICQoXCJbaWQqPXN1bW1hcnldOnZpc2libGVcIik7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlVc2VyTGlzdCgpIHtcbiAgY29uc29sZS5sb2codXNlckVudHJpZXMpO1xuICAkLmVhY2godXNlckVudHJpZXMsIGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHtcbiAgICAkKHZhbHVlKS5zaG93KCk7XG4gIH0pO1xuICBpZiAodXNlckVudHJpZXMubGVuZ3RoID4gMCkge1xuICAgIC8vICQoXCIjYWRkLWFuY2hvci1saW5rLXN0YXJ0XCIpLmhpZGUoKTtcbiAgICAvLyAkKFwiI2FkZC1hbmNob3ItbGluay1yZXR1cm5cIikuc2hvdygpO1xuICB9IGVsc2Uge1xuICAgIC8vICQoXCIjYWRkLWFuY2hvci1saW5rLXN0YXJ0XCIpLnNob3coKTtcbiAgICAvLyAkKFwiI2FkZC1hbmNob3ItbGluay1yZXR1cm5cIikuaGlkZSgpO1xuICB9XG4gIC8vICQoXCIjYWRkLW9wdGlvbnNcIikuc2hvdygpO1xuICAkKFwiLmhpZGUtb24tbG9hZFwiKS5zaG93KCk7XG59XG5cbi8qIEdlbmVyaWMgaGlkZSBhbGwgKi9cblxuZnVuY3Rpb24gaGlkZUFsbCgpIHtcblxuICAkKFwiLmhpZGUtb24tbG9hZFwiKS5oaWRlKCk7XG4gICQoXCIjYWxlcnQtbm8tc2VydmljZVwiKS5oaWRlKCk7XG4gIC8vICQoXCIuaGlkZS1vbi1sb2FkXCIpLmhpZGUoKTtcblxuICAkKFwiI2VtcGxveW1lbnQtY2FyZFwiKS5oaWRlKCk7XG4gICQoXCIjZW1wbG95bWVudC1zdW1tYXJ5XCIpLmhpZGUoKTtcblxuXG4gIC8vICQoXCIjYWRkLW9wdGlvbnNcIikuaGlkZSgpO1xuICAvLyAkKFwiI2FkZC1hbmNob3ItbGluay1zdGFydFwiKS5oaWRlKCk7XG4gIC8vICQoXCIjYWRkLWFuY2hvci1saW5rLXJldHVyblwiKS5oaWRlKCk7XG4gIC8vICQoXCIjZm9vdGVyLWJ1dHRvbnMtbWFza1wiKS5oaWRlKCk7XG59Il0sImZpbGUiOiJpbmNhcC5qcyJ9
