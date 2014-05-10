'use strict';

Application.Services.service('GenericService', ['$sails',
    function(socket) {

        var generic = this;
        this.api = "";

        this.getApi = function() {
            return this.api;
        };
        this.init = function(model) {
            this.api = model;
            // console.log(model);
            socket.get('/api/' + this.api + 's/subscribe')
        };

        // this.subscribe = function() {
        // socket.on('connect', function() {
        // });
        // };

        this.get = function(id) {
            return socket.get('/api/' + this.api + 's/' + id);
        };

        this.list = function() {
            return socket.get('/api/' + this.api + 's/');
        };

        this.onEvent = function(cb) {
            socket.on(this.api, function(res) {
                console.log(res);
                // listen to model events
                cb[res.verb](res)
                // switch(res.verb) {
                //     case 'created' : cb[res.verb]()
                // }
                // if (res.verb === 'created') {
                //     cb.created();
                // } else if (res.verb === 'destroyed') {
                //     cb.destroyed();
                //     // userId = res.id;
                //     // id = getById($scope.users, userId);
                //     // $scope.users.pop(id);
                // } else if (res.verb === 'updated') {
                //     cb.updated();
                //     // userId = res.id;
                //     // id = getById($scope.users, userId);
                //     // $scope.users[id] = res.data;
                // }
            });
        }

        this.on = function(event, cb) {
            socket.on(event, cb);
        };

        this.onReconnect = function(cb) {
            socket.on('reconnect', cb);
        };

        this.add = function(data) {
            return socket.post('/api/' + this.api + 's', data);
        };

        this.delete = function(id) {
            return socket.delete('/api/' + this.api + 's/' + id);
        };

        this.update = function(data) {
            return socket.put('/api/' + this.api + 's/' + data.id, data);
        };

    }
]);
