/*
|------------------------------------------------------------------------------
| Authentication API endpoints                                          auth.js
|------------------------------------------------------------------------------
*/
var _          = require('underscore'),
    bcrypt     = require('bcrypt-nodejs'),
    middleware = require('./../middleware');


var auth = function (app) {

    // fake user storage.. some DB use in real app
    var users = [{username:'wynout', password: '$2a$10$UTI8a0fhk4JOsPQX8ct4qeCy8qMKaaVoSYEJXNgt1iwr8yl.O3mza'}]; // wynout-password


    app.post('/api/auth/signup',
        checkRequiredFieldsExists,
        createAccount,
        middleware.auth.createToken,
        returnSignupToken
    );

    app.post('/api/auth/login',
        checkRequiredFieldsExists,
        validateCredentials,
        middleware.auth.createToken,
        returnLoginToken
    );

    app.post('/api/auth/validate',
        middleware.auth.validateToken,
        returnOk
    );


    /**
     * Checks if username, password are present in body
     */
    function checkRequiredFieldsExists(req, res, next) {
        var signup = req.body;

        if (!signup.username) {

            return next({type: 'authentication', status: 412, message: 'username is required'});
        }

        if (!signup.password) {

            return next({type: 'authentication', status: 412, message: 'password is required'});
        }
        next();
    }


    /**
     * Creates a new account, based on signup fields
     */
    function createAccount(req, res, next) {

        var signup = _.extend(req.body, { id: users.length });

        bcrypt.genSalt(10, function (err, salt) {

            if (err) {

                return next(err);
            }

            bcrypt.hash(signup.password, salt, null, function (err, hash) {

                if (err) {

                    return next(err);
                }

                signup.password = hash;
                req.user        = signup;
                users.push(signup);

                return next (null, signup);
            });
        });
    }


    /**
     * Validates signup/login credentials
     */
    function validateCredentials(req, res, next) {

        var signup = req.body;
        findUser(signup.username, function (err, user) {

            if (err) {

                return next({type: 'authentication', status: 404, message: 'user not found'});
            }

            bcrypt.compare(signup.password, user.password, function (err, matched) {

                if (!matched) {

                    return next({type: 'authentication', status: 401, message: 'invalid password'});
                }
                req.user = user;
                next();
            });
        });
    }


    /**
     * Finds user by username
     */
    function findUser(username, callback) {

        var user = _.find(users, function (u) {

            return u.username === username;
        });

        if (!user) {

            return callback('not found');
        }
        return callback (null, user);
    }


    /**
     * Returns status code 201 and token in JSON
     * (201: The request has been fulfilled and resulted in a new resource being created)
     */
    function returnSignupToken(req, res, next) {

        res.json(201, {token: req.token});
    }


    /**
     * Returns status code 200 and token in JSON
     * (200: Everything worked as expected)
     */
    function returnLoginToken(req, res, next) {

        res.json(200, {token: req.token});
    }


    /**
     * Returns status code 200
     * (200: Everything worked as expected)
     */
    function returnOk(req, res, next) {

        res.send(200);
    }
};

module.exports = auth;