/*
|------------------------------------------------------------------------------
| Page Layout View                                                PageLayout.js
|------------------------------------------------------------------------------
*/
define(['marionette', 'backbone', 'msgbus', 'jquery', 'hbs!layouts/PageLayoutTemplate'],
function (Marionette, Backbone, MsgBus, $, pageLayoutTemplate) {

    /**
     * Custom Region
     * Problem: extra wrapper div in region preventing css styles to apply for jqm
     * Solution: custom region where wrapper div is disabled
     * @link http://stackoverflow.com/questions/11195242/extra-wrappers-in-backbone-and-marionette
     */
    var NowrapRegion = Marionette.Region.extend({
        open: function (view) {

            // Using a deep clone on the child nodes will maintain events and data.
            view.$el.children().clone(true).appendTo(this.$el);
        }
    });


    /**
     * jQuery Mobile Page Layout
     */
    var pageLayout = Backbone.Marionette.Layout.extend({
        template: pageLayoutTemplate,
        className: 'ui-responsive-panel',
        regions: {
            header: {
                selector  : '#header',
                regionType: NowrapRegion
            },
            content : '#content',
            navPanel: {
                selector: '#nav-panel',
                regionType: NowrapRegion
            },
            popup   : '#popup-dialog'
        },

        initialize: function () {

            var self = this;
            MsgBus.events.on('window:resize', function (dimensions) {

                self.onResize(dimensions);
            });
        },

        onRender: function () {

            // Views for the regions are passed in via the options
            this.header.show(this.options.header);
            this.content.show(this.options.content);
            if (this.options.navPanel) {

                this.navPanel.show(this.options.navPanel);
            }
        },

        onResize: function (dimensions) {

            this.repositionPopup();
        },

        // Reposition popup to center of window on resize
        repositionPopup: function () {

            var $popup          = $(this.regions.popup),
                $popupContainer = $popup.closest('div.ui-popup-container');

            if ($popupContainer.hasClass('ui-popup-active')) {

               $popup.popup('reposition', {positionTo: 'window'}); // or 'origin'
            }
        }
    });


    /**
     * Show Popup
     * @param Object View
     */
    MsgBus.commands.setHandler('popup:show', function (View) {

        $('#popup-dialog')
            .html(View.render().el)
            .enhanceWithin()
            .popup('open');
    });


    /**
     * Close Popup
     */
    MsgBus.commands.setHandler('popup:close', function () {

        $('#popup-dialog').popup('close');
    });

    return pageLayout;
});