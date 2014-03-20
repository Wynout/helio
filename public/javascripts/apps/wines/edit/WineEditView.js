/*
|------------------------------------------------------------------------------
| Wine Edit View                                                WineEditView.js
|------------------------------------------------------------------------------
*/
define([
    'jquery',
    'backbone',
    'marionette',
    'msgbus',
    'hbs!apps/wines/edit/WineEditTemplate',
    'hbs!apps/wines/edit/WineEditSuccessTemplate',
    'hbs!apps/wines/edit/WineEditErrorTemplate',
    'i18n!nls/wine',
    'i18n!nls/validation',
    'backbone.stickit',
    'mixins/backbone.validation'],
function (
    $,
    Backbone,
    Marionette,
    MsgBus,
    wineEditTemplate,
    wineEditSuccessTemplate,
    wineEditErrorTemplate,
    nlsWine,
    nlsValidation) {

    /**
     * Message shown when wine successfully saved
     */
    var SuccessView = Marionette.ItemView.extend({
        template: wineEditSuccessTemplate,

        serializeData: function () {

            return {
                saved: nlsWine.saved
            };
        },

        onShow: function () {

            this.$el.delay(3000).fadeOut();
        }
    });


    /**
     * Message shown when wine could not be saved
     */
    var ErrorView = Marionette.ItemView.extend({
        template: wineEditErrorTemplate,

        serializeData: function () {

            return {
                errors: this.options.errors,
                invalid: nlsValidation.invalid
            };
        }
    });


    /**
     * Wine Edit Layout View
     */
    var EditWineView = Marionette.Layout.extend({
        template: wineEditTemplate,

        regions: {
            alertSuccess : '#alert-success-region',
            alertError   : '#alert-error-region'
        },

        events: {
            'change'                : 'change',
            'click .save'           : 'saveWine',
            'click .delete-confirm' : 'deleteWineConfirm'
        },

        /**
         * Use stickit to perform binding between the model and the view
         */
        bindings: {
            '#wine-name': {
                observe: 'name',
                setOptions: {
                    validate: true
                }
            },
            '#wine-grapes': {
                observe: 'grapes',
                setOptions: {
                    validate: true
                }
            },
            '#wine-country': {
                observe: 'country',
                setOptions: {
                    validate: true
                }
            },
            '#wine-region': {
                observe: 'region',
                setOptions: {
                    validate: true
                }
            },
            '#wine-year': {
                observe: 'year',
                setOptions: {
                    validate: true
                }
            },
            '#wine-description': {
                observe: 'description',
                setOptions: {
                    validate: true
                }
            }
        },

        initialize: function () {

            var self = this;

            // Hook up the validation
            // forceUpdate: Since we are automatically updating the model, we want the model to also hold invalid values, otherwise, we might be validating something else than the user has entered in the form.
            Backbone.Validation.bind(this, {forceUpdate: true});
            this.model.on('validated:invalid', function (model, errors) {

                self.showAlertError(errors);
            });
            this.model.on('validated:valid', function (model) {

               self.hideErrorAlert();
            });
        },

        serializeData: function () {

            return $.extend(
                this.model.toJSON(),
                nlsWine.edit
            );
        },

        // Called by the region, after the region has added the view to the dom
        onShow: function () {

            // Enable live validation on existing resource
            if (this.model.get('_id')) {

                this.stickit();
            }
        },

        // Called when the view has been closed.
        onClose: function () {

            Backbone.Validation.unbind(this);
        },

        // Called when edit form has changed
        change: function (event) {

            // Apply the change from edit form to the model
            var target = event.target,
                change = {};
            change[target.name] = target.value;
            this.model.set(change);
        },

        saveWine: function () {

            if (!this.model.isValid(true)) { // true forces a validation before the result is returned

                return false;
            }

            var self     = this,
                saveWine = MsgBus.reqres.request('wine:entity:save', this.model);
            saveWine
                .done(function () {

                    self.showAlertSuccess();
                })
                .fail(function (error, model, jqXHR, options) {

                    MsgBus.commands.execute('xhr:error:handler', error);
                });

            return false;
        },

        deleteWineConfirm: function () {

            MsgBus.events.trigger('wine:delete:confirm', this.model);
            return false;
        },

        showAlertSuccess: function () {

            this.alertSuccess.show(new SuccessView());
        },

        showAlertError: function (errors) {

            this.alertError.show(new ErrorView({errors: errors}));
        },

        hideErrorAlert: function () {

            this.alertError.close();
        }
    });

    return EditWineView;
});
