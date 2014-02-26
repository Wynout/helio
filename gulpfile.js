/*
|------------------------------------------------------------------------------
| Gulp.js - the streaming build system                              gulpfile.js
|------------------------------------------------------------------------------
*/
var gulp         = require('gulp'),
    plumber      = require('gulp-plumber'), // This plugin is fixing issue with Node Streams piping
    watch        = require('gulp-watch'),
    nodemon      = require('gulp-nodemon'),
    bust         = require('gulp-buster'),
    // sass         = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssimport    = require('gulp-cssimport'),
    minifycss    = require('gulp-minify-css'),
    jshint       = require('gulp-jshint'),
    uglify       = require('gulp-uglify'),
    // imagemin     = require('gulp-imagemin'),
    rename       = require('gulp-rename'),
    clean        = require('gulp-clean'),
    concat       = require('gulp-concat'),
    notify       = require('gulp-notify'),
    rjs          = require('gulp-requirejs'),
    // cache        = require('gulp-cache'),
    livereload   = require('gulp-livereload'), // hooks into nodes tiny-lr package
    lr           = require('tiny-lr'),
    server       = lr(); // defines LiveReload server


/**
 * Styles Task
 * derived from @link http://markgoodyear.com/2014/01/getting-started-with-gulp/
 * - Css Importer - Parses css files, finds @import directive and includes these files.
 * - Autoprefixer
 * - Minify
 * - auto-refresh the page
 * - notify that task is completed
 */
 gulp.task('styles', function () {

    // By returning the stream it makes it asynchronous, ensuring the task is fully complete before we get a notification to say it’s finished.
    return gulp.src('public/css/main.css')
        .pipe(plumber())
        .pipe(cssimport())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('public/build'))
        .pipe(minifycss())
        .pipe(gulp.dest('public/build'))
        .pipe(livereload(server))
        .pipe(notify({message: 'Styles task completed'}));
 });


/**
 * We do not have to use a gulp plugin for the r.js optimizer
 * Just to get things working.
 */
gulp.task('rjs', function () {

    var options = {
        baseUrl        : 'public/javascripts',
        mainConfigFile : 'public/javascripts/main.js',
        name           : 'main',
        out            : 'public/build/main.js'
    };

    return rjs(options)
        .pipe(plumber())
        .pipe(uglify({ outSourceMap : true }))
        .pipe(gulp.dest(''))
        .pipe(notify({message: 'Rjs task completed'}));
});


/**
 * Cache buster hashes generator
 * @link https://github.com/UltCombo/gulp-buster
 */
gulp.task('cachebusting', function () {

    return gulp.src(['public/build/main.js', 'public/build/main.css'])
        .pipe(plumber())
        .pipe(bust('assetsVersioning.json'))
        .pipe(gulp.dest('.'))
        .pipe(notify({message: 'Cache-busting task completed'}));
});


/**
 * Clean out the destination folder
 */
gulp.task('clean', function () {

  return gulp.src(['public/build'], {read: false})
    .pipe(plumber())
    .pipe(clean());
});


/**
 * Lint task
 */
gulp.task('lint', function () {

    return gulp.src('./**/*.js')
        .pipe(plumber())
        .pipe(jshint());
});


/**
 * Development task
 */
gulp.task('dev', function () {

    var options = {
        script : 'app.js',
        ext    : 'html js',
        ignore : ['node_modules/**', 'public/**'],
        env    : {'NODE_ENV': 'development'}

    };
    return nodemon(options)
        .on('restart', ['lint']);
});


/**
 * The default task
 *
 * Note: It’s advised against using gulp.start in favour of executing tasks in the dependency array,
 * but in this scenario we need to ensure that all is done before calling cachebusting
 */
gulp.task('default', ['styles', 'rjs'], function () {

    gulp.start('cachebusting');
});
