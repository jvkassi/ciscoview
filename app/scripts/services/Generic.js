'use strict';

Application.Services.service('GenericService', ['$sails',
    function Router(socket) {


        var api = "";
        this.init = function(model) {
            api = model;
        }

        this.subscribe = function() {
            socket.on('connect', function() {
                socket.get('/api/' + api + 's/subscribe')
            })
        }

        this.info = function(id) {
            return socket.get('/api/' + api + 's/' + id);
        }
        
        this.list = function() {
            return socket.get('/api/' + api + 's/')
        }

        this.onEvent = function(cb) {
            socket.on(api, cb);
        }

        this.onReconnect = function(cb) {
            socket.on('reconnect', cb);
        }

        this.create = function(data) {
            return socket.post('/api/' + api + 's', data);
        }

        this.delete = function(data) {
            return socket.delete('/api/' + api + 's', data);
        }

        this.update = function(data) {
            return socket.put('/api/' + api + 's', data);
        }

    }
]);
