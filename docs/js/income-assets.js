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

  $("#add-options").hide();
  $("#add-anchor-link-start").hide();
  $("#add-anchor-link-return").hide();
  $("#footer-buttons-mask").hide();
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmNvbWUtYXNzZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIE9uIHBhZ2Ugc2Nyb2xsaW5nICovXHJcblxyXG5mdW5jdGlvbiBzY3JvbGxUb0FkZCgpIHtcclxuICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICBzY3JvbGxUb3A6ICQoXCIjYWRkLW9wdGlvbnNcIikub2Zmc2V0KCkudG9wXHJcbiAgfSwgMTAwMCk7XHJcbn1cclxuXHJcbi8qIENsaWNrcyBvbiBcImFkZFwiIG9uIHRpbGUgKi9cclxuXHJcbmZ1bmN0aW9uIHNob3dOZXdDYXJkKGNhcmRUeXBlKSB7XHJcbiAgY2FwdHVyZVVzZXJMaXN0KCk7XHJcbiAgaGlkZUFsbCgpO1xyXG4gIHZhciBteURpdiA9IFwiI1wiICsgY2FyZFR5cGUgKyBcIi1jYXJkXCI7XHJcbiAgdmFyIG15Rm9ybSA9IG15RGl2ICsgXCIgI215Rm9ybVwiO1xyXG4gIHZhciBteURlbGV0ZSA9IG15RGl2ICsgXCIgI2RlbGV0ZUJ1dHRvblwiO1xyXG4gIHZhciBteUFkZCA9IG15RGl2ICsgXCIgI2FkZEJ1dHRvblwiO1xyXG4gICQobXlBZGQpLmh0bWwoXCJBZGRcIik7XHJcbiAgJChteURlbGV0ZSkuaGlkZSgpO1xyXG4gICQobXlGb3JtKS50cmlnZ2VyKFwicmVzZXRcIik7XHJcbiAgJChteURpdikuc2hvdygpO1xyXG4gICQoXCIjZm9vdGVyLWJ1dHRvbnMtbWFza1wiKS5zaG93KCk7XHJcbiAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgc2Nyb2xsVG9wOiAkKFwiI3VzZXItbGlzdFwiKS5vZmZzZXQoKS50b3BcclxuICB9LCAxMDAwKTtcclxufVxyXG5cclxuLyogQ2xpY2tzIG9uIFwiYWRkXCIgb24gZnVsbCBjYXJkICovXHJcblxyXG5mdW5jdGlvbiBhZGRTdW1tYXJ5KGNhcmRUeXBlKSB7XHJcbiAgaGlkZUFsbCgpO1xyXG4gIHZhciBteURpdiA9IFwiI1wiICsgY2FyZFR5cGUgKyBcIi1zdW1tYXJ5XCI7XHJcbiAgdXNlckVudHJpZXMucHVzaCgkKG15RGl2KSk7XHJcbiAgZGlzcGxheVVzZXJMaXN0KCk7XHJcbiAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgc2Nyb2xsVG9wOiAkKFwiI3VzZXItbGlzdFwiKS5vZmZzZXQoKS50b3BcclxuICB9LCAxMDAwKTtcclxufTtcclxuXHJcbi8qIENsaWNrcyBvbiBcImVkaXRcIiBvbiBTdW1tYXJ5IENhcmQgKi9cclxuXHJcbmZ1bmN0aW9uIGVkaXRDYXJkKGNhcmRUeXBlKSB7XHJcbiAgY2FwdHVyZVVzZXJMaXN0KCk7XHJcbiAgaGlkZUFsbCgpO1xyXG4gIHZhciBteURpdiA9IFwiI1wiICsgY2FyZFR5cGUgKyBcIi1jYXJkXCI7XHJcbiAgdmFyIG15RGVsZXRlID0gbXlEaXYgKyBcIiAjZGVsZXRlQnV0dG9uXCI7XHJcbiAgdmFyIG15QWRkID0gbXlEaXYgKyBcIiAjYWRkQnV0dG9uXCI7XHJcbiAgJChteUFkZCkuaHRtbChcIlVwZGF0ZVwiKTtcclxuICAkKG15RGVsZXRlKS5zaG93KCk7XHJcbiAgJChteURpdikuc2hvdygpO1xyXG59XHJcblxyXG4vKiBDbGlja3Mgb24gXCJkZWxldGVcIiBvbiBmdWxsIGNhcmQgKi9cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVN1bW1hcnkoY2FyZFR5cGUpIHtcclxuICBoaWRlQWxsKCk7XHJcbiAgdmFyIG15RGl2ID0gXCIjXCIgKyBjYXJkVHlwZSArIFwiLXN1bW1hcnlcIjtcclxuICB1c2VyRW50cmllcy5zcGxpY2UoJC5pbkFycmF5KG15RGl2LCB1c2VyRW50cmllcyksIDEpO1xyXG4gIGRpc3BsYXlVc2VyTGlzdCgpO1xyXG4gICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgIHNjcm9sbFRvcDogJChcIiN1c2VyLWxpc3RcIikub2Zmc2V0KCkudG9wXHJcbiAgfSwgMTAwMCk7XHJcbn07XHJcblxyXG4vKiBDbGlja3Mgb24gXCJjYW5jZWxcIiBvbiBmdWxsIGNhcmQgKi9cclxuXHJcbmZ1bmN0aW9uIGNhbmNlbENhcmQoY2FyZFR5cGUpIHtcclxuICBoaWRlQWxsKCk7XHJcbiAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgc2Nyb2xsVG9wOiAkKFwiI3VzZXItbGlzdFwiKS5vZmZzZXQoKS50b3BcclxuICB9LCAxMDAwKTtcclxuICBkaXNwbGF5VXNlckxpc3QoKTtcclxufVxyXG5cclxuLyogVXBkYXRlIGxpc3QgYWZ0ZXIgaW50ZXJhY3Rpb24gKi9cclxuXHJcbnZhciB1c2VyRW50cmllcyA9IFtdO1xyXG5cclxuZnVuY3Rpb24gY2FwdHVyZVVzZXJMaXN0KCkge1xyXG4gIHVzZXJFbnRyaWVzID0gJChcIltpZCo9c3VtbWFyeV06dmlzaWJsZVwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheVVzZXJMaXN0KCkge1xyXG4gICQuZWFjaCh1c2VyRW50cmllcywgZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xyXG4gICAgJCh2YWx1ZSkuc2hvdygpO1xyXG4gIH0pO1xyXG4gIGlmICh1c2VyRW50cmllcy5sZW5ndGggPiAwKSB7XHJcbiAgICAkKFwiI2FkZC1hbmNob3ItbGluay1zdGFydFwiKS5oaWRlKCk7XHJcbiAgICAkKFwiI2FkZC1hbmNob3ItbGluay1yZXR1cm5cIikuc2hvdygpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkKFwiI2FkZC1hbmNob3ItbGluay1zdGFydFwiKS5zaG93KCk7XHJcbiAgICAkKFwiI2FkZC1hbmNob3ItbGluay1yZXR1cm5cIikuaGlkZSgpO1xyXG4gIH1cclxuICAkKFwiI2FkZC1vcHRpb25zXCIpLnNob3coKTtcclxufVxyXG5cclxuLyogR2VuZXJpYyBoaWRlIGFsbCAqL1xyXG5cclxuZnVuY3Rpb24gaGlkZUFsbCgpIHtcclxuXHJcbiAgJChcIi5oaWRlLW9uLWxvYWRcIikuaGlkZSgpO1xyXG5cclxuICAkKFwiI2JhbmstYWNjb3VudHMtY2FyZFwiKS5oaWRlKCk7XHJcbiAgJChcIiNiYW5rLWFjY291bnRzLXN1bW1hcnlcIikuaGlkZSgpO1xyXG4gICQoXCIjY2h1cmNoLWFjY291bnQtcmVmXCIpLmhpZGUoKTtcclxuXHJcbiAgJChcIiNjYXNoLWhlbGQtY2FyZFwiKS5oaWRlKCk7XHJcbiAgJChcIiNjYXNoLWhlbGQtc3VtbWFyeVwiKS5oaWRlKCk7XHJcblxyXG4gICQoXCIjc3VwZXJhbm51YXRpb24tY2FyZFwiKS5oaWRlKCk7XHJcbiAgJChcIiNzdXBlcmFubnVhdGlvbi1zdW1tYXJ5XCIpLmhpZGUoKTtcclxuXHJcbiAgJChcIiNzaGFyZXMtY2FyZFwiKS5oaWRlKCk7XHJcbiAgJChcIiNzaGFyZXMtc3VtbWFyeVwiKS5oaWRlKCk7XHJcblxyXG4gICQoXCIjbWFuYWdlZC1pbnZlc3RtZW50cy1jYXJkXCIpLmhpZGUoKTtcclxuICAkKFwiI21hbmFnZWQtaW52ZXN0bWVudHMtc3VtbWFyeVwiKS5oaWRlKCk7XHJcblxyXG4gICQoXCIjb3RoZXItaW52ZXN0bWVudHMtY2FyZFwiKS5oaWRlKCk7XHJcbiAgJChcIiNvdGhlci1pbnZlc3RtZW50cy1zdW1tYXJ5XCIpLmhpZGUoKTtcclxuXHJcbiAgJChcIiNtb25leS1sb2FuZWQtY2FyZFwiKS5oaWRlKCk7XHJcbiAgJChcIiNtb25leS1sb2FuZWQtc3VtbWFyeVwiKS5oaWRlKCk7XHJcblxyXG4gICQoXCIjYm9uZHMtYW5kLWRlYmVudHVyZXMtY2FyZFwiKS5oaWRlKCk7XHJcbiAgJChcIiNib25kcy1hbmQtZGViZW50dXJlcy1zdW1tYXJ5XCIpLmhpZGUoKTtcclxuXHJcbiAgJChcIiNvdGhlci1wYXltZW50cy1jYXJkXCIpLmhpZGUoKTtcclxuICAkKFwiI290aGVyLXBheW1lbnRzLXN1bW1hcnlcIikuaGlkZSgpO1xyXG5cclxuICAkKFwiI2VtcGxveW1lbnQtaW5jb21lLWNhcmRcIikuaGlkZSgpO1xyXG4gICQoXCIjZW1wbG95bWVudC1pbmNvbWUtc3VtbWFyeVwiKS5oaWRlKCk7XHJcblxyXG4gICQoXCIjcGFzdC1lbXBsb3ltZW50LWNhcmRcIikuaGlkZSgpO1xyXG4gICQoXCIjcGFzdC1lbXBsb3ltZW50LXN1bW1hcnlcIikuaGlkZSgpO1xyXG5cclxuICAkKFwiI3N1cGVyLXBlbnNpb24tY2FyZFwiKS5oaWRlKCk7XHJcbiAgJChcIiNzdXBlci1wZW5zaW9uLXN1bW1hcnlcIikuaGlkZSgpO1xyXG5cclxuICAkKFwiI2ZvcmVpZ24tcGVuc2lvbi1jYXJkXCIpLmhpZGUoKTtcclxuICAkKFwiI2ZvcmVpZ24tcGVuc2lvbi1zdW1tYXJ5XCIpLmhpZGUoKTtcclxuXHJcbiAgJChcIiNib2FyZGVycy1hbmQtbG9kZ2Vycy1jYXJkXCIpLmhpZGUoKTtcclxuICAkKFwiI2JvYXJkZXJzLWFuZC1sb2RnZXJzLXN1bW1hcnlcIikuaGlkZSgpO1xyXG5cclxuICAkKFwiI3B1cmNoYXNlZC1pbmNvbWUtc3RyZWFtcy1jYXJkXCIpLmhpZGUoKTtcclxuICAkKFwiI3B1cmNoYXNlZC1pbmNvbWUtc3RyZWFtcy1zdW1tYXJ5XCIpLmhpZGUoKTtcclxuXHJcbiAgJChcIiNmb3JlaWduLWluY29tZS1hbmQtYXNzZXRzLWNhcmRcIikuaGlkZSgpO1xyXG4gICQoXCIjZm9yZWlnbi1pbmNvbWUtYW5kLWFzc2V0cy1zdW1tYXJ5XCIpLmhpZGUoKTtcclxuXHJcbiAgJChcIiNyZWFsLWVzdGF0ZS1jYXJkXCIpLmhpZGUoKTtcclxuICAkKFwiI3JlYWwtZXN0YXRlLXN1bW1hcnlcIikuaGlkZSgpO1xyXG5cclxuICAkKFwiI2Zhcm0tY2FyZFwiKS5oaWRlKCk7XHJcbiAgJChcIiNmYXJtLXN1bW1hcnlcIikuaGlkZSgpO1xyXG5cclxuICAkKFwiI3NlbGYtbWFuYWdlZC1zdXBlci1jYXJkXCIpLmhpZGUoKTtcclxuICAkKFwiI3NlbGYtbWFuYWdlZC1zdXBlci1zdW1tYXJ5XCIpLmhpZGUoKTtcclxuXHJcbiAgJChcIiNidXNpbmVzc2VzLWNhcmRcIikuaGlkZSgpO1xyXG4gICQoXCIjYnVzaW5lc3Nlcy1zdW1tYXJ5XCIpLmhpZGUoKTtcclxuXHJcbiAgJChcIiNob21lLWNvbnRlbnRzLWNhcmRcIikuaGlkZSgpO1xyXG4gICQoXCIjaG9tZS1jb250ZW50cy1zdW1tYXJ5XCIpLmhpZGUoKTtcclxuXHJcbiAgJChcIiN2ZWhpY2xlcy1jYXJkXCIpLmhpZGUoKTtcclxuICAkKFwiI3ZlaGljbGVzLXN1bW1hcnlcIikuaGlkZSgpO1xyXG5cclxuICAkKFwiI290aGVyLXBlcnNvbmFsLWFzc2V0cy1jYXJkXCIpLmhpZGUoKTtcclxuICAkKFwiI290aGVyLXBlcnNvbmFsLWFzc2V0cy1zdW1tYXJ5XCIpLmhpZGUoKTtcclxuXHJcbiAgJChcIiNsaWZlLWluc3VyYW5jZS1jYXJkXCIpLmhpZGUoKTtcclxuICAkKFwiI2xpZmUtaW5zdXJhbmNlLXN1bW1hcnlcIikuaGlkZSgpO1xyXG5cclxuICAkKFwiI2dpZnRzLWNhcmRcIikuaGlkZSgpO1xyXG4gICQoXCIjZ2lmdHMtc3VtbWFyeVwiKS5oaWRlKCk7XHJcblxyXG4gICQoXCIjbWFpbnRlbmFuY2UtcGFpZC10by1mb3JtZXItcGFydG5lci1jYXJkXCIpLmhpZGUoKTtcclxuICAkKFwiI21haW50ZW5hbmNlLXBhaWQtdG8tZm9ybWVyLXBhcnRuZXItc3VtbWFyeVwiKS5oaWRlKCk7XHJcblxyXG4gICQoXCIjYWRkdGlvbmFsLW90aGVyLXBlcnNvbmFsLWFzc2V0cy1jYXJkXCIpLmhpZGUoKTtcclxuICAkKFwiI2FkZHRpb25hbC1vdGhlci1wZXJzb25hbC1hc3NldHMtc3VtbWFyeVwiKS5oaWRlKCk7XHJcblxyXG4gICQoXCIjYWRkLW9wdGlvbnNcIikuaGlkZSgpO1xyXG4gICQoXCIjYWRkLWFuY2hvci1saW5rLXN0YXJ0XCIpLmhpZGUoKTtcclxuICAkKFwiI2FkZC1hbmNob3ItbGluay1yZXR1cm5cIikuaGlkZSgpO1xyXG4gICQoXCIjZm9vdGVyLWJ1dHRvbnMtbWFza1wiKS5oaWRlKCk7XHJcbn0iXSwiZmlsZSI6ImluY29tZS1hc3NldHMuanMifQ==
