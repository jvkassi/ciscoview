'use strict';

Application.Controllers.controller('RoleCtrl', ['$scope', 'Role', '$state', 'ngTableParams', '$filter', '$stateParams',
    function($scope, Role, $statem, TableParams, $filter, $stateParams) {

        $scope.tableParams = new TableParams({
            page: 1, // show first page
            count: 4, // count per page
            sorting: {
                name: 'asc' // initial sorting
            }
        }, {
            // counts: [],
            // total: 10, // length of data
            getData: function($defer, params) {
                // ajax request to api
                Role.list().success(function(data) {
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
                    $scope.roles = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
                    $defer.resolve($scope.roles);

                });
            }
        });
        var userId, id;
        // subscribe to roles changes
        // Role.subscribe();
        // $scope.$watch('roles', function() {
        $scope.add = function() {
            Role.add($scope.role).success(function(data) {
                console.log(data);
            });
        };

        $scope.edit = function() {
            Role.update($scope.role).success(function(data) {
                console.log(data);
            });
        }

        $scope.delete = function(id) {
            Role.delete(id).success(function(data) {
                $scope.tableParams.reload();
                console.log($scope.roles);
            });
        }
        // })
        Role.onEvent({
            // callbacks to model events
            created: function(res) {
                $scope.roles.push(res.data);
                //         $scope.tableParams.reload();
            },
            destroyed: function(res) {
                id = getById($scope.roles, res.id);
                // filter result
                $scope.roles = $scope.roles.filter(function(x) {
                    if (x.id !== res.id) return x;
                })
                // console.log($scope.roles);
                // $scope.tableParams.reload();
            },
            updated: function(res) {
                id = getById($scope.roles, res.id);
                var user = $scope.roles[id];
                user.name = res.data.name || user.name;
                user.email = res.data.email || user.email;
                if (res.data.online !== undefined) {
                    user.online = res.data.online;
                }
                // $scope.tableParams.reload();
            }
        });
        var displayRoles = function() {
            Role.list().success(function(data) {
                $scope.roles = data;
            });
        };

        if ($stateParams.id) {
            // get id 
            Role.get($stateParams.id).success(function(data) {
                $scope.role = data;
                // console.log(data);
            })
        }
    }
]);
