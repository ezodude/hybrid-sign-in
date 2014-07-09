/*jslint node: true */

'use strict';

var gulp = require('gulp'),
    browserify = require('browserify'),
    jshint = require('gulp-jshint'),
    source = require('vinyl-source-stream');

var paths = {
  src: './src/*',
  www: './www/',
  js: ['./src/**/*.js'],
  jsSrcFile: ['./src/js/main.js'],
  jsBuildFolder: ['./src/js/'],
  jsBuildFile: 'browserify-project.js'
};

gulp.task('jshint', function () {
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('browserify', function() {
  return browserify(paths.jsSrcFile)
    .bundle()
    .pipe(source(paths.jsBuildFile))
    .pipe(gulp.dest(paths.jsBuildFolder));
});

gulp.task('copy', function () {
  return gulp.src(paths.src)
    .pipe(gulp.dest(paths.www));
});

gulp.task('build', ['jshint', 'browserify']);

gulp.task('default', ['build']);