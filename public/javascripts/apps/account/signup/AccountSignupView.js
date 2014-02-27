/*
|------------------------------------------------------------------------------
| Account Signup View                                      AccountSignupView.js
|------------------------------------------------------------------------------
*/
define([
    'underscore',
    'backbone',
    'marionette',
    'msgbus',
    'apps/account/signup/AccountSignupTouView',
    'hbs!apps/account/signup/AccountSignupTemplate',
    'i18n!nls/signup',
    'backbone.stickit',
    'mixins/backbone.validation'
],
function (
    _,
    Backbone,
    Marionette,
    MsgBus,
    AccountSignupTouView,
    AccountSignupTemplate,
    signup) {


    /**
     * Signup Form Layout Views
     */
    var AccountSignupView = Marionette.Layout.extend({
        template: AccountSignupTemplate,

        regions: {
            signupResult: '#signup-result'
        },

        events: {
            'click .signup': function (event) {

                event.preventDefault();
                this.signup();
            },
            'click #termsOfUsePopup': function (event) {

                event.preventDefault();
                event.stopPropagation(); // prevents the event from bubling parent up to parent label element
                this.termsOfUse();
            }
        },

        /**
         * Use stickit to perform binding between the model and the view
         */
        bindings: {
            '#username': {
                observe: 'username',
                setOptions: {
                    validate: true
                }
            },
            '#name': {
                observe: 'name',
                setOptions: {
                    validate: true
                }
            },
            '#email': {
                observe: 'email',
                setOptions: {
                    validate: true
                }
            },
            '#password': {
                observe: 'password',
                setOptions: {
                    validate: true
                }
            },
            '#repeatPassword': {
                observe: 'repeatPassword',
                setOptions: {
                    validate: true
                }
            },
            '#termsOfUse': {
                observe: 'termsOfUse',
                setOptions: {
                    validate: true
                }
            }
        },

        initialize: function () {

            // Since we are automatically updating the model, we want the model
            // to also hold invalid values, otherwise, we might be validating
            // something else than the user has entered in the form.
            Backbone.Validation.bind(this, {forceUpdate: true});
        },

        serializeData: function () {

            return _.extend({}, signup);
        },

        // Called by the region, after the region has added the view to the dom
        onShow: function () {

            this.stickit();
        },

        onClose: function() {

            Backbone.Validation.unbind(this);
        },

        termsOfUse: function () {

            var view = new AccountSignupTouView();
            MsgBus.commands.execute('popup:show', view);
        },

        signup: function (event) {

            if (!this.model.isValid(true)) { // true forces a validation before the result is returned

                return;
            }

            var form = {
                username: this.$el.find('#username').val(),
                password: this.$el.find('#password').val()
            };

            var signup = MsgBus.reqres.request('account:signup', form);

            signup
                .done(function (data, textStatus, jqXHR) {

                })
                .fail(function (error) {

                    console.log(error);
                });
        }
    });

    return AccountSignupView;
});
