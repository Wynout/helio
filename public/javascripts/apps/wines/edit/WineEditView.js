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
    'utils',
    'backbone.validation'
    ],
function (
        Backbone,
        Marionette,
        MsgBus,
        WineEditTemplate,
        Utils) {


    var EditWineView = Marionette.ItemView.extend({
        tagName: 'div',
        className: 'ui-content',
        // id                   : 'navigation',
        attributes: {
            'data-role'          : 'main',
            'data-position-fixed': 'true'
        },
        template: WineEditTemplate,
        events: {
            'change'                : 'change',
            'click .save'           : 'saveWine',
            'click .delete-confirm' : 'deleteWineConfirm'
        },


        initialize: function () {

            var self = this;

            Backbone.Validation.bind(this);
            this.model.on('validated:invalid', function (model, errors) {

                Utils.showAlert('Warning!', 'Fix validation errors and try again', 'alert-warning');
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

                    console.log('success, wine saved');
                    console.log(Utils);
                    Utils.showAlert('Success!', 'Wine was saved successfully', 'alert-success');
                },
                error: function () {

                    console.log('error, wine not saved');
                    Utils.showAlert('Error!', 'Wine cannot be saved', 'alert-error');
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