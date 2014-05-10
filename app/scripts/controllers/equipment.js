'use strict';

Application.Controllers.controller('EquipmentCtrl', ['$scope', 'Equipment', '$state', 'ngTableParams', '$filter','$stateParams',
    function($scope, Equipment, $statem, TableParams, $filter, $stateParams) {

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
                Equipment.list().success(function(data) {
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
                    $scope.equipments = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
                    $defer.resolve($scope.equipments);

                });
            }
        });
        var userId, id;
        // subscribe to equipments changes
        // Equipment.subscribe();
        // $scope.$watch('equipments', function() {
        $scope.add = function() {
            Equipment.add($scope.equipment).then(function(data) {
                console.log(data);
            });
        };

        $scope.edit = function() {
            Equipment.update($scope.equipment).success(function(data) {
                console.log(data);
            });
        };

        $scope.destroy = function(id) {
            Equipment.destroy(id).success(function(data) {
                console.log(data);
            });
        }

        $scope.changeSelection = function(router) {
            $scope.router = router;
            // console.info(router);
        }
        
        // })
        Equipment.onEvent({
            // callbacks to model events
            created: function(res) {
                $scope.equipments.push(res.data);
                //         $scope.tableParams.reload();
            },
            destroyed: function(res) {
                id = getById($scope.equipments, res.id);
                // filter result
                $scope.equipments = $scope.equipments.filter(function(x) {
                    if (x.id !== res.id) return x;
                })
                // $scope.tableParams.reload();
            },
            updated: function(res) {
                id = getById($scope.equipments, res.id);
                var user = $scope.equipments[id];
                user.name = res.data.name || user.name;
                user.email = res.data.email || user.email;
                if (res.data.online !== undefined) {
                    user.online = res.data.online;
                }
                // $scope.tableParams.reload();
            }
        });
        var displayEquipments = function() {
            Equipment.list().success(function(data) {
                $scope.equipments = data;
            });
        };
        // displayEquipments();
        Equipment.onReconnect(displayEquipments);


        if ($stateParams.id) {
            // get id 
            Equipment.get($stateParams.id).success(function(data) {
                $scope.equipment = data;
                // console.log(data);
            })
        }
    }
]);
