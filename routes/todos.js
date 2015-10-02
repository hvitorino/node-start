var Todo = require('../models/todo');

module.exports = function (app) {
	app.route('/todos')
		.get(function (req, res) {
			Todo.find(function (err, todos) {
				res.send(todos);
			});
		})
		.post(function (req, res) {
			var newTodo = new Todo(req.body);
			newTodo.save(function (err) {
				if (err) {
					console.log(err);
				}
			});
		});

	app.route('/todos/:id')
		.get(function (req, res) {
			Todo.findOne({ _id: req.params.id }, function (err, todo) {
				res.json(todo);
			});
		})
		.patch(function (req, res) {
			Todo.findOne({ _id: req.params.id }, function (err, todo) {
				todo.text = res.body.text;
				todo.done = res.body.done;
				
				res.end(); 
			});
		})
		.delete(function(req, res){
			Todo.findOne({ _id: req.params.id }, function (err, todo) {
				todo.remove(function(err, removedTodo){
					res.end();
				}); 
			})
		});
};