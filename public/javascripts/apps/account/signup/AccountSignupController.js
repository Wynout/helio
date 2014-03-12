/*
 |------------------------------------------------------------------------------
 | Account Signup Controller                          AccountSignupController.js
 |------------------------------------------------------------------------------
 */
define(['msgbus', 'apps/account/signup/AccountSignupView'],
function (MsgBus, AccountSignupView) {

    var controller = {

        signup: function () {

            var account = MsgBus.reqres.request('account:entity:add');
            var regions = {
                // header : new App.HeaderView.default(),
                content : new AccountSignupView({model: account}),
                // navPanel: new NavPanelView.default()
            };
            MsgBus.commands.execute('regions:load', regions);
        }
    };

    return controller;
});
