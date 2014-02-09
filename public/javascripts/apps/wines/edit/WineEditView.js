/*
|------------------------------------------------------------------------------
| Wine Edit View                                                WineEditView.js
|------------------------------------------------------------------------------
*/
define([
    'backbone',
    'marionette',
    'msgbus',
    'hbs!apps/wines/edit/WineEditTemplate',
    'hbs!apps/wines/edit/WineEditSuccessTemplate',
    'hbs!apps/wines/edit/WineEditErrorTemplate',
    'backbone.validation',
    'views/backboneValidation'
    ],
function (
        Backbone,
        Marionette,
        MsgBus,
        wineEditTemplate,
        wineEditSuccessTemplate,
        wineEditErrorTemplate) {

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
     * Wine Edit Form
     */
    var EditWineView = Marionette.Layout.extend({
        regions: {
            saveResult: '#save-result'
        },
        tagName: 'div',
        className: 'ui-content',
        // id                   : 'navigation',
        attributes: {
            'data-role'          : 'main',
            'data-position-fixed': 'true'
        },
        template: wineEditTemplate,
        events: {
            'change'                : 'change',
            'click .save'           : 'saveWine',
            'click .delete-confirm' : 'deleteWineConfirm'
        },


        initialize: function () {

            var self = this;

            Backbone.Validation.bind(this);
            this.model.on('validated:invalid', function (model, errors) {

                var errorView = new ErrorView({error: {message: 'Fix validation errors and try again'}});
                self.saveResult.show(errorView);
            });
        },

        // Called when view has been rendered and displayed.
        onShow: function () {

            this.$el.closest('.ui-page').trigger('create');
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

        // todo:
        // use entitiy reqres
        saveWine: function () {

            var self = this;
            this.model.save(null, {
                success: function (model) {

                    var successView = new SuccessView();
                    self.saveResult.show(successView);
                },
                error: function () {
                    var errorView = new ErrorView({error: {message: 'Wine could not be saved'}});
                    self.saveResult.show(errorView);
                }
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