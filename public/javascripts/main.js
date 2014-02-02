require.config({

    baseURL: 'public/javascripts/components',

    shim: {
        // 'jquery.mobile-config': ['jquery'],
        // 'jquery.mobile': ['jquery', 'jquery.mobile-config']
    },
    paths: {
        jquery: "./components/jquery/jquery",
        underscore: "./components/underscore-amd/underscore",
        backbone: "./components/backbone-amd/backbone",
        "backbone.wreqr": "./components/backbone.wreqr/lib/amd/backbone.wreqr",
        "backbone.babysitter": "./components/backbone.babysitter/lib/amd/backbone.babysitter",
        'backbone.validation': './components/backbone-validation/dist/backbone-validation-amd',
        marionette: "./components/marionette/lib/core/amd/backbone.marionette",
        hbs           : './components/require-handlebars-plugin/hbs',
        // underscore    : './components/require-handlebars-plugin/hbs/underscore',
        handlebars    : './components/require-handlebars-plugin/Handlebars',
        i18nprecompile: './components/require-handlebars-plugin/hbs/i18nprecompile',
        json2         : './components/require-handlebars-plugin/hbs/json2',

        'jquery.mobile-config': 'config/jquery.mobile-config',
        'jquery.mobile': './components/jquery-mobile/dist/jquery.mobile' // build by grunt

    },
    hbs: {
        helpers: true,            // default: true
        i18n: false,              // default: false
        templateExtension: 'hbs', // default: 'hbs'
        partialsUrl: ''           // default: ''
    }

}, require(['app', 'apps/wines/WineApp'], function (App) {

    App.start();
}));