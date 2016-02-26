var mongoose = require('mongoose');
var HouseholdMemberSchema = require('../models/household_member');

module.exports = {
    create: function(req, res, next) {
        var HouseholdMember =mongoose.model('householdMember', HouseholdMemberSchema);
        var householdMember = new HouseholdMember();
        return res.send(householdMember);
    }
};
