app.controller('todoCtrl',['$scope','$http','$modal','$log',
    function($scope, $http, $modal,$log) {

        /**
         * List of status prioritys to populate the selects HTML
         * */
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
       /**Status Filter and Priority*/
       $scope.filterTableStatus = {};
       $scope.filterTablePriority = {};

        /**It must be moved to parameter file ???????*/
        $scope.urlAPI='http://127.0.0.1:8000/todo/';
        $scope.configAPI = {headers:{'Content-Type': 'application/json'}};

        /**loading todolist from rest api django*/
        $scope.loadList = function () {

            $http.get($scope.urlAPI,{},$scope.configAPI).then(function (response) {
                $scope.todo = response.data;
            });
        };

       /**filter to list by status{1:Open,2:in progress,3:finished}*/
        $scope.$watch('statusFilter', function(newValue){
            $scope.filterTableStatus ={'status':newValue};
        });
        /**filter to list by priority{1:low,2:medium,3:high,4:urgent}*/
       $scope.$watch('priorityFilter', function(newValue){
            $scope.filterTablePriority ={'priority':newValue};

        });

       /**Function to open the Add Modal - BootStrap*/
       $scope.showAddModal = function () {
            var modalInstance = $modal.open({
                templateUrl: '../modal-add-task',
                controller: addTaskCtrl,
                scope: $scope,
                http: $http,
                resolve: {}
            });
        };

       /**Function to open EditModal*/
       $scope.showEditModal = function (idParam) {

            //just check if it a integer more than just zero
            if(idParam!=null && idParam>0){
                var objToEdit;
                //it can be search on rest API too
                //$http.get(url+"?id="+idParam).then(function (response) {
                var i;
                for(i=0;i<$scope.todo.length;i++){
                    if($scope.todo[i].id==idParam){
                        objToEdit=$scope.todo[i];
                        //it was found. finish search loop
                        i=$scope.todo.length;
                    }
                }
                   var modalInstance = $modal.open({
                        templateUrl: '../modal-edit-task',
                        controller: editTaskCtrl,
                        scope: $scope,
                        http: $http,
                        resolve: {
                            record: function () {return objToEdit;}
                        }
                    });
                //});//it is the end of the http request to load from the RESTful API
           }
        };

        /**Function to open DeleteModal*/
       $scope.showDeleteModal = function (idParam) {
           //just check if it a integer more than just zero
            if(idParam!=null && idParam>0){
                   var modalInstance = $modal.open({
                        templateUrl: '../modal-delete-task',
                        controller: deleteTaskCtrl,
                        scope: $scope,
                        http: $http,
                        resolve: {
                            idDelete: function () {return idParam;}
                        }
                    });
                //});//it is the end of the http request to load from the RESTful API
           }
       };
}]);

    /**Modal controlle add task*/
    var addTaskCtrl = function ($scope, $modalInstance,$http) {

            //var url = 'http://127.0.0.1:8000/todo/';
            //var config = {headers:{'Content-Type': 'application/json'}};
            //Adding a nes task using post
            $scope.AddObjJson={};
            $scope.addTask = function () {

                //default status is open
                $scope.AddObjJson.status=1;

               $http.post($scope.urlAPI, JSON.stringify($scope.AddObjJson), $scope.configAPIg)
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

    /**Edit Modal Controller*/
    var editTaskCtrl = function ($scope, $modalInstance,$http,record) {


        //var url = 'http://127.0.0.1:8000/todo/'+$scope.taskID+'/';
        //var config = {headers:{'Content-Type': 'application/json'}};

        $scope.saveEdit = function(){

            $http.put($scope.urlAPI+$scope.taskID+'/',JSON.stringify($scope.taskEdit),$scope.configAPI).then(
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

    /**Delete controller*/
    var deleteTaskCtrl = function ($scope, $modalInstance,$http,idDelete) {
         $scope.delete = function(){
           $http.delete($scope.urlAPI+idDelete+'/',$scope.configAPI).then(
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



