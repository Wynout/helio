/**
 * @link http://chrisawren.com/posts/Advanced-Grunt-tooling
 */
module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // http://danburzo.ro/grunt/chapters/handlebars/
        handlebars: {
            compile: {
                options: {
                    namespace: 'JST',
                    processName: function (filePath) {

                        return filePath.replace(/^public\/javascripts\//, '').replace(/\.hbs$/, '');
                    }
                },
                files: [{
                    src: 'public/javascripts/**/*.hbs',
                    dest: 'public/javascripts/templates/precompiled.handlebars.js'
                }]
            }
        },


        watch: {
            scripts: {
                files: ['*.js', 'public/**.js'],
                tasks: [],
                options: {
                    livereload: true
                }
            },
            handlebars: {
                files: ['public/**/*.hbs'],
                tasks: ['build:dev'],
                options: {
                    livereload: true
                }
            }
        }

    });


    // Loading all Grunt tasks automatically
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


    grunt.registerTask('build:dev', ['handlebars:compile']);

};