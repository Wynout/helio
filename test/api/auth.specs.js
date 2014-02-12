var crypto  = require('crypto'),
    fs      = require('fs'),
    moment  = require('moment'),
    request = require('request'),
    root    = 'http://localhost:3000/api/auth';

describe('/api/auth.js', function () {
    var headers, url, error, response, body, payload;


    describe('when user signups', function () {
        beforeEach(function () {
            url = root + '/signup';
        });

        describe('with wrong credentials', function () {
            describe('empty payload', function () {
                beforeEach(function () {
                    payload = {};
                });

                beforeEach(function (done) {
                    request.post({url: url, body: payload, json: true}, function (err, resp) {
                        error    = error;
                        response = resp;
                        body     = resp.body;
                        done();
                    });
                });

                it('should return status code 412 (bad request)', function () {
                    expect(response.statusCode).to.equal(412);
                });
            });

            describe('and username is missing', function () {
                beforeEach(function () {
                    payload = {password: 'secret'};
                });

                beforeEach(function (done) {
                    request.post({url: url, body: payload, json: true}, function (err, resp) {
                        error    = error;
                        response = resp;
                        body     = resp.body;
                        done();
                    });
                });

                it('should return status code 412 (bad request)', function () {
                    expect(response.statusCode).to.equal(412);
                });
            });

            describe('and password is missing', function () {
                beforeEach(function () {
                    payload = {username: 'a@a.com'};
                });

                beforeEach(function (done) {
                    request.post({url: url, body: payload, json: true}, function (err, resp) {
                        error    = error;
                        response = resp;
                        body     = resp.body;
                        done();
                    });
                });

                it('should return status code 412 (bad request)', function () {
                    expect(response.statusCode).to.equal(412);
                });
            });
        });

        describe('with right credentials', function () {
            beforeEach(function () {
                payload = {username: 'a@a.com', password: 'secret'};
            });

            beforeEach(function (done) {
                request.post({url: url, body: payload, json: true}, function (err, resp) {
                    error    = error;
                    response = resp;
                    body     = resp.body;
                    done();
                });
            });

            it('should return status code 201 (user created)', function () {
                expect(response.statusCode).to.equal(201);
            });

            it('should immediately authenticate user and return token', function () {
                expect(body.token).to.be.ok;
            });
        });
    });



    describe('when user logins', function () {
        beforeEach(function () {
            url = root + '/login';
        });

        describe('with wrong credentials', function () {
            describe('empty payload', function () {
                beforeEach(function () {
                    payload = {};
                });

                beforeEach(function (done) {
                    request.post({url: url, body: payload, json: true}, function (err, resp) {
                        error    = error;
                        response = resp;
                        body     = resp.body;
                        done();
                    });
                });

                it('should return status code 412 (bad request)', function () {
                    expect(response.statusCode).to.equal(412);
                });
            });

            describe('and username is missing', function () {
                beforeEach(function () {
                    payload = {password: 'secret'};
                });

                beforeEach(function (done) {
                    request.post({url: url, body: payload, json: true}, function (err, resp) {
                        error    = error;
                        response = resp;
                        body     = resp.body;
                        done();
                    });
                });

                it('should return status code 412 (bad request)', function () {
                    expect(response.statusCode).to.equal(412);
                });
            });

            describe('and password is missing', function () {
                beforeEach(function () {
                    payload = {username: 'a@a.com'};
                });

                beforeEach(function (done) {
                    request.post({url: url, body: payload, json: true}, function (err, resp) {
                        error    = error;
                        response = resp;
                        body     = resp.body;
                        done();
                    });
                });

                it('should return status code 412 (bad request)', function () {
                    expect(response.statusCode).to.equal(412);
                });
            });
        });

        describe('with right credentials', function () {
            var signup;

            beforeEach(function () {
                signup = root + '/signup';
            });

            beforeEach(function () {
                payload = {username: 'a@a.com', password: 'secret'};
            });

            // signup
            beforeEach(function (done) {
                request.post({url: signup, body: payload, json: true}, function (err, resp) {
                    error    = error;
                    response = resp;
                    body     = resp.body;
                    done();
                });
            });

            // login
            beforeEach(function (done) {
                request.post({url: url, body: payload, json: true}, function (err, resp) {
                    error    = error;
                    response = resp;
                    body     = resp.body;
                    done();
                });
            });

            it ('should return status code 200 (ok)', function () {
                expect(response.statusCode).to.equal(200);
            });

            it ('should return token', function () {
                expect(body.token).to.be.ok;
            });
        });
    });



    describe('when validating token', function () {
        var token, headers, jsonResponse;

        beforeEach(function () {
            url = root + '/validate';

        });

        describe('invalid token', function () {
            beforeEach(function () {
                token   = 'i_am_an_invalid_token';
                headers = {Authorization: token};
            });

            beforeEach(function (done) {
                request.post({headers: headers, url: url}, function (err, resp) {
                    error    = err;
                    response = resp;
                    jsonResponse  = JSON.parse(response.body);
                    done();
                });
            });

            it ('should return status code 400 (bad syntax)', function () {
                expect(response.statusCode).to.equal(400);
            });
            it ('should return error.type "authorization"', function () {
                expect(jsonResponse.error.type).to.equal('authorization');
            });
            it ('should return error.message "Bad syntax"', function () {
                expect(jsonResponse.error.message).to.equal('Bad syntax');
            });
        });


        describe('faked token', function () {

            beforeEach(function () {
                var authSignKey = 'i_dont_know_which_authSignKey_was_used_on_server';
                var username = 'user', timestamp = moment().valueOf();
                var message  = username + ';' + timestamp;
                var hmac     = crypto.createHmac('sha1', authSignKey).update(message).digest('hex');
                token        = message + ';' + hmac;
                headers      = {Authorization: token};
            });

            beforeEach(function (done) {
                request.post({headers: headers, url: url}, function (err, resp) {
                    error         = err;
                    response      = resp;
                    jsonResponse  = JSON.parse(response.body);
                    done();
                });
            });

            it ('should return status code 401 (unauthorized)', function () {
                expect(response.statusCode).to.equal(401);
            });
            it ('should return error.type "authorization"', function () {
                expect(jsonResponse.error.type).to.equal('authorization');
            });
            it ('should return error.message "Unauthorized access"', function () {
                expect(jsonResponse.error.message).to.equal('Unauthorized access');
            });
        });


        describe('expired token', function () {

            beforeEach(function () {
                var authSignKey  = fs.readFileSync('ssl/key.pem', 'utf8');
                var username = 'user', timestamp = moment().subtract('hours', 1).subtract('minutes', 1).valueOf();
                var message  = username + ';' + timestamp;
                var hmac     = crypto.createHmac('sha1', authSignKey).update(message).digest('hex');
                token        = message + ';' + hmac;
                headers      = {Authorization: token};
            });

            beforeEach(function (done) {
                request.post({headers: headers, url: url}, function (err, resp) {
                    error         = err;
                    response      = resp;
                    jsonResponse  = JSON.parse(response.body);
                    done();
                });
            });

            it ('should return status code 401 (unauthorized)', function () {
                expect(response.statusCode).to.equal(401);
            });
            it ('should return error.type "authorization"', function () {
                expect(jsonResponse.error.type).to.equal('authorization');
            });
            it ('should return error.message "Authorization expired"', function () {
                expect(jsonResponse.error.message).to.equal('Authorization expired');
            });
        });


        describe('valid token', function () {

            beforeEach(function () {
                var authSignKey  = fs.readFileSync('ssl/key.pem', 'utf8');
                var username = 'user', timestamp = moment().valueOf();
                var message  = username + ';' + timestamp;
                var hmac     = crypto.createHmac('sha1', authSignKey).update(message).digest('hex');
                token        = message + ';' + hmac;
                headers      = {Authorization: token};
            });

            beforeEach(function (done) {
                request.post({headers: headers, url: url}, function (err, resp) {
                    error    = err;
                    response = resp;
                    done();
                });
            });

            it ('should return status code 200 (ok)', function () {
                expect(response.statusCode).to.equal(200);
            });

        });

    });
});
