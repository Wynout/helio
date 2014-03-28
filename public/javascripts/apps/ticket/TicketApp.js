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
    'entities/Ticket'
    ],
function (Marionette, MsgBus, TicketDeleteController, TicketEditController, TicketListController) {

    /**
     * Setup TicketApp Router
     */
    var TicketRouter = Marionette.AppRouter.extend({
        appRoutes: {
            'tickets/add': 'addTicket',
            'tickets'    : 'showTickets',
            'tickets/:id': 'editTicket'
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

        return new TicketRouter({
            controller: API
        });
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
     * Expose WineApp API through TicketRouter
     */
    var API = {
        addTicket: function () {

           TicketEditController.addTicket();
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
