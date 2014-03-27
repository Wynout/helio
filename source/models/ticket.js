/*
|------------------------------------------------------------------------------
| Ticket model                                                 models/ticket.js
|------------------------------------------------------------------------------
*/
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var ticketSchema = new Schema({
    type: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String},
    urgency: Number,
    active: Boolean
    }, {
        // When your application starts up, Mongoose automatically calls ensureIndex for each
        // defined index in your schema. While nice for development, it is recommended this
        // behavior be disabled in production since index creation can cause a significant
        // performance impact. Disable the behavior by setting the autoIndex option of your schema to false.
        // http://mongoosejs.com/docs/api.html#model_Model.ensureIndexes
        autoIndex: false
    });

module.exports = mongoose.model('Ticket', ticketSchema);