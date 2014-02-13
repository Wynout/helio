/*
|------------------------------------------------------------------------------
| Account Login View                                        AccountLoginView.js
|------------------------------------------------------------------------------
*/
define([
    'marionette',
    'msgbus',
    'hbs!apps/account/login/AccountSwitchTemplate'
],
function (
    Marionette,
    MsgBus,
    accountSwitchTemplate) {


    /**
     * Account switch layout view
     */
    var AccountSwitchLayout = Marionette.Layout.extend({
        template: accountSwitchTemplate,
        regions: {}
    });

    return AccountSwitchLayout;
});