'use strict';


Application.Controllers.controller('LoginCtrl', ['$scope', 'UserService', '$state',
    function($scope, User, $state) {

        $scope.login = function() {
            User.login($scope.user)
                .success(function(data) {
                	if(data.err) return
                    console.log(data);
                    $state.go('home');
                });
                
        };

    }
])
