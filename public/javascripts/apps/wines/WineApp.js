/*
 |------------------------------------------------------------------------------
 | Wine App Module                                                    WineApp.js
 |------------------------------------------------------------------------------
 */
define([
    'marionette',
    'msgbus',
    'apps/wines/delete/WineDeleteController',
    'apps/wines/edit/WineEditController',
    'apps/wines/list/WineListController',
    'entities/Wine'
    ],
function (Marionette, MsgBus, WineDeleteController, WineEditController, WineListController) {

    /**
     * Setup WineApp Router
     */
    var WineRouter = Marionette.AppRouter.extend({
        appRoutes: {
            'wines/add': 'addWine',
            'wines'    : 'showWines',
            'wines/:id': 'editWine'
        },
        before: function (route) {

            MsgBus.events.trigger('route:filter:before', route);
        },
        after: function (route) {

            MsgBus.events.trigger('route:filter:after', route);
        }
    });


    /**
     * Starts Wines Routes
     */
    MsgBus.commands.setHandler('wine:routes', function () {

        return new WineRouter({
            controller: API
        });
    });


    /**
     * Subscribe to event, edit wine, not used??
     */
    MsgBus.events.on('wine:selected', function (wine) {

        API.showWine(wine);
    });


    /**
     * Subscribe to event, delete wine confirmation dialog
     */
    MsgBus.events.on('wine:delete:confirm', function (model) {

        API.deleteWineConfirm(model);
    });


    /**
     * Subscribe to event, delete wine
     */
    MsgBus.events.on('wine:delete', function (model) {

        API.deleteWine(model);
    });


    /**
     * Expose WineApp API through WineRouter
     */
    var API = {
        addWine: function () {

           WineEditController.addWine();
        },

        showWines: function () {

            WineListController.showWines();
        },

        editWine: function (wineId) {

            WineEditController.editWine(wineId);
        },

        deleteWineConfirm: function (model) {

           WineDeleteController.deleteWineConfirm(model);
        },

        deleteWine: function (model) {

           WineDeleteController.deleteWine(model);
        }
    };

    return API;
});
