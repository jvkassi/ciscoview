'use strict';

var Application = Application || {};

Application.Constants = angular.module('application.constants', []);
Application.Services = angular.module('application.services', []);
Application.Controllers = angular.module('application.controllers', ['application.services']);
Application.Filters = angular.module('application.filters', []);
Application.Directives = angular.module('application.directives', []);

var app = angular.module('CiscoView', [
    'ui.router', 'application.controllers', 'ngSails', 'ui.bootstrap', 'ngTable'
]);


app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // TOdo : Handle acl
        $stateProvider
            .state('root', {
                // url: '',
                abstract: true,
                resolve: {
                    user: function(User) {
                        // console.log('2');
                        return User.info();
                    }
                },
                views: {
                    'header': {
                        templateUrl: '/views/partials/header.html',
                        controller: 'HeaderCtrl',
                    }
                }
            })
            .state('root.dashboard', {
                url: '/',
                views: {
                    'container@': {
                        templateUrl: '/views/dashboard.html',
                        controller: 'DashboardCtrl',
                    },
                    // 'header': {
                    //      templateUrl: 'views/partials/header.html',
                    //      controller: 'HeaderCtrl',
                    //  }
                }
            })
            .state('root.shell', {
                url: '/shell',
                views: {
                    'sidebar@': {
                        templateUrl: '/views/shell/partials/sidebar.html',
                        controller: 'EquipmentCtrl',
                    },
                    'container@': {
                        templateUrl: '/views/shell/display.html',
                        controller: 'ShellCtrl'
                    },
                    'action@': {
                        template: 'Selectionnez un equipment'
                    }
                }
            })
            .state('root.shell.equipment', {
                url: '/:id',
                views: {
                    'menu@': {
                        templateUrl: '/views/shell/partials/menu.html'
                    },
                    'action@': {
                        templateUrl: '/views/shell/equipment.html',
                        controller: 'ShellCtrl'
                    }
                }
            })
            .state('root.shell.equipment.command', {
                url: '/commands',
                views: {
                    'action@': {
                        templateUrl: '/views/shell/commands.html',
                        controller: 'ShellCtrl'
                    }
                }
            })
            .state('root.shell.equipment.interface', {
                url: '/interfaces',
                views: {
                    'action@': {
                        templateUrl: '/views/shell/interfaces.html',
                        controller: 'ShellCtrl'
                    }
                }
            })
            .state('root.settings', {
                // url: '/settings',
                abstract: true,
                views: {
                    'container@': {
                        templateUrl: '/views/settings.html',
                        controller: 'SettingCtrl'
                    },
                    // 'settings@' : {
                    //     templateUrl: '/views/equipments/display.html',
                    //     controller: 'EquipmentCtrl'
                    // }
                }
            })
            .state('root.settings.equipments', {
                // url: '/settings',
                views: {
                    'settings@': {
                        templateUrl: '/views/equipments/display.html',
                        controller: 'EquipmentCtrl'
                    },
                }
            })
            .state('root.settings.equipments.list', {
                url: '/settings/equipments/list',
                views: {
                    'action@': {
                        templateUrl: '/views/equipments/list.html',
                        controller: 'EquipmentCtrl'
                    },
                }
            })
            .state('root.settings.equipments.add', {
                url: '/settings/equipments/add',
                views: {
                    'action@': {
                        templateUrl: '/views/equipments/add.html',
                        controller: 'EquipmentCtrl'
                    },
                }
            })
            .state('root.settings.equipments.edit', {
                url: '/settings/equipments/:id',
                views: {
                    'action@': {
                        templateUrl: '/views/equipments/edit.html',
                        controller: 'EquipmentCtrl'
                    }
                }
            })
            .state('root.settings.commands', {
                // url: '/settings',
                views: {
                    'settings@': {
                        templateUrl: '/views/commands/display.html',
                        controller: 'CommandCtrl'
                    },
                }
            })
            .state('root.settings.commands.list', {
                url: '/settings/commands/list',
                views: {
                    'action@': {
                        templateUrl: '/views/commands/list.html',
                        controller: 'CommandCtrl'
                    },
                }
            })
            .state('root.settings.commands.add', {
                url: '/settings/commands/add',
                views: {
                    'action@': {
                        templateUrl: '/views/commands/add.html',
                        controller: 'CommandCtrl'
                    },

                }
            })
            .state('root.settings.commands.edit', {
                url: '/settings/commands/:id',
                views: {
                    'action@': {
                        templateUrl: '/views/commands/edit.html',
                        controller: 'CommandCtrl'
                    },
                }
            })
            .state('root.settings.users', {
                // url: '/settings',
                views: {
                    'settings@': {
                        templateUrl: '/views/users/display.html',
                        controller: 'UserCtrl'
                    },
                }
            })
            .state('root.settings.users.list', {
                url: '/settings/users/list',
                views: {
                    'action@': {
                        templateUrl: '/views/users/list.html',
                        controller: 'UserCtrl'
                    },
                }
            })
            .state('root.settings.users.add', {
                url: '/settings/users/add',
                views: {
                    'action@': {
                        templateUrl: '/views/users/add.html',
                        controller: 'UserCtrl'
                    },
                }
            })
            .state('root.settings.users.edit', {
                url: '/settings/users/:id',
                views: {
                    'action@': {
                        templateUrl: '/views/users/edit.html',
                        controller: 'UserCtrl'
                    }
                }
            })
            .state('root.settings.roles', {
                // url: '/settings',
                views: {
                    'settings@': {
                        templateUrl: '/views/roles/display.html',
                        controller: 'UserCtrl'
                    },
                }
            })
            .state('root.settings.roles.list', {
                url: '/settings/roles/list',
                views: {
                    'action@': {
                        templateUrl: '/views/roles/list.html',
                        controller: 'RoleCtrl'
                    },
                }
            })
            .state('root.settings.roles.add', {
                url: '/settings/roles/add',
                views: {
                    'action@': {
                        templateUrl: '/views/roles/add.html',
                        controller: 'RoleCtrl'
                    },
                }
            })
            .state('root.settings.roles.edit', {
                url: '/settings/roles/:id',
                views: {
                    'action@': {
                        templateUrl: '/views/roles/edit.html',
                        controller: 'RoleCtrl'
                    },
                }
            })
            .state('root.settings.auths', {
                url: '/settings/auths',
                views: {
                    'settings@': {
                        templateUrl: '/views/auths/display.html',
                        controller: 'AuthCtrl'
                    },
                }
            })
            .state('root.settings.auths.list', {
                url: '/settings/auths/list',
                views: {
                    'action@': {
                        templateUrl: '/views/auths/list.html',
                        controller: 'AuthCtrl'
                    },
                }
            })
            .state('root.settings.auths.add', {
                url: '/settings/auths/add',
                views: {
                    'action@': {
                        templateUrl: '/views/auths/add.html',
                        controller: 'AuthCtrl'
                    },
                }
            })
            .state('root.settings.auths.edit', {
                url: '/settings/auths/:id',
                views: {
                    'action@': {
                        templateUrl: '/views/auths/edit.html',
                        controller: 'AuthCtrl'
                    }
                }
            })
            .state('root.auths', {
                url: '/auths',
                views: {
                    'container@': {
                        templateUrl: 'views/auths/show.html',
                        controller: 'AuthCtrl',
                    },
                }

            })
            .state('login', {
                url: '/login',
                views: {
                    'container@': {
                        templateUrl: '/views/login.html',
                        controller: 'LoginCtrl'
                    },
                }
            })
        // .state('rplogin', {
        //     url: '/login',
        //     templateUrl: 'views/login.html',
        //     controller: 'LoginCtrl',
        // });
        .state('users', {
            url: '/users',
            templateUrl: 'views/users/show.html',
            controller: 'UserCtrl'
        })
            .state('equipments', {
                url: '/equipments',
                templateUrl: 'views/equipments/show.html',
                controller: 'EquipmentCtrl'
            })
            .state('connections', {
                url: '/connections',
                templateUrl: 'views/connections/show.html',
                controller: 'ConnectionCtrl'
            })
        // console.log('http');

        $urlRouterProvider.otherwise('/');
    }
]);
app.run(['$sails', 'User', '$state', '$rootScope',
    function(socket, User, $state, $rootScope) {
        // var session = false;-
        // Make a remote request.
        // console.log('http');
        // console.log(User.current);
        // User.info().then(function(data) {
        //     // redirect if user not connected
        //     console.log(data);
        //     if (data.code === '403') {

        //         $state.go('login')
        //     } else {
        //         User.current = data
        //     }
        // })
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            User.getId().then(function(data) {
                // console.log(data);
                if (data.id == null && toState.name !== 'login') {
                    // User isn’t authenticated
                    // console.log(toState);
                    event.preventDefault();
                    $state.transitionTo("login");
                } else {
                    User.id = data.id;
                    event.preventDefault();
                }
            })
        });
    }
])
