/*
 |------------------------------------------------------------------------------
 | Account Login Controller                            AccountLoginController.js
 |------------------------------------------------------------------------------
 */
define(['msgbus', 'apps/account/login/AccountLoginView', 'apps/account/login/AccountSwitchView'],
function (MsgBus, AccountLoginView, AccountSwitchView) {

    var controller = {

        /**
         * Displays popup modal login form
         */
        login: function () {

            var regions = {
                content: new AccountLoginView(),
            };
            MsgBus.commands.execute('regions:load', regions);
        },

        /**
         * Displays switch account view
         */
        switchAccount: function () {

            MsgBus.commands.execute('account:logoff');
            var regions = {
                content: new AccountSwitchView()
            };
            MsgBus.commands.execute('regions:load', regions);
            this.login();
        }
    };

    return controller;
});
