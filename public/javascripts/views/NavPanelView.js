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
