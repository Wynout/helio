/*
|------------------------------------------------------------------------------
| Account Entity                                                     Account.js
|------------------------------------------------------------------------------
*/
define(['jquery', 'backbone', 'msgbus', 'entities/xhr/xhr'], function ($, Backbone, MsgBus, Xhr) {


    /**
     * Account Model
     */
    var AccountModel = Backbone.Model.extend({

        urlRoot: '/accounts',
        idAttribute: '_id',

        defaults: {
            _id: null,
            name: ''
        },

        /**
         * Backbone.Validation plugin that validates both model and form input
         * @link http://thedersen.com/projects/backbone-validation/
         */
        validation: {
            name: {
                required: true,
                msg: 'You must enter a name'
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
