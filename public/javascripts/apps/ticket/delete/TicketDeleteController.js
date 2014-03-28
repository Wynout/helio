/*
|------------------------------------------------------------------------------
| Ticket Delete Controller                            TicketDeleteController.js
|------------------------------------------------------------------------------
*/
define(['backbone', 'msgbus', 'apps/ticket/delete/TicketDeleteView'],
function (Backbone, MsgBus, TicketDeleteView) {

    var controller = {

        deleteTicketConfirm: function (model) {

            var View = new TicketDeleteView({model: model});
            MsgBus.commands.execute('modal:show', View);
        },

        deleteTicket: function (model) {

            var deleteTicket = MsgBus.reqres.request('ticket:entity:delete', model);

            deleteTicket
                .done(function (model, response, options) {

                    Backbone.history.navigate('tickets', {trigger: true});
                })
                .fail(function (error, model, jqXHR, options) {

                    MsgBus.commands.execute('xhr:error:handler', error);
                });
        }

    };

    return controller;
});