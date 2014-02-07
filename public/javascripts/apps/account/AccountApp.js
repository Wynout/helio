/*
 |------------------------------------------------------------------------------
 | Account App Module                                              AccountApp.js
 |------------------------------------------------------------------------------
 */
define([
    'marionette',
    'msgbus',
    'apps/account/login/AccountLoginController',
    'entities/Account'
    ],
function (Marionette, MsgBus, AccountLoginController) {

    /**
     * Setup Account Router
     */
    var AccountRouter = Marionette.AppRouter.extend({
        appRoutes: {
            'accounts/create': 'createAccount'
        }
    });


    /**
     * Starts Account Routes
     */
    MsgBus.commands.setHandler('account:routes', function () {

        console.log('starting account routes');
        return new AccountRouter({
            controller: API
        });
    });


    MsgBus.events.on('account:login', function () {

        AccountLoginController.login();
    });


    /**
     * Expose AccountApp API
     */
    var API = {
        createAccount: function () {

        },

        loginAccount: function () {

            AccountLoginController.login();
        }
    };

    return API;
});