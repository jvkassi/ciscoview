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

// HomePage Controller
Application.Controllers.controller('ShellCtrl', ['$scope', 'Connection', '$state', 'User', 'Command', 'user', '$stateParams',

    function($scope, Connection, $state, User, Command, user, $stateParams) {

        // $scope.output = $stateParams.id
        // console.log($stateParams)
        // $scope.sendCmd = function() {
        //     Connection.sendCmd({
        //         cmd: $scope.cmd
        //     });
        //     $scope.cmd = "";
        // };

        $scope.interfaces = [];

        // exec function and display output
        $scope.exec = function(cmd) {

            $scope.output = "";
            var d = {};
            d.host_id = $stateParams.id;
            d.auth_id = $scope.auth;
            if (!cmd) {
                d.cmd = $scope.cmd;
            } else {
                d.cmd = cmd;
            }
            // console.log(d);
            Connection.connect(d).success(function(data) {
                // console.log(data);
                $scope.output = decodeURI(data.output);
            });
        }

        $scope.getInterfaces = function() {
            $scope.output = "";
            var d = {};
            d.host_id = $stateParams.id;
            d.auth_id = $scope.auth;
            // d.cmd = $scope.cmd;
            // console.log(d);
            Connection.getInterfaces(d).success(function(data) {
                // console.log(data);
                $scope.interfaces = data.output;
            });
        }

        $scope.statusInterface = function(int) {
            console.log(int);
            var cmd = "show ip interface "
            if (!int) {
                cmd += "br"
            } else {
                cmd += int
            }
            console.log(cmd);

            $scope.exec(cmd);
        }

        // receive interfaces
        Connection.on('interfaces', function(data) {
            // output
            // console.log(data)
            $scope.interfaces = data;
        });

        // receive command output
        Connection.on('output', function(data) {
            console.log(data)
            var output = decodeURI(data.output);
            $scope.output += '\n' + output;
        });

        var displayEquipments = function() {
            Equipment.list().success(function(data) {
                // console.log(data);
                if (data.err && data.code === 403) {
                    $state.go('login');
                }
                $scope.equipments = data;
                // $scope.test = data;
            });
        };

        var displayAuths = function() {
            User.auths().success(function(data) {
                // console.log(data);
                $scope.auths = data;
            });
        }

        var displayCommands = function() {
            Command.list().success(function(data) {
                // console.log(data);
                $scope.commands = data.filter(function(x) {
                    // console.log(x);
                    if (x.role.privilege <= user.role.privilege) {
                        return x
                    }
                })

            });
        }
        // displayEquipments();
        displayAuths();
        displayCommands();
        // Equipment.onReconnect(displayEquipments);
    }
]);
