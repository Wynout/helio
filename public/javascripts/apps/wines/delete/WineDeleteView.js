/*
|------------------------------------------------------------------------------
| Wine Delete Views                                           WineDeleteView.js
|------------------------------------------------------------------------------
*/
define([
    'marionette',
    'msgbus',
    'hbs!apps/wines/delete/WineDeleteTemplate'],
function (
    Marionette,
    MsgBus,
    wineDeleteTemplate) {


    /**
     * Delete Confirm modal
     */
    var DeleteConfirmView = Marionette.ItemView.extend({
        template: wineDeleteTemplate,
        events: {
            'click .delete-confirmed' : 'deleteWine'
        },

        deleteWine: function () {

            MsgBus.commands.execute('modal:hide');
            MsgBus.events.trigger('wine:delete', this.model);
            return false;
        }
    });

    return DeleteConfirmView;
});
