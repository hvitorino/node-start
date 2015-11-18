(function(){
    'use strict';
    
    angular
        .module('nodestart')
        .factory('todolistsData', TodoListsData());
        
    function TodoListsData($http){
        return {
            updateTodoList: function(id, list){
                return $http.patch('/todolists/' + id, list);
            },
            
            getTodoList: function() {
                return $http.get('/todolists')
            }
        };
    };
})();