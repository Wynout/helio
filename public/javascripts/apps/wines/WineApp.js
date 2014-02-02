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
    'apps/wines/static/WineStaticController',
    'entities/Wine'
    ],
function (Marionette, MsgBus, WineDeleteController, WineEditController, WineListController, WineStaticController) {

    /**
     * Setup WineApp Router
     */
    var WineRouter = Marionette.AppRouter.extend({
        appRoutes: {
            ''         : 'showHome',
            'home'     : 'showHome',
            'about'    : 'showAbout',
            'wines/add': 'addWine',
            'wines'    : 'showWines',
            'wines/:id': 'editWine'
        }
    });


    /**
     * Start Wines Route
     */
    MsgBus.commands.setHandler('wines:route', function () {

        console.log('starting wines route');
        new WineRouter({
            controller: API
        });
    });


    /**
     * Subscribe to event, edit wine, not used??
     */
    MsgBus.events.on('wine:selected', function (wine) {

        API.showWine(wine);
        // Backbone.history.navigate('wine/edit/' + wine._id);
    });


    /**
     * Subscribe to event, delete wine confirmation dialog
     */
    MsgBus.events.on('wine:delete:confirm', function (model) {
        console.log('vent on wine:delete:confirm');
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
        showHome: function () {

            WineStaticController.showHome();
        },

        showAbout: function () {

            WineStaticController.showAbout();
        },

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