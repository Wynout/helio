/*
|------------------------------------------------------------------------------
| Index Page Request Rendering                                   serveMaster.js
|------------------------------------------------------------------------------
*/
var fs = require('fs');


/**
 * Serves development/production index page
 *
 * @param {String} title   Html page title
 * @param {String} mainJs  absolute path to Js file
 * @param {String} mainCss absolute path to Css file
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
 * Appends version identifier as a querystring
 *
 * @param  {String} path, example 'public/build/main.js'
 * @return {String} example: '/build/main.js?bf9f3482595fad8d15c065b24f0f9148'
 */
function getVersionedAsset(path) {

    var json       = fs.readFileSync('assetsVersioning.json', 'utf8'),
        assets     = JSON.parse(json),
        version    = assets[path] ? assets[path] : '',
        publicPath = path.replace(/public/, '');

    return version ? publicPath + '?' + version : publicPath;
}


/**
 * Expose middleware request handlers
 */
module.exports = {
    development: function () {

        return reqHandler('Development', '/javascripts/main.js', '/css/main.css');
    },

    production: function () {

        return reqHandler('Production', getVersionedAsset('public/build/main.js'), getVersionedAsset('public/build/main.css'));
    }
};