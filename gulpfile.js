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
var babel = require("gulp-babel");

var config = {
  production: !!util.env.production
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task("js", function () {
  return gulp.src("src/js/*.js")
    .pipe(babel())
    .pipe(gulp.dest("docs/js"));
});


gulp.task('sass', function () {
  return gulp.src(['src/sass/main.scss', 'src/sass/myaccount.scss'])
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

gulp.task('sass-prod', function () {
  return gulp.src(['src/sass/main.scss', 'src/sass/myaccount.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({ includePaths: ['src/sass'] }))
    .pipe(sass().on('error', sass.logError))
    .pipe(uglifycss())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('docs/css'));
});



gulp.task('ejs', function () {
  return gulp.src('views/**/*.ejs')
    .pipe(livereload());
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('views/**/*.ejs', ['ejs']);
});

gulp.task('server', function () {
  nodemon({
    'script': 'index.js',
    'ignore': 'docs/js/*.js'
  });
});

gulp.task('serve', ['server', 'sass', 'js', 'watch']);

