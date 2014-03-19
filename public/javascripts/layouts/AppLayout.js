/*
|------------------------------------------------------------------------------
| Page Layout View                                                PageLayout.js
|------------------------------------------------------------------------------
*/
define(['marionette', 'backbone', 'msgbus', 'jquery', 'hbs!layouts/AppLayoutTemplate'],
function (Marionette, Backbone, MsgBus, $, appLayoutTemplate) {

    /*global document*/

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
     * Checks CSS value in active media query and syncs Javascript functionality
     * Publishes event active media query changed
     * @return {String} active media query
     */
    var syncMediaQuery = function () {

        var activeMQ,
            currentMQ = 'unknown';

        // Fix for Opera issue when using font-family to store value
        if (window.opera) {

            activeMQ = window.getComputedStyle(document.body, ':after').getPropertyValue('content');
        }
        // For all other modern browsers
        else if (window.getComputedStyle) {

            activeMQ = window.getComputedStyle(document.head, null).getPropertyValue('font-family');
        }
        // For oldIE
        else {
            // Use .getCompStyle instead of .getComputedStyle so above check for window.getComputedStyle never fires true for old browsers
            window.getCompStyle = function (el, pseudo) {

                this.el = el;
                this.getPropertyValue = function (prop) {

                    var re = /(\-([a-z]){1})/g;
                    if (prop==='float') {

                        prop = 'styleFloat';
                    }
                    if (re.test(prop)) {

                        prop = prop.replace(re, function () {

                            return arguments[2].toUpperCase();
                        });
                    }
                    return el.currentStyle[prop] ? el.currentStyle[prop] : null;
                };
                return this;
            };
            var compStyle = window.getCompStyle(document.getElementsByTagName('head')[0], '');
            activeMQ = compStyle.getPropertyValue('font-family');
        }

        // some browsers return quotes in property value
        activeMQ = activeMQ.replace(/"/g, '');
        activeMQ = activeMQ.replace(/'/g, '');

        // Publish event active media query changed
        if (activeMQ!==currentMQ) {

            MsgBus.events.trigger('layout:media:query:change', activeMQ);
            return activeMQ;
        }
    };


    /**
     * App Layout
     */
    var AppLayout = Backbone.Marionette.Layout.extend({
        template: appLayoutTemplate,
        regions: {
            navBar      : '#nav-bar',
            content     : '#content',
            appNavPanel : '#sidebar-wrapper'
        },

        events: {
            // Media Query narrowscreen: Close navpanel on click '#content' div
            // <div id="content">must have have content else is not clickable!</div>
            'click #content': function (event) {

                var breakpoint = syncMediaQuery();
                if (breakpoint==='narrowscreen') {

                    MsgBus.commands.execute('navpanel:close');
                }
            }
        },

        initialize: function () {

            syncMediaQuery(); // run when dom is ready
            $(window).resize(function () {

                syncMediaQuery();
            });
        }
    });


    /**
     * Returns currently active media query breakpoint
     * note: breakpoint name is set in stylesheet
     * @return {String} breakpoint
     */
    MsgBus.reqres.setHandler('layout:media:query', function () {

        return syncMediaQuery();
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
