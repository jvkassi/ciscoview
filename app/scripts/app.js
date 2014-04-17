'use strict';

var Application = Application || {};

Application.Constants = angular.module('application.constants', []);
Application.Services = angular.module('application.services', []);
Application.Controllers = angular.module('application.controllers', ['application.services']);
Application.Filters = angular.module('application.filters', []);
Application.Directives = angular.module('application.directives', []);

var app = angular.module('sailsApiAngularApp', [
    'ui.router', 'application.controllers', 'application.directives',
    'ngSails'
    ]);
app.run(['$http',
    function($http) {
        var session = false;
            // Make a remote request.
            $http.get('http://web.mib4fun.ci/api/sessions').then(function(results) {
                session = true;
            });


        }
        ])
app.config(['$stateProvider', '$urlRouterProvider', '$sailsProvider',
    function($stateProvider, $urlRouterProvider, $sailsProvider) {

        $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .state('users', {
            url: '/users',
            templateUrl: 'views/users.html',
            controller: 'UserCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        });

        $urlRouterProvider.otherwise('/home');
    }
    ]);
