/*
|------------------------------------------------------------------------------
| Ticket List View                                            TicketListView.js
|------------------------------------------------------------------------------
*/
define([
    'marionette',
    'msgbus',
    'hbs!apps/ticket/list/TicketListItemTemplate',
    'hbs!apps/ticket/list/TicketListTemplate'],
function (Marionette, MsgBus, TicketListItemTemplate, TicketListTemplate) {

	/**
	 * Ticket List Item View
	 */
	var TicketListItemView = Marionette.ItemView.extend({
		template: TicketListItemTemplate,
		tagName: 'li',
		events: {
			'click': function (event) {

				event.preventDefault();
				MsgBus.events.trigger('ticket:edit', this.model);
			}
		}
	});


	/**
	 * Ticket Collection View
	 */
	var TicketCollectionView = Marionette.CollectionView.extend({
		itemView: TicketListItemView,
		tagName: 'ul',
		className: 'list-group'
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

			this.tickets.show(new TicketCollectionView({collection: this.options.collection}));
		}
	});

	return TicketListView;
});
