/*
|------------------------------------------------------------------------------
| Account Create View                                      AccountCreateView.js
|------------------------------------------------------------------------------
*/
App.module('AccountApp.Create', function (Create, App, Backbone, Marionette, $, _) {

	Create.Account = Marionette.ItemView.extend({
		template: 'apps/account/create/AccountCreateTemplate',
	});

});