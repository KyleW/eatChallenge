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
    app.get('/household', household.findOrCreate);
    app.post('/household', household.save);

    app.get('/child', child.create);

    // Auth
    // app.post('/signup', function(req, res, next) {
    //     // req.assert('email', 'Email is not valid').isEmail();
    //     // req.assert('password', 'Password must be at least 4 characters long').len(4);
    //     // req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

    //     // var errors = req.validationErrors();

    //     // if (errors) {
    //     //   // req.flash('errors', errors);
    //     //   return res.redirect('/signup');
    //     // }

    //     var user = new User({
    //         email: req.body.email,
    //         password: req.body.password
    //     });

    //     User.findOne({email: req.body.email}, function(err, existingUser) {
    //         if (existingUser) {
    //             // req.flash('errors', {msg: 'Account with that email address already exists.'});
    //             return res.redirect('/#/signup?error=duplicate');
    //         }

    //         user.save(function(err) {
    //             if (err) {
    //                 return next(err);
    //             }
    //             req.logIn(user, function(err) {
    //                 if (err) {
    //                     return next(err);
    //                 }
    //                 res.redirect('/?sucess=true');
    //             });
    //         });
    //     });

    // });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/#/start?success',
        failureRedirect : '/#/login?fail',
        failureFlash : true // allow flash messages
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/#/start?success',
        failureRedirect : '/#/login?fail',
        failureFlash : true // allow flash messages
    }));

    app.post('/logout', function(req, res, next) {
        req.logout();
        res.redirect('/');
    });

};
