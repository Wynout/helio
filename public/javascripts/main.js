/*
|------------------------------------------------------------------------------
| Requirejs Config and Start App                                        main.js
|------------------------------------------------------------------------------
*/
require.config({

    baseURL: 'public/javascripts/components',

    paths: {
        jquery               : './components/jquery/jquery',
        underscore           : './components/underscore-amd/underscore',
        backbone             : './components/backbone-amd/backbone',
        'backbone.wreqr'     : './components/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter': './components/backbone.babysitter/lib/amd/backbone.babysitter',
        'backbone.validation.callbacks': './views/backboneValidation',
        'backbone.validation': './components/backbone-validation/dist/backbone-validation-amd',

        marionette            : './components/marionette/lib/core/amd/backbone.marionette',
        hbs                   : './components/require-handlebars-plugin/hbs',
        handlebars            : './components/require-handlebars-plugin/Handlebars',
        i18nprecompile        : './components/require-handlebars-plugin/hbs/i18nprecompile',
        json2                 : './components/require-handlebars-plugin/hbs/json2',

        'jquery.mobile-config': 'config/jquery.mobile-config',
        'jquery.mobile'       : './components/jquery-mobile/dist/jquery.mobile' // built by grunt

    },
    hbs: {
        helpers          : true,  // default: true
        i18n             : false, // default: false
        templateExtension: 'hbs', // default: 'hbs'
        partialsUrl      : ''     // default: ''
    }

}, require(['app', 'auth', 'apps/wines/WineApp', 'apps/account/AccountApp'], function (App) {

    App.start();
}));