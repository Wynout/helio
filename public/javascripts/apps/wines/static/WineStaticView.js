/*
|------------------------------------------------------------------------------
| Wine Static Views                                           WineStaticView.js
|------------------------------------------------------------------------------
*/
define([
	'marionette',
	'hbs!apps/wines/static/WineHomeTemplate',
	'hbs!apps/wines/static/WineAboutTemplate'],
function (Marionette, WineHomeTemplate, WineAboutTemplate) {

	var HomeView = Marionette.ItemView.extend({
		template: WineHomeTemplate,
	});

	var AboutView = Marionette.ItemView.extend({
		template: WineAboutTemplate,
	});

	return {
		home : HomeView,
		about: AboutView
	};
});
