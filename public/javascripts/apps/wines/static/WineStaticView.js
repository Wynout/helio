/*
|------------------------------------------------------------------------------
| Wine Static Views                                           WineStaticView.js
|------------------------------------------------------------------------------
*/
define([
	'marionette',
	'hbs!apps/wines/static/WineHomeTemplate',
	'hbs!apps/wines/static/WineAboutTemplate'
	],
function (Marionette, WineHomeTemplate, WineAboutTemplate) {

	var homeView = Marionette.ItemView.extend({
		template: WineHomeTemplate,
	});

	var aboutView = Marionette.ItemView.extend({
		template: WineAboutTemplate,
	});

	return {
		home : homeView,
		about: aboutView
	};
});