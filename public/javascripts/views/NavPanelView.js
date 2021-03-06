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

            this.$wrapper = $('#wrapper');

            MsgBus.events.on('account:signedin', this.signedin.bind(this));
            MsgBus.events.on('account:signedout', this.signedout.bind(this));
            MsgBus.events.on('route:filter:after', this.setActiveItem.bind(this));

            MsgBus.commands.setHandler('navpanel:open', this.openNavPanel.bind(this));
            MsgBus.commands.setHandler('navpanel:close', this.closeNavPanel.bind(this));
            MsgBus.commands.setHandler('navpanel:toggle', this.toggleNavPanel.bind(this));
        },

        serializeData: function () {

            return nlsPanel;
        },

        onRender: function () {

            var token = MsgBus.reqres.request('account:token:info');

            if (token.username) {

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

            var breakpoint = MsgBus.reqres.request('layout:media:query');

            if (breakpoint==='narrowscreen') {

                this.closeNavPanel();
            }
        },

        openNavPanel: function () {

            this.$wrapper.addClass('nav-panel-open');
        },

        closeNavPanel: function () {

            this.$wrapper.removeClass('nav-panel-open');
        },

        toggleNavPanel: function () {

            this.$wrapper.toggleClass('nav-panel-open');
        },

        /**
         * Show/Hide navigation items after sign out
         */
        signedin: function () {

            this.$el.find('li.hide-before-signin').removeClass('hidden');
            this.$el.find('li.show-before-signin').addClass('hidden');
            this.setActiveItem();
        },

        /**
         * Show/Hide navigation items after sign out
         */
        signedout: function () {

            this.$el.find('li.show-before-signin').removeClass('hidden');
            this.$el.find('li.hide-before-signin').addClass('hidden');
            this.setActiveItem();
        }
    });

    return NavPanelView;
});
