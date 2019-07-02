var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglifycss = require('gulp-uglifycss');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');
var util = require('gulp-util');
var babel = require("gulp-babel");
var header = require('gulp-header');
var fs = require("fs");


d = new Date(),
  headerComment = '/** \n * File generated on: \n * ' + d + '\n **/ \n\n';

var config = {
  production: !!util.env.production
};

gulp.task("js", function () {
  return gulp.src("src/js/*.js")
    .pipe(babel())
    .pipe(gulp.dest("docs/js"));
});

gulp.task('sass', function () {
  return gulp.src(['src/sass/main.scss', 'src/sass/myaccount.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['src/sass']
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(config.production ? uglifycss({
      "maxLineLen": 80
    }) : util.noop())
    .pipe(autoprefixer())
    .pipe(config.production ? util.noop() : sourcemaps.write())
    .pipe(header(headerComment))
    .pipe(gulp.dest('docs/css'))
    .pipe(livereload());
});

gulp.task('copy', function () {
  gulp.src('src/font/fontawesome/**')
    .pipe(gulp.dest('docs/css/fontawesome'));
});

gulp.task('sass-prod', function () {
  gulp.src('src/font/fontawesome/**')
    .pipe(gulp.dest('docs/css/fontawesome'));
  return gulp.src(['src/sass/main.scss', 'src/sass/myaccount.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['src/sass']
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(uglifycss())
    .pipe(autoprefixer())
    .pipe(header(headerComment))
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


gulp.task('serve', ['server', 'sass', 'js', 'watch', 'copy']);
