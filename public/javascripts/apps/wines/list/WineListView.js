/*
|------------------------------------------------------------------------------
| Wine List View                                                WineListView.js
|------------------------------------------------------------------------------
*/
define(['marionette', 'hbs!apps/wines/list/WineListItemTemplate'],
	function (Marionette, WineListItemTemplate) {

	var WineListItemView = Marionette.ItemView.extend({
		template: WineListItemTemplate,
		tagName: 'li'/*,
		triggers: {
			'click': 'selected'
		}*/
	});

	return Marionette.CollectionView.extend({
		itemView: WineListItemView,
		tagName: 'ul',
		id: 'wine-list',
		attributes: {
			'data-role': 'listview',
			'data-inset': 'true'
		}
	});
});