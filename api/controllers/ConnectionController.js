/**
 * ConnectionController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var SSH = require('ssh2');
var shell = 0;
var cmd;
var output = 0;
var connected = false;
var connection = 0;
var sendOutput = function(output) {};

module.exports = {

    connect: function(req, res) {

        // Connection.findOne('53512b91cdd764ba4cd4d276').populate('router').exec(function foundUser(err, conn) {

        // console.log(conn);

        var c = new SSH();
        if (!connection.connected) {

            c.connect({
                host: '10.200.200.2',
                port: 22,
                username: 'jean',
                password: 'jean',
                // host: '10.100.0.163',
                // port: 22,
                // username: 'smile-dev2',
                // password: 'smileci'
            })
            c.on('ready', function() {
                console.log('connected');

                Connection.create({
                    router: '53512b91cdd764ba4cd4d276',
                    auth: '534f45755bb351ca47630a03',
                    connected: true
                }, function(err, conn) {
                    connection = conn;

                    c.shell(function(err, stream) {
                        shell = stream;
                        shell.on('data', function(data, extended) {

                            var output = data.toString('utf-8')
                            // conn.output = output
                            // conn.save();
                            // console.log(cmd);
                            // check output 
                            d = output.split('\n')
                            console.log(d);
                            d.forEach(function(line) {

                                if (line.length > 2 && line.indexOf("Building") == -1) {
                                    console.log(line);
                                    // console.log(connId);
                                    // Log.create({
                                    //     connection: connId,
                                    //     command: connection.id
                                    // })
                                    sendOutput(line);
                                }

                            })


                            // }
                            // console.log(data.toString('utf-8'))
                            // if (output.toString.length > 1) {

                            //     console.log(output);
                            // }

                        })

                        // shell.write('enable\n')
                        // shell.write('jean\n')
                        // shell.write('terminal length 0\n')

                        // callback
                        sendOutput = function(data) {
                            // console.log(output);
                            res.json({
                                output: encodeURI(data)
                            });
                        }
                        //stream.write('show running\n')
                        // stream.write('\n')
                        //stream.write('\n')
                    });
                });
            })

            c.on('error', function(err) {
                console.log('Connection :: error :: ' + err);
            });
            c.on('end', function() {
                console.log('Connection :: end');
            });
            c.on('close', function(had_error) {
                console.log('Connection :: close');
                Connection.destroy(connection.id);
            });
        }else {
            shell.write('\n');
        }


    },
    cmd: function(req, res) {
        cmd = req.param('cmd')
        shell.write(cmd + '\n');
        var io = sails.io;
        // shell.write(cmd + '\n');

        // callback
        sendOutput = function(data) {
            // console.log(output);
            io.sockets.emit('output', {
                output: encodeURI(data)
            });
            res.json({
                output: encodeURI(data)
            });

            // Connection.findOne('53512c37878d45b14d133374', function foundUser(err, conn) {

            //     }
            // }
        }
    }
}
