'use strict';

Application.Controllers.controller('ConnectionCtrl', ['$scope', 'Connection', '$state', 'ngTableParams', '$filter', '$stateParams',
    function($scope, Connection, $statem, TableParams, $filter, $stateParams) {

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
                Connection.list().success(function(data) {
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
                    $scope.connections = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
                    $defer.resolve($scope.connections);

                });
            }
        });
        var userId, id;
        // subscribe to connections changes
        // Connection.subscribe();
        // $scope.$watch('connections', function() {
        $scope.add = function() {
            Connection.add($scope.connection).success(function(data) {
                console.log(data);
            });
        };

        $scope.edit = function() {
            Connection.update($scope.connection).success(function(data) {
                console.log(data);
            });
        }

        $scope.delete = function(id) {
            Connection.delete(id).success(function(data) {
                console.log(data);
            });
        }
        // })
        Connection.onEvent({
            // callbacks to model events
            created: function(res) {
                $scope.connections.push(res.data);
                //         $scope.tableParams.reload();
            },
            destroyed: function(res) {
                id = getById($scope.connections, res.id);
                // filter result
                $scope.connections = $scope.connections.filter(function(x) {
                    if (x.id !== res.id) return x;
                })
                // $scope.tableParams.reload();
            },
            updated: function(res) {
                id = getById($scope.connections, res.id);
                var user = $scope.connections[id];
                user.name = res.data.name || user.name;
                user.email = res.data.email || user.email;
                if (res.data.online !== undefined) {
                    user.online = res.data.online;
                }
                // $scope.tableParams.reload();
            }
        });
        var displayConnections = function() {
            Connection.list().success(function(data) {
                $scope.connections = data;
            });
        };

        if ($stateParams.id) {
            // get id 
            Connection.get($stateParams.id).success(function(data) {
                $scope.connection = data;
                // console.log(data);
            })
        }
    }
]);
