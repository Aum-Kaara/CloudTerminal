var App = angular.module('AzureApp', ['ui.bootstrap', 'ui.router', 'ngBreadCrumb', 'ngRoute', 'blockUI', 'inform','ui.bootstrap.contextMenu']);

App.config(function ($stateProvider) {
    $stateProvider

      .state('home', {
          url: '/home',
          views: {
              'main@': {
                  templateUrl: '/Home/Dashboard',
              }
          },
          data: {
              displayName: 'Home',
          }
      })
    .state('home.Features', {
        url: '/Features',
        views: {
            'main@': {
                templateUrl: '/Home/Features',
            }
        },
        data: {
            displayName: 'Features'
        }
    }).state('home.Login', {
        url: '/Login',
        views: {
            'main@': {
                templateUrl: '/Account/Login',
            }
        },
        data: {
            displayName: 'Login'
        }
    })
 .state('home.Dashboard', {
     url: '/Board/:SubId',
     views: {
         'main@': {
             templateUrl: '/Home/Board'
             //Sample controller declaration
             //controller: function ($scope, userId) {
             //    $scope.userId = userId;
             //}
         }
     },
     data: {
         displayName: 'Dashboard'
     },
     resolve: {
         SubId: function ($stateParams) {
             return $stateParams.SubId
         }
     }
 }).state('home.Dashboard.VirtualMachines', {
     url: '',
     views: {
         'main@': {
             templateUrl: '/Home/VirtualMachines'
             //Sample controller declaration
             //controller: function ($scope, userId) {
             //    $scope.userId = userId;
             //}
         }
     },
     data: {
         displayName: 'VirtualMachines'
     },
     resolve: {
         SubId: function ($stateParams) {
             return $stateParams.SubId
         }
     }
 }).state('home.Dashboard.SQLDatabases', {
     url: '',
     views: {
         'main@': {
             templateUrl: '/Home/SqlServers'
         }
     },
     data: {
         displayName: 'SQL Databases'
     },
     resolve: {
         SubId: function ($stateParams) {
             return $stateParams.SubId
         }
     }
 }).state('home.Dashboard.Storage', {
     url: '',
     views: {
         'main@': {
             templateUrl: '/Home/Storage'
         }
     },
     data: {
         displayName: 'Storage'
     },
     resolve: {
         SubId: function ($stateParams) {
             return $stateParams.SubId
         }
     }
 }).state('home.Dashboard.WebSites', {
     url: '',
     views: {
         'main@': {
             templateUrl: '/Home/Website'
         }
     },
     data: {
         displayName: 'Web Apps'
     },
     resolve: {
         SubId: function ($stateParams) {
             return $stateParams.SubId
         }
     }
 }).state('home.Dashboard.ServiceBus', {
     url: '',
     views: {
         'main@': {
             templateUrl: '/Home/ServiceBus'
         }
     },
     data: {
         displayName: 'Service Bus'
     },
     resolve: {
         SubId: function ($stateParams) {
             return $stateParams.SubId
         }
     }
 }).state('home.Dashboard.Storage.Services', {
     url: '',
     views: {
         'main@': {
             templateUrl: '/Storage/Services'
         }
     },
     data: {
         displayName: 'Services'
     },
     resolve: {
         SubId: function ($stateParams) {
             return $stateParams.SubId
         }
     }
 }).state('home.Dashboard.ServiceBus.Explorer', {
     url: '/Explorer/:Id',
     views: {
         'main@': {
             templateUrl: '/ServiceBus/Explorer'
         }
     },
     data: {
         displayName: 'Explorer'
     },
     resolve: {
         Id: function ($stateParams) {
             return $stateParams.Id
         }
     }
 }).state('home.Dashboard.ServiceBus.Explorer.Queues', {
     url: '',
     views: {
         'main@': {
             templateUrl: '/ServiceBus/Queues'
         }
     },
     data: {
         displayName: 'Queues'
     },
     resolve: {
         Id: function ($stateParams) {
             return $stateParams.Id
         }
     }
 }).state('home.Dashboard.ServiceBus.Explorer.Topics', {
     url: '',
     views: {
         'main@': {
             templateUrl: '/ServiceBus/Topics'
         }
     },
     data: {
         displayName: 'Topics'
     },
     resolve: {
         Id: function ($stateParams) {
             return $stateParams.Id
         }
     }
 })

})
App.run(function ($state) {
    $state.go('home');
});
