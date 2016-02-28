var Household = require('../models/household');

module.exports = {
    save: function(req, res, next) {
        if (req.body._id) {
            // update an existing document
            var toSave = Object.create(req.body);
            delete toSave._id;

            Household.findByIdAndUpdate(req.body._id, toSave, function (err, household) {
                if (err) {
                    console.error(err);
                    return res.send(err);
                }
                console.log('successfully updated ' , household);
                return res.json(household);
            });
        } else {
            // Create a new document
            var household = new Household(req.body);
            household.save(function (err, household) {
                if (err) {
                    console.error(err);
                    return res.send(err);
                }
                console.log('successfully saved ' , household);
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
        // todo: check auth here
        Household.find().where({completed: true}).exec(function(err, data) {
            if (err) {
                return next(err);
            }
            console.log({'found households': data});
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
