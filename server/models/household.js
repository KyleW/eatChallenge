var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Child = require('./child');
var HouseholdMember = require('./household_member.js');

var householdSchema = new Schema({
    numberOfChildren: Number,
    children: Array,
    otherMembersCount: Number,
    otherMembers: Array,
    completed: {type: Boolean, default: false}
});

module.exports = mongoose.model('household', householdSchema);
