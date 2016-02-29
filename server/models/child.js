var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var ChildIncomeSource = require('./childIncomeSource');

var childSchema = new Schema({
    firstName: String,
    middleInitial: String,
    lastName: String,
    enrolled: Boolean,
    specialStatus: {
        fosterChild: {type: Boolean, default: false},
        homelessMigrantRunaway: {type: Boolean, default: false},
        headStartParticipant: {type: Boolean, default: false},
    },
    assistanceProgram: {
        participant: Boolean,
        caseNumber: String
    },
    // incomeSources: [ChildIncomeSource]
    incomeSources: Array
});

module.exports = childSchema;
