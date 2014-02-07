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

            var credentials = {
                username: this.$el.find('#username').val(),
                password: this.$el.find('#password').val()
            };

            var validate = MsgBus.reqres.request('account:validate:credentials', credentials);
            validate
                .done(function (data, textStatus, jqXHR) {
                    console.log('W00t, credentials validated');
                })
                .fail(function (jqXHR, textStatus, errorThrown) {

                    console.log('fail!');
                    console.log(jqXHR, textStatus, errorThrown);

                });
            return false;
        }
    });

    return accountLoginView;
});