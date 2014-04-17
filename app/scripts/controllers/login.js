'use strict';


Application.Controllers.controller('LoginCtrl', ['$scope', 'UserService',
    function($scope, User) {

        $scope.login = function() {
            User.login($scope.user)
                .success(function(data) {
                    console.log(data);
                });
        };

    }
])
