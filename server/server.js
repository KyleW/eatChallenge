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
  // res.sendFile(url.resolve(__dirname, './views/styleguide.html'));
});


var port = config.port;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Buzzing along at http://%s:%s', host, port);
});