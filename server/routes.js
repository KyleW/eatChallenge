var express = require('express');
var url = require('url');
var User = require('./models/user');
// Controllers
var household = require('./controllers/household');
var child = require('./controllers/child');

module.exports = function(app, passport) {
    // Static files
    app.use('/public', express.static('./build'));
    app.use('/views', express.static('./views'));

    //Home
    app.get('/', function (req, res) {
        res.sendFile(url.resolve(__dirname, './index.html'));
    });

    // API
    app.get('/household/completed', household.findCompleted);
    app.get('/household', household.findOrCreate);
    app.post('/household', household.save);

    app.get('/child', child.create);

    // Auth
    app.post('/user/signup', passport.authenticate('local-signup'));

    app.post('/user/login', passport.authenticate('local-login'));

    app.post('/user/logout', function(req, res, next) {
        req.logout();
        res.status(200).send();
    });

};
