/*
|------------------------------------------------------------------------------
| Wines Routing Scheme                                          /routes/wine.js
|------------------------------------------------------------------------------
*/
var middleware = require('./../middleware'),
    WineModel  = require('../models/wine');


// http://pixelhandler.com/blog/2012/02/09/develop-a-restful-api-using-node-js-with-express-and-mongoose/
// error msg i18n http://stackoverflow.com/questions/15012250/handling-mongoose-validation-errors-where-and-how

/**
 * HTTP methods that are typically used to implement a web API.
 *
 * GET    /resources        List the URIs and perhaps other details of the collection's members.
 * GET    /resources/:id    Retrieve a representation of the addressed member of the collection, expressed in an appropriate Internet media type.
 * POST   /resources        Create a new entry in the collection. The new entry's URI is assigned automatically and is usually returned by the operation.
 * POST   /resources/:id    Not generally used. Treat the addressed member as a collection in its own right and create a new entry in it.
 * PUT    /resources        Replace the entire collection with another collection.
 * PUT    /resources/:id    Replace the addressed member of the collection, or if it doesn't exist, create it.
 * DELETE /resources        Delete the entire collection.
 * DELETE /resources/:id    Delete the addesses member of the collection
 */

/**
 * HTTP Status Code Summary for Restful API
 *
 * 200 OK              - Everything worked as expected.
 * 201 Created         - The request has been fulfilled and resulted in a new resource being created.
 * 204 No Content      - The server has fulfilled the request but does not need to return an entity-body, and might want to return updated metainformation.
 * 400 Bad Request     - The request cannot be fulfilled due to bad syntax (often missing a required parameter).
 * 401 Unauthorized    - No valid API key provided.
 * 403 Forbidden       - The credentials still do not grant the client permission to access the resource
 * 404 Not Found       - The requested item doesn't exist.
 * 500 Internal Server Error - A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.
 * 501 Not Implemented       - The server either does not recognize the request method, or it lacks the ability to fulfill the request.[2] Usually this implies future availability (e.g., a new feature of a web-service API).
 * 503 Service Unavailable   - The server is currently unavailable (because it is overloaded or down for maintenance).[2] Generally, this is a temporary state. Sometimes, this can be permanent as well on test servers.
 */

module.exports = function (app) {

    // Create
    app.post('/api/wines',
        // middleware.auth.validateToken,
        create
    );
    // Read
    app.get('/api/wines',
        // middleware.auth.validateToken,
        findAll
    );
    app.get('/api/wines/:id',
        // middleware.auth.validateToken,
        find
    );
    // Update
    app.put('/api/wines/:id',
        // middleware.auth.validateToken,
        update
    );
    // Delete
    app.del('/api/wines/:id',
        // middleware.auth.validateToken,
        del
    );

    /**
     * Create a single wine
     */
    function create(req, res, next) {

        // TODO create mongoose plugin to handle multiple fields
        var wine = new WineModel({
            country     : req.body.country,
            description : req.body.description,
            grapes      : req.body.grapes,
            name        : req.body.name,
            picture     : req.body.picture,
            region      : req.body.region,
            year        : req.body.year
        });

        return wine.save(function (err) {

            if (err) { return next(err); }
            res.send(wine);
        });
    }


    /**
     * Reads a list of wines
     * curl -i http://localhost:3000/api/wines
     */
    function findAll(req, res, next) {

        WineModel.find({}, function (err, wines) {

            if (err) { return next(err); }
            res.send(wines);
        });
    }


    /**
     * Read a single wine by Id
     */
    function find(req, res, next) {

        WineModel.findById(req.params.id, function (err, wine) {

            if (err) { return next(err); }
            if (wine) {

                res.send(wine);
            } else {

                res.send(404);
            }
        });
    }


    /**
     * Update a single wine by Id
     * curl -i -X PUT -d 'name=' http://localhost:3000/api/wines/52cec549ab84230d31000009
     */
    function update(req, res, next) {

        WineModel.findById(req.params.id, function (err, wine) {

            if (err) { return next(err); }
            if (wine) {

                // TODO create mongoose plugin to handle multiple fields
                wine.country     = req.body.country;
                wine.description = req.body.description;
                wine.grapes      = req.body.grapes;
                wine.name        = req.body.name;
                wine.picture     = req.body.picture;
                wine.region      = req.body.region;
                wine.year        = req.body.year;

                wine.save(function (err) {

                    if (err) { return next(err); }
                    res.send(wine);
                });

            } else {

                res.send(404);
            }
        });
    }


    /**
     * Delete a single wine by id
     */
    function del(req, res, next) {

        WineModel.findById(req.params.id, function (err, wine) {

            if (err) { return next(err); }
            if (wine) {

                wine.remove(function (err) {

                    if (err) { return next(err); }
                    return res.send(204); // No Content
                });
            } else {

                res.send(404);
            }
        });
    }

};