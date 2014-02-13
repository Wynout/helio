/*
|------------------------------------------------------------------------------
| Account Login View                                        AccountLoginView.js
|------------------------------------------------------------------------------
*/
define([
    'marionette',
    'msgbus',
    'hbs!apps/account/login/AccountLoginTemplate',
    'hbs!apps/account/login/AccountLoginMessageTemplate',
    'hbs!apps/account/login/AccountLoginErrorTemplate'
],
function (
    Marionette,
    MsgBus,
    accountLoginTemplate,
    accountLoginMessageTemplate,
    accountLoginErrorTemplate) {


    /**
     * Message view shows initial login message
     */
    var MessageView = Marionette.ItemView.extend({
        template: accountLoginMessageTemplate,

        serializeData: function () {

            return {
                error: this.options.error,
                account: MsgBus.reqres.request('account:info')
            };
        },
    });


    /**
     * Error view shows error feedback
     */
    var ErrorView = Marionette.ItemView.extend({
        template: accountLoginErrorTemplate,

        serializeData: function () {
console.log('this.options = ', this.options);
            return {
                error: this.options.error,
                account: MsgBus.reqres.request('account:info')
            };
        },
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
            'keypress input': 'keypress',
            'click .close': 'close'
        },

        keypress: function (event) {

            if (event.keyCode!==13) {

                return;
            }
            this.validateCredentials();
        },

        serializeData: function () {

            return {
                account: MsgBus.reqres.request('account:info')
            };
        },

        onRender: function () {

            var messageView = new MessageView();
            this.loginMessage.show(messageView);
        },

        validateCredentials: function () {

            var self = this;
            var credentials = {
                username: this.$el.find('#username').val(),
                password: this.$el.find('#password').val()
            };

            var login = MsgBus.reqres.request('account:login', credentials);
            login
                .done(function (token) {

                    MsgBus.commands.execute('popup:close');
                })
                .fail(function (error) {

                    var errorView = new ErrorView({error: error});
                    self.loginMessage.show(errorView);
                });
            return false;
        },

        close: function () {

            MsgBus.commands.execute('popup:close');
        }
    });

    return AccountLoginLayout;
});