var gulp = require('gulp');
var gutil = require('gulp-util');

var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var del = require('del');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
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
      './bower_components/angular-cookies/angular-cookies.min.js',
      './bower_components/angular-messages/angular-messages.min.js',
      './bower_components/angular-material/angular-material.min.js',
      './bower_components/angular-sanitize/angular-sanitize.min.js',
      './bower_components/ng-csv/build/ng-csv.min.js',
      './bower_components/underscore/underscore-min.js'
    ],
    dist: './build'
};

// Error handling

// Command line option:
//  --fatal=[warning|error|off]
var fatalLevel = require('yargs').argv.fatal;
var ERROR_LEVELS = ['error', 'warning'];

function isFatal(level) {
    return ERROR_LEVELS.indexOf(level) <= ERROR_LEVELS.indexOf(fatalLevel || 'error');
}

// Handle an error based on its severity level.
// Log all levels, and exit the process for fatal levels.
function handleError(level, error) {
    gutil.log(error.message);
    if (isFatal(level)) {
        process.exit(1);
    }
}

// Convenience handler for error-level errors.
function onError(error) { handleError.call(this, 'error', error);}

// Convenience handler for warning-level errors.
function onWarning(error) { handleError.call(this, 'warning', error);}


// Task that emits an error that's treated as a warning.
gulp.task('warning', function() {
   gulp.src(paths.js).
      pipe(jshint()).
      pipe(jshint.reporter(stylish)).
      on('error', onWarning);
});

// Task that emits an error that's treated as an error.
gulp.task('error', function() {
   gulp.src(paths.js).
      pipe(jshint()).
      pipe(jshint.reporter(stylish)).
      on('error', onError);
});

// Cleanup
gulp.task('clean',function() {
    // Make sure to delete the contents of the directory
    // Not the directory itself
    return del(paths.dist + '/**');
});


// Builders
gulp.task('buildApp',function () {
    return gulp.src(paths.js)
    .pipe(sourcemaps.init())
      // .pipe(uglify())
      .pipe(concat('app.min.js'))
      .on('error', gutil.log)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('buildCss',function() {
    return gulp.src(paths.styles)
    .pipe(sourcemaps.init())
    .pipe(stylus({
        'include css': true,
        use: nib(),
    }))
    // .pipe(cssnano())
    .pipe(sourcemaps.write())
    .on('error', gutil.log)
    .pipe(gulp.dest(paths.dist));
});

gulp.task('buildVendor', function() {
    return gulp.src(paths.vendor)
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.min.js'))
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
    fatalLevel = fatalLevel || 'off';
    gulp.watch(paths.js, ['error']);
    gulp.watch(['./styles/*.styl'], ['buildCss']);
    gulp.watch(paths.vendor, ['buildVendor']);
    gulp.watch(paths.js, ['buildApp']);
});

// Call these
gulp.task('build', ['buildCss','buildVendor','buildApp']);
gulp.task('dev',['clean','build','watch','start']);
gulp.task('default', ['clean','build']);
