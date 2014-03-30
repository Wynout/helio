/*
|------------------------------------------------------------------------------
| Tickets Routing Scheme                                     /routes/tickets.js
|------------------------------------------------------------------------------
*/
var middleware = require('./../middleware'),
    TicketModel  = require('../models/ticket');


module.exports = function (app) {

    // Create
    app.post('/api/tickets',
        middleware.auth.validateToken,
        create
    );
    // Read
    app.get('/api/tickets',
        middleware.auth.validateToken,
        findAll
    );
    app.get('/api/tickets/:id',
        middleware.auth.validateToken,
        find
    );
    // Update
    app.put('/api/tickets/:id',
        middleware.auth.validateToken,
        update
    );
    // Delete
    app.del('/api/tickets/:id',
        middleware.auth.validateToken,
        del
    );


    /**
     * Create a single ticket
     */
    function create(req, res, next) {

        // TODO create mongoose plugin to handle multiple fields
        var ticket = new TicketModel({
            type        : req.body.type,
            title       : req.body.title,
            description : req.body.description
        });

        return ticket.save(function (err) {

            if (err) { return next(err); }
            res.send(ticket);
        });
    }


    /**
     * Reads a list of tickets
     */
    function findAll(req, res, next) {

        TicketModel.find({}, function (err, tickets) {

            if (err) { return next(err); }
            res.send(tickets);
        });
    }


    /**
     * Read a single ticket by Id
     */
    function find(req, res, next) {

        TicketModel.findById(req.params.id, function (err, ticket) {

            if (err) { return next(err); }
            if (ticket) {

                res.send(ticket);
            } else {

                return next({type: 'retrieval', status: 404, message: 'not found'});
            }
        });
    }


    /**
     * Update a single ticket by Id
     */
    function update(req, res, next) {

        TicketModel.findById(req.params.id, function (err, ticket) {

            if (err) { return next(err); }
            if (ticket) {

                // TODO create mongoose plugin to handle multiple fields
                ticket.type        = req.body.type;
                ticket.title       = req.body.title;
                ticket.description = req.body.description;
                ticket.status      = req.body.status;
                ticket.urgency     = req.body.urgency;
                ticket.active      = req.body.active;

                ticket.save(function (err) {

                    if (err) { return next(err); }
                    res.send(ticket);
                });

            } else {

                return next({type: 'retrieval', status: 404, message: 'not found'});
            }
        });
    }


    /**
     * Delete a single ticket by id
     */
    function del(req, res, next) {

        TicketModel.findById(req.params.id, function (err, ticket) {

            if (err) { return next(err); }
            if (ticket) {

                ticket.remove(function (err) {

                    if (err) { return next(err); }
                    return res.send(204); // No Content
                });
            } else {

                return next({type: 'retrieval', status: 404, message: 'not found'});
            }
        });
    }

};