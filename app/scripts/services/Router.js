'use strict';

Application.Services.factory('RouterService', ['$sails', 'GenericService',
    function Router(socket, generic) {

        var Router = {};
        inherit(Router, generic)

        Router.init('router');

        return Router;

    }
]);
