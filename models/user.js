var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usersSchema = new Schema({
	name: String,
	password: String,
	email: String
});

var User = mongoose.model('users', usersSchema);

module.exports = User;