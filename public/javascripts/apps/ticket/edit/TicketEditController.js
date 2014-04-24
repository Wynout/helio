/*
|------------------------------------------------------------------------------
| Ticket Edit Controller                                TicketEditController.js
|------------------------------------------------------------------------------
*/
define(['backbone', 'marionette', 'msgbus', 'apps/ticket/edit/TicketEditView'],
function (Backbone, Marionette, MsgBus, TicketEditView) {

    var controller = {

        createTicket: function (text) {

            var model = MsgBus.reqres.request('ticket:entity:create');
            model.set('title', text);
            this._editTicket(model);
        },

        editTicket: function (id) {

            var fetchTicket = MsgBus.reqres.request('ticket:entity', id),
                self        = this;
            fetchTicket
                .done(function (model) {

                    self._editTicket(model);
                }).fail(function (error, model, xhr, options) {

                    MsgBus.commands.execute('xhr:error:handler', error);
                });
        },

        _editTicket: function (model) {

            var regions = {
                content: new TicketEditView({model: model})
            };
            MsgBus.commands.execute('regions:load', regions);
        }

    };

    return controller;
});
