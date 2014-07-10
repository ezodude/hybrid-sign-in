/*jslint node: true */

'use strict';

var gulp = require('gulp'),
    browserify = require('browserify'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    source = require('vinyl-source-stream'),
    del = require('del');

var paths = {
  src: './src/**/*',
  www: './www/',
  js: ['./src/js/**/*.js'],
  jsSrcFile: './src/js/main.js',
  jsBuildFile: 'browserify-main.js',
  build: './src/build'
};

gulp.task('clean', function(cb) {
  del([paths.build], cb);
});

gulp.task('jshint', function () {
  return gulp.src(paths.js)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(notify({ message: 'jshint task complete' }));
});

gulp.task('browserify', function() {
  return browserify(paths.jsSrcFile)
    .bundle()
    .pipe(source(paths.jsBuildFile))
    .pipe(gulp.dest(paths.build + '/js/'))
    .pipe(notify({ message: 'browserify task complete' }));
});

gulp.task('img', function() {
  return gulp.src('./src/img/**/*')
    .pipe(gulp.dest(paths.build + '/img'))
    .pipe(notify({ message: 'img task complete' }));
});

gulp.task('css', function() {
  return gulp.src('./src/css/**/*')
    .pipe(gulp.dest(paths.build + '/css'))
    .pipe(notify({ message: 'css task complete' }));
});

gulp.task('lib', function() {
  return gulp.src('./src/lib/**/*')
    .pipe(gulp.dest(paths.build + '/lib'))
    .pipe(notify({ message: 'lib task complete' }));
});

gulp.task('static', function() {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest(paths.build))
    .pipe(notify({ message: 'static task complete' }));
});

gulp.task('www', ['clean', 'jshint', 'browserify', 'img', 'css', 'lib', 'static'], function() {
  return gulp.src('./src/build/**/*')
    .pipe(gulp.dest(paths.www))
    .pipe(notify({ message: 'cordova www create task complete' }));
});

gulp.task('build', ['www']);

gulp.task('default', ['build']);