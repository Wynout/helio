/*
|------------------------------------------------------------------------------
| Error-handling middleware                                            error.js
|------------------------------------------------------------------------------
*/
/**
 * Generic error handling middleware for logging purposes
 */
function logErrors(err, req, res, next) {

    // console.log(err);
    // console.error(err.stack);
    next(err);
}


/**
 * Client error handler
 */
function clientErrorHandler(err, req, res, next) {

    if (!err) { return next(); }

    // var accept     = req.headers.accept || '',
    //     acceptJson = ~accept.indexOf('json') ? true : false;
    // if (!acceptJson) { next(); }

    res.json(err.status, {error: {type: err.type, message: err.message}});
}


/**
 * Catch-all error handler
 */
function errorHandler(err, req, res, next) {

    res.status(500);
    res.render('error', { error: err });
}


module.exports = {
    logErrors         : logErrors,
    clientErrorHandler: clientErrorHandler,
    errorHandler      : errorHandler
};