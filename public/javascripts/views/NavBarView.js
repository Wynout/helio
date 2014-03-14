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

        },

        initialize: function () {

            MsgBus.events.on('account:signedin', this.signedin.bind(this));
            MsgBus.events.on('account:signedout', this.signedout.bind(this));
        },

        serializeData: function () {

            return nlsNavBar;
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

            this.$el.find('.hide-before-signin').removeClass('hidden');
            this.$el.find('.show-before-signin').addClass('hidden');
        },

        signedout: function () {

            this.$el.find('.show-before-signin').removeClass('hidden');
            this.$el.find('.hide-before-signin').addClass('hidden');
        }
    });

    return NavBarView;
});
