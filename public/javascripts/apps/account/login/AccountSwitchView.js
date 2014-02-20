/*
|------------------------------------------------------------------------------
| Account Login View                                        AccountLoginView.js
|------------------------------------------------------------------------------
*/
define([
    'marionette',
    'hbs!apps/account/login/AccountSwitchTemplate'
],
function (
    Marionette,
    accountSwitchTemplate) {

    /**
     * Account switch view
     */
    var AccountSwitchView = Marionette.ItemView.extend({
        template: accountSwitchTemplate
    });

    return AccountSwitchView;
});