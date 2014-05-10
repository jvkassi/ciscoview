'use strict';

Application.Services.factory('Role', ['$sails', 'GenericService',
    function (socket, generic) {

        var Role = {};
        inherit(Role, generic);
        Role.init('role');
        return Role;

    }
]);
