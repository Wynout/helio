/*
|------------------------------------------------------------------------------
| Account Signin View                                      AccountSigninView.js
|------------------------------------------------------------------------------
*/
define([
    'jquery',
    'backbone',
    'marionette',
    'msgbus',
    'vendor/utils',
    'hbs!apps/account/signin/AccountSigninTemplate',
    'hbs!apps/account/signin/AccountSigninMessageTemplate',
    'hbs!apps/account/signin/AccountSigninErrorTemplate',
    'i18n!nls/account'],
function (
    $,
    Backbone,
    Marionette,
    MsgBus,
    Utils,
    accountSigninTemplate,
    accountSigninMessageTemplate,
    accountSigninErrorTemplate,
    nlsAccount) {


    /**
     * Message view shows initial signin message
     */
    var MessageView = Marionette.ItemView.extend({
        template: accountSigninMessageTemplate,

        serializeData: function () {

            return $.extend(true,
                nlsAccount.signin,
                MsgBus.reqres.request('account:info')
            );
        },
    });


    /**
     * Error view shows error feedback
     */
    var ErrorView = Marionette.ItemView.extend({
        template: accountSigninErrorTemplate,

        serializeData: function () {

            return $.extend(true,
                this.options,
                nlsAccount.signin,
                MsgBus.reqres.request('account:info')
            );
        }
    });


    /**
     * Account signin view
     */
    var AccountSigninLayout = Marionette.Layout.extend({
        template: accountSigninTemplate,

        regions: {
            signinMessage: '#signin-message'
        },

        events: {
            'click .submit-signin-credentials': 'validateCredentials',
            'keypress input'                  : 'keypress',
            'keypress input[type="password"]' : 'checkCapslock'
        },

        // Signin on enter press
        keypress: function (event) {

            if (event.keyCode===13) {

                this.validateCredentials();
            }
        },

        checkCapslock: function (event) {

            var action = Utils.isCapslockOn(event) ? 'show' : 'hide';
            $(event.currentTarget).popover(action);
        },

        serializeData: function () {

            return $.extend(true,
                nlsAccount.signin,
                MsgBus.reqres.request('account:info')
            );
        },

        onRender: function () {

            var messageView = new MessageView();
            this.signinMessage.show(messageView);
        },

        validateCredentials: function () {

            var self = this;
            var credentials = {
                username: this.$el.find('#username').val(),
                password: this.$el.find('#password').val()
            };

            var performSignin = MsgBus.reqres.request('account:signin', credentials);
            performSignin
                .done(function (token) {

                    if (self.options.action==='redirect') {

                        window.history.back();
                    } else {

                        Backbone.history.navigate('dashboard', {trigger: true});
                    }
                })
                .fail(function (error) {

                    var errorView = new ErrorView({error: error});
                    self.signinMessage.show(errorView);
                });
            return false;
        }
    });

    return AccountSigninLayout;
});
