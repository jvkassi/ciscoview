/**
 * SessionController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
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
var bcrypt = require('bcrypt');
module.exports = {

    new: function(req, res) {
        var expir = new Date((new Date).getTime() + 4000)
        req.session.cookie.expires = expir;
        // req.session.authenticated = true;
        console.log(req.session);
        res.send(200, '');
    },
    start: function(req, res) {

        res.send(200, '');
    },
    create: function(req, res) {
        console.log('Creating sessions ' + req.param('email') + req.param('password'));

        if (!req.param('email') || !req.param('password')) {
            var usernamePasswordRequiredError = {
                name: 'usernamePasswordRequired',
                message: 'You must enter both a username and password.'
            }

            // Send error message
            res.json(400, {
                err: usernamePasswordRequiredError
            })
            return;
        }
        // console.log('Search sessions ');
        User.findOneByEmail(req.param('email'), function foundUser(err, user) {
            if (err) return next(err);

            // If no user is found...
            // console.log(user);
            if (!user) {
                var noAccountError = {
                    name: 'noAccount',
                    message: 'The email address ' + req.param('email') + ' not found.'
                }

                res.json(400, {
                    err: noAccountError
                })
                return;
            }
            bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
                if (err) return next(err);

                // If the password from the form doesn't match the password from the database...
                if (!valid) {
                    var usernamePasswordMismatchError = {
                        name: 'usernamePasswordMismatch',
                        message: 'Invalid username and password combination.'
                    }

                    res.json(400, {
                        err: usernamePasswordMismatchError
                    })

                    return;
                }
                // Log user in
                req.session.authenticated = true;
                req.session.User = user;

                // Change status to online
                user.online = true;
                user.save(function(err, user) {
                    if (err) return next(err);

                    // Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged in
                    User.publishUpdate(user.id, {
                        online: true,
                        name: user.name,
                    });
                });

                var connected = {
                    current: user,
                    connected: true
                }
                res.json(200, connected)
                return;
            });

        });
    },

    destroy: function(req, res, next) {

        User.findOne(req.session.User.id, function foundUser(err, user) {

            var userId = req.session.User.id;

            if (user) {
                // The user is "logging out" (e.g. destroying the session) so change the online attribute to false.
                User.update(userId, {
                    online: false
                }, function(err) {
                    if (err) return next(err);

                    // Inform other sockets (e.g. connected sockets that are subscribed) that the session for this user has ended.
                    User.publishUpdate(user.id, {
                        online: false,
                        name: user.name,
                    });

                    // Wipe out the session (log out)
                    req.session.authenticated = false;
                    req.session.User = null;
                    req.session.save()
                    console.log(req.session)

                });
                res.send(200)
            } else {

                // Wipe out the session (log out)
                req.session.authenticated = false;
                req.session.User = {};
                req.session.save();

                // Redirect the browser to the sign-in screen
                res.send(200)
            }
        });
    },
    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to SessionController)
     */
    _config: {}


};
