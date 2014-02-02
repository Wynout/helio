/*
|------------------------------------------------------------------------------
| Account Entity                                                     Account.js
|------------------------------------------------------------------------------
*/
App.module('Entities', function (Entities, App, Backbone, Marionette, $, _) {

    /**
     * Account Model
     */
    var AccountModel = App.Entities.Model.extend({

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
    var AccountCollection = App.Entities.Collection.extend({

        model: AccountModel,
        url: '/wines'
    });


    /**
     * Account API
     */
    var API = {

    };

});