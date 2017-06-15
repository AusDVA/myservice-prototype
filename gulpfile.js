var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');

gulp.task('sass', function () {
  return gulp.src('src/sass/main.scss')
    .pipe(sass({includePaths: ['src/sass']}))
    .pipe(sass({outputStyle: 'compressed'})
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('docs/css'))
    .pipe(livereload());
});

/*
gulp.task('styles', function() {
  return sass('src/sass/*.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('docs/css'))
    .pipe(livereload());
});
*/
gulp.task('scripts', function() {
  return gulp.src('docs/js/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(livereload());
});

gulp.task('ejs',function(){
    return gulp.src('views/**/*.ejs')
    .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('docs/js/*.js', ['scripts']);
    gulp.watch('views/**/*.ejs', ['ejs']);
});

gulp.task('server',function(){
    nodemon({
        'script': 'index.js',
        'ignore': 'docs/js/*.js'
    });
});

gulp.task('serve', ['server','watch']);
