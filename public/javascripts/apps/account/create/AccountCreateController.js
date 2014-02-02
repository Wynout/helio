/*
 |------------------------------------------------------------------------------
 | Account Create Controller                          AccountCreateController.js
 |------------------------------------------------------------------------------
 */
App.module('AccountApp.Create', function (Create, App, Backbone, Marionette, $, _) {

	Create.Controller = {

		createAccount: function () {

			var createAccountView = new Create.Account();
		}
	};

});