var express = require('express');
var app = express();
var serveIndex = require('serve-index')

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

/**
Unauthenticated space
*/
app.get('/', function(request, response) {
  response.render('unauth/index');
});
app.get('/index2', function(request, response) {
  response.render('unauth/index2');
});
app.get('/medical-services', function(request, response) {
  response.render('unauth/medical-services');
});
app.get('/every-day-care', function(request, response) {
  response.render('unauth/every-day-care');
});
app.get('/index-login-errors', function(request, response) {
  response.render('unauth/index-login-errors');
});

app.get('/register-step1', function(request, response) {
  response.render('unauth/registration/pages/register-step1');
});
app.get('/contactusscreen', function(request, response) {
  response.render('pages/contactusscreen');
});
app.get('/register-step2', function(request, response) {
  response.render('unauth/registration/pages/register-step2');
});
app.get('/register-step3', function(request, response) {
  response.render('unauth/registration/pages/register-step3');
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
app.get('/cover-nlhc-submitted', function(request, response) {
  response.render('auth/cover/pages/cover-nlhc-submitted');
});
app.get('/cover-nlhc-step4', function(request, response) {
  response.render('auth/cover/pages/cover-nlhc-step4');
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
