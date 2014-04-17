'use strict';


Application.Controllers.controller('UserCtrl', ['$scope', 'UserService', '$state',
    function($scope, User, $state) {

        User.subscribe();
        // console.log(User);
        User.onEvent(function(res) {
            console.log(res);
            if (res.verb === 'created') {
                $scope.users.push(res.data);
            } else if (res.verb === 'destroyed') {
                var user_id = res.id;
                var id = getById($scope.users, user_id);
                $scope.users.pop(id);
            } else if (res.verb === 'updated') {
                var user_id = res.id;
                var id = getById($scope.users, user_id);
                $scope.users[id] = res.data;
            }
        })

        var displayUsers = function() {
            User.list().success(function(data) {
                if(data.err &&  data.code == 403 ) $state.go('login') 
                $scope.users = data;
                // $scope.test = data;
            })
                .error(function(data) {
                    console.log(data);
                })
        }
        displayUsers();
        User.onReconnect(displayUsers);
    }
]);
