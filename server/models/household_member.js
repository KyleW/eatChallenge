var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HouseholdMemberSchema = new Schema({
    firstName: String,
    lastName: String,
    hasSSN: Boolean,
    last4ssn: String,
    incomeSources: Array
});

module.exports = HouseholdMemberSchema;
