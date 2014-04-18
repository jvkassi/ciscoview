'use strict';

Application.Services.factory('ConnectionService', ['$sails', 'GenericService',
    function Router(socket, generic) {

        var Connection = {};
        inherit(Connection, generic)

        Connection.init('connection');

        Connection.connect = function(data) {
        	return socket.get('/api/connections/connect')
        }

        Connection.sendCmd = function(data) {
        	return socket.post('/api/connections/cmd', data)
        }

        return Connection;

    }
]);
