var User = require('../models/user');
var passport = require('passport');

module.exports = {
    signup: function(req, res) {
        var username = req.body.username.toLowerCase();
        var password = req.body.password;
        console.log(email);
        User.register(new User({username: username}), password, function(err, user) {
            var newUser;
            // TODO: should these really be 500's??
            if (err) {
                return res.status(500).json({err: err});
            }
            passport.authenticate('local')(req, res, function() {
                return res.status(200).json({status: 'Registration successful!'});
            });
        });
    },

    login: function(req ,res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return res.status(500).json({err: err});
            }
            if (!user) {
                return res.status(401).json({err: info});
            }
            req.logIn(user, function(err) {
                if (err) {
                    return res.status(500).json({err: 'Could not log in user'});
                }
                res.status(200).json({status: 'Login successful!'});
            });
        })(req, res, next);
    },

    logout: function(req, res) {
        req.logout();
        res.status(200).json({status:'Goodbye!'});
    }
};
