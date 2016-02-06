var Household = require('../models/household');

module.exports = {
    save: function(req, res, next) {
        var household = new Household(req.body);
        household.save(function (err, household) {
            if (err) {
                console.error(err);
                return res.send(err);
            }
            return res.send(household);
        });
    },

    findById: function(req, res, next) {
        Household.findById(req.user.id, function(err, data) {
            if (err) {
                return next(err);
            }
            return res.send(data);
        });

    },

    findForUser: function(req, res, next) {
        Household.findOne({userId: req.body.userId}).exec(function(err, data) {
            if (err) {
                return next(err);
            }
            return res.send(data);
        });

    },

    findAll: function(req, res, next) {
        Household.find().exec(function(err, data) {
            if (err) {
                return next(err);
            }
            res.send(data);
        });
    }

};
