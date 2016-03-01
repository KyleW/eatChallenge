var Household = require('../models/household');

module.exports = {
    save: function(req, res, next) {
        if (req.body._id) {
            // update an existing document
            Household.findById(req.body._id, function(err, household) {
                if (err) {
                    return res.send(err);
                }

                for (var k in req.body) {
                    household[k] = req.body[k];
                }

                household.save(function(err) {
                    if (err) {
                       return res.send(err);
                    }
                    res.json(household);
                });
            });
        } else {
            // Create a new document
            var household = new Household(req.body);
            household.save(function (err, household) {
                if (err) {
                    // console.error(err);
                    return res.send(err);
                }
                // console.log('successfully saved ' , household);
                return res.json(household);
            });
        }
    },

    findById: function(req, res, next) {
        Household.findById(req.user.id, function(err, data) {
            if (err) {
                return next(err);
            }
            return res.json(data);
        });

    },

    findForUser: function(req, res, next) {
        Household.findOne({userId: req.params.userId}).exec(function(err, data) {
            if (err) {
                return next(err);
            }
            return res.json(data);
        });

    },

    findCompleted: function(req, res, next) {
        // TODO: check auth here
        // Household.find().where({completed: true}).exec(function(err, data) {
        // TODO: Note- currently exporting all forms, not just those marked complete 
        Household.find().exec(function(err, data) {
            if (err) {
                return next(err);
            }
            // console.log({'found households': data});
            res.json(data);
        });
    },

    findOrCreate: function(req, res, next) {
        if (req.body.user) {
            return this.findForUser(req, res, next);
        }

        if (req.body._id) {
            return this.findById(req, res, next);
        }

        return res.json(new Household());
    }

};
