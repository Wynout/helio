/*
|------------------------------------------------------------------------------
| Ticket List View                                            TicketListView.js
|------------------------------------------------------------------------------
*/
define([
    'jquery',
    'marionette',
    'msgbus',
    'hbs!apps/ticket/list/TicketListItemTemplate',
    'hbs!apps/ticket/list/TicketListTemplate',
    'i18n!nls/ticket'],
function ($, Marionette, MsgBus, TicketListItemTemplate, TicketListTemplate, nlsTicket) {

    /**
     * Ticket List Item View
     */
    var TicketListItemView = Marionette.ItemView.extend({
        template: TicketListItemTemplate,
        tagName: 'li',
        // className: 'completed',
        events: {
            'click .view label': function (event) {

                event.preventDefault();
                MsgBus.events.trigger('ticket:edit', this.model);
            },
            'click input.toggle': function (event) {

                MsgBus.events.trigger('ticket:toggle', this.model);
            }
        }
    });


    /**
     * Ticket Collection View
     */
    var TicketCollectionView = Marionette.CollectionView.extend({
        itemView: TicketListItemView,
        id: 'ticket-list'
    });


    /**
     * Ticket List Layout View
     */
    var TicketListView = Marionette.Layout.extend({
        template: TicketListTemplate,

        regions: {
            tickets: '#ticket-list'
        },

        events: {
            'keypress #new-todo': 'createTicket'
        },

        // Create ticket on enter press
        createTicket: function (event) {

            var text = $(event.currentTarget).val();
            if (event.keyCode===13) {

                if (text!=='') {

                    MsgBus.events.trigger('ticket:create', text);
                }
                return false;
            }
        },

        serializeData: function () {

            return $.extend(
                nlsTicket.list
            );
        },

        onShow: function () {

            this.$el.find('#new-todo').focus();
            this.tickets.show(new TicketCollectionView({collection: this.options.collection}));
        }
    });

    return TicketListView;
});
