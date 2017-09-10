angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {
  $stateProvider
  .state('app.icons', {
    url: "/icons",
    abstract: true,
    template: '<ui-view></ui-view>',
    ncyBreadcrumb: {
      label: 'Icons'
    }
  })
  .state('app.icons.fontawesome', {
    url: '/font-awesome',
    templateUrl: 'views/icons/font-awesome.html',
    ncyBreadcrumb: {
      label: 'Font Awesome'
    }
  })
  .state('app.icons.simplelineicons', {
    url: '/simple-line-icons',
    templateUrl: 'views/icons/simple-line-icons.html',
    ncyBreadcrumb: {
      label: 'Simple Line Icons'
    }
  })
  .state('app.components', {
    url: "/components",
    abstract: true,
    template: '<ui-view></ui-view>',
    ncyBreadcrumb: {
      label: 'Components'
    }
  })
.state('app.calendar', {
    templateUrl: 'views/common/calendar.html',
    url: '/calendar',
    ncyBreadcrumb: {
      label: 'Calendar'
    }
  })
  .state('app.components.pcp', {
    url: '/pcp',
    templateUrl: 'views/components/buttons.html',
    ncyBreadcrumb: {
      label: 'PCP'
    }
  })
  .state('app.components.oncologist', {
    url: '/oncologist',
    templateUrl: 'views/components/social-buttons.html',
    ncyBreadcrumb: {
      label: 'Oncologist'
    }
  })
  .state('app.components.radiologist', {
    url: '/radiologist',
    templateUrl: 'views/components/cards.html',
    ncyBreadcrumb: {
      label: 'Radiologist'
    }
  })
  .state('app.components.ophthalmologist', {
    url: '/opthalmologist',
    templateUrl: 'views/components/forms.html',
    ncyBreadcrumb: {
      label: 'Ophthalmologist'
    }
  })
  .state('app.components.dentist', {
    url: '/dentist',
    templateUrl: 'views/components/switches.html',
    ncyBreadcrumb: {
      label: 'Dentist'
    }
  })
  .state('app.forms', {
    url: '/forms',
    templateUrl: 'views/forms.html',
    ncyBreadcrumb: {
      label: 'Forms'
    },
    resolve: {
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load([
          {
            serie: true,
            files: ['js/libs/moment.min.js']
          },
          {
            serie: true,
            files: ['js/libs/daterangepicker.min.js', 'js/libs/angular-daterangepicker.min.js']
          },
          {
            files: ['js/libs/mask.min.js']
          },
          {
            files: ['js/libs/select.min.js']
          }
        ]);
      }],
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load({
          files: ['js/controllers/forms.js']
        });
      }]
    }
  })
  .state('app.widgets', {
    url: '/widgets',
    templateUrl: 'views/widgets.html',
    ncyBreadcrumb: {
      label: 'Widgets'
    },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/widgets.js']
        });
      }]
    }
  })
  .state('app.charts', {
    url: '/charts',
    templateUrl: 'views/charts.html',
    ncyBreadcrumb: {
      label: 'Charts'
    },
    resolve: {
      // Plugins loaded before
      // loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
      //     return $ocLazyLoad.load([
      //         {
      //             serial: true,
      //             files: ['js/libs/Chart.min.js', 'js/libs/angular-chart.min.js']
      //         }
      //     ]);
      // }],
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load({
          files: ['js/controllers/charts.js']
        });
      }]
    }
  })
  .state('app.tables', {
    url: '/tables',
    templateUrl: 'views/components/tables.html',
    ncyBreadcrumb: {
      label: 'Insurance Information'
    }
  })
  .state('app.patient_history', {
    url: '/patient_history',
    templateUrl: 'views/components/patient_history.html',
    ncyBreadcrumb: {
      label: 'Patient History'
    }
  })
  .state('app.referrals', {
    url: '/referrals',
    templateUrl: 'views/components/referrals.html',
    controller: "MainController"
  })
  .state('app.medications', {
    url: '/medications',
    templateUrl: 'views/components/medications.html',
    controller: "MainController"
  })
  .state('app.Glasses', {
    url: '/glasses',
    templateUrl: 'views/components/Glasses.html',
    ncyBreadcrumb: {
      label: 'Glasses'
    }
  })
  .state('app.immunizations', {
    url: '/immunizations',
    templateUrl: 'views/immunizations.html',
    ncyBreadcrumb: {
      label: 'Immunizations'
    },
    controller: "MainController"
  })
  .state('app.medicalImaging', {
    url: '/medicalImaging',
    templateUrl: 'views/medical_imaging.html',
    ncyBreadcrumb: {
      label: 'Medical Imaging'
    },
    controller: "MainController"
  })
  .state('app.appointments', {
    url: '/appointments',
    templateUrl: 'views/components/appointments.html',
    ncyBreadcrumb: {
      label: 'Appointments'
    },
    controller: "MainController"
  })
}]);
