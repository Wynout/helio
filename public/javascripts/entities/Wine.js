/*
|------------------------------------------------------------------------------
| Wine Entity                                                           Wine.js
|------------------------------------------------------------------------------
*/
define(['jquery', 'backbone', 'msgbus'], function ($, Backbone, MsgBus) {

    /**
     * Wine Model
     */
    var WineModel = Backbone.Model.extend({

        urlRoot: '/api/wines',
        idAttribute: '_id',

        defaults: {
            _id: null,
            name: '',
            grapes: '',
            country: 'USA',
            region: 'California',
            year: '',
            description: '',
            picture: null
        },

        /**
         * Backbone.Validation plugin that validates both model and form input
         * @link http://thedersen.com/projects/backbone-validation/
         */
        validation: {
            name: {
                required: true,
                msg: 'You must enter a name'
            },
            grapes: {
                required: true,
                msg: 'You must enter a grape variety'
            },
            country: {
                required: true,
                msg: 'You must enter a country'
            },
            region: {
                required: true,
                msg: 'You must enter a region'
            },
            year: {
                range: [2007, 2013],
                msg: 'You must enter a production year between 2007 and 2013'
            },
            description: {
                required: true,
                msg: 'You must enter a description'
            }
        }
    });


    /**
     * Wine Collection
     */
    var WineCollection = Backbone.Collection.extend({

        model: WineModel,
        url: '/api/wines'
    });


    /**
     * Request Response Handlers
     */
    MsgBus.reqres.setHandler('wine:entities', function () {

        return API.getWineEntities();
    });
    MsgBus.reqres.setHandler('wine:entity', function (wineId) {

        return API.getWineEntity(wineId);
    });
    MsgBus.reqres.setHandler('wine:add', function () { // rename wine:entity:add

        return API.addWine();
    });
    MsgBus.reqres.setHandler('wine:entity:save', function (model) {

        return API.saveWine(model);
    });
    MsgBus.reqres.setHandler('wine:entity:delete', function (model) {

        return API.deleteWine(model);
    });


    /**
     * Expose Wine API
     */
    var API = {
        // http://davidsulc.com/blog/2013/04/01/using-jquery-promises-to-render-backbone-views-after-fetching-data/
        getWineEntities: function () {

            var defer = $.Deferred(),
                wines = new WineCollection();
            $.mobile.loading('show');
            wines.fetch({
                success: function (collection, response, options) {

                    $.mobile.loading('hide');
                    return defer.resolve(collection, response, options);
                },
                error: function (collection, jqXHR, options) {

                    $.mobile.loading('hide');
                    return defer.reject(collection, jqXHR, options);
                }
            });
            return defer.promise();
        },

        getWineEntity: function (wineId) {

            var defer = $.Deferred(),
                wine  = new WineModel({_id: wineId});
            $.mobile.loading('show');
            wine.fetch({
                success: function (model, response, options) {

                    $.mobile.loading('hide');
                    return defer.resolve(model, response, options);
                },
                error: function (model, jqXHR, options) {

                    $.mobile.loading('hide');
                    return defer.reject(model, jqXHR, options);
                }
            });
            return defer.promise();
        },

        addWine: function () {

            return new WineModel();
        },

        saveWine: function (wineModel) {

            var defer = $.Deferred();
            wineModel.save(null, {
                success: function (model, response, jqXHR) {

                    return defer.resolve(model, response, jqXHR);
                },
                error: function (model, response, jqXHR) {

                    return defer.reject(model, response, jqXHR);
                }
            });
            return defer.promise();
        },

        deleteWine: function (wineModel) {

            var defer = $.Deferred();
            $.mobile.loading('show');
            wineModel.destroy({
                wait: true, // Wait for the server to respond before removing the model from the collection.
                success: function (model, response, options) {

                    $.mobile.loading('hide');
                    return defer.resolve(model, response, options);
                },
                error: function (model, jqXHR, options) {

                    $.mobile.loading('hide');
                    return defer.reject(model, jqXHR, options);
                }
            });
            return defer.promise();
        }
    };
    return API;
});