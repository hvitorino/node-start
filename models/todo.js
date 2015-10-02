var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todosSchema = new Schema({
	text: String,
	done: Boolean 
});

module.exports = mongoose.model('todos', todosSchema);