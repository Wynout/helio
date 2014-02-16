/*
 |------------------------------------------------------------------------------
 | Account Create Controller                          AccountCreateController.js
 |------------------------------------------------------------------------------
 */
define(['msgbus', 'apps/account/create/AccountCreateView'],
function (MsgBus, AccountCreateView) {

	var controller = {

		createAccount: function () {

			var regions = {
                // header : new App.HeaderView.default(),
                content : new AccountCreateView(),
                // navPanel: new NavPanelView.default()
            };
            MsgBus.commands.execute('change:page', regions);
		}
	};

	return controller;
});