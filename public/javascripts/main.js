/*
|------------------------------------------------------------------------------
| Requirejs Config and Start App                                        main.js
|------------------------------------------------------------------------------
*/
require.config({

    baseURL: 'public/javascripts/bower_components',

    paths: {
        holder                : './bower_components/holderjs/holder',

        jquery                : './bower_components/jquery/dist/jquery',
        'jquery.bootstrap'    : './bower_components/bootstrap/dist/js/bootstrap',
        underscore            : './bower_components/underscore-amd/underscore',
        backbone              : './bower_components/backbone-amd/backbone',
        'backbone.wreqr'      : './bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter' : './bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
        'backbone.validation' : './bower_components/backbone-validation/dist/backbone-validation-amd',
        'backbone.stickit'    : './bower_components/backbone.stickit/backbone.stickit',

        marionette            : './bower_components/marionette/lib/core/amd/backbone.marionette',
        hbs                   : './bower_components/require-handlebars-plugin/hbs',
        handlebars            : './bower_components/require-handlebars-plugin/Handlebars',
        json2                 : './bower_components/require-handlebars-plugin/hbs/json2',
        i18n                  : './bower_components/requirejs-i18n/i18n'
    },
/*
    shim: {
        'jquery.bootstrap': {
            deps: ['jquery']
        },
        // marionette:
        // holder: ['jquery']
    },
*/
    // Disabled because requirejs optimizer cannot be evauluated correctly
    // locale: window.localStorage.getItem('locale') || 'en-gb',
    locale: 'en-gb',
    hbs: {
        helpers          : true,  // default: true
        i18n             : false, // default: false
        templateExtension: 'hbs', // default: 'hbs'
        partialsUrl      : ''     // default: ''
    }

}, require([
    'jquery',
    'app',
    'auth',
    'apps/wines/WineApp',
    'apps/account/AccountApp',
    'jquery.bootstrap'
    // 'bootstrap', // http://stackoverflow.com/questions/16259098/cant-load-bootstrap-with-requirejs
    // 'holder'
    ],
function ($, App) {

    $(function () {

        App.start();
    });
}));
