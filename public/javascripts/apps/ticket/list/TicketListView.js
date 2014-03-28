/*
|------------------------------------------------------------------------------
| Ticket List View                                            TicketListView.js
|------------------------------------------------------------------------------
*/
define([
    'marionette',
    'hbs!apps/ticket/list/TicketListItemTemplate',
    'hbs!apps/ticket/list/TicketListTemplate'],
function (Marionette, TicketListItemTemplate, TicketListTemplate) {

	/**
	 * Ticket List Item View
	 */
	var TicketListItemView = Marionette.ItemView.extend({
		template: TicketListItemTemplate,
		tagName: 'li',
		className: 'list-group-item'
		/*,
		triggers: {
			'click': 'selected'
		}
		*/
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
			tickets: '#ticket-list'
		},

		onShow: function () {

			this.tickets.show(new TicketCollectionView({collection: this.options.collection}));
		}
	});

	return TicketListView;
});
