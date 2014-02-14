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

            var View = new AccountLoginView();
            MsgBus.commands.execute('popup:show', View);
        },

        /**
         * Displays switch account view
         */
        switchAccount: function () {

            MsgBus.commands.execute('account:logoff');
            var regions = {
                content: new AccountSwitchView()
            };
            MsgBus.commands.execute('change:page', regions);
            this.login();
        }
    };

    return controller;
});