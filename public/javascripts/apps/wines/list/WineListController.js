/*
|------------------------------------------------------------------------------
| Wine List Controller                                    WineListController.js
|------------------------------------------------------------------------------
*/
define([
    'msgbus',
    'apps/wines/list/WineListView',
    'views/NavPanelView'
],
function (MsgBus, WineListView, NavPanelView) {

    var controller = {
        showWines: function () {

            var self          = this,
                fetchingWines = MsgBus.reqres.request('wine:entities');
            fetchingWines
                .done(function (wines) {

                    self._showWines(wines);
                })
                .fail(function (error, collection, jqXHR, options) {

                    self._showWines();
                    MsgBus.commands.execute('xhr:error:show', error);
                });
        },

        _showWines: function (wines) {

            var regions = {
                // header  : new App.HeaderView.standard(),
                content : new WineListView({collection: wines}),
                navPanel: new NavPanelView.wine()
            };
            MsgBus.commands.execute('change:page', regions);
        }
    };

    return controller;
});
