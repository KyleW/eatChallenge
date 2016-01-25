var url = require('url');
var path = require('path');
var config = require('../config/config');

var express = require('express');
var app = express();


// Middleware
app.use('/public', express.static('./build'));
app.use('/views', express.static('./views'));

// Routes
app.get('/', function (req, res) {
  res.sendFile(url.resolve(__dirname, './index.html'));
});

app.get('/styleguide', function (req, res) {
  res.sendFile(url.resolve(__dirname, './views/styleguide.html'));
});

var port = config.port;
var ipAddress = config.ipAddress;

var server = app.listen(port, ipAddress, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Buzzing along at http://%s:%s', host, port);
});

//DB Connection
var db_name = '';
//provide a sensible default for local development
var mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;
//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  var mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}