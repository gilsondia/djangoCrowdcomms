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

         //list of table header
        $scope.listTableheader = {
            model: null,
            tableHeader: [
                {name: 'Priority'},
                {name: 'Status'},
                {name: 'Title'},
                {name: 'Description'},
                {name: 'Deadline'},
                {name: 'Action'}
            ]
        };

        var url = 'http://127.0.0.1:8000/todo/';
        var config = {headers:{'Content-Type': 'application/json'}};

        $scope.loadList = function () {

            //loading todolist from rest api django
            $http.get(url,{},config).then(function (response) {
                $scope.todo = response.data;
            });

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

            console.log($scope.message);

            var modalInstance = $modal.open({
                templateUrl: '../modal-add-task',
                controller: addTaskCtrl,
                scope: $scope,
                http: $http,
                resolve: {}
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

       $scope.showEditModal = function (idParam) {
            //just check if it a integer more than just zero
            if(idParam!=null && idParam>0){
                $http.get(url+"?id="+idParam).then(function (response) {
                   var modalInstance = $modal.open({
                        templateUrl: '../modal-edit-task',
                        controller: editTaskCtrl,
                        scope: $scope,
                        http: $http,
                        resolve: {
                            record: function () {
                                return response.data;
                        }
                    }
                    });
                    modalInstance.result.then(function (selectedItem) {
                        $scope.selected = selectedItem;
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                });
           }
        };


       $scope.Calling = function(){
            //$window.self.location.href = '/editTodo';
       };
}]);


    var addTaskCtrl = function ($scope, $modalInstance,$http) {

            var url = 'http://127.0.0.1:8000/todo/';
            var config = {headers:{'Content-Type': 'application/json'}};

            $scope.addTask = function () {
                var jsonTask = {
                    title: document.getElementById("idtitle").value,
                    text: document.getElementById("iddescription").value,
                    priority: document.getElementById("idPriority").value,
                    deadline: document.getElementById("iddeadline").value,
                    dateTodo:new Date().toISOString(),
                    status:"1"
                }

               $http.post(url, JSON.stringify(jsonTask), config)
                    .then(
                       function(response){
                         // success callback
                         $scope.loadList();
                       },
                       function(response){
                         // failure callback
                       }
                    );
                $modalInstance.close('closed');
            };

            $scope.cancelModal = function () {
                $modalInstance.dismiss('cancel');
            };
    };

    var editTaskCtrl = function ($scope, $modalInstance,$http,record) {


        function init(){
            $scope.taskEdit = record[0];
            $scope.taskEdit.deadline = new Date($scope.taskEdit.deadline);
            $scope.taskID=$scope.taskEdit.id
        }
        init();

        var url = 'http://127.0.0.1:8000/todo/'+$scope.taskID+'/';
        var config = {headers:{'Content-Type': 'application/json'}};

        $scope.saveEdit = function(){

            $http.put(url,JSON.stringify($scope.taskEdit),config).then(
               function(response){
                 // success callback
                 $scope.loadList();
               },
               function(response){
                 // failure callback
               }
            );
            $modalInstance.close('closed');
        };

        $scope.cancelModal = function () {
            $modalInstance.dismiss('cancel');
        };
    };




