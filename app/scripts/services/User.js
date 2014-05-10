'use strict';

Application.Services.factory('User', ['$sails', 'GenericService',
    function (socket, generic) {

        var User = {};

        User.current = undefined;
        inherit(User, generic);
        // User.id = null;
        User.init('user');

        User.login = function(data) {
            return socket.post('/api/sessions', data);
        };

        User.logout = function() {
            return socket.delete('/api/sessions');
        };

        User.info = function() {
            return socket.get('/api/users/info');
        };

        User.getId = function() {
            return socket.get('/api/sessions');
        };

        User.auths = function() {
        //     User.info().then(function(data) {
        //     // redirect if user not connected
        //     console.log(data);
        //     if (data.code === '403') {
        //         $state.go('login')
        //     } else {
        //         User.current = data
        //     }
        // })
                return socket.get('/api/users/'+ User.id + '/auths');
            // console.log( User.current.id );
        };

        return User;

    }
]);
