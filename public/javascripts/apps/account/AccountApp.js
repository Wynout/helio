/*
 |------------------------------------------------------------------------------
 | Account App                                                     AccountApp.js
 |------------------------------------------------------------------------------
 */
App.module('AccountApp', function (AccountApp, App, Backbone, Marionette, $, _) {

    /**
     * Expose AccountApp API
     */
    var API = {
        createAccount: function () {

            AccountApp.Create.Controller.createAccount();
        }
    };


    /**
     * Publish event when AccountApp starts
     */
    AccountApp.addInitializer(function () {

        App.vent.trigger('app:started', 'account');
    });

});