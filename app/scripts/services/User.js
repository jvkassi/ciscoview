'use strict';

Application.Services.service('userService', ['$sails',
    function User(socket) {

        socket.on('connect', function() {
            socket.get('/api/users/subscribe')
        })

        this.info = function(id) {
            return socket.get('/api/users/' + id);
        }
        this.list = function() {
            return socket.get('/api/users')
        }

        this.onMessage = function(cb) {
            socket.on('message', cb);
        }

        this.create = function(data) {
            return socket.post('/api/users', data);
        }

        this.delete = function(data) {
            return socket.delete('/api/users', data);
        }

        this.put = function(data) {

            return socket.put('/api/users', data);
        }

        this.login = function(data) {
            return socket.post('/api/sessions', data);
        }

    }
]);
