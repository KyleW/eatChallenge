var express = require('express');
var url = require('url');

// Controllers
var child           = require('./controllers/child');
var household       = require('./controllers/household');
var householdMember = require('./controllers/household_member');
var user            = require('./controllers/user');

module.exports = function(app, passport) {
    // Static files
    app.use('/public', express.static('./build'));
    app.use('/views', express.static('./client/views'));
    app.use('/icons', express.static('./icons'));

    //Home
    app.get('/', function (req, res) {
        res.sendFile(url.resolve(__dirname, './index.html'));
    });

    // API
    app.get('/child', child.create);

    app.get('/household/completed', household.findCompleted);
    app.get('/household', household.findOrCreate);
    app.post('/household', household.save);

    app.get('/household-member', householdMember.create);

    app.post('/user/signup', user.signup);
    app.post('/user/login', user.login);
    app.get('/user/logout', user.logout);

};
