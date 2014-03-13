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

        initialize: function () {

            MsgBus.events.on('account:signedin', this.signedin.bind(this));
            MsgBus.events.on('account:signedout', this.signedout.bind(this));
        },

        serializeData: function () {

            return nlsPanel;
        },

        onRender: function () {

            var account = MsgBus.reqres.request('account:info');

            if (account.username) {

                this.signedin();
            } else {

                this.signedout();
            }
        },

        signedin: function () {
            console.log('NavPanelView signedin');
            this.$el.find('li.hide-before-signin').removeClass('hidden');
            this.$el.find('li.show-before-signin').addClass('hidden');
        },

        signedout: function () {
            console.log('NavPanelView signedout');
            this.$el.find('li.show-before-signin').removeClass('hidden');
            this.$el.find('li.hide-before-signin').addClass('hidden');
        }
    });

    return StandardView;
});
