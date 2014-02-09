/*
|------------------------------------------------------------------------------
| Index Page Request Rendering                                   serveMaster.js
|------------------------------------------------------------------------------
*/
var _      = require('underscore'),
    client = require('./../client');


/**
 * Serves development/production index page
 *
 * @param String title   Html page title
 * @param String mainJs  absolute path to Js file
 * @param String mainCss absolute path to Css file
 */
function reqHandler(title, mainJs, mainCss) {

    return function (req, res, next) {

        if (req.url!=='/') {

            // Pass request to next layer in middleware stack
            return next();
        }
        res.render('index', { title: title, mainJs: mainJs, mainCss: mainCss});
    };
}


/**
 * Expose middleware request handlers
 */
module.exports = {
    development: function () {

        return reqHandler('Development', '/javascripts/main.js', '/css/main.css');
    },

    production: function () {

        return reqHandler('Production', client.js, client.css);
    }
};