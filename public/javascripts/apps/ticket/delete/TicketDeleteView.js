/*
|------------------------------------------------------------------------------
| Wine Delete Views                                           WineDeleteView.js
|------------------------------------------------------------------------------
*/
define([
    'jquery',
    'marionette',
    'msgbus',
    'hbs!apps/wines/delete/WineDeleteTemplate',
    'i18n!nls/wine'],
function (
    $,
    Marionette,
    MsgBus,
    wineDeleteTemplate,
    nlsWine) {


    /**
     * Delete Confirm modal
     */
    var DeleteConfirmView = Marionette.ItemView.extend({
        template: wineDeleteTemplate,
        events: {
            'click .delete-confirmed' : 'deleteWine'
        },

        serializeData: function () {

            return $.extend(
                this.model.toJSON(),
                nlsWine['delete']
            );
        },

        deleteWine: function () {

            MsgBus.commands.execute('modal:hide');
            MsgBus.events.trigger('wine:delete', this.model);
            return false;
        }
    });

    return DeleteConfirmView;
});
