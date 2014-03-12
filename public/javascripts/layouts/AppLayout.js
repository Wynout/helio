/*
|------------------------------------------------------------------------------
| Page Layout View                                                PageLayout.js
|------------------------------------------------------------------------------
*/
define(['marionette', 'backbone', 'msgbus', 'jquery', 'hbs!layouts/AppLayoutTemplate'],
function (Marionette, Backbone, MsgBus, $, appLayoutTemplate) {

    /**
     * Custom Region
     * Problem: extra wrapper div in region preventing css styles to apply for jqm
     * Solution: custom region where wrapper div is disabled
     * @link http://stackoverflow.com/questions/11195242/extra-wrappers-in-backbone-and-marionette
     */
    // Not used for now, doesn't seem to bother bootstrap styles.. should remove later
    // var NowrapRegion = Marionette.Region.extend({
    //     open: function (view) {

    //         // Using a deep clone on the child nodes will maintain events and data.
    //         view.$el.children().clone(true).appendTo(this.$el);
    //     }
    // });


    /**
     * App Layout
     */
    var AppLayout = Backbone.Marionette.Layout.extend({
        template: appLayoutTemplate,
        regions: {
            header         : '#header',
            content        : '#content',
            appNavPanel    : '#app-nav-panel',
            contentNavPanel: '#content-nav-panel',
            popup          : '#popup-dialog'
        },


        // onRender: function () {

        //     // Views for the regions are passed in via the options
        //     this.header.show(this.options.header);
        //     this.content.show(this.options.content);
        //     if (this.options.navPanel) {

        //         this.navPanel.show(this.options.navPanel);
        //     }
        // }

    });


    /**
     * Show Popup
     * @param Object View
     */
    MsgBus.commands.setHandler('popup:show', function (View) {

    });


    /**
     * Close Popup
     */
    MsgBus.commands.setHandler('popup:close', function () {

    });

    return AppLayout;
});
