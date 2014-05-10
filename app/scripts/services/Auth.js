'use strict';

Application.Services.factory('Auth', ['$sails', 'GenericService',
    function (socket, generic) {

        var Auth = {};
        inherit(Auth, generic);
        Auth.init('auth');
        return Auth;

    }
]);
