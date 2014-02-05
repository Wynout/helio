var AUTH_SIGN_KEY     = '95810db3f765480999a8d5089b0815bd4b55e831',
	crypto            = require('crypto'),
	express           = require('express'),
	moment            = require('moment'),
	TOKEN_TTL_MINUTES = 60;

function createToken(req, res, next) {

	var username    = req.user.username,
		timestamp   = moment(),
		message     = username + ';' + timestamp.valueOf(),
		hmac        = crypto.createHmac('sha1', AUTH_SIGN_KEY).update(message).digest('hex'),
		token       = username + ';' + timestamp.valueOf() + ';' + hmac,
		tokenBase64 = new Buffer(token).toString('base64');

	req.token = tokenBase64;
	next();
}

function validateToken(req, res, next) {

	var basic = express.basicAuth(hmacAuthentication);
	return basic(req, res, next);

	function hmacAuthentication(user, password) {

		var token  = new Buffer(password, 'base64').toString(),
			parsed = token.split(';');

		if (parsed.length !== 3) {
			return false;
		}

		var username     = parsed[0],
			timestamp    = parsed[1],
			receivedHmac = parsed[2],
			message      = username + ';' + timestamp,
			computedHmac = crypto.createHmac('sha1', AUTH_SIGN_KEY).update(message).digest('hex');

		if (receivedHmac!==computedHmac) {
			return false;
		}

		var currentTimestamp = moment(),
			receivedTimespamp = moment(+timestamp);

		if (receivedTimespamp.diff(currentTimestamp, 'minutes') > TOKEN_TTL_MINUTES) {

			return false;
		}
		return true;
	}
}

module.exports = {
	createToken: createToken,
	validateToken: validateToken
};