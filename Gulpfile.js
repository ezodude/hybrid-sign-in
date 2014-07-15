/*jslint node: true */

'use strict';

var gulp = require('gulp'),
    browserify = require('browserify'),
    jshint = require('gulp-jshint'),
    source = require('vinyl-source-stream'),
    execSync = require('exec-sync');

var paths = {
  src: './src/**/*',
  www: './www/',
  js: ['./src/js/**/*.js'],
  jsSrcFile: './src/js/main.js',
  jsBuildFile: 'browserify-main.js'
};

gulp.task('clean', function(cb) {
  execSync('rm -rf ./www');
  cb();
});

gulp.task('jshint', function (cb) {
  gulp.src(paths.js)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
  cb();
});

gulp.task('browserify', function(cb) {
  browserify(paths.jsSrcFile)
    .bundle()
    .pipe(source(paths.jsBuildFile))
    .pipe(gulp.dest(paths.www + '/js/'));
  cb();
});

gulp.task('img', function(cb) {
  gulp.src('./src/img/**/*')
    .pipe(gulp.dest(paths.www + '/img'));
  cb();
});

gulp.task('css', function(cb) {
  gulp.src('./src/css/**/*')
    .pipe(gulp.dest(paths.www + '/css'));
  cb();
});

gulp.task('lib', function(cb) {
  gulp.src('./src/lib/**/*')
    .pipe(gulp.dest(paths.www + '/lib'));
  cb();
});

gulp.task('static', function(cb) {
  gulp.src('./src/index.html')
    .pipe(gulp.dest(paths.www));
  cb();
});

gulp.task('build', ['clean', 'jshint', 'browserify', 'static', 'img', 'css', 'lib']);

gulp.task('default', ['build']);