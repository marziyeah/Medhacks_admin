// controller.js
angular.module('app').factory("MainFactory", ['$http', '$q', MainFactory]);
function MainFactory($http, $q) {
    let immunizations;

    let medicalImaging = [
        {
            url: "http://localhost:8042/osimis-viewer/app/index.html?study=7e3a98bb-9acc8a9d-82dea211-2c0e226a-b846dc26"
        },
        {
            url: "http://localhost:8042/osimis-viewer/app/index.html?study=17dba82f-d91dd6eb-84dc046b-81131b64-ad1eb0ed"
        }

    ];

    let clinicalDocumentation = [

    ];

    var headers = {
        // 'Access-Control-Request-Method' : "*",
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
    }

    var MainFactory = {
        getPatientInfo: getPatientInfo,
        getImmunizationRecords: getImmunizationRecords,
        addImmunization: addImmunization,
        getMedicalImaging: getMedicalImaging,
        getAllPhi: getAllPhi,
        generateToken: generateToken,
        unlockSecretInfo: unlockSecretInfo,
    };

    return MainFactory;

    function getPatientInfo() {
        return $http.get('../json/patientInfo.json').then(function(patientInfo) {
            return patientInfo.data;
        })
    }

    function addImmunization(data) {
        return $http({method: 'POST', url: 'http://localhost:8000/immunizations', headers: headers, data: {'immunization': data}}).then((success) => {
            return success.data;
        });
    }

    function getImmunizationRecords() {
        return $http({method: 'GET', url: 'http://localhost:8000/immunizations', headers: headers}).then((immunizations) => {
            return immunizations.data;
        });
    };

    function getMedicalImaging() {
        return $q.resolve(medicalImaging);
    }

    function getAllPhi() {
        var allPhi = {
            immunizations: immunizations,
            medicalImaging: medicalImaging,
            clinicalDocumentation: clinicalDocumentation,
        }
        return $q.resolve(allPhi);
    }

    function generateToken(pin) {
      return $http({method:'POST', url: "http://localhost:8000/generateToken", headers: headers, data: {'pin': pin}}).then((success) => {
          return success.data.token;
      })
    }

    function unlockSecretInfo(token, pin) {
      var data = {
        token: token,
        pin: pin
      };

      return $http({method:'POST', url: "http://localhost:8000/verifySecretCombo", headers: headers, data: data}).then((success) => {
        return success.data.url;
      }, (failure) => {
        console.log('lululul')
        return $q.reject(failure.data.errors);
      })
    }
}
