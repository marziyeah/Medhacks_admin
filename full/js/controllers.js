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

    MainFactory.getReferrals().then((data) => {
        data.forEach(function(data) {
            data.startDate = moment(data.startDate).format('MMMM Do, YYYY');
            data.expirationDate = moment(data.expirationDate).format('MMMM Do, YYYY');
        })
        $scope.Referrals = data;
    })

    MainFactory.getMedications().then((data) => {
        $scope.medications = data;
    })

    MainFactory.getAppointments().then((data) => {
        data.date = moment(data.date).format('MMMM Do, YYYY');
        $scope.appointments = data;
    })

    MainFactory.getAllInfo().then((data) => {
        $scope.clinicalInfo = data;
    })

    $scope.onSubmit = function(type, data) {
        MainFactory.addInfo(type, data).then(function(data) {
            $scope.clinicalInfo[type].push(data);
        })
    }


    $scope.onSubmit = function(type) {
        MainFactory.addImmunization($scope.immunizations).then(function(data) {
            $scope.immunizationRecords.push(data);
        });
        $scope[type] = {};
    }

    $scope.createReferral = function(type) {
        MainFactory.createReferral($scope.referral).then((data) => {
            data.startDate = moment(data.startDate).format('MMMM Do, YYYY');
            data.expirationDate = moment(data.expirationDate).format('MMMM Do, YYYY');
            $scope.Referrals.push(data);
        })
        $scope[type] = {};
    }

    $scope.createAppointment = function() {
        MainFactory.createAppointment($scope.appointment).then((data) => {
            data.date = moment(data.date).format('MMMM Do, YYYY');
            $scope.appointments.push(data);
        })
    }

    $scope.createMedication = function() {
        MainFactory.createMedication($scope.medication).then((data) => {
            $scope.medications.push(data);
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

    // TODO: make a schedule appointment function
}
