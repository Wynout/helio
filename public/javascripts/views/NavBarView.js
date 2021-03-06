/*
|------------------------------------------------------------------------------
| Navbar View                                                     NavbarView.js
|------------------------------------------------------------------------------
*/
define([
    'jquery',
    'backbone',
    'marionette',
    'msgbus',
    'hbs!views/NavBarViewTemplate',
    'i18n!nls/navBar'],
function (
    $,
    Backbone,
    Marionette,
    MsgBus,
    NavBarViewTemplate,
    nlsNavBar) {


    /**
     * Navbar View
     */
    var NavBarView = Marionette.ItemView.extend({
        template: NavBarViewTemplate,

        events: {
            'click .toggle-sidebar' : 'toggleSidebar',
            'click .navbar-brand'   : 'toggleNavBar'
        },

        initialize: function () {

            MsgBus.events.on('account:signedin', this.signedin.bind(this));
            MsgBus.events.on('account:signedout', this.signedout.bind(this));

            MsgBus.commands.setHandler('navbar:open', this.openNavBar.bind(this));
            MsgBus.commands.setHandler('navbar:close', this.closeNavBar.bind(this));
            MsgBus.commands.setHandler('navbar:toggle', this.toggleNavBar.bind(this));
        },

        serializeData: function () {

            return nlsNavBar;
        },

        onRender: function () {

            var token = MsgBus.reqres.request('account:token:info');

            if (token.username) {

                this.signedin();
            } else {

                this.signedout();
            }
        },

        toggleSidebar: function () {

            MsgBus.commands.execute('navpanel:toggle');
        },

        openNavBar: function () {

            this.$el.find('.navbar-collapse.collapse').addClass('in');
        },

        closeNavBar: function (event) {

            this.$el.find('.navbar-collapse.collapse').removeClass('in');
        },

        toggleNavBar: function () {

            this.$el.find('.navbar-collapse.collapse').toggleClass('in');
        },

        signedin: function () {

            this.$el.find('.hide-before-signin').removeClass('hidden');
            this.$el.find('.show-before-signin').addClass('hidden');
        },

        signedout: function () {

            this.$el.find('.show-before-signin').removeClass('hidden');
            this.$el.find('.navbar-collapse.collapse').removeClass('in'); // class prevents complete collapse
            this.$el.find('.hide-before-signin').addClass('hidden');

        }
    });

    return NavBarView;
});
