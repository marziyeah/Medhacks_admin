// controller.js
angular.module('app').controller("MainController", ["$scope", 'MainFactory', MainController]);
function MainController($scope, MainFactory) {
    $scope.immunizations = {};

    MainFactory.getPatientInfo().then(function(data) {
        $scope.patientInfo = data;
    })

    MainFactory.getImmunizationRecords().then(function(data) {
        data.forEach(function(data) {
            data.givenDate = moment(data.givenDate).format('MMMM Do, YYYY');
        })
        $scope.immunizationRecords = data;
    })

    MainFactory.getMedicalImaging().then(function(data) {
        $scope.medicalImaging = data;
    })

    MainFactory.getAllPhi().then(function(PHI) {
        $scope.allDataHeaders = Object.keys(PHI).map(function(key) {
            return key;
        })
        // $scope.allPhi = PHI;
    })

    $scope.onSubmit = function(type) {
        MainFactory.addImmunization($scope.immunizations).then(function(data) {
            $scope.immunizationRecords = data;
        });
        $scope[type] = {};
    }

    $scope.reset = function(type) {
        $scope[type] = {};
    }

}
