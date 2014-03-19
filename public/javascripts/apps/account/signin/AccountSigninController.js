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
        signin: function () {

            var regions = {
                content: new AccountSigninView(),
            };
            MsgBus.commands.execute('regions:load', regions);
        },

        /**
         * Signout
         */
        signout: function () {

            Backbone.history.navigate('signin', {trigger: true});
            MsgBus.commands.execute('account:signout');
        }
    };

    return controller;
});
