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
        }
    });


    /**
     * Message shown when wine could not be saved
     */
    var ErrorView = Marionette.ItemView.extend({
        template: wineEditErrorTemplate,

        serializeData: function () {

            return {
                error: this.options.error,
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
            saveResult : '#save-result'
        },

        events: {
            'change'                : 'change',
            'click .save'           : 'saveWine',
            'click .delete-confirm' : 'deleteWineConfirm'
        },

        initialize: function () {

            var self = this;

            if (this.model) {

                Backbone.Validation.bind(this);
                this.model.on('validated:invalid', function (model, errors) {

                    self.saveResult.show(new ErrorView());
                });
            }
        },

        serializeData: function () {

            return $.extend(
                this.model.toJSON(),
                nlsWine.edit
            );
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

            var self     = this,
                saveWine = MsgBus.reqres.request('wine:entity:save', this.model);
            saveWine
                .done(function () {

                    self.saveResult.show(new SuccessView());
                })
                .fail(function (error, model, jqXHR, options) {

                    MsgBus.commands.execute('xhr:error:handler', error);
                });

            return false;
        },

        deleteWineConfirm: function () {

            MsgBus.events.trigger('wine:delete:confirm', this.model);
            return false;
        }
    });

    return EditWineView;
});
