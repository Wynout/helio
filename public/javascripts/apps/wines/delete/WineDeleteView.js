/*
|------------------------------------------------------------------------------
| Wine Delete Views                                           WineDeleteView.js
|------------------------------------------------------------------------------
*/
define([
    'marionette',
    'msgbus',
    'hbs!apps/wines/delete/WineDeleteConfirmTemplate',
    'hbs!apps/wines/delete/WineDeleteSuccessTemplate',
    'hbs!apps/wines/delete/WineDeleteErrorTemplate'
],
function (
    Marionette,
    MsgBus,
    wineDeleteConfirmTemplate,
    wineDeleteSuccessTemplate,
    wineDeleteErrorTemplate) {


    /**
     * Delete Confirm popup dialog
     */
    var DeleteConfirmView = Marionette.ItemView.extend({
        template: wineDeleteConfirmTemplate,
        events: {
            'click .delete-confirmed' : 'deleteWine'
        },

        deleteWine: function () {

            MsgBus.events.trigger('wine:delete', this.model);
            return false;
        }
    });


    /**
     * Delete Success popup dialog
     */
    var DeleteSuccessView = Marionette.ItemView.extend({
        template: wineDeleteSuccessTemplate,
        events: {
            'click .okay': 'okay'
        },

        okay: function () {
            // not used: a.okay href points to #wines
        }
    });


    /**
     * Delete Error popup dialog
     */
    var DeleteErrorView = Marionette.ItemView.extend({
        template: wineDeleteErrorTemplate,
        events: {
            'click .retry': 'retry'
        },

        serializeData: function () {

            return {
                model: this.options.model.toJSON,
                xhr: JSON.parse(JSON.stringify(this.options.xhr))
            };
        },

        retry: function () {

            MsgBus.events.trigger('wine:delete', this.model);
            return false;
        }
    });

    return {
        confirm: DeleteConfirmView,
        success: DeleteSuccessView,
        error  : DeleteErrorView
    };

});