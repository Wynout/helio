/*
|------------------------------------------------------------------------------
| Populate db with sample data                               populateTickets.js
|------------------------------------------------------------------------------
*/
var mongoose    = require('mongoose');
var TicketModel = require('./../source/models/ticket');
var _           = require('underscore');


/**
 * Connect to MongoDB
 * TODO: add authentication
 * @link http://mongoosejs.com/docs/connections.html
 */
mongoose.connect('mongodb://localhost/helio');


var tickets = [
    {
        state: 'new',
        status: '',
        urgency: 100,
        type: 'maintenance',
        title: 'Maintenance Issue #1',
        description: 'Location 43'
    },
    {
        state: 'active',
        status: 'delayed',
        urgency: 100,
        type: 'maintenance',
        title: 'Maintenance Issue #2',
        description: 'Location 345.'
    },
    {
        state: 'completed',
        status: 'resolved',
        urgency: 40,
        type: 'question',
        title: 'Question #1',
        description: 'Location 755.'
    },
    {
        state: 'new',
        status: 'resolved',
        urgency: 40,
        type: 'maintenance',
        title: 'Maintenance Issue #3',
        description: 'Location 4234'
    },
    {
        state: 'completed',
        status: 'resolved',
        urgency: 80,
        type: 'maintenance',
        title: 'Maintenance Issue #4',
        description: 'Location 445'
    },
    {
        state: 'completed',
        status: 'resolved',
        urgency: 40,
        type: 'maintenance',
        title: 'Maintenance Issue #5',
        description: 'Location 4524'
    }
];


/**
 * Populate test tickets collection
 */
var result = {};

 _.each(tickets, function (ticket, index, list) {

    TicketModel.create(ticket, function (err) {

        if (err) {

            console.log(err);
        }
    });

});
