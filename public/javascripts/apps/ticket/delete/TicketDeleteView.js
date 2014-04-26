/*
|------------------------------------------------------------------------------
| Ticket Delete Views                                       TicketDeleteView.js
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
     * Delete Ticket Confirm modal
     */
    var DeleteConfirmView = Marionette.ItemView.extend({
        template: ticketDeleteTemplate,
        events: {
            'click .delete-confirmed' : 'deleteTicket'
        },

        serializeData: function () {

            return $.extend(
                this.model.toJSON(),
                nlsTicket['delete']
            );
        },

        deleteTicket: function () {

            MsgBus.commands.execute('modal:hide');
            MsgBus.events.trigger('ticket:delete', this.model);
            return false;
        }
    });

    return DeleteConfirmView;
});
