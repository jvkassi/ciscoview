/**
 * CommandController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    subscribe: function(req, res) {
        console.log("subscribing..")
        // Find all current users in the user model
        Command.find({}).exec(function found(err, commands) {
            if (err) return next(err);

            // subscribe this socket to new create users
            Command.watch(req.socket);

            // subscribe this socket to existing users
            Command.subscribe(req.socket, commands);

            // This will avoid a warning from the socket for trying to render
            // html over the socket.
            res.send(200);
        });
    },
};
