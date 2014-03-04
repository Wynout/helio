/*
|------------------------------------------------------------------------------
| Account Entity                                                     Account.js
|------------------------------------------------------------------------------
*/
define([
    'jquery',
    'backbone',
    'msgbus',
    'entities/xhr/xhr',
    'i18n!nls/account'],
function ($, Backbone, MsgBus, Xhr, nlsAccount) {


    /**
     * Account Model
     */
    var AccountModel = Backbone.Model.extend({

        urlRoot: '/accounts',
        idAttribute: '_id',

        defaults: {
            _id: null
        },

        /**
         * Backbone.Validation plugin that validates both model and form input
         * @link http://thedersen.com/projects/backbone-validation/
         */
        validation: {
            username: {
                required: true,
                msg: nlsAccount.validation.invalid.username
            },
            name: {
                required: true,
                msg: nlsAccount.validation.invalid.name
            },
            password:{
                required: true,
                minLength: 8,
                msg: nlsAccount.validation.invalid.password
            },
            repeatPassword: {
                equalTo: 'password',
                minLength: 8,
                msg: nlsAccount.validation.invalid.repeatPassword
            },
            email: [{
                required: true,
                msg: nlsAccount.validation.invalid.emailRequired
            }, {
                pattern: 'email',
                msg: nlsAccount.validation.invalid.emailInvalid
            }],
            termsOfUse: {
                acceptance: true,
                msg: nlsAccount.validation.invalid.termsOfUse
            }
        }
    });


    /**
     * Account Collection
     */
    var AccountCollection = Backbone.Collection.extend({

        model: AccountModel,
        url: '/wines'
    });


    /**
     * Register Request Response Handlers
     */
    MsgBus.reqres.setHandler('account:entity:add', function () {

        return new AccountModel();
    });
    MsgBus.reqres.setHandler('account:signup', function (form) {

        return API.signup(form);
    });
    MsgBus.reqres.setHandler('account:login', function (credentials) {

        return API.login(credentials);
    });
    MsgBus.reqres.setHandler('account:info', function () {

        return API.getAccountInfo();
    });
    /**
     * Register Commands
     */
    MsgBus.commands.setHandler('account:logoff', function () {

        return API.logoff();
    });


    /**
     * Expose Account API
     */
    var API = {
        /**
         * Signup for a new account
         */
        signup: function (form) {

            var defer = $.Deferred();
            var settings = {
                type: 'POST',
                headers: { // maybe use $.ajaxSetup?, although its use is not recommended
                    Accept        : 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: JSON.stringify(form)
            };

            $.ajax('/api/auth/signup', settings)
                .done(function (data, textStatus, jqXHR) {

                    return defer.resolve(data, textStatus, jqXHR);
                })
                .fail(function (jqXHR, textStatus, errorThrown) {

                    var error = Xhr.errorHandler(jqXHR);
                    return defer.reject(error);
                });

            return defer.promise();
        },

        /**
         * Perform login using credentials.
         * When authenticated, authentication token is stored in localStorage
         */
        login: function (credentials) {

            var defer = $.Deferred();
            var settings = {
                type: 'POST',
                headers: { // maybe use $.ajaxSetup?, although its use is not recommended
                    Accept        : 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: JSON.stringify(credentials)
            };

            $.ajax('/api/auth/login', settings)
                .done(function (data, textStatus, jqXHR) {

                    var token = data.token || '';
                    window.localStorage.setItem('token', token);
                    return defer.resolve(token);
                })
                .fail(function (jqXHR, textStatus, errorThrown) {

                    var error = Xhr.errorHandler(jqXHR);
                    return defer.reject(error);
                });

            return defer.promise();
        },

        /**
         * Removes authentication token
         */
        logoff: function () {

            window.localStorage.removeItem('token');
        },

        /**
         * Returns account from token in localstorage
         * @return {Object} {username: 'name'}
         */
        getAccountInfo: function () {

            var token,
                parts,
                username,
                info = {username: ''};

            token = window.localStorage.getItem('token');
            token = token ? token : '';
            parts = token.split(';');
            if (parts.length!==3) {

                return info;
            }
            return {
                username: parts[0]
            };
        }
    };

    return API;
});
