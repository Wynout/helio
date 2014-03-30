/*
 |------------------------------------------------------------------------------
 | Dashboard App Module                                          DashboardApp.js
 |------------------------------------------------------------------------------
 */
define([
    'backbone',
    'marionette',
    'msgbus',
    'apps/dashboard/show/DashboardShowController',
    'apps/dashboard/show/DashboardShowView'],
function (
    Backbone,
    Marionette,
    MsgBus,
    DashboardShowController,
    DashboardShowView) {

    /**
     * Setup Dashboard Router
     */
    var Dashboard = Marionette.AppRouter.extend({
        appRoutes: {
            '': 'redirectDashboard',
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
        },
        redirectDashboard: function () {

            Backbone.history.navigate('dashboard', {trigger: true});
        }
    };

    return API;
});
