var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");


myServiceRoot = __dirname;

app.use(cookieParser());

var serveIndex = require("serve-index");

app.set("port", process.env.PORT || 5000);

app.use(express.static(__dirname));

// views is directory for all template files



app.set("views", __dirname + "/views");
app.set("view engine", "ejs");



app.get('auth/:id', function (request, response) {
  response.render('auth/' + request.params.id);
});



console.log('i am THERE');


/*
/**
Print styles
*/
app.get("/print-feedback-received", function (request, response) {
  response.render("email/pages/print-feedback-received");
});
/*
/**
Emails
*/

app.get("/email-feedback-received", function (request, response) {
  response.render("email/pages/email-feedback-received");
});
app.get("/email-rego-success", function (request, response) {
  response.render("email/pages/email-rego-success");
});
app.get("/email-rego-fail-1", function (request, response) {
  response.render("email/pages/email-rego-fail-1");
});
app.get("/email-rego-fail-2", function (request, response) {
  response.render("email/pages/email-rego-fail-2");
});
app.get("/email-rego-fail-3", function (request, response) {
  response.render("email/pages/email-rego-fail-3");
});
app.get("/email-claim-submitted", function (request, response) {
  response.render("email/pages/email-claim-submitted");
});
app.get("/email-verification-code", function (request, response) {
  response.render("email/pages/email-verification-code");
});
app.get("/email-lsq-pilot", function (request, response) {
  response.render("email/pages/email-lsq-pilot");
});
app.get("/email-lsq-pilot-thanks", function (request, response) {
  response.render("email/pages/email-lsq-pilot-thanks");
});
app.get("/email-veteran-card-approved", function (request, response) {
  response.render("email/pages/email-veteran-card-approved");
});
app.get("/email-mental-health-approved", function (request, response) {
  response.render("email/pages/email-mental-health-approved");
});
app.get("/email-incap-submitted", function (request, response) {
  response.render("email/pages/email-incap-submitted");
});
app.get("/email-dva-expire-claim", function (request, response) {
  response.render("email/pages/email-dva-expire-claim");
});
/**
Unauthenticated space
*/

app.get("/", function (request, response) {
  response.render("unauth/index");
});
app.get("/medical-services", function (request, response) {
  response.render("unauth/medical-services");
});
app.get("/everyday-care", function (request, response) {
  response.render("unauth/everyday-care");
});
app.get("/career-guidance", function (request, response) {
  response.render("unauth/career-guidance");
});
app.get("/financial-support", function (request, response) {
  response.render("unauth/financial-support");
});
app.get("/family-and-counselling", function (request, response) {
  response.render("unauth/family-and-counselling");
});
app.get("/index-login-errors", function (request, response) {
  response.render("unauth/index-login-errors");
});

app.get("/change-password", function (request, response) {
  response.render("auth/change-password", {
    main_nav_active: "home"
  });
});

/**
Onboarding page
*/
app.get("/mygov-login", function (request, response) {
  response.render("auth/mygov-login");
});
app.get("/mygov-linking", function (request, response) {
  response.render("auth/mygov-linking");
});
app.get("/mygov-linked", function (request, response) {
  response.render("auth/mygov-linked");
});
app.get("/onboarding", function (request, response) {
  response.render("auth/onboarding");
});
app.get("/user-testing-stop", function (request, response) {
  response.render("global/user-testing-stop");
});
app.get("/user-testing-mygov-reg", function (request, response) {
  response.render("global/user-testing-mygov-reg");
});

/* Verify displays service history if DVA only */
app.get("/verify-details", function (request, response) {
  response.render("auth/verify-details");
});
app.get("/address", function (request, response) {
  response.render("auth/address");
});

/*
New registration flow for broadening
*/

app.get("/register", function (request, response) {
  response.render("unauth/registration/pages/register");
});
app.get("/register-alternate", function (request, response) {
  response.render("unauth/registration/pages/register-alternate");
});
app.get("/register-2", function (request, response) {
  response.render("unauth/registration/pages/register-2");
});
/* PMKeys only */
app.get("/register-3", function (request, response) {
  response.render("unauth/registration/pages/register-3");
});
app.get("/register-4", function (request, response) {
  response.render("unauth/registration/pages/register-4");
});
app.get("/register-5", function (request, response) {
  response.render("unauth/registration/pages/register-5");
});
app.get("/register-6", function (request, response) {
  response.render("unauth/registration/pages/register-6");
});
app.get("/register-7", function (request, response) {
  response.render("unauth/registration/pages/register-7");
});

app.get("/profile-history-pmkeys", function (request, response) {
  response.render("auth/profile-history-pmkeys");
});

app.get("/contactusscreen", function (request, response) {
  response.render("pages/contactusscreen");
});
app.get("/forgot-password-step1", function (request, response) {
  response.render("unauth/user/pages/forgot-password-step1");
});
app.get("/forgot-password-step1-and-2", function (request, response) {
  response.render("unauth/user/pages/forgot-password-step1-and-2");
});
app.get("/forgot-password-step2", function (request, response) {
  response.render("unauth/user/pages/forgot-password-step2");
});
app.get("/forgot-password-step3", function (request, response) {
  response.render("unauth/user/pages/forgot-password-step3");
});
app.get("/forgot-password-step4", function (request, response) {
  response.render("unauth/user/pages/forgot-password-step4");
});
app.get("/system-error", function (request, response) {
  response.render("unauth/system-error");
});
app.get("/not-found", function (request, response) {
  response.render("unauth/not-found");
});
app.get("/timeout", function (request, response) {
  response.render("unauth/timeout");
});

/**
  Authenticated space
*/
app.get("/auth", function (request, response) {
  response.render("auth/index", {
    main_nav_active: "home"
  });
});
app.get("/dragdrop", function (request, response) {
  response.render("auth/index-dragdrop", {
    main_nav_active: "home"
  });
});
app.get("/dashboard", function (request, response) {
  response.render("auth/index-dashboard", {
    main_nav_active: "home"
  });
});
// app.get("/index-claims", function (request, response) {
//   response.render("auth/index-claims", {
//     main_nav_active: "home"
//   });
// });


/* temporary only */
app.get("/index-claims-alt-icons", function (request, response) {
  response.render("auth/index-claims-alt-icons", {
    main_nav_active: "home"
  });
});
/* end temporary only */

app.get("/index-preloader", function (request, response) {
  response.render("auth/index-preloader");
});
app.get("/index-timeout", function (request, response) {
  response.render("auth/index-timeout", {
    main_nav_active: "home"
  });
});
app.get("/needs1", function (request, response) {
  response.render("auth/needs1");
});
app.get("/needs2", function (request, response) {
  response.render("auth/needs2");
});
app.get("/needs3", function (request, response) {
  response.render("auth/needs3");
});
app.get("/needs-success", function (request, response) {
  response.render("auth/needs-success");
});


/* New Veteran Pack Flows */

/* non-card holder flow */
app.get("/veteran-card", function (request, response) {
  response.render("auth/claim/pages/perm_reserve_ns_cfts/veteran-card", {
    main_nav_active: "home"
  });
});
app.get("/perm_reserve_ns_cfts", function (request, response) {
  response.render("auth/claim/pages/perm_reserve_ns_cfts/index", {
    main_nav_active: "home"
  });
});
app.get("/the-covenant-explained", function (request, response) {
  response.render("auth/claim/pages/perm_reserve_ns_cfts/the-covenant-explained", {
    main_nav_active: "home"
  });
});
app.get("/request-vet-recognition-package", function (request, response) {
  response.render("auth/claim/pages/perm_reserve_ns_cfts/request-vet-recognition-package", {
    main_nav_active: "home"
  });
});
app.get("/what-youll-get", function (request, response) {
  response.render("auth/claim/pages/perm_reserve_ns_cfts/what-youll-get", {
    main_nav_active: "home"
  });
});

app.get("/vet-bank-details", function (request, response) {
  response.render("auth/claim/pages/perm_reserve_ns_cfts/bank-details", {
    main_nav_active: "home"
  });
});

app.get("/review-and-submit", function (request, response) {
  response.render("auth/claim/pages/perm_reserve_ns_cfts/review-and-submit", {
    main_nav_active: "home"
  });
});

app.get("/approval", function (request, response) {
  response.render("auth/claim/pages/perm_reserve_ns_cfts/approval", {
    main_nav_active: "home"
  });
});

/* no card page */
app.get("/healthcard-none-vet-pack", function (request, response) {
  response.render("auth/healthcard/healthcard-no-card", {
    main_nav_active: "healthcard"
  });
});

/* vet_card_holder flow */

app.get("/vet_card_holder", function (request, response) {
  response.render("auth/claim/pages/vet_card_holder/index", {
    main_nav_active: "home"
  });
});
app.get("/the-covenant-explained-card", function (request, response) {
  response.render("auth/claim/pages/vet_card_holder/the-covenant-explained", {
    main_nav_active: "home"
  });
});

app.get("/review-and-submit-card", function (request, response) {
  response.render("auth/claim/pages/vet_card_holder/review-and-submit", {
    main_nav_active: "home"
  });
});

app.get("/approval-card", function (request, response) {
  response.render("auth/claim/pages/vet_card_holder/approval", {
    main_nav_active: "home"
  });
});

/* card page */
app.get("/healthcard-card-holder", function (request, response) {
  response.render("auth/healthcard/healthcard-has-card", {
    main_nav_active: "healthcard"
  });
});

/* end vet_card_holder flow */














/* reservist flow */
app.get("/veteran-card-reservist", function (request, response) {
  response.render("auth/claim/pages/reservist/veteran-card", {
    main_nav_active: "home"
  });
});
app.get("/reservist", function (request, response) {
  response.render("auth/claim/pages/reservist/index", {
    main_nav_active: "home"
  });
});
app.get("/the-covenant-explained-reservist", function (request, response) {
  response.render("auth/claim/pages/reservist/the-covenant-explained", {
    main_nav_active: "home"
  });
});
app.get("/request-vet-recognition-package-reservist", function (request, response) {
  response.render("auth/claim/pages/reservist/request-vet-recognition-package", {
    main_nav_active: "home"
  });
});
app.get("/what-youll-get-reservist", function (request, response) {
  response.render("auth/claim/pages/reservist/what-youll-get", {
    main_nav_active: "home"
  });
});

app.get("/vet-bank-details-reservist", function (request, response) {
  response.render("auth/claim/pages/reservist/bank-details", {
    main_nav_active: "home"
  });
});

app.get("/review-and-submit-reservist", function (request, response) {
  response.render("auth/claim/pagesreservist/review-and-submit", {
    main_nav_active: "home"
  });
});

app.get("/approval-reservist", function (request, response) {
  response.render("auth/claim/pages/perm_reserve_ns_cfts/approval", {
    main_nav_active: "home"
  });
});

/* no card page */
app.get("/healthcard-reservist", function (request, response) {
  response.render("auth/healthcard/healthcard-reservist", {
    main_nav_active: "healthcard"
  });
});

/* non_card_pmkeys flow */
app.get("/veteran-card-non_card_pmkeys", function (request, response) {
  response.render("auth/claim/pages/non_card_pmkeys/veteran-card", {
    main_nav_active: "home"
  });
});
app.get("/non_card_pmkeys", function (request, response) {
  response.render("auth/claim/pages/non_card_pmkeys/index", {
    main_nav_active: "home"
  });
});
app.get("/the-covenant-explained-non_card_pmkeys", function (request, response) {
  response.render("auth/claim/pages/non_card_pmkeys/the-covenant-explained", {
    main_nav_active: "home"
  });
});
app.get("/request-vet-recognition-package-non_card_pmkeys", function (request, response) {
  response.render("auth/claim/pages/non_card_pmkeys/request-vet-recognition-package", {
    main_nav_active: "home"
  });
});

app.get("/review-and-submit-non_card_pmkeys", function (request, response) {
  response.render("auth/claim/pages/non_card_pmkeys/review-and-submit", {
    main_nav_active: "home"
  });
});

app.get("/approval-non_card_pmkeys", function (request, response) {
  response.render("auth/claim/pages/non_card_pmkeys/approval", {
    main_nav_active: "home"
  });
});

/* no card page */
app.get("/healthcard-non_card_pmkeys", function (request, response) {
  response.render("auth/healthcard/healthcard-non_card_pmkeys", {
    main_nav_active: "healthcard"
  });
});

/* Separate profile screens */
app.get("/profile-account", function (request, response) {
  response.render("auth/profile-account", {
    main_nav_active: "profile"
  });
});
app.get("/profile-payment", function (request, response) {
  response.render("auth/profile-payment", {
    main_nav_active: "profile"
  });
});
app.get("/profile-contact", function (request, response) {
  response.render("auth/profile-contact", {
    main_nav_active: "profile"
  });
});

app.get("/profile-contact-2", function (request, response) {
  response.render("auth/profile-contact-2", {
    main_nav_active: "profile"
  });
});

app.get("/222", function (request, response) {
  response.render("auth/profile-contact", {
    main_nav_active: "my-profile"
  });
});

app.get("/profile-history", function (request, response) {
  response.render("auth/profile-history", {
    main_nav_active: "profile"
  });
});
app.get("/profile-history-1", function (request, response) {
  response.render("auth/profile-history-1", {
    main_nav_active: "profile"
  });
});
app.get("/profile-history-2", function (request, response) {
  response.render("auth/profile-history-2", {
    main_nav_active: "profile"
  });
});

app.get("/profile-relationships", function (request, response) {
  response.render("auth/profile-relationships", {
    main_nav_active: "profile"
  });
});
app.get("/profile-relationships-none", function (request, response) {
  response.render("auth/profile-relationships-none", {
    main_nav_active: "profile"
  });
});

app.get("/profile-assets", function (request, response) {
  response.render("auth/profile-assets", {
    main_nav_active: "profile"
  });
});
app.get("/profile-farm", function (request, response) {
  response.render("auth/profile-farm");
});
app.get("/profile-financial-other", function (request, response) {
  response.render("auth/profile-financial-other");
});
app.get("/profile-assets-added", function (request, response) {
  response.render("auth/profile-assets-added");
});
app.get("/profile-service-details", function (request, response) {
  response.render("auth/profile-service-details");
});
app.get("/service-history", function (request, response) {
  response.render("auth/service-history");
});
app.get("/service-period-1", function (request, response) {
  response.render("auth/service-period-1");
});
app.get("/service-period-2", function (request, response) {
  response.render("auth/service-period-2");
});
app.get("/service-period-3", function (request, response) {
  response.render("auth/service-period-3");
});

/* Change email flow */
app.get("/change-email-poi", function (request, response) {
  response.render("auth/change-email-poi");
});
app.get("/change-email", function (request, response) {
  response.render("auth/change-email");
});
app.get("/change-email-enter-code", function (request, response) {
  response.render("auth/change-email-enter-code");
});
app.get("/change-email-login", function (request, response) {
  response.render("auth/change-email-login");
});

/*
  Staff space
*/
app.get("/staff", function (request, response) {
  response.render("staff/index");
});

/* Old single screen profile */
app.get("/profile", function (request, response) {
  response.render("auth/profile", {
    main_nav_active: "profile"
  });
});
app.get("/profile-new", function (request, response) {
  response.render("auth/profile-new", {
    main_nav_active: "profile"
  });
});
app.get("/profile-password", function (request, response) {
  response.render("auth/profile-password");
});
app.get("/profile-updated", function (request, response) {
  response.render("auth/profile-updated", {
    main_nav_active: "profile"
  });
});
// app.get('/change-password', function (request, response) {
//   response.render('auth/change-password');
// });
app.get("/profile-password-updated", function (request, response) {
  response.render("auth/profile-password-updated");
});
app.get("/terms-and-conditions", function (request, response) {
  response.render("global/pages/terms-and-conditions");
});

app.get("/index-password-updated", function (request, response) {
  response.render("auth/index-password-updated");
});


//feedback page

app.get("/panel-feedback", function (request, response) {
  response.render("auth/claim/pages/panel-feedback");
});
app.get("/panel-feedbacksubmitting", function (request, response) {
  response.render("auth/claim/pages/panel-feedbacksubmitting");
});

/* Claims Page */
app.get("/claims", function (request, response) {
  response.render("auth/claim/pages/claims", {
    main_nav_active: "claims"
  });
});
app.get("/claims-new", function (request, response) {
  response.render("auth/claim/pages/claims-new", {
    main_nav_active: "home"
  });
});
app.get("/fluid-div-example", function (request, response) {
  response.render("auth/claim/pages/fluid-div-example", {
    main_nav_active: "claims"
  });
});
app.get("/claims-old", function (request, response) {
  response.render("auth/claim/pages/claims-old", {
    main_nav_active: "claims"
  });
});
app.get("/claims-manage", function (request, response) {
  response.render("auth/claim/pages/claims-manage", {
    main_nav_active: "claims"
  });
});
app.get("/claims-make", function (request, response) {
  response.render("auth/claim/pages/claims-make", {
    main_nav_active: "claims"
  });
});

/* Payments */
app.get("/payments", function (request, response) {
  response.render("auth/payments/pages/payments", {
    main_nav_active: "payments"
  });
});

app.get("/payments-1", function (request, response) {
  response.render("auth/payments/pages/payments-1", {
    main_nav_active: "payments"
  });
});

app.get("/auth/travel", function (request, response) {
  response.render("auth/travel/travel-home", {
    main_nav_active: "travel"
  });
});
app.get("/travel-expense-start", function (request, response) {
  response.render("auth/travel/pages/travel-expense-start");
});
app.get("/travel-expense-old", function (request, response) {
  response.render("auth/travel/pages/travel-expense-old");
});
app.get("/travel-expense1", function (request, response) {
  response.render("auth/travel/pages/travel-expense1");
});
app.get("/travel-expense2", function (request, response) {
  response.render("auth/travel/pages/travel-expense2");
});
app.get("/travel-expense3", function (request, response) {
  response.render("auth/travel/pages/travel-expense3");
});
app.get("/travel-expense-medical", function (request, response) {
  response.render("auth/travel/pages/travel-expense-medical");
});
app.get("/test-addanother", function (request, response) {
  response.render("auth/travel/pages/test-addanother");
});
app.get("/claims-neverserved", function (request, response) {
  response.render("auth/claim/pages/claims-neverserved", {
    main_nav_active: "claims"
  });
});
app.get("/claims-existingnlhc", function (request, response) {
  response.render("auth/claim/pages/claims-existingnlhc", {
    main_nav_active: "claims"
  });
});
app.get("/claims-existingnlhc-nostudentpayments", function (request, response) {
  response.render("auth/claim/pages/claims-existingnlhc-nostudentpayments", {
    main_nav_active: "claims"
  });
});
app.get("/claims-nostudentpayments", function (request, response) {
  response.render("auth/claim/pages/claims-nostudentpayments", {
    main_nav_active: "claims"
  });
});

/* Claims Page 2? */
app.get("/claims2", function (request, response) {
  response.render("auth/claims", {
    main_nav_active: "claims"
  });
});

/* Incap Claim Pages */
app.get("/incap-start", function (request, response) {
  response.render("auth/claim/pages/incap-start", {
    main_nav_active: "claims"
  });
});

app.get("/incap-resume", function (request, response) {
  response.render("auth/claim/pages/incap-resume", {
    main_nav_active: "claims"
  });
});

app.get("/incap-progress", function (request, response) {
  response.render("auth/claim/pages/incap-progress", {
    main_nav_active: "claims"
  });
});
app.get("/incap-progress-b", function (request, response) {
  response.render("auth/claim/pages/incap-progress-b", {
    main_nav_active: "claims"
  });
});
app.get("/incap-progress-c", function (request, response) {
  response.render("auth/claim/pages/incap-progress-c", {
    main_nav_active: "claims"
  });
});
app.get("/incap-progress-d", function (request, response) {
  response.render("auth/claim/pages/incap-progress-d", {
    main_nav_active: "claims"
  });
});
app.get("/incap-progress-e", function (request, response) {
  response.render("auth/claim/pages/incap-progress-e", {
    main_nav_active: "claims"
  });
});
app.get("/incap-a-1", function (request, response) {
  response.render("auth/claim/pages/incap-a-1", {
    main_nav_active: "claims"
  });
});
app.get("/incap-a-2", function (request, response) {
  response.render("auth/claim/pages/incap-a-2", {
    main_nav_active: "claims"
  });
});
app.get("/incap-b-1", function (request, response) {
  response.render("auth/claim/pages/incap-b-1", {
    main_nav_active: "claims"
  });
});
app.get("/incap-b-2", function (request, response) {
  response.render("auth/claim/pages/incap-b-2", {
    main_nav_active: "claims"
  });
});
app.get("/incap-b-3", function (request, response) {
  response.render("auth/claim/pages/incap-b-3", {
    main_nav_active: "claims"
  });
});
app.get("/incap-b-4", function (request, response) {
  response.render("auth/claim/pages/incap-b-4", {
    main_nav_active: "claims"
  });
});
app.get("/incap-b-5", function (request, response) {
  response.render("auth/claim/pages/incap-b-5", {
    main_nav_active: "claims"
  });
});
app.get("/incap-b-6", function (request, response) {
  response.render("auth/claim/pages/incap-b-6", {
    main_nav_active: "claims"
  });
});
app.get("/incap-b-7", function (request, response) {
  response.render("auth/claim/pages/incap-b-7", {
    main_nav_active: "claims"
  });
});
app.get("/incap-c-1", function (request, response) {
  response.render("auth/claim/pages/incap-c-1", {
    main_nav_active: "claims"
  });
});
app.get("/incap-review", function (request, response) {
  response.render("auth/claim/pages/incap-review", {
    main_nav_active: "claims"
  });
});
app.get("/incap-submitted", function (request, response) {
  response.render("auth/claim/pages/incap-submitted", {
    main_nav_active: "claims"
  });
});
app.get("/incap-docupload", function (request, response) {
  response.render("auth/claim/pages/incap-docupload", {
    main_nav_active: "claims"
  });
});
app.get("/incap-summary", function (request, response) {
  response.render("auth/claim/pages/incap-summary", {
    main_nav_active: "claims"
  });
});

app.get("/incap-ineligible", function (request, response) {
  response.render("auth/claim/pages/incap-ineligible", {
    main_nav_active: "claims"
  });
});




/* Start of Incap Annual Review Ongoing */

// Start/Progress pages
app.get('/incap-annual-progress-a', function (request, response) {
  response.render('auth/claim/pages/incap-annual-progress-a', {
    main_nav_active: 'claims'
  });
});
app.get("/incap-annual-progress-b", function (request, response) {
  response.render("auth/claim/pages/incap-annual-progress-b", {
    main_nav_active: "claims"
  });
});
app.get("/incap-annual-progress-c", function (request, response) {
  response.render("auth/claim/pages/incap-annual-progress-c", {
    main_nav_active: "claims"
  });
});
// End of Start/Progress pages

// Checkboxes page (part a)
app.get('/incap-annual-part-a', function (request, response) {
  response.render('auth/claim/pages/incap-annual-review-part-a', {
    main_nav_active: 'claims'
  });
});

// Flow pages (part b)
//    Employment
app.get('/incap-annual-part-b-1', function (request, response) {
  response.render('auth/claim/pages/incap-annual-review-part-b-1', {
    main_nav_active: 'claims'
  });
});

//    Medical Practitioners
app.get('/incap-annual-part-b-2', function (request, response) {
  response.render('auth/claim/pages/incap-annual-review-part-b-2', {
    main_nav_active: 'claims'
  });
});

//    Rehabilitation
app.get('/incap-annual-part-b-3', function (request, response) {
  response.render('auth/claim/pages/incap-annual-review-part-b-3', {
    main_nav_active: 'claims'
  });
});

//    Other Benefits
app.get('/incap-annual-part-b-4', function (request, response) {
  response.render('auth/claim/pages/incap-annual-review-part-b-4', {
    main_nav_active: 'claims'
  });
});

// Nominated Representative
app.get('/incap-annual-part-b-5', function (request, response) {
  response.render('auth/claim/pages/incap-annual-review-part-b-5', {
    main_nav_active: 'claims'
  });
});

//    Bank Details
app.get('/incap-annual-part-b-6', function (request, response) {
  response.render('auth/claim/pages/incap-annual-review-part-b-6', {
    main_nav_active: 'claims'
  });
});

//    Compensation Damages Action
app.get('/incap-annual-part-b-7', function (request, response) {
  response.render('auth/claim/pages/incap-annual-review-part-b-7', {
    main_nav_active: 'claims'
  });
});
// End of Flow pages (part b)

// Uploads page (part c)
app.get('/incap-annual-part-c', function (request, response) {
  response.render('auth/claim/pages/incap-annual-review-part-c', {
    main_nav_active: 'claims'
  });
});

// Summary page
app.get('/incap-annual-part-c', function (request, response) {
  response.render('auth/claim/pages/incap-annual-review-part-c', {
    main_nav_active: 'claims'
  });
});

// Submitted page
app.get('/incap-annual-part-c', function (request, response) {
  response.render('auth/claim/pages/incap-annual-review-part-c', {
    main_nav_active: 'claims'
  });
});

/* End of Incap Annual Review Ongoing */






/* Service pension claim */
app.get("/sp-before-start", function (request, response) {
  response.render("auth/claim/pages/sp-before-start", {
    main_nav_active: "claims"
  });
});
app.get("/sp-progress", function (request, response) {
  response.render("auth/claim/pages/sp-progress", {
    main_nav_active: "claims"
  });
});
app.get("/sp-representative", function (request, response) {
  response.render("auth/claim/pages/sp-representative", {
    main_nav_active: "claims"
  });
});
app.get("/sp-progress-a", function (request, response) {
  response.render("auth/claim/pages/sp-progress-a", {
    main_nav_active: "claims"
  });
});
app.get("/sp-progress-b", function (request, response) {
  response.render("auth/claim/pages/sp-progress-b", {
    main_nav_active: "claims"
  });
});
app.get("/sp-progress-c", function (request, response) {
  response.render("auth/claim/pages/sp-progress-c", {
    main_nav_active: "claims"
  });
});
app.get("/sp-progress-d", function (request, response) {
  response.render("auth/claim/pages/sp-progress-d", {
    main_nav_active: "claims"
  });
});
app.get("/sp-progress-finish", function (request, response) {
  response.render("auth/claim/pages/sp-progress-finish", {
    main_nav_active: "claims"
  });
});
app.get("/sp-documents", function (request, response) {
  response.render("auth/claim/pages/sp-documents", {
    main_nav_active: "claims"
  });
});
app.get("/sp-residency", function (request, response) {
  response.render("auth/claim/pages/sp-residency", {
    main_nav_active: "claims"
  });
});

app.get("/sp-residency-new", function (request, response) {
  response.render("auth/claim/pages/sp-residency-new", {
    main_nav_active: "claims"
  });
});

app.get("/sp-residency-partner", function (request, response) {
  response.render("auth/claim/pages/sp-residency-partner", {
    main_nav_active: "claims"
  });
});
app.get("/sp-start", function (request, response) {
  response.render("auth/claim/pages/sp-start", {
    main_nav_active: "claims"
  });
});
app.get("/sp-qs", function (request, response) {
  response.render("auth/claim/pages/sp-qs", {
    main_nav_active: "claims"
  });
});
app.get("/sp-qs-about", function (request, response) {
  response.render("auth/claim/pages/sp-qs-about", {
    main_nav_active: "claims"
  });
});
app.get("/sp-qs-review", function (request, response) {
  response.render("auth/claim/pages/sp-qs-review", {
    main_nav_active: "claims"
  });
});
app.get("/sp-review", function (request, response) {
  response.render("auth/claim/pages/sp-review", {
    main_nav_active: "claims"
  });
});
app.get("/sp-review-income-assets", function (request, response) {
  response.render("auth/claim/pages/sp-review-income-assets", {
    main_nav_active: "claims"
  });
});
app.get("/sp-submitted", function (request, response) {
  response.render("auth/claim/pages/sp-submitted", {
    main_nav_active: "claims"
  });
});
app.get("/sp-my-details", function (request, response) {
  response.render("auth/claim/pages/sp-my-details", {
    main_nav_active: "claims"
  });
});
app.get("/viewServicePensionDetail", function (request, response) {
  response.render("auth/claim/pages/viewServicePensionDetail", {
    main_nav_active: "claims"
  });
});
app.get("/sp-partner", function (request, response) {
  response.render("auth/claim/pages/sp-partner", {
    main_nav_active: "claims"
  });
});
app.get("/sp-dependant", function (request, response) {
  response.render("auth/claim/pages/sp-dependant", {
    main_nav_active: "claims"
  });
});
app.get("/sp-la", function (request, response) {
  response.render("auth/claim/pages/sp-la", {
    main_nav_active: "claims"
  });
});
app.get("/sp-claim-contact", function (request, response) {
  response.render("auth/claim/pages/sp-claim-contact", {
    main_nav_active: "claims"
  });
});
app.get("/sp-other-claims", function (request, response) {
  response.render("auth/claim/pages/sp-other-claims", {
    main_nav_active: "claims"
  });
});
app.get("/sp-medical", function (request, response) {
  response.render("auth/claim/pages/sp-medical", {
    main_nav_active: "claims"
  });
});
app.get("/sp-payment-details", function (request, response) {
  response.render("auth/claim/pages/sp-payment-details", {
    main_nav_active: "claims"
  });
});
app.get("/sp-bank-details", function (request, response) {
  response.render("auth/claim/pages/sp-bank-details", {
    main_nav_active: "claims"
  });
});
// app.get('/sp-financial-details', function (request, response) {
//   response.render('auth/claim/pages/sp-financial-details', {
//     main_nav_active: 'claims'
//   });
// });
// app.get('/sp-c4-income', function (request, response) {
//   response.render('auth/claim/pages/sp-c4-income', {
//     main_nav_active: 'claims'
//   });
// });

//Service history

app.get("/service-history-start", function (request, response) {
  response.render("auth/claim/pages/service-history-start", {
    main_nav_active: "claims"
  });
});

app.get("/service-history-about", function (request, response) {
  response.render("auth/claim/pages/service-history-about", {
    main_nav_active: "claims"
  });
});
app.get("/service-history-content", function (request, response) {
  response.render("auth/claim/pages/service-history-content", {
    main_nav_active: "claims"
  });
});
app.get("/service-history-review", function (request, response) {
  response.render("auth/claim/pages/service-history-review", {
    main_nav_active: "claims"
  });
});
app.get("/service-history-documents", function (request, response) {
  response.render("auth/claim/pages/service-history-documents", {
    main_nav_active: "claims"
  });
});
app.get("/service-history-submitted", function (request, response) {
  response.render("auth/claim/pages/service-history-submitted", {
    main_nav_active: "claims"
  });
});
app.get("/viewQSDetails", function (request, response) {
  response.render("auth/claim/pages/viewQSDetails", {
    main_nav_active: "claims"
  });
});

/* Civilian qs */

app.get("/civilian-qs-1", function (request, response) {
  response.render("auth/claim/pages/civilian-qs-1", {
    main_nav_active: "claims"
  });
});
app.get("/civilian-qs-review", function (request, response) {
  response.render("auth/claim/pages/civilian-qs-review", {
    main_nav_active: "claims"
  });
});
app.get("/civilian-qs-submit", function (request, response) {
  response.render("auth/claim/pages/civilian-qs-submit", {
    main_nav_active: "claims"
  });
});

/* -- */

app.get("/sp-c0", function (request, response) {
  response.render("auth/claim/pages/sp-c0", {
    main_nav_active: "claims"
  });
});
app.get("/sp-c1", function (request, response) {
  response.render("auth/claim/pages/sp-c1", {
    main_nav_active: "claims"
  });
});
app.get("/sp-c1-alt", function (request, response) {
  response.render("auth/claim/pages/sp-c1-alt", {
    main_nav_active: "claims"
  });
});
app.get("/sp-c2", function (request, response) {
  response.render("auth/claim/pages/sp-c2", {
    main_nav_active: "claims"
  });
});
app.get("/sp-c2-alt", function (request, response) {
  response.render("auth/claim/pages/sp-c2-alt", {
    main_nav_active: "claims"
  });
});
app.get("/sp-c2-vehicle-1", function (request, response) {
  response.render("auth/claim/pages/sp-c2-vehicle-1", {
    main_nav_active: "claims"
  });
});
app.get("/sp-c2-modal", function (request, response) {
  response.render("auth/claim/pages/sp-c2-modal", {
    main_nav_active: "claims"
  });
});
app.get("/sp-c2", function (request, response) {
  response.render("auth/claim/pages/sp-c2", {
    main_nav_active: "claims"
  });
});
app.get("/sp-c3", function (request, response) {
  response.render("auth/claim/pages/sp-c3", {
    main_nav_active: "claims"
  });
});
app.get("/sp-c4", function (request, response) {
  response.render("auth/claim/pages/sp-c4", {
    main_nav_active: "claims"
  });
});
app.get("/sp-c5", function (request, response) {
  response.render("auth/claim/pages/sp-c5", {
    main_nav_active: "claims"
  });
});
app.get("/sp-c6", function (request, response) {
  response.render("auth/claim/pages/sp-c6", {
    main_nav_active: "claims"
  });
});
app.get("/sp-c7", function (request, response) {
  response.render("auth/claim/pages/sp-c7", {
    main_nav_active: "claims"
  });
});
app.get("/sp-required-documents", function (request, response) {
  response.render("auth/claim/pages/sp-required-documents", {
    main_nav_active: "claims"
  });
});
app.get("/sp-nominated-rep", function (request, response) {
  response.render("auth/claim/pages/sp-nominated-rep", {
    main_nav_active: "claims"
  });
});

/* Broadened claim flow */
app.get("/claim1", function (request, response) {
  response.render("auth/claim/pages/claim1");
});
app.get("/claim2", function (request, response) {
  response.render("auth/claim/pages/claim2");
});
app.get("/claim2a", function (request, response) {
  response.render("auth/claim/pages/claim2a");
});
app.get("/claim3", function (request, response) {
  response.render("auth/claim/pages/claim3");
});
app.get("/claim4", function (request, response) {
  response.render("auth/claim/pages/claim4");
});
app.get("/claim5", function (request, response) {
  response.render("auth/claim/pages/claim5");
});
app.get("/claim6", function (request, response) {
  response.render("auth/claim/pages/claim6");
});
app.get("/claim7", function (request, response, next) {
  response.render("auth/claim/pages/claim7");
});
app.get("/claim8", function (request, response, next) {
  var claimTypeCookie = request.cookies.claimType;
  // Cookies that have not been signed
  console.log("Cookies: ", request.cookies);

  response.locals.claimType = claimTypeCookie;
  response.render("auth/claim/pages/claim8");
});

app.get("/nlhc-start", function (request, response, next) {
  response.render("auth/claim/pages/nlhc-start");
});

/* Student assistance flow */
app.get("/studentpreeligibility", function (request, response) {
  response.render("auth/claim/pages/studentpreeligibility");
});
app.get("/studentclaim1", function (request, response) {
  response.render("auth/claim/pages/studentclaim1");
});
app.get("/studentclaim1a", function (request, response) {
  response.render("auth/claim/pages/studentclaim1a");
});
app.get("/studentclaim2", function (request, response) {
  response.render("auth/claim/pages/studentclaim2");
});
app.get("/studentclaim3", function (request, response) {
  response.render("auth/claim/pages/studentclaim3");
});
app.get("/studentclaim4", function (request, response) {
  response.render("auth/claim/pages/studentclaim4");
});
app.get("/studentclaim4a", function (request, response) {
  response.render("auth/claim/pages/studentclaim4a");
});
app.get("/studentclaim5", function (request, response) {
  response.render("auth/claim/pages/studentclaim5");
});
app.get("/studentclaim6", function (request, response) {
  response.render("auth/claim/pages/studentclaim6");
});
app.get("/studentclaimupload", function (request, response) {
  response.render("auth/claim/pages/studentclaimupload");
});
app.get("/viewClaimDetailStudent", function (request, response) {
  response.render("auth/claim/pages/viewClaimDetailStudent");
});
app.get("/viewClaimRejected", function (request, response) {
  response.render("auth/claim/pages/viewClaimRejected");
});
app.get("/index-claimsstudent", function (request, response) {
  response.render("auth/index-claimsstudent");
});
app.get("/viewClaimWithdrawn", function (request, response) {
  response.render("auth/claim/pages/viewClaimWithdrawn");
});
app.get("/viewClaimInProgress", function (request, response) {
  response.render("auth/claim/pages/viewClaimInProgress");
});
app.get("/updateClaimInProgress", function (request, response) {
  response.render("auth/claim/pages/updateClaimInProgress");
});
app.get("/updateClaimInProgressSubmitting", function (request, response) {
  response.render("auth/claim/pages/updateClaimInProgressSubmitting");
});

/* Student assistance flow */
app.get("/student-assistance-landing", function (request, response) {
  response.render("auth/claim/pages/student-assistance-landing");
});
app.get("/studentclaim1", function (request, response) {
  response.render("auth/claim/pages/studentclaim1");
});
app.get("/studentclaim2", function (request, response) {
  response.render("auth/claim/pages/studentclaim2");
});
app.get("/studentclaim3", function (request, response) {
  response.render("auth/claim/pages/studentclaim3");
});
app.get("/studentclaim4", function (request, response) {
  response.render("auth/claim/pages/studentclaim4");
});
app.get("/studentclaim5", function (request, response) {
  response.render("auth/claim/pages/studentclaim5");
});
app.get("/studentclaim6", function (request, response) {
  response.render("auth/claim/pages/studentclaim6");
});
app.get("/viewClaimDetailStudent", function (request, response) {
  response.render("auth/claim/pages/viewClaimDetailStudent");
});
app.get("/index-claimsstudent", function (request, response) {
  response.render("auth/index-claimsstudent");
});

/* Permanent impairment */
app.get("/pi-lsq-pilot", function (request, response) {
  response.render("auth/claim/pages/pi-lsq-pilot");
});
app.get("/pi-lsq-start", function (request, response) {
  response.render("auth/claim/pages/pi-lsq-start");
});
app.get("/pi-lsq-claim1", function (request, response) {
  response.render("auth/claim/pages/pi-lsq-claim1");
});
app.get("/pi-lsq-claim2", function (request, response) {
  response.render("auth/claim/pages/pi-lsq-claim2");
});
app.get("/pi-lsq-claim3", function (request, response) {
  response.render("auth/claim/pages/pi-lsq-claim3");
});
app.get("/pi-lsq-claim4", function (request, response) {
  response.render("auth/claim/pages/pi-lsq-claim4");
});
app.get("/pi-lsq-claim5", function (request, response) {
  response.render("auth/claim/pages/pi-lsq-claim5");
});
app.get("/pi-lsq-claim6", function (request, response) {
  response.render("auth/claim/pages/pi-lsq-claim6");
});
app.get("/pi-lsq-claim6b", function (request, response) {
  response.render("auth/claim/pages/pi-lsq-claim6b");
});
app.get("/pi-lsq-claim7", function (request, response) {
  response.render("auth/claim/pages/pi-lsq-claim7");
});
app.get("/pi-lsq-claim7b", function (request, response) {
  response.render("auth/claim/pages/pi-lsq-claim7b");
});
app.get("/viewPI-LSQ-detail", function (request, response) {
  response.render("auth/claim/pages/viewPI-LSQ-detail");
});
app.get("/viewPI-LSQ-detailb", function (request, response) {
  response.render("auth/claim/pages/viewPI-LSQ-detailb");
});

/* LSQ Pilot alternative progress bar */

app.get("/pi-lsq-claim1c", function (request, response) {
  response.render("auth/claim/pages/pi-lsq-claim1c");
});
app.get("/pi-lsq-claim2c", function (request, response) {
  response.render("auth/claim/pages/pi-lsq-claim2c");
});
app.get("/pi-lsq-claim3c", function (request, response) {
  response.render("auth/claim/pages/pi-lsq-claim3c");
});
app.get("/pi-lsq-claim4c", function (request, response) {
  response.render("auth/claim/pages/pi-lsq-claim4c");
});
app.get("/pi-lsq-claim5c", function (request, response) {
  response.render("auth/claim/pages/pi-lsq-claim5c");
});
app.get("/pi-lsq-claim6c", function (request, response) {
  response.render("auth/claim/pages/pi-lsq-claim6c");
});

/* Disability pension AFI (application for increase) */
app.get("/afi-start", function (request, response) {
  response.render("auth/claim/pages/afi-start");
});
app.get("/afi-claim1", function (request, response) {
  response.render("auth/claim/pages/afi-claim1");
});
app.get("/afi-claim2", function (request, response) {
  response.render("auth/claim/pages/afi-claim2");
});
app.get("/afi-claim3", function (request, response) {
  response.render("auth/claim/pages/afi-claim3");
});
app.get("/afi-submitted", function (request, response) {
  response.render("auth/claim/pages/afi-submitted");
});
app.get("/afi-claimdetail", function (request, response) {
  response.render("auth/claim/pages/viewAFIClaimDetail");
});

/* DHOAS Subsidy certificate */
app.get("/dhoas-start", function (request, response) {
  response.render("auth/claim/pages/dhoas-start");
});
app.get("/dhoas1", function (request, response) {
  response.render("auth/claim/pages/dhoas1");
});
app.get("/dhoas2", function (request, response) {
  response.render("auth/claim/pages/dhoas2");
});
app.get("/dhoas2b", function (request, response) {
  response.render("auth/claim/pages/dhoas2b");
});
app.get("/dhoas3", function (request, response) {
  response.render("auth/claim/pages/dhoas3");
});
app.get("/dhoas4", function (request, response) {
  response.render("auth/claim/pages/dhoas4");
});
app.get("/dhoas5", function (request, response) {
  response.render("auth/claim/pages/dhoas5");
});

app.get("/dhoas-review", function (request, response) {
  response.render("auth/claim/pages/dhoas-review");
});
app.get("/dhoas-submitted", function (request, response) {
  response.render("auth/claim/pages/dhoas-submitted");
});
app.get("/viewDhoasDetail", function (request, response) {
  response.render("auth/claim/pages/viewDhoasDetail");
});
app.get("/dhoas-terms-and-conditions", function (request, response) {
  response.render("global/pages/dhoas-terms-and-conditions");
});

/* Qualifying Service */
app.get("/qs-claimdetail", function (request, response) {
  response.render("auth/claim/pages/viewQSClaimDetail");
});

/* Mental health treatment path */
app.get("/health-card0", function (request, response) {
  response.render("auth/claim/pages/health-card0");
});
app.get("/health-card1", function (request, response) {
  response.render("auth/claim/pages/health-card1");
});
app.get("/health-card2", function (request, response) {
  response.render("auth/claim/pages/health-card2");
});
app.get("/health-card3", function (request, response) {
  response.render("auth/claim/pages/health-card3");
});
app.get("/health-card4", function (request, response) {
  response.render("auth/claim/pages/health-card4");
});
app.get("/health-card-blocker", function (request, response) {
  response.render("auth/claim/pages/health-card-blocker");
});

app.get("/viewClaimDetail", function (request, response) {
  response.render("auth/claim/pages/viewClaimDetail");
});
app.get("/viewNLHCClaimDetail", function (request, response) {
  response.render("auth/claim/pages/viewNLHCClaimDetail");
});

/* Veteran card */
app.get("/healthcard-provisional", function (request, response) {
  response.render("auth/claim/pages/veterancard/healthcard-provisional", {
    main_nav_active: "claims"
  });
});
app.get("/veteran-card-eligibility", function (request, response) {
  response.render("auth/claim/pages/veteran-card-eligibility", {
    main_nav_active: "claims"
  });
});
app.get("/veteran-card-start", function (request, response) {
  response.render("auth/claim/pages/veterancard/veteran-card-start", {
    main_nav_active: "claims"
  });
});
app.get("/veteran-card-payment", function (request, response) {
  response.render("auth/claim/pages/veterancard/veteran-card-payment", {
    main_nav_active: "claims"
  });
});
app.get("/veteran-card-review-submit", function (request, response) {
  response.render("auth/claim/pages/veterancard/veteran-card-review-submit", {
    main_nav_active: "claims"
  });
});

app.get("/veteran-card-service-history", function (request, response) {
  response.render("auth/claim/pages/veterancard/veteran-card-service-history", {
    main_nav_active: "claims"
  });
});
app.get("/veteran-card-submitted", function (request, response) {
  response.render("auth/claim/pages/veterancard/veteran-card-submitted", {
    main_nav_active: "claims"
  });
});
app.get("/veteran-card-no-card", function (request, response) {
  response.render("auth/claim/pages/veterancard/veteran-card-no-card", {
    main_nav_active: "healthcard"
  });
});

app.get("/veteran-card-1", function (request, response) {
  response.render("auth/claim/pages/veteran-card-1", {
    main_nav_active: "claims"
  });
});
app.get("/veteran-card-2", function (request, response) {
  response.render("auth/claim/pages/veteran-card-2", {
    main_nav_active: "claims"
  });
});
app.get("/veteran-card-review", function (request, response) {
  response.render("auth/claim/pages/veteran-card-review", {
    main_nav_active: "claims"
  });
});
app.get("/veteran-card-submitted", function (request, response) {
  response.render("auth/claim/pages/veteran-card-submitted", {
    main_nav_active: "claims"
  });
});
app.get("/veteran-card-summary", function (request, response) {
  response.render("auth/claim/pages/veteran-card-summary");
});

/* New NLHC */
app.get("/mental-health-eligibility", function (request, response) {
  response.render("auth/claim/pages/mental-health-eligibility", {
    main_nav_active: "claims"
  });
});
app.get("/mental-health-1", function (request, response) {
  response.render("auth/claim/pages/mental-health-1", {
    main_nav_active: "claims"
  });
});
app.get("/mental-health-2", function (request, response) {
  response.render("auth/claim/pages/mental-health-2", {
    main_nav_active: "claims"
  });
});
app.get("/mental-health-review", function (request, response) {
  response.render("auth/claim/pages/mental-health-review", {
    main_nav_active: "claims"
  });
});
app.get("/mental-health-submitted", function (request, response) {
  response.render("auth/claim/pages/mental-health-submitted", {
    main_nav_active: "claims"
  });
});
app.get("/mental-health-summary", function (request, response) {
  response.render("auth/claim/pages/mental-health-summary");
});

/* Health card */
app.get("/healthcard-home", function (request, response) {
  response.render("auth/healthcard/healthcard-home", {
    main_nav_active: "healthcard"
  });
});
app.get("/healthcard-gold", function (request, response) {
  response.render("auth/healthcard/healthcard-gold", {
    main_nav_active: "healthcard"
  });
});
app.get("/healthcard-nlhc", function (request, response) {
  response.render("auth/healthcard/healthcard-nlhc", {
    main_nav_active: "healthcard"
  });
});
app.get("/healthcard-none", function (request, response) {
  response.render("auth/healthcard/healthcard-none", {
    main_nav_active: "healthcard"
  });
});

app.get("/healthcard-replacement", function (request, response) {
  response.render("auth/claim/pages/healthcard-replacement", {
    main_nav_active: "healthcard"
  });
});
app.get("/healthcard-replacement-success", function (request, response) {
  response.render("auth/claim/pages/healthcard-replacement-success", {
    main_nav_active: "healthcard"
  });
});
app.get("/healthcard-replacement-fail", function (request, response) {
  response.render("auth/claim/pages/healthcard-replacement-fail", {
    main_nav_active: "healthcard"
  });
});

// Lump sum advance payment claim

app.get("/payments", function (request, response) {
  response.render("auth/claim/pages/payments", {
    main_nav_active: "lsa"
  });
});
app.get("/lump-sum-advance-request", function (request, response) {
  response.render("auth/claim/pages/lump-sum-advance-request");
});
app.get("/lump-sum-advance-review", function (request, response) {
  response.render("auth/claim/pages/lump-sum-advance-review");
});
app.get("/lump-sum-advance-submitted", function (request, response) {
  response.render("auth/claim/pages/lump-sum-advance-submitted");
});
app.get("/lump-sum-advance-inprogress", function (request, response) {
  response.render("auth/claim/pages/lump-sum-advance-inprogress");
});
app.get("/lump-sum-advance-topup", function (request, response) {
  response.render("auth/claim/pages/lump-sum-advance-topup");
});
app.get("/lump-sum-advance-view", function (request, response) {
  response.render("auth/claim/pages/lump-sum-advance-view");
});
app.get("/lump-sum-advance-history", function (request, response) {
  response.render("auth/claim/pages/lump-sum-advance-history");
});
app.get("/lsa-calc-text", function (request, response) {
  response.render("auth/claim/pages/lsa-calc-text");
});

app.get("/pi-email", function (request, response) {
  response.render("auth/claim/pages/pi-email");
});

/**
  Component testing
*/
app.get("/autocomplete-test", function (request, response) {
  response.render("global/pages/autocomplete-test");
});
app.get("/five-star-rating-test", function (request, response) {
  response.render("global/pages/five-star-rating-test");
});

app.use("/docs", serveIndex("docs", {}));
app.listen(app.get("port"), function () {
  console.log("Node app is running on port", app.get("port"));
});

/**
  Style guide
*/
app.get("/styleguide", function (request, response) {
  response.render("styleguide/pages/home");
});
app.get("/styleguide-currency", function (request, response) {
  response.render("styleguide/pages/currency");
});
app.get("/styleguide-uikit", function (request, response) {
  response.render("styleguide/pages/uikit");
});
app.get("/styleguide-prototyping", function (request, response) {
  response.render("styleguide/pages/prototyping");
});
app.get("/styleguide-structure", function (request, response) {
  response.render("styleguide/pages/structure");
});
app.get("/styleguide-typography", function (request, response) {
  response.render("styleguide/pages/typography");
});
app.get("/styleguide-layout", function (request, response) {
  response.render("styleguide/pages/layout");
});
app.get("/styleguide-colours", function (request, response) {
  response.render("styleguide/pages/colours");
});
app.get("/styleguide-navigation", function (request, response) {
  response.render("styleguide/pages/navigation");
});
app.get("/styleguide-buttons", function (request, response) {
  response.render("styleguide/pages/buttons");
});
app.get("/styleguide-forms", function (request, response) {
  response.render("styleguide/pages/forms");
});
app.get("/styleguide-tables", function (request, response) {
  response.render("styleguide/pages/tables");
});
app.get("/styleguide-icons", function (request, response) {
  response.render("styleguide/pages/icons");
});
app.get("/styleguide-callouts", function (request, response) {
  response.render("styleguide/pages/callouts");
});
app.get("/styleguide-toast", function (request, response) {
  response.render("styleguide/pages/toast");
});

app.get("/styleguide-notifications", function (request, response) {
  response.render("styleguide/pages/notifications");
});
app.get("/styleguide-modals", function (request, response) {
  response.render("styleguide/pages/modals");
});
app.get("/styleguide-cards", function (request, response) {
  response.render("styleguide/pages/cards");
});
app.get("/styleguide-document-uploads", function (request, response) {
  response.render("styleguide/pages/document-uploads");
});
app.get("/styleguide-tooltip", function (request, response) {
  response.render("styleguide/pages/tooltip");
});
app.get("/styleguide-animations", function (request, response) {
  response.render("styleguide/pages/animations");
});
app.get("/styleguide-currency", function (request, response) {
  response.render("styleguide/pages/currency");
});

/* Nom Rep */
app.get("/nr-before-start-rep", function (request, response) {
  response.render("auth/nomrep/nr-before-start-rep");
});
app.get("/nr-veteran-details", function (request, response) {
  response.render("auth/nomrep/nr-veteran-details");
});
app.get('/nr-client-details', function (request, response) {
  response.render('auth/nomrep/nr-client-details');
});
app.get('/nr-client-details2', function (request, response) {
  response.render('auth/nomrep/nr-client-details2');
});
app.get('/nr-rep-details2', function (request, response) {
  response.render('auth/nomrep/nr-rep-details2');
});
app.get('/nr-veteran-details2', function (request, response) {
  response.render('auth/nomrep/nr-veteran-details2');
});
app.get("/nr-role-rep", function (request, response) {
  response.render("auth/nomrep/nr-role-rep");
});
app.get("/nr-review-rep", function (request, response) {
  response.render("auth/nomrep/nr-review-rep");
});
app.get("/nr-submitted-rep", function (request, response) {
  response.render("auth/nomrep/nr-submitted-rep");
});
app.get("/nr-before-start-client", function (request, response) {
  response.render("auth/nomrep/nr-before-start-client");
});
app.get("/nr-rep-details", function (request, response) {
  response.render("auth/nomrep/nr-rep-details");
});
app.get("/nr-role-client", function (request, response) {
  response.render("auth/nomrep/nr-role-client");
});
app.get("/nr-review-client", function (request, response) {
  response.render("auth/nomrep/nr-review-client");
});
app.get("/nr-submitted-client", function (request, response) {
  response.render("auth/nomrep/nr-submitted-client");
});
app.get("/nr-upload-client", function (request, response) {
  response.render("auth/nomrep/nr-upload-client");
});
app.get("/blue-team-test", function (request, response) {
  response.render("auth/nomrep/blue-team-test");
});
app.get("/nr-client-consent", function (request, response) {
  response.render("auth/nomrep/nr-client-consent");
});
app.get('/nr-rep-consent', function (request, response) {
  response.render('auth/nomrep/nr-rep-consent');
});
app.get('/nr-consent-approval', function (request, response) {
  response.render('auth/nomrep/nr-consent-approval');
});
app.get('/nr-consent-rejected', function (request, response) {
  response.render('auth/nomrep/nr-consent-rejected');
});
app.get('/nr-view-rep', function (request, response) {
  response.render('auth/nomrep/nr-view-rep');
});
app.get('/nr-view-client', function (request, response) {
  response.render('auth/nomrep/nr-view-client');
});
app.get('/nr-upload-rep', function (request, response) {
  response.render('auth/nomrep/nr-upload-rep');
});
app.get('/nr-manage-rep', function (request, response) {
  response.render('auth/nomrep/nr-manage-rep');
});
app.get('/nr-manage-client', function (request, response) {
  response.render('auth/nomrep/nr-manage-client');
});
app.get('/nr-edit-review-rep', function (request, response) {
  response.render('auth/nomrep/nr-edit-review-rep');
});
app.get('/nr-edit-upload-rep', function (request, response) {
  response.render('auth/nomrep/nr-edit-upload-rep');
});
app.get('/nr-edit-review-client', function (request, response) {
  response.render('auth/nomrep/nr-edit-review-client');
});
app.get('/nr-edit-upload-client', function (request, response) {
  response.render('auth/nomrep/nr-edit-upload-client');
});
app.get('/nr-update-claimInProgress', function (request, response) {
  response.render('auth/nomrep/nr-update-claimInProgress');
});
app.get('/nr-agreements-realistic', function (request, response) {
  response.render('auth/nomrep/nr-agreements-realistic', {
    main_nav_active: "profile"
  });
});
app.get('/nr-agreements-clean', function (request, response) {
  response.render('auth/nomrep/nr-agreements-clean', {
    main_nav_active: "profile"
  });
});
app.get('/nr-list', function (request, response) {
  response.render('auth/nomrep/nr-list', {
    main_nav_active: "profile"
  });
});
app.get('/nr-agreements', function (request, response) {
  response.render('auth/nomrep/nr-agreements', {
    main_nav_active: "profile"
  });
});
app.get('/nr-list', function (request, response) {
  response.render('auth/nomrep/nr-list', {
    main_nav_active: "profile"
  });
});
app.get('/nr-list', function (request, response) {
  response.render('auth/nomrep/nr-list', {
    main_nav_active: "profile"
  });
});
app.get('/nr-view-request-summary', function (request, response) {
  response.render('auth/nomrep/nr-view-request-summary', {
    main_nav_active: "profile"
  });
});

app.get('/nr-agreements-realistic-new', function (request, response) {
  response.render('auth/nomrep/nr-agreements-realistic-new', {
    main_nav_active: "profile"
  });
});
app.get('/nr-agreements-concept', function (request, response) {
  response.render('auth/nomrep/nr-agreements-concept', {
    main_nav_active: "profile"
  });
});
app.get('/nr-agreements-realistic-concept', function (request, response) {
  response.render('auth/nomrep/nr-agreements-realistic-concept', {
    main_nav_active: "profile"
  });
});
app.get('/nr-edit-rep', function (request, response) {
  response.render('auth/nomrep/nr-edit-rep');
});
app.get('/nr-edit-client', function (request, response) {
  response.render('auth/nomrep/nr-edit-client');
});
app.get('/nr-accounts', function (request, response) {
  response.render('auth/nomrep/nr-accounts');
});
/* MyAccount */
app.get("/myaccount", function (request, response) {
  response.render("myaccount/index");
});

app.get("/banners", function (request, response) {
  response.render("auth/banners");
});