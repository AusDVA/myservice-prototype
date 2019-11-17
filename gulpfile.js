const autoprefixer = require('autoprefixer'),
  babel = require('gulp-babel'),
  browserSync = require('browser-sync').create(),
  colourblind = require('postcss-colorblind'),
  cssnano = require('cssnano'),
  cssnext = require('postcss-cssnext'),
  gulp = require('gulp'),
  header = require('gulp-header'),
  nodemon = require('gulp-nodemon'),
  noop = require('gulp-noop'),
  postcss = require('gulp-postcss'),
  postcssDiscardComments = require('postcss-discard-comments')
  postcssDiscardEmpty = require('postcss-discard-empty'),
  postcssMergeLonghand = require('postcss-merge-longhand'),
  reload = browserSync.reload,
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps');

sass.compiler = require('node-sass');

d = new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' }),
  headerComment = `/** \n * File generated on: \n ${d} * \n **/ \n\n`;

var config = {
  production: false,
  colourblind: '' // https://github.com/btholt/postcss-colorblind
}

gulp.task('sass', () => {
  var plugins = [
    cssnext({
      browsers: [
        'last 2 versions',
        'ie >= 11',
        '> 1%'
      ]
    })
  ];

  if (config.production) {
    plugins = [...plugins, cssnano({ preset: 'default' }), postcssDiscardComments({ removeAll: true }), postcssDiscardEmpty(), postcssMergeLonghand()];
  } 

  if (config.colourblind !== '' && config.colourblind !== false) plugins.push(colourblind({ method: config.colourblind }));

  console.log(`PRODUCTION: ${config.production}`)

  return gulp.src(['src/sass/main.scss', 'src/sass/myaccount.scss'])
    .pipe(config.production ? noop() : sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(header(headerComment))
    .pipe(config.production ? noop() : sourcemaps.write())
    .pipe(gulp.dest('docs/css'))
    .pipe(reload({ stream: true }));
});

gulp.task('ejs', () => {
  return gulp.src(['views/**/*.ejs', 'partials/**/*.ejs'])
    .pipe(reload({ stream: true }));
})

gulp.task('copy', () => {
  return gulp.src('src/font/fontawesome/**')
    .pipe(gulp.dest('docs/css/fontawesome'));
});

gulp.task('js', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('docs/js'))
    .pipe(reload({ stream: true }))
})

gulp.task('bs-reload', done => {
    browserSync.reload();
    done();
});

gulp.task('watch', () => {
  gulp.watch('src/sass/*.scss', gulp.series(['sass', 'bs-reload']));
  gulp.watch('src/js/*.js', gulp.series(['js', 'bs-reload']));
  gulp.watch(['views/**/*.ejs', 'partials/**/*.ejs'], gulp.series(['ejs', 'bs-reload']));
})

gulp.task('prod', gulp.series((done) => {config.production = true; done()}, gulp.parallel('js', 'copy', 'sass')));


gulp.task('server', cb => {
  var started = false;

  return nodemon({
    'script': 'index.js',
    'ignore': ["views/", "partials/", "docs/", "src/"],
    'nodeArgs': ['--inspect=127.0.0.1:9229']
  }).on('start', () => {
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('browser-sync', gulp.series(['server'], () => {
  browserSync.init({
    proxy: "http://localhost:5000",
    logFileChanges: false,
    startPath: "/auth"
  });
}));

gulp.task('serve', gulp.series(gulp.parallel('js', 'copy', 'sass', 'copy'), gulp.parallel('watch', 'browser-sync')))