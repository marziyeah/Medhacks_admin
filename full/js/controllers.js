// controller.js
angular.module('app').controller("MainController", ["$scope", 'MainFactory', MainController]);

function MainController($scope, MainFactory) {
    $scope.immunizations = {};

    MainFactory.getPatientInfo().then(function(data) {
        $scope.patientInfo = data;
    })

    // data.givenDate = moment(data.givenDate).format('MMMM Do, YYYY');

    MainFactory.getAllInfo().then((data) => {
        $scope.clinicalInfo = data;
    })

    $scope.onSubmit = function(type, data) {
        MainFactory.addInfo(type, data).then(function(data) {
            $scope.clinicalInfo[type.toLowerCase() + "s"].push(data);
        })
    }


    MainFactory.getMedicalImaging().then(function(data) {
        $scope.medicalImaging = data;
    })

    MainFactory.getAllPhi().then(function(PHI) {
        $scope.allDataHeaders = Object.keys(PHI).map(function(key) {
                return key;
            })
            // $scope.allPhi = PHI;
    })

    $scope.reset = function(type) {
        $scope[type] = {};
    }

    $scope.shareInfo = function() {
        if ($scope.pin) {
            $scope.error = "";
            MainFactory.generateToken($scope.pin).then((token) => {
                $scope.token = token;
            })
        } else {
            $scope.error = "Please enter a PIN!"
        }
    }

    $scope.unlockSecretInfo = function() {
        if (!$scope.secretToken || !$scope.secretPin) {
            $scope.secretError = "Please enter the Pin and Token!";
        } else {
            $scope.secretError = "";
            MainFactory.unlockSecretInfo($scope.secretToken, $scope.secretPin).then((success) => {
                console.log('lol')
                $scope.token = "";
                $scope.link = success;
            }, (failure) => {
                console.log(failure)
                $scope.secretError = "This was the wrong key fam.";
            })
        }
    }
}
