var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var childIncomeSourceSchema = new Schema({
    type: String,
    amount: Number,
    frequency: String,
});

module.exports = childIncomeSourceSchema;
