var express = require('express');
var app = express();
var cookieParser = require('cookie-parser')

app.use(cookieParser())

var serveIndex = require('serve-index');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


/*
/**
Print styles
*/
app.get('/print-feedback-received', function (request, response) {
  response.render('email/pages/print-feedback-received');
});
/*
/**
Emails
*/
app.get('/email-feedback-received', function (request, response) {
  response.render('email/pages/email-feedback-received');
});
app.get('/email-rego-success', function (request, response) {
  response.render('email/pages/email-rego-success');
});
app.get('/email-rego-fail-1', function (request, response) {
  response.render('email/pages/email-rego-fail-1');
});
app.get('/email-rego-fail-2', function (request, response) {
  response.render('email/pages/email-rego-fail-2');
});
app.get('/email-rego-fail-3', function (request, response) {
  response.render('email/pages/email-rego-fail-3');
});
app.get('/email-claim-submitted', function (request, response) {
  response.render('email/pages/email-claim-submitted');
});
app.get('/email-verification-code', function (request, response) {
  response.render('email/pages/email-verification-code');
});
app.get('/email-lsq-pilot', function (request, response) {
  response.render('email/pages/email-lsq-pilot');
});
app.get('/email-lsq-pilot-thanks', function (request, response) {
  response.render('email/pages/email-lsq-pilot-thanks');
});
app.get('/email-veteran-card-approved', function (request, response) {
  response.render('email/pages/email-veteran-card-approved');
});
app.get('/email-mental-health-approved', function (request, response) {
  response.render('email/pages/email-mental-health-approved');
});
app.get('/email-incap-submitted', function (request, response) {
  response.render('email/pages/email-incap-submitted');
});
/**
Unauthenticated space
*/

app.get('/', function (request, response) {
  response.render('unauth/index');
});
app.get('/medical-services', function (request, response) {
  response.render('unauth/medical-services');
});
app.get('/everyday-care', function (request, response) {
  response.render('unauth/everyday-care');
});
app.get('/career-guidance', function (request, response) {
  response.render('unauth/career-guidance');
});
app.get('/financial-support', function (request, response) {
  response.render('unauth/financial-support');
});
app.get('/family-and-counselling', function (request, response) {
  response.render('unauth/family-and-counselling');
});
app.get('/index-login-errors', function (request, response) {
  response.render('unauth/index-login-errors');
});


app.get('/change-password', function (request, response) {
  response.render('auth/change-password', {
    main_nav_active: 'home'
  });
});

/**
Onboarding page
*/
app.get('/mygov-login', function (request, response) {
  response.render('auth/mygov-login');
});
app.get('/mygov-linking', function (request, response) {
  response.render('auth/mygov-linking');
});
app.get('/mygov-linked', function (request, response) {
  response.render('auth/mygov-linked');
});
app.get('/onboarding', function (request, response) {
  response.render('auth/onboarding');
});
app.get('/user-testing-stop', function (request, response) {
  response.render('global/user-testing-stop');
});
app.get('/user-testing-mygov-reg', function (request, response) {
  response.render('global/user-testing-mygov-reg');
});


/* Verify displays service history if DVA only */
app.get('/verify-details', function (request, response) {
  response.render('auth/verify-details');
});
app.get('/address', function (request, response) {
  response.render('auth/address');
});


/*
New registration flow for broadening
*/

app.get('/register', function (request, response) {
  response.render('unauth/registration/pages/register');
});
app.get('/register-alternate', function (request, response) {
  response.render('unauth/registration/pages/register-alternate');
});
app.get('/register-2', function (request, response) {
  response.render('unauth/registration/pages/register-2');
});
/* PMKeys only */
app.get('/register-3', function (request, response) {
  response.render('unauth/registration/pages/register-3');
});
app.get('/register-4', function (request, response) {
  response.render('unauth/registration/pages/register-4');
});
app.get('/register-5', function (request, response) {
  response.render('unauth/registration/pages/register-5');
});
app.get('/register-6', function (request, response) {
  response.render('unauth/registration/pages/register-6');
});
app.get('/register-7', function (request, response) {
  response.render('unauth/registration/pages/register-7');
});


app.get('/contactusscreen', function (request, response) {
  response.render('pages/contactusscreen');
});
app.get('/forgot-password-step1', function (request, response) {
  response.render('unauth/user/pages/forgot-password-step1');
});
app.get('/forgot-password-step1-and-2', function (request, response) {
  response.render('unauth/user/pages/forgot-password-step1-and-2');
});
app.get('/forgot-password-step2', function (request, response) {
  response.render('unauth/user/pages/forgot-password-step2');
});
app.get('/forgot-password-step3', function (request, response) {
  response.render('unauth/user/pages/forgot-password-step3');
});
app.get('/forgot-password-step4', function (request, response) {
  response.render('unauth/user/pages/forgot-password-step4');
});
app.get('/system-error', function (request, response) {
  response.render('unauth/system-error');
});
app.get('/not-found', function (request, response) {
  response.render('unauth/not-found');
});
app.get('/timeout', function (request, response) {
  response.render('unauth/timeout');
});

/**
  Authenticated space
*/
app.get('/auth', function (request, response) {
  response.render('auth/index', {
    main_nav_active: 'home'
  });
});
app.get('/dashboard', function (request, response) {
  response.render('auth/index-dashboard', {
    main_nav_active: 'home'
  });
});
app.get('/index-claims', function (request, response) {
  response.render('auth/index-claims', {
    main_nav_active: 'home'
  });
});
app.get('/index-preloader', function (request, response) {
  response.render('auth/index-preloader');
});
app.get('/index-timeout', function (request, response) {
  response.render('auth/index-timeout', {
    main_nav_active: 'home'
  });
});
app.get('/needs1', function (request, response) {
  response.render('auth/needs1');
});
app.get('/needs2', function (request, response) {
  response.render('auth/needs2');
});
app.get('/needs3', function (request, response) {
  response.render('auth/needs3');
});
app.get('/needs-success', function (request, response) {
  response.render('auth/needs-success');
});

/* Separate profile screens */
app.get('/profile-account', function (request, response) {
  response.render('auth/profile-account', {
    main_nav_active: 'profile'
  });
});
app.get('/profile-bank', function (request, response) {
  response.render('auth/profile-bank', {
    main_nav_active: 'profile'
  });
});
app.get('/profile-contact', function (request, response) {
  response.render('auth/profile-contact', {
    main_nav_active: 'profile'
  });
});

app.get('/profile-contact-2', function (request, response) {
  response.render('auth/profile-contact-2', {
    main_nav_active: 'profile'
  });
});

app.get('/222', function (request, response) {
  response.render('auth/profile-contact', {
    main_nav_active: 'my-profile'
  });
});


app.get('/profile-history', function (request, response) {
  response.render('auth/profile-history', {
    main_nav_active: 'profile'
  });
});
app.get('/profile-history-2', function (request, response) {
  response.render('auth/profile-history-2', {
    main_nav_active: 'profile'
  });
});

app.get('/profile-assets', function (request, response) {
  response.render('auth/profile-assets', {
    main_nav_active: 'profile'
  });
});
app.get('/profile-farm', function (request, response) {
  response.render('auth/profile-farm');
});
app.get('/profile-financial-other', function (request, response) {
  response.render('auth/profile-financial-other');
});
app.get('/profile-assets-added', function (request, response) {
  response.render('auth/profile-assets-added');
});
app.get('/profile-service-details', function (request, response) {
  response.render('auth/profile-service-details');
});
app.get('/service-history', function (request, response) {
  response.render('auth/service-history');
});
app.get('/service-period-1', function (request, response) {
  response.render('auth/service-period-1');
});
app.get('/service-period-2', function (request, response) {
  response.render('auth/service-period-2');
});
app.get('/service-period-3', function (request, response) {
  response.render('auth/service-period-3');
});
/* Separate healthcard screens */
// app.get('/healthcard-home', function (request, response) {
//   response.render('auth/healthcard/healthcard-home');
// });
// app.get('/healthcard-gold', function (request, response) {
//   response.render('auth/healthcard/healthcard-gold');
// });
// app.get('/healthcard-nlhc', function (request, response) {
//   response.render('auth/healthcard/healthcard-nlhc');
// });
// app.get('/healthcard-none', function (request, response) {
//   response.render('auth/healthcard/healthcard-none');
// });

/* Change email flow */
app.get('/change-email-poi', function (request, response) {
  response.render('auth/change-email-poi');
});
app.get('/change-email', function (request, response) {
  response.render('auth/change-email');
});
app.get('/change-email-enter-code', function (request, response) {
  response.render('auth/change-email-enter-code');
});
app.get('/change-email-login', function (request, response) {
  response.render('auth/change-email-login');
});

/*
  Staff space
*/
app.get('/staff', function (request, response) {
  response.render('staff/index');
});

/* Old single screen profile */
app.get('/profile', function (request, response) {
  response.render('auth/profile', {
    main_nav_active: 'profile'
  });
});
app.get('/profile-new', function (request, response) {
  response.render('auth/profile-new', {
    main_nav_active: 'profile'
  });
});
app.get('/profile-password', function (request, response) {
  response.render('auth/profile-password');
});
app.get('/profile-updated', function (request, response) {
  response.render('auth/profile-updated', {
    main_nav_active: 'profile'
  });
});
// app.get('/change-password', function (request, response) {
//   response.render('auth/change-password');
// });
app.get('/profile-password-updated', function (request, response) {
  response.render('auth/profile-password-updated');
});
app.get('/terms-and-conditions', function (request, response) {
  response.render('global/pages/terms-and-conditions');
});

//feedback page

app.get('/panel-feedback', function (request, response) {
  response.render('auth/claim/pages/panel-feedback');
});
app.get('/panel-feedbacksubmitting', function (request, response) {
  response.render('auth/claim/pages/panel-feedbacksubmitting');
});

/* Claims Page */
app.get('/claims', function (request, response) {
  response.render('auth/claim/pages/claims', {
    main_nav_active: 'claims'
  });
});
app.get('/claims-manage', function (request, response) {
  response.render('auth/claim/pages/claims-manage', {
    main_nav_active: 'claims'
  });
});
app.get('/claims-make', function (request, response) {
  response.render('auth/claim/pages/claims-make', {
    main_nav_active: 'claims'
  });
});

app.get('/travel-home', function (request, response) {
  response.render('auth/travel/travel-home', {
    main_nav_active: 'travel'
  });
});

app.get('/claims-neverserved', function (request, response) {
  response.render('auth/claim/pages/claims-neverserved', {
    main_nav_active: 'claims'
  });
});
app.get('/claims-existingnlhc', function (request, response) {
  response.render('auth/claim/pages/claims-existingnlhc', {
    main_nav_active: 'claims'
  });
});
app.get('/claims-existingnlhc-nostudentpayments', function (request, response) {
  response.render('auth/claim/pages/claims-existingnlhc-nostudentpayments', {
    main_nav_active: 'claims'
  });
});
app.get('/claims-nostudentpayments', function (request, response) {
  response.render('auth/claim/pages/claims-nostudentpayments', {
    main_nav_active: 'claims'
  });
});

/* Claims Page 2? */
app.get('/claims2', function (request, response) {
  response.render('auth/claims', {
    main_nav_active: 'claims'
  });
});

/* Incap Claim Pages */
app.get('/incap-start', function (request, response) {
  response.render('auth/claim/pages/incap-start', {
    main_nav_active: 'claims'
  });
});

app.get('/incap-resume', function (request, response) {
  response.render('auth/claim/pages/incap-resume', {
    main_nav_active: 'claims'
  });
});

app.get('/incap-progress', function (request, response) {
  response.render('auth/claim/pages/incap-progress', {
    main_nav_active: 'claims'
  });
});
app.get('/incap-progress-b', function (request, response) {
  response.render('auth/claim/pages/incap-progress-b', {
    main_nav_active: 'claims'
  });
});
app.get('/incap-progress-c', function (request, response) {
  response.render('auth/claim/pages/incap-progress-c', {
    main_nav_active: 'claims'
  });
});
app.get('/incap-progress-d', function (request, response) {
  response.render('auth/claim/pages/incap-progress-d', {
    main_nav_active: 'claims'
  });
});
app.get('/incap-progress-e', function (request, response) {
  response.render('auth/claim/pages/incap-progress-e', {
    main_nav_active: 'claims'
  });
});
app.get('/incap-a-1', function (request, response) {
  response.render('auth/claim/pages/incap-a-1', {
    main_nav_active: 'claims'
  });
});
app.get('/incap-a-2', function (request, response) {
  response.render('auth/claim/pages/incap-a-2', {
    main_nav_active: 'claims'
  });
});
app.get('/incap-b-1', function (request, response) {
  response.render('auth/claim/pages/incap-b-1', {
    main_nav_active: 'claims'
  });
});
app.get('/incap-b-2', function (request, response) {
  response.render('auth/claim/pages/incap-b-2', {
    main_nav_active: 'claims'
  });
});
app.get('/incap-b-3', function (request, response) {
  response.render('auth/claim/pages/incap-b-3', {
    main_nav_active: 'claims'
  });
});
app.get('/incap-b-4', function (request, response) {
  response.render('auth/claim/pages/incap-b-4', {
    main_nav_active: 'claims'
  });
});
app.get('/incap-b-5', function (request, response) {
  response.render('auth/claim/pages/incap-b-5', {
    main_nav_active: 'claims'
  });
});
app.get('/incap-b-6', function (request, response) {
  response.render('auth/claim/pages/incap-b-6', {
    main_nav_active: 'claims'
  });
});
app.get('/incap-b-7', function (request, response) {
  response.render('auth/claim/pages/incap-b-7', {
    main_nav_active: 'claims'
  });
});
app.get('/incap-c-1', function (request, response) {
  response.render('auth/claim/pages/incap-c-1', {
    main_nav_active: 'claims'
  });
});
app.get('/incap-review', function (request, response) {
  response.render('auth/claim/pages/incap-review', {
    main_nav_active: 'claims'
  });
});
app.get('/incap-submitted', function (request, response) {
  response.render('auth/claim/pages/incap-submitted', {
    main_nav_active: 'claims'
  });
});
app.get('/incap-docupload', function (request, response) {
  response.render('auth/claim/pages/incap-docupload', {
    main_nav_active: 'claims'
  });
});
app.get('/incap-summary', function (request, response) {
  response.render('auth/claim/pages/incap-summary', {
    main_nav_active: 'claims'
  });
});

app.get('/incap-ineligible', function (request, response) {
  response.render('auth/claim/pages/incap-ineligible', {
    main_nav_active: 'claims'
  });
});

/* Service pension claim */
app.get('/sp-before-start', function (request, response) {
  response.render('auth/claim/pages/sp-before-start', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-progress', function (request, response) {
  response.render('auth/claim/pages/sp-progress', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-representative', function (request, response) {
  response.render('auth/claim/pages/sp-representative', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-progress-a', function (request, response) {
  response.render('auth/claim/pages/sp-progress-a', {
    main_nav_active: 'claims'
  });
}); app.get('/sp-progress-b', function (request, response) {
  response.render('auth/claim/pages/sp-progress-b', {
    main_nav_active: 'claims'
  });
}); app.get('/sp-progress-c', function (request, response) {
  response.render('auth/claim/pages/sp-progress-c', {
    main_nav_active: 'claims'
  });
}); app.get('/sp-progress-d', function (request, response) {
  response.render('auth/claim/pages/sp-progress-d', {
    main_nav_active: 'claims'
  });
}); app.get('/sp-progress-finish', function (request, response) {
  response.render('auth/claim/pages/sp-progress-finish', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-documents', function (request, response) {
  response.render('auth/claim/pages/sp-documents', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-residency', function (request, response) {
  response.render('auth/claim/pages/sp-residency', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-residency-partner', function (request, response) {
  response.render('auth/claim/pages/sp-residency-partner', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-start', function (request, response) {
  response.render('auth/claim/pages/sp-start', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-review', function (request, response) {
  response.render('auth/claim/pages/sp-review', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-my-details', function (request, response) {
  response.render('auth/claim/pages/sp-my-details', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-partner', function (request, response) {
  response.render('auth/claim/pages/sp-partner', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-dependant', function (request, response) {
  response.render('auth/claim/pages/sp-dependant', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-la', function (request, response) {
  response.render('auth/claim/pages/sp-la', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-claim-contact', function (request, response) {
  response.render('auth/claim/pages/sp-claim-contact', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-other-claims', function (request, response) {
  response.render('auth/claim/pages/sp-other-claims', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-medical', function (request, response) {
  response.render('auth/claim/pages/sp-medical', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-payment-details', function (request, response) {
  response.render('auth/claim/pages/sp-payment-details', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-bank-details', function (request, response) {
  response.render('auth/claim/pages/sp-bank-details', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-financial-details', function (request, response) {
  response.render('auth/claim/pages/sp-financial-details', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-financial-income', function (request, response) {
  response.render('auth/claim/pages/sp-financial-income', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-financial-assets', function (request, response) {
  response.render('auth/claim/pages/sp-financial-assets', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-personal-assets', function (request, response) {
  response.render('auth/claim/pages/sp-personal-assets', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-income-payments', function (request, response) {
  response.render('auth/claim/pages/sp-income-payments', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-other-items', function (request, response) {
  response.render('auth/claim/pages/sp-other-items', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-super', function (request, response) {
  response.render('auth/claim/pages/sp-super', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-required-documents', function (request, response) {
  response.render('auth/claim/pages/sp-required-documents', {
    main_nav_active: 'claims'
  });
});
app.get('/sp-nominated-rep', function (request, response) {
  response.render('auth/claim/pages/sp-nominated-rep', {
    main_nav_active: 'claims'
  });
});

/* Broadened claim flow */
app.get('/claim1', function (request, response) {
  response.render('auth/claim/pages/claim1');
});
app.get('/claim2', function (request, response) {
  response.render('auth/claim/pages/claim2');
});
app.get('/claim2a', function (request, response) {
  response.render('auth/claim/pages/claim2a');
});
app.get('/claim3', function (request, response) {
  response.render('auth/claim/pages/claim3');
});
app.get('/claim4', function (request, response) {
  response.render('auth/claim/pages/claim4');
});
app.get('/claim5', function (request, response) {
  response.render('auth/claim/pages/claim5');
});
app.get('/claim6', function (request, response) {
  response.render('auth/claim/pages/claim6');
});
app.get('/claim7', function (request, response, next) {
  response.render('auth/claim/pages/claim7');
});
app.get('/claim8', function (request, response, next) {
  var claimTypeCookie = request.cookies.claimType;
  // Cookies that have not been signed
  console.log('Cookies: ', request.cookies)

  response.locals.claimType = claimTypeCookie;
  response.render('auth/claim/pages/claim8');
});

app.get('/nlhc-start', function (request, response, next) {
  response.render('auth/claim/pages/nlhc-start');
});

/* Student assistance flow */
app.get('/studentpreeligibility', function (request, response) {
  response.render('auth/claim/pages/studentpreeligibility');
});
app.get('/studentclaim1', function (request, response) {
  response.render('auth/claim/pages/studentclaim1');
});
app.get('/studentclaim1a', function (request, response) {
  response.render('auth/claim/pages/studentclaim1a');
});
app.get('/studentclaim2', function (request, response) {
  response.render('auth/claim/pages/studentclaim2');
});
app.get('/studentclaim3', function (request, response) {
  response.render('auth/claim/pages/studentclaim3');
});
app.get('/studentclaim4', function (request, response) {
  response.render('auth/claim/pages/studentclaim4');
});
app.get('/studentclaim4a', function (request, response) {
  response.render('auth/claim/pages/studentclaim4a');
});
app.get('/studentclaim5', function (request, response) {
  response.render('auth/claim/pages/studentclaim5');
});
app.get('/studentclaim6', function (request, response) {
  response.render('auth/claim/pages/studentclaim6');
});
app.get('/studentclaimupload', function (request, response) {
  response.render('auth/claim/pages/studentclaimupload');
});
app.get('/viewClaimDetailStudent', function (request, response) {
  response.render('auth/claim/pages/viewClaimDetailStudent');
});
app.get('/viewClaimRejected', function (request, response) {
  response.render('auth/claim/pages/viewClaimRejected');
});
app.get('/index-claimsstudent', function (request, response) {
  response.render('auth/index-claimsstudent');
});
app.get('/viewClaimWithdrawn', function (request, response) {
  response.render('auth/claim/pages/viewClaimWithdrawn');
});
app.get('/viewClaimInProgress', function (request, response) {
  response.render('auth/claim/pages/viewClaimInProgress');
});
app.get('/updateClaimInProgress', function (request, response) {
  response.render('auth/claim/pages/updateClaimInProgress');
});
app.get('/updateClaimInProgressSubmitting', function (request, response) {
  response.render('auth/claim/pages/updateClaimInProgressSubmitting');
});

/* Student assistance flow */
app.get('/student-assistance-landing', function (request, response) {
  response.render('auth/claim/pages/student-assistance-landing');
});
app.get('/studentclaim1', function (request, response) {
  response.render('auth/claim/pages/studentclaim1');
});
app.get('/studentclaim2', function (request, response) {
  response.render('auth/claim/pages/studentclaim2');
});
app.get('/studentclaim3', function (request, response) {
  response.render('auth/claim/pages/studentclaim3');
});
app.get('/studentclaim4', function (request, response) {
  response.render('auth/claim/pages/studentclaim4');
});
app.get('/studentclaim5', function (request, response) {
  response.render('auth/claim/pages/studentclaim5');
});
app.get('/studentclaim6', function (request, response) {
  response.render('auth/claim/pages/studentclaim6');
});
app.get('/viewClaimDetailStudent', function (request, response) {
  response.render('auth/claim/pages/viewClaimDetailStudent');
});
app.get('/index-claimsstudent', function (request, response) {
  response.render('auth/index-claimsstudent');
});

/* Permanent impairment */
app.get('/pi-lsq-pilot', function (request, response) {
  response.render('auth/claim/pages/pi-lsq-pilot');
});
app.get('/pi-lsq-start', function (request, response) {
  response.render('auth/claim/pages/pi-lsq-start');
});
app.get('/pi-lsq-claim1', function (request, response) {
  response.render('auth/claim/pages/pi-lsq-claim1');
});
app.get('/pi-lsq-claim2', function (request, response) {
  response.render('auth/claim/pages/pi-lsq-claim2');
});
app.get('/pi-lsq-claim3', function (request, response) {
  response.render('auth/claim/pages/pi-lsq-claim3');
});
app.get('/pi-lsq-claim4', function (request, response) {
  response.render('auth/claim/pages/pi-lsq-claim4');
});
app.get('/pi-lsq-claim5', function (request, response) {
  response.render('auth/claim/pages/pi-lsq-claim5');
});
app.get('/pi-lsq-claim6', function (request, response) {
  response.render('auth/claim/pages/pi-lsq-claim6');
});
app.get('/pi-lsq-claim6b', function (request, response) {
  response.render('auth/claim/pages/pi-lsq-claim6b');
});
app.get('/pi-lsq-claim7', function (request, response) {
  response.render('auth/claim/pages/pi-lsq-claim7');
});
app.get('/pi-lsq-claim7b', function (request, response) {
  response.render('auth/claim/pages/pi-lsq-claim7b');
});
app.get('/viewPI-LSQ-detail', function (request, response) {
  response.render('auth/claim/pages/viewPI-LSQ-detail');
});
app.get('/viewPI-LSQ-detailb', function (request, response) {
  response.render('auth/claim/pages/viewPI-LSQ-detailb');
});

/* LSQ Pilot alternative progress bar */

app.get('/pi-lsq-claim1c', function (request, response) {
  response.render('auth/claim/pages/pi-lsq-claim1c');
});
app.get('/pi-lsq-claim2c', function (request, response) {
  response.render('auth/claim/pages/pi-lsq-claim2c');
});
app.get('/pi-lsq-claim3c', function (request, response) {
  response.render('auth/claim/pages/pi-lsq-claim3c');
});
app.get('/pi-lsq-claim4c', function (request, response) {
  response.render('auth/claim/pages/pi-lsq-claim4c');
});
app.get('/pi-lsq-claim5c', function (request, response) {
  response.render('auth/claim/pages/pi-lsq-claim5c');
});
app.get('/pi-lsq-claim6c', function (request, response) {
  response.render('auth/claim/pages/pi-lsq-claim6c');
});


/* Disability pension AFI (application for increase) */
app.get('/afi-start', function (request, response) {
  response.render('auth/claim/pages/afi-start');
});
app.get('/afi-claim1', function (request, response) {
  response.render('auth/claim/pages/afi-claim1');
});
app.get('/afi-claim2', function (request, response) {
  response.render('auth/claim/pages/afi-claim2');
});
app.get('/afi-claim3', function (request, response) {
  response.render('auth/claim/pages/afi-claim3');
});
app.get('/afi-submitted', function (request, response) {
  response.render('auth/claim/pages/afi-submitted');
});
app.get('/afi-claimdetail', function (request, response) {
  response.render('auth/claim/pages/viewAFIClaimDetail');
});


/* DHOAS Subsidy certificate */
app.get('/dhoas-start', function (request, response) {
  response.render('auth/claim/pages/dhoas-start');
});
app.get('/dhoas1', function (request, response) {
  response.render('auth/claim/pages/dhoas1');
});
app.get('/dhoas2', function (request, response) {
  response.render('auth/claim/pages/dhoas2');
});
app.get('/dhoas2b', function (request, response) {
  response.render('auth/claim/pages/dhoas2b');
});
app.get('/dhoas3', function (request, response) {
  response.render('auth/claim/pages/dhoas3');
});
app.get('/dhoas4', function (request, response) {
  response.render('auth/claim/pages/dhoas4');
});
app.get('/dhoas5', function (request, response) {
  response.render('auth/claim/pages/dhoas5');
});

app.get('/dhoas-review', function (request, response) {
  response.render('auth/claim/pages/dhoas-review');
});
app.get('/dhoas-submitted', function (request, response) {
  response.render('auth/claim/pages/dhoas-submitted');
});
app.get('/viewDhoasDetail', function (request, response) {
  response.render('auth/claim/pages/viewDhoasDetail');
});
app.get('/dhoas-terms-and-conditions', function (request, response) {
  response.render('global/pages/dhoas-terms-and-conditions');
});


/* Qualifying Service */
app.get('/qs-claimdetail', function (request, response) {
  response.render('auth/claim/pages/viewQSClaimDetail');
});

/* Mental health treatment path */
app.get('/health-card0', function (request, response) {
  response.render('auth/claim/pages/health-card0');
});
app.get('/health-card1', function (request, response) {
  response.render('auth/claim/pages/health-card1');
});
app.get('/health-card2', function (request, response) {
  response.render('auth/claim/pages/health-card2');
});
app.get('/health-card3', function (request, response) {
  response.render('auth/claim/pages/health-card3');
});
app.get('/health-card4', function (request, response) {
  response.render('auth/claim/pages/health-card4');
});
app.get('/health-card-blocker', function (request, response) {
  response.render('auth/claim/pages/health-card-blocker');
});

app.get('/viewClaimDetail', function (request, response) {
  response.render('auth/claim/pages/viewClaimDetail');
});
app.get('/viewNLHCClaimDetail', function (request, response) {
  response.render('auth/claim/pages/viewNLHCClaimDetail');
});

/* Veteran card */
app.get('/veteran-card-eligibility', function (request, response) {
  response.render('auth/claim/pages/veteran-card-eligibility', {
    main_nav_active: 'claims'
  });
});
app.get('/veteran-card-1', function (request, response) {
  response.render('auth/claim/pages/veteran-card-1', {
    main_nav_active: 'claims'
  });
});
app.get('/veteran-card-2', function (request, response) {
  response.render('auth/claim/pages/veteran-card-2', {
    main_nav_active: 'claims'
  });
});
app.get('/veteran-card-review', function (request, response) {
  response.render('auth/claim/pages/veteran-card-review', {
    main_nav_active: 'claims'
  });
});
app.get('/veteran-card-submitted', function (request, response) {
  response.render('auth/claim/pages/veteran-card-submitted', {
    main_nav_active: 'claims'
  });
});
app.get('/veteran-card-summary', function (request, response) {
  response.render('auth/claim/pages/veteran-card-summary');
});

/* New NLHC */
app.get('/mental-health-eligibility', function (request, response) {
  response.render('auth/claim/pages/mental-health-eligibility', {
    main_nav_active: 'claims'
  });
});
app.get('/mental-health-1', function (request, response) {
  response.render('auth/claim/pages/mental-health-1', {
    main_nav_active: 'claims'
  });
});
app.get('/mental-health-2', function (request, response) {
  response.render('auth/claim/pages/mental-health-2', {
    main_nav_active: 'claims'
  });
});
app.get('/mental-health-review', function (request, response) {
  response.render('auth/claim/pages/mental-health-review', {
    main_nav_active: 'claims'
  });
});
app.get('/mental-health-submitted', function (request, response) {
  response.render('auth/claim/pages/mental-health-submitted', {
    main_nav_active: 'claims'
  });
});
app.get('/mental-health-summary', function (request, response) {
  response.render('auth/claim/pages/mental-health-summary');
});

/* Health card */
app.get('/healthcard-home', function (request, response) {
  response.render('auth/healthcard/healthcard-home', {
    main_nav_active: 'healthcard'
  });
});
app.get('/healthcard-gold', function (request, response) {
  response.render('auth/healthcard/healthcard-gold', {
    main_nav_active: 'healthcard'
  });
});
app.get('/healthcard-nlhc', function (request, response) {
  response.render('auth/healthcard/healthcard-nlhc', {
    main_nav_active: 'healthcard'
  });
});
app.get('/healthcard-none', function (request, response) {
  response.render('auth/healthcard/healthcard-none', {
    main_nav_active: 'healthcard'
  });
});

app.get('/healthcard-replacement', function (request, response) {
  response.render('auth/claim/pages/healthcard-replacement', {
    main_nav_active: 'healthcard'
  });
});
app.get('/healthcard-replacement-success', function (request, response) {
  response.render('auth/claim/pages/healthcard-replacement-success', {
    main_nav_active: 'healthcard'
  });
});
app.get('/healthcard-replacement-fail', function (request, response) {
  response.render('auth/claim/pages/healthcard-replacement-fail', {
    main_nav_active: 'healthcard'
  });
});

// Lump sum advance payment claim

app.get('/payments', function (request, response) {
  response.render('auth/claim/pages/payments', {
    main_nav_active: 'lsa'
  });
});
app.get('/lump-sum-advance-request', function (request, response) {
  response.render('auth/claim/pages/lump-sum-advance-request');
});
app.get('/lump-sum-advance-review', function (request, response) {
  response.render('auth/claim/pages/lump-sum-advance-review');
});
app.get('/lump-sum-advance-submitted', function (request, response) {
  response.render('auth/claim/pages/lump-sum-advance-submitted');
});
app.get('/lump-sum-advance-inprogress', function (request, response) {
  response.render('auth/claim/pages/lump-sum-advance-inprogress');
});
app.get('/lump-sum-advance-topup', function (request, response) {
  response.render('auth/claim/pages/lump-sum-advance-topup');
});
app.get('/lump-sum-advance-view', function (request, response) {
  response.render('auth/claim/pages/lump-sum-advance-view');
});
app.get('/lump-sum-advance-history', function (request, response) {
  response.render('auth/claim/pages/lump-sum-advance-history');
});
app.get('/lsa-calc-text', function (request, response) {
  response.render('auth/claim/pages/lsa-calc-text');
});

app.get('/pi-email', function (request, response) {
  response.render('auth/claim/pages/pi-email');
});

/**
  Component testing
*/
app.get('/autocomplete-test', function (request, response) {
  response.render('global/pages/autocomplete-test');
});
app.get('/five-star-rating-test', function (request, response) {
  response.render('global/pages/five-star-rating-test');
});

app.use('/docs', serveIndex('docs', {}))
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

/**
  Style guide
*/
app.get('/styleguide', function (request, response) {
  response.render('styleguide/pages/home');
});
app.get('/styleguide-uikit', function (request, response) {
  response.render('styleguide/pages/uikit');
});
app.get('/styleguide-prototyping', function (request, response) {
  response.render('styleguide/pages/prototyping');
});
app.get('/styleguide-structure', function (request, response) {
  response.render('styleguide/pages/structure');
});
app.get('/styleguide-typography', function (request, response) {
  response.render('styleguide/pages/typography');
});
app.get('/styleguide-layout', function (request, response) {
  response.render('styleguide/pages/layout');
});
app.get('/styleguide-colours', function (request, response) {
  response.render('styleguide/pages/colours');
});
app.get('/styleguide-navigation', function (request, response) {
  response.render('styleguide/pages/navigation');
});
app.get('/styleguide-buttons', function (request, response) {
  response.render('styleguide/pages/buttons');
});
app.get('/styleguide-forms', function (request, response) {
  response.render('styleguide/pages/forms');
});
app.get('/styleguide-tables', function (request, response) {
  response.render('styleguide/pages/tables');
});
app.get('/styleguide-icons', function (request, response) {
  response.render('styleguide/pages/icons');
});
app.get('/styleguide-callouts', function (request, response) {
  response.render('styleguide/pages/callouts');
});
app.get('/styleguide-toast', function (request, response) {
  response.render('styleguide/pages/toast');
});

app.get('/styleguide-notifications', function (request, response) {
  response.render('styleguide/pages/notifications');
});
app.get('/styleguide-modals', function (request, response) {
  response.render('styleguide/pages/modals');
});
app.get('/styleguide-cards', function (request, response) {
  response.render('styleguide/pages/cards');
});
app.get('/styleguide-document-uploads', function (request, response) {
  response.render('styleguide/pages/document-uploads');
});
app.get('/styleguide-tooltip', function (request, response) {
  response.render('styleguide/pages/tooltip');
});
app.get('/styleguide-animations', function (request, response) {
  response.render('styleguide/pages/animations');
});


/* MyAccount */
app.get('/myaccount', function (request, response) {
  response.render('myaccount/index');
});
