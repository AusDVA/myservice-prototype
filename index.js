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


/**
UNAUTHENTICATED SPACE
*/

app.get('/', function (request, response) {
  response.render('unauth/index');
});


/* MyGov linking and login pages */

app.get('/mygov-login', function (request, response) {
  response.render('unauth/mygov/mygov-login');
});
app.get('/mygov-linking', function (request, response) {
  response.render('unauth/mygov/mygov-linking');
});
app.get('/mygov-linked', function (request, response) {
  response.render('unauth/mygov/mygov-linked');
});
app.get('/onboarding', function (request, response) {
  response.render('auth/onboarding/onboarding');
});



/* Registration pages */

app.get('/register', function (request, response) {
  response.render('unauth/registration/pages/register');
});
app.get('/register-2', function (request, response) {
  response.render('unauth/registration/pages/register-2');
});
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
  AUTHENTICATED SPACE
*/


/* Dashboard */
app.get('/index-claims', function (request, response) {
  response.render('auth/dashboard/index-claims', {
    main_nav_active: 'home'
  });
});
app.get('/index-timeout', function (request, response) {
  response.render('auth/dashboard/index-timeout', {
    main_nav_active: 'home'
  });
});
app.get('/auth', function (request, response) {
  response.render('auth/dashboard/index', {
    main_nav_active: 'home'
  });
});
app.get('/verify-details', function (request, response) {
  response.render('auth/dashboard/verify-details');
});


/* Needs Assessment */

app.get('/needs1', function (request, response) {
  response.render('auth/needsassessment/needs1');
});
app.get('/needs2', function (request, response) {
  response.render('auth/needsassessment/needs2');
});
app.get('/needs3', function (request, response) {
  response.render('auth/needsassessment/needs3');
});
app.get('/needs-success', function (request, response) {
  response.render('auth/needsassessment/needs-success');
});


/* Profile */

app.get('/profile-account', function (request, response) {
  response.render('auth/profile/profile-account', {
    main_nav_active: 'profile'
  });
});
app.get('/profile-contact', function (request, response) {
  response.render('auth/profile/profile-contact', {
    main_nav_active: 'profile'
  });
});
app.get('/profile-history', function (request, response) {
  response.render('auth/profile/profile-history', {
    main_nav_active: 'profile'
  });
});
app.get('/profile', function (request, response) {
  response.render('auth/profile/profile', {
    main_nav_active: 'profile'
  });
});
app.get('/service-history', function (request, response) {
  response.render('auth/profile/service-history');
});
app.get('/service-period-1', function (request, response) {
  response.render('auth/profile/service-period-1');
});
app.get('/service-period-2', function (request, response) {
  response.render('auth/profile/service-period-2');
});
app.get('/service-period-3', function (request, response) {
  response.render('auth/profile/service-period-3');
});


/* Claims Page */

app.get('/claims-make', function (request, response) {
  response.render('auth/claims/claims-make', {
    main_nav_active: 'claims'
  });
});
app.get('/claims-manage', function (request, response) {
  response.render('auth/claims/claims-manage', {
    main_nav_active: 'claims'
  });
});
app.get('/claims', function (request, response) {
  response.render('auth/claims/claims', {
    main_nav_active: 'claims'
  });
});

/* Claims - AFI */

app.get('/afi-start', function (request, response) {
  response.render('auth/claims/pages/afi/afi-start');
});
app.get('/afi-claim1', function (request, response) {
  response.render('auth/claims/pages/afi/afi-claim1');
});
app.get('/afi-claim2', function (request, response) {
  response.render('auth/claims/pages/afi/afi-claim2');
});
app.get('/afi-claim3', function (request, response) {
  response.render('auth/claims/pages/afi/afi-claim3');
});
app.get('/afi-submitted', function (request, response) {
  response.render('auth/claims/pages/afi/afi-submitted');
});
app.get('/afi-claimdetail', function (request, response) {
  response.render('auth/claims/pages/afi/viewAFIClaimDetail');
});

/* Claims - DHOAS */

app.get('/dhoas-start', function (request, response) {
  response.render('auth/claims/pages/dhoas/dhoas-start');
});
app.get('/dhoas1', function (request, response) {
  response.render('auth/claims/pages/dhoas/dhoas1');
});
app.get('/dhoas2', function (request, response) {
  response.render('auth/claims/pages/dhoas/dhoas2');
});
app.get('/dhoas2b', function (request, response) {
  response.render('auth/claims/pages/dhoas/dhoas2b');
});
app.get('/dhoas3', function (request, response) {
  response.render('auth/claims/pages/dhoas/dhoas3');
});
app.get('/dhoas4', function (request, response) {
  response.render('auth/claims/pages/dhoas/dhoas4');
});
app.get('/dhoas5', function (request, response) {
  response.render('auth/claims/pages/dhoas/dhoas5');
});

app.get('/dhoas-review', function (request, response) {
  response.render('auth/claims/pages/dhoas/dhoas-review');
});
app.get('/dhoas-submitted', function (request, response) {
  response.render('auth/claims/pages/dhoas/dhoas-submitted');
});
app.get('/viewDhoasDetail', function (request, response) {
  response.render('auth/claims/pages/dhoas/viewDhoasDetail');
});
app.get('/dhoas-terms-and-conditions', function (request, response) {
  response.render('auth/claims/pages/dhoas/dhoas-terms-and-conditions');
});

/* Claims - IL */

app.get('/claim1', function (request, response) {
  response.render('auth/claims/pages/il/claim1');
});
app.get('/claim2', function (request, response) {
  response.render('auth/claims/pages/il/claim2');
});
app.get('/claim2a', function (request, response) {
  response.render('auth/claims/pages/il/claim2a');
});
app.get('/claim3', function (request, response) {
  response.render('auth/claims/pages/il/claim3');
});
app.get('/claim4', function (request, response) {
  response.render('auth/claims/pages/il/claim4');
});
app.get('/claim5', function (request, response) {
  response.render('auth/claims/pages/il/claim5');
});
app.get('/claim6', function (request, response) {
  response.render('auth/claims/pages/il/claim6');
});
app.get('/claim7', function (request, response, next) {
  response.render('auth/claims/pages/il/claim7');
});
app.get('/claim8', function (request, response, next) {
  var claimTypeCookie = request.cookies.claimType;
  // Cookies that have not been signed
  console.log('Cookies: ', request.cookies)
  response.locals.claimType = claimTypeCookie;
  response.render('auth/claims/pages/il/claim8');
});
app.get('/viewClaimDetail', function (request, response) {
  response.render('auth/claims/pages/il/viewClaimDetail');
});

/* Claims - Incap */

/* Incap Claim Pages */
app.get('/incap-start', function (request, response) {
  response.render('auth/claims/pages/incap/incap-start');
});
app.get('/incap-resume', function (request, response) {
  response.render('auth/claims/pages/incap/incap-resume');
});
app.get('/incap-progress', function (request, response) {
  response.render('auth/claims/pages/incap/incap-progress');
});
app.get('/incap-progress-b', function (request, response) {
  response.render('auth/claims/pages/incap/incap-progress-b');
});
app.get('/incap-progress-c', function (request, response) {
  response.render('auth/claims/pages/incap/incap-progress-c');
});
app.get('/incap-progress-d', function (request, response) {
  response.render('auth/claims/pages/incap/incap-progress-d');
});
app.get('/incap-progress-e', function (request, response) {
  response.render('auth/claims/pages/incap/incap-progress-e');
});
app.get('/incap-a-1', function (request, response) {
  response.render('auth/claims/pages/incap/incap-a-1');
});
app.get('/incap-a-2', function (request, response) {
  response.render('auth/claims/pages/incap/incap-a-2');
});
app.get('/incap-b-1', function (request, response) {
  response.render('auth/claims/pages/incap/incap-b-1');
});
app.get('/incap-b-2', function (request, response) {
  response.render('auth/claims/pages/incap/incap-b-2');
});
app.get('/incap-b-3', function (request, response) {
  response.render('auth/claims/pages/incap/incap-b-3');
});
app.get('/incap-b-4', function (request, response) {
  response.render('auth/claims/pages/incap/incap-b-4');
});
app.get('/incap-b-5', function (request, response) {
  response.render('auth/claims/pages/incap/incap-b-5');
});
app.get('/incap-b-6', function (request, response) {
  response.render('auth/claims/pages/incap/incap-b-6');
});
app.get('/incap-b-7', function (request, response) {
  response.render('auth/claims/pages/incap/incap-b-7');
});
app.get('/incap-c-1', function (request, response) {
  response.render('auth/claims/pages/incap/incap-c-1');
});
app.get('/incap-review', function (request, response) {
  response.render('auth/claims/pages/incap/incap-review');
});
app.get('/incap-submitted', function (request, response) {
  response.render('auth/claims/pages/incap/incap-submitted');
});
app.get('/incap-docupload', function (request, response) {
  response.render('auth/claims/pages/incap/incap-docupload');
});
app.get('/incap-summary', function (request, response) {
  response.render('auth/claims/pages/incap/incap-summary');
});
app.get('/incap-ineligible', function (request, response) {
  response.render('auth/claims/pages/incap/incap-ineligible');
});

/* Claims - NLHC */

app.get('/nlhc-start', function (request, response, next) {
  response.render('auth/claims/pages/nlhc/nlhc-start');
});
app.get('/viewNLHCClaimDetail', function (request, response) {
  response.render('auth/claims/pages/nlhc/viewNLHCClaimDetail');
});
app.get('/mental-health-1', function (request, response) {
  response.render('auth/claims/pages/nlhc/mental-health-1');
});
app.get('/mental-health-2', function (request, response) {
  response.render('auth/claims/pages/nlhc/mental-health-2');
});
app.get('/mental-health-eligibility', function (request, response) {
  response.render('auth/claims/pages/nlhc/mental-health-eligibility');
});
app.get('/mental-health-review', function (request, response) {
  response.render('auth/claims/pages/nlhc/mental-health-review');
});
app.get('/mental-health-submitted', function (request, response) {
  response.render('auth/claims/pages/nlhc/mental-health-submitted');
});
app.get('/mental-health-summary', function (request, response) {
  response.render('auth/claims/pages/nlhc/mental-health-summary');
});

/* Claims - PI - LA */

app.get('/pi-lsq-pilot', function (request, response) {
  response.render('auth/claims/pages/pi/la/pi-la-pilot');
});
app.get('/pi-lsq-start', function (request, response) {
  response.render('auth/claims/pages/pi/la/pi-la-start');
});
app.get('/pi-lsq-claim1', function (request, response) {
  response.render('auth/claims/pages/pi/la/pi-la-claim1');
});
app.get('/pi-lsq-claim2', function (request, response) {
  response.render('auth/claims/pages/pi/la/pi-la-claim2');
});
app.get('/pi-lsq-claim3', function (request, response) {
  response.render('auth/claims/pages/pi/la/pi-la-claim3');
});
app.get('/pi-lsq-claim4', function (request, response) {
  response.render('auth/claims/pages/pi/la/pi-la-claim4');
});
app.get('/pi-lsq-claim5', function (request, response) {
  response.render('auth/claims/pages/pi/la/pi-la-claim5');
});
app.get('/pi-lsq-claim6', function (request, response) {
  response.render('auth/claims/pages/pi/la/pi-la-claim6');
});
app.get('/pi-lsq-claim6b', function (request, response) {
  response.render('auth/claims/pages/pi/la/pi-la-claim6b');
});
app.get('/pi-lsq-claim7', function (request, response) {
  response.render('auth/claims/pages/pi/la/pi-la-claim7');
});
app.get('/pi-lsq-claim7b', function (request, response) {
  response.render('auth/claims/pages/pi/la/pi-la-claim7b');
});
app.get('/viewPI-LSQ-detail', function (request, response) {
  response.render('auth/claim/pages/viewPI-LSQ-detail');
});
app.get('/viewPI-LSQ-detailb', function (request, response) {
  response.render('auth/claim/pages/viewPI-LSQ-detailb');
});

/* Alternative pages for testing in the pilot */

app.get('/pi-lsq-claim1c', function (request, response) {
  response.render('auth/claims/pages/pi/la/pi-la-claim1c');
});
app.get('/pi-lsq-claim2c', function (request, response) {
  response.render('auth/claims/pages/pi/la/pi-la-claim2c');
});
app.get('/pi-lsq-claim3c', function (request, response) {
  response.render('auth/claims/pages/pi/la/pi-la-claim3c');
});
app.get('/pi-lsq-claim4c', function (request, response) {
  response.render('auth/claims/pages/pi/la/pi-la-claim4c');
});
app.get('/pi-lsq-claim5c', function (request, response) {
  response.render('auth/claims/pages/pi/la/pi-la-claim5c');
});
app.get('/pi-lsq-claim6c', function (request, response) {
  response.render('auth/claims/pages/pi/la/pi-la-claim6c');
});

/* Claims - QS */
app.get('/qs-claimdetail', function (request, response) {
  response.render('auth/claims/pages/qs/viewQSClaimDetail');
});

/* Claims - Students */

app.get('/studentpreeligibility', function (request, response) {
  response.render('auth/claims/pages/students/studentpreeligibility');
});
app.get('/studentclaim1', function (request, response) {
  response.render('auth/claims/pages/students/studentclaim1');
});
app.get('/studentclaim1a', function (request, response) {
  response.render('auth/claims/pages/students/studentclaim1a');
});
app.get('/studentclaim2', function (request, response) {
  response.render('auth/claims/pages/students/studentclaim2');
});
app.get('/studentclaim3', function (request, response) {
  response.render('auth/claims/pages/students/studentclaim3');
});
app.get('/studentclaim4', function (request, response) {
  response.render('auth/claims/pages/students/studentclaim4');
});
app.get('/studentclaim4a', function (request, response) {
  response.render('auth/claims/pages/students/studentclaim4a');
});
app.get('/studentclaim5', function (request, response) {
  response.render('auth/claims/pages/students/studentclaim5');
});
app.get('/studentclaim6', function (request, response) {
  response.render('auth/claims/pages/students/studentclaim6');
});
app.get('/studentclaimupload', function (request, response) {
  response.render('auth/claims/pages/students/studentclaimupload');
});
app.get('/viewClaimDetailStudent', function (request, response) {
  response.render('auth/claims/pages/students/viewClaimDetailStudent');
});
app.get('/viewClaimRejected', function (request, response) {
  response.render('auth/claims/pages/students/viewClaimRejected');
});
app.get('/viewClaimWithdrawn', function (request, response) {
  response.render('auth/claims/pages/students/viewClaimWithdrawn');
});
app.get('/viewClaimInProgress', function (request, response) {
  response.render('auth/claims/pages/students/viewClaimInProgress');
});
app.get('/updateClaimInProgress', function (request, response) {
  response.render('auth/claims/pages/students/updateClaimInProgress');
});
app.get('/updateClaimInProgressSubmitting', function (request, response) {
  response.render('auth/claims/pages/students/updateClaimInProgressSubmitting');
});

/* Claims - Veteran Card */

app.get('/veteran-card-1', function (request, response) {
  response.render('auth/claims/pages/veterancard/veteran-card-1');
});
app.get('/veteran-card-2', function (request, response) {
  response.render('auth/claims/pages/veterancard/veteran-card-2');
});
app.get('/veteran-card-eligibility', function (request, response) {
  response.render('auth/claims/pages/veterancard/veteran-card-eligibility');
});
app.get('/veteran-card-review', function (request, response) {
  response.render('auth/claims/pages/veterancard/veteran-card-review');
});
app.get('/veteran-card-submitted', function (request, response) {
  response.render('auth/claims/pages/veterancard/veteran-card-submitted');
});
app.get('/veteran-card-summary', function (request, response) {
  response.render('auth/claims/pages/veterancard/veteran-card-summary');
});


/* CARD SPACE */

app.get('/healthcard-gold', function (request, response) {
  response.render('auth/card/healthcard-gold', {
    main_nav_active: 'healthcard'
  });
});
app.get('/healthcard-gold-tpi', function (request, response) {
  response.render('auth/card/healthcard-gold-tpi', {
    main_nav_active: 'healthcard'
  });
});
app.get('/healthcard-nlhc', function (request, response) {
  response.render('auth/card/healthcard-nlhc', {
    main_nav_active: 'healthcard'
  });
});
app.get('/healthcard-none', function (request, response) {
  response.render('auth/card/healthcard-none', {
    main_nav_active: 'healthcard'
  });
});
app.get('/healthcard-provisional', function (request, response) {
  response.render('auth/card/healthcard-provisional', {
    main_nav_active: 'healthcard'
  });
});
app.get('/healthcard-replacement-fail', function (request, response) {
  response.render('auth/card/healthcard-replacement-fail', {
    main_nav_active: 'healthcard'
  });
});
app.get('/healthcard-replacement-success', function (request, response) {
  response.render('auth/card/healthcard-replacement-success', {
    main_nav_active: 'healthcard'
  });
});
app.get('/healthcard-replacement', function (request, response) {
  response.render('auth/card/healthcard-replacement', {
    main_nav_active: 'healthcard'
  });
});
app.get('/healthcard-home', function (request, response) {
  response.render('auth/card/healthcard-white', {
    main_nav_active: 'healthcard'
  });
});



/**
  GLOBAL PAGES AND COMPONENT TESTING
*/
app.get('/autocomplete-test', function (request, response) {
  response.render('global/pages/autocomplete-test');
});
app.get('/contactus', function (request, response) {
  response.render('global/pages/contactusscreen');
});
app.get('/five-star-rating-test', function (request, response) {
  response.render('global/pages/five-star-rating-test');
});
app.get('/terms-and-conditions', function (request, response) {
  response.render('global/pages/terms-and-conditions');
});
app.use('/docs', serveIndex('docs', {}))
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});



/**
EMAILS 
**/

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


/**
  STYLE GUIDE
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


/**
  MYACCOUNT
**/

app.get('/myaccount', function (request, response) {
  response.render('myaccount/index');
});

/*
  STAFF SPACE
*/

app.get('/staff', function (request, response) {
  response.render('staff/index');
});

