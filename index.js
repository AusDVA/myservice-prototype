var express = require('express');
var app = express();
var serveIndex = require('serve-index')

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});
app.get('/index-login-errors', function(request, response) {
  response.render('pages/index-login-errors');
});

app.get('/register-step1', function(request, response) {
  response.render('pages/register-step1');
});
app.get('/register-step2', function(request, response) {
  response.render('pages/register-step2');
});
app.get('/register-step3', function(request, response) {
  response.render('pages/register-step3');
});
app.get('/forgot-password-step1', function(request, response) {
  response.render('pages/forgot-password-step1');
});
app.get('/forgot-password-step1-and-2', function(request, response) {
  response.render('pages/forgot-password-step1-and-2');
});
app.get('/forgot-password-step2', function(request, response) {
  response.render('pages/forgot-password-step2');
});
app.get('/forgot-password-step3', function(request, response) {
  response.render('pages/forgot-password-step3');
});
app.get('/forgot-password-step4', function(request, response) {
  response.render('pages/forgot-password-step4');
});
app.get('/cover-step1', function(request, response) {
  response.render('pages/cover-step1');
});
app.use('/docs', serveIndex('docs', {}))
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
