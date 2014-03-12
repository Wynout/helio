/*
|------------------------------------------------------------------------------
| Account Login View                                        AccountLoginView.js
|------------------------------------------------------------------------------
*/
define([
    'jquery',
    'backbone',
    'marionette',
    'msgbus',
    'hbs!apps/dashboard/show/DashboardShowTemplate',
    'i18n!nls/dashboard'],
function (
    $,
    Backbone,
    Marionette,
    MsgBus,
    dashboardShowTemplate,
    nlsDashboard) {


    /**
     * Dashboard Show Layout
     */
    var DashboardShowLayout = Marionette.Layout.extend({
        template: dashboardShowTemplate,

        serializeData: function () {

            return $.extend(true,
                nlsDashboard.show,
                MsgBus.reqres.request('account:info')
            );
        }
    });

    return DashboardShowLayout;
});
