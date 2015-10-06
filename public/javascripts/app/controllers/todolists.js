(function () {
    'use strict';

    angular
        .module('nodestart', []);
        
    angular
        .module('nodestart')
        .controller('todolists', TodoLists);

    function TodoLists($scope, $http) {
        $http
            .get('/todolists')
            .success(function (data) {
                $scope.todos = data;
            });
    };
})();
