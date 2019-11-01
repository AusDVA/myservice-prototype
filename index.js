let express = require('express'),
  cookieParser = require("cookie-parser"),
  serveIndex = require('serve-index'),
  { promisify } = require('util'),
  { resolve } = require('path'),
  fs = require('fs'),
  path = require('path'),

  // will use the PORT environment variable if present,
  // else use first argument from command line for PORT,
  // else default to a hard coded value of 5000
  port = process.env.PORT || process.argv[2] || 5000,
  app = express();

let readdir = promisify(fs.readdir);
let stat = promisify(fs.stat);

// using ejs for rendering
app.use(express.static(__dirname));
app.use(cookieParser());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/favicon.ico', (req, res) => {
  res.send();
})

app.use(function (req, res, next) {
  res.locals.partials = __dirname + '/partials/';
  res.locals.forms = __dirname + '/partials/components/form-partials/';
  res.locals.components = __dirname + '/partials/components/';
  res.locals.templates = __dirname + '/partials/templates/';
  res.locals.content = __dirname + '/partials/content/';
  res.locals.formPartialsID = require('./helpers/formPartialsID');
  res.locals.generateOption = require('./helpers/generateOption');
  res.locals.replaceNonAlphanumeric = require('./helpers/replaceNonAlphanumeric');
  res.locals.generateCheckRadio = require('./helpers/generateCheckRadio');
  res.locals.generateCheckRadioIcons = require('./helpers/generateCheckRadioIcons');
  res.locals.generateTooltip = require('./helpers/generateTooltip');
  res.locals.generateLabel = require('./helpers/generateLabel');
  res.locals.generateButtonRadio = require('./helpers/generateButtonRadio');
  next();
});



// create sitemap 
app.use('/files', serveIndex('views', {
  'icons': true
}));

// using body parser to parse the body of incoming post requests
app.use(require('body-parser').urlencoded({ extended: true }));

app.use(
  require('express-session')({
    name: 'site_cookie',
    secret: 'eeeek',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 15000 }
  })
);

console.log('build env:', app.settings.env);
var liveFeatureList = require('./feature-flag-list.json');
var liveFeatureEnv = [];

// loading in different lists depending on which git branch (but not in heroku)
if (app.settings.env === "development") {
  var gitBranch = require('git-branch');
}

if (typeof gitBranch !== 'undefined' && gitBranch) {
  console.log('Working on branch:', gitBranch.sync());
  if (gitBranch.sync() === 'master') {
    liveFeatureList = liveFeatureList.production;
  } else {
    liveFeatureEnv = liveFeatureList.development;
  }
} else if (app.settings.env === "production") {
  liveFeatureEnv = liveFeatureList.production;
} else {
  liveFeatureEnv = liveFeatureList.development;
}

console.log('List of features that are unhidden:');
console.log(liveFeatureList);

app.get('/sitemap', (req, res) => {
  async function getFiles(dir) {
    const subdirs = await readdir(dir);
    const files = await Promise.all(subdirs.map(async (subdir) => {
      const res = resolve(dir, subdir);
      return (await stat(res)).isDirectory() ? getFiles(res) : res;
    }));
    return files.reduce((a, f) => a.concat(f), []);
  }

  (async () => {
    getFiles("./views").then(async files => {
      const allFiles = files.map(file => {
        file = path.normalize(file);
        file = file.replace(__dirname, "");
        file = file.replace(/\\/g, "/");
        file = file.replace("/views", "");

        const data = fs.readFileSync(`./views/${file}`, "utf8")

        var title = data.match(/<title>(.*)<\/title>/) || data.split("%>")[0].match(/title: "(.*)"/) || null;
        var heading = data.match(/<span class="heading">(.*)<\/span>/) || data.split("%>")[0].match(/heading: "(.*)"/) || null;
        var claim = data.includes('include(templates+"header"') || data.includes('- include(components+"styleguide/styleguide-header"') ? data.split("%>")[0].match(/claim: "(.*?)"/) : null

        if (title !== null) title = JSON.parse(JSON.stringify(title))[1];
        if (heading !== null) heading = JSON.parse(JSON.stringify(heading))[1];
        if (claim !== null) claim = JSON.parse(JSON.stringify(claim))[1]

        return {
          file,
          title,
          claim,
          heading
        }
      })

      const sortedClaims = [...new Set(allFiles.map(file => file.claim))]
        .map(claim => allFiles
          .filter(files => files.claim === claim
        )).reverse();

      // const newSortedClaims = sortedClaims.filter(n => !n[0].claim.includes("Style Guide"))

      res.render('sitemap', {
        sortedClaims
      })
    })
  })();
})

// folder level renders 
app.get('/:id0', function (request, response) {
  response.render(request.params.id0, {
    main_nav_active: 'home',
    liveFeature: liveFeatureEnv
  });
});

app.get('/:id0/:id1', function (request, response) {
  response.render(request.params.id0 + "/" + request.params.id1, {
    main_nav_active: request.params.id1,
    liveFeature: liveFeatureEnv
  });
});

app.get('/:id0/:id1/:id2', function (request, response) {
  response.render(request.params.id0 + "/" + request.params.id1 + "/" + request.params.id2, {
    main_nav_active: request.params.id1,
    liveFeature: liveFeatureEnv,
    secondary_nav_active: request.params.id2,
    claimType: request.cookies.claimType
  });
});

app.get('/:id0/:id1/:id2/:id3', function (request, response) {
  response.render(request.params.id0 + "/" + request.params.id1 + "/" + request.params.id2 + "/" + request.params.id3, {
    main_nav_active: request.params.id1,
    liveFeature: liveFeatureEnv,
    secondary_nav_active: request.params.id2
  });
});

app.get('/',
  function (request, response) {
    response.render('unauth/index-loading', {
      layout: 'login',
      user: request.user,
      liveFeature: liveFeatureEnv
    });
  });

app.get('/mygov-login',
  function (request, response) {
    response.render('auth/mygov-login', {
      layout: 'login',
      user: request.user,
      liveFeature: liveFeatureEnv
    });
  });

app.get('/logout',
  function (request, response) {
    request.logout();
    response.redirect('/');
  });

app.listen(port, function () {
  console.log('listening on port: ' + port);
});