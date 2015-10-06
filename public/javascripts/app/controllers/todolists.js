(function () {
    'use strict';

    angular
        .module('nodestart', []);

    angular
        .module('nodestart')
        .controller('TodoLists', TodoLists);

    function TodoLists($scope, $http) {
        var self = $scope;

        self.addTodo = function () {
            $scope.todolist.todos.push({
                text: $scope.formData.text,
                done: false
            });

            $scope.formData.text = '';

            $http.patch('/todolists/5613f7a59f0bc50820f7dc10', $scope.todolist);
        };

        self.todoStatusChanged = function () {
            $http.patch('/todolists/5613f7a59f0bc50820f7dc10', $scope.todolist);
        };
        
        $http.get('/todolists')
            .success(function (data) {
                $scope.todolist = data[0];

                $scope.todolist.todos.forEach(function (todo) {
                    $scope.$watch(todo.done, function (newValue, oldValue) {
                        if (newValue !== oldValue) {
                            $http.patch('/todolists/' + $scope.todolist +  '/todo/' + todo._id, todo)
                                .error(function () {
                                    todo.done = oldValue;
                                });
                        }
                    });
                });
            });
    };
})();
