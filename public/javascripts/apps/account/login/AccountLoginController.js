/*
 |------------------------------------------------------------------------------
 | Account Login Controller                            AccountLoginController.js
 |------------------------------------------------------------------------------
 */
define(['msgbus', 'apps/account/login/AccountLoginView'],
function (MsgBus, AccountLoginView) {

    var controller = {

        /**
         * @param {Object} error containing type, message
         */
        login: function (error) {

            var View = new AccountLoginView();
            MsgBus.commands.execute('popup:show', View);

            // var regions = {
            //     // header : new App.HeaderView.default(),
            //     content : new AccountLoginView()
            //     // navPanel: new NavPanelView.wine()
            // };
            // MsgBus.commands.execute('change:page', regions);

        }
    };

    return controller;
});