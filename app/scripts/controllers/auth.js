'use strict';

Application.Controllers.controller('AuthCtrl', ['$scope', 'Auth', '$state', 'ngTableParams', '$filter', '$stateParams', 'Role','user',
    function($scope, Auth, $state, TableParams, $filter, $stateParams, Role, user) {

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
                Auth.list().success(function(data) {
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
                    $scope.auths = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
                    $defer.resolve($scope.auths);
                });
            }
        });
        var userId, id;
        // subscribe to auths changes
        // Auth.subscribe();
        // $scope.$watch('auths', function() {
        $scope.add = function() {
            $scope.auth.user = user.id;
            Auth.add($scope.auth).success(function(data) {
                console.log(data);
            });
        };

        $scope.edit = function() {
            Auth.update($scope.auth).success(function(data) {
                console.log(data);
            });
        }

        $scope.delete = function(id) {
            Auth.delete(id).success(function(data) {
                $scope.tableParams.reload();
                console.log($scope.auths);
            });
        }
        // })
        Auth.onEvent({
            // callbacks to model events
            created: function(res) {
                $scope.auths.push(res.data);
                //         $scope.tableParams.reload();
            },
            destroyed: function(res) {
                id = getById($scope.auths, res.id);
                // filter result
                $scope.auths = $scope.auths.filter(function(x) {
                    if (x.id !== res.id) return x;
                })
                // console.log($scope.auths);
                // $scope.tableParams.reload();
            },
            updated: function(res) {
                id = getById($scope.auths, res.id);
                var user = $scope.auths[id];
                user.name = res.data.name || user.name;
                user.email = res.data.email || user.email;
                if (res.data.online !== undefined) {
                    user.online = res.data.online;
                }
                // $scope.tableParams.reload();
            }
        });

        var displayAuths = function() {
            Auth.list().success(function(data) {
                $scope.auths = data;
            });
        };

        if ($stateParams.id) {
            // get id 
            Auth.get($stateParams.id).success(function(data) {
                $scope.auth = data;
                // console.log(data);
            })
        }
    }
]);
