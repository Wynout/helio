/*
|------------------------------------------------------------------------------
| Navigation Panel Views                                        NavPanelView.js
|------------------------------------------------------------------------------
*/
define([
    'jquery',
    'marionette',
    'msgbus',
    'hbs!views/NavPanelViewTemplate',
    'hbs!views/NavPanelWineViewTemplate',
    'i18n!nls/navPanel'],
function (
    $,
    Marionette,
    MsgBus,
    NavPanelViewTemplate,
    NavPanelWineViewTemplate,
    nlsPanel) {


    /**
     * Navigation Panel Base View
     */
    var BaseView = Marionette.ItemView.extend({

        initialize: function () {

            $(window.document).on('panelbeforeopen', '#nav-panel', function (event, ui) {

                MsgBus.events.trigger('nav-panel:opened');
            });

            $(window.document).on('panelbeforeclose', '#nav-panel', function (event, ui) {

                MsgBus.events.trigger('nav-panel:closed');
            });

            MsgBus.events.on('window:resize', this.onResize);
            MsgBus.events.on('nav-panel:open', this.open);
            MsgBus.events.on('nav-panel:close', this.close);
        },

        onResize: function (dimensions) {

            if (dimensions.width>=900) {

                MsgBus.events.trigger('nav-panel:open');

            } else {

                MsgBus.events.trigger('nav-panel:close');
            }
        },

        open: function () {

            $('#nav-panel').panel('open');
        },

        close: function () {

            $('#nav-panel').panel('close');
        }

    });


    /**
     * Standard Navigation View
     */
    var StandardView = BaseView.extend({
        template: NavPanelViewTemplate,

        serializeData: function () {

            return nlsPanel.standard;
        }
    });


    /**
     * Wine Navigation View
     */
    var WineView = BaseView.extend({
        template: NavPanelWineViewTemplate,

        serializeData: function () {

            return nlsPanel.wine;
        }
    });


    return {
        standard: StandardView,
        wine: WineView
    };
});
