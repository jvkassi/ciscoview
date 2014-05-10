'use strict';


Application.Controllers.controller('LoginCtrl', ['$scope', 'User', '$state',
    function($scope, User, $state) {

        // html class
        angular.element(document.getElementsByTagName('html')).addClass('login-pf')
        
        // login function
        $scope.login = function() {
            User.login($scope.user)
                .then(function(data) {
                    // console.log(io.JSON.parse(data));
                    console.log(data);
                    if (data.err) {
                        // display error message
                        $scope.message = {};
                        $scope.message.log = "Email or Username non valide";
                        $scope.message.type = "Error"
                    } else {
                        // set current user
                        User.current = data;
                        // go home
                        $state.go('root.dashboard');
                    }
                });
        };

    }
])
