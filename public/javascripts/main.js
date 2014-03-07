/*
|------------------------------------------------------------------------------
| Requirejs Config and Start App                                        main.js
|------------------------------------------------------------------------------
*/
require.config({

    baseURL: 'public/javascripts/bower_components',

    paths: {
        jquery                : './bower_components/jquery/dist/jquery',
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
        i18n                  : './bower_components/requirejs-i18n/i18n',
        'jquery.mobile-config': 'config/jquery.mobile-config',
        'jquery.mobile'       : './../build/jquery-mobile/jquery.mobile-1.4.2'
    },

    shim: {
        'jquery.mobile-config': ['jquery'],
        'jquery.mobile': ['jquery', 'jquery.mobile-config']
    },

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
    'jquery.mobile',
    'auth',
    'apps/wines/WineApp',
    'apps/account/AccountApp'],
function ($, App) {

    $(function () {

        App.start();
    });
}));
