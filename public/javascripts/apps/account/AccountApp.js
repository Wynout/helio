/*
 |------------------------------------------------------------------------------
 | Account App Module                                              AccountApp.js
 |------------------------------------------------------------------------------
 */
define([
    'marionette',
    'msgbus',
    'apps/account/signup/AccountSignupController',
    'apps/account/login/AccountLoginController',
    'entities/Account'
    ],
function (Marionette, MsgBus, AccountSignupController, AccountLoginController) {

    /**
     * Setup Account Router
     */
    var AccountRouter = Marionette.AppRouter.extend({
        appRoutes: {
            'signup': 'signup',
            'login': 'login',
            'accounts/switch': 'switchAccount'
        }
    });


    /**
     * Starts Account Routes
     */
    MsgBus.commands.setHandler('account:routes', function () {

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
        signup: function () {

            AccountSignupController.signup();
        },

        login: function () {

            AccountLoginController.login();
        },

        switchAccount: function () {

            AccountLoginController.switchAccount();
        }
    };

    return API;
});
