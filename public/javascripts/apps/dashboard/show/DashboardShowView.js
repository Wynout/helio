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
    'raphael',
    'morris',
    'hbs!apps/dashboard/show/DashboardShowTemplate',
    'i18n!nls/dashboard'],
function (
    $,
    Backbone,
    Marionette,
    MsgBus,
    Raphael,
    Morris,
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
                MsgBus.reqres.request('account:token:info')
            );
        },

        onShow: function () {

            this.drawDonut();
        },

        drawDonut: function () {

            this.donut = Morris.Donut({
                element: 'donut',
                data: [
                    {value: 70, label: 'foo', formatted: 'at least 70%' },
                    {value: 15, label: 'bar', formatted: 'approx. 15%' },
                    {value: 10, label: 'baz', formatted: 'approx. 10%' },
                    {value: 5, label: 'A really really long label', formatted: 'at most 5%' }
                ],
                formatter: function (x, data) { return data.formatted; }
            });
        }
    });

    return DashboardShowLayout;
});
