/*
|------------------------------------------------------------------------------
| Wine Edit Controller                                    WineEditController.js
|------------------------------------------------------------------------------
*/
define(['backbone', 'marionette', 'msgbus', 'apps/wines/edit/WineEditView', 'views/NavPanelView'],
function (Backbone, Marionette, MsgBus, WineEditView, NavPanelView) {

    var controller = {

        addWine: function () {

            var wine = MsgBus.reqres.request('wine:entity:add');
            this._editWine(wine);
        },

        editWine: function (wineId) {

            var fetchWine = MsgBus.reqres.request('wine:entity', wineId),
                self      = this;
            fetchWine
                .done(function (wine) {

                    self._editWine(wine);
                }).fail(function (error, model, xhr, options) {

                    console.log('edit wine, error = ', error);
                    if (error.message==='Authorization expired') {}
                    // Most of the time this is bad practice. I think we can get away with it.
                    Backbone.history.navigate('wines', {trigger: true}); // Updates URL and run router handler
                });
        },

        _editWine: function (wine) {

            var regions = {
                // header : new App.HeaderView.default(),
                content : new WineEditView({model: wine}),
                navPanel: new NavPanelView.wine()
            };
            MsgBus.commands.execute('change:page', regions);
        }

    };

    return controller;
});