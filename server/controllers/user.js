var User = require('../models/user');

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
                return res.send(household);
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
                return res.send(household);
            });
        }
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

    findCompleted: function(req, res, next) {
        // todo: check auth here
        Household.find().where({completed: true}).exec(function(err, data) {
            if (err) {
                return next(err);
            }
            console.log({'found households': data});
            res.send(data);
        });
    },

    findOrCreate: function(req, res, next) {
        if (req.body.user) {
            return this.findForUser(req, res, next);
        }

        if (req.body._id) {
            return this.findById(req, res, next);
        }

        return res.send(new Household());
    }

};
