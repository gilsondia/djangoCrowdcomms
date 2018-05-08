app.controller('addTaskCtrl',  ['$scope', '$http', 'record', function($scope, $http) {
    $scope.saveEmp = function () {
        $scope.datas = {};

         if(!angular.isDefined($scope.employee_name) || $scope.employee_name === '') {
             alert('employee name is empty');
             return;
         }
        else if(!angular.isDefined($scope.employee_age) || $scope.employee_age === '') {
            alert('employee age is empty');
            return;
        }else if(!angular.isDefined($scope.employee.salary) || $scope.employee.salary === '') {
            alert('employee salary is empty');
            return;
        } else {
             $scope.datas.name = $scope.employee_name;
             $scope.datas.age = $scope.employee_age;
             $scope.datas.salary = $scope.employee_salary;
             console.log($scope.datas);
         }
        $scope.cancelModal();
        $scope.saveRecord($scope.datas);
    };

}]);