var TodoList = require('../models/todoList');

module.exports = function () {
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
        TodoList.findOne({ _id: req.params.id }, function (err, todo) {
            res.json(todo);
        });
    };

    var updateTodoList = function (req, res) {
        TodoList.findOne({ _id: req.params.id }, function (err, todo) {
            todo.text = res.body.text;
            todo.done = res.body.done;

            res.end();
        });
    };

    var excludeTodoList = function (req, res) {
        TodoList.findOne({ _id: req.params.id }, function (err, todo) {
            todo.remove(function (err, removedTodo) {
                res.end();
            });
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
        }
    }
} ();
