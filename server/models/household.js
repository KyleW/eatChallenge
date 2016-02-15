var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Child = require('./child');
var HouseholdMember = require('./household_member.js');

var householdSchema = new Schema({
    childCount: Number,
    children: Array,
    otherMembersCount: Number,
    otherMembers: Array,
    completedApplication: {type: Boolean, default: false}
});

module.exports = mongoose.model('household', householdSchema);
