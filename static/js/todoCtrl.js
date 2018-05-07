app.controller('todoCtrl',function($scope, $http,$window) {
   $http.get('http://127.0.0.1:8000/todo/').
            then(function(response) {
                   $scope.todo = response.data;
                });

   $scope.Calling = function(){
        $window.self.location.href = '/editTodo';
   };
});
