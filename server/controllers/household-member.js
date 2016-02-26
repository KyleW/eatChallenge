var mongoose = require('mongoose');
var householdMemberSchema = require('../models/household_member');

module.exports = {
    create: function(req, res, next) {
        HouseholdMember = mongoose.model('householdMember', householdMemberSchema);
        var householdMember = new HouseholdMember(req.body);
        return res.send(householdMember);
        // child.save(function (err, household) {
        //     if (err) {
        //         console.error(err);
        //         return res.send(err);
        //     }
        //     console.log('successfully saved ' , child);
        //     return res.send(child);
        // });
    }
};
