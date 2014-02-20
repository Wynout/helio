/*
|------------------------------------------------------------------------------
| Account Terms of Use View                             AccountSignupTouView.js
|------------------------------------------------------------------------------
*/
define([
    'marionette',
    'hbs!apps/account/signup/AccountSignupTouTemplate'
],
function (
    Marionette,
    accountSignupTouTemplate) {

    /**
     * Account switch layout view
     */
    var TermsOfUseView = Marionette.ItemView.extend({
        template: accountSignupTouTemplate
    });

    return TermsOfUseView;
});