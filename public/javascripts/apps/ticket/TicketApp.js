/*
|------------------------------------------------------------------------------
| Ticket App Module                                                TicketApp.js
|------------------------------------------------------------------------------
*/
define([
    'marionette',
    'msgbus',
    'apps/ticket/delete/TicketDeleteController',
    'apps/ticket/edit/TicketEditController',
    'apps/ticket/list/TicketListController',
    'entities/Ticket'],
function (
    Marionette,
    MsgBus,
    TicketDeleteController,
    TicketEditController,
    TicketListController) {


    var ticketRouter;

    /**
     * Setup TicketApp Router
     */
    var TicketRouter = Marionette.AppRouter.extend({
        appRoutes: {
            'tickets/create': 'createTicket',
            'tickets'       : 'showTickets',
            'tickets/:id'   : 'editTicket'
        },
        before: function (route) {

            MsgBus.events.trigger('route:filter:before', route);
        },
        after: function (route) {

            MsgBus.events.trigger('route:filter:after', route);
        }
    });


    /**
     * Starts Ticket Routes
     */
    MsgBus.commands.setHandler('ticket:routes', function () {

        ticketRouter = new TicketRouter({
            controller: API
        });
    });


    /**
     * Subscribe to event create ticket
     * @param {String} text
     */
    MsgBus.events.on('ticket:create', function (text) {

        API.createTicket(text);
    });


    /**
     * Subscribe to event, edit ticket
     */
    MsgBus.events.on('ticket:edit', function (model) {

        var id    = model.get('_id'),
            route = 'tickets/' + id;
        API.editTicket(id);
        ticketRouter.navigate(route);
        ticketRouter.after(route);
    });


    /**
     * Subscribe to event, delete confirmation dialog
     */
    MsgBus.events.on('ticket:delete:confirm', function (model) {

        API.deleteTicketConfirm(model);
    });


    /**
     * Subscribe to event, delete ticket
     */
    MsgBus.events.on('ticket:delete', function (model) {

        API.deleteTicket(model);
    });


    /**
     * Expose TicketApp API through TicketRouter
     */
    var API = {
        createTicket: function (options) {

           TicketEditController.createTicket(options);
        },

        showTickets: function () {

            TicketListController.showTickets();
        },

        editTicket: function (id) {

            TicketEditController.editTicket(id);
        },

        deleteTicketConfirm: function (model) {

           TicketDeleteController.deleteTicketConfirm(model);
        },

        deleteTicket: function (model) {

           TicketDeleteController.deleteTicket(model);
        }
    };

    return API;
});
