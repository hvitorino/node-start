var TodoList = require('../models/todoList');

module.exports = function () {
	var getTodos = function (req, res) {
		TodoList.find(function (err, todos) {
			res.send(todos);
		});
	};

	var postTodos = function (req, res) {
		var newTodo = new TodoList(req.body);

		newTodo.save(function (err) {
			if (err) {
				console.log(err);
			}
		})
	};

	var getTodosId = function (req, res) {
		TodoList.findOne({ _id: req.params.id }, function (err, todo) {
			res.json(todo);
		});
	};

	var patchTodosId = function (req, res) {
		TodoList.findOne({ _id: req.params.id }, function (err, todo) {
			todo.text = res.body.text;
			todo.done = res.body.done;

			res.end();
		});
	};

	var deleteTodosId = function (req, res) {
		TodoList.findOne({ _id: req.params.id }, function (err, todo) {
			todo.remove(function (err, removedTodo) {
				res.end();
			});
		})
	};

	return {
		register: function (app) {
			app.route('/todos')
				.get(getTodos)
				.post(postTodos);

			app.route('/todos/:id')
				.get(getTodosId)
				.patch(patchTodosId)
				.delete(deleteTodosId);
		}
	}
}();
