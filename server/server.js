var express = require('express');
var compress = require('compression');
var redirectToHttps = require('./middleware/forceHttps');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var passport = require('passport');

var config = require('../config/config');

// TODO: move to db config
var DB_NAME = 'eatChallenge';
//provide a sensible default for local development
var MONGODB_CONNECTION_STRING = 'mongodb://127.0.0.1:27017/' + DB_NAME;
//take advantage of openshift env vars when available:
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    var MONGODB_CONNECTION_STRING = process.env.OPENSHIFT_MONGODB_DB_URL + DB_NAME;
}
//Start DB
var mongoose = require('mongoose');
mongoose.connect(MONGODB_CONNECTION_STRING);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('we are connected to the db!');
});

// Creates the app
var app = express();

// Middleware
app.use(redirectToHttps); //force https
app.use(compress()); // gzip

// Passport
require('../config/passport')(passport); // pass passport for configuration
app.use(session({secret: 'LunchLunchLunch'})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./routes.js')(app, passport);

//Start server
var server = app.listen(config.port, config.ipAddress, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Buzzing along at http://%s:%s', host, port);
});

module.exports = app;
