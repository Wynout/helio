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

        events: {
            'click .view label'    : 'edit',
            'click .change-state a': 'changeState'
        },

        serializeData: function () {

            return $.extend(
                this.model.toJSON(),
                nlsTicket.list
            );
        },

        onShow: function () {

            // var state = this.model.get('state');
            var state = 'new';
            if (state==='completed') {

                this.$el.addClass('completed');
            } else {

                this.$el.removeClass('completed');
            }
            this.changeStateIcon(state);
        },

        edit: function (event) {

            event.preventDefault();
            MsgBus.events.trigger('ticket:edit', this.model);
        },

        changeState: function (event) {

            event.preventDefault();
            var $anchor       = $(event.target),
                markNew       = $anchor.hasClass('mark-new'),
                markActive    = $anchor.hasClass('mark-active'),
                markCompleted = $anchor.hasClass('mark-completed'),
                state;

            if (markNew) {

                state = 'new';
                this.$el.removeClass('completed');

            } else if (markActive) {

                state = 'active';
                this.$el.removeClass('completed');

            } else if (markCompleted) {

                state = 'completed';
                this.$el.addClass('completed');
            }
            this.changeStateIcon(state);
        },

        changeStateIcon: function (state) {

            var $icon   = this.$el.find('.toggle').eq(0).removeClass(),
                classes = this.getStateIconClasses(state);

            $icon.addClass(classes);
        },

        getStateIconClasses: function (state) {

            switch (state) {

                case 'new'      : return 'fa fa-asterisk toggle state-new';
                case 'active'   : return 'fa fa-arrow-right toggle state-active';
                case 'completed': return 'fa fa-check toggle state-completed';
                default         : return '';
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
            'keypress #new-ticket': 'createTicket'
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
