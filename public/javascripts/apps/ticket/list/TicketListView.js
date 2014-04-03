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
    'hbs!apps/ticket/list/TicketListTemplate'],
function ($, Marionette, MsgBus, TicketListItemTemplate, TicketListTemplate) {

	/**
	 * Ticket List Item View
	 */
	var TicketListItemView = Marionette.ItemView.extend({
		template: TicketListItemTemplate,
		tagName: 'li',
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
		id: 'todo-list'
	});


	/**
	 * Ticket List View
	 */
	var TicketListView = Marionette.Layout.extend({
		template: TicketListTemplate,

		regions: {
			tickets: '#todo-list'
		},

		onShow: function () {

			this.$el.find('#new-todo').focus();
			this.tickets.show(new TicketCollectionView({collection: this.options.collection}));
		}
	});

	return TicketListView;
});
