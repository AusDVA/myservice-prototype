var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglifycss = require('gulp-uglifycss');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');
var sassdoc = require('sassdoc');
var util = require('gulp-util');

var config = {
  // assetsDir: 'app/Resources/assets',
  // sassPattern: 'sass/**/*.scss',
  production: !!util.env.production
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};



gulp.task('sass', function () {
  return gulp.src('src/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ includePaths: ['src/sass'] }))
    .pipe(sass().on('error', sass.logError))
    .pipe(config.production ? uglifycss({ "maxLineLen": 80 }) : util.noop())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(config.production ? util.noop() : sourcemaps.write())
    .pipe(gulp.dest('docs/css'))
    .pipe(sassdoc())
    .pipe(livereload());
});

gulp.task('scripts', function () {
  return gulp.src('docs/js/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(livereload());
});

gulp.task('ejs', function () {
  return gulp.src('views/**/*.ejs')
    .pipe(livereload());
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('docs/js/*.js', ['scripts']);
  gulp.watch('views/**/*.ejs', ['ejs']);
});

gulp.task('server', function () {
  nodemon({
    'script': 'index.js',
    'ignore': 'docs/js/*.js'
  });
});

gulp.task('serve', ['server', 'watch']);
