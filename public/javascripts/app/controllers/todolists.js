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
            });

        self.addTodo = function () {
            $scope.todolist.todos.push({
                text: $scope.formData.text,
                done: false
            });

            $scope.formData.text = '';

            $http.put('/todolists/' + $scope.todolist._id, $scope.todolist);
        };

        self.todoStatusChanged = function () {
            $http.put('/todolists/' + $scope.todolist._id, $scope.todolist);
        };
    };
})();
