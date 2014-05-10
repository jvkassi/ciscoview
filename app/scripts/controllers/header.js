'use strict';

Application.Controllers.controller('HeaderCtrl', ['$scope', 'user', '$state', '$window', 'User', '$sails',
    function($scope, user, $state, $window, User, socket) {

        $scope.$state = $state;
        // header collapse
        $scope.isCollapsed = true;
        // set socket
        $scope.socket = socket;
        // console.log(socket);
        // get user info
        $scope.user = user;
        var win = angular.element($window);
        // resize content 
        var resizeContent = function() {
            var header = document.getElementsByTagName('header')[0];
            var footer = document.getElementsByTagName('footer')[0];
            var body = document.getElementsByTagName('body')[0];
            var content = document.getElementsByClassName('container-fluid')[0];
            var size = body.clientHeight - header.clientHeight
            if (body.clientWidth > 770) {
                content.style.height = size + 'px';
            } else {
                content.style.height = null;
            }
        }
        // bind event 
        win.bind("resize", resizeContent);
        // start resize
        resizeContent();

        // logout user
        $scope.logout = function() {
            User.logout().success(function(data) {
                //console.log(data);
                User.current = undefined;
                $state.go('login');
            });
        };
    }
]);
