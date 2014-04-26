/*
|------------------------------------------------------------------------------
| Ticket Entity                                                       Ticket.js
|------------------------------------------------------------------------------
*/
define([
    'jquery',
    'underscore',
    'backbone',
    'msgbus',
    'entities/xhr/xhr',
    'i18n!nls/ticket'],
function ($, _, Backbone, MsgBus, Xhr, nlsTicket) {

    /**
     * Ticket Model
     */
    var TicketModel = Backbone.Model.extend({

        urlRoot: '/api/tickets',
        idAttribute: '_id',

        defaults: {
            _id: null,
            state: 'new',
            type: '',
            title: '',
            description: ''
        },

        /**
         * Backbone.Validation plugin that validates both model and form input
         * @link http://thedersen.com/projects/backbone-validation/
         */
        validation: {
            type: {
                required: true,
                msg: nlsTicket.validation.invalid.type
            },
            title: {
                required: true,
                msg: nlsTicket.validation.invalid.title
            },
            description: {
                required: true,
                msg: nlsTicket.validation.invalid.description
            }
        }
    });


    /**
     * Ticket Collection
     */
    var TicketCollection = Backbone.Collection.extend({

        model: TicketModel,
        url: '/api/tickets'
    });


    /**
     * Register Request Response Handlers
     */
    MsgBus.reqres.setHandler('ticket:entities', function () {

        return API.getTicketEntities();
    });
    MsgBus.reqres.setHandler('ticket:entity', function (id) {

        return API.getTicketEntity(id);
    });
    MsgBus.reqres.setHandler('ticket:entity:create', function () {

        return new TicketModel();
    });
    MsgBus.reqres.setHandler('ticket:entity:save', function (model) {

        return API.saveTicket(model);
    });
    MsgBus.reqres.setHandler('ticket:entity:delete', function (model) {

        return API.deleteTicket(model);
    });


    /**
     * Expose Ticket API
     * Using jQuery promises to render Backbone views after fetching data
     * @link http://davidsulc.com/blog/2013/04/01/using-jquery-promises-to-render-backbone-views-after-fetching-data/
     */
    var API = {
        getTicketEntities: function () {

            var defer = $.Deferred(),
                tickets = new TicketCollection();
            tickets.fetch({
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

        getTicketEntity: function (id) {

            var defer  = $.Deferred(),
                ticket = new TicketModel({_id: id});
            ticket.fetch({
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

        saveTicket: function (model) {

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

        deleteTicket: function (model) {

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
