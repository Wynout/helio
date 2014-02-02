/*
|------------------------------------------------------------------------------
| Wine Static Controller                                WineStaticController.js
|------------------------------------------------------------------------------
*/
define(['msgbus', 'apps/wines/static/WineStaticView'], function (MsgBus, WineStaticView) {

    var controller = {
        showHome: function () {

            var regions, pageLayout;

            regions = {
                content: new WineStaticView.home(),
            };
            MsgBus.commands.execute('change:page', regions);
        },

        showAbout: function () {

            var regions, pageLayout;

            regions = {
                content: new WineStaticView.about(),
            };
            MsgBus.commands.execute('change:page', regions);
        }
    };
    return controller;
});