var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodosSchema = new Schema({
	text: String,
	done: Boolean 
});

var TodoListsSchema = new Schema({
	name: String,
	todos: [TodosSchema]
});

module.exports = mongoose.model('todoLists', TodoListsSchema);