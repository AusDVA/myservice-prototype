/* On page scrolling */

// function scrollToAdd() {
//   $('html, body').animate({
//     scrollTop: $("#add-options").offset().top
//   }, 1000);
// }

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
  $("#continue").attr('disabled','disabled');
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
  $(".updated").css("display", "inline-block");
};

/* Clicks on "edit" on Summary Card */

function editCard(cardType) {
  captureUserList();
  hideAll();
  var myDiv = "#" + cardType + "-card";
  var myDelete = myDiv + " #deleteButton";
  var myAdd = myDiv + " #addButton";
  // $(myAdd).html("Update");
  $("#continue").attr('disabled', 'disabled');
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
  

  $("#church-account-ref").hide();

  // $("#cash-held-card").hide();
  // $("#cash-held-summary").hide();

  // $("#superannuation-card").hide();
  // $("#superannuation-summary").hide();

  // $("#shares-card").hide();
  // $("#shares-summary").hide();

  // $("#managed-investments-card").hide();
  // $("#managed-investments-summary").hide();

  // $("#other-investments-card").hide();
  // $("#other-investments-summary").hide();

  // $("#money-loaned-card").hide();
  // $("#money-loaned-summary").hide();

  // $("#bonds-and-debentures-card").hide();
  // $("#bonds-and-debentures-summary").hide();

  // $("#other-payments-card").hide();
  // $("#other-payments-summary").hide();

  // $("#employment-income-card").hide();
  // $("#employment-income-summary").hide();

  // $("#past-employment-card").hide();
  // $("#past-employment-summary").hide();

  // $("#super-pension-card").hide();
  // $("#super-pension-summary").hide();

  // $("#foreign-pension-card").hide();
  // $("#foreign-pension-summary").hide();

  // $("#boarders-and-lodgers-card").hide();
  // $("#boarders-and-lodgers-summary").hide();

  // $("#purchased-income-streams-card").hide();
  // $("#purchased-income-streams-summary").hide();

  // $("#foreign-income-and-assets-card").hide();
  // $("#foreign-income-and-assets-summary").hide();

  // $("#real-estate-card").hide();
  // $("#real-estate-summary").hide();

  // $("#farm-card").hide();
  // $("#farm-summary").hide();

  // $("#self-managed-super-card").hide();
  // $("#self-managed-super-summary").hide();

  // $("#businesses-card").hide();
  // $("#businesses-summary").hide();

  // $("#home-contents-card").hide();
  // $("#home-contents-summary").hide();

  // $("#vehicles-card").hide();
  // $("#vehicles-summary").hide();

  // $("#other-personal-assets-card").hide();
  // $("#other-personal-assets-summary").hide();

  // $("#life-insurance-card").hide();
  // $("#life-insurance-summary").hide();

  // $("#gifts-card").hide();
  // $("#gifts-summary").hide();

  // $("#maintenance-paid-to-former-partner-card").hide();
  // $("#maintenance-paid-to-former-partner-summary").hide();

  // $("#addtional-other-personal-assets-card").hide();
  // $("#addtional-other-personal-assets-summary").hide();

  // $("#compensation-and-damages-card").hide();
  // $("#compensation-and-damages-summary").hide();

  // $("#add-options").hide();
  $("#add-anchor-link-start").hide();
  $("#add-anchor-link-return").hide();
  // $("#footer-buttons-mask").hide();

  $("#continue").removeAttr('disabled');

}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmNvbWUtYXNzZXRzLXByb2ZpbGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogT24gcGFnZSBzY3JvbGxpbmcgKi9cblxuLy8gZnVuY3Rpb24gc2Nyb2xsVG9BZGQoKSB7XG4vLyAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbi8vICAgICBzY3JvbGxUb3A6ICQoXCIjYWRkLW9wdGlvbnNcIikub2Zmc2V0KCkudG9wXG4vLyAgIH0sIDEwMDApO1xuLy8gfVxuXG4vKiBDbGlja3Mgb24gXCJhZGRcIiBvbiB0aWxlICovXG5cbmZ1bmN0aW9uIHNob3dOZXdDYXJkKGNhcmRUeXBlKSB7XG4gIGNhcHR1cmVVc2VyTGlzdCgpO1xuICBoaWRlQWxsKCk7XG4gIHZhciBteURpdiA9IFwiI1wiICsgY2FyZFR5cGUgKyBcIi1jYXJkXCI7XG4gIHZhciBteUZvcm0gPSBteURpdiArIFwiICNteUZvcm1cIjtcbiAgdmFyIG15RGVsZXRlID0gbXlEaXYgKyBcIiAjZGVsZXRlQnV0dG9uXCI7XG4gIHZhciBteUFkZCA9IG15RGl2ICsgXCIgI2FkZEJ1dHRvblwiO1xuICAkKG15QWRkKS5odG1sKFwiQWRkXCIpO1xuICAkKG15RGVsZXRlKS5oaWRlKCk7XG4gICQobXlGb3JtKS50cmlnZ2VyKFwicmVzZXRcIik7XG4gICQobXlEaXYpLnNob3coKTtcbiAgJChcIiNjb250aW51ZVwiKS5hdHRyKCdkaXNhYmxlZCcsJ2Rpc2FibGVkJyk7XG4gICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICBzY3JvbGxUb3A6ICQoXCIjdXNlci1saXN0XCIpLm9mZnNldCgpLnRvcFxuICB9LCAxMDAwKTtcbn1cblxuLyogQ2xpY2tzIG9uIFwiYWRkXCIgb24gZnVsbCBjYXJkICovXG5cbmZ1bmN0aW9uIGFkZFN1bW1hcnkoY2FyZFR5cGUpIHtcbiAgaGlkZUFsbCgpO1xuICB2YXIgbXlEaXYgPSBcIiNcIiArIGNhcmRUeXBlICsgXCItc3VtbWFyeVwiO1xuICB1c2VyRW50cmllcy5wdXNoKCQobXlEaXYpKTtcbiAgZGlzcGxheVVzZXJMaXN0KCk7XG4gICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICBzY3JvbGxUb3A6ICQoXCIjdXNlci1saXN0XCIpLm9mZnNldCgpLnRvcFxuICB9LCAxMDAwKTtcbiAgJChcIi51cGRhdGVkXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIik7XG59O1xuXG4vKiBDbGlja3Mgb24gXCJlZGl0XCIgb24gU3VtbWFyeSBDYXJkICovXG5cbmZ1bmN0aW9uIGVkaXRDYXJkKGNhcmRUeXBlKSB7XG4gIGNhcHR1cmVVc2VyTGlzdCgpO1xuICBoaWRlQWxsKCk7XG4gIHZhciBteURpdiA9IFwiI1wiICsgY2FyZFR5cGUgKyBcIi1jYXJkXCI7XG4gIHZhciBteURlbGV0ZSA9IG15RGl2ICsgXCIgI2RlbGV0ZUJ1dHRvblwiO1xuICB2YXIgbXlBZGQgPSBteURpdiArIFwiICNhZGRCdXR0b25cIjtcbiAgLy8gJChteUFkZCkuaHRtbChcIlVwZGF0ZVwiKTtcbiAgJChcIiNjb250aW51ZVwiKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAkKG15RGVsZXRlKS5zaG93KCk7XG4gICQobXlEaXYpLnNob3coKTtcbn1cblxuLyogQ2xpY2tzIG9uIFwiZGVsZXRlXCIgb24gcHJlcG9wIGNhcmQgZWRpdCAqL1xuXG5mdW5jdGlvbiByZW1vdmVJdGVtKGNhcmRUeXBlKSB7XG5cbiAgLy8gaGlkZUFsbCgpO1xuICAkKFwiI3Blcm0tY2xvc2UtMVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICB2YXIgbXlEaXYgPSBcIiNcIiArIGNhcmRUeXBlICsgXCItY2FyZFwiO1xuICAkKCBteURpdiApLmZpbmQoIFwiLmRlbGV0ZS1jb250ZW50XCIpLnNob3coKTtcbiAgJCggbXlEaXYgKS5maW5kKCBcIi5lZGl0LWNvbnRlbnRcIikuaGlkZSgpO1xuXG59O1xuXG4vKiBDbGlja3Mgb24gXCJjYW5jZWxcIiBvbiBmdWxsIGNhcmQgKi9cblxuZnVuY3Rpb24gY2FuY2VsQ2FyZChjYXJkVHlwZSkge1xuICBoaWRlQWxsKCk7XG4gICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICBzY3JvbGxUb3A6ICQoXCIjdXNlci1saXN0XCIpLm9mZnNldCgpLnRvcFxuICB9LCAxMDAwKTtcbiAgZGlzcGxheVVzZXJMaXN0KCk7XG59XG5cbi8qIFVwZGF0ZSBsaXN0IGFmdGVyIGludGVyYWN0aW9uICovXG5cbnZhciB1c2VyRW50cmllcyA9IFtdO1xuXG5mdW5jdGlvbiBjYXB0dXJlVXNlckxpc3QoKSB7XG4gIHVzZXJFbnRyaWVzID0gJChcIltpZCo9c3VtbWFyeV06dmlzaWJsZVwiKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVVzZXJMaXN0KCkge1xuICAkLmVhY2godXNlckVudHJpZXMsIGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHtcbiAgICAkKHZhbHVlKS5zaG93KCk7XG4gIH0pO1xuICBpZiAodXNlckVudHJpZXMubGVuZ3RoID4gMCkge1xuICAgICQoXCIjYWRkLWFuY2hvci1saW5rLXN0YXJ0XCIpLmhpZGUoKTtcbiAgICAkKFwiI2FkZC1hbmNob3ItbGluay1yZXR1cm5cIikuc2hvdygpO1xuICB9IGVsc2Uge1xuICAgICQoXCIjYWRkLWFuY2hvci1saW5rLXN0YXJ0XCIpLnNob3coKTtcbiAgICAkKFwiI2FkZC1hbmNob3ItbGluay1yZXR1cm5cIikuaGlkZSgpO1xuICB9XG4gIC8vICQoXCIjYWRkLW9wdGlvbnNcIikuc2hvdygpO1xuXG4gICQoXCIjdXNlci1saXN0XCIpLnNob3coKTtcbiAgJChcIiNtYWluLXBhZ2luYXRpb25cIikuc2hvdygpO1xuXG59XG5cbi8qIEdlbmVyaWMgaGlkZSBhbGwgKi9cblxuZnVuY3Rpb24gaGlkZUFsbCgpIHtcblxuXG4gICQoXCIjdXNlci1saXN0XCIpLmhpZGUoKTtcbiAgJChcIiNtYWluLXBhZ2luYXRpb25cIikuaGlkZSgpO1xuXG4gICQoXCIuaGlkZS1vbi1sb2FkXCIpLmhpZGUoKTtcblxuICAkKFwiI2JhbmstYWNjb3VudHMtY2FyZFwiKS5oaWRlKCk7XG4gICQoXCIjYmFuay1hY2NvdW50cy1zdW1tYXJ5XCIpLmhpZGUoKTtcbiAgJChcIiNiYW5rLWFjY291bnRzLXN1bW1hcnktZGVsZXRlZFwiKS5oaWRlKCk7XG5cbiAgJChcIiNiYW5rLWFjY291bnRzLW5ldy1jYXJkXCIpLmhpZGUoKTtcbiAgJChcIiNiYW5rLWFjY291bnRzLW5ldy1zdW1tYXJ5XCIpLmhpZGUoKTtcbiAgXG5cbiAgJChcIiNjaHVyY2gtYWNjb3VudC1yZWZcIikuaGlkZSgpO1xuXG4gIC8vICQoXCIjY2FzaC1oZWxkLWNhcmRcIikuaGlkZSgpO1xuICAvLyAkKFwiI2Nhc2gtaGVsZC1zdW1tYXJ5XCIpLmhpZGUoKTtcblxuICAvLyAkKFwiI3N1cGVyYW5udWF0aW9uLWNhcmRcIikuaGlkZSgpO1xuICAvLyAkKFwiI3N1cGVyYW5udWF0aW9uLXN1bW1hcnlcIikuaGlkZSgpO1xuXG4gIC8vICQoXCIjc2hhcmVzLWNhcmRcIikuaGlkZSgpO1xuICAvLyAkKFwiI3NoYXJlcy1zdW1tYXJ5XCIpLmhpZGUoKTtcblxuICAvLyAkKFwiI21hbmFnZWQtaW52ZXN0bWVudHMtY2FyZFwiKS5oaWRlKCk7XG4gIC8vICQoXCIjbWFuYWdlZC1pbnZlc3RtZW50cy1zdW1tYXJ5XCIpLmhpZGUoKTtcblxuICAvLyAkKFwiI290aGVyLWludmVzdG1lbnRzLWNhcmRcIikuaGlkZSgpO1xuICAvLyAkKFwiI290aGVyLWludmVzdG1lbnRzLXN1bW1hcnlcIikuaGlkZSgpO1xuXG4gIC8vICQoXCIjbW9uZXktbG9hbmVkLWNhcmRcIikuaGlkZSgpO1xuICAvLyAkKFwiI21vbmV5LWxvYW5lZC1zdW1tYXJ5XCIpLmhpZGUoKTtcblxuICAvLyAkKFwiI2JvbmRzLWFuZC1kZWJlbnR1cmVzLWNhcmRcIikuaGlkZSgpO1xuICAvLyAkKFwiI2JvbmRzLWFuZC1kZWJlbnR1cmVzLXN1bW1hcnlcIikuaGlkZSgpO1xuXG4gIC8vICQoXCIjb3RoZXItcGF5bWVudHMtY2FyZFwiKS5oaWRlKCk7XG4gIC8vICQoXCIjb3RoZXItcGF5bWVudHMtc3VtbWFyeVwiKS5oaWRlKCk7XG5cbiAgLy8gJChcIiNlbXBsb3ltZW50LWluY29tZS1jYXJkXCIpLmhpZGUoKTtcbiAgLy8gJChcIiNlbXBsb3ltZW50LWluY29tZS1zdW1tYXJ5XCIpLmhpZGUoKTtcblxuICAvLyAkKFwiI3Bhc3QtZW1wbG95bWVudC1jYXJkXCIpLmhpZGUoKTtcbiAgLy8gJChcIiNwYXN0LWVtcGxveW1lbnQtc3VtbWFyeVwiKS5oaWRlKCk7XG5cbiAgLy8gJChcIiNzdXBlci1wZW5zaW9uLWNhcmRcIikuaGlkZSgpO1xuICAvLyAkKFwiI3N1cGVyLXBlbnNpb24tc3VtbWFyeVwiKS5oaWRlKCk7XG5cbiAgLy8gJChcIiNmb3JlaWduLXBlbnNpb24tY2FyZFwiKS5oaWRlKCk7XG4gIC8vICQoXCIjZm9yZWlnbi1wZW5zaW9uLXN1bW1hcnlcIikuaGlkZSgpO1xuXG4gIC8vICQoXCIjYm9hcmRlcnMtYW5kLWxvZGdlcnMtY2FyZFwiKS5oaWRlKCk7XG4gIC8vICQoXCIjYm9hcmRlcnMtYW5kLWxvZGdlcnMtc3VtbWFyeVwiKS5oaWRlKCk7XG5cbiAgLy8gJChcIiNwdXJjaGFzZWQtaW5jb21lLXN0cmVhbXMtY2FyZFwiKS5oaWRlKCk7XG4gIC8vICQoXCIjcHVyY2hhc2VkLWluY29tZS1zdHJlYW1zLXN1bW1hcnlcIikuaGlkZSgpO1xuXG4gIC8vICQoXCIjZm9yZWlnbi1pbmNvbWUtYW5kLWFzc2V0cy1jYXJkXCIpLmhpZGUoKTtcbiAgLy8gJChcIiNmb3JlaWduLWluY29tZS1hbmQtYXNzZXRzLXN1bW1hcnlcIikuaGlkZSgpO1xuXG4gIC8vICQoXCIjcmVhbC1lc3RhdGUtY2FyZFwiKS5oaWRlKCk7XG4gIC8vICQoXCIjcmVhbC1lc3RhdGUtc3VtbWFyeVwiKS5oaWRlKCk7XG5cbiAgLy8gJChcIiNmYXJtLWNhcmRcIikuaGlkZSgpO1xuICAvLyAkKFwiI2Zhcm0tc3VtbWFyeVwiKS5oaWRlKCk7XG5cbiAgLy8gJChcIiNzZWxmLW1hbmFnZWQtc3VwZXItY2FyZFwiKS5oaWRlKCk7XG4gIC8vICQoXCIjc2VsZi1tYW5hZ2VkLXN1cGVyLXN1bW1hcnlcIikuaGlkZSgpO1xuXG4gIC8vICQoXCIjYnVzaW5lc3Nlcy1jYXJkXCIpLmhpZGUoKTtcbiAgLy8gJChcIiNidXNpbmVzc2VzLXN1bW1hcnlcIikuaGlkZSgpO1xuXG4gIC8vICQoXCIjaG9tZS1jb250ZW50cy1jYXJkXCIpLmhpZGUoKTtcbiAgLy8gJChcIiNob21lLWNvbnRlbnRzLXN1bW1hcnlcIikuaGlkZSgpO1xuXG4gIC8vICQoXCIjdmVoaWNsZXMtY2FyZFwiKS5oaWRlKCk7XG4gIC8vICQoXCIjdmVoaWNsZXMtc3VtbWFyeVwiKS5oaWRlKCk7XG5cbiAgLy8gJChcIiNvdGhlci1wZXJzb25hbC1hc3NldHMtY2FyZFwiKS5oaWRlKCk7XG4gIC8vICQoXCIjb3RoZXItcGVyc29uYWwtYXNzZXRzLXN1bW1hcnlcIikuaGlkZSgpO1xuXG4gIC8vICQoXCIjbGlmZS1pbnN1cmFuY2UtY2FyZFwiKS5oaWRlKCk7XG4gIC8vICQoXCIjbGlmZS1pbnN1cmFuY2Utc3VtbWFyeVwiKS5oaWRlKCk7XG5cbiAgLy8gJChcIiNnaWZ0cy1jYXJkXCIpLmhpZGUoKTtcbiAgLy8gJChcIiNnaWZ0cy1zdW1tYXJ5XCIpLmhpZGUoKTtcblxuICAvLyAkKFwiI21haW50ZW5hbmNlLXBhaWQtdG8tZm9ybWVyLXBhcnRuZXItY2FyZFwiKS5oaWRlKCk7XG4gIC8vICQoXCIjbWFpbnRlbmFuY2UtcGFpZC10by1mb3JtZXItcGFydG5lci1zdW1tYXJ5XCIpLmhpZGUoKTtcblxuICAvLyAkKFwiI2FkZHRpb25hbC1vdGhlci1wZXJzb25hbC1hc3NldHMtY2FyZFwiKS5oaWRlKCk7XG4gIC8vICQoXCIjYWRkdGlvbmFsLW90aGVyLXBlcnNvbmFsLWFzc2V0cy1zdW1tYXJ5XCIpLmhpZGUoKTtcblxuICAvLyAkKFwiI2NvbXBlbnNhdGlvbi1hbmQtZGFtYWdlcy1jYXJkXCIpLmhpZGUoKTtcbiAgLy8gJChcIiNjb21wZW5zYXRpb24tYW5kLWRhbWFnZXMtc3VtbWFyeVwiKS5oaWRlKCk7XG5cbiAgLy8gJChcIiNhZGQtb3B0aW9uc1wiKS5oaWRlKCk7XG4gICQoXCIjYWRkLWFuY2hvci1saW5rLXN0YXJ0XCIpLmhpZGUoKTtcbiAgJChcIiNhZGQtYW5jaG9yLWxpbmstcmV0dXJuXCIpLmhpZGUoKTtcbiAgLy8gJChcIiNmb290ZXItYnV0dG9ucy1tYXNrXCIpLmhpZGUoKTtcblxuICAkKFwiI2NvbnRpbnVlXCIpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG5cbn0iXSwiZmlsZSI6ImluY29tZS1hc3NldHMtcHJvZmlsZS5qcyJ9
