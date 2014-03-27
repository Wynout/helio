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
        type: 'ticket type a',
        title: 'Title A',
        description: 'Duis ornare dignissim tortor eu faucibus. Suspendisse non lorem id nulla cursus vulputate a ac magna. Vivamus at laoreet mauris, et fermentum mauris. Suspendisse consectetur dolor aliquam, posuere magna et, sollicitudin tortor. Morbi metus nunc, sollicitudin ut massa eget, ultrices elementum urna.',
        status: 'delayed',
        urgency: 100,
        active: true
    },
    {
        type: 'ticket type b',
        title: 'Title B',
        description: 'Nam nec justo et libero iaculis rhoncus. Pellentesque ultrices ut purus in posuere. Ut diam magna, blandit vel enim at, luctus elementum mi.',
        status: 'resolved',
        urgency: 40,
        active: false
    },
    {
        type: 'ticket type c',
        title: 'Title C',
        description: 'quet. Nullam vulputate ornare nisi. Phasellus eu nibh neque. Praesent tincidunt velit nisl, at tincidunt leo eleifend ac. Suspendisse ultrices tortor sit amet sollicitudin pulvinar. Duis blandit elementum quam, in aliquet ipsum aliquet viverra. Aliquam gravida, tellus vel rutrum elemen',
        status: 'resolved',
        urgency: 40,
        active: false
    },
    {
        type: 'ticket type d',
        title: 'u eros sed luctus. In nec enim sit amet turpis ornare posuere nec vel felis. Integer quis dolor venenatis, tristique lorem sed, iaculis est. Nullam ut mi orci. Vestibulum placerat pulvinar velit at aliquam. Vivamus vehicula, mauris eget gravida vulputate, eros justo aliquam quam, quis dignissim est justo ac velit. Duis ornare dignissim tortor eu faucibus. Suspendisse non lorem id nulla cursus vulputate a ac magna. Vivamus at laoreet mauris, et fermentum mauris. Suspendisse consectetur dolor aliquam, ',
        description: 'Title C',
        status: 'resolved',
        urgency: 80,
        active: true
    },
    {
        type: 'ticket type e',
        title: 'Title E',
        description: 'Duis lobortis suscipit ultricies. Maecenas quis leo fringilla mi scelerisque sodales sed ac orci. Quisque quis nunc turpis. Pellentesque in fringilla nunc, a varius ante. Aliquam ac tincidunt lectus, a porta turpis. Sed ut enim nec orci mattis rutrum in pharetra mi. Praesent placerat leo a vehicula pulvinar. Vestibulum dict',
        status: 'resolved',
        urgency: 40,
        active: false
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
