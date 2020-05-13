var gulp = require('gulp'),
  sourcemaps = require('gulp-sourcemaps'),
  sass = require('gulp-sass');

// Default 'gulp' task: Dev mode. Automatically start watching.
gulp.task('default', ['watch']);

// Build Sass for development, with sourcemaps, and stream to browsersync.
gulp.task('styles-dev', function() {
  gulp.src('src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream());
});

// Build Javascript for development, with sourcemaps, and stream to browsersync.
gulp.task('js-dev', function() {
  gulp.src('./src/js/app.js')
    .pipe(gulp.dest('./assets/js'))
    .pipe(browserSync.stream());
});

// Production build. Minify, and ditch sourcemaps.
gulp.task('build-prod', function() {
  // Javascript.
  gulp.src('./src/js/app.js')
    .pipe(gulp.dest('./assets/js'));
  // Sass
  gulp.src('src/scss/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('assets/css'));
});