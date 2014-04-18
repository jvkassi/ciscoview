'use strict';

Application.Services.service('GenericService', ['$sails',
    function Generic(socket) {

        this.api = "";

        this.getApi = function() {
            return this.api;
        }
        this.init = function(model) {
            this.api = model;
            // console.log(model);
        };

        this.subscribe = function() {
            socket.on('connect', function() {
                socket.get('/api/' + this.api + 's/subscribe')
            });
        };

        this.info = function(id) {
            return socket.get('/api/' + this.api + 's/' + id);
        };
        
        this.list = function() {
            return socket.get('/api/' + this.api + 's/')
        };

        this.onEvent = function(cb) {
            socket.on(this.api, cb);
        };

        this.on = function(event, cb) {
            socket.on(event, cb);
        };

        this.onReconnect = function(cb) {
            socket.on('reconnect', cb);
        };

        this.create = function(data) {
            return socket.post('/api/' + this.api + 's', data);
        };

        this.delete = function(data) {
            return socket.delete('/api/' + this.api + 's', data);
        };

        this.update = function(data) {
            return socket.put('/api/' + api + 's', data);
        };

    }
]);
