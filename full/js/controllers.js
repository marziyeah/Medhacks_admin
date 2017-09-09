// controller.js
angular.module('app').controller("MainController", ["$scope", 'MainFactory', MainController]);
function MainController($scope, MainFactory) {
    MainFactory.getPatientInfo().then(function(data) {
        $scope.patientInfo = data;
    })

    MainFactory.getImmunizationRecords().then(function(data) {
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

    $scope.onSubmit = function(type, data) {
        MainFactory.addImmunization(type, data).then(function(data) {
            $scope.immunizationRecords = data;
        });
        $scope[type] = {};
    }

    $scope.reset = function(type) {
        $scope[type] = {};
    }

}
