/*
|------------------------------------------------------------------------------
| Account Entity                                                     Account.js
|------------------------------------------------------------------------------
*/
define(['jquery', 'backbone', 'msgbus'], function ($, Backbone, MsgBus) {


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
     * Request Response Handlers
     */
    MsgBus.reqres.setHandler('account:validate:credentials', function (credentials) {

        return API.validateCredentials(credentials);
    });


    /**
     * Expose Account API
     */
    var API = {
        validateCredentials: function (credentials) {

            var defer = $.Deferred();

            $.ajax('/api/auth/login', {
                    type: 'POST',
                    headers: { // maybe use $.ajaxSetup?, although its use is not recommended
                        Accept        : 'application/json, text/javascript, */*; q=0.01',
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                })
                .done(function (data, textStatus, jqXHR) {

                    console.log('success');
                    console.log(arguments[0].responseText);
                    return defer.resolve();
                })
                .fail(function (jqXHR, textStatus, errorThrown) {

                    console.log('fail');
                    console.log(arguments);
                    return defer.reject();
                });

            return defer.promise();
        }
    };
    return API;
});
