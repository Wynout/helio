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
            navBar      : '#nav-bar',
            content     : '#content',
            appNavPanel : '#sidebar-wrapper'
        }
    });


    /**
     * Returns currently active media query breakpoint
     * note: breakpoint name is set in stylesheet
     * @return {String} breakpoint
     */
    MsgBus.reqres.setHandler('layout:media:query:breakpoint', function () {
        /*jslint browser:true */

        var breakpoint = '';
        if (window.getComputedStyle) { // not supported in ie8

            breakpoint = window.getComputedStyle(document.body, ':after')
                .getPropertyValue('content');
        }

        // Some browsers are including the quotes in the returned :after value
        if (breakpoint.indexOf('narrowscreen')!==-1) {

            return 'narrowscreen';
        }
        return '';
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
