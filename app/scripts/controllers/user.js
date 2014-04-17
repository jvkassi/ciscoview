'use strict';

function getById(arr, id) {
    for (var d = 0, len = arr.length; d < len; d += 1) {
        if (arr[d].id === id) {
            return d;
        }
    }
}
Application.Controllers.controller('UserCtrl', ['$scope', 'userService', '$sails',
    function($scope, User, socket) {
       

        User.onMessage(function(res) {
            // console.log(res);
            if (res.verb === 'create') {
                $scope.users.push(res.data);
            } else if (res.verb === 'destroy') {
                var user_id = res.id;
                var id = getById($scope.users, user_id);
                $scope.users.pop(id);
            } else if (res.verb === 'update') {
                var user_id = res.id;
                var id = getById($scope.users, user_id);
                $scope.users[id] = res.data;
            }
        })

        User.list().success(function(data) {
            // console.log(data);
            $scope.users = data;
            // $scope.test = data;
        });
    }
]);
