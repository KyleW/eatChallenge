var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var householdSchema = new Schema({
  numberOfChildren: Number
})

module.exports = mongoose.model("household", householdSchema);
