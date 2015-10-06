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

TodoListsSchema.methods.addTodo = function (data) {
    this.todos.push(data);
};

module.exports = mongoose.model('todolists', TodoListsSchema);