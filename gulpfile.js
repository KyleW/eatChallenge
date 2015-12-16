var gulp = require('gulp');

var concat = require('gulp-concat');
var del = require('del');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');

var paths = {
  entrypoint: './server/index.js',
  styles: ['./styles/*.styl'],
  js: ['./scripts/**/*.js'],
  vendor: ['./bower_components/*.js'],
  dist: './build'
};

// Cleanup
gulp.task('clean',function(){
  return del(paths.dist)
});

// Linting
gulp.task('jshint', function(){
  return gulp.src(paths.js)
    .pipe(jshint('./jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

// Builders
gulp.task('buildApp',function (){
  return gulp.src(paths.js)
  .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.dist));
});

gulp.task('buildCss',function(){
  return gulp.src(paths.styles)
  .pipe(sourcemaps.init())
    .pipe(stylus())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.dist));
});

gulp.task('buildVendor', function(){
  return gulp.src(paths.vendor)
  .pipe(sourcemaps.init())
    .pipe(concat('vendor.js'))
    .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.dist));
});

gulp.task('start', function () {
  nodemon({
    script: paths.entrypoint,
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('watch', function() {
  gulp.watch(paths.js, ['jshint']);
  gulp.watch(paths.styles, ['buildCss']);
  gulp.watch(paths.vendor, ['buildVendor']);
  gulp.watch(paths.js, ['buildApp']);
});


// Call these
gulp.task('build', ['buildCss','buildVendor','buildApp'])
gulp.task('dev',['clean','build','watch','start'])
gulp.task('default', ['clean','build']);