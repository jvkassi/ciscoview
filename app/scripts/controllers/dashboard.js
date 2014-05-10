'use strict';

// routing 
// Application.Controllers.config(['$stateProvider',
//         function($stateProvider) {
//             $stateProvider
//                 .state('show', {
//                         abstract: true,
//                         url: "/equipment",
//                         templateUrl: "views/features.html",
//                         controller: 'FeaturesCtrl',
//                         data: {
//                             breadcrumbClass: ''
//                         }
//                     }
//             }])

Application.Controllers.controller('DashboardCtrl', ['$scope', 'User', '$state',
    function($scope, user, $state) {
        // $scope.currentUser = User.info();
        // html class
        // $scope.user = user;
        angular.element(document.getElementsByTagName('html')).removeClass('login-pf')
        $scope.output = "";
      
    }
]);
