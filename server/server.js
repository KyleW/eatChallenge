var url = require('url');
var path = require('path');
var config = require('../config/config');

var express = require('express');
var app = express();
var compress = require('compression');

var mongoose = require('mongoose');

// Controllers
var household = require('./controllers/household')

// Middleware
app.use(compress());  
app.use('/public', express.static('./build'));
app.use('/views', express.static('./views'));

// Routes
app.get('/', function (req, res) {
  res.sendFile(url.resolve(__dirname, './index.html'));
});

app.get('/styleguide', function (req, res) {
  res.sendFile(url.resolve(__dirname, './views/styleguide.html'));
});

app.post('/househol')





//Start server
var port = config.port;
var ipAddress = config.ipAddress;

var server = app.listen(port, ipAddress, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Buzzing along at http://%s:%s', host, port);
});



//Start DB
var db_name = 'eatChallenge';
//provide a sensible default for local development
var mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;
//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  var mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}

mongoose.connect(mongodb_connection_string);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected to the db!')
  // we're connected!
});