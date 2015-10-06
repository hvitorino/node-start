var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoListsSchema = new Schema({
    name: String,
    todos: [{
        text: String,
        done: Boolean
    }]
});

TodoListsSchema.methods.addTodo = function (data) {
    this.todos.push(data);
};

module.exports = mongoose.model('todolists', TodoListsSchema);