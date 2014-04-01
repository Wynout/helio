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
    'views/ValidationInvalidView',
    'views/SuccessView',
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
    ValidationInvalidView,
    SuccessView,
    nlsWine) {


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

                self.showValidationError(errors);
            });
            this.model.on('validated:valid', function (model) {

               self.hideError();
            });
        },

        serializeData: function () {

            return $.extend(
                this.model.toJSON(),
                nlsWine.edit
            );
        },

        enableLiveValidation: function () {

            this.stickit();
        },

        // Called by the region, after the region has added the view to the dom
        onShow: function () {

            if (this.model.get('_id')) {

                this.enableLiveValidation();
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

                this.enableLiveValidation();
                return false;
            }

            var self     = this,
                saveWine = MsgBus.reqres.request('wine:entity:save', this.model);
            saveWine
                .done(function () {

                    self.showSuccess();
                })
                .fail(function (error, model, jqXHR, options) {

                    MsgBus.commands.execute('xhr:error:handler', error);
                });

            return false;
        },

        deleteWineConfirm: function (event) {
            event.preventDefault();
            MsgBus.events.trigger('wine:delete:confirm', this.model);
            return false;
        },

        showSuccess: function () {

            var $save = this.$el.find('button.save');
            $save.addClass('btn-success');
            setTimeout(function () {

                $save.removeClass('btn-success');
            }, 1500);
            this.alertSuccess.show(new SuccessView({title: nlsWine.saved.title, message: nlsWine.saved.message}));
        },

        showValidationError: function (errors) {

            this.alertError.show(new ValidationInvalidView({errors: errors}));
        },

        hideError: function () {

            this.alertError.close();
        }
    });

    return EditWineView;
});
