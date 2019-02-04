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
    myDiv = "#" + cardType + "-start";
    $(myDiv).show();
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
    myDiv = "#" + cardType + "-edit";
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

    $("#bank-accounts-start").hide();
    $("#bank-accounts-summary").hide();
    $("#bank-accounts-edit").hide();
    $("#church-account-ref").hide();

    $("#cash-held-start").hide();
    $("#cash-held-summary").hide();
    $("#cash-held-edit").hide();

    $("#money-loaned-start").hide();
    $("#money-loaned-summary").hide();
    $("#money-loaned-edit").hide();

    $("#bonds-and-debentures-start").hide();
    $("#bonds-and-debentures-summary").hide();
    $("#bonds-and-debentures-edit").hide();

    $("#add-options").hide();
    $("#add-anchor-link-start").hide();
    $("#add-anchor-link-return").hide();
}