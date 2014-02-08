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

            var validate = MsgBus.reqres.request('account:validate:credentials', credentials);
            validate
                .done(function (data, textStatus, jqXHR) {

                    // close popup?
                    console.log('W00t, credentials validated');
                })
                .fail(function (jqXHR, textStatus, errorThrown) {

                    // entity response should be parsed json responseText.
                    var response = JSON.parse(jqXHR.responseText);
                    self.$el.find('p').text(response.error.message);
                    console.log('fail!', jqXHR, textStatus, errorThrown);
                    // show error message
                });
            return false;
        }
    });

    return accountLoginView;
});