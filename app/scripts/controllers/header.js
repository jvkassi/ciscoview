'use strict';

Application.Controllers.controller('HeaderCtrl', ['$scope', 'UserService', '$state',
    function($scope, User, $state) {
    	$scope.logout = function() {
    		User.logout(function(data){
    			console.log(data);
    			$state.go('login');
    		})
    	}
    }
]);
