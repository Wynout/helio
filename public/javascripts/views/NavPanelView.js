/*
|------------------------------------------------------------------------------
| Navigation Panel Views                                        NavPanelView.js
|------------------------------------------------------------------------------
*/
define([
    'jquery',
    'backbone',
    'marionette',
    'msgbus',
    'hbs!views/NavPanelViewTemplate',
    'i18n!nls/navPanel'],
function (
    $,
    Backbone,
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

        events: {
            'click li': 'clickListItem'
        },

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

            this.setActiveItem();
        },

        setActiveItem: function () {

            this.unsetActiveItem();
            this.$el.find('a[href="#' + Backbone.history.fragment + '"]')
                .closest('li')
                .addClass('active');
        },

        unsetActiveItem: function () {

            this.$el.find('li.active').removeClass('active');
        },

        clickListItem: function (event) {

            this.unsetActiveItem();
            $(event.currentTarget).addClass('active');
        },

        signedin: function () {

            this.$el.find('li.hide-before-signin').removeClass('hidden');
            this.$el.find('li.show-before-signin').addClass('hidden');
            this.setActiveItem();
        },

        signedout: function () {

            this.$el.find('li.show-before-signin').removeClass('hidden');
            this.$el.find('li.hide-before-signin').addClass('hidden');
            this.setActiveItem();
        }
    });

    return StandardView;
});
