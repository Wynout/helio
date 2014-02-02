
var express     = require('express'),
	fs          = require('fs'),
	http        = require('http'),
	https       = require('https'),
	path        = require('path'),
	middleware  = require('./source/middleware'),

	privateKey  = fs.readFileSync('ssl/key.pem', 'utf8'),
	certificate = fs.readFileSync('ssl/key-cert.pem', 'utf8'),
	credentials = {key: privateKey, cert: certificate},

	mongoose    = require('mongoose');

var app = express();

var oneMonth = 2678400000;

app.configure(function () {

	app.set('http port', process.env.PORT || 3000);
	app.set('https port', process.env.PORT || 3443);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(middleware.cors());
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());

	app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
});

app.configure('development', function () {

	app.use(express.errorHandler());
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(middleware.serveMaster.development());
});

app.configure('production', function () {

	app.use(express.compress());
	app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneMonth }));
	app.use(middleware.serveMaster.production());
});



// refactor this
/*
function clientErrorHandler(err, req, res, next) {

	if (!err) {

		return next();
	}
	console.log("\n================================");
	console.log("Houston we've got a problem!\n");
	console.dir(err);
	console.log("\n================================");


	if (err.name==='CastError') {
	// if (ObjectId && err.name==='CastError') {

		res.send(400, {error: 'The request cannot be fulfilled due to bad syntax.'});
	}

	if (err.name==='ValidationError') {

		res.send(400, err);
	}
}
*/


/**
 * Connect to MongoDB
 * TODO: add authentication
 * @link http://mongoosejs.com/docs/connections.html
 */
mongoose.connect('mongodb://localhost/winedb');


// api endpoinds
require('./source/api/auth')(app);
require('./source/api/emails')(app);
require('./source/api/contacts')(app);
require('./source/api/tasks')(app);
require('./source/api/wines')(app);



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

// 	var environment = process.env.NODE_ENV || 'development';
// 	console.log('https server listening on port ' + httpsPort + ' (' + environment + ')');
// })
// .on('error', function (e) {

// 	console.log('http server listening on port ' + httpPort);
// });
