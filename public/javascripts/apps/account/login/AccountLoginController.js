/*
 |------------------------------------------------------------------------------
 | Account Login Controller                            AccountLoginController.js
 |------------------------------------------------------------------------------
 */
define(['msgbus', 'apps/account/login/AccountLoginView'],
function (MsgBus, AccountLoginView) {

    var controller = {
        login: function () {

            var View = new AccountLoginView();
            MsgBus.commands.execute('popup:show', View);
        }
    };

    return controller;
});