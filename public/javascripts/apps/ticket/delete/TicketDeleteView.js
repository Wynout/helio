/*
|------------------------------------------------------------------------------
| Wine Delete Views                                           WineDeleteView.js
|------------------------------------------------------------------------------
*/
define([
    'jquery',
    'marionette',
    'msgbus',
    'hbs!apps/ticket/delete/TicketDeleteTemplate',
    'i18n!nls/ticket'],
function (
    $,
    Marionette,
    MsgBus,
    ticketDeleteTemplate,
    nlsTicket) {


    /**
     * Delete Confirm modal
     */
    var DeleteConfirmView = Marionette.ItemView.extend({
        template: ticketDeleteTemplate,
        events: {
            'click .delete-confirmed' : 'deleteWine'
        },

        serializeData: function () {

            return $.extend(
                this.model.toJSON(),
                nlsTicket['delete']
            );
        },

        deleteWine: function () {

            MsgBus.commands.execute('modal:hide');
            MsgBus.events.trigger('ticket:delete', this.model);
            return false;
        }
    });

    return DeleteConfirmView;
});
