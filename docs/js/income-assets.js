"use strict";

/* On page scrolling */

function scrollToAdd() {
    $('html, body').animate({
        scrollTop: $("#add-options").offset().top
    }, 1000);
}

/* Clicks on "add" on title */

function showNewCard(cardType) {
    hideAll();
    myDiv = "#" + cardType + "-start";
    $(myDiv).show();
}

/* Clicks on "add" on full card */

function addSummary(cardType) {
    hideAll();
    myDiv = "#" + cardType + "-summary";
    $(myDiv).show();
    $('html, body').animate({
        scrollTop: $("#user-list").offset().top
    }, 1000);
    captureUserList();
    updateUserList();
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
    $(myDiv).hide();
    $('html, body').animate({
        scrollTop: $("#user-list").offset().top
    }, 1000);
    $("#add-options").show();
};

/* Clicks on "cancel" on full card */

function cancelCard(cardType) {
    hideAll();
    $('html, body').animate({
        scrollTop: $("#user-list").offset().top
    }, 1000);
    updateUserList();
}

/* Update list after interaction */

var currentUserList;

function captureUserList() {
    currentUserList = $("[id*=summary]:visible");
}

function updateUserList() {
    $.each(currentUserList, function (index, value) {
        $(value).show();
    });
    if (currentUserList.length > 0) {
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
    $("#add-options").hide();
    $("#add-anchor-link-start").hide();
    $("#add-anchor-link-return").hide();
}