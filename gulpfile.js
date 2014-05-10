/*
|------------------------------------------------------------------------------
| Gulp.js - the streaming build system                              gulpfile.js
|------------------------------------------------------------------------------
*/
var gulp         = require('gulp'),
    plumber      = require('gulp-plumber'), // This plugin is fixing issue with Node Streams piping
    filesize     = require('gulp-filesize'),
    watch        = require('gulp-watch'),
    nodemon      = require('gulp-nodemon'),
    bust         = require('gulp-buster'),
    less         = require('gulp-less'),
    path         = require('path'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    jshint       = require('gulp-jshint'),
    uglify       = require('gulp-uglify'),
    rename       = require('gulp-rename'),
    clean        = require('gulp-clean'),
    concat       = require('gulp-concat'),
    notify       = require('gulp-notify'),
    rjs          = require('gulp-requirejs'),
    livereload   = require('gulp-livereload'),
    tlr          = require('tiny-lr'), // Manages a tiny LiveReload server implementation
    lrserver     = tlr();              // Defines LiveReload server


/**
 * Build Less
 */
gulp.task('less', function () {

    gulp.src('public/less/main.less')
        .pipe(plumber())
        .pipe(less({
            compress: false,
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('public/css'));
});


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
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('public/build'))
        .pipe(filesize()) // prints concatenated filesize
        .pipe(minifycss())
        .pipe(gulp.dest('public/build'))
        .pipe(filesize()) // prints minified filesize
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
        .pipe(filesize()) // prints combined main.js filesize
        .pipe(uglify({ outSourceMap : true }))
        .pipe(filesize()) // prints uglified main.js filesize
        .pipe(gulp.dest('.'))
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

    lrserver.listen(35729); // livereload
    gulp.start('watch');

    return nodemon(options)
        .on('restart', ['lint']);
});


/**
 * Watch .less files task
 */
gulp.task('watch-less', function () {

    gulp.start('less');
});


/**
 * Watch main.css file task
 */
gulp.task('watch-main.css', function () {

    return gulp.src('public/css/main.css')
        .pipe(plumber())
        .pipe(livereload(lrserver));
});


/**
 * Watch .js files task
 */
gulp.task('watch-js', function () {

    return gulp.src('public/javascripts/**/*.js')
        .pipe(plumber())
        .pipe(livereload(lrserver));
});


/**
 * Bundled watch task
 */
gulp.task('watch', function () {

    gulp.watch('public/less/*.less', ['watch-less']);
    gulp.watch('public/css/main.css', ['watch-main.css']);
    gulp.watch('public/javascripts/**/*.js', ['watch-js']);
});


/**
 * The default task is a build task.
 * cachebusting task needs to run separate
 */
gulp.task('default', ['less', 'styles', 'rjs']);
