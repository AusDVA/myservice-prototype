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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmNhcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBPbiBwYWdlIHNjcm9sbGluZyAqL1xyXG5cclxuZnVuY3Rpb24gc2Nyb2xsVG9BZGQoKSB7XHJcbiAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgc2Nyb2xsVG9wOiAkKFwiI2FkZC1vcHRpb25zXCIpLm9mZnNldCgpLnRvcFxyXG4gIH0sIDEwMDApO1xyXG59XHJcblxyXG4vKiBDbGlja3Mgb24gXCJhZGRcIiBvbiB0aWxlICovXHJcblxyXG5mdW5jdGlvbiBzaG93TmV3Q2FyZChjYXJkVHlwZSkge1xyXG4gIGNhcHR1cmVVc2VyTGlzdCgpO1xyXG4gIGhpZGVBbGwoKTtcclxuICB2YXIgbXlEaXYgPSBcIiNcIiArIGNhcmRUeXBlICsgXCItY2FyZFwiO1xyXG4gIHZhciBteUZvcm0gPSBteURpdiArIFwiICNteUZvcm1cIjtcclxuICB2YXIgbXlEZWxldGUgPSBteURpdiArIFwiICNkZWxldGVCdXR0b25cIjtcclxuICB2YXIgbXlBZGQgPSBteURpdiArIFwiICNhZGRCdXR0b25cIjtcclxuICAkKG15QWRkKS5odG1sKFwiQWRkXCIpO1xyXG4gICQobXlEZWxldGUpLmhpZGUoKTtcclxuICAkKG15Rm9ybSkudHJpZ2dlcihcInJlc2V0XCIpO1xyXG4gICQobXlEaXYpLnNob3coKTtcclxuICAkKFwiI2Zvb3Rlci1idXR0b25zLW1hc2tcIikuc2hvdygpO1xyXG4gIC8vICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAvLyAgIHNjcm9sbFRvcDogJChcIiN1c2VyLWxpc3RcIikub2Zmc2V0KCkudG9wXHJcbiAgLy8gfSwgMTAwMCk7XHJcbn1cclxuXHJcbi8qIENsaWNrcyBvbiBcImFkZFwiIG9uIGZ1bGwgY2FyZCAqL1xyXG5cclxuZnVuY3Rpb24gYWRkU3VtbWFyeShjYXJkVHlwZSkge1xyXG4gIGhpZGVBbGwoKTtcclxuICB2YXIgbXlEaXYgPSBcIiNcIiArIGNhcmRUeXBlICsgXCItc3VtbWFyeVwiO1xyXG4gIGNvbnNvbGUubG9nKG15RGl2KTtcclxuICB1c2VyRW50cmllcy5wdXNoKCQobXlEaXYpKTtcclxuICBkaXNwbGF5VXNlckxpc3QoKTtcclxuICAvLyAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgLy8gICBzY3JvbGxUb3A6ICQoXCIjdXNlci1saXN0XCIpLm9mZnNldCgpLnRvcFxyXG4gIC8vIH0sIDEwMDApO1xyXG59O1xyXG5cclxuLyogQ2xpY2tzIG9uIFwiZWRpdFwiIG9uIFN1bW1hcnkgQ2FyZCAqL1xyXG5cclxuZnVuY3Rpb24gZWRpdENhcmQoY2FyZFR5cGUpIHtcclxuICBjYXB0dXJlVXNlckxpc3QoKTtcclxuICBoaWRlQWxsKCk7XHJcbiAgdmFyIG15RGl2ID0gXCIjXCIgKyBjYXJkVHlwZSArIFwiLWNhcmRcIjtcclxuICB2YXIgbXlEZWxldGUgPSBteURpdiArIFwiICNkZWxldGVCdXR0b25cIjtcclxuICB2YXIgbXlBZGQgPSBteURpdiArIFwiICNhZGRCdXR0b25cIjtcclxuICAkKG15QWRkKS5odG1sKFwiVXBkYXRlXCIpO1xyXG4gICQobXlEZWxldGUpLnNob3coKTtcclxuICAkKG15RGl2KS5zaG93KCk7XHJcbn1cclxuXHJcbi8qIENsaWNrcyBvbiBcImRlbGV0ZVwiIG9uIGZ1bGwgY2FyZCAqL1xyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU3VtbWFyeShjYXJkVHlwZSkge1xyXG4gIGhpZGVBbGwoKTtcclxuICB2YXIgbXlEaXYgPSBcIiNcIiArIGNhcmRUeXBlICsgXCItc3VtbWFyeVwiO1xyXG4gIHVzZXJFbnRyaWVzLnNwbGljZSgkLmluQXJyYXkobXlEaXYsIHVzZXJFbnRyaWVzKSwgMSk7XHJcbiAgZGlzcGxheVVzZXJMaXN0KCk7XHJcbiAgLy8gJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gIC8vICAgc2Nyb2xsVG9wOiAkKFwiI3VzZXItbGlzdFwiKS5vZmZzZXQoKS50b3BcclxuICAvLyB9LCAxMDAwKTtcclxufTtcclxuXHJcbi8qIENsaWNrcyBvbiBcImNhbmNlbFwiIG9uIGZ1bGwgY2FyZCAqL1xyXG5cclxuZnVuY3Rpb24gY2FuY2VsQ2FyZChjYXJkVHlwZSkge1xyXG4gIGhpZGVBbGwoKTtcclxuICAvLyAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgLy8gICBzY3JvbGxUb3A6ICQoXCIjdXNlci1saXN0XCIpLm9mZnNldCgpLnRvcFxyXG4gIC8vIH0sIDEwMDApO1xyXG4gIGRpc3BsYXlVc2VyTGlzdCgpO1xyXG59XHJcblxyXG4vKiBVcGRhdGUgbGlzdCBhZnRlciBpbnRlcmFjdGlvbiAqL1xyXG5cclxudmFyIHVzZXJFbnRyaWVzID0gW107XHJcblxyXG5mdW5jdGlvbiBjYXB0dXJlVXNlckxpc3QoKSB7XHJcbiAgdXNlckVudHJpZXMgPSAkKFwiW2lkKj1zdW1tYXJ5XTp2aXNpYmxlXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5VXNlckxpc3QoKSB7XHJcbiAgY29uc29sZS5sb2codXNlckVudHJpZXMpO1xyXG4gICQuZWFjaCh1c2VyRW50cmllcywgZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xyXG4gICAgJCh2YWx1ZSkuc2hvdygpO1xyXG4gIH0pO1xyXG4gIGlmICh1c2VyRW50cmllcy5sZW5ndGggPiAwKSB7XHJcbiAgICAvLyAkKFwiI2FkZC1hbmNob3ItbGluay1zdGFydFwiKS5oaWRlKCk7XHJcbiAgICAvLyAkKFwiI2FkZC1hbmNob3ItbGluay1yZXR1cm5cIikuc2hvdygpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyAkKFwiI2FkZC1hbmNob3ItbGluay1zdGFydFwiKS5zaG93KCk7XHJcbiAgICAvLyAkKFwiI2FkZC1hbmNob3ItbGluay1yZXR1cm5cIikuaGlkZSgpO1xyXG4gIH1cclxuICAvLyAkKFwiI2FkZC1vcHRpb25zXCIpLnNob3coKTtcclxuICAkKFwiLmhpZGUtb24tbG9hZFwiKS5zaG93KCk7XHJcbn1cclxuXHJcbi8qIEdlbmVyaWMgaGlkZSBhbGwgKi9cclxuXHJcbmZ1bmN0aW9uIGhpZGVBbGwoKSB7XHJcblxyXG4gICQoXCIuaGlkZS1vbi1sb2FkXCIpLmhpZGUoKTtcclxuICAkKFwiI2FsZXJ0LW5vLXNlcnZpY2VcIikuaGlkZSgpO1xyXG4gIC8vICQoXCIuaGlkZS1vbi1sb2FkXCIpLmhpZGUoKTtcclxuXHJcbiAgJChcIiNlbXBsb3ltZW50LWNhcmRcIikuaGlkZSgpO1xyXG4gICQoXCIjZW1wbG95bWVudC1zdW1tYXJ5XCIpLmhpZGUoKTtcclxuXHJcblxyXG4gIC8vICQoXCIjYWRkLW9wdGlvbnNcIikuaGlkZSgpO1xyXG4gIC8vICQoXCIjYWRkLWFuY2hvci1saW5rLXN0YXJ0XCIpLmhpZGUoKTtcclxuICAvLyAkKFwiI2FkZC1hbmNob3ItbGluay1yZXR1cm5cIikuaGlkZSgpO1xyXG4gIC8vICQoXCIjZm9vdGVyLWJ1dHRvbnMtbWFza1wiKS5oaWRlKCk7XHJcbn0iXSwiZmlsZSI6ImluY2FwLmpzIn0=
