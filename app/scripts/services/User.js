'use strict';

Application.Services.factory('UserService', ['$sails', 'GenericService',
    function User(socket, generic) {

        var User = {};
        inherit(User, generic)

        User.init('user');

        User.login = function(data) {
            return socket.post('/api/sessions', data);
        }

        User.logout = function(data) {
            return socket.delete('/api/sessions');
        }

        return User;

    }
]);
