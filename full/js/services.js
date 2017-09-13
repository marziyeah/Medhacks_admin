// controller.js
angular.module('app').factory("MainFactory", ['$http', '$q', MainFactory]);
function MainFactory($http, $q) {
    let immunizations;

    let medicalImaging = [
        {
            url: "http://localhost:8042/osimis-viewer/app/index.html?study=52df32fb-efc78b4d-5f603167-122adc9a-c42b210e"
        },
        {
            url: "http://localhost:8042/osimis-viewer/app/index.html?series=c79fc335-c154a0ed-9075bbe2-e7757eb5-ccd1ac78"
        },
        {
            url: "http://localhost:8042/osimis-viewer/app/index.html?study=8a77fe1f-a9c9c5a2-694e0c6e-f0a80dd6-a9fdc5ed"
        },
        {
            url: "http://localhost:8042/osimis-viewer/app/index.html?study=2c2d9d92-2426e483-ce5a3dc2-dea09ed0-6f2bafa5"
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
        getReferrals: getReferrals,
        createReferral: createReferral,
        getImmunizationRecords: getImmunizationRecords,
        addImmunization: addImmunization,
        getMedicalImaging: getMedicalImaging,
        getAllPhi: getAllPhi,
        generateToken: generateToken,
        unlockSecretInfo: unlockSecretInfo,
        getMedications: getMedications,
        createMedication: createMedication,
        getAppointments: getAppointments,
        createAppointment: createAppointment,
        addInfo: addInfo,
        getAllInfo: getAllInfo,
    };

    return MainFactory;

    function getAllInfo() {
        return $http({method: "GET", url: 'http://localhost:8000/info', headers: headers}).then((success) => {
            return success.data;
        })
    }

    function addInfo(type, data) {
        return $http({method: 'POST', url: `http://localhost:8000/${type}`, headers: headers, data: {log: data}}).then((success) => {
            return success.data;
        })
    }

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
        return $q.reject(failure.data.errors);
      });
    };

    function getReferrals() {
        return $http({method: 'GET', url: 'http://localhost:8000/referrals', headers: headers}).then((referrals) => {
            return referrals.data;
        });
    };

    function createReferral(referral) {
      var data = {
        referral: referral
      }
      return $http({method:"POST", url: "http://localhost:8000/referrals", headers: headers, data: data}).then((success) => {
        return success.data;
      })
    }

    function getMedications() {
        return $http({method: 'GET', url: 'http://localhost:8000/medications', headers: headers}).then((referrals) => {
            return referrals.data;
        });
    };

    function createMedication(medication) {
      var data = {
        medication: medication
      }
      return $http({method:"POST", url: "http://localhost:8000/medications", headers: headers, data: data}).then((success) => {
        return success.data;
      })
    };

    function createAppointment(appointment) {
      var data = {
        appointment: appointment
      }
      return $http({method:"POST", url: "http://localhost:8000/appointments", headers: headers, data: data}).then((success) => {
        return success.data;
      });
    }

    function getAppointments() {
      return $http({method:"GET", url: "http://localhost:8000/appointments", headers: headers}).then((success) => {
        return success.data;
      })
    }
}
