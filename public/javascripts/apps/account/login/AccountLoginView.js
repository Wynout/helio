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
     * MessageView shows initial login message
     */
    var MessageView = Marionette.ItemView.extend({
        template: accountLoginMessageTemplate
    });


    /**
     * Error view shows error feedback
     */
    var ErrorView = Marionette.ItemView.extend({
        template: accountLoginErrorTemplate,

        serializeData: function () {

            return {
                error: this.options.error
            };
        },
    });


    /**
     * Account login dialog
     */
    var AccountLoginLayout = Marionette.Layout.extend({
        template: accountLoginTemplate,

        regions: {
            loginMessage: '#login-message'
        },

        events: {
            'click .submit-login-credentials' : 'validateCredentials'
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
        }
    });

    return AccountLoginLayout;
});