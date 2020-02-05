let express = require("express"),
  cookieParser = require("cookie-parser"),
  serveIndex = require("serve-index"),
  fs = require("fs"),
  path = require("path"),
  { promisify } = require("util"),
  { resolve } = require("path"),
  // will use the PORT environment variable if present,
  // else use first argument from command line for PORT,
  // else default to a hard coded value of 4000
  port = process.env.PORT || process.argv[2] || 4000,
  app = express();

let readdir = promisify(fs.readdir);
let stat = promisify(fs.stat);

// using ejs for rendering
app.use(express.static(__dirname));
app.use(cookieParser());

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/favicon.ico", (req, res) => {
  res.send();
});

console.log("build env:", app.settings.env);
var liveFeatureList = require("./feature-flag-list.json");
var liveFeatureEnv = [];

// loading in different lists depending on which git branch (but not in heroku)
if (app.settings.env === "development") {
  var gitBranch = require("git-branch");
}

if (typeof gitBranch !== "undefined" && gitBranch) {
  console.log("Working on branch:", gitBranch.sync());
  if (gitBranch.sync() === "master") {
    liveFeatureList = liveFeatureList.production;
  } else {
    liveFeatureEnv = liveFeatureList.development;
  }
} else if (app.settings.env === "production") {
  liveFeatureEnv = liveFeatureList.production;
} else {
  liveFeatureEnv = liveFeatureList.development;
}

console.log("List of features that are unhidden:");
console.log(liveFeatureList);

app.use((req, res, next) => {
  res.locals.partials = __dirname + "/partials/";
  res.locals.forms = __dirname + "/partials/components/form-partials/";
  res.locals.components = __dirname + "/partials/components/";
  res.locals.templates = __dirname + "/partials/templates/";
  res.locals.content = __dirname + "/partials/content/";
  res.locals.formPartialsID = require("./helpers/formPartialsID");
  res.locals.generateOption = require("./helpers/generateOption");
  res.locals.replaceNonAlphanumeric = require("./helpers/replaceNonAlphanumeric");
  res.locals.generateCheckRadio = require("./helpers/generateCheckRadio");
  res.locals.generateCheckRadioIcons = require("./helpers/generateCheckRadioIcons");
  res.locals.generateTooltip = require("./helpers/generateTooltip");
  res.locals.generateLabel = require("./helpers/generateLabel");
  res.locals.generateButtonRadio = require("./helpers/generateButtonRadio");
  res.locals.locals = { liveFeature: liveFeatureEnv };
  next();
});

// create sitemap
app.use(
  "/files",
  serveIndex(__dirname, {
    icons: true
  })
);

// using body parser to parse the body of incoming post requests
app.use(require("body-parser").urlencoded({ extended: true }));

app.use(
  require("express-session")({
    name: "site_cookie",
    secret: "eeeek",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 15000 }
  })
);

app.get("/sitemap", (req, res) => {
  async function getFiles(dir) {
    const subdirs = await readdir(dir);
    const files = await Promise.all(
      subdirs.map(async subdir => {
        const res = resolve(dir, subdir);
        return (await stat(res)).isDirectory() ? getFiles(res) : res;
      })
    );
    return files.reduce((a, f) => a.concat(f), []);
  }

  (async () => {
    getFiles("./views").then(async files => {
      const allFiles = files.map(file => {
        file = path.normalize(file);
        file = file.replace(__dirname, "");
        file = file.replace(/\\/g, "/");
        file = file.replace("/views", "");

        const data = fs.readFileSync(`./views/${file}`, "utf8");

        var title =
          data.match(
            /<%- include\(templates\+"header"[\s\S]*?heading: "(.*?)"[\s\S]*?%>/
          ) ||
          data.match(/<title>(.*)<\/title>/) ||
          null;
        var heading =
          data.match(
            /<%- include\(templates\+"header"[\s\S]*?heading: "(.*?)"[\s\S]*?%>/
          ) ||
          data.match(
            /<%- include\(components\+"styleguide\/styleguide-header"[\s\S]*?heading: "(.*?)"[\s\S]*?%>/
          ) ||
          null;
        var claim =
          data.match(
            /<%- include\(templates\+"header"[\s\S]*?claim: "(.*?)"[\s\S]*?%>/
          ) ||
          data.match(
            /<%- include\(components\+"styleguide\/styleguide-header"[\s\S]*?claim: "(.*?)"[\s\S]*?%>/
          ) ||
          null;

        if (title !== null) title = JSON.parse(JSON.stringify(title))[1];
        if (heading !== null) heading = JSON.parse(JSON.stringify(heading))[1];
        if (claim !== null) claim = JSON.parse(JSON.stringify(claim))[1];

        return {
          file,
          title,
          claim,
          heading
        };
      });

      const sortedClaims = [...new Set(allFiles.map(file => file.claim))]
        .map(claim => allFiles.filter(files => files.claim === claim))
        .reverse();

      res.render("sitemap", {
        sortedClaims
      });
    });
  })();
});

app.get("/", (req, res) => {
  res.render("unauth/index-loading");
});

app.get("*", (req, res) => {
  // var url = req.originalUrl.replace(".ejs", "");
  var url = req.path;

  if (url.charAt(0) === "/") url = url.substr(1);

  var file = path.join(`${__dirname}/views/${url}.ejs`);
  var index = path.join(`${__dirname}/views/${url}/index.ejs`);

  if (liveFeatureEnv === liveFeatureList.production) {
    if (fs.existsSync(file) || fs.existsSync(index)) {
      // res.render(url, { source_url: req.originalUrl })
      res.render(url, { source_url: req.path });
    } else {
      // res.render("unauth/not-found", { source_url: req.originalUrl })
      res.render("unauth/not-found", { source_url: req.path });
    }
  } else {
    res.render(url, { source_url: req.originalUrl });
  }
});

app.listen(port, () => {
  console.log("listening on port: " + port);
});