/*
|------------------------------------------------------------------------------
| Wine Entity                                                           Wine.js
|------------------------------------------------------------------------------
*/
define([
    'jquery',
    'underscore',
    'backbone',
    'msgbus',
    'entities/xhr/xhr',
    'i18n!nls/wine'],
function ($, _, Backbone, MsgBus, Xhr, nlsWine) {

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
                msg: nlsWine.validation.invalid.name
            },
            grapes: {
                required: true,
                msg: nlsWine.validation.invalid.grapes
            },
            country: {
                required: true,
                msg: nlsWine.validation.invalid.country
            },
            region: {
                required: true,
                msg: nlsWine.validation.invalid.region
            },
            year: {
                range: [2007, 2013],
                msg: nlsWine.validation.invalid.year
            },
            description: {
                required: true,
                msg: nlsWine.validation.invalid.description
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
     * Register Request Response Handlers
     */
    MsgBus.reqres.setHandler('wine:entities', function () {

        return API.getWineEntities();
    });
    MsgBus.reqres.setHandler('wine:entity', function (id) {

        return API.getWineEntity(id);
    });
    MsgBus.reqres.setHandler('wine:entity:add', function () {

        return new WineModel();
    });
    MsgBus.reqres.setHandler('wine:entity:save', function (model) {

        return API.saveWine(model);
    });
    MsgBus.reqres.setHandler('wine:entity:delete', function (model) {

        return API.deleteWine(model);
    });


    /**
     * Expose Wine API
     * Using jQuery promises to render Backbone views after fetching data
     * @link http://davidsulc.com/blog/2013/04/01/using-jquery-promises-to-render-backbone-views-after-fetching-data/
     */
    var API = {
        getWineEntities: function () {

            var defer = $.Deferred(),
                wines = new WineCollection();
            wines.fetch({
                success: function (collection, response, options) {

                    return defer.resolve(collection, response, options);
                },
                error: function (collection, jqXHR, options) {

                    var error = Xhr.errorHandler(jqXHR);
                    return defer.reject(error, collection, jqXHR, options);
                }
            });
            return defer.promise();
        },

        getWineEntity: function (id) {

            var defer = $.Deferred(),
                wine  = new WineModel({_id: id});
            wine.fetch({
                success: function (model, response, options) {

                    return defer.resolve(model, response, options);
                },
                error: function (model, jqXHR, options) {

                    var error = Xhr.errorHandler(jqXHR);
                    return defer.reject(error, model, jqXHR, options);
                }
            });
            return defer.promise();
        },

        saveWine: function (model) {

            var defer = $.Deferred();
            model.save(null, {
                success: function (model, response, jqXHR) {

                    return defer.resolve(model, response, jqXHR);
                },
                error: function (model, jqXHR, options) {

                    var error = Xhr.errorHandler(jqXHR);
                    return defer.reject(error, model, jqXHR, options);
                }
            });
            return defer.promise();
        },

        deleteWine: function (model) {

            var defer = $.Deferred();
            model.destroy({
                wait: true, // Wait for the server to respond before removing the model from the collection.
                success: function (model, response, options) {

                    return defer.resolve(model, response, options);
                },
                error: function (model, jqXHR, options) {

                    var error = Xhr.errorHandler(jqXHR);
                    return defer.reject(error, model, jqXHR, options);
                }
            });
            return defer.promise();
        }
    };
    return API;
});
