var express = require('express');
var app = express();

var compress = require('compression');
var redirectToHttps = require('./middleware/forceHttps');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
// var expressValidator = require('express-validator');

var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

var config = require('../config/config');

// TODO: move to db config
var DB_NAME = 'eatchallenge';
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

// Middleware
app.use(redirectToHttps); //force https
app.use(compress()); // gzip

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'lunchLunchLunch',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// Passport
// require('../config/passport')(passport); // pass passport for configuration


// app.use(flash()); // use connect-flash for flash messages stored in session
// TODO: move this to a seperate file;
// configure passport
var User = require('./models/user');
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
require('./routes.js')(app, passport);

//Start server
var server = app.listen(config.port, config.ipAddress, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Buzzing along at http://%s:%s', host, port);
});

module.exports = app;
