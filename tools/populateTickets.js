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
        title: 'Flat tire wheelchair',
        description: 'room 558'
    },
    {
        state: 'active',
        status: 'delayed',
        urgency: 100,
        type: 'maintenance',
        title: 'Sewage smell in basement',
        description: 'There is a sewage smell in basement, close to boiler.'
    },
    {
        state: 'completed',
        status: 'resolved',
        urgency: 40,
        type: 'question',
        title: 'How to disable alarm',
        description: 'How to disable the alarm on the second floor.'
    },
    {
        state: 'new',
        status: 'resolved',
        urgency: 40,
        type: 'maintenance',
        title: 'Shower leaking',
        description: 'Shower leaking Room 007'
    },
    {
        state: 'completed',
        status: 'resolved',
        urgency: 80,
        type: 'maintenance',
        title: 'Replace light bulb in kitchen',
        description: 'Replace light bulb in kitchen, room 224'
    },
    {
        state: 'completed',
        status: 'resolved',
        urgency: 40,
        type: 'maintenance',
        title: 'Lege kamers spoelen ivm legionella',
        description: 'Momenteel zijn de volgende kamers leeg: 1, 8, 20, 21'
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
