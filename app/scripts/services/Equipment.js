'use strict';

Application.Services.factory('Equipment', ['$sails', 'GenericService',
    function (socket, generic) {

        var Equipment = {};
        inherit(Equipment, generic);
        // model name
        Equipment.init('host');

        return Equipment;

    }
]);
