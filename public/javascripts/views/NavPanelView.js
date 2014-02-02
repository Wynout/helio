/*
|------------------------------------------------------------------------------
| Navigation Panel Views                                        NavPanelView.js
|------------------------------------------------------------------------------
*/
define([
    'marionette',
    'msgbus',
    'jquery',
    'hbs!views/NavPanelViewTemplate',
    'hbs!views/NavPanelWineViewTemplate'
],
function (Marionette, MsgBus, $, NavPanelViewTemplate, NavPanelWineViewTemplate) {

    var BaseView = Marionette.ItemView.extend({

        initialize: function () {

            $(window.document).on('panelbeforeopen', '#nav-panel', function (event, ui) {

                MsgBus.events.trigger('nav-panel:opened');
            });

            $(window.document).on('panelbeforeclose', '#nav-panel', function (event, ui) {

                MsgBus.events.trigger('nav-panel:closed');
            });

            MsgBus.events.on('window:resize', this.onResize.bind(this));
            MsgBus.events.on('nav-panel:open', this.open);
            MsgBus.events.on('nav-panel:close', this.close);
        },

        onResize: function (dimensions) {

            if (dimensions.width>=900) {

                this.open();

            } else {

                this.close();
            }
        },

        open: function () {

            $('#nav-panel').panel('open');
        },

        close: function () {

            $('#nav-panel').panel('close');
        }

    });

    var defaultView = BaseView.extend({
        template: NavPanelViewTemplate
    });

    var wineView = BaseView.extend({
        template: NavPanelWineViewTemplate,
    });

    return {
        default: defaultView,
        wine: wineView
    };

});