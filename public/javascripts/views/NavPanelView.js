/*
|------------------------------------------------------------------------------
| Navigation Panel View                                         NavPanelView.js
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
     * Navigation Panel View
     */
    var NavPanelView = Marionette.ItemView.extend({
        template: NavPanelViewTemplate,

        events: {
            'click li': 'clickListItem'
        },

        initialize: function () {

            var self = this;

            MsgBus.events.on('account:signedin', this.signedin.bind(this));
            MsgBus.events.on('account:signedout', this.signedout.bind(this));
            MsgBus.events.on('route:filter:before', this.setActiveItem.bind(this));
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

        setActiveItem: function (route) {

            var item = route || Backbone.history.fragment;

            this.unsetActiveItems();
            this.$el.find('a[href="#' + item + '"]')
                .closest('li')
                .addClass('active');
        },

        unsetActiveItems: function () {

            this.$el.find('li.active').removeClass('active');
        },

        clickListItem: function (event) {

            this.unsetActiveItems();
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

    return NavPanelView;
});
