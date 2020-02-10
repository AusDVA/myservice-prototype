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
  $('html, body').animate({
    scrollTop: $("#user-list").offset().top
  }, 1000);
}

/* Clicks on "add" on full card */

function addSummary(cardType) {
  hideAll();
  var myDiv = "#" + cardType + "-summary";
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

  $("#compensation-and-damages-card").hide();
  $("#compensation-and-damages-summary").hide();

  $("#add-options").hide();
  $("#add-anchor-link-start").hide();
  $("#add-anchor-link-return").hide();
  $("#footer-buttons-mask").hide();
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmNvbWUtYXNzZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIE9uIHBhZ2Ugc2Nyb2xsaW5nICovXG5cbmZ1bmN0aW9uIHNjcm9sbFRvQWRkKCkge1xuICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgc2Nyb2xsVG9wOiAkKFwiI2FkZC1vcHRpb25zXCIpLm9mZnNldCgpLnRvcFxuICB9LCAxMDAwKTtcbn1cblxuLyogQ2xpY2tzIG9uIFwiYWRkXCIgb24gdGlsZSAqL1xuXG5mdW5jdGlvbiBzaG93TmV3Q2FyZChjYXJkVHlwZSkge1xuICBjYXB0dXJlVXNlckxpc3QoKTtcbiAgaGlkZUFsbCgpO1xuICB2YXIgbXlEaXYgPSBcIiNcIiArIGNhcmRUeXBlICsgXCItY2FyZFwiO1xuICB2YXIgbXlGb3JtID0gbXlEaXYgKyBcIiAjbXlGb3JtXCI7XG4gIHZhciBteURlbGV0ZSA9IG15RGl2ICsgXCIgI2RlbGV0ZUJ1dHRvblwiO1xuICB2YXIgbXlBZGQgPSBteURpdiArIFwiICNhZGRCdXR0b25cIjtcbiAgJChteUFkZCkuaHRtbChcIkFkZFwiKTtcbiAgJChteURlbGV0ZSkuaGlkZSgpO1xuICAkKG15Rm9ybSkudHJpZ2dlcihcInJlc2V0XCIpO1xuICAkKG15RGl2KS5zaG93KCk7XG4gICQoXCIjZm9vdGVyLWJ1dHRvbnMtbWFza1wiKS5zaG93KCk7XG4gICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICBzY3JvbGxUb3A6ICQoXCIjdXNlci1saXN0XCIpLm9mZnNldCgpLnRvcFxuICB9LCAxMDAwKTtcbn1cblxuLyogQ2xpY2tzIG9uIFwiYWRkXCIgb24gZnVsbCBjYXJkICovXG5cbmZ1bmN0aW9uIGFkZFN1bW1hcnkoY2FyZFR5cGUpIHtcbiAgaGlkZUFsbCgpO1xuICB2YXIgbXlEaXYgPSBcIiNcIiArIGNhcmRUeXBlICsgXCItc3VtbWFyeVwiO1xuICB1c2VyRW50cmllcy5wdXNoKCQobXlEaXYpKTtcbiAgZGlzcGxheVVzZXJMaXN0KCk7XG4gICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICBzY3JvbGxUb3A6ICQoXCIjdXNlci1saXN0XCIpLm9mZnNldCgpLnRvcFxuICB9LCAxMDAwKTtcbn07XG5cbi8qIENsaWNrcyBvbiBcImVkaXRcIiBvbiBTdW1tYXJ5IENhcmQgKi9cblxuZnVuY3Rpb24gZWRpdENhcmQoY2FyZFR5cGUpIHtcbiAgY2FwdHVyZVVzZXJMaXN0KCk7XG4gIGhpZGVBbGwoKTtcbiAgdmFyIG15RGl2ID0gXCIjXCIgKyBjYXJkVHlwZSArIFwiLWNhcmRcIjtcbiAgdmFyIG15RGVsZXRlID0gbXlEaXYgKyBcIiAjZGVsZXRlQnV0dG9uXCI7XG4gIHZhciBteUFkZCA9IG15RGl2ICsgXCIgI2FkZEJ1dHRvblwiO1xuICAkKG15QWRkKS5odG1sKFwiVXBkYXRlXCIpO1xuICAkKG15RGVsZXRlKS5zaG93KCk7XG4gICQobXlEaXYpLnNob3coKTtcbn1cblxuLyogQ2xpY2tzIG9uIFwiZGVsZXRlXCIgb24gZnVsbCBjYXJkICovXG5cbmZ1bmN0aW9uIHJlbW92ZVN1bW1hcnkoY2FyZFR5cGUpIHtcbiAgaGlkZUFsbCgpO1xuICB2YXIgbXlEaXYgPSBcIiNcIiArIGNhcmRUeXBlICsgXCItc3VtbWFyeVwiO1xuICB1c2VyRW50cmllcy5zcGxpY2UoJC5pbkFycmF5KG15RGl2LCB1c2VyRW50cmllcyksIDEpO1xuICBkaXNwbGF5VXNlckxpc3QoKTtcbiAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgIHNjcm9sbFRvcDogJChcIiN1c2VyLWxpc3RcIikub2Zmc2V0KCkudG9wXG4gIH0sIDEwMDApO1xufTtcblxuLyogQ2xpY2tzIG9uIFwiY2FuY2VsXCIgb24gZnVsbCBjYXJkICovXG5cbmZ1bmN0aW9uIGNhbmNlbENhcmQoY2FyZFR5cGUpIHtcbiAgaGlkZUFsbCgpO1xuICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgc2Nyb2xsVG9wOiAkKFwiI3VzZXItbGlzdFwiKS5vZmZzZXQoKS50b3BcbiAgfSwgMTAwMCk7XG4gIGRpc3BsYXlVc2VyTGlzdCgpO1xufVxuXG4vKiBVcGRhdGUgbGlzdCBhZnRlciBpbnRlcmFjdGlvbiAqL1xuXG52YXIgdXNlckVudHJpZXMgPSBbXTtcblxuZnVuY3Rpb24gY2FwdHVyZVVzZXJMaXN0KCkge1xuICB1c2VyRW50cmllcyA9ICQoXCJbaWQqPXN1bW1hcnldOnZpc2libGVcIik7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlVc2VyTGlzdCgpIHtcbiAgJC5lYWNoKHVzZXJFbnRyaWVzLCBmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7XG4gICAgJCh2YWx1ZSkuc2hvdygpO1xuICB9KTtcbiAgaWYgKHVzZXJFbnRyaWVzLmxlbmd0aCA+IDApIHtcbiAgICAkKFwiI2FkZC1hbmNob3ItbGluay1zdGFydFwiKS5oaWRlKCk7XG4gICAgJChcIiNhZGQtYW5jaG9yLWxpbmstcmV0dXJuXCIpLnNob3coKTtcbiAgfSBlbHNlIHtcbiAgICAkKFwiI2FkZC1hbmNob3ItbGluay1zdGFydFwiKS5zaG93KCk7XG4gICAgJChcIiNhZGQtYW5jaG9yLWxpbmstcmV0dXJuXCIpLmhpZGUoKTtcbiAgfVxuICAkKFwiI2FkZC1vcHRpb25zXCIpLnNob3coKTtcbn1cblxuLyogR2VuZXJpYyBoaWRlIGFsbCAqL1xuXG5mdW5jdGlvbiBoaWRlQWxsKCkge1xuXG4gICQoXCIuaGlkZS1vbi1sb2FkXCIpLmhpZGUoKTtcblxuICAkKFwiI2JhbmstYWNjb3VudHMtY2FyZFwiKS5oaWRlKCk7XG4gICQoXCIjYmFuay1hY2NvdW50cy1zdW1tYXJ5XCIpLmhpZGUoKTtcbiAgJChcIiNjaHVyY2gtYWNjb3VudC1yZWZcIikuaGlkZSgpO1xuXG4gICQoXCIjY2FzaC1oZWxkLWNhcmRcIikuaGlkZSgpO1xuICAkKFwiI2Nhc2gtaGVsZC1zdW1tYXJ5XCIpLmhpZGUoKTtcblxuICAkKFwiI3N1cGVyYW5udWF0aW9uLWNhcmRcIikuaGlkZSgpO1xuICAkKFwiI3N1cGVyYW5udWF0aW9uLXN1bW1hcnlcIikuaGlkZSgpO1xuXG4gICQoXCIjc2hhcmVzLWNhcmRcIikuaGlkZSgpO1xuICAkKFwiI3NoYXJlcy1zdW1tYXJ5XCIpLmhpZGUoKTtcblxuICAkKFwiI21hbmFnZWQtaW52ZXN0bWVudHMtY2FyZFwiKS5oaWRlKCk7XG4gICQoXCIjbWFuYWdlZC1pbnZlc3RtZW50cy1zdW1tYXJ5XCIpLmhpZGUoKTtcblxuICAkKFwiI290aGVyLWludmVzdG1lbnRzLWNhcmRcIikuaGlkZSgpO1xuICAkKFwiI290aGVyLWludmVzdG1lbnRzLXN1bW1hcnlcIikuaGlkZSgpO1xuXG4gICQoXCIjbW9uZXktbG9hbmVkLWNhcmRcIikuaGlkZSgpO1xuICAkKFwiI21vbmV5LWxvYW5lZC1zdW1tYXJ5XCIpLmhpZGUoKTtcblxuICAkKFwiI2JvbmRzLWFuZC1kZWJlbnR1cmVzLWNhcmRcIikuaGlkZSgpO1xuICAkKFwiI2JvbmRzLWFuZC1kZWJlbnR1cmVzLXN1bW1hcnlcIikuaGlkZSgpO1xuXG4gICQoXCIjb3RoZXItcGF5bWVudHMtY2FyZFwiKS5oaWRlKCk7XG4gICQoXCIjb3RoZXItcGF5bWVudHMtc3VtbWFyeVwiKS5oaWRlKCk7XG5cbiAgJChcIiNlbXBsb3ltZW50LWluY29tZS1jYXJkXCIpLmhpZGUoKTtcbiAgJChcIiNlbXBsb3ltZW50LWluY29tZS1zdW1tYXJ5XCIpLmhpZGUoKTtcblxuICAkKFwiI3Bhc3QtZW1wbG95bWVudC1jYXJkXCIpLmhpZGUoKTtcbiAgJChcIiNwYXN0LWVtcGxveW1lbnQtc3VtbWFyeVwiKS5oaWRlKCk7XG5cbiAgJChcIiNzdXBlci1wZW5zaW9uLWNhcmRcIikuaGlkZSgpO1xuICAkKFwiI3N1cGVyLXBlbnNpb24tc3VtbWFyeVwiKS5oaWRlKCk7XG5cbiAgJChcIiNmb3JlaWduLXBlbnNpb24tY2FyZFwiKS5oaWRlKCk7XG4gICQoXCIjZm9yZWlnbi1wZW5zaW9uLXN1bW1hcnlcIikuaGlkZSgpO1xuXG4gICQoXCIjYm9hcmRlcnMtYW5kLWxvZGdlcnMtY2FyZFwiKS5oaWRlKCk7XG4gICQoXCIjYm9hcmRlcnMtYW5kLWxvZGdlcnMtc3VtbWFyeVwiKS5oaWRlKCk7XG5cbiAgJChcIiNwdXJjaGFzZWQtaW5jb21lLXN0cmVhbXMtY2FyZFwiKS5oaWRlKCk7XG4gICQoXCIjcHVyY2hhc2VkLWluY29tZS1zdHJlYW1zLXN1bW1hcnlcIikuaGlkZSgpO1xuXG4gICQoXCIjZm9yZWlnbi1pbmNvbWUtYW5kLWFzc2V0cy1jYXJkXCIpLmhpZGUoKTtcbiAgJChcIiNmb3JlaWduLWluY29tZS1hbmQtYXNzZXRzLXN1bW1hcnlcIikuaGlkZSgpO1xuXG4gICQoXCIjcmVhbC1lc3RhdGUtY2FyZFwiKS5oaWRlKCk7XG4gICQoXCIjcmVhbC1lc3RhdGUtc3VtbWFyeVwiKS5oaWRlKCk7XG5cbiAgJChcIiNmYXJtLWNhcmRcIikuaGlkZSgpO1xuICAkKFwiI2Zhcm0tc3VtbWFyeVwiKS5oaWRlKCk7XG5cbiAgJChcIiNzZWxmLW1hbmFnZWQtc3VwZXItY2FyZFwiKS5oaWRlKCk7XG4gICQoXCIjc2VsZi1tYW5hZ2VkLXN1cGVyLXN1bW1hcnlcIikuaGlkZSgpO1xuXG4gICQoXCIjYnVzaW5lc3Nlcy1jYXJkXCIpLmhpZGUoKTtcbiAgJChcIiNidXNpbmVzc2VzLXN1bW1hcnlcIikuaGlkZSgpO1xuXG4gICQoXCIjaG9tZS1jb250ZW50cy1jYXJkXCIpLmhpZGUoKTtcbiAgJChcIiNob21lLWNvbnRlbnRzLXN1bW1hcnlcIikuaGlkZSgpO1xuXG4gICQoXCIjdmVoaWNsZXMtY2FyZFwiKS5oaWRlKCk7XG4gICQoXCIjdmVoaWNsZXMtc3VtbWFyeVwiKS5oaWRlKCk7XG5cbiAgJChcIiNvdGhlci1wZXJzb25hbC1hc3NldHMtY2FyZFwiKS5oaWRlKCk7XG4gICQoXCIjb3RoZXItcGVyc29uYWwtYXNzZXRzLXN1bW1hcnlcIikuaGlkZSgpO1xuXG4gICQoXCIjbGlmZS1pbnN1cmFuY2UtY2FyZFwiKS5oaWRlKCk7XG4gICQoXCIjbGlmZS1pbnN1cmFuY2Utc3VtbWFyeVwiKS5oaWRlKCk7XG5cbiAgJChcIiNnaWZ0cy1jYXJkXCIpLmhpZGUoKTtcbiAgJChcIiNnaWZ0cy1zdW1tYXJ5XCIpLmhpZGUoKTtcblxuICAkKFwiI21haW50ZW5hbmNlLXBhaWQtdG8tZm9ybWVyLXBhcnRuZXItY2FyZFwiKS5oaWRlKCk7XG4gICQoXCIjbWFpbnRlbmFuY2UtcGFpZC10by1mb3JtZXItcGFydG5lci1zdW1tYXJ5XCIpLmhpZGUoKTtcblxuICAkKFwiI2FkZHRpb25hbC1vdGhlci1wZXJzb25hbC1hc3NldHMtY2FyZFwiKS5oaWRlKCk7XG4gICQoXCIjYWRkdGlvbmFsLW90aGVyLXBlcnNvbmFsLWFzc2V0cy1zdW1tYXJ5XCIpLmhpZGUoKTtcblxuICAkKFwiI2NvbXBlbnNhdGlvbi1hbmQtZGFtYWdlcy1jYXJkXCIpLmhpZGUoKTtcbiAgJChcIiNjb21wZW5zYXRpb24tYW5kLWRhbWFnZXMtc3VtbWFyeVwiKS5oaWRlKCk7XG5cbiAgJChcIiNhZGQtb3B0aW9uc1wiKS5oaWRlKCk7XG4gICQoXCIjYWRkLWFuY2hvci1saW5rLXN0YXJ0XCIpLmhpZGUoKTtcbiAgJChcIiNhZGQtYW5jaG9yLWxpbmstcmV0dXJuXCIpLmhpZGUoKTtcbiAgJChcIiNmb290ZXItYnV0dG9ucy1tYXNrXCIpLmhpZGUoKTtcbn0iXSwiZmlsZSI6ImluY29tZS1hc3NldHMuanMifQ==
