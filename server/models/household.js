var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Child = require('./child');
var HouseholdMember = require('./household_member');

var householdSchema = new Schema({
    userId: String,
    childCount: Number,
    children: [Child],
    otherMembersCount: Number,
    otherMembers: [HouseholdMember],
    completed: {type: Boolean, default: false}
});

module.exports = mongoose.model('household', householdSchema);
