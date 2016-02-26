var mongoose = require('mongoose');
var HousholdMember = require('../models/household_member');

module.exports = {
    create: function(req, res, next) {
        var householdMember = new HouseholdMember();
        return res.send(householdMember);
    }
};
