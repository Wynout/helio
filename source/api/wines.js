/*
|------------------------------------------------------------------------------
| Wines Routing Scheme                                          /routes/wine.js
|------------------------------------------------------------------------------
*/
var middleware = require('./../middleware'),
    WineModel  = require('../models/wine');


module.exports = function (app) {

    // Create
    app.post('/api/wines',
        middleware.auth.validateToken,
        create
    );
    // Read
    app.get('/api/wines',
        middleware.auth.validateToken,
        findAll
    );
    app.get('/api/wines/:id',
        middleware.auth.validateToken,
        find
    );
    // Update
    app.put('/api/wines/:id',
        middleware.auth.validateToken,
        update
    );
    // Delete
    app.del('/api/wines/:id',
        middleware.auth.validateToken,
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