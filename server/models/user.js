var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var passportLocalMongoose = require('passport-local-mongoose');

// define the schema for our user model
var User = mongoose.Schema({
    username: String,
    password: String,
    // email: {type:String, required: true, unique: true},
    // password: String,
    isAdmin: {type: Boolean, default: false}
});

// methods ======================
// // generating a hash
// User.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// // checking if password is valid
// User.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
// };

User.plugin(passportLocalMongoose, {usernameLowerCase: true});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', User);
