/*
 |------------------------------------------------------------------------------
 | Dashboard App Module                                          DashboardApp.js
 |------------------------------------------------------------------------------
 */
define([
    'marionette',
    'msgbus',
    'apps/dashboard/show/DashboardShowController',
    'apps/dashboard/show/DashboardShowView'],
function (
    Marionette,
    MsgBus,
    DashboardShowController,
    DashboardShowView) {

    /**
     * Setup Dashboard Router
     */
    var Dashboard = Marionette.AppRouter.extend({
        appRoutes: {
            '': 'dashboard',
            'dashboard': 'dashboard'
        },
        before: function (route) {

            MsgBus.events.trigger('route:filter:before', route);
        },
        after: function (route) {

            MsgBus.events.trigger('route:filter:after', route);
        }
    });


    /**
     * Starts Dashboard Routes
     */
    MsgBus.commands.setHandler('dashboard:routes', function () {

        return new Dashboard({
            controller: API
        });
    });


    /**
     * Expose DashboardApp API
     */
    var API = {
        dashboard: function () {

            DashboardShowController.show();
        }
    };

    return API;
});
