var gulp = require('gulp');

var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
// var watch = require('gulp-watch');

var jshint = require('gulp-jshint');

var paths = {
  styles: ['./styles/*.styl'],
  js: ['./scripts/**/*.js'],
  vendor: ['./bower_components/*.js'],
  dist: './build'
};

gulp.task('clean',function(){});
gulp.task('jshint', function(){
  return gulp.src(paths.js)
    .pipe(jshint('./jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['jshint']);
  gulp.watch(paths.styles, ['build-css']);
});

gulp.task('test', function(){});

gulp.task('build-css',function(){
  return gulp.src(paths.styles)
  .pipe(sourcemaps.init())
    .pipe(stylus())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.dist));
});

gulp.task('buildVendor', function(){});
gulp.task('buildApp',function (){});

gulp.task('watch', function() {
  return gulp.src('')

});

gulp.task('default', ['watch']);