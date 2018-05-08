app.controller('todoCtrl',['$scope','$http','$modal','$log',
    function($scope, $http, $modal,$log) {

     //list of status
    $scope.listStatus = {
        model: null,
        availableStatus: [
          {id: '1', name: 'Open'},
          {id: '2', name: 'In Progress'},
          {id: '3', name: 'Finished'}
        ]
       };

    //list of priority
    $scope.listPriority = {
        model: null,
        availablePriority: [
          {id: '1', name: 'Low'},
          {id: '2', name: 'Medium'},
          {id: '3', name: 'High'},
          {id: '4', name: 'Urgent'}
        ]
       };



    //loading todolist from rest api django
    $http.get('http://127.0.0.1:8000/todo/').
            then(function(response) {
                   $scope.todo = response.data;
                });

   $scope.Calling = function(){
        //$window.self.location.href = '/editTodo';
   };

   $scope.filterTableStatus = {};
   $scope.filterTablePriority = {};

   //filter to list by status{1:Open,2:in progress,3:finished}
    $scope.$watch('statusFilter', function(newValue){
        $scope.filterTableStatus ={'status':newValue};
    });
    //filter to list by priority{1:low,2:medium,3:high,4:urgent}
   $scope.$watch('priorityFilter', function(newValue){
        $scope.filterTablePriority ={'priority':newValue};

    });

   $scope.showAddModal = function () {
            $scope.message = "Show Form Button Clicked";
            console.log($scope.message);

            var modalInstance = $modal.open({
                templateUrl: '../modal-add-task',
                controller: addTaskCtrl,
                scope: $scope,
                resolve: {
                    userForm: function () {
                        return $scope.userForm;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
}]);

    var addTaskCtrl = function ($scope, $modalInstance, userForm) {
            $scope.form = {}
            $scope.submitForm = function () {
                if ($scope.form.userForm.$valid) {
                    console.log('user form is in scope');
                    $modalInstance.close('closed');
                } else {
                    console.log('userform is not in scope');
                }
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
    };




