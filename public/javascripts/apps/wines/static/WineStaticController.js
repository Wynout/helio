/*
|------------------------------------------------------------------------------
| Wine Static Controller                                WineStaticController.js
|------------------------------------------------------------------------------
*/
define(['msgbus', 'apps/wines/static/WineStaticView'], function (MsgBus, WineStaticView) {

    var controller = {
        showHome: function () {

            var regions = {
                content: new WineStaticView.home(),
            };
            MsgBus.commands.execute('regions:load', regions);
        },

        showAbout: function () {

            var regions = {
                content: new WineStaticView.about(),
            };
            MsgBus.commands.execute('regions:load', regions);
        }
    };
    return controller;
});
