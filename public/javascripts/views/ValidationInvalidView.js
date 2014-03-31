/*
|------------------------------------------------------------------------------
| Validation Invalid View                              ValidationInvalidView.js
|------------------------------------------------------------------------------
*/
define([
    'marionette',
    'hbs!views/ValidationInvalidTemplate',
    'i18n!nls/validation'],
function (
    Marionette,
    validationInvalidTemplate,
    nlsValidation) {

    /**
     * Validation Invalid View
     */
    var View = Marionette.ItemView.extend({
        template: validationInvalidTemplate,

        serializeData: function () {

            return {
                errors: this.options.errors,
                invalid: nlsValidation.invalid
            };
        }
    });

    return View;
});
