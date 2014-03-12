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
            header   : '#header',
            content  : '#content',
            navPanel : '#nav-panel',
            popup    : '#popup-dialog'
        },

        // initialize: function () {

        //     var self = this;
        //     MsgBus.events.on('window:resize', function (dimensions) {

        //         self.onResize(dimensions);
        //     });
        // },

        // onRender: function () {
        //     console.log(this.el);
        // },


        // onRender: function () {
// console.log(this.options);
        //     // Views for the regions are passed in via the options
        //     this.header.show(this.options.header);
            // this.content.show(this.options.content);
        //     if (this.options.navPanel) {

        //         this.navPanel.show(this.options.navPanel);
        //     }
        // },

        // onResize: function (dimensions) {

        //     this.repositionPopup();
        // },

        // // Reposition popup to center of window on resize
        // repositionPopup: function () {

        //     var $popup          = $(this.regions.popup),
        //         $popupContainer = $popup.closest('div.ui-popup-container');

        //     if ($popupContainer.hasClass('ui-popup-active')) {

        //        $popup.popup('reposition', {positionTo: 'window'}); // or 'origin'
        //     }
        // }
    });


    // /**
    //  * Show Popup
    //  * @param Object View
    //  */
    // MsgBus.commands.setHandler('popup:show', function (View) {

    //     $('#popup-dialog')
    //         .html(View.render().el)
    //         .enhanceWithin()
    //         .popup('open');
    // });


    // /**
    //  * Close Popup
    //  */
    // MsgBus.commands.setHandler('popup:close', function () {

    //     $('#popup-dialog').popup('close');
    // });

    return AppLayout;
});
