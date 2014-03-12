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
                content : new WineListView({collection: wines})
            };
            MsgBus.commands.execute('regions:load', regions);
        }
    };

    return controller;
});
