/*
|------------------------------------------------------------------------------
| Ticket List Controller                                TicketListController.js
|------------------------------------------------------------------------------
*/
define([
    'msgbus',
    'apps/ticket/list/TicketListView',
    'views/NavPanelView'
],
function (MsgBus, TicketListView, NavPanelView) {

    var controller = {
        showTickets: function () {

            var self            = this,
                fetchingTickets = MsgBus.reqres.request('ticket:entities');
            fetchingTickets
                .done(function (collection) {

                    self._showTickets(collection);
                })
                .fail(function (error, collection, jqXHR, options) {

                    MsgBus.commands.execute('xhr:error:handler', error);
                });
        },

        _showTickets: function (collection) {

            var regions = {
                content: new TicketListView({collection: collection})
            };
            MsgBus.commands.execute('regions:load', regions);
        }
    };

    return controller;
});
