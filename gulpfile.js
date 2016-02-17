var gulp = require('gulp');

var concat = require('gulp-concat');
var del = require('del');
var jshint = require('gulp-jshint');
var mainBowerFiles = require('main-bower-files');
var nodemon = require('gulp-nodemon');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var nib = require('nib');
var uglify = require('gulp-uglify');

var paths = {
    entrypoint: './server/server.js',
    styles: [
      './styles/base.styl',
    ],
    js: ['./client/**/*.js'],
    vendor: [
      './bower_components/angular/angular.min.js',
      './bower_components/angular-ui-router/release/angular-ui-router.min.js',
      './bower_components/angular-animate/angular-animate.min.js',
      './bower_components/angular-aria/angular-aria.min.js',
      './bower_components/angular-messages/angular-messages.min.js',
      './bower_components/angular-material/angular-material.min.js',
      './bower_components/angular-sanitize/angular-sanitize.min.js',
      './bower_components/ng-csv/build/ng-csv.min.js',
      './bower_components/underscore/underscore-min.js'
    ],
    dist: './build'
};

// Cleanup
gulp.task('clean',function() {
    // Make sure to delete the contents of the directory
    // Not the directory itself
    return del(paths.dist + '/**');
});

// Linting
// gulp.task('jshint', function(){
//   return gulp.src(paths.js)
//     .pipe(jshint('./.jshintrc'))
//     .pipe(jshint.reporter('jshint-stylish'));
// });

// Builders
gulp.task('buildApp',function () {
    return gulp.src(paths.js)
    .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('buildCss',function() {
    return gulp.src(paths.styles)
    .pipe(sourcemaps.init())
    .pipe(stylus({
        compress: true,
        "include css": true,
        use: nib(),
    })
  )
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.dist));
});

gulp.task('buildVendor', function() {
    return gulp.src(paths.vendor)
    .pipe(sourcemaps.init())
      .pipe(concat('vendor.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('start', function () {
    nodemon({
        script: paths.entrypoint,
        ext: 'js html',
        env: {'NODE_ENV': 'development'}
    });
});

gulp.task('watch', function() {
    // gulp.watch(paths.js, ['jshint']);
    gulp.watch(['./styles/*.styl'], ['buildCss']);
    gulp.watch(paths.vendor, ['buildVendor']);
    gulp.watch(paths.js, ['buildApp']);
});

// Call these
gulp.task('build', ['buildCss','buildVendor','buildApp']);
gulp.task('dev',['clean','build','watch','start']);
gulp.task('default', ['clean','build']);
