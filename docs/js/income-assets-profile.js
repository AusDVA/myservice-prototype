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
  userEntries.push($(myDiv));
  displayUserList();
  $(myDiv).find(".updated").css("display", "inline-block");
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
  console.log( userEntries )
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
  $("#shares-listed-update-summary-deleted").hide();

  $("#shares-unlisted-update-card").hide();
  $("#shares-unlisted-update-summary").hide();
  $("#shares-unlisted-update-summary-deleted").hide();
  
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmNvbWUtYXNzZXRzLXByb2ZpbGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogT24gcGFnZSBzY3JvbGxpbmcgKi9cblxuZnVuY3Rpb24gc2Nyb2xsVG9BZGQoKSB7XG4gICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICBzY3JvbGxUb3A6ICQoXCIjYWRkLW9wdGlvbnNcIikub2Zmc2V0KCkudG9wXG4gIH0sIDUwMCk7XG59XG5cbi8qIENsaWNrcyBvbiBcImFkZFwiIG9uIHRpbGUgKi9cblxuZnVuY3Rpb24gc2hvd05ld0NhcmQoY2FyZFR5cGUpIHtcbiAgY2FwdHVyZVVzZXJMaXN0KCk7XG4gIGhpZGVBbGwoKTtcbiAgdmFyIG15RGl2ID0gXCIjXCIgKyBjYXJkVHlwZSArIFwiLWNhcmRcIjtcbiAgdmFyIG15Rm9ybSA9IG15RGl2ICsgXCIgI215Rm9ybVwiO1xuICB2YXIgbXlEZWxldGUgPSBteURpdiArIFwiICNkZWxldGVCdXR0b25cIjtcbiAgdmFyIG15QWRkID0gbXlEaXYgKyBcIiAjYWRkQnV0dG9uXCI7XG4gICQobXlBZGQpLmh0bWwoXCJBZGRcIik7XG4gICQobXlEZWxldGUpLmhpZGUoKTtcbiAgJChteUZvcm0pLnRyaWdnZXIoXCJyZXNldFwiKTtcbiAgJChteURpdikuc2hvdygpO1xuICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgc2Nyb2xsVG9wOiAkKFwiI3VzZXItbGlzdFwiKS5vZmZzZXQoKS50b3BcbiAgfSwgMTAwMCk7XG59XG5cbi8qIENsaWNrcyBvbiBcImFkZFwiIG9uIGZ1bGwgY2FyZCAqL1xuXG5mdW5jdGlvbiBhZGRTdW1tYXJ5KGNhcmRUeXBlKSB7XG4gIGhpZGVBbGwoKTtcbiAgdmFyIG15RGl2ID0gXCIjXCIgKyBjYXJkVHlwZSArIFwiLXN1bW1hcnlcIjtcbiAgdXNlckVudHJpZXMucHVzaCgkKG15RGl2KSk7XG4gIGRpc3BsYXlVc2VyTGlzdCgpO1xuICAkKG15RGl2KS5maW5kKFwiLnVwZGF0ZWRcIikuY3NzKFwiZGlzcGxheVwiLCBcImlubGluZS1ibG9ja1wiKTtcbiAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgIHNjcm9sbFRvcDogJChcIiN1c2VyLWxpc3RcIikub2Zmc2V0KCkudG9wXG4gIH0sIDEwMDApO1xufTtcblxuLyogQ2xpY2tzIG9uIFwiZWRpdFwiIG9uIFN1bW1hcnkgQ2FyZCAqL1xuXG5mdW5jdGlvbiBlZGl0Q2FyZChjYXJkVHlwZSkge1xuICBjYXB0dXJlVXNlckxpc3QoKTtcbiAgaGlkZUFsbCgpO1xuICB2YXIgbXlEaXYgPSBcIiNcIiArIGNhcmRUeXBlICsgXCItY2FyZFwiO1xuICB2YXIgbXlEZWxldGUgPSBteURpdiArIFwiICNkZWxldGVCdXR0b25cIjtcbiAgdmFyIG15QWRkID0gbXlEaXYgKyBcIiAjYWRkQnV0dG9uXCI7XG4gICQobXlEZWxldGUpLnNob3coKTtcbiAgJChteURpdikuc2hvdygpO1xufVxuXG4vKiBDbGlja3Mgb24gXCJkZWxldGVcIiBvbiBwcmVwb3AgY2FyZCBlZGl0ICovXG5cbmZ1bmN0aW9uIHJlbW92ZUl0ZW0oY2FyZFR5cGUpIHtcblxuICAvLyBoaWRlQWxsKCk7XG4gICQoXCIjcGVybS1jbG9zZS0xXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gIHZhciBteURpdiA9IFwiI1wiICsgY2FyZFR5cGUgKyBcIi1jYXJkXCI7XG4gICQoIG15RGl2ICkuZmluZCggXCIuZGVsZXRlLWNvbnRlbnRcIikuc2hvdygpO1xuICAkKCBteURpdiApLmZpbmQoIFwiLmVkaXQtY29udGVudFwiKS5oaWRlKCk7XG5cbn07XG5cbi8qIENsaWNrcyBvbiBcImNhbmNlbFwiIG9uIGZ1bGwgY2FyZCAqL1xuXG5mdW5jdGlvbiBjYW5jZWxDYXJkKGNhcmRUeXBlKSB7XG4gIGhpZGVBbGwoKTtcbiAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgIHNjcm9sbFRvcDogJChcIiN1c2VyLWxpc3RcIikub2Zmc2V0KCkudG9wXG4gIH0sIDEwMDApO1xuICBkaXNwbGF5VXNlckxpc3QoKTtcbn1cblxuLyogVXBkYXRlIGxpc3QgYWZ0ZXIgaW50ZXJhY3Rpb24gKi9cblxudmFyIHVzZXJFbnRyaWVzID0gW107XG5cbmZ1bmN0aW9uIGNhcHR1cmVVc2VyTGlzdCgpIHtcbiAgdXNlckVudHJpZXMgPSAkKFwiW2lkKj1zdW1tYXJ5XTp2aXNpYmxlXCIpO1xuICBjb25zb2xlLmxvZyggdXNlckVudHJpZXMgKVxufVxuXG5mdW5jdGlvbiBkaXNwbGF5VXNlckxpc3QoKSB7XG4gICQuZWFjaCh1c2VyRW50cmllcywgZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xuICAgICQodmFsdWUpLnNob3coKTtcbiAgfSk7XG4gIGlmICh1c2VyRW50cmllcy5sZW5ndGggPiAwKSB7XG4gICAgJChcIiNhZGQtYW5jaG9yLWxpbmstc3RhcnRcIikuaGlkZSgpO1xuICAgICQoXCIjYWRkLWFuY2hvci1saW5rLXJldHVyblwiKS5zaG93KCk7XG4gIH0gZWxzZSB7XG4gICAgJChcIiNhZGQtYW5jaG9yLWxpbmstc3RhcnRcIikuc2hvdygpO1xuICAgICQoXCIjYWRkLWFuY2hvci1saW5rLXJldHVyblwiKS5oaWRlKCk7XG4gIH1cbiAgLy8gJChcIiNhZGQtb3B0aW9uc1wiKS5zaG93KCk7XG4gICQoXCIjdXNlci1saXN0XCIpLnNob3coKTtcbiAgJChcIiNtYWluLXBhZ2luYXRpb25cIikuc2hvdygpO1xuXG59XG5cbi8qIEdlbmVyaWMgaGlkZSBhbGwgKi9cblxuZnVuY3Rpb24gaGlkZUFsbCgpIHtcblxuICAkKFwiI3VzZXItbGlzdFwiKS5oaWRlKCk7XG4gICQoXCIjbWFpbi1wYWdpbmF0aW9uXCIpLmhpZGUoKTtcblxuICAkKFwiLmhpZGUtb24tbG9hZFwiKS5oaWRlKCk7XG5cbiAgJChcIiNiYW5rLWFjY291bnRzLWNhcmRcIikuaGlkZSgpO1xuICAkKFwiI2JhbmstYWNjb3VudHMtc3VtbWFyeVwiKS5oaWRlKCk7XG4gICQoXCIjYmFuay1hY2NvdW50cy1zdW1tYXJ5LWRlbGV0ZWRcIikuaGlkZSgpO1xuXG4gICQoXCIjYmFuay1hY2NvdW50cy1uZXctY2FyZFwiKS5oaWRlKCk7XG4gICQoXCIjYmFuay1hY2NvdW50cy1uZXctc3VtbWFyeVwiKS5oaWRlKCk7XG5cbiAgJChcIiNzaGFyZXMtbGlzdGVkLXVwZGF0ZS1jYXJkXCIpLmhpZGUoKTtcbiAgJChcIiNzaGFyZXMtbGlzdGVkLXVwZGF0ZS1zdW1tYXJ5XCIpLmhpZGUoKTtcbiAgJChcIiNzaGFyZXMtbGlzdGVkLXVwZGF0ZS1zdW1tYXJ5LWRlbGV0ZWRcIikuaGlkZSgpO1xuXG4gICQoXCIjc2hhcmVzLXVubGlzdGVkLXVwZGF0ZS1jYXJkXCIpLmhpZGUoKTtcbiAgJChcIiNzaGFyZXMtdW5saXN0ZWQtdXBkYXRlLXN1bW1hcnlcIikuaGlkZSgpO1xuICAkKFwiI3NoYXJlcy11bmxpc3RlZC11cGRhdGUtc3VtbWFyeS1kZWxldGVkXCIpLmhpZGUoKTtcbiAgXG4gIC8vICQoXCIjY2h1cmNoLWFjY291bnQtcmVmXCIpLmhpZGUoKTtcblxuICAvLyAkKFwiI2FkZC1hbmNob3ItbGluay1zdGFydFwiKS5oaWRlKCk7XG4gIC8vICQoXCIjYWRkLWFuY2hvci1saW5rLXJldHVyblwiKS5oaWRlKCk7XG5cbn1cblxuJChEb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gICQoZG9jdW1lbnQpLmtleXByZXNzKGZ1bmN0aW9uIChlKSB7XG4gICAgc3dpdGNoIChlLndoaWNoKSB7XG4gICAgICBjYXNlIDQ5OlxuICAgICAgICBoaWRlUGFydG5lcigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNTA6XG4gICAgICAgIHNob3dQYXJ0bmVyKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gIH0pO1xuXG4gIGNhcHR1cmVVc2VyTGlzdCgpO1xuICBkaXNwbGF5VXNlckxpc3QoKTtcblxuICBmdW5jdGlvbiBzaG93UGFydG5lcigpIHtcbiAgICAkKFwiLnBhcnRuZXJcIikuc2hvdygpO1xuICAgICQoXCIucGFydG5lci1sYWJlbFwiKS50ZXh0KFwiT3VyXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGlkZVBhcnRuZXIoKSB7XG4gICAgJChcIi5wYXJ0bmVyXCIpLmhpZGUoKTtcbiAgICAkKFwiLnBhcnRuZXItbGFiZWxcIikudGV4dChcIk15XCIpO1xuICB9XG5cbn0pOyJdLCJmaWxlIjoiaW5jb21lLWFzc2V0cy1wcm9maWxlLmpzIn0=
