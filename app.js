// require('newrelic');

var express     = require('express'),
    fs          = require('fs'),
    http        = require('http'),
    https       = require('https'),
    path        = require('path'),
    middleware  = require('./source/middleware'),

    sslPrivateKey  = fs.readFileSync('ssl/key.pem', 'utf8'),
    sslCertificate = fs.readFileSync('ssl/key-cert.pem', 'utf8'),
    credentials    = {key: sslPrivateKey, cert: sslCertificate},

    mongoose = require('mongoose');

var app = express();

var oneMonth = 2678400000;

app.configure(function () {

    app.set('token auth sign key', sslPrivateKey);
    app.set('token ttl minutes', 60);
    app.set('http port', process.env.PORT || 3000);
    app.set('https port', process.env.PORT || 3443);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(middleware.cors());
    app.use(express.favicon());
    app.use(express.logger('dev'));

    // For security sake, it's better to disable file upload if your application doesn't need it
    // app.use(express.bodyParser()); // is equivalent to: .json(), .urlencode(), .multipart()
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
});

app.configure('development', function () {

    app.use(express.errorHandler());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(middleware.renderIndex.development());
});

app.configure('production', function () {

    app.use(express.compress());
    app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneMonth }));
    app.use(middleware.renderIndex.production());
});


/**
 * Connect to MongoDB
 * TODO: add authentication
 * @link http://mongoosejs.com/docs/connections.html
 */
mongoose.connect('mongodb://localhost/winedb');


// API endpoinds
require('./source/api/auth')(app);
require('./source/api/wines')(app);


// Error handling middlewares


app.use(middleware.errorHandlers.logErrors);
app.use(middleware.errorHandlers.clientErrorHandler);
app.use(middleware.errorHandlers.errorHandler);



/**
 * Launch http and https Server
 */
var httpPort = app.get('http port');
http.createServer(app).listen(httpPort, function () {
    var environment = process.env.NODE_ENV || 'development';
    console.log('http server listening on port ' + httpPort + ' (' + environment + ')');
})
.on('error', function (e) {

    console.log('Cannot start http server on port ' + httpPort);
});

// var httpsPort = app.get('https port');
// https.createServer(credentials, app).listen(httpsPort, function () {

//  var environment = process.env.NODE_ENV || 'development';
//  console.log('https server listening on port ' + httpsPort + ' (' + environment + ')');
// })
// .on('error', function (e) {

//  console.log('http server listening on port ' + httpPort);
// });
