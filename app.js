// require('newrelic');
var bodyParser     = require('body-parser'),
    compression    = require('compression'),
    environment    = process.env.NODE_ENV || 'development',
    errorHandler   = require('errorhandler'),
    express        = require('express'),
    favicon        = require('static-favicon'),
    fs             = require('fs'),
    http           = require('http'),
    https          = require('https'),
    logger         = require('morgan'),
    methodOverride = require('method-override'),
    middleware     = require('./source/middleware'),
    mongoose       = require('mongoose'),
    oneMonth       = 2678400000,
    path           = require('path'),

    sslPrivateKey  = fs.readFileSync('ssl/key.pem', 'utf8'),
    sslCertificate = fs.readFileSync('ssl/key-cert.pem', 'utf8'),
    credentials    = {key: sslPrivateKey, cert: sslCertificate};

var app = express();


/**
 * App Configuration
 */
app.set('token auth sign key', sslPrivateKey);
app.set('token ttl minutes', 60);
app.set('http port', process.env.PORT || 3000);
app.set('https port', process.env.PORT || 3443);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(middleware.cors());
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev')); // log every request to the console, 'default', 'short', 'tiny', 'dev'

// For security sake, it's better to disable file upload if your application doesn't need it
// app.use(bodyParser()); // is equivalent to: .json(), .urlencode(), .multipart()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride()); // simulate DELETE and PUT, (should limit request body size in options?)


/**
 * Configuration based on development environment
 */
if (environment==='development') {

    app.use(errorHandler());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(middleware.renderIndex.development());
    app.use(middleware.renderApp.development());
}


/**
 * Configuration based on production environment
 */
if (environment==='production') {

    app.use(compression());
    app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneMonth }));
    app.use(middleware.renderIndex.production());
    app.use(middleware.renderApp.production());
}


/**
 * Connect to MongoDB
 * TODO: add authentication
 * @link http://mongoosejs.com/docs/connections.html
 */
mongoose.connect('mongodb://localhost/helio');


/**
 * API endpoinds
 */
require('./source/api/auth')(app);
require('./source/api/tickets')(app);


/**
 * Error handling middlewares
 */
app.use(middleware.errorHandlers.logErrors);
app.use(middleware.errorHandlers.clientErrorHandler);
app.use(middleware.errorHandlers.errorHandler);


/**
 * Launch http and https Server
 */
var httpPort = app.get('http port');
http.createServer(app).listen(httpPort, function () {

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
