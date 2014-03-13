/*
 |------------------------------------------------------------------------------
 | Account App Module                                              AccountApp.js
 |------------------------------------------------------------------------------
 */
define([
    'marionette',
    'msgbus',
    'apps/account/signup/AccountSignupController',
    'apps/account/signin/AccountSigninController',
    'entities/Account'
    ],
function (Marionette, MsgBus, AccountSignupController, AccountSigninController) {

    /**
     * Setup Account Router
     */
    var AccountRouter = Marionette.AppRouter.extend({
        appRoutes: {
            'signin'        : 'signin',
            'signin/:action': 'signin',
            'signout'       : 'signout',
            'signup'        : 'signup'
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


    /**
     * Expose AccountApp API
     */
    var API = {
        signup: function () {

            AccountSignupController.signup();
        },

        signin: function (action) {

            AccountSigninController.signin(action);
        },

        signout: function () {

            AccountSigninController.signout();
        }
    };

    return API;
});
