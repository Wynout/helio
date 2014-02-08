/*
|------------------------------------------------------------------------------
| Header Views                                                    HeaderView.js
|------------------------------------------------------------------------------
*/
define(['marionette', 'msgbus', 'jquery', 'hbs!views/HeaderViewTemplate'],
function (Marionette, MsgBus, $, headerViewTemplate) {

    var BaseView = Marionette.ItemView.extend({

        events: {}, // not working because wrapper div is removed in custom region
        initialize: function () {

            /**
             * Trigger resize event to open/close panels on page has change
             */
            $(window.document).on('pagechange', function (event) {

                clearTimeout(this.id);
                this.id = setTimeout(function () {

                    $('.title-text-hidden').fadeTo(600, 1);
                }, 100);
            });

            $(window.document).on('click', 'a.toggle-navigation', function () {

                MsgBus.events.trigger('nav-panel:open');
                return false;
            });

            MsgBus.events.on('nav-panel:opened', this.hideCloseButton);
            MsgBus.events.on('nav-panel:closed', this.showCloseButton);
        },


        showCloseButton: function () {

           $('.toggle-navigation').show();
        },


        hideCloseButton: function () {

            $('.toggle-navigation').hide();
        }
    });

    var DefaultView = BaseView.extend({
        template: headerViewTemplate,
    });

    return {
        default: DefaultView
    };

});