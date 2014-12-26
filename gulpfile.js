var path = require('path');

var gulp       = require('gulp');
var data       = require('gulp-data');
var handlebars = require('gulp-compile-handlebars');
var rename     = require('gulp-rename');

gulp.task('default', ['html']);

gulp.task('html', function () {
  var defaultData = {
    url: 'http://aereal.org/',
  };
  var handlebarOptions = {};
  return gulp.src(['templates/**/*.hbs'])
    .pipe(data(function (file) {
      return require(metadataFile(file.path));
    }))
    .pipe(handlebars(defaultData, handlebarOptions))
    .pipe(rename(htmlify))
    .pipe(gulp.dest('dist'));
})

function htmlify (path) {
  path.extname = '.html';
}

function metadataFile (templateFile) {
  var base = path.basename(templateFile, '.hbs');
  return path.resolve(__dirname, 'data', base + '.json');
}
