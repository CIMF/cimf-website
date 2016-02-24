'use strict';

const gulp = require('gulp');
const imageResize = require('gulp-image-resize');
const rename = require('gulp-rename');
const clone = require('gulp-clone');
const es = require('event-stream');
const print = require('gulp-print');

gulp.task('default', () => {
  const imgs = gulp.src('source/client/img/profile-img/**/*.{png,jpg,jpeg}');

  const x1_200 = imgs.pipe(clone())
    .pipe(imageResize({
      width: 200,
      height: 300,
      upscale: true,
      crop: true,
    }))
    .pipe(rename((path) => {
      path.basename += '-200-@1x';
    }));

  const x2_200 = imgs.pipe(clone())
    .pipe(imageResize({
      width: 400,
      height: 600,
      upscale: true,
      crop: true,
    }))
    .pipe(rename((path) => {
      path.basename += '-200-@2x';
    }));

  const x1_300 = imgs.pipe(clone())
    .pipe(imageResize({
      width: 300,
      height: 450,
      upscale: true,
      crop: true,
    }))
    .pipe(rename((path) => {
      path.basename += '-300-@1x';
    }));

  const x2_300 = imgs.pipe(clone())
    .pipe(imageResize({
      width: 600,
      height: 900,
      upscale: true,
      crop: true,
    }))
    .pipe(rename((path) => {
      path.basename += '-300-@2x';
    }));

  const cim_img = gulp.src('source/client/img/cim-img/**/*.{png,jpg,jpeg}');

  const cim_x1_600 = cim_img.pipe(clone())
    .pipe(imageResize({
      width: 600,
      // upscale: true,
    }))
    .pipe(rename((path) => {
      path.basename += '@1x';
    }));

  const cim_x2_600 = cim_img.pipe(clone())
    .pipe(imageResize({
      width: 1200,
    }))
    .pipe(rename((path) => {
      path.basename += '@2x';
    }));

  const logo = gulp.src('source/client/img/logo/**/*.{png,jpg,jpeg}')
    .pipe(imageResize({
      height: 50,
    }))
    .pipe(gulp.dest('public/img/logo'));

  const header_bg = gulp.src('source/client/img/header-bg/**/*.{png,jpg,jpeg}')
    // .pipe(imageResize({
    //   width: 1980,
    // }))
    .pipe(gulp.dest('public/img/header-bg'));

  const welcome_bg = gulp.src('source/client/img/welcome-page/welcome-bg.jpg')
    .pipe(imageResize({
      width: 1980,
    }))
    .pipe(gulp.dest('public/img/welcome-page'));

  return es.merge(
    es.merge(x1_200, x2_200, x1_300, x2_300).pipe(gulp.dest('public/img')),
    es.merge(cim_x1_600, cim_x2_600).pipe(gulp.dest('public/img/cim-img')),
    gulp.src('source/client/img/misc/**/*.{png,jpg,jpeg}').pipe(gulp.dest('public/img/misc')),
    logo,
    header_bg,
    welcome_bg
  ).pipe(print());
});
