/**
 * RoutersController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
    subscribe: function(req, res) {
        console.log("subscribing..")
        // Find all current users in the user model
        Equipment.find(function found(err, users) {
            if (err) return next(err);

            // subscribe this socket to new create users
            Equipment.watch(req.socket);

            // subscribe this socket to existing users
            Equipment.subscribe(req.socket, users);

            // This will avoid a warning from the socket for trying to render
            // html over the socket.
            res.send(200);
        });
    },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to RoutersController)
   */
  // _config: {}

  
};
