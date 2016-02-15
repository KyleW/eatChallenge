var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var childSchema = new Schema({
    firstName: String,
    middleInitial: String,
    lastName: String,
    enrolled: Boolean,
    specialStatus: {
        fosterChild: Boolean,
        homelessMigrantRunaway: Boolean,
        headStartParticipant: Boolean
    },
    assistanceProgram: {
        participant: Boolean,
        caseNumber: String
    }
});

// module.exports = mongoose.model('child', childSchema);
module.exports = childSchema;
