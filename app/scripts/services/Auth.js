'use strict';

Application.Services.factory('AuthService', ['$sails', 'GenericService',
    function Auth(socket, generic) {

        var Auth = {};
        inherit(Auth, generic)

        Auth.init('auth');

        return Auth;

    }
]);
