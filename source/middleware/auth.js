var crypto  = require('crypto'),
    express = require('express'),
    moment  = require('moment');


/**
 *
 */
function createToken(req, res, next) {

    var authSignKey = req.app.get('token auth sign key');
    if (authSignKey===undefined || authSignKey.length===0) {

        return next({type: 'authorization', status: 500, message: 'authorization sign key missing'});
    }

    var username  = req.user.username,
        timestamp = moment(),
        message   = username + ';' + timestamp.valueOf(),
        hmac      = crypto.createHmac('sha1', authSignKey).update(message).digest('hex'),
        token     = message + ';' + hmac;

    req.token = token;
    next();
}


/**
 *
 */
function validateToken(req, res, next) {

    var token = req.headers.authorization || '',
        parts = token.split(';');

    if (parts.length!==3) {

        return next({type: 'authorization', status: 400, message: 'bad syntax'});
    }

    var authSignKey     = req.app.get('token auth sign key');
    var tokenTtlMinutes = req.app.get('token ttl minutes');
    if (authSignKey===undefined || authSignKey.length===0) {

        return next({type: 'authorization', status: 500, message: 'authorization sign key missing'});
    }

    var username     = parts[0],
        timestamp    = parts[1],
        receivedHmac = parts[2],
        message      = username + ';' + timestamp,
        computedHmac = crypto.createHmac('sha1', authSignKey).update(message).digest('hex');

    if (receivedHmac!==computedHmac) {

        return next({type: 'authorization', status: 401, message: 'unauthorized access'});
    }

    var currentTimestamp  = moment(),
        receivedTimestamp = moment(+timestamp),
        diffInMinutes     = currentTimestamp.diff(receivedTimestamp, 'minutes');

    if ( diffInMinutes > tokenTtlMinutes) {

        return next({type: 'authorization', status: 401, message: 'authorization expired'});
    }

    next();
}


module.exports = {
    createToken: createToken,
    validateToken: validateToken
};
