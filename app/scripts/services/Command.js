'use strict';

Application.Services.factory('Command', ['$sails', 'GenericService',
    function (socket, generic) {

        var Auth = {};
        inherit(Auth, generic);
        Auth.init('command');
        return Auth;

    }
]);
