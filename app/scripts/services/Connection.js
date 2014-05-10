'use strict';

Application.Services.factory('Connection', ['$sails', 'GenericService',
    function (socket, generic) {

        var Connection = {};
        inherit(Connection, generic);

        Connection.init('connection');

        Connection.connect = function(data) {
            return socket.post('/api/connections/connect', data)
        };

        Connection.sendCmd = function(data) {
            return socket.post('/api/connections/cmd', data)
        };

        Connection.getInterfaces = function(data) {
            return socket.post('/api/connections/interfaces', data)
        }

          Connection.getStatusInterface = function(data) {
            return socket.post('/api/connections/statusInterfaces', data)
        }

        return Connection;

    }
]);
