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
    'i18n!nls/navPanel'],
function (
    $,
    Marionette,
    MsgBus,
    NavPanelViewTemplate,
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

            return nlsPanel;
        }
    });


    return StandardView;
});
