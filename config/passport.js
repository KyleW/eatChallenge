var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../server/models/user');

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {

        // TODO: Move create methods to model
        User.findOne({'email' :  email}, function(err, user) {
            var newUser;
            if (err) {
                return done(err);
            }

            if (user) {
                return done(null, false, {message: 'That email is already taken.'});
            }

            newUser = new User();
            newUser.email    = email;
            newUser.password = newUser.generateHash(password);

            // save the user
            newUser.save(function(err) {
                if (err) {
                    throw err;
                }
                return done(null, newUser);
            });

        });

    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        User.findOne({'email' :  email}, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }

            if (!user.validPassword(password)) {
                return done(null, false, {message: 'Incorrect password.'});
            }

            return done(null, user);
        });

    }));

};
