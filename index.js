let express = require('express'),
  cookieParser = require("cookie-parser"),
  // featuretoggleapi = require('feature-toggle-api'),

  // not so secret secret
  secret = 'eeeek',

  // will use the PORT environment variable if present,
  // else use first argument from command line for PORT,
  // else default to a hard coded value of 5000
  port = process.env.PORT || process.argv[2] || 5000,
  app = express();



// using ejs for rendering
app.use(express.static(__dirname));
app.use(cookieParser());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// this is a pretty nice feature toggle. might be cool to do something like this in the future
// https://www.npmjs.com/package/feature-toggle-api
// var api = featuretoggleapi({
//   feature1: false,
//   feature2: true
// });



// using body parser to parse the body of incoming post requests
app.use(require('body-parser').urlencoded({
  extended: true // must give a value for extended
}));

// using express-session for session cookies
app.use(

  require('express-session')(

    {
      name: 'site_cookie',
      secret: secret,
      resave: false,
      saveUninitialized: false,
      cookie: {

        // make session cookies only last 15 seconds
        // for the sake of this demo
        maxAge: 15000

      }
    }

  )

);


var liveFeatureList = require('./feature-live-list.json');


// folder level renders 
app.get('/:id0', function (request, response) {
  response.render(request.params.id0, {
    main_nav_active: 'home',
    liveFeature: liveFeatureList
  });
});

app.get('/:id0/:id1', function (request, response) {

  response.render(request.params.id0 + "/" + request.params.id1, {
    main_nav_active: request.params.id1,
    liveFeature: liveFeatureList
  });
});

app.get('/:id0/:id1/:id2', function (request, response) {
  response.render(request.params.id0 + "/" + request.params.id1 + "/" + request.params.id2, {
    main_nav_active: request.params.id1,
    liveFeature: liveFeatureList,
    secondary_nav_active: request.params.id2,
    claimType: request.cookies.claimType
  });
});

app.get('/:id0/:id1/:id2/:id3', function (request, response) {
  response.render(request.params.id0 + "/" + request.params.id1 + "/" + request.params.id2 + "/" + request.params.id3, {
    main_nav_active: request.params.id1,
    liveFeature: liveFeatureList,
    secondary_nav_active: request.params.id2
  });
});

app.get('/',
  function (req, res) {
    res.render('unauth/', {
      layout: 'login',
      user: req.user
    });
  });

app.get('/mygov-login',

  function (req, res) {
    res.render('auth/mygov-login', {
      layout: 'login',
      user: req.user
    });
  });


app.get('/logout',
  function (req, res) {
    req.logout();
    res.redirect('/');
  });

app.listen(port, function () {

  console.log('listening on port: ' + port);

});