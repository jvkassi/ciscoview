'use strict';

Application.Controllers.controller('MainCtrl', ['$scope', 'RouterService', 'ConnectionService',
    function($scope, Router, Connection) {
        $scope.currentUser = 0;
        $scope.output = "";
        console.log(Router.getApi());
        $scope.sendCmd = function() {
            Connection.sendCmd({
                cmd: $scope.cmd
            })
            // .success(function(data) {
            // 	var output = decodeURI(data.output)
            // 	console.log(output);
            // 	$scope.output +=  '\n' + output;
            // })
        }
        Router.on('output', function(data) {
            console.log(data);
            var output = decodeURI(data.output)
            if(output) $scope.output += '\n' + output;
            var textarea = document.getElementById('output');
            textarea.scrollTop = textarea.scrollHeight;
        })
        var displayRouters = function() {
            Router.list().success(function(data) {
                console.log(data);
                if (data.err && data.code == 403) $state.go('login')
                $scope.routers = data;
                // $scope.test = data;
            })
                .error(function(data) {
                    console.log(data);
                })
        }

        Connection.connect().success(function(data) {
            console.log(data);
            $scope.output = decodeURI(data.output)
        })
        displayRouters();
        Router.onReconnect(displayRouters);
    }
]);
