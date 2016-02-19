var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    incomeSources: Array
});

module.exports = mongoose.model('child', childSchema);
