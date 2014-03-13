/*
 |------------------------------------------------------------------------------
 | Account Signin Controller                          AccountSigninController.js
 |------------------------------------------------------------------------------
 */
define(['backbone', 'msgbus', 'apps/account/signin/AccountSigninView'],
function (Backbone, MsgBus, AccountSigninView) {

    var controller = {

        /**
         * Show Signin form
         * @param {String} action
         */
        signin: function (action) {

            var regions = {
                content: new AccountSigninView({action: action}),
            };
            MsgBus.commands.execute('regions:load', regions);
        },

        /**
         * Signout
         */
        signout: function () {

            MsgBus.commands.execute('account:signout');
            Backbone.history.navigate('signin', {trigger: true});
        }
    };

    return controller;
});
