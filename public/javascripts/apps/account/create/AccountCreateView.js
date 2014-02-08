/*
|------------------------------------------------------------------------------
| Account Create View                                      AccountCreateView.js
|------------------------------------------------------------------------------
*/
define([
    'marionette',
    'msgbus',
    'hbs!apps/account/create/AccountCreateTemplate'
],
function (
    Marionette,
    MsgBus,
    AccountCreateTemplate) {

	/**
	 * Create Account Form
	 */
	var AccountCreateView = Marionette.ItemView.extend({
		template: 'apps/account/create/AccountCreateTemplate',
	});

	return AccountCreateView;
});