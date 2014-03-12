/*
|------------------------------------------------------------------------------
| Account Login View                                        AccountLoginView.js
|------------------------------------------------------------------------------
*/
define([
    'jquery',
    'backbone',
    'marionette',
    'msgbus',
    'hbs!apps/account/login/AccountLoginTemplate',
    'hbs!apps/account/login/AccountLoginMessageTemplate',
    'hbs!apps/account/login/AccountLoginErrorTemplate',
    'i18n!nls/account'],
function (
    $,
    Backbone,
    Marionette,
    MsgBus,
    accountLoginTemplate,
    accountLoginMessageTemplate,
    accountLoginErrorTemplate,
    nlsAccount) {


    /**
     * Message view shows initial login message
     */
    var MessageView = Marionette.ItemView.extend({
        template: accountLoginMessageTemplate,

        serializeData: function () {

            return $.extend(true,
                nlsAccount.login,
                MsgBus.reqres.request('account:info')
            );
        },
    });


    /**
     * Error view shows error feedback
     */
    var ErrorView = Marionette.ItemView.extend({
        template: accountLoginErrorTemplate,

        serializeData: function () {

            return $.extend(true,
                this.options,
                nlsAccount.login,
                MsgBus.reqres.request('account:info')
            );
        }
    });


    /**
     * Account login view
     */
    var AccountLoginLayout = Marionette.Layout.extend({
        template: accountLoginTemplate,

        regions: {
            loginMessage: '#login-message'
        },

        events: {
            'click .submit-login-credentials': 'validateCredentials',
            'keypress input'                 : 'keypress'
        },

        // Login on enter press
        keypress: function (event) {

            if (event.keyCode===13) {

                this.validateCredentials();
            }
        },

        serializeData: function () {

            return $.extend(true,
                nlsAccount.login,
                MsgBus.reqres.request('account:info')
            );
        },

        onRender: function () {

            var messageView = new MessageView();
            this.loginMessage.show(messageView);
        },

        validateCredentials: function (event) {

            event.preventDefault();

            var self = this;
            var credentials = {
                username: this.$el.find('#username').val(),
                password: this.$el.find('#password').val()
            };

            var login = MsgBus.reqres.request('account:login', credentials);
            login
                .done(function (token) {

                    MsgBus.commands.execute('popup:close');
                    if (Backbone.history.fragment==='accounts/switch') {

                        Backbone.history.navigate('/', {trigger: true});
                    } else {

                        // window.location.reload();
                        Backbone.history.navigate('#dashboard', {trigger: true});
                    }
                })
                .fail(function (error) {

                    var errorView = new ErrorView({error: error});
                    self.loginMessage.show(errorView);
                });
            return false;
        },

        logoff: function () {

            MsgBus.commands.execute('account:logoff');
            MsgBus.commands.execute('popup:close');
            Backbone.history.navigate('/', {trigger: true});
        }
    });

    return AccountLoginLayout;
});
