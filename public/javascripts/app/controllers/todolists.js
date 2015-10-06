(function () {
    'use strict';

    angular
        .module('nodestart', []);

    angular
        .module('nodestart')
        .controller('TodoLists', TodoLists);

    function TodoLists($scope, $http) {
        var self = $scope;
        
        $http.get('/todolists')
            .success(function (data) {
                $scope.todolist = data[0];

                $scope.todolist.todos.forEach(function (todo) {
                    $scope.$watch(todo.done, function (newValue, oldValue) {
                        if (newValue !== oldValue) {
                            $http.patch('/todolists/', $scope.todolist)
                                .error(function () {
                                    todo.done = oldValue;
                                });
                        }
                    });
                });
            });

        self.addTodo = function () {
            $scope.todolist.todos.push({
                text: $scope.formData.text,
                done: false
            });

            $scope.formData.text = '';

            $http.patch('/todolists/' + $scope.todolist._id, $scope.todolist);
        };

        self.todoStatusChanged = function () {
            $http.patch('/todolists/' + $scope.todolist._id, $scope.todolist);
        };
    };
})();
