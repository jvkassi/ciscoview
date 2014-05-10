/**
 * RoleController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	subscribe: function(req, res) {
        console.log("subscribing..")
        // Find all current users in the user model
        Role.find(function found(err, users) {
            if (err) return next(err);

            // subscribe this socket to new create users
            Role.watch(req.socket);

            // subscribe this socket to existing users
            Role.subscribe(req.socket, users);

            // This will avoid a warning from the socket for trying to render
            // html over the socket.
            res.send(200);
        });
    },
};
