var gulp = require('gulp');
var settings = require('../../settings');
var postcss = require('gulp-postcss');
var rgba = require('postcss-hexrgba');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var cssImport = require('postcss-import');
var maps = require('gulp-sourcemaps');
var mixins = require('postcss-mixins');
var colorFunctions = require('postcss-color-function');



gulp.task('styles', function () {
  return gulp.src(settings.themeLocation + 'css/style.css')
    .pipe(maps.init())
    .pipe(postcss([cssImport, mixins, cssvars, nested, rgba, colorFunctions, autoprefixer]))
    .on('error', function (errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(maps.write('.'))
    .pipe(gulp.dest(settings.themeLocation));
});

