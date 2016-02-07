var express = require('express');
var url = require('url');

// Controllers
var household = require('./controllers/household');

module.exports = function(app, passport) {
    // Static files
    app.use('/public', express.static('./build'));
    app.use('/views', express.static('./views'));

    //Home
    app.get('/', function (req, res) {
        res.sendFile(url.resolve(__dirname, './index.html'));
    });

    // API
    app.get('/household', household.findAll);
    app.post('/household', household.save);

    // Auth
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/#/start', // redirect to the secure profile section
        failureRedirect : '/#/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/signin', passport.authenticate('local-login', {
        successRedirect : '/#/start', // redirect to the secure profile section
        failureRedirect : '/#/signin', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/logout',function(req, res, next){
        return next();
    });

};
