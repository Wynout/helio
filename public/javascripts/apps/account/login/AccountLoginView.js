/*
|------------------------------------------------------------------------------
| Account Login View                                        AccountLoginView.js
|------------------------------------------------------------------------------
*/
define([
    'marionette',
    'msgbus',
    'hbs!apps/account/login/AccountLoginTemplate'
],
function (
    Marionette,
    MsgBus,
    accountLoginTemplate) {


    /**
     * Account login dialog
     */
    var accountLoginView = Marionette.ItemView.extend({
        template: accountLoginTemplate,
        events: {
            'click .submit-login-credentials' : 'login'
        },

        login: function () {

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

                    self.$el.find('p').text(error.message);
                });
            return false;
        }
    });

    return accountLoginView;
});