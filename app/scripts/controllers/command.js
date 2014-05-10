'use strict';

Application.Controllers.controller('CommandCtrl', ['$scope', 'Command', '$state', 'ngTableParams', '$filter', '$stateParams', 'Role',
    function($scope, Command, $statem, TableParams, $filter, $stateParams, Role) {

        $scope.tableParams = new TableParams({
            page: 1, // show first page
            count: 4, // count per page
            sorting: {
                name: 'asc' // initial sorting
            }
        }, {
            // total: 10, // length of data
            getData: function($defer, params) {
                // ajax request to api
                Command.list().success(function(data) {
                    // console.log(data);
                    // filtering and sorting
                    var filteredData = params.filter() ?
                        $filter('filter')(data, params.filter()) :
                        data;
                    var orderedData = params.sorting() ?
                        $filter('orderBy')(filteredData, params.orderBy()) :
                        data;

                    params.total(data.length);
                    // set new data
                    $scope.commands = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
                    $defer.resolve($scope.commands);
                });
            }
        });
        var userId, id;
        // subscribe to commands changes
        // Command.subscribe();
        // $scope.$watch('commands', function() {
        $scope.add = function() {
            Command.add($scope.command).success(function(data) {
                console.log(data);
            });
        };

        $scope.edit = function() {
            Command.update($scope.command).success(function(data) {
                console.log(data);
            });
        }

        $scope.delete = function(id) {
            Command.delete(id).success(function(data) {
                $scope.tableParams.reload();
                console.log($scope.commands);
            });
        }
        // })
        Command.onEvent({
            // callbacks to model events
            created: function(res) {
                $scope.commands.push(res.data);
                //         $scope.tableParams.reload();
            },
            destroyed: function(res) {
                id = getById($scope.commands, res.id);
                // filter result
                $scope.commands = $scope.commands.filter(function(x) {
                    if (x.id !== res.id) return x;
                })
                // console.log($scope.commands);
                // $scope.tableParams.reload();
            },
            updated: function(res) {
                id = getById($scope.commands, res.id);
                var user = $scope.commands[id];
                user.name = res.data.name || user.name;
                user.email = res.data.email || user.email;
                if (res.data.online !== undefined) {
                    user.online = res.data.online;
                }
                // $scope.tableParams.reload();
            }
        });

        // get 
        Role.list().success(function(data) {
            // console.log(data);
            $scope.roles = data;

        });
        
        var displayCommands = function() {
            Command.list().success(function(data) {
                $scope.commands = data;
            });
        };

        if ($stateParams.id) {
            // get id 
            Command.get($stateParams.id).success(function(data) {
                $scope.command = data;
                // console.log(data);
            })
        }
    }
]);
