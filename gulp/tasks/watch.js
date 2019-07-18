var gulp = require('gulp');
var settings = require('../../settings');
var webpack = require('webpack');
var watch = require("gulp-watch");
var browserSync = require('browser-sync').create();

gulp.task('watch', function () {

  browserSync.init({
    notify: false,
    proxy: settings.urlToPreview,
    ghostMode: true
  });

  /* WATCH HTML/PHP FILES */
  watch('../../**/*.php', function () {
    browserSync.reload();
  });

  /* WATCH STYLES */
  gulp.watch(settings.themeLocation + 'css/**/*.css', ['waitForStyles']);

  /* WATCH SCRIPTS */
  gulp.watch([settings.themeLocation + 'js/modules/*.js', settings.themeLocation + 'js/App.js'], ['waitForScripts']);


})

/* task waitForStyles() */
gulp.task('waitForStyles', ['styles'], function () {
  return gulp.src(settings.themeLocation + 'style.css')
    .pipe(browserSync.stream());
});

/* task waitForScripts */
gulp.task('waitForScripts', ['scripts'], function () {
  browserSync.reload();
});

