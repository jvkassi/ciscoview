/**
 * ConnectionController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var q = require('q');
var SSH = require('ssh2');
var Converter = require("csvtojson").core.Converter;
var fs = require("fs");

module.exports = {
    connect: function(req, res, next) {

        var ssh = new SSH();
        // var host_ip = req.param('host_ip')
        // var auth_id = req.param('auth_id')
        // console.log(req.params.all());
        var host_ip = req.param('host_ip'),
            host_id = req.param('host_id'),
            host_secret = req.param('host_secret')
            auth_id = req.param('auth_id'),
            cmd = req.param('cmd');
        // console.log(auth_id);
        // var host_ip = '10.200.200.2';
        // var host_id = '535a90c5ac3a28b118a19f8a';
        // var auth_id = "535418535098ac220bd13952";

        // callback : send data by socket
        sendOutput = function(data) {
            req.socket.emit('output', {
                output: encodeURI(data)
            });
            // res.json({
            //     output: encodeURI(data)
            // });
        }
        // console.log(auth);
        // console.log(ssh._state);
        // if (ssh._state == 'closed') {
        // if (shell.write) {
        // find auth
        Auth.findOne(auth_id).exec(function(err, auth) {

            // terminate if error
            if (err) next(err);

            Host.findOne(host_id).exec(function(err, host) {

                // terminate if error
                if (err) next(err);

                // connect to host
                ssh.connect({
                    host: host.ip,
                    port: 22,
                    username: auth.username,
                    password: auth.password,
                })

                // on ready
                ssh.on('ready', function() {
                    console.log('connected');
                    // TODO : search by assocation equipment and auth
                    // find or create connection
                    // Connection.findOrCreate({
                    //     equipment: host_id,
                    //     auth: auth_id,
                    // }, {
                    //     equipment: host_id,
                    //     auth: auth_id,
                    //     connected: true
                    // }).exec(function(err, connection) {
                    //     console.log(connection)
                    // })
                    // if (!connection.connected) {
                    //     connection.connected = true;
                    //     connection.equipment = connection.equipment.toString();
                    //     connection.auth = connection.auth.toString();
                    //     connection.save();
                    // }

                    ssh.shell(function(err, shell) {
                        // set shell
                        // set enable secret
                        // shell.write('\n');
                        shell.write('enable\n');
                        shell.write(host.secret + '\n');
                        // set terminal length 0, skip more
                        shell.write('terminal length 0\n');
                        // shell = stream;
                        shell.on('data', function(data, extended) {
                            // Stringify output 
                            var output = data.toString('utf-8')
                            // console.log(output);
                            // split carriage return
                            // d = output.split('\n')
                            // log command output
                            // Log.create({
                            //     // connection: connection.id,
                            //     command: cmd,
                            //     output: output
                            // }, function() {
                            // d.forEach(function(line) {
                            // Validate output
                            if (output.length > 2) {
                                // || line.indexOf('!') == 0) {
                                sendOutput(output);
                            }

                            // })
                            // })
                        })
                        // exec cmd
                        shell.write(cmd + '\n');
                        // ssh.end();

                    })

                })

                ssh.on('end', function(err) {
                    // connection = 0
                    console.log('Connection :: error :: ' + err);
                })
                ssh.on('close', function(err) {
                    // connection = 0
                    console.log('Connection :: close');
                })

            })
        })

        // } else {
        //     console.log('already connected')
        //     // only exec cmc if already connected
        //     shell.write('\n');
        //     // exec command         
        //     // shell.write('enable\n')
        //     // shell.write(auth.secret + '\n')
        //     // shell.write('terminal length 0\n')
        //     shell.write(cmd + '\n')

        // }

    },
    cmd: function(req, res, next) {
        cmd = req.param('cmd')
        shell.write(cmd + '\n');
        var io = sails.io;
        // shell.write(cmd + '\n');

        // callback
        sendOutput = function(data) {
            // console.log(output);
            // console.log(data);
            req.socket.emit('output', {
                output: encodeURI(data)
            });
            res.json({
                output: encodeURI(data)
            });
        }
    },
    exec: function(req, res, next) {
        cmd = req.param('exec')
        shell.write(cmd + '\n');
        var io = sails.io;
        // shell.write(cmd + '\n');

        // callback
        sendOutput = function(data) {
            // console.log(output);
            // console.log(data);
            req.socket.emit('output', {
                output: encodeURI(data)
            });
            res.json({
                output: encodeURI(data)
            });
            ssh.end();
        }
    },
    subscribe: function(req, res, next) {
        console.log("subscribing..")
        // Find all current connections in the connection model
        Connection.find(function(err, connections) {
            if (err) return next(err);
            // subscribe this socket to new create users
            Connection.watch(req.socket);
            // subscribe this socket to existing users
            Connection.subscribe(req.socket, connections);

            // This will avoid a warning from the socket for trying to render
            // html over the socket.
            res.send(200);
        });
    },
    interfaces: function(req, res, next) {

        var ssh = new SSH(),
            host_ip = req.param('host_ip'),
            host_id = req.param('host_id'),
            host_secret = req.param('host_secret')
            auth_id = req.param('auth_id'),
            cmd = req.param('cmd');
        // callback : send data by socket
        var parseInterfaces = function(raw) {
            //new converter instance
            var param = {
                'delimiter': ' '
            };
            var csvConverter = new Converter(param);

            csvConverter.fromString(raw, function(err, data) {
                if (err) {
                    //err handle
                }
                // remove hostname#
                data = data.filter(function(x) {
                    if (x.Interface.indexOf('#') == -1) return x
                })
                ssh.end();
                req.socket.emit('interfaces', data);
            });
        }

        Auth.findOne(auth_id).exec(function(err, auth) {

            // terminate if error
            if (err) next(err);

            Host.findOne(host_id).exec(function(err, host) {
                // terminate if error
                if (err) next(err);
                // connect to host
                ssh.connect({
                    host: host.ip,
                    port: 22,
                    username: auth.username,
                    password: auth.password,
                })

                // on ready
                ssh.on('ready', function() {
                    console.log('connected');
                    // TODO : search by assocation equipment and auth
                    ssh.shell(function(err, shell) {
                        // shell = stream;
                        shell.on('data', function(data, extended) {
                            // Stringify output 
                            var output = data.toString('utf-8')
                            // console.log(output);
                            if (output.indexOf('Interface') > -1) {
                                parseInterfaces(output);
                            }
                        })
                        // shell.write('\n');
                        shell.write('enable\n');
                        shell.write(host.secret + '\n');
                        // set terminal length 0, skip more
                        shell.write('terminal length 0\n');
                        // exec cmd
                        shell.write('show ip interface brief' + '\n');
                        // ssh.end();
                    })

                })

                ssh.on('end', function(err) {
                    // connection = 0
                    console.log('Connection :: error :: ' + err);
                })
                ssh.on('close', function(err) {
                    // connection = 0
                    console.log('Connection :: close');
                })

            })
        })
    },
}
