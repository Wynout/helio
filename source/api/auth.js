var _          = require('underscore'),
    bcrypt     = require('bcrypt-nodejs'),
    middleware = require('./../middleware');

var auth = function (app) {

    // fake user storage.. some DB use in real app
    var users = [{username:'wynout', password: '$2a$10$UTI8a0fhk4JOsPQX8ct4qeCy8qMKaaVoSYEJXNgt1iwr8yl.O3mza'}]; // wynout-password

    app.post('/api/auth/signup',
        checkRequiredFields,
        middleware.auth.createToken,
        returnToken
    );

    app.post('/api/auth/login',
        checkRequiredFields,
        validateCredentials,
        middleware.auth.createToken,
        returnToken
    );

    app.get('/api/auth/validate',
        middleware.auth.validateToken,
        returnOk
    );


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


    function findUser(username, callback) {

        var user = _.find(users, function (u) {

            return u.username === username;
        });

        if (!user) {

            return callback('not found');
        }
        return callback (null, user);
    }


    function checkRequiredFields(req, res, next) {

        var signup = req.body;

        if (!signup.username) {

            return next({type: 'authentication', status: 412, message: 'username is required'});
        }

        if (!signup.password) {

            return next({type: 'authentication', status: 412, message: 'password is required'});
        }
        next();
    }


    function returnToken(req, res, next) {

        res.json(201, {token: req.token});
    }


    function returnOk(req, res, next) {

        res.send(200);
    }
};

module.exports = auth;