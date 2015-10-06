var TodoList = require('../models/todolist');

module.exports = (function () {
    var getAllTodoLists = function (req, res) {
        TodoList.find(function (err, todos) {
            res.send(todos);
        });
    };

    var createTodoList = function (req, res) {
        var newTodo = new TodoList(req.body);

        newTodo.save(function (err) {
            if (err) {
                console.log(err);
            }
        });
    };

    var getOneTodoList = function (req, res) {
        TodoList.findOne({ _id: req.params.id }, function (err, todolist) {
            res.json(todolist);
        });
    };

    var updateTodoList = function (req, res) {
        TodoList.findOne({ _id: req.params.id }, function (err, todolist) {
            todolist.text = res.body.text;
            todolist.done = res.body.done;

            res.end();
        });
    };

    var excludeTodoList = function (req, res) {
        TodoList.findOne({ _id: req.params.id }, function (err, todolist) {
            todolist.remove(function (err, removedTodo) {
                res.end();
            });
        });
    };

    var createTodo = function (req, res) {
        TodoList.findOne({ _id: req.params.id }, function (err, todolist) {
            todolist.addTodo({
                text: req.body.text,
                done: false
            });
        });
    };
    
    var updateTodo = function (req, res) {
        TodoList.findOne({ _id: req.params.id }, function (err, todolist) {
            var updatedTodo = todolist.todos.filter(function(todo){
                return todo._id === req.params.todoid;
            });
            
            updatedTodo.done = req.params.done;
            
            todolist.save();
        });
    };

    return {
        register: function (app) {
            app.route('/todolists')
                .get(getAllTodoLists)
                .post(createTodoList);

            app.route('/todolists/:id')
                .get(getOneTodoList)
                .patch(updateTodoList)
                .delete(excludeTodoList);

            app.route('/todolists/:id/todo')
                .post(createTodo);
            
            app.route('/todolists/:id/todo/:todoid')
                .patch(updateTodo);
        }
    }
})();
