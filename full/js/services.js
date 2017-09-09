// controller.js
angular.module('app').factory("MainFactory", ['$http', MainFactory]);
function MainFactory($http) {
    var MainFactory = {
        getPatientInfo: getPatientInfo
    }

    return MainFactory;

    function getPatientInfo() {
        return $http.get('../json/patientInfo.json').then(function(patientInfo) {
            return patientInfo.data;
        })
    }
}
