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
    'mixins/backbone.validation'],
function (
    $,
    Backbone,
    Marionette,
    MsgBus,
    wineEditTemplate,
    wineEditSuccessTemplate,
    wineEditErrorTemplate,
    nlsAccount) {

    /**
     * Message shown when wine successfully saved
     */
    var SuccessView = Marionette.ItemView.extend({
        template: wineEditSuccessTemplate
    });


    /**
     * Message shown when wine could not be saved
     */
    var ErrorView = Marionette.ItemView.extend({
        template: wineEditErrorTemplate,

        serializeData: function () {

            return {
                error: this.options.error
            };
        },
    });


    /**
     * Wine Edit Layout View
     */
    var EditWineView = Marionette.Layout.extend({
        template: wineEditTemplate,

        regions: {
            saveResult: '#save-result'
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

                    var errorView = new ErrorView({error: {message: 'Fix validation errors and try again'}});
                    self.saveResult.show(errorView);
                });
            }
        },

        serializeData: function () {

            return $.extend(
                this.model.toJSON(),
                nlsAccount.edit
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
            console.log(change);
        },

        saveWine: function () {

            var self     = this,
                saveWine = MsgBus.reqres.request('wine:entity:save', this.model);
            saveWine
                .done(function () {

                    var successView = new SuccessView();
                    self.saveResult.show(successView);
                })
                .fail(function (error, model, jqXHR, options) {

                    var errorView = new ErrorView({error: {message: 'Wine could not be saved'}});
                    self.saveResult.show(errorView);
                    MsgBus.commands.execute('xhr:error:show', error);
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
