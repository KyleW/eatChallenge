var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Child = require('./child');
var HouseholdMember = require('./household_member');

var householdSchema = new Schema({
    userId: String,
    childCount: String,
    children: [Child],
    otherMembersCount: String,
    otherMembers: [HouseholdMember],
    completed: {type: Boolean, default: false},
    competedSections: Object,
    signature: String,
    signedOn: Date,
    streetAddress: String,
    city: String,
    state: String,
    zip: String,
    phone: String,
    email: String,
    hasSSN: Boolean,
    last4ssn: String
});

module.exports = mongoose.model('household', householdSchema);
