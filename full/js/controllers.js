// controller.js
angular.module('app').controller("MainController", ["$scope", 'MainFactory', MainController]);
function MainController($scope, MainFactory) {
    MainFactory.getPatientInfo().then(function(data) {
        $scope.patientInfo = data;
    })

    // $scope.getPatientInfo = function() {
    // }
}
