'use strict';

Application.Controllers.controller('UserCtrl', ['$scope', 'User', '$state', 'ngTableParams', '$filter', '$stateParams', 'Role',
    function($scope, User, $statem, TableParams, $filter, $stateParams, Role) {


        $scope.user = 0;
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
                User.list().success(function(data) {
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
                    $scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
                    $defer.resolve($scope.users);
                });
            }
        });
        var userId, id;
        // subscribe to users changes
        // User.subscribe();
        // $scope.$watch('users', function() {
        $scope.add = function() {
            User.add($scope.user).success(function(data) {
                console.log(data);
            });
        };

        $scope.edit = function() {
            User.update($scope.user).success(function(data) {
                console.log(data);
            });
        }

        $scope.delete = function(id) {
            User.delete(id).success(function(data) {
                $scope.tableParams.reload();
                console.log($scope.users);
            });
        }
        // })
        User.onEvent({
            // callbacks to model events
            created: function(res) {
                $scope.users.push(res.data);
                //         $scope.tableParams.reload();
            },
            destroyed: function(res) {
                id = getById($scope.users, res.id);
                // filter result
                $scope.users = $scope.users.filter(function(x) {
                    if (x.id !== res.id) return x;
                })
                // console.log($scope.users);
                // $scope.tableParams.reload();
            },
            updated: function(res) {
                id = getById($scope.users, res.id);
                var user = $scope.users[id];
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

        var displayUsers = function() {
            User.list().success(function(data) {
                $scope.users = data;
            });
        };

        if ($stateParams.id) {
            // get id 
            User.get($stateParams.id).success(function(data) {
                $scope.user = data;
                // console.log(data);
            })
        }
    }
]);
