/*
|------------------------------------------------------------------------------
| Wine model                                                     models/wine.js
|------------------------------------------------------------------------------
*/
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var wineSchema = new Schema({
    name: {type: String, required: true},
    grapes: {type: String, required: true},
    country: String,
    region: String,
    year: Number,
    description: String,
    picture: String
    }, {
        // When your application starts up, Mongoose automatically calls ensureIndex for each
        // defined index in your schema. While nice for development, it is recommended this
        // behavior be disabled in production since index creation can cause a significant
        // performance impact. Disable the behavior by setting the autoIndex option of your schema to false.
        // http://mongoosejs.com/docs/api.html#model_Model.ensureIndexes
        // autoIndex: false
    });

// Wine.schema.path('color').validate(function (value) {

//  return /blue|green|white|red|orange|periwinkle/i.test(value);
// }, 'Invalid color');


// assign a function to the "statics" object of our wineSchema
// wineSchema.statics.findByName = function (name, cb) {

//     this.find({ name: new RegExp(name, 'i') }, cb);
// };

// Create plugin for REST operations?
// http://mongoosejs.com/docs/plugins.html


module.exports = mongoose.model('Wine', wineSchema);