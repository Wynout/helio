/*
 |------------------------------------------------------------------------------
 | Account App Module                                              AccountApp.js
 |------------------------------------------------------------------------------
 */
define([
    'marionette',
    'msgbus',
    'apps/account/create/AccountCreateController',
    'apps/account/login/AccountLoginController',
    'entities/Account'
    ],
function (Marionette, MsgBus, AccountCreateController, AccountLoginController) {

    /**
     * Setup Account Router
     */
    var AccountRouter = Marionette.AppRouter.extend({
        appRoutes: {
            'accounts/create': 'createAccount',
            'accounts/login': 'loginAccount',
            'accounts/switch': 'switchAccount'
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

            AccountCreateController.createAccount();
        },

        loginAccount: function () {

            AccountLoginController.login();
        },

        switchAccount: function () {

            AccountLoginController.switchAccount();
        }
    };

    return API;
});