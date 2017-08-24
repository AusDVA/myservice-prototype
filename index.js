var express = require('express');
var app = express();
var serveIndex = require('serve-index')

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


/*
Unauthenticated space
*/

app.get('/', function(request, response) {
  response.render('unauth/index');
});
app.get('/medical-services', function(request, response) {
  response.render('unauth/medical-services');
});
app.get('/everyday-care', function(request, response) {
  response.render('unauth/everyday-care');
});
app.get('/career-guidance', function(request, response) {
  response.render('unauth/career-guidance');
});
app.get('/financial-support', function(request, response) {
  response.render('unauth/financial-support');
});
app.get('/family-and-counselling', function(request, response) {
  response.render('unauth/family-and-counselling');
});
app.get('/index-login-errors', function(request, response) {
  response.render('unauth/index-login-errors');
});


/*
New registration flow for broadening
*/

app.get('/register', function(request, response) {
  response.render('unauth/registration/pages/register');
});

/* DVA and PMKeys */
app.get('/register-dva-and-pmkeys1', function(request, response) {
  response.render('unauth/registration/pages/register-dva-and-pmkeys1');
});
app.get('/register-dva-and-pmkeys2', function(request, response) {
  response.render('unauth/registration/pages/register-dva-and-pmkeys2');
});
app.get('/register-dva-and-pmkeys3', function(request, response) {
  response.render('unauth/registration/pages/register-dva-and-pmkeys3');
});

/* DVA only */
app.get('/register-dva-only1', function(request, response) {
  response.render('unauth/registration/pages/register-dva-only1');
});
app.get('/register-dva-only2', function(request, response) {
  response.render('unauth/registration/pages/register-dva-only2');
});
app.get('/register-dva-only3', function(request, response) {
  response.render('unauth/registration/pages/register-dva-only3');
});
app.get('/change-password', function(request, response) {
  response.render('auth/change-password');
});

/* Verify displays service history if DVA only */
app.get('/verify-details1', function(request, response) {
  response.render('auth/verify-details1');
});

/* PMKeys only */
app.get('/register-pmkeys-only1', function(request, response) {
  response.render('unauth/registration/pages/register-pmkeys-only1');
});
app.get('/register-pmkeys-only2', function(request, response) {
  response.render('unauth/registration/pages/register-pmkeys-only2');
});
app.get('/register-pmkeys-only3', function(request, response) {
  response.render('unauth/registration/pages/register-pmkeys-only3');
});

/* Service number only */
app.get('/register-service-number1', function(request, response) {
  response.render('unauth/registration/pages/register-service-number1.ejs');
});
app.get('/register-service-number2', function(request, response) {
  response.render('unauth/registration/pages/register-service-number2.ejs');
});
app.get('/register-service-number3', function(request, response) {
  response.render('unauth/registration/pages/register-service-number3.ejs');
});
app.get('/register-service-number4', function(request, response) {
  response.render('unauth/registration/pages/register-service-number4.ejs');
});


app.get('/contactusscreen', function(request, response) {
  response.render('pages/contactusscreen');
});
app.get('/forgot-password-step1', function(request, response) {
  response.render('unauth/user/pages/forgot-password-step1');
});
app.get('/forgot-password-step1-and-2', function(request, response) {
  response.render('unauth/user/pages/forgot-password-step1-and-2');
});
app.get('/forgot-password-step2', function(request, response) {
  response.render('unauth/user/pages/forgot-password-step2');
});
app.get('/forgot-password-step3', function(request, response) {
  response.render('unauth/user/pages/forgot-password-step3');
});
app.get('/forgot-password-step4', function(request, response) {
  response.render('unauth/user/pages/forgot-password-step4');
});
app.get('/system-error', function(request, response) {
  response.render('unauth/system-error');
});

/**
  Authenticated space
*/
app.get('/auth', function(request, response) {
  response.render('auth/index');
});
app.get('/index-treatment', function(request, response) {
  response.render('auth/index-treatment');
});
app.get('/index-flexbox', function(request, response) {
  response.render('auth/index-flexbox');
});
app.get('/index-preloader', function(request, response) {
  response.render('auth/index-preloader');
});
app.get('/profile', function(request, response) {
  response.render('auth/profile');
});
app.get('/profile-updated', function(request, response) {
  response.render('auth/profile-updated');
});
app.get('/password-updated', function(request, response) {
  response.render('auth/index-password-updated');
});
app.get('/terms-and-conditions', function(request, response) {
  response.render('global/pages/terms-and-conditions');
});
app.get('/viewCoverDetail', function(request, response) {
  response.render('auth/cover/pages/viewCoverDetail');
});
app.get('/viewNLHCCoverDetail', function(request, response) {
  response.render('auth/cover/pages/viewNLHCCoverDetail');
});
app.get('/cover-step1', function(request, response) {
  response.render('auth/cover/pages/cover-step1');
});
app.get('/cover-step2', function(request, response) {
  response.render('auth/cover/pages/cover-step2');
});
app.get('/cover-step3', function(request, response) {
  response.render('auth/cover/pages/cover-step3');
});
app.get('/cover-step4', function(request, response) {
  response.render('auth/cover/pages/cover-step4');
});
app.get('/cover-step5', function(request, response) {
  response.render('auth/cover/pages/cover-step5');
});
app.get('/cover-step6', function(request, response) {
  response.render('auth/cover/pages/cover-step6');
});
app.get('/cover-step6-b', function(request, response) {
  response.render('auth/cover/pages/cover-step6-b');
});
app.get('/cover-nlhc-step2', function(request, response) {
  response.render('auth/cover/pages/cover-nlhc-step2');
});
app.get('/cover-nlhc-approved', function(request, response) {
  response.render('auth/cover/pages/cover-nlhc-approved');
});
app.get('/cover-nlhc-approved-b', function(request, response) {
  response.render('auth/cover/pages/cover-nlhc-approved-b');
});
app.get('/cover-nlhc-step4', function(request, response) {
  response.render('auth/cover/pages/cover-nlhc-step4');
});

app.get('/claim-step1', function(request, response) {
  response.render('auth/claim/pages/claim-step1');
});
app.get('/claim-step2', function(request, response) {
  response.render('auth/claim/pages/claim-step2');
});
app.get('/claim-step3', function(request, response) {
  response.render('auth/claim/pages/claim-step3');
});
app.get('/claim-step4', function(request, response) {
  response.render('auth/claim/pages/claim-step4');
});
app.get('/claim-step5', function(request, response) {
  response.render('auth/claim/pages/claim-step5');
});
app.get('/claim-step6', function(request, response) {
  response.render('auth/claim/pages/claim-step6');
});
app.get('/claim-nlhc-submitted', function(request, response) {
  response.render('auth/claim/pages/claim-nlhc-submitted');
});
app.get('/viewClaimDetail', function(request, response) {
  response.render('auth/claim/pages/viewClaimDetail');
});
app.get('/viewNLHCClaimDetail', function(request, response) {
  response.render('auth/claim/pages/viewNLHCClaimDetail');
});

/**
  Component testing
*/
app.get('/autocomplete-test', function(request, response) {
  response.render('global/pages/autocomplete-test');
});
app.get('/five-star-rating-test', function(request, response) {
  response.render('global/pages/five-star-rating-test');
});

app.use('/docs', serveIndex('docs', {}))
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
