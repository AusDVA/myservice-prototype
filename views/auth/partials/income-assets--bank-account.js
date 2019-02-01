
// $(Document).ready(function() {

    var bankAccount1Added;
    var bankAccount2Added;

    $('#bank-accounts-add').click(function() {
        // hideAll();
        if (!bankAccount1Added) {
            $("#bank-accounts-1-start").show();
        } else {
            $("#bank-accounts-2-start").show();
        }
        $('html, body').animate({
            scrollTop: $("#user-list").offset().top
        }, 1000);
    });

    /* Bank account 1 start */

    $(function() {
        $("#bank-accounts-1-start").change(function() {
            if ($("#church-account").is(":selected")) {
                $("#church-account-ref").show("fast");
            } else {
                $("#church-account-ref").hide();
            }
        }).trigger('change');
    });
    $('#bank-accounts-1-start-add').click(function() {
        hideAll();
        $("#bank-accounts-1-summary").show();
        $("#add-options").show();
        $("#add-anchor-link-return").show();
        $('html, body').animate({
            scrollTop: $("#user-list").offset().top
        }, 1000);
        bankAccount1Added = true;
        updateUserList();
    });
    $('#bank-accounts-1-start-cancel').click(function() {
        hideAll();
        $("#add-options").show();
        $("#add-anchor-link-start").show();
        $('html, body').animate({
            scrollTop: $("#user-list").offset().top
        }, 1000);
        updateUserList();
    });
    $('#bank-accounts-1-summary-edit').click(function() {
        hideAll();
        $("#bank-accounts-1-edit").show();
        $("#add-options").show();
    });
    $('#bank-accounts-1-summary-edit').click(function() {
        hideAll();
        $("#bank-accounts-1-edit").show();
        $("#add-options").show();
    });
    $('#bank-accounts-1-edit-update').click(function() {
        hideAll();
        $("#bank-accounts-1-summary").show();
        $("#add-options").show();
        $("#add-anchor-link-return").show();
        $('html, body').animate({
            scrollTop: $("#user-list").offset().top
        }, 1000);
        updateUserList();
    });
    $('#bank-accounts-1-edit-cancel').click(function() {
        hideAll();
        $("#bank-accounts-1-summary").show();
        $("#add-options").show();
        $("#add-anchor-link-return").show();
        $('html, body').animate({
            scrollTop: $("#user-list").offset().top
        }, 1000);
        updateUserList();
    });
    $('#bank-accounts-1-edit-delete').click(function() {
        hideAll();
        $("#add-options").show();
        $("#add-anchor-link-start").show();
        $('html, body').animate({
            scrollTop: $("#user-list").offset().top
        }, 1000);
        bankAccount1Added = false;
        updateUserList();
    });

    /* Bank account 1 end */

    /* Bank account 2 start */

    $(function() {
        $("#bank-accounts-2-start").change(function() {
            if ($("#church-account").is(":selected")) {
                $("#church-account-ref").show("fast");
            } else {
                $("#church-account-ref").hide();
            }
        }).trigger('change');
    });
    $('#bank-accounts-2-start-add').click(function() {
        hideAll();
        $("#bank-accounts-2-summary").show();
        $("#add-options").show();
        $("#add-anchor-link-return").show();
        $('html, body').animate({
            scrollTop: $("#user-list").offset().top
        }, 1000);
        bankAccount2Added = true;
        updateUserList();
    });
    $('#bank-accounts-2-start-cancel').click(function() {
        hideAll();
        $("#add-options").show();
        $("#add-anchor-link-start").show();
        updateUserList();
    });
    // $('#bank-accounts-2-summary-edit').click(function() {
    //     hideAll();
    //     $("#bank-accounts-2-edit").show();
    //     $("#add-options").show();
    // });
    // $('#bank-accounts-2-summary-edit').click(function() {
    //     hideAll();
    //     $("#bank-accounts-2-edit").show();
    //     $("#add-options").show();
    // });
    // $('#bank-accounts-2-edit-update').click(function() {
    //     hideAll();
    //     $("#bank-accounts-2-summary").show();
    //     $("#add-options").show();
    //     $("#add-anchor-link-return").show();
    //     updateUserList();
    // });
    // $('#bank-accounts-2-edit-cancel').click(function() {
    //     hideAll();
    //     $("#bank-accounts-2-summary").show();
    //     $("#add-options").show();
    //     $("#add-anchor-link-return").show();
    //     updateUserList();
    // });
    // $('#bank-accounts-2-edit-delete').click(function() {
    //     hideAll();
    //     $("#add-options").show();
    //     $("#add-anchor-link-start").show();
    //     bankAccount2Added = false;
    //     updateUserList();
    // });

    /* Bank account 1 end */

    /* BANK ACCOUNTS END */

// }); 

