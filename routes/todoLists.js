var TodoList = require('../models/todolist');

module.exports = (function () {
    var getAllTodoLists = function (req, res) {
        TodoList.find(function (err, todos) {
            res.send(todos);
        });
    };

    var getOneTodoList = function (req, res) {
        TodoList.findOne({ _id: req.params.id }, function (err, todolist) {
            res.json(todolist);
        });
        
        res.end();
    };

    var updateTodoList = function (req, res) {
        TodoList.findOne(function (err, todolist) {
            todolist.name = req.body.name;
            todolist.todos = req.body.todos;
            
            todolist.save();
        });
        
        res.end();
    };

    return {
        register: function (app) {
            app.route('/todolists')
                .get(getAllTodoLists);

            app.route('/todolists/:id')
                .get(getOneTodoList)
                .patch(updateTodoList);
        }
    }
})();
