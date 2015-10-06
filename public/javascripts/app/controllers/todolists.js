(function () {
    'use strict';

    angular
        .module('nodestart', []);

    angular
        .module('nodestart')
        .controller('TodoLists', TodoLists);

    function TodoLists($scope, $http) {
        $http.get('/todolists')
            .success(function (data) {
                $scope.todolists = data;

                $scope.todolists.forEach(function (todolist) {
                    todolist.todos.forEach(function (todo) {
                        $scope.$watch(todo.done, function (newValue, oldValue) {
                            if (newValue !== oldValue) {
                                $http.patch('/todolists/' + todolist._id + '/todo/' + todo._id, todo)
                                    .error(function () {
                                        todo.done = oldValue;
                                    });
                            }
                        });
                    });
                });
            });
    };
})();
