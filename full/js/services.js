// controller.js
angular.module('app').factory("MainFactory", ['$http', '$q', MainFactory]);
function MainFactory($http, $q) {
    let immunizations = [
        {
            name: "hepatitis B",
            givenBy: "Marzi Kho",
            dosage: "10ml",
            givenDate: "12/02/2016"
        }
    ];

    let medicalImaging = [
        {
            url: "http://localhost:8042/osimis-viewer/app/index.html?study=7e3a98bb-9acc8a9d-82dea211-2c0e226a-b846dc26"
        },
        {
            url: "http://localhost:8042/osimis-viewer/app/index.html?study=17dba82f-d91dd6eb-84dc046b-81131b64-ad1eb0ed"
        }

    ]

    var MainFactory = {
        getPatientInfo: getPatientInfo,
        getImmunizationRecords: getImmunizationRecords,
        addImmunization: addImmunization,
        getMedicalImaging: getMedicalImaging,
        getAllPhi: getAllPhi,
    };

    return MainFactory;

    function getPatientInfo() {
        return $http.get('../json/patientInfo.json').then(function(patientInfo) {
            return patientInfo.data;
        })
    }

    function addImmunization(type, data) {
        immunizations = immunizations.concat(data);
        return $q.resolve(immunizations);
    }

    function getImmunizationRecords() {
        return $q.resolve(immunizations);
    }

    function getMedicalImaging() {
        return $q.resolve(medicalImaging);
    }

    function getAllPhi() {
        var allPhi = {
            immunizations: immunizations,
            medicalImaging: medicalImaging,
        }
        return $q.resolve(allPhi);
    }
}
